"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Leaf, 
  Recycle, 
  Globe, 
  Heart, 
  Award,
  TreePine,
  Droplets,
  Wind,
  Sun,
  Target,
  Users,
  Factory,
  Truck,
  Package
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingCard } from "@/components/ui/floating-card"
import { ParticleBackground } from "@/components/ui/particle-background"
import { LazyImage } from "@/components/ui/lazy-image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const sustainabilityStats = [
  { icon: TreePine, label: "Trees Planted", value: "10,000+", color: "text-green-500" },
  { icon: Recycle, label: "Materials Recycled", value: "85%", color: "text-blue-500" },
  { icon: Droplets, label: "Water Saved", value: "2M Liters", color: "text-cyan-500" },
  { icon: Wind, label: "Carbon Neutral", value: "Since 2023", color: "text-purple-500" }
]

const initiatives = [
  {
    icon: Leaf,
    title: "Eco-Friendly Materials",
    description: "We use recycled plastics, organic cotton, and sustainable leather alternatives in our products.",
    progress: 85,
    color: "bg-green-500/10 text-green-600"
  },
  {
    icon: Factory,
    title: "Clean Manufacturing",
    description: "Our factories run on 100% renewable energy and follow strict environmental standards.",
    progress: 92,
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    icon: Package,
    title: "Sustainable Packaging",
    description: "All packaging is made from recycled materials and is fully biodegradable.",
    progress: 78,
    color: "bg-purple-500/10 text-purple-600"
  },
  {
    icon: Truck,
    title: "Carbon-Neutral Shipping",
    description: "We offset 100% of shipping emissions through verified carbon credit programs.",
    progress: 100,
    color: "bg-orange-500/10 text-orange-600"
  }
]

const goals = [
  {
    year: "2024",
    title: "100% Renewable Energy",
    description: "All facilities powered by clean energy",
    status: "In Progress",
    progress: 85
  },
  {
    year: "2025",
    title: "Zero Waste to Landfill",
    description: "Complete circular manufacturing process",
    status: "Planned",
    progress: 45
  },
  {
    year: "2026",
    title: "Carbon Negative",
    description: "Remove more CO2 than we produce",
    status: "Planned",
    progress: 20
  },
  {
    year: "2027",
    title: "Ocean Plastic Initiative",
    description: "50% of materials from ocean waste",
    status: "Research",
    progress: 10
  }
]

const certifications = [
  { name: "B Corp Certified", logo: "/certifications/bcorp.svg" },
  { name: "Carbon Neutral", logo: "/certifications/carbon-neutral.svg" },
  { name: "Fair Trade", logo: "/certifications/fair-trade.svg" },
  { name: "GOTS Certified", logo: "/certifications/gots.svg" }
]

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Navigation />
      </div>
      <ParticleBackground />
      
      <main className="relative z-10 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-500/10 via-blue-500/5 to-teal-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <Badge className="bg-green-500/10 text-green-600 border-green-200">
                    <Leaf className="w-3 h-3 mr-1" />
                    Sustainability First
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                    Walking Towards a{" "}
                    <span className="bg-gradient-to-r from-green-500 via-blue-500 to-teal-500 bg-clip-text text-transparent">
                      Greener Future
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Every step we take is a step towards sustainability. Discover how we're 
                    revolutionizing the footwear industry with eco-friendly practices and 
                    innovative materials.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <AnimatedButton 
                    size="lg" 
                    className="bg-gradient-to-r from-green-500 to-teal-500"
                    animation="glow"
                    asChild
                  >
                    <Link href="#initiatives">
                      Our Initiatives
                    </Link>
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="outline" 
                    size="lg"
                    animation="magnetic"
                    asChild
                  >
                    <Link href="/products?filter=sustainable">
                      Shop Sustainable
                    </Link>
                  </AnimatedButton>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <FloatingCard className="overflow-hidden">
                  <LazyImage
                    src="/placeholder.svg"
                    alt="Sustainable footwear manufacturing"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                    priority
                  />
                </FloatingCard>
                
                {/* Floating achievement */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Carbon Neutral</p>
                      <p className="text-sm text-muted-foreground">Since 2023</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {sustainabilityStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-background shadow-lg flex items-center justify-center ${stat.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Initiatives Section */}
        <section id="initiatives" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Initiatives</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive sustainability programs across our entire value chain.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {initiatives.map((initiative, index) => {
                const Icon = initiative.icon
                return (
                  <motion.div
                    key={initiative.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FloatingCard className="h-full p-8">
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-16 h-16 rounded-2xl ${initiative.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                            <p className="text-muted-foreground">{initiative.description}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{initiative.progress}%</span>
                          </div>
                          <Progress value={initiative.progress} className="h-2" />
                        </div>
                      </div>
                    </FloatingCard>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Goals Timeline */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Roadmap</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Ambitious goals for a sustainable future.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-teal-500 to-transparent"></div>
              
              <div className="space-y-12">
                {goals.map((goal, index) => (
                  <motion.div
                    key={goal.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex items-start space-x-6"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {goal.year.slice(-2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Card className="p-6">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold">{goal.title}</h3>
                            <Badge 
                              variant={goal.status === "In Progress" ? "default" : "outline"}
                              className={goal.status === "In Progress" ? "bg-green-500" : ""}
                            >
                              {goal.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{goal.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Certified <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Sustainable</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our commitment to sustainability is verified by leading certification bodies.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <FloatingCard className="p-8 h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-sm">{cert.name}</h3>
                  </FloatingCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-teal-500/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Join Our{" "}
                  <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                    Sustainability Journey
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Every purchase you make supports our mission to create a more sustainable future. 
                  Together, we can make a difference.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-teal-500"
                  animation="glow"
                  asChild
                >
                  <Link href="/products?filter=sustainable">
                    Shop Sustainable Products
                  </Link>
                </AnimatedButton>
                <AnimatedButton 
                  variant="outline" 
                  size="lg"
                  animation="magnetic"
                  asChild
                >
                  <Link href="/blog?category=sustainability">
                    Learn More
                  </Link>
                </AnimatedButton>
              </div>
              
              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-600" />
                  50,000+ eco-conscious customers
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-blue-600" />
                  Carbon neutral since 2023
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
