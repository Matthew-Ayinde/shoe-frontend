/**
 * SEO utilities and metadata generation
 */

import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  price?: {
    amount: number
    currency: string
  }
  availability?: 'in_stock' | 'out_of_stock' | 'preorder'
  brand?: string
  category?: string
}

const defaultConfig = {
  siteName: 'StepForward',
  siteUrl: 'https://stepforward.com',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@stepforward',
  locale: 'en_US',
  type: 'website' as const
}

/**
 * Generate comprehensive metadata for Next.js pages
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = defaultConfig.defaultImage,
    url,
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
    section,
    tags = [],
    price,
    availability,
    brand = defaultConfig.siteName,
    category
  } = config

  const fullTitle = title.includes(defaultConfig.siteName) 
    ? title 
    : `${title} | ${defaultConfig.siteName}`
  
  const fullUrl = url ? `${defaultConfig.siteUrl}${url}` : defaultConfig.siteUrl
  const fullImage = image.startsWith('http') ? image : `${defaultConfig.siteUrl}${image}`

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : undefined,
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: defaultConfig.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: defaultConfig.locale,
      type: type === 'article' ? 'article' : 'website',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags })
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImage],
      creator: defaultConfig.twitterHandle,
      site: defaultConfig.twitterHandle
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },

    // Verification
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION
    }
  }

  return metadata
}

/**
 * Generate structured data (JSON-LD) for different content types
 */
export function generateStructuredData(config: SEOConfig & { 
  structuredDataType: 'website' | 'article' | 'product' | 'organization' | 'breadcrumb'
  breadcrumbs?: Array<{ name: string; url: string }>
  rating?: { value: number; count: number }
  reviews?: Array<{ author: string; rating: number; text: string; date: string }>
}) {
  const baseUrl = defaultConfig.siteUrl
  
  switch (config.structuredDataType) {
    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: defaultConfig.siteName,
        url: baseUrl,
        description: config.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }

    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: defaultConfig.siteName,
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: config.description,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-555-123-4567',
          contactType: 'customer service',
          availableLanguage: 'English'
        },
        sameAs: [
          'https://facebook.com/stepforward',
          'https://twitter.com/stepforward',
          'https://instagram.com/stepforward',
          'https://linkedin.com/company/stepforward'
        ]
      }

    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: config.title,
        description: config.description,
        image: config.image ? `${baseUrl}${config.image}` : `${baseUrl}${defaultConfig.defaultImage}`,
        author: {
          '@type': 'Person',
          name: config.author || 'StepForward Team'
        },
        publisher: {
          '@type': 'Organization',
          name: defaultConfig.siteName,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`
          }
        },
        datePublished: config.publishedTime,
        dateModified: config.modifiedTime || config.publishedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}${config.url}`
        }
      }

    case 'product':
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: config.title,
        description: config.description,
        image: config.image ? `${baseUrl}${config.image}` : `${baseUrl}${defaultConfig.defaultImage}`,
        brand: {
          '@type': 'Brand',
          name: config.brand || defaultConfig.siteName
        },
        category: config.category,
        offers: {
          '@type': 'Offer',
          price: config.price?.amount,
          priceCurrency: config.price?.currency || 'USD',
          availability: `https://schema.org/${config.availability === 'in_stock' ? 'InStock' : 'OutOfStock'}`,
          seller: {
            '@type': 'Organization',
            name: defaultConfig.siteName
          }
        },
        ...(config.rating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: config.rating.value,
            reviewCount: config.rating.count
          }
        }),
        ...(config.reviews && {
          review: config.reviews.map(review => ({
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: review.author
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: review.rating
            },
            reviewBody: review.text,
            datePublished: review.date
          }))
        })
      }

    case 'breadcrumb':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: config.breadcrumbs?.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${baseUrl}${crumb.url}`
        }))
      }

    default:
      return null
  }
}

/**
 * Generate sitemap data
 */
export function generateSitemapUrls() {
  const baseUrl = defaultConfig.siteUrl
  const currentDate = new Date().toISOString()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/sustainability`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5
    }
  ]
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt() {
  const baseUrl = defaultConfig.siteUrl
  
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas
Disallow: /admin/
Disallow: /staff/
Disallow: /api/

# Allow important pages
Allow: /products
Allow: /blog
Allow: /about
Allow: /contact
Allow: /sustainability`
}

/**
 * SEO-friendly URL slug generator
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Extract keywords from text content
 */
export function extractKeywords(text: string, maxKeywords: number = 10): string[] {
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ])

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word))

  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word)
}

/**
 * Validate and optimize meta description
 */
export function optimizeMetaDescription(description: string): string {
  const maxLength = 160
  const minLength = 120

  if (description.length <= maxLength) {
    return description
  }

  // Truncate at word boundary
  const truncated = description.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastSpace > minLength) {
    return truncated.substring(0, lastSpace) + '...'
  }

  return truncated.substring(0, maxLength - 3) + '...'
}
