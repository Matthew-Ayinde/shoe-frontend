"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { Search, Grid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { products } from "@/lib/dummy-data"
import Link from "next/link"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    brands: [] as string[],
    categories: [] as string[],
    colors: [] as string[],
    sizes: [] as string[],
  })

  const brands = ["Nike", "Adidas", "Puma", "Reebok", "New Balance", "Converse"]
  const categories = ["Running", "Basketball", "Casual", "Formal", "Sports"]
  const colors = ["Black", "White", "Blue", "Red", "Gray", "Brown"]
  const sizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"]

  useEffect(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply filters
    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) => filters.brands.includes(product.brand))
    }
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) => filters.categories.includes(product.category))
    }
    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) => product.colors.some((color) => filters.colors.includes(color)))
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Keep original order for relevance
        break
    }

    setFilteredProducts(filtered)
  }, [searchQuery, filters, sortBy])

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType as keyof typeof prev].includes(value)
        ? (prev[filterType as keyof typeof prev] as string[]).filter((item) => item !== value)
        : [...(prev[filterType as keyof typeof prev] as string[]), value],
    }))
  }

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 500],
      brands: [],
      categories: [],
      colors: [],
      sizes: [],
    })
  }

  const activeFiltersCount =
    filters.brands.length + filters.categories.length + filters.colors.length + filters.sizes.length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {query ? `Search Results for "${query}"` : "Search Products"}
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for shoes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {activeFiltersCount > 0 && (
                <Button variant="ghost" onClick={clearFilters} className="text-sm">
                  Clear All
                </Button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="flex border border-gray-300 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="w-64 flex-shrink-0"
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={filters.priceRange[0]}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [Number.parseInt(e.target.value) || 0, prev.priceRange[1]],
                          }))
                        }
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Min"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [prev.priceRange[0], Number.parseInt(e.target.value) || 500],
                          }))
                        }
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Brands */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Brands</h4>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <label key={brand} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.brands.includes(brand)}
                            onChange={() => handleFilterChange("brands", brand)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.categories.includes(category)}
                            onChange={() => handleFilterChange("categories", category)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Colors */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Colors</h4>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleFilterChange("colors", color)}
                          className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                            filters.colors.includes(color)
                              ? "bg-blue-100 border-blue-500 text-blue-700"
                              : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Products Grid/List */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {viewMode === "grid" ? (
                      <Card className="group hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-0">
                          <Link href={`/product/${product.id}`}>
                            <div className="aspect-square overflow-hidden rounded-t-lg">
                              <img
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">${product.price}</span>
                                <div className="flex items-center">
                                  <span className="text-yellow-400">★</span>
                                  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="group hover:shadow-md transition-shadow duration-300">
                        <CardContent className="p-4">
                          <Link href={`/product/${product.id}`}>
                            <div className="flex gap-4">
                              <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                                <img
                                  src={product.images[0] || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                                  <div className="flex items-center">
                                    <span className="text-yellow-400">★</span>
                                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
