"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Github, Chrome, Shield, Check, X } from "lucide-react"
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
import { RegisterUser } from "@/models/Register"
import { RegisterCustomer } from "../api/apiClient"
import { toast } from "react-toastify"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Password strength validation
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Client-side validation: confirm password must match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Build payload that matches the API interface (exclude confirmPassword)
    const payload: RegisterUser = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
    }

    try {
      setLoading(true)

      const res = await RegisterCustomer(payload)
      toast.success("Account created successfully!")

      // Success: redirect to login (or wherever you want)
      router.push("/login")
    } catch (err: any) {
      toast.error(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <ParticleBackground particleCount={40} particleColor="oklch(0.55 0.15 280 / 0.3)" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-accent">Join the Community</span>
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Start Your
                <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Style Journey
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Join thousands of satisfied customers who trust us for their footwear needs.
                Get exclusive access to new arrivals, special discounts, and personalized recommendations.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Shield, title: "Secure Account", desc: "Your data is protected with enterprise-grade security" },
                { icon: Sparkles, title: "Exclusive Access", desc: "Early access to sales and new collections" },
                { icon: Check, title: "Easy Returns", desc: "Hassle-free 30-day return policy" },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 backdrop-blur-sm border border-border/50"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Register Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <FloatingCard glowEffect tiltEffect className="backdrop-blur-xl bg-card/80 border-border/50">
              <CardHeader className="text-center space-y-4">
                <motion.div
                  className="mx-auto w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <User className="w-8 h-8 text-white" />
                </motion.div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Create Account
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Join us and start your premium shopping experience
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                        First Name
                      </Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-accent transition-colors" />
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="pl-10 bg-background/50 border-border/50 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                          placeholder="First name"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-background/50 border-border/50 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                        placeholder="Last name"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-accent transition-colors" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 bg-background/50 border-border/50 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                      Password
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-accent transition-colors" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                        placeholder="Create a strong password"
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

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Password strength</span>
                          <span className={`text-xs font-medium ${passwordStrength >= 3 ? 'text-green-500' : passwordStrength >= 2 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {strengthLabels[passwordStrength - 1] || 'Very Weak'}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                                level <= passwordStrength ? strengthColors[passwordStrength - 1] || 'bg-red-500' : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                      Confirm Password
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-accent transition-colors" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`pl-10 pr-10 bg-background/50 border-border/50 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300 ${
                          formData.confirmPassword && formData.password !== formData.confirmPassword
                            ? 'border-destructive/50 focus:border-destructive/50 focus:ring-destructive/20'
                            : ''
                        }`}
                        placeholder="Confirm your password"
                        required
                      />
                      <AnimatedButton
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        animation="scale"
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </AnimatedButton>
                    </div>

                    {/* Password Match Indicator */}
                    {formData.confirmPassword && (
                      <div className="flex items-center space-x-2">
                        {formData.password === formData.confirmPassword ? (
                          <>
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-500">Passwords match</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 text-destructive" />
                            <span className="text-xs text-destructive">Passwords do not match</span>
                          </>
                        )}
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.5 }}
                    className="flex items-start space-x-3"
                  >
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={setAcceptTerms}
                      className="mt-1 border-border/50 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                      required
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <Link href="/terms" className="text-accent hover:text-accent/80 font-medium transition-colors">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-accent hover:text-accent/80 font-medium transition-colors">
                        Privacy Policy
                      </Link>
                    </Label>
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
                      className="w-full bg-gradient-accent hover:shadow-lg hover:shadow-accent/25"
                      animation="glow"
                      disabled={loading || !acceptTerms || formData.password !== formData.confirmPassword}
                      size="lg"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Create Account</span>
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
                      <span className="bg-card px-4 text-sm text-muted-foreground">Or sign up with</span>
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
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="text-accent hover:text-accent/80 font-medium transition-colors"
                      >
                        Sign in
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
