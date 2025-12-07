"use client"

import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Tag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  tags: string[]
  content: string
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/posts/${params.slug}`)
        const data = await response.json()
        if (data.ok && data.post) {
          setPost(data.post)
        }
      } catch (error) {
        console.warn("Failed to fetch blog post:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-midnight/70">Loading post...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-midnight mb-2">Post Not Found</h1>
          <p className="text-midnight/70 mb-4">The blog post you're looking for doesn't exist.</p>
          <Button asChild variant="outline">
            <Link href="/blog">← Back to Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title={post.title} subtitle={post.description} />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-teal" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Post Meta */}
            <Card className="glass shadow-glow-hover border-emerald/20 mb-6 sm:mb-8">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-midnight/70">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(post.publishedAt).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  {post.tags.length > 0 && (
                    <div className="flex items-center flex-wrap gap-2">
                      <Tag className="h-4 w-4" />
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-emerald/10 text-emerald rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Post Content */}
            <Card className="glass shadow-glow-hover border-emerald/20">
              <CardContent className="p-6 sm:p-8 md:p-10">
                <article className="blog-content">
                  <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-midnight/80">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-midnight mb-4 mt-8">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-midnight mb-3 mt-6">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl sm:text-2xl font-heading font-bold text-midnight mb-2 mt-4">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-base sm:text-lg leading-relaxed mb-4">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-base sm:text-lg">{children}</li>
                        ),
                        a: ({ href, children }) => {
                          const isInternal = href?.startsWith("/")
                          return (
                            <a
                              href={href}
                              className={`text-emerald hover:text-emerald-light underline ${isInternal ? "" : "external"}`}
                              {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                            >
                              {children}
                            </a>
                          )
                        },
                        strong: ({ children }) => (
                          <strong className="font-semibold text-midnight">{children}</strong>
                        ),
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>
                </article>
              </CardContent>
            </Card>

            {/* Back to Blog */}
            <div className="mt-6 sm:mt-8 text-center">
              <Button asChild variant="outline" className="border-emerald/50 text-emerald hover:bg-emerald/10">
                <Link href="/blog">← Back to Blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

