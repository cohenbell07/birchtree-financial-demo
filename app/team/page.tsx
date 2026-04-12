"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import RevealText from "@/components/RevealText"
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
    experience: "15+ years",
  },
  {
    slug: "kevin-birch",
    name: "Kevin Birch",
    role: "Co-owner & Office Administrator",
    bio: "Kevin serves as Co-owner and Office Administrator, managing daily operations and ensuring smooth client experiences. His expertise in administrative systems and client relations helps maintain the high standards of service that define Birchtree Financial.",
    credentials: "Office Administration",
    image: "/Kevinupdate.png",
    experience: "12+ years",
  },
  {
    slug: "kaleb-birch",
    name: "Kaleb Birch",
    role: "IT Specialist",
    bio: "Kaleb is our IT Specialist, responsible for maintaining our technology infrastructure and ensuring secure, efficient operations. His technical expertise supports our team's ability to serve clients effectively while protecting sensitive financial information.",
    credentials: "Information Technology",
    image: "/kalebbirchtreenew.png",
    experience: "5+ years",
  },
  {
    slug: "crystal",
    name: "Crystal Smith",
    role: "Bookkeeper • Office Administrator",
    bio: "Crystal Smith is the welcoming face of Birchtree Financial, serving as our Bookkeeper. She ensures clients feel valued from the moment they contact us, handling inquiries with professionalism and warmth.",
    credentials: "Client Services",
    image: "/crystalteamimg.png",
    experience: "5+ years",
  },
  {
    slug: "art-birch",
    name: "Art Birch",
    role: "Founder • Mentor • Financial Advisor",
    bio: "Art Birch is the Founder, Mentor, and Financial Advisor of Birchtree Financial, bringing decades of experience and a deep commitment to helping clients achieve their financial goals. As the founder, Art established the firm with a vision of providing personalized, transparent financial guidance.",
    credentials: "LLQP",
    image: "/artbirchnew.png",
    experience: "30+ years",
  },
]

export default function TeamPage() {
  return (
    <div>
      {/* ============================================
          HERO — Overlapping Portraits
          ============================================ */}
      <section
        className="relative text-white pt-28 sm:pt-36 md:pt-40 lg:pt-48 pb-16 sm:pb-24 md:pb-28 lg:pb-36 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #060f1c 0%, #0B1A2C 40%, #0d1d30 70%, #081525 100%)",
        }}
      >
        <div
          className="absolute top-[30%] left-[15%] w-[50%] h-[60%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(21,36,57,0.25) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/70 font-semibold mb-5 sm:mb-7"
            >
              <span className="inline-block w-2 h-px bg-gold/50 mr-3 align-middle" />
              Our People
              <span className="inline-block w-2 h-px bg-gold/50 ml-3 align-middle" />
            </motion.p>
            <RevealText
              as="h1"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-0"
            >
              Meet Our Team
            </RevealText>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-6 sm:mt-8 mb-5 sm:mb-7"
              style={{ width: "fit-content" }}
            >
              <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-white/45 leading-relaxed font-body mb-10 sm:mb-14 px-4"
            >
              Dedicated professionals committed to your financial success
            </motion.p>

            {/* Overlapping portrait circles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center"
            >
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                  className={`relative ${i > 0 ? "-ml-4 sm:-ml-5" : ""} ${i > 2 ? "hidden sm:block" : ""}`}
                  style={{ zIndex: teamMembers.length - i }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-[3px] ring-[#0B1A2C] shadow-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          Team Members
          ============================================ */}
      <section
        className="py-20 sm:py-28 md:py-36 lg:py-44 relative overflow-hidden grain-overlay"
        style={{
          background: "linear-gradient(160deg, #f8f7f4 0%, #f5f4f0 40%, #f2f1ed 100%)",
        }}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Intro */}
          <div className="text-center mb-14 sm:mb-18 md:mb-24 max-w-2xl mx-auto">
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3 sm:mb-4">
              The Birchtree Team
            </p>
            <RevealText
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-5 sm:mb-6 tracking-tight text-midnight"
            >
              The People Behind Your Plan
            </RevealText>
            <p className="text-base sm:text-lg md:text-xl text-midnight/50 leading-relaxed px-4">
              Our team combines experience with a genuine passion for
              helping clients achieve their financial goals. Get to know the
              professionals who will be working alongside you.
            </p>
            <div className="flex justify-center mt-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </div>
          </div>

          {/* Team member cards */}
          <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_4px_24px_rgba(11,26,44,0.12),0_0_0_1px_rgba(215,195,138,0.2)] group/card"
                  style={{
                    background: "linear-gradient(145deg, #0d1f33 0%, #0B1A2C 50%, #091525 100%)",
                    border: "1px solid rgba(215,195,138,0.08)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.1), 0 4px 24px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Gold top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/25 to-transparent z-20 transition-all duration-300 group-hover/card:via-gold/50" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
                    {/* Photo */}
                    <div className="relative md:border-r border-white/[0.06] flex items-center justify-center p-7 sm:p-9">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={260}
                        height={360}
                        className="relative object-contain rounded-xl w-full max-w-[220px] sm:max-w-[260px]"
                        sizes="260px"
                      />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 flex flex-col justify-center p-7 sm:p-9 md:p-11 space-y-5 sm:space-y-6">
                      <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-2 leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/50 font-medium">
                          {member.role}
                        </p>
                      </div>

                      {/* Experience + credentials */}
                      <div className="flex items-center gap-5">
                        <div className="border-l-2 border-gold/30 pl-4">
                          <span className="text-2xl sm:text-3xl font-heading font-bold text-gold/80 block leading-none">
                            {member.experience.replace(' years', '')}
                          </span>
                          <span className="text-[0.6rem] sm:text-xs uppercase tracking-[0.15em] text-white/30 font-medium">
                            Years
                          </span>
                        </div>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide bg-white/[0.04] border border-gold/20 text-gold/80">
                          {member.credentials}
                        </span>
                      </div>

                      <p className="text-sm sm:text-base md:text-lg text-white/35 leading-relaxed font-body max-w-2xl">
                        {member.bio}
                      </p>

                      <div className="pt-1">
                        <Button
                          asChild
                          size="sm"
                          className="w-full sm:w-auto bg-gold/80 hover:bg-gold text-midnight rounded-lg transition-all duration-200 hover:scale-[1.02] text-sm font-semibold group/btn"
                        >
                          <Link href={`/team/${member.slug}`}>
                            View Profile
                            <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA
          ============================================ */}
      <section
        className="py-20 sm:py-28 md:py-36 lg:py-44 text-white relative overflow-hidden grain-overlay"
        style={{
          background:
            "linear-gradient(160deg, #050c16 0%, #0B1A2C 30%, #0e1f34 60%, #0a1525 100%)",
        }}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/60 font-medium mb-4 sm:mb-6">
              Get Started
            </p>
            <RevealText
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6 tracking-tight text-white"
            >
              Ready to Work With Our Team?
            </RevealText>
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            </div>
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 sm:mb-12 leading-relaxed px-4">
              Book a complimentary consultation and let our team help you
              build a stronger financial future.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-6 bg-gold/80 hover:bg-gold text-midnight font-semibold shadow-lg hover:shadow-xl transition-all duration-150 ease-out hover:scale-[1.02] rounded-lg"
              >
                <Link href="/contact">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-6 bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/70 transition-all duration-200 rounded-lg [&>*]:text-white"
              >
                <Link href="/services" className="text-white">
                  Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
