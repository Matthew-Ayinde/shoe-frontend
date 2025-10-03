"use client"

import { generateStructuredData } from '@/lib/seo-utils'

interface StructuredDataProps {
  type: 'website' | 'article' | 'product' | 'organization' | 'breadcrumb'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = generateStructuredData({
    structuredDataType: type,
    ...data
  })

  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

/**
 * Website structured data component
 */
export function WebsiteStructuredData() {
  return (
    <StructuredData
      type="website"
      data={{
        title: "StepForward - Premium Footwear Collection",
        description: "Discover our curated collection of premium shoes, sneakers, and boots. Quality craftsmanship meets modern style.",
        url: "/"
      }}
    />
  )
}

/**
 * Organization structured data component
 */
export function OrganizationStructuredData() {
  return (
    <StructuredData
      type="organization"
      data={{
        title: "StepForward",
        description: "Premium footwear brand committed to quality, comfort, and sustainability.",
        url: "/"
      }}
    />
  )
}

/**
 * Product structured data component
 */
interface ProductStructuredDataProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    currency?: string
    image: string
    brand?: string
    category?: string
    availability: 'in_stock' | 'out_of_stock' | 'preorder'
    rating?: {
      value: number
      count: number
    }
    reviews?: Array<{
      author: string
      rating: number
      text: string
      date: string
    }>
  }
}

export function ProductStructuredData({ product }: ProductStructuredDataProps) {
  return (
    <StructuredData
      type="product"
      data={{
        title: product.name,
        description: product.description,
        image: product.image,
        url: `/product/${product.id}`,
        price: {
          amount: product.price,
          currency: product.currency || 'USD'
        },
        availability: product.availability,
        brand: product.brand,
        category: product.category,
        rating: product.rating,
        reviews: product.reviews
      }}
    />
  )
}

/**
 * Article structured data component
 */
interface ArticleStructuredDataProps {
  article: {
    id: string
    title: string
    description: string
    author: string
    publishedTime: string
    modifiedTime?: string
    image: string
    section?: string
    tags?: string[]
  }
}

export function ArticleStructuredData({ article }: ArticleStructuredDataProps) {
  return (
    <StructuredData
      type="article"
      data={{
        title: article.title,
        description: article.description,
        author: article.author,
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        image: article.image,
        url: `/blog/${article.id}`,
        section: article.section,
        tags: article.tags
      }}
    />
  )
}

/**
 * Breadcrumb structured data component
 */
interface BreadcrumbStructuredDataProps {
  breadcrumbs: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbStructuredData({ breadcrumbs }: BreadcrumbStructuredDataProps) {
  return (
    <StructuredData
      type="breadcrumb"
      data={{
        breadcrumbs
      }}
    />
  )
}

/**
 * FAQ structured data component
 */
interface FAQStructuredDataProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

/**
 * Local Business structured data component
 */
export function LocalBusinessStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'StepForward Flagship Store',
    image: 'https://stepforward.com/store-image.jpg',
    '@id': 'https://stepforward.com/store',
    url: 'https://stepforward.com/contact',
    telephone: '+1-555-123-4567',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Fashion Ave',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7589,
      longitude: -73.9851
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '17:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '12:00',
        closes: '16:00'
      }
    ],
    sameAs: [
      'https://facebook.com/stepforward',
      'https://twitter.com/stepforward',
      'https://instagram.com/stepforward'
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

/**
 * Review structured data component
 */
interface ReviewStructuredDataProps {
  product: {
    name: string
    image: string
  }
  reviews: Array<{
    author: string
    rating: number
    text: string
    date: string
  }>
}

export function ReviewStructuredData({ product, reviews }: ReviewStructuredDataProps) {
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length
    },
    review: reviews.map(review => ({
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
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

/**
 * Event structured data component
 */
interface EventStructuredDataProps {
  event: {
    name: string
    description: string
    startDate: string
    endDate?: string
    location: {
      name: string
      address: string
    }
    image?: string
    url?: string
    offers?: {
      price: number
      currency: string
      availability: string
    }
  }
}

export function EventStructuredData({ event }: EventStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: event.location.name,
      address: event.location.address
    },
    image: event.image,
    url: event.url,
    offers: event.offers ? {
      '@type': 'Offer',
      price: event.offers.price,
      priceCurrency: event.offers.currency,
      availability: event.offers.availability
    } : undefined
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}
