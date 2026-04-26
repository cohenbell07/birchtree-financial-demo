"use client"

import { motion, useReducedMotion } from "framer-motion"
import RevealText from "@/components/RevealText"
import { Container } from "@/components/ui/container"

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

/**
 * PageHeader — dark hero band used at the top of secondary pages.
 *
 * Server-renders the heavy markup (gradients, vignette) so the JS cost stays
 * limited to the small reveal motion + RevealText. Subtitle contrast is
 * deliberately high (text-white/80) — it sits on a dark gradient and any
 * lower opacity becomes hard to read.
 */
export default function PageHeader({
  title,
  subtitle,
  eyebrow,
  accent = "gold",
  className = "",
}: PageHeaderProps) {
  const reduce = useReducedMotion()
  const accentStyle = accentPresets[accent] || accentPresets.gold

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`relative overflow-hidden text-white ${className}`}
      style={{
        background:
          "linear-gradient(160deg, #060f1c 0%, #0B1A2C 40%, #0d1d30 70%, #081525 100%)",
        paddingTop: "clamp(7rem, 8vw + 4rem, 12rem)",
        paddingBottom: "clamp(4rem, 6vw + 2rem, 9rem)",
      }}
    >
      {/* Single accent glow — paint-only, no blur filter */}
      <div
        aria-hidden
        className={`pointer-events-none absolute h-[60%] w-[50%] rounded-full ${accentStyle.position}`}
        style={{
          background: `radial-gradient(ellipse, ${accentStyle.color} 0%, transparent 70%)`,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(5,12,22,0.3) 0%, transparent 40%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
      />

      <Container>
        {eyebrow && (
          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-7 inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-gold sm:text-xs"
          >
            <span aria-hidden className="inline-block h-px w-6 bg-gold/60" />
            {eyebrow}
          </motion.p>
        )}

        <RevealText
          as="h1"
          className="max-w-4xl font-heading font-bold leading-[1.06] tracking-tight text-white text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        >
          {title}
        </RevealText>

        <motion.div
          initial={reduce ? {} : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="origin-left mt-7 mb-6"
        >
          <div className="h-px w-24 bg-gradient-to-r from-gold/65 to-transparent" />
        </motion.div>

        {subtitle && (
          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl leading-relaxed text-white/80 text-balance"
            style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.5vw, 1.3rem)" }}
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </motion.div>
  )
}
