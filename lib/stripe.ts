import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-10-29.clover',
  typescript: true,
});

// Stripe 产品和价格配置示例
export const STRIPE_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    priceId: '', // 在 Stripe Dashboard 创建后填写
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    priceId: process.env.STRIPE_PRO_PRICE_ID || '', // 在 Stripe Dashboard 创建后填写
  },
  enterprise: {
    name: 'Enterprise',
    price: 29.99,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || '', // 在 Stripe Dashboard 创建后填写
  },
} as const;
