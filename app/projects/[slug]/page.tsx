import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjectSlugs } from '../../lib/api'
import { remark } from 'remark'
import html from 'remark-html'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  
  try {
    const project = getProjectBySlug(slug)
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(project.content)
    const contentHtml = processedContent.toString()

    return (
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col gap-6 mb-6">
            <div className="flex justify-center">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-64 aspect-square object-cover rounded-md"
                />
              </a>
            </div>
            
            <div className="space-y-4">
              <a className="text-3xl font-bold text-white-300 hover:text-sky-600"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                {project.title}
              </a>
              
              <p 
                className="text-lg text-gray-300"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
              
              {project.technologies && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              
              {/* <div className="flex gap-4">
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  View on GitHub →
                </a>
                
                <a 
                  href="/projects"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  ← Back to Projects
                </a>
              </div> */}
            </div>
          </div>
          
          {project.otherContributors && project.otherContributors.length > 0 && (
            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Project Contributors
              </h3>
              <div className="flex flex-wrap gap-4">
                {project.otherContributors.map((contributor, index) => (
                  <div key={index}>
                    {contributor.url ? (
                      <a
                        href={contributor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-sky-600 font-medium"
                      >
                        {contributor.name}
                      </a>
                    ) : (
                      <span className="text-gray-00 font-medium">
                        {contributor.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>

        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    )
  } catch (error) {
    notFound()
  }
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  
  try {
    const project = getProjectBySlug(slug)
    return {
      title: project.title,
      description: project.description,
    }
  } catch (error) {
    return {
      title: 'Project Not Found',
    }
  }
}