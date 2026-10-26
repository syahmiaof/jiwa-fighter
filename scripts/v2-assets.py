"""Reproducible V2 derivatives. Originals remain untouched; no generated imagery.

All rectangles are coordinates in approved 1536x1024 reference files. Source
photography resolution remains limited by those screenshots.
"""
from pathlib import Path
import json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'public/assets'
manifest = []


def save(image, folder, stem, source, operation, lossless=False):
    destination = OUTPUT / folder / f'{stem}-v2.webp'
    image.save(destination, 'WEBP', quality=91, method=6, lossless=lossless)
    manifest.append({'path': f'/assets/{folder}/{destination.name}', 'source': source,
                     'operation': operation, 'width': image.width, 'height': image.height,
                     'bytes': destination.stat().st_size})


def crop(source, box, folder, stem):
    image = Image.open(ROOT / source).convert('RGB').crop(box)
    save(image, folder, stem, source, {'crop': box})


home = 'JIWA Fighter Iron Heritage homepage-1.png'
silat = 'Silat Series_ The Art of Defence-2.png'
shop = 'Jiwa Fighter Iron Heritage shop-3.png'
lookbook = 'Warisan in motion lookbook-5.png'
product = 'Keris Tuah jersey product page-4.png'
teamwear = 'Jiwa Fighter teamwear quote page-7.png'

crop(home, (630, 62, 1450, 708), 'campaigns', 'homepage-hero-athlete')
crop(home, (475, 750, 801, 923), 'products', 'collection-preview-01-apparel')
crop(home, (814, 750, 1143, 922), 'products', 'collection-preview-02-training')
crop(home, (1155, 750, 1430, 927), 'products', 'collection-preview-03-accessories')
crop(silat, (630, 62, 1536, 696), 'campaigns', 'silat-hero-stance')
crop(silat, (505, 718, 744, 930), 'products', 'silat-training-jersey-front')
crop(silat, (851, 718, 1095, 930), 'products', 'silat-heritage-jersey-back')
crop(silat, (1170, 718, 1536, 925), 'products', 'silat-sleeve-culture-detail')
crop(shop, (320, 399, 696, 840), 'products', 'shop-heritage-jersey')
crop(shop, (718, 399, 1093, 840), 'products', 'shop-silat-jersey')
crop(shop, (1117, 399, 1495, 840), 'products', 'shop-keris-tuah-jersey')
crop(lookbook, (0, 62, 968, 650), 'campaigns', 'lookbook-hero-warehouse')
crop(lookbook, (0, 655, 484, 827), 'campaigns', 'lookbook-inset-badge')
crop(lookbook, (490, 655, 968, 827), 'campaigns', 'lookbook-inset-hands')
crop(lookbook, (360, 62, 700, 440), 'campaigns', 'lookbook-card-fighter')
crop(lookbook, (0, 655, 484, 827), 'campaigns', 'lookbook-card-craft')
crop(lookbook, (1250, 851, 1426, 990), 'campaigns', 'lookbook-card-land')
crop(product, (46, 134, 168, 282), 'products', 'keris-tuah-thumb-front')
crop(product, (43, 303, 171, 477), 'products', 'keris-tuah-thumb-back')
crop(product, (43, 491, 171, 651), 'products', 'keris-tuah-thumb-detail')
crop(product, (43, 664, 171, 823), 'products', 'keris-tuah-thumb-collar')
crop(product, (385, 450, 780, 865), 'products', 'keris-tuah-detail')
crop(product, (425, 166, 712, 328), 'products', 'keris-tuah-collar')

# Remove only the baked magnifier UI from empty photographic background.
source = Image.open(ROOT / product).convert('RGB')
main = source.crop((185, 128, 926, 987))
main.paste(source.crop((815, 138, 861, 181)), (687, 10))
save(main, 'products', 'keris-tuah-main', product,
     {'crop': [185, 128, 926, 987], 'background_patch': 'Replace baked magnifier with adjacent empty background; garment unchanged.'})

# The title overlaps the upper-left photo. Mask only that area; never invent
# pixels or crop the central athlete's head to remove it.
team = Image.open(ROOT / teamwear).convert('RGBA').crop((0, 290, 982, 810))
mask = Image.new('L', team.size, 255)
draw = ImageDraw.Draw(mask)
draw.rectangle((0, 0, 473, 113), fill=0)
mask = mask.filter(ImageFilter.GaussianBlur(5))
# Keep all baked letters fully removed before the 10px transition edge.
draw = ImageDraw.Draw(mask)
draw.rectangle((0, 0, 465, 108), fill=0)
team.putalpha(mask)
save(team, 'campaigns', 'teamwear-group-athletes', teamwear,
     {'crop': [0, 290, 982, 810], 'mask': 'Upper-left title/subcopy removed with transparent rectangle and 5px feather; central hair and faces retained.'})

# Use original shapes, rather than the V1 crop that clips the monogram's wing.
logo_source = 'JIWA FIGHTER logo on white.png'
logo = Image.open(ROOT / logo_source).convert('RGB')
array = np.asarray(logo).astype(float)
gray = array.mean(axis=2)
alpha = np.clip((245 - gray) * (255 / 225), 0, 255).astype('uint8')

def tinted_logo(rgb):
    rgba = np.empty((*alpha.shape, 4), dtype='uint8')
    rgba[:, :, :3] = rgb
    rgba[:, :, 3] = alpha
    return Image.fromarray(rgba, 'RGBA')


for tone, color in [('white', (240, 236, 227)), ('brass', (198, 162, 96)), ('dark', (12, 13, 15))]:
    transparent = tinted_logo(color)
    emblem = transparent.crop((307, 84, 1122, 759))
    emblem.thumbnail((160, 160), Image.Resampling.LANCZOS)
    save(emblem, 'brand', f'emblem-{tone}', logo_source, 'Original complete monogram, proportional downsample; background to alpha.', True)
    stacked = transparent.crop((80, 777, 1238, 1122))
    stacked.thumbnail((580, 200), Image.Resampling.LANCZOS)
    save(stacked, 'brand', f'wordmark-stacked-{tone}', logo_source, 'Original stacked wordmark; proportional downsample.', True)
    jiwa = transparent.crop((134, 777, 1175, 952))
    fighter = transparent.crop((80, 967, 1238, 1122))
    height = 64
    jiwa = jiwa.resize((round(jiwa.width * height / jiwa.height), height), Image.Resampling.LANCZOS)
    fighter = fighter.resize((round(fighter.width * height / fighter.height), height), Image.Resampling.LANCZOS)
    horizontal = Image.new('RGBA', (jiwa.width + fighter.width + 20, height))
    horizontal.alpha_composite(jiwa, (0, 0))
    horizontal.alpha_composite(fighter, (jiwa.width + 20, 0))
    save(horizontal, 'brand', f'wordmark-{tone}', logo_source,
         'Original JIWA and FIGHTER word crops arranged horizontally; each scaled proportionally to equal height, no glyph redraw.', True)

(ROOT / 'tests/v2').mkdir(parents=True, exist_ok=True)
(ROOT / 'tests/v2/asset-manifest-v2.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print(f'Saved {len(manifest)} derivatives; originals untouched.')
