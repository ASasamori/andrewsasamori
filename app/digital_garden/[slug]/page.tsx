import { notFound } from 'next/navigation'
import { getGardenBySlug, getGardenSlugs } from '../../lib/api'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

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
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(processedMarkdown)
    const contentHtml = processedContent.toString()

    return (
      <article className="w-full max-w-4xl mx-auto">
        <header>
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
          className="w-full prose prose-lg dark:prose-invert max-w-none text-left 
          [&_a:hover]:text-sky-600 [&_a]:transition-colors [&_a]:underline 
          [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:dark:text-gray-400
          [&_div]:!mb-2 [&_div]:!mt-1 [&_p]:!mb-2 [&_p]:!mt-1 
          [&_h1]:!mb-1 [&_h1]:!mt-6 [&_h2]:!mb-1 [&_h2]:!mt-5 [&_h3]:!mb-0 [&_h3]:!mt-4 [&_h4]:!mb-0 [&_h4]:!mt-0 [&_h5]:!mb-0 [&_h5]:!mt-0
          "
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