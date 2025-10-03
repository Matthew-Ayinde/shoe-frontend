"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useReducedMotion, useHighContrast, useColorScheme } from '@/lib/accessibility-utils'

interface AccessibilityContextType {
  reducedMotion: boolean
  highContrast: boolean
  colorScheme: 'light' | 'dark' | null
  fontSize: 'small' | 'medium' | 'large'
  announcements: string[]
  announce: (message: string, priority?: 'polite' | 'assertive') => void
  setFontSize: (size: 'small' | 'medium' | 'large') => void
  focusVisible: boolean
  setFocusVisible: (visible: boolean) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

interface AccessibilityProviderProps {
  children: ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const reducedMotion = useReducedMotion()
  const highContrast = useHighContrast()
  const colorScheme = useColorScheme()
  
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [announcements, setAnnouncements] = useState<string[]>([])
  const [focusVisible, setFocusVisible] = useState(false)

  // Load saved preferences
  useEffect(() => {
    const savedFontSize = localStorage.getItem('accessibility-font-size') as 'small' | 'medium' | 'large'
    if (savedFontSize) {
      setFontSize(savedFontSize)
    }
  }, [])

  // Save font size preference
  useEffect(() => {
    localStorage.setItem('accessibility-font-size', fontSize)
    document.documentElement.setAttribute('data-font-size', fontSize)
  }, [fontSize])

  // Apply accessibility classes to document
  useEffect(() => {
    const root = document.documentElement
    
    root.setAttribute('data-reduced-motion', reducedMotion.toString())
    root.setAttribute('data-high-contrast', highContrast.toString())
    root.setAttribute('data-color-scheme', colorScheme || 'auto')
    root.setAttribute('data-focus-visible', focusVisible.toString())
  }, [reducedMotion, highContrast, colorScheme, focusVisible])

  // Handle keyboard navigation focus visibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setFocusVisible(true)
      }
    }

    const handleMouseDown = () => {
      setFocusVisible(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncements(prev => [...prev, message])
    
    // Create live region for screen readers
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', priority)
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    liveRegion.textContent = message
    
    document.body.appendChild(liveRegion)
    
    setTimeout(() => {
      document.body.removeChild(liveRegion)
      setAnnouncements(prev => prev.filter(a => a !== message))
    }, 1000)
  }

  const value: AccessibilityContextType = {
    reducedMotion,
    highContrast,
    colorScheme,
    fontSize,
    announcements,
    announce,
    setFontSize,
    focusVisible,
    setFocusVisible
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
      
      {/* Live region for announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcements.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}

/**
 * Screen reader only text component
 */
export function ScreenReaderOnly({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>
}

/**
 * Focus trap component for modals and dialogs
 */
interface FocusTrapProps {
  children: ReactNode
  active: boolean
  restoreFocus?: boolean
}

export function FocusTrap({ children, active, restoreFocus = true }: FocusTrapProps) {
  const [previousActiveElement, setPreviousActiveElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return

    // Store the currently focused element
    setPreviousActiveElement(document.activeElement as HTMLElement)

    const trapContainer = document.querySelector('[data-focus-trap]') as HTMLElement
    if (!trapContainer) return

    const focusableElements = trapContainer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    // Focus the first element
    firstElement?.focus()

    document.addEventListener('keydown', handleTabKey)

    return () => {
      document.removeEventListener('keydown', handleTabKey)
      
      // Restore focus to the previously focused element
      if (restoreFocus && previousActiveElement) {
        previousActiveElement.focus()
      }
    }
  }, [active, restoreFocus, previousActiveElement])

  if (!active) return <>{children}</>

  return <div data-focus-trap>{children}</div>
}

/**
 * Accessible button component with proper ARIA attributes
 */
interface AccessibleButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  ariaLabel?: string
  ariaDescribedBy?: string
  ariaExpanded?: boolean
  ariaControls?: string
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export function AccessibleButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  ariaLabel,
  ariaDescribedBy,
  ariaExpanded,
  ariaControls,
  className = '',
  type = 'button'
}: AccessibleButtonProps) {
  const { announce } = useAccessibility()

  const handleClick = () => {
    if (disabled || loading) return
    
    onClick?.()
    
    if (loading) {
      announce('Loading', 'polite')
    }
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-busy={loading}
      className={`${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading && (
        <span className="sr-only">Loading...</span>
      )}
      {children}
    </button>
  )
}

/**
 * Accessible form field component
 */
interface AccessibleFieldProps {
  children: ReactNode
  label: string
  error?: string
  hint?: string
  required?: boolean
  id: string
}

export function AccessibleField({
  children,
  label,
  error,
  hint,
  required = false,
  id
}: AccessibleFieldProps) {
  const errorId = error ? `${id}-error` : undefined
  const hintId = hint ? `${id}-hint` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ')

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required && (
          <>
            <span className="text-red-500 ml-1" aria-hidden="true">*</span>
            <ScreenReaderOnly>(required)</ScreenReaderOnly>
          </>
        )}
      </label>
      
      {hint && (
        <div id={hintId} className="text-sm text-muted-foreground">
          {hint}
        </div>
      )}
      
      <div>
        {typeof children === 'function' 
          ? children({ id, 'aria-describedby': describedBy || undefined, 'aria-invalid': !!error })
          : children
        }
      </div>
      
      {error && (
        <div id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}

/**
 * Accessible modal component
 */
interface AccessibleModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
}

export function AccessibleModal({
  children,
  isOpen,
  onClose,
  title,
  description
}: AccessibleModalProps) {
  const { announce } = useAccessibility()
  const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`
  const descriptionId = description ? `modal-description-${Math.random().toString(36).substr(2, 9)}` : undefined

  useEffect(() => {
    if (isOpen) {
      announce(`Modal opened: ${title}`, 'assertive')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, title, announce])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <FocusTrap active={isOpen}>
        <div className="bg-background rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 id={titleId} className="text-xl font-semibold">
              {title}
            </h2>
            <AccessibleButton
              onClick={onClose}
              ariaLabel="Close modal"
              className="p-2 hover:bg-muted rounded-md"
            >
              ×
            </AccessibleButton>
          </div>
          
          {description && (
            <p id={descriptionId} className="text-muted-foreground mb-4">
              {description}
            </p>
          )}
          
          {children}
        </div>
      </FocusTrap>
    </div>
  )
}
