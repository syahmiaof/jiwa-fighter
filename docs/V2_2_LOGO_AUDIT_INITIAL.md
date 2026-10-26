# LAPORAN AUDIT FIDELITI JENAMA & LOGO V2.2 (PHASE 1 INITIAL AUDIT)
**JIWA FIGHTER — Official Brand & Logo Verification Report**

- **Tarikh Audit:** 26 Oktober 2026
- **Auditor:** **TANDA** (Specialist Brand & Logo Fidelity Auditor)
- **Penerima Laporan:** **UKIR** (Lead Visual & Brand Stylist), **JEBAT** (Lead Orchestrator & Principal Systems Architect)
- **Status Audit:** **FAILED / REPAIRS REQUIRED (Kecacatan Kritikal Dikesan)**
- **Aset Rujukan Master (Ground Truth):**
  - `references/brand-monochrome-emblem.png` (1302 × 1208 px, RGBA master vector)
  - `references/brand-logo-on-white.png` (1302 × 1208 px, RGB master lockup)
  - Reference page navbar crops: `references/01-homepage.png` hingga `09-customer-care.png` (1536 × 1024 px desktop)
  - Ground truth header crop benchmark: `tests/v2.2/logo/ref-nav-logo-master.png` (224 × 37 px)
- **Fail Sasaran Pemeriksaan:**
  - `src/components/layout/Header.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/styles/refinements.css`
  - `public/assets/brand/*`

---

## 1. Eksekutif Ringkasan (Executive Summary)

Audit fideliti logo jenama fasa 1 telah dilaksanakan oleh **TANDA** bagi mengesahkan kepatuhan 100% susun atur, geometri, tipografi, jarak (*tracking/spacing*), dan ketepatan warna logo **JIWA FIGHTER** pada sistem reka bentuk V2.2 (*Iron Heritage*).

### Ringkasan Penilaian Utama
| Parameter Penilaian | Standard Master Rujukan | Pelaksanaan Semasa (Current) | Status | Sisihan (*Delta*) |
|:---|:---:|:---:|:---:|:---:|
| **Lebar Penuh Lockup Navbar** | **224 px** | **183 px** | ❌ GAGAL | **-41 px (-18.3%)** |
| **Tinggi Penuh Lockup Navbar** | **37 px** | **36 px** (Aktif 30 px) | ❌ GAGAL | **-7 px tinggi aktif** |
| **Dimensi Monogram Emblem** | **38 px (L) × 37 px (T)** | Container 36×36 px (Aktif 36×30 px) | ❌ GAGAL | **-2 px (L), -7 px (T)** |
| **Dimensi Wordmark Navbar** | **179 px (L) × ~15–17 px (T)** | **135 px (L) × 9.8 px (T)** | ❌ GAGAL | **-44 px (L), -5.2 px (T)** |
| **Jarak Antara Emblem & Wordmark** | **7 px** | **12 px** (`gap-3`) | ❌ GAGAL | **+5 px (71.4% terlalu renggang)** |
| **Kedudukan X Navbar Desktop** | **x = 75 px** | **x = 72 px** | ⚠️ TIDAK SELARAS | **-3 px offset ke kiri** |
| **Kedudukan Y Navbar Desktop** | **y = 13 px** (Tengah menegak y=31.5) | **y = 12 px** | ⚠️ HAMPIR | -1 px offset |
| **Penyelaras Mobile (<639px)** | Skala berkadar seragam | Emblem 24×28 px, Wordmark 96×7 px | ❌ KRITIKAL | Distorsi aspek & teks kabur |
| **Kualiti Alfa & Warna** | Bebas halo, `#F0ECE3` & `#C6A260` | `#F1EDE4` & `#C7A260`, alfa bersih |  LULUS | Bersih, tiada *halo/fringe* |

> [!CAUTION]
> **Keputusan Audit: REJECTED (Perlu Pembaikan Segera oleh UKIR)**.
> Logo pada navbar header masa kini mengalami pengecilan drastik sebanyak **18.3%** daripada rujukan rasmi (183px vs 224px). Wordmark terlalu kerdil (lebar 135px, tinggi hanya 9.8px), jarak sela terlalu renggang (12px vs 7px), dan terdapat kod *override* CSS mobile yang mendistorsi emblem kepada nisbah menegak (24×28 px) serta mengecilkan wordmark ke tahap tidak boleh dibaca (tinggi 6.98 px).

---

## 2. Analisis Geometri Master Asset (Ground Truth Mathematical Benchmark)

Berdasarkan analisis piksel terus ke atas `references/brand-monochrome-emblem.png`, `references/brand-logo-on-white.png`, dan 9 mockup desktop resolusi `1536 × 1024`:

```
┌─────────────────────────────────── 224 px ───────────────────────────────────┐
│                                                                              │
│  ┌────── 38 px ──────┐    ┌─ 7 px ─┐    ┌──────────────── 179 px ───────────────┐  │
│  │                   │    │        │    │                                       │  │
│  │   JF MONOGRAM     │    │  GAP   │    │             JIWA FIGHTER              │  │
│  │     EMBLEM        │    │ (sela) │    │               WORDMARK                │  │
│  │  38px (W) x 37px  │    │  7 px  │    │         179px (W) x 15-17px (H)       │  │
│  │                   │    │        │    │                                       │  │
│  └───────────────────┘    └────────┘    └───────────────────────────────────────┘  │
│                                                                              │
└────────────────────────────────── y = 13..49 ────────────────────────────────┘
```

### 2.1 Monogram Emblem
- **Aset Asal Master (`references/brand-monochrome-emblem.png`):**
  - Blok Emblem: `x = 310..1114` (lebar 805 px), `y = 88..753` (tinggi 666 px).
  - Nisbah Aspek Vektor Master: `805 / 666 = 1.2087:1` (~1.21:1 landskap).
- **Emblem Navbar Terpapar (`tests/v2.2/logo/ref-nav-emblem-exact.png`):**
  - Kotak Sempadan Piksel: Lebar **38 px**, Tinggi **37 px** (`aspect-ratio = 1.027:1` menghampiri segi empat sama optikal pada resolusi render).
  - Piksel aktif menyentuh koordinat `x = 0..37` dan `y = 0..36`.

### 2.2 Wordmark "JIWA FIGHTER"
- **Aset Asal Master (`references/brand-logo-on-white.png`):**
  - "JIWA": `x = 137..1168` (lebar 1032 px), `y = 778..946` (tinggi 169 px, nisbah 6.11:1).
  - "FIGHTER": `x = 83..1232` (lebar 1150 px), `y = 969..1118` (tinggi 150 px, nisbah 7.67:1).
- **Wordmark Navbar Terpapar (`tests/v2.2/logo/ref-nav-wm-exact.png`):**
  - Lebar Keseluruhan: **179 px**.
  - Ketinggian Huruf (Cap Height): **15 px** (`y = 2..16` di dalam sempadan 17 px).
  - Perincian Huruf:
    - Span "JIWA": `x = 0..62` (lebar **63 px**).
    - Ruang antara perkataan (Word Gap): `x = 63..69` (**7 px**).
    - Span "FIGHTER": `x = 70..178` (lebar **109 px**).
    - Nisbah Lebar "JIWA" berbanding "FIGHTER": `63 / 109 = 0.578` (JIWA merangkumi ~35.2% lebar teks, FIGHTER merangkumi ~60.9% lebar teks).

### 2.3 Jarak dan Jajaran Navbar Header
- **Tinggi Bar Header:** Tepat **64 px** (`y = 0..63`, garisan sempadan bawah di `y = 61..62`).
- **Pengezonan Vertikal:** Logo bermula di `y = 13 px` dan berakhir di `y = 49 px` (tinggi 37 px). Pusat menegak logo: `y = 31.5 px` (berada tepat di tengah paksi 64 px).
- **Pengezonan Horizontal:** Logo bermula tepat pada `x = 75 px` dan berakhir pada `x = 299 px` (lebar 224 px) pada resolusi desktop 1536 px.

---

## 3. Penemuan Pemeriksaan Pelaksanaan Semasa (Current Implementation Audit)

### 3.1 Header Desktop (`src/components/layout/Header.tsx`)
Kod sedia ada:
```tsx
{/* Left: Brand Logo */}
<Link href="/" aria-label="JIWA FIGHTER home" className="flex items-center gap-3 group">
  <div className="brand-emblem relative w-9 h-9 shrink-0">
    <Image
      src="/assets/brand/emblem-white-v2.webp"
      alt=""
      sizes="36px"
      fill
      priority
      className="object-contain transition-transform duration-300 group-hover:scale-105"
    />
  </div>
  <Image 
    src="/assets/brand/wordmark-white-v2.webp" 
    alt="JIWA FIGHTER" 
    width={135} 
    height={11} 
    className="brand-wordmark h-auto w-[135px]" 
    priority 
  />
</Link>
```

#### Pengukuran DOM Sebenar (Playwright Viewport 1536×1024):
```json
{
  "containerComputedPadding": "72px",
  "link": { "x": 72, "y": 12, "width": 183, "height": 36 },
  "emblem": { "x": 72, "y": 12, "width": 36, "height": 36 },
  "wordmark": { "x": 120, "y": 25.08, "width": 135, "height": 9.83 }
}
```

#### Analisis Kegagalan:
1. **Lebar Logo Terpotong 41 px:** `183 px` berbanding `224 px` rujukan (-18.3%).
2. **Wordmark Terlalu Kecil & Kurus:** Ditetapkan secara statik ke `w-[135px]`. Dengan nisbah aspek fail WebP (879:64), ketinggian render hanyalah `9.83 px`! Rujukan memerlukan lebar `179 px` dan tinggi huruf `15 px`.
3. **Emblem Mengalami Pengecilan Kerana `object-contain`:** Kotak `w-9 h-9` (36×36 px) menempatkan fail `emblem-white-v2.webp` (160×133 px, nisbah 1.203). Akibatnya, imej mengecil menegak menjadi **36 px lebar × 29.9 px tinggi**, meninggalkan ruang kosong atas-bawah sebanyak 3 px. Rujukan memerlukan emblem selebar **38 px × tinggi 37 px**.
4. **Sela Renggang Terlebih 5 px:** Menggunakan kelas Tailwind `gap-3` (12 px). Sela rujukan adalah **7 px**.
5. **Jajaran Kiri Lari 3 px:** Kotak kontena menghasilkan padding terkira `72 px` (`x = 72`), manakala rujukan bermula tepat pada `x = 75 px`.

---

### 3.2 Penyelewengan Kritikal pada Peranti Mudah Alih (`src/styles/refinements.css`)

Pemeriksaan fail `src/styles/refinements.css` (baris 204–209) menemui kod berikut:
```css
@media (max-width: 639px) {
  :root { --page-gutter: 20px; }
  header > div:first-child { padding-inline: 16px; }
  header > div:first-child > div:last-child { gap: 10px; }
  .brand-wordmark { width: 96px !important; }
  .brand-emblem { width: 24px !important; height: 28px !important; }
```

#### Pengukuran DOM Sebenar (Playwright Viewport 390×844 Mobile):
```json
{
  "link": { "x": 16, "y": 16, "width": 132, "height": 28 },
  "emblem": { "x": 16, "y": 16, "width": 24, "height": 28 },
  "wordmark": { "x": 52, "y": 26.5, "width": 96, "height": 6.98 }
}
```

#### Analisis Kegagalan Kritikal:
1. **Mendistorsi Geometri Emblem (`24px × 28px`):** Nisbah aspek dipaksa menjadi `0.857:1` (kotak tegak memanjang ke atas). Oleh kerana imej emblem adalah landskap (1.20:1), imej mengecut menjadi `24 px × 20 px` dengan sela kosong kosong 4 px di atas dan bawah.
2. **Wordmark Tidak Boleh Dibaca (`height: 6.98 px`):** Wordmark dipaksa ke `width: 96px !important`, menyebabkan tinggi huruf mengecil kepada **~7 piksel**. Huruf "FIGHTER" kehilangan legibiliti dan melanggar standard tipografi jenama.

---

### 3.3 Footer (`src/components/layout/Footer.tsx`)
Kod sedia ada:
```tsx
<Link href="/" className="flex items-center gap-3">
  <div className="relative w-8 h-8">
    <Image
      src="/assets/brand/emblem-brass-v2.webp"
      alt="JIWA FIGHTER"
      fill
      sizes="(max-width: 768px) 100vw, 60vw"
      className="object-contain"
    />
  </div>
  <Image 
    src="/assets/brand/wordmark-brass-v2.webp" 
    alt="JIWA FIGHTER" 
    width={165} 
    height={12} 
    className="h-auto" 
  />
</Link>
```

#### Pengukuran DOM Sebenar:
- Emblem container: `w-8 h-8` (32 × 32 px). Render aktif: `32 px (L) × 26.6 px (T)`.
- Sela gap: `gap-3` (12 px).
- Wordmark: `width={165}`, tinggi render `12.01 px`.
- Total lockup footer: `32 + 12 + 165 = 209 px`.
- Analisis: Walaupun warna Antique Brass (`#C7A260`) tepat, nisbah sela (12px) dan saiz emblem (32px) tidak selaras dengan sistem proporsi jenama master. Sela hendaklah mengikut standard 7–8 px.

---

### 3.4 Kualiti Fail Aset Jenama (`public/assets/brand/*`)

Pengukuran ke atas fail WebP semasa:
- `emblem-white-v2.webp` (160 × 133 px): Solid RGB `#F1EDE4` (Bone White), semi-transparency RGB `#F1EEE7`. Tiada artifak halo hitam atau putih.
- `wordmark-white-v2.webp` (879 × 64 px): Solid RGB `#F1EDE4`, semi-transparency RGB `#F0ECE4`. Anti-aliasing lancar.
- `emblem-brass-v2.webp` (160 × 133 px): Solid RGB `#C7A260` (Antique Brass).
- `wordmark-brass-v2.webp` (879 × 64 px): Solid RGB `#C6A260` (Antique Brass).

*Nota Geometri:* Fail `wordmark-white-v2.webp` mempunyai nisbah lebar "JIWA" (381 px) kepada "FIGHTER" (478 px) sebanyak `0.797`, berbanding rujukan navbar master `0.578`. Apabila wordmark dipaparkan pada lebar rujukan 179 px, ketinggiannya berada pada `13–15 px` yang menepati skala visual rujukan.

---

## 4. Senarai Kecacatan Terperinci untuk Pembaikan oleh UKIR (Itemized Defect Register)

Berikut adalah daftar kecacatan rasmi untuk tindakan segera UKIR:

| ID Kecacatan | Komponen Terlibat | Keterukan | Penerangan Kecacatan | Nilai Semasa | Nilai Sasaran (Rujukan) |
|:---|:---|:---:|:---|:---|:---|
| **DEF-LOGO-01** | `Header.tsx` | **P0 (Kritikal)** | Saiz wordmark navbar terkurang dan terlalu kerdil | `w-[135px]`, tinggi ~9.8px | **`w-[179px]`, tinggi ~14–17px** |
| **DEF-LOGO-02** | `Header.tsx` | **P0 (Kritikal)** | Dimensi kontena emblem navbar tidak menepati geometri master | `w-9 h-9` (36×36px), render 36×30px | **`w-[38px] h-[37px]`** |
| **DEF-LOGO-03** | `Header.tsx` | **P1 (Tinggi)** | Sela antara emblem dan wordmark terlalu lebar | `gap-3` (12px) | **`gap-[7px]`** (atau 7px tepat) |
| **DEF-LOGO-04** | `Header.tsx` | **P0 (Kritikal)** | Jumlah lebar keseluruhan logo navbar jauh tersasar | 183 px (-18.3%) | **224 px** (38 + 7 + 179 = 224px) |
| **DEF-LOGO-05** | `Header.tsx` | **P1 (Tinggi)** | Kedudukan paksi X logo navbar di desktop lari ke kiri | `x = 72 px` | **`x = 75 px`** (selaras 1536px viewport) |
| **DEF-LOGO-06** | `refinements.css` | **P0 (Kritikal)** | *Override* CSS mudah alih mendistorsi emblem & teks | Emblem 24×28px, Wordmark 96px | **Hapuskan distorsi 24×28px; skala berkadar (~30×29px & 140px)** |
| **DEF-LOGO-07** | `Footer.tsx` | **P2 (Sederhana)** | Proporsi emblem dan sela footer tidak selaras dengan brand lockup | Emblem 32×32px, gap 12px, wordmark 165px | **Emblem berkadar, sela 7–8px, wordmark harmonis** |
| **DEF-LOGO-08** | `Header.tsx` | **P2 (Sederhana)** | Pengezonan menegak (*vertical alignment*) dalam header 64px | Logo di y=12 (h=36) | **Logo berpusat di y=31.5 (y=13..50 dalam 64px header)** |

---

## 5. Arahan Pembaikan Terperinci untuk UKIR (Actionable Repair Directives)

### Arahan 1: Pembetulan `src/components/layout/Header.tsx`
Gantikan elemen logo sedia ada (baris 47–59):
```tsx
{/* Left: Brand Logo */}
<Link href="/" aria-label="JIWA FIGHTER home" className="flex items-center gap-[7px] group">
  <div className="brand-emblem relative w-[38px] h-[37px] shrink-0">
    <Image
      src="/assets/brand/emblem-white-v2.webp"
      alt=""
      width={38}
      height={37}
      priority
      className="w-[38px] h-[37px] object-contain transition-transform duration-300 group-hover:scale-105"
    />
  </div>
  <Image 
    src="/assets/brand/wordmark-white-v2.webp" 
    alt="JIWA FIGHTER" 
    width={179} 
    height={15} 
    className="brand-wordmark w-[179px] h-auto object-contain" 
    priority 
  />
</Link>
```
*Pastikan kontena bar header mengekalkan padding kiri `x = 75px` pada skrin 1536px (cth: `pl-[75px]` atau laraskan padding kontena `px-4 sm:px-6 lg:pl-[75px] lg:pr-[75px]`).*

### Arahan 2: Pembetulan `src/styles/refinements.css`
Gantikan baris 208–209 dalam blok `@media (max-width: 639px)`:
```css
/* Padamkan penetapan rosak lama: */
/* .brand-wordmark { width: 96px !important; } */
/* .brand-emblem { width: 24px !important; height: 28px !important; } */

/* Gantikan dengan nisbah berskala berkadar tepat: */
.brand-emblem { width: 30px !important; height: 29px !important; }
.brand-wordmark { width: 140px !important; height: auto !important; }
```
Ini memastikan nisbah aspek ~1.03:1 terpelihara dan wordmark kekal jelas dibaca pada peranti mudah alih tanpa memecahkan susun atur navbar.

### Arahan 3: Penyelarasan `src/components/layout/Footer.tsx`
Kemas kini lockup jenama footer agar menggunakan sela `gap-[8px]` (atau `gap-2`) dan dimensi kontena yang menghormati nisbah aspek rasmi, selaras dengan penjenamaan Antique Brass.

---

## 6. Protokol Pengesahan TANDA (Verification Gatekeeper Protocol)

Sebaik sahaja UKIR selesai melaksanakan pembetulan:
1. Skrip tangkapan automatik `scripts/capture_logo.js` akan dijalankan semula.
2. Tangkapan skrin baru `tests/v2.2/logo/after-rendered-header-logo.png` dan `after-rendered-header-crop.png` akan dihasilkan.
3. TANDA akan mengira ralat min piksel (MSE) dan korelasi silang berbanding `tests/v2.2/logo/ref-nav-logo-master.png`.
4. Toleransi kelulusan TANDA:
   - Lebar lockup: **224 px ± 1 px**.
   - Tinggi lockup: **37 px ± 1 px**.
   - Kedudukan x: **75 px ± 1 px**.
   - Sela gap: **7 px ± 1 px**.

Laporan ini disediakan secara rasmi oleh **TANDA** untuk tindakan segera pasukan kejuruteraan visual.
