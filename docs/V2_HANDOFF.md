# JIWA FIGHTER — V2 Technical Architecture & Handoff Guide

**Release Version:** 1.0.0 (Iron Heritage Production Storefront)  
**Date:** 2026-10-25  
**Lead Architects:** Antigravity Autonomous Engineering Swarm  
**Status:** Production Verified (All 9 Routes Live, 0 Console Errors, Static Prerendering Complete)

---

## 1. System Architecture Overview

JIWA FIGHTER is built as a headless, ultra-high-performance combatwear e-commerce storefront utilizing the Next.js 14 App Router, TypeScript (strict mode), Tailwind CSS, GSAP 3.12.5 motion engineering, and Playwright automated visual QA.

```
                    ┌────────────────────────┐
                    │      Next.js 14        │
                    │   App Router (SSG)     │
                    └───────────┬────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│  Iron Heritage│       │ GSAP 3.12.5   │       │ Reactive i18n │
│ Design Tokens │       │ Motion Engine │       │  (EN / BM)    │
└───────┬───────┘       └───────┬───────┘       └───────┬───────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                ▼
                    ┌────────────────────────┐
                    │    9 Core Routes       │
                    │   + Dynamic Slugs      │
                    └───────────┬────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │  Mock Commerce Engine  │
                    │  (Cart, Demo Modals)   │
                    └────────────────────────┘
```

---

## 2. Directory Structure

```
jiwa-fighter/
├── public/
│   ├── assets/
│   │   ├── brand/          # logo-white.png, logo-dark.png, emblem-brass.png, emblem-dark.png
│   │   ├── campaigns/      # Hero & lookbook photography (WebP & PNG)
│   │   ├── products/       # Keris Tuah, Silat, and Heritage jersey imagery
│   │   └── textures/       # Songket transparent motifs, gold chevrons, crimson slashes
│   └── favicon.ico         # Generated from authentic emblem-brass
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout, fonts, CartProvider, LanguageProvider, Header, Footer
│   │   ├── page.tsx        # Route 1: Homepage ("THE FIGHT IS IN YOU.")
│   │   ├── collections/
│   │   │   └── silat-series/page.tsx # Route 2: Silat Series ("THE ART OF DEFENCE.")
│   │   ├── shop/page.tsx   # Route 3: Shop All ("THE UNIFORM OF THE UNBROKEN.")
│   │   ├── products/
│   │   │   ├── keris-tuah/page.tsx   # Route 4: Master Keris Tuah Showcase
│   │   │   └── [slug]/               # Dynamic product catalog routes
│   │   ├── lookbook/page.tsx         # Route 5: Campaign Lookbook ("A LEGACY IN MOTION.")
│   │   ├── our-story/page.tsx        # Route 6: Brand Identity ("NOT BORN TO STAND STILL.")
│   │   ├── custom/page.tsx           # Route 7: Custom Teamwear ("YOUR CREW. ONE JIWA.")
│   │   ├── support/page.tsx          # Route 8: Customer Care & FAQ ("WE'RE IN YOUR CORNER.")
│   │   └── size-guide/page.tsx       # Route 9: Size & Fit Guide ("BUILT TO MOVE WITH YOU.")
│   ├── components/
│   │   ├── cart/CartDrawer.tsx       # Interactive slide-over cart drawer
│   │   ├── layout/Header.tsx         # Fixed global navigation with active route indicators
│   │   ├── layout/Footer.tsx         # Editorial brand footer & newsletter
│   │   ├── search/SearchModal.tsx    # Live fuzzy product search dialog
│   │   └── ui/DemoModal.tsx          # Non-negotiable simulated commerce prototype alerts
│   ├── data/
│   │   └── products.ts               # Typed catalog data with 8 combatwear pieces
│   └── lib/
│       ├── cart/CartContext.tsx      # Reactive cart state with localStorage persistence
│       ├── i18n/                     # Bilingual English / Bahasa Melayu dictionary & context
│       └── motion/index.ts           # GSAP entrance hooks with clearProps & reduced-motion
├── docs/                             # Complete project documentation suite
├── scripts/                          # Asset extraction and visual QA test automation
└── tests/screenshots/                # Viewport & full-page captures for all 9 routes
```

---

## 3. The Iron Heritage Design System

### Color Palette
- **Obsidian Black (`#0C0D0F`):** Deep volcanic matte black serving as the foundational darkness for combat visuals.
- **Antique Brass (`#C6A260`):** Ceremonial gold inspired by traditional keris hilts and royal songket weaving.
- **Warm Bone Stone (`#F0ECE3`):** Unbleached raw cotton and stone masonry, utilized as the editorial contrast ground for Shop, Product Detail, and Size Guide.
- **Deep Oxblood / Crimson (`#621F24`):** Intense combat red used as an accent in the Silat Series and warning crests.

### Typography
- **Display:** `Teko` / uppercase display font with dense editorial letterspacing (`tracking-tighterEditorial`) for authoritative combat headlines.
- **Mono / Accents:** `Space Mono` / `JetBrains Mono` for kickers, technical dimensions, serial codes, and price stamps.
- **Body / Prose:** `Inter` for fluent, comfortable reading across product descriptions, FAQ accordions, and sizing guides.

---

## 4. Operational Scripts & Commands

```bash
# Typecheck strict TypeScript declarations
npm run typecheck

# Production build (creates optimized static pages)
npm run build

# Start production server on port 3000
npm run start

# Run automated Playwright visual QA suite
node scripts/run_visual_qa.js

# Re-extract and optimize image assets from reference mockups
python scripts/extract_assets.py
```

---

## 5. V2 Production Roadmap & Extension Guide

When transitioning this frontend prototype to a live multi-region e-commerce enterprise:

1. **Payment Gateway Integration:**
   - Integrate **Curlec by Stripe** or **Billplz** for Malaysian FPX online banking, DuitNow QR, and Visa/Mastercard processing.
   - Replace `DemoModal` calls in `CartDrawer.tsx` and `ProductDetailClient.tsx` with Stripe Checkout / PaymentElement sessions.

2. **Headless E-Commerce Backend:**
   - Connect `src/data/products.ts` to **Shopify Storefront API** or **Medusa.js** for real-time inventory management, size-stock tracking, and automated Peninsular/Borneo shipping calculations.

3. **Customer Notifications & CRM:**
   - Connect the newsletter form (`src/components/layout/Footer.tsx`) and teamwear inquiry form (`src/app/custom/page.tsx`) to **Klaviyo** or **Resend** for transactional confirmation emails and drop alerts.

4. **3D Interactive Jersey Customizer:**
   - Expand `/custom` with a Three.js / React Three Fiber interactive 3D viewer enabling sports clubs to upload team crests and choose custom songket sash placements in real time.
