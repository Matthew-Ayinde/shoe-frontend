"use client"

import { 
  Suspense, 
  lazy, 
  ComponentType, 
  ReactNode, 
  useState, 
  useEffect, 
  useRef 
} from "react"
import { motion } from "framer-motion"
import { Loader2, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface LazyWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  errorFallback?: ReactNode
  loadingText?: string
  retryText?: string
  threshold?: number
  rootMargin?: string
  onLoad?: () => void
  onError?: (error: Error) => void
  className?: string
}

interface LazyComponentProps {
  loader: () => Promise<{ default: ComponentType<any> }>
  fallback?: ReactNode
  errorBoundary?: boolean
  preload?: boolean
  retryCount?: number
  [key: string]: any
}

/**
 * Enhanced loading skeleton component
 */
const LoadingSkeleton = ({ text = "Loading..." }: { text?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center p-8 space-y-4"
  >
    <div className="relative">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </div>
    <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
    
    {/* Shimmer effect */}
    <div className="w-full max-w-sm space-y-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-4 bg-muted rounded animate-shimmer"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  </motion.div>
)

/**
 * Error boundary component
 */
const ErrorFallback = ({ 
  error, 
  retry, 
  retryText = "Try Again" 
}: { 
  error: Error
  retry: () => void
  retryText?: string 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center p-8 space-y-4"
  >
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20">
      <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
    </div>
    
    <div className="text-center space-y-2">
      <h3 className="font-semibold text-foreground">Failed to load component</h3>
      <p className="text-sm text-muted-foreground max-w-md">
        {error.message || "Something went wrong while loading this component."}
      </p>
    </div>
    
    <Button
      onClick={retry}
      variant="outline"
      size="sm"
      className="mt-4"
    >
      {retryText}
    </Button>
  </motion.div>
)

/**
 * Intersection Observer based lazy wrapper
 */
export function LazyWrapper({
  children,
  fallback,
  errorFallback,
  loadingText = "Loading...",
  retryText = "Try Again",
  threshold = 0.1,
  rootMargin = "50px",
  onLoad,
  onError,
  className = ""
}: LazyWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          onLoad?.()
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin, onLoad])

  const handleError = (err: Error) => {
    setHasError(true)
    setError(err)
    onError?.(err)
  }

  const handleRetry = () => {
    setHasError(false)
    setError(null)
    setIsVisible(false)
    // Trigger re-observation
    setTimeout(() => setIsVisible(true), 100)
  }

  return (
    <div ref={ref} className={className}>
      {hasError ? (
        errorFallback || (
          <ErrorFallback 
            error={error!} 
            retry={handleRetry} 
            retryText={retryText} 
          />
        )
      ) : isVisible ? (
        <Suspense 
          fallback={fallback || <LoadingSkeleton text={loadingText} />}
        >
          {children}
        </Suspense>
      ) : (
        fallback || <LoadingSkeleton text={loadingText} />
      )}
    </div>
  )
}

/**
 * Lazy component loader with error handling and retry logic
 */
export function LazyComponent({
  loader,
  fallback,
  errorBoundary = true,
  preload = false,
  retryCount = 3,
  ...props
}: LazyComponentProps) {
  const [Component, setComponent] = useState<ComponentType<any> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [attempts, setAttempts] = useState(0)

  const loadComponent = async () => {
    if (Component || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const module = await loader()
      setComponent(() => module.default)
      setAttempts(0)
    } catch (err) {
      const error = err as Error
      setError(error)
      
      if (attempts < retryCount) {
        setAttempts(prev => prev + 1)
        // Exponential backoff retry
        setTimeout(() => {
          setIsLoading(false)
          loadComponent()
        }, Math.pow(2, attempts) * 1000)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (preload) {
      loadComponent()
    }
  }, [preload])

  const handleRetry = () => {
    setAttempts(0)
    loadComponent()
  }

  if (error && attempts >= retryCount) {
    return (
      <ErrorFallback 
        error={error} 
        retry={handleRetry} 
        retryText="Retry Loading" 
      />
    )
  }

  if (!Component) {
    return fallback || <LoadingSkeleton text="Loading component..." />
  }

  if (errorBoundary) {
    return (
      <ErrorBoundary onError={setError}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }

  return <Component {...props} />
}

/**
 * Simple Error Boundary component
 */
class ErrorBoundary extends React.Component<
  { children: ReactNode; onError?: (error: Error) => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('LazyComponent Error:', error, errorInfo)
    this.props.onError?.(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback 
          error={this.state.error!} 
          retry={() => this.setState({ hasError: false, error: null })} 
        />
      )
    }

    return this.props.children
  }
}

/**
 * Utility function to create lazy components
 */
export const createLazyComponent = <T extends ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  options: Omit<LazyComponentProps, 'loader'> = {}
) => {
  return (props: React.ComponentProps<T>) => (
    <LazyComponent loader={loader} {...options} {...props} />
  )
}

/**
 * Hook for preloading components
 */
export const usePreloadComponent = (
  loader: () => Promise<{ default: ComponentType<any> }>
) => {
  const [isPreloaded, setIsPreloaded] = useState(false)

  const preload = async () => {
    if (isPreloaded) return
    
    try {
      await loader()
      setIsPreloaded(true)
    } catch (error) {
      console.warn('Failed to preload component:', error)
    }
  }

  return { preload, isPreloaded }
}

/**
 * Lazy route component for Next.js pages
 */
export const LazyRoute = ({ 
  component: Component, 
  ...props 
}: { 
  component: ComponentType<any>
  [key: string]: any 
}) => (
  <Suspense fallback={<LoadingSkeleton text="Loading page..." />}>
    <Component {...props} />
  </Suspense>
)

// Export React for the class component
import React from 'react'
