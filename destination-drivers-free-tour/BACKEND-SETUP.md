# Backend Setup Guide
**Email Collection for Destination Drivers Giveaway**

You need a backend to collect and store emails. Here are your options from easiest to most advanced.

---

## Option 1: Google Forms + Google Sheets (EASIEST)

✅ **Best for:** Quick setup, no coding required
💰 **Cost:** Free
⏱️ **Setup Time:** 15 minutes

### Step-by-Step:

1. **Create Google Form**
   - Go to forms.google.com
   - Click "+ Blank form"
   - Title: "Destination Drivers Giveaway Entries"

2. **Add Questions:**
   - **Question 1:** "Email Address"
     - Type: Short answer
     - Required: Yes
     - Validation: Text → Email

   - **Question 2:** "Subscribe to Newsletter?"
     - Type: Multiple choice
     - Options: "Yes - 3 entries" / "No - 1 entry"
     - Required: Yes

3. **Get Form URL:**
   - Click "Send" button
   - Copy link

4. **Integrate with Your Page:**

Replace the form in `index.html` with Google Form iframe:

```html
<iframe src="YOUR_GOOGLE_FORM_URL" width="100%" height="800" frameborder="0"></iframe>
```

**OR** use Google Form's API to submit from your existing form.

5. **View Responses:**
   - Go to "Responses" tab in Google Form
   - Click "Create Spreadsheet"
   - All entries auto-populate

6. **Track Daily Entries:**
   - Manually review spreadsheet
   - Filter by email to count entries
   - Formula: `=COUNTIF(A:A, "email@example.com")`

### Pros:
- ✅ No coding needed
- ✅ Free forever
- ✅ Automatic spreadsheet
- ✅ Email notifications
- ✅ Export to CSV

### Cons:
- ❌ No automatic newsletter sending
- ❌ Manual daily limit checking
- ❌ Basic interface

---

## Option 2: Mailchimp (BEST FOR NEWSLETTERS)

✅ **Best for:** Newsletter management + giveaway
💰 **Cost:** Free up to 500 contacts
⏱️ **Setup Time:** 30 minutes

### Step-by-Step:

1. **Create Mailchimp Account**
   - Go to mailchimp.com
   - Sign up for free account

2. **Create Audience:**
   - Dashboard → Audience → Create Audience
   - Name: "Destination Drivers Giveaway"

3. **Add Custom Fields:**
   - Go to Audience → Settings → Audience fields and merge tags
   - Add field: "Total Entries" (number)
   - Add field: "Last Vote Date" (date)

4. **Create Signup Form:**
   - Audience → Signup forms → Embedded forms
   - Customize form
   - Copy embed code

5. **Integrate with Your Website:**

**Method A:** Use Mailchimp's JavaScript API

```javascript
async function submitToMailchimp(email, newsletter) {
    const response = await fetch('/api/mailchimp-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            newsletter: newsletter,
            entries: newsletter ? 3 : 1
        })
    });
    return response.json();
}
```

**Method B:** Use Zapier (no coding)
- Connect your form → Mailchimp
- Auto-add subscribers
- Tag with entry counts

6. **Send Newsletters:**
   - Create campaign in Mailchimp
   - Send to "Newsletter = Yes" subscribers
   - Track opens, clicks, unsubscribes

### Pros:
- ✅ Built-in newsletter tools
- ✅ Automatic unsubscribe management
- ✅ GDPR/CCPA compliant
- ✅ Email templates
- ✅ Subscriber analytics

### Cons:
- ❌ Requires API integration for custom form
- ❌ Manual entry counting
- ❌ 500 contact limit on free plan

---

## Option 3: Airtable (BEST BALANCE)

✅ **Best for:** Easy database + tracking
💰 **Cost:** Free up to 1,200 records
⏱️ **Setup Time:** 45 minutes

### Step-by-Step:

1. **Create Airtable Base**
   - Go to airtable.com
   - Create account
   - Click "Add a base" → "Start from scratch"
   - Name: "Giveaway Entries"

2. **Set Up Table:**

| Field Name | Type | Description |
|------------|------|-------------|
| Email | Email | Participant email |
| Timestamp | Date/Time | When they voted |
| Newsletter | Checkbox | Opted in? |
| Entries This Vote | Number | 3 or 1 |
| Total Entries | Formula | Sum all entries |
| Last Vote | Formula | Most recent date |

3. **Create Formula for Entries:**

In "Entries This Vote" field:
```
IF({Newsletter}, 3, 1)
```

In "Total Entries" field (Rollup):
```
SUM(values)
```

4. **Create Airtable Form:**
   - Click "Form" view
   - Customize form fields
   - Copy share link

5. **Integrate with Your Page:**

**Method A:** Embed Airtable form

```html
<iframe class="airtable-embed" src="YOUR_AIRTABLE_FORM_URL" width="100%" height="800"></iframe>
```

**Method B:** Use Airtable API

```javascript
async function submitToAirtable(email, newsletter) {
    const AIRTABLE_API_KEY = 'YOUR_API_KEY';
    const BASE_ID = 'YOUR_BASE_ID';

    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/Entries`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: {
                Email: email,
                Newsletter: newsletter,
                Timestamp: new Date().toISOString()
            }
        })
    });
    return response.json();
}
```

6. **View & Export Data:**
   - View all entries in grid view
   - Filter by email, date, newsletter status
   - Export to CSV for winner selection

### Pros:
- ✅ Easy database interface
- ✅ Automatic entry calculations
- ✅ Filter and sort easily
- ✅ API available
- ✅ Collaboration tools

### Cons:
- ❌ No built-in newsletter sending
- ❌ 1,200 record limit on free plan
- ❌ Requires API key management

---

## Option 4: Firebase (DEVELOPER-FRIENDLY)

✅ **Best for:** Developers, scalable solution
💰 **Cost:** Free tier (generous limits)
⏱️ **Setup Time:** 2-3 hours

### Step-by-Step:

1. **Create Firebase Project**
   - Go to console.firebase.google.com
   - Add project

2. **Set Up Firestore Database:**
   - Build → Firestore Database
   - Create collection: "entries"

3. **Document Structure:**

```javascript
{
    email: "user@example.com",
    timestamp: Timestamp,
    newsletter: true,
    entries: 3,
    ipAddress: "123.456.789.0",
    votedFor: "Destination Drivers - Wine Tour"
}
```

4. **Add Firebase to Your Website:**

```html
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"></script>
<script>
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
</script>
```

5. **Submit Entry Function:**

```javascript
async function submitEntry(email, newsletter) {
    try {
        const docRef = await db.collection('entries').add({
            email: email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            newsletter: newsletter,
            entries: newsletter ? 3 : 1,
            votedFor: "Destination Drivers - Wine Tour"
        });
        console.log("Entry submitted:", docRef.id);
        return true;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}
```

6. **Check Daily Limit:**

```javascript
async function hasVotedToday(email) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const snapshot = await db.collection('entries')
        .where('email', '==', email)
        .where('timestamp', '>=', today)
        .get();

    return !snapshot.empty;
}
```

7. **Export Data:**
   - Go to Firestore console
   - Export collection to JSON
   - Use for winner selection

### Pros:
- ✅ Real-time database
- ✅ Scalable (millions of entries)
- ✅ Built-in authentication
- ✅ Security rules
- ✅ Free tier is generous

### Cons:
- ❌ Requires coding knowledge
- ❌ Setup complexity
- ❌ No built-in newsletter tools

---

## Option 5: Supabase (FIREBASE ALTERNATIVE)

✅ **Best for:** Developers who want SQL
💰 **Cost:** Free tier available
⏱️ **Setup Time:** 2-3 hours

### Features:
- PostgreSQL database
- Real-time subscriptions
- Built-in authentication
- RESTful API
- Similar to Firebase but with SQL

### Setup:
1. Create project at supabase.com
2. Create `entries` table
3. Use Supabase JavaScript client
4. Query with SQL

---

## Comparison Table

| Solution | Difficulty | Cost | Newsletter | Entry Tracking | Winner Export |
|----------|-----------|------|------------|----------------|---------------|
| Google Forms | ⭐ Easy | Free | ❌ No | Manual | ✅ CSV |
| Mailchimp | ⭐⭐ Medium | Free* | ✅ Yes | Manual | ✅ CSV |
| Airtable | ⭐⭐ Medium | Free* | ❌ No | ✅ Auto | ✅ CSV |
| Firebase | ⭐⭐⭐ Hard | Free* | ❌ No | ✅ Auto | ✅ JSON |
| Supabase | ⭐⭐⭐ Hard | Free* | ❌ No | ✅ Auto | ✅ CSV |

*Free tiers have limits

---

## Recommended Setup (Hybrid Approach)

**For Most People:**

1. **Use Airtable** for entry storage
   - Easy interface
   - Automatic counting
   - Export for winner selection

2. **Use Mailchimp** for newsletter
   - Connect via Zapier (no coding)
   - Send to "Newsletter = Yes" contacts
   - Manage unsubscribes

3. **Workflow:**
   - User submits form
   - Airtable stores entry
   - Zapier copies to Mailchimp (if newsletter = yes)
   - Send newsletters via Mailchimp
   - Export Airtable for winner selection

---

## Integration Example (Airtable)

Update `index.html` submit function:

```javascript
async function submitVote() {
    const email = document.getElementById('email').value;
    const newsletter = document.getElementById('newsletter').checked;

    // Check daily limit (client-side - still use localStorage)
    if (hasVotedToday(email)) {
        showError('Already voted today!');
        return;
    }

    // Submit to Airtable
    const AIRTABLE_URL = 'https://api.airtable.com/v0/YOUR_BASE/Entries';
    const API_KEY = 'YOUR_API_KEY';

    try {
        const response = await fetch(AIRTABLE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: {
                    Email: email,
                    Newsletter: newsletter,
                    Timestamp: new Date().toISOString()
                }
            })
        });

        if (response.ok) {
            // Record in localStorage
            localStorage.setItem('lastVote_' + email, Date.now());

            // Perform auto-vote
            await performAutoVote();

            // Show success
            showThankYou(newsletter ? 3 : 1);
        }
    } catch (error) {
        showError('Submission failed. Please try again.');
    }
}
```

**Security Note:** Don't expose API keys in client-side code. Use a serverless function or backend proxy.

---

## Next Steps

1. **Choose your backend** solution
2. **Set up the service** (follow steps above)
3. **Update `index.html`** with API integration
4. **Test thoroughly** before launch
5. **Monitor entries** during campaign
6. **Export data** for winner selection

---

## Need Help?

- **Google Forms:** support.google.com/docs/answer/6281888
- **Mailchimp:** mailchimp.com/help
- **Airtable:** support.airtable.com
- **Firebase:** firebase.google.com/docs
- **Supabase:** supabase.com/docs

---

**Ready to collect entries? Pick the solution that fits your technical skills and budget!**
