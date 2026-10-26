p=Path('src/components/layout/Footer.tsx');s=p.read_text().replace('emblem-brass.png','emblem-brass-v2.webp').replace('EST. 2026 / KUALA LUMPUR, MALAYSIA','MALAYSIAN HERITAGE / MODERN MOVEMENT').replace('JIWA FIGHTER V1 PROTOTYPE','JIWA FIGHTER V2 PROTOTYPE').replace('DEMO ONLY — Email saved locally.', 'DEMO ONLY — No subscription was sent.').replace('placeholder="fighter@email.com"','aria-label="Newsletter email"\n                  placeholder="fighter@email.com"');p.write_text(s)
p=Path('src/app/layout.tsx');s=p.read_text().replace('emblem-brass.png','emblem-brass-v2.webp');p.write_text(s)
# Use stable product imagery in cart; accessible selected/expanded states.
for filename in ['src/app/products/keris-tuah/page.tsx','src/app/products/[slug]/ProductDetailClient.tsx']:
 p=Path(filename);s=p.read_text().replace('className="w-full bg-bone','className="page-product w-full bg-bone',1)
 s=s.replace('image: galleryImages[selectedImage].src',"image: '/assets/products/keris-tuah-main-v2.webp'").replace('image: galleryImages[selectedImage]?.src || product.images.main','image: product.images.main')
 s=s.replace('onClick={() => setSelectedImage(idx)}','onClick={() => setSelectedImage(idx)}\n                  aria-pressed={selectedImage === idx}').replace('onClick={() => setSelectedColor(c.name)}','onClick={() => setSelectedColor(c.name)}\n                    aria-pressed={selectedColor === c.name}').replace('title={c.name}', 'aria-label={`Select color ${c.name}`}\n                    title={c.name}')
 s=s.replace('onClick={() => setSelectedSize(s)}','onClick={() => setSelectedSize(s)}\n                    aria-pressed={selectedSize === s}').replace('onClick={() => setSelectedSize(sz)}','onClick={() => setSelectedSize(sz)}\n                    aria-pressed={selectedSize === sz}')
 s=s.replace('onClick={() => setIsShippingOpen(!isShippingOpen)}','aria-expanded={isShippingOpen}\n                  onClick={() => setIsShippingOpen(!isShippingOpen)}').replace('onClick={() => setIsCareOpen(!isCareOpen)}','aria-expanded={isCareOpen}\n                  onClick={() => setIsCareOpen(!isCareOpen)}')
 s=s.replace('In this V1 frontend build','In this frontend prototype')
 # Remove decorative fake zoom affordance; gallery selection itself remains functional.
 s=re.sub(r'<div className="absolute top-4 right-4 p-2 bg-bone/90.*?</div>','',s,flags=re.S)
 s=s.replace('fill\n                priority','key={selectedImage}\n                fill\n                priority').replace('className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"','className="gallery-selected object-contain p-6"')
 p.write_text(s)
p=Path('src/app/shop/page.tsx');s=p.read_text();s=s.replace("let list = [...PRODUCTS].sort((a, b) => ['prod-002', 'prod-003', 'prod-001'].indexOf(b.id) < 0 ? -1 : ['prod-002', 'prod-003', 'prod-001'].indexOf(a.id) < 0 ? 1 : ['prod-002', 'prod-003', 'prod-001'].indexOf(a.id) - ['prod-002', 'prod-003', 'prod-001'].indexOf(b.id));", "const featuredOrder = ['prod-002', 'prod-003', 'prod-001'];\n    const rank = (id: string) => { const index = featuredOrder.indexOf(id); return index < 0 ? featuredOrder.length : index; };\n    let list = [...PRODUCTS].sort((a, b) => rank(a.id) - rank(b.id));")
p.write_text(s)

