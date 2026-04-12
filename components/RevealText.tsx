"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

interface RevealTextProps {
  children: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  className?: string
  staggerDelay?: number
}

export default function RevealText({
  children,
  as: Tag = "h2",
  className = "",
  staggerDelay = 0.06,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" })
  const shouldReduceMotion = useReducedMotion()

  const MotionTag = motion[Tag] as any

  // Reduced motion: simple fade
  if (shouldReduceMotion) {
    return (
      <MotionTag
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </MotionTag>
    )
  }

  // Split into lines by word groups for the mask-slide reveal
  const words = children.split(" ")

  // Group words into lines of ~4-5 words for dramatic line-by-line reveal
  const linesOfWords: string[][] = []
  let currentLine: string[] = []
  words.forEach((word) => {
    currentLine.push(word)
    if (currentLine.length >= 5 || word.endsWith(",") || word.endsWith(".") || word.endsWith("?")) {
      linesOfWords.push([...currentLine])
      currentLine = []
    }
  })
  if (currentLine.length > 0) linesOfWords.push(currentLine)

  // If the text is short (1-2 lines), treat each word individually
  const useWordLevel = linesOfWords.length <= 2

  if (useWordLevel) {
    return (
      <MotionTag
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: staggerDelay }}
      >
        {words.map((word, i) => (
          <span key={i} style={{ display: "inline-block", clipPath: "inset(-20% -5px -20% -5px)", verticalAlign: "top" }}>
            <motion.span
              style={{ display: "inline-block", whiteSpace: "pre" }}
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.33, 1, 0.68, 1],
                  },
                },
              }}
            >
              {word}{i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </MotionTag>
    )
  }

  // Multi-line: line-by-line reveal
  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ staggerChildren: staggerDelay * 2 }}
    >
      {linesOfWords.map((lineWords, lineIndex) => (
        <span key={lineIndex} style={{ display: "inline" }}>
          {lineWords.map((word, wordIndex) => (
            <span key={`${lineIndex}-${wordIndex}`} style={{ display: "inline-block", clipPath: "inset(-20% -5px -20% -5px)", verticalAlign: "top" }}>
              <motion.span
                style={{ display: "inline-block", whiteSpace: "pre" }}
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    transition: {
                      duration: 0.55,
                      ease: [0.33, 1, 0.68, 1],
                      delay: wordIndex * 0.03,
                    },
                  },
                }}
              >
                {word}{wordIndex < lineWords.length - 1 ? " " : " "}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  )
}
