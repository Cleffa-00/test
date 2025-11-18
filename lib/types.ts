// 菜品选项 - 单个选择项
export interface DishOptionChoice {
  id: string
  name: string              // "小份", "不辣", "加鸡蛋"
  priceAdjustment: number   // 价格调整 +5, -3, 0
  default?: boolean         // 是否默认选中
}

// 菜品选项组
export interface DishOption {
  id: string
  type: 'radio' | 'checkbox'  // 单选或多选
  label: string               // "份量", "辣度", "加料"
  required: boolean           // 是否必选
  choices: DishOptionChoice[]
}

// 菜品类型
export interface Dish {
  id: string
  name: string
  description: string
  price: number               // 基础价格
  category: string
  image: string
  available: boolean
  preparationTime?: number    // 分钟
  options?: DishOption[]      // 可配置选项（可选）
}

// 购物车项目
export interface CartItem {
  dish: Dish
  quantity: number
  notes?: string
  selectedOptions?: {         // 选中的选项
    [optionId: string]: string[]  // optionId -> 选中的 choice ids
  }
  finalPrice?: number         // 根据选项计算的最终单价
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
