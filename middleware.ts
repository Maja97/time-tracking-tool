import cookieKeys from '@app/consts/cookies';
import { Routes } from '@app/consts/routes';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(cookieKeys.TOKEN);
  if (token) {
    if (
      request.nextUrl.pathname.startsWith(Routes.Login) ||
      request.nextUrl.pathname.startsWith(Routes.Register)
    ) {
      return NextResponse.redirect(new URL(Routes.Home, request.url));
    }
  } else {
    if (request.nextUrl.pathname === Routes.Home) {
      return NextResponse.redirect(new URL(Routes.Login, request.url));
    }
  }

  return NextResponse.next();
}
