import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.redirect(new URL('/admin-login', 'https://aishelve.vercel.app'))
  response.cookies.delete('admin_auth')
  return response
}
