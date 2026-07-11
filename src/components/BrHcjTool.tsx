'use client'

import { useState } from 'react'
import { GradeDatabase, GRADE_SERIES_ORDER, averageBr, type Grade } from '@/content/gradeDatabase'
import { calculateGauss, type CalcShape } from '@/lib/magnetCalc'
import type { Locale } from '@/lib/i18n'

const LABELS: Record<Locale, Record<string, string>> = {
  zh: {
    heading: '釹鐵硼牌號性能表',
    table: '牌號對照表',
    grade: '牌號', br: 'Br (kGs)', hcj: 'Hcj (kOe)', bh: 'BHmax (MGOe)',
    calcHeading: '工程師工具：線上表磁估算',
    calcSub: 'Engineer Tools: Online Surface Flux Density Estimation',
    gradeSelect: '選擇牌號（或手動輸入）', manual: '-- 手動輸入平均剩磁 --',
    shape: '磁鐵形狀', cylinder: '圓柱體', block: '方塊體',
    brLabel: 'Br (Gs)', diameter: 'D (mm)', height: 'H (mm)', length: '長 L (mm)', width: '寬 W (mm)', thickness: '高 H (mm)（磁化方向）',
    yoke: '含背鐵（簡易估算：磁化方向厚度 ×2）',
    submit: '立即估算',
    result: 'Surface Gauss',
    note: '結果為磁鐵表面中心點估算值，實際量測會因探頭型號、間隙與磁材公差而有差異，僅供工程參考。',
  },
  en: {
    heading: 'NdFeB Grade Performance Table',
    table: 'Grade Reference Table',
    grade: 'Grade', br: 'Br (kGs)', hcj: 'Hcj (kOe)', bh: 'BHmax (MGOe)',
    calcHeading: 'Engineer Tools: Online Surface Flux Density Estimation',
    calcSub: 'Estimate surface Gauss from grade, shape and dimensions',
    gradeSelect: 'Select grade (or enter manually)', manual: '-- Manual average Br --',
    shape: 'Magnet Shape', cylinder: 'Cylinder', block: 'Block',
    brLabel: 'Br (Gs)', diameter: 'D (mm)', height: 'H (mm)', length: 'L (mm)', width: 'W (mm)', thickness: 'H (mm) (magnetization dir.)',
    yoke: 'With yoke (approx.: doubles magnetization-direction thickness)',
    submit: 'Estimate',
    result: 'Surface Gauss',
    note: 'Estimated value at the magnet surface center. Actual measurements vary with probe type, gap, and material tolerance — engineering reference only.',
  },
  vi: {
    heading: 'Bảng hiệu suất mác NdFeB',
    table: 'Bảng tra cứu mác',
    grade: 'Mác', br: 'Br (kGs)', hcj: 'Hcj (kOe)', bh: 'BHmax (MGOe)',
    calcHeading: 'Công cụ kỹ sư: Ước tính từ thông bề mặt trực tuyến',
    calcSub: 'Ước tính Gauss bề mặt từ mác, hình dạng và kích thước',
    gradeSelect: 'Chọn mác (hoặc nhập thủ công)', manual: '-- Nhập Br trung bình thủ công --',
    shape: 'Hình dạng nam châm', cylinder: 'Hình trụ', block: 'Khối vuông',
    brLabel: 'Br (Gs)', diameter: 'D (mm)', height: 'H (mm)', length: 'L (mm)', width: 'W (mm)', thickness: 'H (mm) (hướng từ hóa)',
    yoke: 'Có yoke (ước tính: nhân đôi chiều dày hướng từ hóa)',
    submit: 'Ước tính',
    result: 'Surface Gauss',
    note: 'Giá trị ước tính tại tâm bề mặt nam châm. Kết quả đo thực tế có thể khác nhau tùy đầu dò, khe hở và dung sai vật liệu — chỉ để tham khảo kỹ thuật.',
  },
  ja: {
    heading: 'NdFeBグレード性能表',
    table: 'グレード対照表',
    grade: 'グレード', br: 'Br (kGs)', hcj: 'Hcj (kOe)', bh: 'BHmax (MGOe)',
    calcHeading: 'エンジニアツール：表面磁束密度オンライン試算',
    calcSub: 'グレード・形状・寸法から表面ガウスを試算',
    gradeSelect: 'グレードを選択（または手動入力）', manual: '-- 平均残留磁束密度を手動入力 --',
    shape: '磁石形状', cylinder: '円柱', block: '直方体',
    brLabel: 'Br (Gs)', diameter: 'D (mm)', height: 'H (mm)', length: 'L (mm)', width: 'W (mm)', thickness: 'H (mm)（着磁方向）',
    yoke: 'ヨーク付き（簡易試算：着磁方向厚みを×2）',
    submit: '試算する',
    result: 'Surface Gauss',
    note: '磁石表面中心での試算値です。実測はプローブ種類・ギャップ・材料公差により変動します。技術参考値としてご利用ください。',
  },
}

export default function BrHcjTool({ lang }: { lang: Locale }) {
  const t = LABELS[lang] ?? LABELS.en
  const [activeSeries, setActiveSeries] = useState<string>('N')

  const defaultGrade = GradeDatabase.N.data.find((g) => g.id === 'N52') as Grade
  const [gradeId, setGradeId] = useState('N52')
  const [shape, setShape] = useState<CalcShape>('cylinder')
  const [br, setBr] = useState(Math.round(averageBr(defaultGrade.br) * 1000))
  const [dim1, setDim1] = useState(10)
  const [dim2, setDim2] = useState(5)
  const [dim3, setDim3] = useState(10)
  const [hasYoke, setHasYoke] = useState(false)

  const result = calculateGauss({ shape, br, dim1, dim2, dim3, hasYoke })

  function handleGradeChange(id: string) {
    setGradeId(id)
    if (id === 'manual') return
    for (const series of GRADE_SERIES_ORDER) {
      const g = GradeDatabase[series].data.find((x) => x.id === id)
      if (g) {
        setBr(Math.round(averageBr(g.br) * 1000))
        break
      }
    }
  }

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
              {series} {lang === 'zh' ? '系列' : 'Series'} | {lang === 'zh' ? '最高工作溫度' : 'Max working temp'} {GradeDatabase[series].temp}
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
      <div className="hero-gradient rounded-[3rem] p-6 sm:p-10">
        <h2 className="text-3xl font-black text-white mb-1 tracking-tight uppercase">{t.calcHeading}</h2>
        <p className="text-teal-400 text-sm font-medium mb-8">{t.calcSub}</p>
        <div className="glass-card p-6 sm:p-10 rounded-[2rem] shadow-2xl border border-white/10">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-teal-400 uppercase mb-2 tracking-widest">{t.gradeSelect}</label>
                <select
                  className="w-full calc-input text-sm font-bold uppercase"
                  value={gradeId}
                  onChange={(e) => handleGradeChange(e.target.value)}
                >
                  <option value="manual">{t.manual}</option>
                  {GRADE_SERIES_ORDER.map((series) => (
                    <optgroup key={series} label={`${series} ${lang === 'zh' ? '系列' : 'Series'}`}>
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
                    onClick={() => setShape('cylinder')}
                    className={`flex-1 py-3 rounded-xl border text-xs font-black transition uppercase ${
                      shape === 'cylinder' ? 'border-teal-500/30 bg-teal-500/20 text-white' : 'border-white/10 bg-white/5 text-white/70'
                    }`}
                  >
                    {t.cylinder}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShape('block')}
                    className={`flex-1 py-3 rounded-xl border text-xs font-black transition uppercase ${
                      shape === 'block' ? 'border-teal-500/30 bg-teal-500/20 text-white' : 'border-white/10 bg-white/5 text-white/70'
                    }`}
                  >
                    {t.block}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold">{t.brLabel}</label>
                  <input type="number" className="w-full calc-input text-sm font-bold" value={br} onChange={(e) => setBr(parseFloat(e.target.value))} />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold">{shape === 'cylinder' ? t.diameter : t.length}</label>
                  <input type="number" className="w-full calc-input text-sm font-bold" value={dim1} onChange={(e) => setDim1(parseFloat(e.target.value))} />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold">{shape === 'cylinder' ? t.height : t.width}</label>
                  <input type="number" className="w-full calc-input text-sm font-bold" value={dim2} onChange={(e) => setDim2(parseFloat(e.target.value))} />
                </div>
                {shape === 'block' && (
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase mb-1 font-bold">{t.thickness}</label>
                    <input type="number" className="w-full calc-input text-sm font-bold" value={dim3} onChange={(e) => setDim3(parseFloat(e.target.value))} />
                  </div>
                )}
              </div>

              <label className="flex items-center gap-3 text-[12px] font-black uppercase text-slate-200">
                <input type="checkbox" className="accent-teal-400" checked={hasYoke} onChange={(e) => setHasYoke(e.target.checked)} />
                {t.yoke}
              </label>
            </div>

            <div className="md:border-l border-white/10 md:pl-10 text-center">
              <div className="text-7xl font-black text-white mb-2">{result}</div>
              <div className="text-teal-400 font-black tracking-widest text-xs uppercase mb-6">{t.result}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{t.note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
