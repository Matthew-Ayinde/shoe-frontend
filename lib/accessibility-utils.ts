/**
 * Accessibility utilities and WCAG compliance helpers
 */

import { useEffect, useState } from 'react'

/**
 * Color contrast ratio calculator (WCAG 2.1)
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16) / 255
    const g = parseInt(hex.substr(2, 2), 16) / 255
    const b = parseInt(hex.substr(4, 2), 16) / 255

    // Calculate relative luminance
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
  }

  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

/**
 * Check if color combination meets WCAG contrast requirements
 */
export function meetsContrastRequirement(
  foreground: string, 
  background: string, 
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = calculateContrastRatio(foreground, background)
  
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7
  } else {
    return size === 'large' ? ratio >= 3 : ratio >= 4.5
  }
}

/**
 * Generate accessible color alternatives
 */
export function generateAccessibleColor(
  baseColor: string, 
  backgroundColor: string, 
  targetRatio: number = 4.5
): string {
  // This is a simplified implementation
  // In practice, you'd want a more sophisticated color adjustment algorithm
  const ratio = calculateContrastRatio(baseColor, backgroundColor)
  
  if (ratio >= targetRatio) {
    return baseColor
  }

  // Darken or lighten the color to meet contrast requirements
  const hex = baseColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  // Simple adjustment - in practice, use a more sophisticated algorithm
  const adjustment = ratio < targetRatio ? -30 : 30
  const newR = Math.max(0, Math.min(255, r + adjustment))
  const newG = Math.max(0, Math.min(255, g + adjustment))
  const newB = Math.max(0, Math.min(255, b + adjustment))

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}

/**
 * Screen reader utilities
 */
export const ScreenReader = {
  /**
   * Announce text to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.setAttribute('class', 'sr-only')
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  },

  /**
   * Create visually hidden but screen reader accessible text
   */
  onlyText: (text: string) => (
    <span className="sr-only">{text}</span>
  )
}

/**
 * Focus management utilities
 */
export const FocusManager = {
  /**
   * Trap focus within an element
   */
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    element.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => {
      element.removeEventListener('keydown', handleTabKey)
    }
  },

  /**
   * Return focus to previous element
   */
  returnFocus: (previousElement: HTMLElement | null) => {
    if (previousElement && typeof previousElement.focus === 'function') {
      previousElement.focus()
    }
  }
}

/**
 * Keyboard navigation utilities
 */
export const KeyboardNavigation = {
  /**
   * Handle arrow key navigation for lists
   */
  handleArrowKeys: (
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    onIndexChange: (index: number) => void
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
        onIndexChange(nextIndex)
        items[nextIndex]?.focus()
        break
      
      case 'ArrowUp':
        event.preventDefault()
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
        onIndexChange(prevIndex)
        items[prevIndex]?.focus()
        break
      
      case 'Home':
        event.preventDefault()
        onIndexChange(0)
        items[0]?.focus()
        break
      
      case 'End':
        event.preventDefault()
        const lastIndex = items.length - 1
        onIndexChange(lastIndex)
        items[lastIndex]?.focus()
        break
    }
  }
}

/**
 * ARIA utilities
 */
export const ARIA = {
  /**
   * Generate unique IDs for ARIA relationships
   */
  generateId: (prefix: string = 'aria'): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  },

  /**
   * Common ARIA attributes for different components
   */
  button: (label: string, expanded?: boolean, controls?: string) => ({
    'aria-label': label,
    ...(expanded !== undefined && { 'aria-expanded': expanded }),
    ...(controls && { 'aria-controls': controls })
  }),

  dialog: (labelledBy: string, describedBy?: string) => ({
    role: 'dialog',
    'aria-modal': true,
    'aria-labelledby': labelledBy,
    ...(describedBy && { 'aria-describedby': describedBy })
  }),

  listbox: (labelledBy: string, multiselectable?: boolean) => ({
    role: 'listbox',
    'aria-labelledby': labelledBy,
    ...(multiselectable && { 'aria-multiselectable': multiselectable })
  }),

  option: (selected: boolean, disabled?: boolean) => ({
    role: 'option',
    'aria-selected': selected,
    ...(disabled && { 'aria-disabled': disabled })
  })
}

/**
 * Hook for managing reduced motion preferences
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

/**
 * Hook for managing high contrast preferences
 */
export function useHighContrast(): boolean {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setPrefersHighContrast(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersHighContrast(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersHighContrast
}

/**
 * Hook for managing color scheme preferences
 */
export function useColorScheme(): 'light' | 'dark' | null {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark' | null>(null)

  useEffect(() => {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)')

    const updateColorScheme = () => {
      if (darkQuery.matches) {
        setColorScheme('dark')
      } else if (lightQuery.matches) {
        setColorScheme('light')
      } else {
        setColorScheme(null)
      }
    }

    updateColorScheme()

    darkQuery.addEventListener('change', updateColorScheme)
    lightQuery.addEventListener('change', updateColorScheme)

    return () => {
      darkQuery.removeEventListener('change', updateColorScheme)
      lightQuery.removeEventListener('change', updateColorScheme)
    }
  }, [])

  return colorScheme
}

/**
 * Accessibility testing utilities
 */
export const AccessibilityTester = {
  /**
   * Check for missing alt text on images
   */
  checkImageAltText: (): string[] => {
    const images = document.querySelectorAll('img')
    const issues: string[] = []

    images.forEach((img, index) => {
      if (!img.alt && !img.getAttribute('aria-label') && !img.getAttribute('aria-labelledby')) {
        issues.push(`Image ${index + 1} is missing alt text`)
      }
    })

    return issues
  },

  /**
   * Check for proper heading hierarchy
   */
  checkHeadingHierarchy: (): string[] => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const issues: string[] = []
    let previousLevel = 0

    headings.forEach((heading, index) => {
      const currentLevel = parseInt(heading.tagName.charAt(1))
      
      if (index === 0 && currentLevel !== 1) {
        issues.push('Page should start with an h1 heading')
      }
      
      if (currentLevel > previousLevel + 1) {
        issues.push(`Heading level jumps from h${previousLevel} to h${currentLevel}`)
      }
      
      previousLevel = currentLevel
    })

    return issues
  },

  /**
   * Check for keyboard accessibility
   */
  checkKeyboardAccessibility: (): string[] => {
    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]'
    )
    const issues: string[] = []

    interactiveElements.forEach((element, index) => {
      const tabIndex = element.getAttribute('tabindex')
      
      if (tabIndex && parseInt(tabIndex) > 0) {
        issues.push(`Element ${index + 1} has positive tabindex, which can cause navigation issues`)
      }
      
      if (element.tagName === 'A' && !element.getAttribute('href')) {
        issues.push(`Link ${index + 1} is missing href attribute`)
      }
    })

    return issues
  }
}

/**
 * Generate accessibility report
 */
export function generateAccessibilityReport(): {
  score: number
  issues: string[]
  recommendations: string[]
} {
  const issues = [
    ...AccessibilityTester.checkImageAltText(),
    ...AccessibilityTester.checkHeadingHierarchy(),
    ...AccessibilityTester.checkKeyboardAccessibility()
  ]

  const totalChecks = 10 // Simplified for demo
  const score = Math.max(0, ((totalChecks - issues.length) / totalChecks) * 100)

  const recommendations = [
    'Add alt text to all images',
    'Ensure proper heading hierarchy',
    'Test keyboard navigation',
    'Verify color contrast ratios',
    'Add ARIA labels where needed',
    'Test with screen readers',
    'Implement focus management',
    'Support reduced motion preferences'
  ]

  return {
    score: Math.round(score),
    issues,
    recommendations
  }
}
