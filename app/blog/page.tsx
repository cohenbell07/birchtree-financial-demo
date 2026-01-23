"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Tag, ArrowRight } from "lucide-react"

interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  tags: string[]
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog/posts")
        const data = await response.json()
        if (data.ok) {
          setPosts(data.posts || [])
          setTags(data.tags || [])
        }
      } catch (error) {
        console.warn("Failed to fetch blog posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts

  return (
    <div>
      <PageHeader
        title="Financial Insights Blog"
        subtitle="Expert advice, strategies, and insights for your financial journey"
      />

      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-emerald" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Tags Filter */}
            {tags.length > 0 && (
              <div className="mb-8 sm:mb-12">
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  <Button
                    variant={selectedTag === null ? "outline" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(null)}
                    className={`text-xs sm:text-sm ${
                      selectedTag === null
                        ? "!bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0"
                        : ""
                    }`}
                  >
                    All Posts
                  </Button>
                  {tags.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTag(tag)}
                      className={`text-xs sm:text-sm ${
                        selectedTag === tag
                          ? "!bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_20px_rgba(22,160,133,0.6)] hover:scale-105 transition-all duration-200 ease-out !text-white [&>*]:!text-white border-0"
                          : ""
                      }`}
                    >
                      <Tag className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Posts Grid */}
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-midnight/70">Loading posts...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto">
                <CardContent className="p-6 sm:p-8 text-center">
                  <p className="text-midnight/70 mb-4">No blog posts available yet.</p>
                  <p className="text-sm text-midnight/50">
                    Check back soon for financial insights and strategies.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 md:gap-6">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <Card className="h-full glass shadow-glow-hover border-emerald/20 w-full">
                      <CardHeader className="p-4 sm:p-5">
                        <div className="flex items-center text-xs text-midnight/60 mb-2">
                          <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {new Date(post.publishedAt).toLocaleDateString("en-CA", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <CardTitle className="text-base sm:text-lg font-heading text-midnight mb-2 line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-midnight/70 line-clamp-3">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-5 pt-0">
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 bg-emerald/10 text-emerald rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <Button
                          asChild
                          size="sm"
                          className="w-full text-xs sm:text-sm !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_15px_rgba(22,160,133,0.5)] transition-all duration-150 !text-white [&>*]:!text-white border-0"
                        >
                          <Link href={`/blog/${post.slug}`} className="!text-white">
                            Read More
                            <ArrowRight className="ml-1.5 h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

