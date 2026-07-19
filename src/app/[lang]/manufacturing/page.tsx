import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { getManufacturingIntro, getWorkshops } from '@/sanity/lib/fetch'
import { t } from '@/sanity/lib/localize'
import WorkshopGrid from '@/components/WorkshopGrid'
import Breadcrumb from '@/components/Breadcrumb'

const BREADCRUMB_LABEL: Record<Locale, string> = { zh: '製造能力', en: 'Manufacturing', vi: 'Năng lực sản xuất', ja: '製造能力' }

const META_DESCRIPTION: Partial<Record<Locale, string>> = {
  zh: 'SINOWIN 越南廠製造能力：多線切、激光切割、研磨、倒角、組裝充磁、測試實驗室、輔具加工，以及表面處理車間（鎳銅鎳、環氧、電泳、銅鎳磷、鋅鍍層，鹽霧測試與厚度規格）。',
  en: 'SINOWIN Vietnam manufacturing capabilities: multi-wire cutting, laser cutting, grinding, chamfering, assembly & magnetizing, testing lab, fixture/tooling, and a surface treatment workshop (Ni-Cu-Ni, epoxy, e-coating, Cu-Ni-P, zinc — salt spray ratings and coating thickness).',
  // Kept shorter than a full workshop-by-workshop translation of zh/en (would
  // exceed ~155 chars and get truncated in search results) -- keeps the
  // highest-value keywords (magnet processing, surface treatment, salt
  // spray, Vietnam) instead of enumerating all 8 workshops/5 coatings.
  vi: 'Năng lực sản xuất của SINOWIN tại Việt Nam: gia công nam châm chính xác, từ cắt dây đến xử lý bề mặt, với kiểm tra phun muối đạt chuẩn quốc tế.',
  ja: 'SINOWINベトナム工場の製造能力：精密磁石加工から表面処理まで一貫対応。塩水噴霧試験など国際基準の品質管理。',
}

// See src/app/[lang]/page.tsx for why this is needed.
export const revalidate = 60

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const titles: Record<Locale, string> = {
    zh: '製造能力 — SINOWIN INDUSTRIAL (VN)',
    en: 'Manufacturing Capabilities — SINOWIN INDUSTRIAL (VN)',
    vi: 'Năng lực sản xuất — SINOWIN INDUSTRIAL (VN)',
    ja: '製造能力 — SINOWIN INDUSTRIAL (VN)',
  }
  return {
    title: titles[lang],
    description: t(META_DESCRIPTION, lang),
    alternates: {
      canonical: `https://www.sinowin-vn.com/${lang}/manufacturing`,
    },
  }
}

const toleranceTable = [
  { process: { zh: '多線切片', en: 'Multi-Wire Cutting', vi: 'Cắt dây đa dây', ja: 'マルチワイヤー切断' }, spec: '±0.02mm / <0.2mm kerf' },
  { process: { zh: '精密雙面研磨', en: 'Double-Side Grinding', vi: 'Mài hai mặt', ja: '両面研削' }, spec: 'Parallelism <0.005mm, Flatness <0.008mm' },
  { process: { zh: '鏡面研磨', en: 'Mirror Grinding', vi: 'Mài gương', ja: '鏡面研削' }, spec: 'Ra ≤0.4μm, Flatness 0.003mm' },
  { process: { zh: '無心磨（外徑）', en: 'Centerless Grinding (OD)', vi: 'Mài không tâm (OD)', ja: 'センタレス研削（外径）' }, spec: 'Roundness <0.003mm, OD ±0.005mm' },
  { process: { zh: '激光切割定位', en: 'Laser Cutting Positioning', vi: 'Định vị cắt laser', ja: 'レーザー切断位置決め' }, spec: '±0.01mm (repeat ±0.005mm)' },
  { process: { zh: 'CNC 精密倒角', en: 'CNC Precision Chamfering', vi: 'Vát góc CNC', ja: 'CNC精密面取り' }, spec: '±0.02mm' },
  { process: { zh: '組裝壓裝', en: 'Assembly Press-Fit', vi: 'Lắp ráp ép', ja: '組み立て圧入' }, spec: '±0.03mm' },
  { process: { zh: '點膠', en: 'Dispensing', vi: 'Bôi keo', ja: 'ディスペンシング' }, spec: '±1mg' },
  { process: { zh: 'CMM 三次元量測', en: 'CMM Measurement', vi: 'Đo CMM', ja: 'CMM測定' }, spec: 'Uncertainty <1μm' },
]

const HEADING = { zh: '一號廠房｜現有產線佈局', en: 'Factory No.1 | Current Production Workshops', vi: 'Nhà máy số 1 | Bố trí dây chuyền hiện tại', ja: '第一工場｜現有生産ライン配置' }

export default async function ManufacturingPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const [manufacturingIntro, workshops] = await Promise.all([getManufacturingIntro(), getWorkshops()])
  const intro = t(manufacturingIntro?.intro, lang) ?? ''

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ManufacturingBusiness',
            name: 'SINOWIN INDUSTRIAL (VN)',
            url: `https://www.sinowin-vn.com/${lang}/manufacturing`,
            description: intro,
          }),
        }}
      />

      <div className="bg-slate-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumb lang={lang} variant="dark" items={[{ label: BREADCRUMB_LABEL[lang] }]} />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">{HEADING[lang]}</h1>
          <p className="text-slate-400 font-medium mb-12">{intro}</p>

          <WorkshopGrid lang={lang} workshops={workshops} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          {lang === 'zh' ? '製程公差總覽' : lang === 'vi' ? 'Tổng quan dung sai quy trình' : lang === 'ja' ? '工程公差一覧' : 'Process Tolerance Overview'}
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--color-surface)' }}>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid var(--color-border)' }}>
                  {lang === 'zh' ? '製程' : lang === 'vi' ? 'Quy trình' : lang === 'ja' ? '工程' : 'Process'}
                </th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid var(--color-border)' }}>
                  {lang === 'zh' ? '公差 / 精度' : lang === 'vi' ? 'Dung sai / Độ chính xác' : lang === 'ja' ? '公差・精度' : 'Tolerance / Accuracy'}
                </th>
              </tr>
            </thead>
            <tbody>
              {toleranceTable.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{row.process[lang]}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--color-muted)', fontFamily: 'monospace' }}>{row.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
