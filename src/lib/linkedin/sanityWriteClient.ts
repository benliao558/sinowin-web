import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

// Server-only, write-capable Sanity client for the LinkedIn integration
// (storing the connection singleton, writing sync-log entries). Distinct
// from src/sanity/lib/client.ts, which is the public read-only client used
// by pages. Only ever imported from API routes (never from client code).
function getToken(): string {
  const token = process.env.SANITY_API_TOKEN
  if (!token) {
    throw new Error('Missing SANITY_API_TOKEN environment variable (needs Editor role or higher)')
  }
  return token
}

export function getSanityWriteClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    token: getToken(),
    useCdn: false,
  })
}
