"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Package, Truck, CheckCircle, MapPin } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function OrderTrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [orderData, setOrderData] = useState<any>(null)

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

  const handleTrackOrder = () => {
    if (trackingNumber.trim()) {
      setOrderData(mockTrackingData)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">Track Your Order</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Enter your order number or tracking number to see the latest status of your shipment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Enter Tracking Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="tracking" className="text-sm font-medium text-foreground">
                    Order Number or Tracking Number
                  </label>
                  <Input
                    id="tracking"
                    placeholder="e.g., SF-2024-001234 or 1Z999AA1234567890"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="text-center"
                  />
                </div>
                <Button onClick={handleTrackOrder} className="w-full text-lg py-6" disabled={!trackingNumber.trim()}>
                  <Search className="mr-2 h-5 w-5" />
                  Track Order
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  You can find your order number in your confirmation email or account dashboard
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Order Results */}
      {orderData && (
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Order Summary */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Order {orderData.orderNumber}</CardTitle>
                    <Badge variant="secondary" className="text-sm">
                      {orderData.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tracking Number</p>
                      <p className="font-medium">{orderData.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">{orderData.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                      <p className="font-medium">{orderData.estimatedDelivery}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderData.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="w-16 h-16 bg-background rounded-lg overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Tracking Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {orderData.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <event.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`font-medium ${event.completed ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {event.status}
                            </h4>
                            {event.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {event.date} at {event.time}
                          </p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
