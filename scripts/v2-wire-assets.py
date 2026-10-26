from pathlib import Path
import json,re
manifest=json.loads(Path('tests/v2/asset-manifest-v2.json').read_text(encoding='utf-8'))
for p in Path('src').rglob('*.tsx'):
 s=p.read_text(encoding='utf-8')
 for item in manifest:
  dest=item['path'];orig=dest.replace('-v2.webp','.webp');s=s.replace(orig,dest)
 # Keep loaded image dimensions explicit through sizes, even though static unoptimized mode is retained.
 s=re.sub(r'(<Image\b(?:(?!/>).)*?\s)fill(\s)(?!\s*sizes=)',lambda m:m.group(1)+'fill'+m.group(2)+'sizes="(max-width: 768px) 100vw, 60vw"\n',s,flags=re.S)
 p.write_text(s,encoding='utf-8')
p=Path('src/data/products.ts');s=p.read_text(encoding='utf-8')
for item in manifest:s=s.replace(item['path'].replace('-v2.webp','.webp'),item['path'])
p.write_text(s,encoding='utf-8')
p=Path('src/app/products/keris-tuah/page.tsx');s=p.read_text();s=s.replace('keris-tuah-thumb-front-v2.webp','keris-tuah-main-v2.webp').replace('keris-tuah-thumb-detail-v2.webp','keris-tuah-detail-v2.webp').replace('keris-tuah-thumb-collar-v2.webp','keris-tuah-collar-v2.webp')
s=s.replace('className="gallery-selected object-contain p-6"', 'data-small={selectedImage === 2}\n                className="gallery-selected object-contain p-6"')
s=s.replace('{/* Zoom badge icon in top right */}', "{selectedImage === 2 && <p className=\"gallery-source-note\">{t.product.title} / {language === 'bm' ? 'Rujukan pandangan belakang' : 'Rear view reference'}</p>}")
s=s.replace('const { t } = useLanguage();','const { t, language } = useLanguage();');p.write_text(s)
p=Path('src/components/layout/Footer.tsx');s=p.read_text();s=re.sub(r'<span className="font-display text-2xl tracking-widest text-brass">.*?</span>', '<Image src="/assets/brand/wordmark-brass-v2.webp" alt="JIWA FIGHTER" width={165} height={12} className="h-auto" />',s,flags=re.S);p.write_text(s)
