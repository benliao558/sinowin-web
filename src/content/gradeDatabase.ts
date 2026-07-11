export type Grade = { id: string; br: string; hcj: string; bh: string }
export type GradeSeries = { color: string; temp: string; data: Grade[] }

// Ported verbatim from the old site's index.html `GradeDatabase` object.
export const GradeDatabase: Record<string, GradeSeries> = {
  N: {
    color: '#0d9488',
    temp: '≤80°C',
    data: [
      { id: 'N35', br: '11.8-12.5', hcj: '12', bh: '31-36' },
      { id: 'N38', br: '12.3-13.0', hcj: '12', bh: '34-39' },
      { id: 'N40', br: '12.6-13.2', hcj: '12', bh: '36-41' },
      { id: 'N42', br: '12.9-13.5', hcj: '12', bh: '38-43' },
      { id: 'N45', br: '13.3-13.8', hcj: '12', bh: '41-46' },
      { id: 'N48', br: '13.7-14.3', hcj: '12', bh: '44-49' },
      { id: 'N50', br: '13.9-14.6', hcj: '12', bh: '46-51' },
      { id: 'N52', br: '14.2-14.8', hcj: '12', bh: '48-53' },
      { id: 'N54', br: '14.4-15.1', hcj: '11', bh: '50-55' },
      { id: 'N56', br: '14.6-15.2', hcj: '11', bh: '51-57' },
    ],
  },
  M: {
    color: '#0891b2',
    temp: '≤100°C',
    data: [
      { id: 'N35M', br: '11.8-12.5', hcj: '14', bh: '31-36' },
      { id: 'N38M', br: '12.3-13.0', hcj: '14', bh: '34-39' },
      { id: 'N40M', br: '12.6-13.2', hcj: '14', bh: '36-41' },
      { id: 'N42M', br: '12.9-13.5', hcj: '14', bh: '38-43' },
      { id: 'N45M', br: '13.3-13.8', hcj: '14', bh: '41-46' },
      { id: 'N48M', br: '13.7-14.3', hcj: '14', bh: '44-49' },
      { id: 'N50M', br: '13.9-14.6', hcj: '14', bh: '46-51' },
      { id: 'N52M', br: '14.2-14.8', hcj: '13', bh: '48-53' },
      { id: 'N54M', br: '14.4-15.0', hcj: '13', bh: '50-55' },
      { id: 'N56M', br: '14.6-15.1', hcj: '13', bh: '51-57' },
    ],
  },
  H: {
    color: '#2563eb',
    temp: '≤120°C',
    data: [
      { id: 'N35H', br: '11.8-12.5', hcj: '17', bh: '31-36' },
      { id: 'N38H', br: '12.3-13.0', hcj: '17', bh: '34-39' },
      { id: 'N40H', br: '12.6-13.2', hcj: '17', bh: '36-41' },
      { id: 'N42H', br: '12.9-13.7', hcj: '17', bh: '38-43' },
      { id: 'N45H', br: '13.3-14.0', hcj: '17', bh: '41-46' },
      { id: 'N48H', br: '13.7-14.2', hcj: '16', bh: '44-49' },
      { id: 'N50H', br: '13.9-14.5', hcj: '16', bh: '46-51' },
      { id: 'N52H', br: '14.2-14.7', hcj: '16', bh: '48-53' },
      { id: 'N54H', br: '14.4-15.0', hcj: '16', bh: '50-55' },
      { id: 'N56H', br: '14.6-15.0', hcj: '16', bh: '51-57' },
    ],
  },
  SH: {
    color: '#7c3aed',
    temp: '≤150°C',
    data: [
      { id: 'N35SH', br: '11.8-12.5', hcj: '20', bh: '31-36' },
      { id: 'N38SH', br: '12.3-13.0', hcj: '20', bh: '34-39' },
      { id: 'N40SH', br: '12.6-13.2', hcj: '20', bh: '36-41' },
      { id: 'N42SH', br: '12.9-13.4', hcj: '20', bh: '38-43' },
      { id: 'N45SH', br: '13.3-13.8', hcj: '20', bh: '41-46' },
      { id: 'N48SH', br: '13.7-14.2', hcj: '19', bh: '44-49' },
      { id: 'N50SH', br: '13.9-14.3', hcj: '19', bh: '46-51' },
      { id: 'N52SH', br: '14.2-14.5', hcj: '19', bh: '48-53' },
      { id: 'N54SH', br: '14.4-14.7', hcj: '19', bh: '50-55' },
    ],
  },
  UH: {
    color: '#db2777',
    temp: '≤180°C',
    data: [
      { id: 'N33UH', br: '11.4-12.2', hcj: '25', bh: '29-34' },
      { id: 'N35UH', br: '11.8-12.5', hcj: '25', bh: '31-36' },
      { id: 'N38UH', br: '12.3-12.8', hcj: '25', bh: '34-39' },
      { id: 'N40UH', br: '12.6-13.2', hcj: '25', bh: '36-41' },
      { id: 'N42UH', br: '12.9-13.5', hcj: '25', bh: '38-43' },
      { id: 'N45UH', br: '13.3-13.8', hcj: '24', bh: '41-46' },
    ],
  },
  EH: {
    color: '#dc2626',
    temp: '≤200°C',
    data: [
      { id: 'N30EH', br: '10.8-11.7', hcj: '30', bh: '26-31' },
      { id: 'N33EH', br: '11.4-12.0', hcj: '30', bh: '29-34' },
      { id: 'N35EH', br: '11.8-12.3', hcj: '30', bh: '31-36' },
      { id: 'N38EH', br: '12.2-12.8', hcj: '30', bh: '34-39' },
      { id: 'N40EH', br: '12.5-13.1', hcj: '30', bh: '36-41' },
      { id: 'N42EH', br: '12.8-13.4', hcj: '29', bh: '38-43' },
    ],
  },
  EHS: {
    color: '#f59e0b',
    temp: '≤230°C',
    data: [
      { id: 'N28EHS', br: '10.5-11.3', hcj: '35', bh: '24-29' },
      { id: 'N30EHS', br: '10.8-11.7', hcj: '35', bh: '26-31' },
      { id: 'N33EHS', br: '11.4-12.0', hcj: '35', bh: '28-34' },
      { id: 'N35EHS', br: '11.8-12.5', hcj: '35', bh: '31-36' },
      { id: 'N38EHS', br: '12.2-12.8', hcj: '33', bh: '34-39' },
    ],
  },
}

export const GRADE_SERIES_ORDER = ['N', 'M', 'H', 'SH', 'UH', 'EH', 'EHS'] as const

export function averageBr(brRange: string): number {
  const [lo, hi] = brRange.split('-').map(parseFloat)
  return (lo + hi) / 2
}
