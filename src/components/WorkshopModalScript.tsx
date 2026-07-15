'use client'

import { useEffect } from 'react'

/**
 * Progressive enhancement only -- the modal itself opens/closes via pure
 * CSS (:target, see .wsg-modal-target in globals.css) and works with this
 * script absent entirely (no JS: content is still reachable, just without
 * body-scroll-lock / Esc-to-close / focus management). This only adds the
 * things :target can't do on its own.
 */
export default function WorkshopModalScript() {
  useEffect(() => {
    let lastOpenId: string | null = null

    function isModalHash(hash: string) {
      return hash.startsWith('#modal-')
    }

    function applyState() {
      const hash = window.location.hash
      if (isModalHash(hash)) {
        lastOpenId = hash.slice(1)
        document.body.style.overflow = 'hidden'
        const modal = document.getElementById(lastOpenId)
        const box = modal?.querySelector<HTMLElement>('.wsg-modal-box')
        box?.focus()
      } else {
        document.body.style.overflow = ''
        if (lastOpenId) {
          const trigger = document.querySelector<HTMLElement>(`a.wsg-card[href="#${lastOpenId}"]`)
          trigger?.focus()
          lastOpenId = null
        }
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isModalHash(window.location.hash)) {
        history.back()
      }
    }

    applyState()
    window.addEventListener('hashchange', applyState)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('hashchange', applyState)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [])

  return null
}
