# 全站去政治化 — 總對照表

**建立日期：2026-07-16**
**狀態更新（2026-07-16）：Ben 審核通過，已放行第一批實作（程式碼可直接改的全部項目），並已 push 上線。**

## 實作狀態總覽

| 項目 | 狀態 |
|---|---|
| 1. FAQPage JSON-LD | ✅ 第一批已完成上線 |
| 2. 首頁「供應鏈信任狀」（Sanity） | ✅ 已用程式碼覆寫止血（含本輪新發現的 `heroSubtitle` 欄位）；⏳ CMS 原文仍待 Sanity 寫入權杖才能清除，見第 1 節末說明 |
| 3. About 頁供應鏈韌性區塊 zh/en/ja | ✅ 第一批已完成上線（含時間軸→部署時程改版） |
| 4. 集團版圖 note | ✅ 第一批已完成上線 |
| 5. meta description（layout.tsx + 首頁 + about 頁） | ✅ 第一批已完成上線 |
| 6. ContactForm zh/en | ✅ 第一批已完成上線 |
| 7. 「材料來源與風險分散佈局」段落 | ✅ 第一批已完成上線（一併微調） |
| 8. `[避險]` email 內部標籤 | 依指示不動，保留 |
| 9. 產業分析文章「地緣政治風險」 | 依指示不改，情境不同 |
| 10. 死碼檔案 | 本輪不清，列冊供之後大掃除 |

**第二批（等 Sanity 寫入權杖）尚未執行**：首頁「供應鏈信任狀」與 `heroSubtitle` 的 Sanity CMS 原文清理。

以下為原始掃描與草案內容（保留作為紀錄）：

---

## 0. 掃描方法與範圍

全文檢索關鍵字（`grep -rn`，範圍 `src/`）：

- 中：`去中化`、`不涉中國`、`規避`、`長臂管轄`、`地緣政治`、`避險`
- 英：`China-free`、`de-China`、`circumvent`、`extraterritorial`、`geopolitical`、`risk mitigation`、`long-arm`
- 越：`không liên quan Trung Quốc`、`giảm thiểu rủi ro`
- 日：`中国フリー`、`リスク低減`、`地政学`

**額外用瀏覽器 curl 正式站，確認每一處「現況」欄位都是目前真實上線的文字**（不是憑印象猜測），並交叉核對哪些是 Sanity 管理、哪些是程式碼寫死。

---

## 總覽：命中結果分佈

| 檔案 | 狀態 | 命中語言 | 優先度 |
|---|---|---|---|
| Sanity `homepageContent`（首頁「供應鏈信任狀」區塊） | **上線，Sanity 管理** | zh/en/vi/ja 全部命中 | 🔴 最高——最露骨 |
| `src/app/[lang]/about/page.tsx`（供應鏈韌性區塊 + meta + FAQPage JSON-LD） | **上線，程式碼** | zh/en（vi 已局部處理，見下） | 🔴 最高 |
| `src/app/[lang]/page.tsx`（集團版圖 note、meta description、材料來源段落） | **上線，程式碼** | zh/en | 🟠 高 |
| `src/app/layout.tsx`（全站預設 meta description） | **上線，程式碼** | en（單語言，無 zh/vi/ja 版本） | 🟠 高 |
| `src/components/ContactForm.tsx`（zh/en 表單選項） | **上線，程式碼** | zh/en（vi/ja 已處理） | 🟠 高 |
| `src/app/api/contact/route.ts`（`[避險]` email 主旨標籤） | **上線，程式碼** | 內部標籤，非客戶可見 | 🟡 中（需業務端確認） |
| Sanity 文章 `fe16n2-supplychain-rebuild`（產業分析文章） | **上線，Sanity 管理** | zh/en/ja | 🟢 低（情境不同，見判斷點） |
| `src/content/site.ts` / `articles.ts` / `faq.ts` / `workshops.ts` | **⚠️ 死碼，非上線** | 全部 | ⚪ 不影響風險，建議清理 |

**合計：7 處上線內容需要處理（1 個 Sanity 欄位＋6 處程式碼），另有 1 處低風險待決，4 個死碼檔案僅供參考。**

---

## 1. 首頁「供應鏈信任狀」區塊 🔴🔴🔴 最露骨、最優先

**位置**：Sanity `homepageContent` 單例文件的 `supplyChainTitle` / `supplyChainBody` 欄位，透過 `getHomepageContent()` 抓取，渲染於 `src/app/[lang]/page.tsx` 的 `<section>`（eyebrow 文字「供應鏈信任狀」目前是寫死在 page.tsx 裡，標題與內文才是 Sanity 欄位）。

**⚠️ 這是 Sanity 管理的內容，我沒有寫入權杖，無法直接修改 CMS 來源。** 可行方案見本節末——**已採選項 A（程式碼覆寫止血），並已上線**。

**⚠️ 實作時新發現的第二個 Sanity 欄位**：首頁 Hero 區塊（H1 正下方的副標）還有一個獨立的 `home?.heroSubtitle` 欄位，內容與本節文字撞名但實際上是**不同欄位**（「年產能 2,000 噸・去中化設備專線・ISO 認證」這種格式），本輪掃描時漏掉，第一批實作時另外用 curl 廣泛複查才抓到，已一併用 `HERO_SUBTITLE_OVERRIDE` 覆寫。CMS 原文同樣還留著，等寫入權杖後兩個欄位（`supplyChainTitle`/`supplyChainBody`/`heroSubtitle`）要一起清。

### Eyebrow（寫死在 page.tsx，可直接改）

| 語言 | 現況 | 改寫後（草案） |
|---|---|---|
| zh | 供應鏈信任狀 | 供應鏈彈性 |
| en | Supply Chain Trust | Supply Chain Flexibility |
| vi | Cam kết chuỗi cung ứng | Sự linh hoạt của chuỗi cung ứng |
| ja | サプライチェーンの信頼性 | サプライチェーンの柔軟性 |

### 標題（Sanity 欄位 `supplyChainTitle`）

| 語言 | 現況 | 改寫後（草案） |
|---|---|---|
| zh | 去中化設備專線 | 獨立設備專線 |
| en | China-Free Production Line | Independent Equipment Line |
| vi | Dây chuyền sản xuất không liên quan Trung Quốc | Dây chuyền thiết bị độc lập |
| ja | 中国フリー生産ライン | 独立設備ライン |

### 內文（Sanity 欄位 `supplyChainBody`）—— 全站最露骨的一段

**現況 zh：** SINOWIN 核心製程（機加工、充磁、測試）採用去中化設備專線，供應鏈不涉中國，**協助客戶規避長臂管轄與地緣政治合規風險**。SINOWIN 團隊橫跨越南、印度、台灣與新加坡，工程與管理人才不集中於單一國家，為客戶提供不受單一人力市場波動影響的穩定支援。

**現況 en：** SINOWIN's core processes (machining, magnetizing, testing) use a China-free equipment line. Our supply chain has no China involvement, **helping customers avoid long-arm jurisdiction and geopolitical compliance risks**. The SINOWIN team spans Vietnam, India, Taiwan, and Singapore — engineering and management talent is not concentrated in any single country, giving customers stable support that isn't exposed to volatility in any one labor market.

**現況 vi：** ...**giúp khách hàng tránh được rủi ro pháp lý xuyên biên giới (long-arm jurisdiction) và rủi ro tuân thủ địa chính trị.**...

**現況 ja：** ...**お客様は域外適用（ロングアーム管轄）や地政学的コンプライアンスリスクを回避できます。**...

**改寫後（草案，四語言，粗體句整段刪除，後半保留）：**

- **zh：** SINOWIN 核心製程（機加工、充磁、測試）採用獨立設備專線，可依客戶需求彈性配置供應來源。SINOWIN 團隊橫跨越南、印度、台灣與新加坡，工程與管理人才不集中於單一國家，為客戶提供不受單一人力市場波動影響的穩定支援。
- **en：** SINOWIN's core processes (machining, magnetizing, testing) run on an independent equipment line, with sourcing configured flexibly to each customer's requirements. The SINOWIN team spans Vietnam, India, Taiwan, and Singapore — engineering and management talent is not concentrated in any single country, giving customers stable support that isn't exposed to volatility in any one labor market.
- **vi：** Các quy trình cốt lõi của SINOWIN (gia công cơ khí, từ hóa, kiểm tra) sử dụng dây chuyền thiết bị độc lập, có thể linh hoạt cấu hình nguồn cung theo nhu cầu của khách hàng. Đội ngũ SINOWIN trải rộng khắp Việt Nam, Ấn Độ, Đài Loan và Singapore — nhân lực kỹ thuật và quản lý không tập trung vào một quốc gia duy nhất, mang lại sự hỗ trợ ổn định cho khách hàng, không bị ảnh hưởng bởi biến động của một thị trường lao động đơn lẻ.
- **ja：** SINOWINのコアプロセス（機械加工、磁化、テスト）は独立した専用設備ラインで行われており、お客様のご要望に応じて柔軟に供給元を構成できます。SINOWINのチームはベトナム、インド、台湾、シンガポールにまたがっており、エンジニアリングおよび管理人材は特定の一国に集中していません。これにより、単一の労働市場の変動に左右されない安定したサポートをお客様に提供します。

**⚠️ 實作方式待決（本輪不實作）：**
1. **選項 A（治標，立即生效）**：在 `page.tsx` 比照先前「六大製造車間」的做法，用程式碼寫死的內容**覆寫** Sanity 抓來的 `supplyChainTitle`/`supplyChainBody`，不再顯示 CMS 原文。優點：立刻生效，不需要等 Sanity 權杖。缺點：CMS 後台看到的欄位內容與網站實際顯示不一致，未來如果有人透過 Studio 編輯這個欄位會很困惑（改了 Studio 卻看不到效果）。
2. **選項 B（治本，需要 Sanity 寫入權杖或 Studio 操作）**：直接在 Sanity Studio 把 `supplyChainTitle`/`supplyChainBody` 改成中性文字。優點：CMS 與網站一致。缺點：我沒有寫入權杖，需要你或有 Studio 權限的人手動處理，或提供 `SANITY_API_TOKEN` 讓我用腳本寫入。
3. **建議：兩者都做**——先用選項 A 立即止血（這是集團風險，越快改掉越好），同時請有 Studio 權限的人比照選項 B 把 CMS 欄位也同步改掉，之後就可以把程式碼覆寫拿掉，避免長期出現「兩份不同內容」的維護負擔。

---

## 2. About 頁「供應鏈韌性」區塊 🔴 最高優先（zh/en/ja 需重新對齊，vi 已有基礎）

**位置**：`src/app/[lang]/about/page.tsx`，`supplyChain` 物件（程式碼寫死，可直接改）+ 頁面 meta description + FAQPage JSON-LD。

**現況**：先前只針對 **vi** 做過一輪去政治化（見 `translation-drafts/supply-chain-resilience.vi.md`）。**zh/en/ja 目前仍是原始的地緣政治框架版本，本輪要比照 vi 的處理方式，四語言全部去政治化。**

### 2.1 Meta description

| 語言 | 現況 | 改寫後（草案） |
|---|---|---|
| zh | SINOWIN 越南廠：異形磁鐵與高複雜度製造，並建有去中化產線，2026 Q4 就緒，因應**戰略礦產出口管制與供應鏈合規需求**。 | SINOWIN 越南廠：異形磁鐵與高複雜度製造，並建有獨立設備產線，2026 Q4 就緒，提供多國供應鏈彈性選擇。 |
| en | SINOWIN Vietnam: custom-shaped magnets and high-complexity manufacturing, plus a China-free production line ready Q4 2026 to meet **strategic mineral export control and supply chain compliance requirements**. | SINOWIN Vietnam: custom-shaped magnets and high-complexity manufacturing, plus an independent equipment line ready Q4 2026, offering multi-region supply chain flexibility. |
| vi | （目前 fallback→en，尚未單獨撰寫） | Nhà máy SINOWIN Việt Nam: gia công nam châm hình dạng tùy chỉnh và sản xuất phức tạp cao, cùng dây chuyền thiết bị độc lập sẵn sàng vào Q4/2026, mang lại sự linh hoạt cho chuỗi cung ứng đa khu vực. |
| ja | （目前 fallback→en，尚未單獨撰寫） | SINOWINベトナム工場：異形磁石と高複雑度製造、2026年Q4稼働予定の独立設備ラインを備え、多地域にわたるサプライチェーンの柔軟性を提供します。 |

### 2.2 卡片：去中化產線 → 獨立設備專線（沿用 vi 已定案的處理邏輯，套用到 zh/en/ja）

| 語言 | 現況標題 | 改寫後 | 現況 badge | 改寫後 badge |
|---|---|---|---|---|
| zh | 去中化產線 | 獨立設備專線 | 2026 Q4 就緒（保留） | 2026 Q4 就緒 |
| en | China-free line | Independent equipment line | Ready Q4 2026（保留） | Ready Q4 2026 |
| vi | *(先前草案：Dây chuyền không liên quan Trung Quốc)* | **需依新框架重新對齊**：Dây chuyền thiết bị độc lập | Sẵn sàng Q4/2026 | Sẵn sàng Q4/2026 |
| ja | *(尚未翻譯，fallback→en)* | 独立設備ライン | 2026年Q4稼働予定 | 2026年Q4稼働予定 |

卡片內文（現況 zh）：機加工、充磁、測試三大核心製程**不涉中國設備**。設備已完成採購，預計 2026 年 10 月到廠，第四季完成調機與試產。
→ 改寫後（草案）：機加工、充磁、測試三大核心製程**採獨立設備配置**。設備已完成採購，預計 2026 年 10 月到廠，第四季完成調機與試產。
（en/vi/ja 同步比照修改「不涉中國設備」→「獨立設備配置」的模式，不再逐字列出，待審核方向確認後補完整草案。）

### 2.3 時間軸區塊 → 全語言比照先前 vi 的處理

**移除**（zh/en/ja 全部，之前只對 vi 做）：
- 倒數天數「距 11 月執法啟動還有 {days} 天」/ "{days} days until November enforcement"
- 7 月事件（中國商務部第 26 號公告 / MOFCOM Announcement No. 26）
- 11 月事件（中國域外管轄條款執法啟動 / China's extraterritorial provisions come into force）

**保留但改呈現形式**（10 月到廠事件，併入中性「部署時程」段落，不再是三點時間軸——技術方案見 vi 草稿的「方案 A」說明，四語言比照辦理）

**時間軸標題「為什麼是現在」/ "Why now"** → 中性標題（比照 vi 草案：Lộ trình triển khai／部署時程，四語言統一走這個方向，等 Ben 定案標題翻譯後套用到全語言）

**時間軸內文**（現況 zh）：合規稽核、送樣與驗證本來就需要數月。若貴司需在 11 月前完成供應鏈調整，現在是啟動評估的時間點——我們的產線就緒時程，可與您的導入排程對齊。
→ 改寫後（草案，比照 vi 已核准的版本回譯）：獨立設備專線預計 2026 年 10 月到廠，第四季完成安裝與試產，為貴公司的供應鏈增加一個選項。若貴公司正在尋找備援方案或希望讓供應來源多元化，現在是適合展開討論的時間點——我們可以配合貴公司的規劃安排評估時程。
（en/vi/ja 直接沿用 vi 草稿已核准的四段拼接邏輯，vi 版本本身也要依新標題/新用詞重新對齊，見下方「與先前 vi 草稿的差異」。）

**免責定錨**（保留，法務保護，四語言皆不變）：時程以設備到廠與驗證進度為準，我們會在專案評估時同步更新。

### 2.4 CTA

| 語言 | 現況 | 改寫後 |
|---|---|---|
| zh | 您要的是價格，還是避險？ | 您要的是價格，還是供應鏈彈性？ |
| en | Price, or risk mitigation — which are you optimizing for? | Price, or supply chain flexibility — which are you optimizing for? |
| vi | *(先前已改)* Bạn ưu tiên giá cả, hay sự linh hoạt của chuỗi cung ứng?（不變，已符合新框架） | 不變 |
| ja | 価格を優先しますか、それともリスク低減を優先しますか？ | 価格を優先しますか、それともサプライチェーンの柔軟性を優先しますか？ |

### 2.5 ⚠️ FAQPage JSON-LD（本輪新發現的重大項目——只有英文，四語言頁面共用同一份 JSON-LD）

這是**結構化資料**，Google/AI 引擎會直接讀取並可能在搜尋結果或 AI 摘要中引用，比畫面上的文字風險更高（畫面文字至少使用者要點進頁面才看得到，JSON-LD 是機器直接讀取索引的）。目前**四個語言的頁面都嵌入同一份純英文 JSON-LD**，內容如下：

| # | 現況 name | 現況 text（節錄） | 問題 |
|---|---|---|---|
| 1 | Does SINOWIN offer a China-free supply chain option? | "...A separate **China-free line**..." | 提及 China-free，需中性化 |
| 2 | Which processes are covered by the **China-free line**? | "The China-free line covers three core processes..." | 問題本身的 name 就包含 China-free |
| 3 | Why should we start supply chain scoping now rather than later? | "**China's extraterritorial export control provisions come into force in November 2026.** Manufacturers using Chinese-origin controlled materials in restricted downstream applications may face regulatory action..." | **全站 JSON-LD 裡最露骨的一段**，直接點名中國域外管轄條款與執法時間 |
| 4 | Where is SINOWIN located? | 純地址資訊 | 無問題，保留 |

**改寫後（草案）：**

| # | 改寫後 name | 改寫後 text（草案） |
|---|---|---|
| 1 | Does SINOWIN offer flexible supply chain options? | SINOWIN operates two production lines. The standard line uses industry-standard equipment and remains competitive on cost and lead time. A separate independent equipment line, covering machining, magnetizing, and testing, has been ordered with delivery expected October 2026 and commissioning through Q4 2026. Timelines are subject to equipment delivery and validation progress. |
| 2 | Which processes are covered by the independent equipment line? | The independent equipment line covers three core processes: machining, magnetizing, and testing. |
| 3 | Why should we start supply chain scoping now rather than later? | Compliance audit, sampling, and validation typically take several months. Buyers who want to add supply chain flexibility or diversify sourcing before Q4 2026 should begin scoping now, so the timeline aligns with our line's commissioning schedule. |
| 4 | Where is SINOWIN located? | 不變 |

**⚠️ 這是本輪掃描中我認為最需要優先處理的技術債**：先前做 AEO（AI 引擎優化）時，刻意把政治框架寫進了結構化資料，讓 AI 引擎更容易「學到」並在回答使用者問題時複述這個框架——這正是使用者這次要求全面去政治化最擔心的風險路徑之一。

---

## 3. 首頁「集團版圖」區塊 🟠 高優先

**位置**：`src/app/[lang]/page.tsx`，`footprint` 物件（程式碼寫死，可直接改）。

| 語言 | 現況 note | 改寫後（草案） |
|---|---|---|
| zh | SINOWIN 越南廠提供**去中化設備專線選項，供有供應鏈合規需求的客戶選用**。 | SINOWIN 依托集團跨國製造網絡，整合越南、中國、印度的資源與經驗，為客戶提供彈性的產能與供應選擇。 |
| en | Our Vietnam facility offers a **China-free equipment line** for customers with supply chain compliance requirements. | SINOWIN draws on a multinational manufacturing network across Vietnam, China, and India, giving customers flexible capacity and sourcing options. |
| vi | *(目前 fallback→en)* | SINOWIN tận dụng mạng lưới sản xuất đa quốc gia trải khắp Việt Nam, Trung Quốc và Ấn Độ, mang lại cho khách hàng các lựa chọn năng lực và nguồn cung linh hoạt. |
| ja | *(目前 fallback→en)* | SINOWINはベトナム・中国・インドにまたがる多国籍製造ネットワークを活用し、お客様に柔軟な生産能力と調達の選択肢を提供します。 |

**三張卡片（越南／中國／印度）本身維持不動**——這是中性地理事實陳述，且移除中國卡片＝隱瞞，反而是更大的風險，這點與先前「集團版圖」任務的判斷一致，本輪不變。

**下方連結**「了解供應鏈韌性」→ 若第 2 節的 About 頁 eyebrow 改名，此連結文字建議同步改為「了解供應鏈彈性」（待 About 頁最終定案後統一調整）。

---

## 4. 首頁「材料來源與風險分散佈局」區塊 🟢 低優先（情境不同，建議保留但列出讓你確認）

**位置**：`src/app/[lang]/page.tsx`，`PRODUCTS` 陣列與段落結尾。

這段其實**已經把中國列為原料來源地之一**（不是規避對象），框架本身接近「多國實力」而非「對抗中國」，但用詞裡仍有「地緣政治風險」字眼，列出來讓你決定要不要一併微調：

| 位置 | 現況 zh | 現況 en | 判斷 |
|---|---|---|---|
| 越南卡片 bullet | 關稅與**地緣**優勢 | Tariff & **geopolitical** advantage | 這是稱讚越南自身優勢，非攻擊中國，語意中性偏正面，**風險低**，但含關鍵字「地緣政治」的字根，是否要換成「區位優勢」等更保守的詞由你決定 |
| 段落結尾 | ...SINOWIN 為客戶建立**不受單一地緣政治風險影響**的供應韌性。 | ...SINOWIN builds supply resilience that is not dependent on any single **geopolitical risk**. | 這段明確提到中國是原料來源之一（"透過中國、日本與越南等多國毛胚來源配置"），整體框架已經是「多元佈局」而非「規避中國」，但「地緣政治風險」用詞若要徹底避免出現這幾個字，可改為「不受單一供應來源風險影響」 |

**改寫後（草案，若你決定要改）：**
- zh：...SINOWIN 為客戶建立**不受單一供應來源風險影響**的供應韌性。
- en：...SINOWIN builds supply resilience that is not dependent on any single sourcing region.

---

## 5. 全站預設 meta description（`src/app/layout.tsx`）🟠 高優先

這是**沒有語言區分的根層級 fallback**（只有一個英文版本，任何頁面若沒有自己的 `generateMetadata` 就會用到這個）：

| 現況 | 改寫後（草案） |
|---|---|
| Vietnam-based precision magnet processing with 2,000 MT/year capacity, **China-free supply chain**, ISO 9001/14001/45001 certified. | Vietnam-based precision magnet processing with 2,000 MT/year capacity, **multi-region supply chain**, ISO 9001/14001/45001 certified. |

---

## 6. 首頁 meta description（`src/app/[lang]/page.tsx` 的 `generateMetadata`）🟠 高優先

| 語言 | 現況 | 改寫後（草案） |
|---|---|---|
| zh | 年產能 2,000 噸，**去中化設備專線**，ISO 9001 / ISO 14001 / ISO 45001 認證。越南精密磁材代工首選。 | 年產能 2,000 噸，**多國供應鏈佈局**，ISO 9001 / ISO 14001 / ISO 45001 認證。越南精密磁材代工首選。 |
| en | 2,000 MT/year capacity, **China-free supply chain**, ISO 9001/14001/45001 certified. Vietnam's leading precision magnet contract manufacturer. | 2,000 MT/year capacity, **multi-region supply chain**, ISO 9001/14001/45001 certified. Vietnam's leading precision magnet contract manufacturer. |
| vi | Công suất 2.000 tấn/năm, **chuỗi cung ứng không liên quan Trung Quốc**, chứng nhận ISO 9001/14001/45001. | Công suất 2.000 tấn/năm, **chuỗi cung ứng đa khu vực**, chứng nhận ISO 9001/14001/45001. |
| ja | 年産2,000トン、**中国フリーサプライチェーン**、ISO 9001/14001/45001認証取得。ベトナムの精密磁石加工。 | 年産2,000トン、**多地域サプライチェーン**、ISO 9001/14001/45001認証取得。ベトナムの精密磁石加工。 |

---

## 7. ContactForm 表單選項（`src/components/ContactForm.tsx`）🟠 高優先

**vi/ja 已於前一輪處理完畢並上線**（`Linh hoạt chuỗi cung ứng` / `サプライチェーンの柔軟性`）。**本輪策略轉向後，zh/en 也要改：**

| 語言 | 現況 | 改寫後 |
|---|---|---|
| zh | 供應鏈避險 | 供應鏈彈性 |
| en | Supply chain risk mitigation | Supply chain flexibility |
| vi | Linh hoạt chuỗi cung ứng（已改，不變） | 不變 |
| ja | サプライチェーンの柔軟性（已改，不變） | 不變 |

---

## 8. Email 主旨標籤（`src/app/api/contact/route.ts`）🟡 需業務端確認

```ts
const SUBJECT_TAG: Record<string, string> = {
  price: '[價格]',
  risk: '[避險]',      // ← 這裡
  evaluating: '[評估中]',
}
```

**這是內部信件主旨標籤，客戶看不到，只有收信的業務同仁看得到。**

- 若改成 `[彈性]`：畫面上的選項文字與信件標籤用詞一致，但**如果業務端已經習慣用「避險」這個詞在信箱做規則篩選或搜尋**，改標籤文字可能打斷既有的分流習慣。
- **我的建議**：保留內部 `risk` 這個 key（不影響程式邏輯），**標籤文字本身要不要從 `[避險]` 改成 `[彈性]`，需要先問過實際收信、處理業務分流的同仁**，確認他們是否有相依的信箱規則或搜尋習慣。這點我無法自己判斷，需要人工確認。

---

## 9. Sanity 文章：`fe16n2-supplychain-rebuild`（產業分析文章）🟢 低優先，情境不同

**位置**：Sanity 管理的文章內容（`src/content/articles.ts` 有相同文字的死碼版本，但實際上線內容在 Sanity）。

**現況（zh 節錄）**：「...當全球電動化加速、**地緣政治風險**成為日常變數，這項看似穩定的關鍵零組件，正悄然走向結構性轉折點...從『成本』轉向『風險管理』的材料選擇邏輯...」

**判斷**：這是一篇討論「氮化鐵磁鐵 vs 釹鐵硼磁鐵」材料趨勢的**產業分析文章**，「地緣政治風險」是在描述整個磁材產業的總體總體總體趨勢（電動化＋供應鏈集中度），**沒有點名中國、沒有討論 SINOWIN 自身的供應鏈策略**，性質上比較接近財經/產業新聞的常見用語，與「SINOWIN 自己講述如何規避中國」的風險完全不同。

**建議**：這句話的「地緣政治風險」若要百分之百排除任何政治聯想字眼，可以換成「供應鏈集中度風險」（Supply concentration risk）之類的詞，但我認為**這條的優先度遠低於前面幾項**，因為它不是 SINOWIN 對中國的表態，只是引用產業趨勢的常見措辭。列在這裡讓你確認要不要一併處理。

---

## 10. 死碼檔案（非上線內容，不影響網站，但存在 repo 裡）⚪ 建議留意但非緊急

以下檔案**已被 Sanity CMS 取代，沒有任何程式碼 import 它們**（只在 Sanity schema 的註解裡被提及，純歷史記錄）：

- `src/content/site.ts`（含「去中化設備專線」全文，與第 1 節 Sanity 現況文字逐字相同——這是遷移前的原始版本）
- `src/content/articles.ts`（含「地緣政治風險」，與第 9 節 Sanity 文章文字相同）
- `src/content/faq.ts`（本次掃描未發現政治語言）
- `src/content/workshops.ts`（本次掃描的「リスク低減」是「降低崩邊風險」的製造品質用語，與供應鏈政治框架無關，**排除**，非誤判候選）

**這些檔案不會顯示在網站上，不構成集團風險**，但既然全站掃描要求「不能漏」，還是列出來讓你知道 repo 裡有這些歷史殘留。是否要一併刪除或修正這些死碼，由你決定（我的建議：既然已經沒有程式引用，且內容已經跟 Sanity 現況脫鉤，可以考慮直接刪除以免未來有人誤用，但這不急）。

---

## 11. 我判斷有疑慮、需要 Ben 決定的地方（總覽）

1. **首頁「供應鏈信任狀」區塊是 Sanity 管理**，我沒有寫入權杖。需要你決定：(a) 先用程式碼覆寫止血，(b) 找人在 Studio 改 CMS 來源，還是 (c) 兩者都做（我的建議）。
2. **About 頁的標題翻譯「Lộ trình triển khai」等 vi 候選字**仍在等 Ben 定案——這次策略轉向後，這個中性標題會套用到全部四語言（不只 vi），所以定案結果會影響 zh/en/ja 的呼應寫法，建議這次一併定案。
3. **`[避險]` email 主旨標籤是否要改成 `[彈性]`**，需要業務端確認信箱分流習慣，我無法自行判斷，這點特別標出。
4. **「材料來源與風險分散佈局」段落**（第 4 節）語意上已經是「多元佈局」框架、且明確把中國列為原料來源之一，風險相對低，但仍含「地緣政治」字根，是否要一併微調由你決定。
5. **`fe16n2-supplychain-rebuild` 文章**（第 9 節）是產業分析文章、非 SINOWIN 自身表態，我判斷優先度低，但既然有「地緣政治風險」字眼、且已明確上線，仍列出讓你確認。
6. **死碼檔案**（第 10 節）是否要順手清理，非緊急，但你可能會想知道 repo 裡還留著這些歷史文字。

---

## 12. 下一步

**本輪只完成掃描與對照表，沒有修改任何程式碼、沒有寫入 Sanity、沒有 push。**

等你和 Ben 對以上內容（尤其第 11 節六個疑慮點）逐條回覆後，我會：
1. 依照最終定案的用詞框架，重新整理一份「四語言 × 全區塊」的最終文案（含 About 頁供應鏈韌性區塊的完整逐句翻譯，比照先前 vi 草稿的格式）
2. 才動手修改程式碼、（如取得權杖）寫入 Sanity，並依你的指示決定要不要處理死碼與 email 標籤
3. 全部改完後才 push，並用 curl／截圖驗證四語言 SSR 內容與畫面正確
