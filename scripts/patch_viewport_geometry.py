# Patch size-guide page.tsx
with open('src/app/size-guide/page.tsx', 'r', encoding='utf-8') as f:
    sg = f.read()

sg = sg.replace('\r\n', '\n')
sg = sg.replace('py-12 md:py-18', 'py-6 md:py-10')
sg = sg.replace('py-14 md:py-20', 'py-8 md:py-10')

with open('src/app/size-guide/page.tsx', 'w', encoding='utf-8') as f:
    f.write(sg)

print('Updated size-guide padding')

# Patch support page.tsx
with open('src/app/support/page.tsx', 'r', encoding='utf-8') as f:
    sp = f.read()

sp = sp.replace('\r\n', '\n')
sp = sp.replace('min-h-[420px] md:min-h-[480px]', 'min-h-[340px] md:min-h-[390px]')
sp = sp.replace('p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-5', 'p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-4')
sp = sp.replace('py-14 md:py-20', 'py-8 md:py-10')
sp = sp.replace('section className="border-t border-bone-border py-12 bg-bone"', 'section className="border-t border-bone-border py-8 bg-bone"')

with open('src/app/support/page.tsx', 'w', encoding='utf-8') as f:
    f.write(sp)

print('Updated support padding')
