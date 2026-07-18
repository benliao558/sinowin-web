import { defineType, defineField } from 'sanity'

// One line of a table-based workshop's quality inspection standards list,
// e.g. label "Adhesion" -> value "Cross-cut test".
export default defineType({
  name: 'qualityStandardItem',
  title: 'Quality standard item',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label (e.g. "Adhesion")', type: 'localeString' }),
    defineField({ name: 'value', title: 'Value (e.g. "Cross-cut test")', type: 'localeString' }),
  ],
  preview: {
    select: { title: 'label.zh', subtitle: 'value.zh' },
  },
})
