"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Github, Chrome, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingCard } from "@/components/ui/floating-card"
import { ParticleBackground } from "@/components/ui/particle-background"
import { Login } from "@/models/Login"
import { LoginUser } from "../api/apiClient"
import { toast } from "react-toastify"


export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const payload: Login = { email, password }
      
      const res = await LoginUser(payload)
      toast.success('Login Successful')

   
      router.push("/")
    } catch (err: any) {
       toast.error(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <ParticleBackground particleCount={30} particleColor="oklch(0.45 0.18 250 / 0.3)" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Premium Experience</span>
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Welcome to the
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Future of Shopping
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Step into a world where premium footwear meets cutting-edge technology.
                Your perfect pair is just a click away.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: "Secure", desc: "Bank-level security" },
                { icon: Sparkles, title: "Premium", desc: "Curated collection" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="p-4 rounded-lg bg-muted/30 backdrop-blur-sm border border-border/50"
                >
                  <feature.icon className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <FloatingCard glowEffect tiltEffect className="backdrop-blur-xl bg-card/80 border-border/50">
              <CardHeader className="text-center space-y-4">
                <motion.div
                  className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Welcome Back
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Sign in to your account to continue your journey
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                      Password
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        placeholder="Enter your password"
                        required
                      />
                      <AnimatedButton
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                        animation="scale"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </AnimatedButton>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        checked={remember}
                        onCheckedChange={setRemember}
                        className="border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor="remember-me" className="text-sm text-muted-foreground cursor-pointer">
                        Remember me
                      </Label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Forgot password?
                    </Link>
                  </motion.div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                    >
                      <p className="text-sm text-destructive">{error}</p>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <AnimatedButton
                      type="submit"
                      className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-primary/25"
                      animation="glow"
                      disabled={loading}
                      size="lg"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Sign In</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </AnimatedButton>
                  </motion.div>
                </form>

                <div className="space-y-6">
                  <div className="relative">
                    <Separator className="bg-border/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-card px-4 text-sm text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    <AnimatedButton
                      variant="outline"
                      className="bg-background/50 border-border/50 hover:bg-muted/50"
                      animation="magnetic"
                    >
                      <Chrome className="w-4 h-4 mr-2" />
                      Google
                    </AnimatedButton>
                    <AnimatedButton
                      variant="outline"
                      className="bg-background/50 border-border/50 hover:bg-muted/50"
                      animation="magnetic"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </AnimatedButton>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-center"
                  >
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{" "}
                      <Link
                        href="/register"
                        className="text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Sign up
                      </Link>
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </FloatingCard>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
