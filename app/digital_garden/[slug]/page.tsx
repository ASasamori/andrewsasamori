import { notFound } from 'next/navigation'
import { getGardenBySlug, getGardenSlugs } from '../../lib/api'
import { remark } from 'remark'
import html from 'remark-html'

interface GardenPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getGardenSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function GardenPage({ params }: GardenPageProps) {
  const { slug } = await params
  
  try {
    const gardenItem = getGardenBySlug(slug)
    
    // Process wiki-style links before markdown conversion
    const processedMarkdown = gardenItem.content.replace(
      /\[\[([^\]]+)\]\]/g,
      (_, linkText) => {
        const slug = linkText.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '')
        return `[${linkText}](/digital_garden/${slug})`
      }
    )
    
    const processedContent = await remark()
      .use(html)
      .process(processedMarkdown)
    const contentHtml = processedContent.toString()

    return (
      <article className="w-full max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="space-y-4">
            
            {gardenItem.title && (
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {gardenItem.title}
                </h1>
            )}
            
            {gardenItem.description && (
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    {gardenItem.description} 
                </p>
             )}

            {gardenItem.date && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(gardenItem.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </div>
        </header>

        <div 
          className="w-full prose prose-lg dark:prose-invert max-w-none text-left [&_a:hover]:text-sky-600 [&_a]:transition-colors [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    )
  } catch (error) {
    notFound()
  }
}

export async function generateMetadata({ params }: GardenPageProps) {
  const { slug } = await params
  
  try {
    const gardenItem = getGardenBySlug(slug)
    return {
      title: gardenItem.title,
      description: gardenItem.description,
    }
  } catch (error) {
    return {
      title: 'Garden Item Not Found',
    }
  }
}