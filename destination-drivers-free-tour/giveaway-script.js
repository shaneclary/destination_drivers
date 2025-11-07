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

  SpreadsheetApp.getUi().alert('Validation Complete!\n\nFlagged ' + flaggedCount + ' duplicate entries.');
}
