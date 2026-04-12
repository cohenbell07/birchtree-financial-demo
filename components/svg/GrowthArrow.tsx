"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

export default function GrowthArrow({ className = "" }: { className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })
  const prefersReduced = useReducedMotion()
  const show = isInView || prefersReduced

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="arrowGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#D7C38A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#D7C38A" stopOpacity="0.7" />
        </linearGradient>
        <filter id="arrowGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="arrowRadial">
          <stop offset="0%" stopColor="#D7C38A" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#D7C38A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background radial glow */}
      <motion.circle
        cx="250" cy="200" r="180"
        fill="url(#arrowRadial)"
        initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 1.5 }}
      />

      {/* Main trunk — thick, glowing upward line */}
      <motion.path
        d="M250 460 C250 460, 248 380, 249 300 C250 220, 252 150, 250 80"
        stroke="url(#arrowGrad)" strokeWidth="3.5" strokeLinecap="round" fill="none"
        filter="url(#arrowGlow)"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Arrow tip — bold */}
      <motion.path
        d="M220 95 L250 40 L280 95"
        stroke="#D7C38A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        filter="url(#arrowGlow)"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
      />

      {/* Right branches — organic, spreading */}
      {[
        { d: "M250 320 C275 310, 320 295, 365 280", delay: 0.7, w: 2.5 },
        { d: "M250 260 C280 248, 340 230, 390 210", delay: 0.8, w: 2.5 },
        { d: "M250 200 C285 185, 350 165, 400 145", delay: 0.9, w: 2 },
        { d: "M250 150 C278 138, 330 118, 370 100", delay: 1.0, w: 2 },
        { d: "M365 280 C380 270, 400 258, 420 250", delay: 1.1, w: 1.5 },
        { d: "M390 210 C408 198, 425 188, 445 178", delay: 1.2, w: 1.5 },
      ].map((branch, i) => (
        <motion.path
          key={`rb-${i}`}
          d={branch.d}
          stroke="#D7C38A" strokeWidth={branch.w} strokeLinecap="round" fill="none" strokeOpacity="0.35"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={show ? { pathLength: 1 } : {}}
          transition={{ duration: 0.6, delay: branch.delay, ease: "easeOut" }}
        />
      ))}

      {/* Left branches */}
      {[
        { d: "M250 290 C220 278, 175 262, 130 250", delay: 0.75, w: 2.5 },
        { d: "M250 230 C218 218, 165 198, 115 182", delay: 0.85, w: 2.5 },
        { d: "M250 175 C222 162, 175 145, 130 128", delay: 0.95, w: 2 },
        { d: "M130 250 C112 242, 95 232, 75 225", delay: 1.1, w: 1.5 },
        { d: "M115 182 C95 174, 78 165, 58 158", delay: 1.2, w: 1.5 },
      ].map((branch, i) => (
        <motion.path
          key={`lb-${i}`}
          d={branch.d}
          stroke="#D7C38A" strokeWidth={branch.w} strokeLinecap="round" fill="none" strokeOpacity="0.35"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={show ? { pathLength: 1 } : {}}
          transition={{ duration: 0.6, delay: branch.delay, ease: "easeOut" }}
        />
      ))}

      {/* Leaf clusters at branch tips */}
      {[
        { cx: 370, cy: 278, rx: 10, ry: 5.5, rotate: -30 },
        { cx: 395, cy: 207, rx: 10, ry: 5.5, rotate: -25 },
        { cx: 405, cy: 142, rx: 9, ry: 5, rotate: -20 },
        { cx: 375, cy: 97, rx: 8, ry: 4.5, rotate: -15 },
        { cx: 425, cy: 248, rx: 8, ry: 4.5, rotate: -35 },
        { cx: 450, cy: 175, rx: 8, ry: 4.5, rotate: -20 },
        { cx: 125, cy: 248, rx: 10, ry: 5.5, rotate: 30 },
        { cx: 110, cy: 180, rx: 10, ry: 5.5, rotate: 25 },
        { cx: 125, cy: 125, rx: 9, ry: 5, rotate: 20 },
        { cx: 70, cy: 222, rx: 8, ry: 4.5, rotate: 35 },
        { cx: 53, cy: 155, rx: 8, ry: 4.5, rotate: 25 },
        // Additional smaller leaves
        { cx: 385, cy: 270, rx: 7, ry: 4, rotate: -45 },
        { cx: 415, cy: 200, rx: 7, ry: 4, rotate: -40 },
        { cx: 115, cy: 240, rx: 7, ry: 4, rotate: 45 },
        { cx: 100, cy: 172, rx: 7, ry: 4, rotate: 40 },
      ].map((leaf, i) => (
        <motion.ellipse
          key={`leaf-${i}`}
          cx={leaf.cx} cy={leaf.cy} rx={leaf.rx} ry={leaf.ry}
          transform={`rotate(${leaf.rotate} ${leaf.cx} ${leaf.cy})`}
          fill="#D7C38A" fillOpacity="0.2"
          stroke="#D7C38A" strokeWidth="0.8" strokeOpacity="0.3"
          initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.4 + i * 0.06, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}

      {/* Floating particles */}
      {[
        { cx: 180, cy: 60 }, { cx: 320, cy: 50 }, { cx: 150, cy: 110 },
        { cx: 350, cy: 100 }, { cx: 100, cy: 160 }, { cx: 400, cy: 155 },
        { cx: 80, cy: 300 }, { cx: 420, cy: 310 }, { cx: 200, cy: 30 },
        { cx: 300, cy: 25 }, { cx: 60, cy: 210 }, { cx: 440, cy: 220 },
      ].map((p, i) => (
        <motion.circle
          key={`p-${i}`}
          cx={p.cx} cy={p.cy} r="2.5"
          fill="#D7C38A" fillOpacity="0.25"
          initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 2.0 + i * 0.05 }}
        />
      ))}

      {/* Root lines at bottom */}
      <motion.g
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={show ? { opacity: 0.3 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <path d="M250 460 C235 468, 210 475, 190 478" stroke="#D7C38A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M250 460 C265 468, 290 475, 310 478" stroke="#D7C38A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M250 460 C242 470, 230 480, 220 485" stroke="#D7C38A" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M250 460 C258 470, 270 480, 280 485" stroke="#D7C38A" strokeWidth="1" strokeLinecap="round" fill="none" />
      </motion.g>
    </svg>
  )
}
