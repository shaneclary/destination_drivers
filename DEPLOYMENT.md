# Destination Drivers Voting Campaigns - Deployment Guide

## Quick Overview

You have two voting campaigns ready to deploy:

1. **destination-drivers-free-tour** - Giveaway campaign with API autovote
2. **destination-drivers-instavote** - Simple voting campaign

## What You Need

- **NixiHost account** with cPanel access
- **FTP/File Manager** access
- **GitHub repository** (already set up)

---

## Option 1: Deploy HTML Files Only (Simplest - Recommended for NixiHost)

This works for both campaigns and requires **NO server setup**.

### Step 1: Upload Files to NixiHost

1. **Log into NixiHost cPanel**
2. **Go to File Manager**
3. **Navigate to** `public_html` (or your domain's root folder)

4. **Create folders** (if they don't exist):
   ```
   public_html/
   ├── free-tour/
   └── instavote/
   ```

5. **Upload Files**:

   **For Free Tour Campaign:**
   - Upload `destination-drivers-free-tour/index.html` → `public_html/free-tour/index.html`
   - Upload `destination-drivers-free-tour/google-apps-script-backend.js` (for reference)

   **For Instavote Campaign:**
   - Upload `destination-drivers-instavote/index.html` → `public_html/instavote/index.html`

### Step 2: Access Your Sites

- **Free Tour:** `https://yourdomain.com/free-tour/`
- **Instavote:** `https://yourdomain.com/instavote/`

### Step 3: Update Google Apps Script Backend (Free Tour Only)

The free-tour campaign needs a backend to handle giveaway entries.

1. **Go to** [Google Apps Script](https://script.google.com)
2. **Create New Project**
3. **Copy/paste** the code from `destination-drivers-free-tour/google-apps-script-backend.js`
4. **Update these variables** in the script:
   ```javascript
   const AIRTABLE_API_KEY = 'your-airtable-api-key';
   const AIRTABLE_BASE_ID = 'your-base-id';
   const AIRTABLE_TABLE_NAME = 'your-table-name';
   ```
5. **Deploy** → Web App → Anyone can access
6. **Copy the deployment URL**
7. **Update** `free-tour/index.html` line ~466:
   ```javascript
   const BACKEND_URL = 'your-google-apps-script-url-here';
   ```

---

## Option 2: Deploy with API Autovote Server (Advanced - Desktop Only)

This enables automated browser voting for desktop users. **Mobile users will still see instructions.**

### Requirements

- VPS or dedicated server (not shared hosting)
- Node.js 18+ installed
- SSH access

### Setup Instructions

1. **SSH into your server**
   ```bash
   ssh user@yourserver.com
   ```

2. **Install Node.js** (if not installed)
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone your repository**
   ```bash
   cd /var/www
   git clone https://github.com/yourusername/destination_drivers.git
   cd destination_drivers/destination-drivers-free-tour
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Install Playwright browsers**
   ```bash
   npx playwright install chromium firefox webkit
   npx playwright install-deps
   ```

6. **Test the server**
   ```bash
   npm start
   ```

   You should see:
   ```
   🚀 Auto-Vote API Server Running!
   📡 Listening on: http://localhost:3000
   ```

7. **Set up as a service** (keeps it running)
   ```bash
   sudo npm install -g pm2
   pm2 start api-server.js --name "autovote-api"
   pm2 startup
   pm2 save
   ```

8. **Configure reverse proxy** (Nginx example)
   ```nginx
   location /api/auto-vote {
       proxy_pass http://localhost:3000/api/auto-vote;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
   ```

9. **Update** `index.html` line ~467:
   ```javascript
   const AUTO_VOTE_API_URL = 'https://yourdomain.com/api/auto-vote';
   ```

---

## What Each Campaign Does

### Free Tour Campaign

**Desktop Users:**
- Clicks "VOTE NOW" → Browser auto-opens and clicks through badges
- Auto-selects: Wineries → Wine Tour → Destination Drivers
- User just submits the ballot

**Mobile Users:**
- Clicks "VOTE NOW" → Sees beautiful modal with step-by-step instructions
- Follows 4 simple steps to vote manually

**Features:**
- Email collection for giveaway entries
- Newsletter signup (gives 3 entries instead of 1)
- Daily vote limits (1 vote per email per day)
- Countdown timer to voting deadline
- Airtable integration for entry management

### Instavote Campaign

**All Users:**
- Opens voting site in new tab
- Shows instructions box
- User votes manually

**Features:**
- Simpler, no email collection
- Countdown timer
- Branded with Destination Drivers colors

---

## Testing Checklist

Before going live, test these:

### Desktop Browser Test
- [ ] Click "VOTE NOW" button
- [ ] Voting site opens in new tab/window
- [ ] (If API enabled) Browser auto-clicks through categories
- [ ] Can submit vote successfully
- [ ] Thank you message appears

### Mobile Browser Test (iPhone/Safari)
- [ ] Click "VOTE NOW" button
- [ ] Instruction modal appears
- [ ] Click "GOT IT! LET'S VOTE"
- [ ] Voting site opens
- [ ] Instructions are clear and accurate
- [ ] Can complete vote following instructions

### Email/Giveaway Test (Free Tour)
- [ ] Enter email and submit
- [ ] Check Airtable for new entry
- [ ] Check bonus entries if newsletter checked
- [ ] Try voting again with same email (should block)
- [ ] Try again next day (should allow)

---

## File Structure

```
destination_drivers/
├── destination-drivers-free-tour/
│   ├── index.html                      # Main giveaway page
│   ├── api-server.js                   # Node.js autovote server (optional)
│   ├── package.json                    # Dependencies
│   ├── google-apps-script-backend.js   # Backend for entries
│   ├── airtable-automation-script.js   # Airtable automation
│   └── giveaway-script.js             # Entry generation logic
│
├── destination-drivers-instavote/
│   ├── index.html                      # Simple voting page
│   └── api-server.js                   # Node.js autovote server (optional)
│
└── DEPLOYMENT.md                       # This file
```

---

## Important URLs to Configure

### Free Tour Campaign (`index.html`)

**Line ~466-467:**
```javascript
const BACKEND_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
const AUTO_VOTE_API_URL = 'http://localhost:3000/api/auto-vote'; // or your server URL
```

### Google Apps Script (`google-apps-script-backend.js`)

**Lines ~2-4:**
```javascript
const AIRTABLE_API_KEY = 'YOUR_API_KEY';
const AIRTABLE_BASE_ID = 'YOUR_BASE_ID';
const AIRTABLE_TABLE_NAME = 'YOUR_TABLE_NAME';
```

---

## Support Browsers

The autovote system tries browsers in this order:
1. Chrome
2. Microsoft Edge
3. Firefox
4. WebKit (Safari-like)
5. Chromium (bundled - always works)

Mobile browsers show instruction modal instead.

---

## Troubleshooting

### "Could not connect to auto-vote API"
- This is normal if API server isn't running
- Desktop users will just see voting site open (manual voting)
- Mobile users always see instructions modal

### "No browser available"
- Install at least one browser: Chrome, Edge, or Firefox
- Or rely on bundled Chromium (installs with Playwright)

### Votes not recording in Airtable
- Check Google Apps Script deployment URL
- Verify Airtable API key and base ID
- Check Airtable automation is enabled

### Logo text getting cut off
- Already fixed with responsive clamp() sizing
- Should work on all screen sizes
- If issues persist, reduce container padding more

---

## Quick Deploy (Copy/Paste for NixiHost)

**Just want to get it live fast?**

1. **Upload** `destination-drivers-free-tour/index.html` to your web host
2. **Access** at `https://yourdomain.com/path-to-file/index.html`
3. **Done!** (Desktop gets link, mobile gets instructions)

For the giveaway to work, you'll still need to set up Google Apps Script backend (see Option 1, Step 3).

---

## Questions?

- Desktop autovote requires Node.js server (VPS/dedicated hosting)
- Mobile always shows instructions (no server needed)
- Shared hosting (like most NixiHost plans) = HTML only = works great!
- Both campaigns work perfectly without the API server

**The campaigns are fully functional right now with just the HTML files!** 🎉
