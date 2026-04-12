import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { getAllPosts } from "@/lib/blog"

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

/**
 * Admin-only route to generate blog posts using AI (Claude)
 *
 * Usage:
 * POST /api/admin/generate-post
 * Body: { topic: "RRSP deadlines for 2026" }
 */
export async function POST(request: NextRequest) {
  // Admin auth check using cookies
  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

  try {
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const { cookies } = await import("next/headers")
      const { createClient } = await import("@supabase/supabase-js")

      const cookieStore = await cookies()
      const userId = cookieStore.get("sb-user-id")?.value
      const sessionToken = cookieStore.get("sb-access-token")?.value

      if (userId && sessionToken) {
        try {
          const sessionData = JSON.parse(Buffer.from(sessionToken, "base64").toString())
          const sessionAge = Date.now() - sessionData.timestamp
          if (sessionAge <= 7 * 24 * 60 * 60 * 1000 && sessionData.userId === userId) {
            const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
              auth: { autoRefreshToken: false, persistSession: false },
            })
            const { data: adminUser } = await supabase
              .from("admin_users")
              .select("id")
              .eq("id", userId)
              .single()
            if (!adminUser) {
              throw new Error("Not admin")
            }
          } else {
            throw new Error("Invalid session")
          }
        } catch {
          // Fall through to secret check
        }
      }
    }
  } catch {
    // Fall through to secret check
  }

  const body = await request.json()
  const { topic, publishedAt } = body

  // Check for duplicate topics
  const existingPosts = getAllPosts()
  const topicLower = topic.toLowerCase()
  const isDuplicate = existingPosts.some((post) => {
    const postTitleLower = post.title.toLowerCase()
    const postSlugLower = post.slug.toLowerCase()
    return (
      postTitleLower.includes(topicLower) ||
      topicLower.includes(postTitleLower) ||
      postSlugLower.includes(topicLower.replace(/[^a-z0-9]+/g, "-"))
    )
  })

  if (isDuplicate) {
    return NextResponse.json({
      ok: false,
      reason: "duplicate_topic",
      message: "A blog post with a similar topic already exists. Please choose a different topic.",
    })
  }

  if (!topic) {
    return NextResponse.json(
      { ok: false, reason: "missing_topic" },
      { status: 400 }
    )
  }

  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({
      ok: false,
      reason: "api_not_configured",
      message: "Blog generation unavailable. ANTHROPIC_API_KEY not set in environment variables.",
    })
  }

  try {
    const slug = topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .substring(0, 50)

    const currentYear = new Date().getFullYear()

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2500,
        system: `You are a financial content writer for Birchtree Financial, a Canadian financial advisory firm based in Olds, Alberta.

CRITICAL REQUIREMENTS — CANADIAN CONTENT ONLY:
- ALL content must be Canada-specific. Use Canadian financial terms ONLY:
  * RRSP (Registered Retirement Savings Plan) — NOT 401(k) or IRA
  * TFSA (Tax-Free Savings Account) — NOT Roth IRA
  * CPP (Canada Pension Plan) — NOT Social Security
  * OAS (Old Age Security) — Canadian program
  * RESP (Registered Education Savings Plan) — Canadian program
  * CRA (Canada Revenue Agency) — NOT IRS
  * Canadian dollars (CAD) — NOT USD
  * Canadian provinces and territories
  * Canadian tax brackets and rates for ${currentYear}
  * Canadian investment regulations

- NEVER mention USA-specific terms: 401(k), IRA, Roth IRA, Social Security, IRS, USD, US states

WRITING STYLE:
- Clear headings (## for main sections, ### for subsections)
- Bullet points for lists
- Include internal links to relevant tools: [Retirement Calculator](/tools/retirement-calculator), [Tax Optimization Calculator](/tools/tax-optimization-calculator), [Risk Profiler](/tools/risk-profiler), [TFSA vs RRSP Analyzer](/tools/tfsa-rrsp-analyzer), [RESP Planner](/tools/resp-planner), [CPP/OAS Optimizer](/tools/cpp-oas-optimizer)
- Professional, warm, authoritative tone
- Actionable advice with specific numbers and examples
- 800-1200 words, well-structured
- Use current ${currentYear} contribution limits, tax brackets, and figures
- End with a brief call to action mentioning Birchtree Financial's complimentary consultations`,
        messages: [
          {
            role: "user",
            content: `Write a comprehensive blog post about: ${topic}

This is for a Canadian financial advisory firm. Use ONLY Canadian financial terms, regulations, and ${currentYear} figures. Make it 800-1200 words with clear headings and actionable advice. Include internal links to relevant tools where natural.`,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Anthropic API error")
    }

    const data = await response.json()
    const content = data.content?.[0]?.text || ""

    if (!content) {
      throw new Error("No content generated")
    }

    const title = topic.charAt(0).toUpperCase() + topic.slice(1)
    const description = content.substring(0, 160).replace(/\n/g, " ") + "..."
    const publishDate = publishedAt || new Date().toISOString().split("T")[0]

    const tags = ["Financial Advisory", "Canadian Finance"]
    if (topic.toLowerCase().includes("rrsp")) tags.push("RRSP")
    if (topic.toLowerCase().includes("tfsa")) tags.push("TFSA")
    if (topic.toLowerCase().includes("retirement")) tags.push("Retirement Planning")
    if (topic.toLowerCase().includes("tax")) tags.push("Tax Optimization")
    if (topic.toLowerCase().includes("estate")) tags.push("Estate Planning")
    if (topic.toLowerCase().includes("insurance")) tags.push("Insurance")
    if (topic.toLowerCase().includes("resp")) tags.push("Education Savings")

    const frontmatter = `---
title: "${title}"
description: "${description}"
publishedAt: "${publishDate}"
tags: ${JSON.stringify(tags)}
slug: "${slug}"
status: "draft"
---

`

    const fullContent = frontmatter + content

    return NextResponse.json({
      ok: true,
      slug,
      title,
      description,
      tags,
      content: fullContent,
      publishedAt: publishDate,
      saved: false,
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
