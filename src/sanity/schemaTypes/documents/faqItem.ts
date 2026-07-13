import { defineType, defineField } from 'sanity'

// Maps to src/content/faq.ts (NOT siteContent.faq in site.ts, which is a
// stale/empty leftover -- see planning notes). One document per Q&A pair.
export default defineType({
  name: 'faqItem',
  title: 'FAQ item',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'localeString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'localeText', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers show first. Matches the current fixed Q1-Q10 order in faq.ts.',
    }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'question.zh', subtitle: 'order' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle !== undefined ? `#${subtitle}` : '' }
    },
  },
})
