import { defineType, defineField } from 'sanity'

// Maps to src/content/workshops.ts. One document per manufacturing
// workshop (7 today: multi-wire-cutting, laser-cutting, grinding,
// chamfering, assembly-magnetizing, testing-lab, fixture-tooling).
export default defineType({
  name: 'workshop',
  title: 'Workshop',
  type: 'document',
  fields: [
    defineField({
      name: 'workshopId',
      title: 'Workshop ID',
      type: 'slug',
      description: 'Stable code used in the site, e.g. "multi-wire-cutting". Not shown to visitors.',
      options: { source: 'cardTitle.zh', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'cardImage', title: 'Card / hero image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'badge',
      title: 'Badge label (e.g. "MULTI-WIRE CUTTING" — same text for all languages, not translated)',
      type: 'string',
    }),
    defineField({ name: 'cardTitle', title: 'Card title', type: 'localeString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'cardDesc', title: 'Card description', type: 'localeText' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'localeString' }),
    defineField({ name: 'intro', title: 'Intro', type: 'localeText' }),
    defineField({ name: 'whyTitle', title: '"Why choose this workshop" title', type: 'localeString' }),
    defineField({ name: 'whyBody', title: '"Why choose this workshop" body', type: 'localeText' }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'tabs',
      title: 'Equipment tabs (not used if this workshop has a Process table instead, e.g. Surface Treatment)',
      type: 'array',
      of: [{ type: 'workshopTab' }],
      validation: (Rule) =>
        Rule.custom((tabs, context) => {
          const hasProcessTable = !!(context.document as { processTable?: unknown } | undefined)?.processTable
          if (hasProcessTable) return true
          const count = Array.isArray(tabs) ? tabs.length : 0
          if (count < 1) return 'Required unless this workshop has a Process table instead'
          if (count > 3) return 'Maximum 3 tabs'
          return true
        }),
    }),
    defineField({
      name: 'deliverTitle',
      title: 'Deliverables title (optional — currently only used by Chamfering)',
      type: 'localeString',
    }),
    defineField({
      name: 'deliverItems',
      title: 'Deliverables list (optional)',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'processTable',
      title: 'Process comparison table (optional — used instead of Equipment tabs by table-based workshops like Surface Treatment)',
      type: 'object',
      fields: [
        defineField({ name: 'columns', title: 'Column headers', type: 'array', of: [{ type: 'localeString' }] }),
        defineField({ name: 'rows', title: 'Rows', type: 'array', of: [{ type: 'processTableRow' }] }),
      ],
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer (optional — used with Process table)',
      type: 'localeText',
    }),
    defineField({
      name: 'qualityStandards',
      title: 'Quality inspection standards (optional — used with Process table)',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'localeString' }),
        defineField({ name: 'items', title: 'Items', type: 'array', of: [{ type: 'qualityStandardItem' }] }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery photos (optional — used with Process table; gallery[0] doubles as the card/hero image and is skipped in the "other photos" grid)',
      type: 'array',
      of: [{ type: 'workshopGalleryImage' }],
    }),
  ],
  preview: {
    select: { title: 'cardTitle.zh', subtitle: 'workshopId.current', media: 'cardImage' },
  },
})
