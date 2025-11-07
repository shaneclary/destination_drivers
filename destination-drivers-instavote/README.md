# Destination Drivers InstaVote Campaign

A streamlined voting page for Destination Drivers with **surprise giveaway entry** - users vote first, discover they've been entered to win later via email.

## Key Features

### ✅ What Makes This Different from Free-Tour Campaign

**Free-Tour Campaign:**
- Advertises "Win a FREE wine tour!" upfront
- Giveaway is the main focus
- Email required to enter
- Opt-IN to newsletter (users have to check box)

**InstaVote Campaign:**
- Focuses on "Help us win!" messaging
- NO mention of giveaway on the page
- Email is optional (for "voting reminders")
- Opt-OUT of newsletter (checkbox checked by default)
- Users discover giveaway surprise in follow-up email

### 📊 Page Elements

1. **Countdown Timer** (at top)
   - Shows days, hours, minutes, seconds until voting ends
   - Prominent gradient background

2. **Simple Vote Form**
   - Optional email field
   - Opt-out newsletter checkbox (checked by default)
   - Single "VOTE NOW" button

3. **Auto-Voting**
   - Opens votecentralcoast.com in new window
   - API triggers Playwright automation
   - Pre-selects Destination Drivers

4. **Thank You Page**
   - Shows after vote submitted
   - **Reveals surprise:** "You've been entered to win a FREE wine tour!"
   - Instructions to check email

## Backend Integration

### Data Captured

When email is provided, sends to Airtable via Google Apps Script:
```javascript
{
  email: "user@example.com",
  newsletter: true, // true if checkbox left checked
  voteDate: "2026-01-15",
  voteTime: "2026-01-15T14:30:00",
  campaign: "instavote" // identifies this campaign
}
```

### Newsletter Logic

- **Checkbox is checked by default** = User wants newsletter
- **User unchecks box** = User opts out (newsletter: false)
- This is **opposite** of free-tour campaign (which uses opt-in)

### Giveaway Entry System

1. User votes (with or without email)
2. If email provided → entry created in Airtable
3. Airtable automation (same as free-tour):
   - If `newsletter: true` → create 2 bonus entries (3 total)
   - If `newsletter: false` → 1 entry only
4. Follow-up email sent later revealing surprise entry

## Setup Instructions

### 1. Install Dependencies
```bash
cd destination-drivers-instavote
npm install
```

### 2. Start API Server
```bash
node api-server.js
```

Server runs on `http://localhost:3000`

### 3. Configure Backend URL

Edit `index.html` line ~320:
```javascript
const BACKEND_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

Use the same Google Apps Script backend as free-tour campaign (supports both).

### 4. Configure Voting End Date

Edit `index.html` line ~318:
```javascript
const votingEndDate = new Date('2026-01-31T23:59:59-08:00').getTime();
```

### 5. Open Page

Simply open `index.html` in your browser or host it online.

## Use Cases

### When to Use InstaVote

✅ Social media campaigns ("Help us win!")
✅ Quick voting drives
✅ Email list building without mentioning prize
✅ Lower friction voting experience
✅ Surprise & delight marketing

### When to Use Free-Tour Campaign

✅ Email campaigns promoting the giveaway
✅ Contest-focused landing pages
✅ When prize is the main draw
✅ Traditional sweepstakes format

## File Structure

```
destination-drivers-instavote/
├── index.html          # Main InstaVote page
├── api-server.js       # Express API with Playwright automation
├── package.json        # Node.js dependencies
└── README.md          # This file
```

## Testing Locally

1. Start API server: `node api-server.js`
2. Open `index.html` in browser
3. Try with/without email
4. Check Airtable for entries
5. Verify auto-vote opens voting site

## Campaign Tracking

All InstaVote entries have `campaign: "instavote"` field in Airtable, making it easy to:
- Segment email lists by campaign
- Track conversion rates per campaign
- Send campaign-specific follow-up emails
- Analyze which campaign performs better

## Follow-Up Email Template

Subject: 🎉 Surprise! You're entered to win a FREE Wine Tour!

Body:
```
Hi there!

Remember when you voted for Destination Drivers in the Best of the Central Coast awards?

Well, we have a SURPRISE for you...

🍷 You've been automatically entered to win a complimentary wine tour for 2!

Every vote counts as an entry, and if you're on our newsletter, you received 3 entries total!

Winner will be announced: [DATE]
Prize: Private wine tour for 2 people ($XXX value)

Thank you for your support - it means the world to us!

Cheers,
The Destination Drivers Team

P.S. Want more chances to win? Vote daily at [LINK]
```

## Notes

- Shared API server with free-tour campaign (both use same automation)
- Same Google Apps Script backend (differentiates by `campaign` field)
- Same Airtable base (separate campaign tracking)
- Daily voting limits enforced (1 vote per email per day)

---

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
