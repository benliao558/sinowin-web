'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'

const LABELS: Record<Locale, { more: string; less: string }> = {
  zh: { more: '展開全文', less: '收合' },
  en: { more: 'Read more', less: 'Show less' },
  vi: { more: 'Xem thêm', less: 'Thu gọn' },
  ja: { more: 'もっと見る', less: '閉じる' },
}

export default function ExpandableDescription({ summary, rest, lang }: { summary: string; rest: string | null; lang: Locale }) {
  const [expanded, setExpanded] = useState(false)
  const labels = LABELS[lang]
  const text = expanded && rest ? `${summary}\n\n${rest}` : summary

  return (
    <div>
      <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{text}</p>
      {rest && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs font-bold text-teal-300 hover:text-teal-200 underline underline-offset-2"
        >
          {expanded ? labels.less : labels.more}
        </button>
      )}
    </div>
  )
}
