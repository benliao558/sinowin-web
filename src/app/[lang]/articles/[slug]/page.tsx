import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { locales, type Locale } from '@/lib/i18n'
import { getArticleBySlug, getArticleSlugs } from '@/sanity/lib/fetch'
import { t } from '@/sanity/lib/localize'
import { urlForImage } from '@/sanity/lib/image'
import PortableTextRenderer from '@/components/PortableTextRenderer'

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return locales.flatMap((lang) => slugs.map(({ slug }) => ({ lang, slug })))
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const article = await getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: t(article.metaTitle, lang) ?? t(article.title, lang),
    description: t(article.metaDescription, lang) ?? t(article.excerpt, lang),
    alternates: { canonical: `https://www.sinowin-vn.com/${lang}/articles/${params.slug}` },
  }
}

export default async function ArticlePage({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const article = await getArticleBySlug(params.slug)
  if (!article) notFound()

  const title = t(article.title, lang) ?? ''
  const excerpt = t(article.excerpt, lang) ?? ''
  const content = t(article.content, lang)
  const coverImageUrl = urlForImage(article.coverImage)?.width(1600).url()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: excerpt,
        image: coverImageUrl,
        datePublished: article.publishDate,
        author: { '@type': 'Organization', name: 'SINOWIN INDUSTRIAL (VN)' },
        publisher: { '@type': 'Organization', name: 'SINOWIN INDUSTRIAL (VN)', url: 'https://www.sinowin-vn.com' },
      })}} />

      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <a href={`/${lang}/articles`} style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>
            ← {lang === 'zh' ? '產業洞察' : lang === 'vi' ? 'Tin tức ngành' : lang === 'ja' ? '業界インサイト' : 'Industry Insights'}
          </a>
        </div>
        {coverImageUrl && (
          <div style={{ width: '100%', aspectRatio: '16/9', position: 'relative', borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem' }}>
            <Image src={coverImageUrl} alt={title} fill style={{ objectFit: 'cover' }} priority />
          </div>
        )}
        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
          {article.publishDate} · SINOWIN INDUSTRIAL (VN)
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1.5rem' }}>
          {title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
          {excerpt}
        </p>
        <div style={{ lineHeight: 1.8, color: 'var(--color-text)' }}>
          <PortableTextRenderer value={content} />
        </div>
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
          <a href={`/${lang}/articles`} style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>
            ← {lang === 'zh' ? '返回文章列表' : lang === 'vi' ? 'Quay lại danh sách' : lang === 'ja' ? '一覧に戻る' : 'Back to articles'}
          </a>
        </div>
      </article>
    </>
  )
}
