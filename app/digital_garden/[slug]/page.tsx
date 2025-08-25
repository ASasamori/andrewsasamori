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
    
    // Process wiki-style links and course blocks before markdown conversion
    let processedMarkdown = gardenItem.content.replace(
      /\[\[([^\]]+)\]\]/g,
      (_, linkText) => {
        const slug = linkText.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '')
        return `<a href="/digital_garden/${slug}" class="wiki-link">${linkText}</a>`
      }
    )
    
    // Process course blocks: @@CourseTitle|Professor|PDFPath@@ or @@CourseTitle|Professor@@
    processedMarkdown = processedMarkdown.replace(
      /@@([^|@]+)\|([^|@]*)\|?([^@]*)@@/g,
      (_, courseTitle, professor, pdfPath) => {
        const content = `
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-0 mt-4">${courseTitle}</h3>
    <div class="text-gray-400 mb-0 mt-0 text-base no-underline">${professor}</div>`
        
        if (pdfPath && pdfPath.trim()) {
          return `<a href="${pdfPath}" target="_blank" rel="noopener noreferrer" class="block hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors no-underline mb-3">${content}
</a>`
        } else {
          return `<div class="block mb-3">${content}
</div>`
        }
      }
    )
    
    // Process purple text: purple text purple
    processedMarkdown = processedMarkdown.replace(
      /skyblue\s+(.+?)\s+skyblue/g,
      (_, text) => {
        return `<span class="text-sky-500">${text}</span>`
      }
    )

    processedMarkdown = processedMarkdown.replace(
      /purple\s+(.+?)\s+purple/g,
      (_, text) => {
        return `<span class="text-purple-500">${text}</span>`
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
          [&_a]:!no-underline [&_a:hover]:text-sky-600 [&_a]:transition-colors [&_.wiki-link]:!underline 
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
      icons: {
        icon: '/icons/vibe.png'
      }
    }
  } catch (error) {
    return {
      title: 'Garden Item Not Found',
    }
  }
}