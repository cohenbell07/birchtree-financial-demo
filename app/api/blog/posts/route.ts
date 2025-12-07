import { NextResponse } from "next/server"
import { getAllPosts, getAllTags } from "@/lib/blog"

export async function GET() {
  try {
    const posts = getAllPosts()
    const tags = getAllTags()

    // Return only metadata, not full content
    const postsMetadata = posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      publishedAt: post.publishedAt,
      tags: post.tags,
    }))

    return NextResponse.json({
      ok: true,
      posts: postsMetadata,
      tags,
    })
  } catch (error: any) {
    console.warn("[API] blog/posts error:", error)
    return NextResponse.json({
      ok: true,
      posts: [],
      tags: [],
    })
  }
}

