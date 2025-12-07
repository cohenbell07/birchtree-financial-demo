import { NextRequest, NextResponse } from "next/server"
import { getPostBySlug } from "@/lib/blog"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = getPostBySlug(params.slug)

    if (!post) {
      return NextResponse.json(
        { ok: false, reason: "not_found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ok: true,
      post,
    })
  } catch (error: any) {
    console.warn(`[API] blog/posts/${params.slug} error:`, error)
    return NextResponse.json(
      { ok: false, reason: "server_error" },
      { status: 500 }
    )
  }
}

