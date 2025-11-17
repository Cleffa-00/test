import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

/**
 * 初始化 tRPC
 * 这是创建所有 tRPC 路由器和过程的基础
 */
const t = initTRPC.create({
  transformer: superjson,
});

/**
 * 导出可重用的路由器和过程助手
 */
export const router = t.router;
export const publicProcedure = t.procedure;
