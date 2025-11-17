# 项目技术栈详细说明

这份文档面向 AI 助手（Claude）和未来的开发者，提供项目的详细技术栈说明和开发指导。

## 目录

1. [包管理器](#包管理器)
2. [核心技术栈](#核心技术栈)
3. [数据库配置](#数据库配置)
4. [UI 组件系统](#ui-组件系统)
5. [tRPC API](#trpc-api)
6. [状态管理](#状态管理)
7. [认证系统](#认证系统)
8. [支付集成](#支付集成)
9. [邮件服务](#邮件服务)
10. [开发规范](#开发规范)
11. [常见任务](#常见任务)

---

## 包管理器

### ⚠️ 重要：只使用 pnpm

本项目**强制使用 pnpm** 作为唯一的包管理器。请勿混用 npm 或 yarn。

#### 为什么选择 pnpm？

1. **速度快** - 比 npm 和 yarn 快 2-3 倍
2. **节省磁盘空间** - 通过硬链接共享依赖
3. **严格的依赖管理** - 避免幽灵依赖问题
4. **兼容性好** - 完全兼容 npm 生态系统

#### 常用命令对照

```bash
# 安装依赖
npm install -> pnpm install
yarn -> pnpm install

# 添加依赖
npm install <pkg> -> pnpm add <pkg>
yarn add <pkg> -> pnpm add <pkg>

# 添加开发依赖
npm install -D <pkg> -> pnpm add -D <pkg>
yarn add -D <pkg> -> pnpm add -D <pkg>

# 运行脚本
npm run dev -> pnpm dev
yarn dev -> pnpm dev

# 执行包命令
npx <pkg> -> pnpm dlx <pkg>
```

---

## 核心技术栈

### 1. Next.js 16.0.3

**作用**: React 全栈框架
**关键特性**:
- App Router (最新路由系统)
- Server Components (服务器组件)
- Server Actions (服务器操作)
- 自动代码分割
- 文件系统路由

**目录结构**:
```
app/
├── page.tsx          # 首页 (/)
├── layout.tsx        # 根布局
├── api/             # API 路由
│   └── users/
│       └── route.ts # /api/users
└── users/
    └── page.tsx     # /users 页面
```

**注意事项**:
- `layout.tsx` 中的组件是服务器组件
- 需要客户端交互的组件使用 `'use client'`
- API 路由使用 `route.ts` 文件

### 2. React 19.2.0

**作用**: UI 库
**新特性**:
- React Compiler (自动优化)
- 改进的 Suspense
- 更好的类型推断

### 3. TypeScript 5

**作用**: 类型安全
**配置文件**: `tsconfig.json`

**最佳实践**:
- 所有新文件使用 TypeScript
- 使用类型推断，减少显式类型注解
- 使用 `interface` 定义对象类型
- 使用 `type` 定义联合类型或工具类型

---

## 数据库配置

### PostgreSQL + Neon

**选择原因**:
- Serverless PostgreSQL，按需计费
- 自动扩展，无需管理服务器
- 免费套餐每月 10GB 存储
- 支持连接池和直连

### Prisma ORM

**配置文件**: `prisma/schema.prisma`

**关键配置**:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")      // 连接池 URL
  directUrl = env("DIRECT_URL")       // 直连 URL (用于迁移)
}
```

**为什么需要两个 URL？**
- `DATABASE_URL`: 使用 Neon 的连接池，适合应用运行时
- `DIRECT_URL`: 直接连接数据库，适合运行迁移

**常用命令**:
```bash
# 开发时创建迁移
pnpm prisma migrate dev --name <migration_name>

# 生产环境应用迁移
pnpm prisma migrate deploy

# 查看数据库
pnpm prisma studio

# 重置数据库 (危险！)
pnpm prisma migrate reset

# 生成 Prisma Client
pnpm prisma generate
```

**Prisma Client 位置**:
- 位于 `app/lib/prisma.ts`
- 使用单例模式避免连接池耗尽
- 在开发环境缓存实例

---

## UI 组件系统

### shadcn/ui

**选择原因**:
- 不是 npm 包，而是复制粘贴组件到项目中
- 完全可定制，代码在你的项目里
- 基于 Radix UI，可访问性优秀
- 使用 Tailwind CSS 样式

**配置文件**:
- `components.json` - shadcn/ui 配置
- `tailwind.config.ts` - Tailwind 配置
- `app/globals.css` - CSS 变量定义

**添加组件**:
```bash
# 添加单个组件
pnpm dlx shadcn@latest add button

# 添加多个组件
pnpm dlx shadcn@latest add button card dialog form input

# 查看可用组件
pnpm dlx shadcn@latest add
```

**组件位置**: `components/ui/`

**使用 Example**:
```tsx
import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Click me</Button>
}
```

### Tailwind CSS 4

**配置文件**: `tailwind.config.ts`

**CSS 变量系统**:
- 在 `app/globals.css` 中定义
- 使用 HSL 格式: `hsl(var(--primary))`
- 支持深色模式

**工具函数**:
- 位于 `lib/utils.ts`
- `cn()` 函数用于合并 class

```tsx
import { cn } from "@/lib/utils"

<div className={cn("base-class", isActive && "active-class")} />
```

### Lucide Icons

**使用方法**:
```tsx
import { User, Mail, Lock } from "lucide-react"

<User className="w-4 h-4" />
<Mail size={16} />
<Lock />
```

---

## tRPC API

### 什么是 tRPC？

tRPC 是一个端到端类型安全的 API 框架，允许你在 TypeScript 项目中构建完全类型安全的 API，无需代码生成或额外的构建步骤。

**核心优势**:
- **端到端类型安全** - 从服务端到客户端自动类型推断
- **零代码生成** - 不需要 GraphQL Schema 或 OpenAPI 规范
- **IDE 自动补全** - 完整的 TypeScript 支持
- **集成 React Query** - 自动缓存、重新验证等功能
- **Zod 验证** - 运行时类型检查和验证

### 文件结构

```
lib/
├── server/
│   ├── trpc.ts              # tRPC 初始化配置
│   └── routers/
│       ├── _app.ts          # 主路由器（合并所有子路由）
│       ├── user.ts          # 用户路由器
│       └── post.ts          # 文章路由器
├── trpc-client.ts           # 客户端配置
app/
├── api/trpc/[trpc]/
│   └── route.ts             # Next.js API 处理器
└── providers/
    └── trpc-provider.tsx    # React Provider
```

### 服务端配置

**1. 初始化 tRPC (`lib/server/trpc.ts`)**:
```typescript
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson, // 支持 Date, Map, Set 等类型
});

export const router = t.router;
export const publicProcedure = t.procedure;
```

**2. 创建路由器 (`lib/server/routers/user.ts`)**:
```typescript
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '@/app/lib/prisma';

export const userRouter = router({
  // 查询（Query）- 用于获取数据
  getAll: publicProcedure.query(async () => {
    return await prisma.user.findMany({
      include: { posts: true },
    });
  }),

  // 带输入验证的查询
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await prisma.user.findUnique({
        where: { id: input.id },
      });
    }),

  // 修改操作（Mutation）- 用于创建、更新、删除
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email('无效的邮箱格式'),
        name: z.string().min(1, '姓名不能为空').optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.user.create({
        data: input,
      });
    }),

  // 更新
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        email: z.string().email().optional(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await prisma.user.update({
        where: { id },
        data,
      });
    }),

  // 删除
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await prisma.user.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});
```

**3. 合并路由器 (`lib/server/routers/_app.ts`)**:
```typescript
import { router } from '../trpc';
import { userRouter } from './user';
import { postRouter } from './post';

export const appRouter = router({
  user: userRouter,
  post: postRouter,
});

// 导出类型定义
export type AppRouter = typeof appRouter;
```

**4. Next.js API 处理器 (`app/api/trpc/[trpc]/route.ts`)**:
```typescript
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/lib/server/routers/_app';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };
```

### 客户端配置

**1. 创建客户端 (`lib/trpc-client.ts`)**:
```typescript
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './server/routers/_app';

export const trpc = createTRPCReact<AppRouter>();
```

**2. Provider 配置 (`app/providers/trpc-provider.tsx`)**:
```typescript
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import superjson from 'superjson';
import { trpc } from '@/lib/trpc-client';

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

### 客户端使用

**在客户端组件中使用**:
```tsx
'use client'

import { trpc } from '@/lib/trpc-client';

export default function UsersPage() {
  // 查询数据
  const { data: users, isLoading, error } = trpc.user.getAll.useQuery();

  // 获取单个用户
  const { data: user } = trpc.user.getById.useQuery(
    { id: 1 },
    { enabled: false } // 可选：控制查询时机
  );

  // 获取 utils 用于手动操作
  const utils = trpc.useContext();

  // 创建 mutation
  const createUser = trpc.user.create.useMutation({
    onSuccess: () => {
      // 刷新用户列表
      utils.user.getAll.invalidate();
    },
    onError: (error) => {
      console.error('创建失败:', error);
    },
  });

  // 更新 mutation
  const updateUser = trpc.user.update.useMutation({
    onSuccess: (data) => {
      // 乐观更新：立即更新 UI
      utils.user.getAll.setData(undefined, (old) => {
        return old?.map(u => u.id === data.id ? data : u);
      });
    },
  });

  // 删除 mutation
  const deleteUser = trpc.user.delete.useMutation({
    onSuccess: (_, variables) => {
      utils.user.getAll.setData(undefined, (old) => {
        return old?.filter(u => u.id !== variables.id);
      });
    },
  });

  const handleCreate = () => {
    createUser.mutate({
      email: 'user@example.com',
      name: 'John Doe',
    });
  };

  const handleUpdate = (id: number) => {
    updateUser.mutate({
      id,
      name: 'Updated Name',
    });
  };

  const handleDelete = (id: number) => {
    deleteUser.mutate({ id });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={handleCreate} disabled={createUser.isPending}>
        {createUser.isPending ? 'Creating...' : 'Create User'}
      </button>

      {users?.map((user) => (
        <div key={user.id}>
          <span>{user.name} ({user.email})</span>
          <button onClick={() => handleUpdate(user.id)}>Update</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### 最佳实践

**1. 输入验证**:
```typescript
// 使用 Zod 进行详细验证
.input(
  z.object({
    email: z.string().email('无效的邮箱'),
    password: z.string().min(8, '密码至少 8 个字符'),
    age: z.number().min(0).max(150).optional(),
  })
)
```

**2. 错误处理**:
```typescript
import { TRPCError } from '@trpc/server';

.mutation(async ({ input }) => {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existing) {
    throw new TRPCError({
      code: 'CONFLICT',
      message: '邮箱已存在',
    });
  }

  return await prisma.user.create({ data: input });
})
```

**3. 分页**:
```typescript
getAll: publicProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100).default(10),
      cursor: z.number().optional(),
    })
  )
  .query(async ({ input }) => {
    const users = await prisma.user.findMany({
      take: input.limit + 1,
      cursor: input.cursor ? { id: input.cursor } : undefined,
    });

    let nextCursor: number | undefined = undefined;
    if (users.length > input.limit) {
      const nextItem = users.pop();
      nextCursor = nextItem!.id;
    }

    return {
      users,
      nextCursor,
    };
  }),
```

**4. 客户端无限滚动**:
```tsx
const { data, fetchNextPage, hasNextPage } =
  trpc.user.getAll.useInfiniteQuery(
    { limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
```

### tRPC vs REST API

| 特性 | tRPC | REST API |
|------|------|----------|
| 类型安全 | ✅ 自动 | ❌ 需手动定义 |
| 代码生成 | ❌ 不需要 | ⚠️ 可能需要 |
| 学习曲线 | 📉 低 | 📊 中等 |
| API 文档 | ✅ 自动（从类型） | ⚠️ 需手动编写 |
| 性能 | ✅ 批量请求 | ⚠️ 单个请求 |
| 公开 API | ❌ 不推荐 | ✅ 推荐 |
| 移动端 | ❌ 需 TypeScript | ✅ 通用 |

### 何时使用 tRPC？

**适合使用 tRPC**:
- 全栈 TypeScript 项目
- 前后端在同一个代码库
- 不需要公开 API
- 团队熟悉 TypeScript

**不适合使用 tRPC**:
- 需要公开 API 给第三方
- 前后端语言不同
- 需要支持非 TypeScript 客户端
- 简单的 CRUD 应用（REST 可能更简单）

---

## 状态管理

### TanStack Query (React Query)

**选择原因**:
- 服务器状态管理的事实标准
- 自动缓存、重新获取、后台更新
- 减少样板代码
- 内置 DevTools

**配置位置**: `app/providers/query-provider.tsx`

**使用 Example**:
```tsx
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// 获取数据
function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users')
      return res.json()
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>{/* 渲染数据 */}</div>
}

// 修改数据
function CreateUser() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (newUser) => {
      const res = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser)
      })
      return res.json()
    },
    onSuccess: () => {
      // 刷新用户列表
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  return <button onClick={() => mutation.mutate({ name: 'John' })}>
    Create User
  </button>
}
```

**最佳实践**:
- Query Key 使用数组: `['users']`, `['user', id]`
- 使用 `queryClient.invalidateQueries()` 刷新数据
- 乐观更新使用 `onMutate` 和 `onError`

---

## 认证系统

### Better Auth

**配置位置**: `lib/auth.ts`

**选择原因**:
- 现代化的认证解决方案
- 支持多种登录方式
- 与 Prisma 深度集成
- TypeScript 类型安全

**配置 Example**:
```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
```

**环境变量**:
```bash
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

**使用 Example**:
```tsx
// 登录
const { signIn } = useAuth()
await signIn.email({ email, password })

// 注册
const { signUp } = useAuth()
await signUp.email({ email, password, name })

// 登出
const { signOut } = useAuth()
await signOut()
```

---

## 支付集成

### Stripe

**配置位置**: `lib/stripe.ts`

**环境变量**:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxx"  # 前端可用
STRIPE_SECRET_KEY="sk_test_xxx"                   # 仅后端
STRIPE_WEBHOOK_SECRET="whsec_xxx"                 # Webhook 验证
```

**使用 Example**:

```typescript
// 创建结账会话
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{
      price: 'price_xxx',
      quantity: 1,
    }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
  })

  return Response.json({ url: session.url })
}
```

**Webhook 处理**:
```typescript
// app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')!

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  switch (event.type) {
    case 'checkout.session.completed':
      // 处理支付成功
      break
    case 'customer.subscription.deleted':
      // 处理订阅取消
      break
  }

  return Response.json({ received: true })
}
```

---

## 邮件服务

### Resend

**配置位置**: `lib/resend.ts`

**环境变量**:
```bash
RESEND_API_KEY="re_xxx"
RESEND_FROM_EMAIL="noreply@yourdomain.com"
```

**使用 Example**:
```typescript
import { resend } from '@/lib/resend'

// 发送欢迎邮件
await resend.emails.send({
  from: process.env.RESEND_FROM_EMAIL!,
  to: ['user@example.com'],
  subject: '欢迎加入！',
  html: '<h1>欢迎</h1><p>感谢注册...</p>',
})
```

**辅助函数**:
- `sendWelcomeEmail(to, name)` - 发送欢迎邮件
- `sendPasswordResetEmail(to, resetLink)` - 发送密码重置邮件

---

## 开发规范

### 文件命名

- 组件文件: `PascalCase.tsx` (例如 `UserCard.tsx`)
- 工具函数: `camelCase.ts` (例如 `formatDate.ts`)
- API 路由: `route.ts`
- 页面: `page.tsx`

### 组件规范

```tsx
// 1. 使用 'use client' 指令（如需要）
'use client'

// 2. 导入
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 3. 类型定义
interface UserCardProps {
  name: string
  email: string
}

// 4. 组件
export function UserCard({ name, email }: UserCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div>
      {/* 组件内容 */}
    </div>
  )
}
```

### API 路由规范

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// GET /api/users
export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: '获取用户失败' },
      { status: 500 }
    )
  }
}

// POST /api/users
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // 验证数据
    const user = await prisma.user.create({ data: body })
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: '创建用户失败' },
      { status: 500 }
    )
  }
}
```

---

## 常见任务

### 添加新页面

```bash
# 1. 创建页面文件
mkdir -p app/about
touch app/about/page.tsx

# 2. 添加页面内容
# app/about/page.tsx
export default function AboutPage() {
  return <div>About Page</div>
}

# 3. 访问 /about
```

### 添加新 API 路由

```bash
# 1. 创建路由文件
mkdir -p app/api/posts
touch app/api/posts/route.ts

# 2. 添加路由处理
# app/api/posts/route.ts
export async function GET() {
  return Response.json({ posts: [] })
}
```

### 添加数据库模型

```prisma
// 1. 编辑 prisma/schema.prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  createdAt DateTime @default(now())
}

// 2. 创建迁移
pnpm prisma migrate dev --name add_post_model

// 3. 使用模型
const posts = await prisma.post.findMany()
```

### 添加 shadcn/ui 组件

```bash
# 1. 添加组件
pnpm dlx shadcn@latest add button

# 2. 使用组件
import { Button } from "@/components/ui/button"
```

### 部署到 Vercel

```bash
# 1. 安装 Vercel CLI
pnpm add -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel

# 4. 配置环境变量（在 Vercel Dashboard）
```

---

## 故障排除

### pnpm 相关

**问题**: 提示找不到模块
```bash
# 解决方案：删除并重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Prisma 相关

**问题**: Prisma Client 未生成
```bash
# 解决方案
pnpm prisma generate
```

**问题**: 迁移失败
```bash
# 开发环境：重置数据库
pnpm prisma migrate reset

# 生产环境：检查 DIRECT_URL
```

### Build 相关

**问题**: 构建失败
```bash
# 1. 检查类型错误
pnpm tsc --noEmit

# 2. 检查 ESLint
pnpm lint

# 3. 清理缓存
rm -rf .next
pnpm build
```

---

## 联系方式

如有问题，请：
1. 查看 README.md
2. 查看相关技术文档
3. 提交 Issue

---

**最后更新**: 2025-11-17
**维护者**: Claude AI Assistant
