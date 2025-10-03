import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ToastContainer } from 'react-toastify';
import { LiveChat } from "@/components/ui/live-chat"
import { MobileNavigation } from "@/components/ui/mobile-navigation"
import { PerformanceMonitor } from "@/components/ui/performance-monitor"
import { AccessibilityProvider } from "@/components/ui/accessibility-provider"
import { QualityDashboard } from "@/components/ui/quality-dashboard"
import { AccessibilityTester } from "@/components/ui/accessibility-tester"
import { WebsiteStructuredData, OrganizationStructuredData } from "@/components/seo/structured-data"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css"

export const metadata: Metadata = {
  title: "StepForward - Premium Footwear Collection | Quality Shoes & Sneakers",
  description: "Discover our curated collection of premium shoes, sneakers, and boots. Quality craftsmanship meets modern style with sustainable materials and innovative design.",
  keywords: "premium shoes, sneakers, boots, footwear, sustainable fashion, quality craftsmanship, modern style, comfortable shoes",
  authors: [{ name: "StepForward Team" }],
  creator: "StepForward",
  publisher: "StepForward",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://stepforward.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'es-ES': '/es-ES',
    },
  },
  openGraph: {
    title: "StepForward - Premium Footwear Collection",
    description: "Discover our curated collection of premium shoes, sneakers, and boots. Quality craftsmanship meets modern style.",
    url: 'https://stepforward.com',
    siteName: 'StepForward',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'StepForward Premium Footwear Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "StepForward - Premium Footwear Collection",
    description: "Discover our curated collection of premium shoes, sneakers, and boots.",
    images: ['/og-image.jpg'],
    creator: '@stepforward',
    site: '@stepforward',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <WebsiteStructuredData />
        <OrganizationStructuredData />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AccessibilityProvider>
          <CartProvider>
            <WishlistProvider>
              <Suspense fallback={null}>
                <main id="main-content" className="min-h-screen">
                  {children}
                </main>
                <div className="md:hidden">
                  <MobileNavigation />
                </div>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  theme="colored"
                  role="alert"
                  aria-live="assertive"
                />
                <LiveChat />
                <PerformanceMonitor showInProduction={false} position="bottom-left" />
                <QualityDashboard showInProduction={false} position="top-right" />
                <AccessibilityTester showInProduction={false} position="bottom-right" />
              </Suspense>
            </WishlistProvider>
          </CartProvider>
        </AccessibilityProvider>
        <Analytics />
      </body>
    </html>
  )
}
