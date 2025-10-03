import { MetadataRoute } from 'next'
import { generateSitemapUrls } from '@/lib/seo-utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrls = generateSitemapUrls()
  
  // Add dynamic product pages (in a real app, fetch from database)
  const productUrls = [
    {
      url: 'https://stepforward.com/product/1',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://stepforward.com/product/2',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Add more product URLs as needed
  ]
  
  // Add dynamic blog posts (in a real app, fetch from CMS)
  const blogUrls = [
    {
      url: 'https://stepforward.com/blog/sustainable-footwear-future',
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://stepforward.com/blog/running-shoes-guide',
      lastModified: new Date('2024-01-12'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Add more blog URLs as needed
  ]
  
  return [
    ...baseUrls,
    ...productUrls,
    ...blogUrls,
  ]
}
