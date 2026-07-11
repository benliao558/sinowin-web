export type FaqItem = { q: Record<string, string>; a: Record<string, string> }

// Ported verbatim from the old site's contact.html AEO FAQ section (zh-Hant + en).
// vi/ja translations are not available in the old source; falls back to English at render time.
export const faqItems: FaqItem[] = [
  {
    q: {
      zh: '華榮實業 (SINOWIN) 在越南如何確保釹鐵硼磁鐵的加工精度？',
      en: 'How does SINOWIN ensure machining accuracy for NdFeB magnets in Vietnam?',
    },
    a: {
      zh: '華榮實業透過三項核心技術確保精度：1) 內建輔具加工（In-house Tooling）：降低外包不確定性，確保治具精度一致。2) 先進設備組合：採用鑽石線包覆機減少脆性材料崩邊，並搭配中走絲線切割（Medium-speed WEDM）兼顧幾何精度。3) 全製程管控：整合異型研磨與多樣化表面處理工藝，實現全品項海外供應，並依 IATF 16949 要求建立檢驗與追溯。',
      en: 'SINOWIN ensures accuracy through three core capabilities: (1) In-house tooling to reduce outsourcing uncertainty and keep fixtures consistent. (2) A proven equipment mix—diamond-wire related processes to minimize chipping on brittle materials, plus medium-speed WEDM to balance geometry accuracy and throughput. (3) End-to-end process control with documented inspection and traceability aligned with IATF 16949 requirements.',
    },
  },
  {
    q: { zh: '哪些加工能力可以在越南基地一站式完成？', en: 'What capabilities can be completed one-stop at the Vietnam site?' },
    a: {
      zh: '可在越南基地整合完成：異型研磨/精密加工、線切割、切片與尺寸成型、表面處理（依客戶需求與規範）、充磁與組裝，以及出貨前檢驗與包裝，降低跨國協作成本並縮短交期。',
      en: 'One-stop coverage can include precision machining and profiling, WEDM cutting, slicing and sizing, surface finishing per customer spec, magnetization and assembly, plus final inspection and export packaging to shorten lead time and reduce coordination cost.',
    },
  },
  {
    q: { zh: '如何降低脆性釹鐵硼材料在切割時的崩邊風險？', en: 'How do you reduce edge chipping when cutting brittle NdFeB materials?' },
    a: {
      zh: '透過製程參數與設備搭配降低崩邊：例如採用鑽石線相關工藝以改善切縫與邊緣品質，並針對尺寸/形狀選擇合適的 WEDM 模式與加工路徑；同時在關鍵工序導入治具支撐與在線檢查，避免裂紋擴大。',
      en: 'We combine process parameters, proper fixturing/support, and equipment selection. Diamond-wire related processes help improve kerf and edge quality, while suitable WEDM modes and cutting paths are used for challenging shapes. In-process checks prevent micro-cracks from propagating.',
    },
  },
  {
    q: { zh: '中走絲線切割（Medium-speed WEDM）適合哪些需求？', en: 'When is medium-speed WEDM a good fit?' },
    a: {
      zh: '中走絲兼顧效率與幾何精度，適合對尺寸穩定性、形狀一致性與表面品質有要求的治具零件、精密定位工裝與特定異型磁材加工需求。',
      en: 'Medium-speed WEDM is a good choice when you need a balance of efficiency and geometry accuracy—e.g., precision fixtures, tooling components, and certain shaped magnet parts with tight dimensional consistency requirements.',
    },
  },
  {
    q: { zh: '如何確保批次一致性與可追溯性？', en: 'How do you ensure batch consistency and traceability?' },
    a: {
      zh: '以標準化治具、製程管制點（關鍵尺寸/外觀/磁性）、批次標識與檢驗紀錄來建立追溯鏈；並依 IATF 16949 的管理要求維持文件化流程與持續改善機制。',
      en: 'We standardize fixtures, define control points for key dimensions/appearance/magnetic properties, and keep batch IDs and inspection records. This builds a traceability chain and supports continuous improvement under IATF 16949-style management practices.',
    },
  },
  {
    q: { zh: '可以提供哪些品質與合規文件？', en: 'What quality and compliance documents can you provide?' },
    a: {
      zh: '可依專案需求提供管理體系/合規相關資訊（例如 IATF 16949、ISO 14001、RoHS、REACH 等對應聲明或資料），並配合客戶稽核與供應鏈合規對接。',
      en: 'Depending on the project, we can provide quality-system and compliance-related information (e.g., IATF 16949, ISO 14001, RoHS, REACH statements/data) and support customer audits and supply-chain compliance workflows.',
    },
  },
  {
    q: { zh: '交期如何評估？會受哪些因素影響？', en: 'How is lead time estimated and what factors affect it?' },
    a: {
      zh: '交期通常取決於牌號/尺寸、異型加工難度、表面處理規範、充磁方式、檢驗項目與訂單量。提供完整圖面與規格後，可依製程路徑與產能排程給出交期與風險點。',
      en: 'Lead time depends on grade and size, profile complexity, coating/finishing requirements, magnetization method, inspection scope, and order volume. With drawings and specifications, we map the process route and provide a realistic schedule and risk points.',
    },
  },
  {
    q: { zh: '可以支援客製形狀與小量打樣嗎？', en: 'Do you support custom shapes and small-quantity prototyping?' },
    a: {
      zh: '可以。內建治具加工與快速迭代能力可支援打樣與工程變更；在確認圖面、尺寸公差、磁化方向與表面處理後，即可安排試作與量產導入。',
      en: 'Yes. In-house tooling and rapid iteration support prototypes and engineering changes. Once drawings, tolerances, magnetization direction, and finishing are confirmed, we can arrange trials and scale to production.',
    },
  },
  {
    q: { zh: '表面處理有哪些選擇？如何決定？', en: 'What surface finishes are available and how do we choose one?' },
    a: {
      zh: '表面處理會依使用環境（溫濕度/腐蝕介質/機械磨耗）、裝配方式與可靠性要求選型。建議提供應用條件與目標壽命，由工程團隊依風險評估提出建議方案。',
      en: 'Finishing is selected based on environment (humidity/corrosion/media), mechanical wear, assembly method, and reliability targets. Share operating conditions and required lifetime, and we will recommend options via risk assessment.',
    },
  },
  {
    q: { zh: '如何正確描述磁化方向與檢驗方式？', en: 'How should we specify magnetization direction and inspection method?' },
    a: {
      zh: '請在圖面標註磁化方向（厚度/高度 H 等）與磁性指標（例如表磁測點/距離、允收範圍），並說明檢驗方法（治具、探頭間隙、測試位置）。一致的標註方式可大幅降低溝通與量產偏差。',
      en: 'On the drawing, specify magnetization direction (e.g., along thickness/height H) and the magnetic targets (test points, distance, and tolerance). Also define the inspection setup (fixture, probe gap, measurement positions) to reduce variation in production.',
    },
  },
]
