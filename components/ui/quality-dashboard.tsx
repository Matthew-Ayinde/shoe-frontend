"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TestTube, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  BarChart3,
  Shield,
  Zap,
  Eye,
  Search,
  Users,
  RefreshCw,
  Download,
  Settings
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { runQualityAssessment, generateTestingReport, BrowserCompatibility, type QualityReport, type TestResult } from '@/lib/testing-utils'

interface QualityDashboardProps {
  showInProduction?: boolean
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

export function QualityDashboard({ 
  showInProduction = false, 
  position = 'top-right' 
}: QualityDashboardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [report, setReport] = useState<QualityReport | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Hide in production unless explicitly shown
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && !showInProduction) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [showInProduction])

  const runQualityTests = async () => {
    setIsRunning(true)
    
    try {
      const qualityReport = await runQualityAssessment()
      const browserTests = BrowserCompatibility.checkFeatureSupport()
      
      // Add browser compatibility to the report
      qualityReport.categories.usability = [
        ...qualityReport.categories.usability,
        ...browserTests
      ]
      
      setReport(qualityReport)
    } catch (error) {
      console.error('Quality assessment failed:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const downloadReport = () => {
    if (!report) return
    
    const reportText = generateTestingReport(report)
    const blob = new Blob([reportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `quality-report-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'fail': return <XCircle className="w-4 h-4 text-red-600" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return <Zap className="w-4 h-4" />
      case 'accessibility': return <Eye className="w-4 h-4" />
      case 'seo': return <Search className="w-4 h-4" />
      case 'usability': return <Users className="w-4 h-4" />
      case 'security': return <Shield className="w-4 h-4" />
      default: return <BarChart3 className="w-4 h-4" />
    }
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
            initial={{ opacity: 0, scale: 0.8, y: position.includes('top') ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: position.includes('top') ? -20 : 20 }}
            transition={{ duration: 0.2 }}
            className={position.includes('top') ? 'mb-4' : 'mb-4'}
          >
            <Card className="w-96 shadow-xl border-2 max-h-[80vh] overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <TestTube className="w-4 h-4" />
                    <span>Quality Dashboard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {report && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={downloadReport}
                        className="h-6 w-6 p-0"
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                      className="h-6 w-6 p-0"
                    >
                      <XCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4 overflow-y-auto max-h-[60vh]">
                {!report ? (
                  <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Run comprehensive quality tests to assess performance, accessibility, SEO, and more
                    </p>
                    <Button
                      onClick={runQualityTests}
                      disabled={isRunning}
                      className="w-full"
                      size="sm"
                    >
                      {isRunning ? (
                        <>
                          <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Running Tests...
                        </>
                      ) : (
                        <>
                          <TestTube className="w-3 h-3 mr-2" />
                          Run Quality Tests
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                      <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4">
                      {/* Overall Score */}
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <BarChart3 className={`w-5 h-5 ${getScoreColor(report.score)}`} />
                          <span className={`text-2xl font-bold ${getScoreColor(report.score)}`}>
                            {report.score}%
                          </span>
                        </div>
                        <Progress value={report.score} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Overall Quality Score
                        </p>
                      </div>

                      {/* Category Summary */}
                      <div className="space-y-2">
                        {Object.entries(report.categories).map(([category, tests]) => {
                          if (tests.length === 0) return null
                          
                          const passed = tests.filter(t => t.status === 'pass').length
                          const total = tests.length
                          const percentage = Math.round((passed / total) * 100)
                          
                          return (
                            <div key={category} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <div className="flex items-center space-x-2">
                                {getCategoryIcon(category)}
                                <span className="text-sm font-medium capitalize">{category}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground">
                                  {passed}/{total}
                                </span>
                                <Badge 
                                  variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
                                  className="text-xs"
                                >
                                  {percentage}%
                                </Badge>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Quick Actions */}
                      <div className="flex space-x-2">
                        <Button
                          onClick={runQualityTests}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          disabled={isRunning}
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Re-test
                        </Button>
                        <Button
                          onClick={() => setActiveTab('details')}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Settings className="w-3 h-3 mr-1" />
                          Details
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="details" className="space-y-4">
                      {Object.entries(report.categories).map(([category, tests]) => {
                        if (tests.length === 0) return null
                        
                        return (
                          <div key={category} className="space-y-2">
                            <div className="flex items-center space-x-2">
                              {getCategoryIcon(category)}
                              <span className="text-sm font-medium capitalize">{category}</span>
                            </div>
                            <div className="space-y-1 pl-6">
                              {tests.map((test, index) => (
                                <div key={index} className="flex items-start space-x-2 text-xs">
                                  {getStatusIcon(test.status)}
                                  <div className="flex-1">
                                    <div className="font-medium">{test.name}</div>
                                    <div className="text-muted-foreground">{test.message}</div>
                                    {test.details && (
                                      <ul className="mt-1 space-y-1">
                                        {test.details.map((detail, i) => (
                                          <li key={i} className="text-muted-foreground">
                                            • {detail}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </TabsContent>
                  </Tabs>
                )}
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
          aria-label="Toggle quality dashboard"
        >
          {isExpanded ? (
            <XCircle className="w-4 h-4" />
          ) : (
            <TestTube className="w-4 h-4" />
          )}
        </Button>
      </motion.div>
    </div>
  )
}

/**
 * Lightweight quality indicator component
 */
interface QualityIndicatorProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

export function QualityIndicator({ score, size = 'md' }: QualityIndicatorProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-6 h-6 text-sm',
    lg: 'w-8 h-8 text-base'
  }

  const getColor = (score: number) => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className={`relative ${sizeClasses[size]} rounded-full ${getColor(score)} flex items-center justify-center text-white font-bold`}>
      {score}
    </div>
  )
}
