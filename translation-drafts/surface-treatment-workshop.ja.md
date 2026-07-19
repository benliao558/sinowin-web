# 表面處理車間 — 日文（JA）翻譯草稿

**⚠️ 這是 AI 產生的翻譯草稿，尚未經過人工審核，請勿直接當作正式內容使用或匯入 Sanity。**
**本檔案未被任何程式引用，純粹作為人工審核用的參考文件。**

來源：Sanity `workshop` 文件 `workshop-surface-treatment`（2026-07-18 從 `src/lib/localWorkshops.ts` 遷移進 Sanity）

原則確認：技術名詞（NdFeB、salt spray、Ni-Cu-Ni、Epoxy、E-coating、Cu-Ni-P、Zinc、Cross-cut、Dyne test、NSS、ASTM）保留英文不譯；數字（鹽霧時數、厚度）四語言完全一致。

「車間/Workshop」譯法沿用其餘 7 個車間已定案的慣例（查詢 Sanity 現有資料確認）：ja 統一用「〜工場」。

---

## 1. cardTitle（卡片標題）
- **zh：** 表面處理車間
- **en：** Surface treatment workshop
- **JA：** 表面処理工場

## 2. cardDesc（卡片說明）
- **zh：** 五種鍍層／塗層工藝，依環境與可靠性要求選型，標準化測試確保批次一致。
- **en：** Five coating processes, selected by operating environment and reliability requirements, with standardized testing to ensure batch consistency.
- **JA：** 5種類のめっき／コーティング工程があり、使用環境と信頼性要件に応じて選定、標準化された試験によりロット間の一貫性を確保します。

## 3. intro（車間介紹）
- **zh：** 釹鐵硼磁鐵易受潮氧化，表面處理決定其在實際環境中的壽命。SINOWIN 提供五種鍍層／塗層工藝，依使用環境、裝配方式與可靠性要求選型，並以標準化測試確保批次一致。
- **en：** NdFeB magnets are prone to oxidation; surface treatment determines their service life in real-world conditions. SINOWIN offers five coating processes, selected by operating environment, assembly method, and reliability requirements, with standardized testing to ensure batch consistency.
- **JA：** NdFeB磁石は湿気による酸化が起こりやすく、表面処理が実使用環境における寿命を左右します。SINOWINは使用環境、組み立て方法、信頼性要件に応じて選定できる5種類のめっき／コーティング工程を提供し、標準化された試験によりロット間の一貫性を確保しています。

## 4. highlights（應用亮點，4 項）

| # | zh | en | JA |
|---|---|---|---|
| 1 | 高濕度／腐蝕環境應用 | High-humidity / corrosive environment applications | 高湿度・腐食環境での用途 |
| 2 | 需絕緣的馬達／感測元件 | Insulated motors / sensor components | 絶縁が必要なモーター・センサー部品 |
| 3 | 複雜幾何形狀均勻覆蓋 | Uniform coverage on complex geometries | 複雑な形状への均一な被膜 |
| 4 | 一般環境的經濟型防護 | Economical protection for general environments | 一般環境向けの経済的な保護 |

## 5. processTable（製程比較表）

### 5.1 欄位標題（columns）

| zh | en | JA |
|---|---|---|
| 工藝 | Process | 工程 |
| 特性 | Characteristics | 特性 |
| 鹽霧測試 (SST) | Salt spray test (SST) | 塩水噴霧試験 (SST) |
| 鍍層厚度 | Coating thickness | 被膜厚さ |

### 5.2 資料列（rows）— process 與 thickness 不譯，四語言一致

| process（不譯） | characteristics zh | characteristics en | characteristics JA | sst zh | sst en | sst JA | thickness（不譯） |
|---|---|---|---|---|---|---|---|
| Ni-Cu-Ni | 鎳銅鎳 · 最常用 · 金屬光澤 · 耐磨 | Ni-Cu-Ni · most common · metallic finish · wear-resistant | Ni-Cu-Ni · 最も一般的 · 金属光沢 · 耐摩耗性 | 可達 >48h | Up to >48h | >48h まで | 10–20μm |
| Epoxy | 環氧噴塗 · 最高耐蝕 · 絕緣 · 黑色霧面 | Epoxy spray · highest corrosion resistance · insulating · matte black | エポキシ塗装 · 最高の耐食性 · 絶縁性 · 黒つや消し | 可達 500h | Up to 500h | 500h まで | 10–20μm |
| E-coating | 電泳 · 均勻覆蓋 · 複雜形狀 · 絕緣 | Electrophoretic · uniform coverage · complex shapes · insulating | 電着塗装 · 均一な被膜 · 複雑形状対応 · 絶縁性 | 依需求提供 | On request | 要相談 | Per spec |
| Cu-Ni-P | 銅鎳磷 · 高硬度 · 耐蝕 · 化學鍍 | Cu-Ni-P · high hardness · corrosion-resistant · electroless | Cu-Ni-P · 高硬度 · 耐食性 · 無電解めっき | 可達 240h | Up to 240h | 240h まで | 10–20μm |
| Zinc | 鋅 · 經濟 · 適合一般環境 | Zinc · economical · suited to general environments | 亜鉛（Zinc）· 経済的 · 一般環境向け | 可達 >24h | Up to >24h | >24h まで | 10–20μm |

## 6. disclaimer（免責聲明）
- **zh：** 鹽霧數據為特定條件下可達之測試值，實際允收標準依專案規範與圖面要求確認。常規鍍層厚度 10–20μm，可依客製需求調整。
- **en：** Salt spray figures are achievable test values under specific conditions; actual acceptance criteria are confirmed per project specification. Standard coating thickness is 10–20μm, adjustable to custom requirements.
- **JA：** 塩水噴霧試験の数値は特定条件下で達成可能な試験値であり、実際の合否基準はプロジェクト仕様および図面要件に基づき確認します。標準被膜厚さは10–20μmで、カスタム要件に応じて調整可能です。

## 7. qualityStandards（品質檢測標準）

### 7.1 title
- **zh：** 品質檢測標準
- **en：** Quality inspection standards
- **JA：** 品質検査基準

### 7.2 items（3 項）

| label zh | label en | label JA | value zh | value en | value JA |
|---|---|---|---|---|---|
| 附著力 | Adhesion | 密着性 | 百格測試 (Cross-cut) | Cross-cut test | クロスカット試験 (Cross-cut) |
| 潔淨度 | Cleanliness | 清浄度 | 達因測試 (Dyne test) | Dyne test | ダイン試験 (Dyne test) |
| 耐蝕性 | Corrosion resistance | 耐食性 | 中性鹽霧測試（NSS / ASTM B117） | Neutral salt spray (NSS / ASTM B117) | 中性塩水噴霧試験 (NSS / ASTM B117) |

## 8. gallery alt（圖片替代文字）— 建議不譯，維持現狀

現況同 vi 版第 8 節說明：`gallery[].alt` 是未分語言的單一字串欄位（schema 是純 `string` 不是 `localeString`），跟其他車間的 `badge` 一樣屬於刻意共用、不分語言的欄位。本輪判斷不在翻譯範圍內，維持現狀。若要分語言需先改 schema，超出本輪範圍。

---

## 9. 自我檢查表：數字與專有名詞

| 項目 | zh/en | JA | 一致？ |
|---|---|---|---|
| 鹽霧時數：Ni-Cu-Ni | >48h | >48h | ✅ |
| 鹽霧時數：Epoxy | 500h | 500h | ✅ |
| 鹽霧時數：Cu-Ni-P | 240h | 240h | ✅ |
| 鹽霧時數：Zinc | >24h | >24h | ✅ |
| 鍍層厚度（4 項製程） | 10–20μm | 10–20μm | ✅ |
| 技術製程代號 | Ni-Cu-Ni / Epoxy / E-coating / Cu-Ni-P / Zinc | 同左，未改動 | ✅ |
| 檢測方法名 | Cross-cut / Dyne test / NSS / ASTM B117 | 同左，未改動（附日文片假名輔助） | ✅ |
| NdFeB | NdFeB | NdFeB（未改動） | ✅ |

---

## 10. 判斷點／需要 Ben 確認的地方

1. **「工程」vs「プロセス」用字**：processTable 欄位標題「工藝/Process」目前譯為「工程」（日文工業語境常用字），若 Ben 偏好更貼近英文的「プロセス」也可以，兩者在日文技術文件裡都常見，屬風格選擇非對錯問題。
2. **E-coating「電着塗装」、Cu-Ni-P「無電解めっき」等意譯**：日文工業界對這些製程有慣用的專業意譯詞（電着塗装=電泳塗裝、無電解めっき=無電鍍/化學鍍），比直接音譯更容易被日本客戶理解，故採用意譯而非保留英文製程名稱本身的中文/英文說明部分；但**製程代號欄位本身**（表格最左欄 Ni-Cu-Ni / Epoxy / E-coating / Cu-Ni-P / Zinc）維持英文不動，只有「特性」欄位的說明文字用了日文工業慣用語。這點請 Ben 特別確認是否符合預期，因為這是唯一在「技術名詞保留英文」原則上做了語意詮釋（而非逐字翻譯）的地方。
3. **SST 表格 sst 欄位「〜まで」寫法**：例如「>48h まで」，日文語感上「〜まで」（直到、最多到）用於「Up to」略微拗口（因為 >48h 本身已經是「超過48小時」的意思，跟「まで(上限)」語意有點衝突），是否要改成更順的「48時間超（規格上限として想定）」之類的說法，或維持現譯直接對應英文結構？目前草稿選擇貼近原文結構的版本，供 Ben 判斷。
