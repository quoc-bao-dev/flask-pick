import { MetadataRoute } from 'next'

/**
 * Sitemap configuration for Next.js
 * Responsibility: Generate a sitemap.xml file for search engines.
 * 
 * @returns {MetadataRoute.Sitemap} The sitemap configuration
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://flash-pick.vn'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
