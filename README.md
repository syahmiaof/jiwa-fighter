<div align="center">
  <h1>JIWA FIGHTER</h1>
  <p><strong>Contemporary Martial Arts & Silat Combat Apparel Brand Experience</strong></p>
  <p>
    <a href="https://github.com/syahmiaof/jiwa-fighter"><img src="https://img.shields.io/badge/Source-GitHub-101713?style=for-the-badge&logo=github&logoColor=60E1B5&labelColor=101713" alt="GitHub" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-101713?style=for-the-badge&logoColor=60E1B5&labelColor=101713" alt="License" /></a>
    <a href="https://syahmiaof.my"><img src="https://img.shields.io/badge/Author-syahmiaof-101713?style=for-the-badge&logo=vercel&logoColor=60E1B5&labelColor=101713" alt="Author" /></a>
  </p>
</div>

---

## 🥋 Overview

**JIWA FIGHTER** is a modern combat sportswear and martial arts lifestyle storefront prototype. Rooted in traditional Nusantara silat heritage and engineered for high-performance athletic discipline, the platform combines cinematic visual art direction, fluid GSAP animations, bilingual localization (EN/BM), and an end-to-end commerce mock experience.

> **Note**: This is an interactive brand and frontend showcase prototype. Product orders and transactions are simulated for demonstration purposes.

---

## ✨ Core Features & Route Inventory

The platform delivers 9 complete, responsive application routes built on the Next.js 14 App Router:

| Route | Page | Theme & Purpose |
|---|---|---|
| `/` | **Homepage** | *"The Fight Is In You"* — Cinematic hero reveal, brand manifesto, featured collections, and visual lookbook teaser. |
| `/shop` | **Shop All** | *"The Uniform of the Unbroken"* — Filterable product catalog with category switching, sort controls, and quick-add to bag. |
| `/collections/silat-series` | **Silat Series** | *"The Art of Defence"* — Dedicated collection landing highlighting tactical apparel and technical garments. |
| `/products/keris-tuah` | **Product Detail** | *"Keris Tuah"* — Rich product showcase with multi-angle gallery, size selection, accordion specs, and cart drawer. |
| `/lookbook` | **Lookbook** | *"A Legacy in Motion"* — Editorial martial arts photography, typography compositions, and motion reels. |
| `/our-story` | **Our Story** | *"Not Born to Stand Still"* — Heritage narrative detailing the philosophical bridge between ancestral combat and modern athletics. |
| `/custom` | **Teamwear & Custom** | *"Your Crew. One Jiwa."* — Interactive team quote builder, volume discount tiers, and custom uniform inquiries. |
| `/size-guide` | **Size & Fit Guide** | *"Built to Move With You"* — Dynamic measurement calculators, fit guides, and international conversion charts. |
| `/support` | **Customer Care** | *"We're in Your Corner"* — FAQ accordion, shipping information, care guides, and support contact form. |

---

## 🛠️ Architecture & Shared Systems

- **Motion Engine (`src/lib/motion/`):**
  - Powered by **GSAP 3.12.5** and `@gsap/react` with custom ScrollTrigger choreography.
  - "Disciplined Force" motion identity: `useHeroReveal`, `useScrollReveal`, and `useStaggerCards`.
  - Accessible `prefers-reduced-motion` detection and graceful degradation.
- **Bilingual Internationalization (`src/lib/i18n/`):**
  - Instantaneous client-side language toggle between **English** and **Bahasa Melayu** across all 9 pages.
  - Type-safe dictionary covering headers, body copy, product specs, and button states.
- **Client-Side Commerce Simulation (`src/lib/cart/`):**
  - Interactive slide-over cart drawer with variant picking, item quantity adjustments, and subtotal calculation.
  - LocalStorage persistence preserving bag contents between sessions.
  - Safe prototype checkout dialog.

---

## 💻 Tech Stack

| Domain | Technology |
|---|---|
| **Framework** | Next.js 14.2 (App Router), React 18.3 |
| **Language** | TypeScript 5.6 (Strict Mode) |
| **Styling** | Tailwind CSS 3.4, PostCSS, Custom CSS Variables |
| **Motion** | GSAP 3.12.5, `@gsap/react` 2.1.1, ScrollTrigger |
| **Icons** | Lucide React |
| **Testing & CI** | Playwright, GitHub Actions (`.github/workflows/ci.yml`) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or newer
- npm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/syahmiaof/jiwa-fighter.git
cd jiwa-fighter

# Install dependencies
npm install

# Start development server
npm run dev
```

### Verification & Quality Checks

```bash
# Validate TypeScript type consistency (0 errors)
npm run typecheck

# Execute ESLint checks (0 errors)
npm run lint

# Compile production build
npm run build
```

---

## 📁 Repository Structure

```text
jiwa-fighter/
├── docs/                     # Design systems, architectural audit logs, and reports
│   └── mockups/              # High-resolution design mockups & brand asset exports (~20MB)
├── public/                   # Static web assets, logos, and favicons
├── src/
│   ├── app/                  # Next.js 14 App Router pages (9 complete routes)
│   ├── components/           # Reusable UI components, layout headers, footers, cart drawer
│   ├── lib/                  # Motion hooks, i18n dictionaries, and cart context
│   └── styles/               # Global typography and Tailwind stylesheets
├── .github/workflows/        # Automated GitHub Actions CI workflow
├── LICENSE                   # MIT License
└── package.json
```

---

## 👑 Builder

**Muhammad Syahmi (syahmiaof)**  
- Portfolio: [syahmiaof.my](https://syahmiaof.my)  
- GitHub: [@syahmiaof](https://github.com/syahmiaof)
