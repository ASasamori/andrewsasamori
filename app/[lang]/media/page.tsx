import { translations } from '../../lib/translations'
import { getLanguage } from '../../lib/i18n'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const language = getLanguage(lang)
  const isJapanese = language === 'ja'

  return (
    <section>
      <div className="space-y-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isJapanese ? translations.Media.title.ja : translations.Media.title.en}
        </h1>
      </div>
      <div className="mb-3">
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1Epx62IegLxWWZ?utm_source=generator"
          width="100%" height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy">
        </iframe>
      </div>
      <p className="text-white-700 space-y-10 leading-relaxed mb-3">
        {isJapanese ? translations.Media.funAccounts.ja : translations.Media.funAccounts.en}{' '}
        <br></br>
        <a href="https://open.spotify.com/user/carddealer3000?si=bc6aecc596604a85" target="_blank" rel="noopener noreferrer" className="underline text-sky-500">Spotify</a>
        ,{' '}
        <a href="https://letterboxd.com/sasamor1/" target="_blank" rel="noopener noreferrer" className="underline text-sky-500">Letterboxd</a>
        ,{' '}
        <a href="https://www.goodreads.com/user/show/141124879-andrew" target="_blank" rel="noopener noreferrer" className="underline text-sky-500">Goodreads</a>
        ,{' '}
        <a href="https://www.strava.com/athletes/102980625" target="_blank" rel="noopener noreferrer" className="underline text-sky-500">Strava</a>!
      </p>
    </section>
  )
}
