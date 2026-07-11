import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { locales, type Locale } from '@/lib/i18n'
import { articles, getTranslation } from '@/content/articles'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  return {
    title: lang === 'zh' ? '產業洞察 — SINOWIN' : 'Industry Insights — SINOWIN',
    alternates: { canonical: `https://www.sinowin-vn.com/${lang}/articles` },
  }
}

export default function ArticlesPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
        {lang === 'zh' ? '產業洞察' : lang === 'vi' ? 'Tin tức ngành' : lang === 'ja' ? '業界インサイト' : 'Industry Insights'}
      </h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2.5rem' }}>
        {lang === 'zh' ? '磁材技術、供應鏈、市場深度分析' : lang === 'vi' ? 'Phân tích chuyên sâu về công nghệ nam châm, chuỗi cung ứng, thị trường' : lang === 'ja' ? '磁石技術、サプライチェーン、市場の詳細分析' : 'Deep analysis on magnet technology, supply chain, and markets'}
      </p>

      <div style={{ display: 'grid', gap: '1px', background: 'var(--color-border)' }}>
        {articles.map((a) => {
          const t = getTranslation(a, lang)
          if (!t) return null
          return (
            <Link
              key={a.slug}
              href={`/${lang}/articles/${a.slug}`}
              style={{ background: 'white', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}
            >
              {a.coverImage && (
                <div style={{ width: '80px', height: '60px', position: 'relative', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
                  <Image src={a.coverImage} alt={t.title} fill style={{ objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ fontWeight: 500, flex: 1 }}>{t.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>
                {a.publishDate}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
