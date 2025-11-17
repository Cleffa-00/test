'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react'
import { useCart } from '@/app/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart()
  const [customerName, setCustomerName] = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [orderNotes, setOrderNotes] = useState('')

  const handleCheckout = () => {
    if (!customerName.trim()) {
      alert('请输入您的姓名')
      return
    }

    // 模拟下单
    const order = {
      id: `ORD${Date.now()}`,
      items,
      total: totalPrice,
      status: 'pending' as const,
      customerName,
      tableNumber: tableNumber || undefined,
      notes: orderNotes || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log('创建订单:', order)

    // 清空购物车
    clearCart()

    // 跳转到订单确认页面
    router.push(`/orders/${order.id}`)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/menu">
              <Button variant="ghost">
                <ArrowLeft className="h-5 w-5 mr-2" />
                返回菜单
              </Button>
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">购物车是空的</h2>
            <p className="text-muted-foreground mb-8">快去看看有什么好吃的吧！</p>
            <Link href="/menu">
              <Button>浏览菜单</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/menu">
              <Button variant="ghost">
                <ArrowLeft className="h-5 w-5 mr-2" />
                返回菜单
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">购物车</h1>
            <Button variant="ghost" onClick={clearCart}>
              <Trash2 className="h-5 w-5 mr-2" />
              清空
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 购物车商品列表 */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.dish.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{item.dish.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.dish.description}</p>
                          <p className="text-primary font-semibold mt-1">¥{item.dish.price}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.dish.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <span className="ml-auto font-semibold">
                          ¥{(item.dish.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      {item.notes && (
                        <p className="text-sm text-muted-foreground mt-2">
                          备注: {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 结算信息 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>订单信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">顾客姓名 *</label>
                  <Input
                    placeholder="请输入您的姓名"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">桌号（选填）</label>
                  <Input
                    placeholder="例如: A01"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">备注（选填）</label>
                  <Input
                    placeholder="特殊要求或备注"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">商品件数</span>
                    <span className="font-medium">{totalItems} 件</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>总计</span>
                    <span className="text-primary">¥{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  提交订单
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
