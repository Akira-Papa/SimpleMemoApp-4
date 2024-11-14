import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.memo.delete({
      where: {
        id: parseInt(params.id),
      },
    })
    return NextResponse.json({ message: 'Memo deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete memo' }, { status: 500 })
  }
}
