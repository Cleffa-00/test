'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { CartItem, Dish } from '@/lib/types'

interface CartContextType {
  items: CartItem[]
  addItem: (dish: Dish, quantity?: number, notes?: string) => void
  removeItem: (dishId: string) => void
  updateQuantity: (dishId: string, quantity: number) => void
  updateNotes: (dishId: string, notes: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((dish: Dish, quantity = 1, notes?: string) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.dish.id === dish.id)
      if (existingItem) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { dish, quantity, notes }]
    })
  }, [])

  const removeItem = useCallback((dishId: string) => {
    setItems((prev) => prev.filter((item) => item.dish.id !== dishId))
  }, [])

  const updateQuantity = useCallback((dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(dishId)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

  const updateNotes = useCallback((dishId: string, notes: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.dish.id === dishId ? { ...item, notes } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateNotes,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
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
