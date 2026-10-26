with open('src/app/products/keris-tuah/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('\r\n', '\n')

# 1. Fix galleryImages array (exactly 4 items)
old_gallery = """  const galleryImages = [
    { src: '/assets/products/keris-tuah-main-v2.webp', alt: 'Keris Tuah Performance Jersey Master View' },
    { src: '/assets/products/keris-tuah-main-v2.webp', alt: 'Front Perspective' },
    { src: '/assets/products/keris-tuah-thumb-back-v2.webp', alt: 'Rear Perspective with Keris Tuah Dagger' },
    { src: '/assets/products/keris-tuah-detail-v2.webp', alt: 'Curve Filigree Detail' },
    { src: '/assets/products/keris-tuah-collar-v2.webp', alt: 'Collar & Piping Detail' },
  ];"""

new_gallery = """  const galleryImages = [
    { src: '/assets/products/keris-tuah-main-v2.webp', alt: 'Front Perspective with Songket Motif' },
    { src: '/assets/products/keris-tuah-thumb-back-v2.webp', alt: 'Rear Perspective with Keris Tuah Dagger' },
    { src: '/assets/products/keris-tuah-detail-v2.webp', alt: 'Curve Filigree Detail' },
    { src: '/assets/products/keris-tuah-collar-v2.webp', alt: 'Collar & Piping Detail' },
  ];"""

c = c.replace(old_gallery, new_gallery)

# 2. Fix Spec Badges to 4 columns horizontal on desktop
old_specs = """            {/* 4 Feature Specification Badges */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-bone-border">
              <div className="flex items-center gap-2 text-[11px] font-mono text-obsidian">
                <Layers className="w-4 h-4 text-brass shrink-0" />
                <span>{t.product.specs.fabric}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-obsidian">
                <Wind className="w-4 h-4 text-brass shrink-0" />
                <span>{t.product.specs.performance}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-obsidian">
                <ShieldCheck className="w-4 h-4 text-brass shrink-0" />
                <span>{t.product.specs.versatility}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-obsidian">
                <Sparkles className="w-4 h-4 text-brass shrink-0" />
                <span>{t.product.specs.origin}</span>
              </div>
            </div>"""

new_specs = """            {/* 4 Feature Specification Badges (1 Row / 4 Columns matching Reference 04) */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 pt-3 border-t border-bone-border text-[10px] xl:text-[11px] font-mono text-obsidian">
              <div className="flex items-center gap-1.5 p-1.5 bg-bone-card/50 border border-bone-border/40">
                <Layers className="w-3.5 h-3.5 text-brass shrink-0" />
                <span className="truncate">{t.product.specs.fabric}</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 bg-bone-card/50 border border-bone-border/40">
                <Wind className="w-3.5 h-3.5 text-brass shrink-0" />
                <span className="truncate">{t.product.specs.performance}</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 bg-bone-card/50 border border-bone-border/40">
                <ShieldCheck className="w-3.5 h-3.5 text-brass shrink-0" />
                <span className="truncate">{t.product.specs.versatility}</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 bg-bone-card/50 border border-bone-border/40">
                <Sparkles className="w-3.5 h-3.5 text-brass shrink-0" />
                <span className="truncate">{t.product.specs.origin}</span>
              </div>
            </div>"""

c = c.replace(old_specs, new_specs)

with open('src/app/products/keris-tuah/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated src/app/products/keris-tuah/page.tsx')
