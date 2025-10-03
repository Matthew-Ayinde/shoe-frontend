"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CreditCard, Truck, Shield, Check, MapPin, User, Mail, Phone, Lock, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingCard } from "@/components/ui/floating-card"
import { ParticleBackground } from "@/components/ui/particle-background"
import { PaymentMethods } from "@/components/ui/payment-methods"
import { useCart } from "@/lib/cart-context"

interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const { state: cartState, clearCart } = useCart()
  const cartItems = cartState.items

  const subtotal = cartState.total
  const shipping = subtotal > 75 ? 0 : 9.99 // Free shipping over $75
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handlePaymentSubmit = async (paymentData: any) => {
    setIsProcessingPayment(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Clear cart on successful payment
      clearCart()

      // Move to confirmation step
      setCurrentStep(3)

    } catch (error) {
      console.error('Payment failed:', error)
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const steps = [
    { id: 1, name: "Shipping", completed: currentStep > 1 },
    { id: 2, name: "Payment", completed: currentStep > 2 },
    { id: 3, name: "Review", completed: false },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <ParticleBackground particleCount={25} particleColor="oklch(0.45 0.18 250 / 0.2)" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <AnimatedButton variant="ghost" size="icon" animation="magnetic" asChild>
              <Link href="/cart">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </AnimatedButton>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Secure Checkout
              </h1>
            </div>
          </div>

          {/* Progress Steps */}
          <FloatingCard className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <motion.div
                    className="flex items-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        step.completed
                          ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : currentStep === step.id
                            ? "border-primary text-primary bg-primary/10 shadow-lg shadow-primary/25"
                            : "border-muted-foreground/30 text-muted-foreground bg-muted/20"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {step.completed ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Check className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <span className="font-semibold">{step.id}</span>
                      )}
                    </motion.div>
                    <div className="ml-3">
                      <span
                        className={`text-sm font-medium transition-colors ${
                          currentStep === step.id ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.name}
                      </span>
                      {currentStep === step.id && (
                        <motion.div
                          className="h-0.5 bg-gradient-primary rounded-full mt-1"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div className="relative h-0.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-gradient-primary rounded-full"
                          initial={{ width: "0%" }}
                          animate={{
                            width: step.completed ? "100%" : currentStep > step.id ? "100%" : "0%"
                          }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FloatingCard>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main Street" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                            <SelectItem value="fl">Florida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="10001" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Shipping Method</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="shipping"
                              value="standard"
                              defaultChecked
                              className="text-primary"
                            />
                            <div>
                              <p className="font-medium">Standard Shipping</p>
                              <p className="text-sm text-muted-foreground">5-7 business days</p>
                            </div>
                          </div>
                          <span className="font-semibold text-green-600">Free</span>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <input type="radio" name="shipping" value="express" className="text-primary" />
                            <div>
                              <p className="font-medium">Express Shipping</p>
                              <p className="text-sm text-muted-foreground">2-3 business days</p>
                            </div>
                          </div>
                          <span className="font-semibold">$9.99</span>
                        </div>
                      </div>
                    </div>

                    <Button onClick={() => setCurrentStep(2)} className="w-full">
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <PaymentMethods
                  total={total}
                  onPaymentSubmit={handlePaymentSubmit}
                  isProcessing={isProcessingPayment}
                />

                <div className="mt-6 flex gap-4">
                  <AnimatedButton
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                    animation="scale"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Shipping
                  </AnimatedButton>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order Items */}
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.brand} • Size {item.size} • {item.color}
                            </p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Shipping & Payment Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Shipping Address</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>John Doe</p>
                          <p>123 Main Street</p>
                          <p>New York, NY 10001</p>
                          <p>john.doe@example.com</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Payment Method</h4>
                        <div className="text-sm text-muted-foreground">
                          <p>Credit Card ending in 3456</p>
                          <p>Standard Shipping (Free)</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1 bg-transparent">
                        Back to Payment
                      </Button>
                      <Button className="flex-1">Place Order</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Security Features */}
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Secure SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Free shipping included</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
