"use client"

import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Phone, Linkedin } from "lucide-react"

const teamMembers = [
  {
    slug: "john-anderson",
    name: "John Anderson",
    role: "Principal & Senior Financial Advisor",
    bio: "With over 20 years of experience in financial planning and wealth management, John founded BirchTree Financial with a vision to provide personalized, fiduciary-focused advisory services.",
    fullBio: "John Anderson brings more than two decades of expertise in financial planning and wealth management to BirchTree Financial. As the firm's founder and principal advisor, John is passionate about helping clients achieve their financial goals through comprehensive, personalized planning.",
    credentials: "CFP®, CFA",
    education: "MBA in Finance, University of Pennsylvania",
    specialties: ["Retirement Planning", "Wealth Management", "Portfolio Strategy"],
    experience: "20+ years",
    image: "https://ui-avatars.com/api/?name=John+Anderson&size=400&background=12372A&color=ffffff",
    email: "john.anderson@birchtreefinancial.com",
    phone: "(555) 123-4567",
    linkedin: "#",
  },
  {
    slug: "maria-gonzalez",
    name: "Maria Gonzalez",
    role: "Senior Financial Advisor",
    bio: "Maria specializes in retirement planning and tax optimization strategies. Her attention to detail and client-first approach has helped hundreds of families achieve their financial goals.",
    fullBio: "Maria Gonzalez is a Certified Financial Planner and Certified Public Accountant with a passion for helping clients navigate the complexities of retirement planning and tax optimization. With 15 years of experience, she combines technical expertise with a warm, personalized approach.",
    credentials: "CFP®, CPA",
    education: "Master of Taxation, University of Texas",
    specialties: ["Retirement Planning", "Tax Strategy", "Estate Planning"],
    experience: "15+ years",
    image: "https://ui-avatars.com/api/?name=Maria+Gonzalez&size=400&background=89A17F&color=ffffff",
    email: "maria.gonzalez@birchtreefinancial.com",
    phone: "(555) 123-4568",
    linkedin: "#",
  },
  {
    slug: "david-parker",
    name: "David Parker",
    role: "Investment Manager",
    bio: "David brings extensive expertise in portfolio management and investment strategy. He holds an MBA in Finance and is passionate about helping clients build wealth through disciplined investing.",
    fullBio: "David Parker is a Chartered Financial Analyst with a deep understanding of global markets and investment strategies. His disciplined, research-driven approach to portfolio management has helped clients achieve strong risk-adjusted returns over the long term.",
    credentials: "CFA, MBA",
    education: "MBA in Finance, Wharton School",
    specialties: ["Portfolio Management", "Asset Allocation", "Risk Management"],
    experience: "12+ years",
    image: "https://ui-avatars.com/api/?name=David+Parker&size=400&background=2E2F33&color=ffffff",
    email: "david.parker@birchtreefinancial.com",
    phone: "(555) 123-4569",
    linkedin: "#",
  },
  {
    slug: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Estate Planning Specialist",
    bio: "Sarah focuses on estate planning and wealth transfer strategies. She helps families protect and transfer their wealth efficiently while minimizing tax implications.",
    fullBio: "Sarah Mitchell combines her legal background with financial planning expertise to help families create comprehensive estate plans. As both a licensed attorney and Certified Financial Planner, she provides integrated solutions for wealth transfer and legacy planning.",
    credentials: "JD, CFP®",
    education: "JD, Harvard Law School",
    specialties: ["Estate Planning", "Trust Planning", "Wealth Transfer"],
    experience: "10+ years",
    image: "https://ui-avatars.com/api/?name=Sarah+Mitchell&size=400&background=D8C792&color=2E2F33",
    email: "sarah.mitchell@birchtreefinancial.com",
    phone: "(555) 123-4570",
    linkedin: "#",
  },
  {
    slug: "robert-kim",
    name: "Robert Kim",
    role: "Financial Advisor",
    bio: "Robert works with young professionals and growing families, helping them establish solid financial foundations. His approach emphasizes education and long-term planning.",
    fullBio: "Robert Kim specializes in working with young professionals and growing families who are just beginning their wealth-building journey. His educational approach helps clients understand their options and make informed decisions about their financial future.",
    credentials: "CFP®",
    education: "BS in Economics, Stanford University",
    specialties: ["Young Professionals", "Family Financial Planning", "Education Planning"],
    experience: "8+ years",
    image: "https://ui-avatars.com/api/?name=Robert+Kim&size=400&background=12372A&color=ffffff",
    email: "robert.kim@birchtreefinancial.com",
    phone: "(555) 123-4571",
    linkedin: "#",
  },
  {
    slug: "jennifer-thompson",
    name: "Jennifer Thompson",
    role: "Client Relations Manager",
    bio: "Jennifer ensures every client receives exceptional service and support. With a background in client service and operations, she helps streamline the advisory experience.",
    fullBio: "Jennifer Thompson manages client relations and ensures seamless communication between clients and advisors. Her background in operations and client service helps create an exceptional experience for every BirchTree Financial client.",
    credentials: "Series 7, Series 66",
    education: "BS in Business Administration, UCLA",
    specialties: ["Client Relations", "Operations", "Service Excellence"],
    experience: "6+ years",
    image: "https://ui-avatars.com/api/?name=Jennifer+Thompson&size=400&background=89A17F&color=ffffff",
    email: "jennifer.thompson@birchtreefinancial.com",
    phone: "(555) 123-4572",
    linkedin: "#",
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
                  <div className="relative h-48 sm:h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-forest mb-1">
                          Credentials
                        </h3>
                        <p className="text-xs sm:text-sm text-slate">{member.credentials}</p>
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-forest mb-1">
                          Experience
                        </h3>
                        <p className="text-xs sm:text-sm text-slate">{member.experience}</p>
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-forest mb-2">
                          Contact
                        </h3>
                        <div className="space-y-2 text-xs sm:text-sm">
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center space-x-2 text-slate hover:text-forest transition-colors"
                          >
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </a>
                          <a
                            href={`tel:${member.phone}`}
                            className="flex items-center space-x-2 text-slate hover:text-forest transition-colors"
                          >
                            <Phone className="h-4 w-4" />
                            <span>Phone</span>
                          </a>
                          <a
                            href={member.linkedin}
                            className="flex items-center space-x-2 text-slate hover:text-forest transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                            <span>LinkedIn</span>
                          </a>
                        </div>
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
                      <CardTitle className="text-xl sm:text-2xl font-heading">
                        Areas of Expertise
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {member.specialties.map((specialty) => (
                          <li
                            key={specialty}
                            className="flex items-center space-x-2 text-slate"
                          >
                            <span className="text-forest">•</span>
                            <span>{specialty}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 text-center">
              <Button asChild size="lg">
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

