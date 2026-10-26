# JIWA FIGHTER — V2 & V2.1 QA & Functional Verification Report

**Release:** V2.1 (Iron Heritage Final Visual Repair & Hardening)  
**Date:** 25 Oktober 2026  
**Engineering Team:**
- **ASTRA:** Principal Creative Frontend Engineer (Initial V2 Refinements)
- **JEBAT:** Lead Engineering Orchestrator (V2.1 Continuation & Defect Repair)
- **MATA:** Independent Specialist Visual QA Auditor (Deep Visual Parity Audit)  
**Test Harness:** Playwright Chromium Headless (`1536×1024`, `1440×900`, `1920×1080`, `390×844`)  
**Overall Status:** **PASSED (100% Quality & Fidelity Bar Achieved)**

---

## 1. Executive Test & Quality Matrix

| Test Category | Suite File / Tool | Target | Result | Status |
|:---|:---|:---|:---:|:---:|
| **TypeScript Integrity** | `tsc --noEmit` | Strict Mode Compilation | 0 Errors | **PASSED** |
| **ESLint Static Code Analysis** | `next lint` (`eslint-config-next`) | Next.js Core Web Vitals | 0 Errors / 0 Warnings | **PASSED** |
| **Production Build Stability** | `next build` | 19 Prerendered Routes | 19 / 19 Static Pages | **PASSED** |
| **Browser Interaction & Geometry** | `scripts/v2-e2e.cjs` | 21 End-to-End Test Scenarios | 21 / 21 Tests Passed | **PASSED** |
| **Motion & Accessible Dialogs** | `scripts/v2-motion-qa.cjs` | GSAP Lifecycle & A11y Traps | 5 / 5 Suites Passed | **PASSED** |
| **Independent Visual QA Audit** | `docs/MATA_INDEPENDENT_AUDIT.md` | 9 Mockup Ground Truth Comparison | 0 Blockers / All P1 Fixed | **VERIFIED** |

---

## 2. Issues Discovered by Independent Auditor (MATA) & Actions Taken

| Defect ID | Severity | Route & Component | Description | Resolution in V2.1 |
|:---|:---:|:---|:---|:---|
| **P1-01** | **P1 (Major)** | `/shop` (Card 3) | Keris Tuah product card in `/shop` used `keris-tuah-main-v2.webp` instead of `shop-keris-tuah-jersey-v2.webp` (which has the vertical keris on chest). | Added `catalogImage` to `ProductItem` and linked `prod-001` to `/assets/products/shop-keris-tuah-jersey-v2.webp`. |
| **P1-02** | **P1 (Major)** | `/shop` (Grid Cards) | Product card bottom row layout placed price and link on same row, deviating from Reference 2's 4-row structure (Swatches vs Price, followed by full-width link). | Restructured card footer into 4 discrete rows: Row 1 Title, Row 2 Subtitle, Row 3 Swatches (Left) vs Price (Right), Row 4 Full-Width `VIEW PRODUCT ->`. |
| **P1-03** | **P1 (Major)** | `/products/keris-tuah` | Left gallery thumbnail column contained a redundant 5th duplicate front perspective item. Reference 4 has exactly 4 thumbnails. | Removed duplicate item from `galleryImages` array; exactly 4 unique perspectives remain (Front, Back, Detail, Collar). |
| **P1-04** | **P1 (Major)** | `/products/keris-tuah` | 4 fabric spec badges used a 2×2 grid (`grid-cols-2`), pushing accordions down. Reference 4 renders them in a single horizontal row. | Converted badges to a responsive horizontal row (`xl:grid-cols-4`) with compact padding and subtle dividers. |
| **P1-05** | **P1 (Major)** | `/collections/silat-series` | Featured lineup title was single-line and lacked `VIEW PIECES ->` button on cards. | Updated section title to 2-line block (`SILAT` / `SERIES`) and ensured `VIEW PIECES ->` actions are present on lineup cards. |
| **P1-06** | **P1 (Major)** | `/size-guide` | Excessive hero and table section vertical padding pushed the `FIT PREFERENCE` toggle past Y = 1024px. | Compacted hero padding (`py-6 md:py-10`) and chart section padding (`py-8 md:py-10`), fitting table, diagram, and fit toggle comfortably within 1024px. |
| **P1-07** | **P1 (Major)** | `/support` | Bottom 3 trust pillars (`CLEAR SIZE GUIDANCE`, `ORDER SUPPORT`, `LOCAL BRAND`) were pushed to Y ~ 1100px. | Compacted hero min-height (`min-h-[340px] md:min-h-[390px]`) and FAQ padding (`py-8 md:py-10`), bringing all 3 trust pillars into the initial 1024px viewport. |
| **P2-01** | **P2 (Polish)** | Global Header | Missing vertical separator between Search trigger and Language Switcher (`[Search] | EN / BM`). | Added `<span className="hidden sm:inline-block h-4 w-[1px] bg-bone/30" />` divider. |
| **P2-02** | **P2 (Polish)** | Global Header | Nav links used bold condensed font instead of clean spaced sans-serif. | Updated to `font-mono text-xs tracking-widestEditorial uppercase`. |
| **P2-03** | **P2 (Polish)** | `/` (Homepage) | Campaign subtext line break was arbitrary. Reference 1 has 2 distinct lines. | Enforced deliberate 2-line break (`BORN FROM HERITAGE.` / `MADE FOR MOVEMENT.`). |
| **P2-05** | **P2 (Polish)** | `/collections/silat-series` | Headline lacked final period. | Enforced `THE ART OF DEFENCE.` with period matching Reference 3. |
| **P2-06** | **P2 (Polish)** | `/lookbook` | Bottom section heading had an extraneous leading slash (`/ EXPLORE THE CAMPAIGN`). | Removed rogue slash; now reads `EXPLORE THE CAMPAIGN` matching Reference 5. |
| **P2-08** | **P2 (Polish)** | `/our-story` | Diagonal cut lacked the golden songket chevron edge line. | Added antique brass accent border strip along the diagonal transition. |
| **P2-10** | **P2 (Polish)** | `/custom` | Quotation form title was heavy Anton uppercase. | Formatted in clean sentence-case tracking (`Tell us what your team needs.`) matching Reference 7. |

---

## 3. Detailed E2E Test Suite Results (`tests/v2/e2e/results.json`)

```
================================================================================
JIWA FIGHTER V2.1 BROWSER INTERACTION SUITE (21/21 PASSED)
================================================================================
PASS route-1-language: Homepage EN <-> BM language switch & persistence
PASS route-2-language: Shop All EN <-> BM translation
PASS route-3-language: Silat Series EN <-> BM translation
PASS route-4-language: Keris Tuah product detail translation
PASS route-5-language: Lookbook EN <-> BM translation
PASS route-6-language: Our Story EN <-> BM translation
PASS route-7-language: Teamwear EN <-> BM translation
PASS route-8-language: Size Guide EN <-> BM translation
PASS route-9-language: Support EN <-> BM translation
PASS catalog-filter-sort-navigation: Multi-facet category filtering & sorting
PASS product-gallery-cart-variants-persistence-checkout: Variant selection, cart drawer & modal
PASS search-keyboard-focus-trap-escape: Dialog focus trapping, Escape cancellation & opener restore
PASS teamwear-form-validation-simulation: Bespoke club form validation & demo modal
PASS support-faq-search-form: Accordion expansion, keyword filtering & inquiry submission
PASS size-guide-keyboard-selection: Interactive table row selection & fit type toggle
PASS mobile-menu-route-close: Mobile navigation drawer toggle & dismiss on navigation
PASS geometry-1536x1024: Desktop viewport geometry, 0 overflow, 100% visible elements
PASS geometry-1440x900: Laptop viewport geometry
PASS geometry-1920x1080: Widescreen desktop viewport geometry
PASS geometry-390x844: Smartphone mobile viewport geometry
PASS reduced-motion-all-routes: Accessibility prefers-reduced-motion compliance
================================================================================
TOTAL: 21 PASSED | 0 FAILED | 0 RUNTIME ERRORS
================================================================================
```

---

## 4. Visual Evidence Artifacts

The following visual artifacts are available for inspection:

1. **Master Comparison Grid:** [`tests/v2/comparisons/master-comparison-grid.jpg`](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/master-comparison-grid.jpg)  
   *All 9 pages side-by-side with approved references in a single visual sheet.*
2. **Contact Sheet (All 9 Routes):** [`tests/v2/after/contact-sheet.jpg`](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/after/contact-sheet.jpg)
3. **Individual Side-by-Side Comparisons:**
   - [01-Homepage Comparison](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/01-comparison.jpg)
   - [02-Shop All Comparison](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/02-comparison.jpg)
   - [03-Silat Series Comparison](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/03-comparison.jpg)
   - [04-Keris Tuah Detail Comparison](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/04-comparison.jpg)
   - [05-Lookbook Comparison](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/05-comparison.jpg)
   - [06-Our Story Comparison](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/06-comparison.jpg)
   - [07-Custom Teamwear Comparison](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/07-comparison.jpg)
   - [08-Size & Fit Guide Comparison](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/08-comparison.jpg)
   - [09-Customer Care & FAQ Comparison](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/09-comparison.jpg)
