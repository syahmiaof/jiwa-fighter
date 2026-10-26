'use client';

import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, RotateCcw, Send, ShieldCheck, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { findFaqMatch } from '@/lib/satria/faq-matcher';
import { useDialog } from '@/lib/motion/useDialog';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  href?: string;
  mode?: string;
};

const SAFE_LINKS = new Set(['/shop', '/collections/silat-series', '/products/keris-tuah', '/our-story', '/size-guide', '/custom', '/support']);

function suggestionsFor(pathname: string, language: 'en' | 'bm') {
  const rows = pathname === '/custom'
    ? (language === 'bm'
      ? [['Boleh buat jersi custom?', 'team-01'], ['Bagaimana nak minta sebut harga?', 'team-02'], ['Ada kuantiti minimum?', 'team-04']]
      : [['Can I request custom teamwear?', 'team-01'], ['How do I request a quote?', 'team-02'], ['Is there a minimum order?', 'team-04']])
    : pathname === '/products/keris-tuah'
      ? (language === 'bm'
        ? [['Butiran Keris Tuah', 'product-01'], ['Panduan saiz', 'size-01'], ['Tambah ke beg macam mana?', 'buy-01']]
        : [['Keris Tuah details', 'product-01'], ['Find my size', 'size-01'], ['How do I add it to my bag?', 'buy-01']])
      : pathname === '/size-guide'
        ? (language === 'bm'
          ? [['Cara ukur dada', 'size-02'], ['Saiz apa yang dipaparkan?', 'size-03'], ['Cadangan potongan', 'size-04']]
          : [['How do I measure my chest?', 'size-02'], ['What sizes are shown?', 'size-03'], ['Fit preference help', 'size-04']])
        : language === 'bm'
          ? [['Apa itu JIWA FIGHTER?', 'brand-01'], ['Kos penghantaran?', 'ship-01'], ['Polisi pemulangan?', 'ship-04']]
          : [['What is JIWA FIGHTER?', 'brand-01'], ['How much is shipping?', 'ship-01'], ['What is the return policy?', 'ship-04']];
  return rows.map(([label, faqId]) => {
    const faq = findFaqMatch(label, language);
    return { label, faqId, href: faq?.faq.href };
  });
}

export const SatriaConcierge: React.FC = () => {
  const { language } = useLanguage();
  const pathname = usePathname() || '/';
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const dialogRef = useDialog(isOpen, () => setIsOpen(false));
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const t = language === 'bm'
    ? { launcher: 'Tanya SATRIA', title: 'SATRIA', subtitle: 'Pembantu digital JIWA FIGHTER', intro: 'Hai, saya SATRIA. Tanya tentang produk, saiz, koleksi atau navigasi. Saya akan beritahu terus jika sesuatu belum disahkan.', placeholder: 'Tulis soalan…', send: 'Hantar mesej', close: 'Tutup SATRIA', clear: 'Kosongkan perbualan', thinking: 'SATRIA sedang menyemak…', link: 'Buka halaman berkaitan', unavailable: 'Saya tak dapat semak jawapan sekarang. Cuba FAQ di bawah atau buka halaman Sokongan.', notice: 'Jawapan automatik. Polisi belum disahkan akan ditandakan dengan jelas.' }
    : { launcher: 'Ask SATRIA', title: 'SATRIA', subtitle: 'JIWA FIGHTER digital concierge', intro: 'Hi, I’m SATRIA. Ask about products, sizing, collections or navigation. I’ll say when something hasn’t been confirmed.', placeholder: 'Ask a question…', send: 'Send message', close: 'Close SATRIA', clear: 'Clear conversation', thinking: 'SATRIA is checking…', link: 'Open related page', unavailable: 'I can’t verify an answer right now. Try the FAQs below or open Support.', notice: 'Automated answers. Unconfirmed policies are labelled clearly.' };
  const suggestions = useMemo(() => suggestionsFor(pathname, language), [pathname, language]);

  useEffect(() => {
    const onOtherModal = (event: Event) => {
      const target = (event as CustomEvent<HTMLDialogElement>).detail;
      if (target !== dialogRef.current && dialogRef.current?.open) {
        dialogRef.current.close();
        setIsOpen(false);
      }
    };
    document.addEventListener('jiwa:modal-open', onOtherModal);
    return () => document.removeEventListener('jiwa:modal-open', onOtherModal);
  }, [dialogRef]);

  useEffect(() => {
    const container = listRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, busy]);

  const sendMessage = async (value: string) => {
    const question = value.trim();
    if (!question || busy || question.length > 700) return;
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const userMessage: ChatMessage = { id, role: 'user', text: question };
    const priorMessages = messages;
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setBusy(true);
    try {
      const response = await fetch('/api/satria/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          language,
          pathname,
          history: priorMessages.slice(-6).map(({ role, text }) => ({ role, content: text })),
        }),
      });
      const payload = await response.json() as { message?: string; mode?: string; href?: string };
      const safeHref = payload.href && SAFE_LINKS.has(payload.href) ? payload.href : undefined;
      setMessages((current) => [...current, {
        id: `${id}-reply`,
        role: 'assistant',
        text: typeof payload.message === 'string' && payload.message.length <= 1_500 ? payload.message : t.unavailable,
        href: safeHref,
        mode: payload.mode,
      }]);
    } catch {
      setMessages((current) => [...current, { id: `${id}-reply`, role: 'assistant', text: t.unavailable, href: '/support', mode: 'unavailable' }]);
    } finally {
      setBusy(false);
      window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      <button type="button" className={`satria-launcher${isOpen ? ' satria-launcher-open' : ''}`} aria-label={t.launcher} aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setIsOpen(true)}>
        <span className="satria-mascot" aria-hidden="true">
          {isOpen ? <X className="satria-mascot-close" /> : (
            <>
              <Image src="/assets/brand/satria-robot-head.png" alt="" fill sizes="44px" className="object-contain" />
              <span className="satria-mascot-blink satria-mascot-blink-left" />
              <span className="satria-mascot-blink satria-mascot-blink-right" />
            </>
          )}
        </span>
        <span>{t.launcher}</span>
      </button>
      {isOpen && (
        <dialog ref={dialogRef} className="satria-dialog" aria-labelledby="satria-title" aria-describedby="satria-notice">
          <section className="satria-panel">
            <header className="satria-header">
              <div className="satria-mark" aria-hidden="true">
                <Image src="/assets/brand/satria-robot-head.png" alt="" fill sizes="44px" className="object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 id="satria-title">{t.title}<span className="satria-live-dot" aria-hidden="true" /></h2>
                <p>{t.subtitle}</p>
              </div>
              <button type="button" className="satria-icon-button" aria-label={t.clear} disabled={messages.length === 0 || busy} onClick={() => setMessages([])}><RotateCcw size={16} /></button>
              <button type="button" className="satria-icon-button" aria-label={t.close} data-dialog-autofocus onClick={() => setIsOpen(false)}><X size={19} /></button>
            </header>

            <div className="satria-body" ref={listRef} aria-live="polite" aria-relevant="additions text">
              {messages.length === 0 ? (
                <div className="satria-welcome">
                  <span className="satria-kicker">JIWA FIGHTER / DIGITAL CONCIERGE</span>
                  <p>{t.intro}</p>
                </div>
              ) : messages.map((message) => (
                <article key={message.id} className={`satria-message satria-message-${message.role}`}>
                  <p>{message.text}</p>
                  {message.href && <Link href={message.href} className="satria-response-link" onClick={() => setIsOpen(false)}>{t.link}<ArrowRight size={13} /></Link>}
                </article>
              ))}
              {busy && <p className="satria-thinking" role="status">{t.thinking}</p>}
              {messages.length === 0 && (
                <div className="satria-suggestions" aria-label={language === 'bm' ? 'Soalan pantas' : 'Suggested questions'}>
                  {suggestions.map((item) => <button key={item.faqId} type="button" onClick={() => void sendMessage(item.label)}>{item.label}<ArrowRight size={13} /></button>)}
                </div>
              )}
            </div>

            <div className="satria-bottom">
              <p id="satria-notice"><ShieldCheck size={13} aria-hidden="true" />{t.notice}</p>
              <form className="satria-composer" onSubmit={onSubmit}>
                <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} maxLength={700} placeholder={t.placeholder} aria-label={t.placeholder} autoComplete="off" />
                <button type="submit" aria-label={t.send} disabled={!input.trim() || busy}><Send size={16} /></button>
              </form>
            </div>
          </section>
        </dialog>
      )}
    </>
  );
};
