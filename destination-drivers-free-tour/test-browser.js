/**
 * Quick test to verify Playwright can open a visible browser
 */
const { chromium } = require('playwright');

async function testBrowser() {
    console.log('🧪 Testing if Playwright can open a visible browser...\n');

    const browser = await chromium.launch({
        headless: false,  // Show browser
        slowMo: 100
    });

    const page = await browser.newPage();

    await page.goto('https://www.google.com');

    console.log('✅ Browser window should be visible now!');
    console.log('⏳ Keeping it open for 30 seconds...');
    console.log('👀 Check your screen - do you see a Google page?\n');

    await page.waitForTimeout(30000);  // 30 seconds

    await browser.close();
    console.log('🔒 Browser closed');
}

testBrowser().catch(console.error);
