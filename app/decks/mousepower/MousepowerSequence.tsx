'use client';

// Two forward-advanced build steps. A capture-phase key listener advances the
// build before the Deck changes slides; at the first/last build the event falls
// through so navigation leaves the slide normally. (Not currently in the deck.)
import { useEffect, useRef, useState } from 'react';
import { useDeck, useSlideIndex } from '../Deck';

const STEPS = 2;
const FWD = new Set(['ArrowRight', 'ArrowDown', ' ']);
const BACK = new Set(['ArrowLeft', 'ArrowUp', 'Backspace']);

const AXES = ['correctness', 'judgment', 'scope', 'reversibility', 'trust'];

export function MousepowerSequence() {
  const { activeIndex } = useDeck();
  const index = useSlideIndex();
  const active = activeIndex === index;
  const [step, setStep] = useState(0);
  const [px, setPx] = useState(0);
  const raf = useRef<number | null>(null);

  // Reset to the first build whenever the slide (re)enters.
  useEffect(() => {
    if (active) {
      setStep(0);
      setPx(0);
    }
  }, [active]);

  // Ticking pixel counter; runs only on step 0.
  useEffect(() => {
    if (step !== 0) {
      if (raf.current) cancelAnimationFrame(raf.current);
      return;
    }
    let alive = true;
    const tick = () => {
      if (!alive) return;
      setPx((p) => p + Math.round(7 + (p % 5)));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      alive = false;
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [step]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (FWD.has(e.key) && step < STEPS - 1) {
        e.preventDefault();
        e.stopImmediatePropagation();
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
  }, [active, step]);

  return (
    <div className="mp-stage" data-step={step}>
      <div className="mp-eq">
        <div className="mp-eq-line">
          <span className="mp-eq-lhs">1 mousepower</span>
          <span className="mp-eq-rel">=</span>

          {/* Naive RHS — struck through on step 1. */}
          <span className="mp-eq-naive">
            Δ cursor position
            <span className="mp-eq-counter">{px.toLocaleString()}px</span>
          </span>
        </div>

        {/* Axes fan in on step 1. */}
        <ul className="mp-axes" aria-hidden={step !== 1}>
          {AXES.map((a, i) => (
            <li key={a} className="mp-axis" style={{ ['--i' as string]: i }}>
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
