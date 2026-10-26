import os
from PIL import Image, ImageChops, ImageDraw, ImageFont
import numpy as np

routes = [
    ('01-homepage', 'references/01-homepage.png', 'tests/v2.2/sections/before/01-homepage-viewport.png'),
    ('02-shop', 'references/02-shop.png', 'tests/v2.2/sections/before/02-shop-viewport.png'),
    ('03-silat-series', 'references/03-silat-series.png', 'tests/v2.2/sections/before/03-silat-series-viewport.png'),
    ('04-product-keris-tuah', 'references/04-product-keris-tuah.png', 'tests/v2.2/sections/before/04-product-keris-tuah-viewport.png'),
    ('05-lookbook', 'references/05-lookbook.png', 'tests/v2.2/sections/before/05-lookbook-viewport.png'),
    ('06-our-story', 'references/06-our-story.png', 'tests/v2.2/sections/before/06-our-story-viewport.png'),
    ('07-teamwear', 'references/07-teamwear.png', 'tests/v2.2/sections/before/07-teamwear-viewport.png'),
    ('08-size-guide', 'references/08-size-guide.png', 'tests/v2.2/sections/before/08-size-guide-viewport.png'),
    ('09-customer-care', 'references/09-customer-care.png', 'tests/v2.2/sections/before/09-customer-care-viewport.png')
]

out_dir = 'tests/v2.2/comparisons'
os.makedirs(out_dir, exist_ok=True)

print(f"{'ROUTE':<25} | {'DIFF %':<8} | {'MAX DIFF':<8} | {'STATUS'}")
print("-" * 55)

for name, ref_path, test_path in routes:
    if not os.path.exists(test_path):
        print(f"{name:<25} | MISSING TEST IMAGE: {test_path}")
        continue

    ref_img = Image.open(ref_path).convert('RGB')
    test_img = Image.open(test_path).convert('RGB')

    # Ensure both are 1536x1024
    if ref_img.size != (1536, 1024):
        ref_img = ref_img.resize((1536, 1024), Image.Resampling.LANCZOS)
    if test_img.size != (1536, 1024):
        test_img = test_img.resize((1536, 1024), Image.Resampling.LANCZOS)

    ref_arr = np.array(ref_img, dtype=np.float32)
    test_arr = np.array(test_img, dtype=np.float32)

    diff = np.abs(ref_arr - test_arr)
    mean_diff = diff.mean()
    pct_diff = (mean_diff / 255.0) * 100.0
    max_d = diff.max()

    status = "EXCELLENT" if pct_diff < 5.0 else ("GOOD" if pct_diff < 10.0 else "NEEDS POLISH")
    print(f"{name:<25} | {pct_diff:6.2f}% | {max_d:6.0f}   | {status}")

    # Generate side-by-side comparison: Reference (left) | Implemented (right) | Heatmap (far right)
    diff_gray = np.clip(diff.mean(axis=2) * 3.0, 0, 255).astype(np.uint8)
    heatmap = Image.fromarray(diff_gray, mode='L').convert('RGB')

    # 3-panel canvas: (1536 * 3) x 1024 -> resize each panel to 512x341 so total image is 1536x341 for easy viewing
    w, h = 512, 341
    panel_ref = ref_img.resize((w, h), Image.Resampling.LANCZOS)
    panel_test = test_img.resize((w, h), Image.Resampling.LANCZOS)
    panel_heat = heatmap.resize((w, h), Image.Resampling.NEAREST)

    combined = Image.new('RGB', (w * 3, h + 30), color=(18, 18, 20))
    combined.paste(panel_ref, (0, 30))
    combined.paste(panel_test, (w, 30))
    combined.paste(panel_heat, (w * 2, 30))

    draw = ImageDraw.Draw(combined)
    draw.text((15, 8), f"REFERENCE ({name})", fill=(200, 200, 200))
    draw.text((w + 15, 8), f"IMPLEMENTATION (Diff: {pct_diff:.2f}%)", fill=(200, 200, 200))
    draw.text((w * 2 + 15, 8), "DIFFERENCE HEATMAP", fill=(240, 160, 80))

    combined.save(os.path.join(out_dir, f"compare-{name}.jpg"), quality=90)

print("-" * 55)
print("All side-by-side comparison cards generated in tests/v2.2/comparisons/")
