'use client';

// Slide-9 build sequence (replaces the old ClosingPower two-up). One deck slide,
// three forward-advanced steps:
//   0 — the steam engine alone, focused centre
//   1 — the horse-gin engraving slides in from the right (two-up)
//   2 — both images shrink up to make room; the horsepower equation rises in
// Stepping is handled with a capture-phase key listener so → / ← move through
// the builds *before* the Deck would change slides; at the first/last build the
// event falls through to the Deck so navigation leaves the slide normally.
import { useEffect, useState } from 'react';
import { useDeck, useSlideIndex } from '../Deck';

const STEPS = 3;
const FWD = new Set(['ArrowRight', 'ArrowDown', ' ']);
const BACK = new Set(['ArrowLeft', 'ArrowUp', 'Backspace']);

export function HorsepowerSequence() {
  const { activeIndex } = useDeck();
  const index = useSlideIndex();
  const active = activeIndex === index;
  const [step, setStep] = useState(0);

  // Reset to the first build whenever the slide (re)enters.
  useEffect(() => {
    if (active) setStep(0);
  }, [active]);

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
    <div className="hp-stage" data-step={step}>
      <div className="hp-card hp-card--left">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/decks/mousepower/closing-steam-engine.jpg"
          alt="Engraving of a Watt steam engine"
        />
      </div>
      <div className="hp-card hp-card--right">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/decks/mousepower/closing-horse-gin.jpg"
          alt="Engraving of a horse driving a mill gin"
        />
      </div>
      <div className="hp-eq" aria-hidden={step < 2}>
        <p className="hp-eq-text">
          1 horsepower = 33,000 foot-pounds per minute
        </p>
      </div>
    </div>
  );
}
