"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      {/* Minimalist tree/branch geometric symbol */}
      <div className="relative">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-emerald"
        >
          {/* Vertical line (tree trunk) */}
          <line
            x1="16"
            y1="8"
            x2="16"
            y2="24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Branch lines */}
          <line
            x1="16"
            y1="12"
            x2="10"
            y2="10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-80"
          />
          <line
            x1="16"
            y1="16"
            x2="22"
            y2="14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-80"
          />
          <line
            x1="16"
            y1="20"
            x2="9"
            y2="18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-60"
          />
          {/* Small accent dot */}
          <circle
            cx="16"
            cy="6"
            r="1.5"
            fill="currentColor"
            className="opacity-60"
          />
        </svg>
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-emerald/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Text - Updated to Birchtree (lowercase t) */}
      <div className="flex flex-col">
        <span className="text-xl font-heading font-bold text-midnight leading-tight tracking-tight">
          Birchtree
        </span>
        <span className="text-xs font-subhead font-medium text-teal leading-tight tracking-wider">
          Financial
        </span>
      </div>
    </Link>
  )
}
