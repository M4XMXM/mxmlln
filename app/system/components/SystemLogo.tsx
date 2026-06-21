'use client';

import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

/**
 * The fixed top-left signature mark for the /system chrome. Renders the
 * Sig2026 Lottie (plays once on load) — the same vector signature used on the
 * blog index, rather than the legacy GIF.
 */
export function SystemLogo() {
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lottieRef.current) return;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      path: '/assets/Sig2026.json',
      renderer: 'svg',
      loop: false,
      autoplay: true,
    });
    return () => anim.destroy();
  }, []);

  return (
    <div className="system-logo">
      <a href="/" aria-label="Back to maximin.design">
        <div ref={lottieRef} className="system-logo-lottie" aria-hidden />
      </a>
    </div>
  );
}
