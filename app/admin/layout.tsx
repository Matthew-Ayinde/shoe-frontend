"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Sparkles,
  Shield,
  TrendingUp,
  FileText,
  CreditCard,
  Truck,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingCard } from "@/components/ui/floating-card"
import { ParticleBackground } from "@/components/ui/particle-background"

const adminNavItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", badge: null },
  { href: "/admin/products", icon: Package, label: "Products", badge: "12" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders", badge: "5" },
  { href: "/admin/users", icon: Users, label: "Users", badge: null },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics", badge: null },
  { href: "/admin/reports", icon: FileText, label: "Reports", badge: null },
  { href: "/admin/payments", icon: CreditCard, label: "Payments", badge: "2" },
  { href: "/admin/shipping", icon: Truck, label: "Shipping", badge: null },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages", badge: "8" },
  { href: "/admin/settings", icon: Settings, label: "Settings", badge: null },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLarge, setIsLarge] = useState(false) // track lg breakpoint
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Simulate authentication check
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth === "authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  // Keep sidebar visible by default on large screens
  useEffect(() => {
    function handleResize() {
      const large = window.innerWidth >= 1024
      setIsLarge(large)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // sync sidebar open based on breakpoint
  useEffect(() => {
    if (isLarge) setSidebarOpen(true)
    else setSidebarOpen(false)
  }, [isLarge])

  const handleLogin = () => {
    localStorage.setItem("adminAuth", "authenticated")
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full mx-4">
          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
                <p className="text-muted-foreground">Access the admin dashboard</p>
              </div>

              <div className="space-y-4">
                <Input placeholder="Email" type="email" />
                <Input placeholder="Password" type="password" />
              </div>

              <Button onClick={handleLogin} className="w-full">
                Sign In
              </Button>

              <div className="text-sm text-muted-foreground">Demo: Click "Sign In" to access admin dashboard</div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-background">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <ParticleBackground particleCount={15} particleColor="oklch(0.45 0.18 250 / 0.08)" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2" />
        </div>

        <div className="relative flex min-h-screen">
        {/* Mobile sidebar overlay - only when sidebar is open and NOT on large screens */}
        {sidebarOpen && !isLarge && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

          {/* Sidebar */}
          <motion.aside
            initial={false}
            // Show sidebar when isLarge OR sidebarOpen; otherwise hide by translating -100%
            animate={{ x: isLarge || sidebarOpen ? 0 : "-100%" }}
            className="fixed left-0 top-0 z-50 h-full w-64 bg-card/80 backdrop-blur-xl border-r border-border/50 lg:translate-x-0 lg:static lg:z-auto"
          >
            <div className="flex h-full flex-col">
              {/* Logo */}
              <div className="flex h-16 items-center justify-between px-6 border-b border-border/50">
                <Link href="/admin" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Admin Panel</span>
                    <p className="text-xs text-muted-foreground">Shoe Store</p>
                  </div>
                </Link>
                <AnimatedButton
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  animation="scale"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-4 w-4" />
                </AnimatedButton>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-2 p-4">
                {adminNavItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                          isActive
                            ? "bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* User info */}
              <div className="p-4 border-t border-border/50">
                <FloatingCard className="p-3 bg-muted/30 backdrop-blur-sm">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start space-x-3 p-0">
                        <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-foreground">Admin User</p>
                          <p className="text-xs text-muted-foreground">admin@shoestore.com</p>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FloatingCard>
              </div>
          </div>
          
        </motion.aside>

        

        {/* Main content */}
        <div className="md:pl-0 w-full">
          
            {/* Top bar */}
            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/50 bg-card/50 backdrop-blur-xl px-6">
              <AnimatedButton
                variant="ghost"
                size="icon"
                className="lg:hidden"
                animation="scale"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </AnimatedButton>

              <div className="flex-1 flex items-center gap-4">
                <div className="relative max-w-md flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AnimatedButton variant="ghost" size="icon" className="relative" animation="scale">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-primary text-primary-foreground pulse-glow">
                    3
                  </Badge>
                </AnimatedButton>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <AnimatedButton variant="ghost" size="icon" animation="scale">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/admin-avatar.png" />
                        <AvatarFallback className="bg-gradient-accent text-white">AD</AvatarFallback>
                      </Avatar>
                    </AnimatedButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Admin User</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            {/* Page content */}
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
