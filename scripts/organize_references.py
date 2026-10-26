import os
import shutil
from pathlib import Path
from PIL import Image

def main():
    ref_dir = Path('references')
    ref_dir.mkdir(exist_ok=True)

    mapping = [
        ('JIWA Fighter Iron Heritage homepage-1.png', '01-homepage.png', 'Homepage (Route /)', 'THE FIGHT IS IN YOU.'),
        ('Jiwa Fighter Iron Heritage shop-3.png', '02-shop.png', 'Shop All (Route /shop)', 'THE UNIFORM OF THE UNBROKEN.'),
        ('Silat Series_ The Art of Defence-2.png', '03-silat-series.png', 'Silat Series (Route /collections/silat-series)', 'THE ART OF DEFENCE.'),
        ('Keris Tuah jersey product page-4.png', '04-product-keris-tuah.png', 'Keris Tuah Detail (Route /products/keris-tuah)', 'KERIS TUAH HERITAGE PERFORMANCE JERSEY'),
        ('Warisan in motion lookbook-5.png', '05-lookbook.png', 'Lookbook (Route /lookbook)', 'A LEGACY IN MOTION.'),
        ('Jiwa Fighter_ Rooted, Resilient, Relentless-6.png', '06-our-story.png', 'Our Story (Route /our-story)', 'NOT BORN TO STAND STILL.'),
        ('Jiwa Fighter teamwear quote page-7.png', '07-teamwear.png', 'Custom Teamwear (Route /custom)', 'YOUR CREW. ONE JIWA.'),
        ('Jiwa Fighter Size & Fit Guide-9.png', '08-size-guide.png', 'Size & Fit Guide (Route /size-guide)', 'BUILT TO MOVE WITH YOU.'),
        ('Jiwa Fighter customer care-8.png', '09-customer-care.png', 'Customer Care & FAQ (Route /support)', "WE'RE IN YOUR CORNER."),
        ('JIWA FIGHTER logo on white.png', 'brand-logo-on-white.png', 'Brand Official Logo (White Background)', 'JIWA FIGHTER Angular Monogram + Wordmark'),
        ('Jiwa Fighter monochrome emblem.png', 'brand-monochrome-emblem.png', 'Brand Monochrome Emblem', 'JF Geometric Emblem Icon')
    ]

    readme_rows = []
    readme_rows.append("# JIWA FIGHTER — Reference Mockup & Brand Asset Index\n")
    readme_rows.append("Folder ini mengumpulkan semua 9 gambar visual mockup desktop asal (1536 × 1024) serta 2 fail logo rasmi jenama JIWA FIGHTER yang telah diluluskan untuk rujukan reka bentuk V2 (**Iron Heritage**).\n")
    readme_rows.append("| No | Fail Reference Asal | Nama Fail Standard | Dimensi | Halaman Web / Route | Tajuk Kempen Utama |")
    readme_rows.append("|:---|:---|:---|:---|:---|:---|")

    for src, dst, page_desc, headline in mapping:
        src_path = Path(src)
        dst_path = ref_dir / dst
        if src_path.exists():
            shutil.copy2(src_path, dst_path)
            with Image.open(dst_path) as im:
                w, h = im.size
                dim_str = f"{w} × {h}"
            readme_rows.append(f"| `{dst[:2]}` | `{src}` | [`{dst}`](file:///{dst_path.resolve().as_posix()}) | {dim_str} | **{page_desc}** | *\"{headline}\"* |")
            print(f"[OK] Copied {src} -> {dst_path} ({dim_str})")
        else:
            print(f"[MISSING] {src} not found")

    readme_rows.append("\n## Nota Spesifikasi Reka Bentuk (Iron Heritage)")
    readme_rows.append("- **Nisbah Aspek:** 3:2 (1536 × 1024 px pada desktop).")
    readme_rows.append("- **Palet Warna Utama:**")
    readme_rows.append("  - Obsidian Black: `#0C0D0F`")
    readme_rows.append("  - Antique Brass: `#C6A260`")
    readme_rows.append("  - Bone White: `#F0ECE3`")
    readme_rows.append("  - Oxblood: `#621F24`")
    readme_rows.append("- **Tipografi:** Condensed heavy sans-serif uppercase untuk tajuk editorial, diiringi sans-serif bersih dengan penjarakan huruf (tracking) kemas.")
    readme_rows.append("- **Identiti Logo:** Monogram geometri tajam `JF` berserta tipografi wordmark rasmi.")

    readme_content = "\n".join(readme_rows) + "\n"
    (ref_dir / "README.md").write_text(readme_content, encoding="utf-8")
    print(f"[OK] Created {ref_dir / 'README.md'}")

if __name__ == '__main__':
    main()
