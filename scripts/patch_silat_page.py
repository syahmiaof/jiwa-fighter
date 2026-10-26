with open('src/app/collections/silat-series/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('\r\n', '\n')

old_h2 = """              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-obsidian tracking-tight leading-[0.9] uppercase">
                {t.collections.featuredTitle}
              </h2>"""

new_h2 = """              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-obsidian tracking-tight leading-[0.9] uppercase">
                <span className="block">SILAT</span>
                <span className="block">SERIES</span>
              </h2>"""

c = c.replace(old_h2, new_h2)

with open('src/app/collections/silat-series/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated silat series h2 title to 2 lines!')
