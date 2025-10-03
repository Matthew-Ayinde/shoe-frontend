"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield, Heart, Tag, Sparkles, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingCard } from "@/components/ui/floating-card"
import { ParticleBackground } from "@/components/ui/particle-background"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { products } from "@/lib/dummy-data"

export default function CartPage() {
  const { state: cartState, updateQuantity, removeItem, clearCart, applyCoupon } = useCart()
  const { toggleItem, isInWishlist } = useWishlist()

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  const handleQuantityUpdate = (id: string, size: string, color: string, newQuantity: number) => {
    updateQuantity(id, size, color, newQuantity)
  }

  const handleRemoveItem = (id: string, size: string, color: string) => {
    removeItem(id, size, color)
  }

  const handleMoveToWishlist = (item: any) => {
    const wishlistItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      brand: item.brand,
      category: item.category || 'Shoes',
      rating: 4.5,
      reviewCount: 128,
      inStock: item.inStock,
      isOnSale: !!item.originalPrice
    }

    toggleItem(wishlistItem)
    handleRemoveItem(item.id, item.size, item.color)
  }

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) return

    setIsApplyingPromo(true)
    const success = await applyCoupon(promoCode.toUpperCase())

    if (success) {
      setAppliedPromo(promoCode.toUpperCase())
      setPromoCode("")
    }

    setIsApplyingPromo(false)
  }

  const subtotal = cartState.total
  const discount = appliedPromo ? subtotal * 0.1 : 0 // Mock discount calculation
  const shipping = subtotal > 75 ? 0 : 9.99
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shipping + tax

  const suggestedProducts = products.slice(0, 3)
  const cartItems = cartState.items

  if (cartState.isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <ParticleBackground particleCount={20} particleColor="oklch(0.45 0.18 250 / 0.1)" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <FloatingCard className="max-w-md mx-auto">
              <CardContent className="pt-8 pb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag className="h-12 w-12 text-white" />
                </div>
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Your cart is empty
                  </h1>
                  <p className="text-muted-foreground">
                    Discover amazing shoes and start building your perfect collection
                  </p>
                </div>
                <div className="mt-8 space-y-4">
                  <AnimatedButton size="lg" className="w-full bg-gradient-primary" animation="glow" asChild>
                    <Link href="/products">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Explore Products
                    </Link>
                  </AnimatedButton>
                  <AnimatedButton variant="outline" size="lg" className="w-full" animation="scale" asChild>
                    <Link href="/account">
                      <Heart className="mr-2 h-5 w-5" />
                      View Wishlist
                    </Link>
                  </AnimatedButton>
                </div>
              </CardContent>
            </FloatingCard>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <ParticleBackground particleCount={25} particleColor="oklch(0.45 0.18 250 / 0.1)" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center lg:text-left"
        >
          <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Shopping Cart
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-start space-x-4 text-muted-foreground">
            <span>{cartState.itemCount} items</span>
            <span>•</span>
            <span>Total: ${cartState.total.toFixed(2)}</span>
            {shipping === 0 && (
              <>
                <span>•</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Truck className="w-3 h-3 mr-1" />
                  Free Shipping
                </Badge>
              </>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cartItems.map((item, index) => {
                const itemKey = `${item.id}-${item.size}-${item.color}`
                return (
                  <motion.div
                    key={itemKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <FloatingCard className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          {/* Product Image */}
                          <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-muted/50 to-muted">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-110"
                            />
                            {item.originalPrice && (
                              <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                                Sale
                              </Badge>
                            )}
                          </div>

                          <div className="flex-1 space-y-3">
                            {/* Product Info */}
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <p className="text-sm text-muted-foreground font-medium">{item.brand}</p>
                                <Link
                                  href={`/product/${item.id}`}
                                  className="font-semibold text-lg text-foreground hover:text-primary transition-colors line-clamp-1"
                                >
                                  {item.name}
                                </Link>
                                <div className="flex items-center gap-4 text-sm">
                                  <Badge variant="outline" className="text-xs">
                                    Size: {item.size}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {item.color}
                                  </Badge>
                                  {item.inStock ? (
                                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                      In Stock
                                    </Badge>
                                  ) : (
                                    <Badge variant="destructive" className="text-xs">
                                      Out of Stock
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center space-x-2">
                                <AnimatedButton
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleMoveToWishlist(item)}
                                  className="text-muted-foreground hover:text-red-500"
                                  animation="scale"
                                >
                                  <Heart className={`h-4 w-4 ${isInWishlist(item.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                </AnimatedButton>
                                <AnimatedButton
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                                  className="text-muted-foreground hover:text-destructive"
                                  animation="scale"
                                >
                                  <X className="h-4 w-4" />
                                </AnimatedButton>
                              </div>
                            </div>

                            {/* Quantity and Price Controls */}
                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                              <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-muted-foreground">Quantity:</span>
                                <div className="flex items-center space-x-2">
                                  <AnimatedButton
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleQuantityUpdate(item.id, item.size, item.color, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    animation="scale"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </AnimatedButton>
                                  <span className="w-12 text-center font-semibold text-lg">{item.quantity}</span>
                                  <AnimatedButton
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleQuantityUpdate(item.id, item.size, item.color, item.quantity + 1)}
                                    disabled={item.quantity >= item.maxQuantity}
                                    animation="scale"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </AnimatedButton>
                                </div>
                                {item.quantity >= item.maxQuantity && (
                                  <span className="text-xs text-amber-600">Max quantity reached</span>
                                )}
                              </div>

                              <div className="text-right space-y-1">
                                <div className="flex items-center space-x-2">
                                  {item.originalPrice && (
                                    <span className="text-sm text-muted-foreground line-through">
                                      ${(item.originalPrice * item.quantity).toFixed(2)}
                                    </span>
                                  )}
                                  <span className="font-bold text-xl text-foreground">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  ${item.price.toFixed(2)} each
                                  {item.originalPrice && (
                                    <span className="ml-2 text-green-600 font-medium">
                                      Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </FloatingCard>
                  </motion.div>
                )
              })}
              ))}
            </AnimatePresence>

            {/* Enhanced Continue Shopping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-6"
            >
              <div className="flex items-center justify-between">
                <AnimatedButton variant="outline" asChild animation="scale">
                  <Link href="/products">
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Link>
                </AnimatedButton>

                <AnimatedButton
                  variant="ghost"
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-destructive"
                  animation="scale"
                >
                  Clear Cart
                </AnimatedButton>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FloatingCard className="sticky top-24" glowEffect>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-white" />
                  </div>
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Enhanced Promo Code Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                    <Tag className="w-4 h-4" />
                    <span>Promo Code</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyPromoCode()}
                    />
                    <AnimatedButton
                      onClick={handleApplyPromoCode}
                      disabled={!promoCode.trim() || isApplyingPromo}
                      animation="glow"
                      size="sm"
                    >
                      {isApplyingPromo ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        'Apply'
                      )}
                    </AnimatedButton>
                  </div>

                  {appliedPromo && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <Gift className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-green-800">
                          {appliedPromo} Applied
                        </span>
                      </div>
                        variant="ghost"
                        size="sm"
                        onClick={() => setAppliedPromo("")}
                        className="h-auto p-1 text-green-600 hover:text-green-800"
                        animation="scale"
                      >
                        <X className="w-3 h-3" />
                      </AnimatedButton>
                    </motion.div>
                  )}

                  {/* Promo Code Suggestions */}
                  <div className="text-xs text-muted-foreground">
                    Try: <span className="font-mono bg-muted px-1 rounded">WELCOME10</span>, <span className="font-mono bg-muted px-1 rounded">SAVE20</span>
                  </div>
                </div>

                <Separator />

                {/* Enhanced Price Breakdown */}
                <div className="space-y-4">
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Subtotal ({cartState.itemCount} items)</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-between text-green-600"
                    >
                      <span className="flex items-center space-x-1">
                        <Gift className="w-4 h-4" />
                        <span>Discount ({appliedPromo})</span>
                      </span>
                      <span className="font-medium">-${discount.toFixed(2)}</span>
                    </motion.div>
                  )}

                  <div className="flex justify-between">
                    <span className="flex items-center space-x-1 text-muted-foreground">
                      <Truck className="w-4 h-4" />
                      <span>Shipping</span>
                    </span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Add ${(75 - subtotal).toFixed(2)} more for free shipping
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>

                {/* Enhanced Checkout Button */}
                <div className="space-y-3">
                  <AnimatedButton
                    size="lg"
                    className="w-full bg-gradient-primary text-lg py-6"
                    animation="glow"
                    asChild
                  >
                    <Link href="/checkout">
                      <Shield className="mr-2 h-5 w-5" />
                      Secure Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </AnimatedButton>

                  {/* Security & Benefits */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Shield className="h-3 w-3 text-green-500" />
                        <span>SSL Secured</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Truck className="h-3 w-3 text-blue-500" />
                        <span>{shipping === 0 ? "Free Shipping" : "Fast Delivery"}</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        30-day returns • Secure payments • Free exchanges
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </FloatingCard>
          </motion.div>
        </div>

        {/* Suggested Products */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedProducts.map((product, index) => (
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
        </motion.section>
      </div>

      <Footer />
    </div>
  )
}
