import type { Locale } from '@/lib/i18n'
import type { PortableTextBlock } from '@portabletext/types'

export type LocaleString = Partial<Record<Locale, string>>
export type LocaleText = Partial<Record<Locale, string>>
export type LocaleBlockContent = Partial<Record<Locale, PortableTextBlock[]>>

export type SanityImage = {
  asset?: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
} | null

export type SanityArticleListItem = {
  _id: string
  slug: string
  publishDate: string
  category: string
  coverImage: SanityImage
  title: LocaleString
  excerpt: LocaleText
  metaTitle?: LocaleString
  metaDescription?: LocaleText
}

export type SanityArticle = SanityArticleListItem & {
  content: LocaleBlockContent
}

export type WorkshopPoint = {
  label: LocaleString
  text: LocaleText
}

export type WorkshopTab = {
  key: string
  title: LocaleString
  sub?: string
  img: SanityImage
  points: WorkshopPoint[]
}

export type SanityWorkshop = {
  _id: string
  workshopId: string
  cardImage: SanityImage
  badge?: string
  cardTitle: LocaleString
  cardDesc: LocaleText
  subtitle: LocaleString
  intro: LocaleText
  whyTitle: LocaleString
  whyBody: LocaleText
  highlights: LocaleString[]
  tabs: WorkshopTab[]
  deliverTitle?: LocaleString
  deliverItems?: LocaleString[]
}

export type SanityCertification = {
  _id: string
  certId: string
  name: string
  confirmed: boolean
  badgeImage: SanityImage
}

export type SanityFaqItem = {
  _id: string
  question: LocaleString
  answer: LocaleText
  order?: number
}

// { preset, custom } is the current shape (see departmentField schema). The
// bare LocaleString union covers documents written before that schema
// change -- old data isn't migrated automatically, so the frontend needs to
// keep understanding both shapes. See src/lib/departments.ts.
export type JobDepartment = { preset?: string; custom?: LocaleString }

export type SanityJobOpening = {
  _id: string
  title: LocaleString
  department?: JobDepartment | LocaleString
  location?: LocaleString
  employmentType?: LocaleString
  description?: LocaleText
  isActive: boolean
  postedDate: string
}

export type SanityCompanyInfo = {
  name: LocaleString
  tagline: LocaleString
  description: LocaleText
} | null

export type SanityHomepageContent = {
  heroTitle: LocaleString
  heroSubtitle: LocaleString
  supplyChainTitle: LocaleString
  supplyChainBody: LocaleText
  capacityTitle: LocaleString
  annualCapacity: LocaleText
  service: LocaleText
  tempGrades: LocaleText
} | null

export type SanityManufacturingIntro = {
  pageTitle: LocaleString
  intro: LocaleText
} | null

export type SanityNavLabels = {
  home: LocaleString
  manufacturing: LocaleString
  about: LocaleString
  faq: LocaleString
  articles: LocaleString
  careers: LocaleString
  contact: LocaleString
} | null
