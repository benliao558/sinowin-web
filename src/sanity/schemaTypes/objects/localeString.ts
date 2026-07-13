import { defineType, defineField } from 'sanity'

// A short single-line text value in all 4 site languages. zh is the source
// of truth (see src/lib/i18n.ts fallback chain: en falls back to zh, vi/ja
// fall back to en then zh) so it's the only one marked required.
export default defineType({
  name: 'localeString',
  title: 'Localized text (short)',
  type: 'object',
  fields: [
    defineField({ name: 'zh', title: '中文', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'vi', title: 'Tiếng Việt', type: 'string' }),
    defineField({ name: 'ja', title: '日本語', type: 'string' }),
  ],
})
