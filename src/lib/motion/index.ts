'use client';

import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, useGSAP);

const MOTION_ALLOWED = '(prefers-reduced-motion: no-preference)';

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Geometry refreshes follow actual media/layout changes, never scroll events. */
function useLayoutRefresh<T extends HTMLElement>(ref: RefObject<T>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let active = true;
    let frame = 0;
    const refresh = () => {
      if (!active) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(root);
    const mutations = new MutationObserver(refresh);
    mutations.observe(root, { childList: true, subtree: true });
    root.addEventListener('load', refresh, true);
    void document.fonts.ready.then(refresh);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      mutations.disconnect();
      root.removeEventListener('load', refresh, true);
    };
  }, [ref]);
}

/** Nonblocking entrance; text stays semantic and is visible without JavaScript. */
export function useHeroReveal<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);
  useLayoutRefresh(containerRef);
  useGSAP(() => {
    const root = containerRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add(MOTION_ALLOWED, () => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity' } });
      const parts = [
        { selector: '.hero-kicker', at: 0, y: 6, duration: 0.3 },
        { selector: '.hero-headline', at: 0.08, y: 15, duration: 0.55 },
        { selector: '.hero-subtext', at: 0.18, y: 10, duration: 0.45 },
        { selector: '.hero-cta', at: 0.26, y: 8, duration: 0.4 },
        { selector: '.hero-image', at: 0, y: 0, duration: 0.65 },
      ];
      parts.forEach(({ selector, at, y, duration }) => {
        const targets = root.querySelectorAll(selector);
        if (targets.length) timeline.from(targets, { opacity: 0, y, duration }, at);
      });
    });
    media.add(`${MOTION_ALLOWED} and (min-width: 1024px)`, () => {
      const images = root.querySelectorAll('.hero-image img, img.hero-image');
      if (!images.length) return;
      gsap.fromTo(images, { y: 0, scale: 1.015 }, {
        y: (_index: number, target: HTMLImageElement) => -Math.min(6, target.clientHeight * 0.007),
        scale: 1.015,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.35, invalidateOnRefresh: true },
      });
    });
    return () => media.revert();
  }, { scope: containerRef });
  return containerRef;
}

/** Each item reveals near its own viewport entry, including newly filtered cards. */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  selector = '.reveal-item',
  stagger = 0.06
) {
  const containerRef = useRef<T>(null);
  useLayoutRefresh(containerRef);
  useGSAP(() => {
    const root = containerRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add(MOTION_ALLOWED, () => {
      const animations = new Map<Element, gsap.core.Tween>();
      const localContext = gsap.context(() => {}, root);
      const synchronize = () => localContext.add(() => {
        animations.forEach((tween, element) => {
          if (!root.contains(element)) {
            tween.scrollTrigger?.kill();
            tween.kill();
            animations.delete(element);
          }
        });
        root.querySelectorAll(selector).forEach((item, index) => {
          if (animations.has(item)) return;
          animations.set(item, gsap.from(item, {
            opacity: 0,
            y: 15,
            duration: 0.5,
            delay: Math.min((index % 3) * stagger, 0.16),
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: { trigger: item, start: 'top 96%', once: true },
          }));
        });
      });
      synchronize();
      const observer = new MutationObserver(synchronize);
      observer.observe(root, { childList: true, subtree: true });
      const revealFocused = (event: FocusEvent) => {
        animations.forEach((tween, item) => {
          if (event.target instanceof Node && item.contains(event.target)) tween.progress(1);
        });
      };
      root.addEventListener('focusin', revealFocused);
      return () => {
        observer.disconnect();
        root.removeEventListener('focusin', revealFocused);
        localContext.revert();
        animations.clear();
      };
    });
    return () => media.revert();
  }, { scope: containerRef, dependencies: [selector, stagger], revertOnUpdate: true });
  return containerRef;
}

export function useStaggerCards<T extends HTMLElement = HTMLDivElement>(cardSelector = '.stagger-card') {
  return useScrollReveal<T>(cardSelector, 0.08);
}
