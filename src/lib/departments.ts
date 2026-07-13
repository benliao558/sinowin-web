import type { Locale } from '@/lib/i18n'
import type { JobDepartment, LocaleString } from '@/sanity/lib/types'
import { t } from '@/sanity/lib/localize'

// Keyed by the `preset` value from the Sanity departmentField schema.
// Colors are deliberately restrained (low-opacity fills on the existing
// dark UI, same pattern as every other pill on the site) rather than a
// rainbow -- teal/amber are the two brand colors already used elsewhere,
// the rest are muted enough not to clash with them.
const DEPARTMENT_LABELS: Record<string, Record<Locale, string>> = {
  sales_pm: { zh: '業務/專案管理', en: 'Sales / PM', vi: 'Kinh doanh / QLDA', ja: '営業・PM' },
  production: { zh: '生產', en: 'Production', vi: 'Sản xuất', ja: '生産' },
  qa: { zh: '品保', en: 'Quality Assurance', vi: 'Đảm bảo chất lượng', ja: '品質保証' },
  engineering: { zh: '工程', en: 'Engineering', vi: 'Kỹ thuật', ja: 'エンジニアリング' },
  hr: { zh: '人資', en: 'Human Resources', vi: 'Nhân sự', ja: '人事' },
  finance: { zh: '財務', en: 'Finance', vi: 'Tài chính', ja: '財務' },
}

const DEPARTMENT_COLORS: Record<string, { bg: string; text: string }> = {
  sales_pm: { bg: 'bg-teal-400/15', text: 'text-teal-300' },
  production: { bg: 'bg-amber-400/15', text: 'text-amber-300' },
  qa: { bg: 'bg-sky-400/15', text: 'text-sky-300' },
  engineering: { bg: 'bg-violet-400/15', text: 'text-violet-300' },
  hr: { bg: 'bg-rose-400/15', text: 'text-rose-300' },
  finance: { bg: 'bg-emerald-400/15', text: 'text-emerald-300' },
}
const DEFAULT_COLOR = { bg: 'bg-slate-400/15', text: 'text-slate-300' }

function isPresetShape(d: unknown): d is JobDepartment {
  return typeof d === 'object' && d !== null && 'preset' in d
}

export function getDepartmentLabel(department: JobDepartment | LocaleString | undefined, lang: Locale): string | null {
  if (!department) return null
  if (isPresetShape(department)) {
    if (!department.preset) return null
    if (department.preset === 'other') return t(department.custom, lang) ?? null
    return DEPARTMENT_LABELS[department.preset]?.[lang] ?? department.preset
  }
  // Old flat-localeString documents written before the departmentField schema existed.
  return t(department, lang) ?? null
}

export function getDepartmentColor(department: JobDepartment | LocaleString | undefined): { bg: string; text: string } {
  if (department && isPresetShape(department) && department.preset) {
    return DEPARTMENT_COLORS[department.preset] ?? DEFAULT_COLOR
  }
  return DEFAULT_COLOR
}
