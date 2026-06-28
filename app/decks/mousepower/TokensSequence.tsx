'use client';

// Slides 7–9 unified into one slide with three forward-advanced build steps that
// share a SINGLE persistent Coin3D (the 3D canvas never remounts, so it morphs
// seamlessly between states instead of relying on slide cuts):
//   step 0 — "TOKENS" wordmark, the coin as the "O"
//   step 1 — letters fade, coin slides to centre, the task orbit pops in
//   step 2 — coin shrinks, activity rings draw on
// Advancement uses the same capture-phase key listener as the other build slides.
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDeck, useSlideIndex } from '../Deck';
import { ActivityRings } from './ActivityRings';
import { Coin3D } from './Coin3D';
import { TokensOrbit } from './TokensOrbit';

const STEPS = 3;
// Hold the orbit until the coin has centred (the .tokens-coin slide is ~0.65s).
const ORBIT_DELAY = 720;
const RINGS_DELAY = 720; // after the coin shrinks (step 2), before the rings draw
const FWD = new Set(['ArrowRight', 'ArrowDown', ' ']);
const BACK = new Set(['ArrowLeft', 'ArrowUp', 'Backspace']);

export function TokensSequence() {
  const { activeIndex } = useDeck();
  const index = useSlideIndex();
  const active = activeIndex === index;
  const [step, setStep] = useState(0);
  const [orbitOn, setOrbitOn] = useState(false);
  const [ringsOn, setRingsOn] = useState(false);
  const seqRef = useRef<HTMLDivElement>(null);

  // Shift that brings the coin's centre to the viewport centre. Neutralise any
  // prior shift first so the coin is always measured at its natural (wordmark)
  // position — stable regardless of the current step or re-measures.
  const applyShift = useCallback(() => {
    const wm = seqRef.current?.querySelector<HTMLElement>('.tokens-wordmark');
    const coin = wm?.querySelector<HTMLElement>('.tokens-coin');
    if (!wm || !coin) return;
    wm.style.setProperty('--coin-shift', '0px');
    const r = coin.getBoundingClientRect(); // forces layout at the neutral position
    const naturalCentre = r.left + r.width / 2;
    wm.style.setProperty('--coin-shift', `${window.innerWidth / 2 - naturalCentre}px`);
  }, []);

  // Reset the build whenever the slide leaves.
  useEffect(() => {
    if (!active) {
      setStep(0);
      setOrbitOn(false);
      setRingsOn(false);
    }
  }, [active]);

  // The orbit icons hold off until the coin has slid to centre (step 1), then pop.
  useEffect(() => {
    if (step < 1) {
      setOrbitOn(false);
      return;
    }
    if (orbitOn) return; // already shown — don't re-pop on later steps
    const t = window.setTimeout(() => setOrbitOn(true), ORBIT_DELAY);
    return () => window.clearTimeout(t);
  }, [step, orbitOn]);

  // Keep the shift correct against resize / late font load.
  useEffect(() => {
    if (!active) return;
    applyShift();
    window.addEventListener('resize', applyShift);
    document.fonts?.ready.then(applyShift);
    return () => window.removeEventListener('resize', applyShift);
  }, [active, applyShift]);

  // Rings draw on a beat after the coin has shrunk, so they never overlap the
  // still-large cluster (matches the old activity slide).
  useEffect(() => {
    if (step < 2) {
      setRingsOn(false);
      return;
    }
    const t = window.setTimeout(() => setRingsOn(true), RINGS_DELAY);
    return () => window.clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (FWD.has(e.key) && step < STEPS - 1) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (step === 0) applyShift(); // measure before the slide-to-centre
        setStep((s) => Math.min(s + 1, STEPS - 1));
      } else if (BACK.has(e.key) && step > 0) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setStep((s) => Math.max(s - 1, 0));
      }
      // At a boundary: let the event reach the Deck to change slides.
    };
    window.addEventListener('keydown', onKey, { capture: true });
    return () => window.removeEventListener('keydown', onKey, { capture: true });
  }, [active, step, applyShift]);

  return (
    <div className="tokens-seq rack-in" data-step={step} data-rings={ringsOn} ref={seqRef}>
      <div className="tokens-seq-rings">
        <ActivityRings on={ringsOn} />
      </div>
      <div
        className={`tokens-wordmark${step >= 1 ? ' is-morphing' : ''}`}
        role="img"
        aria-label="TOKENS"
      >
        <span aria-hidden="true">T</span>
        <Coin3D overlay={<TokensOrbit active={orbitOn} />} />
        <span aria-hidden="true">KENS</span>
      </div>
    </div>
  );
}
