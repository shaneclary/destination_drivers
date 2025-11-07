# Winner Selection Guide
**Destination Drivers Wine Tour Giveaway**

---

## 📅 Timeline

- **Sweepstakes Ends:** November 14, 2025 at 5:00 PM PST
- **Winner Selection:** Within 7 days (by November 21, 2025)
- **Winner Notification:** Within 7 days of drawing
- **Winner Must Respond:** Within 72 hours of notification

---

## 🎲 Recommended Random Selection Method

### Use Random.org (Recommended - Most Transparent)

**Random.org** is a third-party service that provides true random numbers based on atmospheric noise, making it verifiable and transparent.

#### Step-by-Step Process:

1. **Export All Entries**
   - Download your entries database (from backend/email service)
   - Create a spreadsheet with columns:
     - Entry Number
     - Email Address
     - Entries Earned
     - Newsletter Status

2. **Expand Entries**
   - Each entry should be a separate row
   - Example: If user123@email.com has 3 entries, create 3 rows:
     ```
     1, user123@email.com, Entry 1 of 3, Newsletter
     2, user123@email.com, Entry 2 of 3, Newsletter
     3, user123@email.com, Entry 3 of 3, Newsletter
     ```

3. **Number All Entries Sequentially**
   - Assign a unique number to each entry (1, 2, 3, etc.)
   - Let's say you have 1000 total entries (numbered 1-1000)

4. **Use Random.org List Randomizer**
   - Go to: https://www.random.org/integers/
   - Settings:
     - Min: 1
     - Max: [Total number of entries]
     - Quantity: 1
     - Format: HTML
     - Click "Get Numbers"

5. **Record the Results**
   - Screenshot the Random.org result page (shows timestamp)
   - Note the winning number
   - Match number to entry in your spreadsheet

6. **Identify Winner**
   - Find the email associated with the winning entry number
   - Send winner notification email

---

## 📊 Alternative Method: Google Sheets Random Function

If you need an internal method:

1. **Create Google Sheet** with all entries
2. **Add Random Column:**
   ```
   =RAND()
   ```
3. **Sort by Random Column** (ascending)
4. **Winner is the first entry** after sorting
5. **Screenshot the results** with timestamp for records

---

## 📧 Email Collection & Storage

### Recommended Backend Solutions:

#### Option 1: **Google Forms + Google Sheets**
- ✅ Free
- ✅ Easy to set up
- ✅ Automatic spreadsheet
- ✅ Email notifications
- ❌ No newsletter automation

**Setup:**
1. Create Google Form with email field
2. Responses auto-populate in Google Sheets
3. Manually track daily entries
4. Export for winner selection

#### Option 2: **Mailchimp (Newsletter Integration)**
- ✅ Free up to 500 contacts
- ✅ Newsletter automation built-in
- ✅ Unsubscribe management
- ✅ GDPR/CCPA compliant
- ✅ Track who opted in

**Setup:**
1. Create Mailchimp account
2. Create audience/list
3. Use Mailchimp API or embed form
4. Tag entries with "Sweepstakes Entry"
5. Tag newsletter preferences

#### Option 3: **Airtable**
- ✅ Free tier available
- ✅ Easy database interface
- ✅ Can build custom entry form
- ✅ Formula fields for tracking entries
- ✅ Filter and sort easily

**Setup:**
1. Create Airtable base
2. Fields: Email, Date, Newsletter (yes/no), Total Entries
3. Use Airtable form for submissions
4. Formula to calculate entries: `IF({Newsletter}, 3, 1)`

#### Option 4: **Custom Backend (Most Control)**
- Use Firebase, Supabase, or your own database
- Full control over data
- Can integrate with existing systems

---

## 📝 Data You Need to Collect

For each vote submission, store:

```json
{
  "email": "user@example.com",
  "timestamp": "2025-11-10T14:30:00Z",
  "newsletter": true,
  "entries": 3,
  "ipAddress": "123.456.789.0" (for fraud prevention),
  "votedFor": "Destination Drivers - Wine Tour"
}
```

---

## 🔢 Entry Counting System

### Formula:
- **Newsletter Subscriber:** 3 entries per vote
- **Non-Subscriber:** 1 entry per vote
- **Daily Limit:** 1 vote per email per day

### Example Database Structure:

| Email | Vote Date | Newsletter | Entries This Vote | Total Entries |
|-------|-----------|------------|-------------------|---------------|
| john@email.com | 2025-11-01 | Yes | 3 | 3 |
| john@email.com | 2025-11-02 | Yes | 3 | 6 |
| jane@email.com | 2025-11-01 | No | 1 | 1 |
| john@email.com | 2025-11-03 | Yes | 3 | 9 |

---

## 🎯 Winner Selection Checklist

### Before Drawing:

- [ ] Verify voting period has ended (11/14/2025 5:00 PM PST)
- [ ] Export all entries from database
- [ ] Calculate total entries for each participant
- [ ] Expand entries (each entry = one row)
- [ ] Number all entries sequentially
- [ ] Verify no duplicate entries for same day/email
- [ ] Remove any entries that violate rules

### During Drawing:

- [ ] Use Random.org or approved random method
- [ ] Screenshot results with timestamp
- [ ] Record winning entry number
- [ ] Identify winner's email address
- [ ] Verify winner's eligibility (21+, California resident)
- [ ] Document entire process

### After Drawing:

- [ ] Send winner notification email within 24 hours
- [ ] Set 72-hour response deadline
- [ ] If winner doesn't respond, select alternate
- [ ] Announce winner publicly (first name + last initial)
- [ ] Coordinate prize fulfillment
- [ ] Maintain records for 1 year

---

## 📧 Winner Notification Email Template

```
Subject: 🎉 You Won the Destination Drivers Wine Tour!

Dear [First Name],

Congratulations! You are the winner of the Destination Drivers Wine Tour Giveaway!

You've won a complimentary wine tour for two (2) people, valued at $300.

NEXT STEPS:
To claim your prize, please reply to this email within 72 hours with:
1. Your full name
2. Confirmation that you are 21+ and a California resident
3. Your preferred contact phone number

We will then send you additional information about scheduling your tour.

Thank you for participating and voting for Destination Drivers!

Best regards,
The Destination Drivers Team

---
This email was sent regarding the Destination Drivers Wine Tour Giveaway.
Drawing was conducted on [DATE] using Random.org.
```

---

## ⚖️ Legal Compliance Notes

### Required Documentation:
- Complete list of all entries (anonymized for privacy)
- Screenshot of random selection process
- Winner verification documents
- Signed prize acceptance form
- Record of winner notification and response

### Record Retention:
- Keep all records for **1 year** after winner announcement
- Store securely with restricted access
- Can be requested by participants or regulatory bodies

---

## 🎁 Prize Fulfillment Process

1. **Winner Verification**
   - Confirm identity
   - Verify age (21+)
   - Verify residency (California)

2. **Prize Acceptance**
   - Send formal prize acceptance form
   - Include tax disclaimer
   - Get signed release form

3. **Coordination**
   - Work with winner to schedule tour
   - Subject to availability (12-month validity)
   - Blackout dates may apply

4. **Publicity**
   - Announce winner on social media (first name + last initial)
   - Optional: Winner testimonial/photo (with permission)

---

## 🔒 Data Privacy During Selection

- Only share winner's information as necessary
- Use first name + last initial for public announcements
- Delete or anonymize non-winner data after retention period
- Comply with GDPR/CCPA requirements

---

## 📞 Support During Winner Selection

If you need help:
- **Random.org Support:** contact@random.org
- **Legal Questions:** Consult with attorney for sweepstakes compliance
- **Technical Issues:** Review backend/database documentation

---

**Ready to select a winner? Follow this guide step-by-step for a fair, transparent, and legally compliant drawing!**
