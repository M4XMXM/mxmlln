'use client';

// "TOKENS" with the "O" as the 3D coin. 'wordmark' registers a forward
// interceptor that fades the letters and slides the coin to centre, then
// advances; 'centered' renders that exact end-state. The two must stay in sync —
// the deck cuts (no fade) between them.
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

  // Shift to bring the coin's centre to the viewport centre. Undoes any prior
  // shift so it's stable across re-measures (resize / late font load).
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

  useEffect(() => {
    if (mode !== 'centered') return;
    applyShift();
    window.addEventListener('resize', applyShift);
    document.fonts?.ready.then(applyShift);
    return () => window.removeEventListener('resize', applyShift);
  }, [mode, applyShift, isActive]);

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
      className={`tokens-wordmark${mode === 'centered' ? ' is-centered' : ' rack-in'}`}
      role="img"
      aria-label="TOKENS"
    >
      <span aria-hidden="true">T</span>
      <Coin3D overlay={mode === 'centered' ? <TokensOrbit active={isActive} /> : undefined} />
      <span aria-hidden="true">KENS</span>
    </div>
  );
}
