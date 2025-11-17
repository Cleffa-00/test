import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '@/app/lib/prisma';

/**
 * 用户路由器
 * 处理所有与用户相关的 tRPC 过程
 */
export const userRouter = router({
  // 获取所有用户
  getAll: publicProcedure.query(async () => {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return users;
  }),

  // 根据 ID 获取用户
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { id: input.id },
        include: {
          posts: true,
        },
      });
      return user;
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
      const user = await prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
        },
      });
      return user;
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
      const { id, ...data } = input;
      const user = await prisma.user.update({
        where: { id },
        data,
      });
      return user;
    }),

  // 删除用户
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await prisma.user.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});
