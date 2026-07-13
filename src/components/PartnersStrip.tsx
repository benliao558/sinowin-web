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

function LogoTile({ file }: { file: string }) {
  return (
    <div className="shrink-0 w-40 h-20 flex items-center justify-center px-4">
      <div className="relative w-full h-12">
        <Image src={`/assets/uploads/partners/${file}`} alt={nameFromFile(file)} fill className="object-contain" sizes="160px" />
      </div>
    </div>
  )
}

function MarqueeRow({ files, animationClass }: { files: string[]; animationClass: string }) {
  // Duplicated once so the track can loop seamlessly at -50% translate.
  const track = [...files, ...files]
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className={`flex w-max ${animationClass}`}>
        {track.map((file, i) => (
          <LogoTile key={`${file}-${i}`} file={file} />
        ))}
      </div>
    </div>
  )
}

export default function PartnersStrip({ lang }: { lang: Locale }) {
  const files = readLogoFiles()
  if (files.length === 0) return null

  // Interleaved (not a straight head/tail split) so an alphabetically-sorted
  // file listing doesn't cluster visually similar logos into the same row.
  const rowA = files.filter((_, i) => i % 2 === 0)
  const rowB = files.filter((_, i) => i % 2 === 1)

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-3xl font-black text-slate-900 mb-2">{T.title[lang]}</h2>
        <p className="text-slate-500">{T.subtitle[lang]}</p>
      </div>
      <div className="space-y-4">
        <MarqueeRow files={rowA} animationClass="animate-marquee" />
        <MarqueeRow files={rowB} animationClass="animate-marquee-reverse" />
      </div>
    </section>
  )
}
