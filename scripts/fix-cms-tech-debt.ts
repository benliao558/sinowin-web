/**
 * One-time cleanup of 3 CMS tech-debt items (2026-07-18), now that a
 * SANITY_API_TOKEN (Editor) is available:
 *
 * 1. homepageContent.heroSubtitle/supplyChainTitle/supplyChainBody: replace
 *    stale "China-free supply chain" framing with the neutral copy that
 *    src/app/[lang]/page.tsx has been overriding at the code level since
 *    2026-07-16's de-politicization pass.
 * 2. manufacturingIntro.intro: replace stale "六大製造車間" (six workshops)
 *    with the descriptive wording src/app/[lang]/manufacturing/page.tsx has
 *    been overriding at the code level.
 * 3. Create a new `workshop` document for Surface Treatment from
 *    src/lib/localWorkshops.ts, uploading its 5 gallery images as real
 *    Sanity assets, so it becomes Studio-editable like the other 7.
 *
 * Only zh/en are written for #1/#2 (matching what the code overrides
 * defined) -- vi/ja are explicitly unset so the existing vi->en->zh /
 * ja->en->zh fallback produces the exact same displayed text as today,
 * rather than resurfacing the old stale vi/ja copy that's currently masked
 * by the code override.
 *
 * Run with: npx tsx --env-file=.env.local scripts/fix-cms-tech-debt.ts
 * Safe to re-run: patches use deterministic doc IDs / set-then-unset, and
 * the workshop document uses createOrReplace with a deterministic _id.
 */
import { createClient } from 'next-sanity'
import fs from 'node:fs'
import path from 'node:path'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN env var. Run with:')
  console.error('  npx tsx --env-file=.env.local scripts/fix-cms-tech-debt.ts')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rvwbzxhf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const publicDir = path.join(__dirname, '..', 'public')

function randKey(): string {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

async function uploadImage(publicRelativePath: string) {
  const absPath = path.join(publicDir, publicRelativePath.replace(/^\//, ''))
  const buffer = fs.readFileSync(absPath)
  const asset = await client.assets.upload('image', buffer, { filename: path.basename(absPath) })
  return { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: asset._id } }
}

// ---------- 1. homepageContent ----------

async function fixHomepageContent() {
  console.log('\n=== 1. homepageContent (de-politicization batch 2) ===')
  await client
    .patch('homepageContent')
    .set({
      heroSubtitle: {
        _type: 'localeString',
        zh: '年產能 2,000 噸・多國供應鏈佈局・ISO 9001 / ISO 14001 / ISO 45001 認證',
        en: '2,000 MT/year capacity · Multi-region supply chain · ISO 9001 / ISO 14001 / ISO 45001 certified',
      },
      supplyChainTitle: {
        _type: 'localeString',
        zh: '獨立設備專線',
        en: 'Independent Equipment Line',
      },
      supplyChainBody: {
        _type: 'localeText',
        zh: 'SINOWIN 核心製程（機加工、充磁、測試）採用獨立設備專線，可依客戶需求彈性配置供應來源。SINOWIN 團隊橫跨越南、印度、台灣與新加坡，工程與管理人才不集中於單一國家，為客戶提供不受單一人力市場波動影響的穩定支援。',
        en: "SINOWIN's core processes (machining, magnetizing, testing) run on an independent equipment line, with sourcing configured flexibly to each customer's requirements. The SINOWIN team spans Vietnam, India, Taiwan, and Singapore — engineering and management talent is not concentrated in any single country, giving customers stable support that isn't exposed to volatility in any one labor market.",
      },
    })
    .unset([
      'heroSubtitle.vi', 'heroSubtitle.ja',
      'supplyChainTitle.vi', 'supplyChainTitle.ja',
      'supplyChainBody.vi', 'supplyChainBody.ja',
    ])
    .commit()
  console.log('  ok: heroSubtitle, supplyChainTitle, supplyChainBody updated (vi/ja unset -> fall back to en)')
}

// ---------- 2. manufacturingIntro ----------

async function fixManufacturingIntro() {
  console.log('\n=== 2. manufacturingIntro (six-workshops -> descriptive wording) ===')
  await client
    .patch('manufacturingIntro')
    .set({
      intro: {
        _type: 'localeText',
        zh: '越南廠區設有完整製造車間，提供從切割、研磨、組裝充磁、測試到表面處理的完整加工鏈。',
        en: 'Our Vietnam facility operates a complete set of manufacturing workshops, covering the full process chain from cutting and grinding to assembly, magnetizing, testing, and surface treatment.',
      },
    })
    .unset(['intro.vi', 'intro.ja'])
    .commit()
  console.log('  ok: intro updated (vi/ja unset -> fall back to en)')
}

// ---------- 3. Surface Treatment workshop ----------

async function createSurfaceTreatmentWorkshop() {
  console.log('\n=== 3. Surface Treatment workshop document ===')

  console.log('  uploading gallery images...')
  const platingLine1 = await uploadImage('/assets/workshops/plating_line1.webp')
  const platingLine2 = await uploadImage('/assets/workshops/plating_line2.webp')
  const spray1 = await uploadImage('/assets/workshops/spray1.webp')
  const spray2 = await uploadImage('/assets/workshops/spray2.webp')
  const eIng = await uploadImage('/assets/workshops/e-ing.webp')
  console.log('  ok: 5 images uploaded')

  const doc = {
    _id: 'workshop-surface-treatment',
    _type: 'workshop',
    workshopId: { _type: 'slug', current: 'surface-treatment' },
    cardImage: platingLine1,
    badge: 'SURFACE TREATMENT',
    cardTitle: { _type: 'localeString', zh: '表面處理車間', en: 'Surface treatment workshop' },
    cardDesc: {
      _type: 'localeText',
      zh: '五種鍍層／塗層工藝，依環境與可靠性要求選型，標準化測試確保批次一致。',
      en: 'Five coating processes, selected by operating environment and reliability requirements, with standardized testing to ensure batch consistency.',
    },
    intro: {
      _type: 'localeText',
      zh: '釹鐵硼磁鐵易受潮氧化，表面處理決定其在實際環境中的壽命。SINOWIN 提供五種鍍層／塗層工藝，依使用環境、裝配方式與可靠性要求選型，並以標準化測試確保批次一致。',
      en: 'NdFeB magnets are prone to oxidation; surface treatment determines their service life in real-world conditions. SINOWIN offers five coating processes, selected by operating environment, assembly method, and reliability requirements, with standardized testing to ensure batch consistency.',
    },
    highlights: [
      { _key: randKey(), _type: 'localeString', zh: '高濕度／腐蝕環境應用', en: 'High-humidity / corrosive environment applications' },
      { _key: randKey(), _type: 'localeString', zh: '需絕緣的馬達／感測元件', en: 'Insulated motors / sensor components' },
      { _key: randKey(), _type: 'localeString', zh: '複雜幾何形狀均勻覆蓋', en: 'Uniform coverage on complex geometries' },
      { _key: randKey(), _type: 'localeString', zh: '一般環境的經濟型防護', en: 'Economical protection for general environments' },
    ],
    processTable: {
      columns: [
        { _key: randKey(), _type: 'localeString', zh: '工藝', en: 'Process' },
        { _key: randKey(), _type: 'localeString', zh: '特性', en: 'Characteristics' },
        { _key: randKey(), _type: 'localeString', zh: '鹽霧測試 (SST)', en: 'Salt spray test (SST)' },
        { _key: randKey(), _type: 'localeString', zh: '鍍層厚度', en: 'Coating thickness' },
      ],
      rows: [
        {
          _key: randKey(),
          process: 'Ni-Cu-Ni',
          characteristics: { _type: 'localeString', zh: '鎳銅鎳 · 最常用 · 金屬光澤 · 耐磨', en: 'Ni-Cu-Ni · most common · metallic finish · wear-resistant' },
          sst: { _type: 'localeString', zh: '可達 >48h', en: 'Up to >48h' },
          thickness: '10–20μm',
        },
        {
          _key: randKey(),
          process: 'Epoxy',
          characteristics: { _type: 'localeString', zh: '環氧噴塗 · 最高耐蝕 · 絕緣 · 黑色霧面', en: 'Epoxy spray · highest corrosion resistance · insulating · matte black' },
          sst: { _type: 'localeString', zh: '可達 500h', en: 'Up to 500h' },
          thickness: '10–20μm',
        },
        {
          _key: randKey(),
          process: 'E-coating',
          characteristics: { _type: 'localeString', zh: '電泳 · 均勻覆蓋 · 複雜形狀 · 絕緣', en: 'Electrophoretic · uniform coverage · complex shapes · insulating' },
          sst: { _type: 'localeString', zh: '依需求提供', en: 'On request' },
          thickness: 'Per spec',
        },
        {
          _key: randKey(),
          process: 'Cu-Ni-P',
          characteristics: { _type: 'localeString', zh: '銅鎳磷 · 高硬度 · 耐蝕 · 化學鍍', en: 'Cu-Ni-P · high hardness · corrosion-resistant · electroless' },
          sst: { _type: 'localeString', zh: '可達 240h', en: 'Up to 240h' },
          thickness: '10–20μm',
        },
        {
          _key: randKey(),
          process: 'Zinc',
          characteristics: { _type: 'localeString', zh: '鋅 · 經濟 · 適合一般環境', en: 'Zinc · economical · suited to general environments' },
          sst: { _type: 'localeString', zh: '可達 >24h', en: 'Up to >24h' },
          thickness: '10–20μm',
        },
      ],
    },
    disclaimer: {
      _type: 'localeText',
      zh: '鹽霧數據為特定條件下可達之測試值，實際允收標準依專案規範與圖面要求確認。常規鍍層厚度 10–20μm，可依客製需求調整。',
      en: 'Salt spray figures are achievable test values under specific conditions; actual acceptance criteria are confirmed per project specification. Standard coating thickness is 10–20μm, adjustable to custom requirements.',
    },
    qualityStandards: {
      title: { _type: 'localeString', zh: '品質檢測標準', en: 'Quality inspection standards' },
      items: [
        { _key: randKey(), label: { _type: 'localeString', zh: '附著力', en: 'Adhesion' }, value: { _type: 'localeString', zh: '百格測試 (Cross-cut)', en: 'Cross-cut test' } },
        { _key: randKey(), label: { _type: 'localeString', zh: '潔淨度', en: 'Cleanliness' }, value: { _type: 'localeString', zh: '達因測試 (Dyne test)', en: 'Dyne test' } },
        { _key: randKey(), label: { _type: 'localeString', zh: '耐蝕性', en: 'Corrosion resistance' }, value: { _type: 'localeString', zh: '中性鹽霧測試（NSS / ASTM B117）', en: 'Neutral salt spray (NSS / ASTM B117)' } },
      ],
    },
    // gallery[0] matches cardImage and is skipped by the modal's "other
    // process photos" strip (gallery.slice(1)) -- plating_line1 must stay
    // first since it's also the card/hero image.
    gallery: [
      { _key: randKey(), image: platingLine1, alt: 'SINOWIN 越南廠多槽鍍液生產線' },
      { _key: randKey(), image: platingLine2, alt: 'SINOWIN 越南廠多槽鍍液生產線' },
      { _key: randKey(), image: spray1, alt: 'SINOWIN 越南廠自動噴塗生產線' },
      { _key: randKey(), image: spray2, alt: 'SINOWIN 越南廠自動噴塗生產線' },
      { _key: randKey(), image: eIng, alt: 'SINOWIN 越南廠電泳處理生產線' },
    ],
  }

  await client.createOrReplace(doc)
  console.log('  ok: workshop-surface-treatment created')
}

async function main() {
  await fixHomepageContent()
  await fixManufacturingIntro()
  await createSurfaceTreatmentWorkshop()
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
