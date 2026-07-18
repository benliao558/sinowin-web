import { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { getArticles } from '@/sanity/lib/fetch'

// See src/app/[lang]/page.tsx for why this is needed.
export const revalidate = 60

const baseUrl = 'https://www.sinowin-vn.com'

const pages = ['', '/manufacturing', '/about', '/faq', '/articles']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []
  const articles = await getArticles()

  for (const lang of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }

    for (const article of articles) {
      entries.push({
        url: `${baseUrl}/${lang}/articles/${encodeURIComponent(article.slug)}`,
        lastModified: new Date(article.publishDate),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
