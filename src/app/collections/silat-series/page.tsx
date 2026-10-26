'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CampaignLines } from '@/components/common/CampaignLines';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useHeroReveal, useScrollReveal } from '@/lib/motion';

export default function SilatSeriesPage() {
  const { t } = useLanguage();
  const heroRef = useHeroReveal<HTMLDivElement>();
  const lineupRef = useScrollReveal<HTMLDivElement>('.lineup-reveal, .lineup-card', 0.08);

  const [activeSlide, setActiveSlide] = useState(0);
  const selectPiece = (index: number) => {
    setActiveSlide(index);
    const card = lineupRef.current?.querySelectorAll<HTMLElement>('.lineup-card')[index];
    card?.focus({ preventScroll: true });
    card?.scrollIntoView({ behavior: 'auto', block: 'nearest' });
  };

  const handlePrev = () => {
    selectPiece((activeSlide + 2) % 3);
  };

  const handleNext = () => {
    selectPiece((activeSlide + 1) % 3);
  };

  return (
    <div className="page-silat w-full bg-obsidian text-bone overflow-hidden">
      {/* 1. CINEMATIC HERO SECTION */}
      <section
        ref={heroRef}
        className="campaign-hero relative min-h-[calc(100vh-4.5rem)] flex items-center bg-obsidian overflow-hidden border-b border-obsidian-border"
      >
        {/* Dynamic oxblood songket slash texture in background */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-full bg-gradient-to-r from-oxblood/40 via-transparent to-transparent" />
        </div>

        <div className="max-w-[1536px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Story Headline & CTAs (6 cols) */}
          <div className="campaign-copy lg:col-span-6 space-y-6">
            {/* Kicker */}
            <div className="hero-kicker flex items-center gap-4">
              <span className="text-xs md:text-sm font-mono tracking-widestEditorial uppercase text-bone/70">
                {t.collections.heroKicker}
              </span>
              <div className="h-[1px] w-12 bg-brass" />
            </div>

            {/* Headline */}
            <h1 className="hero-headline font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-9xl text-bone tracking-tighterEditorial leading-[0.9] uppercase">
              <CampaignLines text={t.collections.heroHeadline} />
            </h1>

            {/* Badge */}
            <div className="hero-kicker inline-block">
              <span className="px-3.5 py-1.5 border border-brass text-brass font-display text-sm tracking-widest uppercase">
                {t.collections.badge}
              </span>
            </div>

            {/* Subtext */}
            <p className="hero-subtext text-xs sm:text-sm md:text-base font-mono tracking-widest uppercase text-bone/80 max-w-lg leading-relaxed">
              {t.collections.heroSubtext}
            </p>

            {/* CTA Button */}
            <div className="hero-cta pt-2">
              <Link
                href="/shop?collection=Silat%20Series"
                className="inline-flex items-center gap-3 px-7 py-3.5 border border-brass text-brass hover:bg-brass hover:text-obsidian font-display tracking-widest text-sm md:text-base uppercase transition-all group"
              >
                <span>{t.collections.exploreBtn}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Carousel navigation & progress indicator */}
            <div className="pt-8 flex items-center gap-5 text-xs font-mono">
              <span className="text-brass font-bold">
                {`0${activeSlide + 1}`} / 03
              </span>
              <div className="w-32 h-[2px] bg-obsidian-border relative overflow-hidden">
                <div
                  className="h-full bg-brass transition-all duration-300"
                  style={{ width: `${((activeSlide + 1) / 3) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-1.5 text-bone/60 hover:text-brass transition-colors"
                  aria-label="Previous collection piece"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 text-bone/60 hover:text-brass transition-colors"
                  aria-label="Next collection piece"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Martial Artist Stance Photography (6 cols) */}
          <div className="campaign-photo lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="hero-image relative w-full max-w-[620px] aspect-[16/11] lg:aspect-[4/3] overflow-hidden">
              <Image
                src="/assets/campaigns/silat-hero-stance-v2.webp"
                alt="Silat Fighter in Kuda-Kuda Stance"
                fill
sizes="(max-width: 768px) 100vw, 60vw"
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED IN THIS SERIES (Light Bone stone section) */}
      <section
        ref={lineupRef}
        className="collection-rail w-full bg-bone text-obsidian py-16 md:py-24 border-b border-bone-border overflow-hidden"
      >
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="lineup-reveal flex items-center gap-3">
                <span className="text-xs font-mono tracking-widestEditorial uppercase text-text-muted-dark">
                  {t.collections.featuredKicker}
                </span>
                <div className="h-[1px] w-12 bg-brass" />
              </div>

              <h2 className="lineup-reveal font-display text-4xl sm:text-5xl md:text-6xl text-obsidian tracking-tight leading-[0.9] uppercase">
                <CampaignLines text={t.collections.featuredTitle} />
              </h2>

              <p className="lineup-reveal text-xs sm:text-sm text-text-muted-dark leading-relaxed font-sans max-w-sm">
                {t.collections.featuredDesc}
              </p>
            </div>

            {/* Right Product Cards (9 cols) */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Product 01: Training Jersey */}
              <div tabIndex={-1} data-selected={activeSlide === 0} className="lineup-card group flex flex-col bg-bone-card/60 border border-bone-border/70 hover:border-brass/70 hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-card border border-bone-border/70 group-hover:border-brass/70 transition-colors duration-300">
                  <Image
                    src="/assets/products/silat-training-jersey-front-v2.webp"
                    alt={t.collections.trainingJersey}
                    fill
sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-brass font-bold">01</span>
                    <h3 className="font-display text-base tracking-wider uppercase text-obsidian group-hover:text-brass transition-colors">
                      {t.collections.trainingJersey}
                    </h3>
                    <p className="text-xs font-mono text-text-muted-dark mt-1">RM 179</p>
                  </div>
                  <div className="pt-4 border-t border-bone-border/60 mt-3 flex justify-end">
                    <Link
                      href="/products/silat-training-jersey"
                      className="text-xs font-mono tracking-widest uppercase text-obsidian hover:text-brass transition-colors flex items-center gap-1.5"
                    >
                      <span>{t.collections.viewPieces}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brass" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Product 02: Heritage Jersey */}
              <div tabIndex={-1} data-selected={activeSlide === 1} className="lineup-card group flex flex-col bg-bone-card/60 border border-bone-border/70 hover:border-brass/70 hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-card border border-bone-border/70 group-hover:border-brass/70 transition-colors duration-300">
                  <Image
                    src="/assets/products/silat-heritage-jersey-back-v2.webp"
                    alt={t.collections.heritageJersey}
                    fill
sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-brass font-bold">02</span>
                    <h3 className="font-display text-base tracking-wider uppercase text-obsidian group-hover:text-brass transition-colors">
                      {t.collections.heritageJersey}
                    </h3>
                    <p className="text-xs font-mono text-text-muted-dark mt-1">RM 179</p>
                  </div>
                  <div className="pt-4 border-t border-bone-border/60 mt-3 flex justify-end">
                    <Link
                      href="/products/silat-heritage-jersey"
                      className="text-xs font-mono tracking-widest uppercase text-obsidian hover:text-brass transition-colors flex items-center gap-1.5"
                    >
                      <span>{t.collections.viewPieces}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brass" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Feature Detail: Sleeve culture detail */}
              <div tabIndex={-1} data-selected={activeSlide === 2} className="lineup-card relative flex flex-col bg-obsidian text-bone border border-obsidian-border hover:border-brass/50 hover:-translate-y-1 overflow-hidden transition-all duration-300">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/assets/products/silat-sleeve-culture-detail-v2.webp"
                    alt="Sleeve Culture Detail"
                    fill
sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-end">
                  <h3 className="font-display text-sm tracking-widest uppercase text-brass">
                    {t.collections.sleeveDetail}
                  </h3>
                  <p className="text-xs text-bone/70 mt-1 font-sans">
                    {t.collections.cultureDetailText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
