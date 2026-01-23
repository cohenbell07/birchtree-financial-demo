# Admin Newsletter System Setup

This document describes the secure, admin-only newsletter system implemented for Birchtree Financial.

## ✅ What's Implemented

### 1. Admin Authentication
- **Login Page**: `/admin/login` - Email/password authentication
- **Session Management**: Secure cookie-based sessions (7-day expiry)
- **Admin Verification**: All routes verify user exists in `admin_users` table
- **Logout**: Proper session cleanup

### 2. Protected Routes
- **Middleware**: Protects all `/admin/*` routes (except `/admin/login`)
- **Server-Side Verification**: All API routes verify admin status
- **Automatic Redirects**: Unauthenticated users redirected to login

### 3. Newsletter Management UI
- **Page**: `/admin/newsletter`
- **Features**:
  - List all newsletter posts (draft + sent)
  - Create new newsletter posts
  - Edit draft posts
  - Preview newsletter content
  - Send newsletter to all subscribers
  - Prevent duplicate sends

### 4. API Routes
- `POST /api/admin/auth/login` - Admin login
- `GET /api/admin/auth/verify` - Verify authentication
- `POST /api/admin/auth/logout` - Logout
- `GET /api/admin/newsletter/posts` - List all posts
- `POST /api/admin/newsletter/posts` - Create new post
- `GET /api/admin/newsletter/posts/[id]` - Get single post
- `PATCH /api/admin/newsletter/posts/[id]` - Update post
- `POST /api/admin/newsletter/send` - Send newsletter to all subscribers

### 5. Database Functions
Added to `lib/supabaseServer.ts`:
- `getNewsletterPosts()` - Get all posts
- `getNewsletterPost(id)` - Get single post
- `createNewsletterPost()` - Create new post
- `updateNewsletterPost()` - Update post
- `markNewsletterPostSent()` - Mark post as sent
- `createNewsletterSend()` - Log individual sends
- `getNewsletterSends()` - Get send history

## 📋 Database Setup Required

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Admin users table (should already exist)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter posts table
CREATE TABLE IF NOT EXISTS newsletter_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subject TEXT NOT NULL,
  content_html TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent')),
  sent_at TIMESTAMP WITH TIME ZONE
);

-- Newsletter sends table (tracking)
CREATE TABLE IF NOT EXISTS newsletter_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  post_id UUID NOT NULL REFERENCES newsletter_posts(id) ON DELETE CASCADE,
  subscriber_email TEXT NOT NULL,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed')),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_newsletter_posts_status ON newsletter_posts(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_posts_created_at ON newsletter_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_post_id ON newsletter_sends(post_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_subscriber_email ON newsletter_sends(subscriber_email);
```

## 🔐 Security Features

1. **Server-Side Only**: All Supabase access uses service role key (never exposed to client)
2. **Admin Verification**: Every request verifies user is in `admin_users` table
3. **Session Management**: Secure HTTP-only cookies with 7-day expiry
4. **No Client-Side Writes**: All database writes happen server-side
5. **RLS Disabled**: As per requirements, RLS is intentionally disabled (using service role key)

## 🚀 Usage

### 1. Access Admin Panel
Navigate to `/admin/login` and sign in with your admin credentials.

### 2. Create Newsletter
1. Go to `/admin/newsletter`
2. Click "New Newsletter"
3. Enter subject and HTML content
4. Click "Save Draft"

### 3. Preview Newsletter
Click "Preview" on any post to see how it will look.

### 4. Send Newsletter
1. Click "Send Newsletter" on a draft post
2. Confirm the action
3. System will:
   - Fetch all active subscribers
   - Send email to each subscriber via Resend
   - Log each send in `newsletter_sends` table
   - Mark post as "sent"
   - Prevent duplicate sends

### 5. View Sent History
Sent posts show:
- Status: "Sent"
- Sent timestamp
- Cannot be edited or re-sent

## 📧 Email Sending

Newsletters are sent using:
- **Service**: Resend (configured in `.env.local`)
- **From Address**: `EMAIL_FROM_ADDRESS` environment variable
- **Content**: HTML content from `newsletter_posts.content_html`
- **Subject**: From `newsletter_posts.subject`

## 🔧 Environment Variables

Required environment variables (already in `example.env`):
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-side only)
- `RESEND_API_KEY` - Resend API key for sending emails
- `EMAIL_FROM_ADDRESS` - Email sender address

## 📝 Files Created/Modified

### Created:
- `app/admin/login/page.tsx` - Admin login page
- `app/admin/newsletter/page.tsx` - Newsletter management UI
- `app/api/admin/auth/login/route.ts` - Login API
- `app/api/admin/auth/verify/route.ts` - Auth verification API
- `app/api/admin/auth/logout/route.ts` - Logout API
- `app/api/admin/newsletter/posts/route.ts` - Posts CRUD API
- `app/api/admin/newsletter/posts/[id]/route.ts` - Single post API
- `app/api/admin/newsletter/send/route.ts` - Send newsletter API
- `middleware.ts` - Route protection middleware

### Modified:
- `lib/supabaseServer.ts` - Added newsletter database functions
- `app/admin/dashboard/page.tsx` - Added logout button and newsletter link

## ⚠️ Important Notes

1. **Admin Users**: Make sure your admin user ID is in the `admin_users` table
2. **Supabase Auth**: Admin users must be created in Supabase Auth first
3. **Email Content**: Newsletter content is HTML - ensure proper formatting
4. **Sending Limits**: Respect Resend rate limits when sending to large subscriber lists
5. **Session Expiry**: Sessions expire after 7 days - users will need to re-login

## 🐛 Troubleshooting

### Can't log in
- Verify user exists in Supabase Auth
- Verify user ID is in `admin_users` table
- Check browser console for errors
- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set

### Newsletter not sending
- Check `RESEND_API_KEY` is set
- Verify `EMAIL_FROM_ADDRESS` is configured
- Check Resend dashboard for delivery status
- Verify domain is verified in Resend

### Database errors
- Ensure all tables exist (run SQL above)
- Check Supabase credentials are correct
- Verify RLS is disabled (as per requirements)

