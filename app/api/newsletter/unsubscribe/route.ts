import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/supabaseServer"

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email")

    // Validate email parameter
    if (!email) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Unsubscribe - Birchtree Financial</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #0B1A2C;
                max-width: 600px;
                margin: 50px auto;
                padding: 20px;
              }
              .container {
                background: #F5F7FA;
                padding: 30px;
                border-radius: 8px;
                text-align: center;
              }
              .error {
                color: #dc2626;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Unsubscribe</h1>
              <p class="error">Invalid request. Please use the unsubscribe link from your email.</p>
            </div>
          </body>
        </html>
        `,
        {
          status: 400,
          headers: { "Content-Type": "text/html" },
        }
      )
    }

    // Normalize email (trim + lowercase)
    const normalizedEmail = email.trim().toLowerCase()

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Unsubscribe - Birchtree Financial</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #0B1A2C;
                max-width: 600px;
                margin: 50px auto;
                padding: 20px;
              }
              .container {
                background: #F5F7FA;
                padding: 30px;
                border-radius: 8px;
                text-align: center;
              }
              .error {
                color: #dc2626;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Unsubscribe</h1>
              <p class="error">Invalid email address.</p>
            </div>
          </body>
        </html>
        `,
        {
          status: 400,
          headers: { "Content-Type": "text/html" },
        }
      )
    }

    // Update subscriber status
    const result = await db.updateNewsletterSubscriberStatus(
      normalizedEmail,
      "unsubscribed",
      new Date().toISOString()
    )

    // Handle gracefully - don't throw errors for already-unsubscribed or non-existent emails
    // This makes the endpoint idempotent (safe to click multiple times)
    const isSuccess = result.data !== null && !result.error
    const isAlreadyUnsubscribed = result.error?.code === "PGRST116" || result.error?.message?.includes("not found")

    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Unsubscribe - Birchtree Financial</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #0B1A2C;
              max-width: 600px;
              margin: 50px auto;
              padding: 20px;
            }
            .container {
              background: #F5F7FA;
              padding: 30px;
              border-radius: 8px;
              text-align: center;
            }
            .success {
              color: #16A085;
            }
            .message {
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Unsubscribe</h1>
            <div class="message">
              ${isSuccess || isAlreadyUnsubscribed
                ? '<p class="success">You have been successfully unsubscribed from Birchtree Financial newsletters.</p><p>You will no longer receive email updates from us.</p>'
                : '<p>We were unable to process your unsubscribe request. If you continue to receive emails, please contact us directly.</p>'
              }
            </div>
            <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
              <a href="/" style="color: #16A085; text-decoration: underline;">Return to Birchtree Financial</a>
            </p>
          </div>
        </body>
      </html>
      `,
      {
        status: isSuccess || isAlreadyUnsubscribed ? 200 : 500,
        headers: { "Content-Type": "text/html" },
      }
    )
  } catch (error: any) {
    console.error("[API] newsletter/unsubscribe error:", error)
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Unsubscribe - Birchtree Financial</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #0B1A2C;
              max-width: 600px;
              margin: 50px auto;
              padding: 20px;
            }
            .container {
              background: #F5F7FA;
              padding: 30px;
              border-radius: 8px;
              text-align: center;
            }
            .error {
              color: #dc2626;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Unsubscribe</h1>
            <p class="error">An error occurred processing your request. Please try again later.</p>
          </div>
        </body>
      </html>
      `,
      {
        status: 500,
        headers: { "Content-Type": "text/html" },
      }
    )
  }
}

