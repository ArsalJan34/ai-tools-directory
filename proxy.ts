import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const ADMIN_SECRET = process.env.ADMIN_SECRET!
const COOKIE_NAME = 'admin_auth'
const COOKIE_MAX_AGE = 24 * 60 * 60

function isValidCookie(value: string): boolean {
  try {
    const parts = value.split('.')
    if (parts.length !== 2) return false

    const [timestamp, signature] = parts
    const cookieTime = parseInt(timestamp)

    if (isNaN(cookieTime) || Date.now() - cookieTime > COOKIE_MAX_AGE * 1000) return false

    const expected = crypto
      .createHmac('sha256', ADMIN_SECRET)
      .update(timestamp)
      .digest('hex')

    return signature === expected
  } catch {
    return false
  }
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const auth = request.cookies.get(COOKIE_NAME)?.value
    if (!auth || !isValidCookie(auth)) {
      return NextResponse.redirect(new URL('/admin-login', request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}