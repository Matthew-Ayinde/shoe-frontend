"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "./button"

interface AnimatedButtonProps extends Omit<ButtonProps, 'asChild'> {
  animation?: 'scale' | 'slide' | 'glow' | 'magnetic' | 'ripple'
  glowColor?: string
  children: React.ReactNode
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, animation = 'scale', glowColor, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (animation === 'ripple') {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const newRipple = { id: Date.now(), x, y }
        setRipples(prev => [...prev, newRipple])
        
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
        }, 600)
      }
      
      if (props.onClick) {
        props.onClick(e)
      }
    }

    const getAnimationProps = () => {
      switch (animation) {
        case 'scale':
          return {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            transition: { type: "spring", stiffness: 400, damping: 17 }
          }
        case 'slide':
          return {
            whileHover: { y: -2 },
            whileTap: { y: 0 },
            transition: { type: "spring", stiffness: 400, damping: 17 }
          }
        case 'glow':
          return {
            whileHover: { 
              boxShadow: `0 0 20px ${glowColor || 'oklch(0.45 0.18 250 / 0.4)'}`,
              scale: 1.02
            },
            transition: { duration: 0.3 }
          }
        case 'magnetic':
          return {
            whileHover: { scale: 1.05, rotate: 1 },
            whileTap: { scale: 0.95, rotate: -1 },
            transition: { type: "spring", stiffness: 400, damping: 17 }
          }
        default:
          return {}
      }
    }

    return (
      <motion.div
        className="relative inline-block"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        {...getAnimationProps()}
      >
        <Button
          ref={ref}
          className={cn(
            "relative overflow-hidden",
            animation === 'glow' && isHovered && "shadow-lg",
            className
          )}
          onClick={handleClick}
          {...props}
        >
          {children}
          
          {/* Ripple effect */}
          {animation === 'ripple' && ripples.map(ripple => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full bg-white/30 pointer-events-none"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
          
          {/* Shimmer effect for glow animation */}
          {animation === 'glow' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              animate={isHovered ? { x: '100%' } : { x: '-100%' }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          )}
        </Button>
      </motion.div>
    )
  }
)

AnimatedButton.displayName = "AnimatedButton"

export { AnimatedButton }
