import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

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

export async function POST(request: NextRequest) {
  try {
    await verifyAdmin()
    const body = await request.json()
    const { slug, title, description, content, publishedAt, tags, status } = body

    if (!slug || !title || !content) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    // Parse content to extract frontmatter and body
    let frontmatter: any = {}
    let bodyContent = content

    // If content includes frontmatter, parse it
    if (content.includes("---")) {
      try {
        const parsed = matter(content)
        frontmatter = parsed.data
        bodyContent = parsed.content
      } catch {
        // If parsing fails, treat entire content as body
      }
    }

    // Update frontmatter with provided values
    const finalFrontmatter = {
      title: title || frontmatter.title || "Untitled",
      description: description || frontmatter.description || "",
      publishedAt: publishedAt || frontmatter.publishedAt || new Date().toISOString().split("T")[0],
      tags: tags || frontmatter.tags || [],
      slug: slug || frontmatter.slug,
      status: status || frontmatter.status || "draft", // draft or published
    }

    // Create frontmatter string
    const frontmatterString = `---
title: "${finalFrontmatter.title.replace(/"/g, '\\"')}"
description: "${(finalFrontmatter.description || "").replace(/"/g, '\\"')}"
publishedAt: "${finalFrontmatter.publishedAt}"
tags: ${JSON.stringify(finalFrontmatter.tags)}
slug: "${finalFrontmatter.slug}"
status: "${finalFrontmatter.status}"
---

`

    const fullContent = frontmatterString + bodyContent

    // Save to file
    const postsDirectory = path.join(process.cwd(), "content/blog")
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
    }

    const filePath = path.join(postsDirectory, `${finalFrontmatter.slug}.mdx`)
    fs.writeFileSync(filePath, fullContent, "utf8")

    return NextResponse.json({
      ok: true,
      slug: finalFrontmatter.slug,
      title: finalFrontmatter.title,
      saved: true,
      filePath: filePath.replace(process.cwd(), ""),
    })
  } catch (error: any) {
    console.error("[API] admin/blog/save error:", error)
    if (error.message === "Not authenticated" || error.message === "Not authorized") {
      return NextResponse.json({ ok: false, error: error.message }, { status: 401 })
    }
    return NextResponse.json({ ok: false, error: error.message || "Failed to save post" }, { status: 500 })
  }
}

