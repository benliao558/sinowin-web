import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { t } from '@/sanity/lib/localize'
import Breadcrumb from '@/components/Breadcrumb'
import AboutReveal from '@/components/about/AboutReveal'
import HeroStats, { type HeroStat } from '@/components/about/HeroStats'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

// De-politicized 2026-07-16 (group risk decision, all locales): removed
// "strategic mineral export control" framing, replaced with neutral
// multi-region supply chain language. See translation-drafts/depoliticization-master.md.
const META_DESCRIPTION: Partial<Record<Locale, string>> = {
  zh: 'SINOWIN 越南廠：異形磁鐵與高複雜度製造，並建有獨立設備產線，2026 Q4 就緒，提供多國供應鏈彈性選擇。',
  en: 'SINOWIN Vietnam: custom-shaped magnets and high-complexity manufacturing, plus an independent equipment line ready Q4 2026, offering multi-region supply chain flexibility.',
  vi: 'SINOWIN Việt Nam: sản xuất nam châm hình dạng tùy chỉnh và độ phức tạp cao, cùng dây chuyền thiết bị độc lập sẵn sàng vào quý 4/2026, mang đến các lựa chọn linh hoạt cho chuỗi cung ứng đa khu vực.',
  ja: 'SINOWINベトナム工場：異形磁石と高複雑度の製造に対応し、独立設備ラインが2026年第4四半期に稼働開始予定。多地域にわたるサプライチェーンの柔軟な選択肢を提供します。',
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
  eyebrow: { zh: '供應鏈彈性', en: 'Supply chain flexibility', vi: 'Tính linh hoạt của chuỗi cung ứng', ja: 'サプライチェーンの柔軟性' } as L,
  h2: {
    zh: '兩條產線。由您決定哪一條接您的單。',
    en: 'Two production lines. You choose which one runs your order.',
    vi: 'Hai dây chuyền sản xuất. Bạn quyết định dây chuyền nào nhận đơn hàng của mình.',
    ja: '2つの生産ライン。どちらでご注文をお受けするかはお客様次第です。',
  } as L,
  lead: {
    zh: '多數供應商只給你一條供應鏈、一種風險。我們建了第二條，讓合規需求不必變成採購難題。',
    en: "Most suppliers give you one supply chain and one risk profile. We built a second line so compliance requirements don't have to become a sourcing problem.",
    vi: 'Hầu hết nhà cung cấp chỉ có một chuỗi cung ứng, một hồ sơ rủi ro duy nhất. Chúng tôi đã xây dựng thêm một dây chuyền thứ hai để yêu cầu tuân thủ không còn là bài toán khó trong việc tìm nguồn cung ứng.',
    ja: '多くのサプライヤーは、単一のサプライチェーンと単一のリスクプロファイルしか提供できません。SINOWINは第二の生産ラインを構築し、コンプライアンス要件が調達上の課題にならないようにしました。',
  } as L,
  standard: {
    title: { zh: '主力產線', en: 'Standard line', vi: 'Dây chuyền chủ lực', ja: '主力ライン' } as L,
    badge: { zh: '常態產線', en: 'Default', vi: 'Mặc định', ja: '標準' } as L,
    body: {
      zh: '採用業界標準設備，在成本與交期上維持競爭力。多數訂單由此產線生產。',
      en: 'Industry-standard equipment, competitive on cost and lead time. This line runs most orders.',
      vi: 'Sử dụng thiết bị tiêu chuẩn ngành, duy trì tính cạnh tranh về chi phí và thời gian giao hàng. Phần lớn đơn hàng được sản xuất trên dây chuyền này.',
      ja: '業界標準の設備を採用し、コストとリードタイムにおいて競争力を維持しています。大半のご注文はこのラインで生産されます。',
    } as L,
  },
  // De-politicized 2026-07-16 (group risk decision, all locales): was
  // "chinaFree" / "去中化產線" -- renamed and reframed as a neutral
  // independent-equipment-line narrative, no China-specific framing.
  // See translation-drafts/depoliticization-master.md.
  independentLine: {
    title: { zh: '獨立設備專線', en: 'Independent equipment line', vi: 'Dây chuyền thiết bị độc lập', ja: '独立設備ライン' } as L,
    badge: { zh: '2026 Q4 就緒', en: 'Ready Q4 2026', vi: 'Sẵn sàng Q4/2026', ja: '2026年Q4稼働予定' } as L,
    body: {
      zh: '機加工、充磁、測試三大核心製程採獨立設備配置，可依客戶需求彈性調整供應來源。設備已完成採購，預計 2026 年 10 月到廠，第四季完成調機與試產。',
      en: 'Machining, magnetizing, and testing run on an independently configured equipment line, with sourcing adjusted flexibly to customer requirements. Equipment is on order, with delivery expected October 2026 and commissioning through Q4.',
      vi: 'Ba quy trình cốt lõi — gia công cơ khí, từ hóa và kiểm tra — được vận hành trên một dây chuyền thiết bị cấu hình độc lập, với nguồn cung được điều chỉnh linh hoạt theo yêu cầu khách hàng. Thiết bị đã được đặt mua, dự kiến đến nhà máy vào tháng 10/2026 và hoàn tất lắp đặt, chạy thử trong quý 4/2026.',
      ja: '機械加工・着磁・検査の3つの中核工程は独立して構成された設備ラインで稼働し、調達はお客様のご要件に応じて柔軟に調整されます。設備はすでに発注済みで、2026年10月の到着を予定しており、第4四半期中に調整・試作を完了します。',
    } as L,
  },
  // Replaces the old "timeline" (heading "Why now" + countdown + three
  // dated events referencing specific PRC regulations/enforcement dates).
  // De-politicized version keeps only the neutral, self-controlled fact
  // (equipment arrival + Q4 readiness) as a single paragraph -- no
  // regulation names, no enforcement dates, no countdown. Heading text
  // finalized by Ben 2026-07-16, applies to all four locales explicitly
  // (not fallback) since it's now a fixed cross-language term.
  deployment: {
    heading: { zh: '供應鏈彈性', en: 'Supply chain flexibility', vi: 'Tính linh hoạt của chuỗi cung ứng', ja: 'サプライチェーンの柔軟性' } as L,
    body: {
      zh: '獨立設備專線預計 2026 年 10 月到廠，第四季完成安裝與試產，為貴公司的供應鏈增加一個選項。若貴公司正在尋找備援方案或希望讓供應來源多元化，現在是適合展開討論的時間點——我們可以配合貴公司的規劃安排評估時程。',
      en: "Our independent equipment line is expected to arrive on site in October 2026, with installation and trial production completed in Q4 — adding another option to your supply chain. If you're looking for backup capacity or want to diversify your sourcing, this is a good time to start the conversation — we can align the evaluation timeline with your own planning.",
      vi: 'Dây chuyền thiết bị độc lập dự kiến đến nhà máy vào tháng 10/2026 và hoàn tất lắp đặt, chạy thử trong quý 4/2026, bổ sung thêm một lựa chọn cho chuỗi cung ứng của quý công ty. Nếu quý công ty đang tìm phương án dự phòng hoặc muốn đa dạng hóa nguồn cung, đây là thời điểm phù hợp để bắt đầu trao đổi — chúng tôi có thể sắp xếp lịch trình đánh giá phù hợp với kế hoạch của quý công ty.',
      ja: '独立設備ラインは2026年10月の到着を予定しており、第4四半期中に設置と試作を完了し、貴社のサプライチェーンに新たな選択肢を追加します。バックアップ体制の確保や調達の多様化をご検討中であれば、今が相談を始める良いタイミングです——評価スケジュールを貴社のご計画に合わせて調整いたします。',
    } as L,
    note: {
      zh: '時程以設備到廠與驗證進度為準，我們會在專案評估時同步更新。',
      en: "Timelines are subject to equipment delivery and validation progress. We'll keep you updated during project scoping.",
      vi: 'Lịch trình có thể thay đổi tùy theo tiến độ giao thiết bị và xác nhận thực tế. Chúng tôi sẽ cập nhật đồng thời trong quá trình đánh giá dự án.',
      ja: '納期は設備の到着状況と検証の進捗により変動する場合があります。プロジェクト評価の過程で随時最新情報をお知らせします。',
    } as L,
  },
  cta: {
    question: { zh: '您要的是價格，還是供應鏈彈性？', en: 'Price, or supply chain flexibility — which are you optimizing for?', vi: 'Bạn ưu tiên giá cả, hay tính linh hoạt của chuỗi cung ứng?', ja: '価格を優先しますか、それともサプライチェーンの柔軟性を優先しますか？' } as L,
    button: { zh: '開始洽詢', en: 'Start an enquiry', vi: 'Bắt đầu liên hệ', ja: 'お問い合わせを開始' } as L,
  },
}

// FAQPage JSON-LD Q&A -- was hardcoded English-only for all 4 locales (a
// genuine gap found 2026-07-19: JSON-LD is machine-read, but still ought to
// match the page's own language rather than always serving English to
// vi/ja/zh crawlers). vi/ja are draft translations pending Ben's review,
// same as the rest of this round's translations.
const faqJsonLd: { question: L; answer: L }[] = [
  {
    question: {
      zh: 'SINOWIN 是否提供彈性的供應鏈選擇？',
      en: 'Does SINOWIN offer flexible supply chain options?',
      vi: 'SINOWIN có cung cấp các lựa chọn linh hoạt cho chuỗi cung ứng không?',
      ja: 'SINOWINは柔軟なサプライチェーンの選択肢を提供していますか？',
    },
    answer: {
      zh: 'SINOWIN 有兩條產線。主力產線採用業界標準設備，在成本與交期上維持競爭力。另一條獨立設備專線涵蓋機加工、充磁與測試，已完成採購，預計 2026 年 10 月到廠，第四季完成調機。時程以設備到廠與驗證進度為準。',
      en: 'SINOWIN operates two production lines. The standard line uses industry-standard equipment and remains competitive on cost and lead time. A separate independent equipment line, covering machining, magnetizing, and testing, has been ordered with delivery expected October 2026 and commissioning through Q4 2026. Timelines are subject to equipment delivery and validation progress.',
      vi: 'SINOWIN vận hành hai dây chuyền sản xuất. Dây chuyền tiêu chuẩn sử dụng thiết bị đạt chuẩn ngành và duy trì tính cạnh tranh về chi phí cũng như thời gian giao hàng. Một dây chuyền thiết bị độc lập riêng biệt, bao gồm gia công cơ khí, từ hóa và kiểm tra, đã được đặt mua với thời gian giao hàng dự kiến vào tháng 10/2026 và hoàn tất lắp đặt trong quý 4/2026. Lịch trình có thể thay đổi tùy theo tiến độ giao thiết bị và xác nhận thực tế.',
      ja: 'SINOWINは2つの生産ラインを運営しています。標準ラインは業界標準の設備を使用し、コストとリードタイムにおいて競争力を維持しています。機械加工・着磁・検査を含む独立した設備ラインは別途発注済みで、2026年10月の納入、2026年第4四半期中の稼働開始を予定しています。納期は設備の到着状況と検証の進捗により変動する場合があります。',
    },
  },
  {
    question: {
      zh: '獨立設備專線涵蓋哪些製程？',
      en: 'Which processes are covered by the independent equipment line?',
      vi: 'Dây chuyền thiết bị độc lập bao gồm những quy trình nào?',
      ja: '独立設備ラインはどの工程をカバーしていますか？',
    },
    answer: {
      zh: '獨立設備專線涵蓋三大核心製程：機加工、充磁與測試。',
      en: 'The independent equipment line covers three core processes: machining, magnetizing, and testing.',
      vi: 'Dây chuyền thiết bị độc lập bao gồm ba quy trình cốt lõi: gia công cơ khí, từ hóa và kiểm tra.',
      ja: '独立設備ラインは、機械加工・着磁・検査という3つの中核工程をカバーしています。',
    },
  },
  {
    question: {
      zh: '為什麼現在就該開始評估供應鏈，而不是等到之後？',
      en: 'Why should we start supply chain scoping now rather than later?',
      vi: 'Vì sao nên bắt đầu đánh giá chuỗi cung ứng ngay bây giờ thay vì sau này?',
      ja: 'なぜ今からサプライチェーンの検討を始めるべきなのですか？',
    },
    answer: {
      zh: '合規稽核、送樣與驗證通常需要數月時間。若貴司希望在 2026 年第四季前增加供應鏈彈性或分散供應來源，建議現在就開始評估，時程可與我們的產線調機排程對齊。',
      en: "Compliance audit, sampling, and validation typically take several months. Buyers who want to add supply chain flexibility or diversify sourcing before Q4 2026 should begin scoping now, so the timeline aligns with our line's commissioning schedule.",
      vi: 'Việc kiểm toán tuân thủ, lấy mẫu và xác nhận thường mất vài tháng. Người mua muốn tăng tính linh hoạt cho chuỗi cung ứng hoặc đa dạng hóa nguồn cung trước quý 4/2026 nên bắt đầu đánh giá ngay từ bây giờ, để lịch trình phù hợp với tiến độ vận hành dây chuyền của chúng tôi.',
      ja: 'コンプライアンス監査、サンプリング、検証には通常数ヶ月かかります。2026年第4四半期より前にサプライチェーンの柔軟性を高めたい、または調達を多様化したいバイヤー様は、今から検討を開始することで、当社ラインの稼働スケジュールに合わせることができます。',
    },
  },
  {
    question: {
      zh: 'SINOWIN 位於哪裡？',
      en: 'Where is SINOWIN located?',
      vi: 'SINOWIN đặt tại đâu?',
      ja: 'SINOWINはどこにありますか？',
    },
    answer: {
      zh: 'SINOWIN Industrial (Vietnam) Co., Ltd. 是位於越南北寧省的精密磁材加工廠，年加工產能 2,000 噸。',
      en: 'SINOWIN Industrial (Vietnam) Co., Ltd. is a precision magnet processing facility in Bac Ninh Province, Vietnam, with 2,000 metric tons of annual processing capacity.',
      vi: 'SINOWIN Industrial (Vietnam) Co., Ltd. là cơ sở gia công nam châm chính xác tại tỉnh Bắc Ninh, Việt Nam, với công suất gia công 2.000 tấn mỗi năm.',
      ja: 'SINOWIN Industrial (Vietnam) Co., Ltd.は、ベトナム・バクニン省にある精密磁石加工拠点で、年間加工能力は2,000トンです。',
    },
  },
]

const heroStatsContent: { value: number; decimals?: number; comma?: boolean; unit?: string; label: L }[] = [
  { value: 2000, comma: true, label: { zh: '噸／年加工產能', en: 'MT/year processing capacity', vi: 'tấn/năm công suất gia công', ja: 'トン/年 加工能力' } },
  { value: 0.005, decimals: 3, unit: 'mm', label: { zh: '平行度公差', en: 'Parallelism tolerance', vi: 'Dung sai độ song song', ja: '平行度公差' } },
  { value: 200, unit: '°C', label: { zh: 'EH 高溫等級', en: 'EH high-temp grade', vi: 'Cấp chịu nhiệt cao EH', ja: 'EH高温グレード' } },
  { value: 2, label: { zh: '條獨立產線', en: 'independent production lines', vi: 'dây chuyền sản xuất độc lập', ja: '独立生産ライン' } },
]

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
        name: lang === 'zh' ? '關於 SINOWIN' : lang === 'vi' ? 'Về SINOWIN' : lang === 'ja' ? 'SINOWINについて' : 'About SINOWIN',
        url: `https://www.sinowin-vn.com/${lang}/about`,
      })}} />
      {/* De-politicized 2026-07-16 (group risk decision): this JSON-LD is
          machine-read by search/AI engines, so the old China-specific
          regulatory framing here was higher-risk than the same words in
          on-page copy. See translation-drafts/depoliticization-master.md. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqJsonLd.map((qa) => ({
          '@type': 'Question',
          name: t(qa.question, lang),
          acceptedAnswer: { '@type': 'Answer', text: t(qa.answer, lang) },
        })),
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
              <h2 className="text-2xl font-black mb-2" style={{ color: '#E4E9F2' }}>
                {lang === 'zh' ? '關於 SINOWIN' : lang === 'vi' ? 'Về SINOWIN' : lang === 'ja' ? 'SINOWINについて' : 'About SINOWIN'}
              </h2>
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
      <section id="supply-chain" className="py-16 md:py-24" style={{ borderTop: '1px solid #1F2530' }}>
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
                  <h3 className="text-lg font-black mb-3 text-white">{t(supplyChain.independentLine.title, lang)}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#8A93A3' }}>{t(supplyChain.independentLine.body, lang)}</p>
                  <span
                    className="inline-flex items-center px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest"
                    style={{ background: '#E8EDF4', color: '#0F131A' }}
                  >
                    {t(supplyChain.independentLine.badge, lang)}
                  </span>
                </div>
              </div>
            </div>
          </AboutReveal>

          <AboutReveal index={5}>
            <div className="mt-10 rounded-[2rem] p-6 sm:p-10" style={{ background: '#10141C', border: '1px solid #222833' }}>
              <h3 className="text-lg font-black flex items-center gap-2.5 text-white mb-6">
                <span className="w-2 h-6 rounded-full inline-block" style={{ background: 'rgba(255,255,255,0.4)' }} />
                {t(supplyChain.deployment.heading, lang)}
              </h3>

              <p className="text-sm leading-relaxed mb-4" style={{ color: '#E4E9F2' }}>{t(supplyChain.deployment.body, lang)}</p>
              <p className="text-xs leading-relaxed pt-4" style={{ color: '#6B7280', borderTop: '1px solid #1F2530' }}>{t(supplyChain.deployment.note, lang)}</p>
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
