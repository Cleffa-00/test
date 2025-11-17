'use client'

import { useParams } from 'next/navigation'
import { CheckCircle2, Clock, ChefHat, Package } from 'lucide-react'
import { OrderStatus } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string

  // 模拟订单状态
  const orderStatus: OrderStatus = 'pending'
  const estimatedTime = 25

  const statusConfig = {
    pending: { label: '待处理', icon: Clock, color: 'bg-yellow-500' },
    preparing: { label: '准备中', icon: ChefHat, color: 'bg-blue-500' },
    ready: { label: '已完成', icon: Package, color: 'bg-green-500' },
    delivered: { label: '已送达', icon: CheckCircle2, color: 'bg-green-600' },
  }

  const currentStatus = statusConfig[orderStatus as keyof typeof statusConfig]
  const StatusIcon = currentStatus.icon

  // Helper functions to check order progress
  const isStepCompleted = (step: number): boolean => {
    const statusOrder: OrderStatus[] = ['pending', 'preparing', 'ready', 'delivered']
    const currentIndex = statusOrder.indexOf(orderStatus)
    return currentIndex >= step
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">订单详情</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`${currentStatus.color} rounded-full p-4`}>
                <StatusIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">订单已提交</CardTitle>
            <CardDescription>
              订单号: {orderId}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">当前状态</p>
              <Badge className={currentStatus.color}>
                {currentStatus.label}
              </Badge>
              <p className="text-sm text-muted-foreground mt-3">
                预计 {estimatedTime} 分钟后完成
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="font-medium">订单已提交</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  isStepCompleted(1)
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isStepCompleted(1) ? '✓' : '2'}
                </div>
                <div className="flex-1">
                  <p className="font-medium">开始准备</p>
                  <p className="text-sm text-muted-foreground">
                    厨房正在制作中...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  isStepCompleted(2)
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isStepCompleted(2) ? '✓' : '3'}
                </div>
                <div className="flex-1">
                  <p className="font-medium">准备完成</p>
                  <p className="text-sm text-muted-foreground">
                    可以取餐了
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  isStepCompleted(3)
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isStepCompleted(3) ? '✓' : '4'}
                </div>
                <div className="flex-1">
                  <p className="font-medium">已送达</p>
                  <p className="text-sm text-muted-foreground">
                    享用美食吧
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Link href="/menu" className="flex-1">
            <Button variant="outline" className="w-full">
              继续点餐
            </Button>
          </Link>
          <Link href="/orders" className="flex-1">
            <Button className="w-full">
              查看所有订单
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
