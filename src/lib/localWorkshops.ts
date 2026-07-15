import type { LocaleString, LocaleText } from '@/sanity/lib/types'

// This workshop's content isn't in Sanity: this environment only has a
// read-only Sanity client (no SANITY_API_TOKEN configured), so there's no
// way to create a new document or upload image assets from here. Modeled
// after the same shape as SanityWorkshop so WorkshopGrid can render it
// alongside the CMS-backed workshops with one code path; merged into the
// fetched list in src/app/[lang]/manufacturing/page.tsx. If this should
// live in Sanity Studio instead, someone with Studio access (or a write
// token) can re-enter it there and this file can be deleted.
export type ProcessTableRow = {
  process: string
  characteristics: LocaleString
  sst: LocaleString
  thickness: string
}

export type LocalWorkshop = {
  _id: string
  workshopId: string
  cardImage: string
  badge?: string
  cardTitle: LocaleString
  cardDesc: LocaleText
  subtitle?: LocaleString
  intro: LocaleText
  highlights: LocaleString[]
  // Table-shaped content replaces the tab/equipment-photo structure used by
  // the other workshops -- five coating processes don't fit the existing
  // "1-3 equipment tabs" schema, and forcing them into it would lose the
  // comparison-table shape the spec asked for.
  processTable: {
    columns: LocaleString[]
    rows: ProcessTableRow[]
  }
  disclaimer: LocaleText
  qualityStandards: {
    title: LocaleString
    items: { label: LocaleString; value: LocaleString }[]
  }
  gallery: { src: string; alt: string }[]
}

export const surfaceTreatmentWorkshop: LocalWorkshop = {
  _id: 'local-surface-treatment',
  workshopId: 'surface-treatment',
  cardImage: '/assets/workshops/plating_line1.webp',
  badge: 'SURFACE TREATMENT',
  cardTitle: {
    zh: '表面處理車間',
    en: 'Surface treatment workshop',
  },
  cardDesc: {
    zh: '五種鍍層／塗層工藝，依環境與可靠性要求選型，標準化測試確保批次一致。',
    en: 'Five coating processes, selected by operating environment and reliability requirements, with standardized testing to ensure batch consistency.',
  },
  intro: {
    zh: '釹鐵硼磁鐵易受潮氧化，表面處理決定其在實際環境中的壽命。SINOWIN 提供五種鍍層／塗層工藝，依使用環境、裝配方式與可靠性要求選型，並以標準化測試確保批次一致。',
    en: 'NdFeB magnets are prone to oxidation; surface treatment determines their service life in real-world conditions. SINOWIN offers five coating processes, selected by operating environment, assembly method, and reliability requirements, with standardized testing to ensure batch consistency.',
  },
  highlights: [
    { zh: '高濕度／腐蝕環境應用', en: 'High-humidity / corrosive environment applications' },
    { zh: '需絕緣的馬達／感測元件', en: 'Insulated motors / sensor components' },
    { zh: '複雜幾何形狀均勻覆蓋', en: 'Uniform coverage on complex geometries' },
    { zh: '一般環境的經濟型防護', en: 'Economical protection for general environments' },
  ],
  processTable: {
    columns: [
      { zh: '工藝', en: 'Process' },
      { zh: '特性', en: 'Characteristics' },
      { zh: '鹽霧測試 (SST)', en: 'Salt spray test (SST)' },
      { zh: '鍍層厚度', en: 'Coating thickness' },
    ],
    rows: [
      {
        process: 'Ni-Cu-Ni',
        characteristics: { zh: '鎳銅鎳 · 最常用 · 金屬光澤 · 耐磨', en: 'Ni-Cu-Ni · most common · metallic finish · wear-resistant' },
        sst: { zh: '可達 >48h', en: 'Up to >48h' },
        thickness: '10–20μm',
      },
      {
        process: 'Epoxy',
        characteristics: { zh: '環氧噴塗 · 最高耐蝕 · 絕緣 · 黑色霧面', en: 'Epoxy spray · highest corrosion resistance · insulating · matte black' },
        sst: { zh: '可達 500h', en: 'Up to 500h' },
        thickness: '10–20μm',
      },
      {
        process: 'E-coating',
        characteristics: { zh: '電泳 · 均勻覆蓋 · 複雜形狀 · 絕緣', en: 'Electrophoretic · uniform coverage · complex shapes · insulating' },
        sst: { zh: '依需求提供', en: 'On request' },
        thickness: 'Per spec',
      },
      {
        process: 'Cu-Ni-P',
        characteristics: { zh: '銅鎳磷 · 高硬度 · 耐蝕 · 化學鍍', en: 'Cu-Ni-P · high hardness · corrosion-resistant · electroless' },
        sst: { zh: '可達 240h', en: 'Up to 240h' },
        thickness: '10–20μm',
      },
      {
        process: 'Zinc',
        characteristics: { zh: '鋅 · 經濟 · 適合一般環境', en: 'Zinc · economical · suited to general environments' },
        sst: { zh: '可達 >24h', en: 'Up to >24h' },
        thickness: '10–20μm',
      },
    ],
  },
  disclaimer: {
    zh: '鹽霧數據為特定條件下可達之測試值，實際允收標準依專案規範與圖面要求確認。常規鍍層厚度 10–20μm，可依客製需求調整。',
    en: 'Salt spray figures are achievable test values under specific conditions; actual acceptance criteria are confirmed per project specification. Standard coating thickness is 10–20μm, adjustable to custom requirements.',
  },
  qualityStandards: {
    title: { zh: '品質檢測標準', en: 'Quality inspection standards' },
    items: [
      { label: { zh: '附著力', en: 'Adhesion' }, value: { zh: '百格測試 (Cross-cut)', en: 'Cross-cut test' } },
      { label: { zh: '潔淨度', en: 'Cleanliness' }, value: { zh: '達因測試 (Dyne test)', en: 'Dyne test' } },
      { label: { zh: '耐蝕性', en: 'Corrosion resistance' }, value: { zh: '中性鹽霧測試（NSS / ASTM B117）', en: 'Neutral salt spray (NSS / ASTM B117)' } },
    ],
  },
  // gallery[0] matches cardImage and is skipped by the modal's "other
  // process photos" strip (WorkshopGrid.tsx does gallery.slice(1)) --
  // plating_line1 must stay first here since it's now the card/hero image.
  gallery: [
    { src: '/assets/workshops/plating_line1.webp', alt: 'SINOWIN 越南廠多槽鍍液生產線' },
    { src: '/assets/workshops/plating_line2.webp', alt: 'SINOWIN 越南廠多槽鍍液生產線' },
    { src: '/assets/workshops/spray1.webp', alt: 'SINOWIN 越南廠自動噴塗生產線' },
    { src: '/assets/workshops/spray2.webp', alt: 'SINOWIN 越南廠自動噴塗生產線' },
    { src: '/assets/workshops/e-ing.webp', alt: 'SINOWIN 越南廠電泳處理生產線' },
  ],
}
