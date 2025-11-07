# Complete Setup Guide - Destination Drivers Giveaway
## 100% Free Solution (No Paid Plans Required!)

This guide connects your website → Google Apps Script (free) → Airtable (free tier)

---

## Part 1: Get Airtable Credentials (5 minutes)

### Step 1: Get Personal Access Token

1. Go to https://airtable.com/create/tokens
2. Click **Create new token**
3. Token name: `Destination Drivers Giveaway`
4. Add these scopes:
   - ✅ `data.records:read`
   - ✅ `data.records:write`
   - ✅ `schema.bases:read`
5. Under **Access**, click **Add a base**
6. Select: **Destination Drivers - Free Tour Giveaway**
7. Click **Create token**
8. **COPY THE TOKEN** and save it somewhere safe (you won't see it again!)

### Step 2: Get Base ID

1. Go to your Airtable base: https://airtable.com
2. Open "Destination Drivers - Free Tour Giveaway"
3. Look at the URL: `https://airtable.com/appXXXXXXXXXXXXXX/...`
4. Copy the `appXXXXXXXXXXXXXX` part (starts with "app")

### Step 3: Get Table ID

1. In your base, go to **Help** → **API Documentation**
2. Or go to: https://airtable.com/api
3. Select your base
4. Find the "Entries" table section
5. Look for: `https://api.airtable.com/v0/YOUR_BASE_ID/tblXXXXXXXXXXXXXX`
6. Copy the `tblXXXXXXXXXXXXXX` part (starts with "tbl")

**Save these three values:**
- ✅ Personal Access Token: `patXXXXXXXXXXXXXX`
- ✅ Base ID: `appXXXXXXXXXXXXXX`
- ✅ Table ID: `tblXXXXXXXXXXXXXX`

---

## Part 2: Set Up Google Apps Script Backend (10 minutes)

### Step 1: Create New Script

1. Go to https://script.google.com
2. Click **New project**
3. Rename project: "Destination Drivers Backend"

### Step 2: Paste Backend Code

1. Delete all existing code in the editor
2. Open file: `c:\Admin Monika\destination-drivers-free-tour\google-apps-script-backend.js`
3. Copy ALL the code (Ctrl+A, Ctrl+C)
4. Paste into Google Apps Script editor (Ctrl+V)
5. Click **Save** (disk icon)

### Step 3: Add Your Airtable Credentials

1. In Apps Script, click **Project Settings** (gear icon on left)
2. Scroll down to **Script Properties**
3. Click **Add script property**
4. Add three properties:

| Property | Value |
|----------|-------|
| `AIRTABLE_TOKEN` | Your token (patXXXX...) |
| `AIRTABLE_BASE_ID` | Your base ID (appXXXX...) |
| `AIRTABLE_TABLE_ID` | Your table ID (tblXXXX...) |

Click **Save script properties**

### Step 4: Test the Script

1. Go back to **Editor** (< > icon on left)
2. Select function: `testSubmission` (dropdown at top)
3. Click **Run** (▶ play button)
4. **First time only:** Click **Review permissions**
   - Choose your Google account
   - Click **Advanced** → **Go to Destination Drivers Backend (unsafe)**
   - Click **Allow**
5. Check the **Execution log** (bottom panel)
   - Should see: `{"success":true,"entries":3,"message":"Entry submitted! You received 3 entries."}`
6. Go to your Airtable base
   - Should see 3 new entries for test@example.com (1 Original + 2 Bonus)
7. **Delete the test entries** before continuing

### Step 5: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click **Select type** → **Web app**
3. Settings:
   - **Description:** "Production v1"
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**
4. Click **Deploy**
5. **COPY THE WEB APP URL** (looks like: `https://script.google.com/macros/s/XXXXXXXXX/exec`)
6. Click **Done**

**Save this URL - you'll need it for the website!**

---

## Part 3: Simplify Airtable Automation (2 minutes)

Your current Airtable automation might have extra steps we don't need. Let's simplify:

### Update Automation:

1. Go to your Airtable base
2. Click **Automations** tab
3. Find: "Create Bonus Entries for Newsletter Subscribers"
4. Click to edit
5. Make sure it has:

**TRIGGER:**
- When a record matches conditions
- Table: Entries
- Conditions:
  - Newsletter Opt-In = checked
  - Entry Type = "Original"

**ACTIONS:**
- Action 1: Create record in Entries with Entry Type = "Bonus 1"
- Action 2: Create record in Entries with Entry Type = "Bonus 2"

**Remove any "Find Records" steps** (we handle daily limits in Google Apps Script now)

6. Click **Turn on** (if it's off)

---

## Part 4: Update Your Website (2 minutes)

### Step 1: Add Backend URL

1. Open: `c:\Admin Monika\destination-drivers-free-tour\index.html`
2. Find line 466: `const BACKEND_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';`
3. Replace with your actual Google Apps Script URL:
   ```javascript
   const BACKEND_URL = 'https://script.google.com/macros/s/XXXXXXXXX/exec';
   ```
4. Save the file

### Step 2: Upload to Website

Upload these 3 files to your website:
- `index.html` → `destinationdrivers.com/giveaway/index.html`
- `terms.html` → `destinationdrivers.com/giveaway/terms.html`
- `privacy.html` → `destinationdrivers.com/giveaway/privacy.html`

---

## Part 5: Test Everything (5 minutes)

### Test 1: Single Entry (No Newsletter)

1. Go to: `destinationdrivers.com/giveaway`
2. Enter email: `test1@example.com`
3. **Uncheck** newsletter box
4. Click "VOTE NOW & ENTER TO WIN"
5. Wait for thank you message
6. Check Airtable:
   - Should see **1 entry** for test1@example.com
   - Entry Type: "Original"
   - Status: "Valid"

### Test 2: Triple Entry (Newsletter Checked)

1. Refresh the page
2. Enter email: `test2@example.com`
3. **Check** newsletter box
4. Click "VOTE NOW & ENTER TO WIN"
5. Wait for thank you message
6. Check Airtable:
   - Should see **3 entries** for test2@example.com
   - Entry Types: "Original", "Bonus 1", "Bonus 2"
   - All Status: "Valid"

### Test 3: Daily Limit

1. Refresh the page
2. Enter same email: `test2@example.com`
3. Click "VOTE NOW & ENTER TO WIN"
4. Should see error: **"You've already voted today! Come back tomorrow for another entry."**
5. Check Airtable:
   - Should still only see 3 entries (no new ones created)

### Test 4: Next Day Vote

1. In Airtable, manually change test2@example.com's Vote Date to yesterday
2. Refresh website
3. Enter `test2@example.com` again
4. Should succeed and create 3 more entries (6 total)

### Test 5: Auto-Voting

1. Submit a real entry
2. Watch for popup window opening votecentralcoast.com
3. Verify it auto-navigates to Destination Drivers
4. Verify vote is auto-selected

---

## How It Works

```
USER
  ↓
WEBSITE (index.html)
  ↓ sends: {email, newsletter, date, time}
GOOGLE APPS SCRIPT (FREE)
  ├─ Checks: Already voted today?
  │   ├─ YES → Return error
  │   └─ NO → Continue ↓
  └─ Submits to AIRTABLE
       ↓
AIRTABLE AUTOMATION (FREE)
  ├─ Record created with Entry Type = "Original"
  ├─ Automation triggers if Newsletter = checked
  └─ Creates 2 bonus entries
       ↓
RESULT: 3 entries in Airtable (or 1 if no newsletter)
```

---

## Winner Selection (After 11/14/2025)

### Step 1: Validate Entries

1. In Airtable, go to **Automations** tab
2. Click **Create automation**
3. Trigger: **Button** (manual trigger)
4. Action: **Run script** (if you upgrade) OR manually filter:
   - Open "Valid Entries Only" view
   - Sort by Email, then Vote Date
   - Manually check for duplicates

### Step 2: Export Entries

1. Switch to **"Valid Entries Only"** view
2. Note total number of entries
3. File → **Download CSV**

### Step 3: Pick Winner

1. Go to https://www.random.org/integers/
2. Settings:
   - Generate: **1** random integer
   - Min: **1**
   - Max: **[total number of entries]**
   - Format: **Plain text**
3. Click **Get Numbers**
4. Find that Entry Number in your CSV
5. The Email column = **Winner!**

### Step 4: Notify Winner

1. Email winner at their email address
2. In Airtable, change that entry's Status to "Winner"
3. Winner has 72 hours to respond

---

## Troubleshooting

### Error: "Script not found"
- Check Google Apps Script deployment URL is correct
- Make sure Web App is deployed with "Anyone" access

### Error: "Failed to submit entry"
- Check all 3 script properties are set correctly
- Check Airtable token has write permissions
- Check Base ID and Table ID are correct

### Bonus entries not created
- Check Airtable automation is turned ON
- Check automation conditions: Newsletter = checked AND Entry Type = "Original"
- Check automation actions create records with Entry Type = "Bonus 1" and "Bonus 2"

### Daily limit not working
- Check Google Apps Script is querying Airtable correctly
- Run `testSubmission` function to test
- Check Execution log in Apps Script

### Auto-voting not working
- Check browser doesn't block popups
- Check votecentralcoast.com site structure hasn't changed
- May need to manually vote if site updates

---

## Cost Summary

| Service | Cost | What It Does |
|---------|------|--------------|
| **Airtable** | FREE | Stores entries, creates bonus entries |
| **Google Apps Script** | FREE | Validates daily limits, submits to Airtable |
| **Website Hosting** | Varies | Hosts the giveaway page |

**Total Monthly Cost: $0** (assuming you already have website hosting)

---

## Files Reference

- `index.html` - Main giveaway page ✅
- `terms.html` - Official rules ✅
- `privacy.html` - Privacy policy ✅
- `google-apps-script-backend.js` - Backend code ✅
- `airtable-automation-script.js` - (Not needed for free version)
- `GOOGLE-SHEETS-SETUP.md` - Alternative to Airtable
- `COMPLETE-SETUP-GUIDE.md` - This file

---

## Support

**Need help?**
- Airtable: https://support.airtable.com
- Google Apps Script: https://developers.google.com/apps-script
- Check Execution logs in both platforms

---

**🎉 Setup complete! Your giveaway is ready to launch!**

Share: `destinationdrivers.com/giveaway`
