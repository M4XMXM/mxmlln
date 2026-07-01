'use client';

// Two forward-advanced build steps (same mechanism as HorsepowerSequence): a
// capture-phase key listener advances the build on → / ← before the Deck would
// change slides; at a boundary the event falls through to the Deck.
//   step 0 — the gin drawn as a stopwatch: the circle is the watch face, the
//            rotary arm (with the horse at its tip) is the sweeping hand.
//   step 1 — labels hidden, schematic shrinks upward, the equation emerges below.
//   step 2 — the equation is replaced by the ROI thesis, also emerging.
// The captions share the morph-statement slide's thin type + character-by-
// character "emergence" effect. Orbit/flip animations are gated in CSS on
// .deck-slide[data-active='true'].
import { useEffect, useState } from 'react';
import { useDeck, useSlideIndex } from '../Deck';
import { GinSchematic } from './GinSchematic';
import { EmergeSwap } from './emergeText';

const STEPS = 3;
const FWD = new Set(['ArrowRight', 'ArrowDown', ' ']);
const BACK = new Set(['ArrowLeft', 'ArrowUp', 'Backspace']);

export function GinDiagram() {
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
    <div className="gin-stage rack-in" data-step={step}>
      <GinSchematic className="hp-diagram" />

      <EmergeSwap
        className="hp-caption"
        text={
          step === 1
            ? '1 horsepower = 33,000 ft·lbf/min'
            : step === 2
              ? 'If we can’t measure ROI,\nwe can’t communicate value.'
              : ''
        }
      />
    </div>
  );
}
