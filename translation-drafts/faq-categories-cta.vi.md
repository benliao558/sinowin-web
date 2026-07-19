# FAQ 分類標題 + CTA — 越南文（VI）翻譯草稿

**⚠️ 這是 AI 產生的翻譯草稿，尚未經過人工審核，請勿直接當作正式內容使用或匯入程式碼。**
**本檔案未被任何程式引用，純粹作為人工審核用的參考文件。**

來源：`src/app/[lang]/faq/page.tsx`

**範圍說明**：`HEADING`、`SUBTITLE`、`BREADCRUMB_LABEL` 這三個欄位**已經有 vi/ja 翻譯**（程式碼裡本來就是四語言），本輪不重複處理。本輪只翻譯目前 zh/en-only 的部分：3 個分類標題（`CATEGORIES[].title`）、`OTHER_TITLE`、CTA 兩行文字。個別 FAQ 問答本身（question/answer）在 Sanity 裡另外管理，也不在本輪範圍內。

---

## 1. 分類標題（CATEGORIES）

| # | zh | en | VI |
|---|---|---|---|
| 1 | 製程與精度 | Process & precision | Quy trình & độ chính xác |
| 2 | 品質與認證 | Quality & certification | Chất lượng & chứng nhận |
| 3 | 交期與打樣 | Lead time & sampling | Thời gian giao hàng & làm mẫu |

## 2. OTHER_TITLE（未歸類問題的分組標題）
- **zh：** 其他
- **en：** Other
- **VI：** Khác

## 3. CTA（頁尾詢問區塊）

- **question**
  - zh：沒找到您要的答案？
  - en：Didn't find your answer?
  - VI：Không tìm thấy câu trả lời bạn cần?

- **button**
  - zh：直接詢問工程團隊
  - en：Ask our engineering team
  - VI：Hỏi trực tiếp đội ngũ kỹ thuật

---

## 4. 自我檢查表

這批內容沒有數字、認證代號、或需要跨語言比對一致性的專有名詞——純粹是 UI 標籤與短句，故此份自我檢查表以「用詞是否跟已定案的其他頁面一致」為主：

| 項目 | 檢查內容 | 結果 |
|---|---|---|
| 「團隊」用詞 | 是否與 careers 頁的「đội ngũ」用法一致 | ✅ careers 頁 `T.desc` 已用「đội ngũ」，本次沿用 |
| 是否含未去政治化語言 | 這批內容純屬 UI 標籤（分類名/CTA），無涉及地緣政治或供應鏈立場的字眼 | ✅ 不適用，無需去政治化審查 |

---

## 5. 判斷點／需要 Ben 確認的地方

1. **分類標題是否要用越南文常見的全大寫/首字大寫 UI 慣例**：目前草稿用一般句首大寫（Quy trình & độ chính xác），跟 `HEADING`/`SUBTITLE` 既有的越南文風格一致（句子式大小寫，非每字大寫）。如果 FAQ 頁面分類標題在視覺上想要更像分類標籤（例如全大寫呈現），CSS 樣式層可以處理，文字本身不需要改。
2. **「&」符號是否保留**：三個分類標題都用了「&」符號（跟 zh/en 原文一致），越南文正式書寫有時會展開成「và」。目前選擇保留「&」以維持跟 zh/en 版面一樣簡短的 UI 標籤感，如需展開成「và」請告知。
