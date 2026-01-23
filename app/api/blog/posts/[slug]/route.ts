import { NextRequest, NextResponse } from "next/server"
import { getPostBySlug } from "@/lib/blog"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const post = getPostBySlug(params.slug)
    
    if (!post) {
      return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 })
    }

    // Don't allow public access to drafts
    if (post.status === "draft") {
      return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ ok: true, post })
  } catch (error: any) {
    console.warn(`[API] blog/posts/[slug] error:`, error)
    return NextResponse.json({ ok: false, error: error.message || "Failed to fetch post" }, { status: 500 })
  }
}
