"use client"

import { motion } from "framer-motion"
import { RotateCcw, Clock, Shield, CheckCircle, Package, ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ReturnsPage() {
  const returnProcess = [
    {
      step: "1",
      title: "Initiate Return",
      description: "Contact us or use our online return form within 30 days",
      icon: RotateCcw,
    },
    {
      step: "2",
      title: "Get Return Label",
      description: "We'll email you a prepaid return shipping label",
      icon: Package,
    },
    {
      step: "3",
      title: "Pack & Ship",
      description: "Pack items in original packaging and attach the label",
      icon: ArrowLeft,
    },
    {
      step: "4",
      title: "Refund Processed",
      description: "Refund issued within 5-7 business days after we receive your return",
      icon: CheckCircle,
    },
  ]

  const returnReasons = [
    {
      reason: "Wrong Size",
      policy: "Free exchange or return",
      timeframe: "30 days",
      icon: Shield,
    },
    {
      reason: "Defective Item",
      policy: "Free return & full refund",
      timeframe: "1 year warranty",
      icon: Shield,
    },
    {
      reason: "Changed Mind",
      policy: "$5.99 return shipping fee",
      timeframe: "30 days",
      icon: Clock,
    },
    {
      reason: "Wrong Item Sent",
      policy: "Free return & exchange",
      timeframe: "30 days",
      icon: Shield,
    },
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
              <RotateCcw className="h-8 w-8 text-primary" />
              <Badge variant="secondary">Returns & Exchanges</Badge>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">Easy Returns & Exchanges</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Not completely satisfied? We offer hassle-free returns and exchanges within 30 days
            </p>
          </motion.div>
        </div>
      </section>

      {/* 30-Day Policy Banner */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-2"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground">30-Day Return Policy</h2>
            <p className="text-primary-foreground/90">
              Free returns on defective items and wrong sizes. Easy online return process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">How to Return</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Simple steps to return or exchange your purchase
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {returnProcess.map((step, index) => (
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" className="text-lg px-8">
              Start a Return
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Return Policies by Reason */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">Return Policies</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Different return reasons have different policies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {returnReasons.map((item, index) => (
              <motion.div
                key={item.reason}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h3 className="text-lg font-semibold text-foreground">{item.reason}</h3>
                        <p className="text-muted-foreground">{item.policy}</p>
                        <Badge variant="secondary" className="text-xs">
                          {item.timeframe}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">Important Information</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Please read these important details about our return policy
              </p>
            </div>

            <div className="space-y-6">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Return Condition:</strong> Items must be unworn, in original packaging, and include all tags
                  and accessories. Shoes should show no signs of wear on the soles.
                </AlertDescription>
              </Alert>

              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  <strong>Timeframe:</strong> Returns must be initiated within 30 days of delivery. Late returns may not
                  be accepted.
                </AlertDescription>
              </Alert>

              <Alert>
                <Package className="h-4 w-4" />
                <AlertDescription>
                  <strong>Original Packaging:</strong> Please return items in their original shoe boxes when possible.
                  This helps us process your return faster.
                </AlertDescription>
              </Alert>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Refund Method:</strong> Refunds will be issued to the original payment method. Credit card
                  refunds may take 3-5 business days to appear on your statement.
                </AlertDescription>
              </Alert>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Our customer service team is here to help with any questions about returns or exchanges.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline">Contact Support</Button>
                  <Button variant="outline">Live Chat</Button>
                  <Button variant="outline">Call: (555) 123-4567</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
