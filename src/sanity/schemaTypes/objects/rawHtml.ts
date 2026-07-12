import { defineType, defineField } from 'sanity'

// Escape hatch for content that doesn't fit Portable Text's block model —
// e.g. the grade-comparison <table> in the "hre-free-ndfeb-thermal-showdown"
// article. Editors should avoid this unless they genuinely need raw markup;
// prefer normal blocks/lists wherever possible.
export default defineType({
  name: 'rawHtml',
  title: 'Raw HTML block (advanced — tables etc.)',
  type: 'object',
  fields: [
    defineField({
      name: 'html',
      title: 'HTML',
      type: 'text',
      rows: 6,
      description: 'Raw HTML, inserted as-is. Only use for things a normal block/list can\'t express, like data tables.',
    }),
  ],
  preview: {
    select: { html: 'html' },
    prepare({ html }) {
      return { title: '[Raw HTML]', subtitle: html ? html.slice(0, 60) : '' }
    },
  },
})
