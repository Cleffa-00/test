// 菜品类型
export interface Dish {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
  preparationTime?: number // 分钟
}

// 购物车项目
export interface CartItem {
  dish: Dish
  quantity: number
  notes?: string
}

// 订单状态
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'

// 订单
export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: OrderStatus
  customerName: string
  tableNumber?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// 分类
export const CATEGORIES = [
  '热菜',
  '凉菜',
  '主食',
  '汤类',
  '饮料',
  '甜点',
] as const

export type Category = typeof CATEGORIES[number]
