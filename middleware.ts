import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/kv";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("[MIDDLEWARE] Request to:", pathname);

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    console.log("[MIDDLEWARE] Admin route detected, checking session");
    const sessionToken = request.cookies.get("admin_session")?.value;
    console.log(
      "[MIDDLEWARE] Session token from cookie:",
      sessionToken ? sessionToken.substring(0, 8) + "..." : "not found"
    );
    console.log(
      "[MIDDLEWARE] All cookies:",
      request.cookies
        .getAll()
        .map((c) => ({ name: c.name, value: c.value.substring(0, 8) + "..." }))
    );

    if (!sessionToken) {
      console.log("[MIDDLEWARE] No session token found, redirecting to login");
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    // Verify session against KV
    console.log("[MIDDLEWARE] Verifying session in KV");
    const isValid = await getSession(sessionToken);
    console.log("[MIDDLEWARE] Session valid:", isValid);
    if (!isValid) {
      console.log("[MIDDLEWARE] Session invalid, redirecting to login");
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    console.log("[MIDDLEWARE] Session valid, allowing access");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
