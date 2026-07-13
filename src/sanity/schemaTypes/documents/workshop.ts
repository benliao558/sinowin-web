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
      title: 'Equipment tabs',
      type: 'array',
      of: [{ type: 'workshopTab' }],
      validation: (Rule) => Rule.min(1).max(3),
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
  ],
  preview: {
    select: { title: 'cardTitle.zh', subtitle: 'workshopId.current', media: 'cardImage' },
  },
})
