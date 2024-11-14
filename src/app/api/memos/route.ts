import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const memos = await prisma.memo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(memos)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch memos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json()
    const memo = await prisma.memo.create({
      data: {
        content,
      },
    })
    return NextResponse.json(memo)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create memo' }, { status: 500 })
  }
}
