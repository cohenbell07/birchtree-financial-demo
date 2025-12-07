"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function AutoplayHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<any>(null)
  const [isMuted, setIsMuted] = useState(true)

  const videoUrl = "https://customer-wlq98rw65iepfe8g.cloudflarestream.com/85836e811a0dc245bad0e3996aa99695/manifest/video.m3u8"

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Check if browser supports HLS natively (Safari, iOS)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    // If not Safari/iOS, load hls.js for HLS support
    if (!isSafari && !isIOS) {
      import("hls.js")
        .then((HlsModule) => {
          const Hls = HlsModule.default || HlsModule
          if (Hls.isSupported()) {
            const hls = new Hls({
              enableWorker: true,
              lowLatencyMode: false,
            })
            hlsRef.current = hls
            hls.loadSource(videoUrl)
            hls.attachMedia(video)

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              video.play().catch(() => {
                // Autoplay was prevented, but video will play when user interacts
              })
            })

            hls.on(Hls.Events.ERROR, (event, data) => {
              if (data.fatal) {
                switch (data.type) {
                  case Hls.ErrorTypes.NETWORK_ERROR:
                    hls.startLoad()
                    break
                  case Hls.ErrorTypes.MEDIA_ERROR:
                    hls.recoverMediaError()
                    break
                  default:
                    hls.destroy()
                    // Fallback to native HLS if available
                    if (video.canPlayType("application/vnd.apple.mpegurl")) {
                      video.src = videoUrl
                      video.play().catch(() => {})
                    }
                    break
                }
              }
            })
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // Fallback to native HLS
            video.src = videoUrl
            video.play().catch(() => {
              // Autoplay was prevented
            })
          }
        })
        .catch(() => {
          // hls.js failed to load, try native HLS
          if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = videoUrl
            video.play().catch(() => {
              // Autoplay was prevented
            })
          }
        })
    } else {
      // Safari/iOS - use native HLS
      video.src = videoUrl
      video.play().catch(() => {
        // Autoplay was prevented
      })
    }

    // Cleanup function
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }
    }
  }, [videoUrl])

  const toggleMute = () => {
    const video = videoRef.current
    if (video) {
      video.muted = !video.muted
      setIsMuted(video.muted)
    }
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-glow card-shadow aspect-video bg-midnight">
            {/* Video element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload="auto"
              aria-label="Birchtree Financial promotional video"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-midnight/20 pointer-events-none" />

            {/* Volume toggle button */}
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-midnight/70 hover:bg-midnight/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 z-10 shadow-lg"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              ) : (
                <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

