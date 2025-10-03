#!/usr/bin/env node

/**
 * Final Polish and Optimization Script
 * Runs comprehensive checks and optimizations before production deployment
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Starting Final Polish and Optimization...\n')

// Configuration
const config = {
  srcDir: './app',
  componentsDir: './components',
  libDir: './lib',
  publicDir: './public',
  outputDir: './optimization-report.json'
}

// Utility functions
const log = (message, type = 'info') => {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    warning: '\x1b[33m',
    error: '\x1b[31m',
    reset: '\x1b[0m'
  }
  console.log(`${colors[type]}${message}${colors.reset}`)
}

const runCommand = (command, description) => {
  try {
    log(`Running: ${description}...`)
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' })
    log(`✅ ${description} completed`, 'success')
    return { success: true, output }
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, 'error')
    return { success: false, error: error.message }
  }
}

// Check functions
const checks = {
  // 1. Code Quality Checks
  async codeQuality() {
    log('\n📋 Running Code Quality Checks...', 'info')
    const results = []

    // TypeScript compilation check
    const tsCheck = runCommand('npx tsc --noEmit', 'TypeScript compilation check')
    results.push({ name: 'TypeScript Compilation', ...tsCheck })

    // ESLint check
    const eslintCheck = runCommand('npx eslint . --ext .ts,.tsx --max-warnings 0', 'ESLint check')
    results.push({ name: 'ESLint', ...eslintCheck })

    // Prettier check
    const prettierCheck = runCommand('npx prettier --check .', 'Prettier formatting check')
    results.push({ name: 'Prettier', ...prettierCheck })

    return results
  },

  // 2. Bundle Analysis
  async bundleAnalysis() {
    log('\n📦 Analyzing Bundle Size...', 'info')
    const results = []

    try {
      // Build the project
      const buildResult = runCommand('npm run build', 'Production build')
      results.push({ name: 'Production Build', ...buildResult })

      // Analyze bundle (if @next/bundle-analyzer is installed)
      if (fs.existsSync('./node_modules/@next/bundle-analyzer')) {
        const analyzeResult = runCommand('npm run analyze', 'Bundle analysis')
        results.push({ name: 'Bundle Analysis', ...analyzeResult })
      }
    } catch (error) {
      results.push({ name: 'Bundle Analysis', success: false, error: error.message })
    }

    return results
  },

  // 3. Performance Checks
  async performance() {
    log('\n⚡ Running Performance Checks...', 'info')
    const results = []

    // Check for large files
    const checkLargeFiles = () => {
      const largeFiles = []
      const checkDir = (dir) => {
        const files = fs.readdirSync(dir, { withFileTypes: true })
        files.forEach(file => {
          const fullPath = path.join(dir, file.name)
          if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
            checkDir(fullPath)
          } else if (file.isFile()) {
            const stats = fs.statSync(fullPath)
            if (stats.size > 500 * 1024) { // Files larger than 500KB
              largeFiles.push({
                path: fullPath,
                size: Math.round(stats.size / 1024) + 'KB'
              })
            }
          }
        })
      }

      try {
        checkDir('./app')
        checkDir('./components')
        checkDir('./lib')
        return { success: true, largeFiles }
      } catch (error) {
        return { success: false, error: error.message }
      }
    }

    const largeFilesResult = checkLargeFiles()
    results.push({ name: 'Large Files Check', ...largeFilesResult })

    return results
  },

  // 4. Security Checks
  async security() {
    log('\n🔒 Running Security Checks...', 'info')
    const results = []

    // Check for security vulnerabilities
    const auditResult = runCommand('npm audit --audit-level moderate', 'NPM security audit')
    results.push({ name: 'NPM Security Audit', ...auditResult })

    // Check for sensitive data in code
    const checkSensitiveData = () => {
      const sensitivePatterns = [
        /api[_-]?key/i,
        /secret/i,
        /password/i,
        /token/i,
        /private[_-]?key/i
      ]

      const sensitiveFiles = []
      const checkFile = (filePath) => {
        try {
          const content = fs.readFileSync(filePath, 'utf8')
          sensitivePatterns.forEach(pattern => {
            if (pattern.test(content)) {
              sensitiveFiles.push(filePath)
            }
          })
        } catch (error) {
          // Ignore files that can't be read
        }
      }

      const walkDir = (dir) => {
        const files = fs.readdirSync(dir, { withFileTypes: true })
        files.forEach(file => {
          const fullPath = path.join(dir, file.name)
          if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
            walkDir(fullPath)
          } else if (file.isFile() && (file.name.endsWith('.ts') || file.name.endsWith('.tsx'))) {
            checkFile(fullPath)
          }
        })
      }

      try {
        walkDir('./app')
        walkDir('./components')
        walkDir('./lib')
        return { success: true, sensitiveFiles }
      } catch (error) {
        return { success: false, error: error.message }
      }
    }

    const sensitiveDataResult = checkSensitiveData()
    results.push({ name: 'Sensitive Data Check', ...sensitiveDataResult })

    return results
  },

  // 5. Accessibility Checks
  async accessibility() {
    log('\n♿ Running Accessibility Checks...', 'info')
    const results = []

    // Check for accessibility issues in components
    const checkA11y = () => {
      const issues = []
      const checkFile = (filePath) => {
        try {
          const content = fs.readFileSync(filePath, 'utf8')
          
          // Check for missing alt attributes
          if (/<img(?![^>]*alt=)/i.test(content)) {
            issues.push(`${filePath}: Images without alt attributes`)
          }
          
          // Check for missing aria-labels on buttons
          if (/<button(?![^>]*aria-label)(?![^>]*aria-labelledby)/i.test(content)) {
            issues.push(`${filePath}: Buttons without aria-label`)
          }
          
          // Check for proper heading hierarchy
          const headings = content.match(/<h[1-6]/gi)
          if (headings && headings.length > 0) {
            const levels = headings.map(h => parseInt(h.charAt(2)))
            for (let i = 1; i < levels.length; i++) {
              if (levels[i] > levels[i-1] + 1) {
                issues.push(`${filePath}: Heading hierarchy skip detected`)
                break
              }
            }
          }
        } catch (error) {
          // Ignore files that can't be read
        }
      }

      const walkDir = (dir) => {
        const files = fs.readdirSync(dir, { withFileTypes: true })
        files.forEach(file => {
          const fullPath = path.join(dir, file.name)
          if (file.isDirectory() && !file.name.startsWith('.')) {
            walkDir(fullPath)
          } else if (file.isFile() && file.name.endsWith('.tsx')) {
            checkFile(fullPath)
          }
        })
      }

      try {
        walkDir('./app')
        walkDir('./components')
        return { success: true, issues }
      } catch (error) {
        return { success: false, error: error.message }
      }
    }

    const a11yResult = checkA11y()
    results.push({ name: 'Accessibility Issues Check', ...a11yResult })

    return results
  },

  // 6. SEO Checks
  async seo() {
    log('\n🔍 Running SEO Checks...', 'info')
    const results = []

    // Check for SEO essentials
    const checkSEO = () => {
      const issues = []
      
      // Check if sitemap exists
      if (!fs.existsSync('./app/sitemap.ts') && !fs.existsSync('./public/sitemap.xml')) {
        issues.push('Missing sitemap')
      }
      
      // Check if robots.txt exists
      if (!fs.existsSync('./app/robots.ts') && !fs.existsSync('./public/robots.txt')) {
        issues.push('Missing robots.txt')
      }
      
      // Check for metadata in pages
      const checkMetadata = (dir) => {
        const files = fs.readdirSync(dir, { withFileTypes: true })
        files.forEach(file => {
          const fullPath = path.join(dir, file.name)
          if (file.isDirectory() && !file.name.startsWith('.')) {
            checkMetadata(fullPath)
          } else if (file.name === 'page.tsx') {
            try {
              const content = fs.readFileSync(fullPath, 'utf8')
              if (!content.includes('metadata') && !content.includes('generateMetadata')) {
                issues.push(`${fullPath}: Missing metadata export`)
              }
            } catch (error) {
              // Ignore files that can't be read
            }
          }
        })
      }
      
      try {
        checkMetadata('./app')
        return { success: true, issues }
      } catch (error) {
        return { success: false, error: error.message }
      }
    }

    const seoResult = checkSEO()
    results.push({ name: 'SEO Essentials Check', ...seoResult })

    return results
  }
}

// Main execution
async function runFinalPolish() {
  const report = {
    timestamp: new Date().toISOString(),
    results: {}
  }

  try {
    // Run all checks
    report.results.codeQuality = await checks.codeQuality()
    report.results.bundleAnalysis = await checks.bundleAnalysis()
    report.results.performance = await checks.performance()
    report.results.security = await checks.security()
    report.results.accessibility = await checks.accessibility()
    report.results.seo = await checks.seo()

    // Calculate overall score
    const allResults = Object.values(report.results).flat()
    const successfulResults = allResults.filter(r => r.success)
    const overallScore = Math.round((successfulResults.length / allResults.length) * 100)

    report.overallScore = overallScore

    // Save report
    fs.writeFileSync(config.outputDir, JSON.stringify(report, null, 2))

    // Display summary
    log('\n📊 Final Polish Report Summary:', 'info')
    log(`Overall Score: ${overallScore}%`, overallScore >= 90 ? 'success' : overallScore >= 70 ? 'warning' : 'error')
    
    Object.entries(report.results).forEach(([category, results]) => {
      const successful = results.filter(r => r.success).length
      const total = results.length
      log(`${category}: ${successful}/${total} checks passed`, successful === total ? 'success' : 'warning')
    })

    log(`\n📄 Detailed report saved to: ${config.outputDir}`, 'info')

    if (overallScore >= 90) {
      log('\n🎉 Excellent! Your application is ready for production deployment!', 'success')
    } else if (overallScore >= 70) {
      log('\n⚠️  Good progress! Address the remaining issues before deployment.', 'warning')
    } else {
      log('\n❌ Several issues need attention before production deployment.', 'error')
    }

  } catch (error) {
    log(`\n❌ Final polish failed: ${error.message}`, 'error')
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  runFinalPolish()
}

module.exports = { runFinalPolish, checks }
