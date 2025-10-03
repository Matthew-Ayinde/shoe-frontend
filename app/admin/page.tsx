"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  RefreshCw,
  Bell,
  Settings,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Zap,
  Target,
  Globe,
  Sparkles,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingCard } from "@/components/ui/floating-card"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

// Enhanced data with more comprehensive metrics
const salesData = [
  { name: "Jan", sales: 4000, orders: 240, customers: 180, conversion: 2.4 },
  { name: "Feb", sales: 3000, orders: 198, customers: 165, conversion: 2.1 },
  { name: "Mar", sales: 5000, orders: 300, customers: 220, conversion: 2.8 },
  { name: "Apr", sales: 4500, orders: 278, customers: 195, conversion: 2.6 },
  { name: "May", sales: 6000, orders: 389, customers: 280, conversion: 3.2 },
  { name: "Jun", sales: 5500, orders: 349, customers: 245, conversion: 2.9 },
  { name: "Jul", sales: 6200, orders: 412, customers: 298, conversion: 3.4 },
]

const categoryData = [
  { name: "Sneakers", value: 45, color: "oklch(0.45 0.18 250)", revenue: 28500 },
  { name: "Dress Shoes", value: 25, color: "oklch(0.55 0.15 280)", revenue: 18750 },
  { name: "Boots", value: 20, color: "oklch(0.65 0.12 160)", revenue: 15200 },
  { name: "Sandals", value: 10, color: "oklch(0.75 0.10 60)", revenue: 7800 },
]

const revenueData = [
  { name: "Week 1", revenue: 12000, profit: 3600, expenses: 8400 },
  { name: "Week 2", revenue: 15000, profit: 4500, expenses: 10500 },
  { name: "Week 3", revenue: 18000, profit: 5400, expenses: 12600 },
  { name: "Week 4", revenue: 22000, profit: 6600, expenses: 15400 },
]

const trafficData = [
  { name: "Mon", visitors: 1200, pageViews: 3400, bounceRate: 45 },
  { name: "Tue", visitors: 1400, pageViews: 3800, bounceRate: 42 },
  { name: "Wed", visitors: 1100, pageViews: 3200, bounceRate: 48 },
  { name: "Thu", visitors: 1600, pageViews: 4200, bounceRate: 38 },
  { name: "Fri", visitors: 1800, pageViews: 4800, bounceRate: 35 },
  { name: "Sat", visitors: 2200, pageViews: 5600, bounceRate: 32 },
  { name: "Sun", visitors: 1900, pageViews: 4900, bounceRate: 36 },
]

const recentOrders = [
  { id: "#12345", customer: "John Doe", amount: 129.99, status: "completed", time: "2 hours ago" },
  { id: "#12346", customer: "Jane Smith", amount: 89.99, status: "processing", time: "4 hours ago" },
  { id: "#12347", customer: "Mike Johnson", amount: 199.99, status: "shipped", time: "6 hours ago" },
  { id: "#12348", customer: "Sarah Wilson", amount: 159.99, status: "pending", time: "8 hours ago" },
  { id: "#12349", customer: "Tom Brown", amount: 79.99, status: "completed", time: "1 day ago" },
]

const topProducts = [
  { name: "Nike Air Max 270", sales: 156, revenue: 18720, trend: "up" },
  { name: "Adidas Ultraboost", sales: 134, revenue: 16080, trend: "up" },
  { name: "Converse Chuck Taylor", sales: 98, revenue: 7840, trend: "down" },
  { name: "Vans Old Skool", sales: 87, revenue: 6960, trend: "up" },
  { name: "New Balance 990", sales: 76, revenue: 11400, trend: "down" },
]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [activeTab, setActiveTab] = useState("overview")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <ParticleBackground particleCount={20} particleColor="oklch(0.45 0.18 250 / 0.15)" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's your store performance overview.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>

            <AnimatedButton
              variant="outline"
              size="icon"
              animation="scale"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </AnimatedButton>

            <AnimatedButton variant="outline" animation="magnetic">
              <Download className="w-4 h-4 mr-2" />
              Export
            </AnimatedButton>

            <AnimatedButton animation="glow" className="bg-gradient-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              View Reports
            </AnimatedButton>
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
                <Activity className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Products</span>
              </TabsTrigger>
              <TabsTrigger value="customers" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Customers</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Total Revenue",
                    value: "$45,231.89",
                    change: "+20.1%",
                    trend: "up",
                    icon: DollarSign,
                    description: "from last month",
                    gradient: "from-green-500 to-emerald-600",
                    bgGradient: "from-green-500/10 to-emerald-600/10",
                  },
                  {
                    title: "Orders",
                    value: "1,234",
                    change: "+15.3%",
                    trend: "up",
                    icon: ShoppingCart,
                    description: "from last month",
                    gradient: "from-blue-500 to-cyan-600",
                    bgGradient: "from-blue-500/10 to-cyan-600/10",
                  },
                  {
                    title: "Customers",
                    value: "2,350",
                    change: "+8.2%",
                    trend: "up",
                    icon: Users,
                    description: "from last month",
                    gradient: "from-purple-500 to-violet-600",
                    bgGradient: "from-purple-500/10 to-violet-600/10",
                  },
                  {
                    title: "Products",
                    value: "456",
                    change: "-2.1%",
                    trend: "down",
                    icon: Package,
                    description: "from last month",
                    gradient: "from-orange-500 to-red-600",
                    bgGradient: "from-orange-500/10 to-red-600/10",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <FloatingCard
                      glowEffect
                      tiltEffect
                      className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm border-border/50`}
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </CardTitle>
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                          <stat.icon className="h-4 w-4 text-white" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-foreground mb-2">{stat.value}</div>
                        <div className="flex items-center text-xs">
                          {stat.trend === "up" ? (
                            <div className="flex items-center text-green-500">
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                              <span className="font-medium">{stat.change}</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-500">
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                              <span className="font-medium">{stat.change}</span>
                            </div>
                          )}
                          <span className="ml-2 text-muted-foreground">{stat.description}</span>
                        </div>
                      </CardContent>

                      {/* Animated background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </FloatingCard>
                  </motion.div>
                ))}
              </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="text-sm text-muted-foreground">{category.name}</span>
                    <span className="text-sm font-medium ml-auto">{category.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{order.id}</span>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "processing"
                                ? "secondary"
                                : order.status === "shipped"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${order.amount}</p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Products</CardTitle>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <p className="font-semibold text-foreground">${product.revenue.toLocaleString()}</p>
                        <div className="flex items-center gap-1">
                          {product.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          )}
                          <span className={`text-xs ${product.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                            {product.trend === "up" ? "+" : "-"}12%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col gap-2">
                <Package className="h-6 w-6" />
                Add Product
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Users className="h-6 w-6" />
                Manage Users
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <ShoppingCart className="h-6 w-6" />
                View Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
