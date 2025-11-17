# 美食餐厅 - 在线点餐系统

采用 Apple 风格设计的现代化餐厅点餐系统前端演示项目。

## 技术栈

### 核心框架
- **Next.js 16** - React 框架
- **React 19** - UI 库
- **TypeScript 5** - 类型安全

### 样式与 UI
- **Tailwind CSS 4** - 工具优先的 CSS 框架
- **shadcn/ui** - 基于 Radix UI 的组件库
- **Lucide Icons** - 图标库
- **Apple 风格设计** - 纯黑白灰配色 + 玻璃拟态效果

### 状态管理与数据
- **tRPC 11** - 端到端类型安全的 API
- **TanStack Query 5** - 数据同步与缓存
- **React Context** - 购物车状态管理
- **Zod 4** - 运行时验证
- **superjson** - 数据序列化

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

访问 http://localhost:3000 查看效果。

## 项目结构

```
├── app/
│   ├── admin/              # 管理后台
│   │   ├── dishes/         # 菜品管理
│   │   ├── orders/         # 订单管理
│   │   └── page.tsx        # 仪表盘
│   ├── cart/               # 购物车页面
│   ├── menu/               # 菜单浏览页面
│   ├── orders/             # 订单页面
│   ├── contexts/           # React Context
│   ├── providers/          # tRPC Provider
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

## 功能特性

### 客户端
- 📱 菜单浏览（分类筛选、搜索）
- 🛒 购物车管理
- 📦 订单提交与跟踪
- 🎨 响应式设计

### 管理端
- 📊 仪表盘（数据统计）
- 🍜 菜品管理（CRUD）
- 📋 订单管理（状态更新）

## 设计规范

### 配色方案
- 背景：白色 (#FCFCFC)
- 前景：深灰/黑色 (#1A1A1A)
- 次要：浅灰 (#F5F5F5)
- 边框：极浅灰 (#E5E5E5)

### 圆角
- 大卡片：1rem (16px)
- 按钮/输入框：圆形 (9999px)
- 小元素：0.75rem (12px)

### 阴影
- 柔和阴影：`0 2px 20px rgba(0, 0, 0, 0.06)`
- 悬停阴影：`0 8px 40px rgba(0, 0, 0, 0.08)`

### 玻璃拟态
- 背景：`rgba(255, 255, 255, 0.7)`
- 模糊：`blur(20px)`
- 边框：`1px solid rgba(0, 0, 0, 0.08)`

## 部署

### Vercel（推荐）
1. Fork 本仓库
2. 在 Vercel 导入项目
3. 部署即可

### 其他平台
确保 Node.js 版本 >= 18，运行：
```bash
pnpm build
pnpm start
```

## 注意事项

- 这是一个**前端演示项目**，使用模拟数据
- 暂无真实的数据库连接
- tRPC 路由返回模拟数据用于演示
- 订单提交不会持久化保存

## 许可证

MIT

---

采用 Apple 风格设计 · 2025
