import { defineType, defineField } from 'sanity'

// Common departments as a dropdown (keeps the value consistent across jobs
// so the site can color-code by it and translate it uniformly), with an
// "Other" escape hatch that reveals a free-text localized field for
// anything not on the list. Frontend label/color mapping lives in
// src/lib/departments.ts, keyed by `preset`.
const DEPARTMENT_PRESETS = [
  { title: '業務/專案管理 Sales / PM', value: 'sales_pm' },
  { title: '生產 Production', value: 'production' },
  { title: '品保 Quality Assurance', value: 'qa' },
  { title: '工程 Engineering', value: 'engineering' },
  { title: '人資 HR', value: 'hr' },
  { title: '財務 Finance', value: 'finance' },
  { title: '其他（自訂）Other (custom)', value: 'other' },
]

export default defineType({
  name: 'departmentField',
  title: 'Department',
  type: 'object',
  fields: [
    defineField({
      name: 'preset',
      title: 'Department',
      type: 'string',
      options: { list: DEPARTMENT_PRESETS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'custom',
      title: 'Custom department name',
      description: 'Only used when "Other (custom)" is selected above.',
      type: 'localeString',
      hidden: ({ parent }) => (parent as { preset?: string } | undefined)?.preset !== 'other',
    }),
  ],
  preview: {
    select: { preset: 'preset', customZh: 'custom.zh' },
    prepare({ preset, customZh }) {
      const presetLabel = DEPARTMENT_PRESETS.find((p) => p.value === preset)?.title
      return { title: preset === 'other' ? customZh || '(其他, 未命名)' : presetLabel || preset || '(未選擇)' }
    },
  },
})
