'use client';

import React from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart/CartContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useDialog } from '@/lib/motion/useDialog';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalCount,
    subtotal,
    setShowDemoNotice,
  } = useCart();
  const { t } = useLanguage();
  const dialogRef = useDialog(isOpen, closeCart);

  if (!isOpen) return null;

  return (
    <dialog ref={dialogRef} aria-label={t.cart.title} aria-modal="true" className="jiwa-dialog">
    <div className="fixed inset-0 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4">
        <div className="drawer-panel w-[min(28rem,calc(100vw-1rem))] bg-obsidian border-l border-obsidian-border text-bone flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-obsidian-border flex items-center justify-between bg-obsidian-subtle">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brass" />
              <h2 className="font-display text-xl tracking-wider uppercase text-bone">
                {t.cart.title} ({totalCount.toString().padStart(2, '0')})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1 text-bone/60 hover:text-brass transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-obsidian-subtle border border-obsidian-border flex items-center justify-center mb-4 text-brass/60">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-display text-lg text-bone/80 mb-2">{t.cart.empty}</p>
                <p className="text-xs text-bone/40 max-w-xs mb-6">
                  Select your size and add high-performance combat apparel to your bag.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-obsidian-subtle hover:bg-brass hover:text-obsidian text-bone text-xs font-mono tracking-widest uppercase border border-brass/40 transition-all"
                >
                  {t.cart.continueShopping}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 p-3 bg-obsidian-subtle/50 border border-obsidian-border/60 hover:border-brass/30 transition-all"
                >
                  <div className="relative w-20 h-24 bg-obsidian-surface shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-display text-sm tracking-wide text-bone">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id, item.size, item.color)}
                          className="text-bone/40 hover:text-red-400 transition-colors p-1"
                          title={t.cart.remove}
                          aria-label={`${t.cart.remove} ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex gap-2 text-[11px] text-bone/50 font-mono mt-1">
                        <span>{t.cart.size}: {item.size}</span>
                        <span>•</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-obsidian-border bg-obsidian">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, -1, item.color)}
                          className="px-2 py-1 text-bone/60 hover:text-brass transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono text-bone min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, 1, item.color)}
                          className="px-2 py-1 text-bone/60 hover:text-brass transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-xs text-brass font-bold">
                        RM {item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-obsidian-border bg-obsidian-subtle">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-xs font-mono tracking-widest uppercase text-bone/70">
                  {t.cart.subtotal}
                </span>
                <span className="font-display text-xl text-brass">
                  RM {subtotal}
                </span>
              </div>

              <p className="text-[11px] text-bone/40 mb-4 leading-normal font-sans">
                Taxes and simulated shipping calculated at checkout.
              </p>

              <button
                onClick={() => setShowDemoNotice(true)}
                className="w-full py-3.5 bg-brass hover:bg-brass-light text-obsidian font-display tracking-widest text-sm uppercase transition-colors flex items-center justify-center gap-2"
              >
                {t.cart.checkout}
              </button>

              <div className="mt-3 text-center">
                <span className="text-[10px] text-bone/40 uppercase tracking-widest font-mono">
                  {t.cart.demoNotice}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </dialog>
  );
};
