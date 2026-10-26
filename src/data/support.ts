export type SupportCategory = 'orders' | 'shipping' | 'sizing' | 'teamwear';
type Answer = { q: string; a: string };
export const supportAnswers: Record<'en' | 'bm', Record<SupportCategory, Answer[]>> = {
  en: {
    orders: [
      { q: 'How do I choose my size?', a: 'Compare your garment measurements with the Size & Fit Guide. The chart is provisional demo data; final production measurements must be confirmed before ordering.' },
      { q: 'How can I track an order?', a: 'This storefront is a frontend prototype. Checkout does not create an order or a tracking number, and no payment is collected.' },
      { q: 'What is your return policy?', a: 'Returns and exchanges are not available in this prototype. The final policy will be confirmed before the store accepts real orders.' },
      { q: 'Can my club request custom jerseys?', a: 'Yes. Explore the Team & Club Orders form to try selecting a team type and quantity. Submission is simulated locally; no enquiry is sent.' },
    ],
    shipping: [
      { q: 'What are domestic delivery timelines?', a: 'Delivery times and courier partners have not been confirmed. Shipping options here are demonstration content only.' },
      { q: 'Do you ship internationally?', a: 'International destinations and delivery charges will be confirmed before launch. This prototype does not dispatch products.' },
    ],
    sizing: [
      { q: 'Are the fabrics pre-shrunk?', a: 'Final fabric specifications have not been verified for production. Follow the care label supplied with the finished garment.' },
      { q: 'What if my measurements fall between two sizes?', a: 'Compare the chest and length of a jersey you already wear with the provisional chart. Use the fit toggle to compare athletic and relaxed preferences.' },
    ],
    teamwear: [
      { q: 'What is the minimum order quantity (MOQ) for custom teamwear?', a: 'The demo form shows sample quantity bands starting at 10 pieces. Final minimum quantities require confirmation from the team.' },
      { q: 'How long does custom kit production take?', a: 'Production lead times depend on the approved design and quantity. No production schedule or quotation is issued by this prototype.' },
    ],
  },
  bm: {
    orders: [
      { q: 'Bagaimana memilih saiz saya?', a: 'Bandingkan ukuran pakaian anda dengan Panduan Saiz & Padanan. Carta ini ialah data demo sementara; ukuran pengeluaran akhir perlu disahkan sebelum membuat pesanan.' },
      { q: 'Bagaimana menjejak pesanan?', a: 'Kedai ini ialah prototaip frontend. Checkout tidak mencipta pesanan atau nombor penjejakan dan tiada bayaran dikenakan.' },
      { q: 'Apakah polisi pemulangan?', a: 'Pemulangan dan pertukaran tidak tersedia dalam prototaip ini. Polisi akhir akan disahkan sebelum kedai menerima pesanan sebenar.' },
      { q: 'Bolehkah kelab saya meminta jersi khas?', a: 'Ya. Cuba borang Tempahan Pasukan & Kelab untuk memilih jenis pasukan dan kuantiti. Penghantaran disimulasikan secara tempatan; tiada pertanyaan dihantar.' },
    ],
    shipping: [
      { q: 'Berapa lama penghantaran domestik?', a: 'Tempoh penghantaran dan rakan kurier belum disahkan. Pilihan penghantaran di sini adalah kandungan demonstrasi sahaja.' },
      { q: 'Adakah penghantaran antarabangsa tersedia?', a: 'Destinasi antarabangsa dan caj penghantaran akan disahkan sebelum pelancaran. Prototaip ini tidak menghantar produk.' },
    ],
    sizing: [
      { q: 'Adakah fabrik telah diprakecutkan?', a: 'Spesifikasi fabrik akhir belum disahkan untuk pengeluaran. Ikuti label penjagaan yang dibekalkan bersama pakaian siap.' },
      { q: 'Bagaimana jika ukuran saya di antara dua saiz?', a: 'Bandingkan ukuran dada dan panjang jersi sedia ada dengan carta sementara. Gunakan pilihan padanan untuk membandingkan gaya atletik dan santai.' },
    ],
    teamwear: [
      { q: 'Berapakah kuantiti minimum tempahan pasukan?', a: 'Borang demo menunjukkan contoh kuantiti bermula daripada 10 helai. Kuantiti minimum akhir perlu disahkan oleh pasukan.' },
      { q: 'Berapa lama pengeluaran jersi khas?', a: 'Tempoh pengeluaran bergantung pada reka bentuk yang diluluskan dan kuantiti. Prototaip ini tidak mengeluarkan jadual pengeluaran atau sebut harga.' },
    ],
  },
};
