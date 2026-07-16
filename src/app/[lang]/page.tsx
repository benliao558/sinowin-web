import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { locales, type Locale } from '@/lib/i18n'
import { getHomepageContent, getCertifications } from '@/sanity/lib/fetch'

// Without this, the page is fully static (generateStaticParams below) and
// only ever re-reads Sanity at build/deploy time -- a Studio publish (e.g.
// a new job opening) would never appear on the live site until the next
// deploy. Revalidate every 60s so content edits show up on their own.
export const revalidate = 60
import { t } from '@/sanity/lib/localize'
import { urlForImage } from '@/sanity/lib/image'
import BrHcjTool from '@/components/BrHcjTool'
import PartnersStrip from '@/components/PartnersStrip'
import ContactForm from '@/components/ContactForm'

type L = Partial<Record<Locale, string>>

// zh/en authored; vi/ja intentionally omitted -- resolved via tr() fallback (vi->en, ja->en).
const heroCta = {
  sample: { zh: '一鍵申請樣品', en: 'REQUEST SAMPLE', vi: 'YÊU CẦU MẪU', ja: 'サンプル請求' } as L,
  manufacturing: { zh: '製造能力', en: 'Manufacturing' } as L,
  supplyChain: { zh: '供應鏈韌性', en: 'Supply Chain Resilience' } as L,
}

const footprint = {
  heading: { zh: '集團版圖', en: 'Global footprint' } as L,
  vietnam: {
    name: { zh: '越南 · 北寧', en: 'Vietnam · Bac Ninh' } as L,
    desc: { zh: '精密磁材加工　2,000 噸／年', en: 'Precision magnet processing　2,000 MT/year' } as L,
    badge: { zh: '量產中', en: 'In production' } as L,
  },
  china: {
    name: { zh: '中國', en: 'China' } as L,
    desc: { zh: '母公司華殷集團生產基地', en: 'Parent group manufacturing base' } as L,
    badge: { zh: '集團據點', en: 'Group site' } as L,
  },
  india: {
    name: { zh: '印度 · 清奈', en: 'India · Chennai' } as L,
    desc: { zh: '生產中心', en: 'Production centre' } as L,
    badge: { zh: '建設中', en: 'Under construction' } as L,
  },
  // De-politicized 2026-07-16 (group risk decision, all locales): see
  // translation-drafts/depoliticization-master.md.
  note: {
    zh: 'SINOWIN 依托集團跨國製造網絡，整合越南、中國、印度的資源與經驗，為客戶提供彈性的產能與供應選擇。',
    en: 'SINOWIN draws on a multinational manufacturing network across Vietnam, China, and India, giving customers flexible capacity and sourcing options.',
  } as L,
  link: { zh: '了解供應鏈韌性', en: 'Supply chain resilience' } as L,
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const titles: Record<Locale, string> = {
    zh: 'SINOWIN INDUSTRIAL (VN) — 越南精密磁材加工',
    en: 'SINOWIN INDUSTRIAL (VN) — Precision Magnet Processing in Vietnam',
    vi: 'SINOWIN INDUSTRIAL (VN) — Gia công nam châm chính xác tại Việt Nam',
    ja: 'SINOWIN INDUSTRIAL (VN) — ベトナムの精密磁石加工',
  }
  // De-politicized 2026-07-16 (group risk decision, all locales): see
  // translation-drafts/depoliticization-master.md.
  const descs: Record<Locale, string> = {
    zh: '年產能 2,000 噸，多國供應鏈佈局，ISO 9001 / ISO 14001 / ISO 45001 認證。越南精密磁材代工首選。',
    en: '2,000 MT/year capacity, multi-region supply chain, ISO 9001/14001/45001 certified. Vietnam\'s leading precision magnet contract manufacturer.',
    vi: 'Công suất 2.000 tấn/năm, chuỗi cung ứng đa khu vực, chứng nhận ISO 9001/14001/45001.',
    ja: '年産2,000トン、多地域サプライチェーン、ISO 9001/14001/45001認証取得。ベトナムの精密磁石加工。',
  }
  return { title: titles[lang], description: descs[lang] }
}

const T = {
  eyebrow: { zh: '越南垂直整合磁材製造商', en: 'Vertically Integrated Magnet Manufacturer in Vietnam', vi: 'Nhà sản xuất nam châm tích hợp dọc tại Việt Nam', ja: 'ベトナムの垂直統合型磁石メーカー' },
  certTitle: { zh: '認證與管理體系', en: 'Certifications & Management Systems', vi: 'Chứng nhận & Hệ thống quản lý', ja: '認証・管理システム' },
  obtained: { zh: '已獲取', en: 'Obtained', vi: 'Đã đạt được', ja: '取得済み' },
  verifying: { zh: '審核中', en: 'Under Audit', vi: 'Đang được đánh giá', ja: '審査中' },
  contactTitle: { zh: '越南基地定位', en: 'Vietnam Site Location', vi: 'Vị trí cơ sở Việt Nam', ja: 'ベトナム拠点の所在地' },
  addrCompany: 'SINOWIN INDUSTRIAL(VN)CO.,LTD',
  addrFull: 'Lot B3, B4, B5, Dinh Tram Industrial Park, Nenh Ward, Bac Ninh Province, Vietnam',
}

function tr(obj: Partial<Record<Locale, string>> | string, lang: Locale): string {
  if (typeof obj === 'string') return obj
  return obj[lang] ?? obj.en ?? ''
}

type LocalizedText = Partial<Record<Locale, string>>
const PRODUCTS: { flag: string; country: LocalizedText; tagline: LocalizedText; bullets?: LocalizedText[]; desc?: LocalizedText }[] = [
  {
    flag: '🇨🇳',
    country: { zh: '中國', en: 'China', vi: 'Trung Quốc', ja: '中国' },
    tagline: { zh: '製造規模與成本優勢', en: 'Scale & Cost Advantage', vi: 'Lợi thế quy mô & chi phí', ja: '規模とコストの優位性' },
    bullets: [
      { zh: '完整產業鏈', en: 'Complete supply chain', vi: 'Chuỗi cung ứng hoàn chỉnh', ja: '完全なサプライチェーン' },
      { zh: '生產規模大', en: 'Large production scale', vi: 'Quy mô sản xuất lớn', ja: '大規模な生産能力' },
      { zh: '適合大量標準毛胚', en: 'Suited for high-volume standard blanks', vi: 'Phù hợp phôi tiêu chuẩn số lượng lớn', ja: '大量の標準ブランクに適合' },
    ],
  },
  {
    flag: '🇯🇵',
    country: { zh: '日本', en: 'Japan', vi: 'Nhật Bản', ja: '日本' },
    tagline: { zh: '高品質與一致性', en: 'High Quality & Consistency', vi: 'Chất lượng cao & nhất quán', ja: '高品質と一貫性' },
    bullets: [
      { zh: '材料純度高', en: 'High material purity', vi: 'Độ tinh khiết vật liệu cao', ja: '高い材料純度' },
      { zh: '製程穩定', en: 'Stable processes', vi: 'Quy trình ổn định', ja: '安定した工程' },
      { zh: '嚴謹品管文化', en: 'Rigorous QC culture', vi: 'Văn hóa kiểm soát chất lượng nghiêm ngặt', ja: '厳格な品質管理文化' },
    ],
  },
  {
    flag: '🇻🇳',
    country: { zh: '越南', en: 'Vietnam', vi: 'Việt Nam', ja: 'ベトナム' },
    tagline: { zh: '具競爭力的供應基地', en: 'Competitive Supply Base', vi: 'Cơ sở cung ứng cạnh tranh', ja: '競争力のある供給拠点' },
    bullets: [
      { zh: '關稅與區位優勢', en: 'Tariff & regional advantage', vi: 'Lợi thế thuế quan & vị trí khu vực', ja: '関税・立地上の優位性' },
      { zh: '勞動力具彈性', en: 'Flexible labor force', vi: 'Lực lượng lao động linh hoạt', ja: '柔軟な労働力' },
      { zh: '在地垂直整合產能', en: 'Local vertically-integrated capacity', vi: 'Năng lực tích hợp dọc tại chỗ', ja: '現地垂直統合生産能力' },
    ],
  },
  {
    flag: '🌍',
    country: { zh: '其他', en: 'Others', vi: 'Khác', ja: 'その他' },
    tagline: { zh: '全球潛力據點佈局', en: 'Emerging Global Sites', vi: 'Bố trí địa điểm tiềm năng toàn cầu', ja: 'グローバル潜在拠点の展開' },
    desc: {
      zh: '持續開發印度、馬來西亞、澳洲、歐洲與美洲據點，強化供應鏈韌性與貼近終端市場的服務能力。',
      en: 'Continuously developing sites in India, Malaysia, Australia, Europe and the Americas to strengthen supply-chain resilience and stay close to end markets.',
      vi: 'Liên tục phát triển các địa điểm tại Ấn Độ, Malaysia, Úc, châu Âu và châu Mỹ để tăng cường khả năng phục hồi chuỗi cung ứng.',
      ja: 'インド、マレーシア、オーストラリア、欧州、米州での拠点開発を継続し、サプライチェーンの強靭性とエンドマーケットへの近接性を強化しています。',
    },
  },
]

// Overrides Sanity's homepageContent.supplyChainTitle/supplyChainBody, which
// still contain the pre-2026-07-16 political framing ("helping customers
// avoid long-arm jurisdiction and geopolitical compliance risks"). No Sanity
// write token is configured in this environment (same constraint as
// src/lib/localWorkshops.ts and the manufacturing page's INTRO_TEXT), so this
// is a code-level override to stop showing the old text immediately; the
// underlying CMS fields still hold the old copy until someone with Studio
// access (or a write token) updates them, at which point this override
// should be removed. See translation-drafts/depoliticization-master.md.
// Same constraint as SUPPLY_CHAIN_TRUST_OVERRIDE below: overrides Sanity's
// homepageContent.heroSubtitle, which still says "去中化設備專線 / China-free
// supply chain" (found after the initial scan -- a second Sanity field
// carrying the same old framing, separate from supplyChainTitle/Body).
const HERO_SUBTITLE_OVERRIDE: L = {
  zh: '年產能 2,000 噸・多國供應鏈佈局・ISO 9001 / ISO 14001 / ISO 45001 認證',
  en: '2,000 MT/year capacity · Multi-region supply chain · ISO 9001 / ISO 14001 / ISO 45001 certified',
  vi: 'Công suất 2.000 tấn/năm · Chuỗi cung ứng đa khu vực · Chứng nhận ISO 9001 / ISO 14001 / ISO 45001',
  ja: '年産2,000トン・多地域サプライチェーン・ISO 9001 / ISO 14001 / ISO 45001認証',
}

const SUPPLY_CHAIN_TRUST_OVERRIDE = {
  eyebrow: { zh: '供應鏈彈性', en: 'Supply chain flexibility', vi: 'Tính linh hoạt của chuỗi cung ứng', ja: 'サプライチェーンの柔軟性' } as L,
  title: { zh: '獨立設備專線', en: 'Independent Equipment Line' } as L,
  body: {
    zh: 'SINOWIN 核心製程（機加工、充磁、測試）採用獨立設備專線，可依客戶需求彈性配置供應來源。SINOWIN 團隊橫跨越南、印度、台灣與新加坡，工程與管理人才不集中於單一國家，為客戶提供不受單一人力市場波動影響的穩定支援。',
    en: "SINOWIN's core processes (machining, magnetizing, testing) run on an independent equipment line, with sourcing configured flexibly to each customer's requirements. The SINOWIN team spans Vietnam, India, Taiwan, and Singapore — engineering and management talent is not concentrated in any single country, giving customers stable support that isn't exposed to volatility in any one labor market.",
  } as L,
}

export default async function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const [home, certifications] = await Promise.all([getHomepageContent(), getCertifications()])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SINOWIN INDUSTRIAL (VN)',
            url: 'https://www.sinowin-vn.com',
            email: 'info@sinowin-vn.com',
            telephone: '+84 204 3727 010',
            logo: 'https://www.sinowin-vn.com/assets/logo-sn.png',
            sameAs: [
              'https://vn.linkedin.com/company/sinowin-industrial-vietnam-co-ltd',
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Lot B3, B4, B5 (For Rent Factory No. 1, 1A of Phu Loc Construction Production – Trade Joint Stock Company), Dinh Tram Industrial Park, Nenh Ward',
              addressRegion: 'Bac Ninh Province',
              postalCode: '26169',
              addressCountry: 'VN',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 21.2515782,
              longitude: 106.1284738,
            },
            hasMap: 'https://maps.app.goo.gl/xz3Jg3GKseWbNmtk9',
          }),
        }}
      />

      {/* Hero */}
      <section className="relative hero-gradient pt-16 md:pt-24 pb-16 md:pb-20 overflow-hidden text-left">
        {/* Decorative background: faint grid texture + concentric rings (pulsing, see .hero-ring) — purely decorative, sits behind the z-10 text.
            These were previously ellipses (ry = rx * 1.3), which read as stretched/deformed rather than true circles -- now perfect circles. */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          <svg
            className="absolute -right-16 md:right-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[560px] md:h-[560px] opacity-[0.14]"
            viewBox="0 0 400 400"
            fill="none"
          >
            {[40, 85, 130, 175, 220].map((r, i) => (
              <circle key={r} className="hero-ring" cx="200" cy="200" r={r} stroke="#2dd4bf" strokeWidth="1" style={{ animationDelay: `${i * 0.5}s` }} />
            ))}
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-400/10 border border-teal-400/20 text-teal-300 text-xs font-black rounded-full mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            {tr(T.eyebrow, lang)}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            {t(home?.heroTitle, lang)}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl font-medium leading-relaxed mb-10">
            {t(HERO_SUBTITLE_OVERRIDE, lang)}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a
              href={`/${lang}#sample-request-section`}
              className="btn-cta inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium uppercase text-sm tracking-wide"
              style={{ background: '#0FBF9B', color: '#04231C' }}
            >
              {tr(heroCta.sample, lang)}
            </a>
            <Link
              href={`/${lang}/manufacturing`}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-sm border-[0.5px] border-[#39414F] hover:border-[#4A5364] text-[#B8C0CC] transition-colors"
            >
              {tr(heroCta.manufacturing, lang)}
            </Link>
            <Link
              href={`/${lang}/about#supply-chain`}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-sm border-[0.5px] border-[#39414F] hover:border-[#4A5364] text-[#B8C0CC] transition-colors"
            >
              {tr(heroCta.supplyChain, lang)}
            </Link>
          </div>
        </div>
      </section>

      {/* Global Footprint -- a factual disclosure of group sites (incl. the
          China parent-group base), not a promotional button. See spec:
          compliance buyers who find the China connection via due-diligence
          databases on their own read an undisclosed one as concealment;
          disclosing it here reads as transparency instead. */}
      <section id="footprint" className="py-16 md:py-24" style={{ background: '#0A0D14' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-10 text-white">{tr(footprint.heading, lang)}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden" style={{ background: '#171C26', border: '1px solid #39414F' }}>
              <div className="h-32 relative">
                <Image src="/assets/workshops/vietnam-site.webp" alt="Vietnam Site" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-black text-lg mb-2" style={{ color: '#FFFFFF' }}>{tr(footprint.vietnam.name, lang)}</h3>
                <p className="text-sm mb-5" style={{ color: '#8A93A3' }}>{tr(footprint.vietnam.desc, lang)}</p>
                <span className="inline-flex items-center px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest" style={{ background: '#E8EDF4', color: '#0F131A' }}>
                  {tr(footprint.vietnam.badge, lang)}
                </span>
              </div>
            </div>
            <div className="rounded-xl p-6" style={{ background: '#12161F', border: '0.5px solid #1F2530' }}>
              <h3 className="font-black text-lg mb-2" style={{ color: '#B8C0CC' }}>{tr(footprint.china.name, lang)}</h3>
              <p className="text-sm mb-5" style={{ color: '#79818F' }}>{tr(footprint.china.desc, lang)}</p>
              <span className="inline-flex items-center px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest" style={{ background: '#1A1F2A', color: '#7E8593' }}>
                {tr(footprint.china.badge, lang)}
              </span>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ background: '#12161F', border: '0.5px solid #1F2530' }}>
              <div className="h-32 relative grayscale opacity-60">
                <Image src="/assets/workshops/india-site.jpg" alt="India Site" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-black text-lg mb-2" style={{ color: '#B8C0CC' }}>{tr(footprint.india.name, lang)}</h3>
                <p className="text-sm mb-5" style={{ color: '#79818F' }}>{tr(footprint.india.desc, lang)}</p>
                <span className="inline-flex items-center px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest" style={{ background: '#1A1F2A', color: '#7E8593' }}>
                  {tr(footprint.india.badge, lang)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderTop: '1px solid #1F2530' }}>
            <p className="text-sm max-w-2xl" style={{ color: '#8A93A3' }}>{tr(footprint.note, lang)}</p>
            <Link
              href={`/${lang}/about#supply-chain`}
              className="shrink-0 text-sm font-bold transition-colors"
              style={{ color: '#8A93A3' }}
            >
              {tr(footprint.link, lang)} →
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="system" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 hero-gradient opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-black mb-12 tracking-tight">{tr(T.certTitle, lang)}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, i) => {
              const img = urlForImage(cert.badgeImage)?.width(200).url()
              return (
                <div
                  key={cert.certId}
                  className={`hover-lift enter-fade relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center group hover:z-50 cursor-pointer ${!cert.confirmed ? 'grayscale opacity-60 hover:grayscale-0' : ''}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="h-20 flex items-center justify-center mb-4 relative">
                    {img ? (
                      <Image src={img} alt={cert.name} fill className="object-contain transition-transform duration-500 group-hover:scale-150" />
                    ) : (
                      <span className="text-slate-500 text-xs font-black">{cert.name}</span>
                    )}
                  </div>
                  <h4 className="text-sm font-black text-white mb-1">{cert.name}</h4>
                  <p className={`text-[9px] font-bold uppercase ${cert.confirmed ? 'text-teal-400' : 'text-slate-500'}`}>
                    {cert.confirmed ? tr(T.obtained, lang) : tr(T.verifying, lang)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

       {/* Supply Chain / China-Free differentiation */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl md:rounded-[3rem] text-white relative overflow-hidden p-8 sm:p-10 md:p-14"
            style={{ background: 'linear-gradient(135deg, #0b1220 0%, #0f172a 45%, #022c22 100%)' }}
          >
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-xs font-black rounded-full mb-6 uppercase tracking-widest">
                {t(SUPPLY_CHAIN_TRUST_OVERRIDE.eyebrow, lang)}
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">{t(SUPPLY_CHAIN_TRUST_OVERRIDE.title, lang)}</h2>
              <p className="text-lg leading-relaxed text-emerald-50/90 font-medium max-w-2xl">{t(SUPPLY_CHAIN_TRUST_OVERRIDE.body, lang)}</p>

              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  {
                    label: { zh: '機加工', en: 'Machining', vi: 'Gia công cơ khí', ja: '機械加工' },
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8a4 4 0 100 8 4 4 0 000-8Z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.4 13.5a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V19.5a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H4.5a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09A1.65 1.65 0 0011 3.09V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1Z"
                        />
                      </svg>
                    ),
                  },
                  {
                    label: { zh: '充磁', en: 'Magnetizing', vi: 'Từ hóa', ja: '磁化' },
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M13 2 3 14h7l-1 8 11-14h-7l1-6Z" />
                      </svg>
                    ),
                  },
                  {
                    label: { zh: '測試', en: 'Testing', vi: 'Kiểm tra', ja: 'テスト' },
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.5l2 2 4-4.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.5h10a1 1 0 011 1V5a1 1 0 01-1 1H7a1 1 0 01-1-1v-.5a1 1 0 011-1Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 5.2A3 3 0 004 8v10a3 3 0 003 3h10a3 3 0 003-3V8a3 3 0 00-2-2.8" />
                      </svg>
                    ),
                  },
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-400/15 text-teal-200 text-xs font-black uppercase tracking-wide"
                  >
                    {tag.icon}
                    {tag.label[lang]}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 mx-auto md:mx-0">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-teal-400/10 border border-teal-400/20 flex items-center justify-center">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4" className="globe-spin w-24 h-24 md:w-32 md:h-32 text-teal-300">
                  <circle cx="50" cy="50" r="38" />
                  <ellipse cx="50" cy="50" rx="16" ry="38" />
                  <path d="M12 50h76" />
                  <path d="M17 32c8 6 58 6 66 0" />
                  <path d="M17 68c8-6 58-6 66 0" />
                </svg>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Products / Sourcing & risk diversification */}
      <section id="products" className="py-16 md:py-24 bg-white border-y border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-900 mb-10 border-l-4 border-slate-900 pl-6">
            {lang === 'zh' ? '材料來源與風險分散佈局' : lang === 'vi' ? 'Nguồn nguyên liệu & Chiến lược phân tán rủi ro' : lang === 'ja' ? '材料調達とリスク分散配置' : 'Material Sourcing & Risk Diversification'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p, i) => (
              <div key={p.flag} className="hover-lift enter-fade bg-slate-50 rounded-3xl p-8 border border-slate-200" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="text-3xl mb-3">{p.flag}</div>
                <h3 className="font-black text-slate-900 text-lg mb-1">{tr(p.country, lang)}</h3>
                <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mb-4">{tr(p.tagline, lang)}</p>
                {p.bullets ? (
                  <ul className="space-y-1 text-xs text-slate-500 font-medium">
                    {p.bullets.map((b) => <li key={tr(b, lang)}>• {tr(b, lang)}</li>)}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{tr(p.desc!, lang)}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 p-10 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-y-2 border-emerald-200/50 rounded-3xl text-center">
            <p className="text-slate-700 font-medium max-w-3xl mx-auto">
              {/* De-politicized 2026-07-16 (group risk decision): "geopolitical
                  risk" -> "single-source risk", still framed as multi-region
                  diversification. See translation-drafts/depoliticization-master.md. */}
              {lang === 'zh'
                ? '透過中國、日本與越南等多國毛胚來源配置，並持續評估印度、馬來西亞、澳洲、歐洲與美洲等潛力據點，SINOWIN 為客戶建立不受單一供應來源風險影響的供應韌性。'
                : lang === 'vi'
                ? 'Thông qua việc bố trí nguồn phôi từ Trung Quốc, Nhật Bản và Việt Nam, đồng thời liên tục đánh giá các địa điểm tiềm năng như Ấn Độ, Malaysia, Úc và châu Âu/Mỹ, SINOWIN xây dựng khả năng phục hồi chuỗi cung ứng không phụ thuộc vào một nguồn cung duy nhất.'
                : lang === 'ja'
                ? '中国・日本・ベトナムなど複数国からの原材料調達と、インド・マレーシア・オーストラリア・欧米など潜在拠点の継続評価により、SINOWINは単一の調達先に左右されない供給の強靭性を構築しています。'
                : 'Through blank/raw-material sourcing across China, Japan, and Vietnam, and by continuously evaluating potential sites in India, Malaysia, Australia, Europe, and the Americas, SINOWIN builds supply resilience that is not dependent on any single sourcing region.'}
            </p>
          </div>
        </div>
      </section>

      {/* Industry Insights teaser -> links to /articles (avoids duplicating the Blog modal) */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl md:rounded-[3rem] relative overflow-hidden text-white text-center p-10 sm:p-12 md:p-16"
            style={{ background: 'linear-gradient(135deg, #020617 0%, #1e293b 55%, #0f172a 100%)' }}
          >
            {/* Circuit-board decoration: static trace lines + a traveling
                dash simulating a signal, slow node pulses. Hidden on mobile
                (cramped + not worth the extra paint on small screens);
                pure CSS animation, gated by prefers-reduced-motion in globals.css. */}
            <div className="absolute inset-0 pointer-events-none select-none hidden md:block" aria-hidden="true">
              <svg viewBox="0 0 800 280" className="w-full h-full text-teal-300" fill="none" preserveAspectRatio="xMidYMid slice">
                <g stroke="currentColor" strokeWidth="1.2" opacity="0.22">
                  <path d="M50 50 L50 140 L130 140" />
                  <path d="M130 140 L130 220 L60 220" />
                  <path d="M750 60 L750 150 L670 150" />
                  <path d="M670 150 L670 230 L740 230" />
                  <path d="M400 30 L400 80" />
                  <path d="M400 250 L400 200" />
                </g>
                <g stroke="currentColor" strokeWidth="1.6" opacity="0.65">
                  <path className="circuit-flow" d="M50 50 L50 140 L130 140" style={{ animationDelay: '0s' }} />
                  <path className="circuit-flow" d="M130 140 L130 220 L60 220" style={{ animationDelay: '-2s' }} />
                  <path className="circuit-flow" d="M750 60 L750 150 L670 150" style={{ animationDelay: '-4s' }} />
                  <path className="circuit-flow" d="M670 150 L670 230 L740 230" style={{ animationDelay: '-1s' }} />
                </g>
                <g fill="currentColor">
                  {[
                    [50, 50, 0],
                    [130, 140, 0.5],
                    [60, 220, 1.1],
                    [750, 60, 0.3],
                    [670, 150, 0.8],
                    [740, 230, 1.4],
                    [400, 30, 0.6],
                    [400, 250, 1.0],
                  ].map(([cx, cy, delay], i) => (
                    <circle key={i} className="circuit-node" cx={cx} cy={cy} r="3.5" style={{ animationDelay: `${-delay}s` }} />
                  ))}
                </g>
              </svg>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-black mb-4">
                {lang === 'zh' ? '產業洞察' : lang === 'vi' ? 'Tin tức ngành' : lang === 'ja' ? '業界インサイト' : 'Industry Insights'}
              </h2>
              <p className="text-slate-400 mb-8">
                {lang === 'zh' ? '探索磁材科技的最前沿應用' : lang === 'vi' ? 'Khám phá các ứng dụng tiên tiến nhất của công nghệ vật liệu từ' : lang === 'ja' ? '磁性材料技術の最先端応用を探る' : 'Explore the latest applications in magnet material technology'}
              </p>
              <Link
                href={`/${lang}/articles`}
                className="btn-cta inline-flex items-center justify-center px-8 py-3.5 rounded-full font-black uppercase bg-teal-600 hover:bg-teal-500 text-white text-sm"
              >
                {lang === 'zh' ? '閱讀文章' : lang === 'vi' ? 'Đọc bài viết' : lang === 'ja' ? '記事を読む' : 'Read Articles'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <PartnersStrip lang={lang} />

      {/* Br/Hcj grade table + calculator */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BrHcjTool lang={lang} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24 bg-white overflow-hidden text-left border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-8 lg:p-16 shadow-2xl grid md:grid-cols-2 gap-10 border border-white/5">
            <div>
              <h2 className="text-3xl font-black text-white mb-1">{tr(T.contactTitle, lang)}</h2>
              <p className="text-slate-400 text-sm font-medium mb-6">Vietnam Site Positioning</p>
              <a
                className="map-interactive-wrapper mb-8 block group"
                href="https://maps.app.goo.gl/9NJcn9pakADQJF2y5?g_st=ipc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.3496350714775!2d106.0683058760431!3d21.2179836812604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313509930f785555%3A0x6739665f80b2a752!2sSINOWIN%20Industrial%20(Vietnam)%20Co.%2C%20Ltd.!5e0!3m2!1szh-TW!2svn!4v1735874200000!5m2!1szh-TW!2svn"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </a>
              <p className="text-white font-bold text-lg mb-1">{T.addrCompany}</p>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">{T.addrFull}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Email</p>
              <a href="mailto:info@sinowin-vn.com" className="text-lg font-black text-teal-400 mb-6">info@sinowin-vn.com</a>
              <ContactForm lang={lang} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
