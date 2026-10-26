const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const base = process.argv[2] || 'http://localhost:3000';
const routes = [
  '/',
  '/shop',
  '/collections/silat-series',
  '/products/keris-tuah',
  '/lookbook',
  '/our-story',
  '/custom',
  '/size-guide',
  '/support',
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1536, height: 1024 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));

  const outDir = path.resolve('tests/v2/after');
  fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    console.log(`Capturing route ${i + 1}: ${route}`);
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);

    const viewportPath = path.join(outDir, `${i + 1}-viewport.png`);
    await page.screenshot({ path: viewportPath });

    const fullPath = path.join(outDir, `${i + 1}-full.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
  }

  fs.writeFileSync(path.join(outDir, 'errors.json'), JSON.stringify(errors, null, 2));
  await browser.close();
  console.log('V2 after screenshots captured successfully!');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
