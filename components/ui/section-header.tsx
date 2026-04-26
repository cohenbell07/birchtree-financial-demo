import { cn } from "@/lib/utils"
import { Eyebrow } from "./eyebrow"

interface SectionHeaderProps {
  eyebrow?: string
  heading: React.ReactNode
  /** Optional descriptive paragraph below the heading. */
  subtitle?: React.ReactNode
  /** Render a thin gold rule between heading and subtitle. */
  rule?: boolean
  /** Layout — center stacks everything, left aligns to the start. */
  align?: "center" | "left"
  /** Light surface or on-dark. Affects contrast tokens only. */
  tone?: "light" | "dark"
  className?: string
  as?: "h1" | "h2" | "h3"
}

/**
 * SectionHeader — eyebrow + heading + (optional) gold rule + (optional)
 * subtitle, in a consistent vertical rhythm. Replaces the eight-line
 * boilerplate repeated above every section.
 */
export function SectionHeader({
  eyebrow,
  heading,
  subtitle,
  rule = false,
  align = "center",
  tone = "light",
  className,
  as: Heading = "h2",
}: SectionHeaderProps) {
  const isCenter = align === "center"
  const headingColor = tone === "dark" ? "text-white" : "text-midnight"
  // Dark surfaces need higher opacity on body text for WCAG contrast.
  const subColor = tone === "dark" ? "text-white/80" : "text-midnight/65"

  return (
    <header
      className={cn(
        "max-w-3xl",
        isCenter ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow tone={tone} className="mb-5">
          {eyebrow}
        </Eyebrow>
      )}
      <Heading
        className={cn(
          "font-heading font-bold tracking-tight text-balance",
          headingColor,
          "leading-[1.08]",
          "text-[clamp(1.85rem,1.3rem+2.2vw,3.4rem)]",
        )}
      >
        {heading}
      </Heading>
      {rule && (
        <div
          aria-hidden
          className={cn("mt-6 h-px w-20", isCenter && "mx-auto")}
          style={{
            background:
              tone === "dark"
                ? "linear-gradient(to right, transparent, rgba(215,195,138,0.5), transparent)"
                : "linear-gradient(to right, transparent, rgba(215,195,138,0.7), transparent)",
          }}
        />
      )}
      {subtitle && (
        <p
          className={cn(
            "mt-6 text-balance leading-relaxed",
            "text-[clamp(1rem,0.92rem+0.5vw,1.2rem)]",
            subColor,
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  )
}
