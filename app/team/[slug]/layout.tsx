import { Metadata } from "next"
import { notFound } from "next/navigation"

const teamMembers = [
  {
    slug: "john-anderson",
    name: "John Anderson",
    role: "Principal & Senior Financial Advisor",
    bio: "With over 20 years of experience in financial planning and wealth management, John founded BirchTree Financial with a vision to provide personalized, fiduciary-focused advisory services.",
  },
  {
    slug: "maria-gonzalez",
    name: "Maria Gonzalez",
    role: "Senior Financial Advisor",
    bio: "Maria specializes in retirement planning and tax optimization strategies. Her attention to detail and client-first approach has helped hundreds of families achieve their financial goals.",
  },
  {
    slug: "david-parker",
    name: "David Parker",
    role: "Investment Manager",
    bio: "David brings extensive expertise in portfolio management and investment strategy. He holds an MBA in Finance and is passionate about helping clients build wealth through disciplined investing.",
  },
  {
    slug: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Estate Planning Specialist",
    bio: "Sarah focuses on estate planning and wealth transfer strategies. She helps families protect and transfer their wealth efficiently while minimizing tax implications.",
  },
  {
    slug: "robert-kim",
    name: "Robert Kim",
    role: "Financial Advisor",
    bio: "Robert works with young professionals and growing families, helping them establish solid financial foundations. His approach emphasizes education and long-term planning.",
  },
  {
    slug: "jennifer-thompson",
    name: "Jennifer Thompson",
    role: "Client Relations Manager",
    bio: "Jennifer ensures every client receives exceptional service and support. With a background in client service and operations, she helps streamline the advisory experience.",
  },
]

function getTeamMember(slug: string) {
  return teamMembers.find((member) => member.slug === slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const member = getTeamMember(slug)
  
  if (!member) {
    return {
      title: "Team Member Not Found",
    }
  }

  return {
    title: `${member.name} - ${member.role}`,
    description: member.bio,
  }
}

export default function TeamMemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

