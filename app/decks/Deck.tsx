'use client';

import {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

/**
 * A slide may register a forward "interceptor" while it is the active slide.
 * When set, pressing forward runs the interceptor (passing a `done` callback)
 * instead of advancing immediately — the deck advances only when `done` fires.
 * Used by the title slide to glide its mouse to centre before handing off to the
 * centered agent on the next slide (a seamless transition). Backward navigation
 * is never intercepted.
 */
type Interceptor = (done: () => void) => void;

const DeckContext = createContext<{
  activeIndex: number;
  setForwardInterceptor: (fn: Interceptor | null) => void;
} | null>(null);

export function useDeck() {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error('useDeck must be used within a <Deck>');
  return ctx;
}

// Each slide is rendered inside a provider carrying its own index, so a slide
// component can tell whether it is the active one.
const SlideIndexContext = createContext(0);
export function useSlideIndex() {
  return useContext(SlideIndexContext);
}

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

  // Forward interceptor + a busy latch so a transition can't be double-fired.
  const interceptor = useRef<Interceptor | null>(null);
  const busy = useRef(false);

  const setForwardInterceptor = useCallback((fn: Interceptor | null) => {
    interceptor.current = fn;
  }, []);

  const go = useCallback(
    (delta: number) => {
      if (busy.current) return;
      // Forward with an interceptor: run it, advance on its `done` callback.
      if (delta > 0 && interceptor.current) {
        busy.current = true;
        interceptor.current(() => {
          busy.current = false;
          setIndex((i) => Math.min(i + 1, count - 1));
        });
        return;
      }
      setIndex((i) => Math.min(Math.max(i + delta, 0), count - 1));
    },
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
    <DeckContext.Provider value={{ activeIndex: index, setForwardInterceptor }}>
      <div className="deck-viewport">
        {slides.map((slide, i) => (
          <section
            key={i}
            className="deck-slide"
            data-active={i === index}
            aria-hidden={i !== index}
          >
            <SlideIndexContext.Provider value={i}>{slide}</SlideIndexContext.Provider>
          </section>
        ))}
        {count > 1 && (
          <div className="deck-progress" aria-hidden>
            {index + 1} / {count}
          </div>
        )}
      </div>
    </DeckContext.Provider>
  );
}
