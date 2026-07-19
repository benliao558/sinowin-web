/**
 * Ship vi/ja translations for the Surface Treatment workshop
 * (workshop-surface-treatment), per translation-drafts/surface-treatment-workshop.vi.md
 * and .ja.md (approved 2026-07-19).
 *
 * gallery[].alt is intentionally left untouched -- it's a plain `string`
 * field (not localeString), shared across all locales like `badge`, per the
 * drafts' own note; changing that would require a schema change, out of
 * scope here.
 *
 * Run with: npx tsx --env-file=.env.local scripts/ship-surface-treatment-vi-ja.ts
 * Safe to re-run: idempotent set() on a fixed _id.
 */
import { createClient } from 'next-sanity'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN env var. Run with:')
  console.error('  npx tsx --env-file=.env.local scripts/ship-surface-treatment-vi-ja.ts')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rvwbzxhf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const DOC_ID = 'workshop-surface-treatment'

async function main() {
  const doc = await client.getDocument(DOC_ID)
  if (!doc) throw new Error(`Document ${DOC_ID} not found`)

  const highlights = (doc.highlights as any[]).map((h) => {
    const viMap: Record<string, string> = {
      '高濕度／腐蝕環境應用': 'Ứng dụng trong môi trường độ ẩm cao / ăn mòn',
      '需絕緣的馬達／感測元件': 'Động cơ / linh kiện cảm biến cần cách điện',
      '複雜幾何形狀均勻覆蓋': 'Phủ đều trên các hình dạng phức tạp',
      '一般環境的經濟型防護': 'Giải pháp bảo vệ kinh tế cho môi trường thông thường',
    }
    const jaMap: Record<string, string> = {
      '高濕度／腐蝕環境應用': '高湿度・腐食環境での用途',
      '需絕緣的馬達／感測元件': '絶縁が必要なモーター・センサー部品',
      '複雜幾何形狀均勻覆蓋': '複雑な形状への均一な被膜',
      '一般環境的經濟型防護': '一般環境向けの経済的な保護',
    }
    return { ...h, vi: viMap[h.zh], ja: jaMap[h.zh] }
  })

  const columnsViJa: Record<string, { vi: string; ja: string }> = {
    '工藝': { vi: 'Quy trình', ja: '工程' },
    '特性': { vi: 'Đặc tính', ja: '特性' },
    '鹽霧測試 (SST)': { vi: 'Kiểm tra phun muối (SST)', ja: '塩水噴霧試験 (SST)' },
    '鍍層厚度': { vi: 'Độ dày lớp phủ', ja: '被膜厚さ' },
  }
  const columns = (doc.processTable.columns as any[]).map((c) => ({
    ...c,
    vi: columnsViJa[c.zh]?.vi,
    ja: columnsViJa[c.zh]?.ja,
  }))

  const rowsViJa: Record<string, { charVi: string; charJa: string; sstVi: string; sstJa: string }> = {
    'Ni-Cu-Ni': {
      charVi: 'Ni-Cu-Ni · phổ biến nhất · bề mặt kim loại · chống mài mòn',
      charJa: 'Ni-Cu-Ni · 最も一般的 · 金属光沢 · 耐摩耗性',
      sstVi: 'Đạt >48h',
      sstJa: '>48h まで',
    },
    'Epoxy': {
      charVi: 'Phun Epoxy · khả năng chống ăn mòn cao nhất · cách điện · màu đen mờ',
      charJa: 'エポキシ塗装 · 最高の耐食性 · 絶縁性 · 黒つや消し',
      sstVi: 'Đạt 500h',
      sstJa: '500h まで',
    },
    'E-coating': {
      charVi: 'Điện di (E-coating) · phủ đều · hình dạng phức tạp · cách điện',
      charJa: '電着塗装 · 均一な被膜 · 複雑形状対応 · 絶縁性',
      sstVi: 'Theo yêu cầu',
      sstJa: '要相談',
    },
    'Cu-Ni-P': {
      charVi: 'Cu-Ni-P · độ cứng cao · chống ăn mòn · mạ hóa học (electroless)',
      charJa: 'Cu-Ni-P · 高硬度 · 耐食性 · 無電解めっき',
      sstVi: 'Đạt 240h',
      sstJa: '240h まで',
    },
    'Zinc': {
      charVi: 'Kẽm (Zinc) · kinh tế · phù hợp môi trường thông thường',
      charJa: '亜鉛（Zinc）· 経済的 · 一般環境向け',
      sstVi: 'Đạt >24h',
      sstJa: '>24h まで',
    },
  }
  const rows = (doc.processTable.rows as any[]).map((r) => {
    const m = rowsViJa[r.process]
    return {
      ...r,
      characteristics: { ...r.characteristics, vi: m.charVi, ja: m.charJa },
      sst: { ...r.sst, vi: m.sstVi, ja: m.sstJa },
    }
  })

  const qsItemsViJa: Record<string, { labelVi: string; labelJa: string; valueVi: string; valueJa: string }> = {
    '附著力': { labelVi: 'Độ bám dính', labelJa: '密着性', valueVi: 'Kiểm tra Cross-cut (rạch ô lưới)', valueJa: 'クロスカット試験 (Cross-cut)' },
    '潔淨度': { labelVi: 'Độ sạch bề mặt', labelJa: '清浄度', valueVi: 'Kiểm tra Dyne (Dyne test)', valueJa: 'ダイン試験 (Dyne test)' },
    '耐蝕性': { labelVi: 'Khả năng chống ăn mòn', labelJa: '耐食性', valueVi: 'Phun muối trung tính (NSS / ASTM B117)', valueJa: '中性塩水噴霧試験 (NSS / ASTM B117)' },
  }
  const qsItems = (doc.qualityStandards.items as any[]).map((item) => {
    const m = qsItemsViJa[item.label.zh]
    return {
      ...item,
      label: { ...item.label, vi: m.labelVi, ja: m.labelJa },
      value: { ...item.value, vi: m.valueVi, ja: m.valueJa },
    }
  })

  await client
    .patch(DOC_ID)
    .set({
      cardTitle: { ...doc.cardTitle, vi: 'Xưởng Xử Lý Bề Mặt', ja: '表面処理工場' },
      cardDesc: {
        ...doc.cardDesc,
        vi: 'Năm quy trình mạ/phủ, được lựa chọn theo môi trường vận hành và yêu cầu độ tin cậy, với kiểm tra tiêu chuẩn hóa để đảm bảo tính nhất quán giữa các lô.',
        ja: '5種類のめっき／コーティング工程があり、使用環境と信頼性要件に応じて選定、標準化された試験によりロット間の一貫性を確保します。',
      },
      intro: {
        ...doc.intro,
        vi: 'Nam châm NdFeB dễ bị oxy hóa do độ ẩm; xử lý bề mặt quyết định tuổi thọ của nam châm trong điều kiện thực tế. SINOWIN cung cấp năm quy trình mạ/phủ, được lựa chọn theo môi trường sử dụng, phương pháp lắp ráp và yêu cầu độ tin cậy, với kiểm tra tiêu chuẩn hóa để đảm bảo tính nhất quán giữa các lô.',
        ja: 'NdFeB磁石は湿気による酸化が起こりやすく、表面処理が実使用環境における寿命を左右します。SINOWINは使用環境、組み立て方法、信頼性要件に応じて選定できる5種類のめっき／コーティング工程を提供し、標準化された試験によりロット間の一貫性を確保しています。',
      },
      highlights,
      'processTable.columns': columns,
      'processTable.rows': rows,
      disclaimer: {
        ...doc.disclaimer,
        vi: 'Số liệu phun muối là giá trị thử nghiệm có thể đạt được trong điều kiện cụ thể; tiêu chuẩn nghiệm thu thực tế được xác nhận theo quy cách của từng dự án và yêu cầu bản vẽ. Độ dày lớp phủ tiêu chuẩn là 10–20μm, có thể điều chỉnh theo yêu cầu tùy chỉnh.',
        ja: '塩水噴霧試験の数値は特定条件下で達成可能な試験値であり、実際の合否基準はプロジェクト仕様および図面要件に基づき確認します。標準被膜厚さは10–20μmで、カスタム要件に応じて調整可能です。',
      },
      'qualityStandards.title': { ...doc.qualityStandards.title, vi: 'Tiêu chuẩn kiểm tra chất lượng', ja: '品質検査基準' },
      'qualityStandards.items': qsItems,
    })
    .commit()

  console.log('done')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
