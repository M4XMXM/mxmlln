'use client';

// 2×2 takeaway map. Axes: Uncertainty in Acceptance Criteria (x, low→high
// left→right) × Uncertainty in Task Steps (y, low→high top→bottom). Each takeaway
// owns a diagonal-hatched band; overlapping bands crosshatch rather than muddy.
// The bands reveal one per forward step (bare chart → script → OOD → verification
// → NP), using the same capture-phase key interception as the other build slides.
import { useEffect, useState } from 'react';
import { useDeck, useSlideIndex } from '../Deck';

const STEPS = 5; // 0 = bare chart; 1..4 reveal each band in turn
const FWD = new Set(['ArrowRight', 'ArrowDown', ' ']);
const BACK = new Set(['ArrowLeft', 'ArrowUp', 'Backspace']);

export function EntropySliders() {
  const { activeIndex } = useDeck();
  const index = useSlideIndex();
  const active = activeIndex === index;
  const [step, setStep] = useState(0);

  // Reset to the bare chart whenever the slide (re)enters.
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

  const shown = (n: number) => (step >= n ? ' es-shown' : '');

  return (
    <div className="es-stage rack-in">
      <div className="es-panel">
        <div className="es-matrix">
          <span className="es-axis es-axis-x">Uncertainty in Acceptance Criteria</span>
          <span className="es-axis es-axis-y">Uncertainty in Task Steps</span>
          <div className="es-plot">
            <span className="es-dot es-dot-top" aria-hidden />
            <span className="es-dot es-dot-left" aria-hidden />
            <span className="es-arrow es-arrow-x" aria-hidden />
            <span className="es-arrow es-arrow-y" aria-hidden />
            <span className="es-tick es-tick-xlow">low</span>
            <span className="es-tick es-tick-xhigh">high</span>
            <span className="es-tick es-tick-ylow">low</span>
            <span className="es-tick es-tick-yhigh">high</span>

            {/* Lowest task-step uncertainty = the left-most quarter, full height. */}
            <div className={`es-hatch es-hatch-script${shown(1)}`}>
              <span className="es-hatch-label">Write a script, save tokens</span>
            </div>
            {/* Highest task-step uncertainty = the right-most quarter. */}
            <div className={`es-hatch es-hatch-ood${shown(2)}`}>
              <span className="es-hatch-label">
                Data risk of OOD in pretraining /<br />
                sparse rewards for RL
              </span>
            </div>
            {/* Highest acceptance-criteria uncertainty = the bottom fourth, full
                width. Opposite diagonal so its overlaps with the side bands read
                as crosshatch. */}
            <div className={`es-hatch es-hatch-verif${shown(3)}`}>
              <span className="es-hatch-label">
                Verification is indistinguishable from execution
              </span>
            </div>
            {/* The good zone: the central region left unshaded by the red bands. */}
            <div className={`es-hatch es-hatch-np${shown(4)}`}>
              <span className="es-hatch-label">
                {'Verification ~< execution'}
                <br />
                NP w/ adversarial agents ;)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
