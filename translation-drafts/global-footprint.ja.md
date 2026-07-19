# 集團版圖區塊 — 日文（JA）翻譯草稿

**⚠️ 這是 AI 產生的翻譯草稿，尚未經過人工審核，請勿直接當作正式內容使用或匯入 Sanity/程式碼。**
**本檔案未被任何程式引用，純粹作為人工審核用的參考文件。**

來源：
- `src/app/[lang]/page.tsx`（`footprint` 物件，homepage 首頁「集團版圖」卡片區）
- `src/app/[lang]/china-base/page.tsx`（「中國生產基地」詳情頁，含 2 個廠區卡片）

---

## 0. 去政治化確認（簡要）

ja 版原則是「維持中性框架」（全站已去政治化，非另立特殊審查），已對照 `global-footprint.vi.md` 第 0 節的完整去政治化對照表——結論相同：這批內容全部是去政治化之後才寫的中性揭露語氣，**沒有需要移除或改寫的政治化措辭**，全部照原意直翻即可，不重複列表。

---

## 1. 首頁「集團版圖」卡片區（`src/app/[lang]/page.tsx`）

### 1.1 heading
- **zh：** 集團版圖
- **en：** Global footprint
- **JA：** グローバル拠点

*（判斷點，見第 5 節）*

### 1.2 越南卡（vietnam）

| 欄位 | zh | en | JA |
|---|---|---|---|
| name | 越南 · 北寧 | Vietnam · Bac Ninh | ベトナム・バクニン |
| desc | 精密磁材加工　2,000 噸／年 | Precision magnet processing　2,000 MT/year | 精密磁性材料加工　年産2,000トン |
| badge | 量產中 | In production | 量産中 |
| cta | 進入車間 | Enter workshop | 工場を見る |

### 1.3 中國卡（china）

| 欄位 | zh | en | JA |
|---|---|---|---|
| name | 中國 | China | 中国 |
| desc | 母公司華殷集團生產基地 | Parent group manufacturing base | 親会社Phonein Groupの生産拠点 |
| badge | 集團據點 | Group site | グループ拠点 |
| cta | 了解更多 | Learn more | 詳しく見る |

*（"Phonein Group" 依既有慣例保留英文不譯，見 `src/lib/nav-copy.ts` 的 `PHONEIN_GROUP_LABEL`：ja 版寫作「Phonein Groupについて」）*

### 1.4 印度卡（india）

| 欄位 | zh | en | JA |
|---|---|---|---|
| name | 印度 · 清奈 | India · Chennai | インド・チェンナイ |
| desc | 生產中心 | Production centre | 生産センター |
| badge | 敬請期待 | Coming soon | 近日公開 |

### 1.5 note（區塊下方說明文字）

- **zh：** SINOWIN 依托集團跨國製造網絡，整合越南、中國、印度的資源與經驗，為客戶提供彈性的產能與供應選擇。
- **en：** SINOWIN draws on a multinational manufacturing network across Vietnam, China, and India, giving customers flexible capacity and sourcing options.
- **JA：** SINOWINはグループの多国籍製造ネットワークを活用し、ベトナム、中国、インドの資源と経験を統合することで、お客様に柔軟な生産能力と調達の選択肢を提供しています。

### 1.6 link（區塊下方連結文字）【已改名，2026-07-19】

- **zh：** 了解供應鏈彈性
- **en：** Supply chain flexibility
- **JA：** サプライチェーンの柔軟性について

*（原本是「了解供應鏈韌性/Supply chain resilience」，已於 2026-07-19 全站統一改名為「彈性/flexibility」，與 About 頁 eyebrow、首頁 CTA 按鈕同步——三處是同一個命名概念，第一版草稿誤判為應保留舊詞「強靭性」，已更正）*

---

## 2. 中國生產基地頁（`src/app/[lang]/china-base/page.tsx`）

### 2.1 頁面固定文字

| 欄位 | zh | en | JA |
|---|---|---|---|
| FOOTPRINT_LABEL（麵包屑） | 集團版圖 | Global footprint | グローバル拠点 |
| PAGE_LABEL（麵包屑） | 中國生產基地 | China manufacturing base | 中国生産拠点 |
| EYEBROW | GROUP FOOTPRINT | GROUP FOOTPRINT | GROUP FOOTPRINT（保留英文，見說明） |
| TITLE | 集團中國生產基地 | Group manufacturing base in China | グループ中国生産拠点 |
| BODY | 華殷集團於中國設有兩處據點，為集團跨國製造網絡的一部分。 | The Phonein group operates two sites in China as part of its multi-region manufacturing network. | Phonein Groupは中国に2つの拠点を有しており、これはグループの多地域製造ネットワークの一部です。 |
| BACK_LABEL | 返回集團版圖 | Back to group footprint | グローバル拠点に戻る |
| LAND_AREA_LABEL | 土地面積 | Land area | 敷地面積 |
| BUILDING_AREA_LABEL | 建築面積 | Building area | 建築面積 |
| CERT_LABEL | 認證 | Certifications | 認証 |

*（EYEBROW の zh 原文自体が英語「GROUP FOOTPRINT」で、四言語とも同じ英語表記——意図的なデザインであり翻訳漏れではない。JA 版もそのまま英語表記を踏襲することを提案）*

### 2.2 廠區一：信陽廠

| 欄位 | zh | en | JA |
|---|---|---|---|
| alt | 華殷集團信陽廠區 | Phonein group Xinyang facility | Phonein Group 信陽拠点 |
| name | 信陽廠 | Xinyang Facility | 信陽工場 |
| location | 河南信陽 | Xinyang, Henan | 河南省信陽市 |
| landArea | 76,000 m² | 76,000 m² | 76,000 m²（数字は翻訳せず、四言語共通） |
| buildingArea | 57,000 m² | 57,000 m² | 57,000 m²（数字は翻訳せず、四言語共通） |
| certs | ISO 9001 / ISO 14001 / IATF 16949 / UL ECVP 2809-2 | 同左 | 同左（認証コードは翻訳せず、四言語共通） |

### 2.3 廠區二：蘇州 NPI 中心

| 欄位 | zh | en | JA |
|---|---|---|---|
| alt | 華殷集團蘇州 NPI 中心 | Phonein group Suzhou NPI center | Phonein Group 蘇州NPIセンター |
| name | 蘇州 NPI 中心 | Suzhou NPI Center | 蘇州NPIセンター |
| location | 江蘇蘇州 | Suzhou, Jiangsu | 江蘇省蘇州市 |
| desc | 磁材研發、實驗室與大數據中心。 | Magnetic materials R&D, laboratory, and data center. | 磁性材料の研究開発、実験室、およびデータセンター。 |
| landArea | 12,000 m² | 12,000 m² | 12,000 m²（数字は翻訳せず、四言語共通） |
| buildingArea | 45,000 m²（7 層） | 45,000 m² (7 floors) | 45,000 m²（7階建て） |
| certs | ISO 9001 / ISO 14001 / ISO 45001 | 同左 | 同左（認証コードは翻訳せず、四言語共通） |

---

## 3. 自我檢查表：數字與專有名詞

| 項目 | zh/en | JA | 一致？ |
|---|---|---|---|
| 越南廠產能 | 2,000 噸／年 | 年産2,000トン | ✅ 數值相同，僅語序依日文慣例調整 |
| 信陽廠土地面積 | 76,000 m² | 76,000 m² | ✅ |
| 信陽廠建築面積 | 57,000 m² | 57,000 m² | ✅ |
| 蘇州廠土地面積 | 12,000 m² | 12,000 m² | ✅ |
| 蘇州廠建築面積 | 45,000 m²（7 層／floors） | 45,000 m²（7階建て） | ✅ |
| 信陽廠認證 | ISO 9001 / ISO 14001 / IATF 16949 / UL ECVP 2809-2 | 同左，未改動 | ✅ |
| 蘇州廠認證 | ISO 9001 / ISO 14001 / ISO 45001 | 同左，未改動 | ✅ |
| 公司名 | SINOWIN | SINOWIN | ✅ |
| 集團名 | Phonein Group（華殷集團） | Phonein Group（英文不譯） | ✅ 沿用既有慣例 |
| 地名：北寧 | Bac Ninh | バクニン（片假名） | ✅ 沿用 careers 頁既有慣例 |
| 地名：河南信陽 | Xinyang, Henan | 河南省信陽市（漢字直用，語序調整為「省→市」） | ⚠️ 見第 5 節判斷點 1 |
| 地名：江蘇蘇州 | Suzhou, Jiangsu | 江蘇省蘇州市（同上） | ⚠️ 見第 5 節判斷點 1 |
| 地名：清奈 | Chennai | チェンナイ（片假名） | ✅ |

---

## 4. 判斷點／需要 Ben 確認的地方

1. **中國地名語序調換（Xinyang, Henan → 河南省信陽市）— ✅ Ben 已放行**：照草稿執行。

2. **「集團版圖」/"Global footprint" 的日文譯法（グローバル拠点）— ✅ Ben 已放行**：照草稿執行。

3. **「了解供應鏈韌性」用詞確認 — ✅ 已於 2026-07-19 解決**：Ben 確認全站統一改名為「供應鏈彈性/flexibility」，見上方第 1.6 節已更新為最終版本，此判斷點結案。

4. **中國卡 badge「グループ拠点」vs 更明確的「グループの製造拠点」**：目前選簡潔版（グループ拠点），與 zh「集團據點」字數對應。若 Ben 覺得需要更明確標示「這是生產/製造據點」而非泛稱「據點」，可改用稍長版本，但會跟越南卡/印度卡的簡短 badge 風格不一致，目前建議維持簡潔版。
