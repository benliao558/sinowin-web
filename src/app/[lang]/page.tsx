import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { siteContent } from '@/content/site'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang as Locale
  const titles: Record<Locale, string> = {
    zh: 'SINOWIN INDUSTRIAL (VN) — 越南精密磁材加工',
    en: 'SINOWIN INDUSTRIAL (VN) — Precision Magnet Processing in Vietnam',
    vi: 'SINOWIN INDUSTRIAL (VN) — Gia công nam châm chính xác tại Việt Nam',
    ja: 'SINOWIN INDUSTRIAL (VN) — ベトナムの精密磁石加工',
  }
  const descs: Record<Locale, string> = {
    zh: '年產能 2,000 噸，去中化設備專線，ISO 9001 / ISO 14001 / ISO 45001 認證。越南精密磁材代工首選。',
    en: '2,000 MT/year capacity, China-free supply chain, ISO 9001/14001/45001 certified. Vietnam\'s leading precision magnet contract manufacturer.',
    vi: 'Công suất 2.000 tấn/năm, chuỗi cung ứng không liên quan Trung Quốc, chứng nhận ISO 9001/14001/45001.',
    ja: '年産2,000トン、中国フリーサプライチェーン、ISO 9001/14001/45001認証取得。ベトナムの精密磁石加工。',
  }
  return { title: titles[lang], description: descs[lang] }
}

const s = siteContent

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Locale
  if (!locales.includes(lang)) notFound()

  const home = s.home
  const mfg = s.manufacturing

  return (
    <>
      {/* JSON-LD Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SINOWIN INDUSTRIAL (VN)',
            url: 'https://www.sinowin-vn.com',
            email: 'info@sinowin-vn.com',
            address: { '@type': 'PostalAddress', addressCountry: 'VN', addressRegion: 'Bac Giang' },
            sameAs: [],
          }),
        }}
      />

      {/* Hero */}
      <section style={{ padding: '5rem 2rem 4rem', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
          {home.hero.title[lang]}
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-muted)', maxWidth: '640px', lineHeight: 1.7 }}>
          {home.hero.subtitle[lang]}
        </p>
      </section>

      {/* Key metrics */}
      <section style={{ background: 'var(--color-primary)', color: 'white', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {[
            { value: '2,000 MT', label: lang === 'zh' ? '年加工產能' : lang === 'vi' ? 'Công suất năm' : lang === 'ja' ? '年間処理能力' : 'Annual Capacity' },
            { value: '6', label: lang === 'zh' ? '製造車間' : lang === 'vi' ? 'Xưởng sản xuất' : lang === 'ja' ? '製造ワークショップ' : 'Workshops' },
            { value: '>99.5%', label: lang === 'zh' ? '批次合格率' : lang === 'vi' ? 'Tỷ lệ đạt lô' : lang === 'ja' ? 'バッチ合格率' : 'Batch Pass Rate' },
            { value: '<1μm', label: lang === 'zh' ? 'CMM 量測精度' : lang === 'vi' ? 'Độ chính xác CMM' : lang === 'ja' ? 'CMM精度' : 'CMM Accuracy' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>{value}</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.7, marginTop: '0.5rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Supply Chain Advantage */}
      <section style={{ padding: '4rem 2rem', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {lang === 'zh' ? '核心優勢' : lang === 'vi' ? 'Lợi thế cốt lõi' : lang === 'ja' ? 'コア優位性' : 'Core Advantage'}
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              {s.home.supplyChain.title[lang]}
            </h2>
            <p style={{ color: 'var(--color-muted)', lineHeight: 1.8 }}>
              {s.home.supplyChain.body[lang]}
            </p>
          </div>
          <div style={{ background: 'var(--color-surface)', borderRadius: '12px', padding: '2rem' }}>
            {[
              lang === 'zh' ? '✓ 機加工設備不涉中國供應鏈' : lang === 'vi' ? '✓ Thiết bị gia công không từ Trung Quốc' : lang === 'ja' ? '✓ 機械加工設備は中国製不使用' : '✓ Machining equipment: China-free',
              lang === 'zh' ? '✓ 充磁設備不涉中國供應鏈' : lang === 'vi' ? '✓ Thiết bị từ hóa không từ Trung Quốc' : lang === 'ja' ? '✓ 磁化設備は中国製不使用' : '✓ Magnetizing equipment: China-free',
              lang === 'zh' ? '✓ 測試設備不涉中國供應鏈' : lang === 'vi' ? '✓ Thiết bị kiểm tra không từ Trung Quốc' : lang === 'ja' ? '✓ 検査設備は中国製不使用' : '✓ Testing equipment: China-free',
            ].map((item) => (
              <div key={item} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--color-border)', fontSize: '0.95rem', fontWeight: 500 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing overview */}
      <section style={{ padding: '4rem 2rem', background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            {mfg.pageTitle[lang]}
          </h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '2.5rem' }}>{mfg.intro[lang]}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {mfg.workshops.map((w) => (
              <div key={w.id} style={{ background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)', padding: '1.5rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{w.name[lang]}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{w.specs[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ padding: '4rem 2rem', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
          {lang === 'zh' ? '認證' : lang === 'vi' ? 'Chứng nhận' : lang === 'ja' ? '認証' : 'Certifications'}
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {s.certifications.filter(c => c.confirmed).map((cert) => (
            <div key={cert.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', padding: '0.75rem 1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
              {cert.name}
            </div>
          ))}
        </div>
      </section>

      {/* Contact anchor */}
      <section id="contact" style={{ padding: '4rem 2rem', background: 'var(--color-primary)', color: 'white' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
            {lang === 'zh' ? '聯絡我們' : lang === 'vi' ? 'Liên hệ với chúng tôi' : lang === 'ja' ? 'お問い合わせ' : 'Contact Us'}
          </h2>
          <p style={{ opacity: 0.8, marginBottom: '2rem' }}>info@sinowin-vn.com</p>
        </div>
      </section>
    </>
  )
}
