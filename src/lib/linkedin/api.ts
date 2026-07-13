// Thin wrapper around LinkedIn's OAuth 2.0 + REST (Posts/Images/Organization
// ACL) APIs. Verified against LinkedIn's official docs as of 2026-07
// (Marketing Developer Platform, li-lms-2026-06):
//   - Posts API:            https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api
//   - Programmatic refresh: https://learn.microsoft.com/en-us/linkedin/shared/authentication/programmatic-refresh-tokens
//   - Organization ACLs:    https://learn.microsoft.com/en-us/linkedin/marketing/community-management/organizations/organization-access-control-by-role
//
// IMPORTANT caveat (see the manual-steps checklist delivered with this
// branch): LinkedIn only returns a refresh_token in the OAuth response if
// the app is an approved Marketing Developer Platform partner. "Share on
// LinkedIn" alone (which is what's enabled today) does not guarantee this.
// Every function below degrades gracefully if refresh_token is absent --
// see src/app/api/linkedin/refresh/route.ts.

const AUTHORIZATION_URL = 'https://www.linkedin.com/oauth/v2/authorization'
const ACCESS_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken'
const API_BASE = 'https://api.linkedin.com/rest'
const LINKEDIN_VERSION = '202606'

// Must exactly match the redirect URL registered in the LinkedIn Developer
// Portal. LinkedIn rejects any mismatch, so this can only be exercised
// end-to-end on the production domain, not a Vercel preview URL.
export const LINKEDIN_REDIRECT_URI = 'https://www.sinowin-vn.com/api/linkedin/callback'

export const LINKEDIN_SCOPE = 'w_organization_social'

function getClientCredentials() {
  const clientId = process.env.LINKEDIN_CLIENT_ID
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error('Missing LINKEDIN_CLIENT_ID / LINKEDIN_CLIENT_SECRET environment variables')
  }
  return { clientId, clientSecret }
}

export function buildAuthorizationUrl(state: string): string {
  const { clientId } = getClientCredentials()
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: LINKEDIN_REDIRECT_URI,
    state,
    scope: LINKEDIN_SCOPE,
  })
  return `${AUTHORIZATION_URL}?${params.toString()}`
}

type TokenResponse = {
  access_token: string
  expires_in: number
  refresh_token?: string
  refresh_token_expires_in?: number
  scope?: string
}

function expiresAtFromNow(seconds: number): string {
  return new Date(Date.now() + seconds * 1000).toISOString()
}

async function postForm(url: string, body: Record<string, string>): Promise<TokenResponse> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(body).toString(),
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`LinkedIn token endpoint ${res.status}: ${text}`)
  }
  return JSON.parse(text) as TokenResponse
}

export async function exchangeCodeForToken(code: string) {
  const { clientId, clientSecret } = getClientCredentials()
  const data = await postForm(ACCESS_TOKEN_URL, {
    grant_type: 'authorization_code',
    code,
    redirect_uri: LINKEDIN_REDIRECT_URI,
    client_id: clientId,
    client_secret: clientSecret,
  })
  return {
    accessToken: data.access_token,
    accessTokenExpiresAt: expiresAtFromNow(data.expires_in),
    refreshToken: data.refresh_token ?? null,
    refreshTokenExpiresAt: data.refresh_token_expires_in ? expiresAtFromNow(data.refresh_token_expires_in) : null,
  }
}

export async function refreshAccessToken(refreshToken: string) {
  const { clientId, clientSecret } = getClientCredentials()
  const data = await postForm(ACCESS_TOKEN_URL, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
  })
  return {
    accessToken: data.access_token,
    accessTokenExpiresAt: expiresAtFromNow(data.expires_in),
    // LinkedIn keeps the same refresh token / TTL across refreshes unless a new one is issued.
    refreshToken: data.refresh_token ?? null,
    refreshTokenExpiresAt: data.refresh_token_expires_in ? expiresAtFromNow(data.refresh_token_expires_in) : null,
  }
}

function restHeaders(accessToken: string, extra?: Record<string, string>) {
  return {
    Authorization: `Bearer ${accessToken}`,
    'X-Restli-Protocol-Version': '2.0.0',
    'Linkedin-Version': LINKEDIN_VERSION,
    ...extra,
  }
}

type OrganizationAclElement = {
  organization: string
  role: string
  state: string
}

// Finds the company page(s) the authenticated member administers. Picks the
// first APPROVED result with a posting-capable role. If SINOWIN ever
// administers more than one LinkedIn page, this naturally picks "the first
// one returned" -- fine for a single-page company, but worth knowing.
export async function findAdministeredOrganization(accessToken: string): Promise<{ urn: string } | null> {
  const params = new URLSearchParams({
    q: 'roleAssignee',
    role: 'ADMINISTRATOR',
    state: 'APPROVED',
    count: '10',
  })
  const res = await fetch(`${API_BASE}/organizationAcls?${params.toString()}`, {
    headers: restHeaders(accessToken),
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`organizationAcls ${res.status}: ${text}`)
  }
  const data = JSON.parse(text) as { elements?: OrganizationAclElement[] }
  const first = data.elements?.[0]
  return first ? { urn: first.organization } : null
}

export async function getOrganizationName(accessToken: string, organizationUrn: string): Promise<string | null> {
  const id = organizationUrn.split(':').pop()
  if (!id) return null
  try {
    const res = await fetch(`${API_BASE}/organizations/${id}`, { headers: restHeaders(accessToken) })
    if (!res.ok) return null
    const data = (await res.json()) as { localizedName?: string }
    return data.localizedName ?? null
  } catch {
    return null
  }
}

// Two-step image upload (initialize -> PUT bytes) per the Images API. Best
// effort: callers should catch failures and post without a thumbnail rather
// than fail the whole post over an image problem.
export async function uploadImage(accessToken: string, organizationUrn: string, imageUrl: string): Promise<string> {
  const initRes = await fetch(`${API_BASE}/images?action=initializeUpload`, {
    method: 'POST',
    headers: restHeaders(accessToken, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ initializeUploadRequest: { owner: organizationUrn } }),
  })
  const initText = await initRes.text()
  if (!initRes.ok) {
    throw new Error(`images initializeUpload ${initRes.status}: ${initText}`)
  }
  const initData = JSON.parse(initText) as { value: { uploadUrl: string; image: string } }

  const imageRes = await fetch(imageUrl)
  if (!imageRes.ok) {
    throw new Error(`Failed to fetch source image ${imageUrl}: ${imageRes.status}`)
  }
  const imageBytes = await imageRes.arrayBuffer()

  const uploadRes = await fetch(initData.value.uploadUrl, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: imageBytes,
  })
  if (!uploadRes.ok) {
    throw new Error(`Image binary upload failed: ${uploadRes.status}`)
  }

  return initData.value.image
}

export async function createArticlePost(params: {
  accessToken: string
  organizationUrn: string
  commentary: string
  articleUrl: string
  articleTitle: string
  articleDescription: string
  thumbnailImageUrn?: string
}): Promise<string> {
  const body = {
    author: params.organizationUrn,
    commentary: params.commentary,
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    lifecycleState: 'PUBLISHED',
    isReshareDisabledByAuthor: false,
    content: {
      article: {
        source: params.articleUrl,
        title: params.articleTitle,
        description: params.articleDescription,
        ...(params.thumbnailImageUrn ? { thumbnail: params.thumbnailImageUrn } : {}),
      },
    },
  }

  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: restHeaders(params.accessToken, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`LinkedIn posts API ${res.status}: ${text}`)
  }
  const postUrn = res.headers.get('x-restli-id')
  if (!postUrn) {
    throw new Error('LinkedIn posts API returned 201 without an x-restli-id header')
  }
  return postUrn
}
