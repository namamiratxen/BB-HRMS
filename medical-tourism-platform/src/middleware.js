import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Public routes that don't need authentication
    const publicRoutes = ['/', '/auth/signin', '/auth/signup', '/auth/error'];
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    // API routes protection
    if (pathname.startsWith('/api/')) {
      // Skip auth routes
      if (pathname.startsWith('/api/auth/')) {
        return NextResponse.next();
      }
      
      // All other API routes require authentication
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Dashboard route protection based on roles
    if (pathname.startsWith('/admin/')) {
      if (!token || !['super_admin', 'admin'].includes(token.role)) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
      }
    }

    if (pathname.startsWith('/hospital/')) {
      if (!token || !['hospital_admin', 'doctor', 'staff'].includes(token.role)) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
      }
    }

    if (pathname.startsWith('/patient/')) {
      if (!token || token.role !== 'patient') {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Public routes
        const publicRoutes = ['/', '/auth/signin', '/auth/signup', '/auth/error'];
        if (publicRoutes.includes(pathname)) {
          return true;
        }

        // Protected routes require token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|workbox-.*\\.js).*)',
  ],
};