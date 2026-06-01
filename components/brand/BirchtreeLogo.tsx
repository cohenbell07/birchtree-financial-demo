import { cn } from "@/lib/utils"
import BirchTreeMark from "./BirchTreeMark"

interface BirchtreeLogoProps {
  /** Dark surfaces (footer/overlay) render the lockup in cream/white. */
  variant?: "default" | "white"
  /** Wrapper classes (alignment, gap overrides). */
  className?: string
  /** Height of the tree mark — drives the overall lockup scale. */
  markClassName?: string
  /** Size/weight of the wordmark. */
  textClassName?: string
}

/**
 * Birchtree Financial primary logo lockup: the vector birch mark paired with
 * the wordmark set in our heading serif (Libre Baskerville). Built from real
 * text + SVG so it stays razor-sharp at any size and recolors cleanly for
 * dark surfaces — a step up from the old flat PNG. Purely presentational;
 * callers wrap it in their own <Link> as needed.
 */
export default function BirchtreeLogo({
  variant = "default",
  className,
  markClassName = "h-[2.9rem]",
  textClassName = "text-[1.6rem]",
}: BirchtreeLogoProps) {
  const tone = variant === "white" ? "text-white" : "text-midnight"

  return (
    <span className={cn("inline-flex items-center gap-[0.62rem]", className)}>
      <BirchTreeMark className={cn(markClassName, tone)} />
      <span
        className={cn(
          "font-heading font-normal leading-none tracking-[-0.012em]",
          textClassName,
          tone,
        )}
      >
        Birchtree
        <span className={variant === "white" ? "text-white/90" : "text-midnight/85"}>
          {" "}
          Financial
        </span>
      </span>
    </span>
  )
}
