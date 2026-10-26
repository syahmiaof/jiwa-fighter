import os

# --- 1. PATCH LOOKBOOK ---
with open('src/app/lookbook/page.tsx', 'r', encoding='utf-8') as f:
    lookbook = f.read()

lookbook = lookbook.replace(
    "const campaignRef = useScrollReveal<HTMLDivElement>('.campaign-card', 0.1);",
    "const campaignRef = useScrollReveal<HTMLDivElement>('.section2-reveal, .campaign-card', 0.1);"
)
lookbook = lookbook.replace(
    "<span>{t.lookbook.editorialKicker}</span>",
    '<span className="hero-kicker">{t.lookbook.editorialKicker}</span>'
)
lookbook = lookbook.replace(
    '<div className="pt-4">\n              <Link\n                href="/collections/silat-series"',
    '<div className="hero-cta pt-4">\n              <Link\n                href="/collections/silat-series"'
).replace(
    '<div className="pt-4">\r\n              <Link\r\n                href="/collections/silat-series"',
    '<div className="hero-cta pt-4">\r\n              <Link\r\n                href="/collections/silat-series"'
)
lookbook = lookbook.replace(
    '<div className="hidden lg:flex justify-end text-[10px] font-mono tracking-widest text-text-muted-dark uppercase">\n            <span>JIWA FIGHTER / MALAYSIA 2026</span>\n          </div>',
    '<div className="hidden lg:flex absolute bottom-8 right-4 text-[10px] font-mono tracking-[0.25em] text-text-muted-dark uppercase origin-bottom-right rotate-90">\n            <span>JIWA FIGHTER / MALAYSIA 2026</span>\n          </div>'
).replace(
    '<div className="hidden lg:flex justify-end text-[10px] font-mono tracking-widest text-text-muted-dark uppercase">\r\n            <span>JIWA FIGHTER / MALAYSIA 2026</span>\r\n          </div>',
    '<div className="hidden lg:flex absolute bottom-8 right-4 text-[10px] font-mono tracking-[0.25em] text-text-muted-dark uppercase origin-bottom-right rotate-90">\r\n            <span>JIWA FIGHTER / MALAYSIA 2026</span>\r\n          </div>'
)
lookbook = lookbook.replace(
    '<h2 className="font-display text-3xl sm:text-4xl text-bone tracking-wide uppercase">',
    '<h2 className="section2-reveal font-display text-3xl sm:text-4xl text-bone tracking-wide uppercase">'
)
lookbook = lookbook.replace(
    '<p className="text-xs text-bone/70 font-sans max-w-sm leading-relaxed">',
    '<p className="section2-reveal text-xs text-bone/70 font-sans max-w-sm leading-relaxed">'
)

with open('src/app/lookbook/page.tsx', 'w', encoding='utf-8') as f:
    f.write(lookbook)
print('Lookbook patched.')

# --- 2. PATCH OUR STORY ---
with open('src/app/our-story/page.tsx', 'r', encoding='utf-8') as f:
    story = f.read()

# Add hero-image to athlete container
story = story.replace(
    '<div className="lg:col-span-6 relative min-h-[400px] lg:min-h-full bg-obsidian">',
    '<div className="hero-image lg:col-span-6 relative min-h-[400px] lg:min-h-full bg-obsidian overflow-hidden">'
)

# Diagonal edge divider enhancement with songket border
story = story.replace(
    '<div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[3px] bg-brass shadow-[0_0_8px_rgba(198,162,96,0.4)] z-20" />',
    '<div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[3px] bg-brass shadow-[0_0_8px_rgba(198,162,96,0.4)] z-20" />\n            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[24px] pointer-events-none opacity-20 bg-[radial-gradient(#C6A260_1px,transparent_1px)] [background-size:6px_6px] z-10" />'
).replace(
    '<div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[3px] bg-brass shadow-[0_0_8px_rgba(198,162,96,0.4)] z-20" />',
    '<div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[3px] bg-brass shadow-[0_0_8px_rgba(198,162,96,0.4)] z-20" />\r\n            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[24px] pointer-events-none opacity-20 bg-[radial-gradient(#C6A260_1px,transparent_1px)] [background-size:6px_6px] z-10" />'
)

with open('src/app/our-story/page.tsx', 'w', encoding='utf-8') as f:
    f.write(story)
print('Our Story patched.')

# --- 3. PATCH CUSTOM TEAMWEAR ---
with open('src/app/custom/page.tsx', 'r', encoding='utf-8') as f:
    custom = f.read()

# Add hero entrance to right quotation form
custom = custom.replace(
    '<div className="lg:col-span-5 bg-bone text-obsidian p-8 sm:p-12 lg:p-16 flex flex-col justify-center">',
    '<div className="hero-subtext lg:col-span-5 bg-bone text-obsidian p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">'
)

# Refactor bottom 3 steps to open columns with brass vertical dividers
old_steps = '''          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 01 */}
            <div className="step-card p-6 bg-obsidian-subtle border border-obsidian-border hover:border-brass/40 transition-colors flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl text-brass">01</span>
                  <MessageSquare className="w-6 h-6 text-brass/70" />
                </div>
                <h3 className="font-display text-xl uppercase tracking-wider text-bone">
                  {t.custom.step1Title}
                </h3>
                <p className="text-xs text-bone/70 font-sans leading-relaxed">
                  {t.custom.step1Desc}
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="step-card p-6 bg-obsidian-subtle border border-obsidian-border hover:border-brass/40 transition-colors flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl text-brass">02</span>
                  <Shirt className="w-6 h-6 text-brass/70" />
                </div>
                <h3 className="font-display text-xl uppercase tracking-wider text-bone">
                  {t.custom.step2Title}
                </h3>
                <p className="text-xs text-bone/70 font-sans leading-relaxed">
                  {t.custom.step2Desc}
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="step-card p-6 bg-obsidian-subtle border border-obsidian-border hover:border-brass/40 transition-colors flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl text-brass">03</span>
                  <Settings className="w-6 h-6 text-brass/70" />
                </div>
                <h3 className="font-display text-xl uppercase tracking-wider text-bone">
                  {t.custom.step3Title}
                </h3>
                <p className="text-xs text-bone/70 font-sans leading-relaxed">
                  {t.custom.step3Desc}
                </p>
              </div>
            </div>
          </div>'''

new_steps = '''          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-obsidian-border/80 border-t border-b border-obsidian-border/80 py-6">
            {/* Step 01 */}
            <div className="step-card md:px-8 py-6 space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-brass group-hover:text-brass-light transition-colors">01</span>
                <MessageSquare className="w-6 h-6 text-brass/70" />
              </div>
              <h3 className="font-display text-xl uppercase tracking-wider text-bone group-hover:text-brass transition-colors">
                {t.custom.step1Title}
              </h3>
              <p className="text-xs text-bone/70 font-sans leading-relaxed">
                {t.custom.step1Desc}
              </p>
            </div>

            {/* Step 02 */}
            <div className="step-card md:px-8 py-6 space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-brass group-hover:text-brass-light transition-colors">02</span>
                <Shirt className="w-6 h-6 text-brass/70" />
              </div>
              <h3 className="font-display text-xl uppercase tracking-wider text-bone group-hover:text-brass transition-colors">
                {t.custom.step2Title}
              </h3>
              <p className="text-xs text-bone/70 font-sans leading-relaxed">
                {t.custom.step2Desc}
              </p>
            </div>

            {/* Step 03 */}
            <div className="step-card md:px-8 py-6 space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-brass group-hover:text-brass-light transition-colors">03</span>
                <Settings className="w-6 h-6 text-brass/70" />
              </div>
              <h3 className="font-display text-xl uppercase tracking-wider text-bone group-hover:text-brass transition-colors">
                {t.custom.step3Title}
              </h3>
              <p className="text-xs text-bone/70 font-sans leading-relaxed">
                {t.custom.step3Desc}
              </p>
            </div>
          </div>'''

# Normalize line breaks for replacement
custom_norm = custom.replace('\r\n', '\n')
old_steps_norm = old_steps.replace('\r\n', '\n')
new_steps_norm = new_steps.replace('\r\n', '\n')

if old_steps_norm in custom_norm:
    custom_norm = custom_norm.replace(old_steps_norm, new_steps_norm)
    with open('src/app/custom/page.tsx', 'w', encoding='utf-8') as f:
        f.write(custom_norm)
    print('Custom Teamwear patched successfully.')
else:
    print('Warning: old_steps not found in Custom Teamwear, trying manual replacement.')
