import { defineType, defineField } from 'sanity'

// Maps to src/content/articles.ts. One document per article; slug/date/
// category/coverImage are shared across languages, title/excerpt/content/
// meta fields are localized (zh/en/vi/ja).
export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'Same URL slug is used for all 4 languages, e.g. /en/articles/magnet-surface',
      options: { source: 'title.zh', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'publishDate', title: 'Publish date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Industry', value: 'industry' },
          { title: 'Supply Chain', value: 'supply-chain' },
          { title: 'Technical', value: 'technical' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      description: 'Shared across all 4 languages (no per-language cover image today).',
    }),
    defineField({ name: 'title', title: 'Title', type: 'localeString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'localeText', validation: (Rule) => Rule.required() }),
    defineField({ name: 'content', title: 'Body', type: 'localeBlockContent' }),
    defineField({ name: 'metaTitle', title: 'SEO title (optional)', type: 'localeString' }),
    defineField({ name: 'metaDescription', title: 'SEO description (optional)', type: 'localeText' }),
  ],
  preview: {
    select: { title: 'title.zh', subtitle: 'slug.current', media: 'coverImage' },
  },
})
