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
    image: "https://ui-avatars.com/api/?name=John+Anderson&size=400&background=12372A&color=ffffff",
  },
  {
    slug: "maria-gonzalez",
    name: "Maria Gonzalez",
    role: "Senior Financial Advisor",
    bio: "Maria specializes in retirement planning and tax optimization strategies. Her attention to detail and client-first approach has helped hundreds of families achieve their financial goals.",
    credentials: "CFP®, CPA",
    image: "https://ui-avatars.com/api/?name=Maria+Gonzalez&size=400&background=89A17F&color=ffffff",
  },
  {
    slug: "david-parker",
    name: "David Parker",
    role: "Investment Manager",
    bio: "David brings extensive expertise in portfolio management and investment strategy. He holds an MBA in Finance and is passionate about helping clients build wealth through disciplined investing.",
    credentials: "CFA, MBA",
    image: "https://ui-avatars.com/api/?name=David+Parker&size=400&background=2E2F33&color=ffffff",
  },
  {
    slug: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Estate Planning Specialist",
    bio: "Sarah focuses on estate planning and wealth transfer strategies. She helps families protect and transfer their wealth efficiently while minimizing tax implications.",
    credentials: "JD, CFP®",
    image: "https://ui-avatars.com/api/?name=Sarah+Mitchell&size=400&background=D8C792&color=2E2F33",
  },
  {
    slug: "robert-kim",
    name: "Robert Kim",
    role: "Financial Advisor",
    bio: "Robert works with young professionals and growing families, helping them establish solid financial foundations. His approach emphasizes education and long-term planning.",
    credentials: "CFP®",
    image: "https://ui-avatars.com/api/?name=Robert+Kim&size=400&background=12372A&color=ffffff",
  },
  {
    slug: "jennifer-thompson",
    name: "Jennifer Thompson",
    role: "Client Relations Manager",
    bio: "Jennifer ensures every client receives exceptional service and support. With a background in client service and operations, she helps streamline the advisory experience.",
    credentials: "Series 7, Series 66",
    image: "https://ui-avatars.com/api/?name=Jennifer+Thompson&size=400&background=89A17F&color=ffffff",
  },
]

export default function TeamPage() {
  return (
    <div>
      <PageHeader
        title="Meet Our Team"
        subtitle="Dedicated professionals committed to your financial success"
      />

      <section className="py-12 sm:py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <p className="text-base sm:text-lg text-slate max-w-2xl mx-auto px-4">
              Our team combines decades of experience with a genuine passion for
              helping clients achieve their financial goals. Get to know the
              professionals who will be working alongside you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                  <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative h-48 sm:h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-forest mb-1">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-moss mb-2">{member.credentials}</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate mb-3 sm:mb-4">
                      {member.role}
                    </p>
                    <p className="text-slate text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                      {member.bio}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full text-xs sm:text-sm"
                    >
                      <Link href={`/team/${member.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
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

