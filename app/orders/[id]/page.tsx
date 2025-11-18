'use client'

import { useParams } from 'next/navigation'
import { CheckCircle2, Clock, ChefHat, Package, ArrowLeft, Sparkles } from 'lucide-react'
import { OrderStatus } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string

  // 模拟订单状态
  const orderStatus: OrderStatus = 'pending'
  const estimatedTime = 25

  const statusConfig = {
    pending: { label: '待处理', icon: Clock },
    preparing: { label: '准备中', icon: ChefHat },
    ready: { label: '已完成', icon: Package },
    delivered: { label: '已送达', icon: CheckCircle2 },
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
      {/* Navigation */}
      <header className="sticky top-0 z-10 glass border-b border-border/40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/orders">
              <Button variant="ghost" className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" strokeWidth={1.5} />
              <h1 className="text-lg font-medium">订单详情</h1>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card className="mb-6 rounded-3xl soft-shadow border-border/50">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/5 rounded-full p-6 border border-primary/10">
                <StatusIcon className="h-16 w-16 text-foreground" strokeWidth={1.5} />
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">订单已提交</CardTitle>
            <p className="text-sm text-muted-foreground">订单号: {orderId}</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* 当前状态卡片 */}
            <div className="bg-secondary/50 rounded-2xl p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">当前状态</p>
              <Badge variant="secondary" className="rounded-full px-4 py-1 text-base">
                {currentStatus.label}
              </Badge>
              <p className="text-muted-foreground mt-4">
                预计 <span className="font-semibold text-foreground">{estimatedTime}</span> 分钟后完成
              </p>
            </div>

            {/* 进度时间线 */}
            <div className="space-y-1 relative">
              {/* 连接线 */}
              <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-border" />

              <div className="flex items-center gap-5 relative py-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background font-medium z-10 shrink-0">
                  ✓
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base">订单已提交</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 relative py-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-medium z-10 shrink-0 ${
                  isStepCompleted(1)
                    ? 'bg-foreground text-background'
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  {isStepCompleted(1) ? '✓' : '2'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base">开始准备</p>
                  <p className="text-sm text-muted-foreground">
                    厨房正在制作中...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 relative py-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-medium z-10 shrink-0 ${
                  isStepCompleted(2)
                    ? 'bg-foreground text-background'
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  {isStepCompleted(2) ? '✓' : '3'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base">准备完成</p>
                  <p className="text-sm text-muted-foreground">
                    可以取餐了
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 relative py-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-medium z-10 shrink-0 ${
                  isStepCompleted(3)
                    ? 'bg-foreground text-background'
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  {isStepCompleted(3) ? '✓' : '4'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base">已送达</p>
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
            <Button variant="outline" className="w-full rounded-full h-12">
              继续点餐
            </Button>
          </Link>
          <Link href="/orders" className="flex-1">
            <Button className="w-full rounded-full h-12">
              查看所有订单
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
