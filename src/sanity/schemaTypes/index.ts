import type { SchemaTypeDefinition } from 'sanity'

import localeString from './objects/localeString'
import localeText from './objects/localeText'
import localeBlockContent from './objects/localeBlockContent'
import rawHtml from './objects/rawHtml'
import workshopPoint from './objects/workshopPoint'
import workshopTab from './objects/workshopTab'
import processTableRow from './objects/processTableRow'
import qualityStandardItem from './objects/qualityStandardItem'
import workshopGalleryImage from './objects/workshopGalleryImage'
import departmentField from './objects/departmentField'

import article from './documents/article'
import workshop from './documents/workshop'
import certification from './documents/certification'
import faqItem from './documents/faqItem'
import jobOpening from './documents/jobOpening'
import companyInfo from './documents/companyInfo'
import homepageContent from './documents/homepageContent'
import manufacturingIntro from './documents/manufacturingIntro'
import navLabels from './documents/navLabels'
import linkedinConnection from './documents/linkedinConnection'
import linkedinSyncLog from './documents/linkedinSyncLog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // shared localized-field building blocks
    localeString,
    localeText,
    localeBlockContent,
    rawHtml,
    // workshop-only nested objects
    workshopPoint,
    workshopTab,
    processTableRow,
    qualityStandardItem,
    workshopGalleryImage,
    // jobOpening-only nested object
    departmentField,
    // repeatable document types
    article,
    workshop,
    certification,
    faqItem,
    jobOpening,
    linkedinSyncLog,
    // singletons (see sanity/structure.ts for the "only one instance" UI treatment)
    companyInfo,
    homepageContent,
    manufacturingIntro,
    navLabels,
    linkedinConnection,
  ],
}

// IDs used to pin singleton documents to a single, fixed _id so Studio's
// structure can link straight to them instead of showing a create/list view.
export const SINGLETON_TYPES = new Set([
  'companyInfo',
  'homepageContent',
  'manufacturingIntro',
  'navLabels',
  'linkedinConnection',
])

export const SINGLETON_ID: Record<string, string> = {
  companyInfo: 'companyInfo',
  homepageContent: 'homepageContent',
  manufacturingIntro: 'manufacturingIntro',
  navLabels: 'navLabels',
  linkedinConnection: 'linkedinConnection',
}
