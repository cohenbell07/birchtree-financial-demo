import { cn } from "@/lib/utils"

type SectionTone = "paper" | "paper-soft" | "dark" | "dark-aurora" | "transparent"
type SectionRhythm = "default" | "tight"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone
  rhythm?: SectionRhythm
  /** Adds a subtle gold hairline at the top edge of the section. */
  topRule?: boolean
  /** Adds a film-grain overlay (existing .grain-overlay). */
  grain?: boolean
  as?: "section" | "div"
}

const TONE_CLASSES: Record<SectionTone, string> = {
  "paper": "bt-section--paper",
  "paper-soft": "bt-section--paper-soft",
  "dark": "bt-section--dark",
  "dark-aurora": "bt-section--dark-aurora",
  "transparent": "",
}

/**
 * Section — vertical rhythm + tonal background in a single primitive.
 *
 * Use `tone="paper"` for the default light editorial surface, `paper-soft`
 * for the alternate light, `dark` for the navy mission/CTA bands, and
 * `dark-aurora` for the showpiece dark sections (paint-only, no JS).
 *
 * Replaces the per-page `py-20 sm:py-28 md:py-36 lg:py-44` + inline gradient
 * style that was duplicated across 20+ pages.
 */
export function Section({
  tone = "transparent",
  rhythm = "default",
  topRule = false,
  grain = false,
  as: Tag = "section",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "relative overflow-hidden",
        rhythm === "tight" ? "bt-section--tight" : "bt-section",
        TONE_CLASSES[tone],
        grain && "grain-overlay",
        className,
      )}
      {...rest}
    >
      {topRule && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(215,195,138,0.28), transparent)",
          }}
        />
      )}
      {children}
    </Tag>
  )
}
