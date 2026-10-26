from PIL import Image, ImageDraw
from pathlib import Path

routes = [
    'Homepage',
    'Shop',
    'Silat Series',
    'Keris Tuah',
    'Lookbook',
    'Our Story',
    'Teamwear',
    'Size Guide',
    'Support',
]

sheet = Image.new('RGB', (1536, 1098), '#0C0D0F')
draw = ImageDraw.Draw(sheet)

for i, name in enumerate(routes):
    img_path = Path(f'tests/v2/after/{i+1}-viewport.png')
    if img_path.exists():
        im = Image.open(img_path)
        im.thumbnail((512, 342))
        x = (i % 3) * 512
        y = (i // 3) * 366
        sheet.paste(im, (x, y + 24))
        draw.text((x + 8, y + 6), f'{i+1}. {name}', fill='#C6A260')

sheet.save('tests/v2/after/contact-sheet.jpg', quality=90)
print('Generated tests/v2/after/contact-sheet.jpg successfully!')
