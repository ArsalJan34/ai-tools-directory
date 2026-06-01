import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization')

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!basicAuth) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin"',
        },
      })
    }

    const auth = basicAuth.split(' ')[1]
    const [user, password] = atob(auth).split(':')

    if (user !== 'admin' || password !== process.env.ADMIN_PASSWORD) {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin"',
        },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
