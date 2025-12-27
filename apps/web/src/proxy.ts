import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/api/auth") || pathname.startsWith("/_next/") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // ✅ Public routes
  const publicRoutes = ["/"];

  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  let user = null;

  try {
    const headers = new Headers(request.headers);
    const session = await auth.api.getSession({ headers });
    user = session?.user ?? null;
  } catch {}

  // Auth pages
  if (pathname.startsWith("/auth")) {
    if (user) return NextResponse.redirect(new URL("/", request.url));
    return NextResponse.next();
  }

  // Protected dashboard
  if (!user && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  const role = user?.role;

  // Admin auto redirect
  if (pathname === "/dashboard" && role === "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  // Admin-only protection
  if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|assets/|logos/|images/|favicon.ico|sw.js).*)"],
};
