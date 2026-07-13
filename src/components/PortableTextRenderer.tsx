import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

// Maps Portable Text to the same tags the old raw-HTML article bodies used
// (<p>, <h2>, <h3>, <ul>/<ol><li>, <strong>, <em>) so migrating off
// dangerouslySetInnerHTML doesn't change the rendered DOM structure.
// `rawHtml` is the escape hatch for content that doesn't fit Portable Text
// (e.g. the grade-comparison <table> in one article).
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
  types: {
    rawHtml: ({ value }) => <div dangerouslySetInnerHTML={{ __html: value.html }} />,
  },
}

export default function PortableTextRenderer({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null
  return <PortableText value={value} components={components} />
}
