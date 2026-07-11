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
  title: 'SINOWIN INDUSTRIAL (VN) — Precision Magnet Processing',
  description: 'Vietnam-based precision magnet processing with 2,000 MT/year capacity, China-free supply chain, ISO 9001/14001/45001 certified.',
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
