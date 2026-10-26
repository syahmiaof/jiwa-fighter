import os

css_path = 'src/styles/refinements.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read().replace('\r\n', '\n')

# 1. Ensure Silat copy width matches reference (53%)
old_silat_copy = '.page-silat .campaign-copy { width: 47%; }'
new_silat_copy = '.page-silat .campaign-copy { width: 53%; }'
if old_silat_copy in css:
    css = css.replace(old_silat_copy, new_silat_copy)
    print("refinements.css: updated .page-silat .campaign-copy width to 53%")

# 2. Add subtle shadow/border polish for table and cards on bone background
table_polish = '''/* Size table refinement */
.page-size table th, .page-size table td { border-color: #D9D4C7 !important; }
.page-size table th { background-color: #E8E3D7 !important; color: #0C0D0F !important; }
.page-size table tr:nth-child(even) td { background-color: #ECE7DB !important; }
'''

if '/* Size table refinement */' not in css:
    css += '\n' + table_polish
    print("refinements.css: added size table styling polish")

# 3. Polish support page accordion and card contrast
support_polish = '''/* Support FAQ refinement */
.page-support .support-block { border-color: #DDD8CB !important; background-color: #FAF7F0 !important; }
.page-support [data-state="open"] { border-color: #C6A260 !important; }
'''

if '/* Support FAQ refinement */' not in css:
    css += '\n' + support_polish
    print("refinements.css: added support FAQ styling polish")

# 4. Polish Our Story values pillar card contrast
story_polish = '''/* Story values refinement */
.page-story .value-pillar { background: linear-gradient(180deg, transparent 0%, rgba(198,162,96,0.03) 100%); }
'''

if '/* Story values refinement */' not in css:
    css += '\n' + story_polish
    print("refinements.css: added story values refinement")

with open(css_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(css)

print("All section refinement patches applied to refinements.css.")
