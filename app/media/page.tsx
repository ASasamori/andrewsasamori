export const metadata = {
    icons: {
        icon: '/icons/lofi.jpg'
    }
}

export default function Page() {
    const PLAYLIST_ID = '37i9dQZF1Epx62IegLxWWZ' // Your playlist ID

    return (
        <section className="">
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Media
                </h1>
                <a 
                className="text-gray-600 dark:text-gray-400 hover:text-sky-600"
                href="https://open.spotify.com/user/carddealer3000?si=bc6aecc596604a85"
                target="_blank" 
                rel="noopener noreferrer">
                    Follow me!
                </a>
            </div>
            <div className="mb-6">
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

                {/* Future sections can go here */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Coming Soon
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        More media content will be added here...
                    </p>
                </div>
        </section>
    )
}