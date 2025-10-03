import { MetadataRoute } from 'next'
import { generateRobotsTxt } from '@/lib/seo-utils'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/staff/', '/api/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/staff/', '/api/', '/private/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/staff/', '/api/', '/private/'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://stepforward.com/sitemap.xml',
    host: 'https://stepforward.com',
  }
}
