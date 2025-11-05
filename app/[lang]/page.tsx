import { RandomImageClient } from '../components/random-image-client'
import { translations } from '../lib/translations'
import { Language, getLanguage } from '../lib/i18n'

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
      <div className="mb-6 space-y-6 text-black-700 dark:text-white-300 leading-relaxed">
        <p>
          {isJapanese ?  "一人で全てのサイトが翻訳しています。日本語でAIを使わないです。" :
          "I'm passionate about sustainability in engineering and AI, healthcare systems, electric vehicles, and"}
          {' '}<a
            href="https://startups.gallery/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500"
          >
           {isJapanese ? 'スタートアップ' : 'startups'}
          </a>{isJapanese ? '.' : '.'}
        </p>

        <p>
          {isJapanese ? "最近、私はジムで過ごしています。読書、ギターを学び、日本語を勉強しています。" : 
          "Lately, I've been spending my time working out, reading, learning guitar, and improving my Japanese."}
        </p>

        <p>
          {isJapanese ? 'リンクトインで連絡してください' 
          : 'Connect with me on'}{' '}
          <a
            href="https://www.linkedin.com/in/andrew-sasamori"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sky-500"
          >
            {isJapanese ? 'リンクトイン' : 'LinkedIn'}
          </a>{' '}
          {isJapanese ? 'または私の' : 'or check out my'}{' '}
          <a
            href="https://github.com/asasamori"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sky-500"
          >
              {isJapanese ? 'ギットハブ' : 'GitHub'}
          </a>{isJapanese ? '!' : '!'}
        </p>

        <p>
          {isJapanese ? "私は非常に幸運になりました。サンフランシスコに住んでいます。" 
          : "I'm very fortunate to be in the city of San Francisco, and would love the chance to grab a coffee/chat together!"}{' '}
          <a
            href="https://maps.app.goo.gl/m89L6P5mhwPuFgio8"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500"
          >
          </a>
        </p>
      </div>

      <RandomImageClient lang={language} />
    </section>
  )
}
