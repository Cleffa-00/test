# 项目技术文档

这份文档面向 AI 助手和开发者，提供项目的技术栈说明和开发指导。

## 技术栈

### 核心框架
- **Next.js 16** - React 框架，使用 App Router
- **React 19** - UI 库
- **TypeScript 5** - 类型安全
- **pnpm** - 包管理器（必须使用，不要混用 npm/yarn）

### UI 与样式
- **Tailwind CSS 4** - CSS 框架
- **shadcn/ui** - 基于 Radix UI 的组件库
- **Lucide Icons** - 图标库
- **Apple 风格设计** - 纯黑白灰配色 + 玻璃拟态效果

### 数据与 API
- **tRPC 11** - 端到端类型安全的 API
- **TanStack Query 5** - 数据同步与缓存（集成在 tRPC 中）
- **Zod 4** - 运行时验证
- **superjson** - 数据序列化（支持 Date, Map, Set 等）

### 状态管理
- **React Context** - 用于购物车等全局状态
- **tRPC + TanStack Query** - 服务端状态管理

## 设计规范

### 配色方案（纯黑白灰）

```css
/* 亮色模式 */
--background: 0 0% 100%;      /* 白色背景 */
--foreground: 0 0% 5%;        /* 深灰/黑色文字 */
--primary: 0 0% 9%;           /* 黑色主色 */
--secondary: 0 0% 96%;        /* 浅灰次要色 */
--muted: 0 0% 96%;            /* 中灰 */
--border: 0 0% 90%;           /* 浅灰边框 */

/* 暗色模式 */
--background: 0 0% 5%;        /* 深灰背景 */
--foreground: 0 0% 98%;       /* 白色文字 */
--primary: 0 0% 98%;          /* 白色主色 */
--secondary: 0 0% 15%;        /* 深灰次要色 */
```

### Apple 风格设计元素

**圆角**
- 大卡片: `rounded-3xl` (1rem)
- 按钮: `rounded-full` (圆形)
- 图片/小元素: `rounded-2xl` (0.75rem)

**阴影**
- 柔和: `.soft-shadow` - `0 2px 20px rgba(0, 0, 0, 0.06)`
- 悬停: `.soft-shadow-lg` - `0 8px 40px rgba(0, 0, 0, 0.08)`

**玻璃拟态**
```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.08);
}
```

**字体**
- 系统字体栈: `-apple-system, BlinkMacSystemFont, "SF Pro Display"`
- 抗锯齿: `-webkit-font-smoothing: antialiased`

## 项目结构

```
├── app/
│   ├── admin/              # 管理后台
│   ├── cart/               # 购物车
│   ├── menu/               # 菜单
│   ├── orders/             # 订单
│   ├── contexts/           # React Context
│   ├── providers/          # Providers (tRPC)
│   └── page.tsx            # 首页
├── components/ui/          # shadcn/ui 组件
├── lib/
│   ├── server/             # tRPC 服务端
│   │   ├── routers/        # API 路由
│   │   └── trpc.ts         # tRPC 配置
│   ├── mock-data.ts        # 模拟数据
│   ├── types.ts            # 类型定义
│   ├── trpc-client.ts      # tRPC 客户端
│   └── utils.ts            # 工具函数
└── tailwind.config.ts      # Tailwind 配置
```

## tRPC 使用

### 服务端定义

```typescript
// lib/server/routers/user.ts
import { router, publicProcedure } from '../trpc'
import { z } from 'zod'

export const userRouter = router({
  getAll: publicProcedure.query(async () => {
    return [] // 返回模拟数据
  }),
  
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email()
    }))
    .mutation(async ({ input }) => {
      return { id: 1, ...input }
    })
})
```

### 客户端调用

```typescript
// 在 React 组件中
'use client'

import { trpc } from '@/lib/trpc-client'

export default function Users() {
  const { data, isLoading } = trpc.user.getAll.useQuery()
  const createUser = trpc.user.create.useMutation()

  // ...
}
```

## 常用命令

```bash
# 安装依赖
pnpm install

# 开发
pnpm dev

# 构建
pnpm build

# 生产
pnpm start

# 类型检查
pnpm tsc --noEmit
```

## 注意事项

### 重要提醒
- ✅ 这是一个**前端演示项目**
- ✅ 使用模拟数据，无真实数据库
- ✅ 只使用 **pnpm**，不要混用其他包管理器
- ✅ 配色为**纯黑白灰**，无其他颜色
- ✅ 遵循 **Apple 设计风格**

### 代码规范
- 使用 TypeScript 严格模式
- 组件使用 `'use client'` 标记客户端组件
- API 路由使用 tRPC 而非传统 REST
- 样式使用 Tailwind CSS，避免自定义 CSS
- 圆角统一使用 `rounded-full` 或 `rounded-3xl`

## 部署

推荐使用 Vercel 部署：
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 自动检测 Next.js 配置
4. 部署

无需配置环境变量（当前为纯前端项目）。
