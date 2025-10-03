"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

interface ParticleBackgroundProps {
  particleCount?: number
  particleColor?: string
  particleSize?: number
  speed?: number
  className?: string
}

export function ParticleBackground({
  particleCount = 50,
  particleColor = "oklch(0.45 0.18 250)",
  particleSize = 2,
  speed = 1,
  className = ""
}: ParticleBackgroundProps) {
  const [particles, setParticles] = React.useState<Particle[]>([])
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  React.useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const newParticles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * particleSize + 1,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.5 + 0.1
      })
    }
    setParticles(newParticles)
  }, [dimensions, particleCount, particleSize, speed])

  React.useEffect(() => {
    if (particles.length === 0) return

    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX
          let newY = particle.y + particle.speedY

          // Bounce off edges
          if (newX <= 0 || newX >= dimensions.width) {
            particle.speedX *= -1
            newX = Math.max(0, Math.min(dimensions.width, newX))
          }
          if (newY <= 0 || newY >= dimensions.height) {
            particle.speedY *= -1
            newY = Math.max(0, Math.min(dimensions.height, newY))
          }

          return {
            ...particle,
            x: newX,
            y: newY
          }
        })
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [particles.length, dimensions])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
      >
        {particles.map((particle, index) => (
          <motion.circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particleColor}
            opacity={particle.opacity}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.01, duration: 0.5 }}
          />
        ))}
        
        {/* Connection lines between nearby particles */}
        {particles.map((particle, i) =>
          particles.slice(i + 1).map((otherParticle, j) => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) +
              Math.pow(particle.y - otherParticle.y, 2)
            )
            
            if (distance < 100) {
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={particle.x}
                  y1={particle.y}
                  x2={otherParticle.x}
                  y2={otherParticle.y}
                  stroke={particleColor}
                  strokeWidth="0.5"
                  opacity={Math.max(0, 0.2 - distance / 500)}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )
            }
            return null
          })
        )}
      </svg>
    </div>
  )
}
