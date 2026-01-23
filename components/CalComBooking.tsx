"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Phone, MapPin } from "lucide-react"

// TypeScript declaration for Cal.com embed
declare global {
  interface Window {
    Cal?: (method: string, ...args: any[]) => void
  }
}

type MeetingType = "zoom" | "phone" | "in-person"

interface CalComBookingProps {
  // Cal.com username - will be set after account creation
  // Format: https://cal.com/username/event-slug
  calComUsername?: string
}

export default function CalComBooking({ calComUsername = "birchtree-financial" }: CalComBookingProps) {
  const [meetingType, setMeetingType] = useState<MeetingType>("zoom")
  const [calComLoaded, setCalComLoaded] = useState(false)
  const embedRef = useRef<HTMLDivElement>(null)

  // Event slugs - these will be created in Cal.com account
  // Update these after creating event types in Cal.com
  const eventSlugs = {
    zoom: "zoom-consultation", // Update this with your actual Cal.com event slug
    phone: "phone-consultation", // Update this with your actual Cal.com event slug
    "in-person": "in-person-meeting", // Update this with your actual Cal.com event slug
  }

  // Load Cal.com embed script (only once)
  useEffect(() => {
    if (calComLoaded) return

    const script = document.createElement("script")
    script.src = "https://app.cal.com/embed/embed.js"
    script.async = true
    script.onload = () => {
      setCalComLoaded(true)
    }
    document.body.appendChild(script)

    return () => {
      const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]')
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    }
  }, [calComLoaded])

  // Initialize or update embed when script loads or meeting type changes
  useEffect(() => {
    if (calComLoaded && embedRef.current && window.Cal) {
      const eventSlug = eventSlugs[meetingType]
      
      // Destroy existing embed if it exists
      try {
        window.Cal("destroy")
      } catch (e) {
        // Ignore errors if no embed exists yet
      }
      
      // Create new embed with updated meeting type
      setTimeout(() => {
        if (window.Cal && embedRef.current) {
          window.Cal("inline", {
            elementOrSelector: embedRef.current,
            calLink: `${calComUsername}/${eventSlug}`,
            layout: "month_view",
          })
        }
      }, 100)
    }
  }, [meetingType, calComLoaded, calComUsername])

  const meetingTypes = [
    {
      id: "zoom" as MeetingType,
      label: "Zoom Call",
      icon: Video,
      description: "Video consultation via Zoom",
    },
    {
      id: "phone" as MeetingType,
      label: "Phone Call",
      icon: Phone,
      description: "Phone consultation",
    },
    {
      id: "in-person" as MeetingType,
      label: "In-Person",
      icon: MapPin,
      description: "Office meeting at 4914 50 Ave, Olds, AB",
    },
  ]

  return (
    <Card className="glass card-shadow border-emerald/20 w-full max-w-full overflow-hidden">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl md:text-2xl font-heading text-midnight mb-4">
          Select Meeting Type
        </CardTitle>
        
        {/* Meeting Type Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {meetingTypes.map((type) => {
            const Icon = type.icon
            const isSelected = meetingType === type.id
            return (
              <button
                key={type.id}
                onClick={() => setMeetingType(type.id)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 text-left
                  ${isSelected
                    ? "border-emerald bg-emerald/10 shadow-md"
                    : "border-midnight/20 hover:border-emerald/40 hover:bg-emerald/5"
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <div className={`
                    p-2 rounded-lg flex-shrink-0
                    ${isSelected ? "bg-emerald/20 text-emerald" : "bg-midnight/10 text-midnight/70"}
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`
                      font-semibold text-sm sm:text-base mb-1
                      ${isSelected ? "text-midnight" : "text-midnight/80"}
                    `}>
                      {type.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-midnight/60 line-clamp-2">
                      {type.description}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 pt-0">
        {/* Cal.com Embed */}
        <div className="mt-4">
          <div
            ref={embedRef}
            className="cal-embed cal-embed-inline"
            style={{ width: "100%", minHeight: "700px", overflow: "hidden" }}
          />
          {!calComLoaded && (
            <div className="flex items-center justify-center h-[700px] bg-midnight/5 rounded-lg absolute inset-0">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald mx-auto mb-4"></div>
                <p className="text-midnight/70 text-sm">Loading calendar...</p>
              </div>
            </div>
          )}
        </div>

        {/* Instructions for setup - shown in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Setup Required:</strong> After creating your Cal.com account:
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Update <code className="bg-amber-100 px-1 rounded">calComUsername</code> in CalComBooking.tsx</li>
                <li>Create 3 event types in Cal.com: Zoom Consultation, Phone Consultation, In-Person Meeting</li>
                <li>Update <code className="bg-amber-100 px-1 rounded">eventSlugs</code> with your actual event slugs</li>
                <li>Configure each event type with Zoom/Phone/In-Person location settings</li>
              </ol>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

