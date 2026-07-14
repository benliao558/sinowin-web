import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { getActiveJobOpenings } from '@/sanity/lib/fetch'
import { t } from '@/sanity/lib/localize'
import { getDepartmentLabel, getDepartmentColor } from '@/lib/departments'
import { assignCharacters, type CardCharacter } from '@/lib/manpower'
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
  const title = `${T.title[lang]} — SINOWIN Careers`
  const description = T.desc[lang]
  const url = `https://www.sinowin-vn.com/${lang}/careers`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: '/assets/og-careers.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/assets/og-careers.jpg'],
    },
  }
}

// Every card's character is fixed to the bottom-right corner now (no more
// random corner assignment -- simpler, and it means a character always
// unambiguously belongs to the card it's standing in front of). Full-body,
// layered *above* the card (z-10 vs the content's z-0) so it can naturally
// overlap the card's edge; CARD_PAD reserves a matching gutter down the
// right side of the content column so text structurally never flows into
// the space the character occupies, regardless of how tall any individual
// card ends up being.
const CARD_IMG_POSITION = '-right-4 -bottom-4 sm:-right-8 sm:-bottom-8'
const CARD_PAD = 'pr-28 sm:pr-32'

// No drop-shadow filter here (an earlier version had one for a grounding
// effect). Confirmed by testing: `filter` forces the browser to composite
// the character via an offscreen layer, and wherever that layer straddled
// two different backgrounds (the card's gradient vs the page's own
// background, exactly the case here since the character overlaps the
// card's edge), it rendered a visible hard seam right through the middle of
// the character where the two backgrounds met -- reported as a "cut in
// half" line. Removing the filter removes the seam entirely; the character
// still reads as sitting in front of the card from the z-index layering and
// the natural edge of the art itself.

// The 30 source crops aren't uniform: the Vietnamese-team row in the
// original reference sheet was noticeably shorter than the Indian/American
// rows, so those files are ~190px tall natively vs ~250-285px for the
// others (see src/lib/manpower.ts). Displaying everyone at a fixed height
// with auto width let that native ratio dictate the apparent footprint,
// so the rounder/shorter files rendered visibly wider and stockier next to
// the others. Fixing both width AND height with object-contain (like the
// partner-logo sizing pass) puts every character in an identical box
// regardless of native proportions.
const CHARACTER_BOX = 'h-56 w-28 sm:h-64 sm:w-32 object-contain'

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

  return (
    // Grid rows stretch every item to match the tallest sibling by default
    // (align-items: stretch) -- that's exactly what we want here so same-row
    // cards share one height and bottom-anchored characters share one "floor"
    // line, instead of each card sizing to its own content and leaving
    // characters standing at different heights depending on how much text
    // their card happened to have. The card panel below uses h-full to
    // actually fill that stretched wrapper (a plain min-height wouldn't --
    // it'd stay at its own content height and leave the wrapper's extra
    // stretched space empty, which is what previously left the
    // bottom-anchored character's containing block taller than the visible
    // card and stranded it below the card's real bottom edge).
    <div className="relative">
      <div className={`relative z-0 h-full bg-gradient-to-br from-slate-800 to-teal-950 border border-white/10 rounded-3xl p-6 sm:p-8 ${CARD_PAD} min-h-[17rem] sm:min-h-[19rem]`}>
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
        className={`absolute z-10 pointer-events-none select-none ${CHARACTER_BOX} ${CARD_IMG_POSITION}`}
        style={{ objectPosition: 'bottom' }}
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
