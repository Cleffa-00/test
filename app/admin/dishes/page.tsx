'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, ClipboardList, TrendingUp, Plus, Pencil, Trash2, Search } from 'lucide-react'
import { mockDishes } from '@/lib/mock-data'
import { CATEGORIES } from '@/lib/types'
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function AdminDishesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [dishes] = useState(mockDishes)

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dish.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
                <Button variant="secondary" className="w-full justify-start">
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
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">菜品管理</h1>
                <p className="text-muted-foreground">管理餐厅的所有菜品</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    添加菜品
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>添加新菜品</DialogTitle>
                    <DialogDescription>
                      填写菜品信息以添加到菜单
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">菜品名称</label>
                      <Input placeholder="例如：宫保鸡丁" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">描述</label>
                      <Input placeholder="简要描述菜品特色" className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">价格（元）</label>
                        <Input type="number" placeholder="38" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">准备时间（分钟）</label>
                        <Input type="number" placeholder="15" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">分类</label>
                      <select className="w-full mt-1 h-9 rounded-md border border-input bg-transparent px-3 py-1">
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">取消</Button>
                    <Button>添加菜品</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* 搜索 */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索菜品名称或分类..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 菜品表格 */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>菜品名称</TableHead>
                  <TableHead>分类</TableHead>
                  <TableHead>价格</TableHead>
                  <TableHead>准备时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDishes.map((dish) => (
                  <TableRow key={dish.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{dish.name}</p>
                          <p className="text-sm text-muted-foreground">{dish.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{dish.category}</TableCell>
                    <TableCell>¥{dish.price}</TableCell>
                    <TableCell>{dish.preparationTime || 0} 分钟</TableCell>
                    <TableCell>
                      <Badge variant={dish.available ? 'default' : 'secondary'}>
                        {dish.available ? '在售' : '下架'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredDishes.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>没有找到相关菜品</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
