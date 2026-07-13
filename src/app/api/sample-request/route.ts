import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const TO_EMAIL = 'info@sinowin-vn.com'
// sinowin-vn.com is verified in Resend (SPF/DKIM/DMARC records added 2026-07-11).
const FROM_EMAIL = 'SINOWIN Website <contact@sinowin-vn.com>'

export async function POST(req: Request) {
  let body: {
    name?: string
    email?: string
    company?: string
    coating?: string
    purpose?: string
    specGrade?: string
    specDims?: string
    specTemp?: string
    specFlux?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 })
  }

  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const company = (body.company || '').trim()
  const coating = (body.coating || '').trim()
  const purpose = (body.purpose || '').trim()
  const specGrade = (body.specGrade || '').trim()
  const specDims = (body.specDims || '').trim()
  const specTemp = (body.specTemp || '').trim()
  const specFlux = (body.specFlux || '').trim()

  if (!name || !email || !company) {
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

  const specLines = [
    specGrade && `NdFeB Grade: ${specGrade}`,
    specDims && `Dimensions: ${specDims}`,
    specTemp && `Max working temp: ${specTemp}`,
    specFlux && `Estimated surface flux: ${specFlux}`,
  ].filter(Boolean)

  const textParts: string[] = [`Name: ${name}`, `Email: ${email}`, `Company: ${company}`]
  if (coating) textParts.push(`Coating requirement: ${coating}`)
  if (specLines.length) {
    textParts.push('', '--- Spec from engineer tool ---', ...specLines)
  }
  if (purpose) textParts.push('', `Purpose / notes:\n${purpose}`)
  const text = textParts.join('\n')

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[樣品申請] ${company} — ${specGrade || 'Custom spec'}`,
      text,
    })
    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ ok: false, error: 'Failed to send email' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Sample request send failed:', err)
    return NextResponse.json({ ok: false, error: 'Failed to send email' }, { status: 500 })
  }
}
