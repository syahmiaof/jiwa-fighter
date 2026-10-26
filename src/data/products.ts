export interface ProductColor {
  name: string;
  hex: string;
  borderHex?: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'Jersey' | 'T-Shirt' | 'Hoodie' | 'Training Wear' | 'Accessories';
  collection: 'Drop 001' | 'Keris Tuah' | 'Silat Series' | 'Core' | 'Accessories';
  price: number;
  priceFormatted: string;
  catalogImage?: string;
  images: {
    main: string;
    thumbnails?: string[];
  };
  colors: ProductColor[];
  sizes: string[];
  stockBadge?: string;
  description: string;
  featured?: boolean;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'prod-001',
    slug: 'keris-tuah',
    name: 'KERIS TUAH JERSEY',
    subtitle: 'BLACK / GOLD',
    category: 'Jersey',
    collection: 'Drop 001',
    price: 189,
    priceFormatted: 'RM 189',
    catalogImage: '/assets/products/shop-keris-tuah-jersey-v2.webp',
    images: {
      main: '/assets/products/keris-tuah-main-v2.webp',
      thumbnails: [
        '/assets/products/keris-tuah-thumb-front-v2.webp',
        '/assets/products/keris-tuah-thumb-back-v2.webp',
        '/assets/products/keris-tuah-thumb-detail-v2.webp',
        '/assets/products/keris-tuah-thumb-collar-v2.webp',
      ],
    },
    colors: [
      { name: 'Black / Gold', hex: '#0C0D0F', borderHex: '#C6A260' },
      { name: 'Navy / Silver', hex: '#1B2430' },
      { name: 'Crimson / Gold', hex: '#621F24' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBadge: 'DROP 001',
    description: 'Forged in memory. Worn in motion. The Keris Tuah Jersey draws from a legacy of strength, discipline and purpose. Tradition in our roots. Movement in our future.',
    featured: true,
  },
  {
    id: 'prod-002',
    slug: 'heritage-jersey',
    name: 'HERITAGE JERSEY',
    subtitle: 'BLACK / GOLD',
    category: 'Jersey',
    collection: 'Drop 001',
    price: 189,
    priceFormatted: 'RM 189',
    images: {
      main: '/assets/products/shop-heritage-jersey-v2.webp',
      thumbnails: ['/assets/products/shop-heritage-jersey-v2.webp'],
    },
    colors: [
      { name: 'Black / Gold', hex: '#0C0D0F', borderHex: '#C6A260' },
      { name: 'Crimson', hex: '#621F24' },
      { name: 'Charcoal', hex: '#2A2C31' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBadge: 'DROP 001',
    description: 'Engineered with diagonal antique brass songket motifs across high-breathability performance fabric.',
    featured: true,
  },
  {
    id: 'prod-003',
    slug: 'silat-jersey',
    name: 'SILAT JERSEY',
    subtitle: 'BLACK / CRIMSON',
    category: 'Jersey',
    collection: 'Silat Series',
    price: 189,
    priceFormatted: 'RM 189',
    images: {
      main: '/assets/products/shop-silat-jersey-v2.webp',
      thumbnails: [
        '/assets/products/silat-training-jersey-front-v2.webp',
        '/assets/products/silat-heritage-jersey-back-v2.webp',
      ],
    },
    colors: [
      { name: 'Black / Crimson', hex: '#0C0D0F', borderHex: '#8E2B33' },
      { name: 'Crimson', hex: '#621F24' },
      { name: 'Charcoal', hex: '#2A2C31' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBadge: 'DROP 001',
    description: 'Dynamic martial graphics paired with deep oxblood accents, honoring the fluid strikes of silat.',
    featured: true,
  },
  {
    id: 'prod-004',
    slug: 'silat-training-jersey',
    name: 'SILAT TRAINING JERSEY',
    subtitle: 'BLACK / OXBLOOD',
    category: 'Training Wear',
    collection: 'Silat Series',
    price: 179,
    priceFormatted: 'RM 179',
    images: {
      main: '/assets/products/silat-training-jersey-front-v2.webp',
      thumbnails: ['/assets/products/silat-training-jersey-front-v2.webp'],
    },
    colors: [
      { name: 'Oxblood / Black', hex: '#621F24' },
      { name: 'Charcoal', hex: '#2A2C31' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBadge: 'SERIES 02',
    description: 'Breathable poly-spandex blend built specifically for sparring sessions and intense conditioning.',
    featured: false,
  },
  {
    id: 'prod-005',
    slug: 'silat-heritage-jersey',
    name: 'SILAT HERITAGE JERSEY',
    subtitle: 'BLACK / GOLD PRINT',
    category: 'Jersey',
    collection: 'Silat Series',
    price: 179,
    priceFormatted: 'RM 179',
    images: {
      main: '/assets/products/silat-heritage-jersey-back-v2.webp',
      thumbnails: ['/assets/products/silat-heritage-jersey-back-v2.webp'],
    },
    colors: [
      { name: 'Black / Gold', hex: '#0C0D0F', borderHex: '#C6A260' },
      { name: 'White', hex: '#FAF8F5' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBadge: 'SERIES 02',
    description: 'Features bold rear SILAT typography and intricate mythological warrior brushwork.',
    featured: false,
  },
  {
    id: 'prod-006',
    slug: 'tactical-combat-duffle',
    name: 'TACTICAL COMBAT DUFFLE',
    subtitle: 'MATTE OBSIDIAN',
    category: 'Accessories',
    collection: 'Accessories',
    price: 159,
    priceFormatted: 'RM 159',
    images: {
      main: '/assets/products/collection-preview-03-accessories-v2.webp',
      thumbnails: ['/assets/products/collection-preview-03-accessories-v2.webp'],
    },
    colors: [
      { name: 'Obsidian Black', hex: '#0C0D0F' },
      { name: 'Military Olive', hex: '#3B4032' },
    ],
    sizes: ['ONE SIZE'],
    stockBadge: 'CORE',
    description: 'Heavyweight weather-resistant ballistic nylon duffle bag with contrast white JF combat monogram.',
    featured: true,
  },
  {
    id: 'prod-007',
    slug: 'iron-heritage-hoodie',
    name: 'IRON HERITAGE HOODIE',
    subtitle: 'HEAVYWEIGHT FRENCH TERRY',
    category: 'Hoodie',
    collection: 'Drop 001',
    price: 249,
    priceFormatted: 'RM 249',
    images: {
      main: '/assets/products/collection-preview-01-apparel-v2.webp',
      thumbnails: ['/assets/products/collection-preview-01-apparel-v2.webp'],
    },
    colors: [
      { name: 'Black / Brass', hex: '#0C0D0F', borderHex: '#C6A260' },
      { name: 'Charcoal', hex: '#2A2C31' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBadge: 'DROP 001',
    description: '500 GSM luxury French Terry hoodie tailored with subtle tone-on-tone Malay geometry along the hood.',
    featured: false,
  },
  {
    id: 'prod-008',
    slug: 'tanah-melayu-tshirt',
    name: 'TANAH MELAYU COMBAT TEE',
    subtitle: 'WASHED OBSIDIAN',
    category: 'T-Shirt',
    collection: 'Core',
    price: 119,
    priceFormatted: 'RM 119',
    images: {
      main: '/assets/products/collection-preview-02-training-v2.webp',
      thumbnails: ['/assets/products/collection-preview-02-training-v2.webp'],
    },
    colors: [
      { name: 'Washed Black', hex: '#1C1D21' },
      { name: 'Bone White', hex: '#F0ECE3' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBadge: 'CORE',
    description: '240 GSM organic heavyweight cotton t-shirt with reinforced ribbed collar and chest crest.',
    featured: false,
  },
];
