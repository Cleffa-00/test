# 现代全栈应用

一个使用最新技术栈构建的生产级全栈网站项目，展示了现代 Web 开发的最佳实践。

> **重要提示**: 本项目统一使用 **pnpm** 作为包管理器，请勿混用 npm 或 yarn。

## 技术栈

### 核心框架
- **Next.js 16.0.3** - 最新的 React 框架，支持 App Router 和 Server Components
- **React 19.2.0** - 最新版本的 React，支持 React Compiler
- **TypeScript 5** - 提供完整的端到端类型安全

### UI 和样式
- **shadcn/ui** - 基于 Radix UI 的高质量组件库
- **Tailwind CSS 4** - 最新版本的原子化 CSS 框架
- **Lucide Icons** - 现代化的图标库
- **class-variance-authority** - 类型安全的样式变体管理

### 数据库和 ORM
- **PostgreSQL (Neon)** - 现代化的 Serverless PostgreSQL 数据库
- **Prisma 6.19.0** - 现代化的 ORM，提供类型安全的数据库操作

### API 和数据获取
- **tRPC 11** - 端到端类型安全的 API，无需代码生成
- **TanStack Query (React Query)** - 强大的数据同步和缓存库
- **React Query DevTools** - 开发时的调试工具
- **Zod** - TypeScript-first 的模式验证库

### 认证和授权
- **Better Auth** - 现代化的认证解决方案，支持多种登录方式

### 支付集成
- **Stripe** - 全球领先的支付处理平台

### 邮件服务
- **Resend** - 现代化的邮件发送服务

## 功能特点

- ✅ **tRPC** - 端到端类型安全的 API，无需手动编写 API 路由
- ✅ 完整的用户管理系统（CRUD 操作）
- ✅ TanStack Query 数据管理和缓存
- ✅ shadcn/ui 组件库集成
- ✅ Zod 模式验证
- ✅ Better Auth 认证系统（已配置，待启用）
- ✅ Stripe 支付集成（已配置，待启用）
- ✅ Resend 邮件服务（已配置，待启用）
- ✅ PostgreSQL + Neon 数据库
- ✅ 响应式设计，支持深色模式
- ✅ 类型安全的数据库操作
- ✅ 现代化的 UI/UX 设计

## 快速开始

### 前置要求

- Node.js 18+
- pnpm 包管理器
- Neon PostgreSQL 数据库账号（免费）

### 1. 克隆项目并安装依赖

```bash
# 如果还没有安装 pnpm
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 2. 配置环境变量

复制 `.env.example` 文件为 `.env`:

```bash
cp .env.example .env
```

然后在 `.env` 文件中配置以下变量：

#### 数据库配置 (必需)
1. 访问 [Neon](https://neon.tech) 创建免费数据库
2. 复制连接字符串到 `DATABASE_URL` 和 `DIRECT_URL`

#### Better Auth 配置 (可选)
```bash
# 生成密钥
openssl rand -base64 32
```

#### Stripe 配置 (可选)
1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/)
2. 获取 API 密钥

#### Resend 配置 (可选)
1. 访问 [Resend](https://resend.com/)
2. 获取 API 密钥

### 3. 初始化数据库

```bash
# 运行数据库迁移
pnpm prisma migrate dev --name init

# 生成 Prisma Client
pnpm prisma generate
```

### 4. 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 5. 构建生产版本

```bash
pnpm build
pnpm start
```

## 项目结构

```
.
├── app/
│   ├── api/
│   │   ├── trpc/[trpc]/        # tRPC API 端点
│   │   ├── users/              # REST API (可选)
│   │   └── posts/              # REST API (可选)
│   ├── providers/
│   │   ├── trpc-provider.tsx   # tRPC Provider (包含 React Query)
│   │   └── query-provider.tsx  # TanStack Query Provider (已弃用)
│   ├── users/                  # 用户管理页面
│   ├── globals.css             # 全局样式 (shadcn/ui)
│   ├── layout.tsx              # 根布局
│   └── page.tsx                # 首页
├── components/
│   └── ui/                     # shadcn/ui 组件 (按需添加)
├── lib/
│   ├── server/
│   │   ├── trpc.ts             # tRPC 服务端配置
│   │   └── routers/
│   │       ├── _app.ts         # 主路由器
│   │       ├── user.ts         # 用户路由器
│   │       └── post.ts         # 文章路由器
│   ├── trpc-client.ts          # tRPC 客户端配置
│   ├── auth.ts                 # Better Auth 配置
│   ├── stripe.ts               # Stripe 配置
│   ├── resend.ts               # Resend 邮件配置
│   ├── prisma.ts               # Prisma 客户端实例
│   └── utils.ts                # 工具函数 (cn 等)
├── prisma/
│   ├── schema.prisma           # 数据库模型定义
│   └── migrations/             # 数据库迁移文件
├── public/                     # 静态资源
├── .claude/                    # Claude 开发文档
│   └── claude.md               # 技术栈详细说明
├── components.json             # shadcn/ui 配置
├── tailwind.config.ts          # Tailwind 配置
├── .env.example                # 环境变量示例
└── package.json
```

## 使用 shadcn/ui 组件

本项目已配置 shadcn/ui，可以按需添加组件：

```bash
# 添加 Button 组件
pnpm dlx shadcn@latest add button

# 添加 Card 组件
pnpm dlx shadcn@latest add card

# 添加多个组件
pnpm dlx shadcn@latest add button card dialog form input
```

组件会自动添加到 `components/ui` 目录。

## 使用 tRPC

本项目使用 tRPC 提供端到端类型安全的 API。

### 服务端（创建 API）

```typescript
// lib/server/routers/user.ts
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '@/app/lib/prisma';

export const userRouter = router({
  // 查询
  getAll: publicProcedure.query(async () => {
    return await prisma.user.findMany();
  }),

  // 带参数的查询
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await prisma.user.findUnique({
        where: { id: input.id },
      });
    }),

  // 修改操作
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.user.create({
        data: input,
      });
    }),
});
```

### 客户端（调用 API）

```tsx
'use client'

import { trpc } from '@/lib/trpc-client';

export default function UsersPage() {
  // 查询数据（自动缓存、重新验证）
  const { data: users, isLoading } = trpc.user.getAll.useQuery();

  // 修改数据
  const createUser = trpc.user.create.useMutation({
    onSuccess: () => {
      // 刷新用户列表
      utils.user.getAll.invalidate();
    },
  });

  const handleCreate = () => {
    createUser.mutate({
      email: 'user@example.com',
      name: 'John Doe',
    });
  };

  return (
    <div>
      {isLoading ? <p>Loading...</p> : (
        users?.map(user => <div key={user.id}>{user.name}</div>)
      )}
      <button onClick={handleCreate}>Create User</button>
    </div>
  );
}
```

### tRPC 的优势

1. **端到端类型安全** - 从服务端到客户端自动类型推断
2. **无需代码生成** - 不需要运行额外的构建步骤
3. **自动补全** - IDE 中完整的 TypeScript 支持
4. **集成 React Query** - 自动缓存、重新验证等功能
5. **Zod 验证** - 运行时类型检查和验证

## API 接口

### 用户接口

#### 获取所有用户
```
GET /api/users
```

#### 创建用户
```
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "张三"
}
```

### 文章接口

#### 获取所有文章
```
GET /api/posts
```

#### 创建文章
```
POST /api/posts
Content-Type: application/json

{
  "title": "文章标题",
  "content": "文章内容",
  "authorId": 1,
  "published": false
}
```

## 数据库管理

### 查看数据库
```bash
pnpm prisma studio
```

### 创建新的迁移
```bash
pnpm prisma migrate dev --name migration_name
```

### 重置数据库
```bash
pnpm prisma migrate reset
```

### 生成 Prisma Client
```bash
pnpm prisma generate
```

## 开发工具和命令

### 开发命令
```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器
pnpm lint         # 运行 ESLint
```

### Prisma 命令
```bash
pnpm prisma studio          # 打开 Prisma Studio
pnpm prisma generate        # 生成 Prisma Client
pnpm prisma migrate dev     # 创建并应用迁移
pnpm prisma migrate deploy  # 在生产环境应用迁移
pnpm prisma db push         # 同步 schema 到数据库（开发时）
```

### 开发工具
- **ESLint** - 代码质量检查
- **TypeScript** - 类型检查
- **Prisma Studio** - 可视化数据库管理工具
- **React Query DevTools** - 数据查询调试工具
- **pnpm** - 快速、节省磁盘空间的包管理器

## 技术栈文档

### 核心文档
- [Next.js 16 文档](https://nextjs.org/docs)
- [React 19 文档](https://react.dev)
- [TypeScript 文档](https://www.typescriptlang.org/docs)

### UI 和样式
- [shadcn/ui 文档](https://ui.shadcn.com)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

### 数据库和 ORM
- [Prisma 文档](https://www.prisma.io/docs)
- [Neon 文档](https://neon.tech/docs)

### 其他服务
- [TanStack Query 文档](https://tanstack.com/query/latest)
- [Better Auth 文档](https://better-auth.com)
- [Stripe 文档](https://stripe.com/docs)
- [Resend 文档](https://resend.com/docs)

## 重要提示

### 包管理器
⚠️ **只使用 pnpm，不要混用 npm 或 yarn**

如果不小心使用了 npm 或 yarn：
```bash
# 删除错误的依赖
rm -rf node_modules package-lock.json yarn.lock

# 重新使用 pnpm 安装
pnpm install
```

### 环境变量
确保所有敏感信息都在 `.env` 文件中，**不要提交到 Git**。

`.env.example` 文件应该包含所有需要的变量，但不包含真实的密钥。

### 数据库迁移
- 开发环境使用 `pnpm prisma migrate dev`
- 生产环境使用 `pnpm prisma migrate deploy`
- 不要在生产环境使用 `pnpm prisma db push`

## 下一步开发建议

- [ ] 启用 Better Auth 用户认证
- [ ] 配置 Stripe 支付功能
- [ ] 设置 Resend 邮件通知
- [ ] 添加更多 shadcn/ui 组件
- [ ] 实现文章编辑功能
- [ ] 添加用户权限管理
- [ ] 集成文件上传 (Uploadthing)
- [ ] 部署到 Vercel

## 贡献

欢迎提交 Pull Request 或 Issue！

## License

MIT
