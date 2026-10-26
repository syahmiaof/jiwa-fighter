import os
import numpy as np
from PIL import Image

def ensure_dirs():
    os.makedirs('public/assets/brand', exist_ok=True)
    os.makedirs('public/assets/campaigns', exist_ok=True)
    os.makedirs('public/assets/products', exist_ok=True)
    os.makedirs('public/assets/textures', exist_ok=True)

def process_logos():
    print("Processing logos...")
    # 1. JIWA FIGHTER logo on white.png (1302x1208)
    src_logo = Image.open('JIWA FIGHTER logo on white.png').convert('RGBA')
    arr = np.array(src_logo)
    
    # Clean transparent black logo: where white background is turned transparent
    # White is roughly R>230, G>230, B>230
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    # Calculate darkness (0 = black, 255 = white)
    gray = 0.299 * r + 0.587 * g + 0.114 * b
    # Invert darkness to alpha: black pixels get alpha 255, white get alpha 0
    alpha = np.clip((255 - gray) * 1.5, 0, 255).astype(np.uint8)
    
    # Black logo on transparent
    black_logo = np.zeros_like(arr)
    black_logo[:,:,0] = 12  # #0C0D0F
    black_logo[:,:,1] = 13
    black_logo[:,:,2] = 15
    black_logo[:,:,3] = alpha
    Image.fromarray(black_logo).save('public/assets/brand/logo-dark.png', 'PNG')
    
    # Bone white logo on transparent (for dark backgrounds)
    white_logo = np.zeros_like(arr)
    white_logo[:,:,0] = 240 # #F0ECE3
    white_logo[:,:,1] = 236
    white_logo[:,:,2] = 227
    white_logo[:,:,3] = alpha
    Image.fromarray(white_logo).save('public/assets/brand/logo-white.png', 'PNG')
    
    # Antique brass logo on transparent
    brass_logo = np.zeros_like(arr)
    brass_logo[:,:,0] = 198 # #C6A260
    brass_logo[:,:,1] = 162
    brass_logo[:,:,2] = 96
    brass_logo[:,:,3] = alpha
    Image.fromarray(brass_logo).save('public/assets/brand/logo-brass.png', 'PNG')
    
    # Crop JF emblem only (top portion without JIWA FIGHTER wordmark)
    # Emblem is roughly in the top 70% of height
    emblem_white = Image.fromarray(white_logo).crop((200, 50, 1100, 780))
    emblem_white.save('public/assets/brand/emblem-white.png', 'PNG')
    
    emblem_brass = Image.fromarray(brass_logo).crop((200, 50, 1100, 780))
    emblem_brass.save('public/assets/brand/emblem-brass.png', 'PNG')

    emblem_dark = Image.fromarray(black_logo).crop((200, 50, 1100, 780))
    emblem_dark.save('public/assets/brand/emblem-dark.png', 'PNG')

def process_homepage_assets():
    print("Processing homepage assets...")
    img = Image.open('JIWA Fighter Iron Heritage homepage-1.png').convert('RGB')
    
    # Hero athlete:
    # Right half: x from 600 to 1536, y from 60 to 705
    hero_athlete = img.crop((550, 60, 1536, 705))
    hero_athlete.save('public/assets/campaigns/homepage-hero-athlete.webp', 'WEBP', quality=95)
    hero_athlete.save('public/assets/campaigns/homepage-hero-athlete.png', 'PNG')
    
    # Collection preview card 01 (Apparel - back of jersey):
    # From y=730 to 965, x=474 to 800
    card1 = img.crop((474, 730, 800, 965))
    card1.save('public/assets/products/collection-preview-01-apparel.webp', 'WEBP', quality=95)
    card1.save('public/assets/products/collection-preview-01-apparel.png', 'PNG')
    
    # Collection preview card 02 (Training Essentials - athlete in guard):
    card2 = img.crop((812, 730, 1140, 965))
    card2.save('public/assets/products/collection-preview-02-training.webp', 'WEBP', quality=95)
    card2.save('public/assets/products/collection-preview-02-training.png', 'PNG')

    # Collection preview card 03 (Accessories - tactical duffle):
    card3 = img.crop((1154, 730, 1430, 965))
    card3.save('public/assets/products/collection-preview-03-accessories.webp', 'WEBP', quality=95)
    card3.save('public/assets/products/collection-preview-03-accessories.png', 'PNG')

def process_collection_assets():
    print("Processing silat series collection assets...")
    img = Image.open('Silat Series_ The Art of Defence-2.png').convert('RGB')
    
    # Silat martial artist in low kuda-kuda stance
    # Start at x=615 to avoid the 'DEFENCE.' headline text completely
    hero_silat = img.crop((615, 60, 1536, 680))
    hero_silat.save('public/assets/campaigns/silat-hero-stance.webp', 'WEBP', quality=95)
    hero_silat.save('public/assets/campaigns/silat-hero-stance.png', 'PNG')
    
    # Lineup card 01: Silat training jersey (front)
    lineup1 = img.crop((460, 700, 796, 908))
    lineup1.save('public/assets/products/silat-training-jersey-front.webp', 'WEBP', quality=95)
    lineup1.save('public/assets/products/silat-training-jersey-front.png', 'PNG')
    
    # Lineup card 02: Silat heritage jersey (back)
    lineup2 = img.crop((806, 700, 1152, 908))
    lineup2.save('public/assets/products/silat-heritage-jersey-back.webp', 'WEBP', quality=95)
    lineup2.save('public/assets/products/silat-heritage-jersey-back.png', 'PNG')
    
    # Lineup card 03: Sleeve songket culture detail
    lineup3 = img.crop((1168, 700, 1536, 955))
    lineup3.save('public/assets/products/silat-sleeve-culture-detail.webp', 'WEBP', quality=95)
    lineup3.save('public/assets/products/silat-sleeve-culture-detail.png', 'PNG')

def process_shop_assets():
    print("Processing shop assets...")
    img = Image.open('Jiwa Fighter Iron Heritage shop-3.png').convert('RGB')
    
    # Product 1: Heritage Jersey (black/gold)
    p1 = img.crop((320, 350, 695, 825))
    p1.save('public/assets/products/shop-heritage-jersey.webp', 'WEBP', quality=95)
    p1.save('public/assets/products/shop-heritage-jersey.png', 'PNG')
    
    # Product 2: Silat Jersey (black/crimson)
    p2 = img.crop((715, 350, 1095, 825))
    p2.save('public/assets/products/shop-silat-jersey.webp', 'WEBP', quality=95)
    p2.save('public/assets/products/shop-silat-jersey.png', 'PNG')
    
    # Product 3: Keris Tuah Jersey (black/gold with blade)
    p3 = img.crop((1115, 350, 1495, 825))
    p3.save('public/assets/products/shop-keris-tuah-jersey.webp', 'WEBP', quality=95)
    p3.save('public/assets/products/shop-keris-tuah-jersey.png', 'PNG')

    # Songket watermark (clean crop from top right with NO letters of UNBROKEN.)
    songket_crop = img.crop((1200, 60, 1530, 240))
    s_arr = np.array(songket_crop)
    gray = 0.299 * s_arr[:,:,0] + 0.587 * s_arr[:,:,1] + 0.114 * s_arr[:,:,2]
    alpha = np.clip((236 - gray) * 2.5, 0, 255).astype(np.uint8)
    res = np.zeros((s_arr.shape[0], s_arr.shape[1], 4), dtype=np.uint8)
    res[:,:,0] = 12
    res[:,:,1] = 13
    res[:,:,2] = 15
    res[:,:,3] = alpha
    Image.fromarray(res, 'RGBA').save('public/assets/textures/songket-watermark-bone.png', 'PNG')

def process_product_detail_assets():
    print("Processing product detail (Keris Tuah) assets...")
    img = Image.open('Keris Tuah jersey product page-4.png').convert('RGB')
    
    # Main hero product jersey (with duplicate loupe icon cleanly removed)
    main_jersey = img.crop((185, 125, 925, 965))
    arr = np.array(main_jersey)
    # Background color sample near the top right loupe icon
    bg_sample = arr[12:56, 640:680]
    bg_color = np.median(bg_sample, axis=(0,1)).astype(np.uint8)
    arr[10:60, 680:735] = bg_color
    cleaned_main = Image.fromarray(arr)
    cleaned_main.save('public/assets/products/keris-tuah-main.webp', 'WEBP', quality=95)
    cleaned_main.save('public/assets/products/keris-tuah-main.png', 'PNG')
    
    # 4 Gallery thumbnails
    thumb1 = img.crop((42, 125, 172, 280))
    thumb1.save('public/assets/products/keris-tuah-thumb-front.webp', 'WEBP', quality=95)
    thumb1.save('public/assets/products/keris-tuah-thumb-front.png', 'PNG')
    
    thumb2 = img.crop((42, 292, 172, 465))
    thumb2.save('public/assets/products/keris-tuah-thumb-back.webp', 'WEBP', quality=95)
    thumb2.save('public/assets/products/keris-tuah-thumb-back.png', 'PNG')

    thumb3 = img.crop((42, 476, 172, 636))
    thumb3.save('public/assets/products/keris-tuah-thumb-detail.webp', 'WEBP', quality=95)
    thumb3.save('public/assets/products/keris-tuah-thumb-detail.png', 'PNG')

    thumb4 = img.crop((42, 646, 172, 806))
    thumb4.save('public/assets/products/keris-tuah-thumb-collar.webp', 'WEBP', quality=95)
    thumb4.save('public/assets/products/keris-tuah-thumb-collar.png', 'PNG')

def process_lookbook_assets():
    print("Processing lookbook assets...")
    img = Image.open('Warisan in motion lookbook-5.png').convert('RGB')
    
    # Left hero full-height warehouse
    hero_lb = img.crop((0, 60, 968, 636))
    hero_lb.save('public/assets/campaigns/lookbook-hero-warehouse.webp', 'WEBP', quality=95)
    hero_lb.save('public/assets/campaigns/lookbook-hero-warehouse.png', 'PNG')
    
    # Inset 1: Gold badge & songket on jersey
    inset1 = img.crop((0, 638, 484, 808))
    inset1.save('public/assets/campaigns/lookbook-inset-badge.webp', 'WEBP', quality=95)
    inset1.save('public/assets/campaigns/lookbook-inset-badge.png', 'PNG')
    
    # Inset 2: Athlete wrapping hands
    inset2 = img.crop((488, 638, 968, 808))
    inset2.save('public/assets/campaigns/lookbook-inset-hands.webp', 'WEBP', quality=95)
    inset2.save('public/assets/campaigns/lookbook-inset-hands.png', 'PNG')
    
    # Bottom campaign cards
    c1 = img.crop((490, 828, 790, 970))
    c1.save('public/assets/campaigns/lookbook-card-fighter.webp', 'WEBP', quality=95)
    c1.save('public/assets/campaigns/lookbook-card-fighter.png', 'PNG')
    
    c2 = img.crop((804, 828, 1104, 970))
    c2.save('public/assets/campaigns/lookbook-card-craft.webp', 'WEBP', quality=95)
    c2.save('public/assets/campaigns/lookbook-card-craft.png', 'PNG')

    c3 = img.crop((1120, 828, 1426, 970))
    c3.save('public/assets/campaigns/lookbook-card-land.webp', 'WEBP', quality=95)
    c3.save('public/assets/campaigns/lookbook-card-land.png', 'PNG')

def process_our_story_assets():
    print("Processing our story assets...")
    img = Image.open('Jiwa Fighter_ Rooted, Resilient, Relentless-6.png').convert('RGB')
    
    # Athlete sitting on bench
    story_hero = img.crop((680, 60, 1536, 695))
    story_hero.save('public/assets/campaigns/our-story-bench-athlete.webp', 'WEBP', quality=95)
    story_hero.save('public/assets/campaigns/our-story-bench-athlete.png', 'PNG')

def process_teamwear_assets():
    print("Processing teamwear assets...")
    img = Image.open('Jiwa Fighter teamwear quote page-7.png').convert('RGB')
    
    # 4 Athletes group portrait
    team_group = img.crop((0, 60, 980, 790))
    team_group.save('public/assets/campaigns/teamwear-group-athletes.webp', 'WEBP', quality=95)
    team_group.save('public/assets/campaigns/teamwear-group-athletes.png', 'PNG')

def process_support_assets():
    print("Processing support/customer care assets...")
    img = Image.open('Jiwa Fighter customer care-8.png').convert('RGB')
    
    # Athlete looking up
    support_hero = img.crop((780, 60, 1536, 455))
    support_hero.save('public/assets/campaigns/support-hero-athlete.webp', 'WEBP', quality=95)
    support_hero.save('public/assets/campaigns/support-hero-athlete.png', 'PNG')

def process_size_guide_assets():
    print("Processing size guide assets...")
    img = Image.open('Jiwa Fighter Size & Fit Guide-9.png').convert('RGB')
    
    # Athlete wearing jersey (top right)
    guide_hero = img.crop((820, 60, 1536, 535))
    guide_hero.save('public/assets/campaigns/size-guide-athlete.webp', 'WEBP', quality=95)
    guide_hero.save('public/assets/campaigns/size-guide-athlete.png', 'PNG')
    
    # T-shirt line diagram
    tshirt_diag = img.crop((1205, 605, 1475, 820))
    tshirt_diag.save('public/assets/campaigns/tshirt-measurement-diagram.webp', 'WEBP', quality=95)
    tshirt_diag.save('public/assets/campaigns/tshirt-measurement-diagram.png', 'PNG')

def main():
    ensure_dirs()
    process_logos()
    process_homepage_assets()
    process_collection_assets()
    process_shop_assets()
    process_product_detail_assets()
    process_lookbook_assets()
    process_our_story_assets()
    process_teamwear_assets()
    process_support_assets()
    process_size_guide_assets()
    print("Asset extraction complete!")

if __name__ == '__main__':
    main()
