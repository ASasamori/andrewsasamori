'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Language } from '../lib/i18n'

export function ToggleControls({ lang }: { lang: Language }) {
  const pathname = usePathname()

  // Get the path without the language prefix
  const pathWithoutLang = pathname?.replace(/^\/(en|ja)/, '') || '/'

  // Determine the alternate language
  const alternateLang: Language = lang === 'ja' ? 'en' : 'ja'
  const alternatePath = `/${alternateLang}${pathWithoutLang}`

  const isJapanese = lang === 'ja'

  return (
    <Link
      href={alternatePath}
      className="relative inline-flex items-center w-16 h-8 rounded-full transition-all duration-300 ease-in-out hover:opacity-80 border-2"
      style={{
        background: isJapanese ? '#BC002D' : '#3C3B6E',
        borderColor: isJapanese ? '#BC002D' : '#3C3B6E'
      }}
    >
      {/* Slider circle */}
      <span
        className="absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center text-xs font-bold shadow-md"
        style={{
          left: isJapanese ? '4px' : 'calc(100% - 28px)',
          background: '#ffffff',
          color: isJapanese ? '#BC002D' : '#3C3B6E'
        }}
      >
        {isJapanese ? 'あ' : 'A'}
      </span>
    </Link>
  )
}
