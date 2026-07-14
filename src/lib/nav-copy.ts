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
