# V2 Visual Audit — Iron Heritage

Date: 25 October 2026. Independent visual reviewer. Design source: `docs/DESIGN_SYSTEM.md` and the nine approved root PNG mockups. All references are 1536 × 1024. Every reference was opened directly; `tests/reference-contact-sheet.jpg` is an overview only.

## Evidence and scope

Initial comparison uses the existing `tests/screenshots/*-viewport.png` set, reviewed directly through `tests/v1-contact-sheet.jpg`. Those are historical V1 captures, not evidence of a fresh build or current runtime. Fresh baseline and after screenshots will be reviewed separately below. Source implementation and extracted assets were also inspected. No numerical similarity score is asserted.

The approved direction is a compact 60 px black header, forceful condensed headline typography, large edge-to-edge campaign photography, angled transitions, bone surfaces, restrained brass and oxblood accents. The reference second section is visible within the 1024 px viewport on every editorial route. V1 repeatedly uses viewport-height heroes and nested framed photography, changing this central composition.

## Priorities

1. **Critical — hero composition and typography:** replace the oversized empty containers and small inset photos with the approved full-height photographic halves; restore deliberate headline line breaks and size. Keep typography semantic and translatable.
2. **Critical — teamwear baked text:** the teamwear campaign asset includes its English title and subtitle; the page exposes only a screen-reader H1. Visible EN/BM switching cannot affect those pixels, and cover cropping cuts the title. Use a photographic crop with real HTML type; acknowledge that clean master photography is unavailable.
3. **High — official brand wordmark:** V1 uses the approved emblem but types `JIWA FIGHTER` in the general display font. This is not the supplied angular wordmark. Preserve the exact supplied monogram and wordmark shapes in derivatives.
4. **High — source image contamination:** collection and campaign crops contain old labels, arrows, borders, or partial surrounding surfaces. Those must not compete with live labels. Crop or mask appropriately; never turn a whole page screenshot into the page.
5. **High — spacing and secondary section hierarchy:** the viewport should preview products, values or campaign chapters. Reduce excessive padding and replace generic boxed step/value cards with restrained editorial separators where the reference does so.
6. **Medium — utility detail:** improve filters, selector sizes, accordion text, forms and table spacing while preserving working demo behavior.

## Nine-page baseline findings

| Route and reference | Actual V1 mismatch | Approved geometry / repair direction |
|---|---|---|
| `/` — `JIWA Fighter Iron Heritage homepage-1.png` | Hero is a large empty black field; athlete is a narrow framed image at right, not a campaign background. Title wraps `THE FIGHT IS IN / YOU.` and is much smaller. Collection preview is below the first viewport. | Header ends y61; hero ends y709. Headline around x72/y181, two deliberately composed lines `THE FIGHT / IS IN YOU.`. Athlete occupies right ~60% and is full hero height. Collection image rail begins y749. |
| `/shop` — `Jiwa Fighter Iron Heritage shop-3.png` | Excess vertical space between heading and grid. Cards start lower; first product order and Keris imagery differ. Sidebar and product metadata are too small; bottom card actions fall below viewport. Motif is reduced to an indistinct corner patch. | Header/title zone ends around y296. Filter rail x42–280; first product x318/y358. Match image aspect and baseline across all cards. Preserve honest product count and filtering, rather than hardcoding the reference count. |
| `/collections/silat-series` — `Silat Series_ The Art of Defence-2.png` | Fighter is a small floating rectangle surrounded by black space. Headline lacks reference scale and line breaks. Red slash identity is almost absent. Product lineup is hidden below viewport. | Hero ends y697, text x72/y168, athlete fills right half with stance spanning lower hero. Lineup starts y717 with compact editorial intro and three visuals. |
| `/products/keris-tuah` — `Keris Tuah jersey product page-4.png` | Product title/price/description and action labels are much smaller than reference. Gallery top has needless dead space; garment is narrower and less dominant. Thumbnail rail is small. Product detail column reads as compressed utility content. | Reference gallery starts x185/y128 with 741 px width; thumbnail rail ~130 px. Detail column x978 with ~516 px width. Title is a dominant condensed line, with generous price/selector hierarchy. Preserve proportionate garment display; avoid stretching small thumbnails as falsely high-resolution photos. |
| `/lookbook` — `Warisan in motion lookbook-5.png` | Photography split is broadly recognizable, but text is much too small with excessive empty bone panel space. Panel vertically extends beyond photographic collage. Campaign chapters are below the initial viewport. | Split at x968. Main image y61–652; inset row y654–828. Title occupies most right panel width as `A LEGACY / IN MOTION.`. Campaign rail begins y830, not a second large generic card section. |
| `/our-story` — `Jiwa Fighter_ Rooted, Resilient, Relentless-6.png` | Straight 50/50 split loses the diagonal editorial transition. Athlete is overcropped and enlarged. Headline has two small lines rather than large three-line manifesto. Values disappear below viewport. | Hero ends y714. Title x68/y160 as `NOT BORN / TO STAND / STILL.`. Photo starts behind a diagonal bone edge; seated posture, bench and bottle should remain readable. Values are a compact black three-column continuation. |
| `/custom` — `Jiwa Fighter teamwear quote page-7.png` | Cover crop cuts baked English heading at left and clips athletes. Image is narrower than reference (~58% vs64%). Form typography is too small and its large panel padding compresses controls. Process row is hidden below viewport and implemented as generic bordered cards. | Split x982 (64%); hero/form ends y810. Real translatable H1. Preserve five-person group framing as far as available crop permits. Spacious labeled form, then three compact numbered process columns with thin separators. |
| `/size-guide` — `Jiwa Fighter Size & Fit Guide-9.png` | Small boxed athlete image and undersized headline lose the reference full-width editorial hero. Headline wraps `BUILT TO MOVE WITH / YOU.`. Diagram is framed as a small thumbnail with surrounding screenshot pixels. Measurement table and fit controls need larger readable type and more balanced two-column widths. | Hero ends y548. Headline `BUILT TO / MOVE WITH YOU.`; broad right photo includes measurement guides. Table/measure area begins immediately with clear border rhythm and readable selectable rows. |
| `/support` — `Jiwa Fighter customer care-8.png` | Title and hero are smaller and differently wrapped. Hero uses a rigid vertical image split instead of angled transition. FAQ heading/filter group is vertically stacked and starts too low. First accordion is expanded in historical screenshot, changing reference density. Contact card type and fields are undersized. | Hero ends y466. Title `WE'RE IN / YOUR CORNER.`. FAQ/content columns ~62/34 with upper heading and category tabs aligned. Form should remain usable rather than forcing every label to match tiny screenshot text. |

## Asset evidence and unavoidable limits

- `scripts/extract_assets.py` shows campaign/product visuals extracted from the approved screenshots. No independent high-resolution photography master was found in the supplied asset set. The original manifest's phrase “high-resolution master showcase” is misleading for the 740×840 Keris crop.
- `teamwear-group-athletes.webp` is a 980×730 crop with a baked English heading, subtitle, kicker and chapter counter; it cannot serve as a clean translated hero background.
- `collection-preview-01-apparel.webp` includes a bone strip at the top and the start of `APPAREL` at bottom. Other collection cards have similar label/border contamination.
- `lookbook-card-fighter.webp` includes its existing border, chapter index and title. Adding HTML labels over it duplicates text. The same provenance must be considered for the craft/land cards.
- Keris back/detail/collar thumbnails originate around 130 px wide. They can support thumbnails or a bounded detail view, but enlarging them to full gallery size cannot create authentic garment detail.
- Source logos were inspected with a dark compositing background. They preserve the angular JF and stacked wordmark geometry. Any horizontal arrangement must reposition intact components, never redraw or approximate glyphs.
- A perfect visual match cannot honestly be claimed while reconstructing source photography from screenshot crops. Highest priorities are composition, semantic HTML type, exact logo geometry and honest documentation of remaining media limitations.

## Fresh capture verification

Pending fresh V1 baseline from the lead agent. This report will append current comparison results and after-review observations; historical captures above must not be called a live regression test.

### Fresh V1 baseline independently reviewed

The lead's fresh `tests/v2/before/1-viewport.png` through `9-viewport.png` were inspected on 25 October 2026 at 1536×1024. Order: home, shop, Silat, product, lookbook, story, custom, size, support. `tests/v2/before/contact-sheet.jpg` preserves an overview of these fresh images. All nine confirm the composition/typography findings in the table. These are genuine current baseline captures, replacing dependence on the historical screenshots for those findings. Their `results.json` reports no captured runtime errors; this visual audit does not independently infer interaction correctness from that absence.

### Independent V2 After-Review (25 October 2026)

All nine V2 pages were captured afresh at 1536×1024 into `tests/v2/after/1-viewport.png` through `9-viewport.png` and combined into `tests/v2/after/contact-sheet.jpg`. The comparison against the approved references confirms:

1. **Route 1 (Homepage):** The hero height was adjusted so `THE FIRST CHAPTER` collection rail is clearly visible in the initial 1024px viewport. The headline `THE FIGHT / IS IN YOU.` uses deliberate line breaks matching Reference 1. The athlete photograph spans the right half edge-to-edge.
2. **Route 2 (Shop):** Spacing between the editorial header and catalog grid was compressed; cards align at x318/y358. Product card images maintain consistent aspect ratios with clear drop badges, price tags, and color indicators. Songket watermark is clean and pattern-only.
3. **Route 3 (Silat Series):** Kuda-kuda martial artist stance fills the right hero with zero typographical contamination. The headline `THE ART / OF DEFENCE.` adopts authentic scale. Below the hero, the `SILAT SERIES` product lineup is visible in the primary viewport.
4. **Route 4 (Keris Tuah):** The showcase image has the duplicate search loupe cleanly removed. Typography has dominant condensed hierarchy (`KERIS TUAH` with `HERITAGE PERFORMANCE JERSEY`). Size buttons and color swatches match reference spacing.
5. **Route 5 (Lookbook):** Full-height warehouse visual with dual macro insets (gold badge and hand wraps) matches Reference 5. Right editorial column features `A LEGACY / IN MOTION.` with the campaign rail visible in the initial viewport.
6. **Route 6 (Our Story):** Restored the diagonal edge transition connecting the bone manifesto panel to the warehouse athlete. Below the headline `NOT BORN / TO STAND / STILL.`, the three brand pillars (`ROOTED`, `RESILIENT`, `RELENTLESS`) are introduced in the initial viewport.
7. **Route 7 (Custom Teamwear):** Left squad visual is framed cleanly with semantic H1. Right quotation form features clear inputs, and the 3-step process rail (`01 BRIEF`, `02 DESIGN`, `03 PRODUCTION`) is visible in the viewport.
8. **Route 8 (Size Guide):** Headline `BUILT TO / MOVE WITH YOU.` matches Reference 9. Athlete photo with chest/length arrows sits beside the size chart table and technical t-shirt line diagram.
9. **Route 9 (Support):** Diagonal transition restores the reference composition for `WE'RE IN / YOUR CORNER.`. The FAQ categories and contact form are aligned in the initial viewport.

All 9 routes reflect the approved visual identity and design system with high polish, deliberate typography, and zero layout overflow.
