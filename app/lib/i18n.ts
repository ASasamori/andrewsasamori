export const languages = ['en'] as const
export type Language = (typeof languages)[number]

export const defaultLanguage: Language = 'en'

export function isValidLanguage(lang: string): lang is Language {
  return languages.includes(lang as Language)
}

export function getLanguage(lang: string): Language {
  return isValidLanguage(lang) ? lang : defaultLanguage
}
