import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

/**
 * Admin-only route to generate blog posts using AI
 * 
 * Usage:
 * POST /api/admin/generate-post
 * Body: { topic: "RRSP deadlines for 2024", secret: "YOUR_ADMIN_SECRET" }
 * 
 * If OPENAI_API_KEY is not set, returns a friendly message
 */
export async function POST(request: NextRequest) {
  // Basic auth check
  const ADMIN_SECRET = process.env.ADMIN_DASHBOARD_SECRET
  const body = await request.json()
  const { topic, secret } = body

  if (ADMIN_SECRET && secret !== ADMIN_SECRET) {
    return NextResponse.json(
      { ok: false, reason: "unauthorized" },
      { status: 401 }
    )
  }

  if (!topic) {
    return NextResponse.json(
      { ok: false, reason: "missing_topic" },
      { status: 400 }
    )
  }

  if (!OPENAI_API_KEY) {
    return NextResponse.json({
      ok: false,
      reason: "openai_not_configured",
      message: "Blog generation unavailable. OPENAI_API_KEY not set in environment variables.",
    })
  }

  try {
    // Generate slug from topic
    const slug = topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .substring(0, 50)

    // Call OpenAI to generate post
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a financial content writer for Birchtree Financial, a Canadian financial advisory firm. Write comprehensive, educational blog posts about Canadian financial topics. Always include:
- Clear headings (## for main sections, ### for subsections)
- Bullet points for lists
- Internal links to tools like [Risk Profiler](/tools/risk-profiler) or [Retirement Calculator](/tools/retirement-calculator)
- Canadian-specific information (RRSP, TFSA, CPP, OAS, etc.)
- Professional, helpful tone
- Actionable advice`,
          },
          {
            role: "user",
            content: `Write a comprehensive blog post about: ${topic}. Make it 800-1200 words, well-structured with headings, and include internal links to relevant tools on birchtreefinancial.ca. Focus on Canadian financial advisory services.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json()
      throw new Error(errorData.error?.message || "OpenAI API error")
    }

    const openaiData = await openaiResponse.json()
    const content = openaiData.choices[0]?.message?.content || ""

    if (!content) {
      throw new Error("No content generated")
    }

    // Generate frontmatter
    const title = topic.charAt(0).toUpperCase() + topic.slice(1)
    const description = content.substring(0, 160).replace(/\n/g, " ") + "..."
    const publishedAt = new Date().toISOString().split("T")[0]
    
    // Extract tags (simplified - in production, use AI to suggest tags)
    const tags = ["Financial Advisory", "Canadian Finance"]
    if (topic.toLowerCase().includes("rrsp")) tags.push("RRSP")
    if (topic.toLowerCase().includes("tfsa")) tags.push("TFSA")
    if (topic.toLowerCase().includes("retirement")) tags.push("Retirement Planning")
    if (topic.toLowerCase().includes("tax")) tags.push("Tax Optimization")

    // Create frontmatter
    const frontmatter = `---
title: "${title}"
description: "${description}"
publishedAt: "${publishedAt}"
tags: ${JSON.stringify(tags)}
slug: "${slug}"
---

`

    const fullContent = frontmatter + content

    // Save to file (or return for preview)
    const postsDirectory = path.join(process.cwd(), "content/blog")
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
    }

    const filePath = path.join(postsDirectory, `${slug}.mdx`)
    fs.writeFileSync(filePath, fullContent, "utf8")

    return NextResponse.json({
      ok: true,
      slug,
      title,
      description,
      tags,
      content: fullContent,
      saved: true,
      filePath: filePath.replace(process.cwd(), ""),
    })
  } catch (error: any) {
    console.error("[API] admin/generate-post error:", error)
    return NextResponse.json(
      {
        ok: false,
        reason: "generation_failed",
        message: error.message || "Failed to generate blog post",
      },
      { status: 500 }
    )
  }
}

