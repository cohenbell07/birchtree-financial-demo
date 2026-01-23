"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Mail, BarChart3 } from "lucide-react"

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-midnight/70">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md mx-auto px-4">
          <Card className="glass shadow-glow-hover border-emerald/20">
            <CardContent className="p-6 text-center">
              <p className="text-midnight/70 mb-4">
                {error || "Analytics not configured yet."}
              </p>
              <p className="text-sm text-midnight/50">
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

  return (
    <div className="min-h-screen bg-white py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-midnight mb-2">
              Admin Dashboard
            </h1>
            <p className="text-midnight/70">Lead generation and analytics overview</p>
          </div>
          <div className="flex gap-2">
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="glass shadow-glow-hover border-emerald/20">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm sm:text-base font-medium text-midnight/70">
                  Total Leads
                </CardTitle>
                <Users className="h-5 w-5 text-emerald" />
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-midnight">
                {stats.totalLeads}
              </div>
            </CardContent>
          </Card>

          <Card className="glass shadow-glow-hover border-emerald/20">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm sm:text-base font-medium text-midnight/70">
                  Total Events
                </CardTitle>
                <BarChart3 className="h-5 w-5 text-emerald" />
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-midnight">
                {stats.totalEvents}
              </div>
            </CardContent>
          </Card>

          <Card className="glass shadow-glow-hover border-emerald/20">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm sm:text-base font-medium text-midnight/70">
                  Risk Profiler
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-emerald" />
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-midnight">
                {stats.leadsBySource["risk-profiler"] || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="glass shadow-glow-hover border-emerald/20">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm sm:text-base font-medium text-midnight/70">
                  Retirement Calc
                </CardTitle>
                <Mail className="h-5 w-5 text-emerald" />
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-midnight">
                {stats.leadsBySource["retirement-calculator"] || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Leads */}
        <Card className="glass shadow-glow-hover border-emerald/20">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl font-heading text-midnight">
              Recent Leads
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-midnight/70">
              Latest lead submissions from tools
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            {stats.recentLeads.length === 0 ? (
              <p className="text-midnight/70 text-center py-8">No leads yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-midnight/10">
                      <th className="text-left py-2 px-2 text-midnight/70 font-medium">Name</th>
                      <th className="text-left py-2 px-2 text-midnight/70 font-medium">Email</th>
                      <th className="text-left py-2 px-2 text-midnight/70 font-medium">Source</th>
                      <th className="text-left py-2 px-2 text-midnight/70 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-midnight/5">
                        <td className="py-2 px-2 text-midnight">{lead.name}</td>
                        <td className="py-2 px-2 text-midnight/70">{lead.email}</td>
                        <td className="py-2 px-2">
                          <span className="inline-block px-2 py-1 bg-emerald/10 text-emerald text-xs rounded">
                            {lead.source}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-midnight/60 text-xs">
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
      </div>
    </div>
  )
}

