'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useDialog } from '@/lib/motion/useDialog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { t } = useLanguage();
  const dialogRef = useDialog(isOpen, onClose);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <dialog ref={dialogRef} aria-label={t.nav.searchPlaceholder} aria-modal="true" className="jiwa-dialog">
    <div onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 flex items-start justify-center pt-20 px-4 bg-obsidian/90 backdrop-blur-md">
      <div className="dialog-panel relative w-full max-w-2xl bg-obsidian border border-brass/30 shadow-2xl overflow-hidden">
        {/* Header / Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-obsidian-border bg-obsidian-subtle">
          <Search className="w-5 h-5 text-brass mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.nav.searchPlaceholder}
            aria-label={t.nav.searchPlaceholder}
            data-dialog-autofocus
            className="w-full bg-transparent text-bone placeholder-bone/40 text-base focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 text-bone/60 hover:text-bone transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-bone/50 text-xs tracking-widest uppercase font-mono">
              Type product name, category, or collection
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-bone/50 text-xs tracking-widest uppercase font-mono">
              No products found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 bg-obsidian-subtle/60 hover:bg-obsidian-subtle border border-obsidian-border/50 hover:border-brass/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-14 bg-obsidian-surface shrink-0 overflow-hidden">
                    <Image
                      src={product.images.main}
                      alt={product.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-brass uppercase font-mono tracking-wider">
                      {product.collection}
                    </span>
                    <h4 className="font-display text-sm text-bone group-hover:text-brass transition-colors tracking-wide">
                      {product.name}
                    </h4>
                    <span className="text-xs text-bone/60">{product.priceFormatted}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-bone/40 group-hover:text-brass group-hover:translate-x-1 transition-all" />
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-obsidian border-t border-obsidian-border text-[11px] text-bone/40 flex justify-between items-center font-mono">
          <span>JIWA FIGHTER</span>
          <span>PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
    </dialog>
  );
};
