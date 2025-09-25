"use client"

import { motion } from "framer-motion"
import { Ruler, Info } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SizeGuidePage() {
  const mensSizes = [
    { us: "7", uk: "6", eu: "40", cm: "25.0" },
    { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.4" },
    { us: "8", uk: "7", eu: "41", cm: "25.8" },
    { us: "8.5", uk: "7.5", eu: "42", cm: "26.2" },
    { us: "9", uk: "8", eu: "42.5", cm: "26.7" },
    { us: "9.5", uk: "8.5", eu: "43", cm: "27.1" },
    { us: "10", uk: "9", eu: "44", cm: "27.5" },
    { us: "10.5", uk: "9.5", eu: "44.5", cm: "27.9" },
    { us: "11", uk: "10", eu: "45", cm: "28.3" },
    { us: "11.5", uk: "10.5", eu: "45.5", cm: "28.8" },
    { us: "12", uk: "11", eu: "46", cm: "29.2" },
  ]

  const womensSizes = [
    { us: "5", uk: "2.5", eu: "35", cm: "22.0" },
    { us: "5.5", uk: "3", eu: "35.5", cm: "22.4" },
    { us: "6", uk: "3.5", eu: "36", cm: "22.9" },
    { us: "6.5", uk: "4", eu: "37", cm: "23.3" },
    { us: "7", uk: "4.5", eu: "37.5", cm: "23.8" },
    { us: "7.5", uk: "5", eu: "38", cm: "24.2" },
    { us: "8", uk: "5.5", eu: "38.5", cm: "24.6" },
    { us: "8.5", uk: "6", eu: "39", cm: "25.1" },
    { us: "9", uk: "6.5", eu: "40", cm: "25.5" },
    { us: "9.5", uk: "7", eu: "40.5", cm: "25.9" },
    { us: "10", uk: "7.5", eu: "41", cm: "26.4" },
  ]

  const kidsSizes = [
    { us: "10C", uk: "9.5", eu: "27", cm: "16.5" },
    { us: "10.5C", uk: "10", eu: "27.5", cm: "17.0" },
    { us: "11C", uk: "10.5", eu: "28", cm: "17.5" },
    { us: "11.5C", uk: "11", eu: "29", cm: "18.0" },
    { us: "12C", uk: "11.5", eu: "30", cm: "18.5" },
    { us: "12.5C", uk: "12", eu: "30.5", cm: "19.0" },
    { us: "13C", uk: "12.5", eu: "31", cm: "19.5" },
    { us: "13.5C", uk: "13", eu: "32", cm: "20.0" },
    { us: "1Y", uk: "13.5", eu: "32.5", cm: "20.5" },
    { us: "1.5Y", uk: "1", eu: "33", cm: "21.0" },
    { us: "2Y", uk: "1.5", eu: "34", cm: "21.5" },
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
              <Ruler className="h-8 w-8 text-primary" />
              <Badge variant="secondary">Size Guide</Badge>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">Find Your Perfect Fit</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Use our comprehensive size guide to find the perfect fit for every style and brand
            </p>
          </motion.div>
        </div>
      </section>

      {/* How to Measure */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">How to Measure Your Feet</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Follow these simple steps for the most accurate measurement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                step: "1",
                title: "Prepare",
                description: "Stand on a piece of paper wearing the socks you'll wear with your shoes",
              },
              {
                step: "2",
                title: "Trace",
                description: "Trace around your foot with a pencil, keeping it perpendicular to the paper",
              },
              {
                step: "3",
                title: "Measure",
                description: "Measure the longest distance from heel to toe using a ruler",
              },
              {
                step: "4",
                title: "Compare",
                description: "Use the measurement to find your size in our charts below",
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center border-0 shadow-lg h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-primary-foreground font-bold">{step.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Alert className="mb-12">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Pro Tip:</strong> Measure both feet and use the larger measurement. Feet are typically slightly
              different sizes, and it's better to have a shoe that's slightly loose than too tight.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Size Charts */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Men's Sizes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Men's Size Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">US</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">UK</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">EU</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Length (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mensSizes.map((size, index) => (
                          <tr key={size.us} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                            <td className="py-3 px-4 text-foreground">{size.us}</td>
                            <td className="py-3 px-4 text-foreground">{size.uk}</td>
                            <td className="py-3 px-4 text-foreground">{size.eu}</td>
                            <td className="py-3 px-4 text-foreground">{size.cm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Women's Sizes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Women's Size Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">US</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">UK</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">EU</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Length (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {womensSizes.map((size, index) => (
                          <tr key={size.us} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                            <td className="py-3 px-4 text-foreground">{size.us}</td>
                            <td className="py-3 px-4 text-foreground">{size.uk}</td>
                            <td className="py-3 px-4 text-foreground">{size.eu}</td>
                            <td className="py-3 px-4 text-foreground">{size.cm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Kids' Sizes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Kids' Size Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold text-foreground">US</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">UK</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">EU</th>
                          <th className="text-left py-3 px-4 font-semibold text-foreground">Length (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kidsSizes.map((size, index) => (
                          <tr key={size.us} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                            <td className="py-3 px-4 text-foreground">{size.us}</td>
                            <td className="py-3 px-4 text-foreground">{size.uk}</td>
                            <td className="py-3 px-4 text-foreground">{size.eu}</td>
                            <td className="py-3 px-4 text-foreground">{size.cm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
