'use client';

import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const SCROLL_PAUSE_MS = 120;

/**
 * The fixed top-left signature mark, shared by every long-form chrome (blog,
 * /system). Two behaviors:
 *   - `spin={false}` → the static signature (`Sig2026.json`), plays once.
 *   - `spin`         → the spin mark (`LogoSpin2026.json`), driven by scroll
 *                      direction and paused when scrolling stops.
 * Callers supply their own wrapper/lottie class names and home link so the
 * surrounding CSS (position, blend mode, sizing) stays page-owned.
 */
export function SiteLogo({
  href,
  ariaLabel,
  spin = false,
  className,
  lottieClassName,
}: {
  href: string;
  ariaLabel: string;
  spin?: boolean;
  className: string;
  lottieClassName: string;
}) {
  const lottieRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<ReturnType<typeof lottie.loadAnimation> | null>(null);
  const scrollStopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (!lottieRef.current) return;

    animRef.current = lottie.loadAnimation({
      container: lottieRef.current,
      path: spin ? '/assets/LogoSpin2026.json' : '/assets/Sig2026.json',
      renderer: 'svg',
      loop: spin,
      autoplay: !spin,
    });

    return () => {
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, [spin]);

  useEffect(() => {
    if (!spin) return;

    const onScroll = () => {
      const y = window.scrollY ?? document.documentElement.scrollTop;
      const anim = animRef.current;
      if (anim) {
        const direction = y > lastScrollYRef.current ? 1 : -1;
        lastScrollYRef.current = y;
        anim.setDirection(direction);
        anim.play();
      }
      if (scrollStopTimeoutRef.current) {
        clearTimeout(scrollStopTimeoutRef.current);
      }
      scrollStopTimeoutRef.current = setTimeout(() => {
        animRef.current?.pause();
        scrollStopTimeoutRef.current = null;
      }, SCROLL_PAUSE_MS);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollStopTimeoutRef.current) {
        clearTimeout(scrollStopTimeoutRef.current);
      }
      animRef.current?.pause();
    };
  }, [spin]);

  return (
    <div className={className}>
      <a href={href} aria-label={ariaLabel}>
        <div ref={lottieRef} className={lottieClassName} aria-hidden />
      </a>
    </div>
  );
}
