'use client'

import Link from 'next/link'
import { useLanguage } from '../contexts/language-context'
import { translations } from '../lib/translations'
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

export function Navbar() {
  const { isJapanese } = useLanguage()
  
  return (
    <aside className="-ml-[8px] mb-6 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { nameKey }]) => {
              const name = isJapanese ? translations.navigation[nameKey].ja : translations.navigation[nameKey].en
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
        <ToggleControls />
      </div>
    </aside>
  )
}
// - Digital Garden
//     - Accomplishments
// - Japanese Version On
// - Projects
// - Media
