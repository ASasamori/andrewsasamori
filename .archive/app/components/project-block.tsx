'use client'

import Link from 'next/link'
import { parseISO, format } from 'date-fns';

export interface Project {
  slug: string
  title: string
  description: string
  imageUrl: string
  githubUrl: string
  date?: string
  technologies?: string[] 
  otherContributors?: Array<{
    name: string
    url: string
  }>
}

export default function ProjectBlock({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800 group-hover:border-purple-600 dark:group-hover:border-sky-600 transition-colors">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full aspect-square object-cover rounded-md"
            />
          </div>
          
          <div className="sm:w-2/3 space-y-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-gray-500 transition-colors duration-300">
              {project.title}
            </h3>
            
            <p 
              className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-500 transition-colors duration-300"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
            
            {/* Not sure if I actually find having the tech tags cringe or not */}
            {project.technologies && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 dark:group-hover:text-gray-500 rounded-md"
                    >
                      
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {project.otherContributors && (
              <div className="text-xs italic text-gray-500">
                Project Members:{" "}
                {project.otherContributors.map((contributor, index) => (
                  <span key={index}>
                    {contributor.url ? (
                      <span
                        className="hover:text-sky-600"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          window.open(contributor.url, '_blank')
                        }}
                      >
                        {contributor.name}
                      </span>
                    ) : (
                      <span>{contributor.name}</span>
                    )}
                    {index < (project.otherContributors?.length ?? 0) - 1 && ", "}
                  </span>
                ))}
              </div>
            )}

            {project.date && (
              <div className="text-xs text-yellow-100 group-hover:text-gray-500">
                {project.date.length > 7
                  ? format(parseISO(project.date), "MMM d, yyyy")
                  : format(parseISO(project.date), "MMM yyyy")}
              </div>
            )}



            {/* <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sky-500 hover:text-sky-600 font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              View on GitHub →
            </a> */}
          </div>
        </div>
      </div>
    </Link>
  )
}