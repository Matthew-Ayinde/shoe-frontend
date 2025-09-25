"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Grid, List, Tag, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/dummy-data"
import Link from "next/link"

export default function SalePage() {
  const [saleProducts, setSaleProducts] = useState(products)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("discount")

  useEffect(() => {
    // Filter products on sale and add discount information
    const filtered = products
      .map((product) => ({
        ...product,
        originalPrice: product.price + product.price * 0.2, // Simulate original price
        discount: Math.floor(Math.random() * 40) + 10, // Random discount 10-50%
      }))
      .filter(() => Math.random() > 0.3) // Show ~70% of products on sale

    // Sort products
    switch (sortBy) {
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount)
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    setSaleProducts(filtered)
  }, [sortBy])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sale Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-8 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Flash Sale</h1>
                <p className="text-xl opacity-90">Up to 50% off on selected shoes</p>
                <div className="flex items-center mt-4 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Limited time offer - Ends in 2 days</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">50%</div>
                <div className="text-sm opacity-90">MAX OFF</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Badge variant="destructive" className="text-sm">
                <Tag className="w-3 h-3 mr-1" />
                Sale Items
              </Badge>
              <span className="text-gray-600">
                {saleProducts.length} product{saleProducts.length !== 1 ? "s" : ""} on sale
              </span>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="discount">Highest Discount</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
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

        {/* Products Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={
            viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {saleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {viewMode === "grid" ? (
                <Card className="group hover:shadow-lg transition-shadow duration-300 relative">
                  <div className="absolute top-2 left-2 z-10">
                    <Badge variant="destructive" className="text-xs">
                      -{product.discount}%
                    </Badge>
                  </div>
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
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">${product.price}</span>
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          </div>
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
                <Card className="group hover:shadow-md transition-shadow duration-300 relative">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="destructive" className="text-xs">
                      -{product.discount}%
                    </Badge>
                  </div>
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
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-900">${product.price}</span>
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            </div>
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
      </div>
    </div>
  )
}
