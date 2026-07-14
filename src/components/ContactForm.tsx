'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'

const T = {
  title: { zh: '異型產品詢價', en: 'Custom Product Inquiry', vi: 'Yêu cầu báo giá sản phẩm tùy chỉnh', ja: '異形製品のお見積り' },
  hint: {
    zh: '標準規格樣品請使用上方工程師工具；此表單適用於特殊尺寸、客製化或其他洽詢。',
    en: 'For standard-spec samples, please use the Engineer Tools above. This form is for custom sizes, special requirements, or other inquiries.',
    vi: 'Đối với mẫu quy cách tiêu chuẩn, vui lòng dùng Công cụ kỹ sư ở trên. Biểu mẫu này dành cho kích thước tùy chỉnh, yêu cầu đặc biệt hoặc các câu hỏi khác.',
    ja: '標準規格のサンプルは上記のエンジニアツールをご利用ください。本フォームはカスタムサイズ・特殊要件・その他のお問い合わせ用です。',
  },
  optimizingFor: { zh: '這個專案，您優先考量的是？', en: 'For this project, what are you optimizing for?', vi: 'Đối với dự án này, bạn ưu tiên điều gì?', ja: '本プロジェクトで最も重視されるのは？' },
  optimizingForOptions: {
    zh: ['價格與交期', '供應鏈避險', '還在評估中'],
    en: ['Price and lead time', 'Supply chain risk mitigation', 'Still evaluating'],
    vi: ['Giá và thời gian giao hàng', 'Giảm thiểu rủi ro chuỗi cung ứng', 'Đang trong quá trình đánh giá'],
    ja: ['価格とリードタイム', 'サプライチェーンのリスク低減', '検討中'],
  },
  sourcingRestrictions: { zh: '您的採購政策限制範圍是？（可複選）', en: 'What does your sourcing policy restrict? (select all that apply)', vi: 'Chính sách mua hàng của bạn hạn chế điều gì? (chọn tất cả các mục phù hợp)', ja: '貴社の調達方針で制限されるものは？（複数選択可）' },
  sourcingRestrictionOptions: {
    zh: ['生產設備不得為中國製', '原材料不得為中國原產', '需提供完整溯源文件', '尚未明確定義'],
    en: ['Manufacturing equipment', 'Raw material origin', 'Full traceability documentation', 'Not yet defined'],
    vi: ['Thiết bị sản xuất', 'Nguồn gốc nguyên liệu', 'Tài liệu truy xuất nguồn gốc đầy đủ', 'Chưa xác định rõ'],
    ja: ['製造設備', '原材料の原産地', '完全なトレーサビリティ文書', '未定義'],
  },
  name: { zh: '姓名', en: 'Name', vi: 'Họ tên', ja: 'お名前' },
  email: { zh: 'Email', en: 'Email', vi: 'Email', ja: 'メールアドレス' },
  message: { zh: '留言內容', en: 'Message', vi: 'Nội dung', ja: 'メッセージ' },
  submit: { zh: '提交需求', en: 'Send Message', vi: 'Gửi yêu cầu', ja: '送信する' },
  sending: { zh: '傳送中…', en: 'Sending…', vi: 'Đang gửi…', ja: '送信中…' },
  success: { zh: '已送出，我們會盡快與您聯繫。', en: 'Sent — we will get back to you soon.', vi: 'Đã gửi — chúng tôi sẽ liên hệ sớm.', ja: '送信しました。折り返しご連絡いたします。' },
  error: { zh: '傳送失敗，請稍後再試，或直接寄信至 info@sinowin-vn.com。', en: 'Failed to send. Please try again later or email info@sinowin-vn.com directly.', vi: 'Gửi thất bại. Vui lòng thử lại hoặc gửi email trực tiếp đến info@sinowin-vn.com.', ja: '送信に失敗しました。後ほど再試行するか、info@sinowin-vn.com まで直接メールしてください。' },
  required: { zh: '請填寫姓名、Email 與留言內容', en: 'Please fill in name, email, and message', vi: 'Vui lòng điền họ tên, email và nội dung', ja: 'お名前・メールアドレス・メッセージをご入力ください' },
}

// Index-aligned with optimizingForOptions: 0 = price, 1 = risk mitigation, 2 = still evaluating.
const OPTIMIZING_FOR_KEYS = ['price', 'risk', 'evaluating'] as const
const RISK_RELATED_INDEXES = [1, 2]

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm({ lang }: { lang: Locale }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [optimizingForIndex, setOptimizingForIndex] = useState(0)
  const [sourcingRestrictions, setSourcingRestrictions] = useState<string[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const showSourcingRestrictions = RISK_RELATED_INDEXES.includes(optimizingForIndex)

  function toggleRestriction(option: string) {
    setSourcingRestrictions((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error')
      setErrorMsg(T.required[lang])
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          optimizingFor: T.optimizingForOptions[lang][optimizingForIndex],
          optimizingForKey: OPTIMIZING_FOR_KEYS[optimizingForIndex],
          sourcingRestrictions: showSourcingRestrictions ? sourcingRestrictions : [],
        }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
      setOptimizingForIndex(0)
      setSourcingRestrictions([])
    } catch {
      setStatus('error')
      setErrorMsg(T.error[lang])
    }
  }

  return (
    <div className="bg-white/5 p-8 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-inner">
      <h3 className="text-xl font-black text-white mb-2">{T.title[lang]}</h3>
      <p className="text-xs text-slate-400 mb-6">{T.hint[lang]}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold">{T.optimizingFor[lang]}</label>
          <div className="space-y-2">
            {T.optimizingForOptions[lang].map((option, i) => (
              <label
                key={option}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition ${
                  optimizingForIndex === i ? 'bg-teal-500/10 border-teal-400 text-white' : 'bg-slate-950 border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <input
                  type="radio"
                  name="optimizingFor"
                  className="accent-teal-500"
                  checked={optimizingForIndex === i}
                  onChange={() => setOptimizingForIndex(i)}
                  disabled={status === 'sending'}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {showSourcingRestrictions && (
          <div>
            <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold">{T.sourcingRestrictions[lang]}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {T.sourcingRestrictionOptions[lang].map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition ${
                    sourcingRestrictions.includes(option) ? 'bg-teal-500/10 border-teal-400 text-white' : 'bg-slate-950 border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-teal-500"
                    checked={sourcingRestrictions.includes(option)}
                    onChange={() => toggleRestriction(option)}
                    disabled={status === 'sending'}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold">{T.name[lang]}</label>
            <input
              className="w-full calc-input text-sm font-medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'sending'}
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold">{T.email[lang]}</label>
            <input
              type="email"
              className="w-full calc-input text-sm font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'sending'}
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold">{T.message[lang]}</label>
          <textarea
            className="w-full calc-input text-sm font-medium"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={status === 'sending'}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-cta w-full py-4 bg-teal-500 text-slate-900 font-black rounded-2xl transition shadow-xl active:scale-95 uppercase text-xs tracking-widest disabled:opacity-60"
        >
          {status === 'sending' ? T.sending[lang] : T.submit[lang]}
        </button>
        {status === 'success' && <p className="text-teal-400 text-xs font-bold text-center">{T.success[lang]}</p>}
        {status === 'error' && <p className="text-rose-400 text-xs font-bold text-center">{errorMsg}</p>}
      </form>
    </div>
  )
}
