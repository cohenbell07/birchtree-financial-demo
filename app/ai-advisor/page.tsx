"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import PageHeader from "@/components/layout/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, AlertTriangle } from "lucide-react"

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI financial advisor assistant. I can provide general financial information and answer questions about financial planning concepts. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content || "I apologize, but I couldn't generate a response. Please try again." },
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
    <div>
      <PageHeader
        title="AI Financial Advisor"
        subtitle="Get general financial information and answers to your questions"
      />

      <section className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald to-teal" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Card className="glass border-amber-200/50 bg-amber-50/50 shadow-glow-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs sm:text-sm text-midnight/90">
                      <p className="font-semibold mb-1">Important Disclaimer</p>
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
                </CardContent>
              </Card>
            </motion.div>

            {/* Chat Interface */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-[500px] sm:h-[600px] flex flex-col glass shadow-glow-hover border-emerald/20">
                <CardHeader className="border-b border-emerald/20">
                  <CardTitle className="text-lg sm:text-xl font-heading text-midnight">
                    Chat with AI Advisor
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-3 sm:p-4 ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-emerald to-emerald-light text-white shadow-glow"
                              : "glass border-emerald/20 text-midnight"
                          }`}
                        >
                          <p className="text-sm sm:text-base whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-cream-dark rounded-lg p-4">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-slate rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-slate rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-slate rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="border-t p-3 sm:p-4 space-y-2 sm:space-y-3"
                  >
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a question about financial planning..."
                      rows={2}
                      className="resize-none text-sm sm:text-base"
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
                      className="relative z-10 w-full text-white"
                    >
                      {isLoading ? "Thinking..." : "Send Message"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-center"
            >
              <Card className="glass shadow-glow-hover border-emerald/20">
                <CardContent className="pt-6">
                  <p className="text-base sm:text-lg text-midnight/80 mb-3 sm:mb-4">
                    Need personalized financial advice? Schedule a consultation
                    with one of our expert advisors.
                  </p>
                  <Button asChild size="lg" className="relative z-10 bg-gradient-to-r from-emerald to-emerald-light hover:shadow-glow text-white [&>*]:text-white">
                    <a href="/contact" className="text-white">Schedule a Consultation</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

