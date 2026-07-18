import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { locales, type Locale } from '@/lib/i18n'
import { getArticles } from '@/sanity/lib/fetch'
import { t as tt } from '@/sanity/lib/localize'
import { urlForImage } from '@/sanity/lib/image'
import Breadcrumb from '@/components/Breadcrumb'

const BREADCRUMB_LABEL: Record<Locale, string> = { zh: '產業洞察', en: 'Articles', vi: 'Tin tức ngành', ja: '業界インサイト' }

// See src/app/[lang]/page.tsx for why this is needed.
export const revalidate = 60

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

const ARTICLES_DESC: Record<Locale, string> = {
  zh: '磁材技術、供應鏈、市場深度分析。',
  en: 'Deep analysis on magnet technology, supply chain, and markets.',
  vi: 'Phân tích chuyên sâu về công nghệ nam châm, chuỗi cung ứng, thị trường.',
  ja: '磁石技術、サプライチェーン、市場の詳細分析。',
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = lang === 'zh' ? '產業洞察 — SINOWIN' : 'Industry Insights — SINOWIN'
  const description = ARTICLES_DESC[lang]
  const url = `https://www.sinowin-vn.com/${lang}/articles`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: '/assets/og-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/assets/og-default.jpg'],
    },
  }
}

const CATEGORY_LABELS: Record<string, Record<Locale, string>> = {
  industry: { zh: '產業', en: 'Industry', vi: 'Ngành', ja: '業界' },
  'supply-chain': { zh: '供應鏈', en: 'Supply Chain', vi: 'Chuỗi cung ứng', ja: 'サプライチェーン' },
  technical: { zh: '技術', en: 'Technical', vi: 'Kỹ thuật', ja: '技術' },
}

export default async function ArticlesPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const articles = await getArticles()

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '3rem 2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Breadcrumb lang={lang} variant="light" items={[{ label: BREADCRUMB_LABEL[lang] }]} />
      </div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
        {lang === 'zh' ? '產業洞察' : lang === 'vi' ? 'Tin tức ngành' : lang === 'ja' ? '業界インサイト' : 'Industry Insights'}
      </h1>
      <p style={{ color: 'var(--color-muted)', marginBottom: '2.5rem' }}>
        {lang === 'zh' ? '磁材技術、供應鏈、市場深度分析' : lang === 'vi' ? 'Phân tích chuyên sâu về công nghệ nam châm, chuỗi cung ứng, thị trường' : lang === 'ja' ? '磁石技術、サプライチェーン、市場の詳細分析' : 'Deep analysis on magnet technology, supply chain, and markets'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((a, i) => {
          const title = tt(a.title, lang) ?? ''
          const excerpt = tt(a.excerpt, lang) ?? ''
          const categoryLabel = CATEGORY_LABELS[a.category]?.[lang] ?? a.category
          const imgUrl = urlForImage(a.coverImage)?.width(600).height(338).url()

          return (
            <Link
              key={a.slug}
              href={`/${lang}/articles/${encodeURIComponent(a.slug)}`}
              className="hover-lift enter-fade group flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="relative aspect-video bg-slate-100 overflow-hidden shrink-0">
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <span className="text-slate-400 text-xs font-black uppercase tracking-widest">SINOWIN</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="inline-block self-start px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-[10px] font-black uppercase tracking-widest mb-3">
                  {categoryLabel}
                </span>
                <h3 className="font-black text-slate-900 text-lg leading-snug mb-2 line-clamp-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">{excerpt}</p>
                <div className="text-xs text-slate-400 font-medium">{a.publishDate}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
