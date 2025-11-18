'use client'

import Link from 'next/link'
import { ShoppingBag, ClipboardList, TrendingUp, DollarSign, Sparkles } from 'lucide-react'
import { mockDishes, mockOrders } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminDashboard() {
  const totalOrders = mockOrders.length
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = mockOrders.filter(order => order.status === 'pending' || order.status === 'preparing').length
  const totalDishes = mockDishes.length

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/40 min-h-screen bg-secondary/30">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="h-5 w-5" strokeWidth={1.5} />
              <h2 className="text-lg font-semibold">管理后台</h2>
            </div>
            <nav className="space-y-1">
              <Link href="/admin">
                <Button variant="secondary" className="w-full justify-start rounded-full">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  仪表盘
                </Button>
              </Link>
              <Link href="/admin/dishes">
                <Button variant="ghost" className="w-full justify-start rounded-full">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  菜品管理
                </Button>
              </Link>
              <Link href="/admin/orders">
                <Button variant="ghost" className="w-full justify-start rounded-full">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  订单管理
                </Button>
              </Link>
            </nav>
          </div>
          <div className="absolute bottom-6 left-4 right-4 px-2">
            <Link href="/">
              <Button variant="outline" className="w-full rounded-full">
                返回前台
              </Button>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight mb-2">仪表盘</h1>
            <p className="text-muted-foreground">欢迎回来，查看今日运营数据</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="rounded-3xl soft-shadow border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  总订单数
                </CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{totalOrders}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +20% 较昨日
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl soft-shadow border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  总营业额
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">¥{totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +15% 较昨日
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl soft-shadow border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  待处理订单
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{pendingOrders}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  需要及时处理
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl soft-shadow border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  菜品总数
                </CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{totalDishes}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockDishes.filter(d => d.available).length} 个在售
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card className="rounded-3xl soft-shadow border-border/50">
            <CardHeader>
              <CardTitle>最近订单</CardTitle>
              <p className="text-sm text-muted-foreground">查看最新的客户订单</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b border-border/40 pb-4 last:border-0">
                    <div>
                      <p className="font-medium">订单 #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerName} · {order.tableNumber || '外卖'}
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
                <Button variant="outline" className="w-full mt-6 rounded-full">
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
