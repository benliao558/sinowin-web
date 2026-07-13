'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'
import type { SanityJobOpening } from '@/sanity/lib/types'
import { t } from '@/sanity/lib/localize'

const T = {
  title: { zh: '攜手開創磁材新紀元', en: 'Shape the Next Era of Magnetics With Us', vi: 'Cùng chúng tôi mở ra kỷ nguyên vật liệu từ mới', ja: '磁性材料の新時代を共に切り拓く' },
  desc: { zh: '我們正在尋找具備前瞻思維的專業人才，在越南北寧與全球據點共創價值。', en: 'We are looking for forward-thinking professionals to create value together across Bac Ninh, Vietnam and our global sites.', vi: 'Chúng tôi đang tìm kiếm những chuyên gia có tư duy tiên phong để cùng tạo ra giá trị tại Bắc Ninh, Việt Nam và các cơ sở toàn cầu.', ja: 'ベトナム・バクニンおよびグローバル拠点で共に価値を創造する、先見性のある人材を求めています。' },
  empty: { zh: '目前沒有開放中的職缺，歡迎將您的簡歷寄至下方信箱，我們會保留並主動聯繫合適的機會。', en: 'There are no open positions right now. Feel free to send your resume to the email below — we\'ll keep it on file and reach out when a suitable opportunity opens.', vi: 'Hiện không có vị trí tuyển dụng nào đang mở. Vui lòng gửi CV đến email bên dưới, chúng tôi sẽ lưu lại và liên hệ khi có cơ hội phù hợp.', ja: '現在募集中の求人はありません。下記のメールアドレスまで履歴書をお送りください。適したポジションが開いた際にご連絡いたします。' },
  cta: { zh: '未找到適合的職位？將您的簡歷發送至我們的招募信箱。', en: 'Didn\'t find a fit? Send your resume to our recruiting inbox.', vi: 'Không tìm thấy vị trí phù hợp? Gửi CV đến hộp thư tuyển dụng của chúng tôi.', ja: '合うポジションが見つかりませんか？採用担当のメールへ履歴書をお送りください。' },
  close: { zh: '關閉', en: 'Close', vi: 'Đóng', ja: '閉じる' },
}

function JobCard({ job, lang }: { job: SanityJobOpening; lang: Locale }) {
  const title = t(job.title, lang) ?? ''
  const department = t(job.department, lang)
  const location = t(job.location, lang)
  const employmentType = t(job.employmentType, lang)
  const description = t(job.description, lang)

  return (
    <div className="text-left bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
      <h3 className="text-xl font-black text-white mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {department && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-400/10 text-teal-300 text-xs font-black uppercase tracking-widest">
            {department}
          </span>
        )}
        {location && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-bold">{location}</span>
        )}
        {employmentType && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-bold">{employmentType}</span>
        )}
      </div>
      {description && <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{description}</p>}
    </div>
  )
}

export default function CareersModal({ lang, jobOpenings }: { lang: Locale; jobOpenings: SanityJobOpening[] }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-cta inline-flex items-center justify-center px-8 py-3.5 rounded-full font-black shadow-xl shadow-amber-900/40 uppercase bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm"
      >
        {lang === 'zh' ? '加入團隊' : lang === 'vi' ? 'Gia nhập đội ngũ' : lang === 'ja' ? '採用情報' : 'Join Our Team'}
      </button>

      {open && (
        <div className="fixed inset-0 z-[9998] bg-slate-950/92 backdrop-blur-xl" onClick={() => setOpen(false)}>
          <div
            className="factory-modal-enter absolute inset-0 flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-20 border-b border-white/10 flex items-center justify-between px-4 sm:px-8 shrink-0">
              <span className="text-white font-black text-xl">{lang === 'zh' ? '加入我們' : 'Careers'}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition p-2 bg-white/5 rounded-full"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 px-4 sm:px-8 py-16 max-w-4xl mx-auto w-full text-center">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{T.title[lang]}</h2>
              <p className="text-slate-400 leading-relaxed mb-12">{T.desc[lang]}</p>

              {jobOpenings.length > 0 ? (
                <div className="space-y-4 mb-10">
                  {jobOpenings.map((job) => (
                    <JobCard key={job._id} job={job} lang={lang} />
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 text-slate-300 text-sm leading-relaxed mb-10">
                  {T.empty[lang]}
                </div>
              )}

              <div className="p-10 bg-teal-500/10 border border-teal-500/20 rounded-[3rem]">
                <p className="text-slate-300 font-medium mb-4">{T.cta[lang]}</p>
                <a href="mailto:info@sinowin-vn.com" className="text-2xl font-black text-teal-400">
                  info@sinowin-vn.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
