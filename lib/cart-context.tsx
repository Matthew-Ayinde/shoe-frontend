"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { toast } from 'react-toastify'

export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  category: string
  size: string
  color: string
  quantity: number
  maxQuantity: number
  inStock: boolean
}

export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isLoading: boolean
  lastUpdated: Date
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; size: string; color: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'APPLY_COUPON'; payload: { code: string; discount: number } }
  | { type: 'REMOVE_COUPON' }

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  getItemKey: (id: string, size: string, color: string) => string
  getCartItem: (id: string, size: string, color: string) => CartItem | undefined
  applyCoupon: (code: string) => Promise<boolean>
  removeCoupon: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { quantity = 1, ...item } = action.payload
      const itemKey = `${item.id}-${item.size}-${item.color}`
      const existingItemIndex = state.items.findIndex(
        i => `${i.id}-${i.size}-${i.color}` === itemKey
      )

      let newItems: CartItem[]
      
      if (existingItemIndex >= 0) {
        // Update existing item
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: Math.min(item.quantity + quantity, item.maxQuantity) }
            : item
        )
      } else {
        // Add new item
        newItems = [...state.items, { ...item, quantity }]
      }

      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total,
        itemCount,
        lastUpdated: new Date()
      }
    }

    case 'REMOVE_ITEM': {
      const { id, size, color } = action.payload
      const newItems = state.items.filter(
        item => !(item.id === id && item.size === size && item.color === color)
      )
      
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total,
        itemCount,
        lastUpdated: new Date()
      }
    }

    case 'UPDATE_QUANTITY': {
      const { id, size, color, quantity } = action.payload
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id, size, color } })
      }

      const newItems = state.items.map(item => 
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: Math.min(quantity, item.maxQuantity) }
          : item
      )

      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total,
        itemCount,
        lastUpdated: new Date()
      }
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
        lastUpdated: new Date()
      }

    case 'LOAD_CART': {
      const items = action.payload
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...state,
        items,
        total,
        itemCount,
        isLoading: false,
        lastUpdated: new Date()
      }
    }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: true,
  lastUpdated: new Date()
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('solestyle-cart')
        if (savedCart) {
          const cartData = JSON.parse(savedCart)
          // Validate cart data and check expiry
          if (cartData.items && Array.isArray(cartData.items)) {
            const expiryTime = 7 * 24 * 60 * 60 * 1000 // 7 days
            const isExpired = Date.now() - new Date(cartData.lastUpdated).getTime() > expiryTime
            
            if (!isExpired) {
              dispatch({ type: 'LOAD_CART', payload: cartData.items })
              return
            }
          }
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
      
      dispatch({ type: 'SET_LOADING', payload: false })
    }

    loadCart()
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      try {
        const cartData = {
          items: state.items,
          lastUpdated: state.lastUpdated.toISOString()
        }
        localStorage.setItem('solestyle-cart', JSON.stringify(cartData))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [state.items, state.lastUpdated, state.isLoading])

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    if (!item.inStock) {
      toast.error('This item is currently out of stock')
      return
    }

    dispatch({ type: 'ADD_ITEM', payload: item })
    toast.success(`${item.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  const removeItem = (id: string, size: string, color: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size, color } })
    toast.info('Item removed from cart', {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, color, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    toast.info('Cart cleared', {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  const getItemKey = (id: string, size: string, color: string) => {
    return `${id}-${size}-${color}`
  }

  const getCartItem = (id: string, size: string, color: string) => {
    return state.items.find(item => 
      item.id === id && item.size === size && item.color === color
    )
  }

  const applyCoupon = async (code: string): Promise<boolean> => {
    // Mock coupon validation
    const validCoupons = {
      'WELCOME10': 10,
      'SAVE20': 20,
      'NEWUSER15': 15,
      'FLASH25': 25
    }

    const discount = validCoupons[code as keyof typeof validCoupons]
    
    if (discount) {
      dispatch({ type: 'APPLY_COUPON', payload: { code, discount } })
      toast.success(`Coupon applied! ${discount}% off`, {
        position: "bottom-right",
        autoClose: 3000,
      })
      return true
    } else {
      toast.error('Invalid coupon code', {
        position: "bottom-right",
        autoClose: 3000,
      })
      return false
    }
  }

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' })
    toast.info('Coupon removed', {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemKey,
    getCartItem,
    applyCoupon,
    removeCoupon
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
