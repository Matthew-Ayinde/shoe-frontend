"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Award, Users, Globe, Heart, Truck, Shield } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight text-balance">Our Story</h1>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  Founded in 2010, StepForward has been dedicated to bringing you the finest footwear from around the
                  world. We believe that the right pair of shoes can transform not just your outfit, but your entire
                  day.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src="/brown-leather-oxford-dress-shoe.jpg" alt="About Us" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">Our Values</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Everything we do is guided by our core values and commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Quality First",
                description:
                  "We source only the finest materials and work with trusted manufacturers to ensure every pair meets our high standards.",
              },
              {
                icon: Users,
                title: "Customer Focused",
                description:
                  "Your satisfaction is our priority. We're here to help you find the perfect fit and provide exceptional service.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description:
                  "From local artisans to international brands, we bring you the best footwear from around the world.",
              },
              {
                icon: Heart,
                title: "Passion Driven",
                description:
                  "We're passionate about shoes and it shows in everything we do, from curation to customer service.",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description:
                  "Quick and reliable shipping to get your new shoes to you as fast as possible, anywhere you are.",
              },
              {
                icon: Shield,
                title: "Trust & Security",
                description: "Shop with confidence knowing your data is secure and your purchases are protected.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "200+", label: "Shoe Styles" },
              { number: "15+", label: "Premium Brands" },
              { number: "4.8", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-2"
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
