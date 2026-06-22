'use client';

import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

// Frames a slide with the spinning signature logo (same Lottie as SiteLogo):
// one row top + bottom (corners included) and a column down each side between
// them. Spacing is flex-distributed, so it stays even and responsive. All marks
// autoplay + loop so the border gently spins.
const LOGO_PATH = '/assets/LogoSpin2026.json';

export function LogoBorder({
  horizontal = 6,
  vertical = 2,
}: {
  horizontal?: number;
  vertical?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const marks = Array.from(root.querySelectorAll<HTMLElement>('.logo-mark'));
    const anims = marks.map((el) =>
      lottie.loadAnimation({
        container: el,
        path: LOGO_PATH,
        renderer: 'svg',
        loop: true,
        autoplay: true,
      })
    );
    return () => anims.forEach((a) => a.destroy());
  }, []);

  const top = Array.from({ length: horizontal });
  const side = Array.from({ length: vertical });

  return (
    <div className="logo-border" ref={rootRef} aria-hidden>
      <div className="logo-edge logo-edge--top">
        {top.map((_, i) => (
          <div key={i} className="logo-mark" />
        ))}
      </div>
      <div className="logo-edge logo-edge--bottom">
        {top.map((_, i) => (
          <div key={i} className="logo-mark" />
        ))}
      </div>
      <div className="logo-edge logo-edge--left">
        {side.map((_, i) => (
          <div key={i} className="logo-mark" />
        ))}
      </div>
      <div className="logo-edge logo-edge--right">
        {side.map((_, i) => (
          <div key={i} className="logo-mark" />
        ))}
      </div>
    </div>
  );
}
