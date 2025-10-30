import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const publicRoutes = ['/login', '/register'];

async function verifyJWT(token: string, secret: Uint8Array): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userCookie = request.cookies.get('user');
  console.log('User Cookie:', userCookie);

  // Si la ruta es pública, permitir el acceso
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Si no hay cookie de usuario y la ruta no es pública, redirigir al login
  if (!userCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si la cookie existe, verificar el token y el rol
  try {
    const user = JSON.parse(userCookie.value);
    const token = user?.token;
    const role = user?.rol;
    console.log('Extracted Token:', token);

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'TU_SECRETO_SUPER_SEGURA');
    const payload = await verifyJWT(token, secret);
    console.log('JWT Payload:', payload);

    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Lógica de autorización para rutas específicas
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith('/profesor') && role !== 'profesor') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Permitir el acceso a /dashboard para admin, profesor y user
    if (pathname.startsWith('/dashboard') && !['user', 'profesor', 'admin'].includes(role)) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log('Error parsing user cookie or validating token', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
