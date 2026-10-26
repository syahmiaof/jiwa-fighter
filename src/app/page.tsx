'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CampaignLines } from '@/components/common/CampaignLines';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useHeroReveal, useScrollReveal } from '@/lib/motion';
import { HomeIntro } from '@/components/home/HomeIntro';

export default function HomePage() {
  const { t } = useLanguage();
  const heroRef = useHeroReveal<HTMLDivElement>();
  const collectionsRef = useScrollReveal<HTMLDivElement>('.collection-reveal, .collection-card', 0.08);

  // Carousel slide index for The First Chapter
  const [activeSlide, setActiveSlide] = useState(0);

  const collectionCards = [
    {
      id: '01',
      title: t.home.apparel,
      href: '/shop',
      image: '/assets/products/collection-preview-01-apparel-v2.webp',
      alt: 'Iron Heritage Apparel',
    },
    {
      id: '02',
      title: t.home.training,
      href: '/collections/silat-series',
      image: '/assets/products/collection-preview-02-training-v2.webp',
      alt: 'Training Essentials',
    },
    {
      id: '03',
      title: t.home.accessories,
      href: '/shop?category=Accessories',
      image: '/assets/products/collection-preview-03-accessories-v2.webp',
      alt: 'Tactical Accessories',
    },
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : collectionCards.length - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev < collectionCards.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="page-home w-full bg-obsidian overflow-hidden">
      <HomeIntro />
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="campaign-hero relative min-h-[calc(100vh-4.5rem)] flex items-center bg-obsidian overflow-hidden border-b border-obsidian-border"
      >
        {/* Background diagonal motif / texture */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/3 w-[500px] h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brass/10 via-transparent to-transparent" />
          <div className="absolute inset-y-0 left-1/4 w-[1px] bg-gradient-to-b from-transparent via-brass/30 to-transparent" />
        </div>

        <div className="max-w-[1536px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <div className="campaign-copy lg:col-span-7 space-y-6">
            {/* Kicker */}
            <div className="hero-kicker flex items-center gap-4">
              <span className="text-xs md:text-sm font-mono tracking-widestEditorial uppercase text-bone/70">
                {t.home.chapter}
              </span>
              <div className="h-[1px] w-12 bg-brass" />
            </div>

            {/* Main Headline */}
            <h1 className="hero-headline font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-9xl text-bone tracking-tighterEditorial leading-[0.9] uppercase">
              <CampaignLines text={t.home.heroHeadline} />
            </h1>

            {/* Subtext (Deliberate 2-line break matching Reference 01) */}
            <p className="hero-subtext text-xs sm:text-sm md:text-base font-mono tracking-widest uppercase text-bone/80 max-w-md leading-relaxed">
              <CampaignLines text={t.home.heroSubtext} />
            </p>

            {/* Action Buttons */}
            <div className="hero-cta flex flex-wrap items-center gap-5 pt-4">
              <Link
                href="/shop"
                className="px-7 py-3.5 bg-brass hover:bg-brass-light text-obsidian font-display tracking-widest text-sm md:text-base uppercase font-semibold transition-all flex items-center gap-3 group shadow-lg hover:shadow-brass/20"
              >
                <span>{t.home.exploreDrop}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/our-story"
                className="text-xs md:text-sm font-mono tracking-widest uppercase text-bone/90 hover:text-brass transition-colors py-2 flex items-center gap-2 border-b border-bone/40 hover:border-brass group"
              >
                <span>{t.home.discoverStory}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Photography (5 cols) */}
          <div className="campaign-photo lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="hero-image relative w-full max-w-[550px] aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] overflow-hidden">
              <Image
                src="/assets/campaigns/homepage-hero-athlete-v2.webp"
                alt="Jiwa Fighter Athlete in Iron Heritage Jersey"
                fill
sizes="(max-width: 768px) 100vw, 60vw"
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-40 lg:opacity-20" />
            </div>

            {/* Vertical Chapter Indicator on right edge */}
            <div className="hidden 2xl:flex absolute -right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-[10px] font-mono tracking-widest text-bone/50">
              <span className="text-brass font-bold">01</span>
              <span className="text-bone/30">/</span>
              <span>04</span>
              <div className="h-16 w-[1px] bg-brass/40" />
              <div className="[writing-mode:vertical-rl] tracking-widest uppercase">
                MALAYSIA / 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR COLLECTIONS / THE FIRST CHAPTER */}
      <section
        ref={collectionsRef}
        className="collection-rail w-full bg-bone text-obsidian py-16 md:py-24 border-b border-bone-border relative overflow-hidden"
      >
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Header Description (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="collection-reveal flex items-center gap-3">
                <span className="text-xs font-mono tracking-widestEditorial uppercase text-text-muted-dark">
                  {t.home.collectionsKicker}
                </span>
                <div className="h-[1px] w-12 bg-brass" />
              </div>

              <h2 className="collection-reveal font-display text-4xl sm:text-5xl md:text-6xl text-obsidian tracking-tight leading-[0.9] uppercase">
                {t.home.firstChapterTitle}
              </h2>

              <p className="collection-reveal text-xs sm:text-sm text-text-muted-dark leading-relaxed font-sans max-w-sm">
                {t.home.firstChapterDesc}
              </p>
            </div>

            {/* Right Cards Grid (8 cols) */}
            <div className="lg:col-span-8 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {[...collectionCards.slice(activeSlide), ...collectionCards.slice(0, activeSlide)].map((card, idx) => (
                  <Link
                    key={card.id}
                    href={card.href}
                    className={`collection-card group block relative bg-obsidian text-bone overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
                      idx === 0
                        ? 'border-brass shadow-lg'
                        : 'border-transparent hover:border-brass/50'
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian-subtle">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-4 flex items-center justify-between bg-obsidian border-t border-obsidian-border">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-brass">{card.id}</span>
                        <h3 className="font-display text-sm tracking-wider uppercase text-bone group-hover:text-brass transition-colors">
                          {card.title}
                        </h3>
                      </div>
                      <ArrowRight className="w-4 h-4 text-brass/80 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Carousel arrows */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-obsidian/30 hover:border-obsidian text-obsidian flex items-center justify-center transition-colors"
                  aria-label="Previous collection slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-brass hover:bg-brass-light text-obsidian flex items-center justify-center transition-colors shadow-md"
                  aria-label="Next collection slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
