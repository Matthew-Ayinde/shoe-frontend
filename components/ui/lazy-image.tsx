"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ImageIcon, Loader2 } from "lucide-react"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  fallbackSrc?: string
  showLoader?: boolean
  aspectRatio?: "square" | "video" | "portrait" | "landscape"
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  quality = 75,
  placeholder = "blur",
  blurDataURL,
  onLoad,
  onError,
  fallbackSrc = "/placeholder.svg",
  showLoader = true,
  aspectRatio = "square"
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [currentSrc, setCurrentSrc] = useState(src)
  const imgRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "50px", // Start loading 50px before the image comes into view
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // Generate blur data URL if not provided
  const generateBlurDataURL = (width: number = 10, height: number = 10) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      // Create a simple gradient blur effect
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, 'rgba(200, 200, 200, 0.8)')
      gradient.addColorStop(1, 'rgba(150, 150, 150, 0.8)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }
    
    return canvas.toDataURL()
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    setCurrentSrc(fallbackSrc)
    onError?.()
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square"
      case "video":
        return "aspect-video"
      case "portrait":
        return "aspect-[3/4]"
      case "landscape":
        return "aspect-[4/3]"
      default:
        return "aspect-square"
    }
  }

  const containerClasses = `
    relative overflow-hidden bg-muted/30 
    ${fill ? "w-full h-full" : getAspectRatioClass()} 
    ${className}
  `.trim()

  return (
    <div ref={imgRef} className={containerClasses}>
      {/* Loading State */}
      {isLoading && showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Loading...</span>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-muted/30"
        >
          <div className="flex flex-col items-center space-y-2 text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
            <span className="text-xs">Failed to load</span>
          </div>
        </motion.div>
      )}

      {/* Image */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: isLoading ? 0.5 : 1, 
            scale: 1 
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut" 
          }}
          className="w-full h-full"
        >
          <Image
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            fill={fill}
            sizes={sizes}
            priority={priority}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={blurDataURL || generateBlurDataURL()}
            onLoad={handleLoad}
            onError={handleError}
            className={`
              object-cover transition-all duration-500
              ${isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'}
              ${hasError ? 'grayscale' : ''}
            `}
          />
        </motion.div>
      )}

      {/* Shimmer Effect */}
      {isLoading && (
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
    </div>
  )
}

// Preload utility for critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Batch preload utility
export const preloadImages = async (srcs: string[]): Promise<void[]> => {
  return Promise.all(srcs.map(preloadImage))
}
