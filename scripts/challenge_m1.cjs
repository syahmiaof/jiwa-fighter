/**
 * Adversarial Empirical Verification & Stress Test Suite for Milestone 1
 * Targets:
 * 1. Mobile 390px Geometry (Zero horizontal overflow under dynamic scroll, filter, carousel, sort)
 * 2. Reduced-Motion Integrity (Immediate render, 0 stuck opacity, 0 residual inline transforms)
 * 3. Rapid Route Navigation & Lifecycle (ScrollTrigger leak checks, 0 GSAP warnings, 0 page errors)
 * 4. Route Redirection & Localization (Redirect 308, BM text parity and line breaks)
 */

const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const BASE_URL = process.argv[2] || 'http://localhost:3000';

async function runEmpiricalStressSuite() {
  console.log(`[CHALLENGER-M1] Launching empirical verification against ${BASE_URL}...`);
  const browser = await chromium.launch();
  const summary = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    findings: [],
  };

  function pass(name, details = '') {
    summary.totalTests++;
    summary.passed++;
    console.log(`  [PASS] ${name}${details ? ` (${details})` : ''}`);
  }

  function fail(name, error) {
    summary.totalTests++;
    summary.failed++;
    const errMsg = error && error.message ? error.message : String(error);
    summary.findings.push({ test: name, error: errMsg });
    console.error(`  [FAIL] ${name} -> ${errMsg}`);
  }

  // -------------------------------------------------------------
  // TEST 1: Redirect & Route Aliasing Integrity
  // -------------------------------------------------------------
  console.log('\n--- SUITE 1: Route Redirection & Aliasing ---');
  try {
    const res = await fetch(`${BASE_URL}/silat-series`, { redirect: 'manual' });
    const location = res.headers.get('location');
    assert.equal(res.status, 308, `Expected 308 status for /silat-series redirect, got ${res.status}`);
    assert.equal(location, '/collections/silat-series', `Expected location /collections/silat-series, got ${location}`);
    pass('Direct HTTP 308 redirect for /silat-series', `Status ${res.status} -> ${location}`);
  } catch (err) {
    fail('Direct HTTP 308 redirect for /silat-series', err);
  }

  // -------------------------------------------------------------
  // TEST 2: Mobile 390px Geometry & Dynamic Overflow Stress Test
  // -------------------------------------------------------------
  console.log('\n--- SUITE 2: Mobile 390px Geometry Stress Testing ---');
  const mobilePages = [
    { name: 'Homepage', route: '/' },
    { name: 'Shop All', route: '/shop' },
    { name: 'Silat Series', route: '/collections/silat-series' },
  ];

  for (const item of mobilePages) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const pageErrors = [];
    page.on('pageerror', e => pageErrors.push(e.message));

    try {
      await page.goto(`${BASE_URL}${item.route}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(600);

      // Check initial load overflow
      let overflowInfo = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const overflowingElements = [];
        if (docWidth > winWidth) {
          const allElements = document.querySelectorAll('*');
          for (const el of allElements) {
            const rect = el.getBoundingClientRect();
            if (rect.right > winWidth + 1 || rect.left < -1) {
              overflowingElements.push({
                tag: el.tagName,
                className: el.className,
                rect: { left: rect.left, right: rect.right, width: rect.width },
              });
            }
          }
        }
        return { docWidth, winWidth, hasOverflow: docWidth > winWidth + 1, overflowingElements };
      });

      assert.equal(
        overflowInfo.hasOverflow,
        false,
        `${item.name} initial load has horizontal overflow (${overflowInfo.docWidth}px > ${overflowInfo.winWidth}px)`
      );

      // Stress: Dynamic Scroll down and up
      for (let y = 0; y <= 2500; y += 400) {
        await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
        await page.waitForTimeout(60);
        const scrollOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
        assert.equal(scrollOverflow, false, `${item.name} overflowed during scroll at y=${y}`);
      }

      // Dynamic interaction stress on Homepage:
      if (item.route === '/') {
        // Click Carousel next/prev repeatedly
        const nextBtn = page.getByRole('button', { name: 'Next collection slide' });
        const prevBtn = page.getByRole('button', { name: 'Previous collection slide' });
        if (await nextBtn.isVisible()) {
          for (let i = 0; i < 4; i++) {
            await nextBtn.click();
            await page.waitForTimeout(100);
            const ov = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
            assert.equal(ov, false, `Homepage overflowed during carousel next click #${i}`);
          }
          for (let i = 0; i < 2; i++) {
            await prevBtn.click();
            await page.waitForTimeout(100);
            const ov = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
            assert.equal(ov, false, `Homepage overflowed during carousel prev click #${i}`);
          }
        }
      }

      // Dynamic interaction stress on Shop All:
      if (item.route === '/shop') {
        // Toggle filters and sorts dynamically
        const hoodiesBox = page.getByRole('checkbox', { name: 'Hoodie', exact: true });
        if (await hoodiesBox.isVisible()) {
          await hoodiesBox.check();
          await page.waitForTimeout(200);
          let ov = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
          assert.equal(ov, false, 'Shop overflowed after checking Hoodie filter');

          const silatBox = page.getByRole('checkbox', { name: 'Silat Series', exact: true });
          await silatBox.check();
          await page.waitForTimeout(200);
          ov = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
          assert.equal(ov, false, 'Shop overflowed under empty state (0 products)');

          const resetBtn = page.getByRole('button', { name: /RESET ALL FILTERS/i });
          if (await resetBtn.isVisible()) {
            await resetBtn.click();
            await page.waitForTimeout(200);
            ov = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
            assert.equal(ov, false, 'Shop overflowed after reset');
          }
        }

        // Test sorting selection
        const sortSelect = page.locator('select');
        if (await sortSelect.isVisible()) {
          await sortSelect.selectOption('low');
          await page.waitForTimeout(150);
          let ov = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
          assert.equal(ov, false, 'Shop overflowed after sort: low to high');

          await sortSelect.selectOption('high');
          await page.waitForTimeout(150);
          ov = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
          assert.equal(ov, false, 'Shop overflowed after sort: high to low');
        }
      }

      // Language toggle stress at 390px:
      const bmBtn = page.getByRole('button', { name: 'BM', exact: true });
      if (await bmBtn.isVisible()) {
        await bmBtn.click();
        await page.waitForTimeout(300);
        const ov = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
        assert.equal(ov, false, `${item.name} overflowed in BM locale`);
      }

      assert.equal(pageErrors.length, 0, `${item.name} generated runtime page errors: ${pageErrors.join('; ')}`);
      pass(`390px Geometry Stress: ${item.name}`, 'Zero overflow under scroll, filter, carousel, sort, language toggle');
    } catch (err) {
      fail(`390px Geometry Stress: ${item.name}`, err);
    } finally {
      await context.close();
    }
  }

  // -------------------------------------------------------------
  // TEST 3: Reduced-Motion Adversarial Verification
  // -------------------------------------------------------------
  console.log('\n--- SUITE 3: Reduced-Motion Adversarial Verification ---');
  for (const item of mobilePages) {
    // Mode A: Dynamic toggle from normal -> reduced
    const contextA = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pageA = await contextA.newPage();
    try {
      await pageA.goto(`${BASE_URL}${item.route}`, { waitUntil: 'networkidle' });
      await pageA.waitForTimeout(500);

      // Emulate live switch to reduced-motion
      await pageA.emulateMedia({ reducedMotion: 'reduce' });
      await pageA.waitForTimeout(300);

      const inspection = await pageA.evaluate(() => {
        const selectors = [
          '.hero-kicker',
          '.hero-headline',
          '.hero-subtext',
          '.hero-cta',
          '.hero-image',
          '.collection-reveal',
          '.collection-card',
          '.shop-filter-group',
          '.shop-counter-bar',
          '.shop-product-card',
          '.lineup-reveal',
          '.lineup-card',
        ];
        const elements = document.querySelectorAll(selectors.join(','));
        const issues = [];
        elements.forEach((el) => {
          const style = getComputedStyle(el);
          const inlineTransform = el.style.transform;
          const inlineOpacity = el.style.opacity;
          const computedOpacity = parseFloat(style.opacity);

          if (computedOpacity < 0.99) {
            issues.push({ tag: el.tagName, class: el.className, issue: `stuck opacity: ${computedOpacity}` });
          }
          if (inlineTransform && inlineTransform !== 'none' && !inlineTransform.includes('matrix(1, 0, 0, 1, 0, 0)')) {
            issues.push({ tag: el.tagName, class: el.className, issue: `residual inline transform: ${inlineTransform}` });
          }
        });
        return { count: elements.length, issues };
      });

      assert.ok(inspection.count > 0, `${item.name}: found motion elements to inspect`);
      assert.deepEqual(
        inspection.issues,
        [],
        `${item.name} has motion elements with stuck opacity or un-reverted inline transforms: ${JSON.stringify(inspection.issues)}`
      );

      pass(`Dynamic Reduced-Motion Revert: ${item.name}`, `Inspected ${inspection.count} motion elements, 0 residual transforms`);
    } catch (err) {
      fail(`Dynamic Reduced-Motion Revert: ${item.name}`, err);
    } finally {
      await contextA.close();
    }

    // Mode B: Initial load directly with reduced-motion enabled
    const contextB = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const pageB = await contextB.newPage();
    try {
      await pageB.goto(`${BASE_URL}${item.route}`, { waitUntil: 'networkidle' });
      await pageB.waitForTimeout(200);

      const instantRender = await pageB.evaluate(() => {
        const headline = document.querySelector('h1');
        const h1Opacity = headline ? parseFloat(getComputedStyle(headline).opacity) : 0;
        const h1Transform = headline ? headline.style.transform : '';
        return { h1Opacity, h1Transform };
      });

      assert.equal(instantRender.h1Opacity, 1, `${item.name}: H1 opacity was not 1 on initial reduced-motion load`);
      assert.equal(
        !instantRender.h1Transform || instantRender.h1Transform === 'none',
        true,
        `${item.name}: H1 had inline transform on reduced-motion load (${instantRender.h1Transform})`
      );

      pass(`Initial Reduced-Motion Direct Load: ${item.name}`, 'Immediate full opacity and zero inline transforms');
    } catch (err) {
      fail(`Initial Reduced-Motion Direct Load: ${item.name}`, err);
    } finally {
      await contextB.close();
    }
  }

  // -------------------------------------------------------------
  // TEST 4: Rapid Route Transition & ScrollTrigger Leak Stress Test
  // -------------------------------------------------------------
  console.log('\n--- SUITE 4: Rapid Route Transitions & Lifecycle Stress Testing ---');
  const navContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const navPage = await navContext.newPage();
  const consoleWarnings = [];
  const pageErrors = [];

  navPage.on('console', msg => {
    if (msg.type() === 'warning' || msg.type() === 'error') {
      consoleWarnings.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  navPage.on('pageerror', err => pageErrors.push(err.message));

  try {
    await navPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await navPage.waitForTimeout(500);

    const routesSequence = [
      '/shop',
      '/collections/silat-series',
      '/',
      '/collections/silat-series',
      '/shop',
      '/',
      '/shop',
      '/collections/silat-series',
      '/',
    ];

    console.log(`  Executing ${routesSequence.length} rapid client route transitions...`);
    for (let i = 0; i < routesSequence.length; i++) {
      const target = routesSequence[i];
      // Navigate via Next.js client-side router
      await navPage.evaluate((path) => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      // Or click link if present
      const navLink = navPage.locator(`header a[href="${target}"]`).first();
      if (await navLink.isVisible()) {
        await navLink.click();
      } else {
        await navPage.goto(`${BASE_URL}${target}`, { waitUntil: 'domcontentloaded' });
      }
      await navPage.waitForTimeout(250); // fast transition
    }

    // Settle on final page
    await navPage.waitForTimeout(600);

    // Filter relevant errors/warnings
    const relevantWarnings = consoleWarnings.filter(w => /GSAP|target|ScrollTrigger|hydration|warning/i.test(w));
    assert.deepEqual(relevantWarnings, [], `Console warnings detected during rapid route transitions: ${relevantWarnings.join('; ')}`);
    assert.deepEqual(pageErrors, [], `Runtime page errors detected: ${pageErrors.join('; ')}`);

    pass('Rapid Route Transitions (9 cycles)', '0 GSAP warnings, 0 runtime errors, clean unmount/remount');
  } catch (err) {
    fail('Rapid Route Transitions', err);
  } finally {
    await navContext.close();
  }

  // -------------------------------------------------------------
  // TEST 5: Localization & CampaignLines Parity
  // -------------------------------------------------------------
  console.log('\n--- SUITE 5: Localization & CampaignLines Verification ---');
  const locContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const locPage = await locContext.newPage();
  try {
    // 5.1 Homepage BM Subtext
    await locPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await locPage.getByRole('button', { name: 'BM', exact: true }).click();
    await locPage.waitForTimeout(300);

    const heroSubtext = await locPage.locator('.hero-subtext').innerText();
    assert.ok(
      heroSubtext.includes('LAHIR DARI WARISAN.') && heroSubtext.includes('DICIPTA UNTUK PERGERAKAN.'),
      `Homepage subtext did not render BM translation, got: ${heroSubtext}`
    );
    pass('Homepage Subtext BM Localization', 'Renders LAHIR DARI WARISAN. / DICIPTA UNTUK PERGERAKAN.');

    // 5.2 Silat Series BM Headline
    await locPage.goto(`${BASE_URL}/collections/silat-series`, { waitUntil: 'networkidle' });
    await locPage.waitForTimeout(300);
    const silatTitle = await locPage.locator('.lineup-reveal h2, h2.lineup-reveal').innerText();
    assert.ok(
      silatTitle.includes('SIRI') && silatTitle.includes('SILAT'),
      `Silat Series Section 2 headline did not render SIRI SILAT in BM, got: ${silatTitle}`
    );
    pass('Silat Series Section 2 BM Headline', 'Renders SIRI SILAT');

    // 5.3 Shop Headline Split Lines
    await locPage.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle' });
    await locPage.waitForTimeout(300);
    const shopLines = await locPage.locator('h1 .campaign-line').allInnerTexts();
    assert.ok(shopLines.length >= 2, `Shop H1 campaign lines expected >= 2, got ${shopLines.length} (${JSON.stringify(shopLines)})`);
    pass('Shop H1 Editorial Split Lines', `Rendered ${shopLines.length} lines: ${shopLines.join(' / ')}`);
  } catch (err) {
    fail('Localization & CampaignLines Verification', err);
  } finally {
    await locContext.close();
  }

  await browser.close();

  // -------------------------------------------------------------
  // Summary & Verdict
  // -------------------------------------------------------------
  console.log('\n=============================================================');
  console.log(`[CHALLENGER-M1] EMPIRICAL VERIFICATION COMPLETE:`);
  console.log(`  Total Tests Run: ${summary.totalTests}`);
  console.log(`  Passed:         ${summary.passed}`);
  console.log(`  Failed:         ${summary.failed}`);
  console.log('=============================================================\n');

  fs.mkdirSync('tests/v2', { recursive: true });
  fs.writeFileSync('tests/v2/challenger_m1_results.json', JSON.stringify(summary, null, 2));

  if (summary.failed > 0) {
    console.error('VERDICT: CHALLENGE_FAILED');
    process.exit(1);
  } else {
    console.log('VERDICT: APPROVE');
    process.exit(0);
  }
}

runEmpiricalStressSuite().catch(err => {
  console.error('[CHALLENGER-M1] Fatal harness failure:', err);
  process.exit(1);
});
