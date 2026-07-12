import { defineType, defineField, defineArrayMember } from 'sanity'

// Rich-text article body in all 4 languages. Each language is a normal
// Portable Text array (headings, paragraphs, bold, bullet lists — matches
// the <h2>/<p>/<ul>/<strong> tags actually used in the existing HTML
// content). A `rawHtml` block is included as an escape hatch for the one
// known exception: the grade-comparison <table> in the
// "hre-free-ndfeb-thermal-showdown" article, which doesn't map to a
// standard Portable Text block.
const blockArray = {
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading (H2)', value: 'h2' },
        { title: 'Heading (H3)', value: 'h3' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
      },
    }),
    defineArrayMember({ type: 'rawHtml' }),
  ],
}

export default defineType({
  name: 'localeBlockContent',
  title: 'Localized rich text',
  type: 'object',
  fields: [
    defineField({ name: 'zh', title: '中文', ...blockArray, validation: (Rule) => Rule.required() }),
    defineField({ name: 'en', title: 'English', ...blockArray }),
    defineField({ name: 'vi', title: 'Tiếng Việt', ...blockArray }),
    defineField({ name: 'ja', title: '日本語', ...blockArray }),
  ],
})
