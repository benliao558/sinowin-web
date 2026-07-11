// All confirmed content from sinowin_內容缺口補完_2026-07-10.md
// and existing site pages. [TODO] markers = needs content from original files.

export const siteContent = {

  // ── COMPANY META ──────────────────────────────────────────────
  company: {
    name: {
      zh: 'SINOWIN INDUSTRIAL (VN)',
      en: 'SINOWIN INDUSTRIAL (VN)',
      vi: 'SINOWIN INDUSTRIAL (VN)',
      ja: 'SINOWIN INDUSTRIAL (VN)',
    },
    tagline: {
      zh: '越南精密磁材加工領導廠商',
      en: 'Precision Magnet Processing Leader in Vietnam',
      vi: 'Nhà gia công nam châm chính xác hàng đầu tại Việt Nam',
      ja: 'ベトナムにおける精密磁石加工のリーダー',
    },
    description: {
      zh: 'SINOWIN 由台灣磁材專業廠商 Phonein Group 與新加坡精密製造集團 TDConnex 合資成立，結合磁材專業與國際精密製造管理經驗，落地越南生產。',
      en: 'SINOWIN is a joint venture between Phonein Group (Taiwan magnet specialist) and TDConnex (Singapore precision manufacturing group), combining magnet expertise with international precision manufacturing experience in Vietnam.',
      vi: 'SINOWIN là liên doanh giữa Phonein Group (chuyên gia nam châm Đài Loan) và TDConnex (tập đoàn chế tạo chính xác Singapore), kết hợp chuyên môn nam châm với kinh nghiệm sản xuất chính xác quốc tế tại Việt Nam.',
      ja: 'SINOWINは台湾の磁石専門企業Phonein GroupとシンガポールのTDConnexの合弁会社で、磁石の専門知識と国際的な精密製造の経験をベトナムで組み合わせています。',
    },
  },

  // ── HOME PAGE ──────────────────────────────────────────────────
  home: {
    hero: {
      title: {
        zh: '越南精密磁材加工',
        en: 'Precision Magnet Processing in Vietnam',
        vi: 'Gia công nam châm chính xác tại Việt Nam',
        ja: 'ベトナムにおける精密磁石加工',
      },
      subtitle: {
        zh: '年產能 2,000 噸・去中化設備專線・ISO 9001 / ISO 14001 / ISO 45001 認證',
        en: '2,000 MT/year capacity · China-free supply chain · ISO 9001 / ISO 14001 / ISO 45001 certified',
        vi: 'Công suất 2.000 tấn/năm · Chuỗi cung ứng không liên quan Trung Quốc · Chứng nhận ISO 9001 / ISO 14001 / ISO 45001',
        ja: '年産2,000トン・中国フリーサプライチェーン・ISO 9001 / ISO 14001 / ISO 45001認証',
      },
    },
    supplyChain: {
      title: {
        zh: '去中化設備專線',
        en: 'China-Free Production Line',
        vi: 'Dây chuyền sản xuất không liên quan Trung Quốc',
        ja: '中国フリー生産ライン',
      },
      body: {
        zh: 'SINOWIN 核心製程（機加工、充磁、測試）採用去中化設備專線，供應鏈不涉中國，協助客戶規避長臂管轄與地緣政治合規風險。',
        en: 'SINOWIN\'s core processes (machining, magnetizing, testing) use a China-free equipment line. Our supply chain has no China involvement, helping customers avoid long-arm jurisdiction and geopolitical compliance risks.',
        vi: 'Các quy trình cốt lõi của SINOWIN (gia công cơ khí, từ hóa, kiểm tra) sử dụng dây chuyền thiết bị không liên quan Trung Quốc, giúp khách hàng tránh được rủi ro pháp lý xuyên biên giới (long-arm jurisdiction) và rủi ro tuân thủ địa chính trị.',
        ja: 'SINOWINのコアプロセス（機械加工、磁化、テスト）は中国を経由しない専用設備ラインで行われており、お客様は域外適用（ロングアーム管轄）や地政学的コンプライアンスリスクを回避できます。'
      },
    },
    capacity: {
      title: {
        zh: '產能與規格',
        en: 'Capacity & Specifications',
        vi: 'Công suất & Thông số kỹ thuật',
        ja: '生産能力と仕様',
      },
      annualCapacity: {
        zh: '年加工產能 2,000 噸',
        en: '2,000 MT annual processing capacity',
        vi: 'Công suất gia công 2.000 tấn/năm',
        ja: '年間加工能力2,000トン',
      },
      service: {
        zh: 'SINOWIN 提供彈性代工服務，可依客戶提供之原料與規格進行客製化加工，不限特定牌號。',
        en: 'SINOWIN offers flexible contract manufacturing. We process materials and specifications provided by customers — not limited to specific grades.',
        vi: 'SINOWIN cung cấp dịch vụ gia công linh hoạt theo vật liệu và thông số kỹ thuật của khách hàng, không giới hạn mác từ.',
        ja: 'SINOWINは柔軟なOEM製造サービスを提供し、お客様が提供する材料と仕様に従って加工します。特定のグレードに限定されません。',
      },
      tempGrades: {
        zh: '支援充磁至 UH（180°C）／EH（200°C）等高溫等級材料，滿足高溫環境應用需求。',
        en: 'Supports magnetization of UH (180°C) / EH (200°C) high-temperature grade materials for demanding thermal applications.',
        vi: 'Hỗ trợ từ hóa vật liệu cấp nhiệt độ cao UH (180°C) / EH (200°C) cho các ứng dụng nhiệt khắc nghiệt.',
        ja: 'UH（180°C）/ EH（200°C）高温グレード材料の磁化に対応し、高温環境のアプリケーションに対応します。',
      },
    },
  },

  // ── MANUFACTURING PAGE (from sinowin.html) ────────────────────
  manufacturing: {
    pageTitle: {
      zh: '製造能力',
      en: 'Manufacturing Capabilities',
      vi: 'Năng lực sản xuất',
      ja: '製造能力',
    },
    intro: {
      zh: '越南廠區設有六大製造車間，配備精密設備，提供從切割到測試的完整加工服務。',
      en: 'Our Vietnam facility houses six manufacturing workshops with precision equipment, offering complete processing from cutting to testing.',
      vi: 'Cơ sở Việt Nam của chúng tôi có sáu xưởng sản xuất với thiết bị chính xác, cung cấp quy trình hoàn chỉnh từ cắt đến kiểm tra.',
      ja: 'ベトナム工場には6つの製造ワークショップがあり、精密機器を備え、切断から検査まで完全な加工を提供します。',
    },
    // NOTE: the detailed per-workshop content (cards + tabs) now lives in
    // src/content/workshops.ts, rendered via <WorkshopGrid>. A short-form,
    // fully-translated `workshops` list used to live here but was unused
    // dead data after that switch, so it was removed (see git history if needed).
  },

  // ── CERTIFICATIONS ────────────────────────────────────────────
  certifications: [
    { id: 'iso9001', name: 'ISO 9001', confirmed: true },
    { id: 'iso14001', name: 'ISO 14001', confirmed: true },
    { id: 'iso45001', name: 'ISO 45001', confirmed: true },
    { id: 'qc080000', name: 'QC 080000', confirmed: true },
    // Confirmed obtained by QA dept 2026-07-11. Badge image pending — see
    // CERT_IMAGES in [lang]/page.tsx; falls back to text label until the
    // official badge file is supplied.
    { id: 'iatf16949', name: 'IATF 16949', confirmed: true },
    // Under audit, not yet obtained — confirmed by QA dept 2026-07-11.
    { id: 'rba', name: 'RBA', confirmed: false },
    { id: 'esci', name: 'ESCI', confirmed: false },
  ],

  // ── FAQ (from contact.html — [TODO] need full content) ────────
  faq: {
    pageTitle: {
      zh: '常見問題',
      en: 'FAQ',
      vi: 'Câu hỏi thường gặp',
      ja: 'よくある質問',
    },
    // [TODO] Full FAQ content needs to be extracted from contact.html
    // The original has complete zh/en bilingual FAQ covering:
    // machine precision, chipping prevention, lead time, certifications,
    // custom samples, surface treatment options
    items: [] as Array<{
      q: Partial<Record<string, string>>
      a: Partial<Record<string, string>>
    }>,
  },

  // ── NAVIGATION ────────────────────────────────────────────────
  nav: {
    home: { zh: '首頁', en: 'Home', vi: 'Trang chủ', ja: 'ホーム' },
    manufacturing: { zh: '製造能力', en: 'Manufacturing', vi: 'Sản xuất', ja: '製造' },
    about: { zh: '關於我們', en: 'About', vi: 'Về chúng tôi', ja: '会社概要' },
    faq: { zh: '常見問題', en: 'FAQ', vi: 'FAQ', ja: 'FAQ' },
    articles: { zh: '產業洞察', en: 'Insights', vi: 'Tin tức', ja: 'インサイト' },
    contact: { zh: '聯絡我們', en: 'Contact', vi: 'Liên hệ', ja: 'お問い合わせ' },
  },
}
