"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Mail, BarChart3 } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { Eyebrow } from "@/components/ui/eyebrow"

interface DashboardStats {
  totalLeads: number
  leadsBySource: Record<string, number>
  totalEvents: number
  recentLeads: Array<{
    id: string
    name: string
    email: string
    source: string
    created_at: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats")
        const data = await response.json()

        if (data.ok) {
          setStats(data.stats)
        } else {
          setError(data.message || "Failed to load statistics")
        }
      } catch (err) {
        setError("Unable to connect to analytics service")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <p className="text-midnight/60">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="max-w-md mx-auto px-4">
          <Card className="p-0">
            <CardContent className="p-8 text-center">
              <p className="text-midnight/65 mb-4">
                {error || "Analytics not configured yet."}
              </p>
              <p className="text-sm text-midnight/55">
                To enable analytics, configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment variables.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" })
      window.location.href = "/admin/login"
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  const statCards = [
    { icon: Users, label: "Total Leads", value: stats.totalLeads },
    { icon: BarChart3, label: "Total Events", value: stats.totalEvents },
    { icon: TrendingUp, label: "Risk Profiler", value: stats.leadsBySource["risk-profiler"] || 0 },
    { icon: Mail, label: "Retirement Calc", value: stats.leadsBySource["retirement-calculator"] || 0 },
  ]

  return (
    <div className="min-h-screen bg-paper py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Lead Generation</Eyebrow>
              <h1
                className="mt-4 font-heading font-bold leading-[1.1] tracking-tight text-midnight"
                style={{ fontSize: "clamp(1.85rem,1.3rem+1.8vw,2.6rem)" }}
              >
                Admin Dashboard
              </h1>
              <div
                aria-hidden
                className="mt-4 h-px w-16"
                style={{ background: "linear-gradient(to right, rgba(215,195,138,0.85), transparent)" }}
              />
              <p className="mt-4 text-midnight/60">Lead generation and analytics overview</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => window.location.href = "/admin/generate-post"}
                variant="outline"
              >
                Blog Posts
              </Button>
              <Button
                onClick={() => window.location.href = "/admin/newsletter"}
                variant="outline"
              >
                Newsletter
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
              >
                Logout
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Stats Grid */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {statCards.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-midnight/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-midnight/15 hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-midnight/55">{label}</p>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-midnight/[0.04] ring-1 ring-midnight/[0.06]">
                    <Icon className="h-[20px] w-[20px] text-gold-dark" strokeWidth={1.6} />
                  </span>
                </div>
                <div className="mt-4 font-heading text-3xl font-bold tracking-tight text-midnight">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Recent Leads */}
        <Reveal delay={0.1}>
          <Card>
            <CardHeader className="p-6">
              <CardTitle className="font-heading text-[1.6rem] font-bold leading-[1.18] tracking-tight text-midnight">
                Recent Leads
              </CardTitle>
              <CardDescription className="text-sm text-midnight/55">
                Latest lead submissions from tools
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              {stats.recentLeads.length === 0 ? (
                <p className="text-midnight/55 text-center py-8">No leads yet</p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-midnight/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-midnight/10 bg-[#F7F5EF]">
                        <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-midnight/55">Name</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-midnight/55">Email</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-midnight/55">Source</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-midnight/55">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-midnight/[0.06]">
                      {stats.recentLeads.map((lead) => (
                        <tr key={lead.id} className="transition hover:bg-midnight/[0.02]">
                          <td className="py-3 px-4 text-midnight">{lead.name}</td>
                          <td className="py-3 px-4 text-midnight/65">{lead.email}</td>
                          <td className="py-3 px-4">
                            <span className="inline-block rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-gold-dark ring-1 ring-gold/30">
                              {lead.source}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-midnight/55 text-xs">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  )
}
