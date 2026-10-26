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
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useCart } from '@/lib/cart/CartContext';
import { DemoModal } from '@/components/ui/DemoModal';

export default function KerisTuahProductPage() {
  const { t, language } = useLanguage();
  const { addItem } = useCart();

  // State
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black / Gold');
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [showPreorderModal, setShowPreorderModal] = useState(false);

  const galleryImages = [
    { src: '/assets/products/keris-tuah-main-v2.webp', alt: 'Front Perspective with Songket Motif' },
    { src: '/assets/products/keris-tuah-thumb-back-v2.webp', alt: 'Rear Perspective with Keris Tuah Dagger' },
    { src: '/assets/products/keris-tuah-detail-v2.webp', alt: 'Curve Filigree Detail' },
    { src: '/assets/products/keris-tuah-collar-v2.webp', alt: 'Collar & Piping Detail' },
  ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const colors = [
    { name: 'Black / Gold', hex: '#0C0D0F', border: '#C6A260' },
    { name: 'Obsidian Weave', hex: '#1C1E24' },
  ];

  const handleAddToBag = () => {
    addItem({
      id: 'prod-001',
      slug: 'keris-tuah',
      name: 'KERIS TUAH JERSEY',
      size: selectedSize,
      color: selectedColor,
      price: 189,
      image: '/assets/products/keris-tuah-main-v2.webp',
    });
  };

  return (
    <div className="page-product w-full bg-bone text-obsidian min-h-screen py-8 md:py-14">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-mono tracking-widestEditorial uppercase text-text-muted-dark">
            {t.product.breadcrumb}
          </span>
          <div className="h-[1px] w-12 bg-brass" />
        </div>

        {/* Product Master Grid: Gallery (7 cols) + Details Panel (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          {/* Left: Gallery (Thumbnails + Hero Image) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 items-start">
            {/* Vertical Thumbnails column */}
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

            {/* Central Main Showcase */}
            <div className="relative flex-1 aspect-[4/5] w-full bg-bone-card/40 border border-bone-border/80 overflow-hidden group">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                key={selectedImage}
                fill
sizes="(max-width: 768px) 100vw, 60vw"
                priority
                data-small={selectedImage === 2}
                className="gallery-selected object-contain p-6"
              />

              {selectedImage === 2 && <p className="gallery-source-note">{t.product.title} / {language === 'bm' ? 'Rujukan pandangan belakang' : 'Rear view reference'}</p>}
              
            </div>
          </div>

          {/* Right: Product Story, Selectors & Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="hero-kicker text-xs font-mono tracking-widestEditorial uppercase text-brass font-bold">
                  {t.product.dropKicker}
                </span>
                <div className="h-[1px] w-12 bg-brass" />
              </div>

              <h1 className="hero-headline font-display text-5xl sm:text-6xl xl:text-8xl text-obsidian tracking-tighterEditorial leading-[0.9] uppercase">
                {t.product.title}
              </h1>

              <p className="hero-subtext text-xs sm:text-sm font-mono tracking-widest uppercase text-text-muted-dark">
                {t.product.subtitle}
              </p>
            </div>

            {/* Price */}
            <div className="font-display text-3xl sm:text-4xl text-obsidian tracking-wide">
              {t.product.price}
            </div>

            {/* Story copy */}
            <p className="text-xs sm:text-sm text-text-muted-dark font-sans leading-relaxed border-t border-b border-bone-border py-4">
              {t.product.story}
            </p>

            {/* Color selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                <span className="text-obsidian font-bold">{t.product.color}:</span>
                <span className="text-text-muted-dark">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    aria-pressed={selectedColor === c.name}
                    className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                      selectedColor === c.name
                        ? 'border-brass scale-110'
                        : 'border-bone-border hover:border-obsidian'
                    }`}
                    aria-label={`Select color ${c.name}`}
                    title={c.name}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                <span className="text-obsidian font-bold">{t.product.size}</span>
                <Link
                  href="/size-guide"
                  className="text-text-muted-dark hover:text-brass flex items-center gap-1.5 transition-colors underline"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{t.product.sizeGuide} &gt;</span>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    aria-pressed={selectedSize === s}
                    className={`flex-1 py-3 text-xs font-mono font-bold uppercase border transition-all ${
                      selectedSize === s
                        ? 'bg-obsidian text-bone border-brass ring-1 ring-brass'
                        : 'bg-bone text-obsidian border-bone-border hover:border-obsidian'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* Primary: Add to Bag */}
              <button
                onClick={handleAddToBag}
                className="w-full py-4 bg-obsidian hover:bg-obsidian-subtle text-bone font-display tracking-widest text-base uppercase transition-all flex items-center justify-center gap-3 group border border-obsidian"
              >
                <span>
                  {t.product.addToBag} — {t.product.price}
                </span>
                <ArrowRight className="w-4 h-4 text-brass transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary: Reserve / Pre-order */}
              <button
                onClick={() => setShowPreorderModal(true)}
                className="w-full py-3.5 bg-brass hover:bg-brass-light text-obsidian font-display tracking-widest text-sm uppercase transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.product.reservePreorder}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4 Feature Specification Badges (1 Row / 4 Columns matching Reference 04) */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 pt-3 border-t border-bone-border text-[10px] xl:text-[11px] font-mono text-obsidian">
              <div className="flex items-center gap-1.5 p-1.5 bg-bone-card/50 border border-bone-border/40">
                <Layers className="w-3.5 h-3.5 text-brass shrink-0" />
                <span className="leading-tight break-words">{t.product.specs.fabric}</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 bg-bone-card/50 border border-bone-border/40">
                <Wind className="w-3.5 h-3.5 text-brass shrink-0" />
                <span className="leading-tight break-words">{t.product.specs.performance}</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 bg-bone-card/50 border border-bone-border/40">
                <ShieldCheck className="w-3.5 h-3.5 text-brass shrink-0" />
                <span className="leading-tight break-words">{t.product.specs.versatility}</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 bg-bone-card/50 border border-bone-border/40">
                <Sparkles className="w-3.5 h-3.5 text-brass shrink-0" />
                <span className="leading-tight break-words">{t.product.specs.origin}</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-bone-border pt-4 space-y-3">
              {/* Shipping & Returns */}
              <div className="border-b border-bone-border pb-3">
                <button
                  aria-expanded={isShippingOpen}
                  onClick={() => setIsShippingOpen(!isShippingOpen)}
                  className="w-full flex items-center justify-between text-xs font-mono uppercase font-bold text-obsidian tracking-wider py-1"
                >
                  <span className="flex items-center gap-2"><Truck className="w-3.5 h-3.5 text-brass" />{t.product.shippingTitle}</span>
                  {isShippingOpen ? (
                    <Minus className="w-4 h-4 text-brass" />
                  ) : (
                    <Plus className="w-4 h-4 text-brass" />
                  )}
                </button>
                {isShippingOpen && (
                  <p className="text-xs text-text-muted-dark font-sans leading-relaxed pt-2 animate-fade-in">
                    {t.product.shippingDesc}
                  </p>
                )}
              </div>

              {/* Care Instructions */}
              <div className="border-b border-bone-border pb-3">
                <button
                  aria-expanded={isCareOpen}
                  onClick={() => setIsCareOpen(!isCareOpen)}
                  className="w-full flex items-center justify-between text-xs font-mono uppercase font-bold text-obsidian tracking-wider py-1"
                >
                  <span>{t.product.careTitle}</span>
                  {isCareOpen ? (
                    <Minus className="w-4 h-4 text-brass" />
                  ) : (
                    <Plus className="w-4 h-4 text-brass" />
                  )}
                </button>
                {isCareOpen && (
                  <p className="text-xs text-text-muted-dark font-sans leading-relaxed pt-2 animate-fade-in">
                    {t.product.careDesc}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-order Simulation Modal */}
      <DemoModal
        isOpen={showPreorderModal}
        onClose={() => setShowPreorderModal(false)}
        title="SIMULATED PRE-ORDER RESERVATION"
        message="Your demo reservation for KERIS TUAH JERSEY has been noted in local state. In this frontend prototype, no commercial charge or stock reservation is committed to a live database."
      />
    </div>
  );
}
