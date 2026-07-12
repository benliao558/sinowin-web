import { defineType, defineField } from 'sanity'

// Singleton -- maps to siteContent.manufacturing in src/content/site.ts.
// Just the page title + one-line intro; the actual per-workshop content
// lives in the separate `workshop` document type.
export default defineType({
  name: 'manufacturingIntro',
  title: 'Manufacturing Page Intro',
  type: 'document',
  fields: [
    defineField({ name: 'pageTitle', title: 'Page title', type: 'localeString' }),
    defineField({ name: 'intro', title: 'Intro', type: 'localeText' }),
  ],
  preview: {
    prepare() {
      return { title: 'Manufacturing Page Intro' }
    },
  },
})
