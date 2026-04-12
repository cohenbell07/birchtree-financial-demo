"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import RevealText from "@/components/RevealText"
import { Button } from "@/components/ui/button"
import { Tag, ArrowRight, ChevronDown, X } from "lucide-react"

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
      {/* ============================================
          HERO — Typographic Masthead
          ============================================ */}
      <section
        className="relative text-white pt-28 sm:pt-36 md:pt-40 lg:pt-48 pb-16 sm:pb-24 md:pb-28 lg:pb-36 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #060f1c 0%, #0B1A2C 40%, #0d1d30 70%, #081525 100%)",
        }}
      >
        {/* Large decorative tree watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{
            width: "clamp(250px, 30vw, 450px)",
            height: "clamp(250px, 30vw, 450px)",
            opacity: 0.04,
          }}
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Trunk — curved birch trunk */}
            <path d="M100 190 C98 170, 95 150, 93 130 C90 110, 88 95, 92 80 C95 68, 98 55, 100 42" stroke="#D7C38A" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Main branches */}
            <path d="M95 120 C80 110, 62 105, 48 98" stroke="#D7C38A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M97 105 C110 95, 128 90, 145 82" stroke="#D7C38A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M94 90 C78 78, 58 72, 42 62" stroke="#D7C38A" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M98 78 C115 70, 132 62, 148 55" stroke="#D7C38A" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M96 68 C82 55, 65 48, 55 38" stroke="#D7C38A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M100 55 C112 48, 125 40, 138 32" stroke="#D7C38A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M100 42 C95 32, 85 25, 78 18" stroke="#D7C38A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M100 42 C108 30, 118 22, 125 15" stroke="#D7C38A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Leaves — scattered ellipses */}
            <ellipse cx="45" cy="95" rx="8" ry="5" transform="rotate(-30 45 95)" fill="#D7C38A" />
            <ellipse cx="55" cy="100" rx="7" ry="4.5" transform="rotate(-15 55 100)" fill="#D7C38A" />
            <ellipse cx="38" cy="88" rx="6" ry="4" transform="rotate(-40 38 88)" fill="#D7C38A" />
            <ellipse cx="148" cy="78" rx="8" ry="5" transform="rotate(25 148 78)" fill="#D7C38A" />
            <ellipse cx="140" cy="85" rx="7" ry="4.5" transform="rotate(15 140 85)" fill="#D7C38A" />
            <ellipse cx="155" cy="72" rx="6" ry="4" transform="rotate(35 155 72)" fill="#D7C38A" />
            <ellipse cx="38" cy="58" rx="7" ry="4.5" transform="rotate(-35 38 58)" fill="#D7C38A" />
            <ellipse cx="48" cy="65" rx="6" ry="4" transform="rotate(-20 48 65)" fill="#D7C38A" />
            <ellipse cx="30" cy="52" rx="6" ry="3.5" transform="rotate(-45 30 52)" fill="#D7C38A" />
            <ellipse cx="150" cy="50" rx="7" ry="4.5" transform="rotate(30 150 50)" fill="#D7C38A" />
            <ellipse cx="142" cy="58" rx="6" ry="4" transform="rotate(20 142 58)" fill="#D7C38A" />
            <ellipse cx="158" cy="44" rx="6" ry="3.5" transform="rotate(40 158 44)" fill="#D7C38A" />
            <ellipse cx="52" cy="35" rx="6" ry="4" transform="rotate(-30 52 35)" fill="#D7C38A" />
            <ellipse cx="60" cy="42" rx="5" ry="3.5" transform="rotate(-15 60 42)" fill="#D7C38A" />
            <ellipse cx="140" cy="28" rx="6" ry="4" transform="rotate(25 140 28)" fill="#D7C38A" />
            <ellipse cx="130" cy="35" rx="5" ry="3.5" transform="rotate(15 130 35)" fill="#D7C38A" />
            <ellipse cx="75" cy="15" rx="5" ry="3.5" transform="rotate(-25 75 15)" fill="#D7C38A" />
            <ellipse cx="82" cy="22" rx="5" ry="3" transform="rotate(-10 82 22)" fill="#D7C38A" />
            <ellipse cx="128" cy="12" rx="5" ry="3.5" transform="rotate(20 128 12)" fill="#D7C38A" />
            <ellipse cx="120" cy="18" rx="5" ry="3" transform="rotate(10 120 18)" fill="#D7C38A" />
            <ellipse cx="100" cy="28" rx="5" ry="3" fill="#D7C38A" />
            <ellipse cx="108" cy="22" rx="4" ry="3" transform="rotate(10 108 22)" fill="#D7C38A" />
            <ellipse cx="90" cy="25" rx="4" ry="3" transform="rotate(-10 90 25)" fill="#D7C38A" />
            {/* Root base */}
            <path d="M100 190 C95 192, 85 193, 80 192" stroke="#D7C38A" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M100 190 C105 192, 115 193, 120 192" stroke="#D7C38A" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold/70 font-semibold mb-5 sm:mb-7"
            >
              <span className="inline-block w-2 h-px bg-gold/50 mr-3 align-middle" />
              Our Blog
              <span className="inline-block w-2 h-px bg-gold/50 ml-3 align-middle" />
            </motion.p>
            <RevealText
              as="h1"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-0"
            >
              Financial Insights
            </RevealText>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-6 sm:mt-8 mb-5 sm:mb-7"
              style={{ width: "fit-content" }}
            >
              <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-white/45 leading-relaxed font-body mb-8 sm:mb-10 px-4"
            >
              Expert advice, strategies, and insights for your financial journey
            </motion.p>

            {/* Category pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            >
              {["Retirement", "Tax Strategy", "Market Insights", "Estate Planning", "RRSP & TFSA"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 rounded-full text-[0.65rem] sm:text-xs font-medium tracking-wide border border-gold/20 text-gold/50 bg-white/[0.02]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 md:py-36 lg:py-44 bg-[#fafbfc] relative overflow-hidden">
        <div className="grain-overlay" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Desktop: Side-by-side layout, Mobile: Stacked */}
            <div className="flex flex-col lg:flex-row lg:gap-8">
              {/* Category Filter Dropdown - Sidebar on desktop */}
              {tags.length > 0 && (
                <div className="mb-8 sm:mb-12 lg:mb-0 lg:w-64 lg:flex-shrink-0">
                  <div className="lg:sticky lg:top-4">
                    <div className="relative w-full max-w-md lg:max-w-none" ref={dropdownRef}>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border border-midnight/10 rounded-lg shadow-sm hover:border-midnight/20 hover:shadow-md transition-all duration-200 text-left"
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-gold flex-shrink-0" />
                          <span className="text-sm sm:text-base font-medium text-midnight">
                            {selectedTagName}
                          </span>
                          {selectedTag && (
                            <span className="hidden sm:inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-gold/20 text-gold rounded-full">
                              {filteredPosts.length}
                            </span>
                          )}
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 sm:h-5 sm:w-5 text-midnight/50 transition-transform duration-200 ${
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
                            className="absolute top-full left-0 right-0 mt-2 bg-white border border-midnight/10 rounded-lg shadow-lg z-50 overflow-hidden"
                          >
                            <div className="max-h-[60vh] overflow-y-auto">
                              <button
                                onClick={() => {
                                  setSelectedTag(null)
                                  setIsDropdownOpen(false)
                                }}
                                className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-midnight/[0.03] transition-colors flex items-center justify-between ${
                                  selectedTag === null
                                    ? "bg-gold/10 text-gold font-medium"
                                    : "text-midnight"
                                }`}
                              >
                                <span className="text-sm sm:text-base">All Posts</span>
                                {selectedTag === null && (
                                  <div className="h-2 w-2 rounded-full bg-gold"></div>
                                )}
                              </button>
                              {tags.map((tag) => (
                                <button
                                  key={tag}
                                  onClick={() => {
                                    setSelectedTag(tag)
                                    setIsDropdownOpen(false)
                                  }}
                                  className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-midnight/[0.03] transition-colors flex items-center justify-between border-t border-midnight/5 ${
                                    selectedTag === tag
                                      ? "bg-gold/10 text-gold font-medium"
                                      : "text-midnight"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 sm:gap-3">
                                    <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gold/60 flex-shrink-0" />
                                    <span className="text-sm sm:text-base">{tag}</span>
                                  </div>
                                  {selectedTag === tag && (
                                    <div className="h-2 w-2 rounded-full bg-gold"></div>
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border-0 rounded-full">
                          <span className="text-sm text-gold font-medium">
                            {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} in {selectedTag}
                          </span>
                          <button
                            onClick={() => setSelectedTag(null)}
                            className="text-gold hover:text-midnight transition-colors"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 animate-pulse">
                        <div className="h-3 w-24 bg-midnight/[0.06] rounded mb-4" />
                        <div className="h-5 w-3/4 bg-midnight/[0.08] rounded mb-3" />
                        <div className="space-y-2 mb-4">
                          <div className="h-3 w-full bg-midnight/[0.05] rounded" />
                          <div className="h-3 w-5/6 bg-midnight/[0.05] rounded" />
                        </div>
                        <div className="flex gap-2 mb-4">
                          <div className="h-5 w-16 bg-midnight/[0.04] rounded" />
                          <div className="h-5 w-20 bg-midnight/[0.04] rounded" />
                        </div>
                        <div className="h-9 w-full bg-midnight/[0.06] rounded" />
                      </div>
                    ))}
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="max-w-md mx-auto text-center py-16">
                    <p className="text-midnight/50 text-lg mb-6">No blog posts found.</p>
                    {selectedTag && (
                      <Button
                        onClick={() => setSelectedTag(null)}
                        variant="outline"
                      >
                        View All Posts
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                      >
                        <Link href={`/blog/${post.slug}`} className="block h-full group">
                          <div
                            className="h-full flex flex-col rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5"
                            style={{
                              background: '#ffffff',
                              borderTop: '2px solid rgba(215,195,138,0.3)',
                              border: '1px solid rgba(11,26,44,0.06)',
                              borderTopWidth: '2px',
                              borderTopColor: 'rgba(215,195,138,0.3)',
                              boxShadow: '0 1px 2px rgba(11,26,44,0.03)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderTopColor = 'rgba(215,195,138,0.6)'
                              e.currentTarget.style.boxShadow = '0 2px 16px rgba(215,195,138,0.08)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderTopColor = 'rgba(215,195,138,0.3)'
                              e.currentTarget.style.boxShadow = '0 1px 2px rgba(11,26,44,0.03)'
                            }}
                          >
                            <div className="p-5 sm:p-6 flex flex-col h-full">
                              {/* Date */}
                              <p className="text-[0.6rem] uppercase tracking-[0.2em] text-midnight/35 font-medium mb-3">
                                {new Date(post.publishedAt).toLocaleDateString("en-CA", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }).toUpperCase()}
                              </p>

                              {/* Rule */}
                              <div className="h-px bg-midnight/[0.06] mb-3" />

                              {/* Title */}
                              <h3 className="text-base sm:text-lg font-heading font-bold text-midnight mb-2 line-clamp-2 leading-snug group-hover:text-midnight/80 transition-colors">
                                {post.title}
                              </h3>

                              {/* Description */}
                              <p className="text-xs sm:text-sm text-midnight/45 line-clamp-2 mb-4 flex-1 leading-relaxed">
                                {post.description}
                              </p>

                              {/* Tags as inline text */}
                              {post.tags.length > 0 && (
                                <p className="text-[0.6rem] uppercase tracking-[0.15em] text-gold/60 mb-4">
                                  {post.tags.slice(0, 3).join(" · ")}
                                </p>
                              )}

                              {/* Read More */}
                              <span className="text-midnight/50 group-hover:text-midnight font-medium text-sm inline-flex items-center mt-auto transition-colors duration-200">
                                Read Article
                                <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                              </span>
                            </div>
                          </div>
                        </Link>
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
