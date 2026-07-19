# 集團版圖區塊 — 越南文（VI）翻譯草稿

**⚠️ 這是 AI 產生的翻譯草稿，尚未經過人工審核，請勿直接當作正式內容使用或匯入 Sanity/程式碼。**
**本檔案未被任何程式引用，純粹作為人工審核用的參考文件。**

來源：
- `src/app/[lang]/page.tsx`（`footprint` 物件，homepage 首頁「集團版圖」卡片區）
- `src/app/[lang]/china-base/page.tsx`（「中國生產基地」詳情頁，含 2 個廠區卡片）

兩者合併處理，因為 china-base 頁面是集團版圖卡片點擊後的延伸內容，主題與去政治化考量一致。

---

## 0. 去政治化對照表（⚠️ 本區塊涉及中國，先過一輪再翻）

這批內容全部是 2026-07-16／07-18 兩輪去政治化之後才寫的（見 `depoliticization-master.md`），zh/en 原文本身已經是中性揭露語氣，沒有「去中化」「規避長臂管轄」之類的用語殘留。逐句過一遍確認，全部標記為**【保留】**——沒有需要移除或改寫的政治化措辭，只需照原意直翻成中性、事實陳述的越南文：

| 來源 | zh 原文 | 判定 | 說明 |
|---|---|---|---|
| footprint.china.desc | 母公司華殷集團生產基地 | 【保留】 | 純事實：說明是集團生產基地，無立場語言 |
| footprint.china.badge | 集團據點 | 【保留】 | 中性標籤 |
| footprint.note | SINOWIN 依托集團跨國製造網絡，整合越南、中國、印度的資源與經驗，為客戶提供彈性的產能與供應選擇。 | 【保留】 | 「彈性」框架語言，非去中化語言 |
| china-base TITLE | 集團中國生產基地 | 【保留】 | 中性標題 |
| china-base BODY | 華殷集團於中國設有兩處據點，為集團跨國製造網絡的一部分。 | 【保留】 | 純揭露事實，無評價性語言 |
| china-base 廠區資訊（地址/面積/認證） | 河南信陽、江蘇蘇州、土地/建築面積、ISO/IATF/UL 認證 | 【保留】 | 純資料陳述，地址只到城市層級（無街道門牌，已確認過） |
| china-base 圖片 alt | 華殷集團信陽廠區／蘇州 NPI 中心 | 【保留】 | 純描述性 alt text |

**結論：沒有需要移除或中性改寫的內容，全部直接翻譯即可。** 越南讀者是本地客戶，翻譯時額外注意的是**語氣**，不是內容取捨——確保 vi 版讀起來跟 zh/en 一樣是「集團架構揭露」，不要因為選字問題（例如過度強調「僅為集團代工」或弱化 SINOWIN 越南廠的獨立性）意外讀起來像在撇清關係或反過來像在強調依附關係。以下翻譯已依此原則檢查過。

---

## 1. 首頁「集團版圖」卡片區（`src/app/[lang]/page.tsx`）

### 1.1 heading
- **zh：** 集團版圖
- **en：** Global footprint
- **VI：** Bản đồ tập đoàn

*（判斷點，見第 5 節）*

### 1.2 越南卡（vietnam）

| 欄位 | zh | en | VI |
|---|---|---|---|
| name | 越南 · 北寧 | Vietnam · Bac Ninh | Việt Nam · Bắc Ninh |
| desc | 精密磁材加工　2,000 噸／年 | Precision magnet processing　2,000 MT/year | Gia công vật liệu từ tính chính xác　2.000 tấn/năm |
| badge | 量產中 | In production | Đang sản xuất hàng loạt |
| cta | 進入車間 | Enter workshop | Vào xưởng sản xuất |

### 1.3 中國卡（china）

| 欄位 | zh | en | VI |
|---|---|---|---|
| name | 中國 | China | Trung Quốc |
| desc | 母公司華殷集團生產基地 | Parent group manufacturing base | Cơ sở sản xuất của tập đoàn mẹ Phonein Group |
| badge | 集團據點 | Group site | Cơ sở của tập đoàn |
| cta | 了解更多 | Learn more | Tìm hiểu thêm |

*（"Phonein Group" 依既有慣例保留英文不譯，見 `src/lib/nav-copy.ts` 的 `PHONEIN_GROUP_LABEL`）*

### 1.4 印度卡（india）

| 欄位 | zh | en | VI |
|---|---|---|---|
| name | 印度 · 清奈 | India · Chennai | Ấn Độ · Chennai |
| desc | 生產中心 | Production centre | Trung tâm sản xuất |
| badge | 敬請期待 | Coming soon | Sắp ra mắt |

### 1.5 note（區塊下方說明文字）

- **zh：** SINOWIN 依托集團跨國製造網絡，整合越南、中國、印度的資源與經驗，為客戶提供彈性的產能與供應選擇。
- **en：** SINOWIN draws on a multinational manufacturing network across Vietnam, China, and India, giving customers flexible capacity and sourcing options.
- **VI：** SINOWIN dựa vào mạng lưới sản xuất đa quốc gia của tập đoàn, kết hợp nguồn lực và kinh nghiệm tại Việt Nam, Trung Quốc và Ấn Độ, mang đến cho khách hàng các lựa chọn năng lực sản xuất và nguồn cung linh hoạt.

### 1.6 link（區塊下方連結文字）【已改名，2026-07-19】

- **zh：** 了解供應鏈彈性
- **en：** Supply chain flexibility
- **VI：** Tìm hiểu về tính linh hoạt của chuỗi cung ứng

*（原本是「了解供應鏈韌性/Supply chain resilience」，已於 2026-07-19 全站統一改名為「彈性/flexibility」，與 About 頁 eyebrow、首頁 CTA 按鈕同步——三處是同一個命名概念，第一版草稿誤判為應保留舊詞「韌性」，已更正）*

---

## 2. 中國生產基地頁（`src/app/[lang]/china-base/page.tsx`）

### 2.1 頁面固定文字

| 欄位 | zh | en | VI |
|---|---|---|---|
| FOOTPRINT_LABEL（麵包屑） | 集團版圖 | Global footprint | Bản đồ tập đoàn |
| PAGE_LABEL（麵包屑） | 中國生產基地 | China manufacturing base | Cơ sở sản xuất tại Trung Quốc |
| EYEBROW | GROUP FOOTPRINT | GROUP FOOTPRINT | GROUP FOOTPRINT（保留英文，見說明） |
| TITLE | 集團中國生產基地 | Group manufacturing base in China | Cơ sở sản xuất của tập đoàn tại Trung Quốc |
| BODY | 華殷集團於中國設有兩處據點，為集團跨國製造網絡的一部分。 | The Phonein group operates two sites in China as part of its multi-region manufacturing network. | Phonein Group vận hành hai cơ sở tại Trung Quốc, là một phần trong mạng lưới sản xuất đa khu vực của tập đoàn. |
| BACK_LABEL | 返回集團版圖 | Back to group footprint | Quay lại Bản đồ tập đoàn |
| LAND_AREA_LABEL | 土地面積 | Land area | Diện tích đất |
| BUILDING_AREA_LABEL | 建築面積 | Building area | Diện tích xây dựng |
| CERT_LABEL | 認證 | Certifications | Chứng nhận |

*（EYEBROW 的 zh 原文本身就是英文「GROUP FOOTPRINT」，四語言目前都用同一組英文——這是刻意設計，不是翻譯遺漏，建議 VI 版沿用不譯，維持跟 zh/en 一致的視覺風格）*

### 2.2 廠區一：信陽廠

| 欄位 | zh | en | VI |
|---|---|---|---|
| alt | 華殷集團信陽廠區 | Phonein group Xinyang facility | Cơ sở Tín Dương của Phonein Group |
| name | 信陽廠 | Xinyang Facility | Nhà máy Tín Dương |
| location | 河南信陽 | Xinyang, Henan | Tín Dương, Hà Nam |
| landArea | 76,000 m² | 76,000 m² | 76,000 m²（數字不譯，四語言一致） |
| buildingArea | 57,000 m² | 57,000 m² | 57,000 m²（數字不譯，四語言一致） |
| certs | ISO 9001 / ISO 14001 / IATF 16949 / UL ECVP 2809-2 | 同左 | 同左（認證代號不譯，四語言一致） |

### 2.3 廠區二：蘇州 NPI 中心

| 欄位 | zh | en | VI |
|---|---|---|---|
| alt | 華殷集團蘇州 NPI 中心 | Phonein group Suzhou NPI center | Trung tâm NPI Tô Châu của Phonein Group |
| name | 蘇州 NPI 中心 | Suzhou NPI Center | Trung tâm NPI Tô Châu |
| location | 江蘇蘇州 | Suzhou, Jiangsu | Tô Châu, Giang Tô |
| desc | 磁材研發、實驗室與大數據中心。 | Magnetic materials R&D, laboratory, and data center. | Nghiên cứu & phát triển vật liệu từ tính, phòng thí nghiệm và trung tâm dữ liệu. |
| landArea | 12,000 m² | 12,000 m² | 12,000 m²（數字不譯，四語言一致） |
| buildingArea | 45,000 m²（7 層） | 45,000 m² (7 floors) | 45,000 m² (7 tầng) |
| certs | ISO 9001 / ISO 14001 / ISO 45001 | 同左 | 同左（認證代號不譯，四語言一致） |

---

## 3. 自我檢查表：數字與專有名詞

| 項目 | zh/en | VI | 一致？ |
|---|---|---|---|
| 越南廠產能 | 2,000 噸／年 | 2.000 tấn/năm | ✅（越南文用句號分千位，數值相同） |
| 信陽廠土地面積 | 76,000 m² | 76,000 m² | ✅ |
| 信陽廠建築面積 | 57,000 m² | 57,000 m² | ✅ |
| 蘇州廠土地面積 | 12,000 m² | 12,000 m² | ✅ |
| 蘇州廠建築面積 | 45,000 m²（7 層／floors） | 45,000 m² (7 tầng) | ✅ |
| 信陽廠認證 | ISO 9001 / ISO 14001 / IATF 16949 / UL ECVP 2809-2 | 同左，未改動 | ✅ |
| 蘇州廠認證 | ISO 9001 / ISO 14001 / ISO 45001 | 同左，未改動 | ✅ |
| 公司名 | SINOWIN | SINOWIN | ✅ |
| 集團名 | Phonein Group（華殷集團） | Phonein Group（英文不譯） | ✅ 沿用既有慣例 |
| 地名：北寧 | Bac Ninh | Bắc Ninh（加聲調符號，越南文標準寫法） | ✅ 沿用 careers 頁既有慣例 |
| 地名：河南信陽 | Xinyang, Henan | Tín Dương, Hà Nam（漢越音） | ⚠️ 見第 5 節判斷點 1 |
| 地名：江蘇蘇州 | Suzhou, Jiangsu | Tô Châu, Giang Tô（漢越音） | ⚠️ 見第 5 節判斷點 1 |
| 地名：清奈 | Chennai | Chennai（不譯） | ✅ 無既定漢越/慣用譯名，保留原文 |

---

## 4. 判斷點／需要 Ben 確認的地方

1. **中國地名譯法（信陽→Tín Dương、河南→Hà Nam、蘇州→Tô Châu、江蘇→Giang Tô）— ✅ Ben 已放行**：採用 (a) 漢越音方案，照草稿執行。

2. **「集團版圖」/"Global footprint" 的越南文譯法（Bản đồ tập đoàn）— ✅ Ben 已放行**：照草稿執行。

3. **「了解供應鏈韌性」用詞確認 — ✅ 已於 2026-07-19 解決**：Ben 確認全站統一改名為「供應鏈彈性/flexibility」，見上方第 1.6 節已更新為最終版本，此判斷點結案。

4. **中國卡 desc「Cơ sở sản xuất của tập đoàn mẹ Phonein Group」語序**：字面照翻「母公司集團生產基地」，越南文語序上「của tập đoàn mẹ Phonein Group」（隸屬於母公司 Phonein Group）讀起來自然，但若想更簡潔可以省略「mẹ」（母）字，寫成「Cơ sở sản xuất của Phonein Group」。兩者語意接近，目前保留較完整的版本，供 Ben 抉擇。
