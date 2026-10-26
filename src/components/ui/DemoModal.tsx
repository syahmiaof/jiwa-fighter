'use client';

import React from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { useDialog } from '@/lib/motion/useDialog';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  title = 'PROTOTYPE SIMULATION NOTICE',
  message = 'JIWA FIGHTER is currently running in high-fidelity prototype mode. Real checkout, payment processing, database transactions and external email notifications are deliberately deactivated.',
}) => {
  const dialogRef = useDialog(isOpen, onClose);
  if (!isOpen) return null;

  return (
    <dialog ref={dialogRef} aria-label={title} aria-modal="true" className="jiwa-dialog">
    <div onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-sm">
      <div className="dialog-panel relative w-full max-w-md max-h-[90dvh] overflow-y-auto bg-obsidian-subtle border border-brass/40 p-6 md:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-bone/60 hover:text-brass transition-colors p-1"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-brass/10 border border-brass/30 text-brass">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] tracking-widestEditorial uppercase text-brass block font-mono">
              DEMO STORE
            </span>
            <h3 className="font-display text-xl text-bone tracking-wide">{title}</h3>
          </div>
        </div>

        <p className="text-sm text-bone/70 leading-relaxed mb-6 font-sans">
          {message}
        </p>

        <div className="p-3 bg-obsidian border border-obsidian-border text-xs text-bone/50 mb-6 font-mono">
          No payment was taken. No order has been placed.
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-brass hover:bg-brass-light text-obsidian font-display tracking-widest text-sm uppercase transition-colors"
        >
          ACKNOWLEDGE & CONTINUE
        </button>
      </div>
    </div>
    </dialog>
  );
};
