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

type LogoFile = { file: string; aspect: number }

// Base cap-height every logo renders at. Compact/badge-shaped logos (aspect
// ratio close to 1:1 -- circular or square marks like HP/LG/Mattel/Fujifilm)
// get a size boost: at an identical cap-height they read as visually
// *smaller* than wide wordmarks purely because they occupy far less
// horizontal area, so a flat "same container size" approach (the previous
// implementation) never actually produced uniform-looking logos -- this is
// the real reason the fix "didn't take": object-contain inside a fixed
// w x h box just lets each logo's own aspect ratio dictate how much of that
// box it fills, and the fixed box did nothing to equalize *perceived* size
// across wildly different aspect ratios (1:1 badges vs 7.7:1 wordmarks).
const BASE_HEIGHT = 34
const COMPACT_ASPECT_THRESHOLD = 1.6
const COMPACT_BOOST = 1.35

function readLogoFiles(): LogoFile[] {
  const dir = path.join(process.cwd(), 'public', 'assets', 'uploads', 'partners')
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith('.svg'))
      .sort()
      .map((file) => ({ file, aspect: readAspect(path.join(dir, file)) }))
  } catch {
    return []
  }
}

function readAspect(fullPath: string): number {
  try {
    const svg = fs.readFileSync(fullPath, 'utf8')
    const match = svg.match(/viewBox=["']\s*([-\d.]+)[ ,]+([-\d.]+)[ ,]+([-\d.]+)[ ,]+([-\d.]+)\s*["']/)
    if (match) {
      const w = parseFloat(match[3])
      const h = parseFloat(match[4])
      if (w > 0 && h > 0) return w / h
    }
  } catch {
    // fall through to default
  }
  return 3 // typical wordmark aspect, used if a file has no parseable viewBox
}

function nameFromFile(file: string): string {
  return file
    .replace(/\.svg$/i, '')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function LogoTile({ file, aspect }: LogoFile) {
  const height = aspect < COMPACT_ASPECT_THRESHOLD ? Math.round(BASE_HEIGHT * COMPACT_BOOST) : BASE_HEIGHT
  const width = Math.round(height * aspect)
  return (
    <div className="shrink-0 h-16 flex items-center justify-center">
      <div className="relative" style={{ width, height }}>
        <Image src={`/assets/uploads/partners/${file}`} alt={nameFromFile(file)} fill className="object-contain" sizes={`${width}px`} />
      </div>
    </div>
  )
}

function MarqueeRow({ items, animationClass }: { items: LogoFile[]; animationClass: string }) {
  // Duplicated once so the track can loop seamlessly at -50% translate.
  const track = [...items, ...items]
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      {/* Fixed gap on the row itself (not per-tile padding) is what keeps
          inter-logo spacing visually even now that tile widths vary with
          each logo's natural aspect ratio. */}
      <div className={`flex items-center gap-x-12 w-max ${animationClass}`}>
        {track.map((item, i) => (
          <LogoTile key={`${item.file}-${i}`} file={item.file} aspect={item.aspect} />
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
      <div className="space-y-6">
        <MarqueeRow items={rowA} animationClass="animate-marquee" />
        <MarqueeRow items={rowB} animationClass="animate-marquee-reverse" />
      </div>
    </section>
  )
}
