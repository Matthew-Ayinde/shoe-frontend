"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Trash2, 
  Heart,
  ArrowRight,
  Gift,
  Truck,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { AnimatedButton } from "@/components/ui/animated-button"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

interface MobileCartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileCartDrawer({ isOpen, onClose }: MobileCartDrawerProps) {
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  
  const { state: cartState, updateQuantity, removeItem, clearCart } = useCart()
  const { toggleItem } = useWishlist()
  
  const subtotal = cartState.total
  const discount = appliedPromo ? subtotal * 0.1 : 0
  const shipping = subtotal > 75 ? 0 : 9.99
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shipping + tax

  const handleQuantityUpdate = (id: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id, size, color)
    } else {
      updateQuantity(id, size, color, newQuantity)
    }
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
    removeItem(item.id, item.size, item.color)
  }

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return
    
    setIsApplyingPromo(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock promo validation
    const validPromos = ['SAVE10', 'WELCOME', 'FIRST20']
    if (validPromos.includes(promoCode.toUpperCase())) {
      setAppliedPromo(promoCode.toUpperCase())
      setPromoCode("")
    }
    
    setIsApplyingPromo(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-background shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Shopping Cart</h2>
                  {cartState.itemCount > 0 && (
                    <Badge className="bg-primary text-white">
                      {cartState.itemCount}
                    </Badge>
                  )}
                </div>
                <AnimatedButton
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  animation="scale"
                >
                  <X className="h-5 w-5" />
                </AnimatedButton>
              </div>

              {/* Cart Content */}
              {cartState.items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Add some products to get started
                  </p>
                  <AnimatedButton
                    onClick={onClose}
                    className="bg-gradient-primary"
                    animation="glow"
                  >
                    Continue Shopping
                  </AnimatedButton>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-4 space-y-4">
                      <AnimatePresence>
                        {cartState.items.map((item) => (
                          <motion.div
                            key={`${item.id}-${item.size}-${item.color}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg"
                          >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                              {item.originalPrice && (
                                <Badge className="absolute top-1 left-1 text-xs bg-red-500 text-white px-1 py-0">
                                  Sale
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {item.brand} • Size {item.size} • {item.color}
                              </p>
                              
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-1">
                                  <span className="font-semibold text-sm">
                                    ${item.price.toFixed(2)}
                                  </span>
                                  {item.originalPrice && (
                                    <span className="text-xs text-muted-foreground line-through">
                                      ${item.originalPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                  <AnimatedButton
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleQuantityUpdate(item.id, item.size, item.color, item.quantity - 1)}
                                    animation="scale"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </AnimatedButton>
                                  
                                  <span className="w-8 text-center text-sm font-medium">
                                    {item.quantity}
                                  </span>
                                  
                                  <AnimatedButton
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleQuantityUpdate(item.id, item.size, item.color, item.quantity + 1)}
                                    disabled={item.quantity >= item.maxQuantity}
                                    animation="scale"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </AnimatedButton>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 mt-2">
                                <AnimatedButton
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 text-xs px-2"
                                  onClick={() => handleMoveToWishlist(item)}
                                  animation="scale"
                                >
                                  <Heart className="h-3 w-3 mr-1" />
                                  Save
                                </AnimatedButton>
                                
                                <AnimatedButton
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 text-xs px-2 text-red-600 hover:text-red-700"
                                  onClick={() => removeItem(item.id, item.size, item.color)}
                                  animation="scale"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Remove
                                </AnimatedButton>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="p-4 border-t border-border/50">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Gift className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Promo Code</span>
                      </div>
                      
                      {appliedPromo ? (
                        <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg">
                          <span className="text-sm font-medium text-green-700">
                            {appliedPromo} Applied
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setAppliedPromo("")}
                            className="text-green-700 hover:text-green-800 h-6 px-2"
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Enter code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1 h-8 text-sm"
                          />
                          <AnimatedButton
                            size="sm"
                            onClick={handleApplyPromo}
                            disabled={!promoCode.trim() || isApplyingPromo}
                            className="h-8 px-3"
                            animation="scale"
                          >
                            {isApplyingPromo ? "..." : "Apply"}
                          </AnimatedButton>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="p-4 border-t border-border/50 space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                      <Shield className="h-3 w-3" />
                      <span>Secure checkout</span>
                    </div>

                    {/* Checkout Button */}
                    <AnimatedButton
                      asChild
                      className="w-full bg-gradient-primary"
                      animation="glow"
                      onClick={onClose}
                    >
                      <Link href="/checkout">
                        Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </AnimatedButton>

                    {/* Continue Shopping */}
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={onClose}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
