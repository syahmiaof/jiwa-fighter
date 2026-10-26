# V3 Baseline Audit

**Capture:** 26 October 2026, 1536 × 1024, local Next.js server at `http://localhost:3000`.
**Evidence:** `tests/v3/baseline/01.png`–`09.png`, `tests/v3/baseline/runtime-errors.json`, and independent fresh captures in `tests/v3/current/`.

## Route and feature baseline

| Route | Baseline result | Main visual issue from direct comparison |
|---|---|---|
| `/` | HTTP 200; homepage hero and collection strip render | Shared header uses stacked logo; title sits lower and smaller than reference |
| `/shop` | HTTP 200; filters, sorting and product grid render | Headline wraps into two oversized lines; first product row is about 130 px lower |
| `/collections/silat-series` | HTTP 200; editorial hero and product lineup render | Shared logo differs; headline/card scale and crops need tuning |
| `/products/keris-tuah` | HTTP 200; gallery and purchase controls render | Major alignment is close: direct title offset is about 8 px and gallery begins about 4 px early |
| `/lookbook` | HTTP 200; campaign layout and story cards render | Textile watermark contained its own phrase while a live phrase was also present; source card image inspection found no embedded caption duplication |
| `/our-story` | HTTP 200; diagonal hero and values row render | Songket diagonal treatment and lower spacing differ |
| `/custom` | HTTP 200; quote form and team image render | Process row spacing and a visible image seam need review |
| `/size-guide` | HTTP 200; chart and measuring content render | Diagram is boxed/smaller; fit controls are below the reference viewport |
| `/support` | HTTP 200; FAQ and contact form render | Missing first-viewport benefit strip and woven/gold texture treatment |

The baseline browser run recorded an empty runtime-error list. All nine pages already have real route components, shared EN/BM state, product selectors, a mock cart, support FAQ and a demo teamwear form. These interactions should remain intact. The site is a frontend prototype: checkout and forms do not create real transactions or submit support requests.

## Shared visual and motion baseline

- `Header` and `Footer` used stacked logo variants. The current approved V3 horizontal asset is `references/JIWA FIGHTER Horizontal Logo Lockup.png`, a transparent 2020 × 779 source with visible bounds `(77,117)–(1911,678)`.
- Existing cart, search and demo checkout use native modal dialogs through `src/lib/motion/useDialog.ts`. Existing GSAP reveal behavior and reduced-motion support are preserved.
- There is no Git commit baseline in this checkout: the app and documentation are untracked. V3 verification therefore uses recorded baseline screenshots and direct source inspection, not a meaningful `git diff` against history.
- V2/V2.2 reports are historical context only; current V3 findings are recorded in `docs/V3_VISUAL_DEVIATION_MATRIX.md`.

## First repairs selected

1. Use the owner-approved horizontal lockup in the global header and footer, preserving the exact source alpha silhouette.
2. Fix the clearly oversized `/shop` heading and remove promotional copy that duplicates reference imagery.
3. Keep `/products/keris-tuah` geometry intact; the apparent 70 px offset from the independent audit was incorrect on direct screenshot comparison.
4. Replace the screenshot-derived copy-bearing textile watermark with a clean pattern crop on `/shop`, `/lookbook`, `/our-story` and `/size-guide`.
5. Build SATRIA as a local deterministic bilingual FAQ feature with an optional server-only LLM adapter.

No pixel-similarity percentage is assigned. Baseline screenshots describe only the initial viewport at 1536 × 1024; other viewports, scroll positions and interactive states require separate evidence.
