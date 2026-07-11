'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localeNames, type Locale } from '@/lib/i18n'

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname() || `/${lang}`
  const segments = pathname.split('/')

  return (
    <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem' }}>
      {locales.map((l) => {
        const targetSegments = [...segments]
        targetSegments[1] = l
        const href = targetSegments.join('/') || `/${l}`
        return (
          <Link
            key={l}
            href={href}
            style={{
              color: l === lang ? 'var(--color-accent)' : 'var(--color-muted)',
              fontWeight: l === lang ? 600 : 400,
            }}
          >
            {localeNames[l]}
          </Link>
        )
      })}
    </div>
  )
}
