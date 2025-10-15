'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface LanguageContextType {
  isJapanese: boolean
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [isJapanese, setIsJapanese] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage === 'ja') {
      setIsJapanese(true)
    }
    setIsLoaded(true)
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('language', isJapanese ? 'ja' : 'en')
    }
  }, [isJapanese, isLoaded])

  const toggleLanguage = () => {
    setIsJapanese(!isJapanese)
  }

  return (
    <LanguageContext.Provider value={{ isJapanese, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
