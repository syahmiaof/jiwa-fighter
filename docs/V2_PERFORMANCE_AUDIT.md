# V2 performance and asset audit

Measured 25 October 2026. Scope: existing V1 assets, loading strategy, and local Chromium measurements. This is a supplemental technical audit; the visual audit remains the visual fidelity authority.

## Evidence and limitations

- `scripts/extract_assets.py` establishes that all supplied campaign/product imagery was extracted from the nine approved UI mockups. No independent full-resolution campaign photographs or garment masters were found in the current public asset inventory.
- `tests/v2/asset-audit-contact.png` shows the inspected V1 derivatives. Several contain UI captions, heart icons, cropped text, or strips from neighbouring panels.
- `scripts/v2-performance.cjs` records nine routes in Chromium at 1536 × 1024. Each route uses a fresh browser context, no CPU/network throttle, and one sample. These are local diagnostics, not field Core Web Vitals or a mobile performance guarantee.
- Metrics cover the initial viewport after images/fonts settle; resource totals may include Next.js route prefetches. They do not measure every image loaded during a complete scroll.
- `tests/v2/performance-before.json` preserves the initial diagnostic sample, including runtime errors. The lead investigation later identified a stale `next start` process while `.next` was replaced by a build; treat this entire timing sample as potentially contaminated. The subsequent fresh visual baseline in `tests/v2/before/results.json`, captured after restarting the same workspace server, reports zero errors on all nine routes. Do not use the initial timings for before/after speed claims.

## V1 observations

| Area | Finding | Action |
| --- | --- | --- |
| Shared branding | Header and footer each load a 900 × 730 emblem PNG (176,500 and 176,564 bytes), displayed around 32–36px. | Export small transparent derivatives from the approved shapes; preserve source originals. Use a separately sized favicon. |
| Image serving | `next.config.mjs` sets `images.unoptimized: true`; fill images lack responsive `sizes`. | Prefer compact local derivatives with explicit sizes; if enabling the Next image optimizer, measure its deployment/runtime tradeoff first. |
| Hero assets | Homepage 986 × 645 (173,586 bytes); Silat 921 × 620 (153,506); teamwear 980 × 730 (198,338). | Use a landscape framing near native dimensions. Avoid portrait crops that enlarge and cut out subjects. |
| Product gallery | Keris main 740 × 840; back/detail/collar only 130 × 173/160. | Main can anchor the gallery. Keep small details modest in size, disclose source limitation, and do not label them high resolution. |
| Catalog | Three shop crops are only 375–380 × 475, and contain baked DROP 001/heart UI. | Recrop photo-only areas and render labels/buttons in HTML. |
| Collection previews | Sources 276–328 × 235 contain text and arrows. | Remove the contaminated lower strip; keep card aspect/size close to the useful image region. |
| Lookbook | Lower cards 300–306 × 142 contain baked captions. Insets contain strips of adjacent panels. | Extract uncontaminated image regions and rebuild captions in semantic HTML. |
| Teamwear | Group photo includes the complete campaign headline and subcopy. | Crop below the baked copy and reserve HTML heading space; raw original photography would be needed to recover hidden pixels. |
| Fonts | `next/font` provides Bebas Neue and Inter with `display: swap`; emitted WOFF2 files are local. | Preserve self-hosted font delivery. Typeface fidelity is a separate design issue. |

The older asset manifest calls the Keris image a high-resolution master and labels the audit complete. The actual file dimensions and mockup extraction provenance do not support treating it as a production garment master.

## Baseline local measurements

| Route | LCP (ms) | CLS | Resource transfer (KiB) | Long tasks | Runtime errors |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` | 148 | 0 | 743.0 | 0 | React #423 |
| `/shop` | 204 | 0 | 937.3 | 1 | None |
| `/collections/silat-series` | 128 | 0 | 717.4 | 0 | React #423 |
| `/products/keris-tuah` | 92 | 0 | 677.8 | 0 | None |
| `/lookbook` | 116 | 0 | 774.1 | 0 | None |
| `/our-story` | 112 | 0 | 692.3 | 0 | None |
| `/custom` | 148 | 0 | 704.4 | 1 | React #423 |
| `/size-guide` | 244 | 0.0006 | 625.6 | 1 | None |
| `/support` | 112 | 0 | 592.4 | 0 | None |

The longest recorded task was 107ms on Shop. This initial sample is potentially contaminated by the stale server described above; the three React errors are not classified as app regressions. Final after measurements must use a freshly restarted production build. No universal smooth-frame-rate claim is made.

## Reproduction

With the local server running:

```powershell
node scripts/v2-performance.cjs before
node scripts/v2-performance.cjs after
```

Use a different label for additional runs so that approved baseline evidence is not overwritten. Compare payload changes and errors separately from timing, since local load times vary and are not statistically sampled.

## Asset rescue completed

`python scripts/v2-assets.py` creates 34 new WebP derivatives and preserves every original. The source, exact crop, masking/compositing operation, dimensions and bytes of every output are recorded in `tests/v2/asset-manifest-v2.json`. The derivatives were opened and visually inspected; a contact sheet is saved at `tests/v2/asset-audit-after.png`.

- Collection and shop images exclude baked numbers, captions, badges and heart icons. Silat crops now include the full garment hem and exclude bottom captions. Hero homepage crop excludes both white headline punctuation and right pagination.
- Lookbook photo insets no longer include adjacent panel strips. The fighter/craft campaign cards use clean alternate crops from the same approved Lookbook reference. The landscape card crops to the text-free right side; this is only 176 × 139 pixels and remains a low-resolution source limitation.
- Keris detail (395 × 415) and collar (287 × 162) are fresh crops of the large main garment image, avoiding the old 128px-wide thumbnails. Back view remains only 128 × 174 and should be displayed conservatively. The main garment image uses a small adjacent-background patch to remove the baked magnifier icon; garment pixels are unchanged.
- The teamwear image retains every face. A transparent upper-left mask removes title/subcopy that overlaps the photograph; it must sit on an obsidian surface beneath real HTML copy. The hidden original background cannot be recovered from the supplied screenshot.
- The V1 emblem crop clipped the far-right tip of the monogram. The new 160 × 133 derivatives include the complete original shape and reduce white/brass emblem payload from 353,064 bytes combined to 9,176 bytes (97.4% smaller). This is an asset-file comparison, not a measured total-page saving.
- Wordmarks use the original source glyphs. The stacked variant preserves the original arrangement; the horizontal variant places the two original word crops alongside each other with proportional scaling. Neither redraws the lettering.

Page-level after measurements must be run after the parent wires these files and completes the final build. No after speed claim is made by the asset rescue alone.
