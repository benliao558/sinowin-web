'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Scroll-triggered fade-in, About page only. Safe-by-default: renders fully
 * visible until JS explicitly marks it "pending" post-mount, so content is
 * never invisible without JS (crawlers, disabled JS, reduced-motion).
 */
export default function AboutReveal({
  children,
  index = 0,
  className = '',
}: {
  children: React.ReactNode
  index?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const el = ref.current
    if (!el) return

    setPending(true)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPending(false)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const delay = Math.min(index, 5) * 55

  return (
    <div
      ref={ref}
      className={`about-reveal ${pending ? 'about-reveal-pending' : ''} ${className}`}
      style={{ transitionDelay: pending ? '0ms' : `${delay}ms` }}
    >
      {children}
    </div>
  )
}
