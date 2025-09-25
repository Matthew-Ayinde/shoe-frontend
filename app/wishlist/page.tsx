"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { products } from "@/lib/dummy-data"

export default function WishlistPage() {
  // Mock wishlist items - in a real app, this would come from context/state management
  const [wishlistItems, setWishlistItems] = useState(products.slice(0, 4))

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== productId))
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-muted/30 rounded-full flex items-center justify-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Your wishlist is empty</h1>
              <p className="text-muted-foreground">Save items you love to your wishlist.</p>
            </div>
            <Button size="lg" asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
          <p className="text-muted-foreground mt-2">{wishlistItems.length} items saved</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {wishlistItems.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
                  <div className="relative aspect-square overflow-hidden">
                    <Link href={`/product/${product.id}`}>
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
                    {product.isSale && <Badge className="absolute top-3 left-3 bg-destructive">Sale</Badge>}
                    {product.isNew && <Badge className="absolute top-3 left-3 bg-green-500">New</Badge>}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-background/80 hover:bg-background text-red-500"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/product/${product.id}`}>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  )
}
