import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { t } from '@/sanity/lib/localize'
import Breadcrumb from '@/components/Breadcrumb'
import AboutReveal from '@/components/about/AboutReveal'
import HeroStats, { type HeroStat } from '@/components/about/HeroStats'
import Countdown from '@/components/about/Countdown'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

const META_DESCRIPTION: Partial<Record<Locale, string>> = {
  zh: 'SINOWIN 越南廠：異形磁鐵與高複雜度製造，並建有去中化產線，2026 Q4 就緒，因應戰略礦產出口管制與供應鏈合規需求。',
  en: 'SINOWIN Vietnam: custom-shaped magnets and high-complexity manufacturing, plus a China-free production line ready Q4 2026 to meet strategic mineral export control and supply chain compliance requirements.',
}

const BREADCRUMB_LABEL: Record<Locale, string> = { zh: '關於我們', en: 'About', vi: 'Về chúng tôi', ja: '会社概要' }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  return {
    title: lang === 'zh' ? '關於我們 — SINOWIN' : lang === 'vi' ? 'Về chúng tôi — SINOWIN' : lang === 'ja' ? '会社概要 — SINOWIN' : 'About Us — SINOWIN',
    description: t(META_DESCRIPTION, lang),
    alternates: { canonical: `https://www.sinowin-vn.com/${lang}/about` },
  }
}

const content = {
  hero: {
    zh: 'Sinowin 專注於在高複雜度的製造環境中，持續交付穩定且可預期的結果。',
    en: 'Sinowin focuses on consistently delivering stable and predictable results in highly complex manufacturing environments.',
    vi: 'Sinowin tập trung vào việc liên tục cung cấp kết quả ổn định và có thể dự đoán trong môi trường sản xuất có độ phức tạp cao.',
    ja: 'Sinowisは、高度に複雑な製造環境において、安定した予測可能な結果を継続的に提供することに注力しています。',
  },
  p1: {
    zh: '在磁材產業中，多數供應商傾向選擇結構單純、製程成熟的產品，因為風險較低、擴產較快。我們選擇了不同的方向——專注於異形磁鐵與高度客製化的產品。這類產品在成形、燒結、加工與檢測各階段，對製程控制與一致性都有更高要求，同時也伴隨更高的失敗成本。',
    en: 'In the magnet industry, most suppliers prefer structurally simple, process-mature products due to lower risk and faster scale-up. We chose a different direction — focusing on custom-shaped magnets and highly customized products. These products demand greater process control and consistency at every stage of forming, sintering, machining, and inspection, with correspondingly higher failure costs.',
    vi: 'Trong ngành nam châm, hầu hết các nhà cung cấp ưu tiên các sản phẩm đơn giản về cấu trúc và quy trình trưởng thành vì rủi ro thấp hơn và mở rộng quy mô nhanh hơn. Chúng tôi đã chọn một hướng khác — tập trung vào nam châm hình dạng tùy chỉnh và sản phẩm được tùy chỉnh cao.',
    ja: '磁石業界では、ほとんどのサプライヤーはリスクが低くスケールアップが速いため、構造がシンプルでプロセスが成熟した製品を好みます。私たちは異なる方向を選びました——カスタム形状の磁石と高度にカスタマイズされた製品に焦点を当てています。',
  },
  p2: {
    zh: '我們之所以能長期投入這些挑戰，並非因為它們容易，而是因為我們建立了一套能承受複雜度的製造體系。從材料選擇、關鍵製程參數設定，到批次間的穩定性管理，我們更關注的是結果是否可被重複與驗證，而不是短期產量的最大化。',
    en: 'Our ability to sustain commitment to these challenges comes not from the ease of the work, but from the manufacturing system we have built to absorb complexity. From material selection and critical process parameter setup to inter-batch stability management, our focus is on whether results can be reproduced and verified — not on maximizing short-term output.',
    vi: 'Khả năng của chúng tôi để duy trì cam kết với những thách thức này không phải từ sự dễ dàng của công việc, mà từ hệ thống sản xuất chúng tôi đã xây dựng để hấp thụ sự phức tạp.',
    ja: 'これらの課題への長期的なコミットメントを維持できるのは、作業の容易さからではなく、複雑さを吸収するために構築した製造システムからです。',
  },
  p3: {
    zh: '在供應鏈層面，Sinowin 採取國際垂直整合的運作模式。這不只是跨地點的分工，而是將材料、製程與品質標準統一在同一套管理邏輯之下。對客戶而言，這代表更少的溝通介面、更清楚的責任歸屬，以及在不同國家與產能配置下，仍能維持一致的品質行為。',
    en: 'At the supply chain level, Sinowin operates an internationally vertically integrated model. This is not merely cross-site division of labor, but unifying materials, processes, and quality standards under a single management logic. For customers, this means fewer communication interfaces, clearer accountability, and consistent quality behavior across different countries and capacity configurations.',
    vi: 'Ở cấp độ chuỗi cung ứng, Sinowin vận hành mô hình tích hợp dọc quốc tế. Đây không chỉ là phân công lao động đa địa điểm, mà là thống nhất vật liệu, quy trình và tiêu chuẩn chất lượng dưới một logic quản lý duy nhất.',
    ja: 'サプライチェーンレベルでは、Sinowisは国際的に垂直統合されたモデルを運営しています。これは単なるクロスサイトの分業ではなく、材料、プロセス、品質基準を単一の管理ロジックの下に統合するものです。',
  },
  p4: {
    zh: '我們相信，真正有價值的製造，不在於單次表現，而在於當條件改變、規模放大、時間拉長之後，結果依然可靠。這正是 Sinowin 持續專注並不斷精進的方向。',
    en: 'We believe that truly valuable manufacturing lies not in single performance, but in reliable results even as conditions change, scale expands, and time passes. This is the direction Sinowin continues to focus on and refine.',
    vi: 'Chúng tôi tin rằng sản xuất thực sự có giá trị không nằm ở hiệu suất đơn lẻ, mà ở kết quả đáng tin cậy ngay cả khi điều kiện thay đổi, quy mô mở rộng và thời gian trôi qua.',
    ja: '真に価値ある製造とは、単一のパフォーマンスではなく、条件が変化し、規模が拡大し、時間が経過しても信頼できる結果にあると私たちは信じています。',
  },
  focusOn: {
    title: { zh: '專注項目', en: 'What We Focus On', vi: 'Những gì chúng tôi tập trung', ja: '注力項目' },
    items: {
      zh: ['高複雜度與異形磁鐵產品', '可重複、可驗證的製造結果', '跨國但一致的品質行為', '以長期合作為前提的製造決策'],
      en: ['High-complexity and custom-shaped magnet products', 'Reproducible and verifiable manufacturing results', 'Consistent quality behavior across countries', 'Manufacturing decisions premised on long-term partnership'],
      vi: ['Sản phẩm nam châm phức tạp và hình dạng tùy chỉnh', 'Kết quả sản xuất có thể tái tạo và xác minh', 'Hành vi chất lượng nhất quán xuyên quốc gia', 'Quyết định sản xuất dựa trên hợp tác dài hạn'],
      ja: ['高複雑度およびカスタム形状磁石製品', '再現可能で検証可能な製造結果', '国境を越えた一貫した品質行動', '長期的パートナーシップを前提とした製造決定'],
    },
  },
  dontDo: {
    title: { zh: '不做的事', en: "What We Don't", vi: 'Những gì chúng tôi không làm', ja: 'やらないこと' },
    items: {
      zh: ['不以最低價格作為競爭核心', '不承接超出製程可控範圍的需求', '不將品質風險留到客戶端解決'],
      en: ['We do not compete on lowest price', 'We do not accept orders beyond our process control capability', 'We do not leave quality risks for customers to resolve'],
      vi: ['Chúng tôi không cạnh tranh bằng giá thấp nhất', 'Chúng tôi không chấp nhận đơn hàng vượt quá khả năng kiểm soát quy trình', 'Chúng tôi không để lại rủi ro chất lượng cho khách hàng giải quyết'],
      ja: ['最低価格での競争はしません', 'プロセス管理能力を超えた注文は受けません', '品質リスクを顧客側に残しません'],
    },
  },
  manufacturing: {
    title: { zh: '以系統承受複雜度', en: 'Absorbing Complexity Through Systems', vi: 'Hấp thụ sự phức tạp thông qua hệ thống', ja: 'システムで複雑さを吸収する' },
    subtitle: { zh: '從材料、參數到批次穩定性，以一致的管理邏輯確保結果可重複、可驗證。', en: 'From materials and parameters to batch stability — consistent management logic ensures reproducible, verifiable results.', vi: 'Từ vật liệu, thông số đến độ ổn định lô — logic quản lý nhất quán đảm bảo kết quả có thể tái tạo và xác minh.', ja: '材料、パラメータからバッチ安定性まで——一貫した管理ロジックで再現可能・検証可能な結果を保証します。' },
    cards: [
      { label: 'MATERIAL', title: { zh: '選材策略', en: 'Material Strategy', vi: 'Chiến lược vật liệu', ja: '選材戦略' }, body: { zh: '以可控與一致性為前提。', en: 'Premised on controllability and consistency.', vi: 'Dựa trên khả năng kiểm soát và nhất quán.', ja: '制御可能性と一貫性を前提として。' } },
      { label: 'PROCESS', title: { zh: '參數治理', en: 'Parameter Governance', vi: 'Quản trị thông số', ja: 'パラメータガバナンス' }, body: { zh: '關鍵點明確、可追溯。', en: 'Key points defined and traceable.', vi: 'Các điểm chính được xác định và có thể truy xuất.', ja: '重要なポイントが定義され追跡可能。' } },
      { label: 'QUALITY BEHAVIOR', title: { zh: '跨國一致', en: 'Cross-Country Consistency', vi: 'Nhất quán xuyên quốc gia', ja: '国境を越えた一貫性' }, body: { zh: '標準一致、責任清楚，降低溝通成本與品質不確定性。', en: 'Unified standards and clear accountability reduce communication costs and quality uncertainty.', vi: 'Tiêu chuẩn thống nhất và trách nhiệm rõ ràng giảm chi phí giao tiếp và sự không chắc chắn về chất lượng.', ja: '統一された基準と明確な説明責任でコミュニケーションコストと品質の不確かさを低減。' } },
      { label: 'OPERATING MODEL', title: { zh: '國際垂直整合', en: 'International Vertical Integration', vi: 'Tích hợp dọc quốc tế', ja: '国際垂直統合' }, body: { zh: '將材料、製程與品質標準統一在同一套管理邏輯之下。', en: 'Unifying materials, processes, and quality standards under a single management logic.', vi: 'Thống nhất vật liệu, quy trình và tiêu chuẩn chất lượng dưới một logic quản lý duy nhất.', ja: '材料、プロセス、品質基準を単一の管理ロジックの下に統合。' } },
    ],
  },
}

// zh/en authored; vi/ja intentionally omitted -- resolved via t() fallback (vi->en, ja->en).
type L = Partial<Record<Locale, string>>
const supplyChain = {
  eyebrow: { zh: '供應鏈韌性', en: 'Supply chain resilience' } as L,
  h2: { zh: '兩條產線。由您決定哪一條接您的單。', en: 'Two production lines. You choose which one runs your order.' } as L,
  lead: {
    zh: '多數供應商只給你一條供應鏈、一種風險。我們建了第二條，讓合規需求不必變成採購難題。',
    en: "Most suppliers give you one supply chain and one risk profile. We built a second line so compliance requirements don't have to become a sourcing problem.",
  } as L,
  standard: {
    title: { zh: '主力產線', en: 'Standard line' } as L,
    badge: { zh: '常態產線', en: 'Default' } as L,
    body: {
      zh: '採用業界標準設備，在成本與交期上維持競爭力。多數訂單由此產線生產。',
      en: 'Industry-standard equipment, competitive on cost and lead time. This line runs most orders.',
    } as L,
  },
  chinaFree: {
    title: { zh: '去中化產線', en: 'China-free line' } as L,
    badge: { zh: '2026 Q4 就緒', en: 'Ready Q4 2026' } as L,
    body: {
      zh: '機加工、充磁、測試三大核心製程不涉中國設備。設備已完成採購，預計 2026 年 10 月到廠，第四季完成調機與試產。',
      en: "No Chinese equipment in machining, magnetizing, or testing. Equipment is on order, with delivery expected October 2026 and commissioning through Q4.",
    } as L,
  },
  timeline: {
    heading: { zh: '為什麼是現在', en: 'Why now' } as L,
    countdown: {
      zh: '距 11 月執法啟動還有 {days} 天',
      en: '{days} days until November enforcement',
    } as L,
    events: [
      {
        month: { zh: '7 月', en: 'July' } as L,
        text: {
          zh: '中國商務部第 26 號公告生效，建立戰略礦產出口管制違規檢舉機制，可檢舉範圍包含經第三國轉運規避管制。',
          en: 'MOFCOM Announcement No. 26 takes effect, establishing a reporting mechanism for strategic mineral export control violations. Reportable conduct includes routing exports through third countries to circumvent controls.',
        } as L,
      },
      {
        month: { zh: '10 月', en: 'October' } as L,
        text: {
          zh: 'SINOWIN 去中化設備預計到廠，啟動調機與試產。',
          en: "SINOWIN's China-free equipment expected on site; commissioning begins.",
        } as L,
      },
      {
        // Split purely for inline emphasis styling (rule: 11 月 must read
        // heaviest) -- the concatenation lead+emphasis+rest is byte-for-byte
        // identical to the single-string version used before this visual pass.
        month: { zh: '11 月', en: 'November' } as L,
        lead: { zh: '中國域外管轄條款', en: "China's extraterritorial provisions " } as L,
        emphasis: { zh: '執法啟動', en: 'come into force' } as L,
        rest: {
          zh: '。使用中國原產受管制材料、且用於受限下游應用的製造商，可能面臨監管行動。',
          en: ' in November 2026. Manufacturers using Chinese-origin controlled materials in restricted downstream applications may face regulatory action.',
        } as L,
      },
    ],
    body: {
      zh: '合規稽核、送樣與驗證本來就需要數月。若貴司需在 11 月前完成供應鏈調整，現在是啟動評估的時間點——我們的產線就緒時程，可與您的導入排程對齊。',
      en: "Compliance audit, sampling, and validation take months regardless. If you need your supply chain resolved before November, this is the point to start scoping — our line comes online on the same timeline as your qualification cycle.",
    } as L,
    note: {
      zh: '時程以設備到廠與驗證進度為準，我們會在專案評估時同步更新。',
      en: "Timelines are subject to equipment delivery and validation progress. We'll keep you updated during project scoping.",
    } as L,
  },
  cta: {
    question: { zh: '您要的是價格，還是避險？', en: 'Price, or risk mitigation — which are you optimizing for?' } as L,
    button: { zh: '開始洽詢', en: 'Start an enquiry' } as L,
  },
}

const heroStatsContent: { value: number; decimals?: number; comma?: boolean; unit?: string; label: L }[] = [
  { value: 2000, comma: true, label: { zh: '噸／年加工產能', en: 'MT/year processing capacity' } },
  { value: 0.005, decimals: 3, unit: 'mm', label: { zh: '平行度公差', en: 'Parallelism tolerance' } },
  { value: 200, unit: '°C', label: { zh: 'EH 高溫等級', en: 'EH high-temp grade' } },
  { value: 2, label: { zh: '條獨立產線', en: 'independent production lines' } },
]

const TIMELINE_TEXT_COLOR: Record<number, string> = { 0: '#6A7180', 1: '#8A93A3', 2: '#FFFFFF' }
const TIMELINE_LINE_COLOR: Record<number, string> = { 0: '#262C37', 1: '#39414F', 2: '#FFFFFF' }

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const c = content
  const heroStats: HeroStat[] = heroStatsContent.map((s) => ({ ...s, label: t(s.label, lang) ?? '' }))

  return (
    <div className="about-page-bg text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: lang === 'zh' ? '關於 SINOWIN' : 'About SINOWIN',
        url: `https://www.sinowin-vn.com/${lang}/about`,
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Does SINOWIN offer a China-free supply chain option?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SINOWIN operates two production lines. The standard line uses industry-standard equipment and remains competitive on cost and lead time. A separate China-free line, covering machining, magnetizing, and testing, has been ordered with delivery expected October 2026 and commissioning through Q4 2026. Timelines are subject to equipment delivery and validation progress.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which processes are covered by the China-free line?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The China-free line covers three core processes: machining, magnetizing, and testing. No Chinese-origin equipment is used in these processes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why should we start supply chain scoping now rather than later?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "China's extraterritorial export control provisions come into force in November 2026. Manufacturers using Chinese-origin controlled materials in restricted downstream applications may face regulatory action. Compliance audit, sampling, and validation typically take several months, so buyers who need their supply chain resolved before November should begin scoping now.",
            },
          },
          {
            '@type': 'Question',
            name: 'Where is SINOWIN located?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SINOWIN Industrial (Vietnam) Co., Ltd. is a precision magnet processing facility in Bac Ninh Province, Vietnam, with 2,000 metric tons of annual processing capacity.',
            },
          },
        ],
      })}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb lang={lang} variant="dark" items={[{ label: BREADCRUMB_LABEL[lang] }]} />
      </div>

      {/* Hero */}
      <section className="relative pt-16 pb-16 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 text-xs font-black uppercase tracking-widest" style={{ color: '#6B7280' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#39414F' }} />
            SINOWIN | ABOUT
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white">
            {lang === 'zh' ? '關於華榮' : lang === 'vi' ? 'Về SINOWIN' : lang === 'ja' ? 'SINOWINについて' : 'About SINOWIN'}
          </h1>
          <p className="text-lg leading-relaxed font-medium max-w-2xl mb-10" style={{ color: '#8A93A3' }}>{c.hero[lang]}</p>

          <div className="relative h-px w-full max-w-2xl overflow-hidden mb-10" style={{ background: '#1F2530' }}>
            <span
              className="about-divider-scan absolute inset-y-0 w-1/5"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
            />
          </div>

          <AboutReveal index={0}>
            <HeroStats stats={heroStats} />
          </AboutReveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <AboutReveal index={1} className="lg:col-span-7">
            <article className="rounded-[2rem] p-8 sm:p-10 h-full" style={{ background: '#12161F', border: '1px solid #1F2530' }}>
              <h2 className="text-2xl font-black mb-2" style={{ color: '#E4E9F2' }}>About SINOWIN</h2>
              <div className="w-16 h-1.5 rounded-full mb-8" style={{ background: '#39414F' }} />
              <div className="space-y-6 text-[15px] sm:text-base leading-relaxed font-medium" style={{ color: '#8A93A3' }}>
                <p>{c.p1[lang]}</p>
                <p>{c.p2[lang]}</p>
                <p>{c.p3[lang]}</p>
                <p>{c.p4[lang]}</p>
              </div>
            </article>
          </AboutReveal>

          <AboutReveal index={2} className="lg:col-span-5">
            <aside className="space-y-6 h-full">
              <div className="rounded-[2rem] p-6 sm:p-7" style={{ background: '#12161F', border: '1px solid #1F2530' }}>
                <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#6B7280' }}>Manufacturing System</p>
                <h3 className="text-xl font-black mb-2" style={{ color: '#E4E9F2' }}>{c.manufacturing.title[lang]}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#8A93A3' }}>{c.manufacturing.subtitle[lang]}</p>
                <div className="grid grid-cols-2 gap-3">
                  {c.manufacturing.cards.map((card) => (
                    <div key={card.label} className="rounded-2xl p-4" style={{ background: '#171C26', border: '1px solid #39414F' }}>
                      <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#6B7280' }}>{card.label}</div>
                      <div className="font-black text-sm mb-1 text-white">{card.title[lang]}</div>
                      <div className="text-xs" style={{ color: '#8A93A3' }}>{card.body[lang]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </AboutReveal>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ borderTop: '1px solid #1F2530' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <AboutReveal index={3}>
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#E4E9F2' }}>{c.focusOn.title[lang]}</h2>
              <div className="space-y-0">
                {c.focusOn.items[lang].map((item: string) => (
                  <p
                    key={item}
                    className="pl-4 py-1 text-sm"
                    style={{ borderLeft: '2px solid #39414F', lineHeight: 2.1, color: '#8A93A3' }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </AboutReveal>
          <AboutReveal index={4}>
            <div>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#79818F' }}>{c.dontDo.title[lang]}</h2>
              <div className="space-y-0">
                {c.dontDo.items[lang].map((item: string) => (
                  <p
                    key={item}
                    className="pl-4 py-1 text-sm"
                    style={{ borderLeft: '2px solid #262C37', lineHeight: 2.1, color: '#6A7180' }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </AboutReveal>
        </div>
      </section>

      {/* Supply Chain Resilience */}
      <section className="py-16 md:py-24" style={{ borderTop: '1px solid #1F2530' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutReveal index={5}>
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#6B7280' }}>{t(supplyChain.eyebrow, lang)}</p>
            <h2 className="text-2xl md:text-3xl font-black mb-6 max-w-[30ch] text-white">{t(supplyChain.h2, lang)}</h2>
            <p className="text-base leading-relaxed font-medium max-w-[60ch] mb-10" style={{ color: '#8A93A3' }}>{t(supplyChain.lead, lang)}</p>
          </AboutReveal>

          <AboutReveal index={5}>
            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
              <div className="rounded-[2rem] p-6 sm:p-8" style={{ background: '#12161F', border: '1px solid #1F2530' }}>
                <h3 className="text-lg font-black mb-3 text-white">{t(supplyChain.standard.title, lang)}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#8A93A3' }}>{t(supplyChain.standard.body, lang)}</p>
                <span
                  className="inline-flex items-center px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest"
                  style={{ background: '#1A1F2A', color: '#7E8593' }}
                >
                  {t(supplyChain.standard.badge, lang)}
                </span>
              </div>
              <div
                className="about-china-free-card relative overflow-hidden rounded-[2rem] p-6 sm:p-8 transition-colors"
                style={{ background: '#171C26', border: '1px solid #2E4A43' }}
              >
                <div className="about-china-free-glow pointer-events-none absolute inset-0" />
                <div className="relative">
                  <h3 className="text-lg font-black mb-3 text-white">{t(supplyChain.chinaFree.title, lang)}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#8A93A3' }}>{t(supplyChain.chinaFree.body, lang)}</p>
                  <span
                    className="inline-flex items-center px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest"
                    style={{ background: '#E8EDF4', color: '#0F131A' }}
                  >
                    {t(supplyChain.chinaFree.badge, lang)}
                  </span>
                </div>
              </div>
            </div>
          </AboutReveal>

          <AboutReveal index={5}>
            <div className="mt-10 rounded-[2rem] p-6 sm:p-10" style={{ background: '#10141C', border: '1px solid #222833' }}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8">
                <h3 className="text-lg font-black flex items-center gap-2.5 text-white">
                  <span className="w-2 h-6 rounded-full inline-block" style={{ background: 'rgba(255,255,255,0.4)' }} />
                  {t(supplyChain.timeline.heading, lang)}
                </h3>
                <Countdown template={t(supplyChain.timeline.countdown, lang) ?? ''} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
                {supplyChain.timeline.events.map((ev, i) => {
                  const isNov = i === 2
                  return (
                    <div key={i} className="pl-3.5" style={{ borderLeft: `2px solid ${TIMELINE_LINE_COLOR[i]}` }}>
                      <div
                        className="font-black flex items-center gap-2"
                        style={{ color: TIMELINE_TEXT_COLOR[i], fontSize: isNov ? 17 : 14 }}
                      >
                        {isNov && <span className="about-pulse-dot inline-block w-[7px] h-[7px] rounded-full bg-white shrink-0" />}
                        {t(ev.month, lang)}
                      </div>
                      <div className="text-xs mt-1.5 leading-relaxed" style={{ color: i === 0 ? '#6A7180' : '#8A93A3' }}>
                        {isNov ? (
                          <>
                            {t(ev.lead, lang)}
                            <span style={{ color: '#FFFFFF', fontWeight: 500 }}>{t(ev.emphasis, lang)}</span>
                            {t(ev.rest, lang)}
                          </>
                        ) : (
                          t(ev.text, lang)
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color: '#E4E9F2' }}>{t(supplyChain.timeline.body, lang)}</p>
              <p className="text-xs leading-relaxed pt-4" style={{ color: '#6B7280', borderTop: '1px solid #1F2530' }}>{t(supplyChain.timeline.note, lang)}</p>
            </div>
          </AboutReveal>

          <AboutReveal index={5}>
            <div className="mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #1F2530' }}>
              <p className="font-bold text-sm sm:text-base" style={{ color: '#E4E9F2' }}>{t(supplyChain.cta.question, lang)}</p>
              <a
                href={`/${lang}#contact`}
                className="btn-cta shrink-0 inline-flex items-center justify-center px-6 py-3 font-black rounded-2xl transition shadow-xl active:scale-95 uppercase text-xs tracking-widest"
                style={{ background: '#0FBF9B', color: '#04231C' }}
              >
                {t(supplyChain.cta.button, lang)} →
              </a>
            </div>
          </AboutReveal>
        </div>
      </section>
    </div>
  )
}
