"use client"

import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Users, Award, Heart } from "lucide-react"

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

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              initial="initial"
              whileInView="animate"
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-forest mb-4 sm:mb-6">
                Our Story
              </h2>
              <p className="text-base sm:text-lg text-slate mb-4 sm:mb-6 leading-relaxed">
                Founded with a vision to make premium financial advisory services
                accessible and personalized, BirchTree Financial has been helping
                individuals and families navigate their financial journey for over
                a decade. Our name reflects our philosophy: just as a birch tree
                stands strong and grows steadily over time, we help our clients
                build a solid financial foundation that supports them throughout
                life&apos;s seasons.
              </p>
              <p className="text-lg text-slate mb-6 leading-relaxed">
                What started as a small practice with a big idea has grown into a
                trusted firm serving clients across the country. Our team of
                certified financial planners and investment advisors brings
                decades of combined experience, but more importantly, brings a
                genuine commitment to understanding your unique circumstances and
                goals.
              </p>
              <p className="text-base sm:text-lg text-slate leading-relaxed">
                We&apos;ve weathered market cycles, economic changes, and evolving
                regulations—always keeping our focus on what matters most: your
                financial well-being. Today, we continue to combine time-tested
                strategies with innovative approaches, ensuring our clients stay
                ahead of the curve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-forest mb-3 sm:mb-4">
              Our Mission & Philosophy
            </h2>
            <p className="text-base sm:text-lg text-slate max-w-2xl mx-auto">
              We believe that financial planning is a journey, not a destination.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="glass mb-8">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-heading">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base sm:text-lg text-slate leading-relaxed">
                  To empower individuals and families to achieve their financial
                  goals through personalized, comprehensive planning and trusted
                  advisory services. We are committed to acting as fiduciaries,
                  always placing our clients&apos; interests first and providing
                  transparent, actionable guidance that builds lasting wealth and
                  financial security.
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-heading">Our Philosophy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base sm:text-lg text-slate leading-relaxed mb-3 sm:mb-4">
                  At BirchTree Financial, we approach financial planning as a
                  collaborative partnership. We don&apos;t just manage investments—we
                  help you understand your options, make informed decisions, and
                  build confidence in your financial future.
                </p>
                <p className="text-base sm:text-lg text-slate leading-relaxed">
                  Our philosophy centers on three core principles: comprehensive
                  planning that considers all aspects of your financial life,
                  education that empowers you to make smart choices, and
                  relationships built on trust, respect, and open communication.
                  We&apos;re not just advisors—we&apos;re your dedicated partners in
                  building the future you envision.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            initial="initial"
            whileInView="animate"
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-forest mb-3 sm:mb-4">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-moss/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-forest" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-heading">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate">
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

      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              initial="initial"
              whileInView="animate"
            className="text-center px-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-forest mb-3 sm:mb-4 md:mb-6">
              Compliance & Standards
            </h2>
            <p className="text-base sm:text-lg text-slate leading-relaxed mb-3 sm:mb-4 md:mb-6">
                As a registered investment advisor, BirchTree Financial operates
                under a fiduciary standard, meaning we are legally and ethically
                obligated to act in your best interest at all times. We maintain
                strict compliance with all regulatory requirements and industry
                standards, ensuring transparency, accountability, and the highest
                level of professional conduct.
              </p>
            <p className="text-base sm:text-lg text-slate leading-relaxed">
              Our team holds relevant licenses and certifications, including
                Certified Financial Planner (CFP®), Chartered Financial Analyst
                (CFA), and other professional designations. We regularly
                participate in continuing education to stay current with industry
                developments, regulatory changes, and best practices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

