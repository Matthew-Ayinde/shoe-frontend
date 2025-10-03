"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { toast } from 'react-toastify'

export interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  category: string
  rating: number
  reviewCount: number
  inStock: boolean
  isOnSale: boolean
  dateAdded: Date
  priceHistory: Array<{
    price: number
    date: Date
  }>
}

export interface WishlistState {
  items: WishlistItem[]
  itemCount: number
  isLoading: boolean
  lastUpdated: Date
  priceDropAlerts: boolean
  stockAlerts: boolean
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Omit<WishlistItem, 'dateAdded' | 'priceHistory'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'TOGGLE_ITEM'; payload: Omit<WishlistItem, 'dateAdded' | 'priceHistory'> }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_PRICE'; payload: { id: string; newPrice: number } }
  | { type: 'UPDATE_STOCK'; payload: { id: string; inStock: boolean } }
  | { type: 'SET_ALERTS'; payload: { priceDropAlerts: boolean; stockAlerts: boolean } }

interface WishlistContextType {
  state: WishlistState
  addItem: (item: Omit<WishlistItem, 'dateAdded' | 'priceHistory'>) => void
  removeItem: (id: string) => void
  toggleItem: (item: Omit<WishlistItem, 'dateAdded' | 'priceHistory'>) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
  moveToCart: (id: string) => void
  updateAlertSettings: (priceDropAlerts: boolean, stockAlerts: boolean) => void
  getPriceDropItems: () => WishlistItem[]
  getBackInStockItems: () => WishlistItem[]
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        return state // Item already in wishlist
      }

      const newItem: WishlistItem = {
        ...action.payload,
        dateAdded: new Date(),
        priceHistory: [{ price: action.payload.price, date: new Date() }]
      }

      return {
        ...state,
        items: [...state.items, newItem],
        itemCount: state.itemCount + 1,
        lastUpdated: new Date()
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      
      return {
        ...state,
        items: newItems,
        itemCount: newItems.length,
        lastUpdated: new Date()
      }
    }

    case 'TOGGLE_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        // Remove item
        const newItems = state.items.filter(item => item.id !== action.payload.id)
        return {
          ...state,
          items: newItems,
          itemCount: newItems.length,
          lastUpdated: new Date()
        }
      } else {
        // Add item
        const newItem: WishlistItem = {
          ...action.payload,
          dateAdded: new Date(),
          priceHistory: [{ price: action.payload.price, date: new Date() }]
        }
        
        return {
          ...state,
          items: [...state.items, newItem],
          itemCount: state.itemCount + 1,
          lastUpdated: new Date()
        }
      }
    }

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
        itemCount: 0,
        lastUpdated: new Date()
      }

    case 'LOAD_WISHLIST': {
      const items = action.payload.map(item => ({
        ...item,
        dateAdded: new Date(item.dateAdded),
        priceHistory: item.priceHistory.map(p => ({
          ...p,
          date: new Date(p.date)
        }))
      }))

      return {
        ...state,
        items,
        itemCount: items.length,
        isLoading: false,
        lastUpdated: new Date()
      }
    }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }

    case 'UPDATE_PRICE': {
      const { id, newPrice } = action.payload
      const newItems = state.items.map(item => {
        if (item.id === id && item.price !== newPrice) {
          return {
            ...item,
            price: newPrice,
            priceHistory: [
              ...item.priceHistory,
              { price: newPrice, date: new Date() }
            ]
          }
        }
        return item
      })

      return {
        ...state,
        items: newItems,
        lastUpdated: new Date()
      }
    }

    case 'UPDATE_STOCK': {
      const { id, inStock } = action.payload
      const newItems = state.items.map(item => 
        item.id === id ? { ...item, inStock } : item
      )

      return {
        ...state,
        items: newItems,
        lastUpdated: new Date()
      }
    }

    case 'SET_ALERTS':
      return {
        ...state,
        priceDropAlerts: action.payload.priceDropAlerts,
        stockAlerts: action.payload.stockAlerts,
        lastUpdated: new Date()
      }

    default:
      return state
  }
}

const initialState: WishlistState = {
  items: [],
  itemCount: 0,
  isLoading: true,
  lastUpdated: new Date(),
  priceDropAlerts: true,
  stockAlerts: true
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const savedWishlist = localStorage.getItem('solestyle-wishlist')
        if (savedWishlist) {
          const wishlistData = JSON.parse(savedWishlist)
          if (wishlistData.items && Array.isArray(wishlistData.items)) {
            dispatch({ type: 'LOAD_WISHLIST', payload: wishlistData.items })
            
            if (wishlistData.priceDropAlerts !== undefined && wishlistData.stockAlerts !== undefined) {
              dispatch({ 
                type: 'SET_ALERTS', 
                payload: { 
                  priceDropAlerts: wishlistData.priceDropAlerts,
                  stockAlerts: wishlistData.stockAlerts
                }
              })
            }
            return
          }
        }
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error)
      }
      
      dispatch({ type: 'SET_LOADING', payload: false })
    }

    loadWishlist()
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      try {
        const wishlistData = {
          items: state.items,
          priceDropAlerts: state.priceDropAlerts,
          stockAlerts: state.stockAlerts,
          lastUpdated: state.lastUpdated.toISOString()
        }
        localStorage.setItem('solestyle-wishlist', JSON.stringify(wishlistData))
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error)
      }
    }
  }, [state.items, state.priceDropAlerts, state.stockAlerts, state.lastUpdated, state.isLoading])

  const addItem = (item: Omit<WishlistItem, 'dateAdded' | 'priceHistory'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
    toast.success(`${item.name} added to wishlist!`, {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  const removeItem = (id: string) => {
    const item = state.items.find(i => i.id === id)
    dispatch({ type: 'REMOVE_ITEM', payload: id })
    toast.info(`${item?.name || 'Item'} removed from wishlist`, {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  const toggleItem = (item: Omit<WishlistItem, 'dateAdded' | 'priceHistory'>) => {
    const isInWishlist = state.items.some(i => i.id === item.id)
    dispatch({ type: 'TOGGLE_ITEM', payload: item })
    
    if (isInWishlist) {
      toast.info(`${item.name} removed from wishlist`, {
        position: "bottom-right",
        autoClose: 2000,
      })
    } else {
      toast.success(`${item.name} added to wishlist!`, {
        position: "bottom-right",
        autoClose: 2000,
      })
    }
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
    toast.info('Wishlist cleared', {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  const isInWishlist = (id: string) => {
    return state.items.some(item => item.id === id)
  }

  const moveToCart = (id: string) => {
    // This would integrate with the cart context
    const item = state.items.find(i => i.id === id)
    if (item) {
      removeItem(id)
      toast.success(`${item.name} moved to cart!`, {
        position: "bottom-right",
        autoClose: 2000,
      })
    }
  }

  const updateAlertSettings = (priceDropAlerts: boolean, stockAlerts: boolean) => {
    dispatch({ type: 'SET_ALERTS', payload: { priceDropAlerts, stockAlerts } })
    toast.success('Alert settings updated', {
      position: "bottom-right",
      autoClose: 2000,
    })
  }

  const getPriceDropItems = () => {
    return state.items.filter(item => {
      if (item.priceHistory.length < 2) return false
      const currentPrice = item.price
      const previousPrice = item.priceHistory[item.priceHistory.length - 2].price
      return currentPrice < previousPrice
    })
  }

  const getBackInStockItems = () => {
    return state.items.filter(item => item.inStock)
  }

  const value: WishlistContextType = {
    state,
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
    isInWishlist,
    moveToCart,
    updateAlertSettings,
    getPriceDropItems,
    getBackInStockItems
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
