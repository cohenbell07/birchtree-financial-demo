"use client"

import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Users, Award, Heart } from "lucide-react"
import ParticleBackground from "@/components/ParticleBackground"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const values = [
  {
    icon: Target,
    title: "Client-First Approach",
    description:
      "Every decision we make is guided by what's best for our clients. Your success is our success.",
  },
  {
    icon: Heart,
    title: "Integrity & Trust",
    description:
      "We operate with complete transparency and honesty, building lasting relationships based on trust.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We maintain the highest standards in everything we do, from planning to execution.",
  },
  {
    icon: Users,
    title: "Personalized Service",
    description:
      "No two clients are the same. We create customized solutions tailored to your unique situation.",
  },
]

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About BirchTree Financial"
        subtitle="Building trust, delivering results, securing your future"
      />

      <section className="py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-teal" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              initial="initial"
              whileInView="animate"
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-6 sm:mb-8">
                Our Story
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-midnight/80 mb-6 leading-relaxed">
                Founded with a vision to make premium financial advisory services
                accessible and personalized, BirchTree Financial has been helping
                individuals and families across Canada navigate their financial journey for over
                a decade. Our name reflects our philosophy: just as a birch tree
                stands strong and grows steadily over time, we help our clients
                build a solid financial foundation that supports them throughout
                life&apos;s seasons.
              </p>
              <p className="text-lg sm:text-xl text-midnight/80 mb-6 leading-relaxed">
                What started as a small practice with a big idea has grown into a
                trusted firm serving clients across the country. Our team of
                certified financial planners and investment advisors brings
                decades of combined experience, but more importantly, brings a
                genuine commitment to understanding your unique circumstances and
                goals.
              </p>
              <p className="text-lg sm:text-xl text-midnight/80 leading-relaxed">
                We&apos;ve weathered market cycles, economic changes, and evolving
                regulations—always keeping our focus on what matters most: your
                financial well-being. Today, we continue to combine time-tested
                strategies with innovative approaches, ensuring our clients stay
                ahead of the curve in the Canadian financial landscape.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white to-silver/5 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-4 sm:mb-6">
              Our Mission & Philosophy
            </h2>
            <p className="text-lg sm:text-xl text-midnight/70 max-w-2xl mx-auto">
              We believe that financial planning is a journey, not a destination.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="glass mb-8 shadow-glow-hover border-emerald/20">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl font-heading text-midnight">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg sm:text-xl text-midnight/80 leading-relaxed">
                  To empower Canadians to achieve financial clarity, confidence, and success
                  through personalized, intelligent advisory services. We combine deep expertise
                  in Canadian financial regulations and tax structures with cutting-edge technology
                  to deliver solutions that are both sophisticated and accessible.
                </p>
              </CardContent>
            </Card>

            <Card className="glass shadow-glow-hover border-emerald/20">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl font-heading text-midnight">Our Philosophy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg sm:text-xl text-midnight/80 leading-relaxed mb-4">
                  Our philosophy centers on three core principles: comprehensive
                  planning, personalized service, and unwavering integrity.
                </p>
                <p className="text-lg sm:text-xl text-midnight/80 leading-relaxed">
                  We believe that financial planning is not just about numbers—it&apos;s
                  about understanding your unique goals, values, and circumstances. Every
                  strategy we develop is tailored specifically to you, taking into account
                  your stage of life, risk tolerance, and long-term aspirations. We&apos;re
                  here to guide you through every step of your financial journey, providing
                  clarity and confidence along the way.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-midnight via-teal to-midnight text-white relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald/10 via-transparent to-mint/10 animate-gradient-shift" />
        <ParticleBackground />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="glass-dark h-full shadow-glow-hover border-emerald/20">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center mb-4 shadow-glow">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl sm:text-2xl font-heading text-white">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-silver/80 text-base sm:text-lg">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center max-w-4xl mx-auto px-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-midnight mb-6 sm:mb-8">
              Compliance & Standards
            </h2>
            <p className="text-lg sm:text-xl text-midnight/80 leading-relaxed mb-6">
              As a registered investment advisor in Canada, we adhere to the highest
              standards of professional conduct and regulatory compliance. We are
              committed to transparency, ethical practices, and putting our clients&apos;
              interests first in everything we do.
            </p>
            <p className="text-lg sm:text-xl text-midnight/80 leading-relaxed">
              Our team holds relevant licenses and certifications, including Certified
              Financial Planner (CFP), Chartered Financial Analyst (CFA), and other
              professional designations. We maintain ongoing education requirements and
              stay current with evolving Canadian financial regulations, tax laws, and
              industry best practices.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
