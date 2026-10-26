import os
from PIL import Image
import numpy as np

# Create output directory
out_dir = 'public/assets/brand'
os.makedirs(out_dir, exist_ok=True)

# 1. Load reference nav logo master (224x37)
ref_logo_master = Image.open('tests/v2.2/logo/ref-nav-logo-master.png')
arr = np.array(ref_logo_master, dtype=np.float32)

# Background in reference nav header is dark charcoal [10.5, 12.0, 11.5]
# Foreground letters in reference nav header are bone white [242.0, 238.0, 230.0]
bg = np.array([10.5, 12.0, 11.5], dtype=np.float32)
fg = np.array([242.0, 238.0, 230.0], dtype=np.float32)

diff = np.maximum(0, arr - bg)
fg_diff = fg - bg
alpha_channels = diff / fg_diff
alpha = np.clip(alpha_channels.mean(axis=2), 0.0, 1.0)
alpha[alpha < 0.035] = 0.0 # Clean up background noise

# Apply subtle cubic ease to ensure anti-aliased edge clarity
alpha = np.power(alpha, 0.95)

colors = {
    'white': (240, 236, 227),  # Bone White #F0ECE3
    'brass': (198, 162, 96),   # Antique Brass #C6A260
    'dark':  (12, 13, 15),     # Obsidian Black #0C0D0F
}

for name, (r, g, b) in colors.items():
    # 1x asset (224 x 37)
    rgba = np.zeros((37, 224, 4), dtype=np.uint8)
    rgba[:, :, 0] = r
    rgba[:, :, 1] = g
    rgba[:, :, 2] = b
    rgba[:, :, 3] = (alpha * 255.0).astype(np.uint8)

    img_1x = Image.fromarray(rgba, mode='RGBA')
    img_1x.save(os.path.join(out_dir, f'logo-lockup-{name}.webp'), quality=95, method=6)
    img_1x.save(os.path.join(out_dir, f'logo-lockup-{name}.png'))

    # 2x Retina asset (448 x 74) with high-quality resampling
    img_2x = img_1x.resize((448, 74), Image.Resampling.LANCZOS)
    img_2x.save(os.path.join(out_dir, f'logo-lockup-{name}@2x.webp'), quality=95, method=6)
    img_2x.save(os.path.join(out_dir, f'logo-lockup-{name}@2x.png'))

    # Separate emblem: crop x: 0..38, y: 0..37
    emblem_1x = img_1x.crop((0, 0, 38, 37))
    emblem_1x.save(os.path.join(out_dir, f'emblem-{name}-v2.webp'), quality=95, method=6)
    emblem_1x.save(os.path.join(out_dir, f'emblem-{name}-v2.png'))
    emblem_2x = emblem_1x.resize((76, 74), Image.Resampling.LANCZOS)
    emblem_2x.save(os.path.join(out_dir, f'emblem-{name}-v2@2x.webp'), quality=95, method=6)

    # Separate wordmark: crop x: 45..224, y: 0..37 (trim empty top/bottom)
    wm_crop = img_1x.crop((45, 9, 224, 26))
    wm_crop.save(os.path.join(out_dir, f'wordmark-{name}-v2.webp'), quality=95, method=6)
    wm_crop.save(os.path.join(out_dir, f'wordmark-{name}-v2.png'))
    wm_2x = wm_crop.resize((wm_crop.width * 2, wm_crop.height * 2), Image.Resampling.LANCZOS)
    wm_2x.save(os.path.join(out_dir, f'wordmark-{name}-v2@2x.webp'), quality=95, method=6)

print("Generated all pixel-perfect master logo lockups and derivatives in public/assets/brand/:")
for f in sorted(os.listdir(out_dir)):
    if 'logo-lockup' in f or 'v2' in f:
        p = os.path.join(out_dir, f)
        im = Image.open(p)
        print(f"  {f:<30} {im.size} {im.mode}")
