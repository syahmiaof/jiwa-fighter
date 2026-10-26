/* Independent functional regression + geometry evidence for the local prototype.
 * Usage: node scripts/v2-e2e.cjs http://localhost:3000
 * Optional: V2_E2E_FILTER=name-fragment restricts a diagnostic rerun.
 */
const { chromium, expect } = require('@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.argv[2] || 'http://localhost:3000';
const out = path.resolve('tests/v2/e2e');
const routes = ['/', '/shop', '/collections/silat-series', '/products/keris-tuah', '/lookbook', '/our-story', '/custom', '/size-guide', '/support'];
const bmHeadings = ['PERTARUNGAN DI DALAM JIWA ANDA.', 'SERAGAM JIWA YANG TIDAK TUNDUK.', 'SENI PERTAHANAN DIRI.', 'KERIS TUAH', 'WARISAN DALAM PERGERAKAN.', 'TIDAK DILAHIRKAN UNTUK PEGUN.', 'PASUKAN ANDA. SATU JIWA.', 'DIBINA UNTUK BERGERAK BERSAMA ANDA.', 'KAMI DI SUDUT ANDA.'];
fs.mkdirSync(out, { recursive: true });
const results = [], runtimeErrors = [];
const filter = process.env.V2_E2E_FILTER || '';
let browser;
function record(page, name) { page.on('pageerror', error => runtimeErrors.push({ test: name, message: error.message })); }
async function settle(page) {
  await page.locator('h1').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(850);
}
async function goto(page, route) {
  const response = await page.goto(base + route, { waitUntil: 'networkidle' });
  assert.equal(response.status(), 200, `${route} HTTP status`);
  await settle(page);
}
async function cart(page) { return page.evaluate(() => JSON.parse(localStorage.getItem('jiwa_cart') || '[]')); }
async function waitCart(page, predicate) { await expect.poll(async () => predicate(await cart(page))).toBe(true); }
async function run(name, fn, options = {}) {
  if (filter && !name.includes(filter)) return;
  const context = await browser.newContext({ viewport: { width: 1536, height: 1024 }, ...options });
  const page = await context.newPage();
  page.setDefaultTimeout(8000);
  record(page, name);
  const start = Date.now();
  try {
    await fn(page, context);
    results.push({ name, status: 'passed', ms: Date.now() - start });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.push({ name, status: 'failed', ms: Date.now() - start, error: error.message });
    await page.screenshot({ path: path.join(out, `${name.replace(/[^a-z0-9]+/gi, '-')}-failure.png`), fullPage: true }).catch(() => {});
    console.log(`FAIL ${name}: ${error.message}`);
  } finally { await context.close(); }
}
async function checkGeometry(page, route) {
  const data = await page.evaluate(() => {
    const h1 = document.querySelector('h1'), rect = h1.getBoundingClientRect();
    return {
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      heading: { x: rect.x, right: rect.right, width: rect.width, height: rect.height },
      headingClipped: h1.scrollWidth > h1.clientWidth + 2,
      broken: [...document.images].filter(i => i.getBoundingClientRect().width > 0 && i.complete && i.naturalWidth === 0).map(i => i.src),
    };
  });
  assert.equal(data.overflow, false, `${route}: horizontal overflow`);
  assert.ok(data.heading.width > 20 && data.heading.height > 10, `${route}: semantic heading visible`);
  assert.ok(data.heading.x >= -1 && data.heading.right <= (await page.viewportSize()).width + 1, `${route}: heading outside viewport`);
  assert.equal(data.headingClipped, false, `${route}: headline clipped inside box`);
  assert.deepEqual(data.broken, [], `${route}: broken images`);
  return data;
}
async function main() {
  browser = await chromium.launch();
  try {
    for (let i = 0; i < routes.length; i++) {
      await run(`route-${i + 1}-language`, async page => {
        await goto(page, routes[i]);
        await expect(page.locator('h1')).toBeVisible();
        const original = (await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim();
        await page.getByRole('button', { name: 'BM', exact: true }).click();
        await expect(page.locator('html')).toHaveAttribute('lang', 'ms');
        const translated = (await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim();
        assert.equal(translated, bmHeadings[i]);
        if (i !== 3) assert.notEqual(translated, original);
        await page.reload({ waitUntil: 'networkidle' });
        await expect(page.locator('html')).toHaveAttribute('lang', 'ms');
        await expect(page.locator('h1')).toHaveText(new RegExp(bmHeadings[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s*')));
        await page.getByRole('button', { name: 'EN', exact: true }).click();
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      });
    }
    await run('catalog-filter-sort-navigation', async page => {
      await goto(page, '/shop');
      const cards = page.locator('.shop-product-card');
      const initial = await cards.count();
      assert.ok(initial >= 3, 'catalog has products');
      await page.getByRole('checkbox', { name: 'Hoodie', exact: true }).check();
      assert.ok((await cards.count()) < initial);
      await page.getByRole('checkbox', { name: 'Silat Series', exact: true }).check();
      await expect(cards).toHaveCount(0);
      await expect(page.getByText('NO PRODUCTS FOUND', { exact: true })).toBeVisible();
      await page.getByRole('button', { name: /RESET ALL FILTERS/i }).click();
      await expect(cards).toHaveCount(initial);
      await page.getByRole('checkbox', { name: 'Jersey', exact: true }).check();
      assert.ok((await cards.count()) > 0 && (await cards.count()) < initial);
      await page.getByRole('checkbox', { name: 'Jersey', exact: true }).uncheck();
      await page.locator('select').selectOption('low');
      const prices = await cards.evaluateAll(nodes => nodes.map(node => Number(node.innerText.match(/RM\s*([\d.]+)/)[1])));
      assert.deepEqual(prices, [...prices].sort((a, b) => a - b));
      await page.locator('select').selectOption('high');
      const descending = await cards.evaluateAll(nodes => nodes.map(node => Number(node.innerText.match(/RM\s*([\d.]+)/)[1])));
      assert.deepEqual(descending, [...descending].sort((a, b) => b - a));
      await cards.first().getByRole('link').first().click();
      await expect(page).toHaveURL(/\/products\//);
      await expect(page.locator('h1')).toBeVisible();
      await page.goBack({ waitUntil: 'networkidle' });
      await expect(page).toHaveURL(/\/shop$/);
    });
    await run('product-gallery-cart-variants-persistence-checkout', async page => {
      await goto(page, '/products/keris-tuah');
      const thumbnails = page.getByRole('button', { name: /View thumbnail/ });
      assert.ok(await thumbnails.count() >= 4);
      await thumbnails.nth(2).click();
      const chosenSrc = await thumbnails.nth(2).locator('img').getAttribute('src');
      assert.ok((await page.locator('.page-product img').evaluateAll(imgs => imgs.map(i => i.getAttribute('src')))).filter(src => src === chosenSrc).length >= 2, 'gallery changed to selected image');
      await page.getByRole('button', { name: 'L', exact: true }).click();
      await page.getByTitle('Black / Gold', { exact: true }).click();
      await page.getByRole('button', { name: /ADD TO BAG/i }).click();
      await waitCart(page, items => items.length === 1 && items[0].size === 'L' && items[0].color === 'Black / Gold' && items[0].quantity === 1);
      await expect(page.getByRole('button', { name: 'Close cart', exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Increase quantity', exact: true }).click();
      await waitCart(page, items => items[0].quantity === 2);
      await page.getByRole('button', { name: 'Decrease quantity', exact: true }).click();
      await waitCart(page, items => items[0].quantity === 1);
      await page.getByRole('button', { name: 'Close cart', exact: true }).click();
      await page.getByTitle('Obsidian Weave', { exact: true }).click();
      await page.getByRole('button', { name: /ADD TO BAG/i }).click();
      await waitCart(page, items => items.length === 2 && items.some(i => i.color === 'Obsidian Weave') && items.some(i => i.color === 'Black / Gold'));
      await page.reload({ waitUntil: 'networkidle' });
      await waitCart(page, items => items.length === 2 && items.every(i => i.quantity === 1));
      await page.getByRole('button', { name: 'Open Shopping Bag', exact: true }).click();
      await expect(page.getByText('RM 378', { exact: true })).toBeVisible();
      await page.getByRole('button', { name: /PROCEED TO CHECKOUT/i }).click();
      const dialog = page.getByRole('dialog').last();
      await expect(dialog).toBeVisible();
      await expect(dialog).toContainText(/prototype|demo|simulat/i);
      await expect(dialog).toContainText(/deactivated|no (real|charge)|demonstration/i);
      await page.screenshot({ path: path.join(out, 'checkout-demo.png') });
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: 'Close dialog', exact: true })).toHaveCount(0);
      await page.getByRole('button', { name: 'Decrease quantity', exact: true }).first().click();
      await waitCart(page, items => items.length === 1);
      await page.getByRole('button', { name: 'Decrease quantity', exact: true }).click();
      await waitCart(page, items => items.length === 0);
    });
    await run('search-keyboard-focus-trap-escape', async page => {
      await goto(page, '/');
      const trigger = page.getByRole('button', { name: 'Search', exact: true });
      await trigger.focus();
      await page.keyboard.press('Enter');
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await dialog.locator('input').fill('Keris');
      await expect(dialog.getByRole('link').first()).toContainText('KERIS');
      for (let n = 0; n < 9; n++) {
        await page.keyboard.press('Tab');
        assert.ok(await dialog.evaluate(el => el.contains(document.activeElement)), 'focus must stay in dialog');
      }
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });
    await run('teamwear-form-validation-simulation', async page => {
      await goto(page, '/custom');
      const form = page.locator('form').first();
      await form.locator('button[type=submit]').click();
      assert.equal(await form.evaluate(el => el.checkValidity()), false);
      await form.locator('input[type=text]').first().fill('Kelab Ujian JIWA');
      await form.locator('input[type=email]').fill('qa@example.test');
      await form.locator('select').nth(0).selectOption({ index: 1 });
      await form.locator('select').nth(1).selectOption({ index: 2 });
      await form.locator('textarea').fill('Prototype regression test only.');
      await form.locator('button[type=submit]').click();
      await expect(page.getByText('SIMULATION RECORDED', { exact: true })).toBeVisible();
      await expect(page.getByText(/Kelab Ujian JIWA/i)).toBeVisible();
      await page.screenshot({ path: path.join(out, 'teamwear-demo.png') });
      await page.getByRole('button', { name: /SUBMIT ANOTHER INQUIRY/i }).click();
      await expect(page.locator('form input[type=text]').first()).toHaveValue('');
    });
    await run('support-faq-search-form', async page => {
      await goto(page, '/support');
      const faq = page.getByRole('button', { name: /How can I track an order/i });
      await faq.click();
      await expect(faq).toHaveAttribute('aria-expanded', 'true');
      await faq.click();
      await expect(faq).toHaveAttribute('aria-expanded', 'false');
      await page.locator('input[placeholder]').first().fill('track');
      await expect(page.getByRole('button', { name: /How can I track an order/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /How do I choose my size/i })).toHaveCount(0);
      await page.locator('input[placeholder]').first().fill('');
      await page.getByRole('button', { name: 'SHIPPING', exact: true }).click();
      await expect(page.getByRole('button', { name: /domestic delivery/i })).toBeVisible();
      const form = page.locator('form').first();
      await form.locator('input[type=text]').fill('QA User');
      await form.locator('input[type=email]').fill('qa@example.test');
      await form.locator('textarea').fill('Checking local simulation.');
      await form.locator('button[type=submit]').click();
      await expect(page.getByText('MESSAGE SIMULATED', { exact: true })).toBeVisible();
    });
    await run('size-guide-keyboard-selection', async page => {
      await goto(page, '/size-guide');
      const row = page.locator('tbody tr').filter({ has: page.getByText('XL', { exact: true }) });
      await row.focus();
      await page.keyboard.press('Enter');
      await expect(row).toHaveAttribute('aria-selected', 'true');
      const relaxed = page.getByRole('button', { name: /RELAXED FIT/i });
      await relaxed.click();
      await expect(relaxed).toHaveAttribute('aria-pressed', 'true');
      await expect(page.getByRole('button', { name: /ATHLETIC FIT/i })).toHaveAttribute('aria-pressed', 'false');
    });
    await run('mobile-menu-route-close', async page => {
      await goto(page, '/');
      await page.getByRole('button', { name: 'Toggle navigation menu', exact: true }).click();
      await page.locator('header').getByRole('link', { name: 'LOOKBOOK', exact: true }).click();
      await expect(page).toHaveURL(/\/lookbook$/);
      await expect(page.locator('header').getByRole('link', { name: 'SHOP', exact: true })).toBeHidden();
    }, { viewport: { width: 390, height: 844 } });
    for (const viewport of [{ width: 1536, height: 1024 }, { width: 1440, height: 900 }, { width: 1920, height: 1080 }, { width: 390, height: 844 }]) {
      await run(`geometry-${viewport.width}x${viewport.height}`, async page => {
        for (let i = 0; i < routes.length; i++) {
          await goto(page, routes[i]);
          await checkGeometry(page, routes[i]);
          await page.screenshot({ path: path.join(out, `${i + 1}-${viewport.width}x${viewport.height}.png`) });
          const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
          for (let y = 0; y <= max; y += viewport.height * 0.75) {
            await page.evaluate(value => window.scrollTo(0, value), y);
            await page.waitForTimeout(150);
          }
          await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
          await page.waitForTimeout(650);
          await checkGeometry(page, routes[i]);
          await page.screenshot({ path: path.join(out, `${i + 1}-${viewport.width}x${viewport.height}-full.png`), fullPage: true });
        }
      }, { viewport });
    }
    await run('reduced-motion-all-routes', async page => {
      for (let i = 0; i < routes.length; i++) {
        await goto(page, routes[i]);
        const hidden = await page.locator('h1').evaluate(el => getComputedStyle(el).visibility === 'hidden' || Number(getComputedStyle(el).opacity) < 0.95);
        assert.equal(hidden, false, `${routes[i]} reduced motion heading hidden`);
        await page.screenshot({ path: path.join(out, `${i + 1}-reduced-motion.png`) });
      }
    }, { reducedMotion: 'reduce' });
  } finally {
    if (browser) await browser.close();
    const report = { base, capturedAt: new Date().toISOString(), results, runtimeErrors };
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify({ passed: results.filter(r => r.status === 'passed').length, failed: results.filter(r => r.status === 'failed').length, runtimeErrors }, null, 2));
    if (results.some(r => r.status === 'failed') || runtimeErrors.length) process.exitCode = 1;
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });

