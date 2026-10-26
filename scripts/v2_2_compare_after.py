import os
from PIL import Image, ImageDraw, ImageFont
import numpy as np

routes = [
    ('01-homepage', 'references/01-homepage.png', 'tests/v2.2/sections/before/01-homepage-viewport.png', 'tests/v2.2/sections/after/01-homepage-viewport.png'),
    ('02-shop', 'references/02-shop.png', 'tests/v2.2/sections/before/02-shop-viewport.png', 'tests/v2.2/sections/after/02-shop-viewport.png'),
    ('03-silat-series', 'references/03-silat-series.png', 'tests/v2.2/sections/before/03-silat-series-viewport.png', 'tests/v2.2/sections/after/03-silat-series-viewport.png'),
    ('04-product-keris-tuah', 'references/04-product-keris-tuah.png', 'tests/v2.2/sections/before/04-product-keris-tuah-viewport.png', 'tests/v2.2/sections/after/04-product-keris-tuah-viewport.png'),
    ('05-lookbook', 'references/05-lookbook.png', 'tests/v2.2/sections/before/05-lookbook-viewport.png', 'tests/v2.2/sections/after/05-lookbook-viewport.png'),
    ('06-our-story', 'references/06-our-story.png', 'tests/v2.2/sections/before/06-our-story-viewport.png', 'tests/v2.2/sections/after/06-our-story-viewport.png'),
    ('07-teamwear', 'references/07-teamwear.png', 'tests/v2.2/sections/before/07-teamwear-viewport.png', 'tests/v2.2/sections/after/07-teamwear-viewport.png'),
    ('08-size-guide', 'references/08-size-guide.png', 'tests/v2.2/sections/before/08-size-guide-viewport.png', 'tests/v2.2/sections/after/08-size-guide-viewport.png'),
    ('09-customer-care', 'references/09-customer-care.png', 'tests/v2.2/sections/before/09-customer-care-viewport.png', 'tests/v2.2/sections/after/09-customer-care-viewport.png')
]

out_dir = 'tests/v2.2/comparisons'
os.makedirs(out_dir, exist_ok=True)

print(f"{'ROUTE':<24} | {'BEFORE':<8} | {'AFTER':<8} | {'IMPROV':<8} | {'STATUS'}")
print("-" * 65)

results = []

for name, ref_path, before_path, after_path in routes:
    if not os.path.exists(after_path):
        print(f"{name:<24} | MISSING AFTER IMAGE: {after_path}")
        continue

    ref_img = Image.open(ref_path).convert('RGB')
    before_img = Image.open(before_path).convert('RGB')
    after_img = Image.open(after_path).convert('RGB')

    if ref_img.size != (1536, 1024):
        ref_img = ref_img.resize((1536, 1024), Image.Resampling.LANCZOS)
    if before_img.size != (1536, 1024):
        before_img = before_img.resize((1536, 1024), Image.Resampling.LANCZOS)
    if after_img.size != (1536, 1024):
        after_img = after_img.resize((1536, 1024), Image.Resampling.LANCZOS)

    ref_arr = np.array(ref_img, dtype=np.float32)
    before_arr = np.array(before_img, dtype=np.float32)
    after_arr = np.array(after_img, dtype=np.float32)

    before_diff = (np.abs(ref_arr - before_arr).mean() / 255.0) * 100.0
    after_diff = (np.abs(ref_arr - after_arr).mean() / 255.0) * 100.0
    improv = before_diff - after_diff

    status = "EXCELLENT" if after_diff < 5.0 else ("GOOD" if after_diff < 10.0 else "IMPROVED")
    print(f"{name:<24} | {before_diff:6.2f}% | {after_diff:6.2f}% | {improv:+6.2f}% | {status}")
    results.append((name, before_diff, after_diff, improv, status))

    # Generate side-by-side comparison: Reference (left) | Implemented AFTER (center) | Difference Heatmap (right)
    diff = np.abs(ref_arr - after_arr)
    diff_gray = np.clip(diff.mean(axis=2) * 3.5, 0, 255).astype(np.uint8)
    heatmap = Image.fromarray(diff_gray, mode='L').convert('RGB')

    w, h = 512, 341
    panel_ref = ref_img.resize((w, h), Image.Resampling.LANCZOS)
    panel_after = after_img.resize((w, h), Image.Resampling.LANCZOS)
    panel_heat = heatmap.resize((w, h), Image.Resampling.NEAREST)

    combined = Image.new('RGB', (w * 3, h + 32), color=(14, 15, 18))
    combined.paste(panel_ref, (0, 32))
    combined.paste(panel_after, (w, 32))
    combined.paste(panel_heat, (w * 2, 32))

    draw = ImageDraw.Draw(combined)
    draw.text((15, 8), f"REFERENCE ({name})", fill=(210, 210, 210))
    draw.text((w + 15, 8), f"IMPLEMENTATION AFTER (Diff: {after_diff:.2f}%)", fill=(198, 162, 96))
    draw.text((w * 2 + 15, 8), "DIFFERENCE HEATMAP", fill=(240, 160, 80))

    combined.save(os.path.join(out_dir, f"compare-{name}.jpg"), quality=92)

print("-" * 65)
print("All side-by-side comparison cards generated in tests/v2.2/comparisons/")
