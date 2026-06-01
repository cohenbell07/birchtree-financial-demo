import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealStagger } from "@/components/ui/reveal";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Team | Birchtree Financial",
  description:
    "Meet the advisors and specialists behind Birchtree Financial — seasoned professionals dedicated to your financial wellbeing.",
};

const team = [
  {
    slug: "melissa-birch",
    name: "Melissa Birch",
    role: "Owner • Financial Advisor",
    image: "/melissaupdate.webp",
    bio: "As the owner and financial advisor of Birchtree Financial, Melissa brings visionary leadership and deep expertise in financial advisory services and business strategy. With a commitment to excellence and client-centered service, she oversees the firm's strategic direction while ensuring every client receives personalized attention and expert guidance.",
    specialties: ["Strategic Financial Advisory", "Business Leadership", "Life Insurance"],
  },
  {
    slug: "kevin-birch",
    name: "Kevin Birch",
    role: "Co-owner & Office Administrator",
    image: "/Kevinupdate.webp",
    bio: "Kevin serves as Co-owner and Office Administrator, managing daily operations and ensuring smooth client experiences. His expertise in administrative systems and client relations helps maintain the high standards of service that define Birchtree Financial.",
    specialties: ["Office Management", "Client Relations", "Operational Excellence"],
  },
  {
    slug: "kaleb-birch",
    name: "Kaleb Birch",
    role: "IT Specialist",
    image: "/kalebbirchtreenew.webp",
    bio: "Kaleb is our IT Specialist, responsible for maintaining our technology infrastructure and ensuring secure, efficient operations. His technical expertise supports our team's ability to serve clients effectively while protecting sensitive financial information.",
    specialties: ["Technology Infrastructure", "Cybersecurity", "System Administration"],
  },
  {
    slug: "crystal",
    name: "Crystal Smith",
    role: "Bookkeeper • Office Administrator",
    image: "/crystalteamimg.webp",
    bio: "Crystal Smith is the welcoming face of Birchtree Financial, serving as our Bookkeeper. She ensures clients feel valued from the moment they contact us, handling inquiries with professionalism and warmth.",
    specialties: ["Client Communication", "Administrative Support", "Customer Service"],
  },
  {
    slug: "art-birch",
    name: "Art Birch",
    role: "Founder & Mentor",
    image: "/artbirchnew.webp",
    bio: "Art Birch is the Founder and Mentor of Birchtree Financial, bringing decades of experience and a deep commitment to helping clients achieve their financial goals. As the founder, Art established the firm with a vision of providing personalized, transparent financial guidance.",
    specialties: ["Financial Planning", "Mentorship", "Legacy Building"],
  },
];

const values = [
  {
    title: "Fiduciary First",
    description: "We are legally and ethically bound to act in your best interest — always.",
  },
  {
    title: "Patient Counsel",
    description: "We favor steady, long-term thinking over reactive, short-term moves.",
  },
  {
    title: "Radical Clarity",
    description: "No jargon, no hidden fees — just honest guidance you can understand.",
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
          }}
        />
        <Container size="default" className="relative">
          <div className="mx-auto max-w-3xl py-20 text-center sm:py-24">
            <Reveal>
              <Eyebrow>Our Team</Eyebrow>
              <h1
                className="mt-5 font-heading font-bold tracking-tight text-midnight"
                style={{
                  fontSize: "clamp(2.5rem,1.6rem+3.4vw,4.5rem)",
                  lineHeight: 1.04,
                }}
              >
                Meet the people behind your plan
              </h1>
              <div
                className="mx-auto mt-5 h-px w-16"
                style={{
                  background:
                    "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
                }}
              />
              <p
                className="mx-auto mt-6 max-w-xl text-midnight/65"
                style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
              >
                A team of seasoned advisors and specialists, united by a single
                purpose: your financial wellbeing.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Team grid */}
      <Section tone="paper" topRule>
        <Container size="wide">
          <RevealStagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <article
                key={member.name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-midnight/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-midnight/15 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-midnight/5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gold-dark">
                    {member.role}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-midnight/60">
                    {member.bio}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-midnight/[0.04] px-3 py-1 text-xs font-medium text-midnight/70 ring-1 ring-midnight/[0.05]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-end border-t border-midnight/10 pt-4">
                    <Link
                      href={`/team/${member.slug}`}
                      className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-midnight"
                    >
                      <span className="border-b border-gold/50 pb-0.5 transition-colors group-hover/link:border-gold">
                        View Profile
                      </span>
                      <ArrowRight className="h-4 w-4 text-gold-dark transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="paper-soft" topRule>
        <Container size="default">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>What Guides Us</Eyebrow>
            <h2
              className="mt-4 font-heading font-bold leading-[1.1] tracking-tight text-midnight"
              style={{ fontSize: "clamp(1.85rem,1.3rem+1.8vw,2.6rem)" }}
            >
              The principles behind every conversation
            </h2>
            <div
              className="mx-auto mt-4 h-px w-16"
              style={{
                background:
                  "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
              }}
            />
          </Reveal>
          <RevealStagger className="mt-14 grid gap-8 sm:grid-cols-3">
            {values.map((value, i) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-midnight/[0.04] font-heading text-lg font-bold text-gold-dark ring-1 ring-midnight/[0.06]">
                  {i + 1}
                </div>
                <h3 className="mt-5 font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-midnight/60">
                  {value.description}
                </p>
              </div>
            ))}
          </RevealStagger>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="paper" topRule>
        <Container size="default">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[1.75rem] border border-midnight/10 bg-[#F7F5EF] px-8 py-16 text-center sm:px-12"
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
                }}
              />
              <div className="relative">
                <h2
                  className="font-heading font-bold leading-[1.1] tracking-tight text-midnight"
                  style={{ fontSize: "clamp(1.85rem,1.3rem+1.8vw,2.6rem)" }}
                >
                  Ready to meet your advisor?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-midnight/65" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
                  Book a complimentary introduction and find the right fit for your
                  family.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl bg-midnight px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)]"
                  >
                    Book an Introduction
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-xl border border-midnight/20 bg-white px-7 py-3.5 text-sm font-semibold text-midnight transition-all duration-300 hover:border-midnight/40 hover:bg-midnight/[0.03]"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
