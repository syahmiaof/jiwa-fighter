with open('src/styles/refinements.css', 'r', encoding='utf-8') as f:
    css = f.read().replace('\r\n', '\n')

# Remove the harmful size table and support FAQ overrides
bad_blocks = '''/* Size table refinement */
.page-size table th, .page-size table td { border-color: #D9D4C7 !important; }
.page-size table th { background-color: #E8E3D7 !important; color: #0C0D0F !important; }
.page-size table tr:nth-child(even) td { background-color: #ECE7DB !important; }

/* Support FAQ refinement */
.page-support .support-block { border-color: #DDD8CB !important; background-color: #FAF7F0 !important; }
.page-support [data-state="open"] { border-color: #C6A260 !important; }
'''

if bad_blocks in css:
    css = css.replace(bad_blocks, '')
    print("Removed harmful size table and support FAQ overrides.")

# Fine-tune page-home hero copy
old_home = '''.page-home .campaign-copy { padding-top: 54px; padding-bottom: 24px; }
.page-home .hero-headline { font-size: clamp(100px, 9.5vw, 154px); line-height: .98; letter-spacing: -.045em; }
.page-home .hero-subtext { max-width: 310px; letter-spacing: .2em; margin-top: 24px; }
.page-home .hero-cta { margin-top: 36px; padding-top: 0; }'''

new_home = '''.page-home .campaign-copy { padding-top: 48px; padding-bottom: 24px; }
.page-home .hero-headline { font-size: clamp(100px, 9.5vw, 154px); line-height: .98; letter-spacing: -.045em; }
.page-home .hero-subtext { max-width: 310px; letter-spacing: .2em; margin-top: 18px; }
.page-home .hero-cta { margin-top: 22px; padding-top: 0; }'''

if old_home in css:
    css = css.replace(old_home, new_home)
    print("Tuned page-home hero spacing.")

with open('src/styles/refinements.css', 'w', encoding='utf-8', newline='\n') as f:
    f.write(css)

print("CSS cleaned up.")
