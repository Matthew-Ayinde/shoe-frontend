"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star, Eye, Share2, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/ui/animated-button"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  rating: number
  reviewCount: number
  isOnSale?: boolean
  isNew?: boolean
  inStock: boolean
  category: string
}

interface MobileProductCardProps {
  product: Product
  className?: string
  showQuickActions?: boolean
  compact?: boolean
}

export function MobileProductCard({ 
  product, 
  className = "", 
  showQuickActions = true,
  compact = false 
}: MobileProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageLoading, setIsImageLoading] = useState(true)
  
  const { addItem } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()
  
  const isInWishlistState = isInWishlist(product.id)
  const images = product.images || [product.image]
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: product.brand,
      category: product.category,
      size: "9", // Default size - in real app, user would select
      color: "Default",
      maxQuantity: 10,
      inStock: product.inStock
    }
    
    addItem(cartItem)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: product.brand,
      category: product.category,
      rating: product.rating,
      reviewCount: product.reviewCount,
      inStock: product.inStock,
      isOnSale: !!product.originalPrice
    }
    
    toggleItem(wishlistItem)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.brand} ${product.name}`,
        url: `/product/${product.id}`
      })
    }
  }

  if (compact) {
    return (
      <Link href={`/product/${product.id}`} className={`block ${className}`}>
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
        >
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="64px"
            />
            {product.isOnSale && (
              <Badge className="absolute top-1 left-1 text-xs bg-red-500 text-white px-1 py-0">
                -{discountPercentage}%
              </Badge>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground font-medium">{product.brand}</p>
            <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="font-bold text-sm">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          
          <AnimatedButton
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0"
            onClick={handleToggleWishlist}
            animation="scale"
          >
            <Heart className={`h-4 w-4 ${isInWishlistState ? 'fill-red-500 text-red-500' : ''}`} />
          </AnimatedButton>
        </motion.div>
      </Link>
    )
  }

  return (
    <Link href={`/product/${product.id}`} className={`block ${className}`}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="group"
      >
        <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={images[currentImageIndex]}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-300 ${
                isImageLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'
              }`}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              onLoad={() => setIsImageLoading(false)}
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 space-y-1">
              {product.isNew && (
                <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                  New
                </Badge>
              )}
              {product.isOnSale && (
                <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                  -{discountPercentage}%
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            {showQuickActions && (
              <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <AnimatedButton
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm"
                  onClick={handleToggleWishlist}
                  animation="scale"
                >
                  <Heart className={`h-4 w-4 ${isInWishlistState ? 'fill-red-500 text-red-500' : ''}`} />
                </AnimatedButton>
                
                <AnimatedButton
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm"
                  onClick={handleShare}
                  animation="scale"
                >
                  <Share2 className="h-4 w-4" />
                </AnimatedButton>
              </div>
            )}

            {/* Image Dots for Multiple Images */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setCurrentImageIndex(index)
                    }}
                  />
                ))}
              </div>
            )}

            {/* Quick Add to Cart */}
            {product.inStock && (
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <AnimatedButton
                  size="sm"
                  className="bg-primary text-white shadow-sm"
                  onClick={handleAddToCart}
                  animation="scale"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </AnimatedButton>
              </div>
            )}
          </div>

          {/* Product Info */}
          <CardContent className="p-3 space-y-2">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {product.brand}
              </p>
              <h3 className="font-semibold text-sm line-clamp-2 leading-tight">
                {product.name}
              </h3>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-base">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-xs text-green-600 font-medium">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            {/* Mobile-specific Quick Actions */}
            <div className="flex items-center space-x-2 pt-2">
              <AnimatedButton
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                animation="scale"
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </AnimatedButton>
              
              <AnimatedButton
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleToggleWishlist}
                animation="scale"
              >
                <Heart className={`h-4 w-4 ${isInWishlistState ? 'fill-red-500 text-red-500' : ''}`} />
              </AnimatedButton>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
