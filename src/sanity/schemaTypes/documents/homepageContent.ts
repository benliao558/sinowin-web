import { defineType, defineField } from 'sanity'

// Singleton -- maps to siteContent.home in src/content/site.ts
// (hero, supplyChain, capacity sections).
export default defineType({
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero title', type: 'localeString' }),
    defineField({ name: 'heroSubtitle', title: 'Hero subtitle', type: 'localeString' }),
    defineField({ name: 'supplyChainTitle', title: 'Supply chain section title', type: 'localeString' }),
    defineField({ name: 'supplyChainBody', title: 'Supply chain section body', type: 'localeText' }),
    defineField({ name: 'capacityTitle', title: 'Capacity section title', type: 'localeString' }),
    defineField({ name: 'annualCapacity', title: 'Annual capacity line', type: 'localeText' }),
    defineField({ name: 'service', title: 'Service description line', type: 'localeText' }),
    defineField({ name: 'tempGrades', title: 'Temperature grades line', type: 'localeText' }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Content' }
    },
  },
})
