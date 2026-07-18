import { defineType, defineField } from 'sanity'

// One photo in a table-based workshop's gallery strip (used by Surface
// Treatment instead of equipment tabs). gallery[0] doubles as the card/hero
// image and is skipped in the modal's "other process photos" grid.
export default defineType({
  name: 'workshopGalleryImage',
  title: 'Gallery image',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'alt', title: 'Alt text (not translated -- same for all languages)', type: 'string' }),
  ],
  preview: {
    select: { title: 'alt', media: 'image' },
  },
})
