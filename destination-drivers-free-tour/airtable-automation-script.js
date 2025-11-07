/**
 * Airtable Script Automation for Destination Drivers Giveaway
 * Enforces 3 entries max per day per email address
 *
 * SETUP:
 * 1. Delete the existing "Create Bonus Entries" automation
 * 2. Create new automation with trigger: "When record created"
 * 3. Add action: "Run script"
 * 4. Paste this entire script
 */

let inputConfig = input.config();
let table = base.getTable('Entries');

// Get the newly created record from the trigger
let recordId = inputConfig.recordId;
let record = await table.selectRecordAsync(recordId);

if (!record) {
    console.log('No record found');
    throw new Error('Record not found');
}

// Get record details
let email = record.getCellValue('Email');
let voteDate = record.getCellValue('Vote Date');
let newsletter = record.getCellValue('Newsletter Opt-In');
let entryType = record.getCellValue('Entry Type');
let voteTimestamp = record.getCellValue('Vote Timestamp');
let ipAddress = record.getCellValue('IP Address');
let status = record.getCellValue('Status');

console.log(`Processing record for ${email}, Newsletter: ${newsletter}, Entry Type: ${entryType ? entryType.name : 'none'}`);

// Only process if this is an "Original" entry with newsletter opt-in
if (!newsletter) {
    console.log('Newsletter not checked - no bonus entries');
    return;
}

if (!entryType || entryType.name !== 'Original') {
    console.log('Not an Original entry - skipping');
    return;
}

// Check how many entries this email already has for this date
let voteDateStr = voteDate; // Already in YYYY-MM-DD format from Airtable

// Query for all entries from this email on this date
let queryResult = await table.selectRecordsAsync({
    fields: ['Email', 'Vote Date', 'Entry Type']
});

let entriesThisDay = queryResult.records.filter(r => {
    let rEmail = r.getCellValue('Email');
    let rDate = r.getCellValue('Vote Date');
    return rEmail === email && rDate === voteDateStr;
});

console.log(`Found ${entriesThisDay.length} existing entries for ${email} on ${voteDateStr}`);

// Count only "Original" entries to detect duplicates
let originalEntries = entriesThisDay.filter(r => {
    let rType = r.getCellValue('Entry Type');
    return rType && rType.name === 'Original';
});

console.log(`Original entries: ${originalEntries.length}`);

// If there's already an original entry (not counting the one we just created), it's a duplicate
if (originalEntries.length > 1) {
    console.log('⚠️ DUPLICATE VOTE DETECTED - Already voted today!');
    // Mark the new record as duplicate
    await table.updateRecordAsync(recordId, {
        'Status': {name: 'Duplicate'}
    });
    console.log('Marked as Duplicate - no bonus entries created');
    return;
}

// Check if this email already has bonus entries today
let bonusEntries = entriesThisDay.filter(r => {
    let rType = r.getCellValue('Entry Type');
    return rType && (rType.name === 'Bonus 1' || rType.name === 'Bonus 2');
});

console.log(`Bonus entries already exist: ${bonusEntries.length}`);

// If bonus entries already exist, don't create more
if (bonusEntries.length >= 2) {
    console.log('⚠️ Bonus entries already exist for today - not creating duplicates');
    return;
}

// If total entries (including the one just created) would exceed 3, don't create bonus
if (entriesThisDay.length >= 3) {
    console.log('⚠️ Already at 3 entries for today - not creating bonus entries');
    return;
}

// All checks passed - create bonus entries!
console.log('✅ Creating 2 bonus entries...');

try {
    // Create Bonus 1
    await table.createRecordAsync({
        'Email': email,
        'Vote Date': voteDate,
        'Vote Timestamp': voteTimestamp,
        'Newsletter Opt-In': newsletter,
        'Entry Type': {name: 'Bonus 1'},
        'IP Address': ipAddress,
        'Status': {name: 'Valid'}
    });
    console.log('✅ Created Bonus 1');

    // Create Bonus 2
    await table.createRecordAsync({
        'Email': email,
        'Vote Date': voteDate,
        'Vote Timestamp': voteTimestamp,
        'Newsletter Opt-In': newsletter,
        'Entry Type': {name: 'Bonus 2'},
        'IP Address': ipAddress,
        'Status': {name: 'Valid'}
    });
    console.log('✅ Created Bonus 2');

    console.log(`✅ SUCCESS: 3 total entries created for ${email} on ${voteDateStr}`);
} catch (error) {
    console.error('❌ Error creating bonus entries:', error);
    throw error;
}
