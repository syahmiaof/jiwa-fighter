'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CampaignLines } from '@/components/ui/CampaignLines';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useHeroReveal, useScrollReveal } from '@/lib/motion';

export default function LookbookPage() {
  const { t } = useLanguage();
  const heroRef = useHeroReveal<HTMLDivElement>();
  const campaignRef = useScrollReveal<HTMLDivElement>('.section2-reveal, .campaign-card', 0.1);

  const [activeStoryCard, setActiveStoryCard] = useState(0);

  const campaignCards = [
    {
      id: '01',
      title: t.lookbook.fighterTitle,
      desc: t.lookbook.fighterDesc,
      image: '/assets/campaigns/lookbook-card-fighter-v2.webp',
      alt: 'The Fighter',
    },
    {
      id: '02',
      title: t.lookbook.craftTitle,
      desc: t.lookbook.craftDesc,
      image: '/assets/campaigns/lookbook-card-craft-v2.webp',
      alt: 'The Craft',
    },
    {
      id: '03',
      title: t.lookbook.landTitle,
      desc: t.lookbook.landDesc,
      image: '/assets/campaigns/lookbook-card-land-v2.webp',
      alt: 'The Land',
    },
  ];

  const handlePrev = () => {
    setActiveStoryCard((prev) => (prev > 0 ? prev - 1 : campaignCards.length - 1));
  };

  const handleNext = () => {
    setActiveStoryCard((prev) => (prev < campaignCards.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="page-lookbook w-full bg-obsidian text-bone overflow-hidden">
      {/* 1. TOP SPLIT EDITORIAL SECTION */}
      <section ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-4.5rem)]">
        {/* Left Column: Visual Montage (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-obsidian">
          {/* Main Full-Height Warehouse Photo */}
          <div className="hero-image relative w-full h-[480px] lg:h-[580px] bg-obsidian-subtle overflow-hidden">
            <Image
              src="/assets/campaigns/lookbook-hero-warehouse-v2.webp"
              alt="Jiwa Fighter in Training Warehouse"
              fill
sizes="(max-width: 768px) 100vw, 60vw"
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-30" />
          </div>

          {/* Two Inset Detail Photos Below */}
          <div className="grid grid-cols-2 gap-1 bg-obsidian border-t border-b border-obsidian-border">
            {/* Inset 1: Gold insignia */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-obsidian-subtle">
              <Image
                src="/assets/campaigns/lookbook-inset-badge-v2.webp"
                alt="Gold JF Emblem on Songket"
                fill
sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            {/* Inset 2: Wrapping hands */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-obsidian-subtle">
              <Image
                src="/assets/campaigns/lookbook-inset-hands-v2.webp"
                alt="Athlete Wrapping Hands"
                fill
sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Typography & Story (5 cols) */}
        <div className="lg:col-span-5 bg-bone text-obsidian p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle watermark in bottom right */}
          <div className="absolute right-0 bottom-0 w-72 h-72 opacity-15 pointer-events-none hidden sm:block">
            <Image
              src="/assets/textures/songket-pattern-only.png"
              alt="Songket watermark"
              fill
sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain object-bottom-right"
            />
          </div>

          {/* Top metadata */}
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-text-muted-dark">
            <div className="flex items-center gap-3">
              <span className="hero-kicker">{t.lookbook.editorialKicker}</span>
              <div className="h-[1px] w-8 bg-brass" />
            </div>
            <div data-satria-clearance className="flex items-center gap-2">
              <span className="text-brass font-bold">01</span>
              <span>/</span>
              <span>03</span>
            </div>
          </div>

          {/* Center Title & Copy */}
          <div className="space-y-6 my-10 relative z-10">
            <h1 className="hero-headline font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-obsidian tracking-tighterEditorial leading-[0.9] uppercase">
              <CampaignLines text={t.lookbook.headline} />
            </h1>

            <div className="text-sm font-mono tracking-widest uppercase text-brass font-bold">
              {t.lookbook.subhead}
            </div>

            <p className="hero-subtext text-xs sm:text-sm font-sans text-text-muted-dark max-w-md leading-relaxed">
              {t.lookbook.description}
            </p>

            <div className="hero-cta pt-4">
              <Link
                href="/collections/silat-series"
                className="inline-flex items-center gap-3 px-6 py-3.5 border-2 border-obsidian text-obsidian hover:bg-obsidian hover:text-bone font-display tracking-widest text-sm uppercase transition-all group"
              >
                <span>{t.lookbook.enterStory}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Bottom vertical tag on right edge (desktop) */}
          <div className="hidden lg:flex absolute bottom-8 right-4 text-[10px] font-mono tracking-[0.25em] text-text-muted-dark uppercase origin-bottom-right rotate-90">
            <span>JIWA FIGHTER / MALAYSIA 2026</span>
          </div>
        </div>
      </section>

      {/* 2. BOTTOM SECTION: EXPLORE THE CAMPAIGN */}
      <section
        ref={campaignRef}
        className="w-full bg-obsidian py-14 md:py-20 border-t border-obsidian-border"
      >
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header (4 cols) */}
          <div data-satria-clearance className="lg:col-span-4 space-y-3">
              <h2 className="section2-reveal font-display text-3xl text-bone tracking-wide uppercase">
                {t.lookbook.exploreCampaign}
              </h2>
              <p className="section2-reveal text-xs text-bone/70 font-sans max-w-sm leading-relaxed">
                {t.lookbook.campaignSubtext}
              </p>
            </div>

            {/* Right Cards & Controls (8 cols) */}
            <div className="lg:col-span-8 flex flex-col md:flex-row gap-5 items-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 w-full">
                {campaignCards.map((card, idx) => (
                  <div
                    key={card.id}
                    onClick={() => setActiveStoryCard(idx)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={activeStoryCard === idx}
                    onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setActiveStoryCard(idx); } }}
                    className={`campaign-card cursor-pointer group bg-obsidian-subtle border p-3 transition-all duration-300 ${
                      activeStoryCard === idx
                        ? 'border-brass shadow-lg shadow-brass/10'
                        : 'border-obsidian-border hover:border-brass/40'
                    }`}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian mb-3">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-brass font-bold">
                          {card.id} —
                        </span>
                        <h4 className="font-display text-sm tracking-wider uppercase text-bone group-hover:text-brass transition-colors">
                          {card.title}
                        </h4>
                      </div>
                      <p className="text-[11px] font-sans text-bone/60 leading-normal">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex md:flex-col gap-2 shrink-0">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-obsidian-border hover:border-brass text-bone flex items-center justify-center transition-colors"
                  aria-label="Previous campaign perspective"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-brass hover:bg-brass-light text-obsidian flex items-center justify-center transition-colors shadow-md"
                  aria-label="Next campaign perspective"
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
