import asyncio
import os
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 800, 'height': 600}, device_scale_factor=2)
        svg_path = os.path.abspath('public/assets/brand/logo-stacked-white.svg').replace('\\', '/')
        content = f'''<!DOCTYPE html>
<html>
<head><style>body {{ background: #0C0D0F; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }}</style></head>
<body>
  <div style="display: flex; gap: 40px; align-items: center;">
    <div>
      <p style="color: #888; font-family: monospace; font-size: 12px; text-align: center;">58px CSS (Header)</p>
      <img src="file:///{svg_path}" style="width: 58px; height: 52px; object-fit: contain;" />
    </div>
    <div>
      <p style="color: #888; font-family: monospace; font-size: 12px; text-align: center;">85px CSS (Footer)</p>
      <img src="file:///{svg_path}" style="width: 85px; height: 76px; object-fit: contain;" />
    </div>
    <div>
      <p style="color: #888; font-family: monospace; font-size: 12px; text-align: center;">180px CSS (High-Res Zoom)</p>
      <img src="file:///{svg_path}" style="width: 180px; height: 161px; object-fit: contain;" />
    </div>
  </div>
</body>
</html>'''
        await page.set_content(content)
        await page.screenshot(path='tests/v2.2/test_svg_render_comparison.png')
        await browser.close()
        print('Captured test_svg_render_comparison.png successfully!')

if __name__ == '__main__':
    asyncio.run(main())
