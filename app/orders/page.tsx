'use client'

import { ArrowLeft, Sparkles } from 'lucide-react'
import { mockOrders } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function OrdersPage() {
  const statusConfig = {
    pending: { label: '待处理', variant: 'secondary' as const },
    preparing: { label: '准备中', variant: 'default' as const },
    ready: { label: '已完成', variant: 'default' as const },
    delivered: { label: '已送达', variant: 'default' as const },
    cancelled: { label: '已取消', variant: 'destructive' as const },
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="glass border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/menu">
              <Button variant="ghost" className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" strokeWidth={1.5} />
              <h1 className="text-lg font-medium">我的订单</h1>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {mockOrders.length > 0 ? (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <Card className="rounded-3xl soft-shadow hover:soft-shadow-lg transition-all cursor-pointer border-border/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">订单 #{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {order.createdAt.toLocaleString('zh-CN', {
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <Badge variant={statusConfig[order.status].variant} className="rounded-full">
                        {statusConfig[order.status].label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">顾客</span>
                      <span className="font-medium">{order.customerName}</span>
                    </div>
                    {order.tableNumber && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">桌号</span>
                        <span className="font-medium">{order.tableNumber}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">菜品数量</span>
                      <span className="font-medium">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件
                      </span>
                    </div>
                    <div className="pt-3 border-t flex items-center justify-between">
                      <span className="font-medium">总计</span>
                      <span className="text-2xl font-semibold">
                        ¥{order.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground pt-2 border-t">
                      {order.items.map((item, idx) => (
                        <span key={idx}>
                          {item.dish.name} × {item.quantity}
                          {idx < order.items.length - 1 && '，'}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">暂无订单</p>
            <Link href="/menu">
              <Button className="rounded-full">开始点餐</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
