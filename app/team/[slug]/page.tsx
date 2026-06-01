"use client"

import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Phone, ArrowLeft, ArrowRight, Award, BookOpen, Briefcase, CheckCircle2 } from "lucide-react"

const teamMembers = [
  {
    slug: "melissa-birch",
    name: "Melissa Birch",
    role: "Owner • Financial Advisor",
    fullBio: "As the owner and financial advisor of Birchtree Financial, Melissa brings visionary leadership and deep expertise in financial advisory services and business strategy. With a commitment to excellence and client-centered service, she oversees the firm's strategic direction while ensuring every client receives personalized attention and expert guidance. Her extensive experience in the financial services industry has shaped Birchtree Financial into a trusted advisory firm known for its integrity, innovation, and client-first approach. Melissa is licensed to provide life insurance and accident & sickness insurance products, having completed the Life License Qualification Program (LLQP).",
    credentials: "LLQP",
    education: "LLQP (Life License Qualification Program)",
    specialties: ["Strategic Financial Advisory", "Business Leadership", "Client Relationship Management", "Life Insurance", "Accident & Sickness Insurance"],
    experience: "15+",
    experienceLabel: "Years of Experience",
    image: "/melissaupdate.webp",
    hasOfficialPhoto: true,
    email: "melissa.birch@birchtreefinancial.ca",
    phone: "(403) 556-7777",
  },
  {
    slug: "kevin-birch",
    name: "Kevin Birch",
    role: "Co-owner & Office Administrator",
    fullBio: "Kevin serves as Co-owner and Office Administrator, managing daily operations and ensuring smooth client experiences. His expertise in administrative systems and client relations helps maintain the high standards of service that define Birchtree Financial. Kevin works closely with the team to streamline processes and support our advisory services. With a focus on operational excellence and client satisfaction, he ensures that every interaction with Birchtree Financial is seamless and professional.",
    credentials: "Office Administration, Client Relations",
    education: "Business Administration, Client Relations Management",
    specialties: ["Office Management", "Client Relations", "Operational Excellence"],
    experience: "12+",
    experienceLabel: "Years of Experience",
    image: "/Kevinupdate.webp",
    hasOfficialPhoto: true,
    email: "",
    phone: "(403) 556-7777",
  },
  {
    slug: "kaleb-birch",
    name: "Kaleb Birch",
    role: "IT Specialist",
    fullBio: "Kaleb is our IT Specialist, responsible for maintaining our technology infrastructure and ensuring secure, efficient operations. His technical expertise supports our team's ability to serve clients effectively while protecting sensitive financial information. Kaleb ensures our systems are modern, secure, and user-friendly. With a deep understanding of financial technology and cybersecurity, he keeps Birchtree Financial at the forefront of digital innovation while maintaining the highest standards of data protection and system reliability.",
    credentials: "Information Technology, Systems Administration",
    education: "Computer Science, Information Systems Security",
    specialties: ["Technology Infrastructure", "Cybersecurity", "System Administration"],
    experience: "5+",
    experienceLabel: "Years of Experience",
    image: "/kalebbirchtreenew.webp",
    hasOfficialPhoto: true,
    email: "",
    phone: "(403) 556-7777",
  },
  {
    slug: "crystal",
    name: "Crystal Smith",
    role: "Bookkeeper • Office Administrator",
    fullBio: "Crystal Smith is the welcoming face of Birchtree Financial, serving as our Bookkeeper. She ensures clients feel valued from the moment they contact us, handling inquiries with professionalism and warmth. Crystal's attention to detail and excellent communication skills help create a positive first impression and seamless client experience. Her dedication to exceptional service and genuine care for clients sets the tone for every interaction at Birchtree Financial.",
    credentials: "Client Services, Administrative Support",
    education: "Administrative Studies, Customer Service Excellence",
    specialties: ["Client Communication", "Administrative Support", "Customer Service"],
    experience: "5+",
    experienceLabel: "Years of Experience",
    image: "/crystalteamimg.webp",
    hasOfficialPhoto: true,
    email: "",
    phone: "(403) 556-7777",
  },
  {
    slug: "art-birch",
    name: "Art Birch",
    role: "Founder & Mentor",
    fullBio: "Art Birch is the Founder and Mentor of Birchtree Financial, bringing decades of experience and a deep commitment to helping clients achieve their financial goals. As the founder, Art established the firm with a vision of providing personalized, transparent, and expert financial advisory services to Canadians across the country. His extensive background in life insurance, investment management, and client relationships has shaped Birchtree Financial into the trusted advisory firm it is today. Art continues to work directly with clients, providing strategic guidance and helping families and individuals navigate their financial journeys with confidence and clarity. Art is licensed to provide life insurance and accident & sickness insurance products, having completed the Life License Qualification Program (LLQP).",
    credentials: "LLQP",
    education: "LLQP (Life License Qualification Program)",
    specialties: ["Life Insurance", "Investment Advisory", "Retirement Planning", "Estate Planning"],
    experience: "30+",
    experienceLabel: "Years of Experience",
    image: "/artbirchnew.webp",
    hasOfficialPhoto: true,
    email: "",
    phone: "(403) 556-7777",
  },
]

function getTeamMember(slug: string) {
  return teamMembers.find((member) => member.slug === slug)
}

export default function TeamMemberPage() {
  const params = useParams()
  const slug = params?.slug as string
  const member = getTeamMember(slug)

  if (!member) {
    notFound()
  }

  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Our Team"
        title={member.name}
        subtitle={member.role}
      />

      <section className="relative bg-[#F7F5EF] py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">

              {/* ── Sidebar ── */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24 space-y-4">

                  {/* Photo card */}
                  <div className="overflow-hidden rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.09)]">
                    <div className={`relative ${member.hasOfficialPhoto ? "flex items-center justify-center p-4 sm:p-6 min-h-[320px] sm:min-h-[400px]" : "h-48 sm:h-64"} w-full bg-[#F7F5EF]`}>
                      {member.hasOfficialPhoto ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={280}
                          height={380}
                          sizes="(max-width: 768px) 220px, 280px"
                          priority
                          className="object-contain rounded-xl w-full max-w-[220px] sm:max-w-[260px]"
                        />
                      ) : (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 220px, 280px"
                          priority
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="p-4 sm:p-5 border-t border-midnight/10">
                      <h3 className="mb-0.5 font-heading text-lg font-bold leading-[1.18] tracking-tight text-midnight sm:text-xl">
                        {member.name}
                      </h3>
                      <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                        {member.role}
                      </p>

                      {/* Credential badge */}
                      <div className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-gold/30 bg-gold/[0.08] px-2.5 py-1 text-xs font-semibold tracking-wide text-gold-dark">
                        <Award className="h-3 w-3 text-gold-dark" strokeWidth={1.6} />
                        {member.credentials}
                      </div>

                      {/* Contact */}
                      <div className="space-y-2.5 border-t border-midnight/10 pt-3">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="group/link flex items-center gap-2.5 text-sm text-midnight/65 transition-colors duration-200 hover:text-midnight"
                          >
                            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05] transition-colors group-hover/link:bg-midnight/[0.07]">
                              <Mail className="h-3.5 w-3.5 text-gold-dark" strokeWidth={1.6} />
                            </span>
                            <span className="truncate">{member.email}</span>
                          </a>
                        )}
                        <a
                          href={`tel:${member.phone}`}
                          className="group/link flex items-center gap-2.5 text-sm text-midnight/65 transition-colors duration-200 hover:text-midnight"
                        >
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05] transition-colors group-hover/link:bg-midnight/[0.07]">
                            <Phone className="h-3.5 w-3.5 text-gold-dark" strokeWidth={1.6} />
                          </span>
                          {member.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Experience stat card */}
                  <div className="rounded-2xl border border-midnight/10 bg-white p-5">
                    <div
                      aria-hidden
                      className="mb-3 h-px w-16"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
                      }}
                    />
                    <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                      Experience
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading text-4xl font-bold tracking-tight text-midnight sm:text-5xl">
                        {member.experience}
                      </span>
                      <span className="text-sm text-midnight/55">{member.experienceLabel}</span>
                    </div>
                  </div>

                  {/* Back button */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-xl border border-midnight/20 bg-white text-midnight transition-all duration-300 hover:border-midnight/40 hover:bg-midnight/[0.03]"
                  >
                    <Link href="/team">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Team
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* ── Main Content ── */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-2 space-y-5 sm:space-y-6"
              >
                {/* About */}
                <div className="overflow-hidden rounded-2xl border border-midnight/10 bg-white">
                  <div className="flex items-center gap-3 border-b border-midnight/10 px-5 py-4 sm:px-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                      <BookOpen className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                    </span>
                    <h2 className="font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">About</h2>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-base leading-relaxed text-midnight/65 sm:text-lg">
                      {member.fullBio}
                    </p>
                  </div>
                </div>

                {/* Education */}
                <div className="overflow-hidden rounded-2xl border border-midnight/10 bg-white">
                  <div className="flex items-center gap-3 border-b border-midnight/10 px-5 py-4 sm:px-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                      <Award className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                    </span>
                    <h2 className="font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">Education &amp; Credentials</h2>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-sm leading-relaxed text-midnight/65 sm:text-base">
                      {member.education}
                    </p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="overflow-hidden rounded-2xl border border-midnight/10 bg-white">
                  <div className="flex items-center gap-3 border-b border-midnight/10 px-5 py-4 sm:px-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                      <Briefcase className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                    </span>
                    <h2 className="font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">Areas of Expertise</h2>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex items-center gap-1.5 rounded-full border border-midnight/12 bg-midnight/[0.04] px-3 py-1.5 text-xs font-semibold text-midnight sm:text-sm"
                        >
                          <CheckCircle2 className="h-3 w-3 text-gold-dark" strokeWidth={1.6} />
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div
                  className="relative overflow-hidden rounded-[1.75rem] border border-midnight/10 p-6 sm:p-8"
                  style={{
                    background:
                      "linear-gradient(135deg, #FBFAF6 0%, #F7F5EF 100%)",
                  }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.10) 0%, transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <div
                      aria-hidden
                      className="mb-3 h-px w-16"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
                      }}
                    />
                    <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                      Work Together
                    </p>
                    <h3 className="mb-2 font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                      Ready to get started?
                    </h3>
                    <p className="mb-5 max-w-md text-sm leading-relaxed text-midnight/65 sm:text-base">
                      Schedule a complimentary consultation and take the first step toward a stronger financial future.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/contact"
                        className="group inline-flex w-full items-center justify-center rounded-xl bg-midnight px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)] sm:w-auto"
                      >
                        Book a Consultation
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href="/team"
                        className="inline-flex w-full items-center justify-center rounded-xl border border-midnight/20 bg-white px-7 py-3.5 text-sm font-semibold text-midnight transition-all duration-300 hover:border-midnight/40 hover:bg-midnight/[0.03] sm:w-auto"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Meet the Team
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
