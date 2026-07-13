import { defineType, defineField } from 'sanity'

// One document per LinkedIn sync attempt, written by src/app/api/linkedin/sync/route.ts.
// Presence of a "success" entry for an article is also the dedup check that
// prevents re-posting on republish/edit -- see that route for details.
export default defineType({
  name: 'linkedinSyncLog',
  title: 'LinkedIn Sync Log',
  type: 'document',
  fields: [
    defineField({
      name: 'article',
      title: 'Article',
      type: 'reference',
      to: [{ type: 'article' }],
      readOnly: true,
    }),
    defineField({ name: 'articleTitle', title: 'Article title (zh)', type: 'string', readOnly: true }),
    defineField({ name: 'articleSlug', title: 'Article slug', type: 'string', readOnly: true }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      readOnly: true,
      options: { list: [{ title: 'Success', value: 'success' }, { title: 'Failed', value: 'failed' }] },
    }),
    defineField({ name: 'locale', title: 'Content locale used', type: 'string', readOnly: true }),
    defineField({ name: 'postUrn', title: 'LinkedIn post URN', type: 'string', readOnly: true }),
    defineField({ name: 'errorMessage', title: 'Error message', type: 'text', readOnly: true }),
    defineField({ name: 'attemptedAt', title: 'Attempted at', type: 'datetime', readOnly: true }),
  ],
  orderings: [
    { title: 'Most recent first', name: 'attemptedAtDesc', by: [{ field: 'attemptedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'articleTitle', status: 'status', attemptedAt: 'attemptedAt' },
    prepare({ title, status, attemptedAt }) {
      return {
        title: title || '(untitled)',
        subtitle: `${status === 'success' ? '✅' : '❌'} ${attemptedAt || ''}`,
      }
    },
  },
})
