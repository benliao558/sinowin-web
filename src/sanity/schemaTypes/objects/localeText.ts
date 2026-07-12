import { defineType, defineField } from 'sanity'

// A longer, multi-line plain-text value in all 4 site languages (excerpts,
// body paragraphs that don't need rich formatting). Same zh-required /
// others-optional convention as localeString.
export default defineType({
  name: 'localeText',
  title: 'Localized text (long)',
  type: 'object',
  fields: [
    defineField({ name: 'zh', title: '中文', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
    defineField({ name: 'vi', title: 'Tiếng Việt', type: 'text', rows: 4 }),
    defineField({ name: 'ja', title: '日本語', type: 'text', rows: 4 }),
  ],
})
