import { defineType, defineField } from 'sanity'

// One technical bullet point inside a workshop tab, e.g.
// "Core advantage: " + "Runs 400-600 diamond wires simultaneously...".
// Matches the [label, text] tuple in workshops.ts WorkshopTab.points.
export default defineType({
  name: 'workshopPoint',
  title: 'Technical point',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label (e.g. "Core advantage:")', type: 'localeString' }),
    defineField({ name: 'text', title: 'Description', type: 'localeText' }),
  ],
  preview: {
    select: { title: 'label.zh', subtitle: 'text.zh' },
  },
})
