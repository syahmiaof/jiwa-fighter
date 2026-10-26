'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CampaignLines } from '@/components/ui/CampaignLines';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useHeroReveal, useScrollReveal } from '@/lib/motion';

export default function SizeGuidePage() {
  const { t } = useLanguage();
  const heroRef = useHeroReveal<HTMLDivElement>();
  const guideRef = useScrollReveal<HTMLDivElement>('.guide-panel', 0.1);

  // Fit Preference Toggle state
  const [fitPreference, setFitPreference] = useState<'athletic' | 'relaxed'>('athletic');
  const [selectedRow, setSelectedRow] = useState('M');

  const sizeChartData = [
    { size: 'S', chest: 96, length: 68 },
    { size: 'M', chest: 100, length: 70 },
    { size: 'L', chest: 104, length: 72 },
    { size: 'XL', chest: 108, length: 74 },
    { size: 'XXL', chest: 112, length: 76 },
  ];

  return (
    <div className="page-size w-full bg-bone text-obsidian min-h-screen">
      {/* 1. TOP HERO SECTION */}
      <section
        ref={heroRef}
        className="relative border-b border-bone-border py-6 md:py-10 bg-bone overflow-hidden"
      >
        {/* Songket background pattern */}
        <div className="absolute top-0 right-1/3 w-80 h-full opacity-15 pointer-events-none hidden md:block">
          <Image
            src="/assets/textures/songket-pattern-only.png"
            alt="Songket watermark"
            fill
sizes="(max-width: 768px) 100vw, 60vw"
            className="object-contain"
          />
        </div>

        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Typography & Story (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widestEditorial uppercase text-text-muted-dark">
                {t.sizeGuide.breadcrumb}
              </span>
              <div className="h-[1px] w-12 bg-brass" />
            </div>

            <h1 className="hero-headline font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-obsidian tracking-tighterEditorial leading-[0.9] uppercase">
              <CampaignLines text={t.sizeGuide.headline} />
            </h1>

            <div className="text-xs font-mono tracking-widest uppercase text-brass font-bold">
              {t.sizeGuide.kicker}
            </div>

            <p className="hero-subtext text-xs sm:text-sm font-sans text-text-muted-dark max-w-md">
              {t.sizeGuide.subtext}
            </p>
          </div>

          {/* Right: Athlete with Measurement Overlay (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="hero-image relative w-full max-w-[500px] aspect-[4/3] bg-bone-card/50 border border-bone-border overflow-hidden">
              <Image
                src="/assets/campaigns/size-guide-athlete.webp"
                alt="Athlete with Measurement Annotations"
                fill
sizes="(max-width: 768px) 100vw, 60vw"
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SIZE CHART & MEASUREMENT GUIDE */}
      <section ref={guideRef} className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start lg:divide-x divide-bone-border/70">
          {/* Left Column: Size Chart Table (6 cols) */}
          <div className="guide-panel lg:col-span-6 space-y-6 lg:pr-8">
            <div className="flex items-center justify-between pb-3 border-b border-bone-border">
              <h2 className="font-display text-3xl sm:text-4xl text-obsidian uppercase">
                {t.sizeGuide.chartTitle}
              </h2>
              <span className="text-xs font-mono text-text-muted-dark tracking-wider">
                {t.sizeGuide.chartUnits}
              </span>
            </div>

            {/* Table */}
            <div className="border border-obsidian/20 overflow-hidden shadow-sm">
              <table className="w-full text-center border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-obsidian text-bone uppercase tracking-widest">
                    <th className="py-3.5 px-4 font-bold border-r border-obsidian-border">
                      {t.sizeGuide.sizeCol}
                    </th>
                    <th className="py-3.5 px-4 font-bold border-r border-obsidian-border">
                      {t.sizeGuide.chestCol}
                    </th>
                    <th className="py-3.5 px-4 font-bold">
                      {t.sizeGuide.lengthCol}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bone-border/70">
                  {sizeChartData.map((row) => {
                    const isSelected = selectedRow === row.size;
                    return (
                      <tr
                        key={row.size}
                        onClick={() => setSelectedRow(row.size)}
                        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedRow(row.size); } }}
                        tabIndex={0}
                        aria-selected={isSelected}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-brass text-obsidian font-bold'
                            : 'bg-bone hover:bg-bone-card/70 text-obsidian'
                        }`}
                      >
                        <td className="py-3.5 px-4 border-r border-bone-border/50 font-display text-sm">
                          {row.size}
                        </td>
                        <td className="py-3.5 px-4 border-r border-bone-border/50">
                          {row.chest}
                        </td>
                        <td className="py-3.5 px-4">{row.length}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] font-mono text-text-muted-dark leading-normal">
              * Measurements shown are provisional demo specifications based on Malaysian athletic sizing charts.
            </p>
          </div>

          {/* Right Column: How to Measure & Fit Preference (6 cols) */}
          <div className="guide-panel lg:col-span-6 space-y-5 lg:space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-bone-border">
              <h2 className="font-display text-3xl sm:text-4xl text-obsidian uppercase">
                {t.sizeGuide.howToMeasure}
              </h2>
              <span className="text-xs font-mono text-brass font-bold tracking-wider">
                {t.sizeGuide.getRightFit}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Instructions (7 cols) */}
              <div className="sm:col-span-7 space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-display text-base tracking-wider uppercase text-obsidian">
                    {t.sizeGuide.chestMeasureTitle}
                  </h3>
                  <p className="text-xs font-sans text-text-muted-dark leading-relaxed">
                    {t.sizeGuide.chestMeasureDesc}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display text-base tracking-wider uppercase text-obsidian">
                    {t.sizeGuide.lengthMeasureTitle}
                  </h3>
                  <p className="text-xs font-sans text-text-muted-dark leading-relaxed">
                    {t.sizeGuide.lengthMeasureDesc}
                  </p>
                </div>
              </div>

              {/* T-Shirt Diagram (5 cols) */}
              <div className="sm:col-span-5 relative aspect-square lg:aspect-[16/10] lg:bg-transparent lg:border-0 lg:p-0 flex items-center justify-center">
                <Image
                  src="/assets/campaigns/tshirt-measurement-diagram.webp"
                  alt="T-shirt Line Diagram"
                  width={240}
                  height={240}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Fit Preference Selection */}
            <div className="pt-4 border-t border-bone-border space-y-3">
              <div>
                <h3 className="font-display text-xl text-obsidian tracking-wider uppercase">
                  {t.sizeGuide.fitPrefTitle}
                </h3>
                <p className="text-xs font-mono text-text-muted-dark">
                  {t.sizeGuide.fitPrefSub}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Athletic Fit */}
                <button
                  onClick={() => setFitPreference('athletic')}
                  aria-pressed={fitPreference === 'athletic'}
                  className={`p-4 text-left border transition-all ${
                    fitPreference === 'athletic'
                      ? 'bg-brass border-brass text-obsidian shadow'
                      : 'bg-bone-card border-bone-border hover:border-obsidian text-obsidian'
                  }`}
                >
                  <div className="font-display text-base uppercase tracking-wider mb-1">
                    {t.sizeGuide.athleticFit}
                  </div>
                  <p className="text-xs font-sans leading-relaxed opacity-85">
                    {t.sizeGuide.athleticDesc}
                  </p>
                </button>

                {/* Relaxed Fit */}
                <button
                  onClick={() => setFitPreference('relaxed')}
                  aria-pressed={fitPreference === 'relaxed'}
                  className={`p-4 text-left border transition-all ${
                    fitPreference === 'relaxed'
                      ? 'bg-brass border-brass text-obsidian shadow'
                      : 'bg-bone-card border-bone-border hover:border-obsidian text-obsidian'
                  }`}
                >
                  <div className="font-display text-base uppercase tracking-wider mb-1">
                    {t.sizeGuide.relaxedFit}
                  </div>
                  <p className="text-xs font-sans leading-relaxed opacity-85">
                    {t.sizeGuide.relaxedDesc}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
