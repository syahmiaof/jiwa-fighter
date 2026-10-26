# JIWA FIGHTER — Implementation Status

**Date:** 2026-10-25  
**Orchestrator:** JEBAT  
**Status:** All 9 Routes Built & Type-Checked  

---

## 1. Route Implementation Summary

| Route | Page Name | Primary Theme | Implementation File | Status |
|---|---|---|---|---|
| `/` | Homepage | THE FIGHT IS IN YOU. | `src/app/page.tsx` | Built & Compiled |
| `/shop` | Shop All | THE UNIFORM OF THE UNBROKEN. | `src/app/shop/page.tsx` | Built & Compiled |
| `/collections/silat-series` | Collection Landing | THE ART OF DEFENCE. | `src/app/collections/silat-series/page.tsx` | Built & Compiled |
| `/products/keris-tuah` | Product Detail | KERIS TUAH | `src/app/products/keris-tuah/page.tsx` | Built & Compiled |
| `/lookbook` | Lookbook / Campaign | A LEGACY IN MOTION. | `src/app/lookbook/page.tsx` | Built & Compiled |
| `/our-story` | Our Story | NOT BORN TO STAND STILL. | `src/app/our-story/page.tsx` | Built & Compiled |
| `/custom` | Team & Club Orders | YOUR CREW. ONE JIWA. | `src/app/custom/page.tsx` | Built & Compiled |
| `/size-guide` | Size & Fit Guide | BUILT TO MOVE WITH YOU. | `src/app/size-guide/page.tsx` | Built & Compiled |
| `/support` | Support / FAQ / Contact | WE'RE IN YOUR CORNER. | `src/app/support/page.tsx` | Built & Compiled |

---

## 2. Shared Systems & Architecture

- **Global Navigation (`src/components/layout/Header.tsx`):**
  - Brand emblem & wordmark
  - Dynamic route highlighting (Antique Brass active indicator)
  - Interactive search trigger modal
  - Instantaneous EN / BM language switcher
  - Dynamic shopping bag counter and drawer trigger
  - Responsive mobile overlay menu
- **Footer (`src/components/layout/Footer.tsx`):**
  - Brand identity, catalog links, service links, simulated newsletter dispatch, copyright stamp
- **Commerce Mock Layer (`src/lib/cart/CartContext.tsx` & `src/components/cart/CartDrawer.tsx`):**
  - Add to bag, variant selection, quantity changes, item removal, subtotal calculation
  - LocalStorage persistence
  - Explicit prototype simulated checkout dialog
- **Internationalization (`src/lib/i18n/LanguageContext.tsx` & `dictionary.ts`):**
  - Full English and Bahasa Melayu dictionaries across all 9 pages
- **Motion Engine (`src/lib/motion/index.ts`):**
  - GSAP 3.12.5 + `@gsap/react` + ScrollTrigger
  - Disciplined Force motion signature: `useHeroReveal`, `useScrollReveal`, `useStaggerCards`
  - `prefersReducedMotion` fallback
