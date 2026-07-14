import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

export type BreadcrumbItem = { label: string; href?: string }

const HOME_LABEL: Record<Locale, string> = { zh: '首頁', en: 'Home', vi: 'Trang chủ', ja: 'ホーム' }

/**
 * Breadcrumb trail + matching BreadcrumbList JSON-LD.
 * `variant="dark"` for dark-themed pages (About, Manufacturing), `"light"` for
 * pages that use the light theme + `--color-*` CSS vars (Articles).
 */
export default function Breadcrumb({
  lang,
  items,
  variant = 'dark',
}: {
  lang: Locale
  items: BreadcrumbItem[]
  variant?: 'dark' | 'light'
}) {
  const allItems: BreadcrumbItem[] = [{ label: HOME_LABEL[lang], href: `/${lang}` }, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://www.sinowin-vn.com${item.href}` } : {}),
    })),
  }

  const linkClass = variant === 'dark' ? 'text-slate-400 hover:text-white transition' : 'transition hover:opacity-70'
  const sepClass = variant === 'dark' ? 'text-slate-600' : ''

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="text-xs font-medium">
        <ol className="flex flex-wrap items-center gap-1.5">
          {allItems.map((item, i) => {
            const isLast = i === allItems.length - 1
            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span className={sepClass} style={variant === 'light' ? { color: 'var(--color-border)' } : undefined}>
                    /
                  </span>
                )}
                {item.href && !isLast ? (
                  <Link href={item.href} className={linkClass} style={variant === 'light' ? { color: 'var(--color-muted)' } : undefined}>
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={variant === 'dark' ? 'text-slate-200' : ''}
                    style={variant === 'light' ? { color: 'var(--color-text)' } : undefined}
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
