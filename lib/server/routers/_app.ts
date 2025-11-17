import { router } from '../trpc';
import { userRouter } from './user';
import { postRouter } from './post';

/**
 * 主应用路由器
 * 合并所有子路由器
 */
export const appRouter = router({
  user: userRouter,
  post: postRouter,
});

// 导出路由器类型定义，用于客户端
export type AppRouter = typeof appRouter;
