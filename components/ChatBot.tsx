"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, ChevronDown } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi there! I'm the Birchtree Financial assistant. I can help you learn about our services, meet the team, find the right tools, or answer general financial questions. How can I help you today?",
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (isOpen) scrollToBottom()
  }, [messages, isOpen, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false)
      // Small delay so the panel renders before focusing
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = { role: "user", content: text }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    try {
      // Send conversation history (skip the welcome message for context, but include it for continuity)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()
      const assistantMsg: Message = {
        role: "assistant",
        content:
          data.content ||
          "I'm sorry, I couldn't process that. Please try again or contact our team directly at (403) 556-7777.",
      }
      setMessages((prev) => [...prev, assistantMsg])

      if (!isOpen) setHasUnread(true)
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. You can reach our team directly at (403) 556-7777 or melissa.birch@birchtreefinancial.ca.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[400px] max-h-[70vh] sm:max-h-[550px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(160deg, #0d1f33 0%, #0B1A2C 50%, #091525 100%)",
              border: "1px solid rgba(215,195,138,0.12)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(215,195,138,0.08)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{
                borderBottom: "1px solid rgba(215,195,138,0.1)",
                background: "linear-gradient(135deg, rgba(215,195,138,0.04) 0%, transparent 100%)",
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(215,195,138,0.2) 0%, rgba(215,195,138,0.08) 100%)" }}>
                  <MessageCircle className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold font-heading">Birchtree Assistant</p>
                  <p className="text-white/30 text-[0.65rem]">Here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-200"
                aria-label="Close chat"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(215,195,138,0.15) transparent" }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={i > 0 ? { opacity: 0, y: 8 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-midnight font-medium"
                        : "text-white/80"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg, #D7C38A 0%, #C4B076 100%)",
                            boxShadow: "0 2px 8px rgba(215,195,138,0.2)",
                          }
                        : {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }
                    }
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                      <div className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(215,195,138,0.08)" }}
            >
              <div className="flex items-end space-x-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 resize-none focus:outline-none focus:border-gold/30 focus:bg-white/[0.07] transition-all duration-200"
                  style={{ fontSize: "16px", maxHeight: "80px" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: input.trim() && !isLoading
                      ? "linear-gradient(135deg, #D7C38A 0%, #C4B076 100%)"
                      : "rgba(255,255,255,0.05)",
                  }}
                  aria-label="Send message"
                >
                  <Send className={`w-4 h-4 ${input.trim() && !isLoading ? "text-midnight" : "text-white/30"}`} />
                </button>
              </div>
              <p className="text-[0.6rem] text-white/15 text-center mt-2">
                AI assistant — not a licensed financial advisor
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
        style={{
          background: isOpen
            ? "linear-gradient(135deg, #152439 0%, #0B1A2C 100%)"
            : "linear-gradient(135deg, #D7C38A 0%, #C4B076 100%)",
          boxShadow: isOpen
            ? "0 4px 20px rgba(11,26,44,0.4), 0 0 0 1px rgba(215,195,138,0.15)"
            : "0 4px 20px rgba(215,195,138,0.3), 0 8px 32px rgba(0,0,0,0.15)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6 text-white/70" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6 text-midnight" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread indicator */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
        )}
      </motion.button>
    </>
  )
}
