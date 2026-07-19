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

const FOOTPRINT_LABEL: L = { zh: '集團版圖', en: 'Global footprint', vi: 'Bản đồ tập đoàn', ja: 'グローバル拠点' }
const PAGE_LABEL: L = { zh: '中國生產基地', en: 'China manufacturing base', vi: 'Cơ sở sản xuất tại Trung Quốc', ja: '中国生産拠点' }
const EYEBROW: L = { zh: 'GROUP FOOTPRINT', en: 'GROUP FOOTPRINT', vi: 'GROUP FOOTPRINT', ja: 'GROUP FOOTPRINT' }
const TITLE: L = { zh: '集團中國生產基地', en: 'Group manufacturing base in China', vi: 'Cơ sở sản xuất của tập đoàn tại Trung Quốc', ja: 'グループ中国生産拠点' }
const BODY: L = {
  zh: '華殷集團於中國設有兩處據點，為集團跨國製造網絡的一部分。',
  en: "The Phonein group operates two sites in China as part of its multi-region manufacturing network.",
  vi: 'Phonein Group vận hành hai cơ sở tại Trung Quốc, là một phần trong mạng lưới sản xuất đa khu vực của tập đoàn.',
  ja: 'Phonein Groupは中国に2つの拠点を有しており、これはグループの多地域製造ネットワークの一部です。',
}
const BACK_LABEL: L = { zh: '返回集團版圖', en: 'Back to group footprint', vi: 'Quay lại Bản đồ tập đoàn', ja: 'グローバル拠点に戻る' }
const LAND_AREA_LABEL: L = { zh: '土地面積', en: 'Land area', vi: 'Diện tích đất', ja: '敷地面積' }
const BUILDING_AREA_LABEL: L = { zh: '建築面積', en: 'Building area', vi: 'Diện tích xây dựng', ja: '建築面積' }
const CERT_LABEL: L = { zh: '認證', en: 'Certifications', vi: 'Chứng nhận', ja: '認証' }
const META_DESCRIPTION: L = {
  zh: '華殷集團中國生產基地——集團跨國製造網絡的一部分。',
  en: "Phonein Group's manufacturing base in China — part of the group's multi-region manufacturing network.",
  vi: 'Cơ sở sản xuất của Phonein Group tại Trung Quốc — một phần trong mạng lưới sản xuất đa khu vực của tập đoàn.',
  ja: 'Phonein Groupの中国生産拠点——グループの多地域製造ネットワークの一部。',
}

type Facility = {
  photo: string
  alt: L
  name: L
  location: L
  desc?: L
  landArea: string
  buildingArea: L
  certs: string[]
}

const FACILITIES: Facility[] = [
  {
    photo: '/assets/china-base/china-xinyang.webp',
    alt: { zh: '華殷集團信陽廠區', en: 'Phonein group Xinyang facility', vi: 'Cơ sở Tín Dương của Phonein Group', ja: 'Phonein Group 信陽拠点' },
    name: { zh: '信陽廠', en: 'Xinyang Facility', vi: 'Nhà máy Tín Dương', ja: '信陽工場' },
    location: { zh: '河南信陽', en: 'Xinyang, Henan', vi: 'Tín Dương, Hà Nam', ja: '河南省信陽市' },
    landArea: '76,000 m²',
    buildingArea: { zh: '57,000 m²', en: '57,000 m²', vi: '57,000 m²', ja: '57,000 m²' },
    certs: ['ISO 9001', 'ISO 14001', 'IATF 16949', 'UL ECVP 2809-2'],
  },
  {
    photo: '/assets/china-base/china-suzhou.webp',
    alt: { zh: '華殷集團蘇州 NPI 中心', en: 'Phonein group Suzhou NPI center', vi: 'Trung tâm NPI Tô Châu của Phonein Group', ja: 'Phonein Group 蘇州NPIセンター' },
    name: { zh: '蘇州 NPI 中心', en: 'Suzhou NPI Center', vi: 'Trung tâm NPI Tô Châu', ja: '蘇州NPIセンター' },
    location: { zh: '江蘇蘇州', en: 'Suzhou, Jiangsu', vi: 'Tô Châu, Giang Tô', ja: '江蘇省蘇州市' },
    desc: { zh: '磁材研發、實驗室與大數據中心。', en: 'Magnetic materials R&D, laboratory, and data center.', vi: 'Nghiên cứu & phát triển vật liệu từ tính, phòng thí nghiệm và trung tâm dữ liệu.', ja: '磁性材料の研究開発、実験室、およびデータセンター。' },
    landArea: '12,000 m²',
    buildingArea: { zh: '45,000 m²（7 層）', en: '45,000 m² (7 floors)', vi: '45,000 m² (7 tầng)', ja: '45,000 m²（7階建て）' },
    certs: ['ISO 9001', 'ISO 14001', 'ISO 45001'],
  },
]

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
        <p className="text-sm md:text-base max-w-2xl mb-12" style={{ color: '#8A93A3' }}>
          {t(BODY, lang)}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {FACILITIES.map((facility) => (
            <div key={t(facility.name, lang)} className="rounded-xl overflow-hidden" style={{ background: '#12161F', border: '0.5px solid #1F2530' }}>
              <div className="relative" style={{ height: 200 }}>
                <Image src={facility.photo} alt={t(facility.alt, lang) ?? ''} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h2 className="font-black text-lg mb-1" style={{ color: '#E4E9F2' }}>{t(facility.name, lang)}</h2>
                <p className="text-sm mb-4" style={{ color: '#79818F' }}>{t(facility.location, lang)}</p>
                {facility.desc && (
                  <p className="text-sm mb-4" style={{ color: '#8A93A3' }}>{t(facility.desc, lang)}</p>
                )}

                <div className="flex flex-wrap gap-x-8 gap-y-3 mb-4">
                  <div className="pl-3" style={{ borderLeft: '2px solid #39414F' }}>
                    <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#6B7280' }}>{t(LAND_AREA_LABEL, lang)}</p>
                    <p className="text-lg" style={{ color: '#FFFFFF', fontWeight: 500 }}>{facility.landArea}</p>
                  </div>
                  <div className="pl-3" style={{ borderLeft: '2px solid #39414F' }}>
                    <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#6B7280' }}>{t(BUILDING_AREA_LABEL, lang)}</p>
                    <p className="text-lg" style={{ color: '#FFFFFF', fontWeight: 500 }}>{t(facility.buildingArea, lang)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#6B7280' }}>{t(CERT_LABEL, lang)}</p>
                  <div className="flex flex-wrap gap-2">
                    {facility.certs.map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest"
                        style={{ background: '#1A1F2A', color: '#98A1B0' }}
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href={`/${lang}#footprint`} className="text-sm font-bold transition-colors" style={{ color: '#8A93A3' }}>
          ← {t(BACK_LABEL, lang)}
        </Link>
      </div>
    </div>
  )
}
