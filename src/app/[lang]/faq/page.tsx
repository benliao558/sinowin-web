import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { getFaqItems } from '@/sanity/lib/fetch'
import { t } from '@/sanity/lib/localize'

// See src/app/[lang]/page.tsx for why this is needed.
export const revalidate = 60

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

export default async function FaqPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const faqItems = await getFaqItems()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: t(item.question, lang),
              acceptedAnswer: { '@type': 'Answer', text: t(item.answer, lang) },
            })),
          }),
        }}
      />

      <h1 className="text-4xl font-black tracking-tight mb-3 text-slate-900">
        {lang === 'zh' ? '常見問題' : lang === 'vi' ? 'Câu hỏi thường gặp' : lang === 'ja' ? 'よくある質問' : 'Frequently Asked Questions'}
      </h1>
      <p className="text-slate-500 mb-10">
        {lang === 'zh' ? '採購、技術規格、交期、認證相關問答' : lang === 'vi' ? 'Hỏi đáp về mua hàng, thông số kỹ thuật, thời gian giao hàng, chứng nhận' : lang === 'ja' ? '調達、技術仕様、納期、認証に関するQ&A' : 'Q&A on procurement, technical specs, lead time, certifications'}
      </p>

      <div className="space-y-3">
        {faqItems.map((item, i) => (
          <details key={item._id} className="group border border-slate-200 rounded-2xl p-5 open:bg-slate-50">
            <summary className="cursor-pointer font-bold text-slate-900 list-none flex items-start justify-between gap-4">
              <span>Q{i + 1}. {t(item.question, lang)}</span>
              <span className="shrink-0 text-teal-600 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">{t(item.answer, lang)}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
