import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

/**
 * 用户路由器 - 使用模拟数据（前端演示）
 * 处理所有与用户相关的 tRPC 过程
 */
export const userRouter = router({
  // 获取所有用户
  getAll: publicProcedure.query(async () => {
    // 返回空数组，因为这是前端演示项目
    return [];
  }),

  // 根据 ID 获取用户
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      // 返回 null，因为这是前端演示项目
      return null;
    }),

  // 创建用户
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email('无效的邮箱格式'),
        name: z.string().min(1, '姓名不能为空').optional(),
      })
    )
    .mutation(async ({ input }) => {
      // 模拟返回创建的用户
      return {
        id: Date.now(),
        email: input.email,
        name: input.name || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),

  // 更新用户
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        email: z.string().email('无效的邮箱格式').optional(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // 模拟返回更新的用户
      return {
        id: input.id,
        email: input.email || 'user@example.com',
        name: input.name || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),

  // 删除用户
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      // 模拟删除成功
      return { success: true };
    }),
});
