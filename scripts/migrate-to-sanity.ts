/**
 * One-time migration: src/content/{articles,workshops,site,faq}.ts -> Sanity.
 *
 * Run with: SANITY_API_TOKEN=<token> npx tsx scripts/migrate-to-sanity.ts
 *
 * Safe to re-run: every document gets a deterministic _id and is written
 * with createOrReplace, so re-running just overwrites the same migrated
 * documents rather than duplicating them. It never touches any document
 * whose _id/slug isn't one of these deterministic ones -- in particular it
 * never looks at or touches the "lynas" test article (a random Sanity
 * _id, slug "lynas", not present in articles.ts).
 */
import { createClient } from 'next-sanity'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { articles as sourceArticles } from '../src/content/articles'
import { workshops as sourceWorkshops } from '../src/content/workshops'
import { siteContent } from '../src/content/site'
import { faqItems as sourceFaqItems } from '../src/content/faq'
import { SINGLETON_ID } from '../src/sanity/schemaTypes'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const publicDir = path.join(projectRoot, 'public')

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN env var. Get an Editor-level token from')
  console.error('https://www.sanity.io/manage -> project rvwbzxhf -> API -> Tokens')
  console.error('then run: SANITY_API_TOKEN=<token> npx tsx scripts/migrate-to-sanity.ts')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rvwbzxhf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// ---------- shared helpers ----------

function randKey(): string {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

const imageAssetCache = new Map<string, string>() // public-relative path -> asset _id

async function uploadImage(publicRelativePath: string | undefined): Promise<{ _type: 'image'; asset: { _type: 'reference'; _ref: string } } | undefined> {
  if (!publicRelativePath) return undefined
  const cached = imageAssetCache.get(publicRelativePath)
  if (cached) return { _type: 'image', asset: { _type: 'reference', _ref: cached } }

  const absPath = path.join(publicDir, publicRelativePath.replace(/^\//, ''))
  if (!fs.existsSync(absPath)) {
    console.warn(`  [warn] image not found on disk, skipping: ${publicRelativePath}`)
    return undefined
  }
  const buffer = fs.readFileSync(absPath)
  const asset = await client.assets.upload('image', buffer, { filename: path.basename(absPath) })
  imageAssetCache.set(publicRelativePath, asset._id)
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

// ---------- HTML -> Portable Text (tailored to this project's own content) ----------
// The existing article HTML only ever uses <p>, <h2>, <ul><li>, <strong>,
// and (in exactly one article) a <table> for a grade-comparison chart.
// A small hand-written parser is more predictable here than a generic
// HTML->Portable-Text library for a one-time, fully-inspected migration.

function parseInlineSpans(html: string) {
  const spans: any[] = []
  let rest = html
  const strongRe = /<strong>([\s\S]*?)<\/strong>/
  while (rest.length > 0) {
    const m = rest.match(strongRe)
    if (!m || m.index === undefined) {
      if (rest) spans.push({ _type: 'span', _key: randKey(), text: decodeEntities(rest), marks: [] })
      break
    }
    if (m.index > 0) {
      spans.push({ _type: 'span', _key: randKey(), text: decodeEntities(rest.slice(0, m.index)), marks: [] })
    }
    spans.push({ _type: 'span', _key: randKey(), text: decodeEntities(m[1]), marks: ['strong'] })
    rest = rest.slice(m.index + m[0].length)
  }
  return spans.length > 0 ? spans : [{ _type: 'span', _key: randKey(), text: '', marks: [] }]
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function htmlToPortableText(html: string): any[] {
  if (!html) return []
  const blocks: any[] = []
  // top-level tag matcher: <p>, <h2>, <h3>, <ul>, <ol>, <table>
  const topRe = /<(p|h2|h3|ul|ol|table)>([\s\S]*?)<\/\1>/g
  let match: RegExpExecArray | null
  while ((match = topRe.exec(html))) {
    const [, tag, inner] = match
    if (tag === 'table') {
      blocks.push({ _type: 'rawHtml', _key: randKey(), html: `<table>${inner}</table>` })
    } else if (tag === 'p') {
      blocks.push({ _type: 'block', _key: randKey(), style: 'normal', markDefs: [], children: parseInlineSpans(inner) })
    } else if (tag === 'h2' || tag === 'h3') {
      blocks.push({ _type: 'block', _key: randKey(), style: tag, markDefs: [], children: parseInlineSpans(inner) })
    } else if (tag === 'ul' || tag === 'ol') {
      const liRe = /<li>([\s\S]*?)<\/li>/g
      let liMatch: RegExpExecArray | null
      while ((liMatch = liRe.exec(inner))) {
        blocks.push({
          _type: 'block',
          _key: randKey(),
          style: 'normal',
          markDefs: [],
          listItem: tag === 'ul' ? 'bullet' : 'number',
          level: 1,
          children: parseInlineSpans(liMatch[1]),
        })
      }
    }
  }
  return blocks
}

function remapZhHant<T extends Record<string, any>>(translations: Partial<Record<string, T>>): { zh?: T; en?: T; vi?: T; ja?: T } {
  return {
    zh: translations['zh-Hant'],
    en: translations['en'],
    vi: translations['vi'],
    ja: translations['ja'],
  }
}

function localeStringField(obj: { zh?: string; en?: string; vi?: string; ja?: string } | undefined) {
  if (!obj) return undefined
  return { _type: 'localeString', zh: obj.zh, en: obj.en, vi: obj.vi, ja: obj.ja }
}

function localeTextField(obj: { zh?: string; en?: string; vi?: string; ja?: string } | undefined) {
  if (!obj) return undefined
  return { _type: 'localeText', zh: obj.zh, en: obj.en, vi: obj.vi, ja: obj.ja }
}

// ---------- migrate articles ----------

async function migrateArticles() {
  console.log(`\n=== Articles (${sourceArticles.length}) ===`)
  for (const a of sourceArticles) {
    const tr = remapZhHant(a.translations as any)
    const coverImage = await uploadImage(a.coverImage)

    const doc = {
      _id: `article-${a.slug}`,
      _type: 'article',
      slug: { _type: 'slug', current: a.slug },
      publishDate: a.publishDate,
      category: a.category,
      ...(coverImage ? { coverImage } : {}),
      title: localeStringField({ zh: tr.zh?.title, en: tr.en?.title, vi: tr.vi?.title, ja: tr.ja?.title }),
      excerpt: localeTextField({ zh: tr.zh?.excerpt, en: tr.en?.excerpt, vi: tr.vi?.excerpt, ja: tr.ja?.excerpt }),
      content: {
        _type: 'localeBlockContent',
        zh: tr.zh?.content ? htmlToPortableText(tr.zh.content) : undefined,
        en: tr.en?.content ? htmlToPortableText(tr.en.content) : undefined,
        vi: tr.vi?.content ? htmlToPortableText(tr.vi.content) : undefined,
        ja: tr.ja?.content ? htmlToPortableText(tr.ja.content) : undefined,
      },
      ...(tr.zh?.metaTitle || tr.en?.metaTitle
        ? { metaTitle: localeStringField({ zh: tr.zh?.metaTitle, en: tr.en?.metaTitle, vi: tr.vi?.metaTitle, ja: tr.ja?.metaTitle }) }
        : {}),
      ...(tr.zh?.metaDescription || tr.en?.metaDescription
        ? { metaDescription: localeTextField({ zh: tr.zh?.metaDescription, en: tr.en?.metaDescription, vi: tr.vi?.metaDescription, ja: tr.ja?.metaDescription }) }
        : {}),
    }

    await client.createOrReplace(doc)
    console.log(`  ok: ${a.slug}`)
  }
}

// ---------- migrate workshops ----------

async function migrateWorkshops() {
  console.log(`\n=== Workshops (${sourceWorkshops.length}) ===`)
  for (const w of sourceWorkshops) {
    const cardImage = await uploadImage(w.cardImage)
    const tabs = []
    for (const tab of w.tabs) {
      const img = await uploadImage(tab.img)
      tabs.push({
        _key: randKey(),
        key: tab.key,
        title: localeStringField(tab.title as any),
        sub: tab.sub?.zh, // sub was only ever populated under the zh key; now a shared plain string
        ...(img ? { img } : {}),
        points: tab.points.map(([label, text]) => ({
          _key: randKey(),
          label: localeStringField(label as any),
          text: localeTextField(text as any),
        })),
      })
    }

    const doc: any = {
      _id: `workshop-${w.id}`,
      _type: 'workshop',
      workshopId: { _type: 'slug', current: w.id },
      ...(cardImage ? { cardImage } : {}),
      badge: (w.badge as any)?.zh, // badge was identical across languages; now a shared plain string
      cardTitle: localeStringField(w.cardTitle as any),
      cardDesc: localeTextField(w.cardDesc as any),
      subtitle: localeStringField(w.subtitle as any),
      intro: localeTextField(w.intro as any),
      whyTitle: localeStringField(w.whyTitle as any),
      whyBody: localeTextField(w.whyBody as any),
      highlights: w.highlights.map((h) => ({ _key: randKey(), ...localeStringField(h as any) })),
      tabs,
    }
    if (w.deliverTitle) doc.deliverTitle = localeStringField(w.deliverTitle as any)
    if (w.deliverItems) doc.deliverItems = w.deliverItems.map((d) => ({ _key: randKey(), ...localeStringField(d as any) }))

    await client.createOrReplace(doc)
    console.log(`  ok: ${w.id}`)
  }
}

// ---------- migrate certifications ----------

const CERT_BADGE_IMAGES: Record<string, string> = {
  iso9001: '/assets/workshops/iso-9001.webp',
  iso14001: '/assets/workshops/iso-14001.webp',
  iso45001: '/assets/workshops/iso-45001.webp',
  qc080000: '/assets/workshops/qc-080000.webp',
}

async function migrateCertifications() {
  console.log(`\n=== Certifications (${siteContent.certifications.length}) ===`)
  for (const c of siteContent.certifications) {
    const badgeImage = await uploadImage(CERT_BADGE_IMAGES[c.id])
    const doc: any = {
      _id: `certification-${c.id}`,
      _type: 'certification',
      certId: { _type: 'slug', current: c.id },
      name: c.name,
      confirmed: c.confirmed,
    }
    if (badgeImage) doc.badgeImage = badgeImage
    await client.createOrReplace(doc)
    console.log(`  ok: ${c.id}`)
  }
}

// ---------- migrate FAQ ----------

async function migrateFaq() {
  console.log(`\n=== FAQ (${sourceFaqItems.length}) ===`)
  for (let i = 0; i < sourceFaqItems.length; i++) {
    const item = sourceFaqItems[i]
    const doc = {
      _id: `faqItem-${i + 1}`,
      _type: 'faqItem',
      question: localeStringField(item.q as any),
      answer: localeTextField(item.a as any),
      order: i + 1,
    }
    await client.createOrReplace(doc)
    console.log(`  ok: #${i + 1}`)
  }
}

// ---------- migrate singletons ----------

async function migrateSingletons() {
  console.log(`\n=== Singletons ===`)

  await client.createOrReplace({
    _id: SINGLETON_ID.companyInfo,
    _type: 'companyInfo',
    name: localeStringField(siteContent.company.name as any),
    tagline: localeStringField(siteContent.company.tagline as any),
    description: localeTextField(siteContent.company.description as any),
  })
  console.log('  ok: companyInfo')

  await client.createOrReplace({
    _id: SINGLETON_ID.homepageContent,
    _type: 'homepageContent',
    heroTitle: localeStringField(siteContent.home.hero.title as any),
    heroSubtitle: localeStringField(siteContent.home.hero.subtitle as any),
    supplyChainTitle: localeStringField(siteContent.home.supplyChain.title as any),
    supplyChainBody: localeTextField(siteContent.home.supplyChain.body as any),
    capacityTitle: localeStringField(siteContent.home.capacity.title as any),
    annualCapacity: localeTextField(siteContent.home.capacity.annualCapacity as any),
    service: localeTextField(siteContent.home.capacity.service as any),
    tempGrades: localeTextField(siteContent.home.capacity.tempGrades as any),
  })
  console.log('  ok: homepageContent')

  await client.createOrReplace({
    _id: SINGLETON_ID.manufacturingIntro,
    _type: 'manufacturingIntro',
    pageTitle: localeStringField(siteContent.manufacturing.pageTitle as any),
    intro: localeTextField(siteContent.manufacturing.intro as any),
  })
  console.log('  ok: manufacturingIntro')

  await client.createOrReplace({
    _id: SINGLETON_ID.navLabels,
    _type: 'navLabels',
    home: localeStringField(siteContent.nav.home as any),
    manufacturing: localeStringField(siteContent.nav.manufacturing as any),
    about: localeStringField(siteContent.nav.about as any),
    faq: localeStringField(siteContent.nav.faq as any),
    articles: localeStringField(siteContent.nav.articles as any),
    contact: localeStringField(siteContent.nav.contact as any),
  })
  console.log('  ok: navLabels')
}

async function main() {
  console.log('Migrating src/content/*.ts -> Sanity project', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rvwbzxhf')
  console.log('This never touches the "lynas" test article (different, non-deterministic _id/slug).')

  await migrateArticles()
  await migrateWorkshops()
  await migrateCertifications()
  await migrateFaq()
  await migrateSingletons()

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
