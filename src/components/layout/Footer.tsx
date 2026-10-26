'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-obsidian-subtle border-t border-obsidian-border text-bone">
      {/* Top Section */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-[75px] py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" aria-label="JIWA FIGHTER home" className="flex items-center group">
              <div className="brand-logo-footer relative w-[190px] sm:w-[205px] aspect-[3.27/1] shrink-0 flex items-center">
                <Image
                  src="/assets/brand/logo-horizontal-brass.png"
                  alt="JIWA FIGHTER"
                  width={1834}
                  height={561}
                  unoptimized
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-bone/60 max-w-sm leading-relaxed font-sans">
              {language === 'en'
                ? 'Premium Malaysian combatwear and heritage streetwear. Engineered for discipline, movement, and identity.'
                : 'Pakaian tempur dan streetwear warisan premium Malaysia. Dicipta untuk disiplin, ketangkasan, dan jati diri.'}
            </p>
            <div className="pt-2 text-[11px] text-brass font-mono tracking-wider">
              MALAYSIAN HERITAGE / MODERN MOVEMENT
            </div>
          </div>

          {/* Nav Col 1: Catalog */}
          <div className="space-y-3">
            <h4 className="font-display text-sm tracking-widest uppercase text-brass">
              {language === 'en' ? 'CATALOG' : 'KATALOG'}
            </h4>
            <ul className="space-y-2 text-xs font-mono text-bone/70">
              <li>
                <Link href="/shop" className="hover:text-brass transition-colors">
                  Shop All Drops
                </Link>
              </li>
              <li>
                <Link href="/collections/silat-series" className="hover:text-brass transition-colors">
                  Silat Series 02
                </Link>
              </li>
              <li>
                <Link href="/products/keris-tuah" className="hover:text-brass transition-colors">
                  Keris Tuah Edition
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="hover:text-brass transition-colors">
                  Warisan Lookbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Col 2: Identity & Service */}
          <div className="space-y-3">
            <h4 className="font-display text-sm tracking-widest uppercase text-brass">
              {language === 'en' ? 'SERVICES' : 'PERKHIDMATAN'}
            </h4>
            <ul className="space-y-2 text-xs font-mono text-bone/70">
              <li>
                <Link href="/our-story" className="hover:text-brass transition-colors">
                  Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link href="/custom" className="hover:text-brass transition-colors">
                  Team & Club Orders
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-brass transition-colors">
                  Size & Fit Guide
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-brass transition-colors">
                  Customer Care & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-3">
            <h4 className="font-display text-sm tracking-widest uppercase text-brass">
              {language === 'en' ? 'DISPATCH' : 'BULETIN'}
            </h4>
            <p className="text-xs text-bone/60 leading-relaxed font-sans">
              {language === 'en'
                ? 'Receive early alerts on Chapter releases and limited drop allocations.'
                : 'Dapatkan pemberitahuan awal tentang pelancaran bab baharu dan peruntukan siri terhad.'}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex border border-obsidian-border bg-obsidian focus-within:border-brass transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Newsletter email"
                  placeholder="fighter@email.com"
                  className="w-full px-3 py-2 text-xs bg-transparent text-bone placeholder-bone/30 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-3 bg-brass text-obsidian hover:bg-brass-light transition-colors flex items-center justify-center shrink-0"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-[10px] text-brass font-mono">
                  <Check className="w-3 h-3" />
                  <span>DEMO ONLY — No subscription was sent.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div data-satria-clearance className="border-t border-obsidian-border bg-obsidian py-6">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-bone/50">
          <div className="flex items-center gap-2">
            <span className="text-brass">●</span>
            <span>JIWA FIGHTER V3 PROTOTYPE</span>
            <span>—</span>
            <span>IRON HERITAGE ENGINEERING</span>
          </div>
          <div>
            JIWA FIGHTER © 2026. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};
