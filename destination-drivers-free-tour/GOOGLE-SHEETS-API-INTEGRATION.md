# Google Sheets API Integration (Advanced)

If you want your website to submit directly to Google Sheets instead of using Google Forms, follow this guide.

---

## Setup Steps

### 1. Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project: "Destination Drivers Giveaway"
3. Enable **Google Sheets API**:
   - APIs & Services → Library
   - Search "Google Sheets API"
   - Click **Enable**

### 2. Create Service Account

1. APIs & Services → Credentials
2. Create Credentials → **Service Account**
3. Name: "Giveaway Form Submissions"
4. Grant role: **Editor**
5. Click **Done**

### 3. Create Key

1. Click on the service account you just created
2. Keys → Add Key → Create New Key
3. Choose **JSON**
4. Download and save as `service-account-key.json`

### 4. Share Sheet with Service Account

1. Open the downloaded JSON file
2. Copy the `client_email` value (looks like: `giveaway-form@project-id.iam.gserviceaccount.com`)
3. Open your Google Sheet
4. Click **Share**
5. Paste the service account email
6. Give **Editor** access
7. Uncheck "Notify people"
8. Click **Done**

### 5. Get Sheet ID

From your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```
Copy the `SHEET_ID_HERE` part

---

## Backend Code (Node.js)

Since you can't expose service account keys in client-side code, you need a simple backend.

### Option A: Create a Netlify/Vercel Function (Serverless)

Create file: `netlify/functions/submit-entry.js`

```javascript
const { google } = require('googleapis');

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, newsletter, voteDate, voteTime, ipAddress } = JSON.parse(event.body);

    // Set up Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Get current row count to generate entry number
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:A',
    });

    const currentRows = response.data.values ? response.data.values.length : 1;
    let entryNumber = currentRows; // This will be the next entry number

    // Prepare row data
    const rowData = [
      entryNumber,
      email,
      voteDate,
      voteTime,
      newsletter,
      'Original',
      ipAddress || '',
      'Valid',
      'Website submission'
    ];

    // Append the original entry
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:I',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowData],
      },
    });

    // If newsletter opt-in, create 2 bonus entries
    if (newsletter === true || newsletter === 'true' || newsletter === 'Yes') {
      const bonusEntries = [
        [entryNumber + 1, email, voteDate, voteTime, newsletter, 'Bonus 1', ipAddress || '', 'Valid', 'Auto-generated'],
        [entryNumber + 2, email, voteDate, voteTime, newsletter, 'Bonus 2', ipAddress || '', 'Valid', 'Auto-generated']
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A:I',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: bonusEntries,
        },
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        entries: newsletter ? 3 : 1
      }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Submission failed' }),
    };
  }
};
```

### Environment Variables (Netlify/Vercel)

Add these to your deployment settings:
```
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}
```

---

## Frontend Code (index.html)

Update your `submitVote()` function:

```javascript
async function submitVote() {
    hideError();

    const email = document.getElementById('email').value.trim();
    const newsletter = document.getElementById('newsletter').checked;

    // Validate email
    if (!email || !isValidEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }

    // Check if already voted today
    if (hasVotedToday(email)) {
        showError('You\'ve already voted today! Come back tomorrow for another entry.');
        return;
    }

    // Check if voting period has ended
    if (new Date().getTime() >= votingEndDate) {
        showError('Voting has ended. Thank you for your interest!');
        return;
    }

    // Show loading
    document.getElementById('mainForm').style.display = 'none';
    document.getElementById('loading').classList.add('active');

    // Prepare data
    const now = new Date();
    const voteData = {
        email: email,
        newsletter: newsletter,
        voteDate: now.toLocaleDateString('en-US'),
        voteTime: now.toLocaleTimeString('en-US'),
        ipAddress: '', // Optional: get from ipify.org or similar
    };

    try {
        // Submit to your serverless function
        const response = await fetch('/.netlify/functions/submit-entry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(voteData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Submission failed');
        }

        // Auto-vote on votecentralcoast.com
        await performAutoVote();

        // Record vote in localStorage
        localStorage.setItem('lastVote_' + email, Date.now().toString());

        // Store entries info
        const totalVotes = parseInt(localStorage.getItem('totalVotes_' + email) || '0') + 1;
        const totalEntries = parseInt(localStorage.getItem('totalEntries_' + email) || '0') + result.entries;
        localStorage.setItem('totalVotes_' + email, totalVotes.toString());
        localStorage.setItem('totalEntries_' + email, totalEntries.toString());

        // Show thank you message
        setTimeout(() => {
            document.getElementById('loading').classList.remove('active');
            document.getElementById('thankYou').classList.add('active');

            const entriesText = newsletter
                ? `You received 3 entries! (Newsletter subscriber bonus)`
                : `You received 1 entry`;

            document.getElementById('entriesCount').textContent =
                `${entriesText}\n\nTotal entries so far: ${totalEntries}`;
        }, 3000);

    } catch (error) {
        console.error('Submission error:', error);
        showError('Failed to submit entry. Please try again.');
        document.getElementById('loading').classList.remove('active');
        document.getElementById('mainForm').style.display = 'block';
    }
}
```

---

## Package.json (for serverless function)

```json
{
  "name": "destination-drivers-functions",
  "version": "1.0.0",
  "dependencies": {
    "googleapis": "^118.0.0"
  }
}
```

---

## Deployment

### Using Netlify:

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify init`
3. Deploy: `netlify deploy --prod`
4. Add environment variables in Netlify dashboard

### Using Vercel:

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard

---

## Security Notes

- **Never** expose service account keys in client-side code
- Use environment variables for all sensitive data
- Consider adding rate limiting to prevent abuse
- Validate all inputs on the backend
- Use CORS headers to restrict which domains can call your function

---

## Simpler Alternative: Google Apps Script Web App

If serverless functions are too complex, use Google Apps Script as your backend:

### 1. Create Web App in Apps Script

In your Google Sheet's Apps Script editor, add this function:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  const data = JSON.parse(e.postData.contents);

  const email = data.email;
  const newsletter = data.newsletter;
  const voteDate = data.voteDate;
  const voteTime = data.voteTime;

  // Get next entry number
  const lastRow = sheet.getLastRow();
  let entryNumber = lastRow;

  // Add original entry
  sheet.appendRow([
    entryNumber,
    email,
    voteDate,
    voteTime,
    newsletter,
    'Original',
    '',
    'Valid',
    'Web submission'
  ]);

  let totalEntries = 1;

  // Add bonus entries if newsletter
  if (newsletter === true || newsletter === 'true') {
    sheet.appendRow([entryNumber + 1, email, voteDate, voteTime, newsletter, 'Bonus 1', '', 'Valid', 'Auto']);
    sheet.appendRow([entryNumber + 2, email, voteDate, voteTime, newsletter, 'Bonus 2', '', 'Valid', 'Auto']);
    totalEntries = 3;
  }

  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    entries: totalEntries
  })).setMimeType(ContentService.MimeType.JSON);
}
```

### 2. Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy the Web App URL

### 3. Update Frontend

```javascript
const SCRIPT_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL';

const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(voteData)
});
```

---

**Recommended:** Use Google Apps Script Web App - it's free, simple, and doesn't require external hosting!
