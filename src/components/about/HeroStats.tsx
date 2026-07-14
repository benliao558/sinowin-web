'use client'

import { useEffect, useRef, useState } from 'react'

export type HeroStat = {
  value: number
  decimals?: number
  comma?: boolean
  unit?: string
  label: string
}

function formatValue(v: number, decimals: number, comma: boolean) {
  const fixed = v.toFixed(decimals)
  if (!comma) return fixed
  const [int, dec] = fixed.split('.')
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return dec ? `${withCommas}.${dec}` : withCommas
}

/**
 * Hero spec-number row. Renders final values immediately (SSR-safe, visible
 * without JS); if JS runs and reduced-motion is off, resets to 0 and counts
 * up to the final value once scrolled into view.
 */
export default function HeroStats({ stats }: { stats: HeroStat[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const finalValues = stats.map((s) => formatValue(s.value, s.decimals ?? 0, !!s.comma))
  const [display, setDisplay] = useState<string[]>(finalValues)
  const animated = useRef(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true
          setDisplay(stats.map((s) => formatValue(0, s.decimals ?? 0, !!s.comma)))
          const start = performance.now()
          const duration = 1100
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplay(stats.map((s) => formatValue(s.value * eased, s.decimals ?? 0, !!s.comma)))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref} className="grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
      {stats.map((s, i) => (
        <div key={i} className="border-l-2 pl-3.5" style={{ borderColor: '#39414F' }}>
          <div className="text-[26px] font-medium leading-tight" style={{ color: '#FFFFFF' }}>
            {display[i]}
            {s.unit && (
              <span className="ml-0.5" style={{ fontSize: 15, color: '#8A93A3' }}>
                {s.unit}
              </span>
            )}
          </div>
          <div className="mt-1" style={{ fontSize: 12, color: '#6B7280' }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}
