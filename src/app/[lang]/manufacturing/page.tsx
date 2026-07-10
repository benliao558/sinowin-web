import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { siteContent } from '@/content/site'

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

export default function ManufacturingPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const mfg = siteContent.manufacturing

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
            description: mfg.intro[lang],
          }),
        }}
      />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '3rem 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
          {mfg.pageTitle[lang]}
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '640px' }}>
          {mfg.intro[lang]}
        </p>

        {/* Workshops */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          {lang === 'zh' ? '六大車間' : lang === 'vi' ? 'Sáu xưởng sản xuất' : lang === 'ja' ? '6つのワークショップ' : 'Six Workshops'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {mfg.workshops.map((w, i) => (
            <div key={w.id} style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>{w.name[lang]}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.7 }}>{w.specs[lang]}</div>
            </div>
          ))}
        </div>

        {/* Tolerance table */}
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
