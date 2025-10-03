"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  Grid,
  List,
  Star,
  SlidersHorizontal,
  X,
  Filter,
  SortAsc,
  Search,
  Heart,
  ShoppingCart,
  Eye,
  Compare,
  Sparkles,
  TrendingUp,
  Zap,
  Target,
  Layers
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingCard } from "@/components/ui/floating-card"
import { ParticleBackground } from "@/components/ui/particle-background"
import { ProductComparison } from "@/components/ui/product-comparison"
import { MobileProductCard } from "@/components/ui/mobile-product-card"
import { MobileFilters } from "@/components/ui/mobile-filters"
import { products, brands } from "@/lib/dummy-data"

type ViewMode = "grid" | "list"
type SortOption = "name" | "price-low" | "price-high" | "rating" | "newest"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("name")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Enhanced features state
  const [searchQuery, setSearchQuery] = useState("")
  const [wishlist, setWishlist] = useState<string[]>([])
  const [compareList, setCompareList] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [quickFilters, setQuickFilters] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const categories = ["men", "women", "kids"]
  const colors = ["Black", "White", "Blue", "Brown", "Red", "Green", "Pink"]

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Basic filters
      const priceInRange = product.price >= priceRange[0] && product.price <= priceRange[1]
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const colorMatch = selectedColors.length === 0 || product.colors.some((color) => selectedColors.includes(color))

      // Search query filter
      const searchMatch = searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())

      // Tab filter
      const tabMatch = activeTab === "all" ||
        (activeTab === "sale" && product.originalPrice && product.originalPrice > product.price) ||
        (activeTab === "new" && product.isNew) ||
        (activeTab === "trending" && product.rating >= 4.5)

      // Quick filters
      const quickFilterMatch = quickFilters.length === 0 || quickFilters.every(filter => {
        switch (filter) {
          case "free-shipping": return product.freeShipping
          case "eco-friendly": return product.ecoFriendly
          case "bestseller": return product.isBestseller
          case "limited-edition": return product.isLimitedEdition
          default: return true
        }
      })

      return priceInRange && brandMatch && categoryMatch && colorMatch && searchMatch && tabMatch && quickFilterMatch
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [products, priceRange, selectedBrands, selectedCategories, selectedColors, sortBy, searchQuery, activeTab, quickFilters])

  // Helper functions
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId)
      } else if (prev.length < 3) {
        return [...prev, productId]
      }
      return prev // Don't add if already at max
    })
  }

  const clearFilters = () => {
    setPriceRange([0, 300])
    setSelectedBrands([])
    setSelectedCategories([])
    setSelectedColors([])
    setSearchQuery("")
    setQuickFilters([])
    setActiveTab("all")
  }

  const toggleQuickFilter = (filter: string) => {
    setQuickFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const compareProducts = products.filter(p => compareList.includes(p.id))

  const FilterSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Price Range</Label>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={300} min={0} step={10} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Brands</Label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand])
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                  }
                }}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Categories</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category])
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== category))
                  }
                }}
              />
              <Label htmlFor={`category-${category}`} className="text-sm capitalize">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Colors</Label>
        <div className="grid grid-cols-2 gap-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedColors([...selectedColors, color])
                  } else {
                    setSelectedColors(selectedColors.filter((c) => c !== color))
                  }
                }}
              />
              <Label htmlFor={`color-${color}`} className="text-sm">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Navigation />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <ParticleBackground particleCount={30} particleColor="oklch(0.45 0.18 250 / 0.08)" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                      All Products
                    </h1>
                    <p className="text-muted-foreground">
                      Showing {filteredAndSortedProducts.length} of {products.length} products
                    </p>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                {compareList.length > 0 && (
                  <AnimatedButton
                    variant="outline"
                    onClick={() => setShowComparison(true)}
                    animation="magnetic"
                  >
                    <Compare className="w-4 h-4 mr-2" />
                    Compare ({compareList.length})
                  </AnimatedButton>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:inline-flex">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="sale">On Sale</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { id: "free-shipping", label: "Free Shipping", icon: Truck },
              { id: "eco-friendly", label: "Eco-Friendly", icon: Layers },
              { id: "bestseller", label: "Bestseller", icon: TrendingUp },
              { id: "limited-edition", label: "Limited Edition", icon: Target }
            ].map(filter => (
              <Badge
                key={filter.id}
                variant={quickFilters.includes(filter.id) ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => toggleQuickFilter(filter.id)}
              >
                <filter.icon className="w-3 h-3 mr-1" />
                {filter.label}
              </Badge>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
              <FilterSection />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden bg-transparent"
                  onClick={() => setShowMobileFilters(true)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {(selectedBrands.length + selectedCategories.length + selectedColors.length) > 0 && (
                    <Badge className="ml-2 bg-primary text-white text-xs">
                      {selectedBrands.length + selectedCategories.length + selectedColors.length}
                    </Badge>
                  )}
                </Button>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSection />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedBrands.length > 0 || selectedCategories.length > 0 || selectedColors.length > 0) && (
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-foreground">Active filters:</span>
                  {selectedBrands.map((brand) => (
                    <Badge key={brand} variant="secondary" className="gap-1">
                      {brand}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setSelectedBrands(selectedBrands.filter((b) => b !== brand))}
                      />
                    </Badge>
                  ))}
                  {selectedCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="gap-1">
                      {category}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                      />
                    </Badge>
                  ))}
                  {selectedColors.map((color) => (
                    <Badge key={color} variant="secondary" className="gap-1">
                      {color}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setSelectedColors(selectedColors.filter((c) => c !== color))}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Products Grid/List */}
            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                >
                  {filteredAndSortedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <MobileProductCard
                        product={{
                          id: product.id,
                          name: product.name,
                          brand: product.brand,
                          price: product.price,
                          originalPrice: product.originalPrice,
                          image: product.images[0],
                          images: product.images,
                          rating: product.rating,
                          reviewCount: product.reviewCount,
                          isOnSale: product.isSale,
                          isNew: product.isNew,
                          inStock: product.inStock,
                          category: product.category
                        }}
                        showQuickActions={true}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {filteredAndSortedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Link href={`/product/${product.id}`} className="group block">
                        <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-6">
                              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={product.images[0] || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                      {product.name}
                                    </h3>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {product.isSale && <Badge className="bg-destructive">Sale</Badge>}
                                    {product.isNew && <Badge className="bg-green-500">New</Badge>}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span className="text-sm text-muted-foreground">
                                        {product.rating} ({product.reviewCount})
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-foreground">${product.price}</span>
                                    {product.originalPrice && (
                                      <span className="text-sm text-muted-foreground line-through">
                                        ${product.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* No Results */}
            {filteredAndSortedProducts.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <MobileFilters
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        onApplyFilters={(filters) => {
          setSelectedBrands(filters.brand || [])
          setSelectedCategories(filters.category || [])
          setSelectedColors(filters.color || [])
          setPriceRange(filters.price || [0, 300])
        }}
        onClearFilters={() => {
          setSelectedBrands([])
          setSelectedCategories([])
          setSelectedColors([])
          setPriceRange([0, 300])
        }}
        activeFiltersCount={selectedBrands.length + selectedCategories.length + selectedColors.length}
      />

      <Footer />
    </div>
  )
}
