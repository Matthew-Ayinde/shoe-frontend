"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingBag, User, Menu, X, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "@/components/ui/animated-button"
import { NotificationSystem } from "@/components/ui/notification-system"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { state: cartState } = useCart()
  const { state: wishlistState } = useWishlist()

  const cartItemCount = cartState.itemCount
  const wishlistItemCount = wishlistState.itemCount

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: "Men", href: "/men", icon: "👨" },
    { name: "Women", href: "/women", icon: "👩" },
    { name: "Kids", href: "/kids", icon: "🧒" },
    { name: "Collections", href: "/collections", icon: "✨" },
    { name: "Sale", href: "/sale", icon: "🔥" },
  ]

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg'
          : 'bg-background/80 backdrop-blur-sm border-b border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <motion.div
                className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center"
                whileHover={{ boxShadow: "0 0 20px oklch(0.45 0.18 250 / 0.4)" }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                StepForward
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className="relative px-4 py-2 text-foreground hover:text-primary transition-all duration-300 font-medium group"
                >
                  <span className="flex items-center space-x-1">
                    <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </span>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <motion.div
              className="relative w-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
              <Input
                type="search"
                placeholder="Search for your perfect shoes..."
                className="pl-10 pr-4 bg-muted/30 border border-border/50 rounded-full focus:bg-background/80 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 backdrop-blur-sm"
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 pointer-events-none"
                whileFocus={{ opacity: 0.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            {/* Search Icon - Mobile */}
            <AnimatedButton
              variant="ghost"
              size="icon"
              className="lg:hidden"
              animation="magnetic"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </AnimatedButton>

            {/* Wishlist */}
            <AnimatedButton variant="ghost" size="icon" className="relative" animation="scale" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistItemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Badge className="h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-600 flex items-center justify-center">
                      {wishlistItemCount > 9 ? '9+' : wishlistItemCount}
                    </Badge>
                  </motion.div>
                )}
              </Link>
            </AnimatedButton>

            {/* Account */}
            <AnimatedButton variant="ghost" size="icon" animation="scale" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </AnimatedButton>

            {/* Notifications */}
            <NotificationSystem />

            {/* Cart */}
            <AnimatedButton variant="ghost" size="icon" className="relative" animation="magnetic" asChild>
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-primary border-0 pulse-glow">
                      {cartItemCount}
                    </Badge>
                  </motion.div>
                )}
              </Link>
            </AnimatedButton>

            {/* Mobile Menu Button */}
            <AnimatedButton
              variant="ghost"
              size="icon"
              className="md:hidden"
              animation="magnetic"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatedButton>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden py-4 border-t border-border/50 bg-gradient-to-r from-background/50 to-muted/20 backdrop-blur-sm"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                <Input
                  type="search"
                  placeholder="Search for your perfect shoes..."
                  className="pl-10 bg-background/80 border border-border/50 rounded-full focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden py-6 border-t border-border/50 bg-gradient-to-b from-background/80 to-muted/20 backdrop-blur-sm"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3 text-foreground hover:text-primary transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-muted/30 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                      <motion.div
                        className="ml-auto w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
