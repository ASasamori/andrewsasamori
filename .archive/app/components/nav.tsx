import Link from 'next/link'
import { translations } from '../lib/translations'
import { Language } from '../lib/i18n'

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
  void lang

  return (
    <aside className="mb-6 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row justify-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0">
            {Object.entries(navItems).map(([path, { nameKey }]) => {
              const name = translations.navigation[nameKey].en
              return (
                <Link
                  key={path}
                  href={path}
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
