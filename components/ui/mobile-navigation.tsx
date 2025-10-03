"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Home, 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu,
  X,
  Sparkles,
  Tag,
  Truck,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AnimatedButton } from "@/components/ui/animated-button"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

interface MobileNavigationProps {
  className?: string
}

export function MobileNavigation({ className }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  const { state: cartState } = useCart()
  const { state: wishlistState } = useWishlist()
  
  const cartItemCount = cartState.itemCount
  const wishlistItemCount = wishlistState.itemCount

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Men", href: "/men", icon: User },
    { name: "Women", href: "/women", icon: User },
    { name: "Products", href: "/products", icon: Tag },
    { name: "About", href: "/about", icon: Sparkles },
  ]

  const quickActions = [
    { name: "Cart", href: "/cart", icon: ShoppingBag, count: cartItemCount },
    { name: "Wishlist", href: "/wishlist", icon: Heart, count: wishlistItemCount },
    { name: "Account", href: "/account", icon: User },
    { name: "Orders", href: "/order-tracking", icon: Truck },
  ]

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/50 ${className}`}>
        <div className="flex items-center justify-around px-2 py-2">
          {/* Home */}
          <AnimatedButton
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 h-auto py-2 px-3"
            animation="scale"
            asChild
          >
            <Link href="/">
              <Home className="h-5 w-5" />
              <span className="text-xs font-medium">Home</span>
            </Link>
          </AnimatedButton>

          {/* Search */}
          <AnimatedButton
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 h-auto py-2 px-3"
            animation="scale"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs font-medium">Search</span>
          </AnimatedButton>

          {/* Cart */}
          <AnimatedButton
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 h-auto py-2 px-3 relative"
            animation="scale"
            asChild
          >
            <Link href="/cart">
              <div className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-primary flex items-center justify-center">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">Cart</span>
            </Link>
          </AnimatedButton>

          {/* Wishlist */}
          <AnimatedButton
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 h-auto py-2 px-3 relative"
            animation="scale"
            asChild
          >
            <Link href="/wishlist">
              <div className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-red-500 flex items-center justify-center">
                    {wishlistItemCount > 9 ? '9+' : wishlistItemCount}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">Saved</span>
            </Link>
          </AnimatedButton>

          {/* Menu */}
          <AnimatedButton
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 h-auto py-2 px-3"
            animation="scale"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs font-medium">Menu</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="flex flex-col h-full">
              {/* Search Header */}
              <div className="flex items-center space-x-4 p-4 border-b border-border/50">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 text-base"
                    autoFocus
                  />
                </div>
                <AnimatedButton
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  animation="scale"
                >
                  <X className="h-5 w-5" />
                </AnimatedButton>
              </div>

              {/* Search Content */}
              <div className="flex-1 p-4">
                {searchQuery ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Searching for "{searchQuery}"...
                    </p>
                    {/* Search results would go here */}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Popular Searches</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Nike", "Adidas", "Running", "Sneakers", "Basketball"].map((term) => (
                          <Button
                            key={term}
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            onClick={() => setSearchQuery(term)}
                          >
                            {term}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Categories</h3>
                      <div className="space-y-2">
                        {["Men's Shoes", "Women's Shoes", "Athletic", "Casual", "Formal"].map((category) => (
                          <Link
                            key={category}
                            href={`/products?category=${category.toLowerCase()}`}
                            className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                            onClick={() => setIsSearchOpen(false)}
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <h2 className="text-xl font-bold">Menu</h2>
                <AnimatedButton
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                  animation="scale"
                >
                  <X className="h-5 w-5" />
                </AnimatedButton>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Quick Actions */}
                <div className="p-4 border-b border-border/50">
                  <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action) => {
                      const Icon = action.icon
                      return (
                        <Link
                          key={action.name}
                          href={action.href}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="relative">
                            <Icon className="h-5 w-5" />
                            {action.count && action.count > 0 && (
                              <Badge className="absolute -top-1 -right-1 h-3 w-3 p-0 text-xs">
                                {action.count > 9 ? '9+' : action.count}
                              </Badge>
                            )}
                          </div>
                          <span className="font-medium">{action.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="p-4">
                  <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                    Navigation
                  </h3>
                  <div className="space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Additional Links */}
                <div className="p-4 border-t border-border/50">
                  <div className="space-y-2">
                    <Link
                      href="/support"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Support</span>
                    </Link>
                    <Link
                      href="/shipping"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Shipping Info</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
