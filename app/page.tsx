import Link from "next/link";
import { ShoppingCart, ChefHat, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* 导航栏 */}
      <nav className="border-b bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                美食餐厅
              </h1>
            </div>
            <div className="flex gap-4">
              <Link href="/menu">
                <Button>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  开始点餐
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline">
                  管理后台
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero 部分 */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            欢迎来到美食餐厅
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            品味经典川菜，享受美食时光。现代化的在线点餐系统，让您轻松选择心仪的菜品
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/menu">
              <Button size="lg" className="text-lg px-8 py-6">
                <ShoppingCart className="h-5 w-5 mr-2" />
                立即点餐
              </Button>
            </Link>
            <Link href="/orders">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                查看订单
              </Button>
            </Link>
          </div>
        </div>

        {/* 功能特点 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              快速出餐
            </h3>
            <p className="text-gray-600">
              点餐后平均 15-25 分钟即可享用美食，高效的厨房团队保证出餐速度
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              精选菜品
            </h3>
            <p className="text-gray-600">
              从经典川菜到清爽凉菜，精心挑选的菜品满足您的各种口味需求
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <ChefHat className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              大厨掌勺
            </h3>
            <p className="text-gray-600">
              经验丰富的大厨团队，确保每道菜品的口味和品质
            </p>
          </div>
        </div>

        {/* 菜品分类 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            菜品分类
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              '热菜',
              '凉菜',
              '主食',
              '汤类',
              '饮料',
              '甜点',
            ].map((category) => (
              <span
                key={category}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 text-gray-800 font-medium hover:shadow-md transition-shadow cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t bg-white/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>美食餐厅 © 2025 - 使用 Next.js 16、React 19、TypeScript 和 tRPC 构建</p>
        </div>
      </footer>
    </div>
  );
}
