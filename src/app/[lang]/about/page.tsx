import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  return {
    title: lang === 'zh' ? '關於我們 — SINOWIN' : lang === 'vi' ? 'Về chúng tôi — SINOWIN' : lang === 'ja' ? '会社概要 — SINOWIN' : 'About Us — SINOWIN',
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

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const c = content

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '3rem 2rem' }}>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: lang === 'zh' ? '關於 SINOWIN' : 'About SINOWIN',
        url: `https://www.sinowin-vn.com/${lang}/about`,
      })}} />

      {/* Hero */}
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
        {lang === 'zh' ? '關於 SINOWIN' : lang === 'vi' ? 'Về SINOWIN' : lang === 'ja' ? 'SINOWINについて' : 'About SINOWIN'}
      </h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '720px', lineHeight: 1.8, marginBottom: '2rem', fontWeight: 500 }}>
        {c.hero[lang]}
      </p>
      <p style={{ maxWidth: '720px', lineHeight: 1.9, color: 'var(--color-muted)', marginBottom: '1.5rem' }}>{c.p1[lang]}</p>
      <p style={{ maxWidth: '720px', lineHeight: 1.9, color: 'var(--color-muted)', marginBottom: '1.5rem' }}>{c.p2[lang]}</p>
      <p style={{ maxWidth: '720px', lineHeight: 1.9, color: 'var(--color-muted)', marginBottom: '1.5rem' }}>{c.p3[lang]}</p>
      <p style={{ maxWidth: '720px', lineHeight: 1.9, color: 'var(--color-muted)', marginBottom: '3rem' }}>{c.p4[lang]}</p>

      {/* What We Focus On / Don't */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        {c.focusOn.title[lang]} / {c.dontDo.title[lang]}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-accent)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>What We Focus On</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>{c.focusOn.title[lang]}</div>
          {c.focusOn.items[lang].map((item: string) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>
              <span style={{ color: '#10b981', fontSize: '0.6rem' }}>●</span>{item}
            </div>
          ))}
        </div>
        <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', color: '#ef4444', marginBottom: '0.75rem', textTransform: 'uppercase' }}>What We Don't</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>{c.dontDo.title[lang]}</div>
          {c.dontDo.items[lang].map((item: string) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>
              <span style={{ color: '#ef4444', fontSize: '0.6rem' }}>●</span>{item}
            </div>
          ))}
        </div>
      </div>

      {/* Manufacturing System */}
      <div style={{ background: 'var(--color-surface)', borderRadius: '12px', padding: '2rem', marginBottom: '3rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Manufacturing System</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>{c.manufacturing.title[lang]}</h2>
        <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>{c.manufacturing.subtitle[lang]}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {c.manufacturing.cards.map((card) => (
            <div key={card.label} style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{card.label}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{card.title[lang]}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>{card.body[lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
