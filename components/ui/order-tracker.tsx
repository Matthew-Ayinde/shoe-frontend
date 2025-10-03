"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Calendar,
  User,
  Phone,
  Navigation,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  MessageCircle,
  Star,
  Camera
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedButton } from "./animated-button"
import { FloatingCard } from "./floating-card"

interface OrderStatus {
  id: string
  status: 'confirmed' | 'processing' | 'shipped' | 'out-for-delivery' | 'delivered' | 'cancelled'
  timestamp: Date
  location?: string
  description: string
  isActive: boolean
  isCompleted: boolean
}

interface DeliveryAgent {
  id: string
  name: string
  avatar: string
  phone: string
  rating: number
  vehicleType: string
  vehicleNumber: string
}

interface OrderTrackingData {
  orderId: string
  trackingNumber: string
  estimatedDelivery: Date
  currentStatus: OrderStatus['status']
  statusHistory: OrderStatus[]
  deliveryAgent?: DeliveryAgent
  currentLocation: {
    lat: number
    lng: number
    address: string
  }
  deliveryAddress: {
    name: string
    address: string
    phone: string
  }
  items: Array<{
    id: string
    name: string
    image: string
    quantity: number
    price: number
  }>
  lastUpdate: Date
}

interface OrderTrackerProps {
  orderId: string
  showMap?: boolean
  compact?: boolean
}

export function OrderTracker({ orderId, showMap = true, compact = false }: OrderTrackerProps) {
  const [orderData, setOrderData] = useState<OrderTrackingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [liveTracking, setLiveTracking] = useState(false)

  // Mock order data
  const mockOrderData: OrderTrackingData = {
    orderId: 'ORD-12345',
    trackingNumber: 'TRK-789456123',
    estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    currentStatus: 'out-for-delivery',
    statusHistory: [
      {
        id: '1',
        status: 'confirmed',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        description: 'Order confirmed and payment processed',
        isActive: false,
        isCompleted: true
      },
      {
        id: '2',
        status: 'processing',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        description: 'Order is being prepared for shipment',
        isActive: false,
        isCompleted: true
      },
      {
        id: '3',
        status: 'shipped',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        location: 'Distribution Center, New York',
        description: 'Package shipped from our warehouse',
        isActive: false,
        isCompleted: true
      },
      {
        id: '4',
        status: 'out-for-delivery',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        location: 'Local Delivery Hub, Brooklyn',
        description: 'Out for delivery - arriving today',
        isActive: true,
        isCompleted: false
      }
    ],
    deliveryAgent: {
      id: 'agent-1',
      name: 'Mike Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
      vehicleType: 'Van',
      vehicleNumber: 'DEL-2024'
    },
    currentLocation: {
      lat: 40.6782,
      lng: -73.9442,
      address: '5th Avenue, Brooklyn, NY'
    },
    deliveryAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B, Brooklyn, NY 11201',
      phone: '+1 (555) 987-6543'
    },
    items: [
      {
        id: '1',
        name: 'Nike Air Max 270',
        image: '/nike-air-max-blue-sneaker.jpg',
        quantity: 1,
        price: 150
      }
    ],
    lastUpdate: new Date()
  }

  // Initialize data
  useEffect(() => {
    setTimeout(() => {
      setOrderData(mockOrderData)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    if (!liveTracking || !orderData) return

    const interval = setInterval(() => {
      setOrderData(prev => {
        if (!prev) return prev
        
        // Simulate location updates
        const newLat = prev.currentLocation.lat + (Math.random() - 0.5) * 0.001
        const newLng = prev.currentLocation.lng + (Math.random() - 0.5) * 0.001
        
        return {
          ...prev,
          currentLocation: {
            ...prev.currentLocation,
            lat: newLat,
            lng: newLng
          },
          lastUpdate: new Date()
        }
      })
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [liveTracking, orderData])

  const refreshTracking = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setOrderData(prev => prev ? { ...prev, lastUpdate: new Date() } : null)
    setIsRefreshing(false)
  }

  const getStatusIcon = (status: OrderStatus['status']) => {
    switch (status) {
      case 'confirmed': return CheckCircle
      case 'processing': return Package
      case 'shipped': return Truck
      case 'out-for-delivery': return Navigation
      case 'delivered': return CheckCircle
      case 'cancelled': return AlertCircle
    }
  }

  const getStatusColor = (status: OrderStatus['status']) => {
    switch (status) {
      case 'confirmed': return 'text-blue-500 bg-blue-500/10'
      case 'processing': return 'text-yellow-500 bg-yellow-500/10'
      case 'shipped': return 'text-purple-500 bg-purple-500/10'
      case 'out-for-delivery': return 'text-orange-500 bg-orange-500/10'
      case 'delivered': return 'text-green-500 bg-green-500/10'
      case 'cancelled': return 'text-red-500 bg-red-500/10'
    }
  }

  const getProgressPercentage = () => {
    if (!orderData) return 0
    const totalSteps = 4 // confirmed, processing, shipped, delivered
    const completedSteps = orderData.statusHistory.filter(s => s.isCompleted).length
    return (completedSteps / totalSteps) * 100
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor(diff / (1000 * 60))
    
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  if (isLoading) {
    return (
      <FloatingCard className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="h-4 bg-muted rounded" />
          <div className="h-20 bg-muted rounded" />
        </div>
      </FloatingCard>
    )
  }

  if (!orderData) {
    return (
      <FloatingCard className="p-6 text-center">
        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Order Not Found</h3>
        <p className="text-muted-foreground">We couldn't find an order with ID: {orderId}</p>
      </FloatingCard>
    )
  }

  const currentStatusData = orderData.statusHistory.find(s => s.isActive) || 
                           orderData.statusHistory[orderData.statusHistory.length - 1]
  const StatusIcon = getStatusIcon(orderData.currentStatus)

  return (
    <div className="space-y-6">
      {/* Header */}
      <FloatingCard>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <StatusIcon className={`w-6 h-6 ${getStatusColor(orderData.currentStatus).split(' ')[0]}`} />
                <span>Order #{orderData.orderId}</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Tracking: {orderData.trackingNumber}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(orderData.currentStatus)}>
                {orderData.currentStatus.replace('-', ' ')}
              </Badge>
              <AnimatedButton
                variant="outline"
                size="icon"
                onClick={refreshTracking}
                disabled={isRefreshing}
                animation="scale"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </AnimatedButton>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{Math.round(getProgressPercentage())}% Complete</span>
              </div>
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>

            {/* Estimated Delivery */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Estimated Delivery</span>
              </div>
              <span className="text-sm font-medium">
                {orderData.estimatedDelivery.toLocaleDateString()} by 8 PM
              </span>
            </div>

            {/* Current Status */}
            <div className="p-3 border border-primary/20 bg-primary/5 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{currentStatusData.description}</h4>
                  {currentStatusData.location && (
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {currentStatusData.location}
                    </p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(currentStatusData.timestamp)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </FloatingCard>

      {/* Delivery Agent */}
      {orderData.deliveryAgent && (
        <FloatingCard>
          <CardHeader>
            <CardTitle className="text-lg">Your Delivery Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={orderData.deliveryAgent.avatar} alt={orderData.deliveryAgent.name} />
                <AvatarFallback>{orderData.deliveryAgent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{orderData.deliveryAgent.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{orderData.deliveryAgent.rating}</span>
                  <span>•</span>
                  <span>{orderData.deliveryAgent.vehicleType} {orderData.deliveryAgent.vehicleNumber}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <AnimatedButton variant="outline" size="icon" animation="scale">
                  <Phone className="w-4 h-4" />
                </AnimatedButton>
                <AnimatedButton variant="outline" size="icon" animation="scale">
                  <MessageCircle className="w-4 h-4" />
                </AnimatedButton>
              </div>
            </div>
          </CardContent>
        </FloatingCard>
      )}

      {/* Status Timeline */}
      <FloatingCard>
        <CardHeader>
          <CardTitle className="text-lg">Tracking History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderData.statusHistory.map((status, index) => {
              const Icon = getStatusIcon(status.status)
              const isLast = index === orderData.statusHistory.length - 1
              
              return (
                <motion.div
                  key={status.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`relative z-10 p-2 rounded-full ${
                      status.isCompleted ? 'bg-green-500' : 
                      status.isActive ? 'bg-primary' : 'bg-muted'
                    }`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground">{status.description}</h4>
                      {status.location && (
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {status.location}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {status.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {!isLast && (
                    <div className="absolute left-6 top-10 w-0.5 h-8 bg-border" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </FloatingCard>

      {/* Order Items */}
      <FloatingCard>
        <CardHeader>
          <CardTitle className="text-lg">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
                <span className="font-medium">${item.price}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </FloatingCard>

      {/* Live Tracking Toggle */}
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
        <div>
          <h4 className="font-medium text-foreground">Live Tracking</h4>
          <p className="text-sm text-muted-foreground">Get real-time location updates</p>
        </div>
        <AnimatedButton
          variant={liveTracking ? "default" : "outline"}
          onClick={() => setLiveTracking(!liveTracking)}
          animation="scale"
        >
          {liveTracking ? 'Disable' : 'Enable'} Live Tracking
        </AnimatedButton>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        Last updated: {orderData.lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  )
}
