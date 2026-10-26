from PIL import Image, ImageOps, ImageDraw
from pathlib import Path
names=['JIWA Fighter Iron Heritage homepage-1.png','Jiwa Fighter Iron Heritage shop-3.png','Silat Series_ The Art of Defence-2.png','Keris Tuah jersey product page-4.png','Warisan in motion lookbook-5.png','Jiwa Fighter_ Rooted, Resilient, Relentless-6.png','Jiwa Fighter teamwear quote page-7.png','Jiwa Fighter Size & Fit Guide-9.png','Jiwa Fighter customer care-8.png']
sheet=Image.new('RGB',(1536,1098),'#333333')
for i,n in enumerate(names):
 im=Image.open(n); im.thumbnail((512,342));x=(i%3)*512;y=(i//3)*366;sheet.paste(im,(x,y+24));ImageDraw.Draw(sheet).text((x+8,y+5),str(i+1)+' '+n,fill='white')
sheet.save('tests/v2/references.jpg')
