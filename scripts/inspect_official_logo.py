import asyncio
from playwright.async_api import async_playwright

async def check():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1536, 'height': 1024})
        await page.goto('http://localhost:3000', wait_until='networkidle')
        await page.wait_for_timeout(1000)
        
        # Take screenshot of header logo
        header_logo = page.locator('header a[aria-label="JIWA FIGHTER home"]').first
        box = await header_logo.bounding_box()
        print('Header logo bounding box:', box)
        await header_logo.screenshot(path='tests/v2.2/rendered_official_header_logo.png')
        
        # Take full crop of top navbar
        await page.screenshot(path='tests/v2.2/rendered_official_header_1536.png', clip={'x': 50, 'y': 0, 'width': 350, 'height': 70})
        
        # Take screenshot of footer logo
        footer_logo = page.locator('footer a[aria-label="JIWA FIGHTER home"]').first
        await footer_logo.scroll_into_view_if_needed()
        await page.wait_for_timeout(300)
        f_box = await footer_logo.bounding_box()
        print('Footer logo bounding box:', f_box)
        await footer_logo.screenshot(path='tests/v2.2/rendered_official_footer_logo.png')
        
        # Mobile view
        await page.set_viewport_size({'width': 390, 'height': 844})
        await page.wait_for_timeout(500)
        m_logo = page.locator('header a[aria-label="JIWA FIGHTER home"]').first
        m_box = await m_logo.bounding_box()
        print('Mobile logo bounding box:', m_box)
        await m_logo.screenshot(path='tests/v2.2/rendered_official_mobile_logo.png')
        await page.screenshot(path='tests/v2.2/rendered_official_header_mobile.png', clip={'x': 0, 'y': 0, 'width': 390, 'height': 70})

        await browser.close()
        print('Playwright check complete successfully!')

asyncio.run(check())
