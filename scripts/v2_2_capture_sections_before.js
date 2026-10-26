const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const routes = [
  { name: '01-homepage', path: '/' },
  { name: '02-shop', path: '/shop' },
  { name: '03-silat-series', path: '/collections/silat-series' },
  { name: '04-product-keris-tuah', path: '/products/keris-tuah' },
  { name: '05-lookbook', path: '/lookbook' },
  { name: '06-our-story', path: '/our-story' },
  { name: '07-teamwear', path: '/custom' },
  { name: '08-size-guide', path: '/size-guide' },
  { name: '09-customer-care', path: '/support' }
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ 
    viewport: { width: 1536, height: 1024 },
    deviceScaleFactor: 1
  });

  const outDir = path.join(__dirname, '..', 'tests', 'v2.2', 'sections', 'before');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const route of routes) {
    const url = `http://localhost:3000${route.path}`;
    console.log(`Capturing ${route.name} from ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600); // Allow GSAP entrance to settle

    // 1. Capture 1536x1024 viewport matching reference
    await page.screenshot({
      path: path.join(outDir, `${route.name}-viewport.png`),
      clip: { x: 0, y: 0, width: 1536, height: 1024 }
    });

    // 2. Capture full page
    await page.screenshot({
      path: path.join(outDir, `${route.name}-full.png`),
      fullPage: true
    });
  }

  await browser.close();
  console.log('All BEFORE section screenshots captured successfully.');
})();
