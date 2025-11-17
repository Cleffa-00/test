'use client'

import { ArrowLeft } from 'lucide-react'
import { mockOrders } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/menu">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">我的订单</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Link key={order.id} href={`/orders/${order.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>订单 #{order.id}</CardTitle>
                      <CardDescription>
                        {order.createdAt.toLocaleString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </CardDescription>
                    </div>
                    <Badge variant={statusConfig[order.status].variant}>
                      {statusConfig[order.status].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">顾客姓名:</span>
                      <span className="font-medium">{order.customerName}</span>
                    </div>
                    {order.tableNumber && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">桌号:</span>
                        <span className="font-medium">{order.tableNumber}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">菜品数量:</span>
                      <span className="font-medium">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件
                      </span>
                    </div>
                    <div className="pt-3 border-t flex items-center justify-between">
                      <span className="font-medium">总计</span>
                      <span className="text-xl font-bold text-primary">
                        ¥{order.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {order.items.map((item) => item.dish.name).join(', ')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {mockOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">暂无订单</p>
              <Link href="/menu">
                <Button>开始点餐</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
