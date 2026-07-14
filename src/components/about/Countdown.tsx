'use client'

import { useEffect, useState } from 'react'

const TARGET = new Date('2026-11-01T00:00:00').getTime()

/**
 * "{days} days until November enforcement" style line. Renders nothing
 * until mounted -- an accurate day count can only be computed against the
 * visitor's actual clock, not baked into a statically-generated page. The
 * always-visible timeline text already carries the core message without JS;
 * this is a supplementary pressure indicator, not load-bearing content.
 */
export default function Countdown({ template }: { template: string }) {
  const [days, setDays] = useState<number | null>(null)

  useEffect(() => {
    const diff = TARGET - Date.now()
    setDays(Math.max(0, Math.ceil(diff / 86400000)))
  }, [])

  if (days === null) return null

  const [before, after] = template.split('{days}')
  return (
    <span style={{ fontSize: 13, color: '#8A93A3' }}>
      {before}
      <span style={{ fontSize: 17, fontWeight: 500, color: '#FFFFFF' }}>{days}</span>
      {after}
    </span>
  )
}
