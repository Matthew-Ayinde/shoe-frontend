"use client"

import { motion } from "framer-motion"
import { Truck, Clock, Globe, Shield, Package, MapPin } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ShippingPage() {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "5-7 Business Days",
      cost: "$8.99",
      description: "Reliable delivery for most orders",
      icon: Package,
    },
    {
      name: "Expedited Shipping",
      time: "2-3 Business Days",
      cost: "$15.99",
      description: "Faster delivery when you need it sooner",
      icon: Clock,
    },
    {
      name: "Overnight Shipping",
      time: "1 Business Day",
      cost: "$25.99",
      description: "Next-day delivery for urgent orders",
      icon: Truck,
    },
    {
      name: "International Shipping",
      time: "7-14 Business Days",
      cost: "Varies",
      description: "Worldwide delivery to over 50 countries",
      icon: Globe,
    },
  ]

  const internationalCountries = [
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Belgium",
    "Switzerland",
    "Austria",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Australia",
    "New Zealand",
    "Japan",
    "South Korea",
    "Singapore",
    "Hong Kong",
  ]

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
              <Truck className="h-8 w-8 text-primary" />
              <Badge variant="secondary">Shipping Info</Badge>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">Shipping & Delivery</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Fast, reliable shipping options to get your new shoes to you quickly and safely
            </p>
          </motion.div>
        </div>
      </section>

      {/* Free Shipping Banner */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-2"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground">
              Free Standard Shipping on Orders Over $75
            </h2>
            <p className="text-primary-foreground/90">No minimum order required for expedited or overnight shipping</p>
          </motion.div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">Shipping Options</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Choose the delivery speed that works best for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <option.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{option.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary">{option.cost}</div>
                      <div className="text-sm text-muted-foreground">{option.time}</div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{option.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Process */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">How It Works</h2>
            <p className="text-lg text-muted-foreground text-pretty">From order to delivery, here's what to expect</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Order Placed",
                description: "Your order is received and payment is processed securely",
                icon: Package,
              },
              {
                step: "2",
                title: "Processing",
                description: "We carefully pick and pack your items (1-2 business days)",
                icon: Clock,
              },
              {
                step: "3",
                title: "Shipped",
                description: "Your package is handed to our shipping partner with tracking",
                icon: Truck,
              },
              {
                step: "4",
                title: "Delivered",
                description: "Your shoes arrive at your doorstep, ready to wear",
                icon: MapPin,
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Shipping */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-primary" />
                  <Badge variant="secondary">International</Badge>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">Worldwide Delivery</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We ship to over 50 countries worldwide. International shipping costs and delivery times vary by
                  destination. All international orders are fully tracked and insured.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Important Notes:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Customers are responsible for customs duties and taxes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Delivery times may vary due to customs processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Some restrictions may apply to certain countries</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Countries We Ship To</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {internationalCountries.map((country) => (
                      <div key={country} className="text-sm text-muted-foreground py-1">
                        {country}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
                    Don't see your country? Contact us to check if we can ship to your location.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
