"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Plus, Edit, Eye, Send, ArrowLeft, Save, X } from "lucide-react"
import RichTextEditor from "@/components/RichTextEditor"

interface NewsletterPost {
  id: string
  subject: string
  content_html: string
  status: "draft" | "sent"
  created_at: string
  sent_at?: string
}

export default function NewsletterAdmin() {
  const router = useRouter()
  const [posts, setPosts] = useState<NewsletterPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<NewsletterPost | null>(null)
  const [formSubject, setFormSubject] = useState("")
  const [formContent, setFormContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isSending, setIsSending] = useState<string | null>(null)
  const [previewPost, setPreviewPost] = useState<NewsletterPost | null>(null)

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/auth/verify")
        const data = await response.json()

        if (data.ok && data.authenticated) {
          setIsAuthenticated(true)
          fetchPosts()
        } else {
          router.push("/admin/login")
        }
      } catch (err) {
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/newsletter/posts")
      const data = await response.json()

      if (data.ok) {
        setPosts(data.posts || [])
      } else {
        setError(data.error || "Failed to load posts")
      }
    } catch (err: any) {
      setError(err.message || "Failed to load posts")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewPost = () => {
    setEditingPost(null)
    setFormSubject("")
    setFormContent("")
    setShowForm(true)
  }

  const handleEditPost = (post: NewsletterPost) => {
    setEditingPost(post)
    setFormSubject(post.subject)
    setFormContent(post.content_html)
    setShowForm(true)
  }

  const handleSavePost = async () => {
    if (!formSubject.trim() || !formContent.trim()) {
      setError("Subject and content are required")
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      let response
      if (editingPost) {
        // Update existing post
        response = await fetch(`/api/admin/newsletter/posts/${editingPost.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: formSubject,
            content_html: formContent,
          }),
        })
      } else {
        // Create new post
        response = await fetch("/api/admin/newsletter/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: formSubject,
            content_html: formContent,
            status: "draft",
          }),
        })
      }

      const data = await response.json()

      if (data.ok) {
        setShowForm(false)
        setEditingPost(null)
        setFormSubject("")
        setFormContent("")
        fetchPosts()
      } else {
        setError(data.error || "Failed to save post")
      }
    } catch (err: any) {
      setError(err.message || "Failed to save post")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSendNewsletter = async (postId: string) => {
    if (!confirm("Are you sure you want to send this newsletter to all subscribers? This action cannot be undone.")) {
      return
    }

    setIsSending(postId)
    setError(null)

    try {
      const response = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: postId }),
      })

      const data = await response.json()

      if (data.ok) {
        alert(`Newsletter sent successfully!\n\nTotal: ${data.sent.total}\nSuccess: ${data.sent.success}\nErrors: ${data.sent.errors}`)
        fetchPosts()
      } else {
        setError(data.error || "Failed to send newsletter")
      }
    } catch (err: any) {
      setError(err.message || "Failed to send newsletter")
    } finally {
      setIsSending(null)
    }
  }

  const handlePreview = (post: NewsletterPost) => {
    setPreviewPost(post)
  }

  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFAF6]">
        <div className="text-center">
          <p className="text-midnight/60">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FBFAF6] py-10 sm:py-12 md:py-16">
      {/* Atmospheric wash — faint gold radial, top-left (matches homepage hero). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 45% at 8% 6%, rgba(215,195,138,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Button
                variant="ghost"
                onClick={() => router.push("/admin/dashboard")}
                className="text-midnight/70 hover:text-midnight"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
              Admin
            </p>
            <h1
              className="mt-3 font-heading font-bold tracking-tight text-midnight"
              style={{
                fontSize: "clamp(1.85rem, 1.3rem + 1.8vw, 2.6rem)",
                lineHeight: 1.1,
              }}
            >
              Newsletter Management
            </h1>
            <div
              aria-hidden
              className="mt-4 h-px w-16"
              style={{
                background:
                  "linear-gradient(to right, rgba(215,195,138,0.85), transparent)",
              }}
            />
            <p className="mt-4 text-midnight/65">Create and send newsletters to your subscribers</p>
          </div>
          {!showForm && (
            <Button
              onClick={handleNewPost}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Newsletter
            </Button>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Create/Edit Form */}
        {showForm && (
          <Card className="mb-8 rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-heading font-bold tracking-tight text-midnight">
                  {editingPost ? "Edit Newsletter" : "Create Newsletter"}
                </CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowForm(false)
                    setEditingPost(null)
                    setFormSubject("")
                    setFormContent("")
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-midnight">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  placeholder="Newsletter subject line"
                  className="border-midnight/15 bg-[#FBFAF6] text-midnight placeholder-midnight/40 focus-visible:ring-gold/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content" className="text-midnight">
                  Content
                </Label>
                <RichTextEditor
                  value={formContent}
                  onChange={setFormContent}
                  placeholder="Enter your newsletter content..."
                />
                <p className="text-xs text-midnight/55 mt-2">
                  Use the toolbar to format text, add links, and create lists. The content will be saved as HTML.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSavePost}
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Draft"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                    setEditingPost(null)
                    setFormSubject("")
                    setFormContent("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preview Modal */}
        {previewPost && (
          <div className="fixed inset-0 bg-midnight/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl border border-midnight/10 bg-white shadow-[0_24px_60px_rgba(11,26,44,0.16)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-heading font-bold tracking-tight text-midnight">Preview</CardTitle>
                  <Button variant="ghost" onClick={() => setPreviewPost(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-midnight/55 mb-2">Subject:</p>
                  <p className="font-semibold text-midnight">{previewPost.subject}</p>
                </div>
                <div className="border-t border-midnight/10 pt-4">
                  <p className="text-sm text-midnight/55 mb-2">Content:</p>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: previewPost.content_html }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <Card className="rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)]">
              <CardContent className="p-12 text-center">
                <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                  <Mail className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                </span>
                <p className="text-midnight/60 mb-4">No newsletters yet</p>
                <Button
                  onClick={handleNewPost}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Newsletter
                </Button>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card
                key={post.id}
                className="rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-midnight/15 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-heading font-bold tracking-tight text-midnight mb-2">
                        {post.subject}
                      </CardTitle>
                      <CardDescription className="text-midnight/55">
                        Created: {new Date(post.created_at).toLocaleString()}
                        {post.sent_at && (
                          <> • Sent: {new Date(post.sent_at).toLocaleString()}</>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          post.status === "sent"
                            ? "bg-gold/15 text-gold-dark ring-1 ring-gold/30"
                            : "bg-midnight/[0.05] text-midnight/60 ring-1 ring-midnight/10"
                        }`}
                      >
                        {post.status === "sent" ? "Sent" : "Draft"}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(post)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    {post.status === "draft" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPost(post)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSendNewsletter(post.id)}
                          disabled={isSending === post.id}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          {isSending === post.id ? "Sending..." : "Send Newsletter"}
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
