"use client"

import Link from "next/link"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
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
    image: "https://ui-avatars.com/api/?name=Melissa+Birch&size=600&background=16A085&color=ffffff",
  },
  {
    slug: "kevin-birch",
    name: "Kevin Birch",
    role: "Co-owner & Office Administrator",
    bio: "Kevin serves as Co-owner and Office Administrator, managing daily operations and ensuring smooth client experiences. His expertise in administrative systems and client relations helps maintain the high standards of service that define Birchtree Financial. Kevin works closely with the team to streamline processes and support our advisory services.",
    credentials: "Office Administration, Client Relations",
    image: "https://ui-avatars.com/api/?name=Kevin+Birch&size=600&background=0B1A2C&color=16A085",
  },
  {
    slug: "kaleb-birch",
    name: "Kaleb Birch",
    role: "IT Specialist",
    bio: "Kaleb is our IT Specialist, responsible for maintaining our technology infrastructure and ensuring secure, efficient operations. His technical expertise supports our team's ability to serve clients effectively while protecting sensitive financial information. Kaleb ensures our systems are modern, secure, and user-friendly.",
    credentials: "Information Technology, Systems Administration",
    image: "/kalebbirchtreenew.png",
    hasOfficialPhoto: true,
  },
  {
    slug: "crystal",
    name: "Crystal Smith",
    role: "Bookkeeper",
    bio: "Crystal Smith is the welcoming face of Birchtree Financial, serving as our Bookkeeper. She ensures clients feel valued from the moment they contact us, handling inquiries with professionalism and warmth. Crystal's attention to detail and excellent communication skills help create a positive first impression and seamless client experience.",
    credentials: "Client Services, Administrative Support",
    image: "https://ui-avatars.com/api/?name=Crystal+Smith&size=600&background=2ECC71&color=0B1A2C",
  },
  {
    slug: "art-birch",
    name: "Art Birch",
    role: "Founder • Mentor • Financial Advisor",
    bio: "Art Birch is the Founder, Mentor, and Financial Advisor of Birchtree Financial, bringing decades of experience and a deep commitment to helping clients achieve their financial goals. As the founder, Art established the firm with a vision of providing personalized, transparent, and expert financial advisory services to Canadians across the country.",
    credentials: "LLQP",
    image: "/artbirchnew.png",
    hasOfficialPhoto: true,
  },
]

export default function TeamPage() {
  return (
    <div>
      <PageHeader
        title="Meet Our Team"
        subtitle="Dedicated professionals committed to your financial success"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-b from-midnight via-emerald/95 to-midnight text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-emerald" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-lg sm:text-xl text-silver/90 max-w-2xl mx-auto px-4">
              Our team combines experience with a genuine passion for
              helping clients achieve their financial goals. Get to know the
              professionals who will be working alongside you.
            </p>
          </div>

          {/* One person per row with spotlight effect */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={member.slug}
                className="glass-dark shadow-glow border-emerald/30 overflow-hidden group relative"
              >
                {/* Spotlight effect background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald/10 via-transparent to-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald to-transparent opacity-50" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 p-6 sm:p-8 md:p-10 relative">
                  {/* Profile Image */}
                  <div className={`relative ${member.hasOfficialPhoto ? 'flex items-center justify-center' : 'h-64 sm:h-80 md:h-full min-h-[300px]'} w-full md:w-auto rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300`}>
                    {member.hasOfficialPhoto ? (
                      <Image
                        src={member.image}
                        alt={member.name === "Art Birch" ? "Art Birch – Financial Advisor" : "Kaleb Birch – IT Specialist"}
                        width={365}
                        height={500}
                        className="object-contain rounded-2xl"
                        sizes="(max-width: 768px) 365px, 365px"
                      />
                    ) : (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 flex flex-col justify-center space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-2 sm:mb-3 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-sm sm:text-base text-white font-semibold mb-2">
                        {member.credentials}
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl font-semibold text-silver/90 mb-4 sm:mb-6">
                        {member.role}
                      </p>
                    </div>
                    
                    {member.slug !== "crystal" && (
                      <>
                        <p className="text-base sm:text-lg text-silver/80 leading-relaxed font-body">
                          {member.bio}
                        </p>
                        
                        <div className="pt-2">
                          <Button
                            asChild
                            size="lg"
                            className="relative z-10 w-full sm:w-auto bg-gradient-to-r from-emerald to-emerald-light hover:from-midnight hover:to-midnight-light hover:shadow-[0_0_20px_rgba(27,42,61,0.5)] !text-white [&>*]:!text-white text-sm sm:text-base border-0 transition-all duration-200 ease-out"
                          >
                            <Link href={`/team/${member.slug}`} className="!text-white">
                              Learn More
                              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                            </Link>
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
