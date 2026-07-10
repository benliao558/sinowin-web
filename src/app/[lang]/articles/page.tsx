import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { locales, type Locale } from '@/lib/i18n'

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

// [TODO] Article content needs to be migrated from original /article/ pages
// 7 articles confirmed existing:
// - 磁路設計
// - N52磁鐵物理極限
// - 城市礦山回收
// - 耐熱牌號比較
// - NdFeB全流程
// - Fe16N2供應鏈
// - 印度市場

const articlePlaceholders = [
  { slug: 'magnetic-circuit-design', title: { zh: '磁路設計', en: 'Magnetic Circuit Design', vi: 'Thiết kế mạch từ', ja: '磁気回路設計' } },
  { slug: 'n52-physical-limits', title: { zh: 'N52 磁鐵物理極限', en: 'Physical Limits of N52 Magnets', vi: 'Giới hạn vật lý của nam châm N52', ja: 'N52磁石の物理的限界' } },
  { slug: 'urban-mining-recovery', title: { zh: '城市礦山回收', en: 'Urban Mining & Recovery', vi: 'Khai thác và tái chế mỏ đô thị', ja: '都市鉱山リサイクル' } },
  { slug: 'heat-resistant-grades', title: { zh: '耐熱牌號比較', en: 'Heat-Resistant Grade Comparison', vi: 'So sánh mác chịu nhiệt', ja: '耐熱グレード比較' } },
  { slug: 'ndfeb-full-process', title: { zh: 'NdFeB 全流程', en: 'NdFeB Full Process', vi: 'Quy trình đầy đủ NdFeB', ja: 'NdFeB全工程' } },
  { slug: 'fe16n2-supply-chain', title: { zh: 'Fe16N2 供應鏈', en: 'Fe16N2 Supply Chain', vi: 'Chuỗi cung ứng Fe16N2', ja: 'Fe16N2サプライチェーン' } },
  { slug: 'india-market', title: { zh: '印度市場', en: 'India Market Outlook', vi: 'Triển vọng thị trường Ấn Độ', ja: 'インド市場展望' } },
]

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
        {articlePlaceholders.map((a) => (
          <div key={a.slug} style={{ background: 'white', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 500 }}>{a.title[lang]}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', background: '#fffbeb', padding: '0.25rem 0.75rem', borderRadius: '999px', border: '1px solid #f59e0b', color: '#92400e' }}>
              {lang === 'zh' ? '遷移中' : lang === 'vi' ? 'Đang di chuyển' : lang === 'ja' ? '移行中' : 'Migrating'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
