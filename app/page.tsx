import Image from 'next/image'
import { getRandomImage } from './lib/random-image'
import { CaptionWithLinks } from './components/caption-with-links'

export default function Page() {
  // Get a random image on each page load
  const randomImageData = getRandomImage()

  return (
    <section>
      {/* <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Andrew Sasamori
      </h1> */}
      <div className="mb-6 space-y-3">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">I'm passionate about sustainability in engineering and AI, healthcare systems, and electric vehicles. </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Lately, I've been spending my time working out, reading, learning guitar, and improving my Japanese.</p>
        
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Connect with me on{' '}
          <a href="https://www.linkedin.com/in/andrew-sasamori" target="_blank" rel="noopener noreferrer" className="underline text-sky-500">LinkedIn</a>,{' '}
          <a href="https://github.com/asasamori" target="_blank" rel="noopener noreferrer" className="underline text-sky-500">GitHub</a>,{' '}
          <a href="https://www.goodreads.com/user/show/141124879-andrew" target="_blank" rel="noopener noreferrer" className="underline text-sky-500">Goodreads</a>, or{' '}
          <a href="https://www.strava.com/athletes/102980625" target="_blank" rel="noopener noreferrer" className="underline text-sky-500">Strava</a>!
        </p>
      </div>
      
      {/* Random Image */}
      <div className="mt-8 flex flex-col items-center">
        <Image
          src={randomImageData.src}
          alt="Random gallery image"
          width={600}
          height={400}
          className="max-w-full h-auto object-contain rounded-lg shadow-lg"
          priority
        />
        {/* Caption (only shows if image has one) */}
        {randomImageData.caption && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center">
            <CaptionWithLinks 
              caption={randomImageData.caption}
              caption2={randomImageData.caption2}
              people={randomImageData.people}
            />
          </p>
        )}
      </div>
    </section>
  )
}
