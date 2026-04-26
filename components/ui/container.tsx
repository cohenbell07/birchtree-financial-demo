import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** narrow=prose-width, default=app-width, wide=feature width */
  size?: "narrow" | "default" | "wide"
}

const SIZE: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
}

/**
 * Container — single source of truth for horizontal gutters and max width.
 * Replaces `container mx-auto px-4 sm:px-6 lg:px-8` repeated everywhere.
 */
export function Container({
  size = "default",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        "relative z-10 mx-auto w-full px-5 sm:px-8 lg:px-10",
        SIZE[size],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
