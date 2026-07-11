import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'

const T = {
  title: { zh: '合作夥伴', en: 'Our Partners', vi: 'Đối tác', ja: 'パートナー企業' },
  subtitle: {
    zh: '服務全球領先品牌的磁性元件供應需求',
    en: 'Supplying magnetic components to leading global brands',
    vi: 'Cung cấp linh kiện từ tính cho các thương hiệu toàn cầu hàng đầu',
    ja: 'グローバルリーディングブランドへの磁性部品供給',
  },
}

function readLogoFiles(): string[] {
  const dir = path.join(process.cwd(), 'public', 'assets', 'uploads', 'partners')
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith('.svg'))
      .sort()
  } catch {
    return []
  }
}

function nameFromFile(file: string): string {
  return file
    .replace(/\.svg$/i, '')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function PartnersStrip({ lang }: { lang: Locale }) {
  const files = readLogoFiles()
  if (files.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-2">{T.title[lang]}</h2>
        <p className="text-slate-500 mb-12">{T.subtitle[lang]}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          {files.map((file) => (
            <div
              key={file}
              className="h-16 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300"
            >
              <div className="relative w-full h-10">
                <Image
                  src={`/assets/uploads/partners/${file}`}
                  alt={nameFromFile(file)}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
