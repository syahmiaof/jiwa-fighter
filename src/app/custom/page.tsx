'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, MessageSquare, Shirt, Settings, CheckCircle2 } from 'lucide-react';
import { CampaignLines } from '@/components/ui/CampaignLines';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useHeroReveal, useScrollReveal } from '@/lib/motion';

export default function CustomTeamwearPage() {
  const { t } = useLanguage();
  const heroRef = useHeroReveal<HTMLDivElement>();
  const stepsRef = useScrollReveal<HTMLDivElement>('.step-card', 0.1);

  // Form State
  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    teamType: '',
    quantity: '',
    message: '',
  });

  const isSubmitting = false;
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.orgName || !formData.email || !formData.teamType || !formData.quantity) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    setErrorMessage('');


    setSubmitted(true);
  };

  return (
    <div className="page-custom w-full bg-obsidian text-bone overflow-hidden">
      {/* 1. TOP SPLIT: HERO SQUAD + QUOTE FORM */}
      <section
        ref={heroRef}
        className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-4.5rem)] border-b border-obsidian-border"
      >
        {/* Left: Squad Photography & Authentic Brand Artwork (7 cols) */}
        <div className="lg:col-span-7 relative min-h-[500px] lg:min-h-full flex flex-col justify-start p-8 sm:p-12 lg:p-16 overflow-hidden bg-obsidian">
          {/* Authentic artwork image from reference mockup */}
          <div className="hero-image absolute inset-0 z-0">
            <Image
              src="/assets/campaigns/teamwear-group-athletes-v2.webp"
              alt="Jiwa Fighter Teamwear Squad - Your Crew. One Jiwa."
              fill
sizes="(max-width: 768px) 100vw, 60vw"
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Accessible heading for screen readers & SEO */}
          <div className="teamwear-copy relative z-10">
            <p className="hero-kicker text-brass text-xs tracking-widest uppercase mb-5">JIWA FIGHTER / TEAM & CLUB ORDERS</p>
            <h1 className="hero-headline font-display"><CampaignLines text={t.custom.headline} /></h1>
            <p className="hero-subtext mt-4 text-xs tracking-widest uppercase max-w-sm">{t.custom.subtext}</p>
          </div>
        </div>

        {/* Right: Quotation Form Panel (5 cols) */}
        <div className="hero-subtext lg:col-span-5 bg-bone text-obsidian p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
          <div className="space-y-6 max-w-md mx-auto w-full">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-widestEditorial uppercase text-brass font-bold">
                  {t.custom.formKicker}
                </span>
                <div className="h-[1px] w-12 bg-brass" />
              </div>
              <h2 className="font-sans font-bold text-2xl sm:text-3xl text-obsidian tracking-tight leading-snug">
                {t.custom.formTitle}
              </h2>
            </div>

            {submitted ? (
              <div className="p-6 bg-obsidian text-bone border border-brass/50 space-y-4 animate-fade-in">
                <div className="flex items-center gap-3 text-brass">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <h3 className="font-display text-xl uppercase tracking-wider">
                    SIMULATION RECORDED
                  </h3>
                </div>
                <p className="text-xs text-bone/70 font-mono leading-relaxed">
                  {t.custom.demoAlert}
                </p>
                <div className="p-3 bg-obsidian-subtle text-[11px] font-mono text-brass border border-brass/30">
                  TEAM: {formData.orgName.toUpperCase()} | QTY: {formData.quantity}
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      orgName: '',
                      email: '',
                      teamType: '',
                      quantity: '',
                      message: '',
                    });
                  }}
                  className="w-full py-2.5 bg-brass hover:bg-brass-light text-obsidian text-xs font-display tracking-widest uppercase transition-colors"
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                {errorMessage && (
                  <div className="p-2.5 bg-red-100 border border-red-400 text-red-800 text-xs">
                    {errorMessage}
                  </div>
                )}

                {/* Org Name */}
                <div className="space-y-1.5">
                  <label htmlFor="custom-field-1" className="block uppercase font-bold text-obsidian">
                    {t.custom.orgName} *
                  </label>
                  <input id="custom-field-1"
                    type="text"
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    placeholder={t.custom.orgPlaceholder}
                    className="w-full p-3 bg-bone-card border border-bone-border focus:border-obsidian focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="custom-field-2" className="block uppercase font-bold text-obsidian">
                    {t.custom.contactEmail} *
                  </label>
                  <input id="custom-field-2"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.custom.emailPlaceholder}
                    className="w-full p-3 bg-bone-card border border-bone-border focus:border-obsidian focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Team Type */}
                <div className="space-y-1.5">
                  <label htmlFor="custom-field-3" className="block uppercase font-bold text-obsidian">
                    {t.custom.teamType} *
                  </label>
                  <select id="custom-field-3"
                    value={formData.teamType}
                    onChange={(e) => setFormData({ ...formData, teamType: e.target.value })}
                    className="w-full p-3 bg-bone-card border border-bone-border focus:border-obsidian focus:outline-none transition-colors"
                    required
                  >
                    <option value="">{t.custom.selectTeamType}</option>
                    <option value="silat">{t.custom.silatClub}</option>
                    <option value="muaythai">{t.custom.muayThai}</option>
                    <option value="martialarts">{t.custom.martialArts}</option>
                    <option value="community">{t.custom.sportingCommunity}</option>
                  </select>
                </div>

                {/* Estimated Quantity */}
                <div className="space-y-1.5">
                  <label htmlFor="custom-field-4" className="block uppercase font-bold text-obsidian">
                    {t.custom.estimatedQty} *
                  </label>
                  <select id="custom-field-4"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full p-3 bg-bone-card border border-bone-border focus:border-obsidian focus:outline-none transition-colors"
                    required
                  >
                    <option value="">{t.custom.selectQty}</option>
                    <option value="10-25">{t.custom.qtySmall}</option>
                    <option value="26-50">{t.custom.qtyMedium}</option>
                    <option value="50+">{t.custom.qtyLarge}</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="custom-field-5" className="block uppercase font-bold text-obsidian">
                    {t.custom.message}
                  </label>
                  <textarea id="custom-field-5"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.custom.messagePlaceholder}
                    className="w-full p-3 bg-bone-card border border-bone-border focus:border-obsidian focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-obsidian hover:bg-obsidian-subtle text-bone font-display tracking-widest text-sm uppercase transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <span>{isSubmitting ? t.custom.submitting : t.custom.submitBtn}</span>
                  <ArrowRight className="w-4 h-4 text-brass" />
                </button>

                <p className="text-[10px] text-text-muted-dark text-center font-mono">
                  DEMO PROTOCOL — No real email or backend database connected.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 2. THREE-STEP PRODUCTION PROCESS */}
      <section
        ref={stepsRef}
        data-satria-clearance
        className="w-full bg-obsidian py-16 md:py-20 border-b border-obsidian-border"
      >
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-obsidian-border/80 border-t border-b border-obsidian-border/80 py-6">
            {/* Step 01 */}
            <div className="step-card md:px-8 py-6 space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-brass group-hover:text-brass-light transition-colors">01</span>
                <MessageSquare className="w-8 h-8 text-brass/70" />
              </div>
              <h3 className="font-display text-2xl uppercase tracking-wider text-bone group-hover:text-brass transition-colors">
                {t.custom.step1Title}
              </h3>
              <p className="text-sm text-bone/70 font-sans leading-relaxed">
                {t.custom.step1Desc}
              </p>
            </div>

            {/* Step 02 */}
            <div className="step-card md:px-8 py-6 space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-brass group-hover:text-brass-light transition-colors">02</span>
                <Shirt className="w-8 h-8 text-brass/70" />
              </div>
              <h3 className="font-display text-2xl uppercase tracking-wider text-bone group-hover:text-brass transition-colors">
                {t.custom.step2Title}
              </h3>
              <p className="text-sm text-bone/70 font-sans leading-relaxed">
                {t.custom.step2Desc}
              </p>
            </div>

            {/* Step 03 */}
            <div className="step-card md:px-8 py-6 space-y-4 group">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-brass group-hover:text-brass-light transition-colors">03</span>
                <Settings className="w-8 h-8 text-brass/70" />
              </div>
              <h3 className="font-display text-2xl uppercase tracking-wider text-bone group-hover:text-brass transition-colors">
                {t.custom.step3Title}
              </h3>
              <p className="text-sm text-bone/70 font-sans leading-relaxed">
                {t.custom.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
