import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (userId) {
    const response = NextResponse.next();
    response.cookies.set('user_id', userId, {
      path: '/',
      httpOnly: false, // 前端可访问
      sameSite: 'lax',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/', // 只拦截根目录
};
