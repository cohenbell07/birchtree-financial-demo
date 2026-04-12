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

      <section
        className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden grain-overlay"
        style={{ background: 'linear-gradient(160deg, #f8f7f4 0%, #f5f4f0 40%, #f2f1ed 100%)' }}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-midnight/[0.06]">
              <div className="flex items-center text-sm text-midnight/40">
                <Calendar className="h-3.5 w-3.5 mr-2 text-gold/60" />
                {new Date(post.publishedAt).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-sm text-midnight/30">
                {readingTime} min read
              </div>
              {post.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.15em] font-medium text-gold-dark/70 bg-gold/[0.08] border border-gold/15 rounded-full"
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
                className="inline-flex items-center text-sm font-medium text-midnight/50 hover:text-midnight transition-colors duration-200"
              >
                <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                Back to all articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA — Book Consultation
          ============================================ */}
      <section
        className="py-16 sm:py-20 md:py-28 text-white relative overflow-hidden grain-overlay"
        style={{
          background: 'linear-gradient(160deg, #050c16 0%, #0B1A2C 30%, #101f33 60%, #0a1525 100%)',
        }}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/60 font-medium mb-4 sm:mb-5">
              Need Personalized Advice?
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4 sm:mb-6">
              Let&apos;s Discuss Your Financial Goals
            </h2>
            <div className="flex justify-center mb-5 sm:mb-7">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            </div>
            <p className="text-base sm:text-lg text-white/40 mb-8 sm:mb-10 leading-relaxed px-4 font-body">
              Our team can help you put these strategies into action with a plan tailored to your specific situation. Book a complimentary consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-gold/90 hover:bg-gold text-midnight font-semibold shadow-[0_4px_20px_rgba(215,195,138,0.2)] hover:shadow-[0_8px_40px_rgba(215,195,138,0.3)] transition-all duration-300 hover:scale-[1.02] rounded-xl [&>*]:text-midnight"
              >
                <Link href="/contact">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-white/[0.04] border border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300 rounded-xl [&>*]:text-white"
              >
                <Link href="/services" className="text-white">
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
