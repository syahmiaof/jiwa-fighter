// Adversarial stress test for Shop filtering & sorting across 390px, 1440px, and 1920px viewports
const { chromium, expect } = require('@playwright/test');
const assert = require('node:assert/strict');

const base = process.env.BASE_URL || 'http://localhost:3000';

const viewports = [
  { name: 'mobile-390px', width: 390, height: 844 },
  { name: 'desktop-1440px', width: 1440, height: 900 },
  { name: 'desktop-wide-1920px', width: 1920, height: 1080 },
];

async function checkOverflow(page, contextStr) {
  const isOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 1;
  });
  assert.equal(isOverflow, false, `Horizontal overflow detected at ${contextStr}`);
}

async function getProductPrices(page) {
  const cards = page.locator('.shop-product-card');
  return cards.evaluateAll((nodes) =>
    nodes.map((node) => {
      const match = node.innerText.match(/RM\s*([\d.]+)/);
      return match ? Number(match[1]) : 0;
    })
  );
}

async function runViewportTest(browser, vp) {
  console.log(`\n=== TESTING VIEWPORT: ${vp.name} (${vp.width}x${vp.height}) ===`);
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();

  const runtimeErrors = [];
  page.on('pageerror', (err) => runtimeErrors.push(err.message));

  try {
    // 1. Initial Load
    console.log(`[${vp.name}] Loading /shop...`);
    await page.goto(`${base}/shop`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await checkOverflow(page, `${vp.name} initial load`);

    const cards = page.locator('.shop-product-card');
    const initialCount = await cards.count();
    console.log(`[${vp.name}] Initial product count: ${initialCount}`);
    assert.equal(initialCount, 8, 'Total products in shop catalog should be 8');

    // 2. Filter by Collection: Silat Series
    console.log(`[${vp.name}] Testing Collection filter: Silat Series...`);
    const silatCheckbox = page.getByRole('checkbox', { name: 'Silat Series', exact: true });
    await silatCheckbox.scrollIntoViewIfNeeded();
    await silatCheckbox.check();
    await page.waitForTimeout(200);
    const silatCount = await cards.count();
    console.log(`[${vp.name}] Silat Series count: ${silatCount}`);
    assert.equal(silatCount, 3, 'Silat Series should return exactly 3 items');
    await checkOverflow(page, `${vp.name} Silat filter`);

    // 3. Multi-filter: add Category "Training Wear"
    console.log(`[${vp.name}] Testing Multi-filter: Silat Series + Training Wear...`);
    const trainingCheckbox = page.getByRole('checkbox', { name: 'Training Wear', exact: true });
    await trainingCheckbox.scrollIntoViewIfNeeded();
    await trainingCheckbox.check();
    await page.waitForTimeout(200);
    const multiCount = await cards.count();
    console.log(`[${vp.name}] Silat + Training Wear count: ${multiCount}`);
    assert.equal(multiCount, 1, 'Silat + Training Wear should return exactly 1 item');
    const cardTitle = (await cards.first().locator('h3').innerText()).trim();
    assert.ok(cardTitle.includes('TRAINING JERSEY'), 'Filtered item should be Silat Training Jersey');
    await checkOverflow(page, `${vp.name} multi-filter`);

    // Uncheck both
    await trainingCheckbox.uncheck();
    await silatCheckbox.uncheck();
    await page.waitForTimeout(200);
    assert.equal(await cards.count(), 8, 'Resetting checkboxes restores 8 items');

    // 4. Empty state adversarial challenge: Hoodie + Silat Series (0 matches)
    console.log(`[${vp.name}] Testing Empty state: Silat Series + Hoodie...`);
    await silatCheckbox.scrollIntoViewIfNeeded();
    await silatCheckbox.check();
    const hoodieCheckbox = page.getByRole('checkbox', { name: 'Hoodie', exact: true });
    await hoodieCheckbox.scrollIntoViewIfNeeded();
    await hoodieCheckbox.check();
    await page.waitForTimeout(200);
    assert.equal(await cards.count(), 0, 'No products should match Silat + Hoodie');

    // Verify empty state display
    await expect(page.getByText('NO PRODUCTS FOUND', { exact: true })).toBeVisible();
    await checkOverflow(page, `${vp.name} empty state`);

    // Reset via reset button
    console.log(`[${vp.name}] Clicking RESET ALL FILTERS button...`);
    const resetBtn = page.getByRole('button', { name: /RESET ALL FILTERS/i });
    await resetBtn.scrollIntoViewIfNeeded();
    await resetBtn.click();
    await page.waitForTimeout(200);
    assert.equal(await cards.count(), 8, 'Reset all filters restored catalog to 8 items');
    await checkOverflow(page, `${vp.name} post reset`);

    // 5. Sorting: Price Low to High
    console.log(`[${vp.name}] Testing Sort: Price Low to High...`);
    const sortSelect = page.locator('select');
    await sortSelect.scrollIntoViewIfNeeded();
    await sortSelect.selectOption('low');
    await page.waitForTimeout(200);
    const lowToHigh = await getProductPrices(page);
    console.log(`[${vp.name}] Prices (Low -> High):`, lowToHigh);
    for (let i = 0; i < lowToHigh.length - 1; i++) {
      assert.ok(lowToHigh[i] <= lowToHigh[i + 1], `Price ${lowToHigh[i]} should be <= ${lowToHigh[i + 1]}`);
    }
    await checkOverflow(page, `${vp.name} sort low to high`);

    // 6. Sorting: Price High to Low
    console.log(`[${vp.name}] Testing Sort: Price High to Low...`);
    await sortSelect.selectOption('high');
    await page.waitForTimeout(200);
    const highToLow = await getProductPrices(page);
    console.log(`[${vp.name}] Prices (High -> Low):`, highToLow);
    for (let i = 0; i < highToLow.length - 1; i++) {
      assert.ok(highToLow[i] >= highToLow[i + 1], `Price ${highToLow[i]} should be >= ${highToLow[i + 1]}`);
    }
    await checkOverflow(page, `${vp.name} sort high to low`);

    // 7. Full scroll sweep check
    console.log(`[${vp.name}] Performing full scroll sweep to check layout stability...`);
    const scrollMax = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    for (let y = 0; y <= scrollMax; y += vp.height * 0.7) {
      await page.evaluate((val) => window.scrollTo(0, val), y);
      await page.waitForTimeout(100);
      await checkOverflow(page, `${vp.name} scroll at ${y}px`);
    }

    assert.deepEqual(runtimeErrors, [], `No runtime errors expected at viewport ${vp.name}`);
    console.log(`PASS Viewport ${vp.name} completed with zero errors.`);
  } finally {
    await context.close();
  }
}

async function run() {
  console.log('--- STARTING ADVERSARIAL SHOP FILTERING & SORTING SUITE ---');
  const browser = await chromium.launch();
  try {
    for (const vp of viewports) {
      await runViewportTest(browser, vp);
    }
    console.log('\n--- ALL VIEWPORT FILTERING & SORTING TESTS PASSED ---');
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error('FATAL TEST ERROR:', err);
  process.exit(1);
});
