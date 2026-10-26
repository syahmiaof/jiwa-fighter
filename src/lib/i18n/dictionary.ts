export type Language = 'en' | 'bm';

export interface TranslationDictionary {
  nav: {
    home: string;
    shop: string;
    collections: string;
    lookbook: string;
    ourStory: string;
    custom: string;
    searchPlaceholder: string;
    bag: string;
  };
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    checkout: string;
    demoNotice: string;
    remove: string;
    qty: string;
    size: string;
    continueShopping: string;
  };
  home: {
    chapter: string;
    heroHeadline: string;
    heroSubtext: string;
    exploreDrop: string;
    discoverStory: string;
    collectionsKicker: string;
    firstChapterTitle: string;
    firstChapterDesc: string;
    apparel: string;
    training: string;
    accessories: string;
    viewPieces: string;
  };
  shop: {
    breadcrumb: string;
    headline: string;
    subtitle: string;
    tagline: string;
    piecesCount: string;
    filterCollection: string;
    filterCategory: string;
    filterSize: string;
    filterColor: string;
    sortBy: string;
    sortFeatured: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    viewProduct: string;
  };
  collections: {
    heroKicker: string;
    heroHeadline: string;
    badge: string;
    heroSubtext: string;
    exploreBtn: string;
    featuredKicker: string;
    featuredTitle: string;
    featuredDesc: string;
    trainingJersey: string;
    heritageJersey: string;
    sleeveDetail: string;
    cultureDetailText: string;
    viewPieces: string;
  };
  product: {
    breadcrumb: string;
    dropKicker: string;
    title: string;
    subtitle: string;
    price: string;
    story: string;
    color: string;
    size: string;
    sizeGuide: string;
    addToBag: string;
    reservePreorder: string;
    specs: {
      fabric: string;
      performance: string;
      versatility: string;
      origin: string;
    };
    shippingTitle: string;
    shippingDesc: string;
    careTitle: string;
    careDesc: string;
  };
  lookbook: {
    editorialKicker: string;
    headline: string;
    subhead: string;
    description: string;
    enterStory: string;
    exploreCampaign: string;
    campaignSubtext: string;
    fighterTitle: string;
    fighterDesc: string;
    craftTitle: string;
    craftDesc: string;
    landTitle: string;
    landDesc: string;
  };
  story: {
    kicker: string;
    headline: string;
    description: string;
    exploreValues: string;
    rootedTitle: string;
    rootedSub: string;
    rootedDesc: string;
    resilientTitle: string;
    resilientSub: string;
    resilientDesc: string;
    relentlessTitle: string;
    relentlessSub: string;
    relentlessDesc: string;
  };
  custom: {
    kicker: string;
    headline: string;
    subtext: string;
    formKicker: string;
    formTitle: string;
    orgName: string;
    orgPlaceholder: string;
    contactEmail: string;
    emailPlaceholder: string;
    teamType: string;
    selectTeamType: string;
    martialArts: string;
    muayThai: string;
    silatClub: string;
    sportingCommunity: string;
    estimatedQty: string;
    selectQty: string;
    qtySmall: string;
    qtyMedium: string;
    qtyLarge: string;
    message: string;
    messagePlaceholder: string;
    submitBtn: string;
    submitting: string;
    demoAlert: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  sizeGuide: {
    breadcrumb: string;
    headline: string;
    kicker: string;
    subtext: string;
    chartTitle: string;
    chartUnits: string;
    sizeCol: string;
    chestCol: string;
    lengthCol: string;
    howToMeasure: string;
    getRightFit: string;
    chestMeasureTitle: string;
    chestMeasureDesc: string;
    lengthMeasureTitle: string;
    lengthMeasureDesc: string;
    fitPrefTitle: string;
    fitPrefSub: string;
    athleticFit: string;
    athleticDesc: string;
    relaxedFit: string;
    relaxedDesc: string;
  };
  support: {
    kicker: string;
    headline: string;
    subtext: string;
    searchPlaceholder: string;
    faqKicker: string;
    faqTitle: string;
    tabOrders: string;
    tabShipping: string;
    tabSizing: string;
    tabTeamwear: string;
    contactKicker: string;
    contactTitle: string;
    contactDesc: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    sendEnquiry: string;
    demoAlert: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: 'HOME',
      shop: 'SHOP',
      collections: 'COLLECTIONS',
      lookbook: 'LOOKBOOK',
      ourStory: 'OUR STORY',
      custom: 'CUSTOM',
      searchPlaceholder: 'Search collections, apparel...',
      bag: 'Bag',
    },
    cart: {
      title: 'SHOPPING BAG',
      empty: 'Your shopping bag is empty.',
      subtotal: 'SUBTOTAL',
      checkout: 'PROCEED TO CHECKOUT →',
      demoNotice: 'Prototype Notice: This is a frontend demo. No real payments or orders are processed.',
      remove: 'Remove',
      qty: 'QTY',
      size: 'SIZE',
      continueShopping: 'CONTINUE BROWSING',
    },
    home: {
      chapter: 'JIWA FIGHTER / CHAPTER 001',
      heroHeadline: 'THE FIGHT IS IN YOU.',
      heroSubtext: 'BORN FROM HERITAGE. MADE FOR MOVEMENT.',
      exploreDrop: 'EXPLORE DROP 001',
      discoverStory: 'DISCOVER OUR STORY',
      collectionsKicker: 'OUR COLLECTIONS',
      firstChapterTitle: 'THE FIRST CHAPTER',
      firstChapterDesc: 'Modern combatwear. Timeless heritage. Engineered for those who move forward.',
      apparel: 'APPAREL',
      training: 'TRAINING ESSENTIALS',
      accessories: 'ACCESSORIES',
      viewPieces: 'VIEW PIECES',
    },
    shop: {
      breadcrumb: 'HOME / SHOP',
      headline: 'THE UNIFORM OF THE UNBROKEN.',
      subtitle: 'Discover every chapter of JIWA FIGHTER.',
      tagline: 'MALAYSIAN HERITAGE. MODERN MOVEMENT.',
      piecesCount: 'PIECES',
      filterCollection: 'COLLECTION',
      filterCategory: 'CATEGORY',
      filterSize: 'SIZE',
      filterColor: 'COLOR',
      sortBy: 'SORT',
      sortFeatured: 'FEATURED',
      sortPriceLow: 'PRICE: LOW TO HIGH',
      sortPriceHigh: 'PRICE: HIGH TO LOW',
      viewProduct: 'VIEW PRODUCT',
    },
    collections: {
      heroKicker: 'COLLECTION / 02',
      heroHeadline: 'THE ART OF DEFENCE.',
      badge: 'SILAT SERIES',
      heroSubtext: 'EVERY MOVEMENT CARRIES MEMORY. EVERY STANCE CARRIES INTENT.',
      exploreBtn: 'EXPLORE COLLECTION',
      featuredKicker: 'FEATURED IN THIS SERIES',
      featuredTitle: 'SILAT SERIES',
      featuredDesc: 'Modern combatwear inspired by a timeless Malay martial art. Engineered for movement. Rooted in heritage. Built for today.',
      trainingJersey: 'SILAT TRAINING JERSEY',
      heritageJersey: 'SILAT HERITAGE JERSEY',
      sleeveDetail: 'DETAILS THAT CARRY CULTURE.',
      cultureDetailText: 'Intricate songket filigree crafted for performance resilience.',
      viewPieces: 'VIEW PIECES',
    },
    product: {
      breadcrumb: 'SHOP / HERITAGE / KERIS TUAH',
      dropKicker: 'DROP 001 / LIMITED SERIES',
      title: 'KERIS TUAH',
      subtitle: 'HERITAGE PERFORMANCE JERSEY',
      price: 'RM 189.00',
      story: 'Forged in memory. Worn in motion. The Keris Tuah Jersey draws from a legacy of strength, discipline and purpose. Tradition in our roots. Movement in our future.',
      color: 'COLOUR',
      size: 'SIZE',
      sizeGuide: 'SIZE & FIT GUIDE',
      addToBag: 'ADD TO BAG',
      reservePreorder: 'RESERVE / PRE-ORDER',
      specs: {
        fabric: '190 GSM POLY-SPANDEX',
        performance: 'BREATHABLE & QUICK DRY',
        versatility: 'TRAINING & LIFESTYLE',
        origin: 'MALAYSIAN BORN BRAND',
      },
      shippingTitle: 'SHIPPING & RETURNS',
      shippingDesc: 'Standard domestic delivery takes 2–4 working days. Express and international dispatch available. 14-day hassle-free exchange on unused items with tags.',
      careTitle: 'CARE INSTRUCTIONS',
      careDesc: 'Machine wash cold inside out with similar colors. Do not bleach or tumble dry. Cool iron inside out. Do not iron directly on metallic songket graphics.',
    },
    lookbook: {
      editorialKicker: 'EDITORIAL NO. 001',
      headline: 'A LEGACY IN MOTION.',
      subhead: '/ WARISAN IN MOTION',
      description: 'What we inherit is not meant to stand still. We carry it forward.',
      enterStory: 'ENTER THE STORY',
      exploreCampaign: 'EXPLORE THE CAMPAIGN',
      campaignSubtext: 'Three perspectives. One ongoing story of heritage, discipline and what moves us forward.',
      fighterTitle: 'THE FIGHTER',
      fighterDesc: 'Roots in movement.',
      craftTitle: 'THE CRAFT',
      craftDesc: 'Details with meaning.',
      landTitle: 'THE LAND',
      landDesc: 'A future we build.',
    },
    story: {
      kicker: 'THE JIWA / OUR STORY',
      headline: 'NOT BORN TO STAND STILL.',
      description: 'From Malaysia. Inspired by heritage. Defined by the spirit to move forward.',
      exploreValues: 'EXPLORE OUR VALUES',
      rootedTitle: 'ROOTED',
      rootedSub: 'WE CARRY OUR HERITAGE FORWARD.',
      rootedDesc: 'Inspired by the strength, craftsmanship and culture of Malaysia, we build with purpose and pride.',
      resilientTitle: 'RESILIENT',
      resilientSub: 'WE RISE THROUGH DISCIPLINE.',
      resilientDesc: 'Built for those who face challenges, adapt and keep moving, in training, in life, and beyond.',
      relentlessTitle: 'RELENTLESS',
      relentlessSub: 'WE MOVE FOR A BIGGER TOMORROW.',
      relentlessDesc: 'A mindset to go further. To keep evolving. To never settle. Because progress lives in motion.',
    },
    custom: {
      kicker: 'JIWA FIGHTER / TEAM & CLUB ORDERS',
      headline: 'YOUR CREW. ONE JIWA.',
      subtext: 'CUSTOM TEAMWEAR BUILT AROUND YOUR IDENTITY.',
      formKicker: 'BUILD YOUR TEAM KIT',
      formTitle: 'Tell us what your team needs.',
      orgName: 'ORGANISATION NAME',
      orgPlaceholder: 'e.g. Kelab Silat Warisan',
      contactEmail: 'CONTACT EMAIL',
      emailPlaceholder: 'you@organisation.com',
      teamType: 'TEAM TYPE',
      selectTeamType: 'Select team type',
      martialArts: 'Silat / Traditional Martial Arts',
      muayThai: 'Muay Thai / Kickboxing Club',
      silatClub: 'MMA / Combat Sports Academy',
      sportingCommunity: 'Athletic / Community Group',
      estimatedQty: 'ESTIMATED QUANTITY',
      selectQty: 'Select estimated quantity',
      qtySmall: '10 – 25 pieces',
      qtyMedium: '26 – 50 pieces',
      qtyLarge: '50+ pieces',
      message: 'MESSAGE',
      messagePlaceholder: 'Tell us about your team, design ideas, event or any specific requirements...',
      submitBtn: 'REQUEST QUOTATION',
      submitting: 'SUBMITTING...',
      demoAlert: 'DEMO ONLY — Request has not been sent. No real email or submission occurred.',
      step1Title: 'BRIEF',
      step1Desc: 'Tell us about your team, discipline and kit requirements.',
      step2Title: 'DESIGN',
      step2Desc: 'Our team will suggest design directions that reflect your identity.',
      step3Title: 'PRODUCTION',
      step3Desc: 'Once confirmed, we move to production with quality you can trust.',
    },
    sizeGuide: {
      breadcrumb: 'HOME / SIZE & FIT GUIDE',
      headline: 'BUILT TO MOVE WITH YOU.',
      kicker: 'SIZE & FIT GUIDE / GET THE RIGHT FIT FIRST TIME.',
      subtext: 'Find your fit. Move with confidence.',
      chartTitle: 'JERSEY SIZE CHART',
      chartUnits: 'ILLUSTRATIVE MEASUREMENTS / CM',
      sizeCol: 'SIZE',
      chestCol: 'CHEST (CM)',
      lengthCol: 'LENGTH (CM)',
      howToMeasure: 'HOW TO MEASURE',
      getRightFit: 'GET THE RIGHT FIT',
      chestMeasureTitle: '01 CHEST WIDTH',
      chestMeasureDesc: 'Measure around the fullest part of your chest, keeping the tape horizontal and snug (not too tight).',
      lengthMeasureTitle: '02 LENGTH',
      lengthMeasureDesc: 'Measure from the highest point of the shoulder (next to the collar) down to the bottom hem.',
      fitPrefTitle: 'FIT PREFERENCE',
      fitPrefSub: 'Compare with your favourite tee.',
      athleticFit: 'ATHLETIC FIT',
      athleticDesc: 'Closer to the body for a performance look and feel.',
      relaxedFit: 'RELAXED FIT',
      relaxedDesc: 'A roomier fit for everyday comfort and casual wear.',
    },
    support: {
      kicker: 'JIWA FIGHTER / CUSTOMER CARE',
      headline: "WE'RE IN YOUR CORNER.",
      subtext: 'Find answers or reach the team.',
      searchPlaceholder: 'SEARCH FOR HELP',
      faqKicker: 'SUPPORT',
      faqTitle: 'FREQUENT QUESTIONS',
      tabOrders: 'ORDERS',
      tabShipping: 'SHIPPING',
      tabSizing: 'SIZING',
      tabTeamwear: 'TEAMWEAR',
      contactKicker: '— CONTACT',
      contactTitle: 'NEED A HAND?',
      contactDesc: 'Have a question, custom request or need support? Send us a message and our team will get back to you.',
      nameLabel: 'NAME',
      emailLabel: 'EMAIL',
      messageLabel: 'YOUR MESSAGE',
      sendEnquiry: 'SEND ENQUIRY',
      demoAlert: 'DEMO ONLY — Customer enquiry not sent. Live customer support workflows are inactive in this prototype.',
      pillar1Title: 'CLEAR SIZE GUIDANCE',
      pillar1Desc: 'Find your fit with detailed sizing information.',
      pillar2Title: 'ORDER SUPPORT',
      pillar2Desc: 'Get help with orders, tracking and changes.',
      pillar3Title: 'LOCAL BRAND',
      pillar3Desc: 'A Malaysian-born label. Real people, real support.',
    },
  },
  bm: {
    nav: {
      home: 'LAMAN UTAMA',
      shop: 'KEDAI',
      collections: 'KOLEKSI',
      lookbook: 'LOOKBOOK',
      ourStory: 'KISAH KAMI',
      custom: 'TEMPAHAN KHAS',
      searchPlaceholder: 'Cari koleksi, pakaian...',
      bag: 'Beg',
    },
    cart: {
      title: 'BEG BELI-BELAH',
      empty: 'Beg beli-belah anda kosong.',
      subtotal: 'JUMLAH KECIL',
      checkout: 'TERUSKAN KE PEMBAYARAN →',
      demoNotice: 'Notis Prototaip: Ini ialah demonstrasi antaramuka. Tiada pembayaran atau pesanan sebenar diproses.',
      remove: 'Padam',
      qty: 'KUANTITI',
      size: 'SAIZ',
      continueShopping: 'TERUSKAN MELAYARI',
    },
    home: {
      chapter: 'JIWA FIGHTER / BAB 001',
      heroHeadline: 'PERTARUNGAN DI DALAM JIWA ANDA.',
      heroSubtext: 'LAHIR DARI WARISAN. DICIPTA UNTUK PERGERAKAN.',
      exploreDrop: 'TEROKAI DROP 001',
      discoverStory: 'TEROKAI KISAH KAMI',
      collectionsKicker: 'KOLEKSI KAMI',
      firstChapterTitle: 'BAB PERTAMA',
      firstChapterDesc: 'Pakaian tempur moden. Warisan abadi. Direka untuk mereka yang terus melangkah ke hadapan.',
      apparel: 'PAKAIAN',
      training: 'KEPERLUAN LATIHAN',
      accessories: 'AKSESORI',
      viewPieces: 'LIHAT PRODUK',
    },
    shop: {
      breadcrumb: 'LAMAN UTAMA / KEDAI',
      headline: 'SERAGAM JIWA YANG TIDAK TUNDUK.',
      subtitle: 'Terokai setiap bab JIWA FIGHTER.',
      tagline: 'WARISAN MALAYSIA. PERGERAKAN MODEN.',
      piecesCount: 'PRODUK',
      filterCollection: 'KOLEKSI',
      filterCategory: 'KATEGORI',
      filterSize: 'SAIZ',
      filterColor: 'WARNA',
      sortBy: 'SUSUNAN',
      sortFeatured: 'PILIHAN UTAMA',
      sortPriceLow: 'HARGA: RENDAH KE TINGGI',
      sortPriceHigh: 'HARGA: TINGGI KE RENDAH',
      viewProduct: 'LIHAT PRODUK',
    },
    collections: {
      heroKicker: 'KOLEKSI / 02',
      heroHeadline: 'SENI PERTAHANAN DIRI.',
      badge: 'SIRI SILAT',
      heroSubtext: 'SETIAP GERAK MEMBAWA MEMORI. SETIAP LANGKAH MEMBAWA NIAT.',
      exploreBtn: 'TEROKAI KOLEKSI',
      featuredKicker: 'PILIHAN DALAM SIRI INI',
      featuredTitle: 'SIRI SILAT',
      featuredDesc: 'Pakaian tempur moden berinspirasikan seni mempertahankan diri Melayu. Direka untuk ketangkasan. Berakar pada warisan. Dibina untuk hari ini.',
      trainingJersey: 'JERSI LATIHAN SILAT',
      heritageJersey: 'JERSI WARISAN SILAT',
      sleeveDetail: 'PERINCIAN YANG MEMBAWA BUDAYA.',
      cultureDetailText: 'Sulam songket halus yang dihasilkan untuk ketahanan prestasi tinggi.',
      viewPieces: 'LIHAT PRODUK',
    },
    product: {
      breadcrumb: 'KEDAI / WARISAN / KERIS TUAH',
      dropKicker: 'DROP 001 / SIRI TERHAD',
      title: 'KERIS TUAH',
      subtitle: 'JERSI PRESTASI WARISAN',
      price: 'RM 189.00',
      story: 'Ditempa dalam ingatan. Dipakai dalam pergerakan. Jersi Keris Tuah mengambil ilham daripada ketabahan, disiplin dan jati diri. Tradisi di akar kami. Kemajuan di masa depan kami.',
      color: 'WARNA',
      size: 'SAIZ',
      sizeGuide: 'PANDUAN SAIZ & UKURAN',
      addToBag: 'TAMBAH KE BEG',
      reservePreorder: 'TEMPAH AWAL',
      specs: {
        fabric: '190 GSM POLI-SPANDIKS',
        performance: 'BERPENGUDARAAN & CEPAT KERING',
        versatility: 'LATIHAN & GAYA HIDUP',
        origin: 'JENAMA KELUARAN MALAYSIA',
      },
      shippingTitle: 'PENGHANTARAN & PEMULANGAN',
      shippingDesc: 'Penghantaran domestik mengambil masa 2–4 hari bekerja. Penghantaran antarabangsa tersedia. Pertukaran saiz dalam tempoh 14 hari bagi pakaian belum dipakai dengan tag asal.',
      careTitle: 'PANDUAN PENJAGAAN',
      careDesc: 'Basuh mesin guna air sejuk secara terbalik bersama warna serupa. Jangan guna peluntur atau mesin pengering. Seterika suhu rendah di bahagian dalam. Jangan seterika terus pada corak songket.',
    },
    lookbook: {
      editorialKicker: 'EDITORIAL NO. 001',
      headline: 'WARISAN DALAM PERGERAKAN.',
      subhead: '/ WARISAN DALAM PERGERAKAN',
      description: 'Apa yang kita warisi bukan untuk pegun. Kita membawanya mara ke hadapan.',
      enterStory: 'MASUKI KISAH',
      exploreCampaign: 'TEROKAI KEMPEN',
      campaignSubtext: 'Tiga sudut pandang. Satu kisah berterusan tentang warisan, disiplin dan arah langkah kita.',
      fighterTitle: 'SANG PENDEKAR',
      fighterDesc: 'Akar dalam pergerakan.',
      craftTitle: 'PERTUKANGAN',
      craftDesc: 'Perincian penuh makna.',
      landTitle: 'TANAH AIR',
      landDesc: 'Masa depan yang kita bina.',
    },
    story: {
      kicker: 'JIWA / KISAH KAMI',
      headline: 'TIDAK DILAHIRKAN UNTUK PEGUN.',
      description: 'Dari Malaysia. Berinspirasikan warisan. Ditakrifkan oleh semangat untuk mara.',
      exploreValues: 'TEROKAI NILAI KAMI',
      rootedTitle: 'BERAKAR',
      rootedSub: 'KITA BAWA WARISAN MARA KE HADAPAN.',
      rootedDesc: 'Terilham daripada kekuatan, pertukangan dan kebudayaan Malaysia, kami membina dengan matlamat dan kebanggaan.',
      resilientTitle: 'TABAH',
      resilientSub: 'KITA BANGKIT MELALUI DISIPLIN.',
      resilientDesc: 'Dicipta untuk mereka yang mendepani cabaran, menyesuaikan diri dan terus melangkah, dalam latihan dan kehidupan.',
      relentlessTitle: 'KENTAL',
      relentlessSub: 'KITA MARA UNTUK HARI ESOK YANG LEBIH BESAR.',
      relentlessDesc: 'Tekad untuk melangkah lebih jauh. Untuk terus berkembang. Tanpa pernah menyerah.',
    },
    custom: {
      kicker: 'JIWA FIGHTER / TEMPAHAN PASUKAN & KELAB',
      headline: 'PASUKAN ANDA. SATU JIWA.',
      subtext: 'PAKAIAN PASUKAN TERSUAI DIBINA MENGIKUT IDENTITI ANDA.',
      formKicker: 'BINA KELENGKAPAN PASUKAN ANDA',
      formTitle: 'Nyatakan keperluan pasukan anda.',
      orgName: 'NAMA ORGANISASI / PASUKAN',
      orgPlaceholder: 'cth. Kelab Silat Warisan',
      contactEmail: 'EMEL UNTUK DIHUBUNGI',
      emailPlaceholder: 'anda@organisasi.com',
      teamType: 'JENIS PASUKAN',
      selectTeamType: 'Pilih jenis pasukan',
      martialArts: 'Silat / Seni Bela Diri Tradisional',
      muayThai: 'Kelab Muay Thai / Kickboxing',
      silatClub: 'Akademi Seni Bela Diri Campuran (MMA)',
      sportingCommunity: 'Komuniti Sukan & Rekreasi',
      estimatedQty: 'ANGGARAN KUANTITI',
      selectQty: 'Pilih anggaran kuantiti',
      qtySmall: '10 – 25 helai',
      qtyMedium: '26 – 50 helai',
      qtyLarge: '50+ helai',
      message: 'MESEJ',
      messagePlaceholder: 'Kongsi tentang pasukan anda, idea reka bentuk, acara atau keperluan khusus...',
      submitBtn: 'MOHON SEBUTHARGA',
      submitting: 'MENGHANTAR...',
      demoAlert: 'DEMO SAHAJA — Permohonan tidak dihantar. Tiada emel atau data dihantar ke pelayan.',
      step1Title: 'RINGKASAN',
      step1Desc: 'Nyatakan tentang pasukan, disiplin dan keperluan jersi anda.',
      step2Title: 'REKA BENTUK',
      step2Desc: 'Pasukan kami akan mencadangkan hala tuju reka bentuk yang menepati identiti anda.',
      step3Title: 'PRODUKSI',
      step3Desc: 'Setelah disahkan, kami memulakan pembuatan dengan kualiti yang anda percayai.',
    },
    sizeGuide: {
      breadcrumb: 'LAMAN UTAMA / PANDUAN SAIZ & UKURAN',
      headline: 'DIBINA UNTUK BERGERAK BERSAMA ANDA.',
      kicker: 'PANDUAN SAIZ & UKURAN / DAPATKAN SAIZ YANG TEPAT KALI PERTAMA.',
      subtext: 'Ketahui ukuran anda. Bergerak dengan yakin.',
      chartTitle: 'CARTA SAIZ JERSI',
      chartUnits: 'UKURAN ILUSTRASI / CM',
      sizeCol: 'SAIZ',
      chestCol: 'DADA (CM)',
      lengthCol: 'LABUH (CM)',
      howToMeasure: 'CARA MENGUKUR',
      getRightFit: 'DAPATKAN UKURAN TEPAT',
      chestMeasureTitle: '01 UKURAN DADA',
      chestMeasureDesc: 'Ukur sekeliling bahagian dada paling lebar, pastikan pita ukur mendatar dan selesa (tidak terlalu ketat).',
      lengthMeasureTitle: '02 LABUH BAJU',
      lengthMeasureDesc: 'Ukur dari titik tertinggi bahu (bersebelahan kolar) hingga ke labuh bawah baju.',
      fitPrefTitle: 'PILIHAN KEKEMASAN',
      fitPrefSub: 'Bandingkan dengan baju kegemaran anda.',
      athleticFit: 'POTONGAN ATLETIK',
      athleticDesc: 'Lebih mengikut bentuk badan untuk gaya dan prestasi sukan.',
      relaxedFit: 'POTONGAN SANTAI',
      relaxedDesc: 'Lebih longgar untuk keselesaan harian dan santai.',
    },
    support: {
      kicker: 'JIWA FIGHTER / KHIDMAT PELANGGAN',
      headline: 'KAMI DI SUDUT ANDA.',
      subtext: 'Dapatkan jawapan atau hubungi pasukan kami.',
      searchPlaceholder: 'CARI BANTUAN',
      faqKicker: 'SOKONGAN',
      faqTitle: 'SOALAN LAZIM',
      tabOrders: 'PESANAN',
      tabShipping: 'PENGHANTARAN',
      tabSizing: 'UKURAN',
      tabTeamwear: 'PASUKAN',
      contactKicker: '— HUBUNGI',
      contactTitle: 'PERLUKAN BANTUAN?',
      contactDesc: 'Ada sebarang soalan, tempahan khas atau memerlukan bantuan? Hantarkan mesej dan pasukan kami akan membalas.',
      nameLabel: 'NAMA',
      emailLabel: 'EMEL',
      messageLabel: 'MESEJ ANDA',
      sendEnquiry: 'HANTAR PERTANYAAN',
      demoAlert: 'DEMO SAHAJA — Pertanyaan pelanggan tidak dihantar. Saluran sokongan langsung tidak aktif dalam prototaip ini.',
      pillar1Title: 'PANDUAN SAIZ JELAS',
      pillar1Desc: 'Ketahui saiz anda dengan maklumat ukuran yang terperinci.',
      pillar2Title: 'SOKONGAN PESANAN',
      pillar2Desc: 'Dapatkan bantuan tentang pesanan, penjejakan dan pindaan.',
      pillar3Title: 'JENAMA TEMPATAN',
      pillar3Desc: 'Jenama kelahiran Malaysia. Sokongan manusia sebenar.',
    },
  },
};
