# 表面處理車間 — 越南文（VI）翻譯草稿

**⚠️ 這是 AI 產生的翻譯草稿，尚未經過人工審核，請勿直接當作正式內容使用或匯入 Sanity。**
**本檔案未被任何程式引用，純粹作為人工審核用的參考文件。**

來源：Sanity `workshop` 文件 `workshop-surface-treatment`（2026-07-18 從 `src/lib/localWorkshops.ts` 遷移進 Sanity）

原則確認：技術名詞（NdFeB、salt spray、Ni-Cu-Ni、Epoxy、E-coating、Cu-Ni-P、Zinc、Cross-cut、Dyne test、NSS、ASTM）保留英文不譯；數字（鹽霧時數、厚度）四語言完全一致。

「車間/Workshop」譯法沿用其餘 7 個車間已定案的慣例（查詢 Sanity 現有資料確認）：ja 用「〜工場」，vi 用「Xưởng 〜」（字首大寫）。

---

## 1. cardTitle（卡片標題）
- **zh：** 表面處理車間
- **en：** Surface treatment workshop
- **VI：** Xưởng Xử Lý Bề Mặt

## 2. cardDesc（卡片說明）
- **zh：** 五種鍍層／塗層工藝，依環境與可靠性要求選型，標準化測試確保批次一致。
- **en：** Five coating processes, selected by operating environment and reliability requirements, with standardized testing to ensure batch consistency.
- **VI：** Năm quy trình mạ/phủ, được lựa chọn theo môi trường vận hành và yêu cầu độ tin cậy, với kiểm tra tiêu chuẩn hóa để đảm bảo tính nhất quán giữa các lô.

## 3. intro（車間介紹）
- **zh：** 釹鐵硼磁鐵易受潮氧化，表面處理決定其在實際環境中的壽命。SINOWIN 提供五種鍍層／塗層工藝，依使用環境、裝配方式與可靠性要求選型，並以標準化測試確保批次一致。
- **en：** NdFeB magnets are prone to oxidation; surface treatment determines their service life in real-world conditions. SINOWIN offers five coating processes, selected by operating environment, assembly method, and reliability requirements, with standardized testing to ensure batch consistency.
- **VI：** Nam châm NdFeB dễ bị oxy hóa do độ ẩm; xử lý bề mặt quyết định tuổi thọ của nam châm trong điều kiện thực tế. SINOWIN cung cấp năm quy trình mạ/phủ, được lựa chọn theo môi trường sử dụng, phương pháp lắp ráp và yêu cầu độ tin cậy, với kiểm tra tiêu chuẩn hóa để đảm bảo tính nhất quán giữa các lô.

## 4. highlights（應用亮點，4 項）

| # | zh | en | VI |
|---|---|---|---|
| 1 | 高濕度／腐蝕環境應用 | High-humidity / corrosive environment applications | Ứng dụng trong môi trường độ ẩm cao / ăn mòn |
| 2 | 需絕緣的馬達／感測元件 | Insulated motors / sensor components | Động cơ / linh kiện cảm biến cần cách điện |
| 3 | 複雜幾何形狀均勻覆蓋 | Uniform coverage on complex geometries | Phủ đều trên các hình dạng phức tạp |
| 4 | 一般環境的經濟型防護 | Economical protection for general environments | Giải pháp bảo vệ kinh tế cho môi trường thông thường |

## 5. processTable（製程比較表）

### 5.1 欄位標題（columns）

| zh | en | VI |
|---|---|---|
| 工藝 | Process | Quy trình |
| 特性 | Characteristics | Đặc tính |
| 鹽霧測試 (SST) | Salt spray test (SST) | Kiểm tra phun muối (SST) |
| 鍍層厚度 | Coating thickness | Độ dày lớp phủ |

### 5.2 資料列（rows）— process 與 thickness 不譯，四語言一致

| process（不譯） | characteristics zh | characteristics en | characteristics VI | sst zh | sst en | sst VI | thickness（不譯） |
|---|---|---|---|---|---|---|---|
| Ni-Cu-Ni | 鎳銅鎳 · 最常用 · 金屬光澤 · 耐磨 | Ni-Cu-Ni · most common · metallic finish · wear-resistant | Ni-Cu-Ni · phổ biến nhất · bề mặt kim loại · chống mài mòn | 可達 >48h | Up to >48h | Đạt >48h | 10–20μm |
| Epoxy | 環氧噴塗 · 最高耐蝕 · 絕緣 · 黑色霧面 | Epoxy spray · highest corrosion resistance · insulating · matte black | Phun Epoxy · khả năng chống ăn mòn cao nhất · cách điện · màu đen mờ | 可達 500h | Up to 500h | Đạt 500h | 10–20μm |
| E-coating | 電泳 · 均勻覆蓋 · 複雜形狀 · 絕緣 | Electrophoretic · uniform coverage · complex shapes · insulating | Điện di (E-coating) · phủ đều · hình dạng phức tạp · cách điện | 依需求提供 | On request | Theo yêu cầu | Per spec |
| Cu-Ni-P | 銅鎳磷 · 高硬度 · 耐蝕 · 化學鍍 | Cu-Ni-P · high hardness · corrosion-resistant · electroless | Cu-Ni-P · độ cứng cao · chống ăn mòn · mạ hóa học (electroless) | 可達 240h | Up to 240h | Đạt 240h | 10–20μm |
| Zinc | 鋅 · 經濟 · 適合一般環境 | Zinc · economical · suited to general environments | Kẽm (Zinc) · kinh tế · phù hợp môi trường thông thường | 可達 >24h | Up to >24h | Đạt >24h | 10–20μm |

*（E-coating、Zinc 兩列在 VI 版加了括號註記英文原名，因為越南文的「Điện di」「Kẽm」是意譯而非音譯，怕跟後面規格表對照時認不出對應哪個製程代號——這是我自己加的，不是原文有的，請 Ben 確認是否要保留括號註記或拿掉。）*

## 6. disclaimer（免責聲明）
- **zh：** 鹽霧數據為特定條件下可達之測試值，實際允收標準依專案規範與圖面要求確認。常規鍍層厚度 10–20μm，可依客製需求調整。
- **en：** Salt spray figures are achievable test values under specific conditions; actual acceptance criteria are confirmed per project specification. Standard coating thickness is 10–20μm, adjustable to custom requirements.
- **VI：** Số liệu phun muối là giá trị thử nghiệm có thể đạt được trong điều kiện cụ thể; tiêu chuẩn nghiệm thu thực tế được xác nhận theo quy cách của từng dự án và yêu cầu bản vẽ. Độ dày lớp phủ tiêu chuẩn là 10–20μm, có thể điều chỉnh theo yêu cầu tùy chỉnh.

## 7. qualityStandards（品質檢測標準）

### 7.1 title
- **zh：** 品質檢測標準
- **en：** Quality inspection standards
- **VI：** Tiêu chuẩn kiểm tra chất lượng

### 7.2 items（3 項）

| label zh | label en | label VI | value zh | value en | value VI |
|---|---|---|---|---|---|
| 附著力 | Adhesion | Độ bám dính | 百格測試 (Cross-cut) | Cross-cut test | Kiểm tra Cross-cut (rạch ô lưới) |
| 潔淨度 | Cleanliness | Độ sạch bề mặt | 達因測試 (Dyne test) | Dyne test | Kiểm tra Dyne (Dyne test) |
| 耐蝕性 | Corrosion resistance | Khả năng chống ăn mòn | 中性鹽霧測試（NSS / ASTM B117） | Neutral salt spray (NSS / ASTM B117) | Phun muối trung tính (NSS / ASTM B117) |

## 8. gallery alt（圖片替代文字）— 建議不譯，維持現狀

現況：`gallery[].alt` 目前是**未分語言的單一字串**（例如「SINOWIN 越南廠多槽鍍液生產線」），跟其他車間的 `badge` 欄位一樣屬於「四語言共用、不特別翻譯」的欄位類型（schema 裡也沒有 localeString 結構，是純 `string`）。**本輪判斷這不在翻譯範圍內**，維持現狀不動；若 Ben 希望這幾張圖的 alt text 也要分語言，需要先改 schema（`gallery[].alt` 從 `string` 改成 `localeString`），這超出本輪「只出草稿」的範圍，請另外指示。

---

## 9. 自我檢查表：數字與專有名詞

| 項目 | zh/en | VI | 一致？ |
|---|---|---|---|
| 鹽霧時數：Ni-Cu-Ni | >48h | >48h | ✅ |
| 鹽霧時數：Epoxy | 500h | 500h | ✅ |
| 鹽霧時數：Cu-Ni-P | 240h | 240h | ✅ |
| 鹽霧時數：Zinc | >24h | >24h | ✅ |
| 鍍層厚度（4 項製程） | 10–20μm | 10–20μm | ✅ |
| 技術製程代號 | Ni-Cu-Ni / Epoxy / E-coating / Cu-Ni-P / Zinc | 同左，未改動 | ✅ |
| 檢測方法名 | Cross-cut / Dyne test / NSS / ASTM B117 | 同左，未改動 | ✅ |
| NdFeB | NdFeB | NdFeB（未改動） | ✅ |

---

## 10. 判斷點／需要 Ben 確認的地方

1. **E-coating、Zinc 的越南文意譯是否要加英文原名括號註記**——見第 5.2 節下方說明，這是我自己判斷加的，怕越南讀者對照製程代號時混淆，非原文要求，請確認是否保留。
2. **Cross-cut、Dyne test 的越南文加了中文式意譯輔助（rạch ô lưới）**——因為這兩個是專業檢測法的英文名稱，越南工程背景讀者可能認得原文，但採購/業務背景讀者不一定認得，所以加了簡短意譯輔助理解，非強制翻譯。若 Ben 覺得多餘，可以拿掉只留英文。
3. **gallery alt 文字本輪不翻**——見第 8 節，這是範圍界定問題不是翻譯疑慮，但因為茲事體大（涉及 schema 變更）特此列出讓 Ben 知悉並決定是否要另外處理。
