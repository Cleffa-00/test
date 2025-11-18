'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Trash2, ArrowLeft, Sparkles } from 'lucide-react'
import { useCart } from '@/app/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart()
  const [customerName, setCustomerName] = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [orderNotes, setOrderNotes] = useState('')

  // 生成选项摘要文本
  const getOptionsSummary = (item: typeof items[0]) => {
    if (!item.selectedOptions || !item.dish.options) return null

    const summaryParts: string[] = []
    Object.entries(item.selectedOptions).forEach(([optionId, choiceIds]) => {
      const option = item.dish.options?.find(o => o.id === optionId)
      if (option) {
        const selectedChoices = choiceIds.map(choiceId => {
          const choice = option.choices.find(c => c.id === choiceId)
          return choice?.name
        }).filter(Boolean)
        if (selectedChoices.length > 0) {
          summaryParts.push(selectedChoices.join('、'))
        }
      }
    })

    return summaryParts.length > 0 ? summaryParts.join(' | ') : null
  }

  const handleCheckout = () => {
    if (!customerName.trim()) {
      alert('请输入您的姓名')
      return
    }

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
    clearCart()
    router.push(`/orders/${order.id}`)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="glass border-b border-border/40">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <Link href="/menu">
              <Button variant="ghost" className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回菜单
              </Button>
            </Link>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold mb-4">购物车是空的</h2>
          <p className="text-muted-foreground mb-8">快去看看有什么好吃的吧</p>
          <Link href="/menu">
            <Button className="rounded-full px-8">浏览菜单</Button>
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="glass border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/menu">
              <Button variant="ghost" className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回菜单
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" strokeWidth={1.5} />
              <h1 className="text-lg font-medium">购物车</h1>
            </div>
            <Button variant="ghost" onClick={clearCart} className="rounded-full">
              <Trash2 className="h-4 w-4 mr-2" />
              清空
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const optionsSummary = getOptionsSummary(item)
              const itemPrice = item.finalPrice || item.dish.price

              return (
                <Card key={item._id} className="rounded-3xl soft-shadow border-border/50">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-muted rounded-2xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{item.dish.name}</h3>
                            {optionsSummary && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {optionsSummary}
                              </p>
                            )}
                            <p className="font-semibold mt-2 text-lg">¥{itemPrice}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item._id)}
                            className="rounded-full"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="rounded-full h-9 w-9"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="rounded-full h-9 w-9"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <span className="ml-auto font-semibold text-lg">
                            ¥{(itemPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 rounded-3xl soft-shadow border-border/50">
              <CardHeader>
                <CardTitle>订单信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">顾客姓名 *</label>
                  <Input
                    placeholder="请输入您的姓名"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">桌号（选填）</label>
                  <Input
                    placeholder="例如: A01"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">备注（选填）</label>
                  <Input
                    placeholder="特殊要求或备注"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="rounded-full"
                  />
                </div>
                <div className="pt-4 border-t space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">商品件数</span>
                    <span className="font-medium">{totalItems} 件</span>
                  </div>
                  <div className="flex justify-between text-xl font-semibold">
                    <span>总计</span>
                    <span>¥{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full rounded-full" size="lg" onClick={handleCheckout}>
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
