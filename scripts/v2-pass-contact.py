from PIL import Image,ImageDraw
sheet=Image.new('RGB',(1536,1098),'#333333')
for i in range(9):
 im=Image.open(f'tests/v2/pass-1/{i+1}.png');im.thumbnail((512,342));x=i%3*512;y=i//3*366;sheet.paste(im,(x,y+24));ImageDraw.Draw(sheet).text((x+8,y+5),str(i+1),fill='white')
sheet.save('tests/v2/pass-1/contact.jpg')
