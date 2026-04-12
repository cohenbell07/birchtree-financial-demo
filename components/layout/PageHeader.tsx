"use client"

import { motion, useReducedMotion } from "framer-motion"
import RevealText from "@/components/RevealText"

// Per-page accent colors — subtle radial glow
const accentPresets: Record<string, { position: string; color: string }> = {
  gold: { position: "top-[20%] right-[10%]", color: "rgba(215,195,138,0.05)" },
  blue: { position: "top-[30%] left-[15%]", color: "rgba(21,36,57,0.25)" },
  amber: { position: "bottom-[10%] right-[20%]", color: "rgba(215,195,138,0.04)" },
  steel: { position: "-top-[10%] left-[30%]", color: "rgba(30,50,75,0.2)" },
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  eyebrow?: string
  accent?: keyof typeof accentPresets
  className?: string
}

export default function PageHeader({
  title,
  subtitle,
  eyebrow,
  accent = "gold",
  className = "",
}: PageHeaderProps) {
  const shouldReduceMotion = useReducedMotion()
  const accentStyle = accentPresets[accent] || accentPresets.gold

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative text-white pt-28 sm:pt-36 md:pt-40 lg:pt-48 pb-16 sm:pb-24 md:pb-28 lg:pb-36 overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(160deg, #060f1c 0%, #0B1A2C 40%, #0d1d30 70%, #081525 100%)",
      }}
    >
      {/* Single accent glow — no blur filter, just a radial gradient */}
      <div
        className={`absolute ${accentStyle.position} w-[50%] h-[60%] rounded-full pointer-events-none`}
        style={{
          background: `radial-gradient(ellipse, ${accentStyle.color} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(5,12,22,0.3) 0%, transparent 40%)",
        }}
      />

      {/* Gold bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {eyebrow && (
          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/70 font-semibold mb-5 sm:mb-7"
          >
            <span className="inline-block w-2 h-px bg-gold/50 mr-3 align-middle" />
            {eyebrow}
          </motion.p>
        )}

        <RevealText
          as="h1"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-0 text-white max-w-4xl"
        >
          {title}
        </RevealText>

        {/* Gold rule */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="origin-left mt-6 sm:mt-8 mb-5 sm:mb-7"
        >
          <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-gold/60 to-transparent" />
        </motion.div>

        {subtitle && (
          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/45 max-w-2xl leading-relaxed font-body"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
