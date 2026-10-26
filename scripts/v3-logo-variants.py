from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "references" / "JIWA FIGHTER Horizontal Logo Lockup.png"
OUTPUT = ROOT / "public" / "assets" / "brand"

image = Image.open(SOURCE).convert("RGBA")
alpha = image.getchannel("A")
bounds = alpha.getbbox()
if bounds is None:
    raise RuntimeError("Approved logo source has no visible pixels")

cropped_alpha = alpha.crop(bounds)
for name, color in {
    "white": (240, 236, 227),
    "brass": (198, 162, 96),
    "dark": (12, 13, 15),
}.items():
    variant = Image.new("RGBA", cropped_alpha.size, (*color, 0))
    variant.putalpha(cropped_alpha)
    variant.save(OUTPUT / f"logo-horizontal-{name}.png", optimize=True)

print(f"Source bounds: {bounds}; crop: {cropped_alpha.size}; variants preserve source alpha")
