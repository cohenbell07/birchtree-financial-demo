"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    slug: "john-anderson",
    name: "John Anderson",
    role: "Principal & Senior Financial Advisor",
    bio: "With over 20 years of experience in financial planning and wealth management, John founded BirchTree Financial with a vision to provide personalized, fiduciary-focused advisory services.",
    credentials: "CFP®, CFA",
    image: "https://ui-avatars.com/api/?name=John+Anderson&size=400&background=0B1A2C&color=16A085",
  },
  {
    slug: "maria-gonzalez",
    name: "Maria Gonzalez",
    role: "Senior Financial Advisor",
    bio: "Maria specializes in retirement planning and tax optimization strategies. Her attention to detail and client-first approach has helped hundreds of families achieve their financial goals.",
    credentials: "CFP®, CPA",
    image: "https://ui-avatars.com/api/?name=Maria+Gonzalez&size=400&background=0E3B3F&color=7CFFC4",
  },
  {
    slug: "david-parker",
    name: "David Parker",
    role: "Investment Manager",
    bio: "David brings extensive expertise in portfolio management and investment strategy. He holds an MBA in Finance and is passionate about helping clients build wealth through disciplined investing.",
    credentials: "CFA, MBA",
    image: "https://ui-avatars.com/api/?name=David+Parker&size=400&background=16A085&color=ffffff",
  },
  {
    slug: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Estate Planning Specialist",
    bio: "Sarah focuses on estate planning and wealth transfer strategies. She helps families protect and transfer their wealth efficiently while minimizing tax implications.",
    credentials: "JD, CFP®",
    image: "https://ui-avatars.com/api/?name=Sarah+Mitchell&size=400&background=2ECC71&color=0B1A2C",
  },
  {
    slug: "robert-kim",
    name: "Robert Kim",
    role: "Financial Advisor",
    bio: "Robert works with young professionals and growing families, helping them establish solid financial foundations. His approach emphasizes education and long-term planning.",
    credentials: "CFP®",
    image: "https://ui-avatars.com/api/?name=Robert+Kim&size=400&background=0B1A2C&color=16A085",
  },
  {
    slug: "jennifer-thompson",
    name: "Jennifer Thompson",
    role: "Client Relations Manager",
    bio: "Jennifer ensures every client receives exceptional service and support. With a background in client service and operations, she helps streamline the advisory experience.",
    credentials: "CSC, CPH",
    image: "https://ui-avatars.com/api/?name=Jennifer+Thompson&size=400&background=0E3B3F&color=7CFFC4",
  },
]

export default function TeamPage() {
  return (
    <div>
      <PageHeader
        title="Meet Our Team"
        subtitle="Dedicated professionals committed to your financial success"
      />

      <section className="py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-teal" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-lg sm:text-xl text-midnight/70 max-w-2xl mx-auto px-4">
              Our team combines decades of experience with a genuine passion for
              helping clients achieve their financial goals. Get to know the
              professionals who will be working alongside you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Card className="h-full glass shadow-glow-hover border-emerald/20 overflow-hidden group transition-all duration-300">
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-midnight mb-2">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald mb-2 font-medium">{member.credentials}</p>
                    <p className="text-sm sm:text-base font-semibold text-midnight/70 mb-3 sm:mb-4">
                      {member.role}
                    </p>
                    <p className="text-sm sm:text-base text-midnight/60 mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
                      {member.bio}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full text-sm border-emerald/50 text-emerald hover:bg-emerald/10 hover:border-emerald transition-all"
                    >
                      <Link href={`/team/${member.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
