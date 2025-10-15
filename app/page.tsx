'use client'

import { RandomImageClient } from './components/random-image-client'
import { useLanguage } from './contexts/language-context'
import { translations } from './lib/translations'

export default function Page() {
  const { isJapanese } = useLanguage()

  return (
    <section>
      <div className="mb-6 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          {isJapanese ? translations.home.bio1.ja : translations.home.bio1.en}
          {' '}<a
            href="https://startups.gallery/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500"
          >
           {isJapanese ? translations.home.bio1Startups.ja : translations.home.bio1Startups.en}
          </a>{isJapanese ? translations.home.bio1End.ja : translations.home.bio1End.en}
        </p>

        <p>
          {isJapanese ? translations.home.bio2.ja : translations.home.bio2.en}
        </p>

        <p>
          {isJapanese ? translations.home.bio3Start.ja : translations.home.bio3Start.en}{' '}
          <a
            href="https://www.linkedin.com/in/andrew-sasamori"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sky-500"
          >
            {isJapanese ? translations.home.bio3LinkedIn.ja : translations.home.bio3LinkedIn.en}
          </a>{' '}
          {isJapanese ? translations.home.bio3Middle.ja : translations.home.bio3Middle.en}{' '}
          <a
            href="https://github.com/asasamori"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sky-500"
          >
            {isJapanese ? translations.home.bio3GitHub.ja : translations.home.bio3GitHub.en}
          </a>{isJapanese ? translations.home.bio3End.ja : translations.home.bio3End.en}
        </p>

        <p>
          {isJapanese ? translations.home.bio4Start.ja : translations.home.bio4Start.en}{' '}
          <a
            href="https://maps.app.goo.gl/m89L6P5mhwPuFgio8"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500"
          >
            {isJapanese ? translations.home.bio4SanFrancisco.ja : translations.home.bio4SanFrancisco.en}
          </a>{isJapanese ? translations.home.bio4End.ja : translations.home.bio4End.en}
        </p>
      </div>

      <RandomImageClient />
    </section>
  )
}
