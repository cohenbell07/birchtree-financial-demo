"use client"

import Link from "next/link"
import PageHeader from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { ExternalLink, FileText, GraduationCap, Home, BookOpen, Heart, Globe, Phone } from "lucide-react"

const willPlanningChecklist = [
  "Name an executor to manage your estate and carry out your wishes",
  "Designate guardianship for dependents (children, elderly parents, or pets)",
  "Specify distribution of assets to beneficiaries",
  "Establish a Power of Attorney for financial and healthcare decisions",
  "Document digital assets and online account access information",
  "Consider charitable donations and legacy giving",
  "Plan for business succession if you own a business",
  "Address potential tax implications for your beneficiaries",
  "Include instructions for funeral and burial preferences",
  "Review and update beneficiary designations on registered accounts (RRSP, TFSA, insurance)",
  "Consider setting up trusts for minor beneficiaries or special needs dependents",
  "Document your wishes for end-of-life medical care",
  "Ensure your Will is properly witnessed and stored securely",
  "Review your Will periodically and update after major life events",
  "Communicate your wishes with your executor and family members"
]

export default function HelpfulToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Helpful Tools & Resources"
        subtitle="Access government resources, planning guides, and essential financial information for Canadians."
      />

      <Section tone="paper" topRule>
        <Container>
          <div className="space-y-10 sm:space-y-14 md:space-y-16">

            {/* Government Pension Benefits */}
            <Reveal>
              <div className="rounded-2xl border border-midnight/10 bg-white p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                    <FileText className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                      Resources
                    </p>
                    <h2 className="mt-2 font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                      Government Pension Benefits
                    </h2>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-midnight/60">
                      Access information and applications for Canada Pension Plan (CPP) and Old Age Security (OAS) benefits
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <Link
                    href="https://www.canada.ca/en/services/benefits/publicpensions/cpp.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center rounded-xl border border-midnight/10 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-midnight/15 hover:shadow-[0_14px_32px_rgba(11,26,44,0.08)]"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-midnight transition-colors group-hover:text-gold-dark sm:text-base">
                        General CPP Info
                      </div>
                    </div>
                    <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0 text-midnight/40 transition-colors group-hover:text-gold-dark" />
                  </Link>

                  <Link
                    href="https://www.canada.ca/en/services/benefits/publicpensions/cpp/apply.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center rounded-xl border border-midnight/10 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-midnight/15 hover:shadow-[0_14px_32px_rgba(11,26,44,0.08)]"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-midnight transition-colors group-hover:text-gold-dark sm:text-base">
                        How to Apply for CPP
                      </div>
                    </div>
                    <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0 text-midnight/40 transition-colors group-hover:text-gold-dark" />
                  </Link>

                  <Link
                    href="https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center rounded-xl border border-midnight/10 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-midnight/15 hover:shadow-[0_14px_32px_rgba(11,26,44,0.08)]"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-midnight transition-colors group-hover:text-gold-dark sm:text-base">
                        OAS Info
                      </div>
                    </div>
                    <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0 text-midnight/40 transition-colors group-hover:text-gold-dark" />
                  </Link>

                  <Link
                    href="https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center rounded-xl border border-midnight/10 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-midnight/15 hover:shadow-[0_14px_32px_rgba(11,26,44,0.08)]"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-midnight transition-colors group-hover:text-gold-dark sm:text-base">
                        How to Apply for OAS
                      </div>
                    </div>
                    <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0 text-midnight/40 transition-colors group-hover:text-gold-dark" />
                  </Link>

                  <div className="flex items-center rounded-xl border border-midnight/10 bg-[#F7F5EF] p-4 sm:col-span-2">
                    <span className="mr-3 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                      <Phone className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-midnight sm:text-base">
                        Service Canada Contact
                      </div>
                      <div className="mt-1 text-xs text-midnight/55 sm:text-sm">
                        1-800-622-6232
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Government Programs */}
            <Reveal>
              <div className="rounded-2xl border border-midnight/10 bg-white p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                    <Globe className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                      Resources
                    </p>
                    <h2 className="mt-2 font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                      Government Programs
                    </h2>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-midnight/60">
                      Explore registered savings plans and government programs available to Canadians
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <Link
                    href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center rounded-xl border border-midnight/10 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-midnight/15 hover:shadow-[0_14px_32px_rgba(11,26,44,0.08)]"
                  >
                    <span className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                      <GraduationCap className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-midnight transition-colors group-hover:text-gold-dark sm:text-base">
                        Registered Education Savings Plan (RESP)
                      </div>
                    </div>
                    <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0 text-midnight/40 transition-colors group-hover:text-gold-dark" />
                  </Link>

                  <Link
                    href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/what-home-buyers-plan/participate-home-buyers-plan.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center rounded-xl border border-midnight/10 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-midnight/15 hover:shadow-[0_14px_32px_rgba(11,26,44,0.08)]"
                  >
                    <span className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                      <Home className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-midnight transition-colors group-hover:text-gold-dark sm:text-base">
                        Home Buyers Plan (HBP)
                      </div>
                    </div>
                    <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0 text-midnight/40 transition-colors group-hover:text-gold-dark" />
                  </Link>

                  <Link
                    href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/rrsps-related-plans/lifelong-learning-plan.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center rounded-xl border border-midnight/10 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-midnight/15 hover:shadow-[0_14px_32px_rgba(11,26,44,0.08)]"
                  >
                    <span className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                      <BookOpen className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-midnight transition-colors group-hover:text-gold-dark sm:text-base">
                        Lifelong Learning Plan (LLP)
                      </div>
                    </div>
                    <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0 text-midnight/40 transition-colors group-hover:text-gold-dark" />
                  </Link>

                  <Link
                    href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-disability-savings-plan-rdsp.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center rounded-xl border border-midnight/10 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-midnight/15 hover:shadow-[0_14px_32px_rgba(11,26,44,0.08)]"
                  >
                    <span className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                      <Heart className="h-[18px] w-[18px] text-gold-dark" strokeWidth={1.6} />
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-midnight transition-colors group-hover:text-gold-dark sm:text-base">
                        Registered Disability Savings Plan (RDSP)
                      </div>
                    </div>
                    <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0 text-midnight/40 transition-colors group-hover:text-gold-dark" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Will Planning Checklist */}
            <Reveal>
              <div className="rounded-2xl border border-midnight/10 bg-white p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                    <FileText className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                      Resources
                    </p>
                    <h2 className="mt-2 font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                      Will Planning Checklist
                    </h2>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-midnight/60">
                      There are many important decisions when drafting a Will. Here&apos;s a checklist of topics to help guide your thinking.
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 sm:space-y-4">
                  {willPlanningChecklist.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                        <span className="h-2 w-2 rounded-full bg-gold-dark" />
                      </span>
                      <span className="flex-1 text-sm leading-relaxed text-midnight/70 sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-midnight/[0.07] pt-6">
                  <Button asChild>
                    <Link href="/why-you-need-a-will">
                      Learn More About Why You Need a Will
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal>
              <div className="mx-auto max-w-2xl overflow-hidden rounded-[1.75rem] border border-midnight/10 bg-[#F7F5EF] px-8 py-12 text-center sm:px-12 sm:py-14">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                  Resources
                </p>
                <h3
                  className="mt-3 font-heading font-bold leading-[1.12] tracking-tight text-midnight"
                  style={{ fontSize: "clamp(1.7rem, 1.3rem + 1.6vw, 2.6rem)" }}
                >
                  Need Personalized Guidance?
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-midnight/65">
                  While these resources provide valuable information, personalized financial and estate planning requires understanding your unique situation. Schedule a consultation to discuss your specific needs.
                </p>
                <div className="mt-7 flex justify-center">
                  <Button asChild size="lg">
                    <Link href="/contact">Schedule a Consultation</Link>
                  </Button>
                </div>
              </div>
            </Reveal>

          </div>
        </Container>
      </Section>
    </>
  )
}
