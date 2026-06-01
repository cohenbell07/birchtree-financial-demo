import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"
import BirchtreeLogo from "@/components/brand/BirchtreeLogo"

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/team", label: "Our Team" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
  resources: [
    { href: "/resources", label: "Resources" },
    { href: "/helpful-tools", label: "Helpful Tools" },
    { href: "/tools/risk-profiler", label: "Risk Profiler" },
    { href: "/tools/retirement-calculator", label: "Retirement Calculator" },
  ],
}

const contactDetails = [
  { icon: Phone, label: "Phone", text: "(403) 556-7777", href: "tel:+14035567777" },
  {
    icon: Mail,
    label: "Email",
    text: "melissa.birch@birchtreefinancial.ca",
    href: "mailto:melissa.birch@birchtreefinancial.ca",
  },
  { icon: MapPin, label: "Office", text: "4914 50 Ave, Olds, AB T4H 1P5" },
]

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-dark">
        {children}
      </h3>
      <span aria-hidden className="mt-2.5 block h-px w-8 bg-gold/60" />
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#FBFAF6]">
      {/* Birch-leaf watermark — anchored to the left, blended into the paper */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 top-0 select-none"
      >
        <Image
          src="/footer-leaves.webp"
          alt=""
          width={1024}
          height={1536}
          className="h-[118%] w-auto -translate-y-[8%] object-contain object-left opacity-90 mix-blend-multiply"
        />
      </div>

      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-midnight/10 to-transparent"
      />

      <div className="container relative z-10 mx-auto px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-block" aria-label="Birchtree Financial — home">
              <BirchtreeLogo
                markClassName="h-[2.6rem] sm:h-[3rem]"
                textClassName="text-[1.5rem] sm:text-[1.75rem]"
              />
            </Link>
            <p className="mt-6 max-w-xs text-[0.92rem] leading-relaxed text-midnight/60">
              Your trusted partner in Canadian financial advisory and wealth
              management. Building your future, one decision at a time.
            </p>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <ColumnHeading>Company</ColumnHeading>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.95rem] text-midnight/70 transition-colors duration-200 hover:text-gold-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <ColumnHeading>Resources</ColumnHeading>
            <ul className="space-y-3.5">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.95rem] text-midnight/70 transition-colors duration-200 hover:text-gold-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-4">
            <ColumnHeading>Contact</ColumnHeading>
            <div className="space-y-3">
              {contactDetails.map(({ icon: Icon, label, text, href }) => {
                const inner = (
                  <div className="group flex items-center gap-3.5 rounded-xl border border-midnight/10 bg-white/70 px-4 py-3 transition-all duration-200 hover:border-gold/40 hover:bg-white hover:shadow-[0_6px_18px_rgba(11,26,44,0.06)]">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/[0.07]">
                      <Icon size={15} className="text-gold-dark" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-gold-dark/80">
                        {label}
                      </div>
                      <div className="mt-0.5 break-words text-[0.82rem] font-medium text-midnight">
                        {text}
                      </div>
                    </div>
                  </div>
                )
                return (
                  <div key={text}>
                    {href ? <a href={href}>{inner}</a> : inner}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-midnight/10 pt-8">
          <p className="mx-auto max-w-2xl text-center text-[0.78rem] leading-relaxed text-midnight/50">
            &copy; {new Date().getFullYear()} Birchtree Financial. All rights
            reserved. Registered investment advisor in Canada.
          </p>
        </div>
      </div>
    </footer>
  )
}
