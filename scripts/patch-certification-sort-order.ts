/**
 * One-time backfill (2026-07-27): set `sortOrder` on the 7 existing
 * certification-* documents to match the display order the homepage used
 * before this field existed (src/content/site.ts certifications array),
 * so adding the field doesn't reshuffle the "認證與管理體系" section.
 *
 * Only patches the `sortOrder` field on documents with a `certification-`
 * _id prefix -- never touches any other field or document type.
 *
 * Run with: npx tsx --env-file=.env.local scripts/patch-certification-sort-order.ts
 * Safe to re-run: patch().set() with the same values is idempotent.
 */
import { createClient } from 'next-sanity'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN env var. Run with:')
  console.error('  npx tsx --env-file=.env.local scripts/patch-certification-sort-order.ts')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rvwbzxhf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const ORDER = ['iso9001', 'iso14001', 'iso45001', 'qc080000', 'iatf16949', 'rba', 'esci']

async function main() {
  for (let i = 0; i < ORDER.length; i++) {
    const id = `certification-${ORDER[i]}`
    await client.patch(id).set({ sortOrder: i }).commit({ autoGenerateArrayKeys: true }).catch((err) => {
      console.warn(`  [warn] could not patch ${id}: ${err.message}`)
    })
    console.log(`  ok: ${id} -> sortOrder ${i}`)
  }
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
