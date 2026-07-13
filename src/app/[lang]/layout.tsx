import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { locales, hreflangMap, type Locale } from '@/lib/i18n'
import { getNavLabels } from '@/sanity/lib/fetch'
import { t } from '@/sanity/lib/localize'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = params.lang as Locale
  const baseUrl = 'https://www.sinowin-vn.com'

  const alternates: Record<string, string> = {}
  locales.forEach((l) => {
    alternates[hreflangMap[l]] = `${baseUrl}/${l}`
  })
  alternates['x-default'] = `${baseUrl}/zh`

  return {
    alternates: {
      languages: alternates,
      canonical: `${baseUrl}/${lang}`,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const nav = await getNavLabels()
  const baseUrl = `/${lang}`

  return (
    <>
      {/* hreflang tags */}
      {locales.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={hreflangMap[l]}
          href={`https://www.sinowin-vn.com/${l}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href="https://www.sinowin-vn.com/zh"
      />
        <div className="sinowin-site-header fixed top-0 left-0 right-0 z-[9999] bg-slate-950/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            <Link href={baseUrl} className="inline-flex items-center gap-3 text-white/80 hover:text-white transition min-w-0 shrink-0">
              <span className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-sm shadow-slate-900/10">
                <Image src="/assets/logo-sn.png" alt="Sinowin" width={32} height={32} className="w-8 h-8 object-contain" />
              </span>
              <span className="font-black text-xl tracking-tighter whitespace-nowrap min-w-0 truncate">
                <span className="text-emerald-400">{lang === 'zh' ? '華榮實業' : 'Sinowin'}</span>{' '}
                <span className="text-white/90">{lang === 'zh' ? '（越南）有限公司' : 'Industrial (Vietnam)'}</span>
              </span>
            </Link>

            <nav className="hidden md:flex flex-1 items-center justify-center gap-7 text-xs font-black uppercase tracking-widest text-white/60 whitespace-nowrap">
              <Link className="nav-link hover:text-white transition" href={`${baseUrl}/manufacturing`}>{t(nav?.manufacturing, lang)}</Link>
              <Link className="nav-link hover:text-white transition" href={`${baseUrl}/about`}>{t(nav?.about, lang)}</Link>
              <Link className="nav-link hover:text-white transition" href={`${baseUrl}/faq`}>{t(nav?.faq, lang)}</Link>
              <Link className="nav-link hover:text-white transition" href={`${baseUrl}/articles`}>{t(nav?.articles, lang)}</Link>
              <Link className="nav-link hover:text-white transition" href={`${baseUrl}#contact`}>{t(nav?.contact, lang)}</Link>
            </nav>

            <div className="flex items-center gap-3 md:gap-4 shrink-0">
              <LanguageSwitcher lang={lang} />
              <Link
                href={`${baseUrl}#contact`}
                className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white font-black text-xs tracking-widest uppercase shadow-lg shadow-emerald-900/30 transition btn-cta"
              >
                {lang === 'zh' ? '一鍵申請樣品' : lang === 'vi' ? 'YÊU CẦU MẪU' : lang === 'ja' ? 'サンプル請求' : 'REQUEST SAMPLE'}
              </Link>
            </div>
          </div>
        </div>
        <div className="h-20" aria-hidden="true" />

        <main>{children}</main>

        <footer className="bg-slate-950 text-slate-500 py-14 border-t border-white/5 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">SINOWIN Industrial (Vietnam) Co., Ltd.</p>
          <p className="text-[10px] font-bold uppercase">
            © {new Date().getFullYear()} {lang === 'zh' ? '華榮實業（越南）有限公司。保留所有權利。' : lang === 'vi' ? 'SINOWIN Industrial (Vietnam) Co., Ltd. Đã đăng ký bản quyền.' : lang === 'ja' ? 'SINOWIN Industrial (Vietnam) Co., Ltd. 無断複写・転載を禁じます。' : 'SINOWIN Industrial (Vietnam) Co., Ltd. All rights reserved.'}
          </p>
        </footer>
    </>
  )
}
