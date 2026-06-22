'use client';

import { Children, useCallback, useEffect, useState } from 'react';

/**
 * Fullscreen slideshow shell for a deck. Each top-level child is one slide;
 * only the active slide is shown (others fade out). Navigate with the arrow
 * keys (← / →, or ↑ / ↓) and Space / Backspace. Renders full-bleed — no chrome
 * — so it fills the entire screen for presenting.
 */
export function Deck({ children }: { children: React.ReactNode }) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (delta: number) => setIndex((i) => Math.min(Math.max(i + delta, 0), count - 1)),
    [count]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          go(1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'Backspace':
          e.preventDefault();
          go(-1);
          break;
        case 'Home':
          e.preventDefault();
          setIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setIndex(count - 1);
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, count]);

  return (
    <div className="deck-viewport">
      {slides.map((slide, i) => (
        <section
          key={i}
          className="deck-slide"
          data-active={i === index}
          aria-hidden={i !== index}
        >
          {slide}
        </section>
      ))}
      {count > 1 && (
        <div className="deck-progress" aria-hidden>
          {index + 1} / {count}
        </div>
      )}
    </div>
  );
}
