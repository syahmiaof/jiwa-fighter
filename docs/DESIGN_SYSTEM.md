# JIWA FIGHTER — Iron Heritage Design System

**Date:** 2026-10-25  
**Owner:** Agent 01 — ADIWIRA (Design System & Architecture)  
**Status:** Locked & Standardized  

---

## 1. Core Brand Colors

The palette is derived directly from the approved high-resolution references:

```css
:root {
  /* Primary Foundation */
  --color-obsidian: #0C0D0F;       /* Deep primary black base */
  --color-obsidian-subtle: #141619;/* Slightly elevated panel black */
  --color-obsidian-border: #23272D;/* Subtle structural border */

  /* Metallic Accents */
  --color-brass: #C6A260;          /* Antique brass / gold primary accent */
  --color-brass-light: #DFBF83;    /* Highlight / hover brass */
  --color-brass-dark: #A38245;     /* Pressed / deep gold */
  --color-brass-muted: rgba(198, 162, 96, 0.2);

  /* Editorial Light Surfaces */
  --color-bone: #F0ECE3;           /* Warm bone stone background */
  --color-bone-pure: #FAF8F5;      /* Crisp bone contrast */
  --color-bone-card: #E8E3D8;      /* Slightly deeper stone for card backgrounds */
  --color-bone-border: #D8D2C4;    /* Neutral bone divider line */

  /* Combat Accent */
  --color-oxblood: #621F24;        /* Deep martial crimson */
  --color-oxblood-light: #8E2B33;  /* Vibrant red accent */

  /* Neutrals & Text */
  --color-text-dark: #0C0D0F;
  --color-text-muted-dark: #5A5D64;
  --color-text-light: #F0ECE3;
  --color-text-muted-light: #9B9FA8;
}
```

---

## 2. Typography System

- **Display Headline Font:** Bold, condensed, powerful uppercase display typeface (e.g., `Bebas Neue`, `Barlow Condensed`, `Oswald`, or `Impact`).
  - Spacing: Tight letter-spacing (`-0.02em` to `-0.01em`).
  - Line-height: `0.9` to `0.95` for tight editorial punch.
  - Case: `uppercase`.
- **Sub-headline & Editorial Kickers:** `Inter` / `Montserrat` / `Cabinet Grotesk` styled in uppercase with tracking: `tracking-widest` (e.g. `0.2em`).
  - Often accompanied by an antique brass accent line (`h-[1px] w-8 md:w-12 bg-brass`).
- **Body Text:** Neutral, clean grotesque sans-serif (`Inter` / `system-ui`) with high legibility, generous line-height (`1.6`), and muted tones for secondary information.

---

## 3. UI Components Specification

### A. Navigation Bar (Global)
- **Background:** Sticky/fixed `--color-obsidian` (`#0C0D0F`) with subtle border bottom (`#23272D`).
- **Left:** Monogram + Wordmark logo (`JIWA FIGHTER`).
- **Center:** Five primary routes (`SHOP`, `COLLECTIONS`, `LOOKBOOK`, `OUR STORY`, `CUSTOM`) in clean uppercase with active state marked by brass text and underline.
- **Right:**
  - Search trigger icon.
  - Language toggle: `EN / BM` with active language highlighted and underlined in antique brass.
  - Shopping Bag trigger: Bag icon with counter badge (e.g. `00` or dynamic count).

### B. Buttons & Actions
1. **Primary Brass CTA:**
   - Background: `--color-brass` (`#C6A260`)
   - Text: `--color-obsidian` (`#0C0D0F`), bold uppercase with right arrow (`→`).
   - Hover: Brightens to `--color-brass-light`, subtle translate-x on arrow.
2. **Primary Obsidian CTA:**
   - Background: `--color-obsidian` (`#0C0D0F`)
   - Text: `--color-bone` (`#F0ECE3`), bold uppercase with right arrow (`→`).
3. **Ghost / Underline Link:**
   - Text: Uppercase with subtle border bottom or arrow transition.
4. **Outline CTA:**
   - 1px border (`#0C0D0F` on light, `#C6A260` on dark), transparent background.

### C. Badges & Labels
- **Drop Badge:** Rectangular gold tag (`DROP 001`) with dark text.
- **Series Badge:** Outlined gold border box (`SILAT SERIES`).
- **Spec Badges:** Grid of 4 horizontal metric icons (190 GSM Poly-Spandex, Breathable & Quick Dry, Training & Lifestyle, Malaysian Born Brand).

### D. Accordions & Forms
- Clean border dividers, interactive `+` / `−` icon transition, smooth GSAP height expansion.
- Inputs: Understated 1px borders, subtle brass focus ring, clear label hierarchy, explicit demo-only notices on submission.
