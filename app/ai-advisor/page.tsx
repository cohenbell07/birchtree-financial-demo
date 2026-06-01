"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Send, AlertTriangle, Sparkles } from "lucide-react"

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI financial advisor assistant. I can provide general financial information and answer questions about financial advisory concepts. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userMessage,
          type: "chat",
        }),
      })

      const data = await response.json()
      const content = data.content || "I apologize, but I couldn't generate a response. Please try again."

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content },
      ])
    } catch (error) {
      console.error("Error getting AI response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm experiencing technical difficulties. Please try again later or contact our team for assistance.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Conversational"
        title="AI Financial Advisor"
        subtitle="Get general financial information and answers to your questions."
      />

      <Section tone="paper" topRule rhythm="tight">
        <Container size="narrow">
            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="rounded-2xl border border-midnight/10 bg-white p-6">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                    <AlertTriangle className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                  </span>
                  <div className="text-xs sm:text-sm leading-relaxed text-midnight/65">
                    <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                      Important Disclaimer
                    </p>
                    <p>
                      This AI assistant provides general Canadian financial information
                      only and does not constitute personalized financial,
                      legal, or tax advice. It cannot provide specific
                      investment recommendations, guarantees, or legal/tax
                      guidance. For personalized advice tailored to your
                      specific Canadian financial situation, please consult with a qualified
                      financial advisor.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Chat Interface */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="flex h-[500px] flex-col overflow-hidden rounded-2xl border border-midnight/10 bg-white shadow-[0_18px_40px_rgba(11,26,44,0.06)] sm:h-[600px]">
                <CardHeader className="flex-shrink-0 border-b border-midnight/10 bg-white">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-midnight/[0.04] ring-1 ring-midnight/[0.05]">
                      <Sparkles className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                    </span>
                    <CardTitle className="font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                      Chat with AI Advisor
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
                  {/* Messages */}
                  <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#F7F5EF] p-3 sm:space-y-4 sm:p-6">
                    {messages.map((message, index) => {
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${
                            message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] break-words rounded-2xl p-3 sm:max-w-[80%] sm:p-4 ${
                              message.role === "user"
                                ? "bg-midnight text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)]"
                                : "border border-midnight/10 bg-white text-midnight"
                            }`}
                            style={{
                              wordBreak: 'break-word',
                              overflowWrap: 'break-word',
                              hyphens: 'auto'
                            }}
                          >
                            <p
                              className="whitespace-pre-wrap text-sm leading-relaxed sm:text-base"
                              style={{
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                                hyphens: 'auto'
                              }}
                            >
                              {message.content}
                            </p>
                          </div>
                        </motion.div>
                      )
                    })}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="rounded-2xl border border-midnight/10 bg-white p-4">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gold-dark" />
                            <div
                              className="h-2 w-2 animate-bounce rounded-full bg-gold-dark"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="h-2 w-2 animate-bounce rounded-full bg-gold-dark"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="flex-shrink-0 space-y-2 border-t border-midnight/10 bg-white p-3 sm:space-y-3 sm:p-4"
                  >
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a question about financial advisory services..."
                      rows={2}
                      className="min-h-[44px] w-full resize-none rounded-xl border-midnight/15 bg-white text-base text-midnight transition-colors placeholder:text-midnight/40 focus-visible:border-midnight/30 focus-visible:ring-midnight/10"
                      style={{
                        fontSize: '16px'
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSubmit(e)
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="relative z-10 w-full rounded-xl bg-midnight px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(11,26,44,0.18)] transition-all duration-300 hover:bg-midnight-light hover:shadow-[0_10px_28px_rgba(11,26,44,0.24)]"
                    >
                      {isLoading ? "Thinking..." : "Send Message"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

        </Container>
      </Section>
    </>
  )
}
