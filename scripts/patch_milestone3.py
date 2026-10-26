import os

# --- 1. PATCH NEXT.CONFIG.MJS ---
with open('next.config.mjs', 'r', encoding='utf-8') as f:
    next_cfg = f.read()

redirects_patch = '''      {
        source: '/silat-series',
        destination: '/collections/silat-series',
        permanent: true,
      },
      {
        source: '/customer-care',
        destination: '/support',
        permanent: true,
      },
      {
        source: '/care',
        destination: '/support',
        permanent: true,
      },'''

if "source: '/customer-care'" not in next_cfg:
    next_cfg = next_cfg.replace(
        '''      {
        source: '/silat-series',
        destination: '/collections/silat-series',
        permanent: true,
      },''',
        redirects_patch
    )
    with open('next.config.mjs', 'w', encoding='utf-8') as f:
        f.write(next_cfg)
    print('next.config.mjs patched.')

# --- 2. PATCH SIZE GUIDE ---
with open('src/app/size-guide/page.tsx', 'r', encoding='utf-8') as f:
    size_guide = f.read()

# Add column divider between table and guide
size_guide = size_guide.replace(
    '<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">',
    '<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start lg:divide-x divide-bone-border/70">'
)
# Add pr-6/pr-10 to left column for clean division
size_guide = size_guide.replace(
    '<div className="guide-panel lg:col-span-6 space-y-6">',
    '<div className="guide-panel lg:col-span-6 space-y-6 lg:pr-8">'
)

with open('src/app/size-guide/page.tsx', 'w', encoding='utf-8') as f:
    f.write(size_guide)
print('size-guide patched.')

# --- 3. PATCH SUPPORT / CUSTOMER CARE ---
with open('src/app/support/page.tsx', 'r', encoding='utf-8') as f:
    support = f.read()

# Realign category pills inline to right of FAQ headline on desktop
old_faq_header = '''          {/* Left: FAQ List (7 cols) */}
          <div className="support-block lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-widestEditorial uppercase text-brass font-bold">
                  {t.support.faqKicker}
                </span>
                <div className="h-[1px] w-12 bg-brass" />
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-obsidian uppercase">
                {t.support.faqTitle}
              </h2>
            </div>

            <p className="text-xs text-text-muted-dark">{language === 'bm' ? 'Panduan demo sahaja. Polisi penghantaran dan pemulangan belum disahkan.' : 'Demo guidance only. Shipping and returns policies are not confirmed.'}</p>
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenFaq(null);
                  }}
                  className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all ${
                    activeCategory === cat.id
                      ? 'bg-brass text-obsidian font-bold shadow'
                      : 'bg-bone-card border border-bone-border hover:border-obsidian text-obsidian'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>'''

new_faq_header = '''          {/* Left: FAQ List (7 cols) */}
          <div className="support-block lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-bone-border">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono tracking-widestEditorial uppercase text-brass font-bold">
                    {t.support.faqKicker}
                  </span>
                  <div className="h-[1px] w-12 bg-brass" />
                </div>
                <h2 className="font-display text-4xl sm:text-5xl text-obsidian uppercase">
                  {t.support.faqTitle}
                </h2>
              </div>
              {/* Category Pills (Aligned Inline on Desktop) */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenFaq(null);
                    }}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all ${
                      activeCategory === cat.id
                        ? 'bg-brass text-obsidian font-bold shadow'
                        : 'bg-bone-card border border-bone-border hover:border-obsidian text-obsidian'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-text-muted-dark">{language === 'bm' ? 'Panduan demo sahaja. Polisi penghantaran dan pemulangan belum disahkan.' : 'Demo guidance only. Shipping and returns policies are not confirmed.'}</p>'''

# Normalize linebreaks
support_norm = support.replace('\r\n', '\n')
old_faq_norm = old_faq_header.replace('\r\n', '\n')
new_faq_norm = new_faq_header.replace('\r\n', '\n')

if old_faq_norm in support_norm:
    support_norm = support_norm.replace(old_faq_norm, new_faq_norm)
    with open('src/app/support/page.tsx', 'w', encoding='utf-8') as f:
        f.write(support_norm)
    print('support page FAQ header patched.')
else:
    print('Warning: old_faq_header not matched in support page')

# Add scroll reveal to bottom 3 pillars in support
with open('src/app/support/page.tsx', 'r', encoding='utf-8') as f:
    supp = f.read()

supp = supp.replace(
    'const middleRef = useScrollReveal<HTMLDivElement>(\'.support-block\', 0.1);',
    'const middleRef = useScrollReveal<HTMLDivElement>(\'.support-block, .support-pillar\', 0.08);'
)
supp = supp.replace(
    '<div className="flex items-start gap-4">',
    '<div className="support-pillar flex items-start gap-4 group">'
)
with open('src/app/support/page.tsx', 'w', encoding='utf-8') as f:
    f.write(supp)
print('support page pillars patched.')

# --- 4. PATCH KERIS TUAH & PRODUCT DETAILS ---
for ppath in ['src/app/products/keris-tuah/page.tsx', 'src/app/products/[slug]/ProductDetailClient.tsx']:
    if not os.path.exists(ppath):
        continue
    with open(ppath, 'r', encoding='utf-8') as f:
        prod = f.read()
    
    # Import Truck if not present
    if 'Truck,' not in prod:
        prod = prod.replace('ArrowRight,', 'ArrowRight,\n  Truck,')
    
    # Add hero reveal motion classes
    prod = prod.replace(
        '<span className="text-xs font-mono tracking-widestEditorial uppercase text-brass font-bold">\n                  {t.product.dropKicker}',
        '<span className="hero-kicker text-xs font-mono tracking-widestEditorial uppercase text-brass font-bold">\n                  {t.product.dropKicker}'
    ).replace(
        '<span className="text-xs font-mono tracking-widestEditorial uppercase text-brass font-bold">\r\n                  {t.product.dropKicker}',
        '<span className="hero-kicker text-xs font-mono tracking-widestEditorial uppercase text-brass font-bold">\r\n                  {t.product.dropKicker}'
    )
    
    prod = prod.replace(
        '<h1 className="font-display text-5xl sm:text-6xl xl:text-7xl text-obsidian tracking-tighterEditorial leading-[0.9] uppercase">',
        '<h1 className="hero-headline font-display text-5xl sm:text-6xl xl:text-7xl text-obsidian tracking-tighterEditorial leading-[0.9] uppercase">'
    )
    
    prod = prod.replace(
        '<p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-text-muted-dark">',
        '<p className="hero-subtext text-xs sm:text-sm font-mono tracking-widest uppercase text-text-muted-dark">'
    )
    
    # Replace truncate on badges with break-words leading-tight
    prod = prod.replace('<span className="truncate">', '<span className="leading-tight break-words">')
    
    # Add Truck icon to shipping accordion header
    prod = prod.replace(
        '<span>{t.product.shippingTitle}</span>',
        '<span className="flex items-center gap-2"><Truck className="w-3.5 h-3.5 text-brass" />{t.product.shippingTitle}</span>'
    )
    
    with open(ppath, 'w', encoding='utf-8') as f:
        f.write(prod)
    print(f'{ppath} patched successfully.')
