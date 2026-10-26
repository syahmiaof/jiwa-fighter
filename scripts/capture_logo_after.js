const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1536, height: 1024 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // 1. Capture header logo element
  const headerLogo = await page.$('header a[href="/"]');
  if (headerLogo) {
    await headerLogo.screenshot({ path: 'tests/v2.2/logo/after-rendered-header-logo.png' });
    console.log('Saved tests/v2.2/logo/after-rendered-header-logo.png');
  } else {
    console.error('Header logo element not found!');
  }
  
  // 2. Capture footer logo element
  const footerLogo = await page.$('footer a[href="/"]');
  if (footerLogo) {
    await footerLogo.screenshot({ path: 'tests/v2.2/logo/after-rendered-footer-logo.png' });
    console.log('Saved tests/v2.2/logo/after-rendered-footer-logo.png');
  }

  // 3. Capture full header crop (exact matching benchmark zone)
  await page.screenshot({ 
    path: 'tests/v2.2/logo/after-rendered-header-crop.png',
    clip: { x: 50, y: 0, width: 350, height: 70 }
  });
  console.log('Saved tests/v2.2/logo/after-rendered-header-crop.png');

  // 4. Exact logo crop (x: 75, y: 13, w: 224, h: 37)
  await page.screenshot({
    path: 'tests/v2.2/logo/after-rendered-header-exact-logo.png',
    clip: { x: 75, y: 13, width: 224, height: 38 }
  });
  console.log('Saved tests/v2.2/logo/after-rendered-header-exact-logo.png');
  
  await browser.close();
})();
