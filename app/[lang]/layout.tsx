import '../global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from '../components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from '../sitemap'
import { Language, languages, getLanguage } from '../lib/i18n'

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const language = getLanguage(lang)

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'Andrew Sasamori',
      template: '%s',
    },
    description: 'My stab at a portfolio.',
    openGraph: {
      title: 'My Portfolio',
      description: 'This is my portfolio.',
      url: `${baseUrl}/${language}`,
      siteName: 'My Portfolio',
      locale: language === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
    },
    icons: {
      icon: '/icons/vibe.png'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      languages: {
        'en-US': `${baseUrl}/en`,
        'ja-JP': `${baseUrl}/jp`,
      },
    },
  }
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const language = getLanguage(lang)

  return (
    <html
      lang={language}
      className={cx(
        'text-black bg-dark-bg dark:text-white dark:bg-gray-900',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-4 lg:mx-auto" suppressHydrationWarning={true}>
        <main className="flex-auto min-w-0 mt-2 flex flex-col px-2 md:px-0">
          <Navbar lang={language} />
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
