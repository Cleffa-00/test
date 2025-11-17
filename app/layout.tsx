import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "现代全栈应用",
  description: "使用 Next.js 16、React 19、TypeScript、Tailwind CSS 4 和 Prisma 构建的现代全栈应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
