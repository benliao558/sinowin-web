import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans-tc',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sinowin-vn.com'),
  title: 'SINOWIN INDUSTRIAL (VN) — Precision Magnet Processing',
  // De-politicized 2026-07-16 (group risk decision): see
  // translation-drafts/depoliticization-master.md.
  description: 'Vietnam-based precision magnet processing with 2,000 MT/year capacity, multi-region supply chain, ISO 9001/14001/45001 certified.',
  openGraph: {
    siteName: 'SINOWIN Industrial (Vietnam)',
    type: 'website',
    images: [{ url: '/assets/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/assets/og-default.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className={notoSansTC.variable}>
      <body>{children}</body>
    </html>
  )
}
