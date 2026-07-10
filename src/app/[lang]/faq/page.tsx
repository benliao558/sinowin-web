import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  return {
    title: lang === 'zh' ? '常見問題 — SINOWIN' : lang === 'vi' ? 'FAQ — SINOWIN' : lang === 'ja' ? 'FAQ — SINOWIN' : 'FAQ — SINOWIN',
    alternates: { canonical: `https://www.sinowin-vn.com/${lang}/faq` },
  }
}

// [TODO] This content needs to be extracted from the original contact.html
// The original has a complete zh/en bilingual FAQ covering:
// - Machine precision guarantees
// - Chipping prevention
// - Lead time estimation
// - Certification documents available
// - Custom sample production
// - Surface treatment options

export default function FaqPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
        {lang === 'zh' ? '常見問題' : lang === 'vi' ? 'Câu hỏi thường gặp' : lang === 'ja' ? 'よくある質問' : 'Frequently Asked Questions'}
      </h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
        {lang === 'zh' ? '採購、技術規格、交期、認證相關問答' : lang === 'vi' ? 'Hỏi đáp về mua hàng, thông số kỹ thuật, thời gian giao hàng, chứng nhận' : lang === 'ja' ? '調達、技術仕様、納期、認証に関するQ&A' : 'Q&A on procurement, technical specs, lead time, certifications'}
      </p>

      <div style={{ background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: 'var(--radius)', padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#92400e' }}>
        {lang === 'zh'
          ? '⚠️ FAQ 內容正在從原始 contact.html 遷移中。這是網站上品質最好的 AEO 素材，請提供原始檔案以完成遷移。'
          : lang === 'vi'
          ? '⚠️ Nội dung FAQ đang được di chuyển từ contact.html gốc.'
          : lang === 'ja'
          ? '⚠️ FAQコンテンツはオリジナルのcontact.htmlから移行中です。'
          : '⚠️ FAQ content is being migrated from original contact.html. Please provide the source file to complete migration.'}
      </div>
    </div>
  )
}
