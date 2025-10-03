"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Shield, 
  Lock,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { AnimatedButton } from '@/components/ui/animated-button'
import { FloatingCard } from '@/components/ui/floating-card'

interface PaymentMethod {
  id: string
  name: string
  icon: React.ComponentType<any>
  description: string
  processingFee?: number
  estimatedTime: string
  isPopular?: boolean
  isSecure: boolean
}

interface PaymentMethodsProps {
  total: number
  onPaymentSubmit: (paymentData: any) => Promise<void>
  isProcessing?: boolean
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, American Express',
    estimatedTime: 'Instant',
    isPopular: true,
    isSecure: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: Wallet,
    description: 'Pay with your PayPal account',
    estimatedTime: 'Instant',
    isSecure: true
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: Smartphone,
    description: 'Touch ID or Face ID',
    estimatedTime: 'Instant',
    isSecure: true
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: Smartphone,
    description: 'Pay with Google',
    estimatedTime: 'Instant',
    isSecure: true
  }
]

export function PaymentMethods({ total, onPaymentSubmit, isProcessing = false }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState('card')
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    saveCard: false
  })
  const [showCvv, setShowCvv] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isValidating, setIsValidating] = useState(false)

  const validateCardNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, '')
    if (cleaned.length < 13 || cleaned.length > 19) return false
    
    // Luhn algorithm
    let sum = 0
    let isEven = false
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i])
      
      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      
      sum += digit
      isEven = !isEven
    }
    
    return sum % 10 === 0
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    const match = cleaned.match(/.{1,4}/g)
    return match ? match.join(' ') : cleaned
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4)
    }
    return cleaned
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (selectedMethod === 'card') {
      if (!cardData.name.trim()) {
        newErrors.name = 'Cardholder name is required'
      }

      if (!cardData.number.trim()) {
        newErrors.number = 'Card number is required'
      } else if (!validateCardNumber(cardData.number)) {
        newErrors.number = 'Invalid card number'
      }

      if (!cardData.expiry.trim()) {
        newErrors.expiry = 'Expiry date is required'
      } else {
        const [month, year] = cardData.expiry.split('/')
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear() % 100
        const currentMonth = currentDate.getMonth() + 1

        if (!month || !year || parseInt(month) < 1 || parseInt(month) > 12) {
          newErrors.expiry = 'Invalid expiry date'
        } else if (parseInt(year) < currentYear || 
                  (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
          newErrors.expiry = 'Card has expired'
        }
      }

      if (!cardData.cvv.trim()) {
        newErrors.cvv = 'CVV is required'
      } else if (cardData.cvv.length < 3 || cardData.cvv.length > 4) {
        newErrors.cvv = 'Invalid CVV'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsValidating(true)

    try {
      const paymentData = {
        method: selectedMethod,
        amount: total,
        ...(selectedMethod === 'card' && {
          card: {
            number: cardData.number.replace(/\s/g, ''),
            expiry: cardData.expiry,
            cvv: cardData.cvv,
            name: cardData.name,
            saveCard: cardData.saveCard
          }
        })
      }

      await onPaymentSubmit(paymentData)
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setIsValidating(false)
    }
  }

  const getCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, '')
    if (cleaned.startsWith('4')) return 'Visa'
    if (cleaned.startsWith('5') || cleaned.startsWith('2')) return 'Mastercard'
    if (cleaned.startsWith('3')) return 'American Express'
    return 'Card'
  }

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <FloatingCard>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span>Choose Payment Method</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                return (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <Label
                      htmlFor={method.id}
                      className={`flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedMethod === method.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedMethod === method.id ? 'bg-primary text-white' : 'bg-muted'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{method.name}</span>
                            {method.isPopular && (
                              <span className="px-2 py-1 text-xs bg-primary text-white rounded-full">
                                Popular
                              </span>
                            )}
                            {method.isSecure && (
                              <Lock className="w-3 h-3 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Processing time: {method.estimatedTime}
                          </p>
                        </div>
                      </div>
                    </Label>
                  </motion.div>
                )
              })}
            </div>
          </RadioGroup>
        </CardContent>
      </FloatingCard>

      {/* Card Details Form */}
      <AnimatePresence>
        {selectedMethod === 'card' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FloatingCard>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Card Details</span>
                  {cardData.number && (
                    <span className="text-sm text-muted-foreground">
                      ({getCardType(cardData.number)})
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardData.name}
                    onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value)
                      if (formatted.replace(/\s/g, '').length <= 19) {
                        setCardData(prev => ({ ...prev, number: formatted }))
                      }
                    }}
                    className={errors.number ? 'border-red-500' : ''}
                    maxLength={23}
                  />
                  {errors.number && (
                    <p className="text-sm text-red-500 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.number}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) => {
                        const formatted = formatExpiry(e.target.value)
                        if (formatted.length <= 5) {
                          setCardData(prev => ({ ...prev, expiry: formatted }))
                        }
                      }}
                      className={errors.expiry ? 'border-red-500' : ''}
                      maxLength={5}
                    />
                    {errors.expiry && (
                      <p className="text-sm text-red-500 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.expiry}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <div className="relative">
                      <Input
                        id="cvv"
                        type={showCvv ? 'text' : 'password'}
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          if (value.length <= 4) {
                            setCardData(prev => ({ ...prev, cvv: value }))
                          }
                        }}
                        className={`pr-10 ${errors.cvv ? 'border-red-500' : ''}`}
                        maxLength={4}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowCvv(!showCvv)}
                      >
                        {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {errors.cvv && (
                      <p className="text-sm text-red-500 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.cvv}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saveCard"
                    checked={cardData.saveCard}
                    onCheckedChange={(checked) => 
                      setCardData(prev => ({ ...prev, saveCard: checked as boolean }))
                    }
                  />
                  <Label htmlFor="saveCard" className="text-sm">
                    Save this card for future purchases
                  </Label>
                </div>
              </CardContent>
            </FloatingCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Summary & Submit */}
      <FloatingCard>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Your payment information is encrypted and secure</span>
            </div>

            <AnimatedButton
              onClick={handleSubmit}
              disabled={isProcessing || isValidating}
              className="w-full py-6 text-lg bg-gradient-primary"
              animation="glow"
            >
              {isProcessing || isValidating ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Complete Payment - ${total.toFixed(2)}</span>
                </div>
              )}
            </AnimatedButton>
          </div>
        </CardContent>
      </FloatingCard>
    </div>
  )
}
