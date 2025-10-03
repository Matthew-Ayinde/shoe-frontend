"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Package,
  Heart,
  Settings,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Edit,
  Eye,
  Download,
  Star,
  Calendar,
  TrendingUp,
  Gift,
  Sparkles,
  ArrowRight,
  Plus,
  Search,
  Filter,
  MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingCard } from "@/components/ui/floating-card"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const dummyUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=80&width=80",
  memberSince: "January 2023",
  totalOrders: 12,
  totalSpent: 2450,
  loyaltyPoints: 1250,
  tier: "Gold",
  nextTierPoints: 250,
  phone: "+1 (555) 123-4567",
  birthday: "March 15, 1990",
  preferences: {
    newsletter: true,
    smsNotifications: false,
    orderUpdates: true,
  }
}

const recentOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 189.99,
    items: 2,
    image: "/nike-air-max-blue-sneaker.jpg",
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "Shipped",
    total: 249.99,
    items: 1,
    image: "/brown-leather-oxford-dress-shoe.jpg",
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "Processing",
    total: 159.99,
    items: 1,
    image: "/placeholder.svg?height=60&width=60",
  },
]

const menuItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "payment", label: "Payment Methods", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [orderFilter, setOrderFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "Processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const loyaltyProgress = (dummyUser.loyaltyPoints / (dummyUser.loyaltyPoints + dummyUser.nextTierPoints)) * 100

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <ParticleBackground particleCount={25} particleColor="oklch(0.65 0.12 160 / 0.15)" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    My Account
                  </h1>
                  <p className="text-muted-foreground">
                    Welcome back, {dummyUser.name}! Manage your account and orders.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <AnimatedButton variant="outline" animation="magnetic">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </AnimatedButton>

              <AnimatedButton animation="glow" className="bg-gradient-primary">
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade Tier
              </AnimatedButton>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:inline-flex">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 mt-8">
              {/* User Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FloatingCard glowEffect tiltEffect className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm border-border/50">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-primary/20">
                        <AvatarImage src={dummyUser.avatar || "/placeholder.svg"} alt={dummyUser.name} />
                  <AvatarFallback>
                    {dummyUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{dummyUser.name}</CardTitle>
                <CardDescription>{dummyUser.email}</CardDescription>
                <Badge variant="secondary" className="mt-2">
                  Member since {dummyUser.memberSince}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Orders:</span>
                    <span className="font-medium">{dummyUser.totalOrders}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Spent:</span>
                    <span className="font-medium">${dummyUser.totalSpent}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Loyalty Points:</span>
                    <span className="font-medium text-blue-600">{dummyUser.loyaltyPoints}</span>
                  </div>
                </div>
                <Separator className="mb-4" />
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          activeTab === item.id
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {item.label}
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue={dummyUser.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      defaultValue="1990-01-01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "orders" && (
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and track your recent orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={order.image || "/placeholder.svg"}
                              alt="Order item"
                              className="w-12 h-12 object-cover rounded-md"
                            />
                            <div>
                              <p className="font-medium text-gray-900">Order {order.id}</p>
                              <p className="text-sm text-gray-600">{order.date}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            {order.items} item{order.items > 1 ? "s" : ""} • ${order.total}
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "addresses" && (
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Manage your shipping and billing addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">Home Address</h3>
                        <Badge variant="secondary">Default</Badge>
                      </div>
                      <p className="text-gray-600 text-sm">
                        123 Main Street
                        <br />
                        Apartment 4B
                        <br />
                        New York, NY 10001
                        <br />
                        United States
                      </p>
                      <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      Add New Address
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Add other tab content as needed */}
            {activeTab !== "profile" && activeTab !== "orders" && activeTab !== "addresses" && (
              <Card>
                <CardHeader>
                  <CardTitle>{menuItems.find((item) => item.id === activeTab)?.label}</CardTitle>
                  <CardDescription>This section is coming soon</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The {menuItems.find((item) => item.id === activeTab)?.label.toLowerCase()} section is currently
                    under development.
                  </p>
                </CardContent>
              </Card>
            )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
