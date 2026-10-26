const { chromium } = require('@playwright/test');
const fs = require('fs');

const base = process.argv[2] || 'http://localhost:43132';
const routes = ['/', '/shop', '/collections/silat-series', '/products/keris-tuah', '/lookbook', '/our-story', '/custom', '/size-guide', '/support'];
const viewports = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'mobile-390x844', width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.addInitScript(() => sessionStorage.setItem('jiwa-fighter:intro-seen:v1', '1'));
  const results = [];
  fs.mkdirSync('tests/v3/responsive', { recursive: true });

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const route of routes) {
      const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(180);
      const layout = await page.evaluate(() => {
        const logo = document.querySelector('.brand-logo-horizontal')?.getBoundingClientRect();
        const launcher = document.querySelector('.satria-launcher');
        const launcherVisible = Boolean(launcher && getComputedStyle(launcher).visibility !== 'hidden' && Number(getComputedStyle(launcher).opacity) !== 0);
        let launcherObstructs = false;
        if (launcher) {
          const box = launcher.getBoundingClientRect();
          const selector = 'a, button, input, textarea, select, [role="button"], h1, h2, h3, p, [role="heading"]';
          for (let row = 0; row < 5 && !launcherObstructs; row += 1) {
            for (let column = 0; column < 5 && !launcherObstructs; column += 1) {
              const x = box.left + ((column + 0.5) / 5) * box.width;
              const y = box.top + ((row + 0.5) / 5) * box.height;
              launcherObstructs = document.elementsFromPoint(x, y)
                .filter((element) => !launcher.contains(element))
                .some((element) => Boolean(element.closest(selector)));
            }
          }
        }
        return {
          viewportWidth: window.innerWidth,
          documentWidth: document.documentElement.scrollWidth,
          logoLeft: logo ? Math.round(logo.left) : null,
          logoRight: logo ? Math.round(logo.right) : null,
          logoVisible: Boolean(logo && logo.width > 0 && logo.height > 0),
          launcherVisible,
          launcherLeft: launcher ? Math.round(launcher.getBoundingClientRect().left) : null,
          launcherTop: launcher ? Math.round(launcher.getBoundingClientRect().top) : null,
          launcherObstructs: launcherVisible && launcherObstructs,
        };
      });
      results.push({ viewport: viewport.name, route, status: response?.status() ?? null, ...layout });
      if (viewport.name === '1440x900' && route === '/') {
        await page.screenshot({ path: 'tests/v3/responsive/home-1440x900.png' });
      }
      if (viewport.name === '1920x1080' && route === '/') {
        await page.screenshot({ path: 'tests/v3/responsive/home-1920x1080.png' });
      }
      if (viewport.name === 'tablet-768x1024' && route === '/') {
        await page.screenshot({ path: 'tests/v3/responsive/home-tablet-768x1024.png' });
      }
      if (viewport.name === 'mobile-390x844' && route === '/') {
        await page.screenshot({ path: 'tests/v3/responsive/home-mobile-390x844.png' });
      }
    }
  }

  await browser.close();
  fs.writeFileSync('tests/v3/responsive-smoke.json', JSON.stringify({ base, viewports, results }, null, 2));
  const positionFailures = viewports.flatMap((viewport) => {
    const group = results.filter((result) => result.viewport === viewport.name);
    return group.some(({ launcherLeft, launcherTop }) => launcherLeft !== group[0].launcherLeft || launcherTop !== group[0].launcherTop)
      ? [{ viewport: viewport.name, positions: group.map(({ route, launcherLeft, launcherTop }) => ({ route, launcherLeft, launcherTop })) }]
      : [];
  });
  const failures = results.filter((result) => result.status !== 200 || result.documentWidth > result.viewportWidth + 1 || !result.logoVisible || result.logoLeft < 0 || result.logoRight > result.viewportWidth + 1);
  if (positionFailures.length) failures.push(...positionFailures.map((failure) => ({ launcherPositionChanged: failure })));
  const obstructionCount = results.filter((result) => result.launcherObstructs).length;
  console.log(JSON.stringify({ total: results.length, failures, obstructionCount, positionFailures }, null, 2));
  if (failures.length) process.exitCode = 1;
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
