import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { getFaqItems } from '@/sanity/lib/fetch'
import { t } from '@/sanity/lib/localize'
import Breadcrumb from '@/components/Breadcrumb'
import FaqReveal from '@/components/faq/FaqReveal'

// See src/app/[lang]/page.tsx for why this is needed.
export const revalidate = 60

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

type L = Partial<Record<Locale, string>>

const META: { title: Record<Locale, string>; description: L } = {
  title: {
    zh: '常見問題 — SINOWIN',
    vi: 'FAQ — SINOWIN',
    ja: 'FAQ — SINOWIN',
    en: 'FAQ — SINOWIN',
  },
  description: {
    zh: 'SINOWIN 常見問題：釹鐵硼磁鐵加工精度、崩邊控制、批次追溯、IATF 16949 認證文件、交期評估、客製打樣與表面處理選型。',
    en: 'SINOWIN FAQ: NdFeB magnet machining precision, chipping control, batch traceability, IATF 16949 documentation, lead time, custom sampling, and surface treatment selection.',
  },
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const title = META.title[lang]
  const description = t(META.description, lang) ?? ''
  const url = `https://www.sinowin-vn.com/${lang}/faq`
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

const BREADCRUMB_LABEL: Record<Locale, string> = { zh: '常見問題', en: 'FAQ', vi: 'Câu hỏi thường gặp', ja: 'よくある質問' }

// Sanity's faqItem schema has no category field, so grouping is done here by
// matching each item's zh question text -- zh/en authored, vi/ja fall back to
// en via t(). Question/answer text itself is untouched; this only controls
// display order/grouping. Any item that doesn't match one of the zh strings
// below still renders, appended under "Other" -- so a future content edit
// that changes zh wording can never silently drop a question.
const CATEGORIES: { title: L; zhQuestions: string[] }[] = [
  {
    title: { zh: '製程與精度', en: 'Process & precision' },
    zhQuestions: [
      '華榮實業 (SINOWIN) 在越南如何確保釹鐵硼磁鐵的加工精度？',
      '如何降低脆性釹鐵硼材料在切割時的崩邊風險？',
      '中走絲線切割（Medium-speed WEDM）適合哪些需求？',
      '哪些加工能力可以在越南基地一站式完成？',
    ],
  },
  {
    title: { zh: '品質與認證', en: 'Quality & certification' },
    zhQuestions: [
      '如何確保批次一致性與可追溯性？',
      '可以提供哪些品質與合規文件？',
      '如何正確描述磁化方向與檢驗方式？',
    ],
  },
  {
    title: { zh: '交期與打樣', en: 'Lead time & sampling' },
    zhQuestions: [
      '交期如何評估？會受哪些因素影響？',
      '可以支援客製形狀與小量打樣嗎？',
      '表面處理有哪些選擇？如何決定？',
    ],
  },
]

const HEADING = { zh: '常見問題', en: 'Frequently Asked Questions', vi: 'Câu hỏi thường gặp', ja: 'よくある質問' }
const SUBTITLE = { zh: '採購、技術規格、交期、認證相關問答', en: 'Q&A on procurement, technical specs, lead time, certifications', vi: 'Hỏi đáp về mua hàng, thông số kỹ thuật, thời gian giao hàng, chứng nhận', ja: '調達、技術仕様、納期、認証に関するQ&A' }
const OTHER_TITLE: L = { zh: '其他', en: 'Other' }
const CTA = {
  question: { zh: '沒找到您要的答案？', en: "Didn't find your answer?" } as L,
  button: { zh: '直接詢問工程團隊', en: 'Ask our engineering team' } as L,
}

export default async function FaqPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const faqItems = await getFaqItems()

  const used = new Set<string>()
  const groups = CATEGORIES.map((cat) => ({
    title: cat.title,
    items: cat.zhQuestions
      .map((zh) => faqItems.find((item) => item.question?.zh === zh))
      .filter((item): item is NonNullable<typeof item> => {
        if (!item || used.has(item._id)) return false
        used.add(item._id)
        return true
      }),
  }))
  const leftover = faqItems.filter((item) => !used.has(item._id))
  if (leftover.length > 0) groups.push({ title: OTHER_TITLE, items: leftover })

  let revealIndex = 0

  return (
    <div className="faq-page-bg min-h-screen text-white">
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

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Breadcrumb lang={lang} variant="dark" items={[{ label: BREADCRUMB_LABEL[lang] }]} />
        </div>

        <h1 className="text-4xl font-black tracking-tight mb-3" style={{ color: '#FFFFFF' }}>
          {HEADING[lang]}
        </h1>
        <p className="mb-10" style={{ color: '#8A93A3' }}>
          {SUBTITLE[lang]}
        </p>

        <div className="space-y-10">
          {groups.map((group) => (
            <div key={t(group.title, lang)}>
              <div className="relative pl-3 mb-4 overflow-hidden">
                <span
                  className="absolute left-0 top-0 bottom-0 overflow-hidden"
                  style={{ width: 2, background: '#2E4A43' }}
                >
                  <span
                    className="faq-category-sweep absolute inset-x-0"
                    style={{ height: '30%', background: 'rgba(15,191,155,0.14)' }}
                  />
                </span>
                <span style={{ fontSize: 11, letterSpacing: '0.12em', color: '#8A93A3' }} className="uppercase font-bold">
                  {t(group.title, lang)}
                </span>
              </div>

              <div className="space-y-3">
                {group.items.map((item) => {
                  const idx = revealIndex++
                  return (
                    <FaqReveal key={item._id} index={idx}>
                      <details
                        className="faq-item group rounded-2xl p-5 hover:translate-x-[3px] [&:not([open])]:hover:bg-[#151A24] [&:not([open])]:hover:border-[#39414F] open:border-[#2E4A43] open:bg-[#171C26]"
                        style={{
                          background: '#12161F',
                          border: '0.5px solid #1F2530',
                          transitionProperty: 'background-color, border-color, transform',
                          transitionDuration: '250ms',
                        }}
                      >
                        <summary
                          className="cursor-pointer list-none flex items-start gap-3.5"
                          style={{ color: '#D8DEE7' }}
                        >
                          <span className="flex-1 font-bold group-open:text-white transition-colors">
                            {t(item.question, lang)}
                          </span>
                          <span
                            className="shrink-0 transition-all duration-300 group-open:rotate-180 group-open:text-[#5EEAD4]"
                            style={{ color: '#6B7280' }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                            </svg>
                          </span>
                        </summary>
                        <p className="mt-3 text-sm relative z-10" style={{ color: '#8A93A3', lineHeight: 1.85 }}>
                          {t(item.answer, lang)}
                        </p>
                      </details>
                    </FaqReveal>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '0.5px solid #1F2530' }}
        >
          <p style={{ fontSize: 15, color: '#8A93A3' }}>{t(CTA.question, lang)}</p>
          <a
            href={`/${lang}#contact`}
            className="faq-cta-btn shrink-0 inline-flex items-center justify-center px-6 py-3 font-medium text-sm transition-transform"
            style={{ background: '#0FBF9B', color: '#04231C', borderRadius: 8 }}
          >
            {t(CTA.button, lang)} →
          </a>
        </div>
      </div>
    </div>
  )
}
