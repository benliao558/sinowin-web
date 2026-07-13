import { defineType, defineField } from 'sanity'

// Maps to siteContent.certifications in src/content/site.ts. Adds a
// badgeImage field that doesn't exist in the current TS data (badges are
// hardcoded per-id in [lang]/page.tsx) -- agreed in planning so certs like
// IATF 16949 can get their official badge uploaded directly in Studio.
export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({
      name: 'certId',
      title: 'Certification ID',
      type: 'slug',
      description: 'Stable code, e.g. "iso9001". Not shown to visitors.',
      options: { source: 'name', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Display name',
      type: 'string',
      description: 'Proper noun / standard name (e.g. "ISO 9001") — same across all languages, not translated.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'confirmed',
      title: 'Obtained?',
      type: 'boolean',
      description: 'On = obtained (shown in color). Off = under audit / not yet obtained (shown grayscale with "Under Audit" label).',
      initialValue: false,
    }),
    defineField({
      name: 'badgeImage',
      title: 'Badge image (optional)',
      type: 'image',
      description: 'Official certification badge/logo. Falls back to a plain text label if not set.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'confirmed', media: 'badgeImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? 'Obtained' : 'Under audit', media }
    },
  },
})
