import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react"

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/team", label: "Our Team" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
  resources: [
    { href: "/resources", label: "Resources" },
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
    <footer className="bg-slate text-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-heading font-bold">BirchTree</div>
              <span className="text-sm text-moss">Financial</span>
            </div>
            <p className="text-cream-dark text-sm mb-4 max-w-md">
              Your trusted partner in financial planning and wealth management.
              Building your future, one decision at a time.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-cream-dark hover:text-champagne transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-cream-dark hover:text-champagne transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-dark hover:text-champagne text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-dark hover:text-champagne text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-dark hover:text-champagne text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-slate-light">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-cream-dark">
            <div className="flex items-start sm:items-center space-x-2">
              <Phone size={16} className="flex-shrink-0 mt-0.5 sm:mt-0" />
              <span className="break-words">(555) 123-4567</span>
            </div>
            <div className="flex items-start sm:items-center space-x-2">
              <Mail size={16} className="flex-shrink-0 mt-0.5 sm:mt-0" />
              <span className="break-all">info@birchtreefinancial.com</span>
            </div>
            <div className="flex items-start sm:items-center space-x-2">
              <MapPin size={16} className="flex-shrink-0 mt-0.5 sm:mt-0" />
              <span className="break-words">123 Financial District, New York, NY 10004</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-light text-center text-xs sm:text-sm text-cream-dark">
          <p className="px-4">
            © {new Date().getFullYear()} BirchTree Financial. All rights
            reserved. Securities offered through [Broker-Dealer Name], Member
            FINRA/SIPC. Investment advisory services offered through
            BirchTree Financial, a registered investment advisor.
          </p>
        </div>
      </div>
    </footer>
  )
}

