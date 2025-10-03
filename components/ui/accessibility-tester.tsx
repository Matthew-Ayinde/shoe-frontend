"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Settings,
  Zap,
  Target,
  Users,
  Monitor
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { generateAccessibilityReport, calculateContrastRatio } from '@/lib/accessibility-utils'

interface AccessibilityTesterProps {
  showInProduction?: boolean
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

export function AccessibilityTester({ 
  showInProduction = false, 
  position = 'bottom-right' 
}: AccessibilityTesterProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [report, setReport] = useState<{
    score: number
    issues: string[]
    recommendations: string[]
  } | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  // Hide in production unless explicitly shown
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && !showInProduction) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [showInProduction])

  const runAccessibilityTest = async () => {
    setIsRunning(true)
    
    // Simulate test running time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const testReport = generateAccessibilityReport()
    setReport(testReport)
    setIsRunning(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 90) return CheckCircle
    if (score >= 70) return AlertCircle
    return XCircle
  }

  const positionClasses = {
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4'
  }

  if (!isVisible) return null

  return (
    <div className={`fixed ${positionClasses[position]} z-50 no-print`}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card className="w-80 shadow-xl border-2">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Accessibility Tester</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                    className="h-6 w-6 p-0"
                  >
                    <EyeOff className="w-3 h-3" />
                  </Button>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {!report ? (
                  <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Run accessibility tests to check WCAG compliance
                    </p>
                    <Button
                      onClick={runAccessibilityTest}
                      disabled={isRunning}
                      className="w-full"
                      size="sm"
                    >
                      {isRunning ? (
                        <>
                          <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-3 h-3 mr-2" />
                          Run Tests
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Score */}
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        {(() => {
                          const ScoreIcon = getScoreIcon(report.score)
                          return <ScoreIcon className={`w-5 h-5 ${getScoreColor(report.score)}`} />
                        })()}
                        <span className={`text-2xl font-bold ${getScoreColor(report.score)}`}>
                          {report.score}%
                        </span>
                      </div>
                      <Progress value={report.score} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Accessibility Score
                      </p>
                    </div>

                    {/* Issues */}
                    {report.issues.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-medium">Issues Found</span>
                          <Badge variant="destructive" className="text-xs">
                            {report.issues.length}
                          </Badge>
                        </div>
                        <div className="max-h-32 overflow-y-auto space-y-1">
                          {report.issues.map((issue, index) => (
                            <div key={index} className="text-xs p-2 bg-red-50 rounded border-l-2 border-red-200">
                              {issue}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">Recommendations</span>
                      </div>
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {report.recommendations.slice(0, 3).map((rec, index) => (
                          <div key={index} className="text-xs p-2 bg-blue-50 rounded border-l-2 border-blue-200">
                            {rec}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        onClick={runAccessibilityTest}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        disabled={isRunning}
                      >
                        Re-test
                      </Button>
                      <Button
                        onClick={() => setReport(null)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                )}

                {/* Quick Tools */}
                <div className="border-t pt-4 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Quick Tools</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => {
                        document.documentElement.style.filter = 
                          document.documentElement.style.filter === 'grayscale(100%)' 
                            ? '' 
                            : 'grayscale(100%)'
                      }}
                    >
                      <Monitor className="w-3 h-3 mr-1" />
                      Grayscale
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => {
                        const focusableElements = document.querySelectorAll(
                          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                        )
                        focusableElements.forEach((el: any) => {
                          el.style.outline = el.style.outline === '2px solid red' ? '' : '2px solid red'
                        })
                      }}
                    >
                      <Target className="w-3 h-3 mr-1" />
                      Focus
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="sm"
          className="rounded-full w-12 h-12 shadow-lg"
          aria-label="Toggle accessibility tester"
        >
          {isExpanded ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </Button>
      </motion.div>
    </div>
  )
}

/**
 * Contrast checker component
 */
interface ContrastCheckerProps {
  foreground: string
  background: string
  text?: string
}

export function ContrastChecker({ foreground, background, text = "Sample Text" }: ContrastCheckerProps) {
  const ratio = calculateContrastRatio(foreground, background)
  const meetsAA = ratio >= 4.5
  const meetsAAA = ratio >= 7

  return (
    <div className="p-4 border rounded-lg space-y-3">
      <div 
        className="p-4 rounded text-center font-medium"
        style={{ 
          backgroundColor: background, 
          color: foreground 
        }}
      >
        {text}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Contrast Ratio:</span>
          <Badge variant={meetsAA ? "default" : "destructive"}>
            {ratio.toFixed(2)}:1
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">WCAG AA:</span>
          <div className="flex items-center space-x-1">
            {meetsAA ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600" />
            )}
            <span className="text-sm">{meetsAA ? 'Pass' : 'Fail'}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">WCAG AAA:</span>
          <div className="flex items-center space-x-1">
            {meetsAAA ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600" />
            )}
            <span className="text-sm">{meetsAAA ? 'Pass' : 'Fail'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
