import { cookies } from 'next/headers'
import crypto from 'crypto'

const ADMIN_SECRET = process.env.ADMIN_SECRET!
const COOKIE_NAME = 'admin_auth'
const COOKIE_MAX_AGE = 24 * 60 * 60

export async function createAdminSession() {
  const timestamp = Date.now().toString()
  const signature = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(timestamp)
    .digest('hex')

  const cookieStore = await cookies()
  cookieStore.set({
    name: COOKIE_NAME,
    value: `${timestamp}.${signature}`,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(COOKIE_NAME)?.value

  if (!authCookie) return false

  try {
    const parts = authCookie.split('.')
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
