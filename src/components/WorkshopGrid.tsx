import Image from 'next/image'
import type { SanityWorkshop, LocaleString } from '@/sanity/lib/types'
import type { LocalWorkshop } from '@/lib/localWorkshops'
import { urlForImage } from '@/sanity/lib/image'
import { t } from '@/sanity/lib/localize'
import type { Locale } from '@/lib/i18n'
import WorkshopModalScript from './WorkshopModalScript'

type Workshop = SanityWorkshop | LocalWorkshop

function isLocalWorkshop(w: Workshop): w is LocalWorkshop {
  return 'processTable' in w
}

const CORE_EQUIPMENT_LABEL: Record<Locale, string> = {
  zh: '核心設備',
  en: 'Core Equipment',
  vi: 'Thiết bị cốt lõi',
  ja: 'コア設備',
}

const CLOSE_LABEL: Record<Locale, string> = {
  zh: '關閉',
  en: 'Close',
  vi: 'Đóng',
  ja: '閉じる',
}

// zh is guaranteed on every field in the migrated data, so this always
// returns a string for the fields WorkshopGrid renders.
function tt(text: LocaleString | undefined, lang: Locale): string {
  return t(text, lang) ?? ''
}

function resolveImage(image: unknown, width: number): string | undefined {
  if (typeof image === 'string') return image
  return urlForImage(image as Parameters<typeof urlForImage>[0])?.width(width).url()
}

function WorkshopDetail({ workshop, lang, titleId }: { workshop: Workshop; lang: Locale; titleId: string }) {
  const cardImageUrl = resolveImage(workshop.cardImage, 1200)

  return (
    <div>
      <div className="p-6 sm:p-8 border-b border-white/10">
        {workshop.badge && <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#6B7280' }}>{workshop.badge}</span>}
        <h3 id={titleId} className="text-2xl font-black text-white mt-1">{tt(workshop.cardTitle, lang)}</h3>
        {workshop.subtitle && <p className="text-slate-400 text-sm font-medium mt-1">{tt(workshop.subtitle, lang)}</p>}
      </div>

      <div className="relative aspect-[16/7] bg-slate-800">
        {cardImageUrl && <Image src={cardImageUrl} alt={tt(workshop.cardTitle, lang)} fill className="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-2xl">{tt(workshop.intro, lang)}</p>
        </div>
      </div>

      <div className="p-5 sm:p-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {workshop.highlights.map((h, hi) => (
            <span key={hi} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-bold">
              {tt(h, lang)}
            </span>
          ))}
        </div>

        {isLocalWorkshop(workshop) ? (
          <SurfaceTreatmentDetail workshop={workshop} lang={lang} />
        ) : (
          <TabbedWorkshopDetail workshop={workshop} lang={lang} />
        )}
      </div>
    </div>
  )
}

function TabbedWorkshopDetail({ workshop, lang }: { workshop: SanityWorkshop; lang: Locale }) {
  return (
    <>
      <div className="wsg-tabs grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {workshop.tabs.map((tab, i) => (
          <input key={tab.key} type="radio" name={`tabs-${workshop.workshopId}`} id={`tab-${workshop.workshopId}-${i}`} defaultChecked={i === 0} />
        ))}

        <div className="wsg-tab-aside lg:col-span-4">
          <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{CORE_EQUIPMENT_LABEL[lang]}</div>
          <div className="wsg-tab-labels grid grid-cols-3 lg:grid-cols-1 gap-2">
            {workshop.tabs.map((tab, i) => (
              <label
                key={tab.key}
                htmlFor={`tab-${workshop.workshopId}-${i}`}
                className="cursor-pointer px-2 py-2 rounded-xl text-[11px] font-black transition bg-white/5 border border-white/10 text-white/70"
              >
                {tt(tab.title, lang)}
              </label>
            ))}
          </div>
        </div>

        <div className="wsg-tab-main lg:col-span-8">
          <div className="wsg-tab-panels">
            {workshop.tabs.map((tab) => {
              const tabImageUrl = resolveImage(tab.img, 800)
              return (
                <div key={tab.key}>
                  {tabImageUrl && (
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-800/40 relative aspect-[16/9] mb-3">
                      <Image src={tabImageUrl} alt={tt(tab.title, lang)} fill className="object-cover" />
                    </div>
                  )}
                  <div className="text-white font-black text-[13px] mb-1">{tt(tab.title, lang)}</div>
                  {tab.sub && <div className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-3">{tab.sub}</div>}
                  <ul className="space-y-2 text-slate-400 text-xs font-bold leading-relaxed">
                    {tab.points.map((point, pi) => (
                      <li key={pi}>
                        <span className="text-slate-200 font-black">{tt(point.label, lang)}</span>
                        {tt(point.text, lang)}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-5 mb-6">
        <h4 className="text-white font-black text-sm mb-3">{tt(workshop.whyTitle, lang)}</h4>
        <p className="text-slate-400 text-xs leading-relaxed">{tt(workshop.whyBody, lang)}</p>
      </div>
      {workshop.deliverTitle && workshop.deliverItems && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-5">
          <h4 className="text-white font-black text-sm mb-3">{tt(workshop.deliverTitle, lang)}</h4>
          <ul className="space-y-2 text-slate-400 text-xs leading-relaxed list-disc list-inside">
            {workshop.deliverItems.map((item, ii) => (
              <li key={ii}>{tt(item, lang)}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

function SurfaceTreatmentDetail({ workshop, lang }: { workshop: LocalWorkshop; lang: Locale }) {
  // Epoxy has the strongest salt-spray rating of the five (500h) -- the
  // spec calls this out as the differentiator, so its row reads brightest.
  const bestSstRow = 'Epoxy'

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {workshop.gallery.slice(1).map((g) => (
          <div key={g.src} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-slate-800/40">
            <Image src={g.src} alt={g.alt} fill className="object-cover" sizes="(max-width: 640px) 50vw, 200px" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border overflow-x-auto mb-4" style={{ borderColor: '#1F2530' }}>
        <table className="w-full text-xs" style={{ minWidth: 560 }}>
          <thead>
            <tr style={{ background: '#12161F' }}>
              {workshop.processTable.columns.map((col, i) => (
                <th key={i} className="text-left font-black uppercase tracking-widest px-4 py-3" style={{ color: '#6B7280', fontSize: 10 }}>
                  {tt(col, lang)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workshop.processTable.rows.map((row) => {
              const isBest = row.process === bestSstRow
              return (
                <tr key={row.process} style={{ borderTop: '0.5px solid #1F2530' }}>
                  <td className="px-4 py-3 font-black" style={{ color: isBest ? '#FFFFFF' : '#D8DEE7' }}>{row.process}</td>
                  <td className="px-4 py-3" style={{ color: '#8A93A3' }}>{tt(row.characteristics, lang)}</td>
                  <td className="px-4 py-3 font-mono" style={{ color: isBest ? '#FFFFFF' : '#8A93A3', fontWeight: isBest ? 700 : 400 }}>{tt(row.sst, lang)}</td>
                  <td className="px-4 py-3 font-mono" style={{ color: '#8A93A3' }}>{row.thickness}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] leading-relaxed mb-6" style={{ color: '#6B7280' }}>{tt(workshop.disclaimer, lang)}</p>

      <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-5">
        <h4 className="text-white font-black text-sm mb-3">{tt(workshop.qualityStandards.title, lang)}</h4>
        <ul className="space-y-2 text-slate-400 text-xs leading-relaxed">
          {workshop.qualityStandards.items.map((item, ii) => (
            <li key={ii}>
              <span className="text-slate-200 font-black">{tt(item.label, lang)}：</span>
              {tt(item.value, lang)}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default function WorkshopGrid({ lang, workshops }: { lang: Locale; workshops: Workshop[] }) {
  return (
    <div>
      <div className="wsg-grid">
        {workshops.map((w, i) => {
          const thumbUrl = resolveImage(w.cardImage, 600)
          const modalId = `modal-${w.workshopId}`
          return (
            <a
              key={w.workshopId}
              href={`#${modalId}`}
              className="wsg-card block text-left rounded-3xl overflow-hidden transition-colors"
              style={{ background: '#12161F', border: '0.5px solid #1F2530' }}
              aria-haspopup="dialog"
            >
              <div className="h-56 overflow-hidden relative bg-slate-800">
                {thumbUrl && <Image src={thumbUrl} alt={tt(w.cardTitle, lang)} fill className="object-cover" />}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs bg-white/5 border border-white/10 text-white/70">
                    {i + 1}
                  </div>
                  <span className="text-xl font-black" style={{ color: '#D8DEE7' }}>{tt(w.cardTitle, lang)}</span>
                </div>
                <p className="text-slate-300/90 text-xs font-bold leading-relaxed">{tt(w.cardDesc, lang)}</p>
              </div>
            </a>
          )
        })}
      </div>

      <div className="wsg-modals">
        {workshops.map((w) => {
          const modalId = `modal-${w.workshopId}`
          const titleId = `${modalId}-title`
          return (
            <div key={w.workshopId} id={modalId} className="wsg-modal-target" role="dialog" aria-modal="true" aria-labelledby={titleId}>
              <a href="#_close" className="wsg-modal-backdrop" aria-label={CLOSE_LABEL[lang]} tabIndex={-1} />
              <div className="wsg-modal-box" tabIndex={-1}>
                <a href="#_close" className="wsg-modal-close-btn" aria-label={CLOSE_LABEL[lang]}>
                  ✕
                </a>
                <div className="wsg-modal-scroll">
                  <WorkshopDetail workshop={w} lang={lang} titleId={titleId} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <WorkshopModalScript />
    </div>
  )
}
