import type { StructureResolver } from 'sanity/structure'
import { SINGLETON_ID, SINGLETON_TYPES } from './schemaTypes'

// Custom Studio sidebar: repeatable content up top, singletons pinned to a
// single fixed document each (no "create new" / list view for those, since
// there should only ever be one Company Info, one Homepage Content, etc.)
export const structure: StructureResolver = (S) =>
  S.list()
    .title('SINOWIN Content')
    .items([
      S.documentTypeListItem('article').title('Articles'),
      S.documentTypeListItem('workshop').title('Workshops'),
      S.documentTypeListItem('faqItem').title('FAQ'),
      S.documentTypeListItem('certification').title('Certifications'),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('Company Info')
                .child(S.document().schemaType('companyInfo').documentId(SINGLETON_ID.companyInfo)),
              S.listItem()
                .title('Homepage Content')
                .child(S.document().schemaType('homepageContent').documentId(SINGLETON_ID.homepageContent)),
              S.listItem()
                .title('Manufacturing Page Intro')
                .child(S.document().schemaType('manufacturingIntro').documentId(SINGLETON_ID.manufacturingIntro)),
              S.listItem()
                .title('Navigation Labels')
                .child(S.document().schemaType('navLabels').documentId(SINGLETON_ID.navLabels)),
            ])
        ),
      // Anything not explicitly listed above (shouldn't normally happen,
      // but keeps the fallback list from silently hiding future types)
      ...S.documentTypeListItems().filter(
        (item) => {
          const id = item.getId()
          return (
            id &&
            !['article', 'workshop', 'faqItem', 'certification'].includes(id) &&
            !SINGLETON_TYPES.has(id)
          )
        }
      ),
    ])
