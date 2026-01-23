import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true })

  // Clear auth cookies
  response.cookies.delete("sb-access-token")
  response.cookies.delete("sb-user-id")

  return response
}

