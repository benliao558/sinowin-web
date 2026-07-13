import { createHmac, timingSafeEqual } from 'node:crypto'

// Lightweight gate for the internal /linkedin-admin page and the routes it
// calls (authorize/status). Not a full auth system -- proportionate to an
// internal, low-traffic, single-admin tool where the real security boundary
// is LinkedIn's own login+consent screen during /authorize anyway. Set
// LINKEDIN_ADMIN_SECRET in Vercel; requests must pass ?key=<that value>.
export function isAdminAuthorized(url: URL): boolean {
  const expected = process.env.LINKEDIN_ADMIN_SECRET?.trim()
  if (!expected) return false
  const provided = url.searchParams.get('key')?.trim()
  if (!provided) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

// Stateless CSRF protection for the OAuth flow: sign a timestamp with a
// server-only secret instead of persisting a session, since this is a
// one-person, one-shot authorization flow. Valid for 10 minutes.
const STATE_TTL_MS = 10 * 60 * 1000

function getStateSecret(): string {
  const secret = process.env.LINKEDIN_TOKEN_ENCRYPTION_KEY?.trim()
  if (!secret) throw new Error('Missing LINKEDIN_TOKEN_ENCRYPTION_KEY environment variable')
  return secret
}

export function createOAuthState(): string {
  const timestamp = Date.now().toString()
  const signature = createHmac('sha256', getStateSecret()).update(timestamp).digest('hex')
  return `${timestamp}.${signature}`
}

export function verifyOAuthState(state: string | null): boolean {
  if (!state) return false
  const [timestamp, signature] = state.split('.')
  if (!timestamp || !signature) return false
  const expectedSignature = createHmac('sha256', getStateSecret()).update(timestamp).digest('hex')
  const a = Buffer.from(signature)
  const b = Buffer.from(expectedSignature)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false
  const age = Date.now() - Number(timestamp)
  return age >= 0 && age <= STATE_TTL_MS
}
