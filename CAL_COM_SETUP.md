# Cal.com Setup Guide

This guide will help you configure Cal.com integration for the Birchtree Financial website.

## Step 1: Create Cal.com Account

1. Go to [cal.com](https://cal.com) and sign up for an account
2. Choose a username (e.g., `birchtree-financial`)
3. Complete the account setup

## Step 2: Create Event Types

You need to create 3 event types in Cal.com:

### 1. Zoom Consultation
- **Event Name**: "Zoom Consultation" or "Video Consultation"
- **Duration**: Set your preferred duration (e.g., 30 minutes, 60 minutes)
- **Location**: Select "Zoom" as the location type
- **Event Slug**: Note the slug (e.g., `zoom-consultation`)

### 2. Phone Consultation
- **Event Name**: "Phone Consultation"
- **Duration**: Set your preferred duration
- **Location**: Select "Phone Call" or "Phone" as the location type
- **Event Slug**: Note the slug (e.g., `phone-consultation`)

### 3. In-Person Meeting
- **Event Name**: "In-Person Meeting" or "Office Consultation"
- **Duration**: Set your preferred duration
- **Location**: Select "In Person" and add your address:
  - Address: `4914 50 Ave, Olds, AB T4H 1P5`
- **Event Slug**: Note the slug (e.g., `in-person-meeting`)

## Step 3: Configure Email Notifications

For each event type:
1. Go to Event Settings → Notifications
2. Enable:
   - ✅ Email confirmation to attendees
   - ✅ Calendar invite (.ics file) to attendees
   - ✅ Email notification to you (the host)
   - ✅ Calendar sync (adds to your calendar automatically)

## Step 4: Update Website Code

After creating your Cal.com account and event types:

1. Open `/components/CalComBooking.tsx`
2. Update the `calComUsername` prop in `/app/contact/page.tsx`:
   ```tsx
   <CalComBooking calComUsername="your-actual-username" />
   ```

3. Update the `eventSlugs` object in `CalComBooking.tsx`:
   ```tsx
   const eventSlugs = {
     zoom: "your-actual-zoom-slug", // Replace with your actual slug
     phone: "your-actual-phone-slug", // Replace with your actual slug
     "in-person": "your-actual-in-person-slug", // Replace with your actual slug
   }
   ```

## Step 5: Test the Integration

1. Visit your contact page (`/contact`)
2. Select each meeting type (Zoom, Phone, In-Person)
3. Make a test booking
4. Verify:
   - ✅ You receive an email notification
   - ✅ The booking appears in your calendar
   - ✅ The client receives a confirmation email with calendar invite

## Additional Configuration (Optional)

### Customize Availability
- Set your working hours in Cal.com settings
- Add buffer time between meetings
- Set advance notice requirements

### Customize Booking Form
- Add custom questions (e.g., "What would you like to discuss?")
- Require specific information from clients

### Integrations
- Connect your Google Calendar or Outlook calendar
- Set up Zoom integration (if not already done)
- Configure SMS reminders (if using paid plan)

## Troubleshooting

### Calendar not loading?
- Check that the Cal.com script is loading (check browser console)
- Verify your username and event slugs are correct
- Ensure your Cal.com account is active

### Bookings not appearing in calendar?
- Check Cal.com → Settings → Connected Calendars
- Verify calendar sync is enabled for each event type

### Emails not sending?
- Check Cal.com → Settings → Notifications
- Verify email addresses are correct
- Check spam folder

## Support

For Cal.com-specific issues, visit [cal.com/support](https://cal.com/support)

For website integration issues, check the component code in `/components/CalComBooking.tsx`

