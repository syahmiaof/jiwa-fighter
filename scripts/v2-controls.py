from pathlib import Path
p=Path('src/app/page.tsx');s=p.read_text().replace('{collectionCards.map((card, idx) => (','{[...collectionCards.slice(activeSlide), ...collectionCards.slice(0, activeSlide)].map((card, idx) => (').replace('activeSlide === idx','idx === 0');p.write_text(s)
p=Path('src/app/collections/silat-series/page.tsx');s=p.read_text();s=s.replace("const [activeSlide, setActiveSlide] = useState(1); // 02 / 05", "const [activeSlide, setActiveSlide] = useState(0);\n  const selectPiece = (index: number) => {\n    setActiveSlide(index);\n    const card = lineupRef.current?.querySelectorAll<HTMLElement>('.lineup-card')[index];\n    card?.focus({ preventScroll: true });\n    card?.scrollIntoView({ behavior: 'auto', block: 'nearest' });\n  };")
s=s.replace('setActiveSlide((prev) => (prev > 0 ? prev - 1 : 4));','selectPiece((activeSlide + 2) % 3);').replace('setActiveSlide((prev) => (prev < 4 ? prev + 1 : 0));','selectPiece((activeSlide + 1) % 3);').replace('/ 05','/ 03').replace('(activeSlide + 1) / 5','(activeSlide + 1) / 3').replace('aria-label="Previous slide"','aria-label="Previous collection piece"').replace('aria-label="Next slide"','aria-label="Next collection piece"')
for i,pattern in enumerate(['className="lineup-card group','className="lineup-card group','className="lineup-card relative']):
 pos=s.find(pattern, s.find('2. FEATURED'))
 # The first matched group needs to be skipped when inserting second.
 if i==1:pos=s.find(pattern,pos+len(pattern))
 s=s[:pos]+f'tabIndex={{-1}} data-selected={{activeSlide === {i}}} '+s[pos:]
p.write_text(s)
