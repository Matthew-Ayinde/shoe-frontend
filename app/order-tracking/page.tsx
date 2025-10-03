"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Package, Sparkles } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingCard } from "@/components/ui/floating-card"
import { ParticleBackground } from "@/components/ui/particle-background"
import { OrderTracker } from "@/components/ui/order-tracker"

export default function OrderTrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [orderData, setOrderData] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)

  // Mock tracking data
  const mockTrackingData = {
    orderNumber: "SF-2024-001234",
    status: "In Transit",
    estimatedDelivery: "March 15, 2024",
    trackingNumber: "1Z999AA1234567890",
    items: [
      {
        name: "Nike Air Max 270",
        size: "US 9",
        color: "Blue/White",
        quantity: 1,
        image: "/nike-air-max-blue-sneaker.jpg",
      },
    ],
    timeline: [
      {
        status: "Order Placed",
        date: "March 10, 2024",
        time: "2:30 PM",
        completed: true,
        icon: Package,
        description: "Your order has been received and payment confirmed",
      },
      {
        status: "Processing",
        date: "March 11, 2024",
        time: "10:15 AM",
        completed: true,
        icon: Package,
        description: "Your items are being picked and packed",
      },
      {
        status: "Shipped",
        date: "March 12, 2024",
        time: "4:45 PM",
        completed: true,
        icon: Truck,
        description: "Your package is on its way",
      },
      {
        status: "In Transit",
        date: "March 13, 2024",
        time: "8:20 AM",
        completed: true,
        icon: Truck,
        description: "Package is in transit to your location",
      },
      {
        status: "Out for Delivery",
        date: "March 15, 2024",
        time: "Expected",
        completed: false,
        icon: MapPin,
        description: "Package will be delivered today",
      },
      {
        status: "Delivered",
        date: "March 15, 2024",
        time: "Expected",
        completed: false,
        icon: CheckCircle,
        description: "Package delivered to your address",
      },
    ],
  }

  const handleTrackOrder = async () => {
    if (trackingNumber.trim()) {
      setIsSearching(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setOrderData(mockTrackingData)
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <ParticleBackground particleCount={25} particleColor="oklch(0.45 0.18 250 / 0.1)" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-accent/2" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Track Your Order
              </h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get real-time updates on your order status and delivery progress
          </p>
        </motion.div>

        {/* Enhanced Tracking Form */}
        {!orderData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <FloatingCard glowEffect tiltEffect className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Enter Tracking Information</CardTitle>
                <p className="text-muted-foreground">
                  Track your order with real-time updates and live delivery tracking
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="tracking" className="text-sm font-medium text-foreground">
                    Order Number or Tracking Number
                  </label>
                  <Input
                    id="tracking"
                    placeholder="e.g., ORD-12345 or TRK-789456123"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="text-center text-lg py-3"
                    onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                  />
                </div>

                <AnimatedButton
                  onClick={handleTrackOrder}
                  className="w-full text-lg py-6 bg-gradient-primary"
                  disabled={!trackingNumber.trim() || isSearching}
                  animation="glow"
                >
                  {isSearching ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Search className="w-5 h-5" />
                      <span>Track Order</span>
                    </div>
                  )}
                </AnimatedButton>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    You can find your order number in your confirmation email
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                    <span>✓ Real-time updates</span>
                    <span>✓ Live tracking</span>
                    <span>✓ Delivery notifications</span>
                  </div>
                </div>
              </CardContent>
            </FloatingCard>
          </motion.div>
        )}

        {/* Enhanced Order Results */}
        {orderData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <OrderTracker orderId="ORD-12345" showMap={true} />
          </motion.div>
        )}

      </div>

      <Footer />
    </div>
  )
}
