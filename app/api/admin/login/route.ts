import { NextRequest, NextResponse } from 'next/server'
import { createAdminSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  await createAdminSession()
  return NextResponse.json({ success: true })
}
