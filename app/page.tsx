"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, TrendingUp, Award, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { products, categories } from "@/lib/dummy-data"


export default function HomePage() {
  const featuredProducts = products.slice(0, 4)
  const newArrivals = products.filter((p) => p.isNew).slice(0, 3)
  const saleProducts = products.filter((p) => p.isSale).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Navigation />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  New Collection 2024
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                  Step Into Your
                  <span className="text-primary block">Perfect Fit</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  Discover premium footwear that combines cutting-edge design with unmatched comfort. From athletic
                  performance to timeless elegance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/collections">
                    Shop Collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">50K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">4.8</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">200+</div>
                  <div className="text-sm text-muted-foreground">Styles</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-muted/30">
                <Image
                  src="/nike-air-max-blue-sneaker.jpg"
                  alt="Featured Shoe"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-4 -left-4 bg-background border border-border rounded-lg p-4 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Trending Now</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-lg p-4 shadow-lg"
              >
                <div className="text-center">
                  <div className="text-lg font-bold">30%</div>
                  <div className="text-xs">OFF</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                description: "Free shipping on orders over $75",
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "Handpicked from top global brands",
              },
              {
                icon: Star,
                title: "30-Day Returns",
                description: "Easy returns and exchanges",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">Shop by Category</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Find the perfect shoes for every occasion and style
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

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">Featured Products</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Handpicked favorites from our premium collection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/product/${product.id}`} className="group block">
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.isSale && <Badge className="absolute top-3 left-3 bg-destructive">Sale</Badge>}
                      {product.isNew && <Badge className="absolute top-3 left-3 bg-green-500">New</Badge>}
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
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
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals & Sale Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* New Arrivals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">New Arrivals</h3>
                  <p className="text-muted-foreground">Latest styles just dropped</p>
                </div>
                <div className="space-y-4">
                  {newArrivals.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} className="group block">
                      <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-muted-foreground">{product.brand}</p>
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-lg font-semibold text-foreground">${product.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/new-arrivals">View All New Arrivals</Link>
                </Button>
              </div>
            </motion.div>

            {/* Sale Items */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">On Sale</h3>
                  <p className="text-muted-foreground">Limited time offers</p>
                </div>
                <div className="space-y-4">
                  {saleProducts.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} className="group block">
                      <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          <Badge className="absolute -top-1 -right-1 bg-destructive text-xs">Sale</Badge>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-muted-foreground">{product.brand}</p>
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold text-foreground">${product.price}</p>
                            {product.originalPrice && (
                              <p className="text-sm text-muted-foreground line-through">${product.originalPrice}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/sale">View All Sale Items</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="pb-20 md:pb-0">
        <Footer />
      </div>
    </div>
  )
}
