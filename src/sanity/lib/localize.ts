import { getWithFallback, type Locale } from '@/lib/i18n'

// Per-field fallback (vi -> en -> zh, ja -> en -> zh, en -> zh), same chain
// as getWithFallback already used by workshops.ts. Applied uniformly to
// every localized field read from Sanity (title/excerpt/content/etc a
// like), including Article fields that used to rely on articles.ts's
// getTranslation() whole-object fallback -- since every existing
// translation object has all its fields filled together (never partial),
// per-field vs whole-object fallback produce identical results for
// current content, and per-field is what the Sanity schema is built around.
export function t<T>(value: Partial<Record<Locale, T>> | undefined | null, lang: Locale): T | undefined {
  if (!value) return undefined
  return getWithFallback(value, lang) ?? value.zh
}
