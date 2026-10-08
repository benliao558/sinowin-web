import type { Locale } from '@/lib/i18n'
import { t } from '@/sanity/lib/localize'
import AboutReveal from '@/components/about/AboutReveal'

type L = Partial<Record<Locale, string>>

const ghg = {
  eyebrow: { zh: '永續與環境', en: 'Sustainability', vi: 'Phát triển bền vững', ja: 'サステナビリティ' } as L,
  h2: { zh: '溫室氣體排放揭露', en: 'Greenhouse gas emissions disclosure', vi: 'Công bố phát thải khí nhà kính', ja: '温室効果ガス排出量の開示' } as L,
  lead: {
    zh: '我們依範疇一、二、三逐月盤查越南廠的溫室氣體排放，並公開計算結果與年度減排目標，供客戶在供應鏈 ESG 評估時參考。',
    en: "We track our Vietnam plant's greenhouse gas emissions monthly across Scopes 1, 2 and 3, and publish the results and annual reduction targets to support our customers' supply chain ESG assessments.",
    vi: 'Chúng tôi kiểm kê phát thải khí nhà kính hằng tháng của nhà máy tại Việt Nam theo Phạm vi 1, 2 và 3, đồng thời công bố kết quả và mục tiêu giảm phát thải hằng năm để hỗ trợ khách hàng đánh giá ESG chuỗi cung ứng.',
    ja: 'ベトナム工場の温室効果ガス排出量を Scope 1・2・3 に分けて毎月算定し、算定結果と年間削減目標を公開しています。サプライチェーンの ESG 評価にご活用ください。',
  } as L,
  button: { zh: '下載 PDF', en: 'Download PDF', vi: 'Tải PDF', ja: 'PDF をダウンロード' } as L,
  note: {
    zh: '2026 年數據每季更新。如需完整盤查方法或排放係數說明，歡迎與我們聯繫。',
    en: '2026 figures are updated quarterly. Contact us for the full methodology or emission factors.',
    vi: 'Số liệu năm 2026 được cập nhật hằng quý. Vui lòng liên hệ để nhận phương pháp kiểm kê và hệ số phát thải chi tiết.',
    ja: '2026 年のデータは四半期ごとに更新します。算定方法や排出係数の詳細はお問い合わせください。',
  } as L,
  docs: [
    {
      href: '/downloads/sinowin-vn-ghg-2025.pdf',
      title: { zh: '2025 年溫室氣體排放計算表及 2026 年減排目標', en: '2025 GHG emissions calculation and 2026 reduction targets', vi: 'Bảng tính phát thải KNK năm 2025 và mục tiêu giảm thiểu năm 2026', ja: '2025 年 温室効果ガス排出量算定表および 2026 年削減目標' } as L,
      meta: { zh: '基準年總排放 32.7 tCO₂e・2026 目標：單位產品排放強度降低 1%・PDF・中文／越南文', en: 'Base-year total 32.7 tCO₂e · 2026 target: 1% lower emission intensity per unit · PDF · Chinese / Vietnamese', vi: 'Tổng phát thải năm cơ sở 32,7 tCO₂e · Mục tiêu 2026: giảm 1% cường độ phát thải trên mỗi sản phẩm · PDF · Tiếng Trung / Tiếng Việt', ja: '基準年総排出量 32.7 tCO₂e・2026 年目標：製品単位当たりの排出原単位 1% 削減・PDF・中国語／ベトナム語' } as L,
    },
    {
      href: '/downloads/sinowin-vn-ghg-2026.pdf',
      title: { zh: '2026 年溫室氣體排放計算表', en: '2026 GHG emissions calculation', vi: 'Bảng tính phát thải KNK năm 2026', ja: '2026 年 温室効果ガス排出量算定表' } as L,
      meta: { zh: '年度進行中（1–9 月）・範疇 1–3・PDF・中文／越南文', en: 'Year to date (Jan–Sep) · Scopes 1–3 · PDF · Chinese / Vietnamese', vi: 'Lũy kế (Th.1–Th.9) · Phạm vi 1–3 · PDF · Tiếng Trung / Tiếng Việt', ja: '年度途中（1–9 月）・Scope 1–3・PDF・中国語／ベトナム語' } as L,
    },
  ],
}

export default function GhgDisclosure({ lang }: { lang: Locale }) {
  return (
    <section id="ghg" className="py-16 md:py-24" style={{ borderTop: '1px solid #1F2530' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AboutReveal index={6}>
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#6B7280' }}>{t(ghg.eyebrow, lang)}</p>
          <h2 className="text-2xl md:text-3xl font-black mb-6 max-w-[30ch] text-white">{t(ghg.h2, lang)}</h2>
          <p className="text-base leading-relaxed font-medium max-w-[60ch] mb-10" style={{ color: '#8A93A3' }}>{t(ghg.lead, lang)}</p>
        </AboutReveal>

        <AboutReveal index={6}>
          <ul className="rounded-[2rem] overflow-hidden" style={{ background: '#12161F', border: '1px solid #1F2530' }}>
            {ghg.docs.map((doc, i) => (
              <li
                key={doc.href}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 sm:px-8"
                style={i > 0 ? { borderTop: '1px solid #1F2530' } : undefined}
              >
                <span
                  aria-hidden="true"
                  className="hidden sm:flex w-11 h-11 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: '#171C26', border: '1px solid #39414F', color: '#0FBF9B' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" /></svg>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm sm:text-base" style={{ color: '#E4E9F2' }}>{t(doc.title, lang)}</p>
                  <p className="text-xs mt-1" style={{ color: '#6B7280' }}>{t(doc.meta, lang)}</p>
                </div>
                <a
                  href={doc.href}
                  download
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-colors border border-[#39414F] text-[#E4E9F2] hover:border-[#0FBF9B] hover:text-[#0FBF9B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0FBF9B]"
                >
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /><path d="M7 11l5 5 5-5" /><path d="M12 4v12" /></svg>
                  {t(ghg.button, lang)}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs leading-relaxed mt-4" style={{ color: '#6B7280' }}>{t(ghg.note, lang)}</p>
        </AboutReveal>
      </div>
    </section>
  )
}