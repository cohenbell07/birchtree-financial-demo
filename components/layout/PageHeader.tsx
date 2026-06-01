"use client"

import { motion, useReducedMotion } from "framer-motion"
import RevealText from "@/components/RevealText"
import { Container } from "@/components/ui/container"

// Per-page accent — a faint radial glow tinted onto the LIGHT field. Kept very
// soft so the band always reads as cream/paper, never dark. The keys match the
// existing call sites (gold / blue / amber / steel).
const accentPresets: Record<string, { position: string; color: string }> = {
  gold: { position: "top-[14%] right-[8%]", color: "rgba(215,195,138,0.16)" },
  blue: { position: "top-[18%] right-[10%]", color: "rgba(11,26,44,0.05)" },
  amber: { position: "bottom-[8%] right-[14%]", color: "rgba(215,195,138,0.13)" },
  steel: { position: "-top-[6%] right-[24%]", color: "rgba(11,26,44,0.04)" },
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  eyebrow?: string
  accent?: keyof typeof accentPresets
  className?: string
}

/**
 * PageHeader — the shared hero band at the top of secondary pages.
 *
 * Light, airy private-bank look that matches the homepage hero: a cream/paper
 * vertical gradient with a faint gold radial wash, a gold eyebrow + hairline,
 * a midnight headline (via RevealText), a gold rule, and a midnight/65 subtitle.
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
      className={`relative overflow-hidden text-midnight ${className}`}
      style={{
        background: "linear-gradient(180deg, #FBFAF6 0%, #F7F5EF 100%)",
        paddingTop: "clamp(7rem, 8vw + 4rem, 12rem)",
        paddingBottom: "clamp(4rem, 6vw + 2rem, 9rem)",
      }}
    >
      {/* Faint gold wash, anchored top-left — same recipe as the homepage hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Per-page accent glow — paint-only, soft, on the light field */}
      <div
        aria-hidden
        className={`pointer-events-none absolute h-[60%] w-[50%] rounded-full ${accentStyle.position}`}
        style={{
          background: `radial-gradient(ellipse, ${accentStyle.color} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle midnight/gold hairline at the bottom edge, reads on light */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(11,26,44,0.10) 30%, rgba(215,195,138,0.55) 50%, rgba(11,26,44,0.10) 70%, transparent)",
        }}
      />

      <Container>
        {eyebrow && (
          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-7 inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark sm:text-xs"
          >
            <span aria-hidden className="inline-block h-px w-10 bg-gradient-to-r from-gold-dark/80 to-transparent" />
            {eyebrow}
          </motion.p>
        )}

        <RevealText
          as="h1"
          className="max-w-4xl font-heading font-bold leading-[1.06] tracking-tight text-midnight text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        >
          {title}
        </RevealText>

        <motion.div
          initial={reduce ? {} : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="origin-left mt-7 mb-6"
        >
          <div
            className="h-px w-24"
            style={{
              background:
                "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
            }}
          />
        </motion.div>

        {subtitle && (
          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl leading-relaxed text-midnight/65 text-balance"
            style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.5vw, 1.3rem)" }}
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </motion.div>
  )
}
