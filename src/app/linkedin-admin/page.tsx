'use client'

import { useEffect, useState } from 'react'

type Status =
  | { connected: false }
  | {
      connected: true
      organizationUrn: string
      organizationName: string | null
      accessTokenExpiresAt: string | null
      hasRefreshToken: boolean
      refreshTokenExpiresAt: string | null
      connectedAt: string | null
      lastRefreshedAt: string | null
      lastRefreshError: string | null
      lastRefreshErrorAt: string | null
    }

function daysUntil(iso: string | null): number | null {
  if (!iso) return null
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000)
}

function expiryColor(days: number | null): string {
  if (days === null) return '#64748b'
  if (days <= 3) return '#dc2626'
  if (days <= 14) return '#d97706'
  return '#16a34a'
}

// Internal-only tool: not linked from site navigation, gated by
// LINKEDIN_ADMIN_SECRET (?key=...). See src/lib/linkedin/adminAuth.ts for
// why a full auth system isn't warranted here.
export default function LinkedInAdminPage() {
  const [key, setKey] = useState('')
  const [submittedKey, setSubmittedKey] = useState<string | null>(null)
  const [status, setStatus] = useState<Status | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlKey = params.get('key')
    if (urlKey) setSubmittedKey(urlKey)
  }, [])

  useEffect(() => {
    if (!submittedKey) return
    setError(null)
    fetch(`/api/linkedin/status?key=${encodeURIComponent(submittedKey)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status check failed (${res.status})`)
        return res.json()
      })
      .then(setStatus)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load status'))
  }, [submittedKey])

  if (!submittedKey) {
    return (
      <div style={{ maxWidth: 480, margin: '4rem auto', padding: '0 1.5rem', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>LinkedIn Admin</h1>
        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Enter the admin key to continue.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmittedKey(key)
          }}
          style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}
        >
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin key"
            style={{ flex: 1, padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: 8 }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: 8, background: '#0f172a', color: 'white' }}>
            Enter
          </button>
        </form>
      </div>
    )
  }

  const accessDays = status?.connected ? daysUntil(status.accessTokenExpiresAt) : null
  const refreshDays = status?.connected ? daysUntil(status.refreshTokenExpiresAt) : null

  return (
    <div style={{ maxWidth: 560, margin: '4rem auto', padding: '0 1.5rem', fontFamily: 'system-ui, sans-serif', lineHeight: 1.6 }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>LinkedIn Admin</h1>

      {error && <p style={{ color: '#dc2626' }}>{error}</p>}

      {!error && !status && <p>Loading...</p>}

      {status && !status.connected && (
        <>
          <p style={{ marginTop: '1rem' }}>Not connected yet.</p>
          <a
            href={`/api/linkedin/authorize?key=${encodeURIComponent(submittedKey)}`}
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              padding: '0.65rem 1.25rem',
              borderRadius: 8,
              background: '#0a66c2',
              color: 'white',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Connect LinkedIn
          </a>
        </>
      )}

      {status && status.connected && (
        <div style={{ marginTop: '1rem' }}>
          <p>
            Connected to <strong>{status.organizationName ?? status.organizationUrn}</strong>
            {status.connectedAt ? ` (since ${new Date(status.connectedAt).toLocaleDateString()})` : ''}
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 12 }}>
            <div style={{ fontWeight: 600 }}>Access token</div>
            <div style={{ color: expiryColor(accessDays) }}>
              {accessDays !== null ? `Expires in ${accessDays} day(s)` : 'Unknown'} ({status.accessTokenExpiresAt})
            </div>
          </div>

          <div style={{ marginTop: '0.75rem', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 12 }}>
            <div style={{ fontWeight: 600 }}>Refresh token</div>
            {status.hasRefreshToken ? (
              <div style={{ color: expiryColor(refreshDays) }}>
                Present, expires in {refreshDays} day(s) ({status.refreshTokenExpiresAt})
              </div>
            ) : (
              <div style={{ color: '#d97706' }}>
                Not issued by LinkedIn (likely needs Marketing Developer Platform partner approval). Access token will
                need manual re-authorization when it expires.
              </div>
            )}
            {status.lastRefreshedAt && <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Last refreshed: {status.lastRefreshedAt}</div>}
            {status.lastRefreshError && (
              <div style={{ color: '#dc2626', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Last refresh error ({status.lastRefreshErrorAt}): {status.lastRefreshError}
              </div>
            )}
          </div>

          <a
            href={`/api/linkedin/authorize?key=${encodeURIComponent(submittedKey)}`}
            style={{ display: 'inline-block', marginTop: '1.5rem', color: '#0a66c2', fontWeight: 600 }}
          >
            Re-connect / re-authorize
          </a>
        </div>
      )}
    </div>
  )
}
