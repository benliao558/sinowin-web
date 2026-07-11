'use client'

import { useEffect } from 'react'

// Progressive enhancement only: sets a `.js` class on <html> and observes
// `.reveal` elements to fade them in on scroll. Without JS (or before hydration),
// `.reveal` elements render at full opacity via the CSS default in globals.css,
// so content is always present and crawlable — this only adds a visual transition.
export default function ScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add('js')

    const els = document.querySelectorAll('.reveal')
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
