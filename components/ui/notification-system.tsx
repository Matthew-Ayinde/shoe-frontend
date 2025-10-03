"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bell, 
  X, 
  Check, 
  AlertCircle, 
  Info, 
  ShoppingCart, 
  Package, 
  Heart, 
  Star,
  TrendingUp,
  Zap,
  Gift,
  Clock,
  Eye,
  Settings
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedButton } from "./animated-button"
import { FloatingCard } from "./floating-card"

interface Notification {
  id: string
  type: 'order' | 'inventory' | 'promotion' | 'system' | 'social' | 'wishlist'
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: 'low' | 'medium' | 'high' | 'urgent'
  actionUrl?: string
  actionLabel?: string
  image?: string
  metadata?: Record<string, any>
}

interface NotificationSettings {
  orderUpdates: boolean
  inventoryAlerts: boolean
  promotions: boolean
  socialActivity: boolean
  wishlistUpdates: boolean
  emailNotifications: boolean
  pushNotifications: boolean
  soundEnabled: boolean
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [settings, setSettings] = useState<NotificationSettings>({
    orderUpdates: true,
    inventoryAlerts: true,
    promotions: true,
    socialActivity: false,
    wishlistUpdates: true,
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true
  })

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #12345 has been shipped and is on its way!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      priority: 'high',
      actionUrl: '/orders/12345',
      actionLabel: 'Track Order',
      image: '/nike-air-max-blue-sneaker.jpg'
    },
    {
      id: '2',
      type: 'inventory',
      title: 'Back in Stock',
      message: 'Nike Air Max 270 in your size is now available!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      priority: 'medium',
      actionUrl: '/product/nike-air-max-270',
      actionLabel: 'View Product'
    },
    {
      id: '3',
      type: 'promotion',
      title: 'Flash Sale Alert',
      message: '50% off on selected sneakers - Limited time only!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      read: true,
      priority: 'high',
      actionUrl: '/sale',
      actionLabel: 'Shop Now'
    },
    {
      id: '4',
      type: 'wishlist',
      title: 'Price Drop',
      message: 'Adidas Ultraboost 22 dropped by $30 in your wishlist!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      read: true,
      priority: 'medium',
      actionUrl: '/product/adidas-ultraboost-22',
      actionLabel: 'Buy Now'
    },
    {
      id: '5',
      type: 'social',
      title: 'Review Request',
      message: 'How was your recent purchase? Share your experience!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      priority: 'low',
      actionUrl: '/reviews/write',
      actionLabel: 'Write Review'
    }
  ]

  // Initialize notifications
  useEffect(() => {
    setNotifications(mockNotifications)
  }, [])

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['order', 'inventory', 'promotion', 'wishlist'][Math.floor(Math.random() * 4)] as any,
          title: 'New Update',
          message: 'You have a new notification!',
          timestamp: new Date(),
          read: false,
          priority: 'medium'
        }
        
        setNotifications(prev => [newNotification, ...prev])
        
        // Play sound if enabled
        if (settings.soundEnabled) {
          // In a real app, you'd play an actual sound
          console.log('🔔 Notification sound')
        }
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [settings.soundEnabled])

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order': return Package
      case 'inventory': return TrendingUp
      case 'promotion': return Gift
      case 'social': return Star
      case 'wishlist': return Heart
      default: return Bell
    }
  }

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'order': return 'text-blue-500'
      case 'inventory': return 'text-green-500'
      case 'promotion': return 'text-purple-500'
      case 'social': return 'text-yellow-500'
      case 'wishlist': return 'text-red-500'
      default: return 'text-muted-foreground'
    }
  }

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-blue-500'
      case 'low': return 'bg-gray-500'
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true
    if (activeTab === 'unread') return !notification.read
    return notification.type === activeTab
  })

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <AnimatedButton
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          animation="magnetic"
          className="relative"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </AnimatedButton>

        {/* Notification Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-full mt-2 w-96 z-50"
            >
              <FloatingCard className="bg-background/95 backdrop-blur-xl border-border/50">
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg">Notifications</CardTitle>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                        <Check className="w-4 h-4 mr-1" />
                        Mark all read
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <Separator />

                <CardContent className="p-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="px-4 pt-4">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                        <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
                        <TabsTrigger value="order" className="text-xs">Orders</TabsTrigger>
                        <TabsTrigger value="promotion" className="text-xs">Deals</TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value={activeTab} className="mt-0">
                      <ScrollArea className="h-96">
                        <div className="p-4 space-y-3">
                          {filteredNotifications.length === 0 ? (
                            <div className="text-center py-8">
                              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                              <p className="text-muted-foreground">No notifications</p>
                            </div>
                          ) : (
                            filteredNotifications.map((notification) => {
                              const Icon = getNotificationIcon(notification.type)
                              return (
                                <motion.div
                                  key={notification.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className={`group relative p-3 rounded-lg border transition-all hover:bg-muted/50 cursor-pointer ${
                                    !notification.read ? 'bg-primary/5 border-primary/20' : 'border-border'
                                  }`}
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <div className="flex items-start space-x-3">
                                    <div className={`p-2 rounded-full bg-muted ${getNotificationColor(notification.type)}`}>
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium text-foreground truncate">
                                          {notification.title}
                                        </h4>
                                        <div className="flex items-center space-x-2">
                                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                                          <span className="text-xs text-muted-foreground">
                                            {formatTimeAgo(notification.timestamp)}
                                          </span>
                                        </div>
                                      </div>
                                      
                                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                        {notification.message}
                                      </p>
                                      
                                      {notification.actionLabel && (
                                        <Button variant="outline" size="sm" className="mt-2">
                                          {notification.actionLabel}
                                        </Button>
                                      )}
                                    </div>
                                    
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        deleteNotification(notification.id)
                                      }}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                  
                                  {!notification.read && (
                                    <div className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full" />
                                  )}
                                </motion.div>
                              )
                            })
                          )}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>

                {notifications.length > 0 && (
                  <>
                    <Separator />
                    <div className="p-4 flex justify-between">
                      <Button variant="ghost" size="sm" onClick={clearAll}>
                        Clear All
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        Settings
                      </Button>
                    </div>
                  </>
                )}
              </FloatingCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
