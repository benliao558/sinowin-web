export type WorkshopTab = {
  key: string
  title: string
  sub: string
  img: string
  points: [string, string][]
}

export type Workshop = {
  id: string
  cardTitle: string
  cardDesc: string
  cardImage: string
  badge: string
  subtitle: string
  intro: string
  whyTitle: string
  whyBody: string
  highlights: string[]
  tabs: WorkshopTab[]
  deliverTitle?: string
  deliverItems?: string[]
}

// Full content ported verbatim (zh-Hant) from sinowin.html's __wModalLangs data object.
export const workshops: Workshop[] = [
  {
    id: 'multi-wire-cutting',
    cardTitle: '多線切車間',
    cardDesc: '引進高精密多線切割設備，實現大批量磁材的高效、高尺寸公差切割，確保原材料損耗最小化。',
    cardImage: '/assets/workshops/multi-wire-cutting-workshop.png',
    badge: 'MULTI-WIRE CUTTING',
    subtitle: '高效率大批量切片製程',
    intro: '多線切割是釹鐵硼磁材切片加工的核心製程，利用高張力鑽石線同步切割大量磁坯，在兼顧效率的同時確保尺寸精度與原材料利用率最大化。',
    whyTitle: '為什麼選擇多線切？',
    whyBody: '相較於單線切割，多線切割的生產效率高出數十倍，且在相同的精度指標下，原材料利用率更高。對於有大批量、低公差、穩定交期需求的客戶，多線切車間是首選製程方案。',
    highlights: ['高產能：單次切割數百片', '鋸縫損耗 < 0.2 mm', '批次一致性 ±0.02 mm', '適合厚度 ≥ 0.5 mm'],
    tabs: [
      {
        key: 'mw', title: '高速多線切割機', sub: 'Throughput · Accuracy', img: '/assets/workshops/multi-wire-cutting-workshop.png',
        points: [
          ['核心優勢：', '同時走 400～600 條鑽石線，單次可切割數百片，適合大批量標準規格磁片。'],
          ['精度表現：', '切片厚度一致性 ±0.02 mm，鋸縫寬度 < 0.2 mm，原材料損耗率業界最低。'],
          ['適用範圍：', '厚度 0.5 mm 以上的圓柱、方塊磁坯，支援多種尺寸同時切割。'],
        ],
      },
      {
        key: 'feed', title: '精密伺服進給系統', sub: 'Stability · Consistency', img: '/assets/workshops/multi-wire-cutting-workshop.png',
        points: [
          ['核心功能：', '伺服控制進給速度與切割壓力，實時補償切割力變化，確保切割面平整。'],
          ['精度指標：', '表面粗糙度 Ra < 0.8 μm，平面度 < 0.01 mm，批次間尺寸波動極小。'],
          ['系統優勢：', '全自動張力補償，避免鑽石線斷線，大幅降低設備停機率。'],
        ],
      },
      {
        key: 'qc', title: '在線尺寸監控系統', sub: 'Quality · Reliability', img: '/assets/workshops/multi-wire-cutting-workshop.png',
        points: [
          ['監控方式：', 'CCD 攝影機即時量測切片厚度，自動反饋調整進給參數。'],
          ['品質保障：', '不合格品即時剔除，確保批次合格率 > 99.5%。'],
          ['數據追溯：', '每批次切割數據自動記錄，支援品質追溯與製程優化分析。'],
        ],
      },
    ],
  },
  {
    id: 'laser-cutting',
    cardTitle: '激光切割車間',
    cardDesc: '適用於異型磁件與薄板磁材的快速打樣與精確切割，具有非接觸、無應力、熱影響區小的優勢。',
    cardImage: '/assets/workshops/laser-cutting-workshop.png',
    badge: 'LASER CUTTING',
    subtitle: '異型件與快速打樣的首選',
    intro: '激光切割適用於異型磁件、薄板磁材及小批量打樣，具有非接觸、無機械應力、熱影響區極小的特性，能實現複雜輪廓的高精度加工。',
    whyTitle: '為什麼選擇激光切割？',
    whyBody: '傳統機械切割會在磁材表面留下應力殘留，影響磁性能與後道製程。激光切割完全無接觸，特別適合高精度異型件、薄板及需要快速打樣的項目，切割輪廓可直接由 CAD 檔案驅動，打樣交期最快 24 小時內完成。',
    highlights: ['適合異型件與薄板（< 3 mm）', '定位精度 ±0.01 mm', '無接觸、零應力殘留', '快速打樣 ≤ 24h'],
    tabs: [
      {
        key: 'fiber', title: '光纖激光切割機', sub: 'Precision · Non-contact', img: '/assets/workshops/laser-cutting-workshop.png',
        points: [
          ['輸出功率：', '500W～2kW，可依磁材厚度選擇最佳切割功率，減少熱影響區。'],
          ['定位精度：', '伺服驅動 XY 平台，定位精度 ±0.01 mm，重複精度 ±0.005 mm。'],
          ['切割速度：', '薄板（< 1 mm）最高可達 5 m/min，兼顧效率與切割品質。'],
        ],
      },
      {
        key: 'vision', title: '高精度視覺定位系統', sub: 'Auto-align · Accuracy', img: '/assets/workshops/laser-cutting-workshop.png',
        points: [
          ['對位原理：', 'CCD 攝影機即時拍攝磁件位置，與 CAD 圖形自動比對後修正切割路徑。'],
          ['適用場景：', '異型磁件、有印記或特徵邊的零件，確保每片切割位置一致。'],
          ['精度表現：', '視覺對位誤差 < 0.02 mm，大幅降低人工對位失誤率。'],
        ],
      },
      {
        key: 'exhaust', title: '自動排煙除塵系統', sub: 'Safety · Compliance', img: '/assets/workshops/laser-cutting-workshop.png',
        points: [
          ['過濾效能：', '三級過濾（HEPA + 活性碳），去除 ≥ 99.97% 的 0.3 μm 微粒。'],
          ['安全合規：', '符合越南工廠排放標準，保障操作員健康與廠房環境。'],
          ['即時監控：', '煙霧濃度感測器自動調節抽風量，確保切割過程的持續安全。'],
        ],
      },
    ],
  },
  {
    id: 'grinding',
    cardTitle: '研磨車間',
    cardDesc: '全自動雙面研磨機與無心磨床，針對表面粗糙度與平面度進行極致加工，達成 μm 級精度要求。',
    cardImage: '/assets/workshops/grinding-workshop.png',
    badge: 'GRINDING',
    subtitle: 'μm 級精密尺寸加工',
    intro: '研磨車間負責磁材的精密尺寸加工，透過雙面研磨、無心磨及平面磨等設備，達成 μm 級的平面度、平行度與粗糙度要求，為後道電鍍與充磁提供最佳入料品質。',
    whyTitle: '研磨對磁性能的重要性',
    whyBody: '磁材研磨不僅是尺寸加工，更直接影響後道製程品質。精確的平面度與平行度確保電鍍層均勻附著，良好的表面粗糙度則能提升充磁場耦合效率。研磨精度不足，往往是磁組件在客戶端發生不合格的主要原因之一。',
    highlights: ['平行度 < 0.005 mm', '表面粗糙度 Ra ≤ 0.4 μm', '圓度誤差 < 0.003 mm', '支援圓柱、方塊、環形'],
    tabs: [
      {
        key: 'dface', title: '全自動雙面研磨機', sub: 'Flatness · Parallelism', img: '/assets/workshops/grinding-workshop.png',
        points: [
          ['加工方式：', '磁片夾持在行星輪盤中，上下研磨輪同時研磨兩面，確保高度一致性。'],
          ['精度指標：', '平行度 < 0.005 mm，平面度 < 0.008 mm，表面粗糙度 Ra ≤ 0.6 μm。'],
          ['效率優勢：', '批量加工，單次可處理數十至數百片，遠優於單面磨削方式。'],
        ],
      },
      {
        key: 'cless', title: '無心磨床', sub: 'Roundness · OD Precision', img: '/assets/workshops/grinding-workshop.png',
        points: [
          ['適用範圍：', '圓柱形、環形磁材的外徑精密加工，無需夾頭，適合大量生產。'],
          ['圓度精度：', '圓度誤差 < 0.003 mm，外徑尺寸公差可達 ±0.005 mm。'],
          ['適合產品：', '馬達用圓柱磁、環形磁，以及需要精確外徑配合的組件。'],
        ],
      },
      {
        key: 'surf', title: '精密平面磨床', sub: 'Mirror Finish · μm Flatness', img: '/assets/workshops/grinding-workshop.png',
        points: [
          ['鏡面加工：', '最高可達 Ra ≤ 0.4 μm 的鏡面效果，適合有光學或精密配合要求的磁件。'],
          ['平面度：', '配合精密工作台，平面度可達 0.003 mm，滿足最嚴格的組裝要求。'],
          ['適用材質：', '燒結 NdFeB、SmCo 等各類稀土磁材，亦適合鐵氧體磁材。'],
        ],
      },
    ],
  },
  {
    id: 'chamfering',
    cardTitle: '倒角車間',
    cardDesc: '精確倒角與倒圓處理，有效防止磁體邊角崩裂，提升產品結構強度，並確保後續鍍層均勻度。',
    cardImage: '/assets/workshops/chamfering-workshop.png',
    badge: 'CHAMFERING',
    subtitle: '去毛刺與倒角｜提升良率與鍍層表現',
    intro: '倒角是量產磁材的重要製程：透過去毛刺、45° 倒角或 R 角處理消除銳邊，降低崩邊風險，並讓後續鍍層更均勻。我們會依產品尺寸、厚度與目標外觀，匹配設備與倒角石組合，確保批次一致。',
    whyTitle: '我們如何做得更穩定？',
    whyBody: '我們以「設備 + 倒角石匹配 + 批次控管」形成可複製的製程窗口：先用試樣確認目標倒角量與外觀，再固化量產參數（載量/時間/介質狀態/清潔），讓每批都維持同樣的邊角狀態。',
    highlights: ['去毛刺 / 45° / R 角', '降低崩邊風險', '倒角石匹配建議', '試樣確認後量產'],
    deliverTitle: '可交付項（量產前後）',
    deliverItems: [
      '試樣確認：確認倒角目標（去毛刺 / 45° / R 角）、外觀與崩邊風險。',
      '倒角石建議：依尺寸/厚度/形狀，建議圓球 / 斜圓柱 / 斜三角介質與搭配方式。',
      '量產窗口：固定載量、時間、介質狀態與清潔流程，確保批次一致。',
      '批次追溯：關鍵參數按批次記錄，便於回溯與持續優化。',
    ],
    tabs: [
      {
        key: 'barrel', title: '振動倒角機', sub: 'Gentle · Stable', img: '/assets/workshops/equipment-vibratory-tumbler-1200.jpg',
        points: [
          ['適用場景：', '更溫和的去毛刺/圓滑處理，適合對崩邊敏感的工件與較大/較厚零件。'],
          ['加工特性：', '批量穩定，工藝窗口可調（介質/時間/狀態），外觀一致性佳。'],
          ['建議做法：', '以試樣確認外觀後再量產，確保長期一致。'],
        ],
      },
      {
        key: 'cnc', title: '離心倒角機', sub: 'Throughput · Uniformity', img: '/assets/workshops/equipment-centrifugal-deburring-1200.jpg',
        points: [
          ['適用場景：', '中小件批量倒角，追求效率與一致性。'],
          ['加工特性：', '節拍快、倒角均勻；可依需求做溫和精修或高效去角。'],
          ['交期優勢：', '適合大批量交期與一致性要求。'],
        ],
      },
      {
        key: 'clean', title: '倒角石與適用產品', sub: 'Media · Matching', img: '/assets/workshops/chamfer-media-collage-1200.jpg',
        points: [
          ['圓球倒角石：', '通用型，適合均勻去毛刺與圓滑過渡；小件可用更小規格以降低崩邊。'],
          ['斜圓柱倒角石：', '更利於形成穩定 R 角效果，適合需要圓弧過渡與外觀一致性的產品。'],
          ['斜三角倒角石：', '更利於形成標準 45° 倒角，適合需要明確斜角輪廓的產品。'],
        ],
      },
    ],
  },
  {
    id: 'assembly-magnetizing',
    cardTitle: '組裝充磁車間',
    cardDesc: '配備高能脈衝充磁機與自動組裝線，提供磁組件一站式從膠合到充磁的整合方案。',
    cardImage: '/assets/workshops/assembly-and-magnetizing-workshop.png',
    badge: 'ASSEMBLY & MAGNETIZING',
    subtitle: '磁性組件一站式整合服務',
    intro: '組裝充磁車間提供磁性組件的一站式整合服務，從膠合、壓裝到充磁，全程自動化或半自動化作業，確保充磁飽和度與組裝精度達到客戶規格。',
    whyTitle: '為什麼需要在製造端充磁？',
    whyBody: '部分客戶選擇未充磁的毛坯（"Green Magnets"）自行組裝後再充磁，但這需要昂貴的充磁設備與嚴格的操作規範。由 SINOWIN 在製造端完成充磁，客戶可直接取到成品磁性組件，降低工廠設備投資，同時確保充磁均勻性與一致性由我們負責品質保障。',
    highlights: ['充磁飽和度 ≥ 99%', '支援多極充磁 (Halbach)', '組裝公差 ±0.03 mm', '100% 磁通量全檢'],
    tabs: [
      {
        key: 'mag', title: '高能脈衝充磁機', sub: 'Saturation · Multi-pole', img: '/assets/workshops/assembly-and-magnetizing-workshop.png',
        points: [
          ['磁場強度：', '瞬間輸出磁場可達 4T，確保各牌號 NdFeB 完全充磁飽和，包括高矯頑力 SH/UH/EH 等牌號。'],
          ['充磁方式：', '支援軸向、徑向、多極（Halbach、交錯多極等）充磁，可依客戶圖紙客製充磁治具。'],
          ['在線驗證：', '充磁後即時量測磁通量，與標準值比對，確保每個零件充磁品質符合規格。'],
        ],
      },
      {
        key: 'assy', title: '自動點膠組裝線', sub: 'Bonding · Positioning', img: '/assets/workshops/assembly-and-magnetizing-workshop.png',
        points: [
          ['點膠精度：', '精密點膠閥控制膠量 ±1 mg，確保膠合強度一致性，避免溢膠與缺膠。'],
          ['組裝精度：', '自動壓裝定位夾具，組裝位置公差 ±0.03 mm，適合高精度磁性組件。'],
          ['固化管理：', '恆溫固化烤箱確保膠水完全固化，提供固化曲線數據供品質追溯。'],
        ],
      },
      {
        key: 'flux', title: '充磁後磁通量檢測', sub: '100% Inspection', img: '/assets/workshops/assembly-and-magnetizing-workshop.png',
        points: [
          ['檢測方式：', '霍爾效應感測器或通量計，逐件量測磁通量 Φ 值，與客戶規格上下限比對。'],
          ['篩選效率：', '全自動分選，不合格品自動剔除，檢測速度 > 1,000 件/小時。'],
          ['數據記錄：', '每件檢測結果自動儲存，支援 SPC 分析、批次追溯與客戶報告輸出。'],
        ],
      },
    ],
  },
  {
    id: 'testing-lab',
    cardTitle: '測試實驗室',
    cardDesc: '包含退磁曲線測試、環境可靠度 (PCT/HAST) 及精密尺寸檢測，確保每一批次產品均符合國際規範。',
    cardImage: '/assets/workshops/testing-laboratory.png',
    badge: 'TESTING LAB',
    subtitle: '品質保證的最後防線',
    intro: '測試實驗室是品質保證的最後防線，涵蓋磁性能、環境可靠度與尺寸精度三大檢測領域，確保每批次出貨產品符合客戶規範與國際標準。',
    whyTitle: '為什麼選擇 SINOWIN 的實驗室？',
    whyBody: '許多磁材供應商只提供基本的磁通量抽測，SINOWIN 實驗室提供完整的 BH 曲線量測、環境可靠度測試與三維尺寸驗證，讓客戶工程師能直接取得足夠的設計驗證數據，縮短新品導入週期，降低因材料規格不符導致的設計返工風險。',
    highlights: ['BH 曲線全項磁性能報告', 'PCT / HAST 可靠度驗證', 'CMM 不確定度 < 1 μm', '支援第三方見證驗收'],
    tabs: [
      {
        key: 'bh', title: '退磁曲線測試儀', sub: 'Br · Hcj · (BH)max', img: '/assets/workshops/testing-laboratory.png',
        points: [
          ['測量參數：', '完整 BH 磁滯迴路，量測 Br（剩磁）、Hcb（矯頑力）、Hcj（內禀矯頑力）、(BH)max（最大磁能積）。'],
          ['溫度測試：', '可搭配溫控腔，量測磁材在 -40°C ～ 200°C 溫度範圍內的磁性能變化（Tc 係數）。'],
          ['客戶報告：', '每批次出具完整 BH 曲線報告，包含統計 Cpk 分析，供客戶產品設計驗證使用。'],
        ],
      },
      {
        key: 'env', title: '環境可靠度測試設備', sub: 'PCT · HAST · Salt Spray', img: '/assets/workshops/testing-laboratory.png',
        points: [
          ['PCT 測試：', '壓力蒸煮測試（121°C / 2atm / 100% RH），驗證鍍層在極端高溫高濕下的防腐蝕能力。'],
          ['鹽霧測試：', '依 ASTM B117 / ISO 9227 標準執行，驗證鍍層的中性鹽霧耐蝕性。'],
          ['HAST 測試：', '高加速應力測試，模擬磁件在長期使用環境下的壽命與可靠性。'],
        ],
      },
      {
        key: 'cmm', title: '三次元量測儀 (CMM)', sub: '3D Dimensional · μm Accuracy', img: '/assets/workshops/testing-laboratory.png',
        points: [
          ['量測能力：', '高精度三維座標量測，量測不確定度 < 1 μm，適合複雜幾何形狀磁件的全尺寸檢測。'],
          ['適用範圍：', '異型磁件、孔位、弧面等用手動量具無法有效量測的幾何特徵。'],
          ['品質追溯：', '量測數據自動輸出至 SPC 系統，形成可追溯的尺寸品質記錄。'],
        ],
      },
    ],
  },
  {
    id: 'fixture-tooling',
    cardTitle: '輔具加工車間',
    cardDesc: '專用於生產製程輔具與治具之精密加工區，支援異型加工、組裝與品質穩定性，確保量產一致性與現場作業效率。',
    cardImage: '/assets/workshops/fixture-workshop-jig-and-fixture-machining.png',
    badge: 'TOOLING & FIXTURE WORKSHOP',
    subtitle: '設備介紹',
    intro: '以釹鐵硼輔具加工需求為核心配置。我們選擇把治具製作放在自己工廠內完成，讓成本、交期與品質都可控。',
    whyTitle: '為什麼選擇內製？',
    whyBody: '在越南，輔具加工市場普遍存在「加工能力落差」與「費用偏高」兩個痛點。對於需要長期穩定量產的專案，我們選擇把治具製作放在自己工廠內完成，讓成本、交期與品質都可控。',
    highlights: ['設計修改、治具迭代不需等待外包排程，支援快速工程變更', '治具精度、裝配定位與作業節拍可被標準化，降低批次波動', '以內部標準管理加工流程與檢驗節點，避免外包品質風險疊加', '降低關鍵工裝外流，提升專案資料控管強度'],
    tabs: [
      {
        key: 'wedm', title: '快走絲 / 中走絲線切割', sub: 'Efficiency · Precision', img: '/assets/workshops/wedm.jpg',
        points: [
          ['快走絲（Fast-speed WEDM）：', '核心優勢為極高切割效率、加工成本更具競爭力；輔具應用於一般結構件、大型支撐墊塊等對精度/粗糙度要求較低的輔助零件。'],
          ['中走絲（Medium-speed WEDM）：', '兼顧效率與幾何精度，表面光潔度與尺寸穩定性更佳；輔具應用於磁片切片夾具、精密定位模具與高精度工裝，提升裝配嚴密性與良率。'],
          ['選型建議：', '依精度與交期需求彈性搭配快走絲與中走絲，兼顧成本與品質。'],
        ],
      },
      {
        key: 'slot', title: '滾輪開槽機', sub: 'Traction · Stability', img: '/assets/workshops/slot.jpg',
        points: [
          ['核心功能：', '在送料滾輪表面加工精密槽位，提升傳動摩擦力與導向穩定性。'],
          ['加工優勢：', '支援直線/螺旋/網格槽（止滑紋），兼顧切割精度與量產效率。'],
          ['產業效益：', '降低材料滑移風險，強化自動化輸送品質，是提升良率的關鍵設備。'],
        ],
      },
      {
        key: 'wire', title: '鑽石線包覆機（繞線機）', sub: 'Durability · Yield', img: '/assets/workshops/diamond-wire-coating.jpg',
        points: [
          ['核心功能：', '包覆樹脂/薄膜層，提升耐用性與切割穩定性，減少崩邊與切縫損耗。'],
          ['技術特色：', '高精度張力控制＋可客製化設計，確保高效加工。'],
          ['應用價值：', '針對脆性磁材，延長耗材壽命並提升成品良率。'],
        ],
      },
    ],
  },
]
