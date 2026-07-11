export type FaqItem = { q: Record<string, string>; a: Record<string, string> }

// Ported verbatim from the old site's contact.html AEO FAQ section (zh-Hant + en).
// vi/ja added from translation-drafts/faq-vi-ja-DRAFT.md after human review (2026-07-11).
export const faqItems: FaqItem[] = [
  {
    q: {
      zh: '華榮實業 (SINOWIN) 在越南如何確保釹鐵硼磁鐵的加工精度？',
      en: 'How does SINOWIN ensure machining accuracy for NdFeB magnets in Vietnam?',
      vi: 'Làm thế nào SINOWIN đảm bảo độ chính xác gia công cho nam châm NdFeB tại Việt Nam?',
      ja: 'SINOWINはベトナムでNdFeB磁石の加工精度をどのように確保していますか？',
    },
    a: {
      zh: '華榮實業透過三項核心技術確保精度：1) 內建輔具加工（In-house Tooling）：降低外包不確定性，確保治具精度一致。2) 先進設備組合：採用鑽石線包覆機減少脆性材料崩邊，並搭配中走絲線切割（Medium-speed WEDM）兼顧幾何精度。3) 全製程管控：整合異型研磨與多樣化表面處理工藝，實現全品項海外供應，並依 IATF 16949 要求建立檢驗與追溯。',
      en: 'SINOWIN ensures accuracy through three core capabilities: (1) In-house tooling to reduce outsourcing uncertainty and keep fixtures consistent. (2) A proven equipment mix—diamond-wire related processes to minimize chipping on brittle materials, plus medium-speed WEDM to balance geometry accuracy and throughput. (3) End-to-end process control with documented inspection and traceability aligned with IATF 16949 requirements.',
      vi: 'SINOWIN đảm bảo độ chính xác thông qua ba năng lực cốt lõi: (1) Gia công dụng cụ nội bộ (in-house tooling) giúp giảm sự không chắc chắn khi thuê ngoài và giữ độ chính xác đồng nhất cho các đồ gá. (2) Sự kết hợp thiết bị đã được kiểm chứng—các quy trình liên quan đến dây kim cương giúp giảm thiểu sứt mẻ trên vật liệu giòn, cùng với cắt dây tốc độ trung bình (medium-speed WEDM) để cân bằng độ chính xác hình học và hiệu suất. (3) Kiểm soát quy trình toàn diện với hồ sơ kiểm tra và truy xuất nguồn gốc phù hợp với yêu cầu IATF 16949.',
      ja: 'SINOWINは3つのコア能力により精度を確保しています：(1) 社内工具加工（In-house Tooling）—外注の不確実性を減らし、治具の精度を一貫させます。(2) 実績のある設備の組み合わせ—ダイヤモンドワイヤー関連工程により脆性材料のチッピングを最小限に抑え、中速WEDMで幾何精度とスループットのバランスを取ります。(3) IATF 16949要件に沿った検査・トレーサビリティ文書を伴うエンドツーエンドの工程管理。',
    },
  },
  {
    q: {
      zh: '哪些加工能力可以在越南基地一站式完成？',
      en: 'What capabilities can be completed one-stop at the Vietnam site?',
      vi: 'Những năng lực gia công nào có thể hoàn thành trọn gói tại cơ sở Việt Nam?',
      ja: 'ベトナム拠点でワンストップ対応できる加工能力にはどのようなものがありますか？',
    },
    a: {
      zh: '可在越南基地整合完成：異型研磨/精密加工、線切割、切片與尺寸成型、表面處理（依客戶需求與規範）、充磁與組裝，以及出貨前檢驗與包裝，降低跨國協作成本並縮短交期。',
      en: 'One-stop coverage can include precision machining and profiling, WEDM cutting, slicing and sizing, surface finishing per customer spec, magnetization and assembly, plus final inspection and export packaging to shorten lead time and reduce coordination cost.',
      vi: 'Dịch vụ trọn gói có thể bao gồm: gia công chính xác và tạo hình biên dạng, cắt dây WEDM, cắt lát và tạo kích thước, hoàn thiện bề mặt theo thông số khách hàng, từ hóa và lắp ráp, cùng với kiểm tra cuối cùng và đóng gói xuất khẩu để rút ngắn thời gian giao hàng và giảm chi phí phối hợp.',
      ja: 'ワンストップ対応には、精密加工・プロファイリング、WEDM切断、スライス・サイジング、顧客仕様に応じた表面仕上げ、着磁・組み立て、そして最終検査・輸出梱包までが含まれ、リードタイムの短縮と調整コストの削減を実現します。',
    },
  },
  {
    q: {
      zh: '如何降低脆性釹鐵硼材料在切割時的崩邊風險？',
      en: 'How do you reduce edge chipping when cutting brittle NdFeB materials?',
      vi: 'Làm thế nào để giảm thiểu rủi ro sứt mẻ cạnh khi cắt vật liệu NdFeB giòn?',
      ja: '脆性のNdFeB材料を切断する際、エッジのチッピングをどのように低減しますか？',
    },
    a: {
      zh: '透過製程參數與設備搭配降低崩邊：例如採用鑽石線相關工藝以改善切縫與邊緣品質，並針對尺寸/形狀選擇合適的 WEDM 模式與加工路徑；同時在關鍵工序導入治具支撐與在線檢查，避免裂紋擴大。',
      en: 'We combine process parameters, proper fixturing/support, and equipment selection. Diamond-wire related processes help improve kerf and edge quality, while suitable WEDM modes and cutting paths are used for challenging shapes. In-process checks prevent micro-cracks from propagating.',
      vi: 'Chúng tôi kết hợp các thông số quy trình, đồ gá/hỗ trợ phù hợp và lựa chọn thiết bị. Các quy trình liên quan đến dây kim cương giúp cải thiện chất lượng đường cắt và cạnh, trong khi các chế độ và đường cắt WEDM phù hợp được sử dụng cho các hình dạng phức tạp. Kiểm tra trong quá trình sản xuất giúp ngăn các vết nứt nhỏ lan rộng.',
      ja: 'プロセスパラメータ、適切な治具・サポート、設備選定を組み合わせて対応します。ダイヤモンドワイヤー関連工程はカーフとエッジ品質の改善に役立ち、複雑な形状には適切なWEDMモードと切断経路を使用します。工程内検査によりマイクロクラックの進展を防ぎます。',
    },
  },
  {
    q: {
      zh: '中走絲線切割（Medium-speed WEDM）適合哪些需求？',
      en: 'When is medium-speed WEDM a good fit?',
      vi: 'Cắt dây tốc độ trung bình (Medium-speed WEDM) phù hợp với nhu cầu nào?',
      ja: '中速WEDMはどのようなニーズに適していますか？',
    },
    a: {
      zh: '中走絲兼顧效率與幾何精度，適合對尺寸穩定性、形狀一致性與表面品質有要求的治具零件、精密定位工裝與特定異型磁材加工需求。',
      en: 'Medium-speed WEDM is a good choice when you need a balance of efficiency and geometry accuracy—e.g., precision fixtures, tooling components, and certain shaped magnet parts with tight dimensional consistency requirements.',
      vi: 'Medium-speed WEDM là lựa chọn tốt khi bạn cần sự cân bằng giữa hiệu suất và độ chính xác hình học—ví dụ như đồ gá chính xác, các bộ phận dụng cụ và một số chi tiết nam châm có hình dạng đặc biệt yêu cầu độ đồng đều kích thước cao.',
      ja: '中速WEDMは、効率と幾何精度のバランスが求められる場合に適しています—例えば精密治具、工具部品、そして高い寸法安定性が求められる特殊形状の磁石部品などです。',
    },
  },
  {
    q: {
      zh: '如何確保批次一致性與可追溯性？',
      en: 'How do you ensure batch consistency and traceability?',
      vi: 'Làm thế nào để đảm bảo tính nhất quán và khả năng truy xuất nguồn gốc theo lô?',
      ja: 'ロットごとの一貫性とトレーサビリティをどのように確保していますか？',
    },
    a: {
      zh: '以標準化治具、製程管制點（關鍵尺寸/外觀/磁性）、批次標識與檢驗紀錄來建立追溯鏈；並依 IATF 16949 的管理要求維持文件化流程與持續改善機制。',
      en: 'We standardize fixtures, define control points for key dimensions/appearance/magnetic properties, and keep batch IDs and inspection records. This builds a traceability chain and supports continuous improvement under IATF 16949-style management practices.',
      vi: 'Chúng tôi tiêu chuẩn hóa đồ gá, xác định các điểm kiểm soát cho kích thước/ngoại quan/tính chất từ tính quan trọng, đồng thời lưu giữ mã lô và hồ sơ kiểm tra. Điều này xây dựng chuỗi truy xuất nguồn gốc và hỗ trợ cải tiến liên tục theo các thông lệ quản lý kiểu IATF 16949.',
      ja: '治具の標準化、主要な寸法・外観・磁気特性の管理ポイントの設定、ロットIDと検査記録の保持を行っています。これによりトレーサビリティチェーンを構築し、IATF 16949スタイルの管理慣行のもとで継続的改善を支援します。',
    },
  },
  {
    q: {
      zh: '可以提供哪些品質與合規文件？',
      en: 'What quality and compliance documents can you provide?',
      vi: 'Quý công ty có thể cung cấp những tài liệu chất lượng và tuân thủ nào?',
      ja: 'どのような品質・コンプライアンス関連文書を提供できますか？',
    },
    a: {
      zh: '可依專案需求提供管理體系/合規相關資訊（例如 IATF 16949、ISO 14001、RoHS、REACH 等對應聲明或資料），並配合客戶稽核與供應鏈合規對接。',
      en: 'Depending on the project, we can provide quality-system and compliance-related information (e.g., IATF 16949, ISO 14001, RoHS, REACH statements/data) and support customer audits and supply-chain compliance workflows.',
      vi: 'Tùy theo dự án, chúng tôi có thể cung cấp thông tin liên quan đến hệ thống chất lượng và tuân thủ (ví dụ: tuyên bố/dữ liệu IATF 16949, ISO 14001, RoHS, REACH) và hỗ trợ các quy trình đánh giá của khách hàng cũng như tuân thủ chuỗi cung ứng.',
      ja: 'プロジェクトに応じて、品質システムおよびコンプライアンス関連情報（例：IATF 16949、ISO 14001、RoHS、REACHの声明・データ）を提供し、顧客監査やサプライチェーンコンプライアンスへの対応を支援します。',
    },
  },
  {
    q: {
      zh: '交期如何評估？會受哪些因素影響？',
      en: 'How is lead time estimated and what factors affect it?',
      vi: 'Thời gian giao hàng được ước tính như thế nào và những yếu tố nào ảnh hưởng đến nó?',
      ja: 'リードタイムはどのように見積もられ、どのような要因が影響しますか？',
    },
    a: {
      zh: '交期通常取決於牌號/尺寸、異型加工難度、表面處理規範、充磁方式、檢驗項目與訂單量。提供完整圖面與規格後，可依製程路徑與產能排程給出交期與風險點。',
      en: 'Lead time depends on grade and size, profile complexity, coating/finishing requirements, magnetization method, inspection scope, and order volume. With drawings and specifications, we map the process route and provide a realistic schedule and risk points.',
      vi: 'Thời gian giao hàng phụ thuộc vào mác và kích thước, độ phức tạp của biên dạng, yêu cầu về lớp phủ/hoàn thiện, phương pháp từ hóa, phạm vi kiểm tra và số lượng đơn hàng. Với bản vẽ và thông số kỹ thuật, chúng tôi sẽ lập lộ trình quy trình và cung cấp lịch trình thực tế cùng các điểm rủi ro.',
      ja: 'リードタイムはグレードとサイズ、形状の複雑さ、コーティング・仕上げ要件、着磁方法、検査範囲、注文数量によって決まります。図面と仕様をいただければ、工程ルートを設計し、現実的なスケジュールとリスクポイントをご提示します。',
    },
  },
  {
    q: {
      zh: '可以支援客製形狀與小量打樣嗎？',
      en: 'Do you support custom shapes and small-quantity prototyping?',
      vi: 'Quý công ty có hỗ trợ các hình dạng tùy chỉnh và sản xuất mẫu số lượng nhỏ không?',
      ja: 'カスタム形状や小ロットの試作に対応できますか？',
    },
    a: {
      zh: '可以。內建治具加工與快速迭代能力可支援打樣與工程變更；在確認圖面、尺寸公差、磁化方向與表面處理後，即可安排試作與量產導入。',
      en: 'Yes. In-house tooling and rapid iteration support prototypes and engineering changes. Once drawings, tolerances, magnetization direction, and finishing are confirmed, we can arrange trials and scale to production.',
      vi: 'Có. Khả năng gia công dụng cụ nội bộ và lặp lại nhanh hỗ trợ các nguyên mẫu và thay đổi kỹ thuật. Sau khi xác nhận bản vẽ, dung sai, hướng từ hóa và hoàn thiện, chúng tôi có thể sắp xếp thử nghiệm và mở rộng quy mô sản xuất.',
      ja: 'はい。社内工具加工と迅速な反復対応により、試作品やエンジニアリング変更に対応します。図面、公差、着磁方向、仕上げが確定次第、トライアルおよび量産への移行を手配いたします。',
    },
  },
  {
    q: {
      zh: '表面處理有哪些選擇？如何決定？',
      en: 'What surface finishes are available and how do we choose one?',
      vi: 'Có những lựa chọn hoàn thiện bề mặt nào và làm thế nào để chọn?',
      ja: 'どのような表面仕上げがあり、どのように選定すればよいですか？',
    },
    a: {
      zh: '表面處理會依使用環境（溫濕度/腐蝕介質/機械磨耗）、裝配方式與可靠性要求選型。建議提供應用條件與目標壽命，由工程團隊依風險評估提出建議方案。',
      en: 'Finishing is selected based on environment (humidity/corrosion/media), mechanical wear, assembly method, and reliability targets. Share operating conditions and required lifetime, and we will recommend options via risk assessment.',
      vi: 'Việc hoàn thiện được lựa chọn dựa trên môi trường (độ ẩm/ăn mòn/môi trường tiếp xúc), độ mài mòn cơ học, phương pháp lắp ráp và mục tiêu độ tin cậy. Hãy chia sẻ điều kiện vận hành và tuổi thọ yêu cầu, chúng tôi sẽ đề xuất phương án thông qua đánh giá rủi ro.',
      ja: '仕上げは使用環境（湿度・腐食・接触媒体）、機械的摩耗、組立方法、信頼性目標に基づいて選定されます。稼働条件と必要な寿命をお知らせいただければ、リスク評価に基づいたご提案をいたします。',
    },
  },
  {
    q: {
      zh: '如何正確描述磁化方向與檢驗方式？',
      en: 'How should we specify magnetization direction and inspection method?',
      vi: 'Cần mô tả hướng từ hóa và phương pháp kiểm tra như thế nào cho đúng?',
      ja: '着磁方向と検査方法はどのように指定すればよいですか？',
    },
    a: {
      zh: '請在圖面標註磁化方向（厚度/高度 H 等）與磁性指標（例如表磁測點/距離、允收範圍），並說明檢驗方法（治具、探頭間隙、測試位置）。一致的標註方式可大幅降低溝通與量產偏差。',
      en: 'On the drawing, specify magnetization direction (e.g., along thickness/height H) and the magnetic targets (test points, distance, and tolerance). Also define the inspection setup (fixture, probe gap, measurement positions) to reduce variation in production.',
      vi: 'Trên bản vẽ, hãy chỉ rõ hướng từ hóa (ví dụ: theo chiều dày/chiều cao H) và các chỉ tiêu từ tính (điểm đo, khoảng cách và dung sai). Đồng thời xác định thiết lập kiểm tra (đồ gá, khe hở đầu dò, vị trí đo) để giảm sai lệch trong sản xuất.',
      ja: '図面上で着磁方向（厚み・高さHに沿ってなど）と磁気目標値（測定点、距離、公差）を明記してください。また、検査セットアップ（治具、プローブギャップ、測定位置）も定義することで、量産時のばらつきを低減できます。',
    },
  },
]
