"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingCart,
  Package,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  RefreshCw,
  Bell,
  Calendar,
  TrendingUp,
  Zap,
  Target,
  Activity,
  Sparkles,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  Phone,
  Mail
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingCard } from "@/components/ui/floating-card"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const todayStats = [
  {
    title: "Orders to Process",
    value: 12,
    icon: ShoppingCart,
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-500/10 to-cyan-600/10",
    change: "+3 from yesterday"
  },
  {
    title: "Low Stock Items",
    value: 8,
    icon: Package,
    color: "text-yellow-500",
    gradient: "from-yellow-500 to-orange-600",
    bgGradient: "from-yellow-500/10 to-orange-600/10",
    change: "+2 new alerts"
  },
  {
    title: "Customer Inquiries",
    value: 5,
    icon: Users,
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-500/10 to-emerald-600/10",
    change: "-1 from yesterday"
  },
  {
    title: "Pending Tasks",
    value: 3,
    icon: Clock,
    color: "text-purple-500",
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-500/10 to-violet-600/10",
    change: "2 due today"
  },
]

const recentOrders = [
  { id: "ORD-001", customer: "John Doe", status: "processing", total: 129.99, time: "10 min ago", priority: "high" },
  { id: "ORD-002", customer: "Jane Smith", status: "pending", total: 89.99, time: "25 min ago", priority: "normal" },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    status: "processing",
    total: 199.99,
    time: "1 hour ago",
    priority: "normal",
  },
  { id: "ORD-004", customer: "Sarah Wilson", status: "pending", total: 159.99, time: "2 hours ago", priority: "low" },
]

const tasks = [
  { id: 1, title: "Update inventory for Nike Air Max", status: "pending", priority: "high", dueDate: "Today" },
  { id: 2, title: "Process return for Order #12345", status: "in-progress", priority: "normal", dueDate: "Tomorrow" },
  { id: 3, title: "Contact supplier for restocking", status: "pending", priority: "low", dueDate: "This week" },
  { id: 4, title: "Update product descriptions", status: "completed", priority: "normal", dueDate: "Yesterday" },
]

const lowStockItems = [
  { name: "Nike Air Max 270", currentStock: 3, minStock: 10, category: "Sneakers" },
  { name: "Adidas Ultraboost", currentStock: 5, minStock: 15, category: "Running" },
  { name: "Converse Chuck Taylor", currentStock: 2, minStock: 8, category: "Casual" },
  { name: "Vans Old Skool", currentStock: 4, minStock: 12, category: "Skateboarding" },
]

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "default"
      case "processing":
      case "in-progress":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "normal":
        return "text-blue-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <ParticleBackground particleCount={20} particleColor="oklch(0.55 0.15 280 / 0.15)" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-primary/3" />
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
              <div className="w-12 h-12 bg-gradient-accent rounded-2xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Staff Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's what needs your attention today.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-lg font-semibold text-foreground">{new Date().toLocaleDateString()}</p>
            </div>

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
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </AnimatedButton>

            <AnimatedButton animation="glow" className="bg-gradient-accent">
              <Sparkles className="w-4 h-4 mr-2" />
              Quick Actions
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
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Inventory</span>
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Tasks</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 mt-8">

              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {todayStats.map((stat, index) => (
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
                        <p className="text-xs text-muted-foreground">{stat.change}</p>
                      </CardContent>

                      {/* Animated background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </FloatingCard>
                  </motion.div>
                ))}
              </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
                        <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            order.priority === "high"
                              ? "bg-red-500"
                              : order.priority === "normal"
                                ? "bg-blue-500"
                                : "bg-green-500"
                          }`}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${order.total}</p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Tasks</CardTitle>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                    <div className="flex-shrink-0">
                      {task.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : task.priority === "high" ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p
                        className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(task.status)} className="text-xs">
                          {task.status}
                        </Badge>
                        <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground">• {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Low Stock Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                Low Stock Alert
              </CardTitle>
              <p className="text-sm text-muted-foreground">Items that need restocking</p>
            </div>
            <Button variant="outline">Request Restock</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Min Stock</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-red-500">{item.currentStock}</span>
                    </TableCell>
                    <TableCell>{item.minStock}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={(item.currentStock / item.minStock) * 100} className="w-20 h-2" />
                        <span className="text-xs text-red-500">
                          {Math.round((item.currentStock / item.minStock) * 100)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col gap-2">
                <ShoppingCart className="h-6 w-6" />
                Process Orders
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Package className="h-6 w-6" />
                Update Inventory
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Users className="h-6 w-6" />
                Customer Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
