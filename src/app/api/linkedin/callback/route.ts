import { NextResponse } from 'next/server'
import { exchangeCodeForToken, findAdministeredOrganization, getOrganizationName } from '@/lib/linkedin/api'
import { verifyOAuthState } from '@/lib/linkedin/adminAuth'
import { saveNewConnection } from '@/lib/linkedin/connection'

export const runtime = 'nodejs'

// error/error_description/organizationName/message all originate from
// external input (the request's own query string, or LinkedIn API
// responses) and get interpolated into the HTML response below, so they
// must be escaped -- this endpoint is publicly reachable with arbitrary
// query params, not just as a genuine LinkedIn redirect.
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function htmlPage(title: string, body: string) {
  return new NextResponse(
    `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head>` +
      `<body style="font-family:system-ui,sans-serif;max-width:560px;margin:4rem auto;padding:0 1.5rem;line-height:1.6">${body}</body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}

// LinkedIn OAuth 2.0 callback. redirect_uri is registered in the LinkedIn
// Developer Portal as https://www.sinowin-vn.com/api/linkedin/callback, so
// this can only be exercised end-to-end on the production domain (LinkedIn
// rejects any redirect_uri that doesn't exactly match what's registered).
export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const error = url.searchParams.get('error')
  const errorDescription = url.searchParams.get('error_description')

  if (error) {
    return htmlPage(
      'LinkedIn connection cancelled',
      `<h1>Cancelled</h1><p>${escapeHtml(error)}: ${escapeHtml(errorDescription ?? '')}</p>`
    )
  }

  if (!verifyOAuthState(state)) {
    return htmlPage('LinkedIn connection failed', '<h1>Failed</h1><p>Invalid or expired authorization request. Please start again from the LinkedIn admin page.</p>')
  }

  if (!code) {
    return htmlPage('LinkedIn connection failed', '<h1>Failed</h1><p>No authorization code received from LinkedIn.</p>')
  }

  try {
    const tokens = await exchangeCodeForToken(code)
    const org = await findAdministeredOrganization(tokens.accessToken)

    if (!org) {
      return htmlPage(
        'LinkedIn connection failed',
        '<h1>Failed</h1><p>Authenticated with LinkedIn, but no administered company page was found for this account ' +
          '(role ADMINISTRATOR, state APPROVED). Make sure you logged in with an account that manages the SINOWIN ' +
          'company page, and that the LinkedIn app has the correct product/scope approvals.</p>'
      )
    }

    const organizationName = await getOrganizationName(tokens.accessToken, org.urn)

    await saveNewConnection({
      organizationUrn: org.urn,
      organizationName,
      accessToken: tokens.accessToken,
      accessTokenExpiresAt: tokens.accessTokenExpiresAt,
      refreshToken: tokens.refreshToken,
      refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
    })

    const refreshNote = tokens.refreshToken
      ? '<p>A refresh token was also issued, so access will renew automatically.</p>'
      : '<p><strong>Note:</strong> LinkedIn did not issue a refresh token for this app. The access token will need to be ' +
        're-authorized manually roughly every 60 days -- check the status page for the countdown.</p>'

    return htmlPage(
      'LinkedIn connected',
      `<h1>Connected</h1><p>Connected to <strong>${escapeHtml(organizationName ?? org.urn)}</strong>.</p>${refreshNote}` +
        '<p>You can close this tab.</p>'
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return htmlPage('LinkedIn connection failed', `<h1>Failed</h1><p>${escapeHtml(message)}</p>`)
  }
}
