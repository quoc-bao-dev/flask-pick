import { MetadataRoute } from 'next'

/**
 * Robots.txt configuration for Next.js
 * Responsibility: Generate a robots.txt file to guide search engine crawlers.
 * 
 * @returns {MetadataRoute.Robots} The robots configuration
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://flash-pick.vn'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dev/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
