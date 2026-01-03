import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react"
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
    { href: "/faq", label: "FAQ" },
    { href: "/tools/risk-profiler", label: "Risk Profiler" },
    { href: "/tools/retirement-calculator", label: "Retirement Calculator" },
  ],
  legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Disclosures" },
    { href: "#", label: "Compliance" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-midnight text-white relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal/20 to-transparent" />
      {/* Ultra-light noise texture */}
      <div className="absolute inset-0 texture-noise pointer-events-none opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Logo variant="white" />
              </div>
              <p className="text-silver/80 text-sm sm:text-base mb-6 max-w-md leading-relaxed">
                Your trusted partner in Canadian financial advisory and wealth management.
                Building your future, one decision at a time.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-silver/70 hover:text-mint transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="text-silver/70 hover:text-mint transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-emerald border-b border-emerald/20 pb-2">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-silver/80 hover:text-mint text-sm transition-colors duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-emerald border-b border-emerald/20 pb-2">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-silver/80 hover:text-mint text-sm transition-colors duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-emerald border-b border-emerald/20 pb-2">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-silver/80 hover:text-mint text-sm transition-colors duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-emerald/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-sm text-silver/70">
            <div className="flex items-start space-x-3">
              <Phone size={18} className="flex-shrink-0 mt-0.5 text-emerald" />
              <span className="break-words">(403) 556-7777</span>
            </div>
            <div className="flex items-start space-x-3">
              <Mail size={18} className="flex-shrink-0 mt-0.5 text-emerald" />
              <span className="break-all">info@birchtreefinancial.ca</span>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin size={18} className="flex-shrink-0 mt-0.5 text-emerald" />
              <span className="break-words">4914 50 Ave, Olds, AB T4H 1P5</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-emerald/20 text-center text-xs sm:text-sm text-silver/60">
          <p className="px-4">
            © {new Date().getFullYear()} Birchtree Financial. All rights
            reserved. Registered investment advisor in Canada. Investment advisory services 
            offered through Birchtree Financial, a registered investment advisor.
          </p>
        </div>
      </div>
    </footer>
  )
}
