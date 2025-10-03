"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Star,
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RotateCw,
  Zap,
  Eye,
  Ruler,
  Sparkles,
  Camera,
  Play,
  Volume2,
  VolumeX,
  FullScreen,
  Layers,
  MousePointer,
  Move3D,
  Scan,
  Target,
  TrendingUp,
  Users,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Filter,
  SortAsc,
  Grid,
  List,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingCard } from "@/components/ui/floating-card"
import { ParticleBackground } from "@/components/ui/particle-background"
import { InventoryTracker } from "@/components/ui/inventory-tracker"
import { products } from "@/lib/dummy-data"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Advanced features state
  const [is360View, setIs360View] = useState(false)
  const [isARMode, setIsARMode] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [viewMode, setViewMode] = useState<'gallery' | '360' | 'ar' | 'video'>('gallery')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  // Size recommendation state
  const [userMeasurements, setUserMeasurements] = useState({
    footLength: 0,
    footWidth: 0,
    archHeight: 0
  })
  const [recommendedSize, setRecommendedSize] = useState("")
  const [sizeConfidence, setSizeConfidence] = useState(0)

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

  // Mock 360° images (in real app, these would be actual 360° image sequences)
  const images360 = Array.from({ length: 36 }, (_, i) => ({
    src: product.images[0], // In real app, this would be different angles
    angle: i * 10
  }))

  // Mock size recommendations based on measurements
  const getSizeRecommendation = (measurements: typeof userMeasurements) => {
    if (measurements.footLength === 0) return { size: "", confidence: 0 }

    // Simple size calculation (in real app, this would use ML/AI)
    const sizeMap = {
      240: "7", 245: "7.5", 250: "8", 255: "8.5", 260: "9",
      265: "9.5", 270: "10", 275: "10.5", 280: "11", 285: "11.5"
    }

    const closestLength = Object.keys(sizeMap).reduce((prev, curr) =>
      Math.abs(Number(curr) - measurements.footLength) < Math.abs(Number(prev) - measurements.footLength) ? curr : prev
    )

    const confidence = Math.max(0, 100 - Math.abs(Number(closestLength) - measurements.footLength) * 2)

    return {
      size: sizeMap[closestLength as keyof typeof sizeMap] || "",
      confidence: Math.min(confidence, 95)
    }
  }

  // Handle size recommendation
  const handleSizeRecommendation = () => {
    const recommendation = getSizeRecommendation(userMeasurements)
    setRecommendedSize(recommendation.size)
    setSizeConfidence(recommendation.confidence)
  }

  // Handle 360° view rotation
  const handle360Rotation = (clientX: number, containerWidth: number) => {
    const percentage = clientX / containerWidth
    const newRotation = Math.floor(percentage * 36)
    setRotation(newRotation)
    setSelectedImage(newRotation % images360.length)
  }

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      comment: "Absolutely love these shoes! Perfect fit and incredibly comfortable for all-day wear.",
      verified: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "2024-01-10",
      comment: "Great quality and style. Runs slightly large, so consider sizing down.",
      verified: true,
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 5,
      date: "2024-01-08",
      comment: "These exceeded my expectations. The craftsmanship is outstanding!",
      verified: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <ParticleBackground particleCount={20} particleColor="oklch(0.45 0.18 250 / 0.1)" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-muted-foreground mb-8"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/${product.category}`} className="hover:text-foreground transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Product Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="space-y-4">
              {/* View Mode Selector */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AnimatedButton
                    variant={viewMode === 'gallery' ? 'default' : 'outline'}
                    size="sm"
                    animation="scale"
                    onClick={() => setViewMode('gallery')}
                  >
                    <Grid className="w-4 h-4 mr-2" />
                    Gallery
                  </AnimatedButton>
                  <AnimatedButton
                    variant={viewMode === '360' ? 'default' : 'outline'}
                    size="sm"
                    animation="scale"
                    onClick={() => setViewMode('360')}
                  >
                    <Move3D className="w-4 h-4 mr-2" />
                    360°
                  </AnimatedButton>
                  <AnimatedButton
                    variant={viewMode === 'ar' ? 'default' : 'outline'}
                    size="sm"
                    animation="scale"
                    onClick={() => setViewMode('ar')}
                  >
                    <Scan className="w-4 h-4 mr-2" />
                    AR Try-On
                  </AnimatedButton>
                </div>

                <div className="flex items-center space-x-2">
                  <AnimatedButton variant="outline" size="icon" animation="scale">
                    <Share2 className="w-4 h-4" />
                  </AnimatedButton>
                  <Dialog>
                    <DialogTrigger asChild>
                      <AnimatedButton variant="outline" size="icon" animation="scale">
                        <Maximize2 className="w-4 h-4" />
                      </AnimatedButton>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Product Gallery</DialogTitle>
                      </DialogHeader>
                      <div className="aspect-square relative">
                        <Image
                          src={product.images[selectedImage] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Main Display Area */}
              <FloatingCard glowEffect className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/40 backdrop-blur-sm border-border/50">
                <AnimatePresence mode="wait">
                  {viewMode === 'gallery' && (
                    <motion.div
                      key={`gallery-${selectedImage}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={product.images[selectedImage] || "/placeholder.svg"}
                        alt={`${product.name} - Image ${selectedImage + 1}`}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  )}

                  {viewMode === '360' && (
                    <motion.div
                      key="360-view"
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.6 }}
                      className="relative w-full h-full cursor-grab active:cursor-grabbing"
                      onMouseMove={(e) => {
                        if (e.buttons === 1) { // Only when dragging
                          const rect = e.currentTarget.getBoundingClientRect()
                          handle360Rotation(e.clientX - rect.left, rect.width)
                        }
                      }}
                    >
                      <Image
                        src={images360[rotation]?.src || product.images[0]}
                        alt={`${product.name} - 360° View`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white">
                          <span className="text-sm font-medium">360° View</span>
                          <span className="text-xs opacity-75">Drag to rotate</span>
                        </div>
                        <Progress value={(rotation / 35) * 100} className="mt-2 h-1" />
                      </div>
                    </motion.div>
                  )}

                  {viewMode === 'ar' && (
                    <motion.div
                      key="ar-view"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="relative w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center"
                    >
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-pulse">
                          <Camera className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">AR Try-On</h3>
                          <p className="text-sm text-muted-foreground">See how it looks on you</p>
                        </div>
                        <AnimatedButton animation="glow" className="bg-gradient-primary">
                          <Scan className="w-4 h-4 mr-2" />
                          Start AR Experience
                        </AnimatedButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Arrows for Gallery Mode */}
                {viewMode === 'gallery' && product.images.length > 1 && (
                  <>
                    <AnimatedButton
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background backdrop-blur-sm"
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                      animation="scale"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </AnimatedButton>
                    <AnimatedButton
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background backdrop-blur-sm"
                      onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                      animation="scale"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </AnimatedButton>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.isSale && <Badge className="bg-destructive">Sale</Badge>}
                  {product.isNew && <Badge className="bg-green-500">New</Badge>}
                </div>
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? "border-primary" : "border-transparent hover:border-muted-foreground"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <p className="text-muted-foreground">{product.brand}</p>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-foreground">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Color Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Color</Label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedColor === color
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Size</Label>
                  <Link href="/size-guide" className="text-sm text-primary hover:underline">
                    Size Guide
                  </Link>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`aspect-square rounded-lg border transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Button size="lg" className="flex-1" disabled={!selectedSize || !selectedColor}>
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={isWishlisted ? "text-red-500 border-red-500" : ""}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                <Button variant="outline" size="lg" className="w-full bg-transparent">
                  Buy Now
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over $75</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">30-day policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Warranty</p>
                    <p className="text-xs text-muted-foreground">1-year coverage</p>
                  </div>
                </div>
              </div>

              {/* Real-time Inventory Tracker */}
              <div className="mt-6">
                <InventoryTracker productId={product.id} compact={true} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Product Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Brand:</span> {product.brand}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Category:</span> {product.category}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Subcategory:</span> {product.subcategory}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Available Sizes:</span> {product.sizes.join(", ")}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Available Colors:</span> {product.colors.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Customer Reviews</h3>
                      <Button variant="outline">Write a Review</Button>
                    </div>

                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium">{review.name.charAt(0)}</span>
                              </div>
                              <div>
                                <p className="font-medium">{review.name}</p>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-muted-foreground"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  {review.verified && (
                                    <Badge variant="secondary" className="text-xs">
                                      Verified Purchase
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                          <Separator />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>• Free standard shipping on orders over $75</p>
                      <p>• Express shipping available for $9.99</p>
                      <p>• Standard delivery: 3-5 business days</p>
                      <p>• Express delivery: 1-2 business days</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Returns & Exchanges</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>• 30-day return policy</p>
                      <p>• Free returns on all orders</p>
                      <p>• Items must be in original condition</p>
                      <p>• Easy online return process</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-foreground mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/product/${relatedProduct.id}`} className="group block">
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={relatedProduct.images[0] || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {relatedProduct.isSale && <Badge className="absolute top-3 left-3 bg-destructive">Sale</Badge>}
                        {relatedProduct.isNew && <Badge className="absolute top-3 left-3 bg-green-500">New</Badge>}
                      </div>
                      <CardContent className="p-4 space-y-2">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">{relatedProduct.brand}</p>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {relatedProduct.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-foreground">${relatedProduct.price}</span>
                          {relatedProduct.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${relatedProduct.originalPrice}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      <Footer />
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
