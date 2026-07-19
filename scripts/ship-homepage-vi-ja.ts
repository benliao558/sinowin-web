/**
 * Ship vi/ja translations for homepageContent.heroSubtitle/supplyChainTitle/
 * supplyChainBody -- these were intentionally left unset in the 2026-07-18
 * de-politicization batch (so vi/ja fell back to the already-neutral en
 * text) because no approved vi/ja translation existed yet. Ben has now
 * reviewed and provided draft text (2026-07-19), so this replaces the
 * "unset" with real translations.
 *
 * Run with: npx tsx --env-file=.env.local scripts/ship-homepage-vi-ja.ts
 * Safe to re-run: idempotent set() on a fixed _id.
 */
import { createClient } from 'next-sanity'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN env var. Run with:')
  console.error('  npx tsx --env-file=.env.local scripts/ship-homepage-vi-ja.ts')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rvwbzxhf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function main() {
  await client
    .patch('homepageContent')
    .set({
      'heroSubtitle.vi': 'Công suất 2.000 tấn/năm · Chuỗi cung ứng đa khu vực · Chứng nhận ISO 9001 / ISO 14001 / ISO 45001',
      'heroSubtitle.ja': '年産2,000トン · 多地域サプライチェーン · ISO 9001 / ISO 14001 / ISO 45001 認証取得',
      'supplyChainTitle.vi': 'Dây chuyền thiết bị độc lập',
      'supplyChainTitle.ja': '独立設備ライン',
      'supplyChainBody.vi':
        "Các quy trình cốt lõi của SINOWIN (gia công cơ khí, từ hóa, kiểm tra) được vận hành trên một dây chuyền thiết bị độc lập, với nguồn cung được cấu hình linh hoạt theo yêu cầu của từng khách hàng. Đội ngũ SINOWIN trải rộng tại Việt Nam, Ấn Độ, Đài Loan và Singapore — nhân lực kỹ thuật và quản lý không tập trung tại một quốc gia duy nhất, mang đến cho khách hàng sự hỗ trợ ổn định, không phụ thuộc vào biến động của bất kỳ thị trường lao động đơn lẻ nào.",
      'supplyChainBody.ja':
        'SINOWINの中核工程（機械加工、着磁、検査）は独立した設備ラインで稼働し、調達は各お客様のご要件に応じて柔軟に構成されます。SINOWINのチームはベトナム、インド、台湾、シンガポールにまたがり、技術・管理人材が単一の国に集中していないため、特定の労働市場の変動に左右されない安定したサポートをお客様に提供します。',
    })
    .commit()

  const doc = await client.getDocument('homepageContent')
  console.log('heroSubtitle:', doc?.heroSubtitle)
  console.log('supplyChainTitle:', doc?.supplyChainTitle)
  console.log('supplyChainBody.vi length:', doc?.supplyChainBody?.vi?.length)
  console.log('supplyChainBody.ja length:', doc?.supplyChainBody?.ja?.length)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
