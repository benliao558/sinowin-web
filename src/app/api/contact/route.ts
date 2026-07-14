import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const TO_EMAIL = 'info@sinowin-vn.com'
// sinowin-vn.com is verified in Resend (SPF/DKIM/DMARC records added 2026-07-11).
const FROM_EMAIL = 'SINOWIN Website <contact@sinowin-vn.com>'

const SUBJECT_TAG: Record<string, string> = {
  price: '[價格]',
  risk: '[避險]',
  evaluating: '[評估中]',
}

export async function POST(req: Request) {
  let body: {
    name?: string
    email?: string
    message?: string
    optimizingFor?: string
    optimizingForKey?: string
    sourcingRestrictions?: string[]
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 })
  }

  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const message = (body.message || '').trim()
  const optimizingFor = (body.optimizingFor || '').trim()
  const optimizingForKey = (body.optimizingForKey || '').trim()
  const sourcingRestrictions = Array.isArray(body.sourcingRestrictions) ? body.sourcingRestrictions.filter((r) => typeof r === 'string' && r.trim()) : []

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return NextResponse.json({ ok: false, error: 'Email service not configured yet' }, { status: 503 })
  }

  const resend = new Resend(apiKey)

  const tag = SUBJECT_TAG[optimizingForKey] || ''
  const subject = tag ? `${tag} 詢價 — ${name}` : `[Website Contact] ${name}`
  const textLines = [`Name: ${name}`, `Email: ${email}`]
  if (optimizingFor) textLines.push(`Optimizing for: ${optimizingFor}`)
  if (sourcingRestrictions.length) textLines.push(`Sourcing policy restrictions: ${sourcingRestrictions.join(', ')}`)
  textLines.push('', 'Message:', message)

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text: textLines.join('\n'),
    })
    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ ok: false, error: 'Failed to send email' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form send failed:', err)
    return NextResponse.json({ ok: false, error: 'Failed to send email' }, { status: 500 })
  }
}
