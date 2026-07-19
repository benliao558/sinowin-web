# 供應鏈韌性區塊 — 越南文（VI）翻譯草稿 v2（去政治化改版）

**⚠️ 這是 AI 產生的翻譯草稿，尚未經過人工審核，請勿直接當作正式內容使用或匯入程式碼。**
**本檔案未被任何程式引用，純粹作為人工審核用的參考文件。**

來源：`src/app/[lang]/about/page.tsx`（`supplyChain` 物件，目前只有 zh / en 兩語言，vi 走 fallback→en）

**本版變更**：依指示對 vi 版做「去政治化」改寫——保留兩產線論述與 Q4 就緒時程，移除具體法規名稱與地緣政治急迫感框架。**ja 版未動，維持 v1 草稿**（`supply-chain-resilience.ja.md`）。zh/en 原始程式碼完全未動。

每條標明狀態：**【保留】**／**【中性改寫】**／**【移除】**。格式：zh 原文 / en 對照 / VI 版本。

---

### 1. Eyebrow 標籤 【已改名，2026-07-19】

**更新**：全站統一將「供應鏈韌性/Supply chain resilience」改名為「供應鏈彈性/Supply chain flexibility」（與 About 頁 `supplyChain.eyebrow`、首頁 `heroCta.supplyChain`、`footprint.link` 三處同步改名，理由：vi/ja 譯詞完全不同，「韌性」≠「彈性」，需統一避免翻譯上線後固化不一致）。此欄位目前**已直接在程式碼裡寫入四語言**，不再是 vi-only 草稿。

- **zh：** 供應鏈彈性
- **en：** Supply chain flexibility
- **VI：** Tính linh hoạt của chuỗi cung ứng

*（舊版「Khả năng phục hồi chuỗi cung ứng」已棄用，改用上方新譯詞，與 `global-footprint.vi.md` 的 link 欄位保持一致）*

---

### 2. H2 主標 【保留】

- **zh：** 兩條產線。由您決定哪一條接您的單。
- **en：** Two production lines. You choose which one runs your order.
- **VI：** Hai dây chuyền sản xuất. Bạn quyết định dây chuyền nào nhận đơn hàng của mình.

---

### 3. Lead 導言 【保留】

- **zh：** 多數供應商只給你一條供應鏈、一種風險。我們建了第二條，讓合規需求不必變成採購難題。
- **en：** Most suppliers give you one supply chain and one risk profile. We built a second line so compliance requirements don't have to become a sourcing problem.
- **VI：** Hầu hết nhà cung cấp chỉ có một chuỗi cung ứng, một hồ sơ rủi ro duy nhất. Chúng tôi đã xây dựng thêm một dây chuyền thứ hai để yêu cầu tuân thủ không còn là bài toán khó trong việc tìm nguồn cung ứng.

*（這句本身沒有點名中國或政治事件，只講「合規需求」，屬中性商業語言，故保留不動。）*

---

### 4. 卡片 1：主力產線 【保留】

- **zh 標題：** 主力產線　**en：** Standard line
  **VI：** Dây chuyền chủ lực

- **zh 標籤：** 常態產線　**en：** Default
  **VI：** Mặc định

- **zh 內文：** 採用業界標準設備，在成本與交期上維持競爭力。多數訂單由此產線生產。
  **en：** Industry-standard equipment, competitive on cost and lead time. This line runs most orders.
  **VI：** Sử dụng thiết bị tiêu chuẩn ngành, duy trì tính cạnh tranh về chi phí và thời gian giao hàng. Phần lớn đơn hàng được sản xuất trên dây chuyền này.

---

### 5. 卡片 2：去中化產線 【保留】

- **zh 標題：** 去中化產線　**en：** China-free line
  **VI：** Dây chuyền không liên quan Trung Quốc
  *（沿用既有翻譯慣例，見 `src/content/site.ts` 已有的 "Dây chuyền sản xuất không liên quan Trung Quốc"）*

- **zh 標籤：** 2026 Q4 就緒　**en：** Ready Q4 2026
  **VI：** Sẵn sàng Q4/2026

- **zh 內文：** 機加工、充磁、測試三大核心製程不涉中國設備。設備已完成採購，預計 2026 年 10 月到廠，第四季完成調機與試產。
  **en：** No Chinese equipment in machining, magnetizing, or testing. Equipment is on order, with delivery expected October 2026 and commissioning through Q4.
  **VI：** Ba quy trình cốt lõi — gia công cơ khí, từ hóa và kiểm tra — không sử dụng thiết bị của Trung Quốc. Thiết bị đã được đặt mua, dự kiến đến nhà máy vào tháng 10/2026 và hoàn tất lắp đặt, chạy thử trong quý 4/2026.
  *（v2 修正：依 Ben 定案的 Q4 統一規則——badge 用「Q4/2026」，正文用「quý 4/2026」——這裡是正文，故從 v1 的「trong Q4」改為「trong quý 4/2026」。）*

*（這張卡片本身就是「我們有一條不涉中國設備的產線」的中性事實陳述，不涉及地緣政治事件或法規威脅，符合「核心不變」的要求，保留不動。）*

---

### 6. 時間軸標題 【中性改寫】

- **zh：** 為什麼是現在　**en：** Why now
- **原 VI（v1）：** Tại sao là bây giờ ——*帶有「急迫感」暗示，去政治化後不適用*
- **VI（v2，新標題）：** Lộ trình triển khai
  *（意為「部署時程」。捨棄「為什麼是現在」的急迫框架，改為單純描述接下來要講的是時程資訊，語氣中性。）*

---

### 7. 倒數天數 【移除】

- **zh：** 距 11 月執法啟動還有 {days} 天
- **en：** {days} days until November enforcement
- **VI：** 整段移除，原因：去政治化——這是政治急迫感的鉤子（倒數到「執法啟動」），本地客戶不適用此框架，且移除後不再需要 `{days}` 這個動態計算欄位。

---

### 8. 時間軸事件 — 7 月 【移除】

- **zh：** 中國商務部第 26 號公告生效，建立戰略礦產出口管制違規檢舉機制，可檢舉範圍包含經第三國轉運規避管制。
- **en：** MOFCOM Announcement No. 26 takes effect...
- **VI：** 整段移除，原因：去政治化——具體法規名稱與檢舉機制是地緣政治合規框架的核心素材，對越南本地客戶不適用，予以移除。

---

### 9. 時間軸事件 — 10 月 → 併入新的「部署時程」段落 【保留內容，改變呈現形式】

- **zh：** SINOWIN 去中化設備預計到廠，啟動調機與試產。
- **en：** SINOWIN's China-free equipment expected on site; commissioning begins.
- **VI：** 這句本身是中性事實（我方自身進度），內容保留，但**不再以獨立時間軸事件呈現**——因為移除 7 月、11 月後只剩這一個點，時間軸在視覺上不成立（見第 2 章結構說明）。這句的內容已整合進新的「部署時程說明」段落（見第 11 項）。

---

### 10. 時間軸事件 — 11 月 【移除】

- **zh lead：** 中國域外管轄條款　**en：** China's extraterritorial provisions
- **zh emphasis：** 執法啟動　**en：** come into force
- **zh rest：** 使用中國原產受管制材料、且用於受限下游應用的製造商，可能面臨監管行動。
- **VI：** 整段（lead + emphasis + rest 三段）全部移除，原因：去政治化——域外管轄條款、執法啟動、監管行動，是整段論述裡政治色彩最濃的部分，對越南本地客戶完全不適用。

---

### 11. 時間軸內文 → 改為「部署時程說明」段落 【中性改寫】

- **zh 原文：** 合規稽核、送樣與驗證本來就需要數月。若貴司需在 11 月前完成供應鏈調整，現在是啟動評估的時間點——我們的產線就緒時程，可與您的導入排程對齊。
- **en 原文：** Compliance audit, sampling, and validation take months regardless. If you need your supply chain resolved before November, this is the point to start scoping — our line comes online on the same timeline as your qualification cycle.
- **VI（v2，中性改寫，整合原第 10 月事件的內容）：**
  Dây chuyền không liên quan Trung Quốc dự kiến đến nhà máy vào tháng 10/2026 và hoàn tất lắp đặt, chạy thử trong quý 4/2026, bổ sung thêm một lựa chọn cho chuỗi cung ứng của quý công ty. Nếu quý công ty đang tìm phương án dự phòng hoặc muốn đa dạng hóa nguồn cung, đây là thời điểm phù hợp để bắt đầu trao đổi — chúng tôi có thể sắp xếp lịch trình đánh giá phù hợp với kế hoạch của quý công ty.

**中文語感回譯（方便審核比對，非正式文案）**：「去中化產線預計 2026 年 10 月到廠，第四季完成安裝與試產，為貴公司的供應鏈增加一個選項。若貴公司正在尋找備援方案或希望讓供應來源多元化，現在是適合展開討論的時間點——我們可以配合貴公司的規劃安排評估時程。」

*說明：不提 11 月死線、不提合規稽核、不提監管行動。急迫感的來源從「政治風險逼近」換成「若您本來就有備援/多元化需求，我們現在能接」——這是純商業邀請語氣，不製造外部威脅感。*

---

### 12. 免責定錨 【保留，法務保護】

- **zh：** 時程以設備到廠與驗證進度為準，我們會在專案評估時同步更新。
- **en：** Timelines are subject to equipment delivery and validation progress. We'll keep you updated during project scoping.
- **VI：** Lịch trình có thể thay đổi tùy theo tiến độ giao thiết bị và xác nhận thực tế. Chúng tôi sẽ cập nhật đồng thời trong quá trình đánh giá dự án.

*（中性、且是法務保護語句，維持完整翻譯，不因去政治化而省略。）*

---

### 13. CTA 區 【中性改寫，v2】

- **zh 問句原文：** 您要的是價格，還是避險？
  **en 原文：** Price, or risk mitigation — which are you optimizing for?
  **原 VI（v1）：** Bạn ưu tiên giá cả, hay giảm thiểu rủi ro? ——*「giảm thiểu rủi ro」（規避風險）帶有政治聯想，已依指示改寫*
  **VI（v2）：** Bạn ưu tiên giá cả, hay sự linh hoạt của chuỗi cung ứng?
  *（回譯：「您更看重價格，還是供應鏈彈性？」——把「避險」換成「供應鏈彈性」，拿掉任何規避風險的政治聯想，改成純商業的優先序選擇。）*

- **zh 按鈕：** 開始洽詢　**en：** Start an enquiry
  **VI：** Bắt đầu liên hệ（不變）

**⚠️ 連鎖點，需要另外修改程式碼（本輪僅記錄，未動手）：** `src/components/ContactForm.tsx` 的表單第一題「這個專案，您優先考量的是？」目前 vi 版三選項為：
```
['Giá và thời gian giao hàng', 'Giảm thiểu rủi ro chuỗi cung ứng', 'Đang trong quá trình đánh giá']
```
第二項「Giảm thiểu rủi ro chuỗi cung ứng」（供應鏈避險）同樣帶有政治聯想，依指示應改為中性用語，建議：
```
'Linh hoạt chuỗi cung ứng'
```
（回譯：「供應鏈彈性」，與 CTA 問句用詞一致）。**這是已經上線的正式程式碼**（非本輪草稿範圍內的新內容），且是單一字串的小幅修正、方向已經明確定案，不屬於需要重新審核的新翻譯——但基於本輪「不寫程式碼」的既定流程，我先記錄在這裡，等你確認是否要我現在就順手修掉這一行，或是跟其餘四個區塊一起批次處理。

---

## 時間軸結構問題：採用方案 A

移除 7 月、11 月事件與倒數天數後，vi 版的「時間軸」只剩下一項內容（原10月事件），已併入第 11 項的「部署時程說明」段落，**不再以三點時間軸呈現**，改為一段連續文字敘述搭配 Q4 就緒 badge（badge 本來就已經在卡片上，不需要重複）。

**技術實作方式（本輪僅說明，不實作）：**

1. 目前 `about/page.tsx` 裡的時間軸區塊（`supplyChain.timeline`），對 zh/en/ja 三語言完全共用同一份 JSX 結構（3 個事件 + 倒數天數 `<Countdown>` 元件）。
2. 若要讓 vi 版顯示不同結構，需要在元件層加一個條件分支：`{lang === 'vi' ? <NeutralDeploymentNote lang={lang} /> : <TimelineBlock lang={lang} />}`。
3. 新增一個只給 vi 用的內容物件（例如 `supplyChain.timelineNeutral = { heading: {vi: 'Lộ trình triển khai'}, body: {vi: '...'} }`），與現有的 `supplyChain.timeline`（zh/en/ja 共用）**分開存放，互不影響**。
4. `<Countdown>` 元件在 vi 版**完全不渲染**（不只是內容留空，是整個不出現，因為沒有死線可以倒數）。
5. zh/en/ja 三語言的渲染路徑、`supplyChain.timeline` 物件、`<Countdown>` 元件**完全不動**——這個條件分支只是「多加一個 vi 專屬分支」，不修改既有共用邏輯，不會影響其他語言的畫面。
6. 這是本輪唯一需要動到「元件邏輯」（而非純內容字串）的地方，且**目前尚未實作**，等這份草稿與去政治化方向一起審核通過後，會與其餘內容一起寫入程式碼。

---

## 判斷點（v2 更新：Ben 已回覆的 4 點）

1. **標題翻譯**：Ben 會從候選（Lộ trình triển khai／Kế hoạch mở rộng năng lực／Dây chuyền mới）中選一個，**待 Ben 定案**，草稿暫維持「Lộ trình triển khai」。
2. **第 11 項中性力度**：✅ 已放行，維持 v2 版本不變。
3. **CTA「避險」去政治化**：✅ 已依指示改寫，見第 13 項——問句換成「supply chain flexibility」框架，並記錄了 `ContactForm.tsx` 需要同步修正的連鎖點（見第 13 項下方⚠️ 區塊，待你指示是否現在順手修）。
4. **Q4 寫法統一規則**：✅ 已依規則（badge 用「Q4/2026」，正文用「quý 4/2026」）修正第 5 項卡片內文（原本誤用「trong Q4」，已改「trong quý 4/2026」），並同步更新自我檢查表。
5. **時間軸結構的技術方案**：選了方案 A（改寫成一段部署時程說明，非時間軸），理由是原 10 月事件的資訊（到廠時間、Q4 就緒）是中性且對客戶有用的具體資訊，不應該因為去政治化就整段拿掉（那是方案 B 會做的事）——只是換掉呈現外殼（時間軸 → 一段話），資訊本身保留。維持原判斷，未變動。

## 確認：zh / en / ja 不受影響

- **zh、en**：程式碼與內容完全未動，本輪只產生 vi 的 markdown 草稿，尚未寫入任何程式碼。
- **ja**：`supply-chain-resilience.ja.md` 已依 Ben 的 Q4 統一規則同步更新判斷點措辭（見該檔案），內容本身（時間軸三事件＋倒數天數的完整地緣政治論述）未變動，仍保留給日本客戶。
- 若未來實作，方案是「vi 專屬條件分支」，不修改 zh/en/ja 共用的 `supplyChain.timeline` 物件與 `<Countdown>` 元件本身，三語言的畫面與資料結構應該零影響——但這是我的設計判斷，實際實作時我會在 build 後用畫面截圖或 curl 逐一確認 zh/en/ja 三語言的時間軸/倒數天數仍正常顯示，才算過關。

## 數字／專有名詞一致性自我檢查（v2，去政治化後範圍縮小）

| 項目 | zh | en | VI（v2） | 一致？ |
|---|---|---|---|---|
| 到廠月份 | 2026 年 10 月 | October 2026 | tháng 10/2026 | ✅ |
| 就緒季度 | 2026 Q4（出現於 badge + 內文，2 處） | Q4 2026 | Q4/2026（badge，第 5 項）、quý 4/2026（正文，第 5 項內文＋第 11 項） | ✅ 已依 Ben 定案的統一規則（badge=Q4/2026、正文=quý 4/2026）套用，兩處正文都已改為「quý 4/2026」 |
| 公司名 | SINOWIN | SINOWIN | SINOWIN（未翻譯） | ✅ |
| 供應鏈彈性用詞 | — | Price, or risk mitigation | CTA 與表單選項統一用「linh hoạt chuỗi cung ứng / Linh hoạt chuỗi cung ứng」 | ✅ 已依指示去政治化，兩處用詞一致 |
| 公告號「26」、11 月、域外管轄條款 | — | — | 已移除，不適用 | — |

Q4 寫法已依 Ben 第 4 點指示定案並套用完畢，不再是待決事項。
