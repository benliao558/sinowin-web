// 30 character illustrations extracted from the "manpower30" reference sheet
// (public/manpower/*.png), used as decorative floating figures on job cards.
const MANPOWER_FILES: string[] = [
  '01_indian_male_01.png', '02_indian_female_02.png', '03_indian_male_03.png', '04_indian_female_04.png', '05_indian_male_05.png',
  '06_indian_male_06.png', '07_indian_female_07.png', '08_indian_male_08.png', '09_indian_female_09.png', '10_indian_male_10.png',
  '11_american_male_01.png', '12_american_female_02.png', '13_american_male_03.png', '14_american_female_04.png', '15_american_male_05.png',
  '16_american_female_06.png', '17_american_male_07.png', '18_american_female_08.png', '19_american_male_09.png', '20_american_female_10.png',
  '21_vietnamese_male_01.png', '22_vietnamese_female_02.png', '23_vietnamese_male_03.png', '24_vietnamese_female_04.png', '25_vietnamese_male_05.png',
  '26_vietnamese_female_06.png', '27_vietnamese_male_07.png', '28_vietnamese_female_08.png', '29_vietnamese_male_09.png', '30_vietnamese_female_10.png',
]

// Simple deterministic string hash (FNV-1a) -- not for security, just for a
// stable, well-distributed job._id -> index mapping.
function hashString(input: string, seed = 0): number {
  let h = (2166136261 ^ seed) >>> 0
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export type CardCharacter = { file: string }

// Manual pin: the "PM 專案管理師" job's hash happened to land on a male
// character; the user specifically asked for this listing to show a female
// one instead. Keyed by Sanity document _id rather than title, since title
// text differs per locale -- if this job is ever deleted and recreated in
// Sanity (a new _id), this silently falls back to the normal hash-based
// assignment below rather than breaking.
const CHARACTER_OVERRIDES: Record<string, string> = {
  'dac9084f-ecc7-4954-b55a-5def6d42a80b': '12_american_female_02.png',
}

// Deterministic per-job character assignment: the same job _id always maps
// to the same base character, so a page refresh never swaps anyone out. A
// single left-to-right pass over the currently displayed list then nudges
// any assignment that collides with its immediate predecessor, so adjacent
// cards never show the same pose/expression -- reused characters (past 30
// jobs) still land away from each other rather than back-to-back.
export function assignCharacters(jobIds: string[]): CardCharacter[] {
  const n = MANPOWER_FILES.length
  const baseIndexes = jobIds.map((id) => hashString(id) % n)
  const assigned: number[] = []
  for (let i = 0; i < baseIndexes.length; i++) {
    let idx = baseIndexes[i]
    let attempts = 0
    while (i > 0 && idx === assigned[i - 1] && attempts < n) {
      idx = (idx + 1) % n
      attempts++
    }
    assigned.push(idx)
  }
  return jobIds.map((id, i) => ({
    file: CHARACTER_OVERRIDES[id] ?? MANPOWER_FILES[assigned[i]],
  }))
}
