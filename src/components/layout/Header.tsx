'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useCart } from '@/lib/cart/CartContext';
import { SearchModal } from '@/components/search/SearchModal';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { totalCount, openCart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setIsMobileMenuOpen(false); menuButtonRef.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.shop, href: '/shop' },
    { label: t.nav.collections, href: '/collections/silat-series' },
    { label: t.nav.lookbook, href: '/lookbook' },
    { label: t.nav.ourStory, href: '/our-story' },
    { label: t.nav.custom, href: '/custom' },
  ];

  const isActive = (href: string) => {
    if (href === '/shop') return pathname === '/shop';
    if (href === '/collections/silat-series') return pathname.startsWith('/collections');
    return pathname === href;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-obsidian border-b border-obsidian-border/80 transition-all">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-[75px] h-16 flex items-center justify-between">
          {/* Official V3 horizontal lockup, cropped from the approved alpha master. */}
          <Link href="/" aria-label="JIWA FIGHTER home" className="flex items-center group">
            <div className="brand-logo-horizontal relative w-[135px] sm:w-[150px] lg:w-[160px] aspect-[3.27/1] shrink-0 flex items-center">
              <Image
                src="/assets/brand/logo-horizontal-white.png"
                alt="JIWA FIGHTER"
                width={1834}
                height={561}
                priority
                unoptimized
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`text-xs font-mono tracking-widestEditorial uppercase transition-all relative py-1 ${
                    active
                      ? 'text-brass font-semibold'
                      : 'text-bone/80 hover:text-bone'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brass animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Controls & Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-bone/80 hover:text-brass transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Vertical divider matching reference */}
            <span className="hidden sm:inline-block h-4 w-[1px] bg-bone/30" aria-hidden="true" />

            {/* Language Switcher (EN / BM) */}
            <div className="flex items-center text-xs tracking-wider font-mono">
              <button
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                className={`transition-colors py-0.5 ${
                  language === 'en'
                    ? 'text-brass font-bold border-b border-brass'
                    : 'text-bone/50 hover:text-bone'
                }`}
              >
                EN
              </button>
              <span className="text-bone/30 mx-1.5">/</span>
              <button
                onClick={() => setLanguage('bm')}
                aria-pressed={language === 'bm'}
                className={`transition-colors py-0.5 ${
                  language === 'bm'
                    ? 'text-brass font-bold border-b border-brass'
                    : 'text-bone/50 hover:text-bone'
                }`}
              >
                BM
              </button>
            </div>

            {/* Bag Icon & Counter */}
            <button
              onClick={openCart}
              className="flex items-center gap-1.5 text-bone/80 hover:text-brass transition-colors p-1"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-mono text-xs font-bold text-bone">
                {totalCount.toString().padStart(2, '0')}
              </span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-bone/80 hover:text-brass transition-colors ml-1"
              ref={menuButtonRef}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-brass" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-navigation" className="lg:hidden border-t border-obsidian-border bg-obsidian-subtle/95 backdrop-blur-md px-6 py-6 animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                  aria-current={active ? 'page' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-display tracking-widest uppercase transition-colors ${
                      active ? 'text-brass' : 'text-bone hover:text-brass'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-obsidian-border flex flex-col gap-2">
                <Link
                  href="/size-guide"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs text-bone/60 hover:text-brass uppercase tracking-widest font-mono"
                >
                  Size & Fit Guide
                </Link>
                <Link
                  href="/support"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs text-bone/60 hover:text-brass uppercase tracking-widest font-mono"
                >
                  Customer Support & FAQ
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
