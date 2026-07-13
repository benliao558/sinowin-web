import { defineType, defineField } from 'sanity'

// One of the 3 equipment tabs inside a workshop's detail panel
// (e.g. "mw" / "feed" / "qc" inside the multi-wire-cutting workshop).
export default defineType({
  name: 'workshopTab',
  title: 'Equipment tab',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Key (short code, e.g. "mw", "feed" — used in code, not shown to visitors)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title', title: 'Tab title', type: 'localeString', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'sub',
      title: 'Sub-label (e.g. "Throughput · Accuracy" — kept in English for all languages, not translated)',
      type: 'string',
    }),
    defineField({
      name: 'img',
      title: 'Tab image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'points',
      title: 'Technical points',
      type: 'array',
      of: [{ type: 'workshopPoint' }],
      validation: (Rule) => Rule.min(1).max(3),
    }),
  ],
  preview: {
    select: { title: 'title.zh', subtitle: 'key' },
  },
})
