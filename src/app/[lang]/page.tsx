import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { locales, type Locale } from '@/lib/i18n'
import { siteContent } from '@/content/site'
import BrHcjTool from '@/components/BrHcjTool'
import CareersModal from '@/components/CareersModal'
import PartnersStrip from '@/components/PartnersStrip'
import ContactForm from '@/components/ContactForm'

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
  const descs: Record<Locale, string> = {
    zh: '年產能 2,000 噸，去中化設備專線，ISO 9001 / ISO 14001 / ISO 45001 認證。越南精密磁材代工首選。',
    en: '2,000 MT/year capacity, China-free supply chain, ISO 9001/14001/45001 certified. Vietnam\'s leading precision magnet contract manufacturer.',
    vi: 'Công suất 2.000 tấn/năm, chuỗi cung ứng không liên quan Trung Quốc, chứng nhận ISO 9001/14001/45001.',
    ja: '年産2,000トン、中国フリーサプライチェーン、ISO 9001/14001/45001認証取得。ベトナムの精密磁石加工。',
  }
  return { title: titles[lang], description: descs[lang] }
}

const s = siteContent

const CERT_IMAGES: Record<string, string> = {
  iso9001: '/assets/workshops/iso-9001.webp',
  iso14001: '/assets/workshops/iso-14001.webp',
  iso45001: '/assets/workshops/iso-45001.webp',
  qc080000: '/assets/workshops/qc-080000.webp',
}

const T = {
  eyebrow: { zh: '越南垂直整合磁材製造商', en: 'Vertically Integrated Magnet Manufacturer in Vietnam', vi: 'Nhà sản xuất nam châm tích hợp dọc tại Việt Nam', ja: 'ベトナムの垂直統合型磁石メーカー' },
  networkTitle: { zh: '全球製造基地佈局', en: 'Global Manufacturing Network', vi: 'Mạng lưới sản xuất toàn cầu', ja: 'グローバル製造ネットワーク' },
  networkLead: { zh: 'SINOWIN 致力於構建具備高度韌性的供應鏈。目前已在越南北寧建立成熟產線，並積極佈建印度清奈生產中心。', en: 'SINOWIN is building a highly resilient supply chain — an established production line in Bac Giang, Vietnam, and an upcoming site in Chennai, India.', vi: 'SINOWIN đang xây dựng chuỗi cung ứng có khả năng phục hồi cao — dây chuyền sản xuất tại Bắc Giang, Việt Nam và cơ sở sắp tới tại Chennai, Ấn Độ.', ja: 'SINOWINはベトナム・バクザンの確立された生産ラインと、インド・チェンナイの新拠点により、強靭なサプライチェーンを構築しています。' },
  vietnamName: { zh: '越南北寧', en: 'Bac Giang, Vietnam', vi: 'Bắc Giang, Việt Nam', ja: 'ベトナム・バクザン' },
  vietnamAddr: 'Lots B3, B4, B5, Dinh Tram Industrial Park, Bac Giang',
  indiaName: { zh: '印度清奈', en: 'Chennai, India', vi: 'Chennai, Ấn Độ', ja: 'インド・チェンナイ' },
  indiaAddr: { zh: '建設中 | Tamil Nadu, India', en: 'Construction in progress | Tamil Nadu, India', vi: 'Đang xây dựng | Tamil Nadu, Ấn Độ', ja: '建設中 | タミル・ナードゥ州、インド' },
  vietnamCardTitle: { zh: '越南北寧基地', en: 'Bac Giang, Vietnam Site', vi: 'Cơ sở Bắc Giang, Việt Nam', ja: 'ベトナム・バクザン拠点' },
  vietnamCardDesc: { zh: '機加工全製程包含各項異型研磨，多元表面處理工藝，全方位充磁組裝，實現海外全品項滿足供應。', en: 'Full machining process including custom-profile grinding, diverse surface treatments, and complete magnetizing/assembly for full overseas supply.', vi: 'Quy trình gia công đầy đủ bao gồm mài biên dạng tùy chỉnh, xử lý bề mặt đa dạng và từ hóa/lắp ráp hoàn chỉnh.', ja: '異形研削、多様な表面処理、充磁・組立まで一貫した加工プロセス。' },
  viewTour: { zh: '進入 SINOWIN', en: 'Enter SINOWIN', vi: 'Vào SINOWIN', ja: 'SINOWINへ' },
  massProduction: { zh: '量產中', en: 'Mass Production', vi: 'Sản xuất hàng loạt', ja: '量産中' },
  indiaCardTitle: { zh: '印度清奈基地', en: 'Chennai, India Site', vi: 'Cơ sở Chennai, Ấn Độ', ja: 'インド・チェンナイ拠点' },
  indiaCardDesc: { zh: '預計 2026 年夏季啟用，擴大對南亞市場的高端供應能力。', en: 'Expected to launch summer 2026, expanding high-end supply capability to the South Asian market.', vi: 'Dự kiến ra mắt mùa hè 2026, mở rộng năng lực cung ứng cao cấp cho thị trường Nam Á.', ja: '2026年夏稼働予定。南アジア市場への高付加価値供給能力を拡大。' },
  underConstruction: { zh: '建設中', en: 'Under Construction', vi: 'Đang xây dựng', ja: '建設中' },
  certTitle: { zh: '認證與管理體系', en: 'Certifications & Management Systems', vi: 'Chứng nhận & Hệ thống quản lý', ja: '認証・管理システム' },
  obtained: { zh: '已獲取', en: 'Obtained', vi: 'Đã đạt được', ja: '取得済み' },
  verifying: { zh: '驗證中', en: 'Verifying', vi: 'Đang xác minh', ja: '認証中' },
  contactTitle: { zh: '越南基地定位', en: 'Vietnam Site Location', vi: 'Vị trí cơ sở Việt Nam', ja: 'ベトナム拠点の所在地' },
  addrCompany: 'SINOWIN INDUSTRIAL(VN)CO.,LTD',
  addrFull: 'Lots B3, B4, B5, Dinh Tram Industrial Park, Nenh Ward, Bac Giang Province, Vietnam',
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
      { zh: '關稅與地緣優勢', en: 'Tariff & geopolitical advantage', vi: 'Lợi thế thuế quan & địa chính trị', ja: '関税・地政学上の優位性' },
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

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const home = s.home

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
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Dinh Tram Industrial Park, Nenh Ward',
              addressRegion: 'Bac Giang Province',
              addressCountry: 'VN',
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative hero-gradient pt-16 md:pt-24 pb-16 md:pb-20 overflow-hidden text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-400/10 border border-teal-400/20 text-teal-300 text-xs font-black rounded-full mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            {tr(T.eyebrow, lang)}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            {home.hero.title[lang]}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl font-medium leading-relaxed mb-10">
            {home.hero.subtitle[lang]}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <CareersModal lang={lang} />
            <a
              href="https://www.yensonic.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta inline-flex items-center justify-center px-8 py-3.5 rounded-full font-black uppercase bg-teal-600 hover:bg-teal-500 text-white text-sm"
            >
              {lang === 'zh' ? '中國生產基地' : lang === 'vi' ? 'Cơ sở sản xuất Trung Quốc' : lang === 'ja' ? '中国生産拠点' : 'China Production Base'}
            </a>
            <a
              href="https://www.phoneingroup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta inline-flex items-center justify-center px-8 py-3.5 rounded-full font-black uppercase bg-sky-600 hover:bg-sky-500 text-white text-sm"
            >
              {lang === 'zh' ? '了解華殷集團' : lang === 'vi' ? 'Về Phonein Group' : lang === 'ja' ? 'Phonein Groupについて' : 'About Phonein Group'}
            </a>
          </div>
        </div>
      </section>

      {/* Global Manufacturing Network */}
      <section id="about" className="py-16 md:py-24 bg-white relative overflow-hidden text-left border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
                {tr(T.networkTitle, lang)}
                <span className="block text-lg font-medium text-slate-400 mt-1">Global Manufacturing Network</span>
              </h2>
              <p className="text-lg leading-relaxed font-medium text-slate-600 mb-6">{tr(T.networkLead, lang)}</p>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-800 text-lg">{tr(T.vietnamName, lang)}</p>
                    <p className="text-xs text-slate-500 font-bold tracking-tight">{T.vietnamAddr}</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-800 text-lg">{tr(T.indiaName, lang)}</p>
                    <p className="text-xs text-slate-500 font-bold tracking-tight italic text-amber-600">{tr(T.indiaAddr, lang)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href={`/${lang}/manufacturing`} className="hover-lift bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group relative">
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                  <Image src="/assets/workshops/vietnam-site.webp" alt="Vietnam Site" fill className="object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute top-3 left-3 bg-teal-600 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase z-10">{tr(T.massProduction, lang)}</div>
                </div>
                <div className="p-6">
                  <h4 className="font-black text-slate-900 mb-2">{tr(T.vietnamCardTitle, lang)}</h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">{tr(T.vietnamCardDesc, lang)}</p>
                </div>
              </Link>

              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group grayscale">
                <div className="h-48 bg-slate-200 relative">
                  <Image src="/assets/workshops/india-site.jpg" alt="India Site" fill className="object-cover opacity-70" />
                  <div className="absolute top-3 left-3 bg-slate-800 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase">{tr(T.underConstruction, lang)}</div>
                </div>
                <div className="p-6 text-slate-400 italic">
                  <h4 className="font-black text-slate-500 mb-2">{tr(T.indiaCardTitle, lang)}</h4>
                  <p className="text-xs text-slate-400 font-bold leading-relaxed">{tr(T.indiaCardDesc, lang)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="system" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 hero-gradient opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-black mb-12 tracking-tight">{tr(T.certTitle, lang)}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {s.certifications.map((cert) => {
              const img = CERT_IMAGES[cert.id]
              return (
                <div key={cert.id} className={`hover-lift relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center group hover:z-50 cursor-pointer ${!cert.confirmed ? 'grayscale opacity-60 hover:grayscale-0' : ''}`}>
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

      {/* Products / Sourcing & risk diversification */}
      <section id="products" className="py-16 md:py-24 bg-white border-y border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-900 mb-10 border-l-4 border-slate-900 pl-6">
            {lang === 'zh' ? '材料來源與風險分散佈局' : lang === 'vi' ? 'Nguồn nguyên liệu & Chiến lược phân tán rủi ro' : lang === 'ja' ? '材料調達とリスク分散配置' : 'Material Sourcing & Risk Diversification'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.flag} className="hover-lift bg-slate-50 rounded-3xl p-8 border border-slate-200">
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
              {lang === 'zh'
                ? '透過中國、日本與越南等多國毛胚來源配置，並持續評估印度、馬來西亞、澳洲、歐洲與美洲等潛力據點，SINOWIN 為客戶建立不受單一地緣政治風險影響的供應韌性。'
                : lang === 'vi'
                ? 'Thông qua việc bố trí nguồn phôi từ Trung Quốc, Nhật Bản và Việt Nam, đồng thời liên tục đánh giá các địa điểm tiềm năng như Ấn Độ, Malaysia, Úc và châu Âu/Mỹ, SINOWIN xây dựng khả năng phục hồi chuỗi cung ứng không phụ thuộc vào một rủi ro địa chính trị duy nhất.'
                : lang === 'ja'
                ? '中国・日本・ベトナムなど複数国からの原材料調達と、インド・マレーシア・オーストラリア・欧米など潜在拠点の継続評価により、SINOWINは単一の地政学リスクに左右されない供給の強靭性を構築しています。'
                : 'Through blank/raw-material sourcing across China, Japan, and Vietnam, and by continuously evaluating potential sites in India, Malaysia, Australia, Europe, and the Americas, SINOWIN builds supply resilience that is not dependent on any single geopolitical risk.'}
            </p>
          </div>
        </div>
      </section>

      {/* Industry Insights teaser -> links to /articles (avoids duplicating the Blog modal) */}
      <section className="py-16 md:py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-4">
            {lang === 'zh' ? '產業洞察' : lang === 'vi' ? 'Tin tức ngành' : lang === 'ja' ? '業界インサイト' : 'Industry Insights'}
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            {lang === 'zh' ? '探索磁材科技的最前沿應用' : lang === 'vi' ? 'Khám phá các ứng dụng tiên tiến nhất của công nghệ vật liệu từ' : lang === 'ja' ? '磁性材料技術の最先端応用を探る' : 'Explore the latest applications in magnet material technology'}
          </p>
          <Link
            href={`/${lang}/articles`}
            className="btn-cta inline-flex items-center justify-center px-8 py-3.5 rounded-full font-black uppercase bg-teal-600 hover:bg-teal-500 text-white text-sm"
          >
            {lang === 'zh' ? '閱讀文章' : lang === 'vi' ? 'Đọc bài viết' : lang === 'ja' ? '記事を読む' : 'Read Articles'}
          </Link>
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
