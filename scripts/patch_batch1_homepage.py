import os

# 1. Update src/styles/refinements.css
css_path = 'src/styles/refinements.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read().replace('\r\n', '\n')

# Desktop page-gutter override
if '@media (min-width: 1024px) { :root { --page-gutter: 75px !important; } }' not in css:
    css = css.replace(
        ':root { --page-gutter: clamp(24px, 4.6875vw, 90px); }',
        ':root { --page-gutter: clamp(24px, 4.6875vw, 90px); }\n@media (min-width: 1024px) { :root { --page-gutter: 75px !important; } }'
    )

# Page-home hero adjustments
old_home_rules = '.page-home .hero-headline { font-size: clamp(100px, 9.5vw, 154px); line-height: .98; letter-spacing: -.045em; }\n.page-home .hero-subtext { max-width: 310px; letter-spacing: .2em; }'
new_home_rules = '''.page-home .campaign-copy { padding-top: 54px; padding-bottom: 24px; }
.page-home .hero-headline { font-size: clamp(100px, 9.5vw, 154px); line-height: .98; letter-spacing: -.045em; }
.page-home .hero-subtext { max-width: 310px; letter-spacing: .2em; margin-top: 24px; }
.page-home .hero-cta { margin-top: 36px; padding-top: 0; }'''

if old_home_rules in css:
    css = css.replace(old_home_rules, new_home_rules)
    print("refinements.css: updated page-home hero rules")

# Collection rail adjustments
old_rail_card = '.collection-card > div:first-child { aspect-ratio: 1.42; }'
new_rail_card = '.collection-card > div:first-child { aspect-ratio: 1.52; }'
if old_rail_card in css:
    css = css.replace(old_rail_card, new_rail_card)
    print("refinements.css: updated collection-card aspect ratio")

with open(css_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(css)

# 2. Update src/app/page.tsx
page_path = 'src/app/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    page = f.read().replace('\r\n', '\n')

old_rail_grid = '<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">'
new_rail_grid = '<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">'
if old_rail_grid in page:
    page = page.replace(old_rail_grid, new_rail_grid)
    print("page.tsx: updated collection-rail grid to items-start")

with open(page_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(page)

print("Batch 1 homepage patches applied.")
