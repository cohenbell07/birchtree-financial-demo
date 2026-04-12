"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import RevealText from "@/components/RevealText"
import { Button } from "@/components/ui/button"
import { ArrowRight, Target, TrendingUp, Shield, Calculator, Building2, FileText } from "lucide-react"
import FAQSection from "@/components/FAQSection"

const servicesFaqs = [
  {
    question: "What services does Birchtree Financial provide?",
    answer: "Birchtree Financial offers comprehensive financial advisory and investment management services, including retirement planning, investment management, insurance strategies, tax optimization, wealth building advisory, and estate planning guidance. We also provide benefit packages for both group and individual plans, helping businesses and individuals secure comprehensive coverage that protects their financial future. We work with individuals, families, and business owners to create personalized financial strategies tailored to their unique needs.",
  },
  {
    question: "How do you charge for your services?",
    answer: "Birchtree Financial is compensated through the company with no fees charged directly to clients. This compensation structure ensures we can act in your best interest without conflicts of interest, as our compensation is not tied to specific product sales or commissions. This approach allows us to provide unbiased financial advice and recommendations that are truly in your best interest. All compensation details are transparently disclosed during our initial consultation.",
  },
  {
    question: "What is your investment philosophy?",
    answer: "We believe in a disciplined, evidence-based approach to investing. Our philosophy emphasizes diversification, long-term thinking, risk management, and cost efficiency. We focus on building well-balanced portfolios that align with your risk tolerance and financial goals, using a combination of strategic asset allocation and regular rebalancing.",
  },
  {
    question: "Can you help me with my employer's Group RRSP or other retirement accounts?",
    answer: "Yes, we can provide guidance on your employer-sponsored retirement accounts, including Group RRSPs, pension plans, and DPSPs (Deferred Profit Sharing Plans). While we may not directly manage these accounts, we can help you understand your options, optimize your contributions, and ensure these accounts align with your overall financial strategy. We also help coordinate with your RRSP and TFSA strategies.",
  },
  {
    question: "Do you provide tax advice?",
    answer: "While we provide tax planning strategies and work closely with tax professionals, we do not provide specific tax preparation or detailed tax advice. We focus on tax-efficient investment and planning strategies, and we recommend coordinating with a qualified Canadian tax professional or accountant for specific tax matters.",
  },
  {
    question: "Do I need a minimum amount of assets to work with Birchtree Financial?",
    answer: "We work with clients across a range of asset levels and life stages. While we do have minimum requirements for certain services, we offer solutions for individuals just starting their financial journey as well as those with substantial wealth. Contact us to discuss whether our services are a good fit for your situation.",
  },
]

const services = [
  {
    slug: "retirement-planning",
    icon: Target,
    title: "Retirement Planning",
    description: "Create a comprehensive retirement strategy that ensures financial security and peace of mind during your golden years.",
    features: ["Retirement income planning", "CPP and OAS optimization", "RRSP and TFSA management", "Withdrawal strategies"],
  },
  {
    slug: "investment-management",
    icon: TrendingUp,
    title: "Investment Management",
    description: "Expert portfolio management designed to grow and protect your wealth through disciplined investment strategies.",
    features: ["Portfolio construction", "Asset allocation", "Risk management", "Performance monitoring"],
  },
  {
    slug: "insurance-strategies",
    icon: Shield,
    title: "Insurance Strategies",
    description: "Protect what matters most with customized insurance solutions tailored to your unique needs and circumstances.",
    features: ["Life insurance planning", "Disability insurance", "Long-term care planning", "Policy review and optimization"],
  },
  {
    slug: "tax-optimization-strategies",
    icon: Calculator,
    title: "Tax Optimization Strategies",
    description: "Minimize your tax burden while maximizing financial efficiency through strategic tax planning and optimization.",
    features: ["Tax-efficient investing", "RRSP and TFSA strategies", "Tax-loss harvesting", "Charitable giving strategies"],
  },
  {
    slug: "wealth-building-advisory",
    icon: Building2,
    title: "Wealth Building & Advisory",
    description: "Strategic advisory services to build, preserve, and transfer your wealth effectively across generations.",
    features: ["Wealth accumulation strategies", "Business succession planning", "Multi-generational planning", "Philanthropic planning"],
  },
  {
    slug: "estate-planning-guidance",
    icon: FileText,
    title: "Estate Planning Guidance",
    description: "Ensure your wealth is transferred according to your wishes while minimizing taxes and preserving family harmony.",
    features: ["Estate plan creation", "Trust strategies", "Beneficiary planning", "Legacy planning"],
  },
]

export default function ServicesPage() {
  return (
    <div>
      {/* ============================================
          HERO — Icon Grid Teaser
          ============================================ */}
      <section
        className="relative text-white pt-28 sm:pt-36 md:pt-40 lg:pt-48 pb-16 sm:pb-24 md:pb-28 lg:pb-36 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #060f1c 0%, #0B1A2C 40%, #0d1d30 70%, #081525 100%)",
        }}
      >
        {/* Subtle diagonal line pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 60px, rgba(215,195,138,0.025) 60px, rgba(215,195,138,0.025) 61px)",
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            {/* Text — left */}
            <div className="lg:col-span-3">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/70 font-semibold mb-5 sm:mb-7"
              >
                <span className="inline-block w-2 h-px bg-gold/50 mr-3 align-middle" />
                What We Offer
              </motion.p>
              <RevealText
                as="h1"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-0 max-w-2xl"
              >
                Our Services
              </RevealText>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="origin-left mt-6 sm:mt-8 mb-5 sm:mb-7"
              >
                <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-gold/60 to-transparent" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/45 max-w-xl leading-relaxed font-body"
              >
                Comprehensive financial solutions for every stage of life
              </motion.p>
            </div>

            {/* Icon grid — right */}
            <div className="lg:col-span-2 hidden lg:block">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Target, label: "Retirement" },
                  { icon: TrendingUp, label: "Investing" },
                  { icon: Shield, label: "Insurance" },
                  { icon: Calculator, label: "Tax" },
                  { icon: Building2, label: "Wealth" },
                  { icon: FileText, label: "Estate" },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gold/15 bg-white/[0.02] hover:border-gold/35 hover:bg-gold/[0.04] transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 text-gold/60" />
                      <span className="text-[0.6rem] uppercase tracking-[0.15em] text-white/30 font-medium">
                        {item.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== Main Services Section ======== */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 relative overflow-hidden grain-overlay" style={{ background: 'linear-gradient(160deg, #f8f7f4 0%, #f5f4f0 40%, #f2f1ed 100%)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16 md:mb-20 max-w-3xl mx-auto px-4"
          >
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/60 font-medium mb-5 sm:mb-7">
              What We Offer
            </p>
            <p className="text-sm sm:text-base md:text-lg text-midnight/50 leading-relaxed font-body">
              At Birchtree Financial, we offer a comprehensive suite of Canadian financial
              planning and investment management services. Each service is
              designed to work independently or as part of a complete financial
              strategy tailored to your unique situation.
            </p>
          </motion.div>

          {/* Gold divider */}
          <div className="flex justify-center mb-12 sm:mb-16 md:mb-20">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
          </div>

          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight tracking-tight px-2">
              Explore Our Services
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="h-full"
                >
                  <Link href={`/services/${service.slug}`} className="block h-full group">
                    <div
                      className="h-full flex rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5"
                      style={{
                        background: '#ffffff',
                        border: '1px solid rgba(11,26,44,0.06)',
                        boxShadow: '0 1px 2px rgba(11,26,44,0.04), 0 4px 12px rgba(11,26,44,0.03)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(11,26,44,0.06), 0 12px 32px rgba(11,26,44,0.08)'
                        e.currentTarget.style.borderColor = 'rgba(215,195,138,0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 1px 2px rgba(11,26,44,0.04), 0 4px 12px rgba(11,26,44,0.03)'
                        e.currentTarget.style.borderColor = 'rgba(11,26,44,0.06)'
                      }}
                    >
                      {/* Left accent bar */}
                      <div className="w-[3px] flex-shrink-0 transition-all duration-300 group-hover:w-1" style={{ background: '#D7C38A' }} />

                      <div className="p-6 sm:p-7 flex flex-col flex-1">
                        <div className="w-10 h-10 rounded-full bg-midnight flex items-center justify-center mb-5">
                          <Icon className="h-[18px] w-[18px] text-gold" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-heading font-bold text-midnight mb-3">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-base text-midnight/50 leading-relaxed mb-5 font-body">
                          {service.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-2 mb-6 flex-grow">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center space-x-2.5 text-sm text-midnight/50">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold/50 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <span className="text-midnight/60 group-hover:text-midnight font-medium text-sm inline-flex items-center mt-auto transition-colors duration-200">
                          Learn more
                          <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ======== FAQ Section ======== */}
      <FAQSection
        eyebrow="Common Questions"
        heading="Services FAQ"
        faqs={servicesFaqs}
      />

      {/* ======== CTA — Aurora dark section ======== */}
      <section className="py-20 sm:py-28 md:py-36 lg:py-44 text-white relative overflow-hidden grain-overlay">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 50% 45% at 45% 40%, rgba(215,195,138,0.03) 0%, transparent 60%),
            radial-gradient(ellipse 55% 50% at 20% 80%, rgba(21,36,57,0.3) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 50% 50%, transparent 30%, rgba(5,12,22,0.4) 100%),
            linear-gradient(160deg, #050c16 0%, #0B1A2C 30%, #101f33 60%, #0a1525 100%)
          `
        }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/60 font-medium mb-5 sm:mb-7">
              Get Started
            </p>
            <RevealText as="h2" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5 sm:mb-7 tracking-tight text-white px-2">
              Ready to Build Your Financial Strategy?
            </RevealText>
            <div className="flex justify-center mb-8 sm:mb-10">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
            </div>
            <p className="text-base sm:text-lg text-white/40 mb-10 sm:mb-14 max-w-xl mx-auto leading-relaxed font-body px-4">
              Schedule a complimentary consultation and discover which services are right for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center px-4">
              <Button
                asChild
                size="lg"
                className="relative z-10 w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 bg-gold/90 hover:bg-gold text-midnight font-semibold border-0 shadow-[0_4px_20px_rgba(215,195,138,0.2)] hover:shadow-[0_8px_40px_rgba(215,195,138,0.3)] transition-all duration-300 hover:scale-[1.02] rounded-xl [&>*]:text-midnight"
              >
                <Link href="/contact" className="text-midnight">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="relative z-10 w-full sm:w-auto text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-6 bg-white/[0.04] border border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300 rounded-xl [&>*]:text-white"
              >
                <Link href="/team" className="text-white">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
