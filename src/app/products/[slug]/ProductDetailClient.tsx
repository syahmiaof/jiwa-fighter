'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Truck,
  Calendar,
  Ruler,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Wind,
  Layers,
  Search,
} from 'lucide-react';
import { ProductItem } from '@/data/products';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useCart } from '@/lib/cart/CartContext';
import { DemoModal } from '@/components/ui/DemoModal';

interface ProductDetailClientProps {
  product: ProductItem;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Default');
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [showPreorderModal, setShowPreorderModal] = useState(false);

  const galleryImages = [
    { src: product.images.main, alt: product.name },
    ...(product.images.thumbnails || []).map((thumb, idx) => ({
      src: thumb,
      alt: `${product.name} detail view ${idx + 1}`,
    })),
  ];

  const handleAddToBag = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      image: product.images.main,
    });
  };

  return (
    <div className="page-product w-full bg-bone text-obsidian min-h-screen py-8 md:py-14">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/shop"
            className="text-xs font-mono tracking-widestEditorial uppercase text-text-muted-dark hover:text-obsidian"
          >
            SHOP
          </Link>
          <span className="text-bone-border">/</span>
          <span className="text-xs font-mono tracking-widestEditorial uppercase text-brass font-bold">
            {product.name}
          </span>
          <div className="h-[1px] w-12 bg-brass" />
        </div>

        {/* Product Master Grid: Gallery (7 cols) + Details Panel (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          {/* Left: Gallery (Thumbnails + Hero Image) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 items-start">
            {/* Vertical Thumbnails column */}
            {galleryImages.length > 1 && (
              <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-visible w-full md:w-24">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                  aria-pressed={selectedImage === idx}
                    className={`relative w-18 h-22 md:w-20 md:h-24 bg-bone-card border transition-all duration-200 shrink-0 overflow-hidden ${
                      selectedImage === idx
                        ? 'border-brass ring-1 ring-brass'
                        : 'border-bone-border/70 hover:border-brass/50'
                    }`}
                    aria-label={`View thumbnail ${idx + 1}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Central Main Showcase */}
            <div className="relative flex-1 aspect-[4/5] w-full bg-bone-card/40 border border-bone-border/80 overflow-hidden group">
              <Image
                src={galleryImages[selectedImage]?.src || product.images.main}
                alt={galleryImages[selectedImage]?.alt || product.name}
                key={selectedImage}
                fill
sizes="(max-width: 768px) 100vw, 60vw"
                priority
                className="gallery-selected object-contain p-6"
              />

              
            </div>
          </div>

          {/* Right: Product Story, Selectors & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-widestEditorial uppercase text-brass font-bold">
                  {product.collection}
                </span>
                <div className="h-[1px] w-12 bg-brass" />
              </div>

              <h1 className="hero-headline font-display text-5xl sm:text-6xl xl:text-7xl text-obsidian tracking-tighterEditorial leading-[0.9] uppercase">
                {product.name}
              </h1>

              <p className="hero-subtext text-xs sm:text-sm font-mono tracking-widest uppercase text-text-muted-dark">
                {product.subtitle}
              </p>
            </div>

            <div className="font-display text-3xl sm:text-4xl text-obsidian tracking-wide">
              {product.priceFormatted}
            </div>

            <p className="text-xs sm:text-sm text-text-muted-dark font-sans leading-relaxed border-t border-b border-bone-border py-4">
              {product.description}
            </p>

            {/* Color selection */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                  <span className="text-obsidian font-bold">Color:</span>
                  <span className="text-text-muted-dark">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                    aria-pressed={selectedColor === c.name}
                      className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                        selectedColor === c.name
                          ? 'border-brass scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      aria-label={`Select color ${c.name}`}
                      title={c.name}
                    >
                      <span
                        className="block w-full h-full rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                <span className="text-obsidian font-bold">Select Size:</span>
                <Link
                  href="/size-guide"
                  className="text-brass hover:underline flex items-center gap-1 font-bold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Fit Guide</span>
                </Link>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    aria-pressed={selectedSize === sz}
                    className={`py-3 text-center border font-mono text-xs uppercase tracking-wider transition-all ${
                      selectedSize === sz
                        ? 'border-brass bg-brass text-obsidian font-bold shadow-sm'
                        : 'border-bone-border bg-bone-card hover:border-obsidian text-obsidian'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 space-y-3">
              <button
                onClick={handleAddToBag}
                className="w-full py-4 bg-obsidian text-bone hover:bg-brass hover:text-obsidian font-display text-base tracking-widest uppercase transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-3"
              >
                <span>ADD TO BAG</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowPreorderModal(true)}
                className="w-full py-3.5 border border-brass text-brass hover:bg-brass/10 font-display text-sm tracking-widest uppercase transition-colors"
              >
                SIMULATE PRE-ORDER
              </button>
            </div>

            {/* Accordions: Shipping & Care */}
            <div className="border-t border-bone-border divide-y divide-bone-border pt-4">
              <div>
                <button
                  aria-expanded={isShippingOpen}
                  onClick={() => setIsShippingOpen(!isShippingOpen)}
                  className="w-full py-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-wider text-obsidian hover:text-brass transition-colors"
                >
                  <span className="font-bold">Shipping & Pre-Order Delivery</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isShippingOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {isShippingOpen && (
                  <div className="pb-4 text-xs font-sans text-text-muted-dark leading-relaxed">
                    Domestic Peninsular orders delivered in 1-3 business days via DHL eCommerce. Sabah & Sarawak 3-5 business days. International express available to 45 countries.
                  </div>
                )}
              </div>

              <div>
                <button
                  aria-expanded={isCareOpen}
                  onClick={() => setIsCareOpen(!isCareOpen)}
                  className="w-full py-4 flex items-center justify-between text-left text-xs font-mono uppercase tracking-wider text-obsidian hover:text-brass transition-colors"
                >
                  <span className="font-bold">Combatwear Care Instructions</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isCareOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {isCareOpen && (
                  <div className="pb-4 text-xs font-sans text-text-muted-dark leading-relaxed">
                    Machine wash cold (30°C) with like colors. Do not bleach or tumble dry. Cool iron inside out. Do not iron directly on antique brass metallic foils or heat-pressed crests.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DemoModal
        isOpen={showPreorderModal}
        onClose={() => setShowPreorderModal(false)}
        title="Simulated Pre-Order"
        message="This prototype is in demonstration mode. No charge or real transaction has been made. The order request has been simulated locally in your browser session."
      />
    </div>
  );
}
