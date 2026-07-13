'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'

export type SamplePrefill = {
  grade: string
  dims: string
  temp: string
  flux: string
}

const T = {
  zh: {
    heading: '樣品與報價申請',
    sub: 'SINOWIN 越南廠具備自主精加工產線，收到需求後將於 24 小時內完成初步審核並回覆。',
    autoFillHeading: '自動帶入的磁鐵規格需求',
    specGrade: '釹鐵硼牌號', specDims: '設定尺寸規格', specTemp: '最高工作溫度', specFlux: '磁通密度估算值',
    specEmpty: '尚未帶入 — 請先在上方工具點選「帶入樣品申請單」',
    fieldName: '您的姓名', fieldEmail: '公司電子信箱', fieldCompany: '公司名稱',
    fieldCoating: '表面鍍層與耐蝕度要求', fieldPurpose: '申請用途與說明',
    purposePlaceholder: '例如：新能源電機打樣試做，需要高一致性，約需 50 片打樣',
    coatingOptions: [
      '雙層鎳銅鎳 Ni-Cu-Ni（抗蝕中，工業標準，24h NSS）',
      '環氧樹脂 Epoxy Coating（抗高鹽霧腐蝕，48–72h NSS）',
      '藍白鋅 Zinc Plating（環保、性價比高，24h NSS）',
      '客製化防鏽要求／無鍍層需求',
    ],
    submit: '送出樣品與報價申請',
    sending: '送出中…',
    success: '已收到您的申請，SINOWIN 工程與業務團隊將於 24 小時內與您聯繫。',
    error: '傳送失敗，請稍後再試，或直接寄信至 info@sinowin-vn.com。',
    required: '請填寫姓名、公司信箱與公司名稱',
    specialNeeds: '需要異型、客製化或非標準規格？請改用下方聯絡表單。',
  },
  en: {
    heading: 'Sample & Quote Request',
    sub: 'SINOWIN Vietnam runs its own precision-machining line — we complete an initial review and reply within 24 hours.',
    autoFillHeading: 'Auto-Filled Magnet Spec',
    specGrade: 'NdFeB Grade', specDims: 'Dimensions', specTemp: 'Max Working Temp', specFlux: 'Estimated Flux Density',
    specEmpty: 'Not filled yet — click "Add to Sample Request" in the tool above',
    fieldName: 'Your Name', fieldEmail: 'Company Email', fieldCompany: 'Company Name',
    fieldCoating: 'Coating & Corrosion Resistance', fieldPurpose: 'Application & Notes',
    purposePlaceholder: 'e.g. New-energy motor prototyping, need high consistency, ~50 pcs',
    coatingOptions: [
      'Ni-Cu-Ni (industry standard, 24h NSS)',
      'Epoxy Coating (high salt-spray resistance, 48–72h NSS)',
      'Zinc Plating (eco-friendly, cost-effective, 24h NSS)',
      'Custom / no coating required',
    ],
    submit: 'Submit Sample & Quote Request',
    sending: 'Sending…',
    success: 'Received — SINOWIN engineering and sales will contact you within 24 hours.',
    error: 'Failed to send. Please try again later or email info@sinowin-vn.com directly.',
    required: 'Please fill in name, company email, and company name',
    specialNeeds: 'Need a custom or non-standard spec? Use the contact form below instead.',
  },
  vi: {
    heading: 'Yêu cầu mẫu & báo giá',
    sub: 'SINOWIN Việt Nam có dây chuyền gia công chính xác riêng — chúng tôi hoàn tất đánh giá sơ bộ và phản hồi trong 24 giờ.',
    autoFillHeading: 'Thông số nam châm được điền tự động',
    specGrade: 'Mác NdFeB', specDims: 'Kích thước', specTemp: 'Nhiệt độ làm việc tối đa', specFlux: 'Từ thông ước tính',
    specEmpty: 'Chưa điền — nhấn "Thêm vào yêu cầu mẫu" ở công cụ phía trên',
    fieldName: 'Họ tên', fieldEmail: 'Email công ty', fieldCompany: 'Tên công ty',
    fieldCoating: 'Yêu cầu lớp mạ & chống ăn mòn', fieldPurpose: 'Mục đích sử dụng & ghi chú',
    purposePlaceholder: 'VD: Làm mẫu động cơ năng lượng mới, cần độ đồng nhất cao, khoảng 50 mẫu',
    coatingOptions: [
      'Ni-Cu-Ni (tiêu chuẩn công nghiệp, 24h NSS)',
      'Epoxy (chống ăn mòn sương muối cao, 48–72h NSS)',
      'Mạ kẽm (thân thiện môi trường, chi phí hợp lý, 24h NSS)',
      'Yêu cầu tùy chỉnh / không cần lớp mạ',
    ],
    submit: 'Gửi yêu cầu mẫu & báo giá',
    sending: 'Đang gửi…',
    success: 'Đã nhận yêu cầu — đội ngũ kỹ thuật và kinh doanh SINOWIN sẽ liên hệ trong 24 giờ.',
    error: 'Gửi thất bại. Vui lòng thử lại hoặc gửi email trực tiếp đến info@sinowin-vn.com.',
    required: 'Vui lòng điền họ tên, email công ty và tên công ty',
    specialNeeds: 'Cần quy cách đặc biệt hoặc tùy chỉnh? Vui lòng dùng biểu mẫu liên hệ bên dưới.',
  },
  ja: {
    heading: 'サンプル・お見積り申請',
    sub: 'SINOWINベトナム工場は自社精密加工ラインを保有し、ご依頼受領後24時間以内に初期確認とご返信を行います。',
    autoFillHeading: '自動入力された磁石仕様',
    specGrade: 'NdFeBグレード', specDims: '寸法', specTemp: '最高使用温度', specFlux: '磁束密度試算値',
    specEmpty: '未入力 — 上のツールで「サンプル申請へ反映」をクリックしてください',
    fieldName: 'お名前', fieldEmail: '会社メールアドレス', fieldCompany: '会社名',
    fieldCoating: '表面処理・耐食性要件', fieldPurpose: '用途・備考',
    purposePlaceholder: '例：新エネルギーモーター試作、高い均一性が必要、約50個',
    coatingOptions: [
      'Ni-Cu-Ni（工業標準、24h NSS）',
      'エポキシコーティング（高耐塩水噴霧性、48–72h NSS）',
      '亜鉛メッキ（環境配慮・コスト効率、24h NSS）',
      'カスタム要件／コーティングなし',
    ],
    submit: 'サンプル・見積り申請を送信',
    sending: '送信中…',
    success: '受け付けました。SINOWINの技術・営業チームが24時間以内にご連絡いたします。',
    error: '送信に失敗しました。後ほど再試行するか、info@sinowin-vn.com まで直接メールしてください。',
    required: 'お名前・会社メールアドレス・会社名をご入力ください',
    specialNeeds: '異形品やカスタム仕様が必要ですか？下記のお問い合わせフォームをご利用ください。',
  },
} as const

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function SampleRequestForm({ lang, prefill }: { lang: Locale; prefill: SamplePrefill | null }) {
  const t = T[lang] ?? T.en

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [coating, setCoating] = useState<string>(t.coatingOptions[0])
  const [purpose, setPurpose] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !company.trim()) {
      setStatus('error')
      setErrorMsg(t.required)
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/sample-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          coating,
          purpose,
          specGrade: prefill?.grade ?? '',
          specDims: prefill?.dims ?? '',
          specTemp: prefill?.temp ?? '',
          specFlux: prefill?.flux ?? '',
        }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      setName('')
      setEmail('')
      setCompany('')
      setPurpose('')
    } catch {
      setStatus('error')
      setErrorMsg(t.error)
    }
  }

  return (
    <div id="sample-request-section" className="scroll-mt-24 bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 border border-white/10 shadow-2xl">
      <div className="border-b border-white/10 pb-4 mb-6">
        <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
          <span className="w-2 h-6 bg-teal-400 rounded-full inline-block" />
          {t.heading}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">{t.sub}</p>
      </div>

      <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-4 mb-6">
        <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest block mb-3">{t.autoFillHeading}</span>
        {prefill ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <SpecTile label={t.specGrade} value={prefill.grade} accent="text-white" />
            <SpecTile label={t.specDims} value={prefill.dims} accent="text-white" />
            <SpecTile label={t.specTemp} value={prefill.temp} accent="text-amber-400" />
            <SpecTile label={t.specFlux} value={prefill.flux} accent="text-teal-400" />
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">{t.specEmpty}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold tracking-widest">{t.fieldName}</label>
          <input
            className="w-full bg-slate-950 border border-white/10 hover:border-white/20 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-white rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === 'sending'}
          />
        </div>
        <div className="md:col-span-4">
          <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold tracking-widest">{t.fieldEmail}</label>
          <input
            type="email"
            className="w-full bg-slate-950 border border-white/10 hover:border-white/20 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-white rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'sending'}
          />
        </div>
        <div className="md:col-span-4">
          <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold tracking-widest">{t.fieldCompany}</label>
          <input
            className="w-full bg-slate-950 border border-white/10 hover:border-white/20 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-white rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={status === 'sending'}
          />
        </div>

        <div className="md:col-span-6">
          <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold tracking-widest">{t.fieldCoating}</label>
          <select
            className="w-full bg-slate-950 border border-white/10 hover:border-white/20 focus:border-teal-400 text-white rounded-lg px-3 py-2.5 text-sm outline-none transition-colors cursor-pointer"
            value={coating}
            onChange={(e) => setCoating(e.target.value)}
            disabled={status === 'sending'}
          >
            {t.coatingOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-6">
          <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold tracking-widest">{t.fieldPurpose}</label>
          <input
            className="w-full bg-slate-950 border border-white/10 hover:border-white/20 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-white rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
            placeholder={t.purposePlaceholder}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            disabled={status === 'sending'}
          />
        </div>

        <div className="md:col-span-12 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-[11px] text-slate-500">{t.specialNeeds}</p>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-cta w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-slate-950 font-black px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest transition disabled:opacity-60 shadow-xl shadow-teal-500/10"
          >
            {status === 'sending' ? t.sending : t.submit}
          </button>
        </div>
        {status === 'success' && <p className="md:col-span-12 text-teal-400 text-xs font-bold text-center">{t.success}</p>}
        {status === 'error' && <p className="md:col-span-12 text-rose-400 text-xs font-bold text-center">{errorMsg}</p>}
      </form>
    </div>
  )
}

function SpecTile({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="bg-slate-900/60 border border-white/5 rounded-lg p-2.5">
      <span className="text-slate-500 block mb-0.5">{label}</span>
      <span className={`font-bold font-mono text-sm ${accent}`}>{value}</span>
    </div>
  )
}
