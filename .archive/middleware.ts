import { NextRequest, NextResponse } from 'next/server'
import { languages, defaultLanguage } from './app/lib/i18n'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === '/ja' || pathname.startsWith('/ja/')) {
    request.nextUrl.pathname = pathname.replace(/^\/ja/, '') || '/'
    return NextResponse.redirect(request.nextUrl)
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    request.nextUrl.pathname = pathname.replace(/^\/en/, '') || '/'
    return NextResponse.redirect(request.nextUrl)
  }

  // Check if the pathname already has a language prefix
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Rewrite to default language internally so URLs stay clean (no /en prefix).
  const locale = defaultLanguage
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.rewrite(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc)
    '/((?!_next|api|favicon.ico|icons|.*\\..*).*)',
  ],
}
