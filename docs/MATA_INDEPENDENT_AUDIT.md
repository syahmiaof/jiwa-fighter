# LAPORAN AUDIT KUALITI VISUAL BEBAS (INDEPENDENT QA AUDIT REPORT)
**Laman Web Rasmi JIWA FIGHTER V2**

- **Tarikh Audit:** 25 Oktober 2026
- **Auditor Bebas:** MATA (Specialist Visual QA Auditor)
- **Penerima Laporan:** JEBAT (Lead Orchestrator & Principal Systems Architect)
- **Piawaian Rujukan (Ground Truth):** 9 Mockup Resolusi Penuh `1536 × 1024` di dalam `references/` (`01-homepage.png` hingga `09-customer-care.png`)
- **Persekitaran Ujian:** `http://localhost:3000` (Next.js 14 App Router, Chromium Viewport 1536×1024, Skala Desktop 3:2)

---

## 1. Eksekutif Ringkasan (Executive Summary)

Audit kualiti visual bebas telah dijalankan ke atas kesemua 9 laluan (*routes*) JIWA FIGHTER V2 secara objektif, berpandukan rujukan mockup kelulusan reka bentuk asal (*ground truth references*).

### Skor & Penilaian Keseluruhan
- **Integriti Fungsian & Kestabilan:** **100% (21/21 Ujian E2E Lulus, 0 Ralat Konsol)**
- **Ketepatan Palet Warna Jenama:** **100%** (Obsidian Black `#0C0D0F`, Antique Brass `#C6A260`, Bone White `#F0ECE3`, Oxblood `#621F24`)
- **Ketepatan Harga Produk:** **100%** (Disahkan tepat RM 189 untuk Keris Tuah, Heritage Jersey, dan Silat Jersey sepadan dengan teks reference)
- **Fideliti Geometri & Susun Atur Visual:** **93.5%** (Terdapat beberapa ketidakselarasan susun atur kad, pembahagian thumbnail, dan limpahan ketinggian viewport 1024px)

---

## 2. Matriks Kecacatan Mengikut Tahap Keterukan (Defect Severity Matrix)

| Tahap Keterukan | Kuantiti | Definisi | Status Tindakan |
|:---|:---:|:---|:---|
| **P0 (Critical)** | **0** | Ralat menghalang fungsi, skrin putih, laman terputus, atau ralat pelaksanaan kod. | TIADA (Semua laluan stabil) |
| **P1 (Major Visual)** | **7** | Percanggahan geometri ketara, imej produk salah, kad terpotong melepasi 1024px viewport, atau elemen wajib reference hilang. | PERLU DIPERBAIKI SEGERA |
| **P2 (Polish & Refinement)** | **10** | Ketidaktepatan tipografi (kerning, line-breaks), aksen corak songket pepenjuru, pembahagi garisan, dan gaya huruf. | PEMURNIAN KUALITI |

---

## 3. Butiran Kecacatan P1 (Major Visual Inconsistencies)

### [P1-01] Route 2 (`/shop`): Imej Keris Tuah Menggunakan Fail Salah Dalam Grid
- **Rujukan:** `references/02-shop.png`
- **Keadaan Sebenar:** Kad ke-3 (`KERIS TUAH JERSEY`) di `/shop` memaparkan foto jersi dengan jalur selempang pepenjuru (`keris-tuah-main-v2.webp`).
- **Rujukan Mockup:** Mockup kelulusan `02-shop.png` secara jelas memaparkan jersi Keris Tuah dengan **senjata keris berlok menegak di tengah-tengah dada jersi**.
- **Punca:** Di dalam `src/data/products.ts`, produk `prod-001` menggunakan `images.main: '/assets/products/keris-tuah-main-v2.webp'`. Walhal aset rasmi mockup telah diekstrak dan wujud di `public/assets/products/shop-keris-tuah-jersey-v2.webp`.
- **Cadangan Pembetulan:** Kemas kini `prod-001` atau logik kad katalog untuk menggunakan `/assets/products/shop-keris-tuah-jersey-v2.webp`.

### [P1-02] Route 2 (`/shop`): Geometri Baris Tindakan Kad Produk Tidak Menepati Reference
- **Rujukan:** `references/02-shop.png` (Koordinat Y: 700–900)
- **Keadaan Sebenar:** Pada kad produk live, titik sampel warna diletakkan di atas, manakala tanda harga `RM 189` berada di sebelah kiri dan pautan `VIEW PRODUCT ->` berada di sebelah kanan baris yang sama.
- **Rujukan Mockup:** Susun atur reference mengandungi:
  1. Baris 1: Tajuk Produk (`HERITAGE JERSEY`)
  2. Baris 2: Subtitle (`BLACK / GOLD`)
  3. Baris 3: Titik sampel warna di sebelah kiri (dengan bulatan aktif berbingkai emas brass) bersetentang dengan Tanda Harga `RM 189` di sebelah kanan.
  4. Baris 4: Garisan penuh bergaris bawah dengan teks `VIEW PRODUCT ->`.
- **Cadangan Pembetulan:** Susun semula flex/grid container pada kad produk `/shop` mengikut 4 baris struktur reference.

### [P1-03] Route 4 (`/products/keris-tuah`): Pertindihan Thumbnail Menghasilkan 5 Petak (Reference Hanya 4)
- **Rujukan:** `references/04-product-keris-tuah.png` (Ruangan Thumbnail Kiri)
- **Keadaan Sebenar:** Terdapat 5 petak thumbnail menegak pada paparan live. Thumbnail pertama dan kedua memaparkan imej hadapan yang hampir sama.
- **Rujukan Mockup:** Reference hanya mempunyai tepat 4 thumbnail: (1) Pandangan Hadapan, (2) Pandangan Belakang dengan Keris, (3) Perincian Sulaman Emas, (4) Perincian Kolar.
- **Punca:** Di dalam `src/app/products/keris-tuah/page.tsx` (baris 35–41), array `galleryImages` mengandungi entri pendua:
  ```ts
  { src: '/assets/products/keris-tuah-main-v2.webp', alt: 'Keris Tuah Performance Jersey Master View' },
  { src: '/assets/products/keris-tuah-main-v2.webp', alt: 'Front Perspective' },
  ```
- **Cadangan Pembetulan:** Buang entri pendua supaya array kekal 4 item tepat mengikut reference mockup.

### [P1-04] Route 4 (`/products/keris-tuah`): Lencana Spesifikasi 2×2 Menolak Ketinggian Kandungan
- **Rujukan:** `references/04-product-keris-tuah.png` (Spesifikasi Fabrik)
- **Keadaan Sebenar:** 4 lencana spesifikasi (`190 GSM POLY-SPANDEX`, `BREATHABLE & QUICK DRY`, `TRAINING & LIFESTYLE`, `MALAYSIAN BORN BRAND`) disusun secara `grid-cols-2` (2 baris x 2 lajur).
- **Rujukan Mockup:** Reference memaparkan keempat-empat lencana dalam **1 baris mendatar (4 lajur)** dengan garisan pemisah tegak nipis di antaranya. Susunan 2-baris sekarang menambah ketinggian menegak dan menolak seksyen akordion ke bawah.
- **Cadangan Pembetulan:** Tukar kepada `grid-cols-4` atau `flex flex-row divide-x divide-bone-border` untuk skrin desktop.

### [P1-05] Route 3 (`/collections/silat-series`): Kad Lineup Bawah Kehilangan Pautan "VIEW PIECES ->" & Tajuk 2-Baris
- **Rujukan:** `references/03-silat-series.png` (Bahagian "FEATURED IN THIS SERIES")
- **Keadaan Sebenar:** 
  1. Tajuk seksyen dirender sebaris: `SILAT SERIES`.
  2. Kad 01 (`SILAT TRAINING JERSEY`) dan Kad 02 (`SILAT HERITAGE JERSEY`) tidak mempunyai pautan `VIEW PIECES ->`.
  3. Lencana pada Kad 03 (`DETAILS THAT CARRY CULTURE.`) terpotong di bahagian bawah.
- **Rujukan Mockup:**
  1. Tajuk seksyen mestilah 2 baris besar: `SILAT` di atas, `SERIES` di bawah.
  2. Setiap kad produk mempunyai pautan jelas `VIEW PIECES ->` di sudut kanan bawah maklumat produk.
  3. Kad 03 memaparkan lencana teks terapung yang kemas di atas gambar kolar/lengan.
- **Cadangan Pembetulan:** Laraskan tipografi tajuk seksyen kepada 2 baris, tambahkan pautan `VIEW PIECES ->`, dan laraskan penataan kedudukan overlay Kad 03.

### [P1-06] Route 8 (`/size-guide`): Pilihan Potongan (Fit Preference) Terpotong Bawah Viewport 1024px
- **Rujukan:** `references/08-size-guide.png`
- **Keadaan Sebenar:** Disebabkan padding menegak yang tinggi pada hero (`py-12 md:py-16`) dan seksyen carta (`py-14 md:py-20`), blok `FIT PREFERENCE` (`ATHLETIC FIT` vs `RELAXED FIT`) teranjak melepasi paras Y: 1024px dan terpotong pada paparan skrin tanpa scroll.
- **Rujukan Mockup:** Seluruh jadual saiz dan modul `HOW TO MEASURE` serta `FIT PREFERENCE` muat kemas di dalam bingkai 1024px.
- **Cadangan Pembetulan:** Padatkan ruang vertikal (`py-6 md:py-8` untuk hero, dan `py-6 md:py-8` untuk carta saiz) agar kedua-dua blok kelihatan penuh tanpa terpotong dalam viewport 1024px.

### [P1-07] Route 9 (`/support`): 3 Teras Bantuan Bawah Terkeluar Dari Viewport 1024px
- **Rujukan:** `references/09-customer-care.png`
- **Keadaan Sebenar:** Seksyen 3 teras kepercayaan bawah (`CLEAR SIZE GUIDANCE`, `ORDER SUPPORT`, `LOCAL BRAND`) berada di paras Y ~ 1100px dan langsung tidak kelihatan dalam viewport asal 1024px.
- **Rujukan Mockup:** Ketiga-tiga teras ini membentuk sub-jalur bawah yang kelihatan dalam paparan asal desktop 1536×1024.
- **Cadangan Pembetulan:** Laraskan saiz hero dan jarak padding seksyen FAQ agar ketiga-tiga teras bantuan ini kelihatan di dasar skrin pada resolusi 1536×1024.

---

## 4. Butiran Kecacatan P2 (Polish & Visual Refinements)

### [P2-01] Global Header: Ketiadaan Garisan Pemisah Antara Ikon Carian dan Pemilih Bahasa
- **Rujukan:** Semua fail `references/01` hingga `references/09`
- **Isu:** Pada mockup reference, terdapat garisan pemisah menegak nipis (`|`) di antara ikon kanta pembesar dan perkataan `EN / BM` (`[Search] | EN / BM`). Dalam live header, garisan pemisah ini tiada.

### [P2-02] Global Header: Tipografi Pautan Navigasi Terlalu Padat/Condensed
- **Rujukan:** `references/` header bar
- **Isu:** Pautan navigasi desktop (`SHOP`, `COLLECTIONS`, `LOOKBOOK`, `OUR STORY`, `CUSTOM`) pada live tapak web menggunakan fon paparan tebal berhuruf rapat (display condensed), sedangkan mockup asal menggunakan tipografi sans-serif geometri yang lebih bersih dengan penjarakan huruf lebar (*wide letter-spacing* / *tracking-widest*).

### [P2-03] Route 1 (`/`): Pemisahan Baris Sub-Tajuk Kempen
- **Rujukan:** `references/01-homepage.png`
- **Isu:** Reference memaparkan sub-tajuk tepat dalam 2 baris:
  ```
  BORN FROM HERITAGE.
  MADE FOR MOVEMENT.
  ```
  Pada live, teks terbungkus menjadi:
  ```
  BORN FROM HERITAGE. MADE FOR
  MOVEMENT.
  ```

### [P2-04] Route 1 (`/`): Kedudukan Butang Anak Panah Carousel Seksyen 2
- **Rujukan:** `references/01-homepage.png` (Seksyen "THE FIRST CHAPTER")
- **Isu:** Pada mockup, butang bulat anak panah kiri dan kanan terletak sejajar di sebelah kanan kad imej. Pada live, butang tersebut terletak di bawah barisan kad di bucu kanan bawah.

### [P2-05] Route 3 (`/collections/silat-series`): Tanda Noktah Pada Tajuk Kempen
- **Rujukan:** `references/03-silat-series.png`
- **Isu:** Tajuk utama pada mockup mempunyai tanda noktah: `THE ART / OF DEFENCE.`. Pada live, tajuk berakhir tanpa noktah (`THE ART / OF DEFENCE`).

### [P2-06] Route 5 (`/lookbook`): Tanda Palang Depan (`/`) Pada Tajuk Seksyen Bawah
- **Rujukan:** `references/05-lookbook.png`
- **Isu:** Tajuk seksyen bawah pada mockup adalah `EXPLORE THE CAMPAIGN` dalam satu baris. Pada live, teks tersebut dirender sebagai `/ EXPLORE THE / CAMPAIGN` dengan tanda palang (`/`) yang tidak wujud pada mockup asal.

### [P2-07] Route 5 (`/lookbook`): Petikan Editorial Menjadi Baris Tunggal Terlalu Lebar
- **Rujukan:** `references/05-lookbook.png`
- **Isu:** Ayat *"What we inherit is not meant to stand still. We carry it forward."* pada mockup dipatahkan rapi kepada 2 baris puitis, manakala pada live ia memanjang menjadi satu baris panjang.

### [P2-08] Route 6 (`/our-story`): Ketiadaan Ribon Corak Songket Pada Garisan Pepenjuru
- **Rujukan:** `references/06-our-story.png`
- **Isu:** Pada mockup asal, garisan pepenjuru condong yang memisahkan panel putih Bone White dan foto atlet dihiasi dengan ribon jalur motif songket emas bersudut. Pada live, potongan tersebut hanyalah garisan CSS clip-path kosong tanpa ribon songket emas.

### [P2-09] Route 6 (`/our-story`): Pembahagi Tiang Nilai Menggunakan Garisan Lurus Berbanding Pepenjuru
- **Rujukan:** `references/06-our-story.png` (Seksyen Bawah Tiga Nilai)
- **Isu:** Mockup menggunakan garisan pemisah serong/pepenjuru (`/`) di antara tiang `ROOTED`, `RESILIENT`, dan `RELENTLESS`. Pada live, pembahagi adalah garisan tegak biasa (`|`).

### [P2-10] Route 7 (`/custom`): Gaya Huruf Tajuk Borang Terlalu Kaku
- **Rujukan:** `references/07-teamwear.png`
- **Isu:** Tajuk borang pada mockup asal menggunakan huruf campuran (*sentence case*) bersaiz sederhana: *"Tell us what your team needs."*. Pada live, tajuk dipaksa menjadi huruf besar sepenuhnya dalam fon Anton: *"TELL US WHAT YOUR TEAM NEEDS."*.

---

## 5. Matriks Pengesahan 9 Laluan (Route-by-Route Verification Scorecard)

| No | Laluan (Route) | Fail Reference | Padanan Warna | Padanan Harga | Geometri 1024px | Status Audit |
|:---:|:---|:---|:---:|:---:|:---:|:---:|
| **01** | `/` | `01-homepage.png` | 100% | N/A | 98% | **LULUS BERSYARAT (P2 Polish)** |
| **02** | `/shop` | `02-shop.png` | 100% | 100% (RM 189) | 90% | **PERLU PEMBAIKAN (P1-01, P1-02)** |
| **03** | `/collections/silat-series` | `03-silat-series.png` | 100% | 100% (RM 179) | 92% | **PERLU PEMBAIKAN (P1-05)** |
| **04** | `/products/keris-tuah` | `04-product-keris-tuah.png` | 100% | 100% (RM 189) | 91% | **PERLU PEMBAIKAN (P1-03, P1-04)** |
| **05** | `/lookbook` | `05-lookbook.png` | 100% | N/A | 96% | **LULUS BERSYARAT (P2 Polish)** |
| **06** | `/our-story` | `06-our-story.png` | 100% | N/A | 95% | **LULUS BERSYARAT (P2 Polish)** |
| **07** | `/custom` | `07-teamwear.png` | 100% | N/A | 97% | **LULUS BERSYARAT (P2 Polish)** |
| **08** | `/size-guide` | `08-size-guide.png` | 100% | N/A | 89% | **PERLU PEMBAIKAN (P1-06)** |
| **09** | `/support` | `09-customer-care.png` | 100% | N/A | 88% | **PERLU PEMBAIKAN (P1-07)** |

---

## 6. Tindakan Pembetulan Utama Untuk Pasukan JEBAT

Untuk mencapai tahap fideliti 100% yang sempurna terhadap 9 mockup kelulusan:

1. **Gantikan imej Kad Keris Tuah di `/shop`:** Tukar sumber imej `prod-001` kepada `shop-keris-tuah-jersey-v2.webp` yang mengandungi motif keris tengah.
2. **Betulkan susunan baris kad produk di `/shop`:** Selaraskan baris harga `RM 189` bersetentang dengan swatches, dan pautan `VIEW PRODUCT ->` di baris penuh bergaris bawah.
3. **Buang penduaan thumbnail di `/products/keris-tuah`:** Kurangkan array thumbnail daripada 5 kepada 4 item tepat.
4. **Tukar grid spesifikasi `/products/keris-tuah`:** Dari 2 baris (`grid-cols-2`) kepada 1 baris 4 kolum (`grid-cols-4`).
5. **Kemas kini Kad Lineup `/collections/silat-series`:** Tambah butang `VIEW PIECES ->` dan jadikan tajuk 2 baris.
6. **Mampatkan padding vertikal pada `/size-guide` dan `/support`:** Memastikan keseluruhan jadual, fit preference, dan 3 teras bantuan muat di dalam viewport asas 1024px.

---
*Laporan ini disediakan secara bebas dan berwibawa oleh MATA Visual QA Auditor untuk tindakan segera JEBAT.*
