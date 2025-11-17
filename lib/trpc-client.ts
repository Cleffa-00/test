import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './server/routers/_app';

/**
 * tRPC React 客户端
 * 提供类型安全的 API 调用
 */
export const trpc = createTRPCReact<AppRouter>();
