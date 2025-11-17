import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// GET /api/users - 获取所有用户
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(users)
  } catch (error) {
    console.error('获取用户失败:', error)
    return NextResponse.json({ error: '获取用户失败' }, { status: 500 })
  }
}

// POST /api/users - 创建新用户
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json({ error: '邮箱是必填项' }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('创建用户失败:', error)
    return NextResponse.json({ error: '创建用户失败' }, { status: 500 })
  }
}
