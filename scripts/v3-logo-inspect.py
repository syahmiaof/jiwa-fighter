from PIL import Image
from pathlib import Path
for n in ['JIWA FIGHTER Horizontal Logo Lockup.png','JIWA_FIGHTER_HORIZONTAL_WHITE_BG_4K.png','brand-logo-on-black.jpg','user-approved-logo-master.jpg','brand-logo-on-white.png']:
 im=Image.open(Path('references')/n)
 print(n,im.mode,im.size,'corners',[im.getpixel(p) for p in [(0,0),(im.width-1,0),(0,im.height-1),(im.width-1,im.height-1),(im.width//2,im.height//2)]], 'bbox', im.getbbox())
