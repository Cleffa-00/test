import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

/**
 * 文章路由器 - 使用模拟数据（前端演示）
 * 处理所有与文章相关的 tRPC 过程
 */
export const postRouter = router({
  // 获取所有文章
  getAll: publicProcedure.query(async () => {
    // 返回空数组，因为这是前端演示项目
    return [];
  }),

  // 根据 ID 获取文章
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      // 返回 null，因为这是前端演示项目
      return null;
    }),

  // 创建文章
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1, '标题不能为空'),
        content: z.string().optional(),
        authorId: z.number(),
        published: z.boolean().default(false),
      })
    )
    .mutation(async ({ input }) => {
      // 模拟返回创建的文章
      return {
        id: Date.now(),
        title: input.title,
        content: input.content || null,
        published: input.published,
        authorId: input.authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),

  // 更新文章
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1, '标题不能为空').optional(),
        content: z.string().optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // 模拟返回更新的文章
      return {
        id: input.id,
        title: input.title || 'Untitled',
        content: input.content || null,
        published: input.published || false,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),

  // 删除文章
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      // 模拟删除成功
      return { success: true };
    }),
});
