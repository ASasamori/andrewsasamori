import Link from 'next/link'
import { translations } from '../lib/translations'
import { Language } from '../lib/i18n'
import { ToggleControls } from './toggle-controls'

const navItems = {
  '/': {
    nameKey: 'home' as const,
  },
  '/digital_garden': {
    nameKey: 'digitalGarden' as const,
  },
   '/projects': {
    nameKey: 'projects' as const,
  },
  '/media': {
    nameKey: 'media' as const,
  },

}

export function Navbar({ lang }: { lang: Language }) {
  const isJapanese = lang === 'ja'

  return (
    <aside className="mb-6 tracking-tight">
      {/* Language toggle in top right corner of page */}
      <div className="fixed top-4 right-4 z-50">
        <ToggleControls lang={lang} />
      </div>

      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row justify-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0">
            {Object.entries(navItems).map(([path, { nameKey }]) => {
              const name = isJapanese ? translations.navigation[nameKey].ja : translations.navigation[nameKey].en
              return (
                <Link
                  key={path}
                  href={`/${lang}${path}`}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
