import { getSanityWriteClient } from './sanityWriteClient'
import { encryptToken, decryptToken } from './crypto'
import { SINGLETON_ID } from '@/sanity/schemaTypes'

const DOC_ID = SINGLETON_ID.linkedinConnection

export type LinkedInConnection = {
  organizationUrn: string
  organizationName: string | null
  accessToken: string
  accessTokenExpiresAt: string
  refreshToken: string | null
  refreshTokenExpiresAt: string | null
  connectedAt: string
  lastRefreshedAt: string | null
  lastRefreshError: string | null
  lastRefreshErrorAt: string | null
}

type RawDoc = {
  organizationUrn?: string
  organizationName?: string
  encryptedAccessToken?: string
  accessTokenExpiresAt?: string
  encryptedRefreshToken?: string
  refreshTokenExpiresAt?: string
  connectedAt?: string
  lastRefreshedAt?: string
  lastRefreshError?: string
  lastRefreshErrorAt?: string
}

export async function getConnection(): Promise<LinkedInConnection | null> {
  const client = getSanityWriteClient()
  const doc = await client.fetch<RawDoc | null>(`*[_type == "linkedinConnection" && _id == $id][0]`, { id: DOC_ID })
  if (!doc || !doc.encryptedAccessToken) return null

  return {
    organizationUrn: doc.organizationUrn ?? '',
    organizationName: doc.organizationName ?? null,
    accessToken: decryptToken(doc.encryptedAccessToken),
    accessTokenExpiresAt: doc.accessTokenExpiresAt ?? '',
    refreshToken: doc.encryptedRefreshToken ? decryptToken(doc.encryptedRefreshToken) : null,
    refreshTokenExpiresAt: doc.refreshTokenExpiresAt ?? null,
    connectedAt: doc.connectedAt ?? '',
    lastRefreshedAt: doc.lastRefreshedAt ?? null,
    lastRefreshError: doc.lastRefreshError ?? null,
    lastRefreshErrorAt: doc.lastRefreshErrorAt ?? null,
  }
}

// Metadata only -- never decrypts tokens. Used by the status route/page.
export async function getConnectionStatus() {
  const client = getSanityWriteClient()
  const doc = await client.fetch<RawDoc | null>(`*[_type == "linkedinConnection" && _id == $id][0]`, { id: DOC_ID })
  if (!doc || !doc.encryptedAccessToken) {
    return { connected: false as const }
  }
  return {
    connected: true as const,
    organizationUrn: doc.organizationUrn ?? '',
    organizationName: doc.organizationName ?? null,
    accessTokenExpiresAt: doc.accessTokenExpiresAt ?? null,
    hasRefreshToken: Boolean(doc.encryptedRefreshToken),
    refreshTokenExpiresAt: doc.refreshTokenExpiresAt ?? null,
    connectedAt: doc.connectedAt ?? null,
    lastRefreshedAt: doc.lastRefreshedAt ?? null,
    lastRefreshError: doc.lastRefreshError ?? null,
    lastRefreshErrorAt: doc.lastRefreshErrorAt ?? null,
  }
}

export async function saveNewConnection(params: {
  organizationUrn: string
  organizationName: string | null
  accessToken: string
  accessTokenExpiresAt: string
  refreshToken: string | null
  refreshTokenExpiresAt: string | null
}) {
  const client = getSanityWriteClient()
  await client.createOrReplace({
    _id: DOC_ID,
    _type: 'linkedinConnection',
    organizationUrn: params.organizationUrn,
    organizationName: params.organizationName,
    encryptedAccessToken: encryptToken(params.accessToken),
    accessTokenExpiresAt: params.accessTokenExpiresAt,
    encryptedRefreshToken: params.refreshToken ? encryptToken(params.refreshToken) : undefined,
    refreshTokenExpiresAt: params.refreshTokenExpiresAt ?? undefined,
    connectedAt: new Date().toISOString(),
    lastRefreshedAt: null,
    lastRefreshError: null,
    lastRefreshErrorAt: null,
  })
}

export async function updateTokensAfterRefresh(params: {
  accessToken: string
  accessTokenExpiresAt: string
  refreshToken: string | null
  refreshTokenExpiresAt: string | null
}) {
  const client = getSanityWriteClient()
  await client
    .patch(DOC_ID)
    .set({
      encryptedAccessToken: encryptToken(params.accessToken),
      accessTokenExpiresAt: params.accessTokenExpiresAt,
      ...(params.refreshToken
        ? { encryptedRefreshToken: encryptToken(params.refreshToken), refreshTokenExpiresAt: params.refreshTokenExpiresAt ?? undefined }
        : {}),
      lastRefreshedAt: new Date().toISOString(),
      lastRefreshError: null,
      lastRefreshErrorAt: null,
    })
    .commit()
}

export async function recordRefreshError(message: string) {
  const client = getSanityWriteClient()
  await client
    .patch(DOC_ID)
    .set({
      lastRefreshError: message,
      lastRefreshErrorAt: new Date().toISOString(),
    })
    .commit()
}
