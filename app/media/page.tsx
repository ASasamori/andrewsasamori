'use client'
import { useLanguage } from '../contexts/language-context'
import { translations } from '../lib/translations'

// export const metadata = {
//     icons: {
//         icon: '/icons/lofi.jpg'
//     }
// }

export default function Page() {
    const { isJapanese } = useLanguage()
    const PLAYLIST_ID = '37i9dQZF1Epx62IegLxWWZ' // Your playlist ID

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

                {/* Future sections can go here
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Coming Soon
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        More media content will be added here...
                    </p>
                </div> */}
        </section>
    )
}