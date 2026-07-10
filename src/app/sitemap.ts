import { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'

const baseUrl = 'https://www.sinowin-vn.com'

const pages = ['', '/manufacturing', '/about', '/faq', '/articles']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }
  }

  return entries
}
