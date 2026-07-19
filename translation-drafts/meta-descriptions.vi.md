# 各頁 Meta Description — 越南文（VI）翻譯草稿

**⚠️ 這是 AI 產生的翻譯草稿，尚未經過人工審核，請勿直接當作正式內容使用或匯入程式碼。**
**本檔案未被任何程式引用，純粹作為人工審核用的參考文件。**

範圍：目前 zh/en-only 的 4 個頁面 meta description。首頁 `descs`、Articles 列表頁 `ARTICLES_DESC`、Careers 頁 `T.desc` **已經有 vi/ja**，本輪不重複處理。

---

## 1. About 頁（`src/app/[lang]/about/page.tsx` — `META_DESCRIPTION`）

- **zh：** SINOWIN 越南廠：異形磁鐵與高複雜度製造，並建有獨立設備產線，2026 Q4 就緒，提供多國供應鏈彈性選擇。
- **en：** SINOWIN Vietnam: custom-shaped magnets and high-complexity manufacturing, plus an independent equipment line ready Q4 2026, offering multi-region supply chain flexibility.
- **VI：** SINOWIN Việt Nam: sản xuất nam châm hình dạng tùy chỉnh và độ phức tạp cao, cùng dây chuyền thiết bị độc lập sẵn sàng vào quý 4/2026, mang đến các lựa chọn linh hoạt cho chuỗi cung ứng đa khu vực.

*（Q4 寫法依規則：正文用「quý 4/2026」，非 badge，故不用「Q4/2026」格式）*

## 2. Manufacturing 頁（`src/app/[lang]/manufacturing/page.tsx` — `META_DESCRIPTION`）【已精簡，2026-07-19】

- **zh：** SINOWIN 越南廠製造能力：多線切、激光切割、研磨、倒角、組裝充磁、測試實驗室、輔具加工，以及表面處理車間（鎳銅鎳、環氧、電泳、銅鎳磷、鋅鍍層，鹽霧測試與厚度規格）。（zh/en 不動）
- **en：** SINOWIN Vietnam manufacturing capabilities: multi-wire cutting, laser cutting, grinding, chamfering, assembly & magnetizing, testing lab, fixture/tooling, and a surface treatment workshop (Ni-Cu-Ni, epoxy, e-coating, Cu-Ni-P, zinc — salt spray ratings and coating thickness).
- **VI（精簡版，143 字元）：** Năng lực sản xuất của SINOWIN tại Việt Nam: gia công nam châm chính xác, từ cắt dây đến xử lý bề mặt, với kiểm tra phun muối đạt chuẩn quốc tế.

*（原本逐項列出 8 個車間 + 5 個製程代號的完整版本字數過長，Ben 審核後指示精簡至 155 字元內，只保留最重要的長尾關鍵字：磁材加工、表面處理、鹽霧、越南，捨棄完整列舉。已改用精簡版上線，此為最終版本。）*

## 3. FAQ 頁（`src/app/[lang]/faq/page.tsx` — `META.description`）

- **zh：** SINOWIN 常見問題：釹鐵硼磁鐵加工精度、崩邊控制、批次追溯、IATF 16949 認證文件、交期評估、客製打樣與表面處理選型。
- **en：** SINOWIN FAQ: NdFeB magnet machining precision, chipping control, batch traceability, IATF 16949 documentation, lead time, custom sampling, and surface treatment selection.
- **VI：** Câu hỏi thường gặp của SINOWIN: độ chính xác gia công nam châm NdFeB, kiểm soát sứt mẻ, truy xuất nguồn gốc theo lô, hồ sơ chứng nhận IATF 16949, đánh giá thời gian giao hàng, làm mẫu tùy chỉnh và lựa chọn xử lý bề mặt.

## 4. 中國生產基地頁（`src/app/[lang]/china-base/page.tsx` — `META_DESCRIPTION`）⚠️ 涉及中國，已過去政治化審查

- **zh：** 華殷集團中國生產基地——集團跨國製造網絡的一部分。
- **en：** Phonein Group's manufacturing base in China — part of the group's multi-region manufacturing network.
- **VI：** Cơ sở sản xuất của Phonein Group tại Trung Quốc — một phần trong mạng lưới sản xuất đa khu vực của tập đoàn.

*（判定【保留】：純中性揭露事實，與 `global-footprint.vi.md` 第 0 節的去政治化對照表判定一致，無需移除或改寫）*

---

## 5. 自我檢查表：數字與專有名詞

| 項目 | zh/en | VI | 一致？ |
|---|---|---|---|
| Q4 時程 | 2026 Q4 / Q4 2026 | quý 4/2026 | ✅ 依規則使用正文格式 |
| 認證代號 | IATF 16949 | IATF 16949 | ✅ 未改動 |
| NdFeB | NdFeB | NdFeB | ✅ 未改動 |
| 表面處理製程代號（5 項） | Ni-Cu-Ni / epoxy / e-coating / Cu-Ni-P / zinc | 同左，未改動 | ✅ |
| 車間名稱：多線切 | multi-wire cutting | cắt dây đa dây | ✅ 對照 Sanity「Xưởng Cắt Dây Đa Dây」 |
| 車間名稱：激光切割 | laser cutting | cắt laser | ✅ 對照 Sanity「Xưởng Cắt Laser」 |
| 車間名稱：研磨 | grinding | mài | ✅ 對照 Sanity「Xưởng Mài」 |
| 車間名稱：倒角 | chamfering | vát cạnh | ✅ 對照 Sanity「Xưởng Vát Cạnh」 |
| 車間名稱：組裝充磁 | assembly & magnetizing | lắp ráp & từ hóa | ✅ 對照 Sanity「Xưởng Lắp Ráp & Từ Hóa」 |
| 車間名稱：測試實驗室 | testing lab | phòng thí nghiệm kiểm tra | ✅ 對照 Sanity「Phòng Thí Nghiệm Kiểm Tra」 |
| 車間名稱：輔具加工 | fixture/tooling | gia công đồ gá | ✅ 對照 Sanity「Xưởng Gia Công Đồ Gá」 |
| 車間名稱：表面處理 | surface treatment workshop | xưởng xử lý bề mặt | ✅ 對照本輪 `surface-treatment-workshop.vi.md` 的翻譯 |
| 集團名 | Phonein Group | Phonein Group（不譯） | ✅ |

---

## 6. 判斷點／需要 Ben 確認的地方

1. **Manufacturing meta description 是否過長**：越南文版本字數比 zh/en 都長不少（越南文本身比中文/英文更需要用字表達同樣資訊），列了 8 個車間名稱＋5 個製程代號，Google 搜尋結果通常只顯示前 150-160 字左右，這句越南文可能會被截斷。若 Ben 在意 SEO 顯示效果，可考慮精簡（例如把 5 個製程代號縮成「5種鍍層工藝」不逐一列出），但這樣跟 zh/en 版的詳細程度不對等。目前草稿選擇跟 zh/en 逐項對應的完整版本，供 Ben 決定是否要精簡。
2. **「truy xuất nguồn gốc theo lô」vs「truy xuất theo lô」**：「批次追溯」譯為「truy xuất nguồn gốc theo lô」（追溯來源，較完整）而非更簡短的「truy xuất theo lô」，因為越南文「truy xuất」單獨使用時語意不夠明確（可能被誤解為其他意思），加上「nguồn gốc」（來源）較清楚，但字數會增加，供 Ben 參考第 1 點的長度疑慮一併考慮。
