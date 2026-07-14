import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { getActiveJobOpenings } from '@/sanity/lib/fetch'
import { t } from '@/sanity/lib/localize'
import { getDepartmentLabel, getDepartmentColor } from '@/lib/departments'
import { assignCharacters, type CardCharacter, type Corner } from '@/lib/manpower'
import ExpandableDescription from '@/components/ExpandableDescription'
import type { SanityJobOpening } from '@/sanity/lib/types'

// See src/app/[lang]/page.tsx for why this is needed.
export const revalidate = 60

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

const T = {
  title: { zh: '攜手開創磁材新紀元', en: 'Shape the Next Era of Magnetics With Us', vi: 'Cùng chúng tôi mở ra kỷ nguyên vật liệu từ mới', ja: '磁性材料の新時代を共に切り拓く' },
  desc: { zh: '我們正在尋找具備前瞻思維的專業人才，在越南北寧與全球據點共創價值。', en: 'We are looking for forward-thinking professionals to create value together across Bac Ninh, Vietnam and our global sites.', vi: 'Chúng tôi đang tìm kiếm những chuyên gia có tư duy tiên phong để cùng tạo ra giá trị tại Bắc Ninh, Việt Nam và các cơ sở toàn cầu.', ja: 'ベトナム・バクニンおよびグローバル拠点で共に価値を創造する、先見性のある人材を求めています。' },
  empty: { zh: '目前沒有開放中的職缺，歡迎將您的簡歷寄至下方信箱，我們會保留並主動聯繫合適的機會。', en: 'There are no open positions right now. Feel free to send your resume to the email below — we\'ll keep it on file and reach out when a suitable opportunity opens.', vi: 'Hiện không có vị trí tuyển dụng nào đang mở. Vui lòng gửi CV đến email bên dưới, chúng tôi sẽ lưu lại và liên hệ khi có cơ hội phù hợp.', ja: '現在募集中の求人はありません。下記のメールアドレスまで履歴書をお送りください。適したポジションが開いた際にご連絡いたします。' },
  cta: { zh: '未找到適合的職位？將您的簡歷發送至我們的招募信箱。', en: 'Didn\'t find a fit? Send your resume to our recruiting inbox.', vi: 'Không tìm thấy vị trí phù hợp? Gửi CV đến hộp thư tuyển dụng của chúng tôi.', ja: '合うポジションが見つかりませんか？採用担当のメールへ履歴書をお送りください。' },
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  return {
    title: `${T.title[lang]} — SINOWIN Careers`,
    description: T.desc[lang],
    alternates: { canonical: `https://www.sinowin-vn.com/${lang}/careers` },
  }
}

// The character sits in one corner of the card (top-left is off-limits --
// that's where the title/tags live) at full-body size, layered *above* the
// card (z-10 vs the content's z-0) so it can naturally overlap the card's
// edge. Overlap with the actual text is avoided structurally, not by
// hoping they don't collide: CORNER_STYLE.pad reserves a matching gutter
// down the character's side of the content column, so text simply never
// flows into the space the character occupies, regardless of how tall any
// individual card ends up being.
const CORNER_STYLE: Record<Corner, { img: string; pad: string }> = {
  'bottom-right': { img: '-right-4 -bottom-4 sm:-right-8 sm:-bottom-8', pad: 'pr-28 sm:pr-32' },
  'bottom-left': { img: '-left-4 -bottom-4 sm:-left-8 sm:-bottom-8', pad: 'pl-28 sm:pl-32' },
  'top-right': { img: '-right-4 -top-4 sm:-right-8 sm:-top-8', pad: 'pr-28 sm:pr-32' },
}

// Two stacked drop-shadows: a grounding dark shadow so the character reads
// as standing in front of the card, plus a soft teal rim glow so the navy
// polo doesn't blend into the card's dark background (a real, confirmed
// issue during testing).
const CHARACTER_FILTER = 'drop-shadow(0 10px 16px rgba(0,0,0,0.6)) drop-shadow(0 0 12px rgba(45,212,191,0.4))'

// Real job descriptions turned out to be inconsistently formatted between
// locales -- the Chinese text separates "主要職責" from the intro with a
// blank line, but the English text uses a single newline (and adds a
// "Description:" label the Chinese text doesn't have) -- so a plain
// paragraph-break split worked for one locale and leaked the section header
// into the collapsed summary for the other. Detecting the header lines by
// keyword, with a character-budget/sentence-boundary fallback for whatever
// it misses, is robust to that inconsistency either way.
const LABEL_PREFIX = /^(description|說明|说明|説明|概要|mô tả)[:：]\s*/i
const SECTION_HEADERS = [
  '主要職責', '主要职责', '職責說明', '條件要求', '应征条件', '應徵條件', '任職資格', '任职资格',
  'key responsibilities', 'responsibilities', 'requirements', 'qualifications',
  'trách nhiệm chính', 'trách nhiệm', 'yêu cầu',
  '主な職務', '職務内容', '応募資格', '必須要件', '応募条件',
]
const SUMMARY_CHAR_BUDGET = 200
const SENTENCE_END = ['。', '.', '！', '!', '？', '?']

function splitDescription(raw: string): { summary: string; rest: string | null } {
  const description = raw.replace(LABEL_PREFIX, '').trim()
  const lines = description.split('\n')

  let cutIndex = lines.length
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim().toLowerCase()
    if (line && SECTION_HEADERS.some((h) => line.startsWith(h))) {
      cutIndex = i
      break
    }
  }

  let summary = lines.slice(0, cutIndex).join('\n').trim()
  let rest = lines.slice(cutIndex).join('\n').trim()

  if (summary.length > SUMMARY_CHAR_BUDGET) {
    const truncated = summary.slice(0, SUMMARY_CHAR_BUDGET)
    const sentenceBoundary = Math.max(...SENTENCE_END.map((ch) => truncated.lastIndexOf(ch)))
    if (sentenceBoundary > SUMMARY_CHAR_BUDGET * 0.4) {
      // Clean stop at the end of a sentence -- no ellipsis needed.
      rest = (summary.slice(sentenceBoundary + 1) + (rest ? '\n\n' + rest : '')).trim()
      summary = summary.slice(0, sentenceBoundary + 1).trim()
    } else {
      // No sentence end within budget (a single long run-on sentence, seen
      // in real data) -- snap to the last word boundary instead of cutting
      // a word in half, and mark it as truncated with an ellipsis.
      const wordBoundary = truncated.lastIndexOf(' ')
      const cutAt = wordBoundary > SUMMARY_CHAR_BUDGET * 0.5 ? wordBoundary : SUMMARY_CHAR_BUDGET
      rest = (summary.slice(cutAt) + (rest ? '\n\n' + rest : '')).trim()
      summary = summary.slice(0, cutAt).trim() + '…'
    }
  }

  return { summary, rest: rest || null }
}

function JobCard({ job, lang, character }: { job: SanityJobOpening; lang: Locale; character: CardCharacter }) {
  const title = t(job.title, lang) ?? ''
  const department = getDepartmentLabel(job.department, lang)
  const departmentColor = getDepartmentColor(job.department)
  const location = t(job.location, lang)
  const employmentType = t(job.employmentType, lang)
  const description = t(job.description, lang)
  const corner = CORNER_STYLE[character.corner]

  return (
    // self-start: a CSS grid row stretches every item to match its tallest
    // sibling by default, which left this wrapper's actual box far taller
    // than the visible card underneath -- and since that's the containing
    // block for the absolutely-positioned character, "bottom: -2rem" landed
    // relative to the invisible stretched edge instead of the real card
    // bottom, leaving the character stranded far below it.
    <div className="relative self-start">
      <div className={`relative z-0 bg-gradient-to-br from-slate-800 to-teal-950 border border-white/10 rounded-3xl p-6 sm:p-8 ${corner.pad} min-h-[17rem] sm:min-h-[19rem]`}>
        <h2 className="text-xl font-black text-white mb-3">{title}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {department && (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${departmentColor.bg} ${departmentColor.text}`}>
              {department}
            </span>
          )}
          {location && <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-bold">{location}</span>}
          {employmentType && <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-bold">{employmentType}</span>}
        </div>
        {description && (() => {
          const { summary, rest } = splitDescription(description)
          return <ExpandableDescription summary={summary} rest={rest} lang={lang} />
        })()}
      </div>
      <img
        src={`/manpower/${character.file}`}
        alt=""
        aria-hidden="true"
        className={`absolute z-10 h-56 sm:h-64 w-auto pointer-events-none select-none ${corner.img}`}
        style={{ filter: CHARACTER_FILTER }}
      />
    </div>
  )
}

export default async function CareersPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const jobOpenings = await getActiveJobOpenings()
  const characters = assignCharacters(jobOpenings.map((job) => job._id))

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 text-center">{T.title[lang]}</h1>
        <p className="text-slate-300 leading-relaxed mb-12 text-center max-w-2xl mx-auto">{T.desc[lang]}</p>

        {jobOpenings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 sm:gap-y-20 mb-10">
            {jobOpenings.map((job, i) => (
              <JobCard key={job._id} job={job} lang={lang} character={characters[i]} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 text-slate-200 text-sm leading-relaxed mb-10 text-center">
            {T.empty[lang]}
          </div>
        )}

        <div className="p-10 bg-teal-500/10 border border-teal-500/20 rounded-[3rem] text-center">
          <p className="text-slate-200 font-medium mb-4">{T.cta[lang]}</p>
          <a href="mailto:info@sinowin-vn.com" className="text-2xl font-black text-teal-400">
            info@sinowin-vn.com
          </a>
        </div>
      </div>
    </div>
  )
}
