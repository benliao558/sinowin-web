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
    cardTitle: { zh: '多線切車間', en: 'Multi-Wire Cutting Workshop', vi: 'Xưởng Cắt Dây Đa Dây', ja: '多線切断工場' },
    cardDesc: { zh: '引進高精密多線切割設備，實現大批量磁材的高效、高尺寸公差切割，確保原材料損耗最小化。', en: 'Advanced multi-wire cutting equipment for high-efficiency, high-tolerance slicing of large batches of magnetic material, minimizing raw material loss.', vi: 'Thiết bị cắt dây đa dây độ chính xác cao, thực hiện cắt lát hiệu quả và dung sai cao cho vật liệu từ tính số lượng lớn, giảm thiểu hao hụt nguyên liệu.', ja: '高精密多線切断設備を導入し、大量の磁性材料を高効率・高寸法公差でスライス加工。原材料ロスを最小限に抑えます。' },
    cardImage: '/assets/workshops/multi-wire-cutting-workshop.png',
    badge: { zh: 'MULTI-WIRE CUTTING', en: 'MULTI-WIRE CUTTING', vi: 'MULTI-WIRE CUTTING', ja: 'MULTI-WIRE CUTTING' },
    subtitle: { zh: '高效率大批量切片製程', en: 'High-throughput slicing for mass production', vi: 'Quy trình cắt lát hiệu suất cao cho sản xuất hàng loạt', ja: '高効率・大量生産向けスライス工程' },
    intro: { zh: '多線切割是釹鐵硼磁材切片加工的核心製程，利用高張力鑽石線同步切割大量磁坯，在兼顧效率的同時確保尺寸精度與原材料利用率最大化。', en: 'Multi-wire cutting is the core slicing process for NdFeB magnetic materials, using high-tension diamond wires to simultaneously cut large volumes of magnet blanks — balancing efficiency with dimensional precision and maximum raw material utilization.', vi: 'Cắt dây đa dây là quy trình cắt lát cốt lõi cho vật liệu từ tính NdFeB, sử dụng dây kim cương căng cao để cắt đồng thời số lượng lớn phôi nam châm — cân bằng hiệu suất với độ chính xác kích thước và tối đa hóa hiệu suất sử dụng nguyên liệu.', ja: '多線切断はNdFeB磁性材料のスライス加工における中核工程です。高張力ダイヤモンドワイヤーで大量の磁石ブランクを同時に切断し、効率と寸法精度、原材料利用率の最大化を両立します。' },
    whyTitle: { zh: '為什麼選擇多線切？', en: 'Why Choose Multi-Wire Cutting?', vi: 'Tại sao chọn cắt dây đa dây?', ja: 'なぜ多線切断を選ぶのか？' },
    whyBody: { zh: '相較於單線切割，多線切割的生產效率高出數十倍，且在相同的精度指標下，原材料利用率更高。對於有大批量、低公差、穩定交期需求的客戶，多線切車間是首選製程方案。', en: 'Compared to single-wire cutting, multi-wire cutting delivers production efficiency tens of times higher, with better raw material utilization at the same precision level. For customers needing high volume, tight tolerances, and stable lead times, the multi-wire cutting workshop is the process of choice.', vi: 'So với cắt dây đơn, cắt dây đa dây mang lại hiệu suất sản xuất cao hơn hàng chục lần, đồng thời đạt hiệu suất sử dụng nguyên liệu tốt hơn ở cùng mức độ chính xác. Đối với khách hàng cần số lượng lớn, dung sai thấp và thời gian giao hàng ổn định, xưởng cắt dây đa dây là phương án quy trình hàng đầu.', ja: 'シングルワイヤー切断と比較して、多線切断は生産効率が数十倍高く、同等の精度水準でも原材料利用率が優れています。大量生産、低公差、安定したリードタイムを求めるお客様にとって、多線切断工場は第一の選択肢です。' },
    highlights: [
      { zh: '高產能：單次切割數百片', en: 'High throughput: hundreds of slices per cut', vi: 'Năng suất cao: hàng trăm lát mỗi lần cắt', ja: '高生産性：一度に数百枚のスライスが可能' },
      { zh: '鋸縫損耗 < 0.2 mm', en: 'Kerf loss < 0.2 mm', vi: 'Hao hụt đường cắt < 0,2 mm', ja: '切断ロス < 0.2 mm' },
      { zh: '批次一致性 ±0.02 mm', en: 'Batch consistency ±0.02 mm', vi: 'Độ đồng nhất theo lô ±0,02 mm', ja: 'バッチ一貫性 ±0.02 mm' },
      { zh: '適合厚度 ≥ 0.5 mm', en: 'Suitable for thickness ≥ 0.5 mm', vi: 'Phù hợp độ dày ≥ 0,5 mm', ja: '厚さ0.5 mm以上に対応' },
    ],
    tabs: [
      {
        key: 'mw', title: { zh: '高速多線切割機', en: 'High-Speed Multi-Wire Cutting Machine' }, sub: { zh: 'Throughput · Accuracy' }, img: '/assets/workshops/multi-wire-cutting-workshop.png',
        points: [
          [{ zh: '核心優勢：', en: 'Core advantage: ', vi: 'Ưu điểm cốt lõi: ', ja: '核心的優位性：' }, { zh: '同時走 400～600 條鑽石線，單次可切割數百片，適合大批量標準規格磁片。', en: 'Runs 400–600 diamond wires simultaneously, cutting hundreds of slices per pass — suited for high-volume standard-spec magnet slices.', vi: 'Vận hành đồng thời 400–600 dây kim cương, cắt hàng trăm lát mỗi lần, phù hợp cho phiến từ quy cách tiêu chuẩn số lượng lớn.', ja: '400〜600本のダイヤモンドワイヤーを同時に走行させ、一度に数百枚を切断。大量生産される標準規格の磁石スライスに適しています。' }],
          [{ zh: '精度表現：', en: 'Precision: ', vi: 'Độ chính xác: ', ja: '精度：' }, { zh: '切片厚度一致性 ±0.02 mm，鋸縫寬度 < 0.2 mm，原材料損耗率業界最低。', en: 'Slice thickness consistency ±0.02 mm, kerf width < 0.2 mm, industry-leading raw material loss rate.', vi: 'Độ đồng nhất chiều dày lát cắt ±0,02 mm, chiều rộng đường cắt < 0,2 mm, tỷ lệ hao hụt nguyên liệu thấp nhất ngành.', ja: 'スライス厚さの一貫性 ±0.02 mm、切断幅 < 0.2 mm。業界トップクラスの低い原材料ロス率。' }],
          [{ zh: '適用範圍：', en: 'Applicable range: ', vi: 'Phạm vi áp dụng: ', ja: '適用範囲：' }, { zh: '厚度 0.5 mm 以上的圓柱、方塊磁坯，支援多種尺寸同時切割。', en: 'Cylindrical and block magnet blanks ≥ 0.5 mm thick, supports simultaneous cutting of multiple sizes.', vi: 'Phôi nam châm hình trụ, hình khối dày ≥ 0,5 mm, hỗ trợ cắt đồng thời nhiều kích thước.', ja: '厚さ0.5 mm以上の円柱・角形磁石ブランクに対応し、複数サイズの同時切断が可能です。' }],
        ],
      },
      {
        key: 'feed', title: { zh: '精密伺服進給系統', en: 'Precision Servo Feed System' }, sub: { zh: 'Stability · Consistency' }, img: '/assets/workshops/multi-wire-cutting-workshop.png',
        points: [
          [{ zh: '核心功能：', en: 'Core function: ', vi: 'Chức năng cốt lõi: ', ja: '核心機能：' }, { zh: '伺服控制進給速度與切割壓力，實時補償切割力變化，確保切割面平整。', en: 'Servo-controlled feed speed and cutting pressure with real-time compensation for cutting force variation, ensuring a flat cut surface.', vi: 'Điều khiển servo tốc độ tiến dao và áp lực cắt, bù trừ theo thời gian thực biến động lực cắt, đảm bảo bề mặt cắt phẳng.', ja: 'サーボ制御により送り速度と切断圧力を管理し、切断力の変動をリアルタイムで補正、平滑な切断面を実現します。' }],
          [{ zh: '精度指標：', en: 'Precision metrics: ', vi: 'Chỉ số độ chính xác: ', ja: '精度指標：' }, { zh: '表面粗糙度 Ra < 0.8 μm，平面度 < 0.01 mm，批次間尺寸波動極小。', en: 'Surface roughness Ra < 0.8 μm, flatness < 0.01 mm, minimal dimensional variation between batches.', vi: 'Độ nhám bề mặt Ra < 0,8 μm, độ phẳng < 0,01 mm, biến động kích thước giữa các lô rất nhỏ.', ja: '表面粗さ Ra < 0.8 μm、平面度 < 0.01 mm。バッチ間の寸法variationを最小限に抑制。' }],
          [{ zh: '系統優勢：', en: 'System advantage: ', vi: 'Ưu điểm hệ thống: ', ja: 'システム優位性：' }, { zh: '全自動張力補償，避免鑽石線斷線，大幅降低設備停機率。', en: 'Fully automatic tension compensation prevents diamond wire breakage, significantly reducing equipment downtime.', vi: 'Bù trừ lực căng tự động hoàn toàn giúp tránh đứt dây kim cương, giảm đáng kể thời gian dừng máy.', ja: '全自動テンション補正によりダイヤモンドワイヤーの断線を防止し、設備停止時間を大幅に削減します。' }],
        ],
      },
      {
        key: 'qc', title: { zh: '在線尺寸監控系統', en: 'Inline Dimensional Monitoring System' }, sub: { zh: 'Quality · Reliability' }, img: '/assets/workshops/multi-wire-cutting-workshop.png',
        points: [
          [{ zh: '監控方式：', en: 'Monitoring method: ', vi: 'Phương pháp giám sát: ', ja: '監視方式：' }, { zh: 'CCD 攝影機即時量測切片厚度，自動反饋調整進給參數。', en: 'CCD cameras measure slice thickness in real time, automatically feeding back to adjust feed parameters.', vi: 'Camera CCD đo chiều dày lát cắt theo thời gian thực, tự động phản hồi để điều chỉnh thông số tiến dao.', ja: 'CCDカメラでスライス厚さをリアルタイム測定し、送り条件へ自動フィードバック。' }],
          [{ zh: '品質保障：', en: 'Quality assurance: ', vi: 'Đảm bảo chất lượng: ', ja: '品質保証：' }, { zh: '不合格品即時剔除，確保批次合格率 > 99.5%。', en: 'Non-conforming pieces are removed immediately, ensuring a batch pass rate > 99.5%.', vi: 'Loại bỏ ngay sản phẩm không đạt, đảm bảo tỷ lệ đạt lô > 99,5%.', ja: '不良品は即座に排除し、バッチ合格率99.5%超を確保します。' }],
          [{ zh: '數據追溯：', en: 'Data traceability: ', vi: 'Truy xuất dữ liệu: ', ja: 'データトレーサビリティ：' }, { zh: '每批次切割數據自動記錄，支援品質追溯與製程優化分析。', en: 'Cutting data for every batch is automatically recorded, supporting quality traceability and process optimization analysis.', vi: 'Dữ liệu cắt của mỗi lô được ghi lại tự động, hỗ trợ truy xuất chất lượng và phân tích tối ưu hóa quy trình.', ja: '各バッチの切断データを自動記録し、品質トレーサビリティと工程最適化分析を支援します。' }],
        ],
      },
    ],
  },
  {
    id: 'laser-cutting',
    cardTitle: { zh: '激光切割車間', en: 'Laser Cutting Workshop', vi: 'Xưởng Cắt Laser', ja: 'レーザー切断工場' },
    cardDesc: { zh: '適用於異型磁件與薄板磁材的快速打樣與精確切割，具有非接觸、無應力、熱影響區小的優勢。', en: 'Suited for rapid prototyping and precision cutting of custom-shaped magnets and thin sheet material — non-contact, stress-free, with a minimal heat-affected zone.', vi: 'Phù hợp cho tạo mẫu nhanh và cắt chính xác nam châm hình dạng đặc biệt và vật liệu tấm mỏng — không tiếp xúc, không gây ứng suất, vùng ảnh hưởng nhiệt nhỏ.', ja: '異形磁石や薄板材の迅速な試作・高精度切断に適しています。非接触・無応力で熱影響部が小さいのが特長です。' },
    cardImage: '/assets/workshops/laser-cutting-workshop.png',
    badge: { zh: 'LASER CUTTING', en: 'LASER CUTTING', vi: 'LASER CUTTING', ja: 'LASER CUTTING' },
    subtitle: { zh: '異型件與快速打樣的首選', en: 'The preferred choice for custom shapes and rapid prototyping', vi: 'Lựa chọn hàng đầu cho chi tiết dị hình và tạo mẫu nhanh', ja: '異形部品と迅速な試作品づくりの第一選択' },
    intro: { zh: '激光切割適用於異型磁件、薄板磁材及小批量打樣，具有非接觸、無機械應力、熱影響區極小的特性，能實現複雜輪廓的高精度加工。', en: 'Laser cutting is suited for custom-shaped magnets, thin sheet material, and small-batch prototyping. It is non-contact with no mechanical stress and a minimal heat-affected zone, enabling high-precision machining of complex profiles.', vi: 'Cắt laser phù hợp cho nam châm hình dạng đặc biệt, vật liệu tấm mỏng và tạo mẫu số lượng nhỏ. Đây là công nghệ không tiếp xúc, không gây ứng suất cơ học, vùng ảnh hưởng nhiệt tối thiểu, cho phép gia công chính xác các biên dạng phức tạp.', ja: 'レーザー切断は異形磁石、薄板材、少量試作に適しています。非接触・無機械応力、熱影響部が極めて小さく、複雑な輪郭形状の高精度加工が可能です。' },
    whyTitle: { zh: '為什麼選擇激光切割？', en: 'Why Choose Laser Cutting?', vi: 'Tại sao chọn cắt laser?', ja: 'なぜレーザー切断を選ぶのか？' },
    whyBody: { zh: '傳統機械切割會在磁材表面留下應力殘留，影響磁性能與後道製程。激光切割完全無接觸，特別適合高精度異型件、薄板及需要快速打樣的項目，切割輪廓可直接由 CAD 檔案驅動，打樣交期最快 24 小時內完成。', en: 'Traditional mechanical cutting leaves residual stress on the magnet surface, affecting magnetic performance and downstream processes. Laser cutting is entirely non-contact, especially suited for high-precision custom shapes, thin sheets, and projects requiring rapid prototyping — the cutting profile can be driven directly from CAD files, with prototype lead times as fast as 24 hours.', vi: 'Cắt cơ khí truyền thống để lại ứng suất dư trên bề mặt nam châm, ảnh hưởng đến hiệu suất từ tính và các công đoạn tiếp theo. Cắt laser hoàn toàn không tiếp xúc, đặc biệt phù hợp cho chi tiết dị hình độ chính xác cao, tấm mỏng và các dự án cần tạo mẫu nhanh — biên dạng cắt có thể được điều khiển trực tiếp từ file CAD, thời gian tạo mẫu nhanh nhất trong 24 giờ.', ja: '従来の機械切断は磁石表面に残留応力を残し、磁気性能や後工程に影響を与えます。レーザー切断は完全非接触で、高精度な異形部品、薄板、迅速な試作が必要なプロジェクトに特に適しています。切断輪郭はCADデータから直接駆動でき、試作リードタイムは最短24時間で対応可能です。' },
    highlights: [
      { zh: '適合異型件與薄板（< 3 mm）', en: 'Suited for custom shapes and thin sheets (< 3 mm)', vi: 'Phù hợp chi tiết dị hình và tấm mỏng (< 3 mm)', ja: '異形部品・薄板（3mm未満）に対応' },
      { zh: '定位精度 ±0.01 mm', en: 'Positioning accuracy ±0.01 mm', vi: 'Độ chính xác định vị ±0,01 mm', ja: '位置決め精度 ±0.01 mm' },
      { zh: '無接觸、零應力殘留', en: 'Non-contact, zero residual stress', vi: 'Không tiếp xúc, không ứng suất dư', ja: '非接触・残留応力ゼロ' },
      { zh: '快速打樣 ≤ 24h', en: 'Rapid prototyping ≤ 24h', vi: 'Tạo mẫu nhanh ≤ 24 giờ', ja: '迅速試作 ≤ 24時間' },
    ],
    tabs: [
      {
        key: 'fiber', title: { zh: '光纖激光切割機', en: 'Fiber Laser Cutting Machine' }, sub: { zh: 'Precision · Non-contact' }, img: '/assets/workshops/laser-cutting-workshop.png',
        points: [
          [{ zh: '輸出功率：', en: 'Output power: ', vi: 'Công suất đầu ra: ', ja: '出力：' }, { zh: '500W～2kW，可依磁材厚度選擇最佳切割功率，減少熱影響區。', en: '500W–2kW, optimal cutting power selectable based on material thickness to reduce the heat-affected zone.', vi: '500W–2kW, có thể chọn công suất cắt tối ưu theo độ dày vật liệu để giảm vùng ảnh hưởng nhiệt.', ja: '500W〜2kW、材料厚さに応じて最適な切断出力を選択し、熱影響部を低減。' }],
          [{ zh: '定位精度：', en: 'Positioning accuracy: ', vi: 'Độ chính xác định vị: ', ja: '位置決め精度：' }, { zh: '伺服驅動 XY 平台，定位精度 ±0.01 mm，重複精度 ±0.005 mm。', en: 'Servo-driven XY platform, positioning accuracy ±0.01 mm, repeatability ±0.005 mm.', vi: 'Bàn XY dẫn động servo, độ chính xác định vị ±0,01 mm, độ lặp lại ±0,005 mm.', ja: 'サーボ駆動XYステージ、位置決め精度 ±0.01 mm、繰り返し精度 ±0.005 mm。' }],
          [{ zh: '切割速度：', en: 'Cutting speed: ', vi: 'Tốc độ cắt: ', ja: '切断速度：' }, { zh: '薄板（< 1 mm）最高可達 5 m/min，兼顧效率與切割品質。', en: 'Up to 5 m/min for thin sheets (< 1 mm), balancing efficiency and cut quality.', vi: 'Lên đến 5 m/phút cho tấm mỏng (< 1 mm), cân bằng hiệu suất và chất lượng cắt.', ja: '薄板（1mm未満）で最大5 m/分、効率と切断品質を両立。' }],
        ],
      },
      {
        key: 'vision', title: { zh: '高精度視覺定位系統', en: 'High-Precision Vision Positioning System' }, sub: { zh: 'Auto-align · Accuracy' }, img: '/assets/workshops/laser-cutting-workshop.png',
        points: [
          [{ zh: '對位原理：', en: 'Alignment principle: ', vi: 'Nguyên lý căn chỉnh: ', ja: '位置合わせ原理：' }, { zh: 'CCD 攝影機即時拍攝磁件位置，與 CAD 圖形自動比對後修正切割路徑。', en: 'CCD cameras capture magnet position in real time, automatically comparing against CAD geometry to correct the cutting path.', vi: 'Camera CCD chụp vị trí nam châm theo thời gian thực, tự động so sánh với hình học CAD để hiệu chỉnh đường cắt.', ja: 'CCDカメラで磁石位置をリアルタイム撮影し、CAD形状と自動照合して切断経路を補正。' }],
          [{ zh: '適用場景：', en: 'Application scenario: ', vi: 'Kịch bản áp dụng: ', ja: '適用シーン：' }, { zh: '異型磁件、有印記或特徵邊的零件，確保每片切割位置一致。', en: 'Custom-shaped magnets, parts with markings or feature edges — ensures consistent cutting position across every piece.', vi: 'Nam châm hình dạng đặc biệt, chi tiết có dấu hoặc cạnh đặc trưng — đảm bảo vị trí cắt nhất quán cho từng phiến.', ja: '異形磁石やマーキング・特徴的なエッジを持つ部品に適用し、全ての切断位置の一貫性を確保。' }],
          [{ zh: '精度表現：', en: 'Precision: ', vi: 'Độ chính xác: ', ja: '精度：' }, { zh: '視覺對位誤差 < 0.02 mm，大幅降低人工對位失誤率。', en: 'Vision alignment error < 0.02 mm, substantially reducing manual alignment mistakes.', vi: 'Sai số căn chỉnh thị giác < 0,02 mm, giảm đáng kể lỗi căn chỉnh thủ công.', ja: '視覚位置合わせ誤差 < 0.02 mm、手動位置合わせのミスを大幅に削減。' }],
        ],
      },
      {
        key: 'exhaust', title: { zh: '自動排煙除塵系統', en: 'Automatic Fume Extraction System' }, sub: { zh: 'Safety · Compliance' }, img: '/assets/workshops/laser-cutting-workshop.png',
        points: [
          [{ zh: '過濾效能：', en: 'Filtration performance: ', vi: 'Hiệu suất lọc: ', ja: 'フィルター性能：' }, { zh: '三級過濾（HEPA + 活性碳），去除 ≥ 99.97% 的 0.3 μm 微粒。', en: 'Three-stage filtration (HEPA + activated carbon), removing ≥ 99.97% of 0.3 μm particles.', vi: 'Lọc ba cấp (HEPA + than hoạt tính), loại bỏ ≥ 99,97% hạt 0,3 μm.', ja: '3段階フィルター（HEPA＋活性炭）で0.3μm粒子を99.97%以上除去。' }],
          [{ zh: '安全合規：', en: 'Safety compliance: ', vi: 'Tuân thủ an toàn: ', ja: '安全コンプライアンス：' }, { zh: '符合越南工廠排放標準，保障操作員健康與廠房環境。', en: 'Meets Vietnam factory emission standards, protecting operator health and the shop-floor environment.', vi: 'Đáp ứng tiêu chuẩn khí thải nhà máy Việt Nam, bảo vệ sức khỏe người vận hành và môi trường xưởng.', ja: 'ベトナム工場排出基準に適合し、作業員の健康と工場環境を保護。' }],
          [{ zh: '即時監控：', en: 'Real-time monitoring: ', vi: 'Giám sát thời gian thực: ', ja: 'リアルタイム監視：' }, { zh: '煙霧濃度感測器自動調節抽風量，確保切割過程的持續安全。', en: 'Smoke concentration sensors automatically adjust extraction volume, ensuring continuous safety during cutting.', vi: 'Cảm biến nồng độ khói tự động điều chỉnh lưu lượng hút, đảm bảo an toàn liên tục trong quá trình cắt.', ja: '煙濃度センサーが自動で排気量を調整し、切断中の安全性を継続的に確保。' }],
        ],
      },
    ],
  },
  {
    id: 'grinding',
    cardTitle: { zh: '研磨車間', en: 'Grinding Workshop', vi: 'Xưởng Mài', ja: '研削工場' },
    cardDesc: { zh: '全自動雙面研磨機與無心磨床，針對表面粗糙度與平面度進行極致加工，達成 μm 級精度要求。', en: 'Fully automatic double-side grinders and centerless grinders for extreme precision on surface roughness and flatness, achieving micron-level accuracy.', vi: 'Máy mài hai mặt tự động hoàn toàn và máy mài không tâm, gia công cực kỳ chính xác về độ nhám bề mặt và độ phẳng, đạt độ chính xác cấp micron.', ja: '全自動両面研削盤とセンタレス研削盤により、表面粗さと平面度を極限まで追求し、μmレベルの精度を実現します。' },
    cardImage: '/assets/workshops/grinding-workshop.png',
    badge: { zh: 'GRINDING', en: 'GRINDING', vi: 'GRINDING', ja: 'GRINDING' },
    subtitle: { zh: 'μm 級精密尺寸加工', en: 'Micron-level precision dimensional machining', vi: 'Gia công kích thước chính xác cấp micron', ja: 'μmレベルの精密寸法加工' },
    intro: { zh: '研磨車間負責磁材的精密尺寸加工，透過雙面研磨、無心磨及平面磨等設備，達成 μm 級的平面度、平行度與粗糙度要求，為後道電鍍與充磁提供最佳入料品質。', en: 'The grinding workshop handles precision dimensional machining of magnetic materials via double-side grinding, centerless grinding, and surface grinding equipment, achieving micron-level flatness, parallelism, and roughness requirements — providing optimal input quality for downstream plating and magnetizing.', vi: 'Xưởng mài đảm nhận gia công kích thước chính xác cho vật liệu từ tính thông qua thiết bị mài hai mặt, mài không tâm và mài phẳng, đạt yêu cầu độ phẳng, độ song song và độ nhám cấp micron — cung cấp chất lượng đầu vào tối ưu cho mạ điện và từ hóa ở công đoạn sau.', ja: '研削工場は両面研削・センタレス研削・平面研削設備により磁性材料の精密寸法加工を担当し、μmレベルの平面度・平行度・粗さ要求を実現。後工程のめっき・着磁に最適な入荷品質を提供します。' },
    whyTitle: { zh: '研磨對磁性能的重要性', en: 'Why Grinding Matters for Magnetic Performance', vi: 'Tầm quan trọng của mài đối với hiệu suất từ tính', ja: '研削が磁気性能に重要な理由' },
    whyBody: { zh: '磁材研磨不僅是尺寸加工，更直接影響後道製程品質。精確的平面度與平行度確保電鍍層均勻附著，良好的表面粗糙度則能提升充磁場耦合效率。研磨精度不足，往往是磁組件在客戶端發生不合格的主要原因之一。', en: 'Grinding magnetic materials is not just dimensional machining — it directly affects downstream process quality. Precise flatness and parallelism ensure even plating adhesion, while good surface roughness improves magnetizing field coupling efficiency. Insufficient grinding precision is often a leading cause of non-conforming magnetic assemblies at the customer end.', vi: 'Mài vật liệu từ tính không chỉ là gia công kích thước — nó ảnh hưởng trực tiếp đến chất lượng công đoạn sau. Độ phẳng và độ song song chính xác đảm bảo lớp mạ bám đều, trong khi độ nhám bề mặt tốt giúp nâng cao hiệu quả ghép nối từ trường khi từ hóa. Độ chính xác mài không đủ thường là nguyên nhân chính gây lỗi cụm từ tính tại khách hàng.', ja: '磁性材料の研削は単なる寸法加工ではなく、後工程の品質に直接影響します。正確な平面度・平行度はめっき層の均一な密着を保証し、良好な表面粗さは着磁時の磁場結合効率を高めます。研削精度不足は、顧客先での磁気部品不良の主要因の一つです。' },
    highlights: [
      { zh: '平行度 < 0.005 mm', en: 'Parallelism < 0.005 mm', vi: 'Độ song song < 0,005 mm', ja: '平行度 < 0.005 mm' },
      { zh: '表面粗糙度 Ra ≤ 0.4 μm', en: 'Surface roughness Ra ≤ 0.4 μm', vi: 'Độ nhám bề mặt Ra ≤ 0,4 μm', ja: '表面粗さ Ra ≤ 0.4 μm' },
      { zh: '圓度誤差 < 0.003 mm', en: 'Roundness error < 0.003 mm', vi: 'Sai số độ tròn < 0,003 mm', ja: '真円度誤差 < 0.003 mm' },
      { zh: '支援圓柱、方塊、環形', en: 'Supports cylindrical, block, and ring shapes', vi: 'Hỗ trợ hình trụ, hình khối, hình vòng', ja: '円柱・角形・リング形状に対応' },
    ],
    tabs: [
      {
        key: 'dface', title: { zh: '全自動雙面研磨機', en: 'Fully Automatic Double-Side Grinder' }, sub: { zh: 'Flatness · Parallelism' }, img: '/assets/workshops/grinding-workshop.png',
        points: [
          [{ zh: '加工方式：', en: 'Method: ', vi: 'Phương pháp: ', ja: '加工方式：' }, { zh: '磁片夾持在行星輪盤中，上下研磨輪同時研磨兩面，確保高度一致性。', en: 'Magnet pieces are held in a planetary carrier while upper and lower grinding wheels grind both faces simultaneously, ensuring height consistency.', vi: 'Phiến nam châm được kẹp trong đĩa hành tinh, đá mài trên và dưới mài đồng thời hai mặt, đảm bảo độ đồng nhất chiều cao.', ja: '磁石片を遊星キャリアに保持し、上下の砥石で両面を同時に研削、高さの一貫性を確保。' }],
          [{ zh: '精度指標：', en: 'Precision: ', vi: 'Độ chính xác: ', ja: '精度：' }, { zh: '平行度 < 0.005 mm，平面度 < 0.008 mm，表面粗糙度 Ra ≤ 0.6 μm。', en: 'Parallelism < 0.005 mm, flatness < 0.008 mm, surface roughness Ra ≤ 0.6 μm.', vi: 'Độ song song < 0,005 mm, độ phẳng < 0,008 mm, độ nhám bề mặt Ra ≤ 0,6 μm.', ja: '平行度 < 0.005 mm、平面度 < 0.008 mm、表面粗さ Ra ≤ 0.6 μm。' }],
          [{ zh: '效率優勢：', en: 'Efficiency: ', vi: 'Ưu điểm hiệu suất: ', ja: '効率：' }, { zh: '批量加工，單次可處理數十至數百片，遠優於單面磨削方式。', en: 'Batch processing of tens to hundreds of pieces per run, far exceeding single-side grinding.', vi: 'Xử lý theo lô từ hàng chục đến hàng trăm phiến mỗi lần, vượt trội so với mài một mặt.', ja: '一度に数十〜数百枚をバッチ加工、片面研削を大きく上回る効率。' }],
        ],
      },
      {
        key: 'cless', title: { zh: '無心磨床', en: 'Centerless Grinder' }, sub: { zh: 'Roundness · OD Precision' }, img: '/assets/workshops/grinding-workshop.png',
        points: [
          [{ zh: '適用範圍：', en: 'Application: ', vi: 'Phạm vi áp dụng: ', ja: '適用範囲：' }, { zh: '圓柱形、環形磁材的外徑精密加工，無需夾頭，適合大量生產。', en: 'Precision outer-diameter machining for cylindrical and ring magnets, no chuck required, suited for high-volume production.', vi: 'Gia công đường kính ngoài chính xác cho nam châm hình trụ và hình vòng, không cần mâm cặp, phù hợp sản xuất số lượng lớn.', ja: '円柱・リング磁石の高精度外径加工に対応、チャック不要で大量生産に適合。' }],
          [{ zh: '圓度精度：', en: 'Roundness precision: ', vi: 'Độ chính xác độ tròn: ', ja: '真円度精度：' }, { zh: '圓度誤差 < 0.003 mm，外徑尺寸公差可達 ±0.005 mm。', en: 'Roundness error < 0.003 mm, OD tolerance up to ±0.005 mm.', vi: 'Sai số độ tròn < 0,003 mm, dung sai đường kính ngoài đạt ±0,005 mm.', ja: '真円度誤差 < 0.003 mm、外径公差 ±0.005 mm。' }],
          [{ zh: '適合產品：', en: 'Suitable products: ', vi: 'Sản phẩm phù hợp: ', ja: '適合製品：' }, { zh: '馬達用圓柱磁、環形磁，以及需要精確外徑配合的組件。', en: 'Cylindrical and ring motor magnets, and components requiring precise OD fit.', vi: 'Nam châm động cơ hình trụ, hình vòng, và các chi tiết cần khớp đường kính ngoài chính xác.', ja: 'モーター用円柱・リング磁石、精密な外径嵌合が求められる部品に対応。' }],
        ],
      },
      {
        key: 'surf', title: { zh: '精密平面磨床', en: 'Precision Surface Grinder' }, sub: { zh: 'Mirror Finish · μm Flatness' }, img: '/assets/workshops/grinding-workshop.png',
        points: [
          [{ zh: '鏡面加工：', en: 'Mirror finishing: ', vi: 'Gia công gương: ', ja: '鏡面加工：' }, { zh: '最高可達 Ra ≤ 0.4 μm 的鏡面效果，適合有光學或精密配合要求的磁件。', en: 'Achieves mirror-like Ra ≤ 0.4 μm, suited for magnets with optical or precision-fit requirements.', vi: 'Đạt hiệu ứng gương Ra ≤ 0,4 μm, phù hợp nam châm yêu cầu quang học hoặc lắp ghép chính xác.', ja: 'Ra ≤ 0.4 μmの鏡面仕上げを実現、光学用途や精密嵌合が求められる磁石に対応。' }],
          [{ zh: '平面度：', en: 'Flatness: ', vi: 'Độ phẳng: ', ja: '平面度：' }, { zh: '配合精密工作台，平面度可達 0.003 mm，滿足最嚴格的組裝要求。', en: 'With precision worktables, flatness up to 0.003 mm, meeting the strictest assembly requirements.', vi: 'Với bàn làm việc chính xác, độ phẳng đạt 0,003 mm, đáp ứng yêu cầu lắp ráp khắt khe nhất.', ja: '精密作業台により平面度0.003mmを実現、最も厳しい組立要求にも対応。' }],
          [{ zh: '適用材質：', en: 'Applicable materials: ', vi: 'Vật liệu áp dụng: ', ja: '適用材料：' }, { zh: '燒結 NdFeB、SmCo 等各類稀土磁材，亦適合鐵氧體磁材。', en: 'Sintered NdFeB, SmCo and other rare-earth magnets, also suited for ferrite magnets.', vi: 'NdFeB thiêu kết, SmCo và các loại nam châm đất hiếm khác, cũng phù hợp cho nam châm ferrite.', ja: '焼結NdFeB、SmCoなどの希土類磁石に対応、フェライト磁石にも適用可能。' }],
        ],
      },
    ],
  },
  {
    id: 'chamfering',
    cardTitle: { zh: '倒角車間', en: 'Chamfering Workshop', vi: 'Xưởng Vát Cạnh', ja: '面取り工場' },
    cardDesc: { zh: '精確倒角與倒圓處理，有效防止磁體邊角崩裂，提升產品結構強度，並確保後續鍍層均勻度。', en: 'Precise chamfering and edge-rounding effectively prevents chipping at magnet corners, improves structural strength, and ensures uniform downstream plating.', vi: 'Vát cạnh và bo tròn chính xác giúp ngăn ngừa hiệu quả tình trạng sứt mẻ ở góc cạnh nam châm, tăng cường độ bền kết cấu và đảm bảo lớp mạ đồng đều ở công đoạn sau.', ja: '精密な面取り・角の丸め処理により磁石角部のチッピングを効果的に防止し、構造強度を高め、後工程のめっきの均一性を確保します。' },
    cardImage: '/assets/workshops/chamfering-workshop.png',
    badge: { zh: 'CHAMFERING', en: 'CHAMFERING', vi: 'CHAMFERING', ja: 'CHAMFERING' },
    subtitle: { zh: '去毛刺與倒角｜提升良率與鍍層表現', en: 'Deburring & chamfering | Improving yield and plating performance', vi: 'Tẩy ba via & vát cạnh | Nâng cao tỷ lệ đạt và hiệu quả mạ', ja: 'バリ取り・面取り｜歩留まりとめっき性能の向上' },
    intro: { zh: '倒角是量產磁材的重要製程：透過去毛刺、45° 倒角或 R 角處理消除銳邊，降低崩邊風險，並讓後續鍍層更均勻。我們會依產品尺寸、厚度與目標外觀，匹配設備與倒角石組合，確保批次一致。', en: 'Chamfering is a critical process in volume magnet production: deburring, 45° chamfering, or R-corner treatment removes sharp edges, reduces chipping risk, and produces a more uniform downstream plating result. We match equipment and media combinations to product size, thickness, and target appearance to ensure batch consistency.', vi: 'Vát cạnh là công đoạn quan trọng trong sản xuất nam châm số lượng lớn: xử lý tẩy ba via, vát 45° hoặc bo góc R giúp loại bỏ cạnh sắc, giảm nguy cơ sứt mẻ và giúp lớp mạ sau đó đồng đều hơn. Chúng tôi lựa chọn thiết bị và tổ hợp vật liệu mài phù hợp với kích thước, độ dày và ngoại quan mục tiêu của sản phẩm để đảm bảo tính nhất quán theo lô.', ja: '面取りは量産磁石製造における重要工程です。バリ取り、45°面取り、R角処理により鋭利なエッジを除去し、チッピングリスクを低減、後工程のめっきをより均一にします。製品サイズ・厚さ・目標外観に応じて設備とメディアの組み合わせを選定し、バッチの一貫性を確保します。' },
    whyTitle: { zh: '我們如何做得更穩定？', en: 'How Do We Achieve Greater Stability?', vi: 'Chúng tôi đạt được sự ổn định cao hơn như thế nào?', ja: 'どのように安定性を高めているか？' },
    whyBody: { zh: '我們以「設備 + 倒角石匹配 + 批次控管」形成可複製的製程窗口：先用試樣確認目標倒角量與外觀，再固化量產參數（載量/時間/介質狀態/清潔），讓每批都維持同樣的邊角狀態。', en: 'We build a repeatable process window through "equipment + media matching + batch control": first confirming the target chamfer amount and appearance with samples, then locking in production parameters (load, time, media condition, cleaning) so every batch maintains the same edge condition.', vi: 'Chúng tôi xây dựng cửa sổ quy trình có thể lặp lại thông qua "thiết bị + phối hợp vật liệu mài + kiểm soát theo lô": trước tiên xác nhận mức vát cạnh và ngoại quan mục tiêu bằng mẫu thử, sau đó cố định các thông số sản xuất (tải trọng, thời gian, trạng thái vật liệu mài, vệ sinh) để mỗi lô đều duy trì cùng trạng thái cạnh.', ja: '「設備＋メディアマッチング＋バッチ管理」により再現可能な工程ウィンドウを構築します。まずサンプルで目標の面取り量と外観を確認し、その後量産パラメータ（投入量、時間、メディア状態、洗浄）を固定することで、各バッチで同一のエッジ状態を維持します。' },
    highlights: [
      { zh: '去毛刺 / 45° / R 角', en: 'Deburring / 45° / R-corner', vi: 'Tẩy ba via / 45° / Bo góc R', ja: 'バリ取り／45°／R角' },
      { zh: '降低崩邊風險', en: 'Reduced chipping risk', vi: 'Giảm nguy cơ sứt mẻ', ja: 'チッピングリスク低減' },
      { zh: '倒角石匹配建議', en: 'Media matching recommendations', vi: 'Đề xuất phối hợp vật liệu mài', ja: 'メディア選定のご提案' },
      { zh: '試樣確認後量產', en: 'Sample confirmation before mass production', vi: 'Xác nhận mẫu trước khi sản xuất hàng loạt', ja: 'サンプル確認後に量産' },
    ],
    deliverTitle: { zh: '可交付項（量產前後）', en: 'Deliverables (Before & After Mass Production)', vi: 'Hạng mục bàn giao (trước & sau sản xuất hàng loạt)', ja: '納品項目（量産前後）' },
    deliverItems: [
      { zh: '試樣確認：確認倒角目標（去毛刺 / 45° / R 角）、外觀與崩邊風險。', en: 'Sample confirmation: confirm chamfering target (deburr / 45° / R-corner), appearance, and chipping risk.', vi: 'Xác nhận mẫu: xác nhận mục tiêu vát cạnh (tẩy ba via / 45° / bo góc R), ngoại quan và nguy cơ sứt mẻ.', ja: 'サンプル確認：面取り目標（バリ取り／45°／R角）、外観、チッピングリスクを確認。' },
      { zh: '倒角石建議：依尺寸/厚度/形狀，建議圓球 / 斜圓柱 / 斜三角介質與搭配方式。', en: 'Media recommendations: based on size/thickness/shape, recommend spherical / angled-cylinder / angled-triangle media combinations.', vi: 'Đề xuất vật liệu mài: dựa trên kích thước/độ dày/hình dạng, đề xuất tổ hợp vật liệu hình cầu / trụ xiên / tam giác xiên.', ja: 'メディアのご提案：サイズ・厚さ・形状に応じて球形／斜円柱／斜三角メディアの組み合わせを提案。' },
      { zh: '量產窗口：固定載量、時間、介質狀態與清潔流程，確保批次一致。', en: 'Production window: fixed load, time, media condition, and cleaning process to ensure batch consistency.', vi: 'Cửa sổ sản xuất: cố định tải trọng, thời gian, trạng thái vật liệu mài và quy trình vệ sinh để đảm bảo tính nhất quán theo lô.', ja: '量産ウィンドウ：投入量、時間、メディア状態、洗浄工程を固定しバッチ一貫性を確保。' },
      { zh: '批次追溯：關鍵參數按批次記錄，便於回溯與持續優化。', en: 'Batch traceability: key parameters recorded per batch for retrospective analysis and continuous improvement.', vi: 'Truy xuất theo lô: các thông số chính được ghi lại theo từng lô để thuận tiện tra cứu và cải tiến liên tục.', ja: 'バッチトレーサビリティ：主要パラメータをバッチごとに記録し、遡及分析と継続的改善に活用。' },
    ],
    tabs: [
      {
        key: 'barrel', title: { zh: '振動倒角機', en: 'Vibratory Tumbler' }, sub: { zh: 'Gentle · Stable' }, img: '/assets/workshops/equipment-vibratory-tumbler-1200.jpg',
        points: [
          [{ zh: '適用場景：', en: 'Application: ', vi: 'Kịch bản áp dụng: ', ja: '適用シーン：' }, { zh: '更溫和的去毛刺/圓滑處理，適合對崩邊敏感的工件與較大/較厚零件。', en: 'Gentler deburring/rounding, suited for chip-sensitive workpieces and larger/thicker parts.', vi: 'Xử lý tẩy ba via/bo tròn nhẹ nhàng hơn, phù hợp cho chi tiết nhạy cảm với sứt mẻ và chi tiết lớn/dày hơn.', ja: 'よりマイルドなバリ取り・丸め処理、チッピングに敏感なワークや大型・厚物部品に適合。' }],
          [{ zh: '加工特性：', en: 'Process characteristics: ', vi: 'Đặc tính gia công: ', ja: '加工特性：' }, { zh: '批量穩定，工藝窗口可調（介質/時間/狀態），外觀一致性佳。', en: 'Stable in batches, adjustable process window (media/time/condition), good appearance consistency.', vi: 'Ổn định theo lô, cửa sổ quy trình có thể điều chỉnh (vật liệu mài/thời gian/trạng thái), tính nhất quán ngoại quan tốt.', ja: 'バッチ安定性が高く、工程ウィンドウ（メディア／時間／状態）を調整可能、外観の一貫性も良好。' }],
          [{ zh: '建議做法：', en: 'Recommended approach: ', vi: 'Cách tiếp cận đề xuất: ', ja: '推奨アプローチ：' }, { zh: '以試樣確認外觀後再量產，確保長期一致。', en: 'Confirm appearance with samples before mass production to ensure long-term consistency.', vi: 'Xác nhận ngoại quan bằng mẫu trước khi sản xuất hàng loạt để đảm bảo tính nhất quán lâu dài.', ja: '量産前にサンプルで外観を確認し、長期的な一貫性を確保することを推奨。' }],
        ],
      },
      {
        key: 'cnc', title: { zh: '離心倒角機', en: 'Centrifugal Chamfering Machine' }, sub: { zh: 'Throughput · Uniformity' }, img: '/assets/workshops/equipment-centrifugal-deburring-1200.jpg',
        points: [
          [{ zh: '適用場景：', en: 'Application: ', vi: 'Kịch bản áp dụng: ', ja: '適用シーン：' }, { zh: '中小件批量倒角，追求效率與一致性。', en: 'Batch chamfering for small-to-medium parts, prioritizing efficiency and consistency.', vi: 'Vát cạnh theo lô cho chi tiết nhỏ đến trung bình, ưu tiên hiệu suất và tính nhất quán.', ja: '中小部品のバッチ面取り、効率と均一性を重視。' }],
          [{ zh: '加工特性：', en: 'Process characteristics: ', vi: 'Đặc tính gia công: ', ja: '加工特性：' }, { zh: '節拍快、倒角均勻；可依需求做溫和精修或高效去角。', en: 'Fast cycle time, uniform chamfering; can be tuned for gentle finishing or high-efficiency edge removal as needed.', vi: 'Thời gian chu kỳ nhanh, vát cạnh đồng đều; có thể điều chỉnh để hoàn thiện nhẹ nhàng hoặc loại bỏ cạnh hiệu quả cao theo nhu cầu.', ja: 'サイクルタイムが速く面取りが均一。ニーズに応じて穏やかな仕上げまたは高効率なエッジ除去に調整可能。' }],
          [{ zh: '交期優勢：', en: 'Lead time advantage: ', vi: 'Ưu điểm thời gian giao hàng: ', ja: 'リードタイム優位性：' }, { zh: '適合大批量交期與一致性要求。', en: 'Suited for high-volume lead time and consistency requirements.', vi: 'Phù hợp cho yêu cầu thời gian giao hàng số lượng lớn và tính nhất quán.', ja: '大量生産のリードタイムと一貫性要求に適合。' }],
        ],
      },
      {
        key: 'clean', title: { zh: '倒角石與適用產品', en: 'Chamfering Media & Applicable Products' }, sub: { zh: 'Media · Matching' }, img: '/assets/workshops/chamfer-media-collage-1200.jpg',
        points: [
          [{ zh: '圓球倒角石：', en: 'Spherical media: ', vi: 'Vật liệu mài hình cầu: ', ja: '球形メディア：' }, { zh: '通用型，適合均勻去毛刺與圓滑過渡；小件可用更小規格以降低崩邊。', en: 'General-purpose, suited for uniform deburring and smooth transitions; smaller sizes can be used on small parts to reduce chipping.', vi: 'Đa dụng, phù hợp cho tẩy ba via đồng đều và chuyển tiếp mượt mà; kích thước nhỏ hơn có thể dùng cho chi tiết nhỏ để giảm sứt mẻ.', ja: '汎用タイプ、均一なバリ取りと滑らかな移行に適し、小型部品にはより小さいサイズでチッピングを低減。' }],
          [{ zh: '斜圓柱倒角石：', en: 'Angled-cylinder media: ', vi: 'Vật liệu mài trụ xiên: ', ja: '斜円柱メディア：' }, { zh: '更利於形成穩定 R 角效果，適合需要圓弧過渡與外觀一致性的產品。', en: 'Better for forming a stable R-corner effect, suited for products requiring rounded transitions and appearance consistency.', vi: 'Tốt hơn cho hình thành hiệu ứng bo góc R ổn định, phù hợp cho sản phẩm cần chuyển tiếp cong và tính nhất quán ngoại quan.', ja: '安定したR角形成に有利で、丸みのある移行と外観の一貫性が求められる製品に適合。' }],
          [{ zh: '斜三角倒角石：', en: 'Angled-triangle media: ', vi: 'Vật liệu mài tam giác xiên: ', ja: '斜三角メディア：' }, { zh: '更利於形成標準 45° 倒角，適合需要明確斜角輪廓的產品。', en: 'Better for forming a standard 45° chamfer, suited for products requiring a clearly defined angled profile.', vi: 'Tốt hơn cho hình thành vát cạnh 45° tiêu chuẩn, phù hợp cho sản phẩm cần biên dạng góc xiên rõ ràng.', ja: '標準的な45°面取りの形成に有利で、明確な斜め輪郭が求められる製品に適合。' }],
        ],
      },
    ],
  },
  {
    id: 'assembly-magnetizing',
    cardTitle: { zh: '組裝充磁車間', en: 'Assembly & Magnetizing Workshop', vi: 'Xưởng Lắp Ráp & Từ Hóa', ja: '組立・着磁工場' },
    cardDesc: { zh: '配備高能脈衝充磁機與自動組裝線，提供磁組件一站式從膠合到充磁的整合方案。', en: 'Equipped with high-energy pulse magnetizers and automated assembly lines, offering a one-stop solution for magnetic assemblies from bonding through magnetizing.', vi: 'Trang bị máy từ hóa xung năng lượng cao và dây chuyền lắp ráp tự động, cung cấp giải pháp trọn gói từ dán keo đến từ hóa cho cụm từ tính.', ja: '高エネルギーパルス着磁機と自動組立ラインを備え、接着から着磁までの磁性部品ワンストップソリューションを提供します。' },
    cardImage: '/assets/workshops/assembly-and-magnetizing-workshop.png',
    badge: { zh: 'ASSEMBLY & MAGNETIZING', en: 'ASSEMBLY & MAGNETIZING', vi: 'ASSEMBLY & MAGNETIZING', ja: 'ASSEMBLY & MAGNETIZING' },
    subtitle: { zh: '磁性組件一站式整合服務', en: 'One-stop integration for magnetic assemblies', vi: 'Tích hợp trọn gói cho cụm từ tính', ja: '磁性部品のワンストップ統合サービス' },
    intro: { zh: '組裝充磁車間提供磁性組件的一站式整合服務，從膠合、壓裝到充磁，全程自動化或半自動化作業，確保充磁飽和度與組裝精度達到客戶規格。', en: 'The assembly & magnetizing workshop offers a one-stop integrated service for magnetic assemblies — from bonding and press-fitting to magnetizing — fully or semi-automated, ensuring magnetizing saturation and assembly precision meet customer specifications.', vi: 'Xưởng lắp ráp & từ hóa cung cấp dịch vụ tích hợp trọn gói cho cụm từ tính — từ dán keo, ép đến từ hóa — vận hành tự động hoàn toàn hoặc bán tự động, đảm bảo độ bão hòa từ hóa và độ chính xác lắp ráp đạt yêu cầu khách hàng.', ja: '組立・着磁工場は接着、圧入から着磁までの磁性部品ワンストップ統合サービスを提供します。全自動または半自動で運用し、着磁飽和度と組立精度が顧客仕様に適合することを保証します。' },
    whyTitle: { zh: '為什麼需要在製造端充磁？', en: 'Why Magnetize at the Manufacturing Stage?', vi: 'Tại sao cần từ hóa ở giai đoạn sản xuất?', ja: 'なぜ製造段階で着磁するのか？' },
    whyBody: { zh: '部分客戶選擇未充磁的毛坯（"Green Magnets"）自行組裝後再充磁，但這需要昂貴的充磁設備與嚴格的操作規範。由 SINOWIN 在製造端完成充磁，客戶可直接取到成品磁性組件，降低工廠設備投資，同時確保充磁均勻性與一致性由我們負責品質保障。', en: 'Some customers choose unmagnetized blanks ("green magnets") to assemble themselves before magnetizing, but this requires expensive magnetizing equipment and strict operating protocols. With SINOWIN completing magnetizing at the manufacturing stage, customers receive finished magnetic assemblies directly, reducing their equipment investment while we take responsibility for magnetizing uniformity and consistency.', vi: 'Một số khách hàng chọn phôi chưa từ hóa ("nam châm xanh") để tự lắp ráp rồi mới từ hóa, nhưng điều này đòi hỏi thiết bị từ hóa đắt tiền và quy trình vận hành nghiêm ngặt. Khi SINOWIN hoàn thành từ hóa ngay tại giai đoạn sản xuất, khách hàng nhận được cụm từ tính thành phẩm trực tiếp, giảm đầu tư thiết bị nhà máy, đồng thời chúng tôi chịu trách nhiệm đảm bảo tính đồng đều và nhất quán của từ hóa.', ja: '一部のお客様は未着磁のブランク（「グリーンマグネット」）を選び、組立後に自ら着磁を行いますが、これには高価な着磁設備と厳格な操作基準が必要です。SINOWINが製造段階で着磁を完了することで、お客様は完成品の磁性部品を直接受け取ることができ、設備投資を削減できます。着磁の均一性と一貫性の品質保証は当社が責任を持って行います。' },
    highlights: [
      { zh: '充磁飽和度 ≥ 99%', en: 'Magnetizing saturation ≥ 99%', vi: 'Độ bão hòa từ hóa ≥ 99%', ja: '着磁飽和度 ≥ 99%' },
      { zh: '支援多極充磁 (Halbach)', en: 'Supports multi-pole magnetizing (Halbach)', vi: 'Hỗ trợ từ hóa đa cực (Halbach)', ja: '多極着磁対応（Halbach）' },
      { zh: '組裝公差 ±0.03 mm', en: 'Assembly tolerance ±0.03 mm', vi: 'Dung sai lắp ráp ±0,03 mm', ja: '組立公差 ±0.03 mm' },
      { zh: '100% 磁通量全檢', en: '100% magnetic flux inspection', vi: 'Kiểm tra 100% từ thông', ja: '磁束100%全数検査' },
    ],
    tabs: [
      {
        key: 'mag', title: { zh: '高能脈衝充磁機', en: 'High-Energy Pulse Magnetizer' }, sub: { zh: 'Saturation · Multi-pole' }, img: '/assets/workshops/assembly-and-magnetizing-workshop.png',
        points: [
          [{ zh: '磁場強度：', en: 'Field strength: ', vi: 'Cường độ từ trường: ', ja: '磁場強度：' }, { zh: '瞬間輸出磁場可達 4T，確保各牌號 NdFeB 完全充磁飽和，包括高矯頑力 SH/UH/EH 等牌號。', en: 'Instantaneous output field up to 4T, ensuring full magnetizing saturation for all NdFeB grades, including high-coercivity SH/UH/EH grades.', vi: 'Từ trường xuất tức thời đạt 4T, đảm bảo bão hòa từ hóa hoàn toàn cho mọi mác NdFeB, kể cả các mác lực kháng từ cao SH/UH/EH.', ja: '瞬間出力磁場は最大4T、SH/UH/EHなど高保磁力グレードを含む全NdFeBグレードで完全な着磁飽和を確保。' }],
          [{ zh: '充磁方式：', en: 'Magnetizing methods: ', vi: 'Phương pháp từ hóa: ', ja: '着磁方式：' }, { zh: '支援軸向、徑向、多極（Halbach、交錯多極等）充磁，可依客戶圖紙客製充磁治具。', en: 'Supports axial, radial, and multi-pole (Halbach, interleaved multi-pole, etc.) magnetizing, with custom fixtures per customer drawings.', vi: 'Hỗ trợ từ hóa hướng trục, hướng kính, đa cực (Halbach, đa cực xen kẽ, v.v.), có thể tùy chỉnh đồ gá theo bản vẽ khách hàng.', ja: '軸方向、径方向、多極（Halbach、交互多極など）着磁に対応し、顧客図面に応じたカスタム治具を製作。' }],
          [{ zh: '在線驗證：', en: 'Inline verification: ', vi: 'Xác minh trực tuyến: ', ja: 'インライン検証：' }, { zh: '充磁後即時量測磁通量，與標準值比對，確保每個零件充磁品質符合規格。', en: 'Magnetic flux is measured immediately after magnetizing and compared against standard values, ensuring every part meets specification.', vi: 'Từ thông được đo ngay sau khi từ hóa và so sánh với giá trị chuẩn, đảm bảo mỗi chi tiết đạt tiêu chuẩn từ hóa.', ja: '着磁後直ちに磁束を測定し標準値と比較、各部品の着磁品質が規格に適合することを確認。' }],
        ],
      },
      {
        key: 'assy', title: { zh: '自動點膠組裝線', en: 'Automated Dispensing & Assembly Line' }, sub: { zh: 'Bonding · Positioning' }, img: '/assets/workshops/assembly-and-magnetizing-workshop.png',
        points: [
          [{ zh: '點膠精度：', en: 'Dispensing precision: ', vi: 'Độ chính xác bôi keo: ', ja: 'ディスペンス精度：' }, { zh: '精密點膠閥控制膠量 ±1 mg，確保膠合強度一致性，避免溢膠與缺膠。', en: 'Precision dispensing valves control adhesive volume to ±1 mg, ensuring consistent bond strength and avoiding overflow or insufficient adhesive.', vi: 'Van định lượng keo chính xác kiểm soát lượng keo ±1 mg, đảm bảo độ bền liên kết đồng nhất, tránh tràn hoặc thiếu keo.', ja: '精密ディスペンスバルブで接着剤量を±1mgに制御し、接着強度の一貫性を確保、接着剤の溢れや不足を防止。' }],
          [{ zh: '組裝精度：', en: 'Assembly precision: ', vi: 'Độ chính xác lắp ráp: ', ja: '組立精度：' }, { zh: '自動壓裝定位夾具，組裝位置公差 ±0.03 mm，適合高精度磁性組件。', en: 'Automated press-fit positioning fixtures achieve assembly position tolerance ±0.03 mm, suited for high-precision magnetic assemblies.', vi: 'Đồ gá định vị ép tự động đạt dung sai vị trí lắp ráp ±0,03 mm, phù hợp cho cụm từ tính độ chính xác cao.', ja: '自動圧入位置決め治具により組立位置公差±0.03mmを実現、高精度磁性部品に対応。' }],
          [{ zh: '固化管理：', en: 'Curing management: ', vi: 'Quản lý đông cứng: ', ja: '硬化管理：' }, { zh: '恆溫固化烤箱確保膠水完全固化，提供固化曲線數據供品質追溯。', en: 'Constant-temperature curing ovens ensure full adhesive cure, with curing curve data provided for quality traceability.', vi: 'Lò sấy nhiệt độ ổn định đảm bảo keo đông cứng hoàn toàn, cung cấp dữ liệu đường cong đông cứng để truy xuất chất lượng.', ja: '恒温硬化炉で接着剤の完全硬化を確保し、硬化曲線データを品質トレーサビリティ用に提供。' }],
        ],
      },
      {
        key: 'flux', title: { zh: '充磁後磁通量檢測', en: 'Post-Magnetizing Flux Inspection' }, sub: { zh: '100% Inspection' }, img: '/assets/workshops/assembly-and-magnetizing-workshop.png',
        points: [
          [{ zh: '檢測方式：', en: 'Method: ', vi: 'Phương pháp: ', ja: '検査方法：' }, { zh: '霍爾效應感測器或通量計，逐件量測磁通量 Φ 值，與客戶規格上下限比對。', en: 'Hall-effect sensors or fluxmeters measure flux value Φ piece-by-piece, compared against the customer\'s upper/lower spec limits.', vi: 'Cảm biến hiệu ứng Hall hoặc máy đo từ thông đo giá trị từ thông Φ từng chi tiết, so sánh với giới hạn trên/dưới theo yêu cầu khách hàng.', ja: 'ホール効果センサーまたはフラックスメーターで磁束値Φを1個ずつ測定し、顧客規格の上下限と比較。' }],
          [{ zh: '篩選效率：', en: 'Screening efficiency: ', vi: 'Hiệu suất phân loại: ', ja: '選別効率：' }, { zh: '全自動分選，不合格品自動剔除，檢測速度 > 1,000 件/小時。', en: 'Fully automated sorting, non-conforming pieces removed automatically, inspection speed > 1,000 pieces/hour.', vi: 'Phân loại tự động hoàn toàn, tự động loại bỏ sản phẩm không đạt, tốc độ kiểm tra > 1.000 chiếc/giờ.', ja: '全自動選別、不良品を自動排除、検査速度は1,000個/時間以上。' }],
          [{ zh: '數據記錄：', en: 'Data recording: ', vi: 'Ghi nhận dữ liệu: ', ja: 'データ記録：' }, { zh: '每件檢測結果自動儲存，支援 SPC 分析、批次追溯與客戶報告輸出。', en: 'Every inspection result is automatically stored, supporting SPC analysis, batch traceability, and customer report generation.', vi: 'Mọi kết quả kiểm tra được lưu trữ tự động, hỗ trợ phân tích SPC, truy xuất theo lô và xuất báo cáo cho khách hàng.', ja: '全ての検査結果を自動保存し、SPC分析、バッチトレーサビリティ、顧客向けレポート出力を支援。' }],
        ],
      },
    ],
  },
  {
    id: 'testing-lab',
    cardTitle: { zh: '測試實驗室', en: 'Testing Laboratory', vi: 'Phòng Thí Nghiệm Kiểm Tra', ja: '試験ラボ' },
    cardDesc: { zh: '包含退磁曲線測試、環境可靠度 (PCT/HAST) 及精密尺寸檢測，確保每一批次產品均符合國際規範。', en: 'Includes demagnetization curve testing, environmental reliability (PCT/HAST), and precision dimensional inspection, ensuring every batch meets international standards.', vi: 'Bao gồm thử nghiệm đường cong khử từ, độ tin cậy môi trường (PCT/HAST) và kiểm tra kích thước chính xác, đảm bảo mỗi lô sản phẩm đáp ứng tiêu chuẩn quốc tế.', ja: '減磁曲線試験、環境信頼性試験（PCT/HAST）、精密寸法検査を含み、全バッチが国際規格に適合することを保証します。' },
    cardImage: '/assets/workshops/testing-laboratory.png',
    badge: { zh: 'TESTING LAB', en: 'TESTING LAB', vi: 'TESTING LAB', ja: 'TESTING LAB' },
    subtitle: { zh: '品質保證的最後防線', en: 'The last line of defense for quality assurance', vi: 'Tuyến phòng thủ cuối cùng cho đảm bảo chất lượng', ja: '品質保証の最後の砦' },
    intro: { zh: '測試實驗室是品質保證的最後防線，涵蓋磁性能、環境可靠度與尺寸精度三大檢測領域，確保每批次出貨產品符合客戶規範與國際標準。', en: 'The testing laboratory is the last line of defense for quality assurance, covering magnetic performance, environmental reliability, and dimensional accuracy — ensuring every shipped batch meets customer specifications and international standards.', vi: 'Phòng thí nghiệm kiểm tra là tuyến phòng thủ cuối cùng cho đảm bảo chất lượng, bao gồm ba lĩnh vực kiểm tra chính: hiệu suất từ tính, độ tin cậy môi trường và độ chính xác kích thước, đảm bảo mỗi lô hàng xuất xưởng đáp ứng thông số khách hàng và tiêu chuẩn quốc tế.', ja: '試験ラボは品質保証の最後の砦であり、磁気性能、環境信頼性、寸法精度の3大検査分野をカバー。出荷される全バッチが顧客仕様と国際規格に適合することを保証します。' },
    whyTitle: { zh: '為什麼選擇 SINOWIN 的實驗室？', en: "Why Choose SINOWIN's Laboratory?", vi: 'Tại sao chọn phòng thí nghiệm của SINOWIN?', ja: 'なぜSINOWINの試験ラボを選ぶのか？' },
    whyBody: { zh: '許多磁材供應商只提供基本的磁通量抽測，SINOWIN 實驗室提供完整的 BH 曲線量測、環境可靠度測試與三維尺寸驗證，讓客戶工程師能直接取得足夠的設計驗證數據，縮短新品導入週期，降低因材料規格不符導致的設計返工風險。', en: "Many magnetic material suppliers offer only basic flux sampling. SINOWIN's laboratory provides full BH curve measurement, environmental reliability testing, and 3D dimensional verification — giving customer engineers direct access to sufficient design validation data, shortening new-product introduction cycles and reducing redesign risk from material spec mismatches.", vi: 'Nhiều nhà cung cấp vật liệu từ tính chỉ cung cấp lấy mẫu từ thông cơ bản. Phòng thí nghiệm của SINOWIN cung cấp đo đường cong BH đầy đủ, thử nghiệm độ tin cậy môi trường và xác minh kích thước 3D — giúp kỹ sư khách hàng có được đủ dữ liệu xác nhận thiết kế trực tiếp, rút ngắn chu kỳ đưa sản phẩm mới vào sản xuất và giảm rủi ro thiết kế lại do sai lệch thông số vật liệu.', ja: '多くの磁性材料サプライヤーは基本的な磁束抜き取り検査のみを提供しています。SINOWINの試験ラボは完全なBH曲線測定、環境信頼性試験、3次元寸法検証を提供し、顧客エンジニアが直接十分な設計検証データを取得できるようにします。これにより新製品導入サイクルを短縮し、材料仕様の不一致による設計手戻りリスクを低減します。' },
    highlights: [
      { zh: 'BH 曲線全項磁性能報告', en: 'Full BH curve magnetic performance report', vi: 'Báo cáo hiệu suất từ tính đầy đủ theo đường cong BH', ja: 'BH曲線全項目磁気性能レポート' },
      { zh: 'PCT / HAST 可靠度驗證', en: 'PCT / HAST reliability verification', vi: 'Xác minh độ tin cậy PCT / HAST', ja: 'PCT／HAST信頼性検証' },
      { zh: 'CMM 不確定度 < 1 μm', en: 'CMM uncertainty < 1 μm', vi: 'Độ không đảm bảo đo CMM < 1 μm', ja: 'CMM不確かさ < 1 μm' },
      { zh: '支援第三方見證驗收', en: 'Supports third-party witness acceptance', vi: 'Hỗ trợ nghiệm thu chứng kiến bởi bên thứ ba', ja: '第三者立会検収に対応' },
    ],
    tabs: [
      {
        key: 'bh', title: { zh: '退磁曲線測試儀', en: 'Demagnetization Curve Tracer' }, sub: { zh: 'Br · Hcj · (BH)max' }, img: '/assets/workshops/testing-laboratory.png',
        points: [
          [{ zh: '測量參數：', en: 'Measurement parameters: ', vi: 'Thông số đo lường: ', ja: '測定パラメータ：' }, { zh: '完整 BH 磁滯迴路，量測 Br（剩磁）、Hcb（矯頑力）、Hcj（內禀矯頑力）、(BH)max（最大磁能積）。', en: 'Full BH hysteresis loop, measuring Br (remanence), Hcb (coercivity), Hcj (intrinsic coercivity), and (BH)max (maximum energy product).', vi: 'Vòng từ trễ BH đầy đủ, đo Br (từ dư), Hcb (lực kháng từ), Hcj (lực kháng từ nội tại), (BH)max (tích năng lượng cực đại).', ja: '完全なBHヒステリシスループを測定し、Br（残留磁束密度）、Hcb（保磁力）、Hcj（固有保磁力）、(BH)max（最大エネルギー積）を計測。' }],
          [{ zh: '溫度測試：', en: 'Temperature testing: ', vi: 'Thử nghiệm nhiệt độ: ', ja: '温度試験：' }, { zh: '可搭配溫控腔，量測磁材在 -40°C ～ 200°C 溫度範圍內的磁性能變化（Tc 係數）。', en: 'Can be paired with a temperature-controlled chamber to measure magnetic property changes from -40°C to 200°C (Tc coefficient).', vi: 'Có thể kết hợp buồng kiểm soát nhiệt độ để đo biến đổi tính chất từ trong khoảng -40°C đến 200°C (hệ số Tc).', ja: '温度制御チャンバーと組み合わせ、-40°C〜200°Cの範囲での磁気特性変化（Tc係数）を測定可能。' }],
          [{ zh: '客戶報告：', en: 'Customer reports: ', vi: 'Báo cáo khách hàng: ', ja: '顧客レポート：' }, { zh: '每批次出具完整 BH 曲線報告，包含統計 Cpk 分析，供客戶產品設計驗證使用。', en: 'Full BH curve report issued per batch, including Cpk statistical analysis, for customer product design validation.', vi: 'Xuất báo cáo đường cong BH đầy đủ theo từng lô, bao gồm phân tích thống kê Cpk, phục vụ xác nhận thiết kế sản phẩm của khách hàng.', ja: 'バッチごとに完全なBH曲線レポートを発行、Cpk統計分析を含み、顧客の製品設計検証に活用。' }],
        ],
      },
      {
        key: 'env', title: { zh: '環境可靠度測試設備', en: 'Environmental Reliability Test Equipment' }, sub: { zh: 'PCT · HAST · Salt Spray' }, img: '/assets/workshops/testing-laboratory.png',
        points: [
          [{ zh: 'PCT 測試：', en: 'PCT testing: ', vi: 'Thử nghiệm PCT: ', ja: 'PCT試験：' }, { zh: '壓力蒸煮測試（121°C / 2atm / 100% RH），驗證鍍層在極端高溫高濕下的防腐蝕能力。', en: 'Pressure cooker test (121°C / 2atm / 100% RH), verifying coating corrosion resistance under extreme high temperature and humidity.', vi: 'Thử nghiệm nồi áp suất (121°C / 2atm / 100% RH), xác minh khả năng chống ăn mòn của lớp phủ trong điều kiện nhiệt độ và độ ẩm cực cao.', ja: 'プレッシャークッカー試験（121°C／2atm／湿度100%）で高温高湿下でのコーティング耐食性を検証。' }],
          [{ zh: '鹽霧測試：', en: 'Salt spray testing: ', vi: 'Thử nghiệm phun muối: ', ja: '塩水噴霧試験：' }, { zh: '依 ASTM B117 / ISO 9227 標準執行，驗證鍍層的中性鹽霧耐蝕性。', en: 'Performed per ASTM B117 / ISO 9227 standards, verifying neutral salt spray corrosion resistance of coatings.', vi: 'Thực hiện theo tiêu chuẩn ASTM B117 / ISO 9227, xác minh khả năng chống ăn mòn sương muối trung tính của lớp phủ.', ja: 'ASTM B117／ISO 9227規格に準拠し、コーティングの中性塩水噴霧耐食性を検証。' }],
          [{ zh: 'HAST 測試：', en: 'HAST testing: ', vi: 'Thử nghiệm HAST: ', ja: 'HAST試験：' }, { zh: '高加速應力測試，模擬磁件在長期使用環境下的壽命與可靠性。', en: 'Highly Accelerated Stress Test, simulating long-term in-use lifetime and reliability of magnetic parts.', vi: 'Thử nghiệm ứng suất tăng tốc cao, mô phỏng tuổi thọ và độ tin cậy của chi tiết từ tính trong môi trường sử dụng lâu dài.', ja: '高加速寿命試験（HAST）により、磁性部品の長期使用環境での寿命と信頼性をシミュレート。' }],
        ],
      },
      {
        key: 'cmm', title: { zh: '三次元量測儀 (CMM)', en: 'Coordinate Measuring Machine' }, sub: { zh: '3D Dimensional · μm Accuracy' }, img: '/assets/workshops/testing-laboratory.png',
        points: [
          [{ zh: '量測能力：', en: 'Measurement capability: ', vi: 'Khả năng đo lường: ', ja: '測定能力：' }, { zh: '高精度三維座標量測，量測不確定度 < 1 μm，適合複雜幾何形狀磁件的全尺寸檢測。', en: 'High-precision 3D coordinate measurement with uncertainty < 1 μm, suited for full-dimensional inspection of complex-geometry magnets.', vi: 'Đo tọa độ 3D độ chính xác cao với độ không đảm bảo đo < 1 μm, phù hợp kiểm tra toàn diện kích thước cho nam châm hình học phức tạp.', ja: '不確かさ<1μmの高精度3次元座標測定、複雑形状磁石の全寸法検査に対応。' }],
          [{ zh: '適用範圍：', en: 'Application range: ', vi: 'Phạm vi áp dụng: ', ja: '適用範囲：' }, { zh: '異型磁件、孔位、弧面等用手動量具無法有效量測的幾何特徵。', en: 'Custom-shaped magnets, bore positions, arc surfaces, and other geometric features that manual gauges cannot effectively measure.', vi: 'Nam châm hình dạng đặc biệt, vị trí lỗ, bề mặt cung tròn và các đặc điểm hình học khác mà dụng cụ đo thủ công không thể đo hiệu quả.', ja: '異形磁石、穴位置、円弧面など、手動測定器では効果的に測定できない幾何特徴に対応。' }],
          [{ zh: '品質追溯：', en: 'Quality traceability: ', vi: 'Truy xuất chất lượng: ', ja: '品質トレーサビリティ：' }, { zh: '量測數據自動輸出至 SPC 系統，形成可追溯的尺寸品質記錄。', en: 'Measurement data is automatically output to the SPC system, forming traceable dimensional quality records.', vi: 'Dữ liệu đo được xuất tự động sang hệ thống SPC, hình thành hồ sơ chất lượng kích thước có thể truy xuất.', ja: '測定データはSPCシステムへ自動出力され、トレーサビリティ可能な寸法品質記録を形成。' }],
        ],
      },
    ],
  },
  {
    id: 'fixture-tooling',
    cardTitle: { zh: '輔具加工車間', en: 'Tooling & Fixture Workshop', vi: 'Xưởng Gia Công Đồ Gá', ja: '治具加工工場' },
    cardDesc: { zh: '專用於生產製程輔具與治具之精密加工區，支援異型加工、組裝與品質穩定性，確保量產一致性與現場作業效率。', en: 'A precision machining area dedicated to production-process tooling and fixtures, supporting custom-shape machining, assembly, and quality stability to ensure mass-production consistency and on-site efficiency.', vi: 'Khu vực gia công chính xác chuyên dụng cho đồ gá và dụng cụ quy trình sản xuất, hỗ trợ gia công hình dạng đặc biệt, lắp ráp và ổn định chất lượng, đảm bảo tính nhất quán sản xuất hàng loạt và hiệu quả tại hiện trường.', ja: '生産工程用の治具・工装を専門とする精密加工エリア。異形加工、組立、品質安定性をサポートし、量産の一貫性と現場作業効率を確保します。' },
    cardImage: '/assets/workshops/fixture-workshop-jig-and-fixture-machining.png',
    badge: { zh: 'TOOLING & FIXTURE WORKSHOP', en: 'TOOLING & FIXTURE WORKSHOP', vi: 'TOOLING & FIXTURE WORKSHOP', ja: 'TOOLING & FIXTURE WORKSHOP' },
    subtitle: { zh: '設備介紹', en: 'Equipment Overview', vi: 'Giới thiệu thiết bị', ja: '設備紹介' },
    intro: { zh: '以釹鐵硼輔具加工需求為核心配置。我們選擇把治具製作放在自己工廠內完成，讓成本、交期與品質都可控。', en: 'Configured around NdFeB tooling machining needs. We chose to bring tooling fabrication in-house so that cost, lead time, and quality all remain within our control.', vi: 'Được cấu hình xoay quanh nhu cầu gia công đồ gá cho NdFeB. Chúng tôi lựa chọn thực hiện chế tạo đồ gá ngay trong nhà máy để chi phí, thời gian giao hàng và chất lượng đều có thể kiểm soát được.', ja: 'NdFeB治具加工ニーズを中心に構成。治具製作を自社工場内で完結させることで、コスト、リードタイム、品質のすべてを管理下に置いています。' },
    whyTitle: { zh: '為什麼選擇內製？', en: 'Why Choose In-House Production?', vi: 'Tại sao chọn sản xuất nội bộ?', ja: 'なぜ内製を選ぶのか？' },
    whyBody: { zh: '在越南，輔具加工市場普遍存在「加工能力落差」與「費用偏高」兩個痛點。對於需要長期穩定量產的專案，我們選擇把治具製作放在自己工廠內完成，讓成本、交期與品質都可控。', en: 'In Vietnam, the tooling machining market commonly suffers from two pain points: a "capability gap" and "high costs." For projects requiring long-term stable mass production, we chose to bring tooling fabrication in-house so that cost, lead time, and quality all remain within our control.', vi: 'Tại Việt Nam, thị trường gia công đồ gá thường tồn tại hai điểm khó khăn phổ biến: "khoảng cách năng lực gia công" và "chi phí cao". Đối với các dự án cần sản xuất hàng loạt ổn định lâu dài, chúng tôi lựa chọn thực hiện chế tạo đồ gá ngay trong nhà máy để chi phí, thời gian giao hàng và chất lượng đều có thể kiểm soát được.', ja: 'ベトナムの治具加工市場には「加工能力のギャップ」と「コストの高さ」という2つの共通課題があります。長期安定した量産が必要なプロジェクトについては、治具製作を自社工場内で完結させることで、コスト、リードタイム、品質のすべてを管理下に置くことを選択しています。' },
    highlights: [
      { zh: '設計修改、治具迭代不需等待外包排程，支援快速工程變更', en: "Design changes and tooling iteration don't wait on outsourced scheduling — supports rapid engineering changes", vi: 'Thay đổi thiết kế và lặp lại đồ gá không cần chờ lịch trình thuê ngoài — hỗ trợ thay đổi kỹ thuật nhanh chóng', ja: '設計変更・治具の反復は外注スケジュールを待たず、迅速なエンジニアリング変更に対応' },
      { zh: '治具精度、裝配定位與作業節拍可被標準化，降低批次波動', en: 'Tooling precision, assembly positioning, and takt time can be standardized, reducing batch variation', vi: 'Độ chính xác đồ gá, định vị lắp ráp và nhịp độ làm việc có thể được chuẩn hóa, giảm biến động theo lô', ja: '治具精度、組立位置決め、タクトタイムを標準化し、バッチ変動を低減' },
      { zh: '以內部標準管理加工流程與檢驗節點，避免外包品質風險疊加', en: 'Internal standards govern the machining process and inspection points, avoiding compounded quality risk from outsourcing', vi: 'Tiêu chuẩn nội bộ quản lý quy trình gia công và điểm kiểm tra, tránh rủi ro chất lượng chồng chất từ việc thuê ngoài', ja: '社内標準で加工工程と検査ポイントを管理し、外注による品質リスクの積み重ねを回避' },
      { zh: '降低關鍵工裝外流，提升專案資料控管強度', en: 'Reduces leakage of critical tooling designs, strengthening project data control', vi: 'Giảm rò rỉ thiết kế đồ gá quan trọng, tăng cường kiểm soát dữ liệu dự án', ja: '重要な工装設計の流出を低減し、プロジェクトデータ管理を強化' },
    ],
    tabs: [
      {
        key: 'wedm', title: { zh: '快走絲 / 中走絲線切割', en: 'Fast-Speed / Medium-Speed WEDM' }, sub: { zh: 'Efficiency · Precision' }, img: '/assets/workshops/wedm.jpg',
        points: [
          [{ zh: '快走絲（Fast-speed WEDM）：', en: 'Fast-speed WEDM: ', vi: 'Cắt dây nhanh (Fast-speed WEDM): ', ja: '快走絲（Fast-speed WEDM）：' }, { zh: '核心優勢為極高切割效率、加工成本更具競爭力；輔具應用於一般結構件、大型支撐墊塊等對精度/粗糙度要求較低的輔助零件。', en: 'Core advantage is very high cutting efficiency and more competitive machining cost; used for general structural parts, large support blocks, and other auxiliary components with lower precision/roughness requirements.', vi: 'Ưu điểm cốt lõi là hiệu suất cắt rất cao và chi phí gia công cạnh tranh hơn; ứng dụng cho các chi tiết kết cấu thông thường, khối đỡ lớn và các chi tiết phụ trợ khác có yêu cầu độ chính xác/độ nhám thấp hơn.', ja: '極めて高い切断効率と競争力のある加工コストが核心的優位性。精度・粗さ要求が比較的低い一般構造部品、大型サポートブロックなどの補助部品に使用。' }],
          [{ zh: '中走絲（Medium-speed WEDM）：', en: 'Medium-speed WEDM: ', vi: 'Cắt dây trung bình (Medium-speed WEDM): ', ja: '中走絲（Medium-speed WEDM）：' }, { zh: '兼顧效率與幾何精度，表面光潔度與尺寸穩定性更佳；輔具應用於磁片切片夾具、精密定位模具與高精度工裝，提升裝配嚴密性與良率。', en: 'Balances efficiency and geometric accuracy, with better surface finish and dimensional stability; used for magnet-slicing fixtures, precision positioning molds, and high-precision tooling, improving assembly tightness and yield.', vi: 'Cân bằng hiệu suất và độ chính xác hình học, bề mặt hoàn thiện và độ ổn định kích thước tốt hơn; ứng dụng cho đồ gá cắt lát nam châm, khuôn định vị chính xác và dụng cụ độ chính xác cao, nâng cao độ khít lắp ráp và tỷ lệ đạt.', ja: '効率と幾何精度のバランスが取れ、表面仕上げと寸法安定性に優れる。磁石スライス用治具、精密位置決め金型、高精度工装に使用し、組立の密着性と歩留まりを向上。' }],
          [{ zh: '選型建議：', en: 'Selection recommendation: ', vi: 'Đề xuất lựa chọn: ', ja: '選定のご提案：' }, { zh: '依精度與交期需求彈性搭配快走絲與中走絲，兼顧成本與品質。', en: 'Flexibly combine fast-speed and medium-speed WEDM based on precision and lead-time needs, balancing cost and quality.', vi: 'Kết hợp linh hoạt cắt dây nhanh và trung bình theo yêu cầu độ chính xác và thời gian giao hàng, cân bằng chi phí và chất lượng.', ja: '精度とリードタイムの要求に応じて快走絲・中走絲を柔軟に組み合わせ、コストと品質のバランスを取る。' }],
        ],
      },
      {
        key: 'slot', title: { zh: '滾輪開槽機', en: 'Roller Slotting Machine' }, sub: { zh: 'Traction · Stability' }, img: '/assets/workshops/slot.jpg',
        points: [
          [{ zh: '核心功能：', en: 'Core function: ', vi: 'Chức năng cốt lõi: ', ja: '核心機能：' }, { zh: '在送料滾輪表面加工精密槽位，提升傳動摩擦力與導向穩定性。', en: 'Machines precision slots on the surface of feed rollers, improving drive friction and guiding stability.', vi: 'Gia công rãnh chính xác trên bề mặt con lăn cấp liệu, cải thiện lực ma sát truyền động và độ ổn định dẫn hướng.', ja: '送りローラー表面に精密溝を加工し、駆動摩擦力とガイド安定性を向上。' }],
          [{ zh: '加工優勢：', en: 'Machining advantage: ', vi: 'Ưu điểm gia công: ', ja: '加工優位性：' }, { zh: '支援直線/螺旋/網格槽（止滑紋），兼顧切割精度與量產效率。', en: 'Supports straight/spiral/grid slots (anti-slip texture), balancing cutting precision and production efficiency.', vi: 'Hỗ trợ rãnh thẳng/xoắn ốc/lưới (vân chống trượt), cân bằng độ chính xác cắt và hiệu suất sản xuất.', ja: '直線／螺旋／格子溝（滑り止め加工）に対応し、切断精度と生産効率を両立。' }],
          [{ zh: '產業效益：', en: 'Industry benefit: ', vi: 'Lợi ích ngành: ', ja: '業界効果：' }, { zh: '降低材料滑移風險，強化自動化輸送品質，是提升良率的關鍵設備。', en: 'Reduces material slippage risk, strengthens automated conveying quality — a key piece of equipment for improving yield.', vi: 'Giảm nguy cơ trượt vật liệu, tăng cường chất lượng vận chuyển tự động — thiết bị then chốt để nâng cao tỷ lệ đạt.', ja: '材料の滑りリスクを低減し、自動搬送品質を強化。歩留まり向上の鍵となる設備。' }],
        ],
      },
      {
        key: 'wire', title: { zh: '鑽石線包覆機（繞線機）', en: 'Diamond Wire Coating Machine (Winding)' }, sub: { zh: 'Durability · Yield' }, img: '/assets/workshops/diamond-wire-coating.jpg',
        points: [
          [{ zh: '核心功能：', en: 'Core function: ', vi: 'Chức năng cốt lõi: ', ja: '核心機能：' }, { zh: '包覆樹脂/薄膜層，提升耐用性與切割穩定性，減少崩邊與切縫損耗。', en: 'Coats a resin/film layer, improving durability and cutting stability, reducing chipping and kerf loss.', vi: 'Phủ lớp nhựa/màng, cải thiện độ bền và độ ổn định khi cắt, giảm sứt mẻ và hao hụt đường cắt.', ja: '樹脂／フィルム層をコーティングし、耐久性と切断安定性を向上、チッピングと切断ロスを低減。' }],
          [{ zh: '技術特色：', en: 'Technical features: ', vi: 'Đặc điểm kỹ thuật: ', ja: '技術特徴：' }, { zh: '高精度張力控制＋可客製化設計，確保高效加工。', en: 'High-precision tension control plus customizable design, ensuring efficient machining.', vi: 'Kiểm soát lực căng chính xác cao kết hợp thiết kế tùy chỉnh, đảm bảo gia công hiệu quả.', ja: '高精度張力制御とカスタマイズ設計により、高効率な加工を実現。' }],
          [{ zh: '應用價值：', en: 'Application value: ', vi: 'Giá trị ứng dụng: ', ja: '応用価値：' }, { zh: '針對脆性磁材，延長耗材壽命並提升成品良率。', en: 'For brittle magnetic materials, extends consumable life and improves finished-product yield.', vi: 'Đối với vật liệu từ tính giòn, kéo dài tuổi thọ vật tư tiêu hao và nâng cao tỷ lệ đạt thành phẩm.', ja: '脆性磁性材料に対し、消耗品の寿命を延ばし、完成品の歩留まりを向上。' }],
        ],
      },
    ],
  },
]
