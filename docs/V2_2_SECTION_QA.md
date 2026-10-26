# LAPORAN AUDIT KUALITI SEKSYEN V2.2 (SECTION-BY-SECTION QA AUDIT)
**JIWA FIGHTER — Iron Heritage Engineering & Pixel-Fidelity Assessment**

- **Tarikh Audit:** 26 Oktober 2026
- **Auditor & Orchestrator:** **JEBAT** (Lead Engineering Orchestrator)
- **Status Audit:** **INSPECTION COMPLETE — REPAIRS ACTIVE**
- **Piawaian Rujukan (Ground Truth):** 9 Mockup Resolusi Penuh `1536 × 1024` di dalam `references/` (`01-homepage.png` hingga `09-customer-care.png`)
- **Tolak Ukur Viewport:** Desktop Standard `1536 × 1024` (Chromium Headless / Playwright)
- **Status Logo (Priority Zero):**  **DISAHKAN LULUS & 100% PATUH** ([`docs/V2_2_LOGO_VERIFICATION_FINAL.md`](file:///c:/Users/USER/Desktop/jiwa-fighter/docs/V2_2_LOGO_VERIFICATION_FINAL.md))

---

## 1. Eksekutif Ringkasan (Executive Summary)

Audit visual komprehensif mengikut seksyen telah dilaksanakan ke atas kesemua sembilan (9) laluan utama laman web JIWA FIGHTER. Tangkapan skrin sebenar (sebelum pembaikan seksyen) telah dijana pada viewport desktop piawai 1536×1024 menggunakan URL laluan sahih dan dianalisis secara perbandingan piksel berbanding imej rujukan master rasmi.

### Ringkasan Ralat Garis Asas (*Baseline Diffs*)
| ID Laluan | Laluan Sistem | Kategori Visual | Ralat Asas (Diff %) | Status Rujukan |
|:---|:---|:---:|:---:|:---:|
| `01-homepage` | `/` | Obsidian Dark / Bone Rail | **12.54%** | Perlu Kemasan Renggang & Hero |
| `02-shop` | `/shop` | Bone White Arsenal | **9.94%** | Baik (Struktur Kad & Penapis) |
| `03-silat-series` | `/collections/silat-series` | Dual Theme (Dark + Stone) | **13.26%** | Perlu Kemasan Tajuk & Showcase |
| `04-product-keris-tuah` | `/products/keris-tuah` | Bone White Editorial | **11.51%** | 4 Thumbnail & Jajaran Butang |
| `05-lookbook` | `/lookbook` | Obsidian Editorial | **10.08%** | Jajaran Bab & Renggang Tipografi |
| `06-our-story` | `/our-story` | Dual Split Heritage | **14.78%** | Kontras Seksyen Nilai & Manifesto |
| `07-teamwear` | `/custom` | Tactical Obsidian | **10.71%** | Sela Grid Borang & Langkah |
| `08-size-guide` | `/size-guide` | Bone White Technical | **13.00%** | Sela Jadual & Jajaran Carta |
| `09-customer-care` | `/support` | Bone White Editorial | **15.28%** | Sela Accordion & Kad Bantuan |

---

## 2. Inventori Seksyen Penuh & Daftar Kecacatan Mengikut Seksyen

### 2.1 Halaman Utama (`01-homepage`)
- **HOME-HERO-QA / DEF-SEC-01 (P1):**
  - *Rujukan:* `references/01-homepage.png` (y: 64..709)
  - *Dapatan:* Pada rujukan, butang CTA "EXPLORE DROP" bermula pada y=571, manakala pada implementasi semasa ia terletak pada y=501 (70px terlalu tinggi). Jarak antara subtext dan butang terlalu mampat.
  - *Pelan Pembaikan:* Selaraskan padding menegak `.campaign-copy` dan renggang elemen flex supaya butang jatuh pada paras y=570–575px.
- **HOME-COLLECTION-QA / DEF-SEC-02 (P1):**
  - *Rujukan:* `references/01-homepage.png` (y: 709..1024)
  - *Dapatan:* Teks lajur kiri ("THE FIRST CHAPTER") menggunakan `items-center` menyebabkan teks terapung di tengah pada y=103 dalam seksyen, manakala dalam reference ia bermula di atas pada y=38 sejajar dengan permulaan kad produk (y=41).
  - *Pelan Pembaikan:* Ubah jajaran grid kepada `items-start`, selaraskan tinggi kad kepada 240px (`aspect-[1.5]`), dan kemas kini jajaran penunjuk carousel.

### 2.2 Katalog Kedai (`02-shop`)
- **SHOP-HEADER-QA / DEF-SEC-03 (P2):**
  - *Rujukan:* `references/02-shop.png` (y: 64..260)
  - *Dapatan:* Tajuk "THE ARSENAL" sedikit padat; butang penapis ("ALL", "SILAT", "COMBAT", "ACCESSORIES") mempunyai ketinggian 38px berbanding 36px pada reference.
  - *Pelan Pembaikan:* Laraskan padding banner editorial dan sela butang penapis agar sejajar dengan rujukan Bone White.
- **SHOP-GRID-QA / DEF-SEC-04 (P1):**
  - *Rujukan:* `references/02-shop.png` (y: 280..850)
  - *Dapatan:* Susun atur kad produk perlu memastikan 4 lajur seimbang dengan teks tanda harga RM 189 di sebelah kanan dan pautan tindakan di bawah.
  - *Pelan Pembaikan:* Pastikan nisbah imej kad produk konsisten 3:4 dengan sempadan halus `#E6E2D8`.

### 2.3 Koleksi Silat (`03-silat-series`)
- **SILAT-HERO-QA / DEF-SEC-05 (P1):**
  - *Rujukan:* `references/03-silat-series.png` (y: 64..648)
  - *Dapatan:* Lebar teks tajuk "SILAT SERIES / THE UNIFORM OF THE UNBROKEN" pada rujukan merentasi 624px, manakala kontena implementasi dihadkan kepada 507px (lebar 47%).
  - *Pelan Pembaikan:* Luaskan lebar lajur salinan `.page-silat .campaign-copy` kepada 52% dan laraskan skala fontclamp.
- **SILAT-SHOWCASE-QA / DEF-SEC-06 (P1):**
  - *Rujukan:* `references/03-silat-series.png` (y: 648..1024)
  - *Dapatan:* Seksyen bawah pada rujukan menggunakan latar belakang Bone White (`#F5F2EB`) dengan kad produk yang jelas.
  - *Pelan Pembaikan:* Pastikan peralihan warna latar belakang ke Bone White tepat pada y=648px.

### 2.4 Produk Keris Tuah (`04-product-keris-tuah`)
- **PRODUCT-GALLERY-QA / DEF-SEC-07 (P1):**
  - *Rujukan:* `references/04-product-keris-tuah.png` (y: 64..850, x: 75..750)
  - *Dapatan:* Thumbnail mestilah tepat 4 item dengan sempadan aktif Antique Brass `#C6A260` dan thumbnail tidak aktif kelabu lembut.
  - *Pelan Pembaikan:* Sahkan susunan 4 thumbnail: Master Hadapan, Belakang bersama Keris, Perincian Sulaman, dan Kolar.
- **PRODUCT-DETAILS-QA / DEF-SEC-08 (P1):**
  - *Rujukan:* `references/04-product-keris-tuah.png` (y: 64..850, x: 750..1460)
  - *Dapatan:* Butang "ADD TO BAG" mestilah blok gelap penuh kontras tinggi dengan teks putih tebal, disusuli accordion (Details, Fit & Sizing, Delivery).

### 2.5 Lookbook Kempen (`05-lookbook`)
- **LOOKBOOK-CHAPTERS-QA / DEF-SEC-09 (P2):**
  - *Rujukan:* `references/05-lookbook.png` (y: 64..1024)
  - *Dapatan:* Tajuk bab "CHAPTER 01: THE AWAKENING" dan susunan imej dwi-panel mempunyai sedikit perbezaan nisbah aspek (16:10 vs 16:9).
  - *Pelan Pembaikan:* Laraskan aspek kontena imej editorial dan saiz font bab.

### 2.6 Kisah Jenama (`06-our-story`)
- **STORY-HERO-QA / DEF-SEC-10 (P1):**
  - *Rujukan:* `references/06-our-story.png` (y: 64..600)
  - *Dapatan:* Bahagian atas merupakan gabungan salinan jenama di atas Bone White dan imej atlet di atas bangku.
- **STORY-VALUES-QA / DEF-SEC-11 (P1):**
  - *Rujukan:* `references/06-our-story.png` (y: 600..1024)
  - *Dapatan:* Seksyen nilai rujukan mempunyai latar belakang cerah bertekstur batu (*light stone*) dengan garisan pembahagi tiang `ROOTED. RESILIENT. RELENTLESS.`, bukannya blok gelap menyeluruh.
  - *Pelan Pembaikan:* Kemas kini latar belakang seksyen nilai kepada palet batu cerah yang sepadan dengan rujukan.

### 2.7 Pakaian Pasukan Khas (`07-teamwear`)
- **TEAMWEAR-FORM-QA / DEF-SEC-12 (P2):**
  - *Rujukan:* `references/07-teamwear.png` (y: 64..1024)
  - *Dapatan:* Susun atur borang sebut harga dan langkah reka bentuk 3-peringkat berada dalam susunan yang baik, perlukan sedikit penalaan jarak medan input dan warna label.

### 2.8 Panduan Saiz (`08-size-guide`)
- **SIZE-TABLE-QA / DEF-SEC-13 (P1):**
  - *Rujukan:* `references/08-size-guide.png` (y: 64..1024)
  - *Dapatan:* Halaman rujukan menggunakan Bone White dengan jadual saiz tabbed (Combat Tops, Fight Shorts, Rashguards).
  - *Pelan Pembaikan:* Pastikan jadual saiz mengekalkan sempadan halus, teks monospace untuk ukuran, dan suis penukar CM/INCH yang tepat.

### 2.9 Khidmat Pelanggan (`09-customer-care`)
- **SUPPORT-FAQ-QA / DEF-SEC-14 (P1):**
  - *Rujukan:* `references/09-customer-care.png` (y: 64..1024)
  - *Dapatan:* Halaman bantuan rujukan berasaskan Bone White dengan kad bantuan pantas (WhatsApp, Email) dan accordion soalan lazim yang tersusun rapi.
  - *Pelan Pembaikan:* Selaraskan padding kontena accordion dan warna teks tajuk pada palet Bone White.

---

## 3. Jadual Pelaksanaan Pembaikan Mengikut Kelompok (Repair Batches)

- **Kelompok 1 (Batch 1):** Homepage (`page.tsx`) & Penggayaan Geometri Hero/Rail (`refinements.css`).
- **Kelompok 2 (Batch 2):** Shop (`shop/page.tsx`) & Silat Series Dual-Theme (`collections/silat-series/page.tsx`).
- **Kelompok 3 (Batch 3):** Product Keris Tuah (`products/keris-tuah/page.tsx`) & Lookbook (`lookbook/page.tsx`).
- **Kelompok 4 (Batch 4):** Our Story (`our-story/page.tsx`), Teamwear (`custom/page.tsx`), Size Guide (`size-guide/page.tsx`), dan Support (`support/page.tsx`).
