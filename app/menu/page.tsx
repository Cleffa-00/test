'use client'

import { useState } from 'react'
import { Search, Plus, ShoppingCart } from 'lucide-react'
import { mockDishes } from '@/lib/mock-data'
import { CATEGORIES, Dish } from '@/lib/types'
import { useCart } from '@/app/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Link from 'next/link'

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
  const { addItem, totalItems, totalPrice } = useCart()

  const filteredDishes = mockDishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === '全部' || dish.category === selectedCategory
    return matchesSearch && matchesCategory && dish.available
  })

  const handleAddToCart = (dish: Dish) => {
    addItem(dish)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">美食餐厅</h1>
            <Link href="/cart">
              <Button variant="outline" className="relative">
                <ShoppingCart className="h-5 w-5 mr-2" />
                购物车
                {totalItems > 0 && (
                  <Badge className="ml-2 px-2">{totalItems}</Badge>
                )}
              </Button>
            </Link>
          </div>
          {/* 搜索框 */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="搜索菜品..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* 主体内容 */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="全部" onValueChange={setSelectedCategory}>
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
            <TabsTrigger value="全部">全部</TabsTrigger>
            {CATEGORIES.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDishes.map((dish) => (
                <Card key={dish.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    {dish.preparationTime && dish.preparationTime > 0 && (
                      <Badge className="absolute top-2 right-2">
                        {dish.preparationTime} 分钟
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{dish.name}</span>
                      <span className="text-primary">¥{dish.price}</span>
                    </CardTitle>
                    <CardDescription>{dish.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1" onClick={() => setSelectedDish(dish)}>
                          详情
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{selectedDish?.name}</DialogTitle>
                          <DialogDescription>{selectedDish?.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                            <img
                              src={selectedDish?.image || ''}
                              alt={selectedDish?.name || ''}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">分类</p>
                              <p className="font-medium">{selectedDish?.category}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">准备时间</p>
                              <p className="font-medium">{selectedDish?.preparationTime || 0} 分钟</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">价格</p>
                              <p className="font-medium text-primary text-xl">¥{selectedDish?.price}</p>
                            </div>
                          </div>
                          <Button
                            className="w-full"
                            onClick={() => {
                              if (selectedDish) handleAddToCart(selectedDish)
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            加入购物车
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button onClick={() => handleAddToCart(dish)}>
                      <Plus className="h-4 w-4 mr-2" />
                      加入
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {filteredDishes.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>没有找到相关菜品</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* 底部购物车摘要 */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">已选 {totalItems} 件</p>
              <p className="text-xl font-bold text-primary">¥{totalPrice.toFixed(2)}</p>
            </div>
            <Link href="/cart">
              <Button size="lg">
                去结算
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
