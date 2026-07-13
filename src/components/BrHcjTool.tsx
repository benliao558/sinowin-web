'use client'

import { useState } from 'react'
import { GradeDatabase, GRADE_SERIES_ORDER, averageBr, type Grade, type GradeSeries } from '@/content/gradeDatabase'
import { calculateGauss, PROBE_EMBED_MM, type CalcShape } from '@/lib/magnetCalc'
import type { Locale } from '@/lib/i18n'
import SampleRequestForm, { type SamplePrefill } from '@/components/SampleRequestForm'

const LABELS: Record<Locale, Record<string, string>> = {
  zh: {
    heading: '釹鐵硼牌號性能表',
    table: '牌號對照表',
    grade: '牌號', br: 'Br (kGs)', hcj: 'Hcj (kOe)', bh: 'BHmax (MGOe)',
    calcHeading: '工程師工具：線上表磁估算',
    calcSub: 'Engineer Tools: Online Surface Flux Density Estimation',
    gradeSelect: '選擇牌號（或手動輸入）', manual: '-- 手動輸入平均剩磁 --',
    shape: '磁鐵形狀', cylinder: '圓柱體', block: '方塊體',
    brLabel: 'Br (Gs)', diameter: '直徑 D (mm)', height: '高度 H (mm)', length: '長度 L (mm)', width: '寬度 W (mm)', thickness: '充磁方向厚度 T (mm)',
    yoke: '含背鐵（簡易估算：磁化方向厚度 ×2）',
    distance: '量測點距磁極表面距離 z (mm)',
    distanceNote: 'z 值愈小代表量測點愈接近磁鐵表面；預設值為典型 Hall 探頭嵌入深度 (0.45 mm)',
    resultLabel: '軸向磁通密度估算結果',
    resGrade: '輸入牌號', resBr: '估定剩磁 (Br)', resTemp: '工作溫度限值',
    formulaHeading: '表面磁通密度計算公式（參考值，實際以引擎數值運算為準）',
    formulaBlock: 'Bz = (Br / π) × [ arctan( W·L / (2z·√(4z²+W²+L²)) ) − arctan( W·L / (2(z+T)·√(4(z+T)²+W²+L²)) ) ]',
    formulaCylinder: 'Bz = (Br / 2) × [ (z+H) / √(R²+(z+H)²) − z / √(R²+z²) ]',
    ctaHint: '✦ 找到理想的規格了嗎？',
    ctaSub: '一鍵將此計算結果導入樣品申請單。',
    ctaButton: '帶入樣品申請單',
    submit: '立即估算',
    result: 'Surface Gauss',
    note: '結果為磁鐵中心軸線上、距磁極表面 z 處的估算值，實際量測會因探頭型號、間隙與磁材公差而有差異，僅供工程參考。',
  },
  en: {
    heading: 'NdFeB Grade Performance Table',
    table: 'Grade Reference Table',
    grade: 'Grade', br: 'Br (kGs)', hcj: 'Hcj (kOe)', bh: 'BHmax (MGOe)',
    calcHeading: 'Engineer Tools: Online Surface Flux Density Estimation',
    calcSub: 'Estimate axial flux density from grade, shape and dimensions',
    gradeSelect: 'Select grade (or enter manually)', manual: '-- Manual average Br --',
    shape: 'Magnet Shape', cylinder: 'Cylinder', block: 'Block',
    brLabel: 'Br (Gs)', diameter: 'Diameter D (mm)', height: 'Height H (mm)', length: 'Length L (mm)', width: 'Width W (mm)', thickness: 'Thickness T (mm, magnetization dir.)',
    yoke: 'With yoke (approx.: doubles magnetization-direction thickness)',
    distance: 'Distance from pole face z (mm)',
    distanceNote: 'Smaller z means closer to the magnet surface; default is a typical Hall probe embed depth (0.45 mm)',
    resultLabel: 'Estimated Axial Flux Density',
    resGrade: 'Grade', resBr: 'Estimated Br', resTemp: 'Max Working Temp',
    formulaHeading: 'Reference formula (actual result is computed numerically)',
    formulaBlock: 'Bz = (Br / π) × [ arctan( W·L / (2z·√(4z²+W²+L²)) ) − arctan( W·L / (2(z+T)·√(4(z+T)²+W²+L²)) ) ]',
    formulaCylinder: 'Bz = (Br / 2) × [ (z+H) / √(R²+(z+H)²) − z / √(R²+z²) ]',
    ctaHint: '✦ Found the right spec?',
    ctaSub: 'Add this result to a sample request in one click.',
    ctaButton: 'Add to Sample Request',
    submit: 'Estimate',
    result: 'Surface Gauss',
    note: 'Estimated value on the magnet’s central axis at distance z from the pole face. Actual measurements vary with probe type, gap, and material tolerance — engineering reference only.',
  },
  vi: {
    heading: 'Bảng hiệu suất mác NdFeB',
    table: 'Bảng tra cứu mác',
    grade: 'Mác', br: 'Br (kGs)', hcj: 'Hcj (kOe)', bh: 'BHmax (MGOe)',
    calcHeading: 'Công cụ kỹ sư: Ước tính từ thông bề mặt trực tuyến',
    calcSub: 'Ước tính từ thông dọc trục từ mác, hình dạng và kích thước',
    gradeSelect: 'Chọn mác (hoặc nhập thủ công)', manual: '-- Nhập Br trung bình thủ công --',
    shape: 'Hình dạng nam châm', cylinder: 'Hình trụ', block: 'Khối vuông',
    brLabel: 'Br (Gs)', diameter: 'Đường kính D (mm)', height: 'Chiều cao H (mm)', length: 'Chiều dài L (mm)', width: 'Chiều rộng W (mm)', thickness: 'Độ dày T (mm, hướng từ hóa)',
    yoke: 'Có yoke (ước tính: nhân đôi chiều dày hướng từ hóa)',
    distance: 'Khoảng cách đến bề mặt cực z (mm)',
    distanceNote: 'z càng nhỏ càng gần bề mặt nam châm; mặc định là độ sâu đầu dò Hall điển hình (0.45 mm)',
    resultLabel: 'Từ thông dọc trục ước tính',
    resGrade: 'Mác', resBr: 'Br ước tính', resTemp: 'Nhiệt độ làm việc tối đa',
    formulaHeading: 'Công thức tham khảo (kết quả thực tế được tính số học)',
    formulaBlock: 'Bz = (Br / π) × [ arctan( W·L / (2z·√(4z²+W²+L²)) ) − arctan( W·L / (2(z+T)·√(4(z+T)²+W²+L²)) ) ]',
    formulaCylinder: 'Bz = (Br / 2) × [ (z+H) / √(R²+(z+H)²) − z / √(R²+z²) ]',
    ctaHint: '✦ Đã tìm được quy cách phù hợp?',
    ctaSub: 'Đưa kết quả này vào yêu cầu mẫu chỉ với một cú nhấp.',
    ctaButton: 'Thêm vào yêu cầu mẫu',
    submit: 'Ước tính',
    result: 'Surface Gauss',
    note: 'Giá trị ước tính trên trục tâm nam châm, tại khoảng cách z từ bề mặt cực. Kết quả đo thực tế có thể khác nhau tùy đầu dò, khe hở và dung sai vật liệu — chỉ để tham khảo kỹ thuật.',
  },
  ja: {
    heading: 'NdFeBグレード性能表',
    table: 'グレード対照表',
    grade: 'グレード', br: 'Br (kGs)', hcj: 'Hcj (kOe)', bh: 'BHmax (MGOe)',
    calcHeading: 'エンジニアツール：表面磁束密度オンライン試算',
    calcSub: 'グレード・形状・寸法から軸上磁束密度を試算',
    gradeSelect: 'グレードを選択（または手動入力）', manual: '-- 平均残留磁束密度を手動入力 --',
    shape: '磁石形状', cylinder: '円柱', block: '直方体',
    brLabel: 'Br (Gs)', diameter: '直径 D (mm)', height: '高さ H (mm)', length: '長さ L (mm)', width: '幅 W (mm)', thickness: '厚み T (mm、着磁方向)',
    yoke: 'ヨーク付き（簡易試算：着磁方向厚みを×2）',
    distance: '磁極面からの測定距離 z (mm)',
    distanceNote: 'zが小さいほど磁石表面に近づきます。初期値は一般的なホールプローブの埋め込み深さ（0.45mm）',
    resultLabel: '軸上磁束密度の試算結果',
    resGrade: 'グレード', resBr: '推定残留磁束密度', resTemp: '最高使用温度',
    formulaHeading: '参考計算式（実際の結果は数値計算によります）',
    formulaBlock: 'Bz = (Br / π) × [ arctan( W·L / (2z·√(4z²+W²+L²)) ) − arctan( W·L / (2(z+T)·√(4(z+T)²+W²+L²)) ) ]',
    formulaCylinder: 'Bz = (Br / 2) × [ (z+H) / √(R²+(z+H)²) − z / √(R²+z²) ]',
    ctaHint: '✦ 理想の仕様が見つかりましたか？',
    ctaSub: 'この試算結果をワンクリックでサンプル申請に反映します。',
    ctaButton: 'サンプル申請へ反映',
    submit: '試算する',
    result: 'Surface Gauss',
    note: '磁石中心軸上、磁極面から距離zにおける試算値です。実測はプローブ種類・ギャップ・材料公差により変動します。技術参考値としてご利用ください。',
  },
}

const seriesLabel = (lang: Locale) => (lang === 'zh' ? '系列' : lang === 'ja' ? 'シリーズ' : lang === 'vi' ? 'Dòng' : 'Series')

function findGradeInfo(gradeId: string): { grade: Grade; series: GradeSeries } | null {
  for (const series of GRADE_SERIES_ORDER) {
    const grade = GradeDatabase[series].data.find((g) => g.id === gradeId)
    if (grade) return { grade, series: GradeDatabase[series] }
  }
  return null
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  unit: string
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
        <span className="text-teal-400 font-black font-mono text-sm">
          {value.toFixed(step < 1 ? 1 : 0)} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-teal-400 bg-slate-800 h-1.5 rounded-full appearance-none cursor-pointer"
      />
    </div>
  )
}

export default function BrHcjTool({ lang }: { lang: Locale }) {
  const t = LABELS[lang] ?? LABELS.en
  const [activeSeries, setActiveSeries] = useState<string>('N')

  const defaultGrade = GradeDatabase.N.data.find((g) => g.id === 'N52') as Grade
  const [gradeId, setGradeId] = useState('N52')
  const [shape, setShape] = useState<CalcShape>('block')
  const [br, setBr] = useState(Math.round(averageBr(defaultGrade.br) * 1000))
  const [dim1, setDim1] = useState(30) // L or D
  const [dim2, setDim2] = useState(20) // W or H
  const [dim3, setDim3] = useState(10) // T (block only)
  const [hasYoke, setHasYoke] = useState(false)
  const [gapMm, setGapMm] = useState(PROBE_EMBED_MM)

  const [prefill, setPrefill] = useState<SamplePrefill | null>(null)

  const result = calculateGauss({ shape, br, dim1, dim2, dim3, hasYoke, gapMm })
  const resultMt = (result / 10).toFixed(1)
  const gradeInfo = findGradeInfo(gradeId)

  function handleGradeChange(id: string) {
    setGradeId(id)
    if (id === 'manual') return
    const info = findGradeInfo(id)
    if (info) setBr(Math.round(averageBr(info.grade.br) * 1000))
  }

  function handleAddToSample() {
    const gradeLabel = gradeInfo ? gradeInfo.grade.id : lang === 'zh' ? '手動輸入' : 'Manual'
    const dimsLabel =
      shape === 'cylinder'
        ? `Ø${dim1} × H${dim2} mm`
        : `${dim1} × ${dim2} × ${dim3} mm (L×W×T)`
    const tempLabel = gradeInfo ? gradeInfo.series.temp : 'N/A'
    const fluxLabel = `${result} Gauss (${resultMt} mT)`

    setPrefill({ grade: gradeLabel, dims: dimsLabel, temp: tempLabel, flux: fluxLabel })

    document.getElementById('sample-request-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Schematic proportions for the SVG magnet cross-section (shared shape between
  // cylinder/block since a side elevation of either is a rectangle).
  const visualWidth = shape === 'cylinder' ? dim1 : Math.max(dim1, dim2)
  const visualThickness = shape === 'cylinder' ? dim2 : dim3
  const scaleW = clamp(20 + visualWidth / 2.2, 20, 68)
  const scaleT = clamp(10 + visualThickness / 1.4, 10, 46)
  const magnetX = 50 - scaleW / 2
  const magnetY = 50 - scaleT / 2
  const scaleZ = clamp(gapMm * 1.6, 0, 38)
  const pointY = Math.max(6, magnetY - scaleZ)

  return (
    <div>
      {/* Grade table — all series rendered up front (SSG'd, crawlable), tab only toggles visibility */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 tracking-tight uppercase">{t.heading}</h2>
        <div className="bg-slate-100 p-2 rounded-2xl gap-2 flex flex-wrap shadow-inner mb-8">
          {GRADE_SERIES_ORDER.map((series) => (
            <button
              key={series}
              type="button"
              onClick={() => setActiveSeries(series)}
              className={`flex-1 min-w-[70px] py-2 rounded-xl text-sm font-black uppercase transition ${
                activeSeries === series ? 'bg-white text-teal-600 shadow' : 'text-slate-500'
              }`}
            >
              {series}
            </button>
          ))}
        </div>
        {GRADE_SERIES_ORDER.map((series) => (
          <div key={series} className={activeSeries === series ? '' : 'hidden'}>
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
              {series} {seriesLabel(lang)} | {lang === 'zh' ? '最高工作溫度' : 'Max working temp'} {GradeDatabase[series].temp}
            </p>
            <div className="bg-slate-900 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 text-xs uppercase tracking-widest text-left border-b border-white/10">
                      <th className="p-4">{t.grade}</th>
                      <th className="p-4 text-center">{t.br}</th>
                      <th className="p-4 text-center">{t.hcj}</th>
                      <th className="p-4 text-center">{t.bh}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300 text-center">
                    {GradeDatabase[series].data.map((g) => (
                      <tr key={g.id} className="hover:bg-white/5 transition font-bold">
                        <td className="p-4 font-black text-white text-left">{g.id}</td>
                        <td className="p-4">{g.br}</td>
                        <td className="p-4 text-teal-400">&ge; {g.hcj}</td>
                        <td className="p-4 text-slate-400">{g.bh}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Calculator */}
      <div className="hero-gradient rounded-[3rem] p-6 sm:p-10 mb-8">
        <h2 className="text-3xl font-black text-white mb-1 tracking-tight uppercase">{t.calcHeading}</h2>
        <p className="text-teal-400 text-sm font-medium mb-8">{t.calcSub}</p>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-5 glass-card rounded-[2rem] p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-[10px] font-black text-teal-400 uppercase mb-2 tracking-widest">{t.gradeSelect}</label>
              <select
                className="w-full bg-slate-950 border border-white/10 hover:border-white/20 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-white rounded-lg px-3 py-2.5 text-sm font-bold uppercase outline-none transition-colors cursor-pointer"
                value={gradeId}
                onChange={(e) => handleGradeChange(e.target.value)}
              >
                <option value="manual">{t.manual}</option>
                {GRADE_SERIES_ORDER.map((series) => (
                  <optgroup key={series} label={`${series} ${seriesLabel(lang)}`}>
                    {GradeDatabase[series].data.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.id} (Br {g.br} kGs)
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-teal-400 uppercase mb-2 tracking-widest">{t.shape}</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShape('block')}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-black transition uppercase ${
                    shape === 'block' ? 'border-teal-400/40 bg-teal-500/20 text-white' : 'border-white/10 bg-white/5 text-white/60'
                  }`}
                >
                  {t.block}
                </button>
                <button
                  type="button"
                  onClick={() => setShape('cylinder')}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-black transition uppercase ${
                    shape === 'cylinder' ? 'border-teal-400/40 bg-teal-500/20 text-white' : 'border-white/10 bg-white/5 text-white/60'
                  }`}
                >
                  {t.cylinder}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold tracking-widest">{t.brLabel}</label>
              <input
                type="number"
                className="w-full bg-slate-950 border border-white/10 hover:border-white/20 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 text-white rounded-lg px-3 py-2 text-sm font-bold outline-none transition-colors"
                value={br}
                onChange={(e) => setBr(parseFloat(e.target.value))}
              />
            </div>

            {shape === 'cylinder' ? (
              <>
                <Slider label={t.diameter} value={dim1} onChange={setDim1} min={1} max={100} step={0.5} unit="mm" />
                <Slider label={t.height} value={dim2} onChange={setDim2} min={1} max={50} step={0.5} unit="mm" />
              </>
            ) : (
              <>
                <Slider label={t.length} value={dim1} onChange={setDim1} min={1} max={100} step={0.5} unit="mm" />
                <Slider label={t.width} value={dim2} onChange={setDim2} min={1} max={100} step={0.5} unit="mm" />
                <Slider label={t.thickness} value={dim3} onChange={setDim3} min={1} max={50} step={0.5} unit="mm" />
              </>
            )}

            <div>
              <Slider label={t.distance} value={gapMm} onChange={setGapMm} min={0} max={30} step={0.05} unit="mm" />
              <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">{t.distanceNote}</p>
            </div>

            <label className="flex items-center gap-3 text-[11px] font-black uppercase text-slate-200">
              <input type="checkbox" className="accent-teal-400" checked={hasYoke} onChange={(e) => setHasYoke(e.target.checked)} />
              {t.yoke}
            </label>
          </div>

          {/* Visual + result */}
          <div className="lg:col-span-7 glass-card rounded-[2rem] p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid sm:grid-cols-12 gap-6 items-center">
              {/* Dynamic magnet schematic */}
              <div className="sm:col-span-5 bg-slate-950/60 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center h-48 relative">
                <span className="text-[9px] text-slate-500 absolute top-2 left-3 font-mono uppercase tracking-widest">Dimension Schema</span>
                <svg viewBox="0 0 100 100" className="w-32 h-32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="10" y1="50" x2="90" y2="50" stroke="#1e293b" strokeDasharray="2 2" strokeWidth="0.5" />
                  <path d={`M 50 15 C 20 15, 20 85, 50 85`} stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 2" opacity="0.3" />
                  <path d={`M 50 15 C 80 15, 80 85, 50 85`} stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 2" opacity="0.3" />
                  <rect x={magnetX} y={magnetY} width={scaleW} height={scaleT} rx="2.5" fill="url(#magnet-grad)" stroke="#2dd4bf" strokeWidth="1.5" />
                  <text x="50" y={magnetY + scaleT * 0.4} fill="#ffffff" fontSize="7" fontWeight="700" textAnchor="middle">N</text>
                  <text x="50" y={magnetY + scaleT * 0.85} fill="#cbd5e1" fontSize="7" fontWeight="700" textAnchor="middle">S</text>
                  <line x1="50" y1={magnetY} x2="50" y2={pointY} stroke="#fbbf24" strokeWidth="0.75" strokeDasharray="2 2" />
                  <circle cx="50" cy={pointY} r="2.5" fill="#fbbf24" />
                  <defs>
                    <linearGradient id="magnet-grad" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#0f766e" />
                      <stop offset="50%" stopColor="#134e4a" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[9px] text-slate-400 mt-1.5 font-mono flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400" /> z
                </span>
              </div>

              {/* Result readout */}
              <div className="sm:col-span-7 text-center sm:text-left space-y-4">
                <div>
                  <span className="text-[11px] text-slate-400 block font-bold uppercase tracking-widest">{t.resultLabel}</span>
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tight code-font block mt-1">
                    {result} <span className="text-lg font-bold text-slate-400">Gs</span>
                  </span>
                  <span className="text-sm text-teal-400 font-bold font-mono block mt-0.5">= {resultMt} mT</span>
                </div>
                <div className="bg-slate-950/60 border border-white/10 rounded-xl p-3 text-xs space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.resGrade}:</span>
                    <span className="font-black">{gradeInfo ? gradeInfo.grade.id : t.manual}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.resBr}:</span>
                    <span className="font-mono">{(br / 1000).toFixed(1)} kGs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.resTemp}:</span>
                    <span className="text-amber-400 font-bold">{gradeInfo ? gradeInfo.series.temp : '—'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Static formula reference — always in the DOM regardless of interaction, crawlable */}
            <div className="mt-6 border-t border-white/10 pt-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-2 font-mono">{t.formulaHeading}</span>
              <div className="bg-slate-950/50 border border-white/5 rounded-lg p-3 overflow-x-auto text-[11px] text-slate-400 code-font no-scrollbar">
                {shape === 'block' ? t.formulaBlock : t.formulaCylinder}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed mt-4">{t.note}</p>

            {/* CTA bridge to sample request */}
            <div className="mt-6 bg-gradient-to-r from-teal-500/10 to-teal-400/5 border border-teal-400/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs font-black text-teal-400 block">{t.ctaHint}</span>
                <span className="text-xs text-slate-300">{t.ctaSub}</span>
              </div>
              <button
                type="button"
                onClick={handleAddToSample}
                className="btn-cta w-full sm:w-auto bg-teal-400 hover:bg-teal-300 text-slate-950 font-black px-5 py-2.5 rounded-lg text-xs tracking-widest uppercase transition shadow-lg shadow-teal-500/10 flex items-center justify-center gap-1.5"
              >
                {t.ctaButton}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sample / quote request */}
      <SampleRequestForm lang={lang} prefill={prefill} />
    </div>
  )
}
