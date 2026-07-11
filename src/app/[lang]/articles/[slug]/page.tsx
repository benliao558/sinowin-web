import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { locales, type Locale } from '@/lib/i18n'
import { articles, getArticleBySlug, getTranslation } from '@/content/articles'

export async function generateStaticParams() {
  return locales.flatMap(lang =>
    articles.map(a => ({ lang, slug: a.slug }))
  )
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  const t = getTranslation(article, lang)
  return {
    title: t?.metaTitle ?? t?.title,
    description: t?.metaDescription ?? t?.excerpt,
    alternates: { canonical: `https://www.sinowin-vn.com/${lang}/articles/${params.slug}` },
  }
}

export default function ArticlePage({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const t = getTranslation(article, lang)
  if (!t) notFound()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: t.title,
        description: t.excerpt,
        image: article.coverImage ? `https://www.sinowin-vn.com${article.coverImage}` : undefined,
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
        {article.coverImage && (
          <div style={{ width: '100%', aspectRatio: '16/9', position: 'relative', borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem' }}>
            <Image src={article.coverImage} alt={t.title} fill style={{ objectFit: 'cover' }} priority />
          </div>
        )}
        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
          {article.publishDate} · SINOWIN INDUSTRIAL (VN)
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1.5rem' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
          {t.excerpt}
        </p>
        <div style={{ lineHeight: 1.8, color: 'var(--color-text)' }} dangerouslySetInnerHTML={{ __html: t.content }} />
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
          <a href={`/${lang}/articles`} style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>
            ← {lang === 'zh' ? '返回文章列表' : lang === 'vi' ? 'Quay lại danh sách' : lang === 'ja' ? '一覧に戻る' : 'Back to articles'}
          </a>
        </div>
      </article>
    </>
  )
}
