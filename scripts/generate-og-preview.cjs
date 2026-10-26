const { chromium } = require('@playwright/test');

const outputPath = 'public/opengraph-image.png';
const heroUrl = 'http://localhost:3000/assets/campaigns/homepage-hero-athlete.webp';
const logoUrl = 'http://localhost:3000/assets/brand/logo-horizontal-white.png';

async function main() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.setContent(`
      <!doctype html>
      <html><head><meta charset="utf-8"><style>
        * { box-sizing: border-box; }
        html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; background: #0a0b0d; }
        body { color: #f0ece3; font-family: Arial, Helvetica, sans-serif; }
        .canvas { position: relative; width: 1200px; height: 630px; overflow: hidden; background: #0a0b0d; }
        .hero { position: absolute; inset: 0 0 0 auto; width: 68%; height: 100%; object-fit: cover; object-position: 64% 45%; filter: brightness(.82) contrast(1.04); }
        .shade { position: absolute; inset: 0; background: linear-gradient(90deg, #0a0b0d 0%, #0a0b0d 32%, rgba(10,11,13,.94) 44%, rgba(10,11,13,.55) 62%, rgba(10,11,13,.10) 100%), linear-gradient(0deg, rgba(10,11,13,.42), transparent 42%); }
        .texture { position: absolute; inset: 0 auto 0 0; width: 20%; opacity: .16; background-image: url('http://localhost:3000/assets/textures/songket-pattern-brass.png'); background-size: 140px auto; mask-image: linear-gradient(90deg, #000, transparent); }
        .content { position: absolute; z-index: 2; left: 72px; top: 58px; width: 615px; }
        .logo { display: block; width: 300px; height: 92px; object-fit: contain; object-position: left center; }
        .eyebrow { display: flex; align-items: center; gap: 16px; margin-top: 27px; color: #c6a260; font: 600 12px/1.3 Arial, sans-serif; letter-spacing: 4px; text-transform: uppercase; }
        .eyebrow:after { content: ''; display: block; width: 64px; height: 1px; background: #c6a260; }
        h1 { margin: 24px 0 0; color: #f0ece3; font: 900 82px/.89 'Arial Black', Impact, Arial, sans-serif; letter-spacing: -4px; text-transform: uppercase; }
        h1 span { display: block; }
        .caption { margin: 24px 0 0; color: rgba(240,236,227,.84); font: 600 13px/1.7 Arial, sans-serif; letter-spacing: 3.3px; text-transform: uppercase; }
        .footer { position: absolute; z-index: 2; left: 72px; right: 72px; bottom: 35px; display: flex; align-items: center; gap: 14px; color: rgba(240,236,227,.54); font: 600 10px/1 Arial, sans-serif; letter-spacing: 2.5px; text-transform: uppercase; }
        .footer:before { content: ''; width: 30px; height: 1px; background: #c6a260; }
        .index { position: absolute; z-index: 2; right: 55px; top: 50px; color: #c6a260; font: 700 14px/1 Arial, sans-serif; letter-spacing: 2px; writing-mode: vertical-rl; }
      </style></head><body>
        <main class="canvas">
          <img class="hero" src="${heroUrl}" alt="">
          <div class="shade"></div><div class="texture"></div>
          <section class="content">
            <img class="logo" src="${logoUrl}" alt="JIWA FIGHTER">
            <div class="eyebrow">Malaysia / Modern Movement</div>
            <h1><span>The Fight</span><span>Is in You.</span></h1>
            <p class="caption">Rooted in heritage. Built for movement.</p>
          </section>
          <div class="footer">Premium Malaysian Combatwear</div>
          <div class="index">01 / 04</div>
        </main>
      </body></html>
    `, { waitUntil: 'networkidle' });
    await page.locator('.hero').evaluate((image) => image.decode());
    await page.locator('.logo').evaluate((image) => image.decode());
    await page.screenshot({ path: outputPath, type: 'png' });
    console.log(`Wrote ${outputPath} at 1200x630.`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
