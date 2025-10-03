/**
 * Bundle size analyzer and optimization utilities
 */

interface BundleInfo {
  name: string
  size: number
  gzipSize?: number
  modules: string[]
  dependencies: string[]
}

interface PerformanceReport {
  totalSize: number
  gzipSize: number
  largestChunks: BundleInfo[]
  recommendations: string[]
  score: number
}

class BundleAnalyzer {
  private chunks: BundleInfo[] = []
  private readonly sizeThresholds = {
    warning: 250 * 1024, // 250KB
    error: 500 * 1024,   // 500KB
  }

  /**
   * Analyze bundle performance
   */
  analyze(): PerformanceReport {
    const totalSize = this.chunks.reduce((sum, chunk) => sum + chunk.size, 0)
    const gzipSize = this.chunks.reduce((sum, chunk) => sum + (chunk.gzipSize || chunk.size * 0.3), 0)
    
    const largestChunks = this.chunks
      .sort((a, b) => b.size - a.size)
      .slice(0, 5)

    const recommendations = this.generateRecommendations()
    const score = this.calculateScore(totalSize, gzipSize)

    return {
      totalSize,
      gzipSize,
      largestChunks,
      recommendations,
      score
    }
  }

  /**
   * Add chunk information
   */
  addChunk(chunk: BundleInfo): void {
    this.chunks.push(chunk)
  }

  /**
   * Get optimization suggestions
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = []
    const totalSize = this.chunks.reduce((sum, chunk) => sum + chunk.size, 0)

    // Check total bundle size
    if (totalSize > this.sizeThresholds.error) {
      recommendations.push("Bundle size is too large. Consider code splitting and lazy loading.")
    } else if (totalSize > this.sizeThresholds.warning) {
      recommendations.push("Bundle size is getting large. Monitor and optimize regularly.")
    }

    // Check for large individual chunks
    const largeChunks = this.chunks.filter(chunk => chunk.size > 100 * 1024)
    if (largeChunks.length > 0) {
      recommendations.push(`${largeChunks.length} chunks are over 100KB. Consider splitting them.`)
    }

    // Check for duplicate dependencies
    const allDependencies = this.chunks.flatMap(chunk => chunk.dependencies)
    const duplicates = this.findDuplicates(allDependencies)
    if (duplicates.length > 0) {
      recommendations.push(`Found ${duplicates.length} duplicate dependencies. Consider deduplication.`)
    }

    // Check for unused modules
    const unusedModules = this.findUnusedModules()
    if (unusedModules.length > 0) {
      recommendations.push(`${unusedModules.length} potentially unused modules detected.`)
    }

    return recommendations
  }

  /**
   * Calculate performance score (0-100)
   */
  private calculateScore(totalSize: number, gzipSize: number): number {
    let score = 100

    // Penalize large bundle size
    if (totalSize > this.sizeThresholds.error) {
      score -= 40
    } else if (totalSize > this.sizeThresholds.warning) {
      score -= 20
    }

    // Penalize poor compression ratio
    const compressionRatio = gzipSize / totalSize
    if (compressionRatio > 0.8) {
      score -= 15
    } else if (compressionRatio > 0.6) {
      score -= 10
    }

    // Penalize too many chunks
    if (this.chunks.length > 20) {
      score -= 10
    } else if (this.chunks.length > 10) {
      score -= 5
    }

    return Math.max(0, score)
  }

  /**
   * Find duplicate dependencies
   */
  private findDuplicates(items: string[]): string[] {
    const counts = items.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.keys(counts).filter(key => counts[key] > 1)
  }

  /**
   * Find potentially unused modules
   */
  private findUnusedModules(): string[] {
    // This would require more sophisticated analysis in a real implementation
    // For now, return empty array
    return []
  }

  /**
   * Generate optimization report
   */
  generateReport(): string {
    const report = this.analyze()
    
    let output = "📊 Bundle Analysis Report\n"
    output += "========================\n\n"
    
    output += `📦 Total Size: ${this.formatSize(report.totalSize)}\n`
    output += `🗜️  Gzipped: ${this.formatSize(report.gzipSize)}\n`
    output += `⭐ Score: ${report.score}/100\n\n`
    
    output += "🏆 Largest Chunks:\n"
    report.largestChunks.forEach((chunk, index) => {
      output += `${index + 1}. ${chunk.name}: ${this.formatSize(chunk.size)}\n`
    })
    
    if (report.recommendations.length > 0) {
      output += "\n💡 Recommendations:\n"
      report.recommendations.forEach((rec, index) => {
        output += `${index + 1}. ${rec}\n`
      })
    }
    
    return output
  }

  /**
   * Format bytes to human readable size
   */
  private formatSize(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 B'
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    const size = bytes / Math.pow(1024, i)
    
    return `${size.toFixed(1)} ${sizes[i]}`
  }
}

/**
 * Webpack bundle analyzer integration
 */
export const analyzeBundleSize = async (): Promise<PerformanceReport> => {
  const analyzer = new BundleAnalyzer()
  
  // In a real implementation, this would parse webpack stats
  // For demo purposes, we'll simulate some data
  const mockChunks: BundleInfo[] = [
    {
      name: 'main',
      size: 180 * 1024,
      gzipSize: 65 * 1024,
      modules: ['react', 'react-dom', 'next'],
      dependencies: ['react', 'react-dom']
    },
    {
      name: 'vendor',
      size: 320 * 1024,
      gzipSize: 95 * 1024,
      modules: ['framer-motion', 'lucide-react'],
      dependencies: ['framer-motion', 'lucide-react']
    },
    {
      name: 'pages',
      size: 85 * 1024,
      gzipSize: 28 * 1024,
      modules: ['pages/index', 'pages/products'],
      dependencies: []
    }
  ]

  mockChunks.forEach(chunk => analyzer.addChunk(chunk))
  return analyzer.analyze()
}

/**
 * Performance budget checker
 */
export const checkPerformanceBudget = (report: PerformanceReport): {
  passed: boolean
  violations: string[]
} => {
  const violations: string[] = []
  const budgets = {
    totalSize: 500 * 1024, // 500KB
    gzipSize: 150 * 1024,  // 150KB
    chunkSize: 250 * 1024, // 250KB per chunk
  }

  if (report.totalSize > budgets.totalSize) {
    violations.push(`Total bundle size (${formatBytes(report.totalSize)}) exceeds budget (${formatBytes(budgets.totalSize)})`)
  }

  if (report.gzipSize > budgets.gzipSize) {
    violations.push(`Gzipped size (${formatBytes(report.gzipSize)}) exceeds budget (${formatBytes(budgets.gzipSize)})`)
  }

  const largeChunks = report.largestChunks.filter(chunk => chunk.size > budgets.chunkSize)
  if (largeChunks.length > 0) {
    violations.push(`${largeChunks.length} chunks exceed size budget (${formatBytes(budgets.chunkSize)})`)
  }

  return {
    passed: violations.length === 0,
    violations
  }
}

/**
 * Tree shaking analyzer
 */
export const analyzeTreeShaking = (): {
  unusedExports: string[]
  recommendations: string[]
} => {
  // This would require static analysis of the codebase
  // For demo purposes, return mock data
  return {
    unusedExports: [
      'utils/unused-helper.ts:formatDate',
      'components/unused-component.tsx:UnusedComponent'
    ],
    recommendations: [
      'Remove unused exports to improve tree shaking',
      'Use named imports instead of default imports where possible',
      'Consider using dynamic imports for large dependencies'
    ]
  }
}

/**
 * Code splitting recommendations
 */
export const getCodeSplittingRecommendations = (): string[] => {
  return [
    'Split vendor libraries into separate chunks',
    'Use dynamic imports for route-based code splitting',
    'Lazy load heavy components and libraries',
    'Split CSS into separate chunks',
    'Use React.lazy() for component-level splitting'
  ]
}

// Utility functions
const formatBytes = (bytes: number): string => {
  const sizes = ['B', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 B'
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const size = bytes / Math.pow(1024, i)
  
  return `${size.toFixed(1)} ${sizes[i]}`
}

// Export singleton
export const bundleAnalyzer = new BundleAnalyzer()
