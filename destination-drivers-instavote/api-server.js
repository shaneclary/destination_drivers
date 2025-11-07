/**
 * AUTO-VOTE API SERVER
 *
 * This Express.js server provides an API endpoint that triggers
 * automated voting using Playwright.
 *
 * Usage:
 *   npm install express playwright cors
 *   node api-server.js
 *
 * Endpoint:
 *   POST http://localhost:3000/api/auto-vote
 *   Body: { "email": "user@example.com" }
 */

const express = require('express');
const cors = require('cors');
const { chromium } = require('playwright');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow requests from your giveaway page
app.use(express.json());

// Store active automation sessions
const activeSessions = new Map();

/**
 * Auto-vote function using Playwright
 */
async function performAutoVote(email) {
    console.log(`🚗 Starting auto-vote for: ${email}`);

    const browser = await chromium.launch({
        headless: false,  // Show browser so user can see and submit
        channel: 'msedge',  // Use Microsoft Edge (pre-installed on Windows)
        slowMo: 100,
        args: [
            '--start-maximized',  // Start maximized
            '--window-position=0,0'  // Position at top-left
        ]
    });

    const context = await browser.newContext({
        viewport: null  // Use full window size
    });
    const page = await context.newPage();

    // Bring window to front
    await page.bringToFront();

    try {
        // Step 1: Navigate to voting site
        console.log('📍 Loading votecentralcoast.com...');
        await page.goto('https://www.votecentralcoast.com', {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        await page.waitForTimeout(2000);

        // Step 2: Click Wineries category
        console.log('🍷 Clicking Wineries...');
        const wineriesCategory = page.getByText('Wineries').first();
        await wineriesCategory.click();
        await page.waitForTimeout(1500);

        // Step 3: Click Wine Tour subcategory
        console.log('🍇 Clicking Wine Tour...');
        const wineTourSubcat = page.getByText(/^Wine Tour$/i).first();
        await wineTourSubcat.click();
        await page.waitForTimeout(1500);

        // Step 4: Find and click Destination Drivers
        console.log('✅ Selecting Destination Drivers...');
        const destinationDrivers = page.getByText(/Destination.*Driver/i).first();

        // Scroll into view
        await destinationDrivers.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Click the radio button/checkbox
        await destinationDrivers.click();
        await page.waitForTimeout(1000);

        // Highlight it for visibility
        await destinationDrivers.evaluate(el => {
            const label = el.closest('label') || el;
            label.style.backgroundColor = '#90EE90';
            label.style.padding = '10px';
            label.style.border = '3px solid #28a745';
            label.style.borderRadius = '8px';
        });

        console.log('✅ SUCCESS! Destination Drivers selected');
        console.log('💡 Browser will stay open for user to submit ballot');

        // Keep browser open for 10 minutes
        // User can manually submit when ready
        await page.waitForTimeout(600000);

        return {
            success: true,
            message: 'Vote selected! Browser window is open for you to submit.'
        };

    } catch (error) {
        console.error('❌ Error:', error.message);

        // Keep browser open even on error so user can complete manually
        await page.waitForTimeout(300000);

        return {
            success: false,
            error: error.message,
            message: 'Could not auto-select. Please vote manually in the opened browser.'
        };
    } finally {
        await browser.close();
        console.log('🔒 Browser closed');
    }
}

/**
 * POST /api/auto-vote
 * Trigger automated voting
 */
app.post('/api/auto-vote', async (req, res) => {
    const { email } = req.body;
    const sessionKey = email || 'anonymous_' + Date.now();

    console.log(`\n📨 Received auto-vote request${email ? ' for: ' + email : ' (no email provided)'}`);

    // Check if there's already an active session for this email/session
    if (email && activeSessions.has(email)) {
        return res.json({
            success: true,
            message: 'Automation already running for this email',
            alreadyActive: true
        });
    }

    // Mark session as active
    activeSessions.set(sessionKey, Date.now());

    // Run automation in background (don't block response)
    performAutoVote(sessionKey)
        .then(() => {
            activeSessions.delete(sessionKey);
        })
        .catch(error => {
            console.error('Automation error:', error);
            activeSessions.delete(sessionKey);
        });

    // Immediately respond that automation started
    res.json({
        success: true,
        message: 'Auto-vote started! Check your screen for the browser window.',
        email: email || null
    });
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Destination Drivers Auto-Vote API',
        activeSessions: activeSessions.size
    });
});

/**
 * GET /
 * Root endpoint
 */
app.get('/', (req, res) => {
    res.json({
        service: 'Destination Drivers Auto-Vote API',
        version: '1.0.0',
        endpoints: {
            'POST /api/auto-vote': 'Trigger auto-vote (requires: { email })',
            'GET /api/health': 'Health check'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log('\n🚀 Auto-Vote API Server Running!');
    console.log(`📡 Listening on: http://localhost:${PORT}`);
    console.log(`💡 Endpoint: POST http://localhost:${PORT}/api/auto-vote`);
    console.log(`💡 Health check: GET http://localhost:${PORT}/api/health`);
    console.log('\n✨ Ready to accept auto-vote requests!\n');
});
