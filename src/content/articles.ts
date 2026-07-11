export type ArticleTranslation = {
  title: string
  excerpt: string
  content: string
  metaTitle?: string
  metaDescription?: string
  status?: string
}

export type Article = {
  slug: string
  publishDate: string
  category: string
  coverImage?: string
  translations: Partial<Record<string, ArticleTranslation>>
}

export const articles: Article[] = [
  {
    slug: 'magnet-surface',
    publishDate: '2026-04-05',
    category: 'industry',
    coverImage: '/assets/uploads/1775390498145-magnet-surface.png',
    translations: {
      'zh-Hant': {
        title: '釹鐵硼磁鐵防生鏽全攻略：鍍層厚度與鹽霧時長大解密！',
        excerpt: '釹鐵硼磁鐵磁力強，但也最怕潮濕與鹽分造成氧化失效。這篇用白話整理鍍鋅、鎳銅鎳、環氧樹脂三大鍍層的厚度、鹽霧時數與適用場景，幫你快速選出合適的防護方案。',
        content: `<p>在現代工業和科技產品中，「釹鐵硼磁鐵」絕對是不可或缺的超級英雄。它是目前商業化中磁力最強的磁鐵，被廣泛應用在電動車、風力發電、手機和各種精密儀器中。</p><p>不過，這位「磁力界的超人」其實有一個致命的弱點——它超級怕生鏽！因為釹鐵硼磁鐵中含有大量的活潑金屬「釹」和「鐵」，如果暴露在潮濕或有鹽分的空氣中，很快就會像餅乾一樣氧化、粉化，最後磁力全失。</p><h2>什麼是鹽霧測試？</h2><p>「中性鹽霧測試（NSS）」是把磁鐵放進特製箱子，用高濃度鹽水連續噴灑，模擬極端惡劣環境。測試能撐過多少「小時」，是評估鍍層防護力的硬指標。</p><h2>1. 鍍鋅（Zinc Plating）：高 CP 值的平民守護者</h2><p>常見厚度約 7 到 15 微米，耐鹽霧表現：黑鋅約 12 小時，白鋅約 16 小時，藍鋅可達 24 小時，彩鋅能撐到 48 小時。適合預算敏感、室內環境的產品。</p><h2>2. 鎳銅鎳（Ni-Cu-Ni）：萬用的工業標準</h2><p>這是最主流的釹鐵硼鍍層，像三明治由鎳、銅、鎳組成。常見厚度約 15 到 21 微米，標準工藝通常可通過 24 小時鹽霧測試，高等級可達 48 小時。</p><h2>3. 環氧樹脂塗層（Epoxy）：極端環境的隱形防護盾</h2><p>常見厚度約 10 到 30 微米，鹽霧表現常可達 48 到 72 小時以上。適合海上風電、汽車感測器等戶外高腐蝕環境。</p><h2>專業提醒：鍍層不是越厚越好</h2><p>鍍層加厚雖然有助防護，但也會增加磁鐵與目標物之間的空氣間隙，降低有效磁通量。真正影響壽命的，不只是鍍層厚度，還包括磁體本身的緻密性、含氧量，以及鍍前清洗是否到位。</p>`,
        metaTitle: '釹鐵硼磁鐵防生鏽全攻略：鍍層厚度與鹽霧時長解析',
        metaDescription: '整理釹鐵硼磁鐵常見防護鍍層，包括鍍鋅、鎳銅鎳與環氧樹脂的厚度、鹽霧測試時數與適用場景，協助選出合適的防鏽方案。',
      },
      en: {
        title: 'NdFeB Magnet Rust Prevention: Coating Thickness and Salt Spray Hours Explained',
        excerpt: 'NdFeB magnets are powerful but highly vulnerable to oxidation from moisture and salt. This guide covers zinc, Ni-Cu-Ni, and epoxy coating thickness, salt spray hours, and application scenarios.',
        content: `<p>NdFeB magnets are the most powerful commercially available magnets, used in EVs, wind turbines, smartphones, and precision instruments. However, they have a critical weakness — they rust easily.</p><h2>What is Salt Spray Testing?</h2><p>Neutral Salt Spray (NSS) testing simulates extreme corrosive environments. The number of hours a coating survives is the key indicator of protective performance.</p><h2>1. Zinc Plating — High Value for Mild Environments</h2><p>Typical thickness: 7–15 μm. Salt spray performance: black zinc ~12h, white zinc ~16h, blue zinc ~24h, color zinc ~48h. Best for budget-sensitive, indoor applications.</p><h2>2. Ni-Cu-Ni — The Industry Standard</h2><p>A sandwich of nickel, copper, and nickel. Typical thickness: 15–21 μm. Standard process passes 24h NSS; high-grade achieves 48h.</p><h2>3. Epoxy Coating — Shield for Extreme Environments</h2><p>Thickness: 10–30 μm. Typically achieves 48–72h+ NSS. Ideal for offshore wind, automotive sensors, and high-corrosion outdoor applications.</p><h2>Key Insight: Thicker Is Not Always Better</h2><p>Increasing coating thickness adds air gap between magnet and target, reducing effective flux. Magnet density and pre-plating cleaning matter just as much.</p>`,
        metaTitle: 'NdFeB Magnet Rust Prevention: Coating Thickness and Salt Spray Hours',
        metaDescription: 'A practical guide to NdFeB magnet surface coatings — zinc, Ni-Cu-Ni, and epoxy — covering thickness, salt spray hours, and selection criteria.',
      },
      vi: {
        title: 'Hướng dẫn chống rỉ sét cho nam châm NdFeB: Độ dày lớp phủ và thời gian phun muối',
        excerpt: 'Nam châm NdFeB mạnh nhưng dễ bị oxy hóa do độ ẩm và muối. Hướng dẫn này bao gồm lớp phủ kẽm, Ni-Cu-Ni và epoxy, độ dày, giờ phun muối và kịch bản ứng dụng.',
        content: `<p>Nam châm NdFeB là nam châm thương mại mạnh nhất, được sử dụng trong xe điện, tuabin gió, điện thoại thông minh và thiết bị chính xác. Tuy nhiên, chúng có điểm yếu nghiêm trọng — dễ bị rỉ sét.</p><h2>Thử nghiệm phun muối là gì?</h2><p>Thử nghiệm phun muối trung tính (NSS) đặt nam châm vào buồng chuyên dụng và phun liên tục nước muối nồng độ cao để mô phỏng môi trường khắc nghiệt cực đoan. Số giờ lớp phủ chịu được trước khi xuất hiện rỉ sét là chỉ số cốt lõi để đánh giá khả năng bảo vệ.</p><h2>1. Mạ kẽm — Giá trị cao cho môi trường nhẹ</h2><p>Độ dày thông thường: 7–15 μm. Hiệu suất phun muối: kẽm đen ~12h, kẽm trắng ~16h, kẽm xanh ~24h, kẽm màu ~48h.</p><h2>2. Ni-Cu-Ni — Tiêu chuẩn công nghiệp</h2><p>Lớp kẹp niken, đồng và niken. Độ dày: 15–21 μm. Đạt 24h NSS tiêu chuẩn; loại cao cấp đạt 48h.</p><h2>3. Lớp phủ Epoxy — Lá chắn cho môi trường khắc nghiệt</h2><p>Độ dày: 10–30 μm. Thường đạt 48–72h+ NSS. Lý tưởng cho điện gió ngoài khơi và ứng dụng ngoài trời.</p><h2>Lưu ý chuyên môn: Lớp phủ không phải càng dày càng tốt</h2><p>Lớp phủ dày hơn tuy giúp bảo vệ tốt hơn nhưng cũng làm tăng khe hở không khí giữa nam châm và vật thể mục tiêu, làm giảm từ thông hiệu dụng. Tuổi thọ thực tế không chỉ phụ thuộc vào độ dày lớp phủ, mà còn vào mật độ của bản thân nam châm, hàm lượng oxy, và việc vệ sinh trước khi mạ có được thực hiện đầy đủ hay không.</p>`,
        metaTitle: 'Hướng dẫn chống rỉ sét nam châm NdFeB',
        metaDescription: 'Hướng dẫn thực tế về lớp phủ bề mặt nam châm NdFeB — kẽm, Ni-Cu-Ni và epoxy.',
      },
      ja: {
        title: 'NdFeB磁石の防錆完全ガイド：めっき厚さと塩水噴霧時間を徹底解説',
        excerpt: 'NdFeB磁石は磁力が強い一方、湿気や塩分による酸化に非常に弱い材料です。本記事では亜鉛めっき、ニッケル銅ニッケルめっき、エポキシ樹脂の3大コーティングについて、厚さ・塩水噴霧時間・適用シーンをわかりやすく整理し、最適な防護方案を選ぶための手引きとします。',
        content: `<p>現代の工業製品やハイテク機器において、「NdFeB磁石」は欠かせない超人的な存在です。現在商業化されている磁石の中で最も磁力が強く、電気自動車、風力発電、スマートフォン、各種精密機器に幅広く採用されています。</p><p>しかし、この「磁力界のスーパーマン」には致命的な弱点があります——非常に錆びやすいのです。NdFeB磁石には活性金属である「ネオジム」と「鉄」が大量に含まれており、湿気や塩分を含む空気に晒されると、まるでクッキーのように酸化・粉化し、最終的に磁力を完全に失ってしまいます。</p><h2>塩水噴霧試験とは？</h2><p>「中性塩水噴霧試験（NSS）」は、磁石を専用チャンバーに入れ、高濃度の塩水を連続的に噴霧して極端な過酷環境をシミュレートする試験です。何時間耐えられるかが、コーティングの防護性能を評価する重要な指標となります。</p><h2>1. 亜鉛めっき（Zinc Plating）：コストパフォーマンスに優れた庶民の守護者</h2><p>一般的な厚さは約7〜15μm。耐塩水噴霧性能は、黒色亜鉛が約12時間、白色亜鉛が約16時間、青色亜鉛が最大24時間、カラー亜鉛は48時間まで耐えられます。予算重視の屋内用途の製品に適しています。</p><h2>2. ニッケル銅ニッケル（Ni-Cu-Ni）：万能な工業標準</h2><p>これはNdFeB磁石で最も主流なコーティングで、ニッケル・銅・ニッケルのサンドイッチ構造です。一般的な厚さは約15〜21μm。標準工程では通常24時間の塩水噴霧試験に合格し、高等級では48時間に達します。</p><h2>3. エポキシ樹脂コーティング（Epoxy）：極限環境の見えない防護盾</h2><p>一般的な厚さは約10〜30μm。塩水噴霧性能は48〜72時間以上に達することが多く、洋上風力発電や自動車センサーなど、屋外の高腐食環境に適しています。</p><h2>専門家からの注意点：コーティングは厚ければ良いというわけではない</h2><p>コーティングを厚くすることは防護に役立つ一方、磁石とターゲット物との間の空隙を増やし、有効磁束を低下させます。寿命に真に影響するのは、コーティングの厚さだけでなく、磁石本体の緻密性、含酸素量、そしてめっき前の洗浄が十分であるかどうかも重要な要素です。</p>`,
        metaTitle: 'NdFeB磁石の防錆完全ガイド：めっき厚さと塩水噴霧時間の解説',
        metaDescription: 'NdFeB磁石の一般的な防護コーティング（亜鉛めっき、ニッケル銅ニッケル、エポキシ樹脂）の厚さ、塩水噴霧試験時間、適用シーンを整理し、最適な防錆方案の選定を支援します。',
      },
    },
  },
  {
    slug: 'fe16n2-supplychain-rebuild',
    publishDate: '2025-11-20',
    category: 'supply-chain',
    // NOTE: original cover image recovered from website.zip backup is only 400x267
    // (mislabeled .jpg, actually PNG) -- too low-res to use. Not copied in; see
    // report to user 2026-07-12. Needs a fresh image from the client.
    translations: {
      'zh-Hant': {
        title: '氮化鐵磁鐵（Fe₁₆N₂）：企業該如何看待這場磁材供應鏈的重構？',
        excerpt: '對多數製造業者而言，磁鐵長期被視為「成熟且難以撼動」的基礎材料。然而，當全球電動化加速，這項看似穩定的關鍵零組件，正悄然走向結構性轉折點。',
        content: `<p>對多數製造業者而言，磁鐵長期被視為「成熟且難以撼動」的基礎材料。然而，當全球電動化加速、地緣政治風險成為日常變數，這項看似穩定的關鍵零組件，正悄然走向結構性轉折點。</p><p>2025 年，美國 <strong>Niron Magnetics</strong> 在政府 1,750 萬美元的專項支持下，建成全球首座商業化氮化鐵（Fe₁₆N₂）永磁材料工廠。高性能磁材首次出現不依賴稀土的量產路徑。</p><h2>從「成本」轉向「風險管理」的材料選擇邏輯</h2><p>釹鐵硼磁鐵的核心問題，從來不只是價格，而是供應集中度極高。氮化鐵磁鐵僅使用鐵與氮兩種元素，供應鏈可高度在地化。其理論磁能積可比釹鐵硼高出約 18%，且在高溫工況下的穩定性更佳。</p><h2>為何車廠率先投入測試？</h2><p>Stellantis 與 Samsung 已在牽引電機與音響系統中測試氮化鐵磁鐵。氮化鐵具備低矯頑力特性，特別適合可變磁通電機（VFM），可使電動車續航里程提升 20–30%。</p><h2>2027 年量產之後，企業該思考什麼？</h2><p>Niron 預計在 2027 年實現全面量產。磁材將從「單一路徑」變成「多重選項」的戰略資源。</p>`,
        metaTitle: '氮化鐵磁鐵（Fe₁₆N₂）：企業該如何看待這場磁材供應鏈的重構？',
        metaDescription: '對多數製造業者而言，磁鐵長期被視為「成熟且難以撼動」的基礎材料。然而，當全球電動化加速...',
      },
      en: {
        title: 'Iron Nitride Magnets (Fe₁₆N₂): How Should Companies View Supply-Chain Restructuring?',
        excerpt: 'Magnets have long been treated as a mature commodity. But electrification and geopolitics are pushing the supply chain into a structural inflection point.',
        content: `<p>For many manufacturers, magnets have long been regarded as a mature and hard-to-disrupt material. However, as electrification accelerates and geopolitical risk becomes a daily variable, this seemingly stable component is quietly approaching a structural turning point.</p><p>In 2025, <strong>Niron Magnetics</strong> completed the world's first commercial iron-nitride (Fe₁₆N₂) permanent magnet plant with US$17.5 million of dedicated government support. This is the first scalable path to high-performance magnets that does not rely on rare earths.</p><h2>From Cost to Risk Management: A New Material Selection Logic</h2><p>The core issue with NdFeB has never been only price — it's the extreme concentration of supply. Iron nitride uses only iron and nitrogen, enabling a highly localized supply chain. Its theoretical energy product can be about 18% higher than NdFeB, with better stability at high temperature.</p><h2>Why Automakers Are Testing First</h2><p>Stellantis and Samsung have tested iron-nitride magnets in traction motors and audio systems. Low coercivity makes the material attractive for variable-flux motors (VFM), potentially improving EV range by 20–30%.</p><h2>After 2027 Mass Production: What Should Companies Think About?</h2><p>Niron expects full-scale production in 2027. Magnets will shift from a single path to a strategic resource with multiple options.</p>`,
        metaTitle: 'Iron Nitride Magnets (Fe₁₆N₂): Supply Chain Restructuring Guide',
        metaDescription: 'Magnets have long been treated as a mature commodity. But electrification and geopolitics are pushing the supply chain into a structural inflection point.',
      },
      vi: {
        title: 'Nam châm sắt nitrit (Fe₁₆N₂): Các công ty nên nhìn nhận việc tái cơ cấu chuỗi cung ứng như thế nào?',
        excerpt: 'Đối với hầu hết các nhà sản xuất, nam châm từ lâu đã được coi là vật liệu cơ bản trưởng thành. Tuy nhiên, khi quá trình điện khí hóa toàn cầu tăng tốc...',
        content: `<p>Đối với hầu hết các nhà sản xuất, nam châm từ lâu đã được coi là vật liệu cơ bản "trưởng thành và khó rung chuyển". Tuy nhiên, khi quá trình điện khí hóa toàn cầu tăng tốc và các rủi ro địa chính trị trở thành vấn đề thường ngày, thành phần quan trọng này đang hướng tới một bước ngoặt mang tính cơ cấu.</p><p>Năm 2025, Niron Magnetics đã xây dựng nhà máy sản xuất vật liệu nam châm vĩnh cửu sắt nitrit (Fe₁₆N₂) thương mại đầu tiên trên thế giới với sự hỗ trợ 17,5 triệu USD. Đây là lần đầu tiên có con đường sản xuất hàng loạt vật liệu từ tính hiệu suất cao không phụ thuộc vào đất hiếm.</p><h2>Từ "chi phí" chuyển sang "quản lý rủi ro": logic lựa chọn vật liệu mới</h2><p>Vấn đề cốt lõi của nam châm NdFeB chưa bao giờ chỉ là giá cả, mà là mức độ tập trung cung ứng cực cao. Nam châm sắt nitrit chỉ sử dụng hai nguyên tố sắt và nitơ, cho phép chuỗi cung ứng có thể được nội địa hóa cao. Tích năng lượng từ lý thuyết của nó có thể cao hơn NdFeB khoảng 18%, đồng thời có độ ổn định tốt hơn trong điều kiện nhiệt độ cao.</p><h2>Tại sao các hãng xe tiên phong thử nghiệm?</h2><p>Stellantis và Samsung đã thử nghiệm nam châm sắt nitrit trong động cơ kéo và hệ thống âm thanh. Nam châm sắt nitrit có đặc tính lực kháng từ thấp, đặc biệt phù hợp cho động cơ từ thông biến đổi (VFM), có thể giúp tăng phạm vi hoạt động của xe điện thêm 20–30%.</p><h2>Sau khi sản xuất hàng loạt vào năm 2027, doanh nghiệp nên suy nghĩ gì?</h2><p>Niron dự kiến đạt sản xuất hàng loạt toàn diện vào năm 2027. Vật liệu từ tính sẽ chuyển từ "con đường duy nhất" thành nguồn lực chiến lược với "nhiều lựa chọn".</p>`,
        metaTitle: 'Nam châm sắt nitrit Fe₁₆N₂ và tái cơ cấu chuỗi cung ứng',
        metaDescription: 'Nam châm từ lâu được coi là vật liệu trưởng thành. Nhưng điện khí hóa và địa chính trị đang đẩy chuỗi cung ứng đến điểm uốn mang tính cơ cấu.',
      },
      ja: {
        title: '窒化鉄磁石（Fe₁₆N₂）：企業は磁性材料サプライチェーンの再編をどう捉えるべきか？',
        excerpt: '磁石は長らく「成熟して揺るぎない」基礎材料と見なされてきました。しかし、世界的な電動化の加速とともに、この一見安定した重要部品は静かに構造的な転換点に向かっています。',
        content: `<p>多くの製造業者にとって、磁石は長らく「成熟して揺るぎない」基礎材料と見なされてきました。しかし、世界的な電動化が加速し、地政学的リスクが日常的な変数となる中、この一見安定した重要部品は静かに構造的な転換点に向かっています。</p><p>2025年、米国の<strong>Niron Magnetics</strong>は政府による1,750万ドルの専門支援を受け、世界初の商業用窒化鉄（Fe₁₆N₂）永久磁石材料工場を完成させました。高性能磁性材料が初めてレアアースに依存しない量産経路を得たのです。</p><h2>「コスト」から「リスク管理」へ：新しい材料選定ロジック</h2><p>NdFeB磁石の核心的な問題は、価格だけではなく、供給の集中度が極めて高いことにあります。窒化鉄磁石は鉄と窒素の2元素のみを使用し、サプライチェーンを高度に現地化できます。理論上のエネルギー積はNdFeBより約18%高く、高温環境下での安定性にも優れています。</p><h2>なぜ自動車メーカーが真っ先に採用試験を進めるのか</h2><p>StellantisとSamsungはすでに牽引モーターとオーディオシステムで窒化鉄磁石の試験を行っています。窒化鉄は低保磁力特性を持ち、可変磁束モーター（VFM）に特に適しており、電気自動車の航続距離を20〜30％向上させることが可能です。</p><h2>2027年の量産後、企業は何を考えるべきか</h2><p>Nironは2027年に本格量産を実現する見込みです。磁性材料は「単一の経路」から「複数の選択肢」を持つ戦略資源へと変化していきます。</p>`,
        metaTitle: '窒化鉄磁石（Fe₁₆N₂）：磁性材料サプライチェーン再編の考察',
        metaDescription: '磁石は長らく成熟した基礎材料と見なされてきましたが、電動化と地政学リスクによりサプライチェーンは構造的な転換点を迎えています。',
      },
    },
  },
  {
    slug: 'hre-free-ndfeb-thermal-showdown-120c-150c',
    publishDate: '2026-01-05',
    category: 'technical',
    coverImage: '/assets/uploads/hre-free-ndfeb-thermal-showdown-120c-150c-cover.webp',
    translations: {
      'zh-Hant': {
        title: '「磁王」耐熱大對決：無重稀土磁鐵在 120°C 下能撐住嗎？',
        excerpt: '以可逆/不可逆損失為主軸，整理 N、M、H、SH 無重稀土磁鐵在極限溫度下的熱磁降估算與選型重點。',
        content: `<p>在追求電動化與節能減碳的今天，釹鐵硼（NdFeB）永久磁鐵是馬達與感測器不可或缺的核心。現在，無重稀土（HRE-Free）技術正全面改寫遊戲規則。</p><h2>為什麼磁鐵怕熱？解析「熱磁降」的兩大成份</h2><ul><li><strong>可逆損失（Reversible Loss）</strong>：溫度升高磁力下降，溫度回冷後磁力完全恢復。</li><li><strong>不可逆損失（Irreversible Loss）</strong>：若超過設計極限，即便冷卻後磁力也無法自行恢復，必須重新充磁。</li></ul><h2>不同等級在極限溫度下的表現</h2><table><thead><tr><th>磁體等級</th><th>極限溫度</th><th>剩磁係數 α (%/°C)</th><th>矯頑力係數 β (%/°C)</th></tr></thead><tbody><tr><td>N 級</td><td>80°C</td><td>-0.12</td><td>-0.60</td></tr><tr><td>M 級</td><td>100°C</td><td>-0.12</td><td>-0.58</td></tr><tr><td>H 級</td><td>120°C</td><td>-0.11</td><td>-0.58</td></tr><tr><td>SH 級</td><td>150°C</td><td>-0.10~-0.12</td><td>-0.55</td></tr></tbody></table><h2>結論：極限熱磁降到底是多少？</h2><ul><li><strong>N 級（80°C）</strong>：總磁降約 12.2%</li><li><strong>M 級（100°C）</strong>：總磁降約 14.6%</li><li><strong>H 級（120°C）</strong>：總磁降約 16.0%</li><li><strong>SH 級（150°C）</strong>：總磁降約 20.6%</li></ul>`,
        metaTitle: '「磁王」耐熱大對決：無重稀土磁鐵在 120°C 下能撐住嗎？',
        metaDescription: '以可逆/不可逆損失為主軸，整理 N、M、H、SH 無重稀土磁鐵在極限溫度下的熱磁降估算與選型重點。',
      },
      en: {
        title: 'HRE-Free Thermal Showdown: Can "Magnet Kings" Survive 120°C?',
        excerpt: 'A practical selection guide estimating reversible/irreversible losses for N/M/H/SH HRE-free NdFeB at extreme temperatures.',
        content: `<p>As electrification accelerates, NdFeB permanent magnets remain core components in motors and sensors. HRE-free technologies are reshaping the landscape — delivering strong performance even under elevated temperatures.</p><h2>Why Magnets Dislike Heat: Two Components of Thermal Loss</h2><ul><li><strong>Reversible loss</strong>: like a spring — magnetic flux decreases with temperature and fully recovers after cooling.</li><li><strong>Irreversible loss</strong>: the critical part. If the design exceeds the knee point, the magnet may not recover after cooling and requires re-magnetization.</li></ul><h2>Grade Performance at Upper Temperatures</h2><table><thead><tr><th>Grade</th><th>Upper Temp</th><th>Br coeff α (%/°C)</th><th>Hcj coeff β (%/°C)</th></tr></thead><tbody><tr><td>N</td><td>80°C</td><td>-0.12</td><td>-0.60</td></tr><tr><td>M</td><td>100°C</td><td>-0.12</td><td>-0.58</td></tr><tr><td>H</td><td>120°C</td><td>-0.11</td><td>-0.58</td></tr><tr><td>SH</td><td>150°C</td><td>-0.10~-0.12</td><td>-0.55</td></tr></tbody></table><h2>Total Flux Loss Estimates</h2><ul><li><strong>N (80°C)</strong>: ~12.2% total loss</li><li><strong>M (100°C)</strong>: ~14.6% total loss</li><li><strong>H (120°C)</strong>: ~16.0% total loss</li><li><strong>SH (150°C)</strong>: ~20.6% total loss</li></ul>`,
        metaTitle: 'HRE-Free NdFeB Thermal Performance Guide: N/M/H/SH at 80–150°C',
        metaDescription: 'A practical selection guide estimating reversible/irreversible losses for N/M/H/SH HRE-free NdFeB at extreme temperatures.',
      },
      vi: {
        title: 'Cuộc thách thức chịu nhiệt: Nam châm không đất hiếm nặng có thể giữ ở 120°C không?',
        excerpt: 'Hướng dẫn lựa chọn thực tế ước tính tổn thất thuận nghịch/không thuận nghịch cho NdFeB không HRE cấp N/M/H/SH ở nhiệt độ khắc nghiệt.',
        content: `<p>Công nghệ HRE-Free đang định hình lại bức tranh nam châm, cung cấp hiệu suất mạnh mẽ ngay cả ở nhiệt độ cao.</p><h2>Tại sao nam châm sợ nhiệt?</h2><ul><li><strong>Tổn thất thuận nghịch</strong>: từ thông giảm khi nhiệt độ tăng và phục hồi hoàn toàn sau khi làm nguội.</li><li><strong>Tổn thất không thuận nghịch</strong>: nếu vượt quá điểm đầu gối, nam châm cần được từ hóa lại.</li></ul><h2>Hiệu suất của các cấp độ khác nhau ở nhiệt độ giới hạn</h2><table><thead><tr><th>Cấp độ nam châm</th><th>Nhiệt độ giới hạn</th><th>Hệ số Br α (%/°C)</th><th>Hệ số Hcj β (%/°C)</th></tr></thead><tbody><tr><td>Cấp N</td><td>80°C</td><td>-0,12</td><td>-0,60</td></tr><tr><td>Cấp M</td><td>100°C</td><td>-0,12</td><td>-0,58</td></tr><tr><td>Cấp H</td><td>120°C</td><td>-0,11</td><td>-0,58</td></tr><tr><td>Cấp SH</td><td>150°C</td><td>-0,10~-0,12</td><td>-0,55</td></tr></tbody></table><h2>Kết luận: Tổn thất từ tính giới hạn thực tế là bao nhiêu?</h2><ul><li><strong>Cấp N (80°C)</strong>: tổng tổn thất từ tính khoảng 12,2%</li><li><strong>Cấp M (100°C)</strong>: tổng tổn thất từ tính khoảng 14,6%</li><li><strong>Cấp H (120°C)</strong>: tổng tổn thất từ tính khoảng 16,0%</li><li><strong>Cấp SH (150°C)</strong>: tổng tổn thất từ tính khoảng 20,6%</li></ul>`,
        metaTitle: 'Hiệu suất nhiệt NdFeB không HRE: Hướng dẫn N/M/H/SH',
        metaDescription: 'Hướng dẫn lựa chọn thực tế ước tính tổn thất cho NdFeB không HRE ở nhiệt độ khắc nghiệt.',
      },
      ja: {
        title: '「磁石の王」耐熱対決：重希土類フリー磁石は120°Cに耐えられるか？',
        excerpt: '可逆損失・不可逆損失を軸に、N・M・H・SHの重希土類フリー磁石が極限温度下でどれだけ磁力を失うかを試算し、選定のポイントを整理します。',
        content: `<p>電動化と省エネ・低炭素化が進む今日、NdFeB永久磁石はモーターやセンサーに欠かせない中核部品です。現在、重希土類フリー（HRE-Free）技術が業界のルールを大きく書き換えつつあります。</p><h2>なぜ磁石は熱に弱いのか：「熱減磁」を構成する2つの要素</h2><ul><li><strong>可逆損失（Reversible Loss）</strong>：温度が上がると磁力が低下しますが、温度が下がれば磁力は完全に回復します。</li><li><strong>不可逆損失（Irreversible Loss）</strong>：設計上の限界を超えると、冷却しても磁力は自然には回復せず、再着磁が必要になります。</li></ul><h2>各グレードの極限温度における性能</h2><table><thead><tr><th>磁石グレード</th><th>極限温度</th><th>残留磁束係数 α (%/°C)</th><th>保磁力係数 β (%/°C)</th></tr></thead><tbody><tr><td>Nグレード</td><td>80°C</td><td>-0.12</td><td>-0.60</td></tr><tr><td>Mグレード</td><td>100°C</td><td>-0.12</td><td>-0.58</td></tr><tr><td>Hグレード</td><td>120°C</td><td>-0.11</td><td>-0.58</td></tr><tr><td>SHグレード</td><td>150°C</td><td>-0.10~-0.12</td><td>-0.55</td></tr></tbody></table><h2>結論：極限時の熱減磁は結局どのくらいか？</h2><ul><li><strong>Nグレード（80°C）</strong>：総磁力損失は約12.2%</li><li><strong>Mグレード（100°C）</strong>：総磁力損失は約14.6%</li><li><strong>Hグレード（120°C）</strong>：総磁力損失は約16.0%</li><li><strong>SHグレード（150°C）</strong>：総磁力損失は約20.6%</li></ul>`,
        metaTitle: '「磁石の王」耐熱対決：重希土類フリー磁石は120°Cに耐えられるか？',
        metaDescription: '可逆・不可逆損失を軸に、N・M・H・SHの重希土類フリー磁石が極限温度下でどれだけ磁力を失うかを試算し、選定のポイントを整理します。',
      },
    },
  },
  {
    slug: 'magnetic-circuit-design-pot-magnet-secret',
    publishDate: '2026-01-24',
    category: 'technical',
    coverImage: '/assets/uploads/magnetic-circuit-design-pot-magnet-secret-cover.webp',
    translations: {
      'zh-Hant': {
        title: '【磁鐵界的煉金術】為什麼加了「廉價鐵片」，釹鐵硼磁力反而暴增、成本還砍半？',
        excerpt: '為什麼在昂貴的釹鐵硼磁鐵外加一塊便宜鐵片，吸力卻能放大 3–10 倍？從漏磁、磁阻到磁通聚焦與 F∝B²，一次講清楚壺形磁鐵背後的磁路設計邏輯。',
        content: `<p>為什麼在昂貴的磁鐵上蓋上便宜的鐵片，反而能讓它「變強」？這不是魔法，這是物理學中極致的「以小博大」工程學——<strong>磁路設計（Magnetic Circuit Design）</strong>。</p><h2>1. 裸磁鐵的困境：你正在浪費大量「磁力」</h2><p>空氣的相對磁導率 μr 約等於 1，磁力線散漫分布在磁鐵周圍廣大空間裡，形成漏磁（Magnetic Leakage）。當你試圖用這塊磁鐵吸附物體時，只有部分磁通真正穿過目標，其餘都浪費在空氣中。</p><h2>2. 鐵片的角色：磁力的「光纖」與「透鏡」</h2><p>鋼鐵的相對磁導率 μr 可高達數千甚至上萬。磁力線被「吸」進低阻力的鐵件中，形成更完整的閉合迴路。你可以用大面積的鐵件「收集」磁鐵產生的總磁通量，再把它導向很小的接觸面，顯著放大工作點的磁通密度 B。</p><h2>3. 暴力的物理關係：F ∝ B²</h2><p>F ≈ (B² · A) / (2μ₀)。若透過鐵殼設計讓 B 提升 2 倍，吸附力將上升到約 4 倍。</p><h2>4. 成本的降維打擊</h2><p>透過磁路設計，工程師可以用更多廉價鐵件替代原本需要的磁鐵體積，在維持甚至提升工作面磁場的同時，顯著降低磁組件成本。</p>`,
        metaTitle: '磁路設計：為何廉價鐵片能讓釹鐵硼磁力暴增？',
        metaDescription: '為什麼在昂貴的釹鐵硼磁鐵外加一塊便宜鐵片，吸力卻能放大 3–10 倍？從漏磁、磁阻到磁通聚焦與 F∝B²，一次講清楚壺形磁鐵背後的磁路設計邏輯。',
      },
      en: {
        title: 'Magnetic Circuit Alchemy: Why Does Adding a Cheap Iron Plate Triple NdFeB Pull Force?',
        excerpt: 'Why can adding a cheap iron piece to an expensive NdFeB magnet increase suction force by 3–10x? From magnetic leakage and reluctance to flux focusing and F∝B², explaining the magnetic circuit design logic behind pot magnets.',
        content: `<p>Why does covering an expensive magnet with a cheap iron sheet make it stronger? This is the ultimate physics of "doing more with less" — <strong>Magnetic Circuit Design</strong>.</p><h2>1. The Bare Magnet Dilemma: You're Wasting Most of Your Magnetic Power</h2><p>Air has a relative permeability μr of approximately 1. Magnetic flux is diffusely distributed around the magnet — most is wasted in air rather than passing through the target.</p><h2>2. The Role of Iron: Magnetic "Optical Fiber" and "Lens"</h2><p>Steel has μr in the thousands or higher. Magnetic lines are "sucked" into low-reluctance iron parts, forming a more complete closed circuit. Large-area iron collects total flux and redirects it to a small contact surface, significantly amplifying flux density B at the working point.</p><h2>3. The Physics: F ∝ B²</h2><p>F ≈ (B² · A) / (2μ₀). If iron shell design doubles B, pull force increases approximately 4x.</p><h2>4. The Cost Advantage</h2><p>Through magnetic circuit design, engineers can replace magnet volume with cheaper iron parts while maintaining or improving the working surface field — significantly reducing magnetic assembly costs.</p>`,
        metaTitle: 'Magnetic Circuit Design: Why Cheap Iron Multiplies NdFeB Pull Force',
        metaDescription: 'Why can adding a cheap iron piece to an NdFeB magnet increase suction force by 3–10x? Explaining flux leakage, reluctance, and F∝B² behind pot magnet design.',
      },
      vi: {
        title: 'Giả kim thuật mạch từ: Tại sao tấm sắt rẻ tiền lại tăng lực kéo NdFeB lên gấp 3 lần?',
        excerpt: 'Tại sao thêm miếng sắt rẻ vào nam châm NdFeB đắt tiền có thể tăng lực hút 3–10 lần? Từ rò rỉ từ, từ trở đến tập trung từ thông và F∝B².',
        content: `<p>Tại sao bọc một nam châm đắt tiền bằng tấm sắt rẻ tiền lại khiến nó mạnh hơn? Đây là kỹ thuật "làm nhiều từ ít" trong vật lý — <strong>Thiết kế mạch từ</strong>.</p><h2>1. Vấn đề của nam châm trần</h2><p>Không khí có μr xấp xỉ 1. Từ thông phân tán trong không gian xung quanh nam châm — phần lớn lãng phí trong không khí.</p><h2>2. Vai trò của sắt</h2><p>Thép có μr hàng nghìn. Các đường sức từ bị "hút" vào các chi tiết sắt có từ trở thấp, tập trung từ thông lên bề mặt làm việc nhỏ, khuếch đại mật độ từ thông B.</p><h2>3. Vật lý: F ∝ B²</h2><p>Nếu thiết kế vỏ sắt tăng B lên 2 lần, lực hút tăng lên khoảng 4 lần.</p><h2>4. Đòn đánh giảm chiều về chi phí</h2><p>Thông qua thiết kế mạch từ, các kỹ sư có thể thay thế phần lớn thể tích nam châm đắt tiền bằng các chi tiết sắt rẻ tiền hơn, đồng thời duy trì hoặc thậm chí nâng cao từ trường tại bề mặt làm việc, giúp giảm đáng kể chi phí của cụm linh kiện từ tính.</p>`,
        metaTitle: 'Thiết kế mạch từ: Tại sao sắt rẻ nhân đôi lực kéo NdFeB',
        metaDescription: 'Tại sao thêm miếng sắt rẻ vào nam châm NdFeB có thể tăng lực hút 3–10 lần? Giải thích rò rỉ từ, từ trở và F∝B².',
      },
      ja: {
        title: '磁気回路の錬金術：なぜ安価な鉄板を加えるとNdFeBの吸引力が3倍になるのか？',
        excerpt: 'なぜ高価なNdFeB磁石に安価な鉄板を加えるだけで、吸引力が3〜10倍にも増幅するのか？漏れ磁束、磁気抵抗から磁束集中、そしてF∝B²まで、ポットマグネットの背後にある磁気回路設計のロジックを一挙に解説します。',
        content: `<p>なぜ高価な磁石に安価な鉄板を被せるだけで、それが「強く」なるのでしょうか？これは魔法ではなく、物理学における究極の「少ない投資で大きな成果を得る」工学——<strong>磁気回路設計（Magnetic Circuit Design）</strong>です。</p><h2>1. 裸磁石のジレンマ：あなたは大量の「磁力」を無駄にしている</h2><p>空気の比透磁率μrはおよそ1で、磁力線は磁石周辺の広い空間に散漫に分布し、漏れ磁束（Magnetic Leakage）を形成します。この磁石で物体を吸着しようとする際、実際にターゲットを貫く磁束はごく一部にすぎず、残りはすべて空気中で無駄になっています。</p><h2>2. 鉄板の役割：磁力の「光ファイバー」と「レンズ」</h2><p>鋼鉄の比透磁率μrは数千から数万にも達します。磁力線は低抵抗の鉄部品に「吸い込まれ」、より完全な閉ループを形成します。大面積の鉄部品で磁石が生み出す総磁束を「収集」し、それを小さな接触面へと導くことで、作業点における磁束密度Bを大幅に増幅できます。</p><h2>3. 暴力的な物理関係：F ∝ B²</h2><p>F ≈ (B² · A) / (2μ₀)。鉄殻設計によってBを2倍に高めることができれば、吸引力は約4倍に上昇します。</p><h2>4. コストの次元を超えた優位性</h2><p>磁気回路設計により、エンジニアは本来必要な磁石の体積の多くを安価な鉄部品に置き換えることができ、作業面の磁場を維持または向上させながら、磁性部品のコストを大幅に削減できます。</p>`,
        metaTitle: '磁気回路設計：なぜ安価な鉄板がNdFeBの磁力を激増させるのか？',
        metaDescription: 'なぜ高価なNdFeB磁石に安価な鉄板を加えるだけで、吸引力が3〜10倍にも増幅するのか？漏れ磁束、磁気抵抗から磁束集中、F∝B²まで、ポットマグネットの磁気回路設計ロジックを解説します。',
      },
    },
  },
  {
    slug: 'ndfeb-end-to-end-process',
    publishDate: '2026-01-04',
    category: 'technical',
    coverImage: '/assets/uploads/ndfeb-end-to-end-process-cover.webp',
    translations: {
      'zh-Hant': {
        title: 'NdFeB 全流程技術解析：從礦山到磁化的垂直整合生產',
        excerpt: '全面解析燒結釹鐵硼（NdFeB）從礦山開採、萃取提煉到最終磁化與回收的完整垂直整合生產流程。',
        content: `<p>燒結釹鐵硼（NdFeB）作為當今磁性能最強的永磁材料，其生產過程是一個高度複雜且環環相扣的垂直整合流程。</p><h2>礦山開採（Mining）</h2><p>開採稀土礦石並進行選礦處理，將礦石中的稀土礦物富集。稀土氧化物含量可從天然礦石的僅數% 提高到約 60% 以上。</p><h2>溶劑萃取（Solvent Extraction）</h2><p>多級逆流萃取技術分離釹等目標稀土元素，是工業上獲得高純度單一稀土的主要手段。</p><h2>煅燒（Calcination）</h2><p>將釹化合物中間體進行高溫煅燒，轉化為氧化釹（Nd₂O₃）粉體。</p><h2>熔鹽電解（Molten Salt Electrolysis）</h2><p>在惰性氣氛下進行電解，釹離子在陰極被還原成金屬釹。</p><h2>快速冷卻鑄帶（Strip Casting）</h2><p>將釹、鐵、硼按配比熔化，透過高速轉動的冷卻銅輪迅速凝固，獲得約 0.3mm 的合金薄片。</p><h2>氫破碎與氣流磨（HD & Jet Mill）</h2><p>利用釹鐵硼吸氫後脆化特性使鑄片沿晶界崩裂，再研磨至 3–5μm 的均勻細粉。</p><h2>成型與燒結（Press & Sinter）</h2><p>在外加強磁場中壓製成型，於真空環境約 1000–1100°C 進行高溫燒結，致密化。</p><h2>機械加工（Machining）</h2><p>使用金剛石砂輪磨削、線切割等方法，加工至精確尺寸。</p><h2>表面處理（Surface Treatment）</h2><p>電鍍（如鎳-銅-鎳）、化學鍍或環氧樹脂塗覆，形成保護膜提高耐蝕性。</p><h2>磁化（Magnetizing）</h2><p>施加強大的脈衝磁場使磁體達到磁飽和，可選擇軸向、徑向或多極充磁方式。</p>`,
        metaTitle: 'NdFeB 全流程：從礦山開採到磁化的完整技術解析',
        metaDescription: '全面解析燒結釹鐵硼從礦山開採、萃取提煉到最終磁化與回收的完整垂直整合生產流程。',
      },
      en: {
        title: 'NdFeB End-to-End Process: From Mining to Magnetization',
        excerpt: 'A full technical walkthrough of sintered NdFeB — from mining and separation to magnetization and recycling.',
        content: `<p>Sintered NdFeB is the highest-performing permanent magnet material widely used today. Its manufacturing is a tightly coupled end-to-end process where each step directly impacts stability and quality.</p><h2>Mining</h2><p>Extract and beneficiate rare-earth ore to concentrate RE minerals and remove gangue/impurities. REO content raised to ~60%+.</p><h2>Solvent Extraction</h2><p>Multi-stage counter-current solvent extraction separates target REs (e.g., Nd) — industrial standard for high-purity separation.</p><h2>Calcination</h2><p>Heat Nd intermediates to remove volatiles and form Nd₂O₃ powder for electrolysis.</p><h2>Molten Salt Electrolysis</h2><p>Reduce Nd ions to metallic Nd under high temperature in an inert atmosphere.</p><h2>Strip Casting</h2><p>Vacuum induction melt Nd-Fe-B alloy and rapidly quench on a rotating copper wheel to produce thin alloy flakes (~0.3 mm).</p><h2>HD & Jet Milling</h2><p>Hydrogen decrepitation embrittles the alloy along grain boundaries, followed by jet milling to ~3–5 μm powder.</p><h2>Pressing & Sintering</h2><p>Align powder in a magnetic field and compact; then vacuum sinter (~1000–1100°C) to densify.</p><h2>Machining</h2><p>Diamond grinding, wire-cutting, and precision machining to final dimensions.</p><h2>Surface Treatment</h2><p>Plating/coating (e.g., Ni-Cu-Ni, electroless, epoxy) builds corrosion protection.</p><h2>Magnetizing</h2><p>Apply high pulsed fields to saturate magnets; axial, radial, or multipole patterns available.</p>`,
        metaTitle: 'NdFeB End-to-End Process: Mining to Magnetization',
        metaDescription: 'A full technical walkthrough of sintered NdFeB — from mining and separation to magnetization and recycling.',
      },
      vi: {
        title: 'Quy trình NdFeB đầu cuối: Từ khai thác đến từ hóa',
        excerpt: 'Phân tích kỹ thuật đầy đủ về NdFeB thiêu kết — từ khai thác, phân tách đến từ hóa và tái chế.',
        content: `<p>NdFeB thiêu kết là vật liệu nam châm vĩnh cửu hiệu suất cao nhất được sử dụng rộng rãi ngày nay. Quy trình sản xuất là một quá trình tích hợp chặt chẽ từ đầu đến cuối.</p><h2>Khai thác</h2><p>Chiết xuất và làm giàu quặng đất hiếm, nâng hàm lượng REO lên ~60%+.</p><h2>Chiết xuất dung môi</h2><p>Tách Nd và các nguyên tố đất hiếm khác — tiêu chuẩn công nghiệp cho độ tinh khiết cao.</p><h2>Điện phân muối nóng chảy</h2><p>Khử ion Nd thành kim loại Nd trong khí quyển trơ.</p><h2>Đúc dải</h2><p>Nấu chảy hợp kim Nd-Fe-B và làm nguội nhanh tạo các mảnh hợp kim mỏng (~0,3 mm).</p><h2>Nghiền hydro và phun khí</h2><p>Phân rã hydro làm giòn hợp kim, sau đó nghiền đến ~3–5 μm.</p><h2>Ép và thiêu kết</h2><p>Định hướng bột trong từ trường và thiêu kết chân không (~1000–1100°C).</p><h2>Gia công cơ khí</h2><p>Sử dụng đá mài kim cương, cắt dây và các phương pháp khác để gia công đến kích thước chính xác.</p><h2>Xử lý bề mặt</h2><p>Mạ điện (như niken-đồng-niken), mạ hóa học hoặc phủ epoxy, tạo lớp màng bảo vệ để tăng khả năng chống ăn mòn.</p><h2>Từ hóa</h2><p>Áp dụng trường xung cao để bão hòa nam châm.</p>`,
        metaTitle: 'Quy trình NdFeB: Khai thác đến Từ hóa',
        metaDescription: 'Phân tích kỹ thuật đầy đủ về NdFeB thiêu kết từ khai thác đến từ hóa và tái chế.',
      },
      ja: {
        title: 'NdFeB全工程技術解説：鉱山から着磁までの垂直統合生産',
        excerpt: '焼結NdFeBの鉱山採掘、抽出精製から最終的な着磁・リサイクルに至るまでの完全な垂直統合生産工程を包括的に解説します。',
        content: `<p>焼結NdFeBは現在最も磁気性能に優れた永久磁石材料であり、その生産プロセスは高度に複雑で緊密に連携した垂直統合工程です。</p><h2>鉱山採掘（Mining）</h2><p>レアアース鉱石を採掘し、選鉱処理を行ってレアアース鉱物を濃縮します。レアアース酸化物の含有量は、天然鉱石のわずか数％から約60％以上まで引き上げられます。</p><h2>溶媒抽出（Solvent Extraction）</h2><p>多段向流抽出技術によりネオジムなどの目的レアアース元素を分離します。これは工業的に高純度の単一レアアースを得るための主要な手段です。</p><h2>焙焼（Calcination）</h2><p>ネオジム化合物の中間体を高温で焙焼し、酸化ネオジム（Nd₂O₃）粉体に転化します。</p><h2>溶融塩電解（Molten Salt Electrolysis）</h2><p>不活性雰囲気下で電解を行い、ネオジムイオンが陰極で還元されて金属ネオジムになります。</p><h2>急冷鋳造（Strip Casting）</h2><p>ネオジム・鉄・ホウ素を配合比率通りに溶解し、高速回転する冷却銅ロールで急速凝固させ、約0.3mmの合金薄片を得ます。</p><h2>水素破砕とジェットミル（HD & Jet Mill）</h2><p>NdFeBが水素を吸収すると脆化する特性を利用して鋳片を結晶粒界に沿って崩壊させ、さらに3〜5μmの均一な微粉末まで粉砕します。</p><h2>成形と焼結（Press & Sinter）</h2><p>強力な外部磁場中で加圧成形し、真空環境下で約1000〜1100°Cの高温焼結を行い緻密化します。</p><h2>機械加工（Machining）</h2><p>ダイヤモンド砥石研削、ワイヤーカットなどの方法を用いて、正確な寸法まで加工します。</p><h2>表面処理（Surface Treatment）</h2><p>電気めっき（ニッケル・銅・ニッケルなど）、無電解めっき、またはエポキシ樹脂コーティングにより保護膜を形成し、耐食性を高めます。</p><h2>着磁（Magnetizing）</h2><p>強力なパルス磁場を印加して磁石を磁気飽和させます。軸方向、径方向、または多極着磁方式を選択できます。</p>`,
        metaTitle: 'NdFeB全工程：鉱山採掘から着磁までの完全技術解説',
        metaDescription: '焼結NdFeBの鉱山採掘、抽出精製から最終的な着磁・リサイクルに至るまでの完全な垂直統合生産工程を包括的に解説します。',
      },
    },
  },
  {
    slug: 'urban-mining-ndfeb-circular-recycling',
    publishDate: '2026-01-15',
    category: 'industry',
    coverImage: '/assets/uploads/urban-mining-ndfeb-circular-recycling-cover.webp',
    translations: {
      'zh-Hant': {
        title: '隱藏在城市裡的「稀土礦山」：釹鐵硼磁鐵的永續再生革命',
        excerpt: '從電子廢棄物到高性能磁材：解析城市挖礦、氫爆破碎、機器人拆解與精準提純，如何重塑釹鐵硼供應鏈韌性與 ESG 競爭力。',
        content: `<p>在數位轉型與綠能轉型的雙重浪潮下，釹鐵硼（NdFeB）強磁支撐著從手機震動馬達、電腦硬碟到電動車驅動馬達的核心運作。然而，一個新的概念正悄然改變製造業的遊戲規則：「城市挖礦（Urban Mining）」。</p><h2>為什麼我們需要「城市挖礦」？</h2><ul><li><strong>資源密度高</strong>：廢棄馬達中的稀土含量，往往高於自然界中的原始礦床。</li><li><strong>低碳足跡</strong>：回收再生的碳排放量遠低於原生開採，符合 ESG 企業採購趨勢。</li><li><strong>供應更穩</strong>：降低對單一產地與價格波動的依賴，提升採購可預測性。</li></ul><h2>點石成金：釹鐵硼回收的三大黑科技</h2><ol><li><strong>氫爆破碎技術（Hydrogen Decrepitation）</strong>：利用釹鐵硼吸氫後會膨脹碎裂的特性，將廢磁鐵直接轉化為粉末；再經重新燒結，可在較低能耗下製造出性能接近原生的磁鐵。</li><li><strong>自動化機器人拆解</strong>：以 AI 視覺辨識搭配機器人手臂，精準定位硬碟、馬達與消費性電子中磁鐵位置。</li><li><strong>精準提純技術</strong>：透過先進濕法冶金或電化學分離，將磁鐵中的釹、鐠、鏑、鋱等元素還原成高純度氧化物。</li></ol>`,
        metaTitle: '城市挖礦：釹鐵硼磁鐵的永續再生革命',
        metaDescription: '從電子廢棄物到高性能磁材：解析城市挖礦、氫爆破碎、機器人拆解與精準提純，如何重塑釹鐵硼供應鏈韌性與 ESG 競爭力。',
      },
      en: {
        title: '"Rare Earth Mines" Hidden in Cities: The Sustainable Regeneration Revolution of NdFeB Magnets',
        excerpt: 'From electronic waste to high-performance magnetic materials: how urban mining, hydrogen decrepitation, robot dismantling, and precision purification are reshaping NdFeB supply chain resilience and ESG competitiveness.',
        content: `<p>Under the twin waves of digital and green energy transformation, NdFeB magnets support everything from smartphone vibration motors to EV drive motors. A new concept is quietly changing the manufacturing game: "Urban Mining."</p><h2>Why Do We Need Urban Mining?</h2><ul><li><strong>High resource density</strong>: Rare earth content in discarded motors often exceeds that of natural ore deposits.</li><li><strong>Low carbon footprint</strong>: Recycling emissions are far lower than virgin mining, aligning with ESG procurement trends.</li><li><strong>More stable supply</strong>: Reduces dependence on single origins and price fluctuations.</li></ul><h2>Three Key Technologies for NdFeB Recycling</h2><ol><li><strong>Hydrogen Decrepitation</strong>: NdFeB absorbs hydrogen, expands, and fragments — waste magnets convert directly to powder for re-sintering at lower energy.</li><li><strong>Automated Robot Disassembly</strong>: AI vision + robot arms accurately locate magnets in hard drives, motors, and consumer electronics.</li><li><strong>Precision Purification</strong>: Advanced hydrometallurgy or electrochemical separation converts Nd, Pr, Dy, Tb back into high-purity oxides for re-entry into the production chain.</li></ol>`,
        metaTitle: 'Urban Mining: NdFeB Magnet Sustainable Regeneration Revolution',
        metaDescription: 'How urban mining, hydrogen decrepitation, robot dismantling, and precision purification are reshaping NdFeB supply chain resilience and ESG competitiveness.',
      },
      vi: {
        title: '"Mỏ đất hiếm" ẩn giấu trong thành phố: Cuộc cách mạng tái sinh bền vững của nam châm NdFeB',
        excerpt: 'Từ chất thải điện tử đến vật liệu từ tính hiệu suất cao: cách khai thác đô thị, nghiền nổ hydro, tháo dỡ robot và tinh chế chính xác đang định hình lại chuỗi cung ứng NdFeB.',
        content: `<p>Dưới làn sóng kép của chuyển đổi kỹ thuật số và năng lượng xanh, nam châm NdFeB hỗ trợ mọi thứ từ động cơ rung điện thoại đến động cơ xe điện. Một khái niệm mới đang thay đổi luật chơi: "Khai thác đô thị".</p><h2>Tại sao chúng ta cần "khai thác đô thị"?</h2><ul><li><strong>Mật độ tài nguyên cao</strong>: Hàm lượng đất hiếm trong động cơ bị loại bỏ thường cao hơn so với các mỏ quặng nguyên sinh trong tự nhiên.</li><li><strong>Dấu chân carbon thấp</strong>: Lượng khí thải carbon từ tái chế thấp hơn nhiều so với khai thác nguyên sinh, phù hợp với xu hướng mua sắm ESG của doanh nghiệp.</li><li><strong>Nguồn cung ổn định hơn</strong>: Giảm sự phụ thuộc vào một nguồn cung duy nhất và biến động giá cả, nâng cao khả năng dự đoán trong mua sắm.</li></ul><h2>Ba công nghệ chính cho tái chế NdFeB</h2><ol><li><strong>Phân hủy hydro</strong>: NdFeB hấp thụ hydro, nở ra và vỡ vụn — nam châm thải chuyển trực tiếp thành bột để thiêu kết lại.</li><li><strong>Robot tháo dỡ tự động</strong>: AI + cánh tay robot xác định chính xác vị trí nam châm trong ổ cứng và điện tử tiêu dùng.</li><li><strong>Tinh chế chính xác</strong>: Thủy luyện tiên tiến chuyển đổi Nd, Pr, Dy, Tb thành oxit độ tinh khiết cao.</li></ol>`,
        metaTitle: 'Khai thác đô thị: Cách mạng tái sinh bền vững nam châm NdFeB',
        metaDescription: 'Cách khai thác đô thị, nghiền nổ hydro và tinh chế chính xác đang định hình lại chuỗi cung ứng NdFeB.',
      },
      ja: {
        title: '都市に隠された「レアアース鉱山」：NdFeB磁石のサステナブル再生革命',
        excerpt: '電子廃棄物から高性能磁性材料へ：都市鉱山、水素破砕、ロボット分解、精密精製がNdFeBサプライチェーンのレジリエンスとESG競争力をどう再構築するかを解説します。',
        content: `<p>デジタル変革とグリーンエネルギー変革の二重の波の中、NdFeB強磁石はスマートフォンの振動モーターからコンピュータのハードディスク、電気自動車の駆動モーターに至るまで、その中核的な動作を支えています。しかし、新しい概念が静かに製造業のルールを変えつつあります——「都市鉱山（Urban Mining）」です。</p><h2>なぜ「都市鉱山」が必要なのか？</h2><ul><li><strong>資源密度が高い</strong>：廃棄されたモーター中のレアアース含有量は、しばしば自然界の原鉱床よりも高くなります。</li><li><strong>低炭素フットプリント</strong>：リサイクルによる炭素排出量は原生採掘よりはるかに低く、企業のESG調達トレンドに合致します。</li><li><strong>より安定した供給</strong>：単一産地や価格変動への依存を減らし、調達の予測可能性を高めます。</li></ul><h2>点石成金：NdFeBリサイクルの3大先端技術</h2><ol><li><strong>水素破砕技術（Hydrogen Decrepitation）</strong>：NdFeBが水素を吸収すると膨張・破砕する特性を利用し、廃磁石を直接粉末に転化。再焼結することで、より低いエネルギー消費で原生品に近い性能の磁石を製造できます。</li><li><strong>自動化ロボット分解</strong>：AI画像認識とロボットアームを組み合わせ、ハードディスク、モーター、民生電子機器内の磁石位置を正確に特定します。</li><li><strong>精密精製技術</strong>：先進的な湿式製錬または電気化学的分離により、磁石中のネオジム、プラセオジム、ジスプロシウム、テルビウムなどの元素を高純度酸化物へと還元します。</li></ol>`,
        metaTitle: '都市鉱山：NdFeB磁石のサステナブル再生革命',
        metaDescription: '電子廃棄物から高性能磁性材料へ：都市鉱山、水素破砕、ロボット分解、精密精製がNdFeBサプライチェーンのレジリエンスとESG競争力をどう再構築するかを解説します。',
      },
    },
  },
  {
    slug: 'why-n52-magnet-cannot-reach-14800-gauss',
    publishDate: '2026-01-18',
    category: 'technical',
    coverImage: '/assets/uploads/why-n52-magnet-cannot-reach-14800-gauss-cover.webp',
    translations: {
      'zh-Hant': {
        title: '為什麼 N52 磁鐵測不到 14,800 高斯？揭開釹鐵硼「消失磁力」的真相',
        excerpt: '規格表 Br 14.5 kGs，為何表面高斯計只讀到 4,500 G？用三個誤區（閉路/開路、Pc 形狀效應、探頭氣隙）一次講清楚，並提供更可靠的驗收方法。',
        content: `<p>「我們訂購了 N52 等級的磁鐵，規格表上寫著剩磁（Br）是 14.5 kGs，但品管部門用高斯計一測，表面磁場只有 4,500 Gauss。廠商是不是偷工減料？」</p><p>這是磁性材料供應商最常收到的客訴之一。看似「消失」的 10,000 Gauss，往往不是品質問題，而是數據解讀與量測條件的落差。</p><h2>誤區一：把「電池容量」當成「輸出電壓」</h2><p>牌號表的 Br（剩磁）是在閉路條件（Closed Circuit）下測得：磁鐵被夾在兩塊大純鐵中間，磁力線幾乎不需要穿過空氣。但實際使用是開路條件（Open Circuit）：空氣導磁率極低，磁鐵必須把磁力線「推」過空氣，形成退磁場（Demagnetizing Field）。</p><p><strong>工程師筆記：</strong>單體磁鐵表面中心點的理論極限，通常只有 Br 的約一半。以 N52（~14,800 G）估算，表面磁場上限多半落在 ~7,400 G 的量級。</p><h2>誤區二：忽略了「形狀」的決定性力量（Pc 值）</h2><p>長棒狀磁鐵像大力士，工作點維持在高檔，表磁較高。薄片狀磁鐵像漏氣氣球，工作點快速下滑，表磁顯著偏低。</p><p><strong>實測案例：</strong>一顆 D20 × 2 mm 的 N52 薄磁鐵，Pc 約 0.14 時，表磁讀數可能僅 ~1,500 G。</p><h2>誤區三：看不見的「空氣距離」（Air Gap）</h2><p>高斯計探頭的霍爾元件感測點通常離探頭表面 0.3–0.5 mm。磁場在空氣中的衰減近似指數級：僅 0.1 mm 的間隙就可能造成數百高斯下降。</p><h2>如何更可靠地驗收磁鐵？</h2><ol><li><strong>測量磁通量（Flux）</strong>：使用磁通計搭配亥姆霍茲線圈，量測磁鐵「整體磁力」，最不受人為位置誤差影響。</li><li><strong>測量拉力（Pull Force）</strong>：準備標準鋼板，量測垂直拉開所需力。</li><li><strong>建立黃金樣品（Golden Sample）</strong>：認樣階段保留一顆雙方認可的參考磁鐵，後續進貨與之比對。</li></ol>`,
        metaTitle: '為什麼 N52 磁鐵測不到 14,800 高斯？揭開釹鐵硼「消失磁力」的真相',
        metaDescription: '規格表 Br 14.5 kGs，為何表面高斯計只讀到 4,500 G？用三個誤區一次講清楚，並提供更可靠的驗收方法。',
      },
      en: {
        title: "Why Doesn't the N52 Magnet Measure 14,800 Gauss? Uncovering NdFeB's 'Lost Magnetism'",
        excerpt: 'Spec sheet Br 14.5 kGs, why does the surface gaussmeter only read 4,500 G? Three common misconceptions explained — closed/open circuit, Pc shape effect, probe air gap — plus more reliable acceptance methods.',
        content: `<p>"We ordered N52 grade magnets. The spec sheet states Br is 14.5 kGs, but the QC department measured only 4,500 Gauss at the surface. Is the manufacturer cutting corners?"</p><p>This is one of the most common customer complaints. The seemingly "disappearing" 10,000 Gauss is usually not a quality issue but a gap in data interpretation and measurement conditions.</p><h2>Misconception 1: Treating "Battery Capacity" as "Output Voltage"</h2><p>The Br on the grade table is measured under Closed Circuit conditions: the magnet is sandwiched between large pure iron plates, so magnetic field lines barely need to pass through air. Actual use is Open Circuit: air permeability is extremely low, creating a Demagnetizing Field.</p><p><strong>Engineer's note:</strong> The theoretical limit at the surface center of a single magnet is typically about half of Br. For N52 (~14,800 G), the surface field upper limit is approximately ~7,400 G.</p><h2>Misconception 2: Ignoring the Decisive Role of Shape (Pc value)</h2><p>Long rod magnets have high Pc and maintain high surface field. Thin disc magnets have low Pc and the working point "slides" significantly lower.</p><p><strong>Real test case:</strong> A D20 × 2 mm N52 thin magnet with Pc ~0.14 may read only ~1,500 G at the surface.</p><h2>Misconception 3: The Invisible Air Gap</h2><p>The Hall element sensing point is typically 0.3–0.5 mm from the probe surface. Magnetic field decays approximately exponentially in air — just 0.1 mm gap can cause hundreds of Gauss drop.</p><h2>More Reliable Acceptance Methods</h2><ol><li><strong>Measure magnetic flux</strong>: Use a fluxmeter with Helmholtz coil — least affected by human position error.</li><li><strong>Measure pull force</strong>: Standardized steel plate test to verify grade differences quickly.</li><li><strong>Establish a golden sample</strong>: Keep a mutually agreed reference magnet; compare each batch against it (±5–10%).</li></ol>`,
        metaTitle: "Why N52 Doesn't Measure 14,800 Gauss: NdFeB's Lost Magnetism Explained",
        metaDescription: "Spec sheet Br 14.5 kGs, why does the gaussmeter read only 4,500 G? Three misconceptions explained plus reliable magnet acceptance methods.",
      },
      vi: {
        title: 'Tại sao nam châm N52 không đo được 14.800 Gauss? Sự thật về "mất từ tính" của NdFeB',
        excerpt: 'Bảng thông số Br 14,5 kGs, tại sao máy đo chỉ đọc 4.500 G? Ba hiểu lầm phổ biến được giải thích — mạch kín/hở, hiệu ứng hình dạng Pc, khe hở không khí đầu dò.',
        content: `<p>Đây là một trong những khiếu nại phổ biến nhất từ khách hàng. 10.000 Gauss dường như "biến mất" thường không phải là vấn đề chất lượng mà là lỗ hổng trong giải thích dữ liệu.</p><h2>Hiểu lầm 1: Nhầm "dung lượng pin" với "điện áp đầu ra"</h2><p>Br trong bảng cấp độ được đo trong điều kiện mạch kín. Sử dụng thực tế là mạch hở — tạo ra trường khử từ. Giới hạn lý thuyết tại bề mặt thường chỉ bằng một nửa Br.</p><h2>Hiểu lầm 2: Bỏ qua hình dạng (giá trị Pc)</h2><p>Nam châm thanh dài có Pc cao, từ tính bề mặt cao. Nam châm đĩa mỏng có Pc thấp, từ tính bề mặt thấp đáng kể.</p><h2>Hiểu lầm 3: Khe hở không khí vô hình</h2><p>Điểm cảm biến cách bề mặt đầu dò 0,3–0,5 mm. Từ trường suy giảm theo hàm mũ trong không khí.</p><h2>Phương pháp chấp nhận đáng tin cậy hơn</h2><ol><li>Đo từ thông bằng fluxmeter và cuộn dây Helmholtz</li><li>Đo lực kéo trên tấm thép tiêu chuẩn</li><li>Thiết lập mẫu vàng làm tham chiếu</li></ol>`,
        metaTitle: 'Tại sao N52 không đo được 14.800 Gauss: Giải thích "mất từ tính" NdFeB',
        metaDescription: 'Tại sao máy đo chỉ đọc 4.500 G khi Br là 14,5 kGs? Ba hiểu lầm phổ biến và phương pháp chấp nhận đáng tin cậy hơn.',
      },
      ja: {
        title: 'なぜN52磁石は14,800ガウスを測定できないのか？NdFeBの「消えた磁力」の真相を解明',
        excerpt: 'スペックシートにはBr 14.5kGsと記載されているのに、なぜ表面ガウスメーターは4,500Gしか示さないのか？閉回路／開回路、Pc形状効果、プローブのエアギャップという3つの誤解を一挙に解説し、より信頼性の高い受け入れ検査方法を提案します。',
        content: `<p>「N52グレードの磁石を発注しました。スペックシートには残留磁束密度（Br）が14.5kGsと記載されていますが、品質管理部門がガウスメーターで測定したところ、表面磁場はわずか4,500ガウスでした。メーカーは手を抜いているのではないか？」</p><p>これは磁性材料サプライヤーが最もよく受け取るクレームの一つです。一見「消えた」ように見える10,000ガウスは、多くの場合品質問題ではなく、データの解釈と測定条件のギャップによるものです。</p><h2>誤解その1：「電池容量」を「出力電圧」と混同する</h2><p>グレード表のBr（残留磁束密度）は閉回路（Closed Circuit）条件下で測定されます：磁石は2枚の大きな純鉄の間に挟まれ、磁力線はほとんど空気を通る必要がありません。しかし実際の使用は開回路（Open Circuit）条件です：空気の透磁率は極めて低く、磁石は磁力線を空気中に「押し出さ」なければならず、反磁場（Demagnetizing Field）が形成されます。</p><p><strong>エンジニアのメモ：</strong>単体磁石の表面中心点における理論上の上限は、通常Brの約半分に過ぎません。N52（約14,800G）で試算すると、表面磁場の上限は多くの場合~7,400Gのオーダーに収まります。</p><h2>誤解その2：「形状」の決定的な影響力（Pc値）を見落とす</h2><p>長い棒状の磁石は力持ちのように、動作点が高い水準に維持され、表面磁力も高くなります。薄い円盤状の磁石は空気の抜けた風船のように、動作点が急速に低下し、表面磁力が著しく低くなります。</p><p><strong>実測事例：</strong>D20×2mmのN52薄型磁石では、Pcが約0.14の場合、表面磁力の読み取り値はわずか~1,500Gにとどまることがあります。</p><h2>誤解その3：目に見えない「空気の距離」（エアギャップ）</h2><p>ガウスメーターのプローブのホール素子の感知点は、通常プローブ表面から0.3〜0.5mm離れています。磁場は空気中でほぼ指数関数的に減衰します：わずか0.1mmの隙間でも数百ガウスの低下を引き起こす可能性があります。</p><h2>より信頼性の高い磁石の受け入れ検査方法とは？</h2><ol><li><strong>磁束（Flux）を測定する</strong>：フラックスメーターとヘルムホルツコイルを組み合わせて磁石の「全体的な磁力」を測定します。人為的な位置誤差の影響を最も受けにくい方法です。</li><li><strong>吸引力（Pull Force）を測定する</strong>：標準鋼板を用意し、垂直に引き離すのに必要な力を測定します。</li><li><strong>ゴールデンサンプル（Golden Sample）を確立する</strong>：認定サンプル段階で双方が合意した基準磁石を保管し、以降の入荷分と比較します。</li></ol>`,
        metaTitle: 'なぜN52磁石は14,800ガウスを測定できないのか？NdFeBの「消えた磁力」を解明',
        metaDescription: 'スペックシートのBrは14.5kGsなのに、なぜガウスメーターは4,500Gしか示さないのか？3つの誤解を解説し、より信頼性の高い磁石受け入れ検査方法を提案します。',
      },
    },
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getTranslation(article: Article, lang: string): ArticleTranslation | undefined {
  return article.translations[lang === 'zh' ? 'zh-Hant' : lang]
    ?? article.translations['en']
    ?? article.translations['zh-Hant']
}
