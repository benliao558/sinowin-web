'use client'

import dynamic from 'next/dynamic'
import config from '../../../../sanity.config'

// Sanity Studio is a heavy, fully client-side SPA. Loading it via next/dynamic
// with ssr disabled keeps Next.js's build-time "collect page data" step from
// ever importing/executing the Studio bundle in Node (which otherwise crashes
// with "createContext is not a function" -- Studio's internals aren't meant
// to run outside a real browser).
const NextStudio = dynamic(() => import('next-sanity/studio').then((m) => m.NextStudio), {
  ssr: false,
})

export default function StudioPage() {
  return <NextStudio config={config} />
}
