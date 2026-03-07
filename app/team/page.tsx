"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    slug: "melissa-birch",
    name: "Melissa Birch",
    role: "Owner • Financial Advisor",
    bio: "As the owner and financial advisor of Birchtree Financial, Melissa brings visionary leadership and deep expertise in financial advisory services and business strategy. With a commitment to excellence and client-centered service, she oversees the firm's strategic direction while ensuring every client receives personalized attention and expert guidance.",
    credentials: "LLQP",
    image: "/melissaupdate.png",
    hasOfficialPhoto: true,
    experience: "15+ years",
  },
  {
    slug: "kevin-birch",
    name: "Kevin Birch",
    role: "Co-owner & Office Administrator",
    bio: "Kevin serves as Co-owner and Office Administrator, managing daily operations and ensuring smooth client experiences. His expertise in administrative systems and client relations helps maintain the high standards of service that define Birchtree Financial.",
    credentials: "Office Administration",
    image: "/Kevinupdate.png",
    hasOfficialPhoto: true,
    experience: "12+ years",
  },
  {
    slug: "kaleb-birch",
    name: "Kaleb Birch",
    role: "IT Specialist",
    bio: "Kaleb is our IT Specialist, responsible for maintaining our technology infrastructure and ensuring secure, efficient operations. His technical expertise supports our team's ability to serve clients effectively while protecting sensitive financial information.",
    credentials: "Information Technology",
    image: "/kalebbirchtreenew.png",
    hasOfficialPhoto: true,
    experience: "5+ years",
  },
  {
    slug: "crystal",
    name: "Crystal Smith",
    role: "Bookkeeper • Office Administrator",
    bio: "Crystal Smith is the welcoming face of Birchtree Financial, serving as our Bookkeeper. She ensures clients feel valued from the moment they contact us, handling inquiries with professionalism and warmth.",
    credentials: "Client Services",
    image: "https://ui-avatars.com/api/?name=Crystal+Smith&size=600&background=2ECC71&color=0B1A2C",
    experience: "5+ years",
  },
  {
    slug: "art-birch",
    name: "Art Birch",
    role: "Founder • Mentor • Financial Advisor",
    bio: "Art Birch is the Founder, Mentor, and Financial Advisor of Birchtree Financial, bringing decades of experience and a deep commitment to helping clients achieve their financial goals. As the founder, Art established the firm with a vision of providing personalized, transparent financial guidance.",
    credentials: "LLQP",
    image: "/artbirchnew.png",
    hasOfficialPhoto: true,
    experience: "30+ years",
  },
]

export default function TeamPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Our People"
        title="Meet Our Team"
        subtitle="Dedicated professionals committed to your financial success"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-b from-midnight via-emerald/95 to-midnight text-white relative overflow-hidden">
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(215,195,138,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(215,195,138,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section intro */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-gold/80 font-semibold mb-3 sm:mb-4">
              The Birchtree Team
            </p>
            <p className="text-base sm:text-lg md:text-xl text-silver/90 leading-relaxed px-4">
              Our team combines experience with a genuine passion for
              helping clients achieve their financial goals. Get to know the
              professionals who will be working alongside you.
            </p>
            <div className="flex justify-center mt-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </div>
          </div>

          {/* Team member cards */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
              >
                <div className="relative rounded-2xl overflow-hidden group glass-dark border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
                  {/* Gold top accent */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                  {/* Hover spotlight */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.03] via-transparent to-gold/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
                    {/* Photo column */}
                    <div className="relative md:border-r border-white/[0.07] flex items-center justify-center p-6 sm:p-8">
                      {member.hasOfficialPhoto ? (
                        <div className="relative">
                          {/* Subtle gold glow behind photo */}
                          <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: "radial-gradient(ellipse, rgba(215,195,138,0.08) 0%, transparent 70%)" }} />
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={260}
                            height={360}
                            className="relative object-contain rounded-xl w-full max-w-[220px] sm:max-w-[260px]"
                            sizes="260px"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-2 ring-gold/20">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={200}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </div>

                    {/* Content column */}
                    <div className="md:col-span-2 flex flex-col justify-center p-6 sm:p-8 md:p-10 space-y-4 sm:space-y-5">
                      {/* Index + credential */}
                      <div className="flex items-center justify-between">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide border"
                          style={{
                            background: "rgba(215,195,138,0.08)",
                            borderColor: "rgba(215,195,138,0.25)",
                            color: "#D7C38A",
                          }}
                        >
                          {member.credentials}
                        </span>
                        <span className="text-xs font-semibold tracking-widest text-white/20 font-heading">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Name + role */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-1.5 leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-sm sm:text-base text-silver/60 font-semibold tracking-wide uppercase text-[0.7rem] sm:text-xs">
                          {member.role}
                        </p>
                      </div>

                      {/* Bio */}
                      <p className="text-sm sm:text-base md:text-lg text-silver/75 leading-relaxed font-body max-w-2xl">
                        {member.bio}
                      </p>

                      {/* Footer: experience + CTA */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl sm:text-2xl font-heading font-bold text-white">
                            {member.experience}
                          </span>
                          <span className="text-xs text-silver/50">experience</span>
                        </div>
                        <div className="sm:ml-auto">
                          <Button
                            asChild
                            size="sm"
                            className="w-full sm:w-auto bg-gradient-to-r from-emerald to-emerald-light hover:from-midnight hover:to-midnight-light text-white border-0 transition-all duration-200 hover:scale-[1.02] [&>*]:text-white text-sm group/btn"
                          >
                            <Link href={`/team/${member.slug}`} className="text-white">
                              View Profile
                              <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gold bottom accent on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
