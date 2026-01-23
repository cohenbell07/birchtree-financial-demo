# Newsletter Setup Guide

This guide explains how to set up the newsletter functionality for Birchtree Financial.

## ✅ What's Already Set Up

- **Newsletter API Route**: `/api/newsletter/subscribe` - Handles subscriptions
- **Newsletter Form**: Connected on the Resources page
- **Welcome Email**: Automatically sent to new subscribers
- **Database Functions**: Ready in `lib/supabaseServer.ts`
- **Error Handling**: Gracefully degrades if services aren't configured

## 📋 Setup Steps

### Step 1: Create Newsletter Subscribers Table in Supabase

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Run this SQL to create the table:

```sql
-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'active',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers(status);
```

4. **Set up Row Level Security (RLS)**:
   - Go to **Authentication** → **Policies**
   - For the `newsletter_subscribers` table, you can either:
     - Disable RLS (if using service role key)
     - Or create a policy that allows service role to insert/select

### Step 2: Add Environment Variables

Add these to your `.env.local` file:

```bash
# Resend (Email Service)
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM_ADDRESS="Birchtree Financial <no-reply@birchtreefinancial.ca>"

# Supabase (Database)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Step 3: Get Your Resend API Key

1. Sign up at https://resend.com
2. Verify your domain (`birchtreefinancial.ca`)
3. Go to **API Keys** in the dashboard
4. Create a new API key
5. Copy it to your `.env.local`

### Step 4: Test the Newsletter

1. Visit `/resources` page
2. Enter an email in the newsletter form
3. Click "Subscribe"
4. Check:
   - Success message appears
   - Email is saved in Supabase `newsletter_subscribers` table
   - Welcome email is sent (check Resend dashboard)

## 📧 What Happens When Someone Subscribes

1. **Email Validation**: Checks if email is valid format
2. **Duplicate Check**: Prevents duplicate subscriptions
3. **Database Storage**: Saves to `newsletter_subscribers` table
4. **Welcome Email**: Sends welcome email via Resend
5. **Event Tracking**: Creates event in `events` table for analytics

## 🎯 Sending Newsletters

### Option 1: Use Resend Dashboard (Recommended for Beginners)

1. Go to Resend dashboard
2. Create a new email
3. Use the subscriber list from Supabase
4. Send manually

### Option 2: Create Admin Newsletter Sender (Future Enhancement)

You can create an admin page that:
- Fetches all active subscribers from Supabase
- Allows you to compose and send newsletters
- Tracks open rates and clicks

## 📊 Viewing Subscribers

You can view all subscribers in Supabase:
1. Go to **Table Editor**
2. Select `newsletter_subscribers` table
3. View all active subscribers

Or query via SQL:
```sql
SELECT email, subscribed_at, status 
FROM newsletter_subscribers 
WHERE status = 'active'
ORDER BY subscribed_at DESC;
```

## 🔧 Troubleshooting

### Newsletter form shows error
- Check that `RESEND_API_KEY` is set in `.env.local`
- Check that `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
- Check browser console for errors

### Emails not sending
- Verify Resend API key is correct
- Check Resend dashboard for delivery status
- Verify domain is verified in Resend

### Database errors
- Ensure `newsletter_subscribers` table exists
- Check that RLS policies allow service role access
- Verify Supabase credentials are correct

## 💰 Costs

- **Resend**: Free for 3,000 emails/month, then $20/month for 50,000
- **Supabase**: Free tier covers newsletter storage easily

## ✅ Checklist

- [ ] Created `newsletter_subscribers` table in Supabase
- [ ] Added indexes for performance
- [ ] Set up RLS policies (or disabled RLS)
- [ ] Added `RESEND_API_KEY` to `.env.local`
- [ ] Added `EMAIL_FROM_ADDRESS` to `.env.local`
- [ ] Added `SUPABASE_URL` to `.env.local`
- [ ] Added `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- [ ] Verified domain in Resend
- [ ] Tested newsletter subscription
- [ ] Verified welcome email is sent

---

**Note**: The newsletter form will show a friendly error message if services aren't configured, so the site won't break. Once you add the keys, everything will work automatically!

