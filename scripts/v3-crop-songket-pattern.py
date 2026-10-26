from pathlib import Path
from PIL import Image


root = Path(__file__).resolve().parents[1]
source = Image.open(root / 'public/assets/textures/songket-watermark-bone.png').convert('RGBA')
# The supplied watermark is a screenshot-derived texture with its own copy on
# the right and a thin black capture edge at the top. Keep only the clean
# textile portion so all live headings and labels remain real HTML.
pattern = source.crop((0, 10, 180, 180))
pattern.save(root / 'public/assets/textures/songket-pattern-only.png', optimize=True)
brass = Image.new('RGBA', pattern.size, (198, 162, 96, 0))
brass.putalpha(pattern.getchannel('A'))
brass.save(root / 'public/assets/textures/songket-pattern-brass.png', optimize=True)
print(f'Wrote pattern-only crop {pattern.size}; removed embedded copy and capture edge.')
