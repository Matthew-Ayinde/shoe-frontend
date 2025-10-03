"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye,
  Users,
  ShoppingCart,
  Zap,
  Target,
  Activity
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { FloatingCard } from "./floating-card"

interface InventoryItem {
  id: string
  name: string
  sku: string
  currentStock: number
  maxStock: number
  minStock: number
  reserved: number
  available: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued'
  lastUpdated: Date
  trend: 'up' | 'down' | 'stable'
  viewersCount: number
  cartCount: number
  salesVelocity: number // items per hour
  restockDate?: Date
  supplier: string
  category: string
  price: number
}

interface InventoryTrackerProps {
  productId?: string
  showGlobalStats?: boolean
  compact?: boolean
}

export function InventoryTracker({ 
  productId, 
  showGlobalStats = false, 
  compact = false 
}: InventoryTrackerProps) {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Mock inventory data
  const mockInventoryData: InventoryItem[] = [
    {
      id: '1',
      name: 'Nike Air Max 270',
      sku: 'NAM-270-BLK-10',
      currentStock: 15,
      maxStock: 100,
      minStock: 10,
      reserved: 3,
      available: 12,
      status: 'low-stock',
      lastUpdated: new Date(),
      trend: 'down',
      viewersCount: 23,
      cartCount: 5,
      salesVelocity: 2.5,
      restockDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days
      supplier: 'Nike Inc.',
      category: 'Sneakers',
      price: 150
    },
    {
      id: '2',
      name: 'Adidas Ultraboost 22',
      sku: 'AUB-22-WHT-9',
      currentStock: 45,
      maxStock: 80,
      minStock: 15,
      reserved: 8,
      available: 37,
      status: 'in-stock',
      lastUpdated: new Date(),
      trend: 'stable',
      viewersCount: 18,
      cartCount: 3,
      salesVelocity: 1.8,
      supplier: 'Adidas AG',
      category: 'Running',
      price: 180
    },
    {
      id: '3',
      name: 'Converse Chuck Taylor',
      sku: 'CCT-ALL-RED-8',
      currentStock: 0,
      maxStock: 60,
      minStock: 5,
      reserved: 0,
      available: 0,
      status: 'out-of-stock',
      lastUpdated: new Date(),
      trend: 'down',
      viewersCount: 12,
      cartCount: 0,
      salesVelocity: 0,
      restockDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      supplier: 'Converse Inc.',
      category: 'Casual',
      price: 65
    }
  ]

  // Initialize data
  useEffect(() => {
    setTimeout(() => {
      setInventoryData(mockInventoryData)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setInventoryData(prev => prev.map(item => {
        // Simulate stock changes
        const stockChange = Math.floor(Math.random() * 5) - 2 // -2 to +2
        const viewerChange = Math.floor(Math.random() * 10) - 5 // -5 to +5
        const cartChange = Math.floor(Math.random() * 3) - 1 // -1 to +1

        const newStock = Math.max(0, Math.min(item.maxStock, item.currentStock + stockChange))
        const newViewers = Math.max(0, item.viewersCount + viewerChange)
        const newCartCount = Math.max(0, item.cartCount + cartChange)

        // Update status based on stock levels
        let newStatus: InventoryItem['status'] = 'in-stock'
        if (newStock === 0) newStatus = 'out-of-stock'
        else if (newStock <= item.minStock) newStatus = 'low-stock'

        // Update trend
        let newTrend: InventoryItem['trend'] = 'stable'
        if (stockChange > 0) newTrend = 'up'
        else if (stockChange < 0) newTrend = 'down'

        return {
          ...item,
          currentStock: newStock,
          available: Math.max(0, newStock - item.reserved),
          status: newStatus,
          trend: newTrend,
          viewersCount: newViewers,
          cartCount: newCartCount,
          lastUpdated: new Date()
        }
      }))
      
      setLastUpdate(new Date())
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in-stock': return 'text-green-500 bg-green-500/10'
      case 'low-stock': return 'text-yellow-500 bg-yellow-500/10'
      case 'out-of-stock': return 'text-red-500 bg-red-500/10'
      case 'discontinued': return 'text-gray-500 bg-gray-500/10'
    }
  }

  const getStatusIcon = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in-stock': return CheckCircle
      case 'low-stock': return AlertTriangle
      case 'out-of-stock': return Package
      case 'discontinued': return Clock
    }
  }

  const getTrendIcon = (trend: InventoryItem['trend']) => {
    switch (trend) {
      case 'up': return TrendingUp
      case 'down': return TrendingDown
      case 'stable': return Activity
    }
  }

  const getTrendColor = (trend: InventoryItem['trend']) => {
    switch (trend) {
      case 'up': return 'text-green-500'
      case 'down': return 'text-red-500'
      case 'stable': return 'text-blue-500'
    }
  }

  const getStockPercentage = (item: InventoryItem) => {
    return (item.currentStock / item.maxStock) * 100
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)
    
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  if (isLoading) {
    return (
      <FloatingCard className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/3" />
          <div className="h-8 bg-muted rounded" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
      </FloatingCard>
    )
  }

  const filteredData = productId 
    ? inventoryData.filter(item => item.id === productId)
    : inventoryData

  if (compact && filteredData.length === 1) {
    const item = filteredData[0]
    const StatusIcon = getStatusIcon(item.status)
    const TrendIcon = getTrendIcon(item.trend)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <StatusIcon className={`w-4 h-4 ${getStatusColor(item.status).split(' ')[0]}`} />
            <span className="text-sm font-medium">Stock Status</span>
          </div>
          <Badge className={getStatusColor(item.status)}>
            {item.status.replace('-', ' ')}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Available</span>
            <span className="font-medium">{item.available} units</span>
          </div>
          <Progress value={getStockPercentage(item)} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{item.currentStock}/{item.maxStock}</span>
            <span>Min: {item.minStock}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">{item.viewersCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ShoppingCart className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">{item.cartCount}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <TrendIcon className={`w-3 h-3 ${getTrendColor(item.trend)}`} />
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(item.lastUpdated)}
            </span>
          </div>
        </div>

        {item.status === 'out-of-stock' && item.restockDate && (
          <div className="p-2 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">
                Expected restock: {item.restockDate.toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      {showGlobalStats && (
        <FloatingCard>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Real-time Inventory</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {inventoryData.filter(i => i.status === 'in-stock').length}
                </div>
                <div className="text-sm text-muted-foreground">In Stock</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">
                  {inventoryData.filter(i => i.status === 'low-stock').length}
                </div>
                <div className="text-sm text-muted-foreground">Low Stock</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {inventoryData.filter(i => i.status === 'out-of-stock').length}
                </div>
                <div className="text-sm text-muted-foreground">Out of Stock</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {inventoryData.reduce((sum, item) => sum + item.viewersCount, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Active Viewers</div>
              </div>
            </div>
          </CardContent>
        </FloatingCard>
      )}

      <div className="grid gap-4">
        {filteredData.map((item) => {
          const StatusIcon = getStatusIcon(item.status)
          const TrendIcon = getTrendIcon(item.trend)

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              layout
            >
              <FloatingCard>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className={`w-5 h-5 ${getStatusColor(item.status).split(' ')[0]}`} />
                      <div>
                        <h3 className="font-medium text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.replace('-', ' ')}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Stock Level</span>
                        <span className="font-medium">{item.currentStock}/{item.maxStock}</span>
                      </div>
                      <Progress value={getStockPercentage(item)} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Available</div>
                        <div className="font-medium">{item.available}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Reserved</div>
                        <div className="font-medium">{item.reserved}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Min Stock</div>
                        <div className="font-medium">{item.minStock}</div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span>{item.viewersCount} viewing</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                          <span>{item.cartCount} in cart</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-4 h-4 text-muted-foreground" />
                          <span>{item.salesVelocity}/hr</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendIcon className={`w-4 h-4 ${getTrendColor(item.trend)}`} />
                        <span className="text-muted-foreground">
                          {formatTimeAgo(item.lastUpdated)}
                        </span>
                      </div>
                    </div>

                    {item.restockDate && (
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>Restock expected</span>
                          </div>
                          <span className="font-medium">
                            {item.restockDate.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </FloatingCard>
            </motion.div>
          )
        })}
      </div>

      <div className="text-center text-xs text-muted-foreground">
        Last updated: {lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  )
}
