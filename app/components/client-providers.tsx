'use client'

import { LanguageProvider } from '../contexts/language-context'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  )
}
