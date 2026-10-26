const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1536, height: 1024 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Capture header logo element
  const headerLogo = await page.$('header a[href="/"]');
  if (headerLogo) {
    await headerLogo.screenshot({ path: 'tests/v2.2/logo/before-rendered-header-logo.png' });
    console.log('Saved tests/v2.2/logo/before-rendered-header-logo.png');
  } else {
    console.log('Header logo element not found!');
  }
  
  // Capture footer logo element
  const footerLogo = await page.$('footer a[href="/"]');
  if (footerLogo) {
    await footerLogo.screenshot({ path: 'tests/v2.2/logo/before-rendered-footer-logo.png' });
    console.log('Saved tests/v2.2/logo/before-rendered-footer-logo.png');
  }

  // Also full header crop
  await page.screenshot({ 
    path: 'tests/v2.2/logo/before-rendered-header-crop.png',
    clip: { x: 50, y: 0, width: 350, height: 70 }
  });
  console.log('Saved before-rendered-header-crop.png');
  
  await browser.close();
})();
