import { NextResponse } from 'next/server'
import { buildAuthorizationUrl } from '@/lib/linkedin/api'
import { createOAuthState, isAdminAuthorized } from '@/lib/linkedin/adminAuth'

export const runtime = 'nodejs'

// Starts the one-time, human-in-the-loop OAuth flow: redirects the (already
// admin-gated) caller to LinkedIn's consent screen. Only a real LinkedIn
// company-page admin can complete the next step, since LinkedIn itself
// requires login + explicit consent.
export async function GET(req: Request) {
  const url = new URL(req.url)
  if (!isAdminAuthorized(url)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const state = createOAuthState()
    const authUrl = buildAuthorizationUrl(state)
    return NextResponse.redirect(authUrl)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to start LinkedIn authorization' }, { status: 500 })
  }
}
