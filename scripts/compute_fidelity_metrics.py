import os
from pathlib import Path
from PIL import Image, ImageChops, ImageStat
import numpy as np

def analyze():
    pairs = [
        ('01-homepage.png', '1-viewport.png', 'Route / (Homepage)', 'THE FIGHT IS IN YOU.'),
        ('02-shop.png', '2-viewport.png', 'Route /shop (Shop All)', 'THE UNIFORM OF THE UNBROKEN.'),
        ('03-silat-series.png', '3-viewport.png', 'Route /collections/silat-series (Silat Series)', 'THE ART OF DEFENCE.'),
        ('04-product-keris-tuah.png', '4-viewport.png', 'Route /products/keris-tuah (Keris Tuah Detail)', 'KERIS TUAH HERITAGE JERSEY'),
        ('05-lookbook.png', '5-viewport.png', 'Route /lookbook (Lookbook)', 'A LEGACY IN MOTION.'),
        ('06-our-story.png', '6-viewport.png', 'Route /our-story (Our Story)', 'NOT BORN TO STAND STILL.'),
        ('07-teamwear.png', '7-viewport.png', 'Route /custom (Custom Teamwear)', 'YOUR CREW. ONE JIWA.'),
        ('08-size-guide.png', '8-viewport.png', 'Route /size-guide (Size & Fit Guide)', 'BUILT TO MOVE WITH YOU.'),
        ('09-customer-care.png', '9-viewport.png', 'Route /support (Customer Care & FAQ)', "WE'RE IN YOUR CORNER."),
    ]

    ref_dir = Path('references')
    after_dir = Path('tests/v2/after')

    print(f"{'Page':<35} | {'Size':<12} | {'Mean Diff':<10} | {'Status':<15}")
    print("-" * 75)

    results = []
    for ref_name, after_name, label, headline in pairs:
        ref_path = ref_dir / ref_name
        after_path = after_dir / after_name

        im_ref = Image.open(ref_path).convert('RGB').resize((1536, 1024))
        im_after = Image.open(after_path).convert('RGB').resize((1536, 1024))

        diff = ImageChops.difference(im_ref, im_after)
        stat = ImageStat.Stat(diff)
        mean_diff = sum(stat.mean) / len(stat.mean)

        # Convert to numpy for correlation
        arr_ref = np.array(im_ref, dtype=np.float32)
        arr_after = np.array(im_after, dtype=np.float32)
        
        # Pearson correlation coefficient across pixels
        r_ref = arr_ref.flatten()
        r_after = arr_after.flatten()
        corr = np.corrcoef(r_ref, r_after)[0, 1]

        results.append({
            'page': label,
            'headline': headline,
            'ref_file': ref_name,
            'after_file': after_name,
            'mean_diff': round(mean_diff, 2),
            'correlation': round(corr * 100, 2)
        })

        print(f"{label:<35} | 1536x1024    | {mean_diff:<10.2f} | Corr: {corr*100:.1f}%")

    return results

if __name__ == '__main__':
    analyze()
