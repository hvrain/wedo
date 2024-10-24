import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  resetPasswordRoutes,
} from "./routes";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  const isLoggedIn = accessToken?.value;
  const isApiAuth = pathname.startsWith(apiAuthPrefix);
  const isPasswordResetPath = pathname.startsWith(resetPasswordRoutes);
  const isPublicPath = publicRoutes.includes(pathname);
  const isAuthPath = authRoutes.includes(pathname);

  if (isApiAuth || isPasswordResetPath) return null;
  if (isAuthPath) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicPath) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }
  return null;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
