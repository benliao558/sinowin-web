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
  name: { zh: '姓名', en: 'Name', vi: 'Họ tên', ja: 'お名前' },
  email: { zh: 'Email', en: 'Email', vi: 'Email', ja: 'メールアドレス' },
  message: { zh: '留言內容', en: 'Message', vi: 'Nội dung', ja: 'メッセージ' },
  submit: { zh: '提交需求', en: 'Send Message', vi: 'Gửi yêu cầu', ja: '送信する' },
  sending: { zh: '傳送中…', en: 'Sending…', vi: 'Đang gửi…', ja: '送信中…' },
  success: { zh: '已送出，我們會盡快與您聯繫。', en: 'Sent — we will get back to you soon.', vi: 'Đã gửi — chúng tôi sẽ liên hệ sớm.', ja: '送信しました。折り返しご連絡いたします。' },
  error: { zh: '傳送失敗，請稍後再試，或直接寄信至 info@sinowin-vn.com。', en: 'Failed to send. Please try again later or email info@sinowin-vn.com directly.', vi: 'Gửi thất bại. Vui lòng thử lại hoặc gửi email trực tiếp đến info@sinowin-vn.com.', ja: '送信に失敗しました。後ほど再試行するか、info@sinowin-vn.com まで直接メールしてください。' },
  required: { zh: '請填寫姓名、Email 與留言內容', en: 'Please fill in name, email, and message', vi: 'Vui lòng điền họ tên, email và nội dung', ja: 'お名前・メールアドレス・メッセージをご入力ください' },
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm({ lang }: { lang: Locale }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

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
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
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
