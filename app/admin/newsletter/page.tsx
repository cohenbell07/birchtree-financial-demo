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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-midnight/70">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-midnight mb-2">
              Newsletter Management
            </h1>
            <p className="text-midnight/70">Create and send newsletters to your subscribers</p>
          </div>
          {!showForm && (
            <Button
              onClick={handleNewPost}
              className="bg-emerald hover:bg-emerald/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Newsletter
            </Button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
            {error}
          </div>
        )}

        {/* Create/Edit Form */}
        {showForm && (
          <Card className="mb-8 glass shadow-glow-hover border-emerald/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-heading text-midnight">
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
                  className="bg-white"
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
                <p className="text-xs text-midnight/50 mt-2">
                  Use the toolbar to format text, add links, and create lists. The content will be saved as HTML.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSavePost}
                  disabled={isSaving}
                  className="bg-emerald hover:bg-emerald/90 text-white"
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto glass shadow-glow-hover border-emerald/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-heading text-midnight">Preview</CardTitle>
                  <Button variant="ghost" onClick={() => setPreviewPost(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-midnight/70 mb-2">Subject:</p>
                  <p className="font-semibold text-midnight">{previewPost.subject}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-midnight/70 mb-2">Content:</p>
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
            <Card className="glass shadow-glow-hover border-emerald/20">
              <CardContent className="p-12 text-center">
                <Mail className="h-12 w-12 text-midnight/30 mx-auto mb-4" />
                <p className="text-midnight/70 mb-4">No newsletters yet</p>
                <Button
                  onClick={handleNewPost}
                  className="bg-emerald hover:bg-emerald/90 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Newsletter
                </Button>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="glass shadow-glow-hover border-emerald/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-heading text-midnight mb-2">
                        {post.subject}
                      </CardTitle>
                      <CardDescription className="text-midnight/70">
                        Created: {new Date(post.created_at).toLocaleString()}
                        {post.sent_at && (
                          <> • Sent: {new Date(post.sent_at).toLocaleString()}</>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          post.status === "sent"
                            ? "bg-emerald/10 text-emerald"
                            : "bg-midnight/10 text-midnight/70"
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
                          className="bg-emerald hover:bg-emerald/90 text-white"
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

