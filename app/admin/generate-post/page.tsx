"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/ui/reveal"
import { FileText, AlertCircle, Sparkles, Eye, Save, Edit, ArrowLeft, X, Search, CheckSquare, Square } from "lucide-react"
import ReactMarkdown from "react-markdown"

// Blog post suggestions
const blogSuggestions = [
  "RRSP contribution limits",
  "TFSA vs RRSP comparison",
  "Retirement planning strategies",
  "Tax optimization tips for Canadians",
  "CPP and OAS optimization",
  "RESP contribution strategies",
  "Estate planning essentials",
  "Mortgage prepayment strategies",
  "Investment portfolio diversification",
  "Financial planning for young professionals",
]

export default function GeneratePostPage() {
  const router = useRouter()
  const [topic, setTopic] = useState("")
  const [publishDate, setPublishDate] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [editingContent, setEditingContent] = useState(false)
  const [trendingTopics, setTrendingTopics] = useState<string[]>([])
  const [selectedTrendingTopics, setSelectedTrendingTopics] = useState<Set<string>>(new Set())
  const [isLoadingTrending, setIsLoadingTrending] = useState(false)
  const [multiPostMode, setMultiPostMode] = useState(false)
  const [generatedPosts, setGeneratedPosts] = useState<Array<{
    ok: boolean
    slug?: string
    title?: string
    description?: string
    content?: string
    publishedAt?: string
    tags?: string[]
    message?: string
    reason?: string
  }>>([])
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [result, setResult] = useState<{
    ok: boolean
    slug?: string
    title?: string
    description?: string
    content?: string
    publishedAt?: string
    tags?: string[]
    message?: string
    reason?: string
  } | null>(null)

  // Set default date to today
  const today = new Date().toISOString().split("T")[0]
  const defaultDate = publishDate || today

  // Parse frontmatter from content
  const parseContent = (content: string) => {
    if (!content) return { frontmatter: {}, body: "" }
    
    if (content.includes("---")) {
      const parts = content.split("---")
      if (parts.length >= 3) {
        const frontmatterStr = parts[1].trim()
        const body = parts.slice(2).join("---").trim()
        
        // Simple YAML parsing
        const frontmatter: any = {}
        frontmatterStr.split("\n").forEach((line) => {
          const match = line.match(/^(\w+):\s*(.+)$/)
          if (match) {
            const key = match[1]
            let value: any = match[2].trim()
            // Remove quotes
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1)
            }
            // Parse arrays
            if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
              try {
                value = JSON.parse(value)
              } catch {
                value = value.slice(1, -1).split(",").map((v: string) => v.trim().replace(/['"]/g, ""))
              }
            }
            frontmatter[key] = value
          }
        })
        
        return { frontmatter, body }
      }
    }
    
    return { frontmatter: {}, body: content }
  }

  const currentResult = multiPostMode && generatedPosts.length > 0 
    ? generatedPosts[currentPostIndex] 
    : result

  const { frontmatter, body } = currentResult?.content ? parseContent(currentResult.content) : { frontmatter: {}, body: "" }
  const currentTitle = currentResult?.title || frontmatter.title || ""
  const currentDescription = currentResult?.description || frontmatter.description || ""
  const currentPublishedAt = currentResult?.publishedAt || frontmatter.publishedAt || defaultDate
  const currentTags = currentResult?.tags || frontmatter.tags || []
  const currentSlug = currentResult?.slug || frontmatter.slug || ""
  const currentStatus = frontmatter.status || "draft"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setResult(null)
    setShowPreview(false)
    setEditingContent(false)
    setGeneratedPosts([])
    setMultiPostMode(false)

    try {
      const response = await fetch("/api/admin/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          topic, 
          publishedAt: publishDate || undefined 
        }),
      })

      const data = await response.json()
      setResult(data)
      if (data.ok && data.content) {
        setEditingContent(true)
      }
    } catch (error) {
      setResult({
        ok: false,
        message: "Failed to generate post. Please try again.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateMultiple = async () => {
    if (selectedTrendingTopics.size === 0) {
      alert("Please select at least one topic to generate")
      return
    }

    setIsGenerating(true)
    setGeneratedPosts([])
    setMultiPostMode(true)
    setCurrentPostIndex(0)
    setShowPreview(false)
    setEditingContent(false)

    const topics = Array.from(selectedTrendingTopics)
    const posts: typeof generatedPosts = []

    for (let i = 0; i < topics.length; i++) {
      try {
        const response = await fetch("/api/admin/generate-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            topic: topics[i],
            publishedAt: publishDate || undefined 
          }),
        })

        const data = await response.json()
        posts.push(data)
        setGeneratedPosts([...posts])
        setCurrentPostIndex(i)
      } catch (error) {
        posts.push({
          ok: false,
          message: `Failed to generate post for "${topics[i]}"`,
        })
        setGeneratedPosts([...posts])
      }
    }

    setIsGenerating(false)
    if (posts.length > 0 && posts[0].ok) {
      setEditingContent(true)
    }
  }

  const handleFetchTrending = async () => {
    setIsLoadingTrending(true)
    try {
      const response = await fetch("/api/admin/blog/trending-topics")
      const data = await response.json()
      if (data.ok && data.topics) {
        setTrendingTopics(data.topics)
      } else {
        alert("Failed to fetch trending topics: " + (data.error || "Unknown error"))
      }
    } catch (error: any) {
      alert("Failed to fetch trending topics: " + error.message)
    } finally {
      setIsLoadingTrending(false)
    }
  }

  const toggleTopicSelection = (topic: string) => {
    const newSelected = new Set(selectedTrendingTopics)
    if (newSelected.has(topic)) {
      newSelected.delete(topic)
    } else {
      newSelected.add(topic)
    }
    setSelectedTrendingTopics(newSelected)
  }

  const handleSave = async (status: "draft" | "published" = "draft") => {
    if (!currentResult?.content) return

    setIsSaving(true)
    try {
      // Reconstruct content with updated frontmatter
      const updatedFrontmatter = `---
title: "${currentTitle.replace(/"/g, '\\"')}"
description: "${currentDescription.replace(/"/g, '\\"')}"
publishedAt: "${currentPublishedAt}"
tags: ${JSON.stringify(currentTags)}
slug: "${currentSlug}"
status: "${status}"
---

`
      const updatedContent = updatedFrontmatter + body

      const response = await fetch("/api/admin/blog/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: currentSlug,
          title: currentTitle,
          description: currentDescription,
          content: updatedContent,
          publishedAt: currentPublishedAt,
          tags: currentTags,
          status,
        }),
      })

      const data = await response.json()
      if (data.ok) {
        if (multiPostMode) {
          const updated = [...generatedPosts]
          updated[currentPostIndex] = { ...updated[currentPostIndex], content: updatedContent }
          setGeneratedPosts(updated)
        } else {
          setResult({ ...result!, content: updatedContent })
        }
        alert(`Post saved as ${status}!`)
      } else {
        alert(`Failed to save: ${data.error}`)
      }
    } catch (error: any) {
      alert(`Failed to save: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setTopic(suggestion)
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-paper py-10 sm:py-12 md:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>Birchtree Studio</Eyebrow>
                <h1
                  className="mt-4 font-heading font-bold tracking-tight text-midnight"
                  style={{ fontSize: "clamp(2.5rem, 1.6rem + 3.4vw, 4.5rem)", lineHeight: 1.04 }}
                >
                  AI Blog Post Generator
                </h1>
                <div
                  aria-hidden
                  className="mt-4 h-px w-16"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
                  }}
                />
                <p className="mt-4 text-midnight/65">
                  Generate, edit, and manage blog posts
                </p>
              </div>
              <Button
                onClick={() => router.push("/admin/dashboard")}
                variant="outline"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </Reveal>

          {/* Trending Topics Section */}
          <Card className="mb-6 transition-all duration-300 hover:border-midnight/15 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <span className="mr-3 flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                      <Search className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                    </span>
                    Trending Topics
                  </CardTitle>
                  <CardDescription className="mt-2 text-xs sm:text-sm">
                    Discover trending Canadian financial topics and generate multiple posts at once
                  </CardDescription>
                </div>
                <Button
                  onClick={handleFetchTrending}
                  disabled={isLoadingTrending}
                  variant="outline"
                  size="sm"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {isLoadingTrending ? "Loading..." : "Find Trending Topics"}
                </Button>
              </div>
            </CardHeader>
            {trendingTopics.length > 0 && (
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {trendingTopics.map((topicItem) => (
                      <button
                        key={topicItem}
                        type="button"
                        onClick={() => toggleTopicSelection(topicItem)}
                        className={`px-3 py-2 text-sm rounded-xl border transition-colors flex items-center gap-2 ${
                          selectedTrendingTopics.has(topicItem)
                            ? "border-gold bg-gold/15 text-midnight"
                            : "border-midnight/15 bg-white text-midnight/70 hover:border-midnight/30 hover:bg-midnight/[0.03]"
                        }`}
                      >
                        {selectedTrendingTopics.has(topicItem) ? (
                          <CheckSquare className="h-4 w-4 text-gold-dark" />
                        ) : (
                          <Square className="h-4 w-4 text-midnight/40" />
                        )}
                        {topicItem}
                      </button>
                    ))}
                  </div>
                  {selectedTrendingTopics.size > 0 && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={handleGenerateMultiple}
                        disabled={isGenerating}
                      >
                        {isGenerating ? `Generating ${currentPostIndex + 1}/${selectedTrendingTopics.size}...` : `Generate ${selectedTrendingTopics.size} Posts`}
                      </Button>
                      <Button
                        onClick={() => setSelectedTrendingTopics(new Set())}
                        variant="outline"
                        size="sm"
                      >
                        Clear Selection
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Blog Post Suggestions */}
          <Card className="mb-6 transition-all duration-300 hover:border-midnight/15 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <span className="mr-3 flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                  <Sparkles className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                </span>
                Suggested Topics
              </CardTitle>
              <CardDescription className="mt-2 text-xs sm:text-sm">
                Click a suggestion to use it, or enter your own topic
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="flex flex-wrap gap-2">
                {blogSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="rounded-xl border border-midnight/15 bg-white px-3 py-1.5 text-sm text-midnight/70 transition-colors hover:border-midnight/30 hover:bg-midnight/[0.03] hover:text-midnight"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate Form */}
          {!currentResult?.ok && (
            <Card className="transition-all duration-300 hover:border-midnight/15 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <span className="mr-3 flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                    <FileText className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                  </span>
                  Generate New Post
                </CardTitle>
                <CardDescription className="mt-2 text-xs sm:text-sm">
                  Enter a topic and the AI will generate a complete blog post
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="topic">Blog Post Topic</Label>
                    <Input
                      id="topic"
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      required
                      placeholder="e.g., RRSP contribution limits"
                      className="text-sm sm:text-base"
                    />
                    <p className="text-xs text-midnight/50">
                      The AI will generate a comprehensive post about this topic
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publishDate">Publish Date</Label>
                    <Input
                      id="publishDate"
                      type="date"
                      value={defaultDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      min={today}
                      className="text-sm sm:text-base"
                    />
                    <p className="text-xs text-midnight/50">
                      Select when this post should be published (defaults to today)
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isGenerating || !topic}
                    className="w-full"
                  >
                    {isGenerating ? "Generating..." : "Generate Blog Post"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Multi-Post Navigation */}
          {multiPostMode && generatedPosts.length > 1 && (
            <Card className="mt-6">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-midnight/65">
                      Post {currentPostIndex + 1} of {generatedPosts.length}
                    </p>
                    <p className="text-xs text-midnight/55 mt-1">
                      {generatedPosts[currentPostIndex]?.title || "Untitled"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setCurrentPostIndex(Math.max(0, currentPostIndex - 1))}
                      disabled={currentPostIndex === 0}
                      variant="outline"
                      size="sm"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() => setCurrentPostIndex(Math.min(generatedPosts.length - 1, currentPostIndex + 1))}
                      disabled={currentPostIndex === generatedPosts.length - 1}
                      variant="outline"
                      size="sm"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Display */}
          {currentResult && !currentResult.ok && (
            <Card className="bg-red-50 border-red-200 mt-6">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-heading font-bold text-red-900 mb-2">
                      Generation Failed
                    </h3>
                    <p className="text-sm text-red-800">
                      {currentResult.message || currentResult.reason || "Unable to generate post"}
                    </p>
                    {currentResult.reason === "api_not_configured" && (
                      <p className="text-xs text-red-700 mt-2">
                        To enable blog generation, set ANTHROPIC_API_KEY in your environment variables.
                      </p>
                    )}
                    {currentResult.reason === "duplicate_topic" && (
                      <p className="text-xs text-red-700 mt-2">
                        Please choose a different topic that hasn&apos;t been covered yet.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generated Post Editor */}
          {currentResult?.ok && currentResult.content && (
            <Card className="mt-6">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="flex items-center text-lg sm:text-xl">
                    <span className="mr-3 flex h-11 w-11 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                      <Edit className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                    </span>
                    Edit Generated Post
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowPreview(!showPreview)}
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {showPreview ? "Hide Preview" : "Preview"}
                    </Button>
                    <Button
                      onClick={() => {
                        setResult(null)
                        setTopic("")
                        setShowPreview(false)
                        setEditingContent(false)
                        setGeneratedPosts([])
                        setMultiPostMode(false)
                        setCurrentPostIndex(0)
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <X className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4">
                  {/* Post Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-title">Title</Label>
                      <Input
                        id="edit-title"
                        value={currentTitle}
                        onChange={(e) => {
                          const newContent = currentResult.content!.replace(
                            /title:\s*"[^"]*"/,
                            `title: "${e.target.value.replace(/"/g, '\\"')}"`
                          )
                          if (multiPostMode) {
                            const updated = [...generatedPosts]
                            updated[currentPostIndex] = { ...updated[currentPostIndex], title: e.target.value, content: newContent }
                            setGeneratedPosts(updated)
                          } else {
                            setResult({ ...currentResult, title: e.target.value, content: newContent })
                          }
                        }}
                        className="text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-slug">Slug</Label>
                      <Input
                        id="edit-slug"
                        value={currentSlug}
                        readOnly
                        className="text-sm sm:text-base bg-midnight/5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-description">Description</Label>
                      <Input
                        id="edit-description"
                        value={currentDescription}
                        onChange={(e) => {
                          const newContent = currentResult.content!.replace(
                            /description:\s*"[^"]*"/,
                            `description: "${e.target.value.replace(/"/g, '\\"')}"`
                          )
                          if (multiPostMode) {
                            const updated = [...generatedPosts]
                            updated[currentPostIndex] = { ...updated[currentPostIndex], description: e.target.value, content: newContent }
                            setGeneratedPosts(updated)
                          } else {
                            setResult({ ...currentResult, description: e.target.value, content: newContent })
                          }
                        }}
                        className="text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-publish-date">Publish Date</Label>
                      <Input
                        id="edit-publish-date"
                        type="date"
                        value={currentPublishedAt}
                        onChange={(e) => {
                          const newContent = currentResult.content!.replace(
                            /publishedAt:\s*"[^"]*"/,
                            `publishedAt: "${e.target.value}"`
                          )
                          if (multiPostMode) {
                            const updated = [...generatedPosts]
                            updated[currentPostIndex] = { ...updated[currentPostIndex], publishedAt: e.target.value, content: newContent }
                            setGeneratedPosts(updated)
                          } else {
                            setResult({ ...currentResult, publishedAt: e.target.value, content: newContent })
                          }
                        }}
                        className="text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Content Editor */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="edit-content">Content (Markdown)</Label>
                      <span className="text-xs text-midnight/55">
                        {body.split("\n").length} lines
                      </span>
                    </div>
                    {editingContent ? (
                      <Textarea
                        id="edit-content"
                        value={body}
                        onChange={(e) => {
                          const { frontmatter: fm } = parseContent(currentResult.content!)
                          const newContent = `---
title: "${fm.title || currentTitle}"
description: "${fm.description || currentDescription}"
publishedAt: "${fm.publishedAt || currentPublishedAt}"
tags: ${JSON.stringify(fm.tags || currentTags)}
slug: "${fm.slug || currentSlug}"
status: "${fm.status || currentStatus}"
---

${e.target.value}`
                          if (multiPostMode) {
                            const updated = [...generatedPosts]
                            updated[currentPostIndex] = { ...updated[currentPostIndex], content: newContent }
                            setGeneratedPosts(updated)
                          } else {
                            setResult({ ...currentResult, content: newContent })
                          }
                        }}
                        rows={20}
                        className="font-mono text-sm"
                      />
                    ) : (
                      <div className="rounded-xl border border-dashed border-midnight/15 bg-[#F7F5EF] p-4">
                        <p className="text-sm text-midnight/55">
                          Click &quot;Edit Content&quot; to modify the post body
                        </p>
                      </div>
                    )}
                    {!editingContent && (
                      <Button
                        type="button"
                        onClick={() => setEditingContent(true)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Content
                      </Button>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 border-t border-midnight/10 pt-4">
                    <Button
                      onClick={() => handleSave("draft")}
                      disabled={isSaving}
                      variant="outline"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Saving..." : "Save as Draft"}
                    </Button>
                    <Button
                      onClick={() => handleSave("published")}
                      disabled={isSaving}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Publishing..." : "Publish"}
                    </Button>
                    <Button
                      onClick={() => window.open(`/blog/${currentSlug}`, '_blank')}
                      variant="outline"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preview Modal */}
          {showPreview && currentResult?.ok && body && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/40 p-4 backdrop-blur-sm">
              <Card className="max-h-[90vh] w-full max-w-4xl overflow-auto shadow-[0_30px_80px_rgba(11,26,44,0.18)]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Preview</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setShowPreview(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <article className="prose max-w-none">
                    <h1 className="font-heading font-bold tracking-tight text-midnight">{currentTitle}</h1>
                    <p className="text-midnight/65">{currentDescription}</p>
                    <ReactMarkdown
                      components={{
                        h2: ({ children }) => <h2 className="text-2xl font-heading font-bold text-midnight mt-8 mb-4">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-heading font-bold text-midnight mt-6 mb-3">{children}</h3>,
                        p: ({ children }) => <p className="text-midnight/80 mb-4 leading-relaxed">{children}</p>,
                        a: ({ href, children }) => (
                          <a href={href} className="text-gold-dark underline decoration-gold/50 underline-offset-2 transition-colors hover:text-midnight">
                            {children}
                          </a>
                        ),
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 text-midnight/80">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-midnight/80">{children}</ol>,
                        li: ({ children }) => <li className="ml-4">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-midnight">{children}</strong>,
                      }}
                    >
                      {body}
                    </ReactMarkdown>
                  </article>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
