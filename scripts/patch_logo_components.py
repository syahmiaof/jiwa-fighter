import os

# 1. Patch Header.tsx
with open('src/components/layout/Header.tsx', 'r', encoding='utf-8') as f:
    h = f.read()

# Replace header container padding
h = h.replace(
    'max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-18 flex items-center justify-between',
    'max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-[75px] h-16 flex items-center justify-between'
)

# Find and replace brand logo link
start_idx = h.find('{/* Left: Brand Logo */}')
if start_idx != -1:
    end_idx = h.find('</Link>', start_idx) + len('</Link>')
    new_header_logo = '''{/* Left: Official Master Brand Logo */}
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
    h = h[:start_idx] + new_header_logo + h[end_idx:]
    print("Patched Header.tsx successfully.")

with open('src/components/layout/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(h)

# 2. Patch Footer.tsx
with open('src/components/layout/Footer.tsx', 'r', encoding='utf-8') as f:
    ftr = f.read()

ftr = ftr.replace(
    'max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20',
    'max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-[75px] py-16 md:py-20'
)

start_idx = ftr.find('<Link href="/" className="flex items-center gap-3">')
if start_idx != -1:
    end_idx = ftr.find('</Link>', start_idx) + len('</Link>')
    new_footer_logo = '''<Link href="/" aria-label="JIWA FIGHTER home" className="flex items-center group">
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
    ftr = ftr[:start_idx] + new_footer_logo + ftr[end_idx:]
    print("Patched Footer.tsx successfully.")

with open('src/components/layout/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(ftr)
