"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoTreeIconProps {
  className?: string
}

// Tree icon component using the standalone newtreeicon.png
export default function LogoTreeIcon({ className = "h-9 w-9" }: LogoTreeIconProps) {
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <Image
        src="/newtreeicon.png"
        alt="Birch Tree Icon"
        width={96}
        height={96}
        className="h-full w-full object-contain"
        priority={false}
      />
    </div>
  )
}

