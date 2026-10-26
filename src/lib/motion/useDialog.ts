'use client';

import { useEffect, useRef } from 'react';

const openDialogs = new Set<HTMLDialogElement>();
let previousBodyOverflow = '';

/** Native top-layer dialogs provide inert background and nested-modal isolation. */
export function useDialog(isOpen: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (openDialogs.size === 0) {
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    openDialogs.add(dialog);
    document.dispatchEvent(new CustomEvent('jiwa:modal-open', { detail: dialog }));
    dialog.showModal();
    const cancel = (event: Event) => {
      event.preventDefault();
      closeRef.current();
    };
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      )).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener('cancel', cancel);
    dialog.addEventListener('keydown', trapFocus);
    const focusable = dialog.querySelector<HTMLElement>('[data-dialog-autofocus]')
      ?? dialog.querySelector<HTMLElement>('button, input, a[href], select, textarea');
    focusable?.focus({ preventScroll: true });
    return () => {
      dialog.removeEventListener('cancel', cancel);
      dialog.removeEventListener('keydown', trapFocus);
      dialog.close();
      openDialogs.delete(dialog);
      if (openDialogs.size === 0) document.body.style.overflow = previousBodyOverflow;
      const remainingDialog = Array.from(openDialogs).at(-1);
      if (previousFocus?.isConnected && (!remainingDialog || remainingDialog.contains(previousFocus))) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  return dialogRef;
}
