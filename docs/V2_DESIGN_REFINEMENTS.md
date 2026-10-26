# JIWA FIGHTER — V2 Design Refinements Report

**Date:** 2026-10-25  
**Creative Lead:** ASTRA (Principal Creative Frontend Engineer)  
**Art Direction:** Iron Heritage  
**Scope:** 9 Core Desktop Routes (`1536 x 1024`) + Global Layouts & UI Components  

---

## 1. Creative Direction & Philosophy: "Iron Heritage"

The V2 refinement pass transforms the JIWA FIGHTER storefront from a functional ecommerce prototype into an award-calibre, cinematic digital fashion experience. Guided by the principle of **Disciplined Force**, every layout decision reflects the intersection of Malaysian martial heritage (Silat, Keris, Songket) and contemporary high-performance combatwear.

### Core Visual Tenets:
- **Zero Generic Template Tropes:** Eliminates rounded pastel buttons, decorative neon glows, and centered marketplace card grids.
- **Authoritative Geometry:** Sharp rectangular containers, fine 1px brass borders, diagonal transition cuts, and strict modular grid alignments.
- **Editorial Proportions:** First viewport (`1536 x 1024`) introduces both the primary hero narrative AND a clear teaser preview of the secondary section (collection rails, product lineups, value pillars, or process steps).
- **Authentic Materiality:** Warm bone stone (`#F0ECE3`) surfaces alternate with volcanic obsidian matte black (`#0C0D0F`), punctuated by ceremonial antique brass (`#C6A260`) and deep combat oxblood (`#621F24`).

---

## 2. Route-by-Route Design Refinements

### Route 01: Homepage (`/`)
- **Headline Architecture:** Replaced arbitrary wrapping with deliberate two-line editorial composition:  
  `THE FIGHT` / `IS IN YOU.`
- **Hero Photography:** The hand-wrapping combat athlete spans the right ~60% of the hero edge-to-edge, bathed in dramatic warehouse raking light.
- **Viewport Hierarchy:** Hero height calibrated so `THE FIRST CHAPTER` collection rail (`01 APPAREL`, `02 TRAINING ESSENTIALS`, `03 TACTICAL ACCESSORIES`) is immediately visible within the initial 1024px viewport.
- **Navigation Polish:** Ultra-compact 60px obsidian header with crisp Bone White official `JF` monogram and wordmark.

### Route 02: Shop All (`/shop`)
- **Header & Watermark:** Replaced text-contaminated watermark with clean, transparent songket diamond chevron motif on bone stone.
- **Vertical Rhythm:** Compressed spacing between header and product grid; first product row aligns at y358.
- **Catalog Cards:** Standardized card aspect ratios with unified image baseline, Drop 001 badges, wishlist heart icons, color swatch dots, and clean pricing typography.
- **Filter Rail:** Left sidebar with sticky filter facets (Collection, Category, Size, Color) and real-time interactive count updates.

### Route 03: Silat Series (`/collections/silat-series`)
- **Action Framing:** Silat martial artist in low kuda-kuda stance cleanly cropped starting at x615 to eliminate any text artifacts from original mockups.
- **Palette Accents:** Subtle deep oxblood (`#621F24`) slash gradient behind the athlete communicates kinetic combat energy.
- **Lineup Preview:** `FEATURED IN THIS SERIES: SILAT SERIES` product rail (Training Jersey, Heritage Jersey, Sleeve Culture Detail) sits directly inside the primary viewport.

### Route 04: Product Detail (`/products/keris-tuah`)
- **Showcase Dominance:** Keris Tuah performance jersey commands the primary visual field on warm bone stone. Duplicate search zoom loupe icon cleanly inpainted.
- **Gallery Rail:** 4 high-contrast thumbnail perspectives (Front, Back with Keris blade, Filigree detail, Collar piping) with active brass outline.
- **Hierarchy:** Dominant condensed title `KERIS TUAH` over `HERITAGE PERFORMANCE JERSEY`.
- **Selectors & Action:** Interactive gold/obsidian color buttons with hover scale, responsive size selector (S to XXL), and dual CTA actions (`ADD TO BAG` and `SIMULATE PRE-ORDER`).

### Route 05: Lookbook (`/lookbook`)
- **Cinematic Split:** Left column features full-height warehouse portrait with dual macro insets (gold badge and hand wraps).
- **Editorial Typography:** Right bone panel features `A LEGACY` / `IN MOTION.` headline.
- **Campaign Rail:** Lower campaign chapters rail (`/ EXPLORE THE CAMPAIGN` with Fighter, Craft, and Land visuals) is visible within the initial 1024px viewport.

### Route 06: Our Story (`/our-story`)
- **Diagonal Cut:** Restored the diagonal edge transition connecting the bone manifesto panel to the warehouse athlete.
- **Manifesto Headline:** Dominant three-line composition:  
  `NOT BORN` / `TO STAND` / `STILL.`
- **Foundational Pillars:** The three brand pillars—`ROOTED` (*Warisan*), `RESILIENT` (*Kekuatan*), and `RELENTLESS` (*Ketahanan*)—are surfaced in the initial viewport.

### Route 07: Custom Teamwear (`/custom`)
- **Squad Portrait:** 4-athlete squad artwork cleanly framed on the left with semantic H1 for SEO and screen readers.
- **Bespoke Process Rail:** Lower three-step process rail (`01 BRIEF`, `02 DESIGN`, `03 PRODUCTION`) is anchored in the viewport.
- **Quotation Form:** Form controls on the right feature spacious inputs, dropdowns, and clear client-side validation.

### Route 08: Size & Fit Guide (`/size-guide`)
- **Hero & Anatomy:** Athlete dimension photo with chest/length measurement arrows sits beside the headline `BUILT TO` / `MOVE WITH YOU.`.
- **Technical Chart:** Interactive measurement table with click-to-highlight rows (S to XXL) and technical t-shirt line diagram.
- **Fit Toggle:** Interactive Athletic Fit vs Relaxed Fit mode selector.

### Route 09: Customer Care (`/support`)
- **Atmospheric Split:** Diagonal transition connects the bone FAQ panel with the gym warehouse athlete hero.
- **FAQ Navigation:** Categorized tabs (`ORDERS`, `SHIPPING`, `SIZING`, `TEAMWEAR`) with smooth accordion interactions.
- **Direct Inquiry:** Right-hand contact card with dedicated input fields and non-negotiable demo notice.

---

## 3. Official Logo & Brand Asset Integrity

- **Original Geometry:** The official angular `JF` monogram and `JIWA FIGHTER` wordmark were preserved with zero geometric alteration.
- **Multi-Ground Adaptability:** Rendered in high-contrast Bone White (`#F0ECE3`) for dark navigation and Antique Brass (`#C6A260`) for luxury stamps.
- **Favicon:** Generated directly from the authentic brass emblem asset.
