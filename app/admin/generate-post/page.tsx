"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, CheckCircle2, AlertCircle, Sparkles, Eye, Save, Edit, ArrowLeft, X, Search, CheckSquare, Square } from "lucide-react"
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
    <div className="min-h-screen bg-white py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-midnight mb-2">
                AI Blog Post Generator
              </h1>
              <p className="text-midnight/70">
                Generate, edit, and manage blog posts
              </p>
            </div>
            <Button
              onClick={() => router.push("/admin/dashboard")}
              variant="outline"
              className="text-emerald"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          {/* Trending Topics Section */}
          <Card className="glass shadow-glow-hover border-emerald/20 mb-6">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg sm:text-xl font-heading text-midnight flex items-center">
                    <Search className="mr-2 h-5 w-5 text-emerald" />
                    Trending Topics
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-midnight/70 mt-2">
                    Discover trending Canadian financial topics and generate multiple posts at once
                  </CardDescription>
                </div>
                <Button
                  onClick={handleFetchTrending}
                  disabled={isLoadingTrending}
                  variant="outline"
                  size="sm"
                  className="text-emerald"
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
                        className={`px-3 py-2 text-sm rounded-md border transition-colors flex items-center gap-2 ${
                          selectedTrendingTopics.has(topicItem)
                            ? "bg-emerald/20 border-emerald text-emerald"
                            : "bg-emerald/10 hover:bg-emerald/20 border-emerald/20 text-emerald"
                        }`}
                      >
                        {selectedTrendingTopics.has(topicItem) ? (
                          <CheckSquare className="h-4 w-4" />
                        ) : (
                          <Square className="h-4 w-4" />
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
                        className="bg-gradient-to-r from-emerald to-emerald-light hover:shadow-glow text-white"
                      >
                        {isGenerating ? `Generating ${currentPostIndex + 1}/${selectedTrendingTopics.size}...` : `Generate ${selectedTrendingTopics.size} Posts`}
                      </Button>
                      <Button
                        onClick={() => setSelectedTrendingTopics(new Set())}
                        variant="outline"
                        size="sm"
                        className="text-emerald"
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
          <Card className="glass shadow-glow-hover border-emerald/20 mb-6">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl font-heading text-midnight flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-emerald" />
                Suggested Topics
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-midnight/70 mt-2">
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
                    className="px-3 py-1.5 text-sm bg-emerald/10 hover:bg-emerald/20 text-emerald rounded-md border border-emerald/20 hover:border-emerald/40 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate Form */}
          {!currentResult?.ok && (
            <Card className="glass shadow-glow-hover border-emerald/20">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl font-heading text-midnight flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-emerald" />
                  Generate New Post
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-midnight/70 mt-2">
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
                    className="w-full relative z-10 bg-gradient-to-r from-emerald to-emerald-light hover:shadow-glow text-white !text-white [&>*]:!text-white"
                  >
                    {isGenerating ? "Generating..." : "Generate Blog Post"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Multi-Post Navigation */}
          {multiPostMode && generatedPosts.length > 1 && (
            <Card className="glass shadow-glow-hover border-emerald/20 mt-6">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-midnight/70">
                      Post {currentPostIndex + 1} of {generatedPosts.length}
                    </p>
                    <p className="text-xs text-midnight/50 mt-1">
                      {generatedPosts[currentPostIndex]?.title || "Untitled"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setCurrentPostIndex(Math.max(0, currentPostIndex - 1))}
                      disabled={currentPostIndex === 0}
                      variant="outline"
                      size="sm"
                      className="text-emerald"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() => setCurrentPostIndex(Math.min(generatedPosts.length - 1, currentPostIndex + 1))}
                      disabled={currentPostIndex === generatedPosts.length - 1}
                      variant="outline"
                      size="sm"
                      className="text-emerald"
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
                    {currentResult.reason === "openai_not_configured" && (
                      <p className="text-xs text-red-700 mt-2">
                        To enable blog generation, set OPENAI_API_KEY in your environment variables.
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
            <Card className="glass shadow-glow-hover border-emerald/20 mt-6">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl font-heading text-midnight flex items-center">
                    <Edit className="mr-2 h-5 w-5 text-emerald" />
                    Edit Generated Post
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowPreview(!showPreview)}
                      variant="outline"
                      size="sm"
                      className="text-emerald"
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
                      className="text-emerald"
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
                      <span className="text-xs text-midnight/50">
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
                      <div className="p-4 bg-midnight/5 rounded border border-midnight/10">
                        <p className="text-sm text-midnight/70">
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
                        className="text-emerald"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Content
                      </Button>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      onClick={() => handleSave("draft")}
                      disabled={isSaving}
                      variant="outline"
                      className="text-emerald"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Saving..." : "Save as Draft"}
                    </Button>
                    <Button
                      onClick={() => handleSave("published")}
                      disabled={isSaving}
                      className="bg-gradient-to-r from-emerald to-emerald-light hover:shadow-glow text-white !text-white [&>*]:!text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Publishing..." : "Publish"}
                    </Button>
                    <Button
                      onClick={() => window.open(`/blog/${currentSlug}`, '_blank')}
                      variant="outline"
                      className="text-emerald"
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
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto glass shadow-glow-hover border-emerald/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-heading text-midnight">Preview</CardTitle>
                    <Button variant="ghost" onClick={() => setShowPreview(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <article className="prose max-w-none">
                    <h1>{currentTitle}</h1>
                    <p className="text-midnight/70">{currentDescription}</p>
                    <ReactMarkdown
                      components={{
                        h2: ({ children }) => <h2 className="text-2xl font-heading font-bold text-midnight mt-8 mb-4">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-heading font-bold text-midnight mt-6 mb-3">{children}</h3>,
                        p: ({ children }) => <p className="text-midnight/80 mb-4 leading-relaxed">{children}</p>,
                        a: ({ href, children }) => (
                          <a href={href} className="text-emerald hover:text-emerald-light underline">
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
