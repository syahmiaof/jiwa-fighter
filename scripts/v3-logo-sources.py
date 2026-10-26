from PIL import Image,ImageDraw
from pathlib import Path
names=['JIWA FIGHTER Horizontal Logo Lockup.png','JIWA_FIGHTER_HORIZONTAL_WHITE_BG_4K.png','user-approved-logo-master.jpg','brand-logo-on-black.jpg','brand-logo-on-white.png']
out=Image.new('RGB',(1000,750),'#282828')
for i,n in enumerate(names):
 im=Image.open(Path('references')/n).convert('RGBA'); im.thumbnail((440,115)); x=(i%2)*500+25;y=(i//2)*250+40
 bg=Image.new('RGBA',im.size,'#0c0d0f');bg.alpha_composite(im);out.paste(bg.convert('RGB'),(x,y));ImageDraw.Draw(out).text((x,y-22),f'{n} / original {Image.open(Path("references")/n).size}',fill='white')
out.save('tests/v3/logo-sources.png')
