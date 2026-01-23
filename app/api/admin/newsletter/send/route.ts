import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/supabaseServer"
import { sendEmail } from "@/lib/email"
import { appendUnsubscribeFooter } from "@/lib/newsletterFooter"
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

  // Verify session token
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
    const { post_id } = body

    if (!post_id) {
      return NextResponse.json({ ok: false, error: "Missing post_id" }, { status: 400 })
    }

    // Get the newsletter post
    const postResult = await db.getNewsletterPost(post_id)
    if (postResult.error || !postResult.data) {
      return NextResponse.json({ ok: false, error: "Post not found" }, { status: 404 })
    }

    const post = postResult.data as any

    // Check if already sent
    if (post.status === "sent") {
      return NextResponse.json({ ok: false, error: "Newsletter already sent" }, { status: 400 })
    }

    // Get all active subscribers
    const subscribersResult = await db.getAllNewsletterSubscribers()
    if (subscribersResult.error || !subscribersResult.data) {
      return NextResponse.json({ ok: false, error: "Failed to fetch subscribers" }, { status: 500 })
    }

    const subscribers = subscribersResult.data as any[]
    const totalSubscribers = subscribers.length

    if (totalSubscribers === 0) {
      return NextResponse.json({ ok: false, error: "No active subscribers" }, { status: 400 })
    }

    // Send emails to all subscribers
    let successCount = 0
    let errorCount = 0
    const errors: string[] = []

    for (const subscriber of subscribers) {
      try {
        // Append unsubscribe footer to each email
        const emailContent = appendUnsubscribeFooter(post.content_html, subscriber.email)

        const emailResult = await sendEmail(
          subscriber.email,
          post.subject,
          emailContent
        )

        if (emailResult.ok) {
          successCount++
          // Log the send
          await db.createNewsletterSend({
            post_id: post_id,
            subscriber_email: subscriber.email,
            status: "sent",
            sent_at: new Date().toISOString(),
          })
        } else {
          errorCount++
          errors.push(`${subscriber.email}: ${emailResult.reason}`)
          // Log failed send
          await db.createNewsletterSend({
            post_id: post_id,
            subscriber_email: subscriber.email,
            status: "failed",
            sent_at: new Date().toISOString(),
          })
        }
      } catch (error: any) {
        errorCount++
        errors.push(`${subscriber.email}: ${error.message}`)
      }
    }

    // Mark post as sent
    await db.markNewsletterPostSent(post_id)

    return NextResponse.json({
      ok: true,
      sent: {
        total: totalSubscribers,
        success: successCount,
        errors: errorCount,
        errorDetails: errors.slice(0, 10), // Limit error details
      },
    })
  } catch (error: any) {
    console.error("[API] admin/newsletter/send error:", error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 401 })
  }
}

