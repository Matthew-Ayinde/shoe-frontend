import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StepForward - Premium Footwear',
    short_name: 'StepForward',
    description: 'Discover our curated collection of premium shoes, sneakers, and boots. Quality craftsmanship meets modern style.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en-US',
    categories: ['shopping', 'lifestyle', 'fashion'],
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'StepForward Homepage'
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '750x1334',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'StepForward Mobile View'
      }
    ],
    shortcuts: [
      {
        name: 'Shop Products',
        short_name: 'Shop',
        description: 'Browse our product collection',
        url: '/products',
        icons: [
          {
            src: '/shortcut-shop.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      },
      {
        name: 'My Account',
        short_name: 'Account',
        description: 'Access your account dashboard',
        url: '/dashboard',
        icons: [
          {
            src: '/shortcut-account.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      },
      {
        name: 'Shopping Cart',
        short_name: 'Cart',
        description: 'View your shopping cart',
        url: '/cart',
        icons: [
          {
            src: '/shortcut-cart.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      }
    ],
    related_applications: [
      {
        platform: 'play',
        url: 'https://play.google.com/store/apps/details?id=com.stepforward.app',
        id: 'com.stepforward.app'
      },
      {
        platform: 'itunes',
        url: 'https://apps.apple.com/app/stepforward/id123456789'
      }
    ],
    prefer_related_applications: false
  }
}
