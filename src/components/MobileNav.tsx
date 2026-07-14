'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localeNames, type Locale } from '@/lib/i18n'

export type MobileNavItem = { href: string; label: string }

/**
 * Mobile hamburger menu, shared header. All nav links (and language links)
 * are always present in the rendered HTML -- only visually hidden via CSS
 * until opened -- so crawlers reading raw HTML still see the full internal
 * link graph even though the panel is collapsed by default. `open` only
 * controls opacity/pointer-events/tabIndex, never conditional rendering.
 */
export default function MobileNav({ lang, items }: { lang: Locale; items: MobileNavItem[] }) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname() || `/${lang}`
  const segments = pathname.split('/')

  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  function hrefForLocale(l: Locale): string {
    const targetSegments = [...segments]
    targetSegments[1] = l
    return targetSegments.join('/') || `/${l}`
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition shrink-0"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`md:hidden fixed inset-x-0 top-20 bottom-0 z-[9998] bg-slate-950/98 backdrop-blur-md overflow-y-auto transition-opacity duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false)
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 py-8 flex flex-col">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="py-4 text-lg font-black uppercase tracking-wide text-white/80 hover:text-white border-b border-white/5 transition"
            >
              {item.label}
            </Link>
          ))}

          <div className="flex flex-wrap items-center gap-2 pt-6 mt-2">
            {locales.map((l) => (
              <Link
                key={l}
                href={hrefForLocale(l)}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border transition ${
                  l === lang ? 'border-white text-white' : 'border-white/15 text-white/50 hover:text-white hover:border-white/30'
                }`}
              >
                {localeNames[l]}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}
