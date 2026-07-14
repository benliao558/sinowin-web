import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { getActiveJobOpenings } from '@/sanity/lib/fetch'
import { t } from '@/sanity/lib/localize'
import { getDepartmentLabel, getDepartmentColor } from '@/lib/departments'
import { assignCharacters, type CardCharacter, type FloatDirection } from '@/lib/manpower'
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

// The character always anchors near the top of the card and only its float
// direction changes -- so however it's offset, it never drifts down into the
// text zone, which the opaque content panel below sits above (z-10) anyway.
// All 4 directions escape upward past the card's top edge, varying only in
// magnitude and horizontal anchor. Two things this avoids, both found while
// testing: (1) a literal sideways escape -- on a single-column mobile layout
// there's no neighboring card to peek toward, and the 16px edge padding
// meant the character was either clipped off-screen or, pulled back in,
// hidden behind its own card's opaque panel; (2) a "downward" escape using a
// positive top offset -- whether it actually pokes out below the card
// depends on the character's height exceeding that specific card's content
// height, which a short description can easily fail, making it invisible.
// A negative-top escape is unconditional: it always clears the panel.
// The escape distance for "up" is set to exactly match the grid's row gap
// (gap-y-16/sm:gap-y-20 below), so the visible sliver -- however tall the
// character actually is -- never crosses into the card in the row above.
const FLOAT_POSITION: Record<FloatDirection, string> = {
  up: 'left-1/2 -translate-x-1/2 -top-16 sm:-top-20',
  down: 'left-1/2 -translate-x-1/2 -top-10 sm:-top-12',
  left: 'left-4 sm:left-6 -top-12 sm:-top-16',
  right: 'right-4 sm:right-6 -top-12 sm:-top-16',
}

// Two stacked drop-shadows: a grounding dark shadow for depth, plus a soft
// teal rim glow so the character's navy polo doesn't blend into the card's
// dark background (this was a real, confirmed issue during testing).
const CHARACTER_FILTER = 'drop-shadow(0 8px 14px rgba(0,0,0,0.55)) drop-shadow(0 0 10px rgba(45,212,191,0.4))'

function JobCard({ job, lang, character }: { job: SanityJobOpening; lang: Locale; character: CardCharacter }) {
  const title = t(job.title, lang) ?? ''
  const department = getDepartmentLabel(job.department, lang)
  const departmentColor = getDepartmentColor(job.department)
  const location = t(job.location, lang)
  const employmentType = t(job.employmentType, lang)
  const description = t(job.description, lang)

  return (
    <div className="relative">
      <img
        src={`/manpower/${character.file}`}
        alt=""
        aria-hidden="true"
        className={`absolute z-0 w-20 sm:w-24 h-auto pointer-events-none select-none ${FLOAT_POSITION[character.direction]}`}
        style={{ filter: CHARACTER_FILTER }}
      />
      <div className="relative z-10 bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 pt-16 sm:pt-20 min-h-[19rem]">
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
        {description && <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{description}</p>}
      </div>
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
