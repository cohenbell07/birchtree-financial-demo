"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Tag, ArrowRight, ChevronDown, X } from "lucide-react"

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts

  const selectedTagName = selectedTag || "All Posts"

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
            {/* Desktop: Side-by-side layout, Mobile: Stacked */}
            <div className="flex flex-col lg:flex-row lg:gap-8">
              {/* Premium Category Filter Dropdown - Sidebar on desktop */}
              {tags.length > 0 && (
                <div className="mb-8 sm:mb-12 lg:mb-0 lg:w-64 lg:flex-shrink-0">
                  <div className="lg:sticky lg:top-4">
                    <div className="relative w-full max-w-md lg:max-w-none" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-emerald/20 rounded-lg shadow-sm hover:border-midnight/40 hover:shadow-md transition-all duration-200 text-left"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-emerald flex-shrink-0" />
                        <span className="text-sm sm:text-base font-medium text-midnight">
                          {selectedTagName}
                        </span>
                        {selectedTag && (
                          <span className="hidden sm:inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-emerald/10 text-emerald rounded-full">
                            {filteredPosts.length}
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 sm:h-5 sm:w-5 text-midnight/60 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-emerald/20 rounded-lg shadow-lg z-50 overflow-hidden"
                        >
                          <div className="max-h-[60vh] overflow-y-auto">
                            <button
                              onClick={() => {
                                setSelectedTag(null)
                                setIsDropdownOpen(false)
                              }}
                              className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-midnight/5 transition-colors flex items-center justify-between ${
                                selectedTag === null
                                  ? "bg-emerald/10 text-emerald font-medium"
                                  : "text-midnight"
                              }`}
                            >
                              <span className="text-sm sm:text-base">All Posts</span>
                              {selectedTag === null && (
                                <div className="h-2 w-2 rounded-full bg-emerald"></div>
                              )}
                            </button>
                            {tags.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => {
                                  setSelectedTag(tag)
                                  setIsDropdownOpen(false)
                                }}
                                className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-midnight/5 transition-colors flex items-center justify-between border-t border-midnight/5 ${
                                  selectedTag === tag
                                    ? "bg-emerald/10 text-emerald font-medium"
                                    : "text-midnight"
                                }`}
                              >
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-emerald/60 flex-shrink-0" />
                                  <span className="text-sm sm:text-base">{tag}</span>
                                </div>
                                {selectedTag === tag && (
                                  <div className="h-2 w-2 rounded-full bg-emerald"></div>
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    </div>

                    {/* Active Filter Badge */}
                    {selectedTag && (
                      <div className="flex justify-center lg:justify-start mt-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald/10 border border-emerald/20 rounded-full">
                          <span className="text-sm text-emerald font-medium">
                            {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} in {selectedTag}
                          </span>
                          <button
                            onClick={() => setSelectedTag(null)}
                            className="text-emerald hover:text-midnight transition-colors"
                            aria-label="Clear filter"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Posts Grid */}
              <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-midnight/70">Loading posts...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <Card className="glass shadow-glow-hover border-emerald/20 max-w-md mx-auto">
                <CardContent className="p-6 sm:p-8 text-center">
                  <p className="text-midnight/70 mb-4">No blog posts found.</p>
                  {selectedTag && (
                    <Button
                      onClick={() => setSelectedTag(null)}
                      variant="outline"
                      className="text-emerald"
                    >
                      View All Posts
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-4 md:gap-6">
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
                            {post.tags.map((tag) => (
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
                          className="w-full text-xs sm:text-sm !bg-gradient-to-r !from-emerald !to-emerald-light hover:!shadow-[0_0_15px_rgba(11,26,44,0.5)] transition-all duration-150 !text-white [&>*]:!text-white border-0"
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
          </div>
        </div>
      </section>
    </div>
  )
}
