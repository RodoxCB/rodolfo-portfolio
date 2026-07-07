import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
      const token = request.cookies.get(SESSION_COOKIE)?.value;
      if (!(await verifySessionToken(token))) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  }

  const pathnameLocale = pathname.split("/")[1];
  if (isLocale(pathnameLocale)) {
    return NextResponse.next();
  }

  const locale = defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|icon.svg|projects|uploads|media).*)"],
};
