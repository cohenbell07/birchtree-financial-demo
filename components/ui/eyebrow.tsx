import { cn } from "@/lib/utils"

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  tone?: "light" | "dark"
}

/**
 * Eyebrow — the small uppercase label that sits above headings throughout the
 * site ("What We Offer", "Client Stories", "Get Started Today"). Used 8+ times
 * on the home page alone before this primitive existed.
 */
export function Eyebrow({
  tone = "light",
  className,
  children,
  ...rest
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-body font-medium uppercase tracking-[0.28em]",
        "text-[0.7rem] sm:text-xs",
        tone === "dark" ? "text-gold/70" : "text-gold",
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  )
}
