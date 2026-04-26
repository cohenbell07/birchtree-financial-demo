"use client"

import { useEffect, useRef, useState } from "react"

const POSTER =
  "https://customer-wlq98rw65iepfe8g.cloudflarestream.com/85836e811a0dc245bad0e3996aa99695/thumbnails/thumbnail.jpg"

const SRC =
  "https://customer-wlq98rw65iepfe8g.cloudflarestream.com/85836e811a0dc245bad0e3996aa99695/iframe" +
  "?autoplay=true&muted=true&loop=true&controls=false" +
  `&poster=${encodeURIComponent(POSTER)}`

/**
 * AutoplayHeroVideo — defers the actual Cloudflare Stream iframe until the
 * section enters the viewport. Previously the iframe was created on mount
 * with `preload=true` + `autoplay=true`, which started buffering several MB
 * of HLS chunks immediately on every home-page load even if the user never
 * scrolled to it. Now we render a static poster (thumbnail JPEG, served by
 * the same CDN, ~30kB) and swap it for the live iframe only when the section
 * is in view.
 */
export default function AutoplayHeroVideo() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el || typeof IntersectionObserver === "undefined") {
      // No IntersectionObserver — fall back to static poster + click-to-play.
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShowVideo(true)
            io.disconnect()
            break
          }
        }
      },
      { rootMargin: "200px 0px" }, // start loading shortly before in view
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Our Story
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-midnight sm:text-3xl md:text-4xl lg:text-5xl">
            Trusted. Local. Exceptional.
          </h2>
        </div>

        <div className="mx-auto max-w-6xl">
          <div
            ref={wrapperRef}
            className="relative aspect-video overflow-hidden rounded-2xl bg-midnight"
            style={{
              boxShadow:
                "0 24px 64px rgba(11,26,44,0.18), 0 4px 16px rgba(11,26,44,0.10)",
              outline: "1px solid rgba(11,26,44,0.08)",
            }}
          >
            {showVideo ? (
              <iframe
                src={SRC}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
                title="Birchtree Financial promotional video"
                style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
              />
            ) : (
              <button
                type="button"
                onClick={() => setShowVideo(true)}
                aria-label="Play video"
                className="group absolute inset-0 h-full w-full"
                style={{
                  backgroundImage: `url(${POSTER})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 bg-midnight/15 transition-colors group-hover:bg-midnight/5"
                />
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-midnight shadow-xl transition-transform group-hover:scale-105 sm:h-20 sm:w-20"
                >
                  <svg
                    width="22"
                    height="26"
                    viewBox="0 0 22 26"
                    fill="currentColor"
                    aria-hidden
                    className="ml-1"
                  >
                    <path d="M0 0 L22 13 L0 26 Z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
