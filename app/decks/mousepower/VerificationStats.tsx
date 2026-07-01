'use client';

// Intro animation on becoming the active slide: each cyan fill sweeps in from
// the left while its number counts up 0 → value. A hidden "ghost" of the final
// number reserves a stable width so the fill (and its label) don't jiggle as the
// live count changes digit width.
import { useEffect, useRef, useState } from 'react';
import { useDeck, useSlideIndex } from '../Deck';

const STATS = [
  {
    value: 91,
    cap: (
      <>
        more time
        <br />
        reviewing code
      </>
    ),
  },
  {
    value: 21,
    cap: (
      <>
        more tasks
        <br />
        completed
      </>
    ),
  },
];

const DURATION = 1200;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function VerificationStats() {
  const { activeIndex } = useDeck();
  const index = useSlideIndex();
  const active = activeIndex === index;
  const [p, setP] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!active) {
      setP(0);
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setP(1);
      return;
    }
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / DURATION, 1);
      setP(easeOutCubic(t));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active]);

  return (
    <div className="vstat-slide rack-in">
      <h2 className="vstat-headline">
        As execution gets cheap, bottleneck shifts to verification.
      </h2>

      <div className="vstat-bars">
        {STATS.map((s) => (
          <div className="vstat-track" key={s.value}>
            <div
              className="vstat-fill"
              style={{
                width: `${s.value}%`,
                clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`,
              }}
            >
              <span className="vstat-num">
                <span className="vstat-num-ghost" aria-hidden>
                  +{s.value}%
                </span>
                <span className="vstat-num-live">
                  +{Math.round(s.value * p)}%
                </span>
              </span>
              <span className="vstat-cap">{s.cap}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="vstat-amdahl">(Amdahl’s law)</p>

      <p className="vstat-source">
        Source:{' '}
        <a
          href="https://www.faros.ai/blog/ai-software-engineering"
          target="_blank"
          rel="noreferrer"
        >
          faros.ai/blog/ai-software-engineering
        </a>
      </p>
    </div>
  );
}
