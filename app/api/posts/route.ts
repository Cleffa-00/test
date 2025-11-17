import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// GET /api/posts - 获取所有文章
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('获取文章失败:', error)
    return NextResponse.json({ error: '获取文章失败' }, { status: 500 })
  }
}

// POST /api/posts - 创建新文章
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, authorId, published } = body

    if (!title || !authorId) {
      return NextResponse.json(
        { error: '标题和作者ID是必填项' },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published ?? false,
        authorId: parseInt(authorId),
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('创建文章失败:', error)
    return NextResponse.json({ error: '创建文章失败' }, { status: 500 })
  }
}
