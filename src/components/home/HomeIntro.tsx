'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const INTRO_KEY = 'jiwa-fighter:intro-seen:v1';
const DISPLAY_DURATION = 5_000;
const EXIT_DURATION = 800;

type IntroPhase = 'idle' | 'showing' | 'leaving' | 'hidden';

export function HomeIntro() {
  const { language } = useLanguage();
  const [phase, setPhase] = useState<IntroPhase>('idle');
  const skipRef = useRef<HTMLButtonElement>(null);
  const wasShownRef = useRef(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(INTRO_KEY) === '1') {
        setPhase('hidden');
        return;
      }
      window.sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      // Continue to show the intro when browser storage is unavailable.
    }

    setPhase('showing');
    wasShownRef.current = true;
    document.body.classList.add('home-intro-playing');
    skipRef.current?.focus({ preventScroll: true });

    const exitTimer = window.setTimeout(() => setPhase('leaving'), DISPLAY_DURATION);
    return () => {
      window.clearTimeout(exitTimer);
      document.body.classList.remove('home-intro-playing');
    };
  }, []);

  useEffect(() => {
    if (phase === 'showing') skipRef.current?.focus({ preventScroll: true });
    if (phase === 'hidden') {
      document.body.classList.remove('home-intro-playing');
      if (wasShownRef.current) document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'leaving') return;
    const hideTimer = window.setTimeout(() => setPhase('hidden'), EXIT_DURATION);
    return () => window.clearTimeout(hideTimer);
  }, [phase]);

  const skipIntro = () => setPhase((current) => current === 'showing' ? 'leaving' : current);

  if (phase === 'idle' || phase === 'hidden') return null;

  return (
    <div
      className={`home-intro${phase === 'leaving' ? ' home-intro-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="home-intro-title"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          skipIntro();
        } else if (event.key === 'Tab') {
          event.preventDefault();
          skipRef.current?.focus();
        }
      }}
    >
      <div className="home-intro-content">
        <span className="home-intro-kicker">MALAYSIA / MODERN MOVEMENT</span>
        <Image
          className="home-intro-wordmark"
          src="/assets/brand/logo-horizontal-white.png"
          alt="JIWA FIGHTER"
          width={1834}
          height={561}
          priority
          unoptimized
        />
        <h1 id="home-intro-title" className="home-intro-title">
          {language === 'bm' ? 'SELAMAT DATANG KE' : 'WELCOME TO'}
          <span className="sr-only">JIWA FIGHTER</span>
        </h1>
        <span className="home-intro-rule" aria-hidden="true" />
        <p className="home-intro-caption">ROOTED IN HERITAGE · BUILT FOR MOVEMENT</p>
        <button ref={skipRef} className="home-intro-skip" type="button" onClick={skipIntro}>
          {language === 'bm' ? 'LANGKAU INTRO' : 'SKIP INTRO'}
        </button>
      </div>
      <div className="home-intro-progress" aria-hidden="true"><span /></div>
    </div>
  );
}
