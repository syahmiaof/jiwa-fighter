# JIWA FIGHTER V3 — visual deviation matrix

**Comparison viewport:** 1536 × 1024. **Evidence:** approved images in `references/`, production-browser captures in `tests/v3/current/`, and side-by-side boards in `tests/v3/comparisons/`. These captures document the V3 visual pass; the current fixed launcher was separately checked on localhost after rebuilding. This is a direct visual review, not a pixel-parity claim or similarity score.

## Shared shell

| Section | Actual / repair | Verification | Status |
|---|---|---|---|
| Header across all nine routes | Replaced the stacked mark with the approved horizontal PNG derivative, preserving source alpha and 3.27:1 ratio. | E2E asserts the horizontal header asset on all nine 1536 × 1024 captures; logo crops are in `tests/v3/logo-comparison/`. | **Verified at tested sizes.** Navbar spacing and scale still differ slightly from some references. |
| Footer logo | Uses the brass variant from the same approved silhouette. A comparison-script background mismatch was corrected to the actual footer color `#141619`. | Browser crop and page-context footer screenshot are in `tests/v3/logo-comparison/`. | **Verified in browser capture;** no physical device check. |
| HOME navigation | Added localized `HOME` / `LAMAN UTAMA` as the first desktop/mobile navigation link. It routes to `/` and marks active on the homepage. | Desktop and mobile navigation assertions in `tests/v3/qa-run.json`. | **Verified.** |
| SATRIA launcher | Uses a new transparent robot head with a CSS eye blink; stays anchored to the same bottom-right viewport position across routes. | Current localhost measurement on `/`, `/shop`, `/lookbook` and `/our-story` at 1440 × 900 returned identical coordinates. The saved nine-route and 36-case results came from the stale build and do not verify this launcher fix. | **Position stability verified on four desktop routes.** |
| Welcome intro | Official horizontal lockup on an obsidian welcome screen, five-second display, then an 800 ms fade to Home. Shows once per tab session; skip and Escape work; reduced-motion disables transitions/animation. | E2E observed 5.8 seconds including fade, checked skip/reduced motion and no replay on client navigation. | **Verified.** |

## Route and section findings

| Route / section | Reference and actual | Repair and evidence | Remaining status |
|---|---|---|---|
| `/` — hero and collection rail | Hero, campaign image and rail use the supplied composition. The heading starts lower/smaller than the reference; rail card scale and spacing differ. | Fresh capture: `tests/v3/current/01.png`; board: `tests/v3/comparisons/01-side-by-side.jpg`. Shared horizontal header, HOME nav and welcome intro are in place. | **Partial.** Hero type scale and rail details remain. Launcher keeps its fixed viewport position. |
| `/shop` — title and product grid | Reference keeps the title on one line and brings merchandise into view earlier. Earlier implementation wrapped the title and pushed the grid down by about 130 px. | Reduced the title scale/wrapping and excess vertical padding. Fresh capture `02.png` and board `02-side-by-side.jpg` show one line and product imagery near the reference start. | **Major deviation repaired.** Fine spacing, card proportions and filter treatment remain. Launcher keeps its fixed viewport position. |
| `/collections/silat-series` — hero and product rail | Split hero is close; current counter is `01/03`, while reference shows `02/05`; lower product crops differ. | Fresh capture `03.png`; board `03-side-by-side.jpg`. No counter rewrite without a source-backed content decision. | **Partial.** Counter/content and product rail need owner/source alignment. |
| `/products/keris-tuah` — gallery/details | Main gallery begins around y≈126 versus y≈130 in reference; title begins around y≈161 versus y≈153. Increased desktop headline scale to match the supplied title hierarchy. | Fresh capture `04.png`; board `04-side-by-side.jpg`. | **Partial.** Title scale is closer; gallery/details spacing and selector density remain. |
| `/lookbook` — editorial split and cards | Hero split, image placement and lower rail are close. Campaign card images do not contain captions; current labels are live HTML. | Replaced a copy-bearing screenshot watermark with the pattern-only crop and reduced the rail heading to keep it on one line. Fresh capture `05.png`; board `05-side-by-side.jpg`. | **Partial.** Duplicate copy is resolved; card proportions and rail spacing remain. |
| `/our-story` — diagonal hero | Added a pale diagonal textile wedge at the photo seam using the existing songket texture and brass edge. The wedge restores the reference composition; its repeat scale and shape are still approximate. | Fresh capture `06.png`; board `06-side-by-side.jpg`. | **Partial.** Diagonal restored; texture cadence and type scale remain different. |
| `/custom` — quote form and process row | Image/form split is close. Source campaign image contains a dark upper band, and process icons/type remain more compact than the reference. Cropping farther would cut the lead athlete’s head. | Enlarged process icons and headings; fresh capture `07.png`; board `07-side-by-side.jpg`. | **Partial.** Process section density and source-image band remain; form is a local demo and does not send a quote. |
| `/size-guide` — table and measurement section | Title/table alignment is close. Diagram now sits unboxed in a wider desktop aspect, and both fit choices are visible in the first 1024 px. | Fresh capture `08.png`; board `08-side-by-side.jpg`. | **Major deviation repaired.** Diagram and spacing still differ slightly from the reference. |
| `/support` — hero, FAQ, contact | Hero ends close to reference. FAQ/contact spacing was tightened; benefit strip now appears around y≈936 versus about y≈928. Pattern texture appears in hero wedge and contact panel, but is paler and narrower than the reference fabric slash. | Fresh capture `09.png`; board `09-side-by-side.jpg`. Launcher tucks over submit/action controls. | **Partial.** Benefit strip and clearance repaired; fabric treatment still differs. |

## Evidence limits

- Route boards are initial-view comparisons at 1536 × 1024. They do not verify every below-the-fold section or every scroll position.
- Browser flows cover mobile SATRIA at 390 × 844; this visual matrix does not claim all nine routes were screenshot-compared at tablet, 1440 × 900 or 1920 × 1080.
- SATRIA and the checkout/form controls remain prototype features. No real order, subscription, support message or quote is transmitted.
- The V3 build is not considered complete while the route-level deviations above remain. No similarity percentages are assigned.
