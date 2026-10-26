from pathlib import Path

def edit(path, pairs):
 p=Path(path);s=p.read_text(encoding='utf-8')
 for a,b in pairs:
  if a not in s: print('MISSING',path,a[:70])
  s=s.replace(a,b)
 p.write_text(s,encoding='utf-8')
edit('tailwind.config.ts', [('display: ["Bebas Neue", "Barlow Condensed", "Oswald", "Impact", "sans-serif"]','display: ["var(--font-display)", "Impact", "sans-serif"]'),('sans: ["Inter",','sans: ["var(--font-sans)",'),('brass: {','"text-muted-dark": "#5A5D64",\n        "text-muted-light": "#9B9FA8",\n        brass: {')])
edit('src/app/layout.tsx',[('Bebas_Neue','Anton'),('bebasNeue','displayFont'),("import '@/styles/globals.css';","import '@/styles/globals.css';\nimport '@/styles/refinements.css';"),('<main className="flex-1 w-full">','<a href="#main-content" className="skip-link">Skip to content</a>\n            <main id="main-content" tabIndex={-1} className="flex-1 w-full">')])
pages={'src/app/page.tsx':'home','src/app/shop/page.tsx':'shop','src/app/collections/silat-series/page.tsx':'silat','src/app/products/keris-tuah/page.tsx':'product','src/app/lookbook/page.tsx':'lookbook','src/app/our-story/page.tsx':'story','src/app/custom/page.tsx':'custom','src/app/size-guide/page.tsx':'size','src/app/support/page.tsx':'support'}
for path,name in pages.items():
 p=Path(path);s=p.read_text();s=s.replace('<div className="w-full',f'<div className="page-{name} w-full',1)
 if name in ['home','silat','lookbook','story','custom','size','support']:
  s=s.replace("import { useLanguage }", "import { CampaignLines } from '@/components/ui/CampaignLines';\nimport { useLanguage }")
  for v in ['t.home.heroHeadline','t.collections.heroHeadline','t.lookbook.headline','t.story.headline','t.custom.headline','t.sizeGuide.headline','t.support.headline']:
   s=s.replace('{'+v+'}', '<CampaignLines text={'+v+'} />')
 p.write_text(s)
edit('src/app/page.tsx',[('lg:col-span-7 space-y-6','campaign-copy lg:col-span-7 space-y-6'),('lg:col-span-5 relative flex','campaign-photo lg:col-span-5 relative flex'),('className="relative min-h-','className="campaign-hero relative min-h-'),('className="w-full bg-bone text-obsidian py-16','className="collection-rail w-full bg-bone text-obsidian py-16')])
edit('src/app/collections/silat-series/page.tsx',[('lg:col-span-6 space-y-6','campaign-copy lg:col-span-6 space-y-6'),('lg:col-span-6 relative flex','campaign-photo lg:col-span-6 relative flex'),('className="relative min-h-','className="campaign-hero relative min-h-'),('className="w-full bg-bone text-obsidian py-16','className="collection-rail w-full bg-bone text-obsidian py-16'),('href="/products/keris-tuah"','href="/shop?collection=Silat%20Series"')])
edit('src/app/our-story/page.tsx',[("useHeroReveal, useScrollReveal", "useHeroReveal, useScrollReveal, prefersReducedMotion"),("behavior: 'smooth'", "behavior: prefersReducedMotion() ? 'auto' : 'smooth'")])
edit('src/app/custom/page.tsx',[('justify-end p-8','justify-start p-8'),('<h1 className="sr-only"><CampaignLines text={t.custom.headline} /></h1>\n          <p className="sr-only">{t.custom.subtext}</p>','<div className="teamwear-copy relative z-10">\n            <p className="hero-kicker text-brass text-xs tracking-widest uppercase mb-5">JIWA FIGHTER / TEAM & CLUB ORDERS</p>\n            <h1 className="hero-headline font-display"><CampaignLines text={t.custom.headline} /></h1>\n            <p className="hero-subtext mt-4 text-xs tracking-widest uppercase max-w-sm">{t.custom.subtext}</p>\n          </div>')])
edit('src/app/lookbook/page.tsx',[('className={`campaign-card cursor-pointer','role="button"\n                    tabIndex={0}\n                    aria-pressed={activeStoryCard === idx}\n                    onKeyDown={(event) => { if (event.key === \'Enter\' || event.key === \' \') { event.preventDefault(); setActiveStoryCard(idx); } }}\n                    className={`campaign-card cursor-pointer')])
edit('src/app/size-guide/page.tsx',[('onClick={() => setSelectedRow(row.size)}','onClick={() => setSelectedRow(row.size)}\n                        onKeyDown={(event) => { if (event.key === \'Enter\' || event.key === \' \') { event.preventDefault(); setSelectedRow(row.size); } }}\n                        tabIndex={0}\n                        aria-selected={isSelected}'),("onClick={() => setFitPreference('athletic')}","onClick={() => setFitPreference('athletic')}\n                  aria-pressed={fitPreference === 'athletic'}"),("onClick={() => setFitPreference('relaxed')}","onClick={() => setFitPreference('relaxed')}\n                  aria-pressed={fitPreference === 'relaxed'}")])
edit('src/lib/i18n/LanguageContext.tsx', [('  const setLanguage =', "  useEffect(() => { document.documentElement.lang = language === 'bm' ? 'ms' : 'en'; }, [language]);\n\n  const setLanguage =")])
