# V2 Motion System — Disciplined Force

Date: 2026-10-25. Scope: frontend-only; GSAP remains the only JavaScript animation library.

## V1 findings

- `useGSAP()` already scoped and cleaned up the initial animation setup. No proven runtime memory leak was found in that baseline.
- Reduced-motion was checked only when a hook mounted. An operating-system preference change did not revert active animation.
- A whole collection/grid shared one parent trigger. Lower rows could finish their entrance before the visitor reached them.
- Hero timelines targeted optional selectors without checking whether a page contained them.
- `animate-fade-in` appeared in several components but had no matching animation definition.
- Cart, search and checkout overlays did not implement dialog semantics, Escape dismissal, focus containment/return or background scroll locking. Search advertised Escape despite lacking a handler.

## Implemented behavior

| Scene | Timing | Behavior |
| --- | --- | --- |
| Hero kicker | 300ms, starts immediately | Opacity and 6px entrance |
| Hero headline | 550ms, starts at 80ms | Opacity and 15px entrance; semantic heading remains intact |
| Hero supporting copy | 450ms, starts at 180ms | Opacity and 10px entrance |
| Hero CTA | 400ms, starts at 260ms | Opacity and 8px entrance; no loading gate |
| Hero image wrapper | 650ms, starts immediately | Opacity entrance |
| Desktop image depth | Scroll-linked, 350ms catch-up | 1.015 scale; travel is limited to 0.7% of image height and never exceeds 6px |
| Section/card reveal | 500ms | Each card triggers at its own `top 96%`; delay is capped at 160ms |
| Dialog and accordion feedback | 220ms | Opacity and 5px entrance |
| Cart panel | 300ms | Opacity and 32px lateral entrance, clipped by overlay |

Hero depth runs only at desktop widths of at least 1024px with motion allowed. Its minimal overscan preserves tight approved photography crops. There is no pinning, scroll interception, forced intro, exit-navigation delay or additional animation dependency. Closing dialogs is immediate so controls remain responsive.

## Lifecycle and progressive enhancement

- `src/lib/motion/index.ts` uses component-scoped `useGSAP()` and `gsap.matchMedia()`; changes to reduced-motion and desktop width revert the relevant GSAP context.
- Text/content begins visible in rendered HTML. JavaScript adds entrances only when motion is allowed; no global CSS hides content waiting for JavaScript.
- Optional hero targets are queried and checked before a tween is created.
- Per-item scroll animations are tracked. A scoped child-list observer registers new filtered items and kills removed-item animations/triggers. A local GSAP context owns deferred tween creation and reverts it on cleanup.
- Focus entering an animated card completes its entrance immediately, avoiding invisible keyboard targets.
- Font readiness, captured image-load events, child-list changes and actual container-size changes schedule a coalesced animation-frame `ScrollTrigger.refresh()`. All observers/listeners/pending frames are cleaned up on unmount. There is no refresh on every scroll event.
- Entrance tweens clear temporary transform/opacity styles. Motion stays on transform/opacity; no blanket `will-change` allocation is introduced.
- `src/styles/motion.css` defines the formerly missing fade class and disables these CSS animations under reduced motion. Root layout imports this stylesheet.

## Accessible overlay lifecycle

`src/lib/motion/useDialog.ts` is shared by CartDrawer, SearchModal and DemoModal.

- Native `dialog.showModal()` places each overlay in the browser top layer, makes background content inert and handles nested modal isolation.
- Each dialog has an accessible name and `aria-modal`. Search has a labelled input and close action.
- Initial focus moves to search input or the first close control. Explicit Tab/Shift-Tab containment complements native dialog behavior.
- Native Escape cancellation updates React state. Backdrop clicks also dismiss the relevant overlay.
- Focus returns to the opener when it remains connected and belongs to the active dialog layer, if any.
- A shared set counts open dialogs: opening checkout above the cart preserves the body lock, closing checkout restores focus to its cart trigger, and closing the final dialog restores the previous body overflow.
- Drawer width fits a 390px viewport; its item region can scroll without pushing checkout outside the panel.

## Verification performed

`npm run typecheck` passed after these changes.

`node scripts/v2-motion-qa.cjs` passed against the local V2 development server at `http://localhost:3001`, using Playwright Chromium. Machine-readable result: `tests/v2/motion-qa.json`.

Verified flows:

1. Search initial input focus, reverse/forward Tab wrapping, Escape and opener focus return.
2. Product → cart → nested checkout; independent Escape behavior, focus return into the cart, final return to Add to Bag, and correct body lock lifetime.
3. Live transition to reduced motion; hero/cards remain visible and GSAP inline transforms revert.
4. Client navigation through Shop, Lookbook, Story and Home without collected runtime errors or GSAP target warnings.
5. Settled cart geometry stays within a 390px viewport.

The mobile measurement waits for the 300ms entrance to settle; its transient transform is clipped by the overlay and is not treated as final layout geometry.

## Limits and related checks

These checks do not establish universal 60fps, low-end-device performance, Safari behavior or screen-reader announcements on physical devices. Full nine-page screenshot comparison, scrolling observation and final regression evidence are recorded in the main V2 QA report. Route navigation retains Next.js behavior; there is intentionally no forced exit animation. The page-owned Story jump must use reduced-motion-aware scrolling; that change is managed by the lead alongside page refinements.
