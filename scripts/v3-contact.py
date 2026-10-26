from PIL import Image,ImageDraw
from pathlib import Path
names=['01-homepage.png','02-shop.png','03-silat-series.png','04-product-keris-tuah.png','05-lookbook.png','06-our-story.png','07-teamwear.png','08-size-guide.png','09-customer-care.png']
for base,out in [('references','references'),('tests/v3/current','current')]:
 sheet=Image.new('RGB',(1536,1098),'#333')
 for i,n in enumerate(names):
  p=Path(base)/(n if base=='references' else f'{i+1:02}.png')
  im=Image.open(p);im.thumbnail((512,342));x=i%3*512;y=i//3*366;sheet.paste(im,(x,y+24));ImageDraw.Draw(sheet).text((x+8,y+5),f'{i+1} {p.name}',fill='white')
 sheet.save(Path('tests/v3')/f'{out}-contact.jpg')
