import { defineType, defineField } from 'sanity'

// One row of a table-based workshop's process comparison table (used by
// Surface Treatment instead of equipment tabs), e.g. process "Ni-Cu-Ni",
// characteristics "most common, metallic finish", SST "Up to >48h",
// thickness "10-20μm".
export default defineType({
  name: 'processTableRow',
  title: 'Process table row',
  type: 'object',
  fields: [
    defineField({
      name: 'process',
      title: 'Process name (e.g. "Ni-Cu-Ni" -- not translated, same for all languages)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'characteristics', title: 'Characteristics', type: 'localeString' }),
    defineField({ name: 'sst', title: 'Salt spray test (SST) rating', type: 'localeString' }),
    defineField({
      name: 'thickness',
      title: 'Coating thickness (e.g. "10–20μm" -- not translated, same for all languages)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'process', subtitle: 'thickness' },
  },
})
