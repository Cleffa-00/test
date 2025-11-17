import Link from "next/link";
import { ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Apple-style Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              <h1 className="text-lg font-medium tracking-tight">美食餐厅</h1>
            </div>
            <div className="flex gap-3">
              <Link href="/menu">
                <Button size="sm" className="rounded-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  开始点餐
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="rounded-full">
                  管理后台
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
              品味生活
              <br />
              <span className="text-muted-foreground">从美食开始</span>
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              简约而不简单的在线点餐体验
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/menu">
                <Button size="lg" className="rounded-full px-8 h-12 text-base soft-shadow">
                  浏览菜单
                </Button>
              </Link>
              <Link href="/orders">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base">
                  我的订单
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="group p-8 rounded-3xl bg-card border border-border soft-shadow hover:soft-shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 bg-foreground/80 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">简约设计</h3>
              <p className="text-muted-foreground leading-relaxed">
                受 Apple 启发的优雅界面，为您带来赏心悦目的点餐体验
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-card border border-border soft-shadow hover:soft-shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 bg-foreground/60 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">流畅体验</h3>
              <p className="text-muted-foreground leading-relaxed">
                精心打磨的交互细节，从浏览到下单，每一步都自然流畅
              </p>
            </div>

            <div className="group p-8 rounded-3xl bg-card border border-border soft-shadow hover:soft-shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 bg-foreground/40 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">品质保证</h3>
              <p className="text-muted-foreground leading-relaxed">
                精选食材，用心烹饪，为您呈现每一道美味佳肴
              </p>
            </div>
          </div>

          {/* Category Pills */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-8">探索分类</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['热菜', '凉菜', '主食', '汤类', '饮料', '甜点'].map((category) => (
                <span
                  key={category}
                  className="px-6 py-3 rounded-full bg-secondary text-foreground font-medium hover:bg-accent transition-colors cursor-pointer border border-border/50"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border/40 mt-20">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12 text-center">
            <p className="text-sm text-muted-foreground font-light">
              美食餐厅 © 2025 · Apple 风格设计
            </p>
            <p className="text-xs text-muted-foreground mt-2 font-light">
              Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · tRPC
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
