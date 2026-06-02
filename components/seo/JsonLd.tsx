import React from "react"

/**
 * Renders a JSON-LD <script> tag. Server-component friendly.
 * Pass a single schema graph object (use builders in lib/schema.ts).
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so a string value can never break out of the <script> tag
      // (Next.js' documented JSON-LD hardening) once content becomes CMS-driven.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
