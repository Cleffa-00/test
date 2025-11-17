/**
 * Better Auth 配置
 *
 * 注意：这是一个前端演示项目，暂时不需要真正的认证功能
 * 当需要添加后端和数据库时，可以取消注释下面的代码
 */

// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const auth = betterAuth({
//   database: prismaAdapter(prisma, {
//     provider: "postgresql",
//   }),
//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders: {
//     // 可以在这里添加社交登录提供商
//     // github: {
//     //   clientId: process.env.GITHUB_CLIENT_ID as string,
//     //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     // },
//   },
//   trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],
// });

// export type Session = typeof auth.$Infer.Session;

// 临时导出以避免构建错误
export const auth = null;
export type Session = null;
