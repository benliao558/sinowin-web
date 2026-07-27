import Image from 'next/image'
import type { SanityCertification } from '@/sanity/lib/types'
import { urlForImage } from '@/sanity/lib/image'
import type { Locale } from '@/lib/i18n'
import WorkshopModalScript from './WorkshopModalScript'

const OBTAINED_LABEL: Record<Locale, string> = {
  zh: '已獲取', en: 'Obtained', vi: 'Đã đạt được', ja: '取得済み',
}

const VERIFYING_LABEL: Record<Locale, string> = {
  zh: '審核中', en: 'Under Audit', vi: 'Đang được đánh giá', ja: '審査中',
}

const CLOSE_LABEL: Record<Locale, string> = {
  zh: '關閉', en: 'Close', vi: 'Đóng', ja: '閉じる',
}

function CertCard({ cert, lang, delayMs }: { cert: SanityCertification; lang: Locale; delayMs: number }) {
  const img = urlForImage(cert.badgeImage)?.width(200).url()
  const modalId = `modal-cert-${cert.certId}`
  const statusLabel = cert.confirmed ? OBTAINED_LABEL[lang] : VERIFYING_LABEL[lang]

  const body = (
    <>
      <div className="h-20 mb-4 relative rounded-xl overflow-hidden">
        {img ? (
          <>
            <Image src={img} alt={cert.name} fill className="object-contain" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 group-focus-visible:bg-black/30 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
              </svg>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-slate-500 text-xs font-black">{cert.name}</span>
          </div>
        )}
      </div>
      <h4 className="text-sm font-black text-white mb-1">{cert.name}</h4>
      <p className={`text-[9px] font-bold uppercase ${cert.confirmed ? 'text-teal-400' : 'text-slate-500'}`}>{statusLabel}</p>
    </>
  )

  const cardClass = `hover-lift enter-fade group relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center block ${!cert.confirmed ? 'grayscale opacity-60 hover:grayscale-0' : ''}`

  if (!img) {
    return (
      <div className={cardClass} style={{ animationDelay: `${delayMs}ms` }}>
        {body}
      </div>
    )
  }

  return (
    <a
      href={`#${modalId}`}
      className={`${cardClass} cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400`}
      style={{ animationDelay: `${delayMs}ms` }}
      aria-haspopup="dialog"
    >
      {body}
    </a>
  )
}

function CertModal({ cert, lang }: { cert: SanityCertification; lang: Locale }) {
  const img = urlForImage(cert.badgeImage)?.width(800).url()
  if (!img) return null
  const modalId = `modal-cert-${cert.certId}`
  const titleId = `${modalId}-title`
  const statusLabel = cert.confirmed ? OBTAINED_LABEL[lang] : VERIFYING_LABEL[lang]

  return (
    <div id={modalId} className="wsg-modal-target" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <a href="#_close" className="wsg-modal-backdrop" aria-label={CLOSE_LABEL[lang]} tabIndex={-1} />
      <div className="wsg-modal-box" style={{ maxWidth: 480 }} tabIndex={-1}>
        <a href="#_close" className="wsg-modal-close-btn" aria-label={CLOSE_LABEL[lang]}>
          ✕
        </a>
        <div className="wsg-modal-scroll">
          <div className="p-8 text-center">
            <div className="relative w-full aspect-[3/4] max-h-[60vh] mx-auto mb-5">
              <Image src={img} alt={cert.name} fill className="object-contain" sizes="480px" loading="eager" />
            </div>
            <h3 id={titleId} className="text-xl font-black text-white mb-1">{cert.name}</h3>
            <p className={`text-xs font-bold uppercase ${cert.confirmed ? 'text-teal-400' : 'text-slate-500'}`}>{statusLabel}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CertificationsGrid({ certifications, lang }: { certifications: SanityCertification[]; lang: Locale }) {
  // certificationsQuery already orders by confirmed desc, sortOrder asc -- filtering preserves that order.
  const confirmed = certifications.filter((c) => c.confirmed)
  const pending = certifications.filter((c) => !c.confirmed)
  const gridClass = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'

  return (
    <div>
      <div className={gridClass}>
        {confirmed.map((cert, i) => (
          <CertCard key={cert.certId} cert={cert} lang={lang} delayMs={i * 60} />
        ))}
      </div>

      {pending.length > 0 && (
        <div className={`${gridClass} mt-6`}>
          {pending.map((cert, i) => (
            <CertCard key={cert.certId} cert={cert} lang={lang} delayMs={(confirmed.length + i) * 60} />
          ))}
        </div>
      )}
    </div>
  )
}

// Rendered by the caller as a sibling OUTSIDE any ancestor with its own
// z-index (e.g. the "relative z-10" section-content wrapper) -- position:fixed
// does not escape a stacking context an ancestor establishes, so nesting the
// modal in a z-10 wrapper capped every z-index inside it at "10" from the
// site header's point of view and made the header swallow clicks on the
// modal's close button.
export function CertificationModals({ certifications, lang }: { certifications: SanityCertification[]; lang: Locale }) {
  return (
    <div className="wsg-modals">
      {certifications.map((cert) => (
        <CertModal key={cert.certId} cert={cert} lang={lang} />
      ))}
      <WorkshopModalScript />
    </div>
  )
}
