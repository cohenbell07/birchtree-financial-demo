"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { MessageCircle, X } from "lucide-react"

// Heavy panel (framer-motion + chat history) is only loaded once the user
// either opens the launcher or the browser is idle. Keeps the static button
// visible immediately and removes ~30kB+ of JS from the initial bundle on
// every page.
const ChatBotPanel = dynamic(() => import("./ChatBotPanel"), {
  ssr: false,
  loading: () => null,
})

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)

  // Preload the panel during browser idle time so the first open is instant,
  // but never block initial paint or hydration.
  useEffect(() => {
    if (hasMounted) return
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number
    }
    const cb = () => setHasMounted(true)
    if (w.requestIdleCallback) {
      w.requestIdleCallback(cb)
    } else {
      window.setTimeout(cb, 2500)
    }
  }, [hasMounted])

  const open = () => {
    setHasMounted(true)
    setIsOpen(true)
    setHasUnread(false)
  }

  return (
    <>
      {hasMounted && (
        <ChatBotPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onUnread={() => setHasUnread(true)}
        />
      )}

      <button
        onClick={isOpen ? () => setIsOpen(false) : open}
        onMouseEnter={() => setHasMounted(true)}
        onFocus={() => setHasMounted(true)}
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
        style={{
          background: isOpen
            ? "linear-gradient(135deg, #152439 0%, #0B1A2C 100%)"
            : "linear-gradient(135deg, #D7C38A 0%, #C4B076 100%)",
          boxShadow: isOpen
            ? "0 4px 20px rgba(11,26,44,0.4), 0 0 0 1px rgba(215,195,138,0.15)"
            : "0 4px 20px rgba(215,195,138,0.3), 0 8px 32px rgba(0,0,0,0.15)",
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white/70" />
        ) : (
          <MessageCircle className="w-6 h-6 text-midnight" />
        )}

        {hasUnread && !isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>
    </>
  )
}
