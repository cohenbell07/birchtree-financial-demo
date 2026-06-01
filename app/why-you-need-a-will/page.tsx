"use client"

import Link from "next/link"

import PageHeader from "@/components/layout/PageHeader"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { Reveal, RevealStagger } from "@/components/ui/reveal"
import {
  FileText,
  CheckCircle2,
  Shield,
  Users,
  Clock,
  AlertCircle,
  ArrowRight,
} from "lucide-react"

const reasons = [
  {
    icon: Shield,
    title: "Control Over Asset Distribution",
    description:
      "Without a Will, your estate is distributed according to provincial intestacy laws, which may not align with your wishes. A Will ensures your assets go to the people and causes you choose.",
  },
  {
    icon: Users,
    title: "Protect Your Family",
    description:
      "A Will allows you to name guardians for minor children and dependents, ensuring they are cared for by people you trust. It also helps prevent family disputes and confusion during a difficult time.",
  },
  {
    icon: Clock,
    title: "Reduce Delays and Costs",
    description:
      "When someone dies without a Will (intestate), the probate process can be significantly longer and more expensive. A properly drafted Will can streamline estate administration and reduce legal fees.",
  },
  {
    icon: AlertCircle,
    title: "Avoid Intestate Succession Rules",
    description:
      "In Canada, if you die without a Will, provincial law determines how your assets are distributed. Your spouse may not automatically receive everything — assets may be split between your spouse and children according to formulaic rules.",
  },
  {
    icon: FileText,
    title: "Name an Executor",
    description:
      "A Will allows you to choose a trusted executor who understands your wishes and can manage your estate efficiently. Without a Will, the court appoints an administrator, which may not be someone you would have chosen.",
  },
  {
    icon: CheckCircle2,
    title: "Plan for Tax Implications",
    description:
      "A Will can help minimize tax consequences for your beneficiaries through proper estate planning strategies. This is especially important for registered accounts like RRSPs and TFSAs.",
  },
]

const considerations = [
  "Update your Will after major life events such as marriage, divorce, birth of children, or significant changes in assets",
  "Consider creating a Power of Attorney for property and personal care to handle decisions if you become incapacitated",
  "Review beneficiary designations on registered accounts, insurance policies, and pensions to ensure they align with your Will",
  "Store your Will in a safe place and inform your executor of its location",
]

export default function WhyYouNeedAWillPage() {
  return (
    <>
      <PageHeader
        eyebrow="Estate Planning"
        title="Why You Need a Will"
        subtitle="Understanding the importance of estate planning for Canadians."
      />

      <Section tone="paper" topRule>
        <Container size="narrow">
          <Reveal>
            <div className="rounded-2xl border border-midnight/10 bg-white p-7 sm:p-9">
              <p
                className="leading-relaxed text-midnight/65"
                style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.2rem)" }}
              >
                Without a Will, your estate may not automatically pass to your
                spouse. Assets are distributed by the rules of intestate
                succession, which vary by province. Having a Will gives you
                control, reduces delays, and helps your family avoid
                unnecessary stress during an already difficult time.
              </p>
            </div>
          </Reveal>

          <div className="mt-16">
            <SectionHeader
              eyebrow="Six Reasons"
              heading="Why a Will matters"
            />

            <RevealStagger
              stagger={0.07}
              className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
            >
              {reasons.map((reason) => {
                const Icon = reason.icon
                return (
                  <article
                    key={reason.title}
                    className="h-full rounded-2xl border border-midnight/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-midnight/15 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)] sm:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        aria-hidden
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]"
                      >
                        <Icon
                          className="h-[20px] w-[20px] text-gold-dark"
                          strokeWidth={1.6}
                        />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-heading text-[1.05rem] font-bold leading-snug tracking-tight text-midnight sm:text-[1.15rem]">
                          {reason.title}
                        </h3>
                        <p className="mt-3 text-[0.92rem] leading-relaxed text-midnight/60">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </RevealStagger>
          </div>

          <Reveal>
            <div className="mt-16 rounded-2xl border border-midnight/10 bg-white p-7 sm:p-9">
              <h3 className="font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                Additional Considerations
              </h3>
              <div
                aria-hidden
                className="mt-4 h-px w-16"
                style={{
                  background:
                    "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
                }}
              />
              <ul className="mt-7 space-y-4">
                {considerations.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark"
                    />
                    <span className="text-[0.95rem] leading-relaxed text-midnight/65">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div
              className="mt-12 rounded-2xl border p-5 sm:p-6"
              style={{
                background: "rgba(215, 195, 138, 0.06)",
                borderColor: "rgba(215, 195, 138, 0.3)",
              }}
            >
              <p className="text-sm leading-relaxed text-midnight/65">
                <strong className="font-heading text-midnight">
                  Disclaimer:
                </strong>{" "}
                This information is for educational purposes only and does not
                constitute legal or financial advice. Estate planning laws vary
                by province in Canada. Please consult with a qualified estate
                lawyer and financial advisor to create a Will and estate plan
                that meets your specific needs and complies with provincial
                laws.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-xl bg-midnight px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)] sm:w-auto"
              >
                Speak with a Financial Advisor
              </Link>
              <Link
                href="/helpful-tools"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-midnight/20 bg-white px-7 py-3.5 text-sm font-semibold text-midnight transition-all duration-300 hover:border-midnight/40 hover:bg-midnight/[0.03] sm:w-auto"
              >
                View Will Planning Checklist
                <ArrowRight className="h-4 w-4 text-gold-dark transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
