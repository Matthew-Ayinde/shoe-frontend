import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ToastContainer } from 'react-toastify';
import { LiveChat } from "@/components/ui/live-chat"
import { MobileNavigation } from "@/components/ui/mobile-navigation"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css"

export const metadata: Metadata = {
  title: "StepForward - Premium Footwear",
  description: "Discover the finest collection of premium shoes and sneakers",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <CartProvider>
          <WishlistProvider>
            <Suspense fallback={null}>
              {children}
              <div className="md:hidden">
                <MobileNavigation />
              </div>
              <ToastContainer position="top-right" autoClose={5000} theme="colored" />
              <LiveChat />
            </Suspense>
          </WishlistProvider>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
