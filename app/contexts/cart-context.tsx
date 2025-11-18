'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { CartItem, Dish } from '@/lib/types'

// 扩展的 CartItem，包含唯一标识
interface CartItemWithId extends CartItem {
  _id: string  // 内部使用的唯一标识
}

interface CartContextType {
  items: CartItemWithId[]
  addItem: (
    dish: Dish,
    quantity?: number,
    notes?: string,
    selectedOptions?: { [optionId: string]: string[] },
    finalPrice?: number
  ) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  updateNotes: (itemId: string, notes: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// 生成购物车项的唯一标识
function generateCartItemId(
  dishId: string,
  selectedOptions?: { [optionId: string]: string[] }
): string {
  if (!selectedOptions || Object.keys(selectedOptions).length === 0) {
    return dishId
  }
  // 将选项排序后转成字符串，确保相同选项组合生成相同 ID
  const optionsStr = Object.keys(selectedOptions)
    .sort()
    .map(key => `${key}:${selectedOptions[key].sort().join(',')}`)
    .join('|')
  return `${dishId}__${optionsStr}`
}

// 比较两个选项对象是否相同
function areOptionsEqual(
  opt1?: { [key: string]: string[] },
  opt2?: { [key: string]: string[] }
): boolean {
  if (!opt1 && !opt2) return true
  if (!opt1 || !opt2) return false

  const keys1 = Object.keys(opt1).sort()
  const keys2 = Object.keys(opt2).sort()

  if (keys1.length !== keys2.length) return false

  return keys1.every(key => {
    const arr1 = opt1[key].sort()
    const arr2 = opt2[key]?.sort()
    return arr1.length === arr2?.length && arr1.every((val, i) => val === arr2[i])
  })
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemWithId[]>([])

  const addItem = useCallback((
    dish: Dish,
    quantity = 1,
    notes?: string,
    selectedOptions?: { [optionId: string]: string[] },
    finalPrice?: number
  ) => {
    setItems((prev) => {
      const itemId = generateCartItemId(dish.id, selectedOptions)
      const existingItem = prev.find((item) => item._id === itemId)

      if (existingItem) {
        // 相同菜品和相同选项，增加数量
        return prev.map((item) =>
          item._id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      // 新的购物车项
      return [...prev, {
        _id: itemId,
        dish,
        quantity,
        notes,
        selectedOptions,
        finalPrice: finalPrice || dish.price
      }]
    })
  }, [])

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item._id !== itemId))
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

  const updateNotes = useCallback((itemId: string, notes: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, notes } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.finalPrice || item.dish.price) * item.quantity,
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
