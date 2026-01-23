"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, CheckCircle2, AlertCircle, Sparkles, Eye, Save, Edit, ArrowLeft, X } from "lucide-react"
import ReactMarkdown from "react-markdown"

// Blog post suggestions
const blogSuggestions = [
  "RRSP contribution limits 2025",
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
  const [secret, setSecret] = useState("")
  const [publishDate, setPublishDate] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [editingContent, setEditingContent] = useState(false)
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

  const { frontmatter, body } = result?.content ? parseContent(result.content) : { frontmatter: {}, body: "" }
  const currentTitle = result?.title || frontmatter.title || ""
  const currentDescription = result?.description || frontmatter.description || ""
  const currentPublishedAt = result?.publishedAt || frontmatter.publishedAt || defaultDate
  const currentTags = result?.tags || frontmatter.tags || []
  const currentSlug = result?.slug || frontmatter.slug || ""
  const currentStatus = frontmatter.status || "draft"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setResult(null)
    setShowPreview(false)
    setEditingContent(false)

    try {
      const response = await fetch("/api/admin/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          topic, 
          secret,
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

  const handleSave = async (status: "draft" | "published" = "draft") => {
    if (!result?.content) return

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
        setResult({ ...result, content: updatedContent })
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
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

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
          {!result?.ok && (
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
                      placeholder="e.g., RRSP deadlines for 2024"
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

                  <div className="space-y-2">
                    <Label htmlFor="secret">Admin Secret (if configured)</Label>
                    <Input
                      id="secret"
                      type="password"
                      value={secret}
                      onChange={(e) => setSecret(e.target.value)}
                      placeholder="Enter ADMIN_DASHBOARD_SECRET if set"
                      className="text-sm sm:text-base"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isGenerating || !topic}
                    className="w-full relative z-10 bg-gradient-to-r from-emerald to-emerald-light hover:shadow-glow text-white"
                  >
                    {isGenerating ? "Generating..." : "Generate Blog Post"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Error Display */}
          {result && !result.ok && (
            <Card className="bg-red-50 border-red-200 mt-6">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-heading font-bold text-red-900 mb-2">
                      Generation Failed
                    </h3>
                    <p className="text-sm text-red-800">
                      {result.message || result.reason || "Unable to generate post"}
                    </p>
                    {result.reason === "openai_not_configured" && (
                      <p className="text-xs text-red-700 mt-2">
                        To enable blog generation, set OPENAI_API_KEY in your environment variables.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generated Post Editor */}
          {result?.ok && result.content && (
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
                          const newContent = result.content!.replace(
                            /title:\s*"[^"]*"/,
                            `title: "${e.target.value.replace(/"/g, '\\"')}"`
                          )
                          setResult({ ...result, title: e.target.value, content: newContent })
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
                          const newContent = result.content!.replace(
                            /description:\s*"[^"]*"/,
                            `description: "${e.target.value.replace(/"/g, '\\"')}"`
                          )
                          setResult({ ...result, description: e.target.value, content: newContent })
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
                          const newContent = result.content!.replace(
                            /publishedAt:\s*"[^"]*"/,
                            `publishedAt: "${e.target.value}"`
                          )
                          setResult({ ...result, publishedAt: e.target.value, content: newContent })
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
                          const { frontmatter: fm } = parseContent(result.content!)
                          const newContent = `---
title: "${fm.title || currentTitle}"
description: "${fm.description || currentDescription}"
publishedAt: "${fm.publishedAt || currentPublishedAt}"
tags: ${JSON.stringify(fm.tags || currentTags)}
slug: "${fm.slug || currentSlug}"
status: "${fm.status || currentStatus}"
---

${e.target.value}`
                          setResult({ ...result, content: newContent })
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
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Saving..." : "Save as Draft"}
                    </Button>
                    <Button
                      onClick={() => handleSave("published")}
                      disabled={isSaving}
                      className="bg-gradient-to-r from-emerald to-emerald-light hover:shadow-glow text-white"
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
          {showPreview && result?.ok && body && (
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
