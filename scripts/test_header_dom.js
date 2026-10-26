const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1536, height: 1024 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForSelector('header');
  
  const headerData = await page.evaluate(() => {
    const header = document.querySelector('header');
    const link = header.querySelector('a[href="/"]');
    const imgs = Array.from(header.querySelectorAll('img')).map(img => ({
      src: img.src,
      width: img.width,
      height: img.height,
      rect: img.getBoundingClientRect()
    }));
    
    return {
      headerRect: header.getBoundingClientRect(),
      linkRect: link ? link.getBoundingClientRect() : null,
      imgs
    };
  });
  
  console.log(JSON.stringify(headerData, null, 2));
  await browser.close();
})();
