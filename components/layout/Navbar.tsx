"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  ChevronDown,
  Landmark,
  Users,
  BookOpen,
  Calculator,
  Wrench,
  HelpCircle,
  type LucideIcon,
} from "lucide-react"
import BirchtreeLogo from "@/components/brand/BirchtreeLogo"

type NavChild = { href: string; label: string; desc: string; icon: LucideIcon }
type NavItem = { href: string; label: string; children?: NavChild[] }

const nav: NavItem[] = [
  { href: "/services", label: "Services" },
  {
    href: "/resources",
    label: "Resources",
    children: [
      { href: "/resources", label: "Resource Library", desc: "Guides & insights", icon: BookOpen },
      { href: "/tools", label: "Calculators", desc: "Plan with our tools", icon: Calculator },
      { href: "/helpful-tools", label: "Helpful Tools", desc: "Government resources", icon: Wrench },
      { href: "/faq", label: "FAQ", desc: "Common questions", icon: HelpCircle },
    ],
  },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "About Us", desc: "Our story & values", icon: Landmark },
      { href: "/team", label: "Our Team", desc: "Meet your advisors", icon: Users },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

const CTA_HREF = "https://cal.com/birchtreefinancial"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    let ticking = false
    // This layout makes <body> the scroll container (html,body{height:100%}),
    // so read whichever element actually carries the offset.
    const getScrollY = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    let lastScrollY = getScrollY()

    const evaluate = () => {
      const y = getScrollY()
      setScrolled(y > 28)
      if (y > lastScrollY && y > 160) setIsVisible(false)
      else if (y < lastScrollY) setIsVisible(true)
      lastScrollY = y
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(evaluate)
        ticking = true
      }
    }

    evaluate()
    // Capture phase catches scroll events from any scrolling element.
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true })
    window.addEventListener("resize", evaluate)
    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true })
      window.removeEventListener("resize", evaluate)
    }
  }, [pathname])

  // Lock body scroll while the mobile menu is open, and allow Escape to close.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    if (isOpen) window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [isOpen])

  // Close the mobile menu on route change.
  useEffect(() => {
    setIsOpen(false)
    setExpanded(null)
  }, [pathname])

  const closeMenu = useCallback(() => setIsOpen(false), [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const itemActive = (item: NavItem) =>
    isActive(item.href) || (item.children?.some((c) => isActive(c.href)) ?? false)

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          height: scrolled ? "4.4rem" : "5.15rem",
          transition:
            "height 0.5s cubic-bezier(0.33,1,0.68,1), transform 0.45s cubic-bezier(0.33,1,0.68,1)",
        }}
      >
        {/* Frosted paper background, strengthens on scroll */}
        <div
          aria-hidden
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.80)",
            backdropFilter: "blur(22px) saturate(180%)",
            WebkitBackdropFilter: "blur(22px) saturate(180%)",
          }}
        />
        {/* Bottom hairline */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(11,26,44,0.10) 30%, rgba(215,195,138,0.30) 50%, rgba(11,26,44,0.10) 70%, transparent)",
          }}
        />

        <div className="container relative mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Birchtree Financial — home"
              className="group/logo flex shrink-0 items-center"
            >
              <span
                className="origin-left transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover/logo:opacity-90"
                style={{ transform: scrolled ? "scale(0.87)" : "scale(1)" }}
              >
                <BirchtreeLogo
                  markClassName="h-[2.35rem] sm:h-[2.75rem]"
                  textClassName="text-[1.32rem] sm:text-[1.7rem]"
                />
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
              {nav.map((item) => {
                const active = itemActive(item)
                if (!item.children) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative px-3.5 py-2 text-[0.9rem] font-medium transition-colors duration-200 xl:px-4 ${
                        active ? "text-midnight" : "text-midnight/65 hover:text-midnight"
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span
                          aria-hidden
                          className="absolute -bottom-[3px] left-3.5 right-3.5 h-0.5 rounded-full bg-gold xl:left-4 xl:right-4"
                        />
                      )}
                    </Link>
                  )
                }
                return (
                  <div key={item.href} className="group/nav relative">
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-1 px-3.5 py-2 text-[0.9rem] font-medium transition-colors duration-200 xl:px-4 ${
                        active ? "text-midnight" : "text-midnight/65 group-hover/nav:text-midnight"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 text-midnight/40 transition-transform duration-300 group-hover/nav:rotate-180 group-hover/nav:text-midnight/70" />
                      {active && (
                        <span
                          aria-hidden
                          className="absolute -bottom-[3px] left-3.5 right-7 h-0.5 rounded-full bg-gold xl:left-4 xl:right-8"
                        />
                      )}
                    </Link>

                    {/* Dropdown */}
                    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 ease-out group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100">
                      <div
                        className="w-max min-w-[17rem] max-w-[calc(100vw-1.5rem)] rounded-2xl border border-midnight/[0.07] bg-[#FFFFFF] p-2.5"
                        style={{
                          boxShadow:
                            "0 28px 60px -18px rgba(11,26,44,0.28), 0 10px 24px -14px rgba(11,26,44,0.16)",
                        }}
                      >
                        <div
                          aria-hidden
                          className="mx-1 mb-1.5 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
                        />
                        <div className="flex flex-col gap-1">
                          {item.children.map((c) => {
                            const Icon = c.icon
                            const childActive = isActive(c.href) && c.href !== item.href
                            return (
                              <Link
                                key={c.href}
                                href={c.href}
                                className={`group/it flex items-center gap-3.5 rounded-xl px-2.5 py-2.5 transition-colors duration-150 ${
                                  childActive
                                    ? "bg-midnight/[0.04]"
                                    : "hover:bg-midnight/[0.04]"
                                }`}
                              >
                                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-midnight/[0.09] bg-gradient-to-b from-midnight/[0.04] to-midnight/[0.01] transition-all duration-150 group-hover/it:border-gold/45 group-hover/it:from-gold/[0.12] group-hover/it:to-gold/[0.03]">
                                  <Icon
                                    className="h-[18px] w-[18px] text-midnight/55 transition-colors duration-150 group-hover/it:text-gold-dark"
                                    strokeWidth={1.7}
                                  />
                                </span>
                                <span className="flex flex-col">
                                  <span className="whitespace-nowrap text-[0.9rem] font-semibold leading-tight text-midnight">
                                    {c.label}
                                  </span>
                                  <span className="mt-[3px] whitespace-nowrap text-[0.735rem] leading-tight text-midnight/45">
                                    {c.desc}
                                  </span>
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right — phone + CTA */}
            <div className="hidden shrink-0 items-center gap-4 lg:flex xl:gap-5">
              <a
                href="tel:4035567777"
                className="hidden items-center gap-2 text-[0.78rem] font-medium tracking-wide text-midnight/60 transition-colors duration-200 hover:text-midnight xl:inline-flex"
              >
                <Phone className="h-3.5 w-3.5 text-gold-dark" strokeWidth={1.75} />
                <span className="tabular-nums">(403) 556-7777</span>
              </a>
              <span aria-hidden className="hidden h-5 w-px bg-midnight/12 xl:block" />
              <Link
                href={CTA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta inline-flex items-center rounded-xl bg-midnight px-5 py-2.5 text-[0.82rem] font-semibold text-white shadow-[0_4px_16px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_8px_22px_rgba(11,26,44,0.24)]"
              >
                Book a Consultation
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile menu button — opens the panel; the panel carries its own
                close (X), so this only needs to open. */}
            <button
              className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-xl text-midnight/70 transition-colors duration-200 hover:bg-midnight/[0.04] lg:hidden"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile navigation — light full-screen panel (sits above the navbar
          and carries its own header + close button). */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-[#FBFAF6] lg:hidden"
          >
            {/* Soft gold wash, top-right — matches the hero atmosphere */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(55% 38% at 100% 0%, rgba(215,195,138,0.12) 0%, transparent 60%)",
              }}
            />

            {/* Header: logo + close */}
            <div className="relative flex h-[5.15rem] flex-shrink-0 items-center justify-between px-4 sm:px-6">
              <Link
                href="/"
                onClick={closeMenu}
                aria-label="Birchtree Financial — home"
                className="flex items-center"
              >
                <BirchtreeLogo
                  markClassName="h-[2.35rem]"
                  textClassName="text-[1.32rem]"
                />
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-midnight/10 bg-white text-midnight/70 transition-colors duration-200 hover:border-midnight/25 hover:text-midnight"
              >
                <X size={22} />
              </button>
            </div>
            <div
              aria-hidden
              className="h-px bg-gradient-to-r from-transparent via-midnight/10 to-transparent"
            />

            {/* Body */}
            <div className="relative flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-5">
              <p className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-gold-dark">
                Menu
              </p>
              <div className="flex-1">
                {nav.map((item) => {
                  const open = expanded === item.label
                  const active = itemActive(item)
                  if (!item.children) {
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className="flex items-center justify-between border-b border-midnight/[0.08] py-4 font-heading text-xl text-midnight/90 transition-colors hover:text-midnight"
                      >
                        {item.label}
                        {isActive(item.href) && (
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-dark" />
                        )}
                      </Link>
                    )
                  }
                  return (
                    <div key={item.href} className="border-b border-midnight/[0.08]">
                      <button
                        type="button"
                        onClick={() => setExpanded(open ? null : item.label)}
                        className="flex w-full items-center justify-between py-4 font-heading text-xl text-midnight/90 transition-colors hover:text-midnight"
                      >
                        <span className="flex items-center gap-2.5">
                          {item.label}
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-dark" />
                          )}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 text-midnight/40 transition-transform duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pb-3">
                              {item.children.map((c) => {
                                const Icon = c.icon
                                return (
                                  <Link
                                    key={c.href}
                                    href={c.href}
                                    onClick={closeMenu}
                                    className="group/it flex items-center gap-3.5 rounded-xl px-2 py-2.5 transition-colors duration-150 hover:bg-midnight/[0.04]"
                                  >
                                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-midnight/[0.09] bg-white transition-colors duration-150 group-hover/it:border-gold/45">
                                      <Icon
                                        className="h-[17px] w-[17px] text-midnight/55 transition-colors duration-150 group-hover/it:text-gold-dark"
                                        strokeWidth={1.7}
                                      />
                                    </span>
                                    <span className="text-[0.98rem] font-medium text-midnight/70">
                                      {c.label}
                                    </span>
                                  </Link>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              {/* Footer: phone + CTA */}
              <div className="mt-6 space-y-4 border-t border-midnight/10 pt-6">
                <a
                  href="tel:4035567777"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-1 py-1 text-midnight/65 transition-colors hover:text-midnight"
                >
                  <Phone className="h-4 w-4 text-gold-dark" strokeWidth={1.75} />
                  <span className="text-sm font-medium tabular-nums">
                    (403) 556-7777
                  </span>
                </a>
                <Link
                  href={CTA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center rounded-xl bg-midnight py-4 text-base font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)]"
                >
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
