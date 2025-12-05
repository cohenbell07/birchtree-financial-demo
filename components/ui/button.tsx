import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden button-shimmer",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-emerald to-emerald-light text-white hover:shadow-lg hover:scale-[1.02] hover:from-emerald-light hover:to-emerald shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md",
        outline:
          "border-2 border-emerald text-emerald hover:bg-emerald/10 hover:shadow-md hover:border-emerald-light [&>*]:text-emerald",
        secondary:
          "bg-teal text-white hover:bg-teal-light hover:shadow-md shadow-md",
        ghost: "text-midnight hover:bg-white/50 hover:text-emerald [&>*]:text-midnight [&>*]:hover:text-emerald",
        link: "text-emerald underline-offset-4 hover:underline [&>*]:text-emerald",
        champagne: "bg-gradient-to-r from-gold to-gold-light text-white hover:shadow-lg shadow-md [&>*]:text-white",
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

