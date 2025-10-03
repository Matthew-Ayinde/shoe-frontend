"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Zap, Clock, Eye, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PerformanceMetrics {
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
  domContentLoaded: number
  loadComplete: number
  memoryUsage?: number
  connectionType?: string
}

interface PerformanceMonitorProps {
  showInProduction?: boolean
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  className?: string
}

export function PerformanceMonitor({ 
  showInProduction = false,
  position = "bottom-right",
  className = ""
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Only show in development or when explicitly enabled
  const shouldShow = process.env.NODE_ENV === 'development' || showInProduction

  useEffect(() => {
    if (!shouldShow) return

    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paint = performance.getEntriesByType('paint')
      
      const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
      const lcp = performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0
      
      // Get memory usage if available
      const memoryInfo = (performance as any).memory
      const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : undefined

      // Get connection info if available
      const connection = (navigator as any).connection
      const connectionType = connection?.effectiveType || 'unknown'

      const newMetrics: PerformanceMetrics = {
        fcp: Math.round(fcp),
        lcp: Math.round(lcp),
        fid: 0, // Will be updated by event listener
        cls: 0, // Will be updated by observer
        ttfb: Math.round(navigation.responseStart - navigation.requestStart),
        domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
        loadComplete: Math.round(navigation.loadEventEnd - navigation.navigationStart),
        memoryUsage: memoryUsage ? Math.round(memoryUsage) : undefined,
        connectionType
      }

      setMetrics(newMetrics)
      setIsVisible(true)
    }

    // Collect initial metrics
    if (document.readyState === 'complete') {
      collectMetrics()
    } else {
      window.addEventListener('load', collectMetrics)
    }

    // Monitor First Input Delay
    const handleFirstInput = (event: any) => {
      setMetrics(prev => prev ? {
        ...prev,
        fid: Math.round(event.processingStart - event.startTime)
      } : null)
    }

    // Monitor Cumulative Layout Shift
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
          setMetrics(prev => prev ? {
            ...prev,
            cls: Math.round(clsValue * 1000) / 1000
          } : null)
        }
      }
    })

    if ('PerformanceObserver' in window) {
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        
        // FID observer
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            handleFirstInput(entry)
          }
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        return () => {
          clsObserver.disconnect()
          fidObserver.disconnect()
        }
      } catch (e) {
        console.warn('PerformanceObserver not supported')
      }
    }

    return () => {
      window.removeEventListener('load', collectMetrics)
    }
  }, [shouldShow])

  if (!shouldShow || !metrics || !isVisible) return null

  const getScoreColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return "text-green-600"
    if (value <= thresholds[1]) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return "bg-green-500"
    if (value <= thresholds[1]) return "bg-yellow-500"
    return "bg-red-500"
  }

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4"
  }

  const coreWebVitals = [
    {
      name: "LCP",
      value: metrics.lcp,
      unit: "ms",
      thresholds: [2500, 4000] as [number, number],
      description: "Largest Contentful Paint",
      icon: Eye
    },
    {
      name: "FID",
      value: metrics.fid,
      unit: "ms",
      thresholds: [100, 300] as [number, number],
      description: "First Input Delay",
      icon: Zap
    },
    {
      name: "CLS",
      value: metrics.cls,
      unit: "",
      thresholds: [0.1, 0.25] as [number, number],
      description: "Cumulative Layout Shift",
      icon: Activity
    }
  ]

  const additionalMetrics = [
    {
      name: "FCP",
      value: metrics.fcp,
      unit: "ms",
      description: "First Contentful Paint"
    },
    {
      name: "TTFB",
      value: metrics.ttfb,
      unit: "ms",
      description: "Time to First Byte"
    },
    {
      name: "DOM",
      value: metrics.domContentLoaded,
      unit: "ms",
      description: "DOM Content Loaded"
    },
    {
      name: "Load",
      value: metrics.loadComplete,
      unit: "ms",
      description: "Load Complete"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`fixed z-50 ${positionClasses[position]} ${className}`}
    >
      <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Performance</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6 p-0"
            >
              {isExpanded ? "−" : "+"}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Core Web Vitals - Always Visible */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            {coreWebVitals.map((metric) => {
              const Icon = metric.icon
              return (
                <div key={metric.name} className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Icon className="h-3 w-3" />
                    <Badge 
                      className={`text-xs px-1 py-0 ${getScoreBadge(metric.value, metric.thresholds)} text-white`}
                    >
                      {metric.name}
                    </Badge>
                  </div>
                  <div className={`text-xs font-mono ${getScoreColor(metric.value, metric.thresholds)}`}>
                    {metric.value}{metric.unit}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Additional Metrics - Expandable */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="border-t pt-2 mt-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {additionalMetrics.map((metric) => (
                      <div key={metric.name} className="flex justify-between">
                        <span className="text-muted-foreground">{metric.name}:</span>
                        <span className="font-mono">{metric.value}{metric.unit}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* System Info */}
                  <div className="mt-2 pt-2 border-t text-xs space-y-1">
                    {metrics.memoryUsage && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Memory:</span>
                        <span className="font-mono">{metrics.memoryUsage}MB</span>
                      </div>
                    )}
                    {metrics.connectionType && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Connection:</span>
                        <span className="font-mono">{metrics.connectionType}</span>
                      </div>
                    )}
                  </div>

                  {/* Performance Score */}
                  <div className="mt-2 pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Score:</span>
                      <div className="flex items-center space-x-1">
                        {coreWebVitals.every(m => m.value <= m.thresholds[0]) ? (
                          <Badge className="bg-green-500 text-white text-xs">Excellent</Badge>
                        ) : coreWebVitals.some(m => m.value > m.thresholds[1]) ? (
                          <Badge className="bg-red-500 text-white text-xs">Poor</Badge>
                        ) : (
                          <Badge className="bg-yellow-500 text-white text-xs">Needs Work</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Hook for programmatic performance monitoring
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)

  useEffect(() => {
    const collectMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paint = performance.getEntriesByType('paint')
      
      const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
      const lcp = performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0
      
      setMetrics({
        fcp: Math.round(fcp),
        lcp: Math.round(lcp),
        fid: 0,
        cls: 0,
        ttfb: Math.round(navigation.responseStart - navigation.requestStart),
        domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
        loadComplete: Math.round(navigation.loadEventEnd - navigation.navigationStart)
      })
    }

    if (document.readyState === 'complete') {
      collectMetrics()
    } else {
      window.addEventListener('load', collectMetrics)
    }

    return () => window.removeEventListener('load', collectMetrics)
  }, [])

  return metrics
}
