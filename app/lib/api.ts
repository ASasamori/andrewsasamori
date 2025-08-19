import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const projectsDirectory = join(process.cwd(), 'data/projects')
const digitalGardenDirectory = join(process.cwd(), 'data/digital_garden')
const mediaDirectory = join(process.cwd(), 'data/media')


export interface ProjectData {
  slug: string
  title: string
  description: string
  status: string
  imageUrl: string
  githubUrl: string
  date: string
  technologies?: string[]
  otherContributors?: Array<{
    name: string
    url: string
  }>
  content: string
}

export function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory).map(name => name.replace(/\.md$/, ''))
}

export function getProjectBySlug(slug: string): ProjectData {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(projectsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: realSlug,
    title: data.title,
    description: data.description,
    status: data.status,
    imageUrl: data.imageUrl,
    githubUrl: data.githubUrl,
    date: data.date,
    technologies: data.technologies,
    otherContributors: data.otherContributors,
    content,
  }
}

export function getAllProjects(): ProjectData[] {
  const slugs = getProjectSlugs()
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .sort((project1, project2) => {
      // Sort by date (newest first)
      return new Date(project2.date).getTime() - new Date(project1.date).getTime()
    })
  return projects
}