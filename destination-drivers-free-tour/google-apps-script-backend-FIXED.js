/**
 * Google Apps Script Backend for Destination Drivers Giveaway
 * FIXED VERSION - Corrects date format for Airtable
 */

/**
 * Handles POST requests from your website
 */
function doPost(e) {
  try {
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const newsletter = data.newsletter;
    const voteDate = data.voteDate;
    const voteTime = data.voteTime;

    // Get Airtable credentials from script properties
    const props = PropertiesService.getScriptProperties();
    const token = props.getProperty('AIRTABLE_TOKEN');
    const baseId = props.getProperty('AIRTABLE_BASE_ID');
    const tableId = props.getProperty('AIRTABLE_TABLE_ID');

    if (!token || !baseId || !tableId) {
      return createResponse(500, 'Server configuration error');
    }

    // Check if email already voted today
    const hasVoted = checkDailyVote(email, voteDate, token, baseId, tableId);

    if (hasVoted) {
      return createResponse(400, 'You have already voted today! Come back tomorrow for another entry.');
    }

    // Submit entry to Airtable
    const result = submitToAirtable(email, newsletter, voteDate, voteTime, token, baseId, tableId);

    if (result.success) {
      return createResponse(200, {
        success: true,
        entries: newsletter ? 3 : 1,
        message: newsletter ? 'Entry submitted! You received 3 entries.' : 'Entry submitted! You received 1 entry.'
      });
    } else {
      return createResponse(500, 'Failed to submit entry: ' + result.error);
    }

  } catch (error) {
    Logger.log('Error in doPost: ' + error);
    return createResponse(500, 'Server error: ' + error.message);
  }
}

/**
 * Check if email already has an Original entry for today
 */
function checkDailyVote(email, voteDate, token, baseId, tableId) {
  const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

  // Build filter formula to find matching email, date, and entry type
  const formula = `AND(
    {Email} = '${email}',
    {Vote Date} = '${voteDate}',
    {Entry Type} = 'Original'
  )`;

  const options = {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    muteHttpExceptions: true
  };

  const params = `?filterByFormula=${encodeURIComponent(formula)}`;

  try {
    const response = UrlFetchApp.fetch(url + params, options);
    const result = JSON.parse(response.getContentText());

    // If any records found, they already voted today
    return result.records && result.records.length > 0;
  } catch (error) {
    Logger.log('Error checking daily vote: ' + error);
    return false; // Allow vote if check fails (fail open)
  }
}

/**
 * Submit entry to Airtable
 * FIXED: Corrects field formats for Airtable
 */
function submitToAirtable(email, newsletter, voteDate, voteTime, token, baseId, tableId) {
  const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

  // Build the payload - Newsletter Opt-In is a Single Select with options: "yes", "no", "checked"
  const payload = {
    fields: {
      'Email': email,
      'Vote Date': voteDate,
      'Newsletter Opt-In': newsletter === true || newsletter === 'true' ? 'checked' : 'no',
      'Entry Type': 'Original',
      'Status': 'Valid'
    }
  };

  Logger.log('Submitting to Airtable: ' + JSON.stringify(payload));

  const options = {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const statusCode = response.getResponseCode();

    if (statusCode === 200 || statusCode === 201) {
      Logger.log('Airtable success!');
      return { success: true };
    } else {
      const error = response.getContentText();
      Logger.log('Airtable error: ' + error);
      return { success: false, error: error };
    }
  } catch (error) {
    Logger.log('Error submitting to Airtable: ' + error);
    return { success: false, error: error.message };
  }
}

/**
 * Create JSON response
 */
function createResponse(statusCode, data) {
  const output = typeof data === 'string' ? { error: data } : data;

  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle OPTIONS requests for CORS
 */
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - run this to verify setup
 */
function testSubmission() {
  Logger.log('Starting test submission...');

  const testData = {
    email: 'test@example.com',
    newsletter: true,
    voteDate: '2025-01-15',
    voteTime: '2025-01-15T14:30:00'
  };

  Logger.log('Test data: ' + JSON.stringify(testData));

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData),
      type: 'application/json'
    }
  };

  Logger.log('Calling doPost...');

  try {
    const result = doPost(mockEvent);
    Logger.log('Result: ' + result.getContent());
  } catch (error) {
    Logger.log('Test error: ' + error);
  }
}
