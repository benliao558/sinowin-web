import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { siteContent } from '@/content/site'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  return {
    title: lang === 'zh' ? '關於我們 — SINOWIN' : lang === 'vi' ? 'Về chúng tôi — SINOWIN' : lang === 'ja' ? '会社概要 — SINOWIN' : 'About Us — SINOWIN',
    alternates: { canonical: `https://www.sinowin-vn.com/${lang}/about` },
  }
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const c = siteContent.company

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
        {lang === 'zh' ? '關於我們' : lang === 'vi' ? 'Về chúng tôi' : lang === 'ja' ? '会社概要' : 'About Us'}
      </h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', maxWidth: '640px', lineHeight: 1.8, marginBottom: '2rem' }}>
        {c.description[lang]}
      </p>

      {/* Partner logos / backgrounds */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: '640px', marginBottom: '3rem' }}>
        {[
          { name: 'Phonein Group', origin: lang === 'zh' ? '台灣' : lang === 'vi' ? 'Đài Loan' : lang === 'ja' ? '台湾' : 'Taiwan', role: lang === 'zh' ? '磁材技術' : lang === 'vi' ? 'Công nghệ nam châm' : lang === 'ja' ? '磁石技術' : 'Magnet Technology' },
          { name: 'TDConnex', origin: lang === 'zh' ? '新加坡' : lang === 'vi' ? 'Singapore' : lang === 'ja' ? 'シンガポール' : 'Singapore', role: lang === 'zh' ? '精密製造管理' : lang === 'vi' ? 'Quản lý sản xuất chính xác' : lang === 'ja' ? '精密製造管理' : 'Precision Manufacturing' },
        ].map((p) => (
          <div key={p.name} style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{p.name}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{p.origin} · {p.role}</div>
          </div>
        ))}
      </div>

      {/* Placeholder notice for remaining content */}
      <div style={{ background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: 'var(--radius)', padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#92400e' }}>
        {lang === 'zh'
          ? '⚠️ 此頁面內容仍在遷移中（來自 about.html）。完整版本即將上線。'
          : lang === 'vi'
          ? '⚠️ Nội dung trang này đang được di chuyển (từ about.html). Phiên bản đầy đủ sắp ra mắt.'
          : lang === 'ja'
          ? '⚠️ このページのコンテンツは移行中です（about.htmlより）。完全版は近日公開予定。'
          : '⚠️ Page content is being migrated (from about.html). Full version coming soon.'}
      </div>
    </div>
  )
}
