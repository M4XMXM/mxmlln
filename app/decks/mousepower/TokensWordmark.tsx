'use client';

// "TOKENS" with the "O" replaced by the 3D coin (Coin3D).
//
// Two modes drive the closing beat, which keeps the coin the SAME size across
// both slides:
//   - 'wordmark' (slide 4): the full lockup. While active it registers a forward
//     interceptor — pressing forward fades the letters out and slides the coin to
//     viewport centre, then advances.
//   - 'centered' (slide 5): renders that exact end-state (letters hidden, coin
//     parked at centre). The deck switches with an instant cut, so matching the
//     end-state makes the morph read as one continuous motion.
import { useCallback, useEffect, useRef } from 'react';
import { useDeck, useSlideIndex } from '../Deck';
import { Coin3D } from './Coin3D';
import { TokensOrbit } from './TokensOrbit';

const MORPH_MS = 650; // keep in sync with the .tokens-coin transition in decks.css

export function TokensWordmark({ mode = 'wordmark' }: { mode?: 'wordmark' | 'centered' }) {
  const { activeIndex, setForwardInterceptor } = useDeck();
  const myIndex = useSlideIndex();
  const isActive = activeIndex === myIndex;
  const wmRef = useRef<HTMLDivElement>(null);

  // Horizontal shift that brings the coin's centre to the viewport centre. Undoes
  // any shift already applied so it's stable across re-measures (resize/fonts).
  const computeShift = useCallback(() => {
    const wm = wmRef.current;
    const coin = wm?.querySelector<HTMLElement>('.tokens-coin');
    if (!wm || !coin) return 0;
    const cur = parseFloat(getComputedStyle(wm).getPropertyValue('--coin-shift')) || 0;
    const r = coin.getBoundingClientRect();
    const naturalCentre = r.left + r.width / 2 - cur;
    return window.innerWidth / 2 - naturalCentre;
  }, []);

  const applyShift = useCallback(() => {
    const wm = wmRef.current;
    if (wm) wm.style.setProperty('--coin-shift', `${computeShift()}px`);
  }, [computeShift]);

  // 'centered': park the coin at centre and keep it there through resize / late
  // font load so it lands exactly where slide 4's morph ends.
  useEffect(() => {
    if (mode !== 'centered') return;
    applyShift();
    window.addEventListener('resize', applyShift);
    document.fonts?.ready.then(applyShift);
    return () => window.removeEventListener('resize', applyShift);
  }, [mode, applyShift, isActive]);

  // 'wordmark': intercept forward while active — play the morph, then advance.
  useEffect(() => {
    const wm = wmRef.current;
    if (mode !== 'wordmark') return;
    if (!isActive) {
      wm?.classList.remove('is-morphing'); // reset if we navigated back
      return;
    }
    setForwardInterceptor((done) => {
      applyShift();
      wm?.classList.add('is-morphing');
      window.setTimeout(done, MORPH_MS);
    });
    return () => setForwardInterceptor(null);
  }, [mode, isActive, setForwardInterceptor, applyShift]);

  return (
    <div
      ref={wmRef}
      className={`tokens-wordmark${mode === 'centered' ? ' is-centered' : ''}`}
      role="img"
      aria-label="TOKENS"
    >
      <span aria-hidden="true">T</span>
      <Coin3D overlay={mode === 'centered' ? <TokensOrbit active={isActive} /> : undefined} />
      <span aria-hidden="true">KENS</span>
    </div>
  );
}
