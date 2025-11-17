# 现代全栈应用

一个使用最新技术栈构建的全栈网站项目，展示了现代 Web 开发的最佳实践。

## 技术栈

### 前端
- **Next.js 16** - 最新的 React 框架，支持 App Router
- **React 19** - 最新版本的 React
- **TypeScript** - 提供完整的类型安全
- **Tailwind CSS 4** - 最新版本的原子化 CSS 框架

### 后端
- **Next.js API Routes** - 服务端 API 路由
- **Prisma** - 现代化的 ORM
- **SQLite** - 轻量级数据库（可轻松切换到 PostgreSQL/MySQL）

## 功能特点

- 完整的用户管理系统（CRUD 操作）
- RESTful API 接口
- 响应式设计，支持深色模式
- 类型安全的数据库操作
- 现代化的 UI/UX 设计

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 设置数据库

数据库已经通过 Prisma 配置完成。如果需要重新初始化：

```bash
npx prisma migrate dev --name init
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
.
├── app/
│   ├── api/              # API 路由
│   │   ├── users/        # 用户 API
│   │   └── posts/        # 文章 API
│   ├── users/            # 用户管理页面
│   ├── lib/              # 工具函数和配置
│   │   └── prisma.ts     # Prisma 客户端实例
│   ├── generated/        # Prisma 生成的类型
│   ├── layout.tsx        # 根布局
│   └── page.tsx          # 首页
├── prisma/
│   ├── schema.prisma     # 数据库模型定义
│   └── migrations/       # 数据库迁移文件
├── public/               # 静态资源
└── package.json
```

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
npx prisma studio
```

### 创建新的迁移
```bash
npx prisma migrate dev --name migration_name
```

### 重置数据库
```bash
npx prisma migrate reset
```

## 开发工具

- **ESLint** - 代码质量检查
- **TypeScript** - 类型检查
- **Prisma Studio** - 可视化数据库管理工具

## 下一步

- [ ] 添加用户认证（NextAuth.js）
- [ ] 实现文章编辑功能
- [ ] 添加评论系统
- [ ] 集成文件上传
- [ ] 部署到 Vercel

## 了解更多

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Prisma 文档](https://www.prisma.io/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## License

MIT
