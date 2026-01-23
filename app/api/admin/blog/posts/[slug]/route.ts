import { NextRequest, NextResponse } from "next/server"
import { getPostBySlug } from "@/lib/blog"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

async function verifyAdmin() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Not configured")
  }

  const cookieStore = await cookies()
  const userId = cookieStore.get("sb-user-id")?.value
  const sessionToken = cookieStore.get("sb-access-token")?.value

  if (!userId || !sessionToken) {
    throw new Error("Not authenticated")
  }

  try {
    const sessionData = JSON.parse(Buffer.from(sessionToken, "base64").toString())
    const sessionAge = Date.now() - sessionData.timestamp
    if (sessionAge > 7 * 24 * 60 * 60 * 1000 || sessionData.userId !== userId) {
      throw new Error("Invalid session")
    }
  } catch {
    throw new Error("Invalid session")
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const { data: adminUser, error: adminError } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", userId)
    .single()

  if (adminError || !adminUser) {
    throw new Error("Not authorized")
  }

  return { id: userId }
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await verifyAdmin()
    const post = getPostBySlug(params.slug)
    
    if (!post) {
      return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 })
    }

    // Read the full file content including frontmatter
    const postsDirectory = path.join(process.cwd(), "content/blog")
    const fileNames = fs.readdirSync(postsDirectory)
    const fileName = fileNames.find((name) => {
      if (!name.endsWith(".mdx")) return false
      const fullPath = path.join(postsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)
      return (data.slug || name.replace(/\.mdx$/, "")) === params.slug
    })

    if (fileName) {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      
      return NextResponse.json({ ok: true, post: { ...post, rawContent: fileContents } })
    }

    return NextResponse.json({ ok: true, post })
  } catch (error: any) {
    if (error.message === "Not authenticated" || error.message === "Not authorized") {
      return NextResponse.json({ ok: false, error: error.message }, { status: 401 })
    }
    return NextResponse.json({ ok: false, error: error.message || "Failed to fetch post" }, { status: 500 })
  }
}

