import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const authPublicRoute = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

const privateRoute = ["/order", "/profile", "/checkout", "/admin"];

// allowed roles
const allowedRoles = ["admin", "manager", "super"];

type DecodedToken = {
  role?: string;
  exp?: number;
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value || "";
  const path = request.nextUrl.pathname;

  const isAuthPublicRoute = authPublicRoute.some((route) =>
    path.startsWith(route),
  );

  const isPrivateRoute = privateRoute.some((route) => path.startsWith(route));

  let userRole: string | null = null;

  // decode token
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      userRole = decoded?.role || null;
    } catch (error) {
      console.log("Invalid token");
    }
  }

  //  logged in user trying to access auth pages
  if (isAuthPublicRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //  protected route without login
  if (isPrivateRoute && !token) {
    const fullPath = request.nextUrl.pathname + request.nextUrl.search;
    return NextResponse.redirect(
      new URL(`/login?redirect=${fullPath}`, request.url),
    );
  }

  //  ROLE-BASED PROTECTION
  if (path.startsWith("/admin")) {
    if (path === "/admin") {
      return NextResponse.redirect(new URL("/admin/product", request.url));
    }
    if (!userRole || !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
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
    "/admin/:path*",
  ],
};
