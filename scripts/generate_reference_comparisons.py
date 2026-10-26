import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

def main():
    out_dir = Path('tests/v2/comparisons')
    out_dir.mkdir(parents=True, exist_ok=True)

    pairs = [
        ('01-homepage.png', '1-viewport.png', '01 - Homepage', 'THE FIGHT IS IN YOU.', '/'),
        ('02-shop.png', '2-viewport.png', '02 - Shop All', 'THE UNIFORM OF THE UNBROKEN.', '/shop'),
        ('03-silat-series.png', '3-viewport.png', '03 - Silat Series', 'THE ART OF DEFENCE.', '/collections/silat-series'),
        ('04-product-keris-tuah.png', '4-viewport.png', '04 - Product Keris Tuah', 'KERIS TUAH HERITAGE JERSEY', '/products/keris-tuah'),
        ('05-lookbook.png', '5-viewport.png', '05 - Lookbook', 'A LEGACY IN MOTION.', '/lookbook'),
        ('06-our-story.png', '6-viewport.png', '06 - Our Story', 'NOT BORN TO STAND STILL.', '/our-story'),
        ('07-teamwear.png', '7-viewport.png', '07 - Custom Teamwear', 'YOUR CREW. ONE JIWA.', '/custom'),
        ('08-size-guide.png', '8-viewport.png', '08 - Size & Fit Guide', 'BUILT TO MOVE WITH YOU.', '/size-guide'),
        ('09-customer-care.png', '9-viewport.png', '09 - Customer Care & FAQ', "WE'RE IN YOUR CORNER.", '/support'),
    ]

    ref_dir = Path('references')
    after_dir = Path('tests/v2/after')

    # Load default font or fallback
    try:
        font_large = ImageFont.truetype("arial.ttf", 26)
        font_sub = ImageFont.truetype("arial.ttf", 18)
    except:
        font_large = font_sub = ImageFont.load_default()

    summary_items = []

    for ref_name, after_name, label, headline, route in pairs:
        ref_path = ref_dir / ref_name
        after_path = after_dir / after_name

        if not ref_path.exists() or not after_path.exists():
            print(f"[SKIP] Missing: {ref_path} or {after_path}")
            continue

        im_ref = Image.open(ref_path).convert('RGB')
        im_after = Image.open(after_path).convert('RGB')

        # Resize after if needed to ensure 1536x1024
        if im_after.size != (1536, 1024):
            im_after = im_after.resize((1536, 1024), Image.Resampling.LANCZOS)
        if im_ref.size != (1536, 1024):
            im_ref = im_ref.resize((1536, 1024), Image.Resampling.LANCZOS)

        # Create side-by-side: width = 1536 * 2 = 3072, height = 1024 + 80 (top header)
        canvas_w = 1536 * 2
        canvas_h = 1024 + 80
        comp = Image.new('RGB', (canvas_w, canvas_h), '#0C0D0F')
        draw = ImageDraw.Draw(comp)

        # Draw header banner
        draw.rectangle([(0, 0), (canvas_w, 80)], fill='#141619')
        draw.line([(0, 80), (canvas_w, 80)], fill='#C6A260', width=2)
        draw.line([(1536, 0), (1536, canvas_h)], fill='#2A2D34', width=2)

        # Labels Left: REFERENCE MOCKUP
        draw.text((40, 15), f"APPROVED REFERENCE: {label} ({headline})", fill='#C6A260', font=font_large)
        draw.text((40, 48), f"Source: references/{ref_name} (Approved 1536x1024 Design)", fill='#A0A0A0', font=font_sub)

        # Labels Right: V2 RUNNING WEBSITE
        draw.text((1536 + 40, 15), f"V2 CURRENT IMPLEMENTATION: Route {route}", fill='#F0ECE3', font=font_large)
        draw.text((1536 + 40, 48), "Rendered in Next.js 14 App Router + Tailwind + GSAP (Active 1536x1024 Viewport)", fill='#A0A0A0', font=font_sub)

        # Paste images
        comp.paste(im_ref, (0, 80))
        comp.paste(im_after, (1536, 80))

        # Save single comparison
        out_single = out_dir / f"{ref_name[:2]}-comparison.jpg"
        comp.save(out_single, 'JPEG', quality=90)
        print(f"[OK] Generated comparison: {out_single}")

        summary_items.append((comp, label))

    # Now create Master Overview Grid (3 rows x 3 columns of mini side-by-sides)
    # Each mini side-by-side scaled to (800 x 287)
    grid_w = 800 * 3
    grid_h = 287 * 3
    master_grid = Image.new('RGB', (grid_w, grid_h), '#0C0D0F')

    for idx, (comp, label) in enumerate(summary_items):
        r = idx // 3
        c = idx % 3
        mini = comp.resize((800, 287), Image.Resampling.LANCZOS)
        master_grid.paste(mini, (c * 800, r * 287))

    master_path = out_dir / "master-comparison-grid.jpg"
    master_grid.save(master_path, 'JPEG', quality=88)
    print(f"[OK] Generated master comparison grid: {master_path}")

if __name__ == '__main__':
    main()
