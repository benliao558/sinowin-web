import type { Locale } from '@/lib/i18n'
import { t } from '@/sanity/lib/localize'
import { urlForImage } from '@/sanity/lib/image'
import type { SanityArticleListItem } from '@/sanity/lib/types'

export const SITE_URL = 'https://www.sinowin-vn.com'

// Default locale to publish LinkedIn posts in. Intentionally a single named
// constant (not hardcoded inline) so switching the default, or later
// syncing multiple locales per article, is a one-line/one-array change --
// see LOCALES_TO_SYNC in src/app/api/linkedin/sync/route.ts.
export const DEFAULT_LINKEDIN_LOCALE: Locale = 'en'

export type LinkedInPostContent = {
  commentary: string
  title: string
  description: string
  source: string
  imageUrl: string | null
}

export function buildPostContentForArticle(article: SanityArticleListItem, locale: Locale): LinkedInPostContent {
  const title = t(article.title, locale) ?? ''
  const excerpt = t(article.excerpt, locale) ?? ''
  const source = `${SITE_URL}/${locale}/articles/${article.slug}`
  const imageUrl = article.coverImage ? urlForImage(article.coverImage)?.width(1200).height(627).url() ?? null : null

  return {
    commentary: title,
    title,
    description: excerpt,
    source,
    imageUrl,
  }
}
