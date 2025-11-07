# Destination Drivers - Free Wine Tour Giveaway

**Vote & Win a Free Wine Tour** - Email collection with newsletter incentive and daily voting

---

## 🎯 What This Is

A sweepstakes landing page that combines:
- ✅ Auto-voting for Destination Drivers (Best Wine Tour category)
- ✅ Email collection for giveaway entries
- ✅ Newsletter opt-in with bonus entries (3 vs 1)
- ✅ Daily voting limit (1 vote per email per day)
- ✅ Countdown timer to voting deadline
- ✅ Complete legal framework (Terms & Privacy Policy)
- ✅ Winner selection guide

---

## 📦 What's Included

```
destination-drivers-free-tour/
├── index.html                    ← Main giveaway page
├── terms.html                    ← Official rules & terms
├── privacy.html                  ← Privacy policy
├── WINNER-SELECTION-GUIDE.md     ← How to select winner
├── BACKEND-SETUP.md              ← How to collect emails
├── README.md                     ← This file
└── .gitignore                    ← Git ignore file
```

---

## 🚀 Quick Deploy

### 1. Upload Files to Your Website

Upload these files to your web server:
- `index.html` → Main giveaway page
- `terms.html` → Official rules
- `privacy.html` → Privacy policy

Recommended location: `destinationdrivers.com/giveaway/`

### 2. Set Up Email Collection

**You need a backend to collect emails!** See [`BACKEND-SETUP.md`](BACKEND-SETUP.md) for options:
- Google Forms (easiest, free)
- Mailchimp (best for newsletter)
- Airtable (best for tracking)
- Custom backend (most control)

### 3. Update Contact Information

Edit `terms.html` and `privacy.html` to add:
- Your business address
- Contact email
- Contact phone

### 4. Share the Link

```
destinationdrivers.com/giveaway
```

---

## 👥 User Experience

1. **User visits page**
   - Sees countdown timer
   - Sees "Vote & Win" form

2. **User enters email**
   - Chooses newsletter preference (default: checked)
   - Newsletter = 3 entries, No newsletter = 1 entry

3. **User clicks "Vote Now & Enter to Win"**
   - Vote is auto-submitted for Destination Drivers
   - Entry is recorded
   - Thank you screen shows number of entries earned

4. **User can return daily**
   - One vote per day per email
   - Can accumulate more entries

5. **Winner is drawn**
   - Random selection after voting ends (11/14/2025)
   - Winner notified by email

---

## ⚙️ Configuration

### Voting End Date

Edit `index.html` line 242:
```javascript
const votingEndDate = new Date('2025-11-14T17:00:00-08:00').getTime();
```

### Entry Bonus

Currently set to:
- Newsletter subscribers: **3 entries** per vote
- Non-subscribers: **1 entry** per vote

To change, edit the checkbox description in `index.html` around line 292.

### Daily Voting Limit

Set to **1 vote per email per day** using browser localStorage.

Works across devices if user enters same email.

---

## 📊 How Entries Work

### Entry System:

| Action | Newsletter? | Entries Earned | Total |
|--------|-------------|----------------|-------|
| Vote Day 1 | Yes ✓ | 3 | 3 |
| Vote Day 2 | Yes ✓ | 3 | 6 |
| Vote Day 3 | Yes ✓ | 3 | 9 |
| Vote Day 4 | No ✗ | 1 | 10 |

### Example Scenarios:

**User A (Newsletter Subscriber):**
- Votes 10 times over 10 days
- Earns 3 entries each time
- **Total: 30 entries**

**User B (No Newsletter):**
- Votes 10 times over 10 days
- Earns 1 entry each time
- **Total: 10 entries**

**User C (Mixed):**
- Votes 5 times with newsletter (15 entries)
- Votes 3 times without newsletter (3 entries)
- **Total: 18 entries**

---

## 🎲 Winner Selection

See [`WINNER-SELECTION-GUIDE.md`](WINNER-SELECTION-GUIDE.md) for complete instructions.

**Quick summary:**
1. Export all entries after 11/14/2025 5:00 PM
2. Expand entries (3 entries = 3 rows)
3. Number entries sequentially
4. Use Random.org to pick a number
5. Notify winner by email
6. Winner has 72 hours to respond

**Recommended tool:** Random.org (transparent, verifiable)

---

## 📧 Backend Integration

### Current State (Frontend Only):

The current `index.html` stores votes in:
- Browser localStorage (for daily limit tracking)
- Console log (for testing)

### What You Need:

A backend to:
1. **Collect emails** → Store in database
2. **Track entries** → Calculate 3 vs 1 per vote
3. **Prevent duplicates** → Check if voted today
4. **Send newsletters** → To opted-in users
5. **Export data** → For winner selection

### Recommended Solutions:

**Option 1: Google Forms** (Easiest)
- Free, no coding
- Auto-creates spreadsheet
- Manual entry tracking

**Option 2: Mailchimp** (Best for Newsletters)
- Free up to 500 contacts
- Built-in newsletter tools
- API integration available

**Option 3: Airtable** (Best Balance)
- Free tier available
- Easy database interface
- Formula fields for auto-counting entries

**Option 4: Custom Backend**
- Firebase, Supabase, or your own server
- Full control
- Requires development

See [`BACKEND-SETUP.md`](BACKEND-SETUP.md) for detailed setup instructions.

---

## ⚖️ Legal Compliance

### Included Legal Documents:

✅ **Official Rules** (`terms.html`)
- NO PURCHASE NECESSARY disclosure
- Eligibility requirements
- Entry methods
- Prize details
- Winner selection process
- Sponsor information

✅ **Privacy Policy** (`privacy.html`)
- Data collection disclosure
- How data is used
- Newsletter opt-in/opt-out
- User rights (GDPR/CCPA)
- Data retention
- Contact information

### Required Disclosures:

- ✅ No purchase necessary
- ✅ Odds of winning depend on entries
- ✅ Newsletter is completely optional
- ✅ Can unsubscribe anytime
- ✅ Data collection transparency
- ✅ Age requirement (21+)
- ✅ Geographic restriction (California)

### What You Need to Do:

1. **Update Contact Info** in terms.html and privacy.html
2. **Add Business Address**
3. **Review with Attorney** (recommended for legal compliance)
4. **Post Official Rules** publicly accessible

---

## 🔒 Privacy & Data Protection

### What Data is Collected:

- Email address (required)
- Newsletter preference (optional)
- Vote timestamp
- Number of entries
- IP address (temporarily, for fraud prevention)

### How Long Data is Kept:

- **During sweepstakes:** Active database
- **After winner announcement:** 1 year (for legal compliance)
- **After retention period:** Securely deleted

### User Rights:

- Access their data
- Request deletion
- Unsubscribe from newsletter
- Opt-out of marketing

---

## 🎨 Customization Options

### Colors

Edit `index.html` CSS (lines 15-16):
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Logo

Replace emoji logo (line 237):
```html
<div class="logo">🚗🍷</div>
```

With:
```html
<div class="logo">
    <img src="logo.png" alt="Destination Drivers" style="max-width: 200px;">
</div>
```

### Prize Description

Edit the prize details in `terms.html` section 4.

### Countdown Timer

Change end date/time in `index.html` line 242.

---

## 📱 Mobile-Friendly

- ✅ Responsive design
- ✅ Works on phones and tablets
- ✅ Touch-friendly buttons
- ✅ Readable countdown on small screens

---

## 🔧 Technical Details

### Browser Compatibility:

- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓
- Mobile browsers ✓

### Requirements:

- JavaScript enabled
- Cookies/localStorage enabled (for daily limit)
- Popups allowed (for auto-voting window)

### How Daily Limit Works:

Uses browser localStorage to store:
```javascript
lastVote_[email] = timestamp
```

Checked on each vote attempt. Resets after 24 hours.

**Note:** Users could bypass this by:
- Using different browsers
- Using private/incognito mode
- Clearing localStorage

**Solution:** Backend validation (recommended)

---

## 📞 Support

### For Setup Help:

See [`BACKEND-SETUP.md`](BACKEND-SETUP.md)

### For Legal Questions:

Consult with an attorney experienced in:
- Sweepstakes law
- California consumer protection
- Privacy law (GDPR/CCPA)

### For Winner Selection:

See [`WINNER-SELECTION-GUIDE.md`](WINNER-SELECTION-GUIDE.md)

---

## ✅ Pre-Launch Checklist

Before sharing with public:

- [ ] Upload all HTML files to server
- [ ] Set up backend email collection
- [ ] Update contact information in terms.html
- [ ] Update contact information in privacy.html
- [ ] Test form submission
- [ ] Test auto-voting feature
- [ ] Test on mobile device
- [ ] Test daily limit functionality
- [ ] Verify countdown timer shows correct date
- [ ] Review legal documents with attorney
- [ ] Test newsletter opt-in/opt-out
- [ ] Prepare for winner selection (set up Random.org account)
- [ ] Have prize fulfillment plan ready

---

## 🎁 Prize Details

**Current Prize:** Complimentary wine tour for 2 people

**Value:** $300

**Restrictions:**
- Must be 21+ (winner and guest)
- Valid for 12 months
- Subject to availability
- Blackout dates may apply

Update prize details in `terms.html` section 4.

---

## 📈 Marketing Ideas

Share the giveaway:
- **Social Media:** Instagram, Facebook stories
- **Email Newsletter:** To existing customers
- **Website Banner:** On main site
- **Partner Sharing:** Ask partners to share
- **Paid Ads:** Facebook/Instagram ads

**Sample Social Post:**
```
🍷 Win a FREE Wine Tour for 2!

Enter daily for more chances to win:
destinationdrivers.com/giveaway

✓ Auto-votes for us as Best Wine Tour
✓ One entry per day
✓ Newsletter subscribers get 3x entries!

Drawing: 11/14/2025
```

---

**Made for Destination Drivers 🚗🍷**

Vote daily • Win prizes • Support local business
