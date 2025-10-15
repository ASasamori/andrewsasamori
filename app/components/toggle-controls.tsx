'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/language-context'
import { translations } from '../lib/translations'

export function ToggleControls() {
  const { isJapanese, toggleLanguage } = useLanguage()
  const [isMusicOn, setIsMusicOn] = useState(false)

  return (
    <div className="flex items-center gap-4">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        <span className="text-sm">{isJapanese ? 'あ' : 'A'}</span>
      </button>

      {/* Music Toggle */}
      <button
        onClick={() => setIsMusicOn(!isMusicOn)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        <span className="text-sm">{isMusicOn ? '🔊' : '🔇'}</span>
      </button> 
    </div>
  )
}
