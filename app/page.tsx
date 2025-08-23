import Footer from './components/footer'
import { RandomImageClient } from './components/random-image-client'

export const metadata = {
  icons: {
    icon: '/icons/vibe.png'
  }
}

export default function Page() {
  return (
    <section>
      <div className="mb-6 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          I'm passionate about sustainability in engineering and AI, healthcare systems, and electric vehicles.
        </p>

        <p>
          Lately, I've been spending my time working out, reading, learning guitar, and improving my Japanese.
        </p>

        <p>
          Connect with me on{' '}
          <a
            href="https://www.linkedin.com/in/andrew-sasamori"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sky-500"
          >
            LinkedIn
          </a>{' '}
          or check out my{' '}
          <a
            href="https://github.com/asasamori"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sky-500"
          >
            GitHub
          </a>!
        </p>

        <p>
          I'm very fortunate to be in the city of{' '}
          <a
            href="https://maps.app.goo.gl/m89L6P5mhwPuFgio8"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sky-500"
          >
            San Francisco
          </a>{', '}
          and would love the chance to grab a coffee, play Ultimate frisbee together, or just chat!
        </p>
      </div>

      <RandomImageClient />
    </section>
  )
}
