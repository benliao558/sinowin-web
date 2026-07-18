/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    // The Arafura article's slug was fixed from a working title (with
    // spaces) to a proper kebab-case slug (2026-07-18) -- this article was
    // in sitemap.xml under the old URL for a while, so redirect it rather
    // than let it 404. Both the decoded (space) and pre-encoded (%20) forms
    // are listed since it's unverified which form next.config.js's route
    // matcher sees the incoming request as; harmless to have both.
    const arafuraLocales = ['zh', 'en', 'vi', 'ja']
    const arafuraRedirects = arafuraLocales.flatMap((lang) => [
      {
        source: `/${lang}/articles/Australian rare earth developer Arafura`,
        destination: `/${lang}/articles/arafura-india-rare-earth-supply-chain`,
        permanent: true,
      },
      {
        source: `/${lang}/articles/Australian%20rare%20earth%20developer%20Arafura`,
        destination: `/${lang}/articles/arafura-india-rare-earth-supply-chain`,
        permanent: true,
      },
    ])

    return [
      {
        source: '/',
        destination: '/zh',
        permanent: true,
      },
      ...arafuraRedirects,
    ]
  },
}

module.exports = nextConfig
