"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, Phone } from "lucide-react"
import Logo from "@/components/Logo"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  useEffect(() => {
    let ticking = false
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          setScrolled(currentScrollY > 40)

          if (currentScrollY > lastScrollY && currentScrollY > 120) {
            setIsVisible(false)
          } else if (currentScrollY < lastScrollY) {
            setIsVisible(true)
          }

          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const closeMenu = useCallback(() => setIsOpen(false), [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  // The link that should show the underline: hovered link, or active link when not hovering
  const indicatorLink = hoveredLink || navLinks.find((l) => isActive(l.href))?.href || null

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          height: scrolled ? "3.75rem" : "4.5rem",
          transition: "height 0.5s cubic-bezier(0.33,1,0.68,1), transform 0.4s cubic-bezier(0.33,1,0.68,1)",
        }}
      >
        {/* Background — frosted glass, strengthens on scroll */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            borderBottom: scrolled
              ? "1px solid rgba(215,195,138,0.15)"
              : "1px solid rgba(11,26,44,0.04)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-full">
          <div className="flex h-full items-center justify-between">
            {/* Logo — left */}
            <div
              className="flex-shrink-0 transition-transform duration-500 origin-left"
              style={{
                transform: scrolled ? "scale(0.75)" : "scale(0.85)",
              }}
            >
              <Logo />
            </div>

            {/* Center nav links */}
            <div
              className="hidden lg:flex items-center absolute left-[52%] -translate-x-1/2"
              onMouseLeave={() => setHoveredLink(null)}
            >
              <div className="flex items-center">
                {navLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative px-4 xl:px-5 py-2 group"
                      onMouseEnter={() => setHoveredLink(link.href)}
                    >
                      <span
                        className={`relative z-10 text-[0.7rem] uppercase tracking-[0.18em] font-semibold transition-colors duration-250 ${
                          active
                            ? "text-midnight"
                            : "text-midnight/45 group-hover:text-midnight/75"
                        }`}
                      >
                        {link.label}
                      </span>

                      {/* Magnetic underline indicator */}
                      {indicatorLink === link.href && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-5 right-5 h-[1.5px]"
                          style={{
                            background: "linear-gradient(to right, rgba(215,195,138,0.5), rgba(215,195,138,0.8), rgba(215,195,138,0.5))",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 32,
                            mass: 0.8,
                          }}
                        />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Right — CTA button */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <Link
                href="https://cal.com/birchtreefinancial"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta-btn relative inline-flex items-center px-6 py-2.5 text-[0.7rem] uppercase tracking-[0.12em] font-bold rounded-full text-midnight transition-all duration-300 hover:scale-[1.03] overflow-hidden group/btn"
                style={{
                  background:
                    "linear-gradient(135deg, #D7C38A 0%, #C4B076 100%)",
                  boxShadow: "0 2px 12px rgba(215,195,138,0.25)",
                }}
              >
                {/* Shimmer sweep */}
                <span
                  className="absolute inset-0 nav-cta-shimmer"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                    transform: "translateX(-100%)",
                  }}
                />
                <span className="relative z-10 flex items-center">
                  Book Consultation
                  <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={22} className="text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={22} className="text-midnight/60" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation — Full screen dark overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="fixed inset-0 z-[55] lg:hidden"
            style={{
              background:
                "linear-gradient(160deg, #0B1A2C 0%, #0d1f33 40%, #091525 100%)",
            }}
          >
            {/* Subtle aurora glow */}
            <div
              className="absolute top-[20%] right-[10%] w-[50%] h-[40%] rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(215,195,138,0.06) 0%, transparent 70%)",
                filter: "blur(80px)",
              }}
            />

            <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
              {/* Nav Links */}
              <div className="space-y-1 flex-1">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href)
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.05 + i * 0.04,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between py-3.5 px-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                          active
                            ? "text-white bg-white/[0.06]"
                            : "text-white/50 hover:text-white/80 hover:bg-white/[0.03]"
                        }`}
                        onClick={closeMenu}
                      >
                        <span>{link.label}</span>
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Bottom section — contact + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="space-y-4 pt-6"
                style={{
                  borderTop: "1px solid rgba(215,195,138,0.1)",
                }}
              >
                {/* Phone */}
                <a
                  href="tel:4035567777"
                  className="flex items-center space-x-3 px-4 py-2 text-white/40 hover:text-white/70 transition-colors"
                  onClick={closeMenu}
                >
                  <Phone className="w-4 h-4 text-gold/60" />
                  <span className="text-sm font-medium">(403) 556-7777</span>
                </a>

                {/* CTA */}
                <Link
                  href="https://cal.com/birchtreefinancial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-3.5 rounded-xl text-midnight font-semibold text-base transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, #D7C38A 0%, #C4B076 100%)",
                    boxShadow: "0 4px 16px rgba(215,195,138,0.2)",
                  }}
                  onClick={closeMenu}
                >
                  Book Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
