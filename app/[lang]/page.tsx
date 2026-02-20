import { RandomImageClient } from '../components/random-image-client'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  await params

  return (
    <section>
      <div className="mb-6 space-y-6 text-black-700 dark:text-white-300 leading-relaxed">
        <p>
          I'm passionate about all sorts{' '}
          <a
            href="https://startups.gallery/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500"
          >
           startups
          </a>, especially ones that are close to home. My research interests lie at the intersection of chain-of-thought reasoning, AI evaluation and benchmarking, and model optimization for computational efficiency.
        </p>

        <p>
          Lately, I have been spending my time working out, reading, learning guitar, and improving my Japanese.
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
          I'm very fortunate to be in the city of San Francisco, and would love the chance to grab a coffee/chat together!
        </p>
      </div>

      <RandomImageClient />
    </section>
  )
}
