'use client';

// Two forward-advanced build steps. A capture-phase key listener advances the
// build on → / ← *before* the Deck would change slides; at the first/last build
// the event falls through to the Deck so navigation leaves the slide normally.
import { useEffect, useState } from 'react';
import { useDeck, useSlideIndex } from '../Deck';

const STEPS = 2;
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
    <div className="hp-stage rack-in" data-step={step}>
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
    </div>
  );
}
