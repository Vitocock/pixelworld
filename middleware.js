
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC_FILE = /\.(.*)$/
const protectedRoutes = ['/admin/plans', '/admin/products', '/admin/images', '/admin']

export async function middleware(request) {
  const { pathname } = request.nextUrl

  if (
    protectedRoutes.some((path) => pathname.startsWith(path)) &&
    !PUBLIC_FILE.test(pathname)
  ) {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
      return NextResponse.next()
    } catch (e) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin((?!/login).*)']
}
