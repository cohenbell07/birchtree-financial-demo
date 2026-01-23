/**
 * Helper function to append unsubscribe footer to newsletter HTML
 * This is called automatically when sending newsletters
 */

export function appendUnsubscribeFooter(htmlContent: string, email: string): string {
  // Encode email for URL safety
  const encodedEmail = encodeURIComponent(email)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://birchtreefinancial.ca"
  const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?email=${encodedEmail}`

  // Create minimal, email-client-safe footer
  const footer = `
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center; line-height: 1.5;">
      <p style="margin: 0 0 8px 0;">
        You're receiving this email because you subscribed to Birchtree Financial updates.
      </p>
      <p style="margin: 0;">
        <a href="${unsubscribeUrl}" style="color: #16A085; text-decoration: underline;">Unsubscribe</a>
      </p>
    </div>
  `

  // Append footer to content (before closing body/html tags if they exist, otherwise just append)
  if (htmlContent.includes("</body>")) {
    return htmlContent.replace("</body>", `${footer}</body>`)
  } else if (htmlContent.includes("</html>")) {
    return htmlContent.replace("</html>", `${footer}</html>`)
  } else {
    // No body/html tags, just append
    return htmlContent + footer
  }
}

