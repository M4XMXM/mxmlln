'use client';

// Two forward-advanced build steps (same mechanism as HorsepowerSequence): a
// capture-phase key listener advances the build on → / ← before the Deck would
// change slides; at the first/last build the event falls through to the Deck.
// Step 0 shows the headline alone; step 1 reveals the photo + handwritten script.
import { useEffect, useState } from 'react';
import { useDeck, useSlideIndex } from '../Deck';

const STEPS = 2;
const FWD = new Set(['ArrowRight', 'ArrowDown', ' ']);
const BACK = new Set(['ArrowLeft', 'ArrowUp', 'Backspace']);

export function MeasurementProblem() {
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
    <div className="measure-slide rack-in" data-step={step}>
      <div className="measure-text">
        <h2 className="slide-section-title measure-headline">
          Agents have a measurement problem.
        </h2>
        <div className="measure-aside">
          <p className="slide-footnote measure-caption">me trying to measure them</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="measure-arrow" src="/decks/mousepower/measure-arrow.svg" alt="" aria-hidden />
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="measure-photo"
        src="/decks/mousepower/measurement-photo.jpg"
        alt="Maximillian at a whiteboard mapping out agent measurement, the Charlie-Day conspiracy-board meme on the laptop"
      />
    </div>
  );
}
