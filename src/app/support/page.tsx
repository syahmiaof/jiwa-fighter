'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  ArrowRight,
  Plus,
  Minus,
  Shirt,
  Package,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { supportAnswers } from '@/data/support';
import { CampaignLines } from '@/components/ui/CampaignLines';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useHeroReveal, useScrollReveal } from '@/lib/motion';

export default function SupportPage() {
  const { t, language } = useLanguage();
  const heroRef = useHeroReveal<HTMLDivElement>();
  const middleRef = useScrollReveal<HTMLDivElement>('.support-block, .support-pillar', 0.08);

  // States
  const [activeCategory, setActiveCategory] = useState<'orders' | 'shipping' | 'sizing' | 'teamwear'>('orders');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const isSubmitting = false;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories: { id: 'orders' | 'shipping' | 'sizing' | 'teamwear'; label: string }[] = [
    { id: 'orders', label: t.support.tabOrders },
    { id: 'shipping', label: t.support.tabShipping },
    { id: 'sizing', label: t.support.tabSizing },
    { id: 'teamwear', label: t.support.tabTeamwear },
  ];

  const faqData = supportAnswers[language];

  const currentFaqs = (searchQuery.trim() ? Object.values(faqData).flat() : faqData[activeCategory]).filter(faq => `${faq.q} ${faq.a}`.toLowerCase().includes(searchQuery.trim().toLowerCase()));

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;


    setIsSubmitted(true);
  };

  return (
    <div className="page-support w-full bg-bone text-obsidian min-h-screen">
      {/* 1. TOP HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-[340px] md:min-h-[390px] flex items-center bg-bone border-b border-bone-border overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full h-full">
          {/* Left: Typography & Help Search (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-4">
            <div className="hero-kicker flex items-center gap-3">
              <span className="text-xs font-mono tracking-widestEditorial uppercase text-text-muted-dark">
                {t.support.kicker}
              </span>
              <div className="h-[1px] w-12 bg-brass" />
            </div>

            <h1 className="hero-headline font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-obsidian tracking-tighterEditorial leading-[0.9] uppercase">
              <CampaignLines text={t.support.headline} />
            </h1>

            <p className="hero-subtext text-xs sm:text-sm font-sans text-text-muted-dark">
              {t.support.subtext}
            </p>

            {/* Search Input Bar */}
            <div className="hero-cta pt-3 max-w-lg">
              <div className="flex items-center border border-obsidian/30 bg-bone-card/60 px-4 py-3 focus-within:border-obsidian transition-colors">
                <Search className="w-4 h-4 text-text-muted-dark mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  aria-label={t.support.searchPlaceholder}
                  onChange={(e) => { setSearchQuery(e.target.value); setOpenFaq(null); }}
                  placeholder={t.support.searchPlaceholder}
                  className="w-full bg-transparent text-xs font-mono tracking-wider text-obsidian placeholder-text-muted-dark focus:outline-none uppercase"
                />
                <button
                  type="button"
                  className="text-obsidian hover:text-brass transition-colors p-1"
                  aria-label="Submit search"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Athlete in Training Hall (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-obsidian">
            <Image
              src="/assets/campaigns/support-hero-athlete.webp"
              alt="Support Hero Athlete"
              fill
sizes="(max-width: 768px) 100vw, 60vw"
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. MIDDLE SECTION: FAQ & CONTACT FORM */}
      <section ref={middleRef} className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Left: FAQ List (7 cols) */}
          <div className="support-block lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-bone-border">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono tracking-widestEditorial uppercase text-brass font-bold">
                    {t.support.faqKicker}
                  </span>
                  <div className="h-[1px] w-12 bg-brass" />
                </div>
                <h2 className="font-display text-4xl sm:text-5xl text-obsidian uppercase">
                  {t.support.faqTitle}
                </h2>
              </div>
              {/* Category Pills (Aligned Inline on Desktop) */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenFaq(null);
                    }}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all ${
                      activeCategory === cat.id
                        ? 'bg-brass text-obsidian font-bold shadow'
                        : 'bg-bone-card border border-bone-border hover:border-obsidian text-obsidian'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>


            {/* Accordion Questions */}
            <div className="support-faq-list space-y-3 pt-8">
              {currentFaqs.length === 0 && <p role="status" className="py-6 text-sm">{language === 'bm' ? 'Tiada jawapan ditemui. Cuba kata kunci lain.' : 'No answers found. Try another keyword.'}</p>}
              {currentFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border-b border-bone-border pb-4 transition-all"
                  >
                    <button
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between py-2 text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-brass font-bold">
                          {`0${idx + 1}`}
                        </span>
                        <span className="font-display text-lg sm:text-xl text-obsidian group-hover:text-brass transition-colors tracking-wide">
                          {faq.q}
                        </span>
                      </div>
                      <div className="p-1 text-obsidian group-hover:text-brass transition-colors shrink-0">
                        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div id={`faq-answer-${idx}`} className="pt-2 pl-7 pr-4 text-xs sm:text-sm font-sans text-text-muted-dark leading-relaxed animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="support-benefits grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-bone-border pt-5">
              <div className="flex items-start gap-2.5">
                <Shirt className="w-5 h-5 text-brass shrink-0" aria-hidden="true" />
                <div><h3 className="font-display text-[11px] tracking-wider uppercase">{t.support.pillar1Title}</h3><p className="mt-1 text-[10px] text-text-muted-dark leading-relaxed">{t.support.pillar1Desc}</p></div>
              </div>
              <div className="flex items-start gap-2.5">
                <Package className="w-5 h-5 text-brass shrink-0" aria-hidden="true" />
                <div><h3 className="font-display text-[11px] tracking-wider uppercase">{t.support.pillar2Title}</h3><p className="mt-1 text-[10px] text-text-muted-dark leading-relaxed">{t.support.pillar2Desc}</p></div>
              </div>
              <div className="flex items-start gap-2.5">
                <Users className="w-5 h-5 text-brass shrink-0" aria-hidden="true" />
                <div><h3 className="font-display text-[11px] tracking-wider uppercase">{t.support.pillar3Title}</h3><p className="mt-1 text-[10px] text-text-muted-dark leading-relaxed">{t.support.pillar3Desc}</p></div>
              </div>
            </div>
          </div>

          {/* Right: Dark Contact Box (5 cols) */}
          <div className="support-block support-contact-panel lg:col-span-5 bg-obsidian text-bone p-8 sm:p-10 border border-brass/40 shadow-xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest uppercase text-brass">
                {t.support.contactKicker}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-bone uppercase">
                {t.support.contactTitle}
              </h3>
              <p className="text-xs text-bone/70 font-sans leading-relaxed">
                {t.support.contactDesc}
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-5 bg-obsidian-subtle border border-brass/40 space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-brass">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="font-display text-lg uppercase tracking-wider">
                    MESSAGE SIMULATED
                  </span>
                </div>
                <p className="text-xs text-bone/70 font-mono leading-relaxed">
                  {t.support.demoAlert}
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="w-full py-2 bg-brass text-obsidian text-xs font-display tracking-widest uppercase"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs font-mono">
                <div className="space-y-1.5">
                  <label htmlFor="support-field-1" className="block text-bone/80 uppercase">
                    {t.support.nameLabel}
                  </label>
                  <input id="support-field-1"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-obsidian border border-obsidian-border focus:border-brass text-bone focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="support-field-2" className="block text-bone/80 uppercase">
                    {t.support.emailLabel}
                  </label>
                  <input id="support-field-2"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-obsidian border border-obsidian-border focus:border-brass text-bone focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="support-field-3" className="block text-bone/80 uppercase">
                    {t.support.messageLabel}
                  </label>
                  <textarea id="support-field-3"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-obsidian border border-obsidian-border focus:border-brass text-bone focus:outline-none transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-brass hover:bg-brass-light text-obsidian font-display tracking-widest text-sm uppercase transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <span>{t.support.sendEnquiry}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-bone/40 text-center font-mono">
                  DEMO PROTOCOL — Simulated contact interface.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
