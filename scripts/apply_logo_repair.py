import os

# 1. Update Header.tsx
header_path = 'src/components/layout/Header.tsx'
with open(header_path, 'r', encoding='utf-8') as f:
    h = f.read().replace('\r\n', '\n')

old_header_target = '''          {/* Left: Official Master Brand Logo */}
          <Link href="/" aria-label="JIWA FIGHTER home" className="flex items-center group">
            <div className="relative w-[160px] sm:w-[190px] lg:w-[224px] h-[26px] sm:h-[31px] lg:h-[37px] shrink-0">
              <Image
                src="/assets/brand/logo-lockup-white.webp"
                alt="JIWA FIGHTER"
                width={224}
                height={37}
                priority
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </Link>'''

new_header_logo = '''          {/* Left: Brand Logo */}
          <Link href="/" aria-label="JIWA FIGHTER home" className="flex items-center gap-[7px] group">
            <div className="brand-emblem relative w-[38px] h-[37px] shrink-0">
              <Image
                src="/assets/brand/emblem-white-v2.webp"
                alt=""
                width={38}
                height={37}
                priority
                className="w-[38px] h-[37px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="brand-wordmark relative w-[179px] h-[17px] shrink-0 flex items-center">
              <Image
                src="/assets/brand/wordmark-white-v2.webp"
                alt="JIWA FIGHTER"
                width={179}
                height={17}
                priority
                className="w-[179px] h-[17px] object-contain"
              />
            </div>
          </Link>'''

if old_header_target in h:
    h = h.replace(old_header_target, new_header_logo)
    print("Header.tsx: replaced old_header_target with new_header_logo")
else:
    print("Header.tsx: old_header_target not found!")

with open(header_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(h)

# 2. Update Footer.tsx
footer_path = 'src/components/layout/Footer.tsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    ftr = f.read().replace('\r\n', '\n')

old_footer_target = '''            <Link href="/" aria-label="JIWA FIGHTER home" className="flex items-center group">
              <div className="relative w-[180px] sm:w-[224px] h-[30px] sm:h-[37px] shrink-0">
                <Image
                  src="/assets/brand/logo-lockup-brass.webp"
                  alt="JIWA FIGHTER"
                  width={224}
                  height={37}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </Link>'''

new_footer_logo = '''            <Link href="/" aria-label="JIWA FIGHTER home" className="flex items-center gap-[8px] group">
              <div className="relative w-[38px] h-[37px] shrink-0">
                <Image
                  src="/assets/brand/emblem-brass-v2.webp"
                  alt=""
                  width={38}
                  height={37}
                  className="w-[38px] h-[37px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="relative w-[179px] h-[17px] shrink-0 flex items-center">
                <Image
                  src="/assets/brand/wordmark-brass-v2.webp"
                  alt="JIWA FIGHTER"
                  width={179}
                  height={17}
                  className="w-[179px] h-[17px] object-contain"
                />
              </div>
            </Link>'''

if old_footer_target in ftr:
    ftr = ftr.replace(old_footer_target, new_footer_logo)
    print("Footer.tsx: replaced old_footer_target with new_footer_logo")
else:
    print("Footer.tsx: old_footer_target not found!")

with open(footer_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(ftr)

# 3. Update refinements.css
css_path = 'src/styles/refinements.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read().replace('\r\n', '\n')

# Line 12 adjustments: remove padding-inline override that forced 72px instead of 75px
old_line12 = 'header > div:first-child { height: 60px; max-width: 1920px; padding-inline: var(--page-gutter); }'
new_line12 = 'header > div:first-child { height: 64px; }\n@media (min-width: 1024px) { header > div:first-child { padding-inline: 75px !important; } }'

if old_line12 in css:
    css = css.replace(old_line12, new_line12)
    print("refinements.css: updated line 12 header container styling")

# Mobile adjustments under @media (max-width: 639px)
mobile_marker = 'header > div:first-child > div:last-child { gap: 10px; }'
mobile_additions = '''header > div:first-child > div:last-child { gap: 10px; }
  .brand-emblem { width: 30px !important; height: 29px !important; }
  .brand-emblem img { width: 100% !important; height: 100% !important; }
  .brand-wordmark { width: 140px !important; height: auto !important; }
  .brand-wordmark img { width: 100% !important; height: auto !important; }'''

if mobile_marker in css and '.brand-emblem { width: 30px !important' not in css:
    css = css.replace(mobile_marker, mobile_additions)
    print("refinements.css: added mobile brand-emblem and brand-wordmark rules")

with open(css_path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(css)

print("All repair patches written successfully.")
