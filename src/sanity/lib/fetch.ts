import { client } from './client'
import {
  articlesListQuery,
  articleBySlugQuery,
  articleSlugsQuery,
  workshopsQuery,
  certificationsQuery,
  faqItemsQuery,
  companyInfoQuery,
  homepageContentQuery,
  manufacturingIntroQuery,
  navLabelsQuery,
} from './queries'
import type {
  SanityArticleListItem,
  SanityArticle,
  SanityWorkshop,
  SanityCertification,
  SanityFaqItem,
  SanityCompanyInfo,
  SanityHomepageContent,
  SanityManufacturingIntro,
  SanityNavLabels,
} from './types'

export function getArticles(): Promise<SanityArticleListItem[]> {
  return client.fetch(articlesListQuery)
}

export function getArticleBySlug(slug: string): Promise<SanityArticle | null> {
  return client.fetch(articleBySlugQuery, { slug })
}

export function getArticleSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(articleSlugsQuery)
}

export function getWorkshops(): Promise<SanityWorkshop[]> {
  return client.fetch(workshopsQuery)
}

export function getCertifications(): Promise<SanityCertification[]> {
  return client.fetch(certificationsQuery)
}

export function getFaqItems(): Promise<SanityFaqItem[]> {
  return client.fetch(faqItemsQuery)
}

export function getCompanyInfo(): Promise<SanityCompanyInfo> {
  return client.fetch(companyInfoQuery)
}

export function getHomepageContent(): Promise<SanityHomepageContent> {
  return client.fetch(homepageContentQuery)
}

export function getManufacturingIntro(): Promise<SanityManufacturingIntro> {
  return client.fetch(manufacturingIntroQuery)
}

export function getNavLabels(): Promise<SanityNavLabels> {
  return client.fetch(navLabelsQuery)
}
