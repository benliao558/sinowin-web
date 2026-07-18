import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { locales, type Locale } from '@/lib/i18n'
import { getArticleBySlug, getArticleSlugs } from '@/sanity/lib/fetch'
import { t } from '@/sanity/lib/localize'
import { urlForImage } from '@/sanity/lib/image'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import Breadcrumb from '@/components/Breadcrumb'

const ARTICLES_LABEL: Record<Locale, string> = { zh: '產業洞察', en: 'Articles', vi: 'Tin tức ngành', ja: '業界インサイト' }

// See src/app/[lang]/page.tsx for why this is needed.
export const revalidate = 60

// Sanity's slug field only enforces non-empty, so a malformed value (spaces,
// stray punctuation) can still be saved -- e.g. one live article currently
// has slug.current == "Australian rare earth developer Arafura" instead of
// a kebab-case slug. That can't be safely prerendered: the static file gets
// written with a literal space in its filename, but browsers always request
// the percent-encoded form, and that mismatch 404d in production even
// though `next build` completed without error. Skipping it here means it
// falls back to on-demand rendering (dynamicParams defaults to true)
// instead. Proper fix is correcting the Sanity slug field (needs write
// access this environment doesn't have).

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return locales.flatMap((lang) =>
    slugs.filter(({ slug }) => isValidSlug(slug)).map(({ slug }) => ({ lang, slug }))
  )
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  // Next.js does not decode dynamic segment params -- params.slug is still
  // percent-encoded exactly as the browser sent it (e.g. "%20" for a space).
  // Sanity's slug.current is stored decoded, so the exact-match GROQ query
  // below silently returns null for any slug containing encodable characters
  // unless we decode first.
  const slug = decodeURIComponent(params.slug)
  const article = await getArticleBySlug(slug)
  if (!article) return {}

  const title = t(article.metaTitle, lang) ?? t(article.title, lang) ?? ''
  const description = t(article.metaDescription, lang) ?? t(article.excerpt, lang) ?? ''
  const url = `https://www.sinowin-vn.com/${lang}/articles/${encodeURIComponent(slug)}`
  // Prefer the article's own cover image so shares actually preview the
  // piece being shared, not a generic site card -- fall back to the site
  // default only if this article has none.
  const ogImageUrl = urlForImage(article.coverImage)?.width(1200).height(630).fit('crop').url()

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: article.publishDate,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [{ url: '/assets/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl ?? '/assets/og-default.jpg'],
    },
  }
}

export default async function ArticlePage({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const article = await getArticleBySlug(decodeURIComponent(params.slug))
  if (!article) notFound()

  const title = t(article.title, lang) ?? ''
  const excerpt = t(article.excerpt, lang) ?? ''
  const content = t(article.content, lang)
  const coverImageUrl = urlForImage(article.coverImage)?.width(1600).url()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: excerpt,
        image: coverImageUrl,
        datePublished: article.publishDate,
        author: { '@type': 'Organization', name: 'SINOWIN INDUSTRIAL (VN)' },
        publisher: { '@type': 'Organization', name: 'SINOWIN INDUSTRIAL (VN)', url: 'https://www.sinowin-vn.com' },
      })}} />

      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Breadcrumb
            lang={lang}
            variant="light"
            items={[{ label: ARTICLES_LABEL[lang], href: `/${lang}/articles` }, { label: title }]}
          />
        </div>
        {coverImageUrl && (
          <div style={{ width: '100%', aspectRatio: '16/9', position: 'relative', borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem' }}>
            <Image src={coverImageUrl} alt={title} fill style={{ objectFit: 'cover' }} priority />
          </div>
        )}
        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
          {article.publishDate} · SINOWIN INDUSTRIAL (VN)
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1.5rem' }}>
          {title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
          {excerpt}
        </p>
        <div style={{ lineHeight: 1.8, color: 'var(--color-text)' }}>
          <PortableTextRenderer value={content} />
        </div>
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
          <a href={`/${lang}/articles`} style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>
            ← {lang === 'zh' ? '返回文章列表' : lang === 'vi' ? 'Quay lại danh sách' : lang === 'ja' ? '一覧に戻る' : 'Back to articles'}
          </a>
        </div>
      </article>
    </>
  )
}
