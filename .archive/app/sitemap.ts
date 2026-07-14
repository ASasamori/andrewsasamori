import { MetadataRoute } from 'next'
import { getProjectSlugs, getGardenSlugs } from './lib/api'

export const baseUrl = 'https://portfolio-starter.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/digital_garden', '/projects', '/media']
  const projectSlugs = getProjectSlugs()
  const gardenSlugs = getGardenSlugs()

  const routeEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const projectEntries = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const gardenEntries = gardenSlugs.map((slug) => ({
    url: `${baseUrl}/digital_garden/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...routeEntries, ...projectEntries, ...gardenEntries]
}
