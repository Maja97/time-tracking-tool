import cookieKeys from '@app/_consts/cookies';
import { Routes } from '@app/_consts/routes';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(cookieKeys.TOKEN);
  const path = request.nextUrl.pathname;
  if (token) {
    if (path.startsWith(Routes.Login) || path.startsWith(Routes.Register)) {
      return NextResponse.redirect(new URL(Routes.Home, request.url));
    }
  } else {
    if (
      path === Routes.Home ||
      path.startsWith(Routes.Trackers) ||
      path.startsWith(Routes.History)
    ) {
      return NextResponse.redirect(new URL(Routes.Login, request.url));
    }
  }

  return NextResponse.next();
}
