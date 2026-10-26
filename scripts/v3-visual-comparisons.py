from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
references = [
    '01-homepage.png', '02-shop.png', '03-silat-series.png',
    '04-product-keris-tuah.png', '05-lookbook.png', '06-our-story.png',
    '07-teamwear.png', '08-size-guide.png', '09-customer-care.png',
]
labels = ['Home', 'Shop', 'Silat Series', 'Keris Tuah', 'Lookbook', 'Our Story', 'Custom', 'Size Guide', 'Support']
output = ROOT / 'tests' / 'v3' / 'comparisons'
output.mkdir(parents=True, exist_ok=True)
font = ImageFont.load_default()

for index, (reference_name, label) in enumerate(zip(references, labels), start=1):
    reference = Image.open(ROOT / 'references' / reference_name).convert('RGB')
    current = Image.open(ROOT / 'tests' / 'v3' / 'current' / f'{index:02}.png').convert('RGB')
    if reference.size != (1536, 1024) or current.size != reference.size:
        raise RuntimeError(f'{label}: expected matching 1536x1024 captures, got {reference.size} and {current.size}')
    board = Image.new('RGB', (3072, 1064), '#17191c')
    draw = ImageDraw.Draw(board)
    draw.text((16, 9), f'{index:02} {label} — APPROVED REFERENCE', font=font, fill='#f0ece3')
    draw.text((1552, 9), f'{index:02} {label} — CURRENT RENDER', font=font, fill='#f0ece3')
    board.paste(reference, (0, 32))
    board.paste(current, (1536, 32))
    board.save(output / f'{index:02}-side-by-side.jpg', quality=83, optimize=True)

logo_root = ROOT / 'tests' / 'v3' / 'logo-comparison'
source = Image.open(ROOT / 'references' / 'JIWA FIGHTER Horizontal Logo Lockup.png').convert('RGBA')
bounds = source.getchannel('A').getbbox()
source = source.crop(bounds)

def make_variant(color):
    variant = Image.new('RGBA', source.size, (*color, 0))
    variant.putalpha(source.getchannel('A'))
    return variant

def compare_logo(rendered_name, color, output_name, background):
    rendered = Image.open(logo_root / rendered_name).convert('RGBA')
    width, height = rendered.size
    approved = make_variant(color).resize((width, height), Image.Resampling.LANCZOS)
    panel = Image.new('RGBA', (width * 2 + 44, height + 56), background)
    panel.alpha_composite(approved, (12, 34))
    panel.alpha_composite(rendered, (width + 32, 34))
    draw = ImageDraw.Draw(panel)
    draw.text((12, 10), 'APPROVED SOURCE / ALPHA CROP', font=font, fill='#f0ece3')
    draw.text((width + 32, 10), 'BROWSER RENDER', font=font, fill='#f0ece3')
    panel.convert('RGB').save(logo_root / output_name, quality=92, optimize=True)

compare_logo('desktop-home-rendered.png', (240, 236, 227), 'desktop-source-vs-render.jpg', '#0c0d0f')
compare_logo('mobile-rendered.png', (240, 236, 227), 'mobile-source-vs-render.jpg', '#0c0d0f')
compare_logo('footer-rendered.png', (198, 162, 96), 'footer-source-vs-render.jpg', '#141619')

print('Created nine reference/current boards and desktop, mobile, footer logo source comparisons.')
