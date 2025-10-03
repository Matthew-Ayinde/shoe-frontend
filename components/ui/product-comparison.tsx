"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Plus, Star, Check, Minus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AnimatedButton } from "./animated-button"
import { FloatingCard } from "./floating-card"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  images: string[]
  features: string[]
  specifications: Record<string, string>
}

interface ProductComparisonProps {
  products: Product[]
  maxProducts?: number
  onAddProduct?: () => void
  onRemoveProduct?: (productId: string) => void
}

export function ProductComparison({ 
  products, 
  maxProducts = 3, 
  onAddProduct, 
  onRemoveProduct 
}: ProductComparisonProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  // Get all unique features from all products
  const allFeatures = Array.from(
    new Set(products.flatMap(product => product.features))
  )

  // Get all unique specifications
  const allSpecs = Array.from(
    new Set(products.flatMap(product => Object.keys(product.specifications)))
  )

  const toggleFeatureFilter = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    )
  }

  const filteredFeatures = selectedFeatures.length > 0 
    ? allFeatures.filter(feature => selectedFeatures.includes(feature))
    : allFeatures

  if (products.length === 0) {
    return (
      <FloatingCard className="p-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted/30 rounded-full flex items-center justify-center">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Start Comparing</h3>
            <p className="text-sm text-muted-foreground">Add products to compare their features and specifications</p>
          </div>
          {onAddProduct && (
            <AnimatedButton onClick={onAddProduct} animation="glow" className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </AnimatedButton>
          )}
        </div>
      </FloatingCard>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Product Comparison</h2>
          <p className="text-sm text-muted-foreground">
            Compare up to {maxProducts} products side by side
          </p>
        </div>
        
        {products.length < maxProducts && onAddProduct && (
          <AnimatedButton 
            onClick={onAddProduct} 
            variant="outline" 
            animation="magnetic"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </AnimatedButton>
        )}
      </div>

      {/* Feature Filter */}
      {allFeatures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Filter by Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allFeatures.map(feature => (
                <Badge
                  key={feature}
                  variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => toggleFeatureFilter(feature)}
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
            
            {/* Header Row */}
            <div className="font-medium text-muted-foreground p-4">
              Product
            </div>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FloatingCard className="relative">
                  {onRemoveProduct && (
                    <AnimatedButton
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => onRemoveProduct(product.id)}
                      animation="scale"
                    >
                      <X className="w-4 h-4" />
                    </AnimatedButton>
                  )}
                  
                  <CardContent className="p-4 space-y-3">
                    <div className="aspect-square relative rounded-lg overflow-hidden bg-muted/30">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                      
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
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
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-foreground">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </FloatingCard>
              </motion.div>
            ))}

            {/* Features Comparison */}
            <div className="font-medium text-muted-foreground p-4 border-t">
              Features
            </div>
            {products.map(product => (
              <Card key={`${product.id}-features`} className="border-t">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {filteredFeatures.map(feature => (
                      <div key={feature} className="flex items-center space-x-2">
                        {product.features.includes(feature) ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Minus className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Specifications */}
            {allSpecs.map(spec => (
              <>
                <div key={spec} className="font-medium text-muted-foreground p-4 border-t">
                  {spec}
                </div>
                {products.map(product => (
                  <Card key={`${product.id}-${spec}`} className="border-t">
                    <CardContent className="p-4">
                      <span className="text-sm">
                        {product.specifications[spec] || "N/A"}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </>
            ))}

            {/* Action Row */}
            <div className="p-4 border-t">
              <span className="font-medium text-muted-foreground">Actions</span>
            </div>
            {products.map(product => (
              <Card key={`${product.id}-actions`} className="border-t">
                <CardContent className="p-4 space-y-2">
                  <AnimatedButton 
                    size="sm" 
                    className="w-full bg-gradient-primary" 
                    animation="glow"
                  >
                    Add to Cart
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="outline" 
                    size="sm" 
                    className="w-full" 
                    animation="scale"
                  >
                    View Details
                  </AnimatedButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
