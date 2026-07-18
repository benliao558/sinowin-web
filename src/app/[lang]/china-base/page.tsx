import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { locales, type Locale } from '@/lib/i18n'
import { t } from '@/sanity/lib/localize'
import Breadcrumb from '@/components/Breadcrumb'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

type L = Partial<Record<Locale, string>>

const FOOTPRINT_LABEL: L = { zh: '集團版圖', en: 'Global footprint' }
const PAGE_LABEL: L = { zh: '中國生產基地', en: 'China manufacturing base' }
const EYEBROW: L = { zh: 'GROUP FOOTPRINT', en: 'GROUP FOOTPRINT' }
const TITLE: L = { zh: '集團中國生產基地', en: 'Group manufacturing base in China' }
const BODY: L = {
  zh: '華殷集團於中國設有生產基地，為集團跨國製造網絡的一部分。',
  en: 'The Phonein group operates a manufacturing base in China as part of its multi-region manufacturing network.',
}
const BACK_LABEL: L = { zh: '返回集團版圖', en: 'Back to group footprint' }
const PHOTO_ALT: L = { zh: 'SINOWIN 集團中國生產基地廠區', en: 'SINOWIN group manufacturing base in China' }
const META_DESCRIPTION: L = {
  zh: '華殷集團中國生產基地——集團跨國製造網絡的一部分。',
  en: "Phonein Group's manufacturing base in China — part of the group's multi-region manufacturing network.",
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  return {
    title: `${t(TITLE, lang)} — SINOWIN`,
    description: t(META_DESCRIPTION, lang),
    alternates: { canonical: `https://www.sinowin-vn.com/${lang}/china-base` },
  }
}

export default async function ChinaBasePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  return (
    <div className="min-h-screen text-white" style={{ background: '#0A0D14' }}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Breadcrumb
            lang={lang}
            variant="dark"
            items={[
              { label: t(FOOTPRINT_LABEL, lang) ?? '', href: `/${lang}#footprint` },
              { label: t(PAGE_LABEL, lang) ?? '' },
            ]}
          />
        </div>

        <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: '#6B7280' }}>
          {t(EYEBROW, lang)}
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-6" style={{ color: '#E4E9F2' }}>
          {t(TITLE, lang)}
        </h1>
        <p className="text-sm md:text-base max-w-2xl mb-10" style={{ color: '#8A93A3' }}>
          {t(BODY, lang)}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #1F2530' }}>
            <div className="relative" style={{ aspectRatio: '16 / 10' }}>
              <Image src="/assets/china-base/china-base-2.webp" alt={t(PHOTO_ALT, lang) ?? ''} fill className="object-cover" />
            </div>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #1F2530' }}>
            <div className="relative" style={{ aspectRatio: '16 / 10' }}>
              <Image src="/assets/china-base/china-base-3.webp" alt={t(PHOTO_ALT, lang) ?? ''} fill className="object-cover" />
            </div>
          </div>
        </div>

        <Link href={`/${lang}#footprint`} className="text-sm font-bold transition-colors" style={{ color: '#8A93A3' }}>
          ← {t(BACK_LABEL, lang)}
        </Link>
      </div>
    </div>
  )
}
