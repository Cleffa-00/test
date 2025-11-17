'use client'

import { useState } from 'react'
import { Search, Plus, ShoppingCart, Sparkles } from 'lucide-react'
import { mockDishes } from '@/lib/mock-data'
import { CATEGORIES, Dish } from '@/lib/types'
import { useCart } from '@/app/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
      {/* Navigation */}
      <header className="sticky top-0 z-10 glass border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" strokeWidth={1.5} />
              <h1 className="text-lg font-medium">美食餐厅</h1>
            </Link>
            <Link href="/cart">
              <Button variant="outline" className="rounded-full relative">
                <ShoppingCart className="h-4 w-4 mr-2" />
                购物车
                {totalItems > 0 && (
                  <Badge className="ml-2 px-2">{totalItems}</Badge>
                )}
              </Button>
            </Link>
          </div>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="搜索菜品..."
              className="pl-10 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Tabs defaultValue="全部" onValueChange={setSelectedCategory}>
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto bg-secondary/50 rounded-full p-1">
            <TabsTrigger value="全部" className="rounded-full">全部</TabsTrigger>
            {CATEGORIES.map((category) => (
              <TabsTrigger key={category} value={category} className="rounded-full">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => (
                <Card key={dish.id} className="overflow-hidden soft-shadow hover:soft-shadow-lg transition-all rounded-3xl border-border/50">
                  <div className="aspect-video bg-muted relative">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    {dish.preparationTime && dish.preparationTime > 0 && (
                      <Badge className="absolute top-3 right-3 rounded-full bg-background/90 text-foreground border-border/50">
                        {dish.preparationTime} 分钟
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{dish.name}</CardTitle>
                      <span className="text-lg font-semibold">¥{dish.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{dish.description}</p>
                  </CardHeader>
                  <CardFooter className="gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1 rounded-full" onClick={() => setSelectedDish(dish)}>
                          详情
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-3xl">
                        <DialogHeader>
                          <DialogTitle>{selectedDish?.name}</DialogTitle>
                          <DialogDescription>{selectedDish?.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="aspect-video bg-muted rounded-2xl overflow-hidden">
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
                              <p className="font-semibold text-xl">¥{selectedDish?.price}</p>
                            </div>
                          </div>
                          <Button
                            className="w-full rounded-full"
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
                    <Button onClick={() => handleAddToCart(dish)} className="rounded-full">
                      <Plus className="h-4 w-4 mr-2" />
                      加入
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {filteredDishes.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p>没有找到相关菜品</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Fixed Bottom Cart Summary */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 glass border-t border-border/40 p-4 safe-bottom">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">已选 {totalItems} 件</p>
              <p className="text-2xl font-semibold">¥{totalPrice.toFixed(2)}</p>
            </div>
            <Link href="/cart">
              <Button size="lg" className="rounded-full px-8">
                去结算
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
