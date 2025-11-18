'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, ClipboardList, TrendingUp, Search, Eye } from 'lucide-react'
import { mockOrders } from '@/lib/mock-data'
import { OrderStatus } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [orders] = useState(mockOrders)

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (order.tableNumber && order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const statusConfig: Record<OrderStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
    pending: { label: '待处理', variant: 'secondary' },
    preparing: { label: '准备中', variant: 'default' },
    ready: { label: '已完成', variant: 'default' },
    delivered: { label: '已送达', variant: 'default' },
    cancelled: { label: '已取消', variant: 'destructive' },
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* 侧边栏 */}
        <aside className="w-64 border-r min-h-screen bg-muted/40">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-8">管理后台</h2>
            <nav className="space-y-2">
              <Link href="/admin">
                <Button variant="ghost" className="w-full justify-start">
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
                <Button variant="secondary" className="w-full justify-start">
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
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">订单管理</h1>
                <p className="text-muted-foreground">查看和管理所有订单</p>
              </div>
            </div>

            {/* 搜索 */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索订单号、顾客或桌号..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 订单表格 */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>订单号</TableHead>
                  <TableHead>顾客姓名</TableHead>
                  <TableHead>桌号</TableHead>
                  <TableHead>菜品数量</TableHead>
                  <TableHead>总金额</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>下单时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.tableNumber || '-'}</TableCell>
                    <TableCell>
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件
                    </TableCell>
                    <TableCell className="font-semibold">¥{order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={statusConfig[order.status].variant}>
                        {statusConfig[order.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.createdAt.toLocaleString('zh-CN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader className="pr-8">
                            <DialogTitle className="text-3xl">订单 {order.id}</DialogTitle>
                            <p className="text-sm text-muted-foreground mt-2">
                              下单时间: {order.createdAt.toLocaleString('zh-CN', {
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* 信息卡片 */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-secondary/50 p-4 rounded-2xl">
                                <p className="text-xs text-muted-foreground mb-1">顾客姓名</p>
                                <p className="font-semibold text-lg">{order.customerName}</p>
                              </div>
                              <div className="bg-secondary/50 p-4 rounded-2xl">
                                <p className="text-xs text-muted-foreground mb-1">桌号</p>
                                <p className="font-semibold text-lg">{order.tableNumber || '外卖'}</p>
                              </div>
                              <div className="bg-secondary/50 p-4 rounded-2xl">
                                <p className="text-xs text-muted-foreground mb-1">订单状态</p>
                                <Badge variant={statusConfig[order.status].variant} className="rounded-full mt-1">
                                  {statusConfig[order.status].label}
                                </Badge>
                              </div>
                              <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                                <p className="text-xs text-muted-foreground mb-1">总金额</p>
                                <p className="font-semibold text-2xl">¥{order.total.toFixed(2)}</p>
                              </div>
                            </div>

                            {order.notes && (
                              <div className="bg-secondary/30 p-4 rounded-2xl">
                                <p className="text-xs text-muted-foreground mb-2">备注</p>
                                <p className="font-medium">{order.notes}</p>
                              </div>
                            )}

                            {/* 订单菜品列表 */}
                            <div>
                              <p className="text-sm text-muted-foreground mb-3">订单菜品</p>
                              <div className="border border-border/50 rounded-2xl divide-y divide-border/50 overflow-hidden">
                                {order.items.map((item, index) => {
                                  // 生成选项摘要
                                  const getOptionsSummary = () => {
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

                                  const optionsSummary = getOptionsSummary()
                                  const itemPrice = item.finalPrice || item.dish.price

                                  return (
                                    <div key={index} className="p-4 hover:bg-secondary/30 transition-colors">
                                      <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4 flex-1">
                                          <div className="w-16 h-16 bg-muted rounded-xl overflow-hidden shrink-0">
                                            <img
                                              src={item.dish.image}
                                              alt={item.dish.name}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                                          <div className="flex-1">
                                            <p className="font-semibold text-base">{item.dish.name}</p>
                                            {optionsSummary && (
                                              <p className="text-xs text-muted-foreground mt-1">
                                                {optionsSummary}
                                              </p>
                                            )}
                                            <p className="text-sm text-muted-foreground mt-1">
                                              ¥{itemPrice} × {item.quantity}
                                            </p>
                                          </div>
                                        </div>
                                        <p className="font-semibold text-lg shrink-0 ml-4">
                                          ¥{(itemPrice * item.quantity).toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>

                            {/* 操作按钮 */}
                            <div className="flex gap-3 pt-2">
                              <Button variant="outline" className="flex-1 rounded-full h-12">
                                标记为准备中
                              </Button>
                              <Button className="flex-1 rounded-full h-12">
                                标记为已完成
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>没有找到相关订单</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
