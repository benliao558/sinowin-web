// GROQ queries matching the schema in src/sanity/schemaTypes. Ordering for
// workshops/certifications relies on _createdAt, which the migration script
// preserves in the original display order (see scripts/migrate-to-sanity.ts).

const imageFields = `{ asset, hotspot }`

export const articlesListQuery = `*[_type == "article"] | order(publishDate desc){
  _id,
  "slug": slug.current,
  publishDate,
  category,
  coverImage ${imageFields},
  title,
  excerpt,
  metaTitle,
  metaDescription
}`

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  publishDate,
  category,
  coverImage ${imageFields},
  title,
  excerpt,
  content,
  metaTitle,
  metaDescription
}`

export const articleSlugsQuery = `*[_type == "article"]{ "slug": slug.current }`

export const articleByIdQuery = `*[_type == "article" && _id == $id][0]{
  _id,
  "slug": slug.current,
  publishDate,
  category,
  coverImage ${imageFields},
  title,
  excerpt,
  metaTitle,
  metaDescription
}`

export const workshopsQuery = `*[_type == "workshop"] | order(_createdAt asc){
  _id,
  "workshopId": workshopId.current,
  cardImage ${imageFields},
  badge,
  cardTitle,
  cardDesc,
  subtitle,
  intro,
  whyTitle,
  whyBody,
  highlights,
  tabs[]{
    key,
    title,
    sub,
    img ${imageFields},
    points[]{ label, text }
  },
  deliverTitle,
  deliverItems,
  processTable{
    columns,
    rows[]{ process, characteristics, sst, thickness }
  },
  disclaimer,
  qualityStandards{
    title,
    items[]{ label, value }
  },
  gallery[]{
    image ${imageFields},
    alt
  }
}`

export const certificationsQuery = `*[_type == "certification"] | order(_createdAt asc){
  _id,
  "certId": certId.current,
  name,
  confirmed,
  badgeImage ${imageFields}
}`

export const faqItemsQuery = `*[_type == "faqItem"] | order(order asc){
  _id,
  question,
  answer,
  order
}`

export const activeJobOpeningsQuery = `*[_type == "jobOpening" && isActive == true] | order(postedDate desc){
  _id,
  title,
  department,
  location,
  employmentType,
  description,
  isActive,
  postedDate
}`

export const companyInfoQuery = `*[_type == "companyInfo"][0]{ name, tagline, description }`

export const homepageContentQuery = `*[_type == "homepageContent"][0]{
  heroTitle, heroSubtitle, supplyChainTitle, supplyChainBody, capacityTitle, annualCapacity, service, tempGrades
}`

export const manufacturingIntroQuery = `*[_type == "manufacturingIntro"][0]{ pageTitle, intro }`

export const navLabelsQuery = `*[_type == "navLabels"][0]{ home, manufacturing, about, faq, articles, careers, contact }`
