import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { locales, localeNames, hreflangMap, type Locale } from '@/lib/i18n'
import { siteContent } from '@/content/site'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = params.lang as Locale
  const baseUrl = 'https://www.sinowin-vn.com'

  const alternates: Record<string, string> = {}
  locales.forEach((l) => {
    alternates[hreflangMap[l]] = `${baseUrl}/${l}`
  })
  alternates['x-default'] = `${baseUrl}/zh`

  return {
    alternates: {
      languages: alternates,
      canonical: `${baseUrl}/${lang}`,
    },
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const nav = siteContent.nav
  const baseUrl = `/${lang}`

  return (
    <html lang={hreflangMap[lang]}>
      <head>
        {/* hreflang tags */}
        {locales.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={hreflangMap[l]}
            href={`https://www.sinowin-vn.com/${l}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.sinowin-vn.com/zh"
        />
      </head>
      <body>
        <header style={{
          borderBottom: '1px solid var(--color-border)',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          position: 'sticky',
          top: 0,
          background: 'white',
          zIndex: 100,
        }}>
          <Link href={baseUrl} style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
            SINOWIN
          </Link>
          <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
            <Link href={`${baseUrl}/manufacturing`}>{nav.manufacturing[lang]}</Link>
            <Link href={`${baseUrl}/about`}>{nav.about[lang]}</Link>
            <Link href={`${baseUrl}/faq`}>{nav.faq[lang]}</Link>
            <Link href={`${baseUrl}/articles`}>{nav.articles[lang]}</Link>
            <Link href={`${baseUrl}#contact`}>{nav.contact[lang]}</Link>
          </nav>
          {/* Language switcher */}
          <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem' }}>
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                style={{
                  color: l === lang ? 'var(--color-accent)' : 'var(--color-muted)',
                  fontWeight: l === lang ? 600 : 400,
                }}
              >
                {localeNames[l]}
              </Link>
            ))}
          </div>
        </header>

        <main>{children}</main>

        <footer style={{
          borderTop: '1px solid var(--color-border)',
          padding: '3rem 2rem',
          marginTop: '4rem',
          fontSize: '0.875rem',
          color: 'var(--color-muted)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          maxWidth: 'var(--max-w)',
          margin: '4rem auto 0',
        }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text)' }}>SINOWIN INDUSTRIAL (VN)</div>
            <div>Bac Giang, Vietnam</div>
            <div style={{ marginTop: '0.25rem' }}>info@sinowin-vn.com</div>
          </div>
          <div>
            <div style={{ marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-text)' }}>
              {lang === 'zh' ? '認證' : lang === 'vi' ? 'Chứng nhận' : lang === 'ja' ? '認証' : 'Certifications'}
            </div>
            <div>ISO 9001 · ISO 14001 · ISO 45001 · QC 080000</div>
          </div>
          <div style={{ fontSize: '0.8rem', alignSelf: 'flex-end' }}>
            © {new Date().getFullYear()} SINOWIN INDUSTRIAL (VN). All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
