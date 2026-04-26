"use client"

import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Phone, ArrowLeft, Award, BookOpen, Briefcase, CheckCircle2 } from "lucide-react"

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
    <div>
      <PageHeader
        eyebrow="Our Team"
        title={member.name}
        subtitle={member.role}
      />

      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-mist/60 to-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">

              {/* ── Sidebar ── */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24 space-y-4">

                  {/* Photo card */}
                  <div
                    className="rounded-2xl overflow-hidden bg-white border border-midnight/[0.07] shadow-[0_4px_24px_rgba(11,26,44,0.08)]"
                    style={{ borderTop: "2px solid rgba(215,195,138,0.3)" }}
                  >
                    <div className={`relative ${member.hasOfficialPhoto ? "flex items-center justify-center p-4 sm:p-6 min-h-[320px] sm:min-h-[400px]" : "h-48 sm:h-64"} w-full bg-gradient-to-b from-mist/40 to-white`}>
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

                    <div className="p-4 sm:p-5 border-t border-midnight/[0.06]">
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-midnight mb-0.5">
                        {member.name}
                      </h3>
                      <p className="text-xs text-midnight/50 font-semibold tracking-wide uppercase mb-3">
                        {member.role}
                      </p>

                      {/* Credential badge */}
                      <div
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide border mb-4"
                        style={{
                          background: "rgba(215,195,138,0.07)",
                          borderColor: "rgba(215,195,138,0.3)",
                          color: "#A8914F",
                        }}
                      >
                        <Award className="h-3 w-3" />
                        {member.credentials}
                      </div>

                      {/* Contact */}
                      <div className="pt-3 border-t border-midnight/[0.07] space-y-2.5">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2.5 text-sm text-midnight/70 hover:text-midnight transition-colors duration-150 group/link"
                          >
                            <span className="w-7 h-7 rounded-lg bg-midnight/5 flex items-center justify-center flex-shrink-0 group-hover/link:bg-midnight/10 transition-colors">
                              <Mail className="h-3.5 w-3.5 text-midnight/60" />
                            </span>
                            <span className="truncate">{member.email}</span>
                          </a>
                        )}
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center gap-2.5 text-sm text-midnight/70 hover:text-midnight transition-colors duration-150 group/link"
                        >
                          <span className="w-7 h-7 rounded-lg bg-midnight/5 flex items-center justify-center flex-shrink-0 group-hover/link:bg-midnight/10 transition-colors">
                            <Phone className="h-3.5 w-3.5 text-midnight/60" />
                          </span>
                          {member.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Experience stat card */}
                  <div
                    className="rounded-2xl p-5 bg-midnight text-white relative overflow-hidden"
                    style={{ boxShadow: "0 4px 24px rgba(11,26,44,0.18)" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                    <p className="text-xs uppercase tracking-[0.18em] text-gold/70 font-semibold mb-1">
                      Experience
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-heading font-bold text-white">
                        {member.experience}
                      </span>
                      <span className="text-sm text-silver/60">{member.experienceLabel}</span>
                    </div>
                  </div>

                  {/* Back button */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-midnight/20 text-midnight hover:bg-midnight hover:text-white transition-all duration-150"
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
                transition={{ duration: 0.5 }}
                className="lg:col-span-2 space-y-5 sm:space-y-6"
              >
                {/* About */}
                <div
                  className="rounded-2xl bg-white border border-midnight/[0.07] shadow-[0_2px_12px_rgba(11,26,44,0.06)] overflow-hidden"
                  style={{ borderTop: "2px solid rgba(215,195,138,0.25)" }}
                >
                  <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-midnight/[0.06]">
                    <span className="w-8 h-8 rounded-lg bg-midnight/5 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-midnight/60" />
                    </span>
                    <h2 className="text-base sm:text-lg font-heading font-bold text-midnight">About</h2>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-base sm:text-lg text-midnight/80 leading-relaxed">
                      {member.fullBio}
                    </p>
                  </div>
                </div>

                {/* Education */}
                <div className="rounded-2xl bg-white border border-midnight/[0.07] shadow-[0_2px_12px_rgba(11,26,44,0.06)] overflow-hidden">
                  <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-midnight/[0.06]">
                    <span className="w-8 h-8 rounded-lg bg-midnight/5 flex items-center justify-center">
                      <Award className="h-4 w-4 text-midnight/60" />
                    </span>
                    <h2 className="text-base sm:text-lg font-heading font-bold text-midnight">Education & Credentials</h2>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-sm sm:text-base text-midnight/70 leading-relaxed">
                      {member.education}
                    </p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="rounded-2xl bg-white border border-midnight/[0.07] shadow-[0_2px_12px_rgba(11,26,44,0.06)] overflow-hidden">
                  <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-midnight/[0.06]">
                    <span className="w-8 h-8 rounded-lg bg-midnight/5 flex items-center justify-center">
                      <Briefcase className="h-4 w-4 text-midnight/60" />
                    </span>
                    <h2 className="text-base sm:text-lg font-heading font-bold text-midnight">Areas of Expertise</h2>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border"
                          style={{
                            background: "rgba(11,26,44,0.04)",
                            borderColor: "rgba(11,26,44,0.12)",
                            color: "#1B2A3D",
                          }}
                        >
                          <CheckCircle2 className="h-3 w-3 text-midnight/40" />
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div
                  className="rounded-2xl p-6 sm:p-8 bg-midnight text-white relative overflow-hidden"
                  style={{ boxShadow: "0 8px 32px rgba(11,26,44,0.18)" }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  <p className="text-xs uppercase tracking-[0.18em] text-gold/70 font-semibold mb-2">
                    Work Together
                  </p>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
                    Ready to get started?
                  </h3>
                  <p className="text-sm sm:text-base text-silver/70 mb-5 leading-relaxed">
                    Schedule a complimentary consultation and take the first step toward a stronger financial future.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      asChild
                      className="w-full sm:w-auto bg-gradient-to-r from-emerald to-emerald-light hover:from-midnight-light hover:to-midnight-light text-white border-2 border-white/10 hover:border-white/20 transition-all duration-150 hover:scale-[1.02] [&>*]:text-white"
                    >
                      <Link href="/contact" className="text-white">
                        Book a Consultation
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full sm:w-auto bg-transparent border-2 border-white/25 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-150 [&>*]:text-white"
                    >
                      <Link href="/team" className="text-white">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Meet the Team
                      </Link>
                    </Button>
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
