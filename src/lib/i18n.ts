export type Locale = 'zh' | 'en' | 'vi' | 'ja'

export const locales: Locale[] = ['zh', 'en', 'vi', 'ja']
export const defaultLocale: Locale = 'zh'

// Fallback chain: vi -> en -> zh, ja -> en -> zh, en -> zh
export function getFallback(locale: Locale): Locale | null {
  const chain: Record<Locale, Locale | null> = {
    zh: null,
    en: 'zh',
    vi: 'en',
    ja: 'en',
  }
  return chain[locale]
}

export function getWithFallback<T>(
  obj: Partial<Record<Locale, T>>,
  locale: Locale
): T | undefined {
  if (obj[locale] !== undefined) return obj[locale]
  let fallback = getFallback(locale)
  while (fallback) {
    if (obj[fallback] !== undefined) return obj[fallback]
    fallback = getFallback(fallback)
  }
  return undefined
}

export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  vi: 'Tiếng Việt',
  ja: '日本語',
}

export const hreflangMap: Record<Locale, string> = {
  zh: 'zh-TW',
  en: 'en',
  vi: 'vi',
  ja: 'ja',
}
