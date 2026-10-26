const { chromium } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const label = process.argv[2] || 'after';
const routes = ['/', '/shop', '/collections/silat-series', '/products/keris-tuah', '/lookbook', '/our-story', '/custom', '/size-guide', '/support'];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const route of routes) {
      const context = await browser.newContext({ viewport: { width: 1536, height: 1024 }, deviceScaleFactor: 1 });
      const page = await context.newPage();
      const runtimeErrors = [];
      page.on('pageerror', error => runtimeErrors.push(error.message));
      await page.addInitScript(() => {
        window.__qa = { lcp: 0, cls: 0, longTasks: [] };
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) window.__qa.lcp = entry.startTime;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__qa.cls += entry.value;
        }).observe({ type: 'layout-shift', buffered: true });
        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) window.__qa.longTasks.push(entry.duration);
        }).observe({ type: 'longtask', buffered: true });
      });
      await page.goto(baseURL + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1800);
      const metrics = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource');
        const navigation = performance.getEntriesByType('navigation')[0];
        const category = predicate => resources.filter(predicate).reduce((sum, entry) => sum + entry.transferSize, 0);
        return {
          navigationMs: Math.round(navigation.duration),
          lcpMs: Math.round(window.__qa.lcp),
          cls: Number(window.__qa.cls.toFixed(4)),
          longTaskCount: window.__qa.longTasks.length,
          longestTaskMs: Math.round(Math.max(0, ...window.__qa.longTasks)),
          transferBytes: resources.reduce((sum, entry) => sum + entry.transferSize, 0),
          javascriptTransferBytes: category(entry => entry.initiatorType === 'script'),
          imageTransferBytes: category(entry => entry.initiatorType === 'img' || /\/assets\//.test(entry.name)),
          fontsTransferBytes: category(entry => /\.woff2/.test(entry.name)),
          images: [...document.images].filter(image => image.getBoundingClientRect().width).map(image => ({
            url: new URL(image.currentSrc || image.src).pathname,
            naturalWidth: image.naturalWidth,
            naturalHeight: image.naturalHeight,
            renderedWidth: Math.round(image.getBoundingClientRect().width),
            renderedHeight: Math.round(image.getBoundingClientRect().height),
            complete: image.complete,
          })),
        };
      });
      results.push({ route, ...metrics, runtimeErrors });
      console.log(`${route}: LCP ${metrics.lcpMs}ms; CLS ${metrics.cls}; resources ${(metrics.transferBytes / 1024).toFixed(1)} KiB`);
      await context.close();
    }
  } finally {
    await browser.close();
  }
  const output = path.join(__dirname, '..', 'tests', 'v2', `performance-${label}.json`);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify({
    measuredAt: new Date().toISOString(),
    environment: 'Local Chromium, fresh context per route, 1536×1024, no network or CPU throttling; single sample per route. Resource totals may include Next.js prefetches. Development-server results are not production benchmarks.',
    baseURL,
    results,
  }, null, 2));
  console.log(`Saved ${output}`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
