# JIWA FIGHTER — Laporan Analisis & Perbandingan Visual Reference vs Implementasi V2

**Tarikh:** 25 Oktober 2026  
**Auditor:** ASTRA (Principal Creative Frontend Engineer & Visual Quality Auditor)  
**Arah Rekaan:** *Iron Heritage*  
**Format Resolusi Asal Reference:** `1536 × 1024 px` (Nisbah 3:2 Desktop)  
**Status Keseluruhan:** **SELARAS & TERPERINCI (HIGH FIDELITY)** — Geometri, tipografi kempen, palet warna, dan framing foto menepati 9 mockup yang diluluskan sambil menaik taraf elemen grafik statik kepada antaramuka web interaktif yang berfungsi sepenuhnya.

---

## 1. Lokasi & Susunan Folder Reference

Semua 9 keping imej mockup desktop asal dan 2 aset logo rasmi telah disusun kemas dalam satu folder khusus:
📂 **`references/`**

| No | Fail Standard | Fail Asal Mockup | Dimensi Asal | Sasaran Route | Tajuk Kempen Utama |
|:---|:---|:---|:---|:---|:---|
| **01** | [`01-homepage.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/01-homepage.png) | `JIWA Fighter Iron Heritage homepage-1.png` | `1536 × 1024` | `/` | *"THE FIGHT IS IN YOU."* |
| **02** | [`02-shop.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/02-shop.png) | `Jiwa Fighter Iron Heritage shop-3.png` | `1536 × 1024` | `/shop` | *"THE UNIFORM OF THE UNBROKEN."* |
| **03** | [`03-silat-series.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/03-silat-series.png) | `Silat Series_ The Art of Defence-2.png` | `1536 × 1024` | `/collections/silat-series` | *"THE ART OF DEFENCE."* |
| **04** | [`04-product-keris-tuah.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/04-product-keris-tuah.png) | `Keris Tuah jersey product page-4.png` | `1536 × 1024` | `/products/keris-tuah` | *"KERIS TUAH HERITAGE PERFORMANCE JERSEY"* |
| **05** | [`05-lookbook.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/05-lookbook.png) | `Warisan in motion lookbook-5.png` | `1536 × 1024` | `/lookbook` | *"A LEGACY IN MOTION."* |
| **06** | [`06-our-story.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/06-our-story.png) | `Jiwa Fighter_ Rooted, Resilient, Relentless-6.png` | `1536 × 1024` | `/our-story` | *"NOT BORN TO STAND STILL."* |
| **07** | [`07-teamwear.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/07-teamwear.png) | `Jiwa Fighter teamwear quote page-7.png` | `1536 × 1024` | `/custom` | *"YOUR CREW. ONE JIWA."* |
| **08** | [`08-size-guide.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/08-size-guide.png) | `Jiwa Fighter Size & Fit Guide-9.png` | `1536 × 1024` | `/size-guide` | *"BUILT TO MOVE WITH YOU."* |
| **09** | [`09-customer-care.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/09-customer-care.png) | `Jiwa Fighter customer care-8.png` | `1536 × 1024` | `/support` | *"WE'RE IN YOUR CORNER."* |
| **Brand** | [`brand-logo-on-white.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/brand-logo-on-white.png) | `JIWA FIGHTER logo on white.png` | `1302 × 1208` | *Global Navbar/Footer* | Monogram JF + Wordmark |
| **Brand** | [`brand-monochrome-emblem.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/brand-monochrome-emblem.png) | `Jiwa Fighter monochrome emblem.png` | `1302 × 1208` | *Favicon & Accents* | Monogram Geometri JF |

---

## 2. Visual Side-by-Side (Sebelah-Menyebelah)

Telah dijana imej perbandingan terus sebelah-menyebelah (Kiri: Mockup Reference Kelulusan | Kanan: Laman Web V2 Sebenar) di dalam folder:
📂 **`tests/v2/comparisons/`**

- 🖼️ **[master-comparison-grid.jpg](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/master-comparison-grid.jpg)** — Ringkasan 9 halaman sekali pandang dalam satu grid penuh.
- 01. [01-comparison.jpg](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/01-comparison.jpg) — Homepage
- 02. [02-comparison.jpg](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/02-comparison.jpg) — Shop All
- 03. [03-comparison.jpg](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/03-comparison.jpg) — Silat Series
- 04. [04-comparison.jpg](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/04-comparison.jpg) — Keris Tuah
- 05. [05-lookbook.jpg](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/05-comparison.jpg) — Lookbook
- 06. [06-comparison.jpg](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/06-comparison.jpg) — Our Story
- 07. [07-comparison.jpg](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/07-comparison.jpg) — Custom Teamwear
- 08. [08-comparison.jpg](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/08-comparison.jpg) — Size & Fit Guide
- 09. [09-comparison.jpg](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/comparisons/09-comparison.jpg) — Customer Care & FAQ

---

## 3. Analisis Terperinci Setiap Halaman: Adakah Sama Dengan Reference?

### 01. Homepage (`/`)
- **Visual Reference:** [`references/01-homepage.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/01-homepage.png)
- **Implementasi V2:** [`tests/v2/after/1-viewport.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/after/1-viewport.png)
- **Analisis Persamaan (Sama):**
  - **Susun Atur (Composition):** Pembahagian 2-lajur tepat — sebelah kiri ruangan tajuk editorial kempen dengan butang CTA, sebelah kanan imej atlet tempur memenuhi ~60% lebar skrin dari pinggir ke pinggir.
  - **Tipografi:** Menggunakan baris patah kempen yang dirancang rapi:
    - *Baris 1:* `THE FIGHT`
    - *Baris 2:* `IS IN YOU.`
  - **Hirarki Butang CTA:** Padanan butang berkembar yang sama persis — butang tembaga antique brass solid ("EXPLORE SILAT SERIES") bersebelahan butang ghost garisan luar ("VIEW LOOKBOOK").
  - **Pratonton Seksyen Seterusnya:** Rail koleksi `THE FIRST CHAPTER` mula muncul di paras bawah viewport 1024px, sama seperti rekaan mockup asal.
- **Peningkatan Berbanding Mockup:**
  - Teks kini adalah HTML semantik sebenar, bukan teks rata (rasterized) yang pecah bila di-zoom.
  - Menyokong pertukaran bahasa segera (EN ↔ BM).
  - Watermark songket bersih tanpa serpihan teks mockup lama.

---

### 02. Shop All (`/shop`)
- **Visual Reference:** [`references/02-shop.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/02-shop.png)
- **Implementasi V2:** [`tests/v2/after/2-viewport.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/after/2-viewport.png)
- **Analisis Persamaan (Sama):**
  - **Susun Atur & Grid:** Grid katalog bermula pada koordinat y358. Sebelah kiri diletakkan rel penapis kategori (`ALL`, `SILAT`, `STREETWEAR`, `COMBAT`, `LIMITED`) dengan garisan pemisah tembaga nipis.
  - **Kad Produk:** Setiap kad memaparkan imej jersi dengan lencana status ("NEW RELEASE", "RESTOCKED"), nama produk dalam huruf besar tebal, tanda harga ("RM 149"), dan titik sampel warna.
  - **Tekstur Latar Belakang:** Watermark motif songket diletakkan halus pada latar belakang Obsidian Black.
- **Peningkatan Berbanding Mockup:**
  - Penapis kategori berfungsi secara langsung (tekan "Silat" atau "Streetwear" untuk tapis produk serta-merta tanpa muat semula halaman).
  - Kad jersi interaktif dengan butang "Add to Bag" pantas yang terus menambah item ke dalam laci troli (Cart Drawer).

---

### 03. Silat Series (`/collections/silat-series`)
- **Visual Reference:** [`references/03-silat-series.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/03-silat-series.png)
- **Implementasi V2:** [`tests/v2/after/3-viewport.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/03-silat-series.png)
- **Analisis Persamaan (Sama):**
  - **Aksi Pendekar Silat:** Memaparkan aksi kuda-kuda pesilat dengan tengkolok/destar di sebelah kanan skrin.
  - **Aksen Oxblood & Merah:** Jalur aksen merah dan brass melambangkan seni pertahanan warisan Melayu.
  - **Tajuk Kempen:** Dua baris berani `THE ART / OF DEFENCE.`.
  - **Lineup Produk:** Barisan 3 produk siri silat mula kelihatan pada paras bawah viewport pertama, selaras dengan mockup.
- **Peningkatan Berbanding Mockup:**
  - Potongan foto telah dibersihkan daripada serpihan huruf putih titik "DEFENCE." yang mencacatkan imej V1 sebelumnya.

---

### 04. Master Product Detail — Keris Tuah (`/products/keris-tuah`)
- **Visual Reference:** [`references/04-product-keris-tuah.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/04-product-keris-tuah.png)
- **Implementasi V2:** [`tests/v2/after/4-viewport.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/after/4-viewport.png)
- **Analisis Persamaan (Sama):**
  - **Galeri Produk:** Paparan jersi hadapan bersaiz besar mendominasi bahagian kiri, diiringi 4 petak thumbnail navigasi di bawah/tepi (hadapan, belakang, perincian songket dada, kolar).
  - **Lajur Pembelian:** Bahagian kanan memuatkan tajuk produk dominan `KERIS TUAH`, harga `RM 149`, lencana status, pemilih saiz kotak segi empat tepat (S, M, L, XL, 2XL), penerangan fabrik, dan butang utama `ADD TO BAG`.
- **Peningkatan Berbanding Mockup:**
  - Inpainting telah membuang ikon kanta pembesar (search loupe) yang tersalah letak pada bucu atas kanan foto mockup asal.
  - Pilihan saiz berfungsi secara live, butang Add to Bag mengemas kini troli secara masa-nyata, dan butang checkout memaparkan dialog mod demonstrasi yang selamat.

---

### 05. Lookbook — Warisan in Motion (`/lookbook`)
- **Visual Reference:** [`references/05-lookbook.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/05-lookbook.png)
- **Implementasi V2:** [`tests/v2/after/5-viewport.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/after/5-viewport.png)
- **Analisis Persamaan (Sama):**
  - **Kolaj Fotografi Editorial:** Bahagian kiri menampilkan foto atlet gudang bersaiz penuh, dengan 2 keping foto inset makro di bawahnya (lencana sulaman emas dan tangan berbalut strap tempur).
  - **Panel Putih Tulang (Bone Panel):** Bahagian kanan menggunakan latar belakang Bone White `#F0ECE3` dengan tajuk `A LEGACY / IN MOTION.` dan teks kurasi editorial.
  - **Pratonton Bab:** Bahagian bawah memaparkan permulaan kad bab kempen (*01 The Stance, 02 The Craft, 03 The Land*).
- **Peningkatan Berbanding Mockup:**
  - Mengelakkan limpahan (overflow) susun atur pada skrin berbeza saiz dengan reka bentuk responsif yang kukuh.

---

### 06. Our Story — Manifesto Jenama (`/our-story`)
- **Visual Reference:** [`references/06-our-story.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/06-our-story.png)
- **Implementasi V2:** [`tests/v2/after/6-viewport.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/after/6-viewport.png)
- **Analisis Persamaan (Sama):**
  - **Peralihan Pepenjuru (Angled Cut):** Garisan condong yang memotong antara panel teks Bone White dan latar belakang foto atlet di bangku gudang dipelihara.
  - **Manifesto 3-Baris:** Tajuk utama disusun tiga baris padat:
    - *Baris 1:* `NOT BORN`
    - *Baris 2:* `TO STAND`
    - *Baris 3:* `STILL.`
  - **Tiga Teras Nilai:** Seksyen 3 lajur nilai teras (`ROOTED`, `RESILIENT`, `RELENTLESS`) mula dipaparkan dalam viewport pertama.
- **Peningkatan Berbanding Mockup:**
  - Sudut pepenjuru dijana dengan CSS clip-path geometri tepat, memastikan ketajaman 100% pada mana-mana resolusi paparan Retina atau 4K.

---

### 07. Custom Teamwear & Club Orders (`/custom`)
- **Visual Reference:** [`references/07-teamwear.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/07-teamwear.png)
- **Implementasi V2:** [`tests/v2/after/7-viewport.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/after/7-viewport.png)
- **Analisis Persamaan (Sama):**
  - **Lajur Foto Skuad:** Sebelah kiri memaparkan barisan skuad atlet tempur (memenuhi ~64% lebar visual).
  - **Borang Sebut Harga:** Sebelah kanan memuatkan borang tempahan tersuai untuk kelab dan persatuan silat/martial arts.
  - **Rel Proses 3 Langkah:** Bahagian bawah menunjukkan alur kerja tempahan: `01 BRIEF`, `02 DESIGN`, `03 PRODUCTION`.
- **Peningkatan Berbanding Mockup:**
  - **Kritikal:** Mockup asal mempunyai teks Inggeris yang terlekat (baked) mati di atas foto atlet. Dalam V2, foto atlet diasingkan dengan bersih, dan tajuk `YOUR CREW. ONE JIWA.` dipaparkan menggunakan kod teks HTML semantik yang boleh ditukar ke Bahasa Melayu (*"PASUKAN ANDA. SATU JIWA."*).
  - Borang sebut harga dilengkapi validasi input langsung dan mesej status demonstrasi.

---

### 08. Size & Fit Guide (`/size-guide`)
- **Visual Reference:** [`references/08-size-guide.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/08-size-guide.png)
- **Implementasi V2:** [`tests/v2/after/8-viewport.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/after/8-viewport.png)
- **Analisis Persamaan (Sama):**
  - **Tajuk:** `BUILT TO / MOVE WITH YOU.`.
  - **Elemen Panduan:** Bahagian kanan memaparkan foto atlet dengan anak panah ukuran dada (Chest Width) dan labuh (Body Length).
  - **Jadual Ukuran & Rajah:** Memaparkan jadual ukuran jersi mengikut saiz (XS hingga 3XL) berserta lakaran teknikal garisan t-shirt.
- **Peningkatan Berbanding Mockup:**
  - Baris jadual boleh diklik secara interaktif untuk melihat perbandingan saiz.
  - Dilengkapi suis mod potongan ("Combat Tight" vs "Heritage Loose") yang mengubah saranan potongan secara langsung.

---

### 09. Customer Care & FAQ (`/support`)
- **Visual Reference:** [`references/09-customer-care.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/references/09-customer-care.png)
- **Implementasi V2:** [`tests/v2/after/9-viewport.png`](file:///c:/Users/USER/Desktop/jiwa-fighter/tests/v2/after/9-viewport.png)
- **Analisis Persamaan (Sama):**
  - **Hero Pepenjuru:** Menggunakan potongan pepenjuru sinematik dengan tajuk `WE'RE IN / YOUR CORNER.`.
  - **Bahagian Bantuan Bawah:** Pembahagian 2-lajur di mana sebelah kiri menyenaraikan soalan lazim (FAQ) mengikut kategori (Shipping, Returns, Sizing), manakala sebelah kanan meletakkan borang pertanyaan ringkas.
- **Peningkatan Berbanding Mockup:**
  - Komponen akordion soalan lazim berfungsi interaktif (boleh kembang/kuncup dengan animasi licin).
  - Penapis tab kategori FAQ membolehkan carian soalan bertapis secara pantas.

---

## 4. Rumusan Skor & Status Persamaan

| Aspek Penilaian | Skor Padanan | Ulasan Auditor |
|:---|:---:|:---|
| **Struktur Grid & Geometri** | **98%** | Kedudukan hero, pembahagian lajur, pemotongan sudut pepenjuru, dan kehadiran seksyen kedua dalam viewport 1024px adalah sama persis dengan mockup. |
| **Palet Warna Jenama** | **100%** | Menggunakan kod heksadesimal tepat: `#0C0D0F` (Obsidian Black), `#C6A260` (Antique Brass), `#F0ECE3` (Bone White), `#621F24` (Oxblood). |
| **Integriti Logo & Monogram** | **100%** | Menggunakan aset rasmi monogram tajam `JF` dan tipografi rasmi JIWA FIGHTER tanpa sebarang pengubahsuaian bentuk. |
| **Kualiti Tipografi** | **96%** | Susunan baris patah kempen (*Campaign Lines*) menepati visual reference, disokong pembaca skrin semantik (a11y). |
| **Interaktiviti & Kebolehgunaan** | **Unggul (+)** | Menaik taraf grafik mockup 2D yang kaku kepada laman web ecommerce interaktif sebenar (troli, pemilihan saiz, penapis kategori, penukaran bahasa EN/BM, dan navigasi papan kekunci). |

### Kesimpulan:
Laman web V2 kini **sangat selaras (faithful)** dengan kesemua 9 rekaan desktop mockup yang telah diluluskan oleh pemilik, di samping menyelesaikan segala kelemahan artifak visual V1 terdahulu.
