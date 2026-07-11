'use client'

import { useState } from 'react'
import Image from 'next/image'
import { workshops, type Workshop, type LocalizedText } from '@/content/workshops'
import { getWithFallback, type Locale } from '@/lib/i18n'

const ACCENT_CLASSES = [
  'bg-teal-500/20 text-teal-400',
  'bg-blue-500/20 text-blue-400',
  'bg-purple-500/20 text-purple-400',
  'bg-pink-500/20 text-pink-400',
  'bg-amber-500/20 text-amber-400',
  'bg-emerald-500/20 text-emerald-400',
  'bg-teal-500/20 text-teal-400',
]

const CORE_EQUIPMENT_LABEL: Record<Locale, string> = {
  zh: '核心設備',
  en: 'Core Equipment',
  vi: 'Thiết bị cốt lõi',
  ja: 'コア設備',
}

// zh is guaranteed on every field (source data), so this always returns a string.
function t(text: LocalizedText, lang: Locale): string {
  return getWithFallback(text, lang) ?? text.zh ?? ''
}

function WorkshopDetail({ workshop, lang }: { workshop: Workshop; lang: Locale }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-white/10">
        <span className="text-teal-400 text-[10px] font-bold tracking-widest uppercase">{t(workshop.badge, lang)}</span>
        <h3 className="text-2xl font-black text-white mt-1">{t(workshop.cardTitle, lang)}</h3>
        <p className="text-slate-400 text-sm font-medium mt-1">{t(workshop.subtitle, lang)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <aside className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 p-4 sm:p-6">
          <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{CORE_EQUIPMENT_LABEL[lang]}</div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {workshop.tabs.map((tab, i) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`px-2 py-2 rounded-xl text-[11px] font-black transition ${
                  activeTab === i ? 'bg-teal-600/20 border border-teal-500/40 text-white' : 'bg-white/5 border border-white/10 text-white/70'
                }`}
              >
                {t(tab.title, lang)}
              </button>
            ))}
          </div>
          {workshop.tabs.map((tab, i) => (
            <div key={tab.key} className={activeTab === i ? '' : 'hidden'}>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-800/40 relative aspect-[16/9] mb-3">
                <Image src={tab.img} alt={t(tab.title, lang)} fill className="object-cover" />
              </div>
              <div className="text-white font-black text-[13px] mb-1">{t(tab.title, lang)}</div>
              <div className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-3">{t(tab.sub, lang)}</div>
              <ul className="space-y-2 text-slate-400 text-xs font-bold leading-relaxed">
                {tab.points.map(([label, text], pi) => (
                  <li key={pi}>
                    <span className="text-slate-200 font-black">{t(label, lang)}</span>
                    {t(text, lang)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <div className="lg:col-span-8">
          <div className="relative aspect-[16/7] bg-slate-800">
            <Image src={workshop.cardImage} alt={t(workshop.cardTitle, lang)} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-2xl">{t(workshop.intro, lang)}</p>
            </div>
          </div>
          <div className="p-5 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {workshop.highlights.map((h, hi) => (
                <span key={hi} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-bold">
                  {t(h, lang)}
                </span>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-5 mb-6">
              <h4 className="text-white font-black text-sm mb-3">{t(workshop.whyTitle, lang)}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{t(workshop.whyBody, lang)}</p>
            </div>
            {workshop.deliverTitle && workshop.deliverItems && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-5">
                <h4 className="text-white font-black text-sm mb-3">{t(workshop.deliverTitle, lang)}</h4>
                <ul className="space-y-2 text-slate-400 text-xs leading-relaxed list-disc list-inside">
                  {workshop.deliverItems.map((item, ii) => (
                    <li key={ii}>{t(item, lang)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WorkshopGrid({ lang }: { lang: Locale }) {
  const [openId, setOpenId] = useState<string | null>(workshops[0].id)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {workshops.map((w, i) => (
          <button
            key={w.id}
            type="button"
            onClick={() => setOpenId(openId === w.id ? null : w.id)}
            className={`hover-lift enter-fade text-left bg-white/5 border rounded-3xl overflow-hidden group transition duration-500 ${
              openId === w.id ? 'border-teal-500/60' : 'border-white/10 hover:border-teal-500/50'
            }`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="h-56 overflow-hidden relative">
              <Image src={w.cardImage} alt={t(w.cardTitle, lang)} fill className="object-cover group-hover:scale-110 transition duration-700" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${ACCENT_CLASSES[i]}`}>
                  {i + 1}
                </div>
                <span className="text-xl font-black text-white">{t(w.cardTitle, lang)}</span>
              </div>
              <p className="text-slate-300/90 text-xs font-bold leading-relaxed">{t(w.cardDesc, lang)}</p>
            </div>
          </button>
        ))}
      </div>

      {openId && <WorkshopDetail workshop={workshops.find((w) => w.id === openId)!} lang={lang} />}
    </div>
  )
}
