import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Only protect /admin routes (except /admin/login)
  if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
    // Check for auth cookies (set by login API)
    const accessToken = req.cookies.get("sb-access-token")?.value
    const userId = req.cookies.get("sb-user-id")?.value

    // If no tokens, redirect to login
    if (!accessToken || !userId) {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }

    // Actual auth verification will happen server-side in each page/API route
    // This middleware just checks for the presence of auth cookies
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

