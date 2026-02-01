import { Metadata } from "next"
import { notFound } from "next/navigation"

const teamMembers = [
  {
    slug: "melissa-birch",
    name: "Melissa Birch",
    role: "Owner",
    bio: "As the owner of Birchtree Financial, Melissa brings visionary leadership and deep expertise in financial advisory services and business strategy.",
  },
  {
    slug: "kevin-birch",
    name: "Kevin Birch",
    role: "Co-owner & Office Administrator",
    bio: "Kevin serves as Co-owner and Office Administrator, managing daily operations and ensuring smooth client experiences.",
  },
  {
    slug: "kaleb-birch",
    name: "Kaleb Birch",
    role: "IT Specialist",
    bio: "Kaleb is our IT Specialist, responsible for maintaining our technology infrastructure and ensuring secure, efficient operations.",
  },
  {
    slug: "crystal",
    name: "Crystal Smith",
    role: "Bookkeeper",
    bio: "Crystal Smith is the welcoming face of Birchtree Financial, serving as our Bookkeeper. She ensures clients feel valued from the moment they contact us, handling inquiries with professionalism and warmth.",
  },
  {
    slug: "art-birch",
    name: "Art Birch",
    role: "Founder and Financial Advisor",
    bio: "Art Birch is the Founder and Financial Advisor of Birchtree Financial, bringing decades of experience and a deep commitment to helping clients achieve their financial goals.",
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
  const resolvedParams = await params
  const member = getTeamMember(resolvedParams.slug)

  if (!member) {
    return {
      title: "Team Member Not Found | Birchtree Financial",
    }
  }

  return {
    title: `${member.name} - ${member.role} | Birchtree Financial`,
    description: member.bio,
  }
}

export default async function TeamMemberLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const member = getTeamMember(resolvedParams.slug)

  if (!member) {
    notFound()
  }

  return <>{children}</>
}
