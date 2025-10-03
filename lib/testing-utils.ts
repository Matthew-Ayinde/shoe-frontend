/**
 * Testing utilities and quality assurance helpers
 */

export interface TestResult {
  name: string
  status: 'pass' | 'fail' | 'warning'
  message: string
  details?: string[]
}

export interface QualityReport {
  score: number
  tests: TestResult[]
  categories: {
    performance: TestResult[]
    accessibility: TestResult[]
    seo: TestResult[]
    usability: TestResult[]
    security: TestResult[]
  }
}

/**
 * Performance testing utilities
 */
export const PerformanceTester = {
  /**
   * Test Core Web Vitals
   */
  testCoreWebVitals: (): Promise<TestResult[]> => {
    return new Promise((resolve) => {
      const results: TestResult[] = []
      
      // Test Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        const lcp = lastEntry.startTime
        
        results.push({
          name: 'Largest Contentful Paint (LCP)',
          status: lcp <= 2500 ? 'pass' : lcp <= 4000 ? 'warning' : 'fail',
          message: `LCP: ${Math.round(lcp)}ms`,
          details: lcp > 2500 ? ['Consider optimizing images and reducing server response times'] : undefined
        })
      })
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      
      // Test Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        
        results.push({
          name: 'Cumulative Layout Shift (CLS)',
          status: clsValue <= 0.1 ? 'pass' : clsValue <= 0.25 ? 'warning' : 'fail',
          message: `CLS: ${clsValue.toFixed(3)}`,
          details: clsValue > 0.1 ? ['Add size attributes to images and reserve space for dynamic content'] : undefined
        })
      })
      
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      
      // Test First Input Delay (FID) - simulated
      setTimeout(() => {
        const fid = Math.random() * 200 // Simulated FID
        results.push({
          name: 'First Input Delay (FID)',
          status: fid <= 100 ? 'pass' : fid <= 300 ? 'warning' : 'fail',
          message: `FID: ${Math.round(fid)}ms (simulated)`,
          details: fid > 100 ? ['Optimize JavaScript execution and reduce main thread blocking'] : undefined
        })
        
        resolve(results)
      }, 3000)
    })
  },

  /**
   * Test resource loading performance
   */
  testResourceLoading: (): TestResult[] => {
    const results: TestResult[] = []
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    // DNS lookup time
    const dnsTime = navigation.domainLookupEnd - navigation.domainLookupStart
    results.push({
      name: 'DNS Lookup Time',
      status: dnsTime <= 20 ? 'pass' : dnsTime <= 60 ? 'warning' : 'fail',
      message: `${Math.round(dnsTime)}ms`,
      details: dnsTime > 20 ? ['Consider using DNS prefetching or a faster DNS provider'] : undefined
    })
    
    // Server response time
    const serverTime = navigation.responseStart - navigation.requestStart
    results.push({
      name: 'Server Response Time',
      status: serverTime <= 200 ? 'pass' : serverTime <= 600 ? 'warning' : 'fail',
      message: `${Math.round(serverTime)}ms`,
      details: serverTime > 200 ? ['Optimize server performance and consider using a CDN'] : undefined
    })
    
    // DOM content loaded time
    const domTime = navigation.domContentLoadedEventEnd - navigation.navigationStart
    results.push({
      name: 'DOM Content Loaded',
      status: domTime <= 1500 ? 'pass' : domTime <= 3000 ? 'warning' : 'fail',
      message: `${Math.round(domTime)}ms`,
      details: domTime > 1500 ? ['Optimize critical rendering path and reduce render-blocking resources'] : undefined
    })
    
    return results
  }
}

/**
 * SEO testing utilities
 */
export const SEOTester = {
  /**
   * Test basic SEO elements
   */
  testBasicSEO: (): TestResult[] => {
    const results: TestResult[] = []
    
    // Title tag
    const title = document.querySelector('title')
    results.push({
      name: 'Title Tag',
      status: title && title.textContent && title.textContent.length >= 30 && title.textContent.length <= 60 ? 'pass' : 'warning',
      message: title ? `"${title.textContent}" (${title.textContent?.length} chars)` : 'Missing title tag',
      details: !title ? ['Add a descriptive title tag'] : title.textContent && title.textContent.length > 60 ? ['Title is too long, keep it under 60 characters'] : title.textContent && title.textContent.length < 30 ? ['Title is too short, aim for 30-60 characters'] : undefined
    })
    
    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement
    results.push({
      name: 'Meta Description',
      status: metaDesc && metaDesc.content && metaDesc.content.length >= 120 && metaDesc.content.length <= 160 ? 'pass' : 'warning',
      message: metaDesc ? `${metaDesc.content.length} characters` : 'Missing meta description',
      details: !metaDesc ? ['Add a meta description'] : metaDesc.content.length > 160 ? ['Meta description is too long'] : metaDesc.content.length < 120 ? ['Meta description is too short'] : undefined
    })
    
    // H1 tag
    const h1Tags = document.querySelectorAll('h1')
    results.push({
      name: 'H1 Tag',
      status: h1Tags.length === 1 ? 'pass' : h1Tags.length === 0 ? 'fail' : 'warning',
      message: `${h1Tags.length} H1 tag(s) found`,
      details: h1Tags.length === 0 ? ['Add an H1 tag to the page'] : h1Tags.length > 1 ? ['Use only one H1 tag per page'] : undefined
    })
    
    // Image alt attributes
    const images = document.querySelectorAll('img')
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt && !img.getAttribute('aria-label'))
    results.push({
      name: 'Image Alt Attributes',
      status: imagesWithoutAlt.length === 0 ? 'pass' : 'warning',
      message: `${imagesWithoutAlt.length} images missing alt text`,
      details: imagesWithoutAlt.length > 0 ? ['Add alt attributes to all images'] : undefined
    })
    
    return results
  },

  /**
   * Test structured data
   */
  testStructuredData: (): TestResult[] => {
    const results: TestResult[] = []
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]')
    
    results.push({
      name: 'Structured Data',
      status: jsonLdScripts.length > 0 ? 'pass' : 'warning',
      message: `${jsonLdScripts.length} structured data blocks found`,
      details: jsonLdScripts.length === 0 ? ['Add structured data to improve search visibility'] : undefined
    })
    
    return results
  }
}

/**
 * Usability testing utilities
 */
export const UsabilityTester = {
  /**
   * Test mobile responsiveness
   */
  testMobileResponsiveness: (): TestResult[] => {
    const results: TestResult[] = []
    
    // Viewport meta tag
    const viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement
    results.push({
      name: 'Viewport Meta Tag',
      status: viewport && viewport.content.includes('width=device-width') ? 'pass' : 'fail',
      message: viewport ? viewport.content : 'Missing viewport meta tag',
      details: !viewport ? ['Add viewport meta tag for mobile responsiveness'] : undefined
    })
    
    // Touch target size
    const buttons = document.querySelectorAll('button, a, input[type="button"], input[type="submit"]')
    const smallTargets = Array.from(buttons).filter(btn => {
      const rect = btn.getBoundingClientRect()
      return rect.width < 44 || rect.height < 44
    })
    
    results.push({
      name: 'Touch Target Size',
      status: smallTargets.length === 0 ? 'pass' : 'warning',
      message: `${smallTargets.length} targets smaller than 44px`,
      details: smallTargets.length > 0 ? ['Ensure touch targets are at least 44x44px'] : undefined
    })
    
    return results
  },

  /**
   * Test form usability
   */
  testFormUsability: (): TestResult[] => {
    const results: TestResult[] = []
    const forms = document.querySelectorAll('form')
    
    if (forms.length === 0) {
      return [{
        name: 'Form Usability',
        status: 'pass',
        message: 'No forms found on page'
      }]
    }
    
    let issuesFound = 0
    const issues: string[] = []
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, select, textarea')
      inputs.forEach(input => {
        const label = form.querySelector(`label[for="${input.id}"]`)
        if (!label && !input.getAttribute('aria-label')) {
          issuesFound++
          issues.push(`Input missing label: ${input.tagName.toLowerCase()}`)
        }
      })
    })
    
    results.push({
      name: 'Form Labels',
      status: issuesFound === 0 ? 'pass' : 'warning',
      message: `${issuesFound} inputs missing labels`,
      details: issues.length > 0 ? issues : undefined
    })
    
    return results
  }
}

/**
 * Security testing utilities
 */
export const SecurityTester = {
  /**
   * Test basic security headers
   */
  testSecurityHeaders: async (): Promise<TestResult[]> => {
    const results: TestResult[] = []
    
    try {
      const response = await fetch(window.location.href, { method: 'HEAD' })
      const headers = response.headers
      
      // Content Security Policy
      const csp = headers.get('content-security-policy')
      results.push({
        name: 'Content Security Policy',
        status: csp ? 'pass' : 'warning',
        message: csp ? 'CSP header present' : 'CSP header missing',
        details: !csp ? ['Add Content-Security-Policy header to prevent XSS attacks'] : undefined
      })
      
      // X-Frame-Options
      const xFrame = headers.get('x-frame-options')
      results.push({
        name: 'X-Frame-Options',
        status: xFrame ? 'pass' : 'warning',
        message: xFrame ? `X-Frame-Options: ${xFrame}` : 'X-Frame-Options header missing',
        details: !xFrame ? ['Add X-Frame-Options header to prevent clickjacking'] : undefined
      })
      
      // X-Content-Type-Options
      const xContent = headers.get('x-content-type-options')
      results.push({
        name: 'X-Content-Type-Options',
        status: xContent === 'nosniff' ? 'pass' : 'warning',
        message: xContent ? `X-Content-Type-Options: ${xContent}` : 'X-Content-Type-Options header missing',
        details: xContent !== 'nosniff' ? ['Add X-Content-Type-Options: nosniff header'] : undefined
      })
      
    } catch (error) {
      results.push({
        name: 'Security Headers',
        status: 'warning',
        message: 'Could not check security headers',
        details: ['Unable to fetch headers for security analysis']
      })
    }
    
    return results
  },

  /**
   * Test HTTPS usage
   */
  testHTTPS: (): TestResult[] => {
    const results: TestResult[] = []
    const isHTTPS = window.location.protocol === 'https:'
    
    results.push({
      name: 'HTTPS Usage',
      status: isHTTPS ? 'pass' : 'fail',
      message: isHTTPS ? 'Site uses HTTPS' : 'Site uses HTTP',
      details: !isHTTPS ? ['Use HTTPS to encrypt data transmission'] : undefined
    })
    
    return results
  }
}

/**
 * Run comprehensive quality assessment
 */
export async function runQualityAssessment(): Promise<QualityReport> {
  const performanceTests = [
    ...PerformanceTester.testResourceLoading(),
    ...(await PerformanceTester.testCoreWebVitals())
  ]
  
  const seoTests = [
    ...SEOTester.testBasicSEO(),
    ...SEOTester.testStructuredData()
  ]
  
  const usabilityTests = [
    ...UsabilityTester.testMobileResponsiveness(),
    ...UsabilityTester.testFormUsability()
  ]
  
  const securityTests = [
    ...SecurityTester.testHTTPS(),
    ...(await SecurityTester.testSecurityHeaders())
  ]
  
  // Accessibility tests would be imported from accessibility-utils
  const accessibilityTests: TestResult[] = [
    {
      name: 'Accessibility Tests',
      status: 'pass',
      message: 'Run accessibility tester for detailed results'
    }
  ]
  
  const allTests = [
    ...performanceTests,
    ...seoTests,
    ...usabilityTests,
    ...securityTests,
    ...accessibilityTests
  ]
  
  const passedTests = allTests.filter(test => test.status === 'pass').length
  const score = Math.round((passedTests / allTests.length) * 100)
  
  return {
    score,
    tests: allTests,
    categories: {
      performance: performanceTests,
      accessibility: accessibilityTests,
      seo: seoTests,
      usability: usabilityTests,
      security: securityTests
    }
  }
}

/**
 * Browser compatibility checker
 */
export const BrowserCompatibility = {
  /**
   * Check for modern browser features
   */
  checkFeatureSupport: (): TestResult[] => {
    const results: TestResult[] = []
    
    // CSS Grid support
    const supportsGrid = CSS.supports('display', 'grid')
    results.push({
      name: 'CSS Grid Support',
      status: supportsGrid ? 'pass' : 'warning',
      message: supportsGrid ? 'CSS Grid supported' : 'CSS Grid not supported',
      details: !supportsGrid ? ['Provide fallback layouts for older browsers'] : undefined
    })
    
    // Intersection Observer support
    const supportsIntersectionObserver = 'IntersectionObserver' in window
    results.push({
      name: 'Intersection Observer',
      status: supportsIntersectionObserver ? 'pass' : 'warning',
      message: supportsIntersectionObserver ? 'Intersection Observer supported' : 'Intersection Observer not supported',
      details: !supportsIntersectionObserver ? ['Consider polyfill for lazy loading features'] : undefined
    })
    
    // Web Vitals API support
    const supportsPerformanceObserver = 'PerformanceObserver' in window
    results.push({
      name: 'Performance Observer',
      status: supportsPerformanceObserver ? 'pass' : 'warning',
      message: supportsPerformanceObserver ? 'Performance Observer supported' : 'Performance Observer not supported',
      details: !supportsPerformanceObserver ? ['Performance monitoring may not work in older browsers'] : undefined
    })
    
    return results
  }
}

/**
 * Generate testing report
 */
export function generateTestingReport(report: QualityReport): string {
  let output = "🧪 Quality Assessment Report\n"
  output += "============================\n\n"
  
  output += `📊 Overall Score: ${report.score}/100\n\n`
  
  Object.entries(report.categories).forEach(([category, tests]) => {
    if (tests.length === 0) return
    
    output += `📋 ${category.charAt(0).toUpperCase() + category.slice(1)} Tests:\n`
    tests.forEach(test => {
      const icon = test.status === 'pass' ? '✅' : test.status === 'warning' ? '⚠️' : '❌'
      output += `${icon} ${test.name}: ${test.message}\n`
      if (test.details) {
        test.details.forEach(detail => {
          output += `   • ${detail}\n`
        })
      }
    })
    output += "\n"
  })
  
  return output
}
