"use client"

import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"

const teamMembers = [
  {
    slug: "melissa-birch",
    name: "Melissa Birch",
    role: "Owner • Financial Advisor",
    bio: "As the owner and financial advisor of Birchtree Financial, Melissa brings visionary leadership and deep expertise in financial advisory services and business strategy.",
    fullBio: "As the owner and financial advisor of Birchtree Financial, Melissa brings visionary leadership and deep expertise in financial advisory services and business strategy. With a commitment to excellence and client-centered service, she oversees the firm's strategic direction while ensuring every client receives personalized attention and expert guidance. Her extensive experience in the financial services industry has shaped Birchtree Financial into a trusted advisory firm known for its integrity, innovation, and client-first approach. Melissa is licensed to provide life insurance and accident & sickness insurance products, having completed the Life License Qualification Program (LLQP).",
    credentials: "LLQP",
    education: "LLQP (Life License Qualification Program)",
    specialties: ["Strategic Financial Advisory", "Business Leadership", "Client Relationship Management", "Life Insurance", "Accident & Sickness Insurance"],
    experience: "15+ years",
    image: "/melissaupdate.png",
    hasOfficialPhoto: true,
    email: "melissa.birch@birchtreefinancial.ca",
    phone: "(403) 556-7777",
  },
  {
    slug: "kevin-birch",
    name: "Kevin Birch",
    role: "Co-owner & Office Administrator",
    bio: "Kevin serves as Co-owner and Office Administrator, managing daily operations and ensuring smooth client experiences.",
    fullBio: "Kevin serves as Co-owner and Office Administrator, managing daily operations and ensuring smooth client experiences. His expertise in administrative systems and client relations helps maintain the high standards of service that define Birchtree Financial. Kevin works closely with the team to streamline processes and support our advisory services. With a focus on operational excellence and client satisfaction, he ensures that every interaction with Birchtree Financial is seamless and professional.",
    credentials: "Office Administration, Client Relations",
    education: "Business Administration, Client Relations Management",
    specialties: ["Office Management", "Client Relations", "Operational Excellence"],
    experience: "12+ years",
    image: "/Kevinupdate.png",
    hasOfficialPhoto: true,
    email: "",
    phone: "(403) 556-7777",
  },
  {
    slug: "kaleb-birch",
    name: "Kaleb Birch",
    role: "IT Specialist",
    bio: "Kaleb is our IT Specialist, responsible for maintaining our technology infrastructure and ensuring secure, efficient operations.",
    fullBio: "Kaleb is our IT Specialist, responsible for maintaining our technology infrastructure and ensuring secure, efficient operations. His technical expertise supports our team's ability to serve clients effectively while protecting sensitive financial information. Kaleb ensures our systems are modern, secure, and user-friendly. With a deep understanding of financial technology and cybersecurity, he keeps Birchtree Financial at the forefront of digital innovation while maintaining the highest standards of data protection and system reliability.",
    credentials: "Information Technology, Systems Administration",
    education: "Computer Science, Information Systems Security",
    specialties: ["Technology Infrastructure", "Cybersecurity", "System Administration"],
    experience: "5+ years",
    image: "/kalebbirchtreenew.png",
    hasOfficialPhoto: true,
    email: "",
    phone: "(403) 556-7777",
  },
  {
    slug: "crystal",
    name: "Crystal Smith",
    role: "Bookkeeper • Office Administrator",
    bio: "Crystal Smith is the welcoming face of Birchtree Financial, serving as our Bookkeeper.",
    fullBio: "Crystal Smith is the welcoming face of Birchtree Financial, serving as our Bookkeeper. She ensures clients feel valued from the moment they contact us, handling inquiries with professionalism and warmth. Crystal's attention to detail and excellent communication skills help create a positive first impression and seamless client experience. Her dedication to exceptional service and genuine care for clients sets the tone for every interaction at Birchtree Financial.",
    credentials: "Client Services, Administrative Support",
    education: "Administrative Studies, Customer Service Excellence",
    specialties: ["Client Communication", "Administrative Support", "Customer Service"],
    experience: "5+ years",
    image: "https://ui-avatars.com/api/?name=Crystal+Smith&size=600&background=2ECC71&color=0B1A2C",
    email: "",
    phone: "(403) 556-7777",
  },
  {
    slug: "art-birch",
    name: "Art Birch",
    role: "Founder • Mentor • Financial Advisor",
    bio: "Art Birch is the Founder, Mentor, and Financial Advisor of Birchtree Financial, bringing decades of experience and a deep commitment to helping clients achieve their financial goals.",
    fullBio: "Art Birch is the Founder, Mentor, and Financial Advisor of Birchtree Financial, bringing decades of experience and a deep commitment to helping clients achieve their financial goals. As the founder, Art established the firm with a vision of providing personalized, transparent, and expert financial advisory services to Canadians across the country. His extensive background in life insurance, investment management, and client relationships has shaped Birchtree Financial into the trusted advisory firm it is today. Art continues to work directly with clients, providing strategic financial guidance and helping families and individuals navigate their financial journeys with confidence and clarity. Art is licensed to provide life insurance and accident & sickness insurance products, having completed the Life License Qualification Program (LLQP).",
    credentials: "LLQP",
    education: "LLQP (Life License Qualification Program)",
    specialties: ["Life Insurance", "Investment Advisory", "Retirement Planning", "Estate Planning"],
    experience: "30+ years",
    image: "/artbirchnew.png",
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
      <PageHeader title={member.name} subtitle={member.role} />

      <section className="py-12 sm:py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1"
              >
                <Card className="sticky top-24">
                  <div className={`relative ${member.hasOfficialPhoto ? 'flex items-center justify-center min-h-[500px]' : 'h-48 sm:h-64'} w-full`}>
                    {member.hasOfficialPhoto ? (
                      <Image
                        src={member.image}
                        alt={
                          member.name === "Art Birch" 
                            ? "Art Birch – Financial Advisor" 
                            : member.name === "Kaleb Birch"
                            ? "Kaleb Birch – IT Specialist"
                            : member.name === "Melissa Birch"
                            ? "Melissa Birch – Owner & Financial Advisor"
                            : "Kevin Birch – Co-owner & Office Administrator"
                        }
                        width={365}
                        height={500}
                        className="object-contain"
                      />
                    ) : (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate mb-2">
                          {member.name}
                        </h3>
                        <p className="text-sm sm:text-base text-emerald font-medium mb-1">
                          {member.credentials}
                        </p>
                        <p className="text-base sm:text-lg font-semibold text-slate/70">
                          {member.role}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate/10 space-y-3">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center text-sm sm:text-base text-slate hover:text-midnight transition-colors duration-150 ease-out"
                          >
                            <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-3" />
                            {member.email}
                          </a>
                        )}
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center text-sm sm:text-base text-slate hover:text-midnight transition-colors duration-150 ease-out"
                        >
                          <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-3" />
                          {member.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2"
              >
                <div className="space-y-6 sm:space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-heading">About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base sm:text-lg text-slate leading-relaxed mb-3 sm:mb-4">
                        {member.fullBio}
                      </p>
                      <p className="text-sm sm:text-base text-slate leading-relaxed">{member.bio}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-heading">Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base text-slate">{member.education}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-heading">Specialties</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {member.specialties.map((specialty) => (
                          <li key={specialty} className="flex items-center text-sm sm:text-base text-slate">
                            <span className="text-emerald mr-2">•</span>
                            {specialty}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-heading">Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base text-slate">{member.experience}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 sm:mt-12 text-center">
              <Button asChild className="!bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(11,26,44,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0">
                <Link href="/team" className="!text-white">Back to Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
