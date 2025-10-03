"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Ruler, Target, Zap, CheckCircle, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AnimatedButton } from "./animated-button"
import { FloatingCard } from "./floating-card"

interface SizeRecommendationProps {
  availableSizes: string[]
  onSizeRecommended: (size: string, confidence: number) => void
}

interface Measurements {
  footLength: number
  footWidth: number
  archHeight: number
}

export function SizeRecommendation({ availableSizes, onSizeRecommended }: SizeRecommendationProps) {
  const [step, setStep] = useState(1)
  const [measurements, setMeasurements] = useState<Measurements>({
    footLength: 0,
    footWidth: 0,
    archHeight: 0
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendation, setRecommendation] = useState<{
    size: string
    confidence: number
    reasons: string[]
  } | null>(null)

  const handleMeasurementChange = (field: keyof Measurements, value: number) => {
    setMeasurements(prev => ({ ...prev, [field]: value }))
  }

  const analyzeFit = async () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock size calculation
    const sizeMap: Record<string, { min: number; max: number }> = {
      "7": { min: 240, max: 245 },
      "7.5": { min: 245, max: 250 },
      "8": { min: 250, max: 255 },
      "8.5": { min: 255, max: 260 },
      "9": { min: 260, max: 265 },
      "9.5": { min: 265, max: 270 },
      "10": { min: 270, max: 275 },
      "10.5": { min: 275, max: 280 },
      "11": { min: 280, max: 285 },
    }

    let bestSize = "9"
    let bestConfidence = 0
    
    for (const [size, range] of Object.entries(sizeMap)) {
      if (availableSizes.includes(size)) {
        const distance = Math.min(
          Math.abs(measurements.footLength - range.min),
          Math.abs(measurements.footLength - range.max)
        )
        const confidence = Math.max(0, 100 - distance * 2)
        
        if (confidence > bestConfidence) {
          bestConfidence = confidence
          bestSize = size
        }
      }
    }

    const reasons = [
      `Based on your foot length of ${measurements.footLength}mm`,
      `Considering your foot width of ${measurements.footWidth}mm`,
      `Accounting for arch height of ${measurements.archHeight}mm`
    ]

    const result = {
      size: bestSize,
      confidence: Math.min(bestConfidence, 95),
      reasons
    }

    setRecommendation(result)
    setIsAnalyzing(false)
    onSizeRecommended(result.size, result.confidence)
  }

  const resetAnalysis = () => {
    setStep(1)
    setMeasurements({ footLength: 0, footWidth: 0, archHeight: 0 })
    setRecommendation(null)
  }

  return (
    <FloatingCard className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-xl flex items-center justify-center mb-3">
          <Target className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-xl">AI Size Recommendation</CardTitle>
        <p className="text-sm text-muted-foreground">
          Get your perfect fit with our advanced sizing algorithm
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <AnimatePresence mode="wait">
          {!recommendation ? (
            <motion.div
              key="measurement"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="footLength" className="text-sm font-medium">
                    Foot Length (mm)
                  </Label>
                  <Input
                    id="footLength"
                    type="number"
                    placeholder="e.g., 260"
                    value={measurements.footLength || ""}
                    onChange={(e) => handleMeasurementChange("footLength", Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="footWidth" className="text-sm font-medium">
                    Foot Width (mm)
                  </Label>
                  <Input
                    id="footWidth"
                    type="number"
                    placeholder="e.g., 95"
                    value={measurements.footWidth || ""}
                    onChange={(e) => handleMeasurementChange("footWidth", Number(e.target.value))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="archHeight" className="text-sm font-medium">
                    Arch Height (mm)
                  </Label>
                  <Input
                    id="archHeight"
                    type="number"
                    placeholder="e.g., 25"
                    value={measurements.archHeight || ""}
                    onChange={(e) => handleMeasurementChange("archHeight", Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium mb-1">How to measure:</p>
                    <ul className="space-y-1">
                      <li>• Stand on a ruler to measure foot length</li>
                      <li>• Measure the widest part of your foot</li>
                      <li>• Measure from floor to highest point of arch</li>
                    </ul>
                  </div>
                </div>
              </div>

              <AnimatedButton
                onClick={analyzeFit}
                disabled={!measurements.footLength || !measurements.footWidth || !measurements.archHeight || isAnalyzing}
                className="w-full bg-gradient-primary"
                animation="glow"
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing Fit...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Get My Size</span>
                  </div>
                )}
              </AnimatedButton>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Size {recommendation.size}</h3>
                  <p className="text-sm text-muted-foreground">Recommended for you</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-medium">{Math.round(recommendation.confidence)}%</span>
                  </div>
                  <Progress value={recommendation.confidence} className="h-2" />
                  <Badge 
                    variant={recommendation.confidence > 80 ? "default" : recommendation.confidence > 60 ? "secondary" : "outline"}
                    className="w-full justify-center"
                  >
                    {recommendation.confidence > 80 ? "Excellent Match" : 
                     recommendation.confidence > 60 ? "Good Match" : "Fair Match"}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Analysis Details:</h4>
                <ul className="space-y-1">
                  {recommendation.reasons.map((reason, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-start space-x-2">
                      <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-2">
                <AnimatedButton
                  variant="outline"
                  onClick={resetAnalysis}
                  className="flex-1"
                  animation="scale"
                >
                  Try Again
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => {/* Handle size selection */}}
                  className="flex-1 bg-gradient-primary"
                  animation="glow"
                >
                  Select Size
                </AnimatedButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </FloatingCard>
  )
}
