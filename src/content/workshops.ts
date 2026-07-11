import type { Locale } from '@/lib/i18n'

export type LocalizedText = Partial<Record<Locale, string>>

export type WorkshopTab = {
  key: string
  title: LocalizedText
  sub: LocalizedText
  img: string
  points: [LocalizedText, LocalizedText][]
}

export type Workshop = {
  id: string
  cardTitle: LocalizedText
  cardDesc: LocalizedText
  cardImage: string
  badge: LocalizedText
  subtitle: LocalizedText
  intro: LocalizedText
  whyTitle: LocalizedText
  whyBody: LocalizedText
  highlights: LocalizedText[]
  tabs: WorkshopTab[]
  deliverTitle?: LocalizedText
  deliverItems?: LocalizedText[]
}

// Content is currently zh-only (ported verbatim from sinowin.html's __wModalLangs
// data object). en/vi/ja are intentionally left unset for now — components resolve
// missing languages via `getWithFallback()` (requested lang -> en -> zh), so nothing
// renders blank or errors while translations are pending.
// See translation-drafts/workshops-en-vi-ja-DRAFT.md for AI-drafted translations
// awaiting human review before being added here.
export const workshops: Workshop[] = [
  {
    id: 'multi-wire-cutting',
    cardTitle: { zh: '多線切車間' },
    cardDesc: { zh: '引進高精密多線切割設備，實現大批量磁材的高效、高尺寸公差切割，確保原材料損耗最小化。' },
    cardImage: '/assets/workshops/multi-wire-cutting-workshop.png',
    badge: { zh: 'MULTI-WIRE CUTTING' },
    subtitle: { zh: '高效率大批量切片製程' },
    intro: { zh: '多線切割是釹鐵硼磁材切片加工的核心製程，利用高張力鑽石線同步切割大量磁坯，在兼顧效率的同時確保尺寸精度與原材料利用率最大化。' },
    whyTitle: { zh: '為什麼選擇多線切？' },
    whyBody: { zh: '相較於單線切割，多線切割的生產效率高出數十倍，且在相同的精度指標下，原材料利用率更高。對於有大批量、低公差、穩定交期需求的客戶，多線切車間是首選製程方案。' },
    highlights: [
      { zh: '高產能：單次切割數百片' },
      { zh: '鋸縫損耗 < 0.2 mm' },
      { zh: '批次一致性 ±0.02 mm' },
      { zh: '適合厚度 ≥ 0.5 mm' },
    ],
    tabs: [
      {
        key: 'mw', title: { zh: '高速多線切割機' }, sub: { zh: 'Throughput · Accuracy' }, img: '/assets/workshops/multi-wire-cutting-workshop.png',
        points: [
          [{ zh: '核心優勢：' }, { zh: '同時走 400～600 條鑽石線，單次可切割數百片，適合大批量標準規格磁片。' }],
          [{ zh: '精度表現：' }, { zh: '切片厚度一致性 ±0.02 mm，鋸縫寬度 < 0.2 mm，原材料損耗率業界最低。' }],
          [{ zh: '適用範圍：' }, { zh: '厚度 0.5 mm 以上的圓柱、方塊磁坯，支援多種尺寸同時切割。' }],
        ],
      },
      {
        key: 'feed', title: { zh: '精密伺服進給系統' }, sub: { zh: 'Stability · Consistency' }, img: '/assets/workshops/multi-wire-cutting-workshop.png',
        points: [
          [{ zh: '核心功能：' }, { zh: '伺服控制進給速度與切割壓力，實時補償切割力變化，確保切割面平整。' }],
          [{ zh: '精度指標：' }, { zh: '表面粗糙度 Ra < 0.8 μm，平面度 < 0.01 mm，批次間尺寸波動極小。' }],
          [{ zh: '系統優勢：' }, { zh: '全自動張力補償，避免鑽石線斷線，大幅降低設備停機率。' }],
        ],
      },
      {
        key: 'qc', title: { zh: '在線尺寸監控系統' }, sub: { zh: 'Quality · Reliability' }, img: '/assets/workshops/multi-wire-cutting-workshop.png',
        points: [
          [{ zh: '監控方式：' }, { zh: 'CCD 攝影機即時量測切片厚度，自動反饋調整進給參數。' }],
          [{ zh: '品質保障：' }, { zh: '不合格品即時剔除，確保批次合格率 > 99.5%。' }],
          [{ zh: '數據追溯：' }, { zh: '每批次切割數據自動記錄，支援品質追溯與製程優化分析。' }],
        ],
      },
    ],
  },
  {
    id: 'laser-cutting',
    cardTitle: { zh: '激光切割車間' },
    cardDesc: { zh: '適用於異型磁件與薄板磁材的快速打樣與精確切割，具有非接觸、無應力、熱影響區小的優勢。' },
    cardImage: '/assets/workshops/laser-cutting-workshop.png',
    badge: { zh: 'LASER CUTTING' },
    subtitle: { zh: '異型件與快速打樣的首選' },
    intro: { zh: '激光切割適用於異型磁件、薄板磁材及小批量打樣，具有非接觸、無機械應力、熱影響區極小的特性，能實現複雜輪廓的高精度加工。' },
    whyTitle: { zh: '為什麼選擇激光切割？' },
    whyBody: { zh: '傳統機械切割會在磁材表面留下應力殘留，影響磁性能與後道製程。激光切割完全無接觸，特別適合高精度異型件、薄板及需要快速打樣的項目，切割輪廓可直接由 CAD 檔案驅動，打樣交期最快 24 小時內完成。' },
    highlights: [
      { zh: '適合異型件與薄板（< 3 mm）' },
      { zh: '定位精度 ±0.01 mm' },
      { zh: '無接觸、零應力殘留' },
      { zh: '快速打樣 ≤ 24h' },
    ],
    tabs: [
      {
        key: 'fiber', title: { zh: '光纖激光切割機' }, sub: { zh: 'Precision · Non-contact' }, img: '/assets/workshops/laser-cutting-workshop.png',
        points: [
          [{ zh: '輸出功率：' }, { zh: '500W～2kW，可依磁材厚度選擇最佳切割功率，減少熱影響區。' }],
          [{ zh: '定位精度：' }, { zh: '伺服驅動 XY 平台，定位精度 ±0.01 mm，重複精度 ±0.005 mm。' }],
          [{ zh: '切割速度：' }, { zh: '薄板（< 1 mm）最高可達 5 m/min，兼顧效率與切割品質。' }],
        ],
      },
      {
        key: 'vision', title: { zh: '高精度視覺定位系統' }, sub: { zh: 'Auto-align · Accuracy' }, img: '/assets/workshops/laser-cutting-workshop.png',
        points: [
          [{ zh: '對位原理：' }, { zh: 'CCD 攝影機即時拍攝磁件位置，與 CAD 圖形自動比對後修正切割路徑。' }],
          [{ zh: '適用場景：' }, { zh: '異型磁件、有印記或特徵邊的零件，確保每片切割位置一致。' }],
          [{ zh: '精度表現：' }, { zh: '視覺對位誤差 < 0.02 mm，大幅降低人工對位失誤率。' }],
        ],
      },
      {
        key: 'exhaust', title: { zh: '自動排煙除塵系統' }, sub: { zh: 'Safety · Compliance' }, img: '/assets/workshops/laser-cutting-workshop.png',
        points: [
          [{ zh: '過濾效能：' }, { zh: '三級過濾（HEPA + 活性碳），去除 ≥ 99.97% 的 0.3 μm 微粒。' }],
          [{ zh: '安全合規：' }, { zh: '符合越南工廠排放標準，保障操作員健康與廠房環境。' }],
          [{ zh: '即時監控：' }, { zh: '煙霧濃度感測器自動調節抽風量，確保切割過程的持續安全。' }],
        ],
      },
    ],
  },
  {
    id: 'grinding',
    cardTitle: { zh: '研磨車間' },
    cardDesc: { zh: '全自動雙面研磨機與無心磨床，針對表面粗糙度與平面度進行極致加工，達成 μm 級精度要求。' },
    cardImage: '/assets/workshops/grinding-workshop.png',
    badge: { zh: 'GRINDING' },
    subtitle: { zh: 'μm 級精密尺寸加工' },
    intro: { zh: '研磨車間負責磁材的精密尺寸加工，透過雙面研磨、無心磨及平面磨等設備，達成 μm 級的平面度、平行度與粗糙度要求，為後道電鍍與充磁提供最佳入料品質。' },
    whyTitle: { zh: '研磨對磁性能的重要性' },
    whyBody: { zh: '磁材研磨不僅是尺寸加工，更直接影響後道製程品質。精確的平面度與平行度確保電鍍層均勻附著，良好的表面粗糙度則能提升充磁場耦合效率。研磨精度不足，往往是磁組件在客戶端發生不合格的主要原因之一。' },
    highlights: [
      { zh: '平行度 < 0.005 mm' },
      { zh: '表面粗糙度 Ra ≤ 0.4 μm' },
      { zh: '圓度誤差 < 0.003 mm' },
      { zh: '支援圓柱、方塊、環形' },
    ],
    tabs: [
      {
        key: 'dface', title: { zh: '全自動雙面研磨機' }, sub: { zh: 'Flatness · Parallelism' }, img: '/assets/workshops/grinding-workshop.png',
        points: [
          [{ zh: '加工方式：' }, { zh: '磁片夾持在行星輪盤中，上下研磨輪同時研磨兩面，確保高度一致性。' }],
          [{ zh: '精度指標：' }, { zh: '平行度 < 0.005 mm，平面度 < 0.008 mm，表面粗糙度 Ra ≤ 0.6 μm。' }],
          [{ zh: '效率優勢：' }, { zh: '批量加工，單次可處理數十至數百片，遠優於單面磨削方式。' }],
        ],
      },
      {
        key: 'cless', title: { zh: '無心磨床' }, sub: { zh: 'Roundness · OD Precision' }, img: '/assets/workshops/grinding-workshop.png',
        points: [
          [{ zh: '適用範圍：' }, { zh: '圓柱形、環形磁材的外徑精密加工，無需夾頭，適合大量生產。' }],
          [{ zh: '圓度精度：' }, { zh: '圓度誤差 < 0.003 mm，外徑尺寸公差可達 ±0.005 mm。' }],
          [{ zh: '適合產品：' }, { zh: '馬達用圓柱磁、環形磁，以及需要精確外徑配合的組件。' }],
        ],
      },
      {
        key: 'surf', title: { zh: '精密平面磨床' }, sub: { zh: 'Mirror Finish · μm Flatness' }, img: '/assets/workshops/grinding-workshop.png',
        points: [
          [{ zh: '鏡面加工：' }, { zh: '最高可達 Ra ≤ 0.4 μm 的鏡面效果，適合有光學或精密配合要求的磁件。' }],
          [{ zh: '平面度：' }, { zh: '配合精密工作台，平面度可達 0.003 mm，滿足最嚴格的組裝要求。' }],
          [{ zh: '適用材質：' }, { zh: '燒結 NdFeB、SmCo 等各類稀土磁材，亦適合鐵氧體磁材。' }],
        ],
      },
    ],
  },
  {
    id: 'chamfering',
    cardTitle: { zh: '倒角車間' },
    cardDesc: { zh: '精確倒角與倒圓處理，有效防止磁體邊角崩裂，提升產品結構強度，並確保後續鍍層均勻度。' },
    cardImage: '/assets/workshops/chamfering-workshop.png',
    badge: { zh: 'CHAMFERING' },
    subtitle: { zh: '去毛刺與倒角｜提升良率與鍍層表現' },
    intro: { zh: '倒角是量產磁材的重要製程：透過去毛刺、45° 倒角或 R 角處理消除銳邊，降低崩邊風險，並讓後續鍍層更均勻。我們會依產品尺寸、厚度與目標外觀，匹配設備與倒角石組合，確保批次一致。' },
    whyTitle: { zh: '我們如何做得更穩定？' },
    whyBody: { zh: '我們以「設備 + 倒角石匹配 + 批次控管」形成可複製的製程窗口：先用試樣確認目標倒角量與外觀，再固化量產參數（載量/時間/介質狀態/清潔），讓每批都維持同樣的邊角狀態。' },
    highlights: [
      { zh: '去毛刺 / 45° / R 角' },
      { zh: '降低崩邊風險' },
      { zh: '倒角石匹配建議' },
      { zh: '試樣確認後量產' },
    ],
    deliverTitle: { zh: '可交付項（量產前後）' },
    deliverItems: [
      { zh: '試樣確認：確認倒角目標（去毛刺 / 45° / R 角）、外觀與崩邊風險。' },
      { zh: '倒角石建議：依尺寸/厚度/形狀，建議圓球 / 斜圓柱 / 斜三角介質與搭配方式。' },
      { zh: '量產窗口：固定載量、時間、介質狀態與清潔流程，確保批次一致。' },
      { zh: '批次追溯：關鍵參數按批次記錄，便於回溯與持續優化。' },
    ],
    tabs: [
      {
        key: 'barrel', title: { zh: '振動倒角機' }, sub: { zh: 'Gentle · Stable' }, img: '/assets/workshops/equipment-vibratory-tumbler-1200.jpg',
        points: [
          [{ zh: '適用場景：' }, { zh: '更溫和的去毛刺/圓滑處理，適合對崩邊敏感的工件與較大/較厚零件。' }],
          [{ zh: '加工特性：' }, { zh: '批量穩定，工藝窗口可調（介質/時間/狀態），外觀一致性佳。' }],
          [{ zh: '建議做法：' }, { zh: '以試樣確認外觀後再量產，確保長期一致。' }],
        ],
      },
      {
        key: 'cnc', title: { zh: '離心倒角機' }, sub: { zh: 'Throughput · Uniformity' }, img: '/assets/workshops/equipment-centrifugal-deburring-1200.jpg',
        points: [
          [{ zh: '適用場景：' }, { zh: '中小件批量倒角，追求效率與一致性。' }],
          [{ zh: '加工特性：' }, { zh: '節拍快、倒角均勻；可依需求做溫和精修或高效去角。' }],
          [{ zh: '交期優勢：' }, { zh: '適合大批量交期與一致性要求。' }],
        ],
      },
      {
        key: 'clean', title: { zh: '倒角石與適用產品' }, sub: { zh: 'Media · Matching' }, img: '/assets/workshops/chamfer-media-collage-1200.jpg',
        points: [
          [{ zh: '圓球倒角石：' }, { zh: '通用型，適合均勻去毛刺與圓滑過渡；小件可用更小規格以降低崩邊。' }],
          [{ zh: '斜圓柱倒角石：' }, { zh: '更利於形成穩定 R 角效果，適合需要圓弧過渡與外觀一致性的產品。' }],
          [{ zh: '斜三角倒角石：' }, { zh: '更利於形成標準 45° 倒角，適合需要明確斜角輪廓的產品。' }],
        ],
      },
    ],
  },
  {
    id: 'assembly-magnetizing',
    cardTitle: { zh: '組裝充磁車間' },
    cardDesc: { zh: '配備高能脈衝充磁機與自動組裝線，提供磁組件一站式從膠合到充磁的整合方案。' },
    cardImage: '/assets/workshops/assembly-and-magnetizing-workshop.png',
    badge: { zh: 'ASSEMBLY & MAGNETIZING' },
    subtitle: { zh: '磁性組件一站式整合服務' },
    intro: { zh: '組裝充磁車間提供磁性組件的一站式整合服務，從膠合、壓裝到充磁，全程自動化或半自動化作業，確保充磁飽和度與組裝精度達到客戶規格。' },
    whyTitle: { zh: '為什麼需要在製造端充磁？' },
    whyBody: { zh: '部分客戶選擇未充磁的毛坯（"Green Magnets"）自行組裝後再充磁，但這需要昂貴的充磁設備與嚴格的操作規範。由 SINOWIN 在製造端完成充磁，客戶可直接取到成品磁性組件，降低工廠設備投資，同時確保充磁均勻性與一致性由我們負責品質保障。' },
    highlights: [
      { zh: '充磁飽和度 ≥ 99%' },
      { zh: '支援多極充磁 (Halbach)' },
      { zh: '組裝公差 ±0.03 mm' },
      { zh: '100% 磁通量全檢' },
    ],
    tabs: [
      {
        key: 'mag', title: { zh: '高能脈衝充磁機' }, sub: { zh: 'Saturation · Multi-pole' }, img: '/assets/workshops/assembly-and-magnetizing-workshop.png',
        points: [
          [{ zh: '磁場強度：' }, { zh: '瞬間輸出磁場可達 4T，確保各牌號 NdFeB 完全充磁飽和，包括高矯頑力 SH/UH/EH 等牌號。' }],
          [{ zh: '充磁方式：' }, { zh: '支援軸向、徑向、多極（Halbach、交錯多極等）充磁，可依客戶圖紙客製充磁治具。' }],
          [{ zh: '在線驗證：' }, { zh: '充磁後即時量測磁通量，與標準值比對，確保每個零件充磁品質符合規格。' }],
        ],
      },
      {
        key: 'assy', title: { zh: '自動點膠組裝線' }, sub: { zh: 'Bonding · Positioning' }, img: '/assets/workshops/assembly-and-magnetizing-workshop.png',
        points: [
          [{ zh: '點膠精度：' }, { zh: '精密點膠閥控制膠量 ±1 mg，確保膠合強度一致性，避免溢膠與缺膠。' }],
          [{ zh: '組裝精度：' }, { zh: '自動壓裝定位夾具，組裝位置公差 ±0.03 mm，適合高精度磁性組件。' }],
          [{ zh: '固化管理：' }, { zh: '恆溫固化烤箱確保膠水完全固化，提供固化曲線數據供品質追溯。' }],
        ],
      },
      {
        key: 'flux', title: { zh: '充磁後磁通量檢測' }, sub: { zh: '100% Inspection' }, img: '/assets/workshops/assembly-and-magnetizing-workshop.png',
        points: [
          [{ zh: '檢測方式：' }, { zh: '霍爾效應感測器或通量計，逐件量測磁通量 Φ 值，與客戶規格上下限比對。' }],
          [{ zh: '篩選效率：' }, { zh: '全自動分選，不合格品自動剔除，檢測速度 > 1,000 件/小時。' }],
          [{ zh: '數據記錄：' }, { zh: '每件檢測結果自動儲存，支援 SPC 分析、批次追溯與客戶報告輸出。' }],
        ],
      },
    ],
  },
  {
    id: 'testing-lab',
    cardTitle: { zh: '測試實驗室' },
    cardDesc: { zh: '包含退磁曲線測試、環境可靠度 (PCT/HAST) 及精密尺寸檢測，確保每一批次產品均符合國際規範。' },
    cardImage: '/assets/workshops/testing-laboratory.png',
    badge: { zh: 'TESTING LAB' },
    subtitle: { zh: '品質保證的最後防線' },
    intro: { zh: '測試實驗室是品質保證的最後防線，涵蓋磁性能、環境可靠度與尺寸精度三大檢測領域，確保每批次出貨產品符合客戶規範與國際標準。' },
    whyTitle: { zh: '為什麼選擇 SINOWIN 的實驗室？' },
    whyBody: { zh: '許多磁材供應商只提供基本的磁通量抽測，SINOWIN 實驗室提供完整的 BH 曲線量測、環境可靠度測試與三維尺寸驗證，讓客戶工程師能直接取得足夠的設計驗證數據，縮短新品導入週期，降低因材料規格不符導致的設計返工風險。' },
    highlights: [
      { zh: 'BH 曲線全項磁性能報告' },
      { zh: 'PCT / HAST 可靠度驗證' },
      { zh: 'CMM 不確定度 < 1 μm' },
      { zh: '支援第三方見證驗收' },
    ],
    tabs: [
      {
        key: 'bh', title: { zh: '退磁曲線測試儀' }, sub: { zh: 'Br · Hcj · (BH)max' }, img: '/assets/workshops/testing-laboratory.png',
        points: [
          [{ zh: '測量參數：' }, { zh: '完整 BH 磁滯迴路，量測 Br（剩磁）、Hcb（矯頑力）、Hcj（內禀矯頑力）、(BH)max（最大磁能積）。' }],
          [{ zh: '溫度測試：' }, { zh: '可搭配溫控腔，量測磁材在 -40°C ～ 200°C 溫度範圍內的磁性能變化（Tc 係數）。' }],
          [{ zh: '客戶報告：' }, { zh: '每批次出具完整 BH 曲線報告，包含統計 Cpk 分析，供客戶產品設計驗證使用。' }],
        ],
      },
      {
        key: 'env', title: { zh: '環境可靠度測試設備' }, sub: { zh: 'PCT · HAST · Salt Spray' }, img: '/assets/workshops/testing-laboratory.png',
        points: [
          [{ zh: 'PCT 測試：' }, { zh: '壓力蒸煮測試（121°C / 2atm / 100% RH），驗證鍍層在極端高溫高濕下的防腐蝕能力。' }],
          [{ zh: '鹽霧測試：' }, { zh: '依 ASTM B117 / ISO 9227 標準執行，驗證鍍層的中性鹽霧耐蝕性。' }],
          [{ zh: 'HAST 測試：' }, { zh: '高加速應力測試，模擬磁件在長期使用環境下的壽命與可靠性。' }],
        ],
      },
      {
        key: 'cmm', title: { zh: '三次元量測儀 (CMM)' }, sub: { zh: '3D Dimensional · μm Accuracy' }, img: '/assets/workshops/testing-laboratory.png',
        points: [
          [{ zh: '量測能力：' }, { zh: '高精度三維座標量測，量測不確定度 < 1 μm，適合複雜幾何形狀磁件的全尺寸檢測。' }],
          [{ zh: '適用範圍：' }, { zh: '異型磁件、孔位、弧面等用手動量具無法有效量測的幾何特徵。' }],
          [{ zh: '品質追溯：' }, { zh: '量測數據自動輸出至 SPC 系統，形成可追溯的尺寸品質記錄。' }],
        ],
      },
    ],
  },
  {
    id: 'fixture-tooling',
    cardTitle: { zh: '輔具加工車間' },
    cardDesc: { zh: '專用於生產製程輔具與治具之精密加工區，支援異型加工、組裝與品質穩定性，確保量產一致性與現場作業效率。' },
    cardImage: '/assets/workshops/fixture-workshop-jig-and-fixture-machining.png',
    badge: { zh: 'TOOLING & FIXTURE WORKSHOP' },
    subtitle: { zh: '設備介紹' },
    intro: { zh: '以釹鐵硼輔具加工需求為核心配置。我們選擇把治具製作放在自己工廠內完成，讓成本、交期與品質都可控。' },
    whyTitle: { zh: '為什麼選擇內製？' },
    whyBody: { zh: '在越南，輔具加工市場普遍存在「加工能力落差」與「費用偏高」兩個痛點。對於需要長期穩定量產的專案，我們選擇把治具製作放在自己工廠內完成，讓成本、交期與品質都可控。' },
    highlights: [
      { zh: '設計修改、治具迭代不需等待外包排程，支援快速工程變更' },
      { zh: '治具精度、裝配定位與作業節拍可被標準化，降低批次波動' },
      { zh: '以內部標準管理加工流程與檢驗節點，避免外包品質風險疊加' },
      { zh: '降低關鍵工裝外流，提升專案資料控管強度' },
    ],
    tabs: [
      {
        key: 'wedm', title: { zh: '快走絲 / 中走絲線切割' }, sub: { zh: 'Efficiency · Precision' }, img: '/assets/workshops/wedm.jpg',
        points: [
          [{ zh: '快走絲（Fast-speed WEDM）：' }, { zh: '核心優勢為極高切割效率、加工成本更具競爭力；輔具應用於一般結構件、大型支撐墊塊等對精度/粗糙度要求較低的輔助零件。' }],
          [{ zh: '中走絲（Medium-speed WEDM）：' }, { zh: '兼顧效率與幾何精度，表面光潔度與尺寸穩定性更佳；輔具應用於磁片切片夾具、精密定位模具與高精度工裝，提升裝配嚴密性與良率。' }],
          [{ zh: '選型建議：' }, { zh: '依精度與交期需求彈性搭配快走絲與中走絲，兼顧成本與品質。' }],
        ],
      },
      {
        key: 'slot', title: { zh: '滾輪開槽機' }, sub: { zh: 'Traction · Stability' }, img: '/assets/workshops/slot.jpg',
        points: [
          [{ zh: '核心功能：' }, { zh: '在送料滾輪表面加工精密槽位，提升傳動摩擦力與導向穩定性。' }],
          [{ zh: '加工優勢：' }, { zh: '支援直線/螺旋/網格槽（止滑紋），兼顧切割精度與量產效率。' }],
          [{ zh: '產業效益：' }, { zh: '降低材料滑移風險，強化自動化輸送品質，是提升良率的關鍵設備。' }],
        ],
      },
      {
        key: 'wire', title: { zh: '鑽石線包覆機（繞線機）' }, sub: { zh: 'Durability · Yield' }, img: '/assets/workshops/diamond-wire-coating.jpg',
        points: [
          [{ zh: '核心功能：' }, { zh: '包覆樹脂/薄膜層，提升耐用性與切割穩定性，減少崩邊與切縫損耗。' }],
          [{ zh: '技術特色：' }, { zh: '高精度張力控制＋可客製化設計，確保高效加工。' }],
          [{ zh: '應用價值：' }, { zh: '針對脆性磁材，延長耗材壽命並提升成品良率。' }],
        ],
      },
    ],
  },
]
