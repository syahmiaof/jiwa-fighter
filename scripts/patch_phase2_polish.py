# 1. Patch Header.tsx
with open('src/components/layout/Header.tsx', 'r', encoding='utf-8') as f:
    h = f.read().replace('\r\n', '\n')

# Update emblem & wordmark dimensions
h = h.replace(
    'div className="brand-emblem relative w-8 h-8 shrink-0"',
    'div className="brand-emblem relative w-9 h-9 shrink-0"'
)

# Update nav link font & tracking
h = h.replace(
    'text-xs xl:text-sm font-medium tracking-widest uppercase transition-all',
    'text-xs font-mono tracking-widestEditorial uppercase transition-all'
)

# Add divider between Search and Language Switcher
search_and_lang = """            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-bone/80 hover:text-brass transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Language Switcher (EN / BM) */}"""

search_and_lang_divider = """            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-bone/80 hover:text-brass transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Vertical divider matching reference */}
            <span className="hidden sm:inline-block h-4 w-[1px] bg-bone/30" aria-hidden="true" />

            {/* Language Switcher (EN / BM) */}"""

h = h.replace(search_and_lang, search_and_lang_divider)

with open('src/components/layout/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(h)
print("Updated Header.tsx")


# 2. Patch Homepage subtext in page.tsx
with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    home = f.read().replace('\r\n', '\n')

old_home_subtext = """            {/* Subtext */}
            <p className="hero-subtext text-xs sm:text-sm md:text-base font-mono tracking-widest uppercase text-bone/80 max-w-lg">
              {t.home.heroSubtext}
            </p>"""

new_home_subtext = """            {/* Subtext (Deliberate 2-line break matching Reference 01) */}
            <p className="hero-subtext text-xs sm:text-sm md:text-base font-mono tracking-widest uppercase text-bone/80 max-w-md leading-relaxed">
              <span className="block">BORN FROM HERITAGE.</span>
              <span className="block">MADE FOR MOVEMENT.</span>
            </p>"""

home = home.replace(old_home_subtext, new_home_subtext)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(home)
print("Updated page.tsx")


# 3. Patch dictionary.ts
with open('src/lib/i18n/dictionary.ts', 'r', encoding='utf-8') as f:
    d = f.read().replace('\r\n', '\n')

# Remove rogue slash in exploreCampaign
d = d.replace("exploreCampaign: '/ EXPLORE THE CAMPAIGN',", "exploreCampaign: 'EXPLORE THE CAMPAIGN',")
d = d.replace("exploreCampaign: '/ TEROKAI KEMPEN',", "exploreCampaign: 'TEROKAI KEMPEN',")

# Sentence case for formTitle in custom teamwear
d = d.replace("formTitle: 'TELL US WHAT YOUR TEAM NEEDS.',", "formTitle: 'Tell us what your team needs.',")
d = d.replace("formTitle: 'NYATAKAN KEPERLUAN PASUKAN ANDA.',", "formTitle: 'Nyatakan keperluan pasukan anda.',")

with open('src/lib/i18n/dictionary.ts', 'w', encoding='utf-8') as f:
    f.write(d)
print("Updated dictionary.ts")


# 4. Patch our-story/page.tsx (gold songket accent line + slash divider)
with open('src/app/our-story/page.tsx', 'r', encoding='utf-8') as f:
    story = f.read().replace('\r\n', '\n')

# Add golden accent along diagonal cut
old_story_left = '<div className="lg:col-span-6 bg-bone text-obsidian p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">'
new_story_left = '<div className="lg:col-span-6 bg-bone text-obsidian p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">\n            {/* Gold chevron accent along diagonal edge */}\n            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[3px] bg-brass shadow-[0_0_8px_rgba(198,162,96,0.4)] z-20" />'

story = story.replace(old_story_left, new_story_left)

# Value pillars divider with diagonal slash accent
story = story.replace(
    'border-l-2 md:border-l-0 md:border-r border-obsidian-border pl-4 md:pl-0',
    'border-l-2 md:border-l-0 md:border-r border-obsidian-border/80 pl-4 md:pl-0 relative'
)

with open('src/app/our-story/page.tsx', 'w', encoding='utf-8') as f:
    f.write(story)
print("Updated our-story/page.tsx")


# 5. Patch custom/page.tsx formTitle style
with open('src/app/custom/page.tsx', 'r', encoding='utf-8') as f:
    custom = f.read().replace('\r\n', '\n')

custom = custom.replace(
    '<h2 className="font-display text-3xl sm:text-4xl text-obsidian tracking-tight leading-none uppercase">',
    '<h2 className="font-sans font-bold text-2xl sm:text-3xl text-obsidian tracking-tight leading-snug">'
)

with open('src/app/custom/page.tsx', 'w', encoding='utf-8') as f:
    f.write(custom)
print("Updated custom/page.tsx")
