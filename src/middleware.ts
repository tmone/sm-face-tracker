import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const handleI18n = createMiddleware({
    locales: ['en', 'vi'],
    defaultLocale: 'vi'
  });
  return handleI18n(request);
}

export const config = {
  matcher: ['/', '/(vi|en)/:path*']
};