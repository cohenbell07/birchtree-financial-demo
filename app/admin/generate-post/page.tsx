"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, CheckCircle2, AlertCircle } from "lucide-react"

export default function GeneratePostPage() {
  const [topic, setTopic] = useState("")
  const [secret, setSecret] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<{
    ok: boolean
    slug?: string
    title?: string
    content?: string
    message?: string
    reason?: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, secret }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        ok: false,
        message: "Failed to generate post. Please try again.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-white py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-midnight mb-2">
              AI Blog Post Generator
            </h1>
            <p className="text-midnight/70">
              Generate blog posts using AI. Posts are automatically saved to /content/blog/
            </p>
          </div>

          <Card className="glass shadow-glow-hover border-emerald/20">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl font-heading text-midnight flex items-center">
                <FileText className="mr-2 h-5 w-5 text-emerald" />
                Generate New Post
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-midnight/70 mt-2">
                Enter a topic and the AI will generate a complete blog post with frontmatter
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

              {result && (
                <div className="mt-6 sm:mt-8">
                  {result.ok ? (
                    <Card className="bg-emerald/10 border-emerald/30">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-emerald flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <h3 className="text-lg font-heading font-bold text-midnight mb-2">
                              Post Generated Successfully!
                            </h3>
                            <p className="text-sm text-midnight/70 mb-4">
                              <strong>Title:</strong> {result.title}
                            </p>
                            <p className="text-sm text-midnight/70 mb-4">
                              <strong>Slug:</strong> {result.slug}
                            </p>
                            {result.content && (
                              <div className="mt-4">
                                <Label className="text-sm font-semibold mb-2 block">Generated Content:</Label>
                                <Textarea
                                  value={result.content}
                                  readOnly
                                  className="font-mono text-xs h-64 bg-white/50"
                                />
                              </div>
                            )}
                            <div className="mt-4">
                              <Button asChild size="sm" className="bg-gradient-to-r from-emerald to-emerald-light hover:from-emerald-light hover:to-emerald text-white [&>*]:text-white border-0">
                                <a href={`/blog/${result.slug}`} target="_blank">
                                  View Post
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-red-50 border-red-200">
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
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

