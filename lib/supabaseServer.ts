import { createClient } from "@supabase/supabase-js"

// Type definitions for our tables
export interface Lead {
  id?: string
  created_at?: string
  name: string
  email: string
  phone?: string | null
  source: string
  tool_data?: any
  status?: string
  tags?: string[]
}

export interface Event {
  id?: string
  created_at?: string
  lead_id?: string | null
  type: string
  meta?: any
}

export interface Referral {
  id?: string
  created_at?: string
  lead_id: string
  referred_email: string
  status?: string
}

export interface Review {
  id?: string
  created_at?: string
  lead_id: string
  platform: string
  status?: string
}

// Safe Supabase client with no-op fallback
let supabaseClient: ReturnType<typeof createClient> | null = null

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  try {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  } catch (error) {
    console.warn("[Supabase] Failed to initialize client:", error)
  }
} else {
  console.warn(
    "[Supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set. Database features will be disabled."
  )
}

// Safe database operations
export const db = {
  // Leads
  async insertLead(lead: Lead) {
    if (!supabaseClient) {
      console.warn("[Supabase] insertLead: Database not configured")
      return { data: null, error: { message: "Database not configured" } }
    }

    try {
      const { data, error } = await supabaseClient
        .from("leads")
        .insert({
          name: lead.name,
          email: lead.email,
          phone: lead.phone || null,
          source: lead.source,
          tool_data: lead.tool_data || null,
          status: lead.status || "new",
          tags: lead.tags || [],
        } as any)
        .select()
        .single()

      return { data, error }
    } catch (error: any) {
      console.error("[Supabase] insertLead error:", error)
      return { data: null, error: { message: error.message || "Unknown error" } }
    }
  },

  async getLeads(limit = 50) {
    if (!supabaseClient) {
      return { data: [], error: null }
    }

    try {
      const { data, error } = await supabaseClient
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit)

      return { data: data || [], error }
    } catch (error: any) {
      console.error("[Supabase] getLeads error:", error)
      return { data: [], error: { message: error.message || "Unknown error" } }
    }
  },

  async getLeadsBySource(source: string) {
    if (!supabaseClient) {
      return { data: [], error: null }
    }

    try {
      const { data, error } = await supabaseClient
        .from("leads")
        .select("*")
        .eq("source", source)
        .order("created_at", { ascending: false })

      return { data: data || [], error }
    } catch (error: any) {
      console.error("[Supabase] getLeadsBySource error:", error)
      return { data: [], error: { message: error.message || "Unknown error" } }
    }
  },

  async updateLeadStatus(id: string, status: string) {
    if (!supabaseClient) {
      return { data: null, error: { message: "Database not configured" } }
    }

    try {
      const { data, error } = await ((supabaseClient as any)
        .from("leads")
        .update({ status })
        .eq("id", id)
        .select()
        .single())

      return { data, error }
    } catch (error: any) {
      console.error("[Supabase] updateLeadStatus error:", error)
      return { data: null, error: { message: error.message || "Unknown error" } }
    }
  },

  // Events
  async insertEvent(event: Event) {
    if (!supabaseClient) {
      console.warn("[Supabase] insertEvent: Database not configured")
      return { data: null, error: { message: "Database not configured" } }
    }

    try {
      const { data, error } = await supabaseClient
        .from("events")
        .insert({
          lead_id: event.lead_id || null,
          type: event.type,
          meta: event.meta || {},
        } as any)
        .select()
        .single()

      return { data, error }
    } catch (error: any) {
      console.error("[Supabase] insertEvent error:", error)
      return { data: null, error: { message: error.message || "Unknown error" } }
    }
  },

  async getEvents(limit = 100) {
    if (!supabaseClient) {
      return { data: [], error: null }
    }

    try {
      const { data, error } = await supabaseClient
        .from("events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit)

      return { data: data || [], error }
    } catch (error: any) {
      console.error("[Supabase] getEvents error:", error)
      return { data: [], error: { message: error.message || "Unknown error" } }
    }
  },

  // Referrals
  async insertReferral(referral: Referral) {
    if (!supabaseClient) {
      return { data: null, error: { message: "Database not configured" } }
    }

    try {
      const { data, error } = await supabaseClient
        .from("referrals")
        .insert({
          lead_id: referral.lead_id,
          referred_email: referral.referred_email,
          status: referral.status || "invited",
        } as any)
        .select()
        .single()

      return { data, error }
    } catch (error: any) {
      console.error("[Supabase] insertReferral error:", error)
      return { data: null, error: { message: error.message || "Unknown error" } }
    }
  },

  // Reviews
  async insertReview(review: Review) {
    if (!supabaseClient) {
      return { data: null, error: { message: "Database not configured" } }
    }

    try {
      const { data, error } = await supabaseClient
        .from("reviews")
        .insert({
          lead_id: review.lead_id,
          platform: review.platform,
          status: review.status || "requested",
        } as any)
        .select()
        .single()

      return { data, error }
    } catch (error: any) {
      console.error("[Supabase] insertReview error:", error)
      return { data: null, error: { message: error.message || "Unknown error" } }
    }
  },

  // Drip schedule queries
  async getDueDripEvents() {
    if (!supabaseClient) {
      return { data: [], error: null }
    }

    try {
      const now = new Date().toISOString()
      const { data, error } = await supabaseClient
        .from("events")
        .select("*")
        .eq("type", "drip_scheduled")
        .lte("meta->>scheduled_for", now)
        .eq("meta->>sent", "false")

      return { data: data || [], error }
    } catch (error: any) {
      console.error("[Supabase] getDueDripEvents error:", error)
      return { data: [], error: { message: error.message || "Unknown error" } }
    }
  },

  async markDripEventSent(eventId: string) {
    if (!supabaseClient) {
      return { data: null, error: { message: "Database not configured" } }
    }

    try {
      const { data, error } = await ((supabaseClient as any)
        .from("events")
        .update({
          meta: { sent: true, sent_at: new Date().toISOString() },
        })
        .eq("id", eventId)
        .select()
        .single())

      return { data, error }
    } catch (error: any) {
      console.error("[Supabase] markDripEventSent error:", error)
      return { data: null, error: { message: error.message || "Unknown error" } }
    }
  },
}

/**
 * SQL Schema for Supabase (run these in your Supabase SQL editor):
 *
 * -- Leads table
 * CREATE TABLE IF NOT EXISTS leads (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   name TEXT NOT NULL,
 *   email TEXT NOT NULL,
 *   phone TEXT,
 *   source TEXT NOT NULL,
 *   tool_data JSONB,
 *   status TEXT DEFAULT 'new',
 *   tags TEXT[] DEFAULT '{}'
 * );
 *
 * -- Events table
 * CREATE TABLE IF NOT EXISTS events (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
 *   type TEXT NOT NULL,
 *   meta JSONB DEFAULT '{}'
 * );
 *
 * -- Referrals table
 * CREATE TABLE IF NOT EXISTS referrals (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
 *   referred_email TEXT NOT NULL,
 *   status TEXT DEFAULT 'invited'
 * );
 *
 * -- Reviews table
 * CREATE TABLE IF NOT EXISTS reviews (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
 *   platform TEXT NOT NULL,
 *   status TEXT DEFAULT 'requested'
 * );
 *
 * -- Indexes for performance
 * CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
 * CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
 * CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
 * CREATE INDEX IF NOT EXISTS idx_events_lead_id ON events(lead_id);
 */

