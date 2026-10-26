'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, ChevronDown } from 'lucide-react';
import { PRODUCTS, ProductItem } from '@/data/products';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useHeroReveal, useScrollReveal } from '@/lib/motion';

export default function ShopPage() {
  const { t } = useLanguage();
  const headerRef = useHeroReveal<HTMLElement>();
  const filterRef = useScrollReveal<HTMLElement>('.shop-filter-group', 0.07);
  const counterRef = useScrollReveal<HTMLDivElement>('.shop-counter-bar', 0.05);
  const gridRef = useScrollReveal<HTMLDivElement>('.shop-product-card', 0.06);

  // Filter States
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'featured' | 'low' | 'high'>('featured');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const collection = params.get('collection');
    if (category) setSelectedCategories([category]);
    if (collection) setSelectedCollections([collection]);
  }, []);

  const collections = ['Drop 001', 'Keris Tuah', 'Silat Series', 'Core', 'Accessories'];
  const categories = ['Jersey', 'T-Shirt', 'Hoodie', 'Training Wear', 'Accessories'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { label: 'Black', hex: '#0C0D0F' },
    { label: 'Crimson', hex: '#621F24' },
    { label: 'Gold', hex: '#C6A260' },
    { label: 'Charcoal', hex: '#2A2C31' },
    { label: 'White', hex: '#FAF8F5' },
  ];

  const toggleCollection = (col: string) => {
    setSelectedCollections((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleSize = (sz: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]
    );
  };

  const toggleColor = (col: string) => {
    setSelectedColors((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    const featuredOrder = ['prod-002', 'prod-003', 'prod-001'];
    const rank = (id: string) => { const index = featuredOrder.indexOf(id); return index < 0 ? featuredOrder.length : index; };
    let list = [...PRODUCTS].sort((a, b) => rank(a.id) - rank(b.id));

    if (selectedCollections.length > 0) {
      list = list.filter((p) => selectedCollections.includes(p.collection) || (selectedCollections.includes('Keris Tuah') && p.slug === 'keris-tuah'));
    }

    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedSizes.length > 0) {
      list = list.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    if (selectedColors.length > 0) {
      list = list.filter((p) =>
        p.colors.some((c) =>
          selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase()))
        )
      );
    }

    if (sortBy === 'low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [selectedCollections, selectedCategories, selectedSizes, selectedColors, sortBy]);

  return (
    <div className="page-shop w-full bg-bone text-obsidian min-h-screen">
      {/* 1. EDITORIAL HEADER BANNER */}
      <section ref={headerRef} className="relative border-b border-bone-border py-10 md:py-14 bg-bone overflow-hidden">
        {/* Subtle Songket watermark in top right */}
        <div className="absolute right-0 top-0 w-80 h-full pointer-events-none opacity-20 hidden md:block">
          <Image
            src="/assets/textures/songket-pattern-only.png"
            alt="Songket watermark"
            fill
sizes="(max-width: 768px) 100vw, 60vw"
            className="object-contain object-right"
          />
        </div>

        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            {/* Breadcrumb */}
            <div className="hero-kicker flex items-center gap-3">
              <span className="text-xs font-mono tracking-widestEditorial uppercase text-text-muted-dark">
                {t.shop.breadcrumb}
              </span>
              <div className="h-[1px] w-12 bg-brass" />
            </div>

            {/* Title */}
            <h1 className="hero-headline font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-obsidian tracking-tighterEditorial leading-[0.9] uppercase">
              {t.shop.headline}
            </h1>

            {/* Subtitle */}
            <p className="hero-subtext text-xs sm:text-sm font-mono tracking-wider text-text-muted-dark uppercase">
              {t.shop.subtitle}
            </p>
          </div>

          {/* Right Editorial Stamp */}
          <div className="hero-cta hidden lg:block text-right font-mono text-[10px] tracking-widest text-text-muted-dark uppercase leading-relaxed border-l border-bone-border pl-6">
            <div>MALAYSIAN</div>
            <div>HERITAGE.</div>
            <div>MODERN</div>
            <div>MOVEMENT.</div>
          </div>
        </div>
      </section>

      {/* 2. CATALOG & FILTERS */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filter Controls (3 cols) */}
          <aside ref={filterRef} className="lg:col-span-3 space-y-8 pr-4">
            {/* Collection Filter */}
            <div className="shop-filter-group border-b border-bone-border pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm tracking-wider uppercase text-obsidian">
                  {t.shop.filterCollection}
                </h3>
                <span className="text-xs text-text-muted-dark font-mono">—</span>
              </div>
              <div className="space-y-2">
                {collections.map((col) => (
                  <label
                    key={col}
                    className="flex items-center gap-3 text-xs font-mono text-obsidian/80 hover:text-obsidian cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCollections.includes(col)}
                      onChange={() => toggleCollection(col)}
                      className="w-4 h-4 accent-brass rounded-none cursor-pointer"
                    />
                    <span>{col}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="shop-filter-group border-b border-bone-border pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm tracking-wider uppercase text-obsidian">
                  {t.shop.filterCategory}
                </h3>
                <span className="text-xs text-text-muted-dark font-mono">—</span>
              </div>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 text-xs font-mono text-obsidian/80 hover:text-obsidian cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-4 h-4 accent-brass rounded-none cursor-pointer"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="shop-filter-group border-b border-bone-border pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm tracking-wider uppercase text-obsidian">
                  {t.shop.filterSize}
                </h3>
                <span className="text-xs text-text-muted-dark font-mono">—</span>
              </div>
              <div className="space-y-2">
                {sizes.map((sz) => (
                  <label
                    key={sz}
                    className="flex items-center gap-3 text-xs font-mono text-obsidian/80 hover:text-obsidian cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(sz)}
                      onChange={() => toggleSize(sz)}
                      className="w-4 h-4 accent-brass rounded-none cursor-pointer"
                    />
                    <span>{sz}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="shop-filter-group border-b border-bone-border pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm tracking-wider uppercase text-obsidian">
                  {t.shop.filterColor}
                </h3>
                <span className="text-xs text-text-muted-dark font-mono">—</span>
              </div>
              <div className="space-y-2.5">
                {colors.map((c) => (
                  <label
                    key={c.label}
                    className="flex items-center gap-3 text-xs font-mono text-obsidian/80 hover:text-obsidian cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(c.label)}
                      onChange={() => toggleColor(c.label)}
                      className="w-4 h-4 accent-brass rounded-none cursor-pointer"
                    />
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-bone-border inline-block"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Product Grid Area (9 cols) */}
          <div className="product-catalog lg:col-span-9">
            {/* Sub-header: Pieces Count & Sort dropdown */}
            <div ref={counterRef} className="shop-counter-bar flex items-center justify-between pb-6 mb-6 border-b border-bone-border">
              <div className="text-xs font-mono tracking-widest uppercase text-obsidian font-bold">
                <span className="text-brass">
                  {filteredProducts.length.toString().padStart(2, '0')}
                </span>{' '}
                {t.shop.piecesCount}
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono tracking-wider uppercase text-text-muted-dark">
                  {t.shop.sortBy}:
                </span>
                <div className="relative">
                  <select
                    aria-label="Sort products"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none bg-transparent text-xs font-mono font-bold tracking-wider uppercase pr-6 py-1 cursor-pointer focus:outline-none border-b border-obsidian/40"
                  >
                    <option value="featured">{t.shop.sortFeatured}</option>
                    <option value="low">{t.shop.sortPriceLow}</option>
                    <option value="high">{t.shop.sortPriceHigh}</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-obsidian" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isFav = !!favorites[product.id];
                return (
                  <div
                    key={product.id}
                    className="shop-product-card group relative flex flex-col bg-bone-card/50 border border-bone-border/70 hover:border-brass/70 hover:shadow-lg hover:shadow-brass/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Top image box with badges */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-bone-card border border-bone-border/70 group-hover:border-brass/70 transition-colors duration-300">
                      {/* Drop Badge */}
                      {product.stockBadge && (
                        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-brass text-obsidian font-display text-[11px] tracking-wider uppercase font-bold shadow">
                          {product.stockBadge}
                        </div>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => toggleFavorite(product.id, e)}
                        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-bone/80 hover:bg-bone text-obsidian transition-colors shadow"
                        aria-label={`Save ${product.name}`}
                        aria-pressed={isFav}
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isFav ? 'fill-red-600 text-red-600' : 'text-obsidian'
                          }`}
                        />
                      </button>

                      {/* Product Image */}
                      <Link href={`/products/${product.slug}`} className="block w-full h-full">
                        <Image
                          src={product.catalogImage || product.images.main}
                          alt={product.name}
                          fill
sizes="(max-width: 768px) 100vw, 60vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                    </div>

                    {/* Product Info & Actions (Matched to Reference 02-shop) */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-display text-base tracking-wider uppercase text-obsidian group-hover:text-brass transition-colors">
                          <Link href={`/products/${product.slug}`}>{product.name}</Link>
                        </h3>
                        <p className="text-xs font-mono text-text-muted-dark uppercase tracking-wider">
                          {product.subtitle}
                        </p>
                      </div>

                      {/* Row 3: Swatches (Left) vs Price (Right) */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5">
                          {product.colors.map((c, i) => (
                            <span
                              key={i}
                              className={`w-3.5 h-3.5 rounded-full border ${
                                i === 0 ? 'border-brass ring-1 ring-brass' : 'border-bone-border'
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                        <span className="font-display text-base tracking-wide text-obsidian font-bold">
                          {product.priceFormatted}
                        </span>
                      </div>

                      {/* Row 4: Full-width VIEW PRODUCT action */}
                      <div className="pt-3 border-t border-bone-border/70">
                        <Link
                          href={`/products/${product.slug}`}
                          className="w-full text-xs font-mono tracking-widest uppercase text-obsidian hover:text-brass transition-colors flex items-center justify-between group-hover:translate-x-0.5"
                        >
                          <span>{t.shop.viewProduct}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brass" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center space-y-3">
                <p className="font-display text-xl text-obsidian">NO PRODUCTS FOUND</p>
                <p className="text-xs text-text-muted-dark font-mono">
                  Try clearing some filter criteria to display combat gear.
                </p>
                <button
                  onClick={() => {
                    setSelectedCollections([]);
                    setSelectedCategories([]);
                    setSelectedSizes([]);
                    setSelectedColors([]);
                  }}
                  className="px-5 py-2.5 bg-obsidian text-bone hover:bg-brass hover:text-obsidian text-xs font-mono tracking-widest uppercase transition-colors"
                >
                  RESET ALL FILTERS
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
