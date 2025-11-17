import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '@/app/lib/prisma';

/**
 * 文章路由器
 * 处理所有与文章相关的 tRPC 过程
 */
export const postRouter = router({
  // 获取所有文章
  getAll: publicProcedure.query(async () => {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts;
  }),

  // 根据 ID 获取文章
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const post = await prisma.post.findUnique({
        where: { id: input.id },
        include: {
          author: true,
        },
      });
      return post;
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
      const post = await prisma.post.create({
        data: input,
        include: {
          author: true,
        },
      });
      return post;
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
      const { id, ...data } = input;
      const post = await prisma.post.update({
        where: { id },
        data,
        include: {
          author: true,
        },
      });
      return post;
    }),

  // 删除文章
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await prisma.post.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});
