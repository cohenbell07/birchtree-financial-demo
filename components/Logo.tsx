"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "default" | "white"
}

export default function Logo({ variant = "default" }: LogoProps) {
  return (
    <Link href="/" className="flex items-center group">
      {/* Logo Image */}
      <div className="relative">
        <Image
          src="/birchtree logo22.png"
          alt="Birchtree Financial Logo"
          width={500}
          height={150}
          className={cn(
            "h-16 sm:h-20 md:h-24 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90",
            variant === "white" && "brightness-0 invert"
          )}
          priority
        />
      </div>
    </Link>
  )
}
