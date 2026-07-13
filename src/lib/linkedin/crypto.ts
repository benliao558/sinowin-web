import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

// Encrypts LinkedIn access/refresh tokens before they're stored in Sanity.
// The "production" dataset has public read access (see src/sanity/lib/client.ts),
// so raw tokens must never be written there -- only ciphertext that's useless
// without this key, which lives solely in the LINKEDIN_TOKEN_ENCRYPTION_KEY
// Vercel env var (never in Sanity, never in git).
const ALGORITHM = 'aes-256-gcm'

function getKey(): Buffer {
  const raw = process.env.LINKEDIN_TOKEN_ENCRYPTION_KEY?.trim()
  if (!raw) {
    throw new Error('Missing LINKEDIN_TOKEN_ENCRYPTION_KEY environment variable')
  }
  const key = Buffer.from(raw, 'base64')
  if (key.length !== 32) {
    throw new Error('LINKEDIN_TOKEN_ENCRYPTION_KEY must decode to 32 bytes (generate with: openssl rand -base64 32)')
  }
  return key
}

// Returns "iv.authTag.ciphertext", each base64, joined with "."
export function encryptToken(plaintext: string): string {
  const key = getKey()
  const iv = randomBytes(12)
  const cipher = createCipheriv(ALGORITHM, key, iv)
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()
  return [iv.toString('base64'), authTag.toString('base64'), ciphertext.toString('base64')].join('.')
}

export function decryptToken(blob: string): string {
  const key = getKey()
  const [ivB64, authTagB64, ciphertextB64] = blob.split('.')
  if (!ivB64 || !authTagB64 || !ciphertextB64) {
    throw new Error('Malformed encrypted token blob')
  }
  const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(ivB64, 'base64'))
  decipher.setAuthTag(Buffer.from(authTagB64, 'base64'))
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(ciphertextB64, 'base64')),
    decipher.final(),
  ])
  return plaintext.toString('utf8')
}
