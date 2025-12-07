# Lead Generation & Automation System - Setup Guide

This document explains how to set up and use the lead generation system added to Birchtree Financial.

## Overview

The system includes:
- **Lead Capture**: Forms on Risk Profiler and Retirement Calculator tools
- **Email Automation**: Welcome emails, drip sequences, tool results
- **SMS Follow-up**: Optional SMS reminders (Twilio)
- **PDF Reports**: Automated PDF generation for tool results
- **Referral System**: Refer-a-friend functionality
- **Review Automation**: Automated review requests
- **Admin Dashboard**: Analytics and lead management
- **Outreach Framework**: Foundation for future lead source integrations

## Important: Non-Breaking Design

**All features are optional and gracefully degrade when not configured.**

- The site works perfectly even with **zero** environment variables set
- Lead capture forms show friendly error messages if backend is unavailable
- All API routes return safe responses instead of crashing
- Existing pages and functionality remain unchanged

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# ============================================
# SUPABASE (Optional but Recommended)
# ============================================
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# ============================================
# RESEND (Email Service - Optional but Recommended)
# ============================================
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM_ADDRESS="Birchtree Financial <no-reply@yourdomain.com>"

# ============================================
# TWILIO (SMS - Optional)
# ============================================
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_FROM_NUMBER=+1234567890

# ============================================
# GOOGLE REVIEW (Optional)
# ============================================
GOOGLE_REVIEW_URL=https://g.page/r/YOUR_GOOGLE_REVIEW_LINK

# ============================================
# OPENAI / AI (Optional)
# ============================================
OPENAI_API_KEY=your_openai_key

# ============================================
# ADMIN DASHBOARD (Optional)
# ============================================
ADMIN_DASHBOARD_SECRET=your_secret_key_here

# ============================================
# DRIP CRON (Optional)
# ============================================
DRIP_CRON_SECRET=your_cron_secret_here
```

## Database Setup (Supabase)

1. Create a Supabase project at https://supabase.com
2. Get your `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from project settings
3. Run the following SQL in your Supabase SQL editor:

```sql
-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  source TEXT NOT NULL,
  tool_data JSONB,
  status TEXT DEFAULT 'new',
  tags TEXT[] DEFAULT '{}'
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  meta JSONB DEFAULT '{}'
);

-- Referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  referred_email TEXT NOT NULL,
  status TEXT DEFAULT 'invited'
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  status TEXT DEFAULT 'requested'
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_lead_id ON events(lead_id);
```

## Email Setup (Resend)

1. Sign up at https://resend.com
2. Create an API key
3. Verify your domain (or use Resend's test domain for development)
4. Set `RESEND_API_KEY` and `EMAIL_FROM_ADDRESS` in `.env.local`

## SMS Setup (Twilio - Optional)

1. Sign up at https://twilio.com
2. Get your Account SID, Auth Token, and a phone number
3. Set the Twilio variables in `.env.local`
4. If not configured, SMS features will be disabled (no errors)

## Drip Email Automation

The drip system sends automated follow-up emails:
- **Day 0**: Welcome email with tool results
- **Day +2**: Educational email (RRSP/TFSA strategies)
- **Day +5**: Consultation reminder email
- **Day +3**: SMS follow-up (if phone provided and Twilio configured)

### Setting Up the Drip Cron

The `/api/drip/run` endpoint needs to be called periodically. Options:

#### Option 1: Vercel Cron (Recommended for Vercel deployments)

Add to `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/drip/run",
    "schedule": "0 */6 * * *"
  }]
}
```

#### Option 2: External Cron Service

Use a service like cron-job.org to hit:
```
https://yourdomain.com/api/drip/run
```

With header:
```
Authorization: Bearer YOUR_DRIP_CRON_SECRET
```

Every 6 hours.

## Admin Dashboard

Access at: `/admin/dashboard`

If `ADMIN_DASHBOARD_SECRET` is set, protect access by:
- Adding `?secret=YOUR_SECRET` to the URL, OR
- Sending `Authorization: Bearer YOUR_SECRET` header

If not set, the dashboard shows a configuration message.

## Features

### Lead Capture
- Appears after tool results on Risk Profiler and Retirement Calculator
- Captures: Name, Email, Phone (optional)
- Sends welcome email with results
- Schedules drip sequence automatically

### PDF Reports
- Automatically generated for tool results
- Sent as email attachment
- Branded with Birchtree colors and logo
- Falls back gracefully if PDF generation fails

### Referral System
- Page: `/referral`
- Allows users to refer friends
- Sends referral invitation emails
- Tracks referrals in database

### Review Automation
- API endpoint: `/api/leads/schedule-referral-and-review`
- Sends review request emails
- Links to Google Review (configurable)

### Outreach Framework
- API endpoint: `/api/outreach/send-test`
- Foundation for future lead source integrations
- Accepts list of recipients and sends outreach emails
- See code comments for extension points

## Testing Without Configuration

To test that everything works without env vars:

1. **Don't set any environment variables**
2. Run the dev server: `npm run dev`
3. Use the Risk Profiler or Retirement Calculator
4. Submit the lead capture form
5. You should see: "Email sending is temporarily unavailable. Please try again later."
6. The tool should still work normally

## Troubleshooting

### "Email sending is temporarily unavailable"
- Check `RESEND_API_KEY` is set correctly
- Verify domain is verified in Resend dashboard
- Check Resend API key has proper permissions

### "Analytics not configured yet"
- Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Ensure tables are created (see SQL above)
- Check Supabase project is active

### Drip emails not sending
- Verify `/api/drip/run` is being called by cron
- Check `DRIP_CRON_SECRET` matches if using auth
- Verify events table has `drip_scheduled` entries
- Check email service is configured

### PDF not generating
- Check console for PDF generation errors
- Verify pdfkit dependency is installed
- PDF generation is optional - emails still send without it

## Security Notes

- `SUPABASE_SERVICE_ROLE_KEY` should NEVER be exposed to client
- All database operations are server-side only
- Admin dashboard should be protected in production
- Consider adding proper authentication for admin routes

## Support

All code includes detailed comments explaining:
- What each feature does
- How to configure it
- What happens when it's not configured
- Extension points for future development

