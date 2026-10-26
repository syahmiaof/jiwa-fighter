// Adversarial Playwright test for language toggle persistence and content updates
const { chromium, expect } = require('@playwright/test');
const assert = require('node:assert/strict');

const base = process.env.BASE_URL || 'http://localhost:3000';

async function verifyOverflow(page, label) {
  const isOverflowing = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 1;
  });
  assert.equal(isOverflowing, false, `Horizontal overflow detected during: ${label}`);
}

async function run() {
  console.log('--- STARTING ADVERSARIAL LANGUAGE TOGGLE & PERSISTENCE SUITE ---');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const runtimeErrors = [];
  page.on('pageerror', (err) => runtimeErrors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') runtimeErrors.push(msg.text());
  });

  try {
    // -------------------------------------------------------------
    // 1. HOMEPAGE: Initial English State
    // -------------------------------------------------------------
    console.log('[Step 1] Visiting Homepage in default EN state...');
    await page.goto(`${base}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Initial language check
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    let h1Text = (await page.locator('h1.hero-headline').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(h1Text, 'THE FIGHT IS IN YOU.', 'Homepage EN headline');

    let heroSubtext = (await page.locator('.hero-subtext').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(heroSubtext, 'BORN FROM HERITAGE. MADE FOR MOVEMENT.', 'Homepage EN subtext');

    let heroKicker = (await page.locator('.hero-kicker').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(heroKicker, 'JIWA FIGHTER / CHAPTER 001', 'Homepage EN kicker');

    let s2Kicker = (await page.locator('.collection-rail .collection-reveal').first().innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(s2Kicker, 'OUR COLLECTIONS', 'Section 2 EN kicker');

    let s2Title = (await page.locator('.collection-rail h2').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(s2Title, 'THE FIRST CHAPTER', 'Section 2 EN title');

    let s2Desc = (await page.locator('.collection-rail p.collection-reveal').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(s2Desc, 'Modern combatwear. Timeless heritage. Engineered for those who move forward.', 'Section 2 EN description');

    let cardTitles = await page.locator('.collection-card h3').allInnerTexts();
    assert.deepEqual(cardTitles.map(t => t.trim()), ['APPAREL', 'TRAINING ESSENTIALS', 'ACCESSORIES'], 'Homepage EN cards');

    await verifyOverflow(page, 'Homepage EN');
    console.log('PASS Homepage EN verified');

    // -------------------------------------------------------------
    // 2. HOMEPAGE: Switch to BM
    // -------------------------------------------------------------
    console.log('[Step 2] Switching to BM on Homepage...');
    await page.getByRole('button', { name: 'BM', exact: true }).click();
    await page.waitForTimeout(400);

    await expect(page.locator('html')).toHaveAttribute('lang', 'ms');
    const savedLang = await page.evaluate(() => localStorage.getItem('jiwa_lang'));
    assert.equal(savedLang, 'bm', 'localStorage jiwa_lang must be bm');

    h1Text = (await page.locator('h1.hero-headline').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(h1Text, 'PERTARUNGAN DI DALAM JIWA ANDA.', 'Homepage BM headline');

    heroSubtext = (await page.locator('.hero-subtext').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(heroSubtext, 'LAHIR DARI WARISAN. DICIPTA UNTUK PERGERAKAN.', 'Homepage BM subtext');

    heroKicker = (await page.locator('.hero-kicker').innerText()).replace(/\s+/g, ' ').trim();
    assert.ok(heroKicker.includes('BAB 001'), 'Homepage BM kicker');

    s2Kicker = (await page.locator('.collection-rail .collection-reveal').first().innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(s2Kicker, 'KOLEKSI KAMI', 'Section 2 BM kicker');

    s2Title = (await page.locator('.collection-rail h2').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(s2Title, 'BAB PERTAMA', 'Section 2 BM title');

    s2Desc = (await page.locator('.collection-rail p.collection-reveal').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(s2Desc, 'Pakaian tempur moden. Warisan abadi. Direka untuk mereka yang terus melangkah ke hadapan.', 'Section 2 BM description');

    cardTitles = await page.locator('.collection-card h3').allInnerTexts();
    assert.deepEqual(cardTitles.map(t => t.trim()), ['PAKAIAN', 'KEPERLUAN LATIHAN', 'AKSESORI'], 'Homepage BM cards');

    await verifyOverflow(page, 'Homepage BM');
    console.log('PASS Homepage BM verified');

    // -------------------------------------------------------------
    // 3. SHOP: Navigate to Shop and verify BM persistence
    // -------------------------------------------------------------
    console.log('[Step 3] Navigating to /shop, checking BM persistence...');
    await page.locator('header a[href="/shop"]').click();
    await page.waitForURL('**/shop');
    await page.waitForTimeout(600);

    // Verify BM persists on load
    await expect(page.locator('html')).toHaveAttribute('lang', 'ms');
    const shopH1 = (await page.locator('h1.hero-headline').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(shopH1, 'SERAGAM JIWA YANG TIDAK TUNDUK.', 'Shop BM headline');

    const shopBreadcrumb = (await page.locator('.hero-kicker span').first().innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(shopBreadcrumb, 'LAMAN UTAMA / KEDAI', 'Shop BM breadcrumb');

    const shopSubtitle = (await page.locator('.hero-subtext').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(shopSubtitle, 'TEROKAI SETIAP BAB JIWA FIGHTER.', 'Shop BM subtitle');

    const filterHeadings = await page.locator('.shop-filter-group h3').allInnerTexts();
    assert.deepEqual(filterHeadings.map(t => t.trim()), ['KOLEKSI', 'KATEGORI', 'SAIZ', 'WARNA'], 'Shop BM filter groups');

    await verifyOverflow(page, 'Shop BM');
    console.log('PASS Shop BM persistence verified');

    // -------------------------------------------------------------
    // 4. SHOP: Switch to EN
    // -------------------------------------------------------------
    console.log('[Step 4] Switching to EN on Shop...');
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await page.waitForTimeout(400);

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    const shopH1En = (await page.locator('h1.hero-headline').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(shopH1En, 'THE UNIFORM OF THE UNBROKEN.', 'Shop EN headline');

    const shopBreadcrumbEn = (await page.locator('.hero-kicker span').first().innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(shopBreadcrumbEn, 'HOME / SHOP', 'Shop EN breadcrumb');

    const shopSubtitleEn = (await page.locator('.hero-subtext').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(shopSubtitleEn, 'DISCOVER EVERY CHAPTER OF JIWA FIGHTER.', 'Shop EN subtitle');

    const filterHeadingsEn = await page.locator('.shop-filter-group h3').allInnerTexts();
    assert.deepEqual(filterHeadingsEn.map(t => t.trim()), ['COLLECTION', 'CATEGORY', 'SIZE', 'COLOR'], 'Shop EN filter groups');

    await verifyOverflow(page, 'Shop EN');
    console.log('PASS Shop EN switch verified');

    // -------------------------------------------------------------
    // 5. SILAT SERIES: Navigate and check EN persistence
    // -------------------------------------------------------------
    console.log('[Step 5] Navigating to /collections/silat-series, checking EN persistence...');
    await page.locator('header a[href="/collections/silat-series"]').click();
    await page.waitForURL('**/collections/silat-series');
    await page.waitForTimeout(600);

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    const silatH1 = (await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(silatH1, 'THE ART OF DEFENCE.', 'Silat Series EN headline');

    const silatS2Kicker = (await page.locator('.lineup-reveal span').first().innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(silatS2Kicker, 'FEATURED IN THIS SERIES', 'Silat Series EN kicker');

    const silatS2Title = (await page.locator('.collection-rail h2.lineup-reveal').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(silatS2Title, 'SILAT SERIES', 'Silat Series EN Section 2 title');

    const silatS2Desc = (await page.locator('.collection-rail p.lineup-reveal').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(silatS2Desc, 'Modern combatwear inspired by a timeless Malay martial art. Engineered for movement. Rooted in heritage. Built for today.', 'Silat Series EN Section 2 description');

    const silatProductsEn = await page.locator('.lineup-card h3').allInnerTexts();
    assert.ok(silatProductsEn.some(name => name.includes('SILAT TRAINING JERSEY')), 'Silat Training Jersey EN');
    assert.ok(silatProductsEn.some(name => name.includes('SILAT HERITAGE JERSEY')), 'Silat Heritage Jersey EN');

    await verifyOverflow(page, 'Silat Series EN');
    console.log('PASS Silat Series EN verified');

    // -------------------------------------------------------------
    // 6. SILAT SERIES: Switch to BM & test hard reload persistence
    // -------------------------------------------------------------
    console.log('[Step 6] Switching to BM on Silat Series and checking hard reload...');
    await page.getByRole('button', { name: 'BM', exact: true }).click();
    await page.waitForTimeout(400);

    await expect(page.locator('html')).toHaveAttribute('lang', 'ms');
    const silatH1Bm = (await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(silatH1Bm, 'SENI PERTAHANAN DIRI.', 'Silat Series BM headline');

    const silatS2KickerBm = (await page.locator('.lineup-reveal span').first().innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(silatS2KickerBm, 'PILIHAN DALAM SIRI INI', 'Silat Series BM kicker');

    const silatS2TitleBm = (await page.locator('.collection-rail h2.lineup-reveal').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(silatS2TitleBm, 'SIRI SILAT', 'Silat Series BM Section 2 title ("SIRI SILAT")');

    const silatS2DescBm = (await page.locator('.collection-rail p.lineup-reveal').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(silatS2DescBm, 'Pakaian tempur moden berinspirasikan seni mempertahankan diri Melayu. Direka untuk ketangkasan. Berakar pada warisan. Dibina untuk hari ini.', 'Silat Series BM Section 2 description');

    const silatProductsBm = await page.locator('.lineup-card h3').allInnerTexts();
    assert.ok(silatProductsBm.some(name => name.includes('JERSI LATIHAN SILAT')), 'Silat Training Jersey BM');
    assert.ok(silatProductsBm.some(name => name.includes('JERSI WARISAN SILAT')), 'Silat Heritage Jersey BM');

    // Hard reload
    console.log('[Step 7] Hard reload of Silat Series in BM...');
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    await expect(page.locator('html')).toHaveAttribute('lang', 'ms');
    const postReloadTitle = (await page.locator('.collection-rail h2.lineup-reveal').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(postReloadTitle, 'SIRI SILAT', 'Silat Series post-reload title must remain "SIRI SILAT"');

    await verifyOverflow(page, 'Silat Series BM post-reload');
    console.log('PASS Hard reload persistence verified');

    // -------------------------------------------------------------
    // 7. RAPID TOGGLE STRESS TEST
    // -------------------------------------------------------------
    console.log('[Step 8] Rapid toggle stress test (10 rapid switches)...');
    const bmBtn = page.getByRole('button', { name: 'BM', exact: true });
    const enBtn = page.getByRole('button', { name: 'EN', exact: true });
    for (let i = 0; i < 5; i++) {
      await enBtn.click();
      await bmBtn.click();
    }
    // End on EN
    await enBtn.click();
    await page.waitForTimeout(300);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    const finalH1 = (await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim();
    assert.equal(finalH1, 'THE ART OF DEFENCE.', 'Headline settled cleanly to EN');
    console.log('PASS Rapid toggle stress test passed without race conditions');

    assert.deepEqual(runtimeErrors, [], `No runtime errors expected during language testing: ${JSON.stringify(runtimeErrors)}`);
    console.log('--- ALL LANGUAGE TOGGLE & PERSISTENCE TESTS PASSED ---');
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error('FATAL TEST ERROR:', err);
  process.exit(1);
});
