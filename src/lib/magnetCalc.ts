// Ported verbatim (same formulas) from the old site's index.html calculateGauss()/rectPrismBzOnAxis_Gs().
export const PROBE_EMBED_MM = 0.45 // Hall probe sensing depth inside probe tip (NeoMag convention)

export type CalcShape = 'cylinder' | 'block'

export function rectPrismBzOnAxis_Gs(BrGs: number, Lmm: number, Wmm: number, Tmm: number, gapMm: number): number {
  const a = Lmm / 2
  const b = Wmm / 2
  const c = Tmm / 2
  const zObs = c + gapMm
  const xs = [0 - a, 0 + a]
  const ys = [0 - b, 0 + b]
  const zs = [zObs - c, zObs + c]
  let sum = 0
  for (let i = 0; i < 2; i++) {
    const x = xs[i]
    for (let j = 0; j < 2; j++) {
      const y = ys[j]
      for (let k = 0; k < 2; k++) {
        const z = zs[k]
        const r = Math.sqrt(x * x + y * y + z * z)
        const numerator = x * y
        const denom = z * r
        sum += ((i + j + k) % 2 === 0 ? 1 : -1) * Math.atan2(numerator, denom)
      }
    }
  }
  return (BrGs / (4 * Math.PI)) * sum
}

export function calculateGauss(params: {
  shape: CalcShape
  br: number
  dim1: number
  dim2: number
  dim3?: number
  hasYoke: boolean
  gapMm?: number
}): number {
  const { shape, br, dim1, dim2, dim3, hasYoke, gapMm } = params
  if (!isFinite(br) || br <= 0) return 0

  const gap = gapMm ?? PROBE_EMBED_MM
  if (!isFinite(gap) || gap < 0) return 0
  let res = 0

  if (shape === 'cylinder') {
    const R = dim1 / 2
    let H = dim2
    if (!isFinite(R) || !isFinite(H) || R <= 0 || H <= 0) return 0
    if (hasYoke) H = H * 2
    const z = gap
    res = (br / 2) * ((H + z) / Math.sqrt(R * R + (H + z) * (H + z)) - z / Math.sqrt(R * R + z * z))
  } else {
    const A = dim1
    const B = dim2
    let C = dim3 ?? 0
    if (!isFinite(A) || !isFinite(B) || !isFinite(C) || A <= 0 || B <= 0 || C <= 0) return 0
    if (hasYoke) C = C * 2
    res = rectPrismBzOnAxis_Gs(br, A, B, C, gap)
  }

  return Math.round(Math.abs(res))
}
