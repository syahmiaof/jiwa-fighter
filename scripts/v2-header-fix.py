from pathlib import Path
p=Path('src/components/layout/Header.tsx');s=p.read_text();s=s.replace('fill\nsizes="(max-width: 768px) 100vw, 60vw"','fill');p.write_text(s)
