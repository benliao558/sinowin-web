import { defineType, defineField } from 'sanity'

// Powers the "Join Our Team" modal (src/components/CareersModal.tsx).
// isActive=false keeps the document (and its content) around without
// showing it on the site, so re-opening a position later doesn't mean
// re-typing everything.
export default defineType({
  name: 'jobOpening',
  title: 'Job Opening',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Job Title', type: 'localeString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'department', title: 'Department', type: 'localeString' }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'localeString',
      initialValue: { zh: '越南北寧', en: 'Bac Ninh, Vietnam', vi: 'Bắc Ninh, Việt Nam', ja: 'ベトナム・バクニン' },
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'localeString',
      initialValue: { zh: '全職', en: 'Full-time', vi: 'Toàn thời gian', ja: '正社員' },
    }),
    defineField({ name: 'description', title: 'Description / Requirements', type: 'localeText' }),
    defineField({
      name: 'isActive',
      title: 'Currently open (visible on site)',
      description: 'Turn off to hide from the site without deleting the listing -- turn back on to re-open it.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'postedDate',
      title: 'Posted date',
      description: 'Used to sort listings newest-first.',
      type: 'date',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
  ],
  orderings: [
    { title: 'Posted date, newest first', name: 'postedDateDesc', by: [{ field: 'postedDate', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title.zh', dept: 'department.zh', active: 'isActive', posted: 'postedDate' },
    prepare({ title, dept, active, posted }) {
      return {
        title: title || '(untitled)',
        subtitle: `${active ? '🟢 Open' : '⚪ Closed'}${dept ? ' · ' + dept : ''}${posted ? ' · ' + posted : ''}`,
      }
    },
  },
})
