'use client'

import { useState, useEffect } from 'react'
import { Search, Plus, ShoppingCart, Sparkles, Clock, Tag } from 'lucide-react'
import { mockDishes } from '@/lib/mock-data'
import { CATEGORIES, Dish } from '@/lib/types'
import { useCart } from '@/app/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Link from 'next/link'

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<{ [optionId: string]: string[] }>({})
  const [dialogOpen, setDialogOpen] = useState(false)
  const { addItem, totalItems, totalPrice } = useCart()

  const filteredDishes = mockDishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === '全部' || dish.category === selectedCategory
    return matchesSearch && matchesCategory && dish.available
  })

  // 当选择菜品时，初始化选项
  useEffect(() => {
    if (selectedDish && dialogOpen) {
      const defaultOptions: { [optionId: string]: string[] } = {}
      selectedDish.options?.forEach(option => {
        const defaultChoices = option.choices.filter(c => c.default).map(c => c.id)
        if (defaultChoices.length > 0) {
          defaultOptions[option.id] = defaultChoices
        } else if (option.required && option.type === 'radio' && option.choices.length > 0) {
          // 如果必选且没有默认值，选择第一个
          defaultOptions[option.id] = [option.choices[0].id]
        }
      })
      setSelectedOptions(defaultOptions)
    }
  }, [selectedDish, dialogOpen])

  // 计算最终价格
  const calculateFinalPrice = () => {
    if (!selectedDish) return 0
    let price = selectedDish.price

    Object.entries(selectedOptions).forEach(([optionId, choiceIds]) => {
      const option = selectedDish.options?.find(o => o.id === optionId)
      choiceIds.forEach(choiceId => {
        const choice = option?.choices.find(c => c.id === choiceId)
        if (choice) price += choice.priceAdjustment
      })
    })

    return price
  }

  // 处理单选选项
  const handleRadioChange = (optionId: string, choiceId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: [choiceId]
    }))
  }

  // 处理多选选项
  const handleCheckboxChange = (optionId: string, choiceId: string, checked: boolean) => {
    setSelectedOptions(prev => {
      const current = prev[optionId] || []
      if (checked) {
        return { ...prev, [optionId]: [...current, choiceId] }
      } else {
        return { ...prev, [optionId]: current.filter(id => id !== choiceId) }
      }
    })
  }

  // 验证必选项
  const validateOptions = () => {
    if (!selectedDish || !selectedDish.options) return true

    return selectedDish.options.every(option => {
      if (!option.required) return true
      return selectedOptions[option.id]?.length > 0
    })
  }

  // 加入购物车
  const handleAddToCart = () => {
    if (!selectedDish) return

    if (!validateOptions()) {
      alert('请选择必填选项')
      return
    }

    const finalPrice = calculateFinalPrice()
    addItem(selectedDish, 1, undefined, selectedOptions, finalPrice)
    setDialogOpen(false)
  }

  // 快速加入购物车（无选项或使用默认选项）
  const handleQuickAddToCart = (dish: Dish) => {
    if (dish.options && dish.options.length > 0) {
      // 有选项的菜品，打开详情 Modal
      setSelectedDish(dish)
      setDialogOpen(true)
    } else {
      // 无选项，直接加入
      addItem(dish, 1, undefined, {}, dish.price)
    }
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
                    <Dialog open={dialogOpen && selectedDish?.id === dish.id} onOpenChange={(open) => {
                      if (!open) {
                        setDialogOpen(false)
                        setSelectedDish(null)
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1 rounded-full" onClick={() => {
                          setSelectedDish(dish)
                          setDialogOpen(true)
                        }}>
                          详情
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader className="pr-8">
                          <DialogTitle className="text-3xl">{selectedDish?.name}</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* 图片 */}
                          <div className="aspect-[16/10] bg-muted rounded-3xl overflow-hidden">
                            <img
                              src={selectedDish?.image || ''}
                              alt={selectedDish?.name || ''}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* 描述 */}
                          <div className="space-y-2">
                            <p className="text-muted-foreground leading-relaxed text-lg">
                              {selectedDish?.description}
                            </p>
                          </div>

                          {/* 信息卡片 */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-secondary/50 p-4 rounded-2xl text-center">
                              <Tag className="h-5 w-5 mx-auto mb-2 text-muted-foreground" strokeWidth={1.5} />
                              <p className="text-xs text-muted-foreground mb-1">分类</p>
                              <p className="font-semibold">{selectedDish?.category}</p>
                            </div>
                            <div className="bg-secondary/50 p-4 rounded-2xl text-center">
                              <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" strokeWidth={1.5} />
                              <p className="text-xs text-muted-foreground mb-1">准备时间</p>
                              <p className="font-semibold">{selectedDish?.preparationTime || 0} 分钟</p>
                            </div>
                          </div>

                          {/* 配置选项 */}
                          {selectedDish?.options && selectedDish.options.length > 0 && (
                            <div className="space-y-5">
                              {selectedDish.options.map(option => (
                                <div key={option.id} className="bg-secondary/30 p-5 rounded-2xl space-y-3">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-base">{option.label}</h3>
                                    {option.required && <span className="text-red-500 text-sm">*</span>}
                                    {!option.required && <span className="text-xs text-muted-foreground">（可选）</span>}
                                  </div>

                                  {option.type === 'radio' && (
                                    <div className="grid grid-cols-3 gap-3">
                                      {option.choices.map(choice => {
                                        const isSelected = selectedOptions[option.id]?.includes(choice.id)
                                        return (
                                          <button
                                            key={choice.id}
                                            onClick={() => handleRadioChange(option.id, choice.id)}
                                            className={`p-3 rounded-xl border-2 transition-all text-center ${
                                              isSelected
                                                ? 'bg-foreground text-background border-foreground'
                                                : 'bg-white border-border hover:border-foreground/50'
                                            }`}
                                          >
                                            <p className="font-medium text-sm">{choice.name}</p>
                                            {choice.priceAdjustment !== 0 && (
                                              <p className={`text-xs mt-1 ${isSelected ? 'text-background/70' : 'text-muted-foreground'}`}>
                                                {choice.priceAdjustment > 0 ? '+' : ''}{choice.priceAdjustment}元
                                              </p>
                                            )}
                                          </button>
                                        )
                                      })}
                                    </div>
                                  )}

                                  {option.type === 'checkbox' && (
                                    <div className="space-y-2">
                                      {option.choices.map(choice => {
                                        const isChecked = selectedOptions[option.id]?.includes(choice.id) || false
                                        return (
                                          <label
                                            key={choice.id}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-colors cursor-pointer"
                                          >
                                            <Checkbox
                                              checked={isChecked}
                                              onCheckedChange={(checked) =>
                                                handleCheckboxChange(option.id, choice.id, checked as boolean)
                                              }
                                            />
                                            <span className="flex-1 font-medium text-sm">{choice.name}</span>
                                            {choice.priceAdjustment !== 0 && (
                                              <span className="text-sm text-muted-foreground">
                                                {choice.priceAdjustment > 0 ? '+' : ''}{choice.priceAdjustment}元
                                              </span>
                                            )}
                                          </label>
                                        )
                                      })}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* 价格 */}
                          <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 text-center">
                            <p className="text-xs text-muted-foreground mb-1">总价</p>
                            <p className="font-semibold text-3xl">¥{calculateFinalPrice()}</p>
                            {calculateFinalPrice() !== selectedDish?.price && (
                              <p className="text-sm text-muted-foreground mt-1">
                                基础价格 ¥{selectedDish?.price}
                              </p>
                            )}
                          </div>

                          {/* 按钮 */}
                          <Button
                            className="w-full rounded-full h-12 text-base"
                            size="lg"
                            onClick={handleAddToCart}
                          >
                            <Plus className="h-5 w-5 mr-2" />
                            加入购物车
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button onClick={() => handleQuickAddToCart(dish)} className="rounded-full">
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
