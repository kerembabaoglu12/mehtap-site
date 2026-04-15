import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('admin_token')

  // Korunması gereken admin rotaları
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // /admin/login rotasına zaten gidiyorsa elleşme
    if (request.nextUrl.pathname === '/admin/login') {
      // Eğer logoluysa dashboard'a atalım
      if (token) return NextResponse.redirect(new URL('/admin', request.url))
      return NextResponse.next()
    }
    
    // Auth tokense yoksa her şeyi login'e yönlendir
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
