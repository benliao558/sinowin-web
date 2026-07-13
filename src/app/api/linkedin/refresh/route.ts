import { NextResponse } from 'next/server'
import { refreshAccessToken } from '@/lib/linkedin/api'
import { getConnection, updateTokensAfterRefresh, recordRefreshError } from '@/lib/linkedin/connection'

export const runtime = 'nodejs'

const REFRESH_WHEN_DAYS_REMAINING = 20

// Triggered by Vercel Cron (see vercel.json). Vercel automatically sends
// `Authorization: Bearer $CRON_SECRET` on cron-triggered requests when
// CRON_SECRET is set, so this checks that header rather than the
// LINKEDIN_ADMIN_SECRET ?key= scheme used by the human-facing routes.
function isCronAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  return req.headers.get('authorization') === `Bearer ${secret}`
}

export async function GET(req: Request) {
  if (!isCronAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const connection = await getConnection()
  if (!connection) {
    return NextResponse.json({ skipped: 'not connected' })
  }

  if (!connection.refreshToken) {
    // No refresh_token was issued (see the caveat in src/lib/linkedin/api.ts) --
    // nothing to do automatically. The status page's expiry countdown is the
    // safety net so this doesn't fail silently.
    return NextResponse.json({
      skipped: 'no refresh token available - manual reauthorization required before access token expires',
      accessTokenExpiresAt: connection.accessTokenExpiresAt,
    })
  }

  const daysRemaining = (new Date(connection.accessTokenExpiresAt).getTime() - Date.now()) / 86_400_000
  if (daysRemaining > REFRESH_WHEN_DAYS_REMAINING) {
    return NextResponse.json({ skipped: 'access token still valid', daysRemaining: Math.round(daysRemaining) })
  }

  try {
    const refreshed = await refreshAccessToken(connection.refreshToken)
    await updateTokensAfterRefresh(refreshed)
    return NextResponse.json({ ok: true, accessTokenExpiresAt: refreshed.accessTokenExpiresAt })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    // Never let a refresh failure look like a crashed cron job -- record it
    // so the status page/admin page surfaces it, and return 200.
    await recordRefreshError(message)
    return NextResponse.json({ ok: false, error: message })
  }
}
