# 供應鏈韌性區塊 — 日文（JA）翻譯草稿

**⚠️ 這是 AI 產生的翻譯草稿，尚未經過人工審核，請勿直接當作正式內容使用或匯入程式碼。**
**本檔案未被任何程式引用，純粹作為人工審核用的參考文件。**

來源：`src/app/[lang]/about/page.tsx`（`supplyChain` 物件，目前只有 zh / en 兩語言，ja 走 fallback→en）

格式：每條列出 **zh 原文 / en 對照 / JA 譯文**，方便逐句比對審核。

---

### 1. Eyebrow 標籤 【已改名，2026-07-19】

**更新**：全站統一將「供應鏈韌性/Supply chain resilience」改名為「供應鏈彈性/Supply chain flexibility」（與 About 頁 `supplyChain.eyebrow`、首頁 `heroCta.supplyChain`、`footprint.link` 三處同步改名）。此欄位目前**已直接在程式碼裡寫入四語言**，不再是草稿階段。

- **zh：** 供應鏈彈性
- **en：** Supply chain flexibility
- **JA：** サプライチェーンの柔軟性

*（舊版「サプライチェーンの強靭性」已棄用，改用上方新譯詞，與 `global-footprint.ja.md` 的 link 欄位保持一致）*

---

### 2. H2 主標

- **zh：** 兩條產線。由您決定哪一條接您的單。
- **en：** Two production lines. You choose which one runs your order.
- **JA：** 2つの生産ライン。どちらでご注文をお受けするかはお客様次第です。

---

### 3. Lead 導言

- **zh：** 多數供應商只給你一條供應鏈、一種風險。我們建了第二條，讓合規需求不必變成採購難題。
- **en：** Most suppliers give you one supply chain and one risk profile. We built a second line so compliance requirements don't have to become a sourcing problem.
- **JA：** 多くのサプライヤーは、単一のサプライチェーンと単一のリスクプロファイルしか提供できません。SINOWINは第二の生産ラインを構築し、コンプライアンス要件が調達上の課題にならないようにしました。

---

### 4. 卡片 1：主力產線

- **zh 標題：** 主力產線　**en：** Standard line
  **JA：** 主力ライン

- **zh 標籤：** 常態產線　**en：** Default
  **JA：** 標準

- **zh 內文：** 採用業界標準設備，在成本與交期上維持競爭力。多數訂單由此產線生產。
  **en：** Industry-standard equipment, competitive on cost and lead time. This line runs most orders.
  **JA：** 業界標準の設備を採用し、コストとリードタイムにおいて競争力を維持しています。大半のご注文はこのラインで生産されます。

---

### 5. 卡片 2：去中化產線

- **zh 標題：** 去中化產線　**en：** China-free line
  **JA：** 中国フリーライン
  *（沿用既有翻譯慣例，見 `src/content/site.ts` 已有的「中国フリー生産ライン」，此處依英文 badge 簡潔風格縮短）*

- **zh 標籤：** 2026 Q4 就緒　**en：** Ready Q4 2026
  **JA：** 2026年Q4稼働予定

- **zh 內文：** 機加工、充磁、測試三大核心製程不涉中國設備。設備已完成採購，預計 2026 年 10 月到廠，第四季完成調機與試產。
  **en：** No Chinese equipment in machining, magnetizing, or testing. Equipment is on order, with delivery expected October 2026 and commissioning through Q4.
  **JA：** 機械加工・着磁・検査という3つの中核工程で中国製設備を使用しません。設備はすでに発注済みで、2026年10月の据付を予定しており、第4四半期中に調整・試作を完了します。

---

### 6. 時間軸標題

- **zh：** 為什麼是現在　**en：** Why now
  **JA：** なぜ今なのか

---

### 7. 倒數天數（含 `{days}` 佔位符，程式會動態代入數字，**不可刪除或改動 `{days}` 這個 token**）

- **zh：** 距 11 月執法啟動還有 {days} 天
- **en：** {days} days until November enforcement
- **JA：** 11月の施行開始まで残り{days}日

---

### 8. 時間軸事件 — 7 月

- **zh 月份：** 7 月　**en：** July　**JA：** 7月

- **zh：** 中國商務部第 26 號公告生效，建立戰略礦產出口管制違規檢舉機制，可檢舉範圍包含經第三國轉運規避管制。
  **en：** MOFCOM Announcement No. 26 takes effect, establishing a reporting mechanism for strategic mineral export control violations. Reportable conduct includes routing exports through third countries to circumvent controls.
  **JA：** 中国商務部（MOFCOM）公告第26号が施行され、戦略鉱物の輸出管理違反に関する通報制度が確立されました。通報対象には、第三国を経由した迂回輸出による規制逃れも含まれます。

---

### 9. 時間軸事件 — 10 月

- **zh 月份：** 10 月　**en：** October　**JA：** 10月

- **zh：** SINOWIN 去中化設備預計到廠，啟動調機與試產。
  **en：** SINOWIN's China-free equipment expected on site; commissioning begins.
  **JA：** SINOWINの中国フリー設備が到着予定。調整・試作を開始します。

---

### 10. 時間軸事件 — 11 月（此句拆成三段做局部加粗樣式，三段接起來要是一句通順的話）

- **zh 月份：** 11 月　**en：** November　**JA：** 11月

- **zh lead：** 中國域外管轄條款　**en：** China's extraterritorial provisions
  **JA：** 中国の域外管轄条項が2026年11月に

- **zh emphasis（加粗白字）：** 執法啟動　**en：** come into force
  **JA：** 施行されます

- **zh rest：** 。使用中國原產受管制材料、且用於受限下游應用的製造商，可能面臨監管行動。
  **en：** in November 2026. Manufacturers using Chinese-origin controlled materials in restricted downstream applications may face regulatory action.
  **JA：** 。中国原産の規制対象材料を、制限された川下用途で使用する製造業者は、規制措置の対象となる可能性があります。

  **拼接後完整句（JA）：** 「中国の域外管轄条項が2026年11月に施行されます。中国原産の規制対象材料を、制限された川下用途で使用する製造業者は、規制措置の対象となる可能性があります。」

  ⚠️ 注意：中文/英文版把「11 月」放在 rest 段（"in November 2026"），但日文語序習慣把時間狀語放在動詞前面，所以我把「2026年11月に」挪到 lead 段尾巴、緊接在 emphasis 之前。三段組合後語意與英文版完全一致，但**段落切點與中英文版不同**——如果前端樣式是靠「emphasis 段」單獨套白字粗體，這樣切法仍然只會讓「施行されます」變粗體，不影響「2026年11月に」的呈現，應該沒有問題，但請審核時特別留意這一句的畫面呈現是否符合預期。

---

### 11. 時間軸內文（急迫性論述）

- **zh：** 合規稽核、送樣與驗證本來就需要數月。若貴司需在 11 月前完成供應鏈調整，現在是啟動評估的時間點——我們的產線就緒時程，可與您的導入排程對齊。
- **en：** Compliance audit, sampling, and validation take months regardless. If you need your supply chain resolved before November, this is the point to start scoping — our line comes online on the same timeline as your qualification cycle.
- **JA：** コンプライアンス監査、サンプル提出、検証にはもともと数ヶ月を要します。11月までにサプライチェーンの調整を完了する必要がある場合、今がスコーピングを開始すべきタイミングです——弊社の生産ラインの稼働開始時期は、貴社の認定サイクルと同じタイムラインで進んでいます。

---

### 12. 免責定錨（⚠️ 法務保護，必須完整翻譯不可省略）

- **zh：** 時程以設備到廠與驗證進度為準，我們會在專案評估時同步更新。
- **en：** Timelines are subject to equipment delivery and validation progress. We'll keep you updated during project scoping.
- **JA：** スケジュールは設備の納入および検証の進捗状況によって変動する可能性があります。プロジェクト評価の過程で随時最新情報をお伝えします。

---

### 13. CTA 區

- **zh 問句：** 您要的是價格，還是避險？
  **en：** Price, or risk mitigation — which are you optimizing for?
  **JA：** 価格を優先しますか、それともリスク低減を優先しますか？

- **zh 按鈕：** 開始洽詢　**en：** Start an enquiry
  **JA：** お問い合わせを開始

---

## 判斷點（給審核參考）

1. **法規名稱的處理方式**：同 VI 版判斷點 1——既有 en 版本已把「中國商務部」譯為 "MOFCOM"、「第26號公告」譯為 "Announcement No. 26"，我判斷規格要求的是**數字與規範識別一致**，非逐字保留中文。JA 版沿用 en 的處理方式，寫成「中国商務部（MOFCOM）公告第26号」，漢字對日文讀者完全自然，且保留「MOFCOM」與數字「26」不變。
2. **「Q4」的處理**：✅ **Ben 已定案（2026-07-15）並套用至 vi 版同一規則：badge 用「Q4」，正文用拼出的季度**。JA 版原本就是 badge 寫「2026年Q4稼働予定」、正文寫「第4四半期中に調整・試産を完了」——這剛好完全符合定案後的規則，**本檔案這處不需要再改**，之前標註的「同一份草稿內處理不一致」疑慮已解除，特此記錄供審核追蹤。
3. **「去中化產線」譯名**：沿用了 `src/content/site.ts` 裡已經存在的「中国フリー」譯法（該檔案已有「中国フリー生産ライン」），只是依英文 badge "China-free line" 的簡潔風格做了縮短。
4. **11 月事件的三段式拆句與語序調整**：中日文語序不同，日文習慣把時間狀語放在動詞前，所以我把「2026年11月に」從 rest 段移到 lead 段尾端。已在上方用「⚠️ 注意」標註，請審核時特別檢查這句在畫面上的粗體效果是否符合預期（因為切點跟中英文版不一樣）。

## 數字／專有名詞一致性自我檢查

| 項目 | zh | en | JA | 一致？ |
|---|---|---|---|---|
| 公告號 | 第 26 號 | No. 26 | 第26号 | ✅ |
| 到廠月份 | 2026 年 10 月 | October 2026 | 2026年10月 | ✅ |
| 就緒季度 | 2026 Q4 | Q4 2026 | 2026年Q4（badge）／第4四半期（內文） | ✅ 已依 Ben 定案的統一規則確認為正確寫法，非不一致 |
| 執法月份 | 11 月（出現 3 次） | November（3 次） | 11月（3 次，用詞一致） | ✅ |
| 公司名 | SINOWIN | SINOWIN | SINOWIN（未翻譯） | ✅ |
| 中國商務部 | 中國商務部 | MOFCOM | 中国商務部（MOFCOM） | ⚠️ 見判斷點 1 |

Q4 寫法已於 2026-07-15 由 Ben 確認為正確、不需修改，其餘數字與專有名詞前後一致，沒有遺漏或矛盾。
