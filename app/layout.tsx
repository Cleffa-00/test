import type { Metadata } from "next";
import "./globals.css";
import { TRPCProvider } from "./providers/trpc-provider";
import { CartProvider } from "./contexts/cart-context";

export const metadata: Metadata = {
  title: "美食餐厅 - 在线点餐",
  description: "使用 Next.js 16、React 19、TypeScript、Tailwind CSS 4 和 tRPC 构建的现代餐厅点餐系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <TRPCProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
