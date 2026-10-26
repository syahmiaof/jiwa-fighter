const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1536, height: 1024 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  const rects = await page.evaluate(() => {
    const link = document.querySelector('header a[href="/"]');
    const emblem = document.querySelector('.brand-emblem');
    const wordmark = document.querySelector('.brand-wordmark');
    const header = document.querySelector('header');
    const container = header ? header.querySelector('div') : null;
    const footerLink = document.querySelector('footer a[href="/"]');
    const footerContainer = document.querySelector('footer > div');
    
    return {
      viewport: { w: window.innerWidth, h: window.innerHeight },
      header: header ? header.getBoundingClientRect() : null,
      container: container ? container.getBoundingClientRect() : null,
      containerComputedPadding: container ? window.getComputedStyle(container).paddingLeft : null,
      link: link ? link.getBoundingClientRect() : null,
      emblem: emblem ? emblem.getBoundingClientRect() : null,
      wordmark: wordmark ? wordmark.getBoundingClientRect() : null,
      footerContainer: footerContainer ? footerContainer.getBoundingClientRect() : null,
      footerLink: footerLink ? footerLink.getBoundingClientRect() : null,
    };
  });
  
  console.log(JSON.stringify(rects, null, 2));
  await browser.close();
})();
