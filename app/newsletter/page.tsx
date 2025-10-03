"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Mail, 
  Gift, 
  Star, 
  Zap, 
  TrendingUp,
  Users,
  Bell,
  CheckCircle,
  Sparkles,
  Crown,
  Heart,
  Tag
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingCard } from "@/components/ui/floating-card"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "react-toastify"

const benefits = [
  {
    icon: Gift,
    title: "Exclusive Discounts",
    description: "Get 15% off your first order and access to member-only sales",
    color: "bg-red-500/10 text-red-600"
  },
  {
    icon: Zap,
    title: "Early Access",
    description: "Be the first to shop new collections and limited releases",
    color: "bg-yellow-500/10 text-yellow-600"
  },
  {
    icon: TrendingUp,
    title: "Style Insights",
    description: "Weekly fashion trends and styling tips from our experts",
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    icon: Crown,
    title: "VIP Treatment",
    description: "Priority customer service and exclusive events",
    color: "bg-purple-500/10 text-purple-600"
  }
]

const stats = [
  { icon: Users, label: "Subscribers", value: "25K+" },
  { icon: Star, label: "Average Rating", value: "4.9/5" },
  { icon: Gift, label: "Exclusive Deals", value: "Weekly" },
  { icon: Bell, label: "Updates", value: "2-3/week" }
]

const preferences = [
  { id: "new-arrivals", label: "New Arrivals", description: "Latest products and collections" },
  { id: "sales", label: "Sales & Promotions", description: "Exclusive discounts and flash sales" },
  { id: "style-tips", label: "Style Tips", description: "Fashion advice and trend updates" },
  { id: "sustainability", label: "Sustainability", description: "Eco-friendly initiatives and products" }
]

export default function NewsletterPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    preferences: [] as string[]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePreferenceChange = (preferenceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: checked 
        ? [...prev.preferences, preferenceId]
        : prev.preferences.filter(id => id !== preferenceId)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate subscription
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubscribed(true)
    toast.success("Welcome to the StepForward family! Check your email for your discount code.")
    setIsSubmitting(false)
  }

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-background">
        <div className="hidden md:block">
          <Navigation />
        </div>
        <ParticleBackground />
        
        <main className="relative z-10 pb-20 md:pb-0">
          <section className="min-h-screen flex items-center justify-center">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold">
                    Welcome to the{" "}
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      StepForward Family!
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Thank you for subscribing! Your 15% discount code has been sent to your email.
                  </p>
                </div>
                
                <FloatingCard className="p-8 bg-gradient-to-br from-primary/5 to-muted/20">
                  <div className="space-y-4">
                    <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                      <Gift className="w-4 h-4 mr-2" />
                      WELCOME15
                    </Badge>
                    <p className="text-muted-foreground">
                      Use this code at checkout to get 15% off your first order!
                    </p>
                  </div>
                </FloatingCard>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimatedButton 
                    size="lg" 
                    className="bg-gradient-primary"
                    animation="glow"
                    asChild
                  >
                    <a href="/products">
                      Start Shopping
                    </a>
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="outline" 
                    size="lg"
                    animation="magnetic"
                    asChild
                  >
                    <a href="/">
                      Back to Home
                    </a>
                  </AnimatedButton>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Navigation />
      </div>
      <ParticleBackground />
      
      <main className="relative z-10 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Mail className="w-3 h-3 mr-1" />
                  Join Our Newsletter
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  Stay in the{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Loop
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Get exclusive access to new collections, special offers, and style inspiration 
                  delivered straight to your inbox.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="inline-flex items-center space-x-4 bg-gradient-primary/10 rounded-full px-6 py-3"
              >
                <Gift className="w-5 h-5 text-primary" />
                <span className="font-semibold">Get 15% off your first order!</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FloatingCard className="h-full p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${benefit.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </FloatingCard>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
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
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background shadow-lg flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Signup Form */}
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <FloatingCard className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Join Our Newsletter</h2>
                  <p className="text-muted-foreground">
                    Subscribe now and get instant access to exclusive offers and updates.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>What would you like to hear about?</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {preferences.map((preference) => (
                        <div key={preference.id} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={preference.id}
                            checked={formData.preferences.includes(preference.id)}
                            onCheckedChange={(checked) => 
                              handlePreferenceChange(preference.id, checked as boolean)
                            }
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label htmlFor={preference.id} className="font-medium cursor-pointer">
                              {preference.label}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              {preference.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary/5 to-muted/20 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Welcome Bonus</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      By subscribing, you'll receive a 15% discount code via email that you can use on your first order. 
                      Plus, you'll be the first to know about exclusive sales and new arrivals!
                    </p>
                  </div>

                  <AnimatedButton
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-primary"
                    animation="glow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Subscribe & Get 15% Off
                      </>
                    )}
                  </AnimatedButton>

                  <p className="text-xs text-muted-foreground text-center">
                    By subscribing, you agree to receive marketing emails from StepForward. 
                    You can unsubscribe at any time. We respect your privacy and will never share your information.
                  </p>
                </form>
              </FloatingCard>
            </motion.div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/20">
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
                  Join{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    25,000+ Happy Subscribers
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  "The best newsletter for fashion lovers! I always find amazing deals and styling tips." 
                  - Sarah M., Verified Subscriber
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 font-semibold">4.9/5 from 1,200+ reviews</span>
              </div>
              
              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  Loved by customers
                </div>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-green-500" />
                  Exclusive deals weekly
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
