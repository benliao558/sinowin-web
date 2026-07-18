/**
 * One-time fix: the Arafura article's slug.current was mistakenly set to a
 * working title ("Australian rare earth developer Arafura", with spaces)
 * instead of a kebab-case slug. Corrects it in place (same _id, only the
 * slug field changes) so all other fields/content stay untouched.
 *
 * Run with: npx tsx --env-file=.env.local scripts/fix-arafura-slug.ts
 * Safe to re-run: idempotent set() on a fixed _id.
 */
import { createClient } from 'next-sanity'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN env var. Run with:')
  console.error('  npx tsx --env-file=.env.local scripts/fix-arafura-slug.ts')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rvwbzxhf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const DOC_ID = 'f2d57009-c92d-464a-ab2c-5a82516c5698'
const NEW_SLUG = 'arafura-india-rare-earth-supply-chain'

async function main() {
  const before = await client.getDocument(DOC_ID)
  console.log('before:', before?.slug)

  await client
    .patch(DOC_ID)
    .set({ slug: { _type: 'slug', current: NEW_SLUG } })
    .commit()

  const after = await client.getDocument(DOC_ID)
  console.log('after:', after?.slug)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
