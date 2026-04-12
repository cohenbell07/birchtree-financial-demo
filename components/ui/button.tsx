import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden button-shimmer",
  {
    variants: {
      variant: {
        default: "bg-gold/90 hover:bg-gold text-midnight font-semibold hover:shadow-[0_4px_20px_rgba(215,195,138,0.25)] hover:scale-[1.02] shadow-md rounded-xl [&>*]:text-midnight",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md",
        outline:
          "border-2 border-midnight/20 text-midnight hover:bg-midnight/5 hover:shadow-md hover:border-midnight/40 [&>*]:text-midnight",
        secondary:
          "bg-midnight text-white hover:bg-midnight-light hover:shadow-md shadow-md [&>*]:text-white",
        ghost: "text-midnight hover:bg-midnight/5 hover:text-midnight [&>*]:text-midnight",
        link: "text-midnight underline-offset-4 hover:underline hover:text-midnight/70 [&>*]:text-midnight",
        champagne: "bg-gold/90 hover:bg-gold text-midnight font-semibold hover:shadow-lg shadow-md rounded-xl [&>*]:text-midnight",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

