import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { locales, type Locale } from '@/lib/i18n'
import { siteContent } from '@/content/site'
import BrHcjTool from '@/components/BrHcjTool'

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
          <p className="text-lg text-slate-400 max-w-2xl font-medium leading-relaxed">
            {home.hero.subtitle[lang]}
          </p>
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
              <Link href={`/${lang}/manufacturing`} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group relative">
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
                <div key={cert.id} className={`relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center group hover:z-50 cursor-pointer ${!cert.confirmed ? 'grayscale opacity-60 hover:grayscale-0' : ''}`}>
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
            <div className="flex flex-col justify-center">
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Email</p>
              <a href="mailto:info@sinowin-vn.com" className="text-2xl font-black text-teal-400">info@sinowin-vn.com</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
