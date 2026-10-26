import cv2
import numpy as np
from PIL import Image
import os

os.makedirs('public/assets/brand', exist_ok=True)

# 1. Load ground-truth white master
img = cv2.imread('references/brand-logo-on-white.png', cv2.IMREAD_GRAYSCALE)
_, thresh = cv2.threshold(img, 200, 255, cv2.THRESH_BINARY_INV)
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

# Separate into components
emblem_contours = [c for c in contours if cv2.boundingRect(c)[1] < 760]
jiwa_contours = [c for c in contours if 760 <= cv2.boundingRect(c)[1] < 960]
fighter_contours = [c for c in contours if cv2.boundingRect(c)[1] >= 960]

# Stacked logo bounds
ox, oy = 82, 88
vw, vh = 1153, 1032

# Emblem bounds
xe, ye, we, he = cv2.boundingRect(np.concatenate(emblem_contours))
print(f'Stacked ViewBox: 0 0 {vw} {vh}')
print(f'Emblem ViewBox: 0 0 {we} {he} (origin: {xe}, {ye})')

def contours_to_svg_d(contour_list, offset_x, offset_y, eps=0.45):
    d_parts = []
    for c in contour_list:
        approx = cv2.approxPolyDP(c, eps, True)
        pts = approx.reshape(-1, 2)
        p_str = f"M {pts[0][0]-offset_x:.2f} {pts[0][1]-offset_y:.2f}"
        for pt in pts[1:]:
            p_str += f" L {pt[0]-offset_x:.2f} {pt[1]-offset_y:.2f}"
        p_str += " Z"
        d_parts.append(p_str)
    return " ".join(d_parts)

full_d = contours_to_svg_d(contours, ox, oy)
emblem_d = contours_to_svg_d(emblem_contours, xe, ye)

colors = {
    'white': '#F0ECE3',
    'brass': '#C6A260',
    'dark': '#0C0D0F'
}

# Generate SVG files for stacked logo
for name, col in colors.items():
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vw} {vh}" width="100%" height="100%" fill="{col}">
  <path d="{full_d}" fill-rule="evenodd" />
</svg>'''
    p = f'public/assets/brand/logo-stacked-{name}.svg'
    with open(p, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f'Wrote {p} (SVG Vector)')

# Generate SVG files for emblem (icon only)
for name, col in colors.items():
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {we} {he}" width="100%" height="100%" fill="{col}">
  <path d="{emblem_d}" fill-rule="evenodd" />
</svg>'''
    p = f'public/assets/brand/emblem-{name}.svg'
    with open(p, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f'Wrote {p} (SVG Vector)')

# Write public/icon.svg for browser tab bar
with open('public/icon.svg', 'w', encoding='utf-8') as f:
    f.write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {we} {he}" width="100%" height="100%" fill="#C6A260">
  <path d="{emblem_d}" fill-rule="evenodd" />
</svg>''')
print('Wrote public/icon.svg')

# 2. Generate Ultra-Crisp Master Raster & 4x Supersampled Raster
# Render master stacked logo with clean alpha from threshold
h, w = img.shape
alpha_full = thresh[oy:oy+vh, ox:ox+vw]

# Build RGBA masters
for name, hex_c in [('white', (240, 236, 227)), ('brass', (198, 162, 96)), ('dark', (12, 13, 15))]:
    rgba = np.zeros((vh, vw, 4), dtype=np.uint8)
    rgba[:, :, 0] = hex_c[0]
    rgba[:, :, 1] = hex_c[1]
    rgba[:, :, 2] = hex_c[2]
    rgba[:, :, 3] = alpha_full
    im_master = Image.fromarray(rgba, 'RGBA')
    
    # Save master PNG
    im_master.save(f'public/assets/brand/logo-stacked-{name}-master.png', 'PNG')
    im_master.save(f'public/assets/brand/logo-stacked-{name}.png', 'PNG')
    im_master.save(f'public/assets/brand/logo-{name}.png', 'PNG')
    
    # Save 4x Retina header webp (232 x 208 px) - 4 times the resolution of 58x52!
    # When displayed in a 58x52 container, this provides crystal-clear rendering on 1x, 2x, 3x, and 4k displays!
    h_4x = im_master.resize((232, 208), Image.Resampling.LANCZOS)
    h_4x.save(f'public/assets/brand/logo-stacked-{name}-header.webp', 'WEBP', quality=100, lossless=True)
    h_4x.save(f'public/assets/brand/logo-stacked-{name}-header@2x.webp', 'WEBP', quality=100, lossless=True)
    h_4x.save(f'public/assets/brand/logo-stacked-{name}-header.png', 'PNG')
    
    # Save 4x Retina footer webp (340 x 304 px) - 4 times the resolution of 85x76!
    f_4x = im_master.resize((340, 304), Image.Resampling.LANCZOS)
    f_4x.save(f'public/assets/brand/logo-stacked-{name}-footer.webp', 'WEBP', quality=100, lossless=True)
    f_4x.save(f'public/assets/brand/logo-stacked-{name}-footer@2x.webp', 'WEBP', quality=100, lossless=True)
    f_4x.save(f'public/assets/brand/logo-stacked-{name}-footer.png', 'PNG')
    print(f'Generated crystal-clear 4x supersampled rasters for {name}')

# 3. Generate Ultra-Crisp Icons (Emblem Only)
alpha_emblem = thresh[ye:ye+he, xe:xe+we]
for name, hex_c in [('white', (240, 236, 227)), ('brass', (198, 162, 96)), ('dark', (12, 13, 15))]:
    rgba_emb = np.zeros((he, we, 4), dtype=np.uint8)
    rgba_emb[:, :, 0] = hex_c[0]
    rgba_emb[:, :, 1] = hex_c[1]
    rgba_emb[:, :, 2] = hex_c[2]
    rgba_emb[:, :, 3] = alpha_emblem
    emb_master = Image.fromarray(rgba_emb, 'RGBA')
    
    emb_master.save(f'public/assets/brand/emblem-{name}-official-hi.png', 'PNG')
    
    # 4x emblem (176 x 144)
    emb_4x = emb_master.resize((176, 144), Image.Resampling.LANCZOS)
    emb_4x.save(f'public/assets/brand/emblem-{name}-v2.webp', 'WEBP', quality=100, lossless=True)
    emb_4x.save(f'public/assets/brand/emblem-{name}-v2@2x.webp', 'WEBP', quality=100, lossless=True)
    emb_4x.save(f'public/assets/brand/emblem-{name}-v2.png', 'PNG')

# 4. Generate Square PWA & Favicon Icons (Square centered with Antique Brass JF emblem)
square_size = 512
sq_img = Image.new('RGBA', (square_size, square_size), (0, 0, 0, 0))

# Resize emblem to fit square (say 440px wide)
target_w = 440
target_h = int(target_w * (he / we))
emb_brass_sq = Image.open('public/assets/brand/emblem-brass-official-hi.png').resize((target_w, target_h), Image.Resampling.LANCZOS)

ox_sq = (square_size - target_w) // 2
oy_sq = (square_size - target_h) // 2
sq_img.paste(emb_brass_sq, (ox_sq, oy_sq), emb_brass_sq)

# Save icon.png (512x512)
sq_img.save('public/icon.png', 'PNG')
print('Generated public/icon.png (512x512 crystal clear)')

# Save apple-icon.png (180x180)
sq_180 = sq_img.resize((180, 180), Image.Resampling.LANCZOS)
sq_180.save('public/apple-icon.png', 'PNG')
print('Generated public/apple-icon.png (180x180 crystal clear)')

# Save multi-size favicon.ico (16, 32, 48, 64, 128, 256)
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
ico_imgs = [sq_img.resize(s, Image.Resampling.LANCZOS) for s in ico_sizes]
ico_imgs[0].save('public/favicon.ico', format='ICO', sizes=ico_sizes, append_images=ico_imgs[1:])
print('Generated public/favicon.ico (multi-size up to 256px crystal clear)')

print('ALL CRYSTAL CLEAR BRAND ASSETS SUCCESSFULLY GENERATED!')
