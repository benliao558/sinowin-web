import { defineType, defineField } from 'sanity'

// Singleton -- maps to siteContent.company in src/content/site.ts.
// Only one instance of this document should ever exist (enforced in
// sanity/structure.ts, not by the schema itself).
export default defineType({
  name: 'companyInfo',
  title: 'Company Info',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Company name', type: 'localeString' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'localeString' }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
  ],
  preview: {
    prepare() {
      return { title: 'Company Info' }
    },
  },
})
