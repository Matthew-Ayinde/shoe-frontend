/**
 * Advanced caching system for performance optimization
 * Supports memory cache, localStorage, and IndexedDB
 */

import { useState, useEffect } from 'react'

interface CacheItem<T = any> {
  data: T
  timestamp: number
  expiry: number
  version: string
  tags: string[]
}

interface CacheOptions {
  ttl?: number // Time to live in milliseconds
  version?: string // Cache version for invalidation
  tags?: string[] // Tags for bulk invalidation
  storage?: 'memory' | 'localStorage' | 'indexedDB'
  compress?: boolean // Compress data before storing
}

class CacheManager {
  private memoryCache = new Map<string, CacheItem>()
  private readonly defaultTTL = 5 * 60 * 1000 // 5 minutes
  private readonly maxMemoryItems = 100
  private readonly storagePrefix = 'sf_cache_'

  /**
   * Set cache item
   */
  async set<T>(
    key: string, 
    data: T, 
    options: CacheOptions = {}
  ): Promise<void> {
    const {
      ttl = this.defaultTTL,
      version = '1.0',
      tags = [],
      storage = 'memory',
      compress = false
    } = options

    const item: CacheItem<T> = {
      data: compress ? this.compress(data) : data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl,
      version,
      tags
    }

    switch (storage) {
      case 'memory':
        this.setMemoryCache(key, item)
        break
      case 'localStorage':
        await this.setLocalStorageCache(key, item)
        break
      case 'indexedDB':
        await this.setIndexedDBCache(key, item)
        break
    }
  }

  /**
   * Get cache item
   */
  async get<T>(
    key: string, 
    storage: 'memory' | 'localStorage' | 'indexedDB' = 'memory'
  ): Promise<T | null> {
    let item: CacheItem<T> | null = null

    switch (storage) {
      case 'memory':
        item = this.getMemoryCache<T>(key)
        break
      case 'localStorage':
        item = await this.getLocalStorageCache<T>(key)
        break
      case 'indexedDB':
        item = await this.getIndexedDBCache<T>(key)
        break
    }

    if (!item) return null

    // Check if expired
    if (Date.now() > item.expiry) {
      await this.delete(key, storage)
      return null
    }

    return item.data
  }

  /**
   * Delete cache item
   */
  async delete(
    key: string, 
    storage: 'memory' | 'localStorage' | 'indexedDB' = 'memory'
  ): Promise<void> {
    switch (storage) {
      case 'memory':
        this.memoryCache.delete(key)
        break
      case 'localStorage':
        localStorage.removeItem(this.storagePrefix + key)
        break
      case 'indexedDB':
        await this.deleteIndexedDBCache(key)
        break
    }
  }

  /**
   * Clear all cache
   */
  async clear(storage?: 'memory' | 'localStorage' | 'indexedDB'): Promise<void> {
    if (!storage || storage === 'memory') {
      this.memoryCache.clear()
    }

    if (!storage || storage === 'localStorage') {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(this.storagePrefix)) {
          localStorage.removeItem(key)
        }
      })
    }

    if (!storage || storage === 'indexedDB') {
      await this.clearIndexedDBCache()
    }
  }

  /**
   * Invalidate cache by tags
   */
  async invalidateByTags(
    tags: string[], 
    storage: 'memory' | 'localStorage' | 'indexedDB' = 'memory'
  ): Promise<void> {
    switch (storage) {
      case 'memory':
        for (const [key, item] of this.memoryCache.entries()) {
          if (item.tags.some(tag => tags.includes(tag))) {
            this.memoryCache.delete(key)
          }
        }
        break
      case 'localStorage':
        const keys = Object.keys(localStorage)
        for (const key of keys) {
          if (key.startsWith(this.storagePrefix)) {
            const item = await this.getLocalStorageCache(key.replace(this.storagePrefix, ''))
            if (item && item.tags.some(tag => tags.includes(tag))) {
              localStorage.removeItem(key)
            }
          }
        }
        break
      case 'indexedDB':
        // Implementation would require iterating through IndexedDB
        break
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const memorySize = this.memoryCache.size
    const localStorageSize = Object.keys(localStorage)
      .filter(key => key.startsWith(this.storagePrefix)).length

    return {
      memory: {
        items: memorySize,
        maxItems: this.maxMemoryItems,
        usage: `${memorySize}/${this.maxMemoryItems}`
      },
      localStorage: {
        items: localStorageSize,
        estimatedSize: this.getLocalStorageSize()
      }
    }
  }

  // Private methods
  private setMemoryCache<T>(key: string, item: CacheItem<T>): void {
    // Implement LRU eviction if needed
    if (this.memoryCache.size >= this.maxMemoryItems) {
      const firstKey = this.memoryCache.keys().next().value
      this.memoryCache.delete(firstKey)
    }
    this.memoryCache.set(key, item)
  }

  private getMemoryCache<T>(key: string): CacheItem<T> | null {
    return this.memoryCache.get(key) || null
  }

  private async setLocalStorageCache<T>(key: string, item: CacheItem<T>): Promise<void> {
    try {
      localStorage.setItem(
        this.storagePrefix + key, 
        JSON.stringify(item)
      )
    } catch (error) {
      console.warn('localStorage cache set failed:', error)
    }
  }

  private async getLocalStorageCache<T>(key: string): Promise<CacheItem<T> | null> {
    try {
      const item = localStorage.getItem(this.storagePrefix + key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.warn('localStorage cache get failed:', error)
      return null
    }
  }

  private async setIndexedDBCache<T>(key: string, item: CacheItem<T>): Promise<void> {
    // IndexedDB implementation
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('StepForwardCache', 1)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(['cache'], 'readwrite')
        const store = transaction.objectStore('cache')
        store.put({ key, ...item })
        transaction.oncomplete = () => resolve()
      }
      
      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' })
        }
      }
    })
  }

  private async getIndexedDBCache<T>(key: string): Promise<CacheItem<T> | null> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('StepForwardCache', 1)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(['cache'], 'readonly')
        const store = transaction.objectStore('cache')
        const getRequest = store.get(key)
        
        getRequest.onsuccess = () => {
          const result = getRequest.result
          resolve(result ? { ...result, key: undefined } : null)
        }
      }
    })
  }

  private async deleteIndexedDBCache(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('StepForwardCache', 1)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(['cache'], 'readwrite')
        const store = transaction.objectStore('cache')
        store.delete(key)
        transaction.oncomplete = () => resolve()
      }
    })
  }

  private async clearIndexedDBCache(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('StepForwardCache', 1)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(['cache'], 'readwrite')
        const store = transaction.objectStore('cache')
        store.clear()
        transaction.oncomplete = () => resolve()
      }
    })
  }

  private compress<T>(data: T): string {
    // Simple compression using JSON.stringify
    // In production, consider using a proper compression library
    return JSON.stringify(data)
  }

  private getLocalStorageSize(): string {
    let total = 0
    for (const key in localStorage) {
      if (key.startsWith(this.storagePrefix)) {
        total += localStorage[key].length
      }
    }
    return `${Math.round(total / 1024)}KB`
  }
}

// Singleton instance
export const cacheManager = new CacheManager()

// Utility functions
export const withCache = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): Promise<T> => {
  const cached = await cacheManager.get<T>(key, options.storage)
  if (cached !== null) {
    return cached
  }

  const data = await fetcher()
  await cacheManager.set(key, data, options)
  return data
}

// React hook for cached data
export const useCachedData = <T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await withCache(key, fetcher, options)
        setData(result)
        setError(null)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [key])

  return { data, loading, error, refetch: () => fetchData() }
}
