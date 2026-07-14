import { defineType, defineField } from 'sanity'

// Singleton -- maps to siteContent.nav in src/content/site.ts.
export default defineType({
  name: 'navLabels',
  title: 'Navigation Labels',
  type: 'document',
  fields: [
    defineField({ name: 'home', title: 'Home', type: 'localeString' }),
    defineField({ name: 'manufacturing', title: 'Manufacturing', type: 'localeString' }),
    defineField({ name: 'about', title: 'About', type: 'localeString' }),
    defineField({ name: 'faq', title: 'FAQ', type: 'localeString' }),
    defineField({ name: 'articles', title: 'Articles', type: 'localeString' }),
    defineField({ name: 'careers', title: 'Careers', type: 'localeString' }),
    defineField({ name: 'contact', title: 'Contact', type: 'localeString' }),
  ],
  preview: {
    prepare() {
      return { title: 'Navigation Labels' }
    },
  },
})
