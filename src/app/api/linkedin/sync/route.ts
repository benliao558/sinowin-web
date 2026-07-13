import { NextResponse } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { client } from '@/sanity/lib/client'
import { articleByIdQuery } from '@/sanity/lib/queries'
import type { SanityArticleListItem } from '@/sanity/lib/types'
import { getSanityWriteClient } from '@/lib/linkedin/sanityWriteClient'
import { getConnection } from '@/lib/linkedin/connection'
import { buildPostContentForArticle, DEFAULT_LINKEDIN_LOCALE } from '@/lib/linkedin/content'
import { createArticlePost, uploadImage } from '@/lib/linkedin/api'

export const runtime = 'nodejs'

// Locale(s) to publish to LinkedIn for each article. A single default today,
// but deliberately an array + loop so adding more languages later is a
// one-line change, not a rewrite -- see the user's original flexibility
// requirement.
const LOCALES_TO_SYNC = [DEFAULT_LINKEDIN_LOCALE]

async function writeLog(params: {
  article: SanityArticleListItem
  locale: string
  status: 'success' | 'failed'
  postUrn?: string
  errorMessage?: string
}) {
  const writeClient = getSanityWriteClient()
  await writeClient.create({
    _type: 'linkedinSyncLog',
    article: { _type: 'reference', _ref: params.article._id },
    articleTitle: params.article.title?.zh ?? params.article.title?.en ?? params.article.slug,
    articleSlug: params.article.slug,
    status: params.status,
    locale: params.locale,
    postUrn: params.postUrn ?? null,
    errorMessage: params.errorMessage ?? null,
    attemptedAt: new Date().toISOString(),
  })
}

async function alreadySynced(articleId: string): Promise<boolean> {
  const writeClient = getSanityWriteClient()
  const existing = await writeClient.fetch<string | null>(
    `*[_type == "linkedinSyncLog" && article._ref == $articleId && status == "success"][0]._id`,
    { articleId }
  )
  return Boolean(existing)
}

// Receives Sanity's publish webhook for the `article` document type. Must
// never let a LinkedIn failure look like a webhook failure -- Sanity's
// publish already succeeded before this fires (webhooks are async, fired
// after the fact), but we still always return 200 so nothing upstream ever
// treats a LinkedIn hiccup as a delivery problem worth retrying/alerting on.
export async function POST(req: Request) {
  const bodyText = await req.text()
  const signature = req.headers.get(SIGNATURE_HEADER_NAME) ?? ''
  const secret = process.env.SANITY_WEBHOOK_SECRET?.trim()

  if (!secret || !(await isValidSignature(bodyText, signature, secret))) {
    // Not a real Sanity webhook call -- reject before doing any work, but
    // this rejection has no bearing on whether the article's publish
    // succeeded (that already happened independently).
    return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 401 })
  }

  let payload: { _id?: string; _type?: string }
  try {
    payload = JSON.parse(bodyText)
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const articleId = payload._id
  if (!articleId) {
    return NextResponse.json({ ok: false, error: 'Missing _id in payload' }, { status: 400 })
  }

  try {
    if (await alreadySynced(articleId)) {
      return NextResponse.json({ ok: true, skipped: 'already synced (not a first publish)' })
    }

    const article = await client.fetch<SanityArticleListItem | null>(articleByIdQuery, { id: articleId })
    if (!article) {
      return NextResponse.json({ ok: true, skipped: 'article not found (may have been unpublished)' })
    }

    const connection = await getConnection()
    if (!connection) {
      await writeLog({ article, locale: LOCALES_TO_SYNC[0], status: 'failed', errorMessage: 'LinkedIn not connected' })
      return NextResponse.json({ ok: true, syncedTo: [], error: 'LinkedIn not connected' })
    }

    const results = []
    for (const locale of LOCALES_TO_SYNC) {
      const content = buildPostContentForArticle(article, locale)

      let thumbnailImageUrn: string | undefined
      if (content.imageUrl) {
        try {
          thumbnailImageUrn = await uploadImage(connection.accessToken, connection.organizationUrn, content.imageUrl)
        } catch (err) {
          // Best-effort: post without a thumbnail rather than fail the whole sync over an image problem.
          console.error('LinkedIn image upload failed, posting without thumbnail:', err)
        }
      }

      try {
        const postUrn = await createArticlePost({
          accessToken: connection.accessToken,
          organizationUrn: connection.organizationUrn,
          commentary: content.commentary,
          articleUrl: content.source,
          articleTitle: content.title,
          articleDescription: content.description,
          thumbnailImageUrn,
        })
        await writeLog({ article, locale, status: 'success', postUrn })
        results.push({ locale, ok: true, postUrn })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        await writeLog({ article, locale, status: 'failed', errorMessage: message })
        results.push({ locale, ok: false, error: message })
      }
    }

    return NextResponse.json({ ok: true, syncedTo: results })
  } catch (err) {
    // Catch-all: log what we can, never throw out of this handler.
    console.error('LinkedIn sync route error:', err)
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : 'Unknown error' })
  }
}
