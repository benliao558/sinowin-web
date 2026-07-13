import { defineType, defineField } from 'sanity'

// Singleton. Holds the SINOWIN company page's LinkedIn OAuth connection.
// access/refresh tokens are stored AES-256-GCM encrypted (see
// src/lib/linkedin/crypto.ts) because the "production" dataset has public
// read access -- ciphertext here is safe, plaintext would not be. The
// encryption key lives only in the LINKEDIN_TOKEN_ENCRYPTION_KEY Vercel env
// var, never in this dataset. All fields are written by the OAuth
// callback/refresh API routes, not edited by hand in the Studio.
export default defineType({
  name: 'linkedinConnection',
  title: 'LinkedIn Connection',
  type: 'document',
  fields: [
    defineField({ name: 'organizationUrn', title: 'Organization URN', type: 'string', readOnly: true }),
    defineField({ name: 'organizationName', title: 'Organization name', type: 'string', readOnly: true }),
    defineField({ name: 'encryptedAccessToken', title: 'Access token (encrypted)', type: 'text', readOnly: true, hidden: true }),
    defineField({ name: 'accessTokenExpiresAt', title: 'Access token expires at', type: 'datetime', readOnly: true }),
    defineField({
      name: 'encryptedRefreshToken',
      title: 'Refresh token (encrypted)',
      type: 'text',
      readOnly: true,
      hidden: true,
      description: 'Only present if LinkedIn granted a refresh token (requires Marketing Developer Platform partner approval). See linkedin-admin status page.',
    }),
    defineField({ name: 'refreshTokenExpiresAt', title: 'Refresh token expires at', type: 'datetime', readOnly: true }),
    defineField({ name: 'connectedAt', title: 'Connected at', type: 'datetime', readOnly: true }),
    defineField({ name: 'lastRefreshedAt', title: 'Last refreshed at', type: 'datetime', readOnly: true }),
    defineField({ name: 'lastRefreshError', title: 'Last refresh error', type: 'text', readOnly: true }),
    defineField({ name: 'lastRefreshErrorAt', title: 'Last refresh error at', type: 'datetime', readOnly: true }),
  ],
  preview: {
    select: { title: 'organizationName', subtitle: 'accessTokenExpiresAt' },
    prepare({ title, subtitle }) {
      return { title: title || 'Not connected', subtitle: subtitle ? `Access token expires ${subtitle}` : '' }
    },
  },
})
