const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

async function runVisualQA() {
  const screenshotDir = path.join(__dirname, '..', 'tests', 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1536, height: 1024 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const failedRequests = [];
  page.on('requestfailed', (req) => {
    failedRequests.push(`${req.method()} ${req.url()}: ${req.failure()?.errorText}`);
  });

  const routes = [
    { url: 'http://localhost:3000/', name: '01-homepage' },
    { url: 'http://localhost:3000/collections/silat-series', name: '02-silat-series' },
    { url: 'http://localhost:3000/shop', name: '03-shop' },
    { url: 'http://localhost:3000/products/keris-tuah', name: '04-product-keris-tuah' },
    { url: 'http://localhost:3000/lookbook', name: '05-lookbook' },
    { url: 'http://localhost:3000/our-story', name: '06-our-story' },
    { url: 'http://localhost:3000/custom', name: '07-teamwear' },
    { url: 'http://localhost:3000/support', name: '08-support' },
    { url: 'http://localhost:3000/size-guide', name: '09-size-guide' },
  ];

  console.log('--- CAPTURING ALL 9 ROUTES AT 1536x1024 ---');

  for (const r of routes) {
    console.log(`Navigating to ${r.url}...`);
    await page.goto(r.url, { waitUntil: 'domcontentloaded' });
    // Wait a brief moment for GSAP entrance and images
    await page.waitForTimeout(800);

    // Viewport screenshot (matches reference 1536x1024)
    const viewportPath = path.join(screenshotDir, `${r.name}-viewport.png`);
    await page.screenshot({ path: viewportPath, fullPage: false });
    console.log(`Saved: ${viewportPath}`);

    // Full page screenshot
    const fullPath = path.join(screenshotDir, `${r.name}-full.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`Saved: ${fullPath}`);
  }

  console.log('\n--- TESTING FUNCTIONAL INTERACTIONS ---');

  // 1. Test Language Switcher
  console.log('Testing EN -> BM language switch...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  await page.click('button:has-text("BM")');
  await page.waitForTimeout(500);
  const bmHeadline = await page.textContent('h1');
  console.log('BM headline on homepage:', bmHeadline?.trim());
  await page.screenshot({ path: path.join(screenshotDir, 'interaction-bm-homepage.png') });

  // Switch back to EN
  await page.click('button:has-text("EN")');
  await page.waitForTimeout(400);

  // 2. Test Add to Bag & Cart Drawer
  console.log('Testing Add to Bag on Keris Tuah product page...');
  await page.goto('http://localhost:3000/products/keris-tuah', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  await page.click('button:has-text("ADD TO BAG")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(screenshotDir, 'interaction-cart-drawer.png') });
  console.log('Cart drawer captured.');

  // Click Checkout to trigger Demo Modal
  await page.click('button:has-text("PROCEED TO CHECKOUT")');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(screenshotDir, 'interaction-checkout-modal.png') });
  console.log('Checkout demo modal captured.');
  await page.click('button:has-text("ACKNOWLEDGE")');
  await page.waitForTimeout(400);

  // 3. Test Shop Filters
  console.log('Testing Shop All filters...');
  await page.goto('http://localhost:3000/shop', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  // Click category 'Hoodie'
  await page.click('label:has-text("Hoodie") input');
  await page.waitForTimeout(400);
  const pieceCount = await page.textContent('.text-brass');
  console.log('Filtered pieces count for Hoodie:', pieceCount?.trim());
  await page.screenshot({ path: path.join(screenshotDir, 'interaction-shop-filter.png') });

  // 4. Test FAQ Accordions
  console.log('Testing FAQ accordion on Support page...');
  await page.goto('http://localhost:3000/support', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  await page.click('button:has-text("How can I track an order?")');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(screenshotDir, 'interaction-faq-open.png') });

  // 5. Test Custom Teamwear Form
  console.log('Testing Teamwear quote submission...');
  await page.goto('http://localhost:3000/custom', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  await page.fill('input[placeholder*="Kelab Silat"]', 'Harimau Berantai Silat Club');
  await page.fill('input[placeholder*="you@organisation"]', 'coach@harimausilat.my');
  const selects = page.locator('select');
  await selects.nth(0).selectOption({ index: 1 });
  await selects.nth(1).selectOption({ index: 2 });
  await page.click('button:has-text("REQUEST QUOTATION")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotDir, 'interaction-teamwear-submitted.png') });

  // 6. Test Size Guide Row selection
  console.log('Testing Size Guide interaction...');
  await page.goto('http://localhost:3000/size-guide', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  await page.click('tr:has-text("XL")');
  await page.click('button:has-text("RELAXED FIT")');
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(screenshotDir, 'interaction-size-guide.png') });

  console.log('\n--- VERIFICATION SUMMARY ---');
  console.log('Console Errors:', consoleErrors.length ? consoleErrors : 'None');
  console.log('Failed Network Requests:', failedRequests.length ? failedRequests : 'None');

  await browser.close();
  console.log('Visual QA Run Complete!');
}

runVisualQA().catch((err) => {
  console.error('Visual QA error:', err);
  process.exit(1);
});
