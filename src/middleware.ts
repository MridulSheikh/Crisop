import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authPublicRoute = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

const privateRoute = ["/order", "/profile", "/checkout"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value || "";
  const path = request.nextUrl.pathname;

  const isAuthPublicRoute = authPublicRoute.some((route) =>
    path.startsWith(route)
  );

  const isPrivateRoute = privateRoute.some((route) =>
    path.startsWith(route)
  );

  // logged in user trying to access auth pages
  if (isAuthPublicRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // protected route without login
  if (isPrivateRoute && !token) {
    const fullPath = request.nextUrl.pathname + request.nextUrl.search;
    return NextResponse.redirect(new URL(`/login?redirect=${fullPath}`, request.url));
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/order/:path*",
    "/profile/:path*",
    "/checkout/:path*",
  ],
};