"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import RevealText from "@/components/RevealText"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SectionHeader } from "@/components/ui/section-header"
import { Reveal, RevealStagger } from "@/components/ui/reveal"

const teamMembers = [
  {
    slug: "melissa-birch",
    name: "Melissa Birch",
    role: "Owner • Financial Advisor",
    bio: "As the owner and financial advisor of Birchtree Financial, Melissa brings visionary leadership and deep expertise in financial advisory services and business strategy. With a commitment to excellence and client-centered service, she oversees the firm's strategic direction while ensuring every client receives personalized attention and expert guidance.",
    credentials: "LLQP",
    image: "/melissaupdate.webp",
    experience: "15+",
  },
  {
    slug: "kevin-birch",
    name: "Kevin Birch",
    role: "Co-owner & Office Administrator",
    bio: "Kevin serves as Co-owner and Office Administrator, managing daily operations and ensuring smooth client experiences. His expertise in administrative systems and client relations helps maintain the high standards of service that define Birchtree Financial.",
    credentials: "Office Administration",
    image: "/Kevinupdate.webp",
    experience: "12+",
  },
  {
    slug: "kaleb-birch",
    name: "Kaleb Birch",
    role: "IT Specialist",
    bio: "Kaleb is our IT Specialist, responsible for maintaining our technology infrastructure and ensuring secure, efficient operations. His technical expertise supports our team's ability to serve clients effectively while protecting sensitive financial information.",
    credentials: "Information Technology",
    image: "/kalebbirchtreenew.webp",
    experience: "5+",
  },
  {
    slug: "crystal",
    name: "Crystal Smith",
    role: "Bookkeeper • Office Administrator",
    bio: "Crystal Smith is the welcoming face of Birchtree Financial, serving as our Bookkeeper. She ensures clients feel valued from the moment they contact us, handling inquiries with professionalism and warmth.",
    credentials: "Client Services",
    image: "/crystalteamimg.webp",
    experience: "5+",
  },
  {
    slug: "art-birch",
    name: "Art Birch",
    role: "Founder & Mentor",
    bio: "Art Birch is the Founder and Mentor of Birchtree Financial, bringing decades of experience and a deep commitment to helping clients achieve their financial goals. As the founder, Art established the firm with a vision of providing personalized, transparent financial guidance.",
    credentials: "LLQP",
    image: "/artbirchnew.webp",
    experience: "30+",
  },
]

export default function TeamPage() {
  return (
    <>
      {/* ============ HERO — Centered + overlapping portrait circles ============ */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(160deg, #060f1c 0%, #0B1A2C 40%, #0d1d30 70%, #081525 100%)",
          paddingTop: "clamp(7rem, 8vw + 4rem, 12rem)",
          paddingBottom: "clamp(4rem, 6vw + 2rem, 9rem)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-[15%] top-[30%] h-[60%] w-[50%] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(21,36,57,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        />

        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-7 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-gold"
            >
              <span aria-hidden className="mr-3 inline-block h-px w-3 align-middle bg-gold/60" />
              Our People
              <span aria-hidden className="ml-3 inline-block h-px w-3 align-middle bg-gold/60" />
            </motion.p>

            <RevealText
              as="h1"
              className="font-heading font-bold leading-[1.06] tracking-tight text-white text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Meet Our Team
            </RevealText>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-7 mb-7"
              style={{ width: "fit-content" }}
            >
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12 leading-relaxed text-white/85"
              style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.5vw, 1.3rem)" }}
            >
              Dedicated professionals committed to your financial success.
            </motion.p>

            {/* Overlapping portraits */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center"
            >
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                  className={`relative ${i > 0 ? "-ml-4 sm:-ml-5" : ""} ${i > 2 ? "hidden sm:block" : ""}`}
                  style={{ zIndex: teamMembers.length - i }}
                >
                  <div className="h-16 w-16 overflow-hidden rounded-full ring-[3px] ring-[#0B1A2C] shadow-lg sm:h-20 sm:w-20">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={80}
                      height={80}
                      sizes="80px"
                      priority={i === 0}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============ TEAM ============ */}
      <Section tone="paper" topRule>
        <Container>
          <SectionHeader
            eyebrow="The Birchtree Team"
            heading="The people behind your plan"
            subtitle="Our team combines experience with a genuine passion for helping clients achieve their financial goals. Get to know the professionals who will be working alongside you."
          />

          <RevealStagger
            stagger={0.07}
            className="mx-auto mt-16 max-w-5xl space-y-6 sm:space-y-8"
          >
            {teamMembers.map((member, idx) => (
              <article
                key={member.slug}
                className="group relative overflow-hidden rounded-2xl"
                style={{
                  background:
                    "linear-gradient(145deg, #0d1f33 0%, #0B1A2C 50%, #091525 100%)",
                  border: "1px solid rgba(215,195,138,0.08)",
                  boxShadow:
                    "0 2px 12px rgba(0,0,0,0.1), 0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                {/* Top hairline */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-all duration-300 group-hover:via-gold/55"
                />

                <div className="relative grid grid-cols-1 gap-0 md:grid-cols-3">
                  <div className="flex items-center justify-center p-7 sm:p-9 md:border-r md:border-white/[0.06]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={260}
                      height={360}
                      sizes="(max-width: 768px) 220px, 260px"
                      priority={idx === 0}
                      loading={idx === 0 ? undefined : "lazy"}
                      className="w-full max-w-[220px] rounded-xl object-contain sm:max-w-[260px]"
                    />
                  </div>

                  <div className="flex flex-col justify-center space-y-5 p-7 sm:p-9 md:col-span-2 md:p-11">
                    <div>
                      <h3 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl md:text-[2.1rem]">
                        {member.name}
                      </h3>
                      <p className="mt-2 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-gold/70">
                        {member.role}
                      </p>
                    </div>

                    {/* Experience + credential */}
                    <div className="flex items-center gap-5">
                      <div>
                        <span className="block font-heading text-3xl font-bold leading-none text-gold sm:text-4xl">
                          {member.experience}
                        </span>
                        <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/55">
                          Years
                        </span>
                      </div>
                      <span
                        className="inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-semibold tracking-wide text-gold"
                        style={{
                          background: "rgba(215,195,138,0.06)",
                          borderColor: "rgba(215,195,138,0.25)",
                        }}
                      >
                        {member.credentials}
                      </span>
                    </div>

                    <p className="max-w-2xl text-[0.95rem] leading-relaxed text-white/75 sm:text-base">
                      {member.bio}
                    </p>

                    <div className="pt-1">
                      <Button
                        asChild
                        className="min-h-[44px] rounded-lg bg-gold px-5 text-sm font-semibold text-midnight transition-all duration-200 hover:bg-gold-light hover:scale-[1.02]"
                      >
                        <Link href={`/team/${member.slug}`} className="text-midnight">
                          View Profile
                          <ArrowRight className="ml-2 inline h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* ============ CTA (dark) ============ */}
      <Section tone="dark" topRule grain>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow tone="dark" className="mb-6">
                Get Started
              </Eyebrow>
              <h2
                className="font-heading font-bold leading-[1.1] tracking-tight text-white text-balance"
                style={{ fontSize: "clamp(2rem, 1.5rem + 2.5vw, 3.6rem)" }}
              >
                Ready to work with our team?
              </h2>
              <div
                aria-hidden
                className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
              />
              <p className="mx-auto mt-8 max-w-xl leading-relaxed text-white/80"
                style={{ fontSize: "clamp(1rem, 0.92rem + 0.4vw, 1.15rem)" }}
              >
                Book a complimentary consultation and let our team help you
                build a stronger financial future.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl border-0 bg-gold px-9 py-6 text-sm font-semibold text-midnight shadow-[0_4px_20px_rgba(215,195,138,0.2)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_8px_40px_rgba(215,195,138,0.3)] sm:w-auto sm:text-base [&>*]:text-midnight"
                >
                  <Link href="/contact" className="text-midnight">
                    Book a Consultation
                    <ArrowRight className="ml-2 inline h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl border border-white/[0.18] bg-white/[0.04] px-9 py-6 text-sm text-white/85 transition-all duration-300 hover:border-white/35 hover:bg-white/[0.08] hover:text-white sm:w-auto sm:text-base [&>*]:text-white"
                >
                  <Link href="/services" className="text-white">
                    Our Services
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
