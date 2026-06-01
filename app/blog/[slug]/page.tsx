import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { ArrowRight, ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import PageHeader from "@/components/layout/PageHeader"

// Generate static pages for all blog posts at build time
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// Dynamic metadata per blog post — this is what Google sees
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: "Post Not Found" }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: "Birchtree Financial" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Birchtree Financial"],
      tags: post.tags,
      siteName: "Birchtree Financial",
      locale: "en_CA",
      url: `https://birchtreefinancial.ca/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://birchtreefinancial.ca/blog/${post.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // JSON-LD structured data for Google rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Birchtree Financial",
      url: "https://birchtreefinancial.ca",
    },
    publisher: {
      "@type": "Organization",
      name: "Birchtree Financial",
      url: "https://birchtreefinancial.ca",
    },
    keywords: post.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://birchtreefinancial.ca/blog/${post.slug}`,
    },
  }

  // Estimate reading time
  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 225))

  return (
    <div>
      {/* JSON-LD for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader title={post.title} subtitle={post.description} accent="blue" />

      <section className="relative overflow-hidden bg-[#FBFAF6] py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Faint gold wash, anchored top-left — same recipe as the homepage hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-midnight/10">
              <div className="flex items-center text-sm text-midnight/55">
                <Calendar className="h-3.5 w-3.5 mr-2 text-gold-dark" strokeWidth={1.6} />
                {new Date(post.publishedAt).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-sm text-midnight/45">
                {readingTime} min read
              </div>
              {post.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.15em] font-semibold text-gold-dark bg-gold/[0.08] border border-gold/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Post Content */}
            <article className="blog-content">
              <div className="prose prose-sm sm:prose-base max-w-none text-midnight/70">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-midnight mb-4 mt-10 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-midnight mb-3 mt-8 first:mt-0">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-midnight mb-2 mt-6">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 text-midnight/60">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc mb-4 sm:mb-5 space-y-1.5 sm:space-y-2 pl-5 text-midnight/60">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal mb-4 sm:mb-5 space-y-1.5 sm:space-y-2 pl-5 text-midnight/60">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-sm sm:text-base leading-relaxed">{children}</li>
                    ),
                    a: ({ href, children }) => {
                      const isInternal = href?.startsWith("/")
                      return (
                        <a
                          href={href}
                          className="text-gold-dark hover:text-midnight underline underline-offset-2 decoration-gold/40 hover:decoration-midnight/40 transition-colors duration-200"
                          {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          {children}
                        </a>
                      )
                    },
                    strong: ({ children }) => (
                      <strong className="font-semibold text-midnight">{children}</strong>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-[3px] border-gold/50 pl-5 my-6 italic text-midnight/50">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </article>

            {/* Gold divider */}
            <div className="flex justify-center my-10 sm:my-14">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </div>

            {/* Back to Blog */}
            <div className="mb-10 sm:mb-14">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-midnight"
              >
                <ArrowLeft className="h-4 w-4 text-gold-dark transition-transform group-hover:-translate-x-1" />
                <span className="border-b border-gold/50 pb-0.5 transition-colors group-hover:border-gold">
                  Back to all articles
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA — Book Consultation
          ============================================ */}
      <section className="relative overflow-hidden bg-[#F7F5EF] py-16 sm:py-20 md:py-28">
        {/* Faint gold wash, anchored top-left — same recipe as the homepage hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark mb-4 sm:mb-5">
              Need Personalized Advice?
            </p>
            <h2
              className="font-heading font-bold leading-[1.1] tracking-tight text-midnight"
              style={{ fontSize: "clamp(1.85rem, 1.3rem + 1.8vw, 2.6rem)" }}
            >
              Let&apos;s Discuss Your Financial Goals
            </h2>
            <div className="flex justify-center mt-5 mb-5 sm:mb-7">
              <div
                aria-hidden
                className="h-px w-16"
                style={{
                  background:
                    "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
                }}
              />
            </div>
            <p className="text-base sm:text-lg text-midnight/65 mb-8 sm:mb-10 leading-relaxed px-4 font-body">
              Our team can help you put these strategies into action with a plan tailored to your specific situation. Book a complimentary consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/contact">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <Link href="/services">
                  Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
