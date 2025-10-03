"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardProps } from "./card"

interface FloatingCardProps extends CardProps {
  children: React.ReactNode
  intensity?: number
  glowEffect?: boolean
  magneticEffect?: boolean
  tiltEffect?: boolean
}

const FloatingCard = React.forwardRef<HTMLDivElement, FloatingCardProps>(
  ({ className, children, intensity = 1, glowEffect = false, magneticEffect = false, tiltEffect = true, ...props }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15 * intensity, -15 * intensity]))
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15 * intensity, 15 * intensity]))
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !tiltEffect) return
      
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      mouseX.set((e.clientX - centerX) / rect.width)
      mouseY.set((e.clientY - centerY) / rect.height)
    }
    
    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    return (
      <motion.div
        ref={cardRef}
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltEffect ? {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        } : {}}
        whileHover={magneticEffect ? { 
          scale: 1.05,
          transition: { type: "spring", stiffness: 400, damping: 17 }
        } : {}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card
          ref={ref}
          className={cn(
            "relative transition-all duration-300",
            glowEffect && "hover:shadow-2xl hover:shadow-primary/20",
            tiltEffect && "transform-gpu",
            className
          )}
          {...props}
        >
          {children}
          
          {/* Glow effect overlay */}
          {glowEffect && (
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-0 pointer-events-none"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 pointer-events-none"
            whileHover={{ 
              opacity: 1,
              background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)"
            }}
            transition={{ duration: 0.6 }}
          />
        </Card>
      </motion.div>
    )
  }
)

FloatingCard.displayName = "FloatingCard"

export { FloatingCard }
