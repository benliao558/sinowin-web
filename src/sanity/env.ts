export const apiVersion = '2024-01-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
if (!rawProjectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

export const projectId: string = rawProjectId
