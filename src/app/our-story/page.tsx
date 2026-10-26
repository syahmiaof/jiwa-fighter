'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CampaignLines } from '@/components/ui/CampaignLines';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useHeroReveal, useScrollReveal, prefersReducedMotion } from '@/lib/motion';

export default function OurStoryPage() {
  const { t } = useLanguage();
  const heroRef = useHeroReveal<HTMLDivElement>();
  const valuesRef = useScrollReveal<HTMLDivElement>('.value-pillar', 0.12);

  const scrollToValues = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('values-section')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <div className="page-story w-full bg-obsidian text-bone overflow-hidden">
      {/* 1. TOP HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-4.5rem)] flex items-center bg-obsidian border-b border-obsidian-border overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full min-h-[calc(100vh-4.5rem)]">
          {/* Left: Bone Panel with Diagonal Songket Border (6 cols) */}
          <div className="lg:col-span-6 bg-bone text-obsidian p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
            {/* Gold chevron accent along diagonal edge */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[3px] bg-brass shadow-[0_0_8px_rgba(198,162,96,0.4)] z-20" />
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[24px] pointer-events-none opacity-20 bg-[radial-gradient(#C6A260_1px,transparent_1px)] [background-size:6px_6px] z-10" />
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[24px] pointer-events-none opacity-20 bg-[radial-gradient(#C6A260_1px,transparent_1px)] [background-size:6px_6px] z-10" />
            {/* Geometric chevron accent on right side */}
            <div className="absolute -right-16 top-0 bottom-0 w-32 opacity-25 pointer-events-none hidden lg:block">
              <Image
                src="/assets/textures/songket-pattern-only.png"
                alt="Motif"
                fill
sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain"
              />
            </div>

            <div className="space-y-6 max-w-xl relative z-10">
              <div className="hero-kicker flex items-center gap-3">
                <span className="text-xs font-mono tracking-widestEditorial uppercase text-text-muted-dark">
                  {t.story.kicker}
                </span>
                <div className="h-[1px] w-12 bg-brass" />
              </div>

              <h1 className="hero-headline font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-obsidian tracking-tighterEditorial leading-[0.9] uppercase">
                <CampaignLines text={t.story.headline} />
              </h1>

              <p className="hero-subtext text-xs sm:text-sm font-sans text-text-muted-dark leading-relaxed">
                {t.story.description}
              </p>

              <div className="hero-cta pt-4">
                <button
                  onClick={scrollToValues}
                  className="inline-flex items-center gap-3 px-6 py-3.5 border-2 border-obsidian text-obsidian hover:bg-obsidian hover:text-bone font-display tracking-widest text-sm uppercase transition-all group"
                >
                  <span>{t.story.exploreValues}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Photographic Hero (6 cols) */}
          <div className="hero-image lg:col-span-6 relative min-h-[400px] lg:min-h-full bg-obsidian overflow-hidden">
            <Image
              src="/assets/campaigns/our-story-bench-athlete.webp"
              alt="Jiwa Fighter Athlete on Bench"
              fill
sizes="(max-width: 768px) 100vw, 60vw"
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent lg:opacity-40" />
            <div
              aria-hidden="true"
              className="hidden lg:block absolute inset-0 z-10 bg-bone [clip-path:polygon(0_0,22%_0,48%_100%,0_100%)]"
            >
              <div className="absolute inset-0 bg-[url('/assets/textures/songket-pattern-only.png')] bg-[length:180px_170px] bg-repeat opacity-35" />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M22 0 L48 100" fill="none" stroke="#C6A260" strokeWidth="0.35" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUES SECTION: ROOTED, RESILIENT, RELENTLESS */}
      <section
        id="values-section"
        ref={valuesRef}
        className="w-full bg-obsidian py-16 md:py-24 border-b border-obsidian-border relative overflow-hidden"
      >
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Value 1: ROOTED */}
            <div className="value-pillar space-y-4 pr-4 border-l-2 md:border-l-0 md:border-r border-obsidian-border/80 pl-4 md:pl-0 relative">
              <div className="flex items-center gap-3 text-xs font-mono text-brass">
                <span>001 / 003</span>
                <div className="h-[1px] w-8 bg-brass" />
              </div>

              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-bone tracking-tight uppercase">
                {t.story.rootedTitle}
              </h2>

              <div className="text-xs font-mono tracking-widest uppercase text-brass font-bold">
                {t.story.rootedSub}
              </div>

              <p className="text-xs sm:text-sm font-sans text-bone/70 leading-relaxed">
                {t.story.rootedDesc}
              </p>
            </div>

            {/* Value 2: RESILIENT */}
            <div className="value-pillar space-y-4 pr-4 border-l-2 md:border-l-0 md:border-r border-obsidian-border/80 pl-4 md:pl-0 relative">
              <div className="flex items-center gap-3 text-xs font-mono text-brass">
                <span>002 / 003</span>
                <div className="h-[1px] w-8 bg-brass" />
              </div>

              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-bone tracking-tight uppercase">
                {t.story.resilientTitle}
              </h2>

              <div className="text-xs font-mono tracking-widest uppercase text-brass font-bold">
                {t.story.resilientSub}
              </div>

              <p className="text-xs sm:text-sm font-sans text-bone/70 leading-relaxed">
                {t.story.resilientDesc}
              </p>
            </div>

            {/* Value 3: RELENTLESS */}
            <div className="value-pillar space-y-4 pl-4 md:pl-0 border-l-2 md:border-l-0 border-obsidian-border">
              <div className="flex items-center gap-3 text-xs font-mono text-brass">
                <span>003 / 003</span>
                <div className="h-[1px] w-8 bg-brass" />
              </div>

              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-bone tracking-tight uppercase">
                {t.story.relentlessTitle}
              </h2>

              <div className="text-xs font-mono tracking-widest uppercase text-brass font-bold">
                {t.story.relentlessSub}
              </div>

              <p className="text-xs sm:text-sm font-sans text-bone/70 leading-relaxed">
                {t.story.relentlessDesc}
              </p>
            </div>
          </div>

          {/* Bottom CTA bar */}
          <div className="mt-16 pt-10 border-t border-obsidian-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xs font-mono tracking-widest text-bone/60 uppercase">
              EXPERIENCE THE CRAFT & DISCIPLINE IN EVERY FIBER.
            </div>
            <Link
              href="/shop"
              className="px-7 py-3.5 bg-brass hover:bg-brass-light text-obsidian font-display tracking-widest text-sm uppercase font-semibold transition-colors flex items-center gap-3"
            >
              <span>EXPLORE ALL APPAREL</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
