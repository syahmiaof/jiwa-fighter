export type SatriaLanguage = 'en' | 'bm';
export type SatriaCategory = 'brand' | 'products' | 'sizing' | 'purchasing' | 'shipping' | 'teamwear';
export type SatriaVerification = 'site-copy' | 'catalog-derived' | 'pending-confirmation';

export interface SatriaFaq {
  id: string;
  category: SatriaCategory;
  question: Record<SatriaLanguage, string>;
  answer: Record<SatriaLanguage, string>;
  aliases: Record<SatriaLanguage, string[]>;
  href: string;
  verification: SatriaVerification;
}

export const SATRIA_FAQ: SatriaFaq[] = [
  {
    id: 'brand-01', category: 'brand',
    question: { en: 'What is JIWA FIGHTER?', bm: 'Apa itu JIWA FIGHTER?' },
    answer: { en: 'JIWA FIGHTER is presented on this site as Malaysian combatwear and heritage streetwear, built around discipline, movement and identity.', bm: 'JIWA FIGHTER dipaparkan di laman ini sebagai pakaian tempur dan streetwear warisan Malaysia, dengan fokus pada disiplin, pergerakan dan jati diri.' },
    aliases: { en: ['about jiwa fighter', 'what does the brand make', 'brand'], bm: ['tentang jiwa fighter', 'jenama apa', 'cerita jenama'] }, href: '/our-story', verification: 'site-copy',
  },
  {
    id: 'brand-02', category: 'brand',
    question: { en: 'What values does the brand highlight?', bm: 'Apakah nilai yang diketengahkan oleh jenama ini?' },
    answer: { en: 'The site highlights discipline, heritage, movement and identity. For the brand story, visit Our Story.', bm: 'Laman ini mengetengahkan disiplin, warisan, pergerakan dan jati diri. Untuk cerita jenama, lawati halaman Kisah Kami.' },
    aliases: { en: ['brand values', 'what do you stand for'], bm: ['nilai jenama', 'prinsip jenama', 'apa yang diperjuangkan'] }, href: '/our-story', verification: 'site-copy',
  },
  {
    id: 'brand-03', category: 'brand',
    question: { en: 'Where can I read the JIWA FIGHTER story?', bm: 'Di mana saya boleh baca kisah JIWA FIGHTER?' },
    answer: { en: 'The brand story is available on the Our Story page.', bm: 'Kisah jenama tersedia di halaman Kisah Kami.' },
    aliases: { en: ['brand history', 'heritage story'], bm: ['sejarah jenama', 'kisah warisan'] }, href: '/our-story', verification: 'site-copy',
  },
  {
    id: 'brand-04', category: 'brand',
    question: { en: 'What does “Iron Heritage” mean here?', bm: 'Apa maksud “Iron Heritage” di sini?' },
    answer: { en: '“Iron Heritage” is the site’s brand phrase for combining heritage references with modern movement. It is not a certification or material claim.', bm: '“Iron Heritage” ialah frasa jenama di laman ini yang menggabungkan rujukan warisan dengan pergerakan moden. Ia bukan pensijilan atau dakwaan bahan.' },
    aliases: { en: ['iron heritage meaning', 'brand tagline'], bm: ['maksud iron heritage', 'slogan jenama'] }, href: '/our-story', verification: 'site-copy',
  },
  {
    id: 'brand-05', category: 'brand',
    question: { en: 'Where can I contact the team?', bm: 'Di mana saya boleh hubungi pasukan?' },
    answer: { en: 'Use the form on the Support page. This demo does not send messages or confirm that a request was received.', bm: 'Gunakan borang di halaman Sokongan. Demo ini tidak menghantar mesej atau mengesahkan penerimaan permintaan.' },
    aliases: { en: ['contact support', 'talk to the team', 'customer service'], bm: ['hubungi sokongan', 'khidmat pelanggan', 'nak bercakap dengan team'] }, href: '/support', verification: 'site-copy',
  },

  {
    id: 'product-01', category: 'products',
    question: { en: 'What is the Keris Tuah jersey?', bm: 'Apa itu jersi Keris Tuah?' },
    answer: { en: 'Keris Tuah is a JIWA FIGHTER jersey shown in the Drop 001 catalog. The product page lists its displayed price as RM 189; confirm current availability through the official store before ordering.', bm: 'Keris Tuah ialah jersi JIWA FIGHTER dalam katalog Drop 001. Halaman produk memaparkan harga RM 189; semak ketersediaan semasa di kedai rasmi sebelum membuat pesanan.' },
    aliases: { en: ['keris tuah', 'keris jersey', 'tuah shirt'], bm: ['jersi keris tuah', 'baju keris', 'harga keris tuah'] }, href: '/products/keris-tuah', verification: 'catalog-derived',
  },
  {
    id: 'product-02', category: 'products',
    question: { en: 'What products are in Drop 001?', bm: 'Apakah produk dalam Drop 001?' },
    answer: { en: 'The current demo catalog lists Keris Tuah Jersey, Heritage Jersey and Silat Jersey among its featured Drop 001 pieces. The catalog is not a live stock feed.', bm: 'Katalog demo semasa menyenaraikan Keris Tuah Jersey, Heritage Jersey dan Silat Jersey sebagai antara pilihan Drop 001. Katalog ini bukan suapan stok langsung.' },
    aliases: { en: ['drop 001 products', 'first drop', 'chapter one'], bm: ['produk drop 001', 'drop pertama', 'bab pertama'] }, href: '/shop', verification: 'catalog-derived',
  },
  {
    id: 'product-03', category: 'products',
    question: { en: 'Where can I browse the Silat Series?', bm: 'Di mana saya boleh lihat Silat Series?' },
    answer: { en: 'Browse the Silat Series collection page for the products currently shown in this demo.', bm: 'Lihat halaman koleksi Silat Series untuk produk yang dipaparkan dalam demo ini.' },
    aliases: { en: ['silat collection', 'silat series products'], bm: ['koleksi silat', 'produk silat series'] }, href: '/collections/silat-series', verification: 'catalog-derived',
  },
  {
    id: 'product-04', category: 'products',
    question: { en: 'What is the displayed price of Keris Tuah?', bm: 'Berapakah harga yang dipaparkan untuk Keris Tuah?' },
    answer: { en: 'The Keris Tuah product page currently displays RM 189. Treat this as the demo catalog price; confirm the live store before purchasing.', bm: 'Halaman produk Keris Tuah kini memaparkan RM 189. Anggap ini sebagai harga katalog demo; semak kedai langsung sebelum membeli.' },
    aliases: { en: ['keris price', 'how much keris tuah', 'rm 189'], bm: ['harga jersi keris', 'berapa harga keris', 'harga rm 189'] }, href: '/products/keris-tuah', verification: 'catalog-derived',
  },
  {
    id: 'product-05', category: 'products',
    question: { en: 'Where can I see product images and details?', bm: 'Di mana saya boleh lihat gambar dan butiran produk?' },
    answer: { en: 'Open the relevant product page from Shop or Collections. Product images, displayed details and demo selectors are shown there.', bm: 'Buka halaman produk berkaitan melalui Kedai atau Koleksi. Gambar, butiran yang dipaparkan dan pemilih demo ada di sana.' },
    aliases: { en: ['product photos', 'jersey details', 'see products'], bm: ['gambar jersi', 'butiran produk', 'lihat produk'] }, href: '/shop', verification: 'catalog-derived',
  },

  {
    id: 'size-01', category: 'sizing',
    question: { en: 'Where is the size guide?', bm: 'Di mana panduan saiz?' },
    answer: { en: 'Open the Size Guide page for the measurement table and measuring instructions.', bm: 'Buka halaman Panduan Saiz untuk jadual ukuran dan arahan mengukur.' },
    aliases: { en: ['size chart', 'sizing chart', 'jersey sizes'], bm: ['carta saiz', 'jadual saiz', 'saiz jersi'] }, href: '/size-guide', verification: 'catalog-derived',
  },
  {
    id: 'size-02', category: 'sizing',
    question: { en: 'How do I measure my chest?', bm: 'Macam mana nak ukur dada?' },
    answer: { en: 'Follow the chest-width diagram and instructions on the Size Guide page. Compare the garment measurement with a shirt that fits you; the page does not provide body-measurement guarantees.', bm: 'Ikut rajah dan arahan ukuran dada di halaman Panduan Saiz. Bandingkan ukuran pakaian dengan baju yang selesa dipakai; halaman ini tidak menjamin ukuran badan.' },
    aliases: { en: ['measure chest', 'chest measurement', 'how to measure'], bm: ['ukur dada', 'ukuran dada', 'cara ukur baju'] }, href: '/size-guide', verification: 'catalog-derived',
  },
  {
    id: 'size-03', category: 'sizing',
    question: { en: 'What sizes are shown for the jerseys?', bm: 'Saiz apa yang dipaparkan untuk jersi?' },
    answer: { en: 'The demo product selectors show S, M, L, XL and XXL. This does not confirm stock availability in any size.', bm: 'Pemilih produk demo memaparkan S, M, L, XL dan XXL. Ini tidak mengesahkan stok bagi mana-mana saiz.' },
    aliases: { en: ['available sizes', 'size options', 'small to xxl'], bm: ['pilihan saiz', 'saiz tersedia', 'saiz s hingga xxl'] }, href: '/size-guide', verification: 'catalog-derived',
  },
  {
    id: 'size-04', category: 'sizing',
    question: { en: 'Should I choose a relaxed or athletic fit?', bm: 'Patut pilih potongan santai atau atletik?' },
    answer: { en: 'Use the fit preference guidance on the Size Guide page, then compare measurements with a garment you already own. The best size cannot be confirmed without your measurements and the final garment chart.', bm: 'Gunakan panduan pilihan potongan di halaman Panduan Saiz, kemudian bandingkan ukuran dengan pakaian yang anda miliki. Saiz tepat tak boleh disahkan tanpa ukuran anda dan carta pakaian akhir.' },
    aliases: { en: ['fit recommendation', 'relaxed fit', 'athletic fit'], bm: ['cadangan potongan', 'fit santai', 'fit atletik'] }, href: '/size-guide', verification: 'catalog-derived',
  },
  {
    id: 'size-05', category: 'sizing',
    question: { en: 'Can you guarantee which size will fit me?', bm: 'Boleh jamin saiz mana yang sesuai untuk saya?' },
    answer: { en: 'No fit can be guaranteed from this demo. Compare the measurements on the Size Guide page and check with the team through Support if you need help.', bm: 'Demo ini tak boleh menjamin kesesuaian saiz. Bandingkan ukuran di halaman Panduan Saiz dan hubungi pasukan melalui Sokongan jika perlukan bantuan.' },
    aliases: { en: ['will size fit', 'size guarantee', 'help pick size'], bm: ['saiz sesuai tak', 'jamin saiz', 'tolong pilih saiz'] }, href: '/size-guide', verification: 'pending-confirmation',
  },

  {
    id: 'buy-01', category: 'purchasing',
    question: { en: 'How do I add a product to my bag?', bm: 'Macam mana nak masukkan produk ke beg?' },
    answer: { en: 'On a product page, select a displayed size and color, then choose Add to Bag. The current storefront is a front-end demo; checkout does not charge a payment method.', bm: 'Di halaman produk, pilih saiz dan warna yang dipaparkan, kemudian tekan Masuk Beg. Kedai ini ialah demo frontend; checkout tidak mengenakan bayaran.' },
    aliases: { en: ['add to cart', 'shopping bag', 'buy product'], bm: ['tambah ke troli', 'masuk beg', 'beli produk'] }, href: '/shop', verification: 'site-copy',
  },
  {
    id: 'buy-02', category: 'purchasing',
    question: { en: 'Is checkout a real purchase?', bm: 'Adakah checkout ini pembelian sebenar?' },
    answer: { en: 'No. Checkout in this storefront is a simulation. No payment is taken and no order is created.', bm: 'Tidak. Checkout di kedai ini ialah simulasi. Tiada bayaran dikenakan dan tiada pesanan dibuat.' },
    aliases: { en: ['real checkout', 'is payment live', 'place real order'], bm: ['checkout sebenar', 'bayaran live', 'buat order betul'] }, href: '/support', verification: 'site-copy',
  },
  {
    id: 'buy-03', category: 'purchasing',
    question: { en: 'Can Satria confirm my order or payment?', bm: 'Bolehkah Satria sahkan pesanan atau bayaran saya?' },
    answer: { en: 'No. Satria cannot access order or payment records, and this demo does not create real orders. Use the official Support page for verified store assistance.', bm: 'Tidak. Satria tiada akses kepada rekod pesanan atau bayaran, dan demo ini tidak membuat pesanan sebenar. Gunakan halaman Sokongan rasmi untuk bantuan kedai yang disahkan.' },
    aliases: { en: ['track my order', 'payment received', 'order status'], bm: ['jejak pesanan', 'bayaran diterima', 'status order'] }, href: '/support', verification: 'site-copy',
  },
  {
    id: 'buy-04', category: 'purchasing',
    question: { en: 'Does the demo show live stock?', bm: 'Adakah demo tunjuk stok langsung?' },
    answer: { en: 'No. Product cards and size selectors are demonstration content, not a live inventory connection. Current stock status is unconfirmed.', bm: 'Tidak. Kad produk dan pemilih saiz ialah kandungan demo, bukan sambungan inventori langsung. Status stok semasa belum disahkan.' },
    aliases: { en: ['in stock', 'stock availability', 'available now'], bm: ['ada stok', 'stok tersedia', 'boleh beli sekarang'] }, href: '/shop', verification: 'pending-confirmation',
  },
  {
    id: 'buy-05', category: 'purchasing',
    question: { en: 'Is the product page price final?', bm: 'Adakah harga di halaman produk harga akhir?' },
    answer: { en: 'Prices shown belong to the demo catalog and are not payment quotes. Confirm final pricing on the official store before a real purchase.', bm: 'Harga yang dipaparkan ialah harga katalog demo dan bukan sebut harga bayaran. Sahkan harga akhir di kedai rasmi sebelum pembelian sebenar.' },
    aliases: { en: ['final price', 'price confirmation', 'is rm 189 final'], bm: ['harga akhir', 'sahkan harga', 'harga rm 189 muktamad'] }, href: '/support', verification: 'pending-confirmation',
  },

  {
    id: 'ship-01', category: 'shipping',
    question: { en: 'How much is shipping?', bm: 'Berapakah caj penghantaran?' },
    answer: { en: 'Shipping fees have not been confirmed in this project. Check the official store or ask through Support before ordering.', bm: 'Caj penghantaran belum disahkan dalam projek ini. Semak kedai rasmi atau tanya melalui Sokongan sebelum membuat pesanan.' },
    aliases: { en: ['delivery fee', 'postage cost', 'shipping cost'], bm: ['kos pos', 'caj pos', 'harga penghantaran'] }, href: '/support', verification: 'pending-confirmation',
  },
  {
    id: 'ship-02', category: 'shipping',
    question: { en: 'How long does delivery take?', bm: 'Berapa lama penghantaran?' },
    answer: { en: 'Delivery timing has not been confirmed. Satria cannot promise an arrival date; check the official store or Support for current information.', bm: 'Tempoh penghantaran belum disahkan. Satria tak boleh menjanjikan tarikh tiba; semak kedai rasmi atau Sokongan untuk maklumat semasa.' },
    aliases: { en: ['delivery time', 'when will it arrive', 'shipping duration'], bm: ['tempoh pos', 'bila sampai', 'berapa hari penghantaran'] }, href: '/support', verification: 'pending-confirmation',
  },
  {
    id: 'ship-03', category: 'shipping',
    question: { en: 'Do you ship outside Malaysia?', bm: 'Adakah penghantaran ke luar Malaysia?' },
    answer: { en: 'International shipping coverage has not been confirmed. Ask through the official Support page before placing an order.', bm: 'Liputan penghantaran antarabangsa belum disahkan. Tanya melalui halaman Sokongan rasmi sebelum membuat pesanan.' },
    aliases: { en: ['international shipping', 'ship overseas', 'deliver abroad'], bm: ['pos luar negara', 'hantar overseas', 'penghantaran antarabangsa'] }, href: '/support', verification: 'pending-confirmation',
  },
  {
    id: 'ship-04', category: 'shipping',
    question: { en: 'What is the return or exchange policy?', bm: 'Apakah polisi pemulangan atau pertukaran?' },
    answer: { en: 'Return and exchange eligibility has not been confirmed. Please check the official store or contact Support; Satria will not promise an exception or refund.', bm: 'Kelayakan pemulangan dan pertukaran belum disahkan. Semak kedai rasmi atau hubungi Sokongan; Satria tidak akan menjanjikan pengecualian atau bayaran balik.' },
    aliases: { en: ['return policy', 'refund', 'exchange size', 'send item back'], bm: ['polisi pulangan', 'refund', 'tukar saiz', 'pulangkan barang'] }, href: '/support', verification: 'pending-confirmation',
  },
  {
    id: 'ship-05', category: 'shipping',
    question: { en: 'Can you track my parcel?', bm: 'Boleh semak tracking parcel saya?' },
    answer: { en: 'Satria cannot access parcel or order tracking. This demo does not create real orders. Contact the official store through Support for order-specific help.', bm: 'Satria tiada akses kepada tracking parcel atau pesanan. Demo ini tidak membuat pesanan sebenar. Hubungi kedai rasmi melalui Sokongan untuk bantuan pesanan.' },
    aliases: { en: ['tracking number', 'parcel status', 'where is my parcel'], bm: ['nombor tracking', 'status parcel', 'parcel saya dekat mana'] }, href: '/support', verification: 'site-copy',
  },

  {
    id: 'team-01', category: 'teamwear',
    question: { en: 'Can my club request custom teamwear?', bm: 'Bolehkah kelab saya minta teamwear custom?' },
    answer: { en: 'The site provides a Custom Teamwear request form. It is a demo form and does not submit a live quotation.', bm: 'Laman ini menyediakan borang permintaan Teamwear Custom. Borang ini demo dan tidak menghantar sebut harga sebenar.' },
    aliases: { en: ['custom jerseys', 'club shirts', 'team kit'], bm: ['jersi custom', 'baju kelab', 'uniform team'] }, href: '/custom', verification: 'site-copy',
  },
  {
    id: 'team-02', category: 'teamwear',
    question: { en: 'How do I request a teamwear quote?', bm: 'Macam mana nak minta sebut harga teamwear?' },
    answer: { en: 'Use the request form on the Custom page. No message or quote is sent from this demo, so use the official contact channel for a real request.', bm: 'Gunakan borang permintaan di halaman Custom. Demo ini tidak menghantar mesej atau sebut harga; gunakan saluran hubungan rasmi untuk permintaan sebenar.' },
    aliases: { en: ['teamwear quote', 'custom quote', 'pricing request'], bm: ['sebut harga teamwear', 'harga custom', 'minta quotation'] }, href: '/custom', verification: 'site-copy',
  },
  {
    id: 'team-03', category: 'teamwear',
    question: { en: 'What information does the custom form request?', bm: 'Maklumat apa yang diminta oleh borang custom?' },
    answer: { en: 'The demo form asks for contact, team and project details such as team name, kit type and estimated quantity. These fields do not guarantee production or pricing.', bm: 'Borang demo meminta maklumat hubungan, pasukan dan projek seperti nama pasukan, jenis kit dan anggaran kuantiti. Maklumat ini tidak menjamin pengeluaran atau harga.' },
    aliases: { en: ['custom order requirements', 'teamwear form fields', 'what details are needed'], bm: ['syarat tempahan custom', 'maklumat borang teamwear', 'butiran diperlukan'] }, href: '/custom', verification: 'site-copy',
  },
  {
    id: 'team-04', category: 'teamwear',
    question: { en: 'Is there a minimum order quantity for teamwear?', bm: 'Ada minimum kuantiti untuk teamwear?' },
    answer: { en: 'A minimum order quantity has not been confirmed. Ask the team through the official contact channel before planning an order.', bm: 'Kuantiti minimum belum disahkan. Tanya pasukan melalui saluran hubungan rasmi sebelum merancang pesanan.' },
    aliases: { en: ['minimum quantity', 'minimum order', 'MOQ'], bm: ['kuantiti minimum', 'order minimum', 'MOQ'] }, href: '/custom', verification: 'pending-confirmation',
  },
  {
    id: 'team-05', category: 'teamwear',
    question: { en: 'How long does custom teamwear production take?', bm: 'Berapa lama teamwear custom disiapkan?' },
    answer: { en: 'Custom production timing has not been confirmed. Satria cannot promise a production or delivery date; request current details through the official contact channel.', bm: 'Tempoh pengeluaran custom belum disahkan. Satria tak boleh menjanjikan tarikh siap atau hantar; minta maklumat semasa melalui saluran hubungan rasmi.' },
    aliases: { en: ['custom lead time', 'teamwear production time', 'when will custom jerseys be ready'], bm: ['tempoh teamwear custom', 'masa pengeluaran', 'bila jersi custom siap'] }, href: '/custom', verification: 'pending-confirmation',
  },
];
