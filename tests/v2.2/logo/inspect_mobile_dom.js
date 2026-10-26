const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  const rects = await page.evaluate(() => {
    const link = document.querySelector('header a[href="/"]');
    const emblem = document.querySelector('.brand-emblem');
    const wordmark = document.querySelector('.brand-wordmark');
    const header = document.querySelector('header');
    const container = header ? header.querySelector('div') : null;
    const footerLink = document.querySelector('footer a[href="/"]');
    const footerEmblem = footerLink ? footerLink.querySelector('div') : null;
    const footerWordmark = footerLink ? footerLink.querySelectorAll('img')[1] || footerLink.querySelector('img:last-child') : null;

    return {
      viewport: { w: window.innerWidth, h: window.innerHeight },
      header: header ? header.getBoundingClientRect() : null,
      container: container ? container.getBoundingClientRect() : null,
      containerComputedPadding: container ? window.getComputedStyle(container).paddingLeft : null,
      link: link ? link.getBoundingClientRect() : null,
      emblem: emblem ? emblem.getBoundingClientRect() : null,
      wordmark: wordmark ? wordmark.getBoundingClientRect() : null,
      footerLink: footerLink ? footerLink.getBoundingClientRect() : null,
      footerEmblem: footerEmblem ? footerEmblem.getBoundingClientRect() : null,
      footerWordmark: footerWordmark ? footerWordmark.getBoundingClientRect() : null,
    };
  });
  
  console.log(JSON.stringify(rects, null, 2));
  await page.screenshot({ path: 'tests/v2.2/logo/mobile-rendered-header.png', clip: { x: 0, y: 0, width: 390, height: 80 } });
  await page.screenshot({ path: 'tests/v2.2/logo/mobile-rendered-footer.png', clip: { x: 0, y: 500, width: 390, height: 200 } });
  await browser.close();
})();
