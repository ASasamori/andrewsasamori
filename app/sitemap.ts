import { MetadataRoute } from 'next'
import { languages } from './lib/i18n'
import { getProjectSlugs, getGardenSlugs } from './lib/api'

export const baseUrl = 'https://portfolio-starter.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/digital_garden', '/projects', '/media']
  const projectSlugs = getProjectSlugs()
  const gardenSlugs = getGardenSlugs()

  // Generate sitemap entries for all routes in all languages
  const routeEntries = languages.flatMap((lang) =>
    routes.map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          languages.map((l) => [l, `${baseUrl}/${l}${route}`])
        ),
      },
    }))
  )

  // Generate sitemap entries for all project pages
  const projectEntries = languages.flatMap((lang) =>
    projectSlugs.map((slug) => ({
      url: `${baseUrl}/${lang}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          languages.map((l) => [l, `${baseUrl}/${l}/projects/${slug}`])
        ),
      },
    }))
  )

  // Generate sitemap entries for all digital garden pages
  const gardenEntries = languages.flatMap((lang) =>
    gardenSlugs.map((slug) => ({
      url: `${baseUrl}/${lang}/digital_garden/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          languages.map((l) => [l, `${baseUrl}/${l}/digital_garden/${slug}`])
        ),
      },
    }))
  )

  return [...routeEntries, ...projectEntries, ...gardenEntries]
}