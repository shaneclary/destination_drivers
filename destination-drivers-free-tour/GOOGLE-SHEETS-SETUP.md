# Google Sheets Setup for Destination Drivers Giveaway

## Quick Setup (5 Minutes)

### Step 1: Create the Google Sheet

1. **Upload the template:**
   - Go to Google Drive: `G:\.shortcut-targets-by-id\1s05-i812RbS5IA2eNCc3-YWn2ruE7Vqm\mothership\Shane's Folder\Destination Drivers`
   - Click **New** → **File upload**
   - Upload: `giveaway-entries-template.csv`
   - Once uploaded, right-click the file → **Open with** → **Google Sheets**
   - File → **Save as Google Sheets**
   - Rename to: **"Destination Drivers - Giveaway Entries"**

2. **Set up the columns:**

Your sheet now has these columns:
- **A: Entry Number** - Sequential number for each entry
- **B: Email** - Participant's email
- **C: Vote Date** - Date they voted (MM/DD/YYYY)
- **D: Vote Time** - Time they voted
- **E: Newsletter Opt-In** - TRUE or FALSE
- **F: Entry Type** - "Original", "Bonus 1", or "Bonus 2"
- **G: IP Address** - (optional) for fraud detection
- **H: Status** - "Valid", "Duplicate", "Flagged", or "Winner"
- **I: Notes** - Any additional notes

---

### Step 2: Set Up Google Form (Data Entry)

1. **Create Google Form:**
   - In your Google Sheet, click **Tools** → **Create a new form**
   - Title: "Destination Drivers - Free Tour Entry"

2. **Form Setup:**
   - The form auto-creates based on your sheet columns
   - **Edit the form:**
     - Make **Email** required
     - Make **Newsletter Opt-In** a checkbox (checked by default)
     - Hide these from users (you'll auto-fill them):
       - Entry Number
       - Vote Date
       - Vote Time
       - Entry Type (always "Original")
       - Status (always "Valid")

3. **Get Form URL:**
   - Click **Send** → Copy link
   - Save this URL - you'll need it for the website integration

---

### Step 3: Add Automation Script

This script automatically creates 2 bonus entries when someone opts into the newsletter.

1. **Open Script Editor:**
   - In your Google Sheet, click **Extensions** → **Apps Script**

2. **Delete any existing code and paste this:**

```javascript
/**
 * Destination Drivers Giveaway - Auto Entry Generator
 * Creates 2 bonus entries for newsletter subscribers
 */

function onFormSubmit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  const lastRow = sheet.getLastRow();

  // Get the data from the newly submitted row
  const email = sheet.getRange(lastRow, 2).getValue(); // Column B
  const voteDate = sheet.getRange(lastRow, 3).getValue(); // Column C
  const voteTime = sheet.getRange(lastRow, 4).getValue(); // Column D
  const newsletter = sheet.getRange(lastRow, 5).getValue(); // Column E
  const ipAddress = sheet.getRange(lastRow, 7).getValue(); // Column G
  const status = sheet.getRange(lastRow, 8).getValue(); // Column H

  // Auto-number the entry
  let entryNumber = lastRow - 1; // -1 because row 1 is header
  sheet.getRange(lastRow, 1).setValue(entryNumber);

  // Set Entry Type to "Original"
  sheet.getRange(lastRow, 6).setValue('Original');

  // If newsletter opt-in is TRUE, create 2 bonus entries
  if (newsletter === true || newsletter === 'TRUE' || newsletter === 'Yes') {

    // Create Bonus Entry 1
    entryNumber++;
    sheet.appendRow([
      entryNumber,           // Entry Number
      email,                 // Email
      voteDate,              // Vote Date
      voteTime,              // Vote Time
      newsletter,            // Newsletter Opt-In
      'Bonus 1',             // Entry Type
      ipAddress,             // IP Address
      status,                // Status
      'Auto-generated'       // Notes
    ]);

    // Create Bonus Entry 2
    entryNumber++;
    sheet.appendRow([
      entryNumber,           // Entry Number
      email,                 // Email
      voteDate,              // Vote Date
      voteTime,              // Vote Time
      newsletter,            // Newsletter Opt-In
      'Bonus 2',             // Entry Type
      ipAddress,             // IP Address
      status,                // Status
      'Auto-generated'       // Notes
    ]);
  }
}

/**
 * Creates the trigger for form submission
 */
function createFormSubmitTrigger() {
  const sheet = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(sheet)
    .onFormSubmit()
    .create();
}

/**
 * Validates daily vote limit (run manually before drawing)
 */
function checkDailyVoteLimits() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  const data = sheet.getDataRange().getValues();
  const violations = {};

  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const email = data[i][1]; // Column B
    const voteDate = data[i][2]; // Column C
    const entryType = data[i][5]; // Column F

    // Only count "Original" entries (not bonus entries)
    if (entryType === 'Original') {
      const key = email + '|' + voteDate;
      violations[key] = (violations[key] || 0) + 1;
    }
  }

  // Flag any email+date combinations with more than 1 original entry
  let flaggedCount = 0;
  for (let i = 1; i < data.length; i++) {
    const email = data[i][1];
    const voteDate = data[i][2];
    const key = email + '|' + voteDate;

    if (violations[key] > 1) {
      sheet.getRange(i + 1, 8).setValue('Duplicate'); // Column H (Status)
      flaggedCount++;
    }
  }

  SpreadsheetApp.getUi().alert('Validation Complete!\\n\\nFlagged ' + flaggedCount + ' duplicate entries.');
}
```

3. **Save the script:**
   - Click **Save** (disk icon)
   - Name it: "Giveaway Automation"

4. **Create the trigger:**
   - In Apps Script editor, click the **clock icon** (Triggers) on left sidebar
   - Click **+ Add Trigger** (bottom right)
   - Settings:
     - Function: `onFormSubmit`
     - Event source: `From spreadsheet`
     - Event type: `On form submit`
   - Click **Save**
   - Grant permissions when prompted

---

### Step 4: Set Up Sheet Filters & Views

1. **Create "All Entries" view:**
   - Click **Data** → **Filter views** → **Create new filter view**
   - Name: "All Entries"
   - No filters applied - shows everything

2. **Create "Valid Entries Only" view:**
   - Click **Data** → **Filter views** → **Create new filter view**
   - Name: "Valid Entries Only"
   - Click filter icon on column H (Status)
   - Select only: **Valid**
   - This is your winner pool!

3. **Create "Grouped by Email" view:**
   - Click **Data** → **Filter views** → **Create new filter view**
   - Name: "By Email"
   - Click **Data** → **Create a pivot table**
   - Rows: Email
   - Values: COUNTA of Entry Number

4. **Create "Daily Votes" view:**
   - Click **Data** → **Filter views** → **Create new filter view**
   - Name: "Daily Votes"
   - Filter Column F (Entry Type) → Select only: **Original**

---

## Integration with Your Website

### Option 1: Use Google Form Directly (Easiest)

Update `index.html` to submit to your Google Form:

```javascript
async function submitToGoogleForm(email, newsletter, voteDate, voteTime) {
    const FORM_URL = 'YOUR_GOOGLE_FORM_URL'; // Get from Google Form "Send" button
    const FORM_ID = 'YOUR_FORM_ID'; // Extract from URL

    // Google Form field IDs (find these by inspecting the form)
    const formData = new FormData();
    formData.append('entry.XXXXX', email); // Replace XXXXX with actual field ID
    formData.append('entry.YYYYY', voteDate);
    formData.append('entry.ZZZZZ', voteTime);
    formData.append('entry.AAAAA', newsletter ? 'Yes' : 'No');
    formData.append('entry.BBBBB', 'Valid'); // Status

    await fetch(FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    });
}
```

### Option 2: Use Google Sheets API (More Control)

See `GOOGLE-SHEETS-API-INTEGRATION.md` for advanced setup.

---

## Winner Selection Process

After voting ends (11/14/2025):

### Step 1: Validate Data

1. In Google Sheet, click **Extensions** → **Apps Script**
2. Run function: `checkDailyVoteLimits`
3. This flags any duplicate entries

### Step 2: Export Valid Entries

1. Switch to **"Valid Entries Only"** filter view
2. Note the total number of rows (this is your total entries)
3. File → **Download** → **CSV**

### Step 3: Pick Winner

1. Go to **Random.org**
2. Generate random number between **1** and **[total entries]**
3. Find that Entry Number in your sheet
4. The Email in that row is your winner!

---

## Sample Data Structure

Here's what your filled sheet will look like:

| Entry # | Email | Vote Date | Vote Time | Newsletter | Entry Type | Status |
|---------|-------|-----------|-----------|------------|------------|--------|
| 1 | alice@email.com | 10/15/2025 | 2:30 PM | TRUE | Original | Valid |
| 2 | alice@email.com | 10/15/2025 | 2:30 PM | TRUE | Bonus 1 | Valid |
| 3 | alice@email.com | 10/15/2025 | 2:30 PM | TRUE | Bonus 2 | Valid |
| 4 | bob@email.com | 10/15/2025 | 3:45 PM | FALSE | Original | Valid |
| 5 | alice@email.com | 10/16/2025 | 1:15 PM | TRUE | Original | Valid |
| 6 | alice@email.com | 10/16/2025 | 1:15 PM | TRUE | Bonus 1 | Valid |
| 7 | alice@email.com | 10/16/2025 | 1:15 PM | TRUE | Bonus 2 | Valid |

**Result:**
- Alice voted 2 days with newsletter = 6 entries
- Bob voted 1 day without newsletter = 1 entry
- Total entries = 7
- Random.org picks number 1-7 to determine winner

---

## Troubleshooting

### Script not creating bonus entries?
1. Check trigger is set up (Extensions → Apps Script → Triggers)
2. Make sure Newsletter column contains TRUE/FALSE (not text)
3. Check execution log (Apps Script → Executions)

### Form not submitting to sheet?
1. Verify form is linked to sheet (Form → Responses → Link to Sheets)
2. Check sheet name is "Sheet1" or update script

### Can't find Form field IDs?
1. Open Google Form in preview mode
2. Right-click → Inspect
3. Look for `entry.XXXXX` in the HTML

---

## Quick Checklist

- [ ] Upload CSV template to Google Drive
- [ ] Convert to Google Sheets
- [ ] Rename to "Destination Drivers - Giveaway Entries"
- [ ] Create Google Form from sheet
- [ ] Copy Apps Script code
- [ ] Create form submit trigger
- [ ] Test form submission (should create 3 rows for newsletter, 1 row without)
- [ ] Set up filter views
- [ ] Get Form URL for website integration
- [ ] Update index.html with form submission code

---

**Total Setup Time: 5-10 minutes**

**No coding required after initial setup!**

All entries auto-populate, newsletter subscribers automatically get 3 rows, and you can export directly to pick a winner.
