import type { Locale } from '@/lib/i18n'

// Moved out of the homepage hero (see src/app/[lang]/page.tsx) into the
// footer -- job seekers look for this link themselves, it doesn't need to
// compete with the purchasing-focused hero CTAs for attention anymore.
export const CAREERS_LABEL: Record<Locale, string> = {
  zh: '加入團隊',
  en: 'Join Our Team',
  vi: 'Gia nhập đội ngũ',
  ja: '採用情報',
}

// Also moved out of the hero, but kept as real links (not folded silently
// into copy) -- the parent-group relationship is publicly verifiable via
// trade databases, so a working link reads as transparency; removing it
// entirely would read as concealment to a compliance-minded buyer.
export const CHINA_BASE_LABEL: Record<Locale, string> = {
  zh: '中國生產基地',
  en: 'China Production Base',
  vi: 'Cơ sở sản xuất Trung Quốc',
  ja: '中国生産拠点',
}
export const PHONEIN_GROUP_LABEL: Record<Locale, string> = {
  zh: '了解華殷集團',
  en: 'About Phonein Group',
  vi: 'Về Phonein Group',
  ja: 'Phonein Groupについて',
}
