import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import Logo from "@/components/Logo"

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
  { icon: Mail, label: "Email", text: "melissa.birch@birchtreefinancial.ca", href: "mailto:melissa.birch@birchtreefinancial.ca", breakAll: true },
  { icon: MapPin, label: "Office", text: "4914 50 Ave, Olds, AB T4H 1P5" },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{
      background: 'linear-gradient(160deg, #050c16 0%, #0B1A2C 30%, #0e1f34 60%, #081525 100%)'
    }}>
      {/* Aurora atmosphere */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-[20%] right-[10%] w-[50%] h-[50%] rounded-full aurora-blob-4"
          style={{ background: 'radial-gradient(ellipse, rgba(215,195,138,0.03) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full aurora-blob-2"
          style={{ background: 'radial-gradient(ellipse, rgba(21,36,57,0.3) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      {/* Grain texture */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      {/* Top gold line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-12 xl:gap-16">
          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-4">
            <div className="flex items-center mb-6">
              <Logo variant="white" />
            </div>
            <p className="text-white/65 text-sm leading-relaxed max-w-sm font-body">
              Your trusted partner in Canadian financial advisory and wealth management.
              Building your future, one decision at a time.
            </p>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[0.65rem] uppercase tracking-[0.2em] text-gold/50 font-medium mb-5">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white text-sm transition-colors duration-200 inline-block py-3 -my-1 font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[0.65rem] uppercase tracking-[0.2em] text-gold/50 font-medium mb-5">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 hover:text-white text-sm transition-colors duration-200 inline-block py-3 -my-1 font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-2 lg:col-span-4">
            <h3 className="text-[0.65rem] uppercase tracking-[0.2em] text-gold/50 font-medium mb-5">Contact</h3>
            <ul className="space-y-4">
              {contactDetails.map(({ icon: Icon, label, text, href, breakAll }) => {
                const content = (
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:border-gold/30 group-hover:bg-gold/[0.04]">
                      <Icon size={14} className="text-gold/60 transition-colors duration-200 group-hover:text-gold" />
                    </div>
                    <div className="min-w-0 pt-1">
                      <div className="text-[0.6rem] uppercase tracking-[0.18em] text-white/40 font-medium mb-1">{label}</div>
                      <div className={`text-white/75 text-sm font-body leading-snug ${breakAll ? 'break-all' : 'break-words'} ${href ? 'transition-colors duration-200 group-hover:text-white' : ''}`}>
                        {text}
                      </div>
                    </div>
                  </div>
                )
                return (
                  <li key={text}>
                    {href ? <a href={href}>{content}</a> : content}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] text-center">
          <p className="text-[0.7rem] text-white/55 leading-relaxed max-w-2xl mx-auto font-body">
            &copy; {new Date().getFullYear()} Birchtree Financial. All rights
            reserved. Registered investment advisor in Canada.
          </p>
        </div>
      </div>
    </footer>
  )
}
