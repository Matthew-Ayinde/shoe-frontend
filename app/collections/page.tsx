"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/dummy-data"

export default function CollectionsPage() {
  const collections = [
    {
      id: "athletic",
      name: "Athletic Performance",
      description: "High-performance shoes for athletes and fitness enthusiasts",
      image: "/nike-air-max-blue-sneaker.jpg",
      productCount: 45,
    },
    {
      id: "casual",
      name: "Casual Comfort",
      description: "Everyday shoes that combine style with all-day comfort",
      image: "/brown-leather-oxford-dress-shoe.jpg",
      productCount: 38,
    },
    {
      id: "formal",
      name: "Formal Elegance",
      description: "Sophisticated footwear for professional and formal occasions",
      image: "/brown-leather-oxford-dress-shoe-side.jpg",
      productCount: 22,
    },
    {
      id: "outdoor",
      name: "Outdoor Adventure",
      description: "Durable shoes built for hiking, camping, and outdoor activities",
      image: "/nike-air-max-blue-sneaker-side.jpg",
      productCount: 31,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">Our Collections</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Discover our carefully curated collections, each designed for different lifestyles and occasions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/products?collection=${collection.id}`} className="group block">
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-white">{collection.name}</h3>
                          <p className="text-white/90 text-sm">{collection.description}</p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-white/80 text-sm">{collection.productCount} products</span>
                            <Button variant="secondary" size="sm">
                              Explore
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Categories Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">Shop by Category</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Browse our main categories to find exactly what you're looking for
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/${category.id}`} className="group block">
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-6 left-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                        <Button variant="secondary" size="sm">
                          Shop Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
