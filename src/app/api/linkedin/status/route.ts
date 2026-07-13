import { NextResponse } from 'next/server'
import { isAdminAuthorized } from '@/lib/linkedin/adminAuth'
import { getConnectionStatus } from '@/lib/linkedin/connection'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const url = new URL(req.url)
  if (!isAdminAuthorized(url)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const status = await getConnectionStatus()
    return NextResponse.json(status)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to load LinkedIn connection status' }, { status: 500 })
  }
}
