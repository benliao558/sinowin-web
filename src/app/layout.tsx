import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
