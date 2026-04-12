"use client"

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"

export default function HeroBackground() {
  const { scrollY } = useScroll()
  const shouldReduceMotion = useReducedMotion()

  const layer1Y = useTransform(scrollY, [0, 1000], [0, -40])
  const layer2Y = useTransform(scrollY, [0, 1000], [0, 25])
  const layer3Y = useTransform(scrollY, [0, 1000], [0, -18])

  return (
    <>
      {/* Deep base — near-black with warmth */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(160deg, #050c16 0%, #0B1A2C 25%, #0e1f34 50%, #081525 75%, #060e1a 100%)'
      }} />

      {/* Aurora mesh — 4 animated gradient layers creating depth */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Layer 1: Large warm glow, top-center */}
        <div
          className={`absolute -top-[30%] left-[10%] w-[80%] h-[70%] rounded-full ${shouldReduceMotion ? '' : 'aurora-blob-1'}`}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(21, 36, 57, 0.6) 0%, rgba(21, 36, 57, 0.2) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Layer 2: Gold accent, subtle, bottom-right */}
        <div
          className={`absolute top-[40%] -right-[10%] w-[55%] h-[55%] rounded-full ${shouldReduceMotion ? '' : 'aurora-blob-2'}`}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(215, 195, 138, 0.06) 0%, rgba(215, 195, 138, 0.02) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Layer 3: Cool depth, bottom-left */}
        <div
          className={`absolute -bottom-[20%] -left-[15%] w-[65%] h-[65%] rounded-full ${shouldReduceMotion ? '' : 'aurora-blob-3'}`}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(15, 28, 46, 0.5) 0%, rgba(15, 28, 46, 0.15) 40%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />

        {/* Layer 4: Secondary gold accent, top-right */}
        <div
          className={`absolute -top-[10%] right-[20%] w-[40%] h-[40%] rounded-full ${shouldReduceMotion ? '' : 'aurora-blob-4'}`}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(215, 195, 138, 0.04) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Atmospheric vignette — deep corners */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, rgba(5, 12, 22, 0.5) 100%)',
      }} />

      {/* Subtle grid pattern — financial DNA */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(215, 195, 138, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(215, 195, 138, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Parallax accent orbs */}
      <motion.div
        className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(215, 195, 138, 0.04) 0%, transparent 60%)',
          filter: 'blur(40px)',
          y: shouldReduceMotion ? 0 : layer1Y,
        }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[5%] w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(27, 42, 61, 0.3) 0%, transparent 60%)',
          filter: 'blur(50px)',
          y: shouldReduceMotion ? 0 : layer2Y,
        }}
      />
      <motion.div
        className="absolute top-[50%] left-[40%] w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(215, 195, 138, 0.03) 0%, transparent 60%)',
          filter: 'blur(60px)',
          y: shouldReduceMotion ? 0 : layer3Y,
        }}
      />

      {/* Grain overlay for texture depth */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
    </>
  )
}
