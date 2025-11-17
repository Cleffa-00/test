'use client'

import Link from 'next/link'
import { ShoppingBag, ClipboardList, TrendingUp, DollarSign } from 'lucide-react'
import { mockDishes, mockOrders } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminDashboard() {
  // 计算统计数据
  const totalOrders = mockOrders.length
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = mockOrders.filter(order => order.status === 'pending' || order.status === 'preparing').length
  const totalDishes = mockDishes.length

  return (
    <div className="min-h-screen bg-background">
      {/* 侧边栏 */}
      <div className="flex">
        <aside className="w-64 border-r min-h-screen bg-muted/40">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-8">管理后台</h2>
            <nav className="space-y-2">
              <Link href="/admin">
                <Button variant="secondary" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  仪表盘
                </Button>
              </Link>
              <Link href="/admin/dishes">
                <Button variant="ghost" className="w-full justify-start">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  菜品管理
                </Button>
              </Link>
              <Link href="/admin/orders">
                <Button variant="ghost" className="w-full justify-start">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  订单管理
                </Button>
              </Link>
            </nav>
          </div>
          <div className="absolute bottom-4 left-4 right-4 px-2">
            <Link href="/">
              <Button variant="outline" className="w-full">
                返回前台
              </Button>
            </Link>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">仪表盘</h1>
            <p className="text-muted-foreground">欢迎回来，查看今日运营数据</p>
          </div>

          {/* 统计卡片 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  总订单数
                </CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +20% 较昨日
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  总营业额
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥{totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +15% 较昨日
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  待处理订单
                </CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingOrders}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  需要及时处理
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  菜品总数
                </CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalDishes}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockDishes.filter(d => d.available).length} 个在售
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 最近订单 */}
          <Card>
            <CardHeader>
              <CardTitle>最近订单</CardTitle>
              <CardDescription>查看最新的客户订单</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium">订单 #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerName} - {order.tableNumber || '外卖'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">¥{order.total.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.createdAt.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/admin/orders">
                <Button variant="outline" className="w-full mt-4">
                  查看所有订单
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
