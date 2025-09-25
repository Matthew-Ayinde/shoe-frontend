"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ShoppingCart, Package, Users, Clock, CheckCircle, AlertCircle, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const todayStats = [
  { title: "Orders to Process", value: 12, icon: ShoppingCart, color: "text-blue-500" },
  { title: "Low Stock Items", value: 8, icon: Package, color: "text-yellow-500" },
  { title: "Customer Inquiries", value: 5, icon: Users, color: "text-green-500" },
  { title: "Pending Tasks", value: 3, icon: Clock, color: "text-purple-500" },
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what needs your attention today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today</p>
          <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {todayStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>
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
    </div>
  )
}
