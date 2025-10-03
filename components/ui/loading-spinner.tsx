"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "dots" | "pulse" | "orbit" | "wave"
  className?: string
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6", 
  lg: "w-8 h-8",
  xl: "w-12 h-12"
}

export function LoadingSpinner({ 
  size = "md", 
  variant = "default", 
  className 
}: LoadingSpinnerProps) {
  const sizeClass = sizeClasses[size]

  if (variant === "dots") {
    return (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn("bg-primary rounded-full", size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : size === "lg" ? "w-3 h-3" : "w-4 h-4")}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <motion.div
        className={cn("bg-primary rounded-full", sizeClass, className)}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    )
  }

  if (variant === "orbit") {
    return (
      <div className={cn("relative", sizeClass, className)}>
        <motion.div
          className="absolute inset-0 border-2 border-primary/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-0 left-1/2 w-1 h-1 bg-primary rounded-full -translate-x-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `0 ${size === "sm" ? "8px" : size === "md" ? "12px" : size === "lg" ? "16px" : "24px"}` }}
        />
      </div>
    )
  }

  if (variant === "wave") {
    return (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={cn("bg-primary", size === "sm" ? "w-0.5 h-4" : size === "md" ? "w-1 h-6" : size === "lg" ? "w-1.5 h-8" : "w-2 h-12")}
            animate={{
              scaleY: [1, 2, 1]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    )
  }

  // Default spinner
  return (
    <motion.div
      className={cn(
        "border-2 border-muted border-t-primary rounded-full",
        sizeClass,
        className
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}

// Full page loading component
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <LoadingSpinner size="xl" variant="orbit" />
        <motion.p
          className="text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  )
}

// Button loading state
export function ButtonLoader({ size = "sm" }: { size?: "sm" | "md" }) {
  return <LoadingSpinner size={size} variant="default" className="mr-2" />
}
