'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useDeck, useSlideIndex } from '../Deck';

// Streaming reasoning sidebar for the exploration-grid tiles — the same agentic
// "thinking" as slide 2 (AgentChat), so every window on slide 3 keeps working in
// parallel. Each tile takes a `delay` so the six stream out of sync. Streams only
// while slide 3 is active; collapses to a static list under reduced-motion.
const STEPS = [
  'Reading the design-system tokens…',
  'Sketching the wordmark as a maze…',
  'Extruding the walls, projecting bird’s-eye from center…',
  'Backlighting the faces, tuning the gradient…',
  'Threading a mouse through the corridor graph…',
  'Centering the lockup, setting the handwritten eyebrow…',
  'Checking contrast on the #00BBFF accent…',
  'Rendering the slide…',
];
const MAX_LINES = 6;

export function GwChat({ prompt, delay = 0 }: { prompt: string; delay?: number }) {
  const { activeIndex } = useDeck();
  const index = useSlideIndex();
  const active = activeIndex === index;
  const reduced = useReducedMotion();

  const [done, setDone] = useState<string[]>([]);
  const [typing, setTyping] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setDone(STEPS.slice(0, MAX_LINES));
      setTyping('');
      return;
    }
    let step = 0;
    let char = 0;
    let alive = true;
    setDone([]);
    setTyping('');
    const tick = () => {
      if (!alive) return;
      const full = STEPS[step];
      if (char < full.length) {
        char += 1;
        setTyping(full.slice(0, char));
        timer.current = setTimeout(tick, 22 + Math.random() * 30);
      } else {
        setDone((d) => [...d, full].slice(-MAX_LINES));
        setTyping('');
        step = (step + 1) % STEPS.length;
        char = 0;
        timer.current = setTimeout(tick, 440);
      }
    };
    timer.current = setTimeout(tick, 300 + delay);
    return () => {
      alive = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, reduced, delay]);

  return (
    <>
      <div className="gw-prompt">{prompt}</div>
      <div className="gw-think" aria-hidden>
        <span className="gw-dot" />
        thinking
      </div>
      <div className="gw-reasoning" aria-hidden>
        {done.map((l, i) => (
          <p key={`${i}-${l}`} className="gw-line">
            {l}
          </p>
        ))}
        {typing && <p className="gw-line">{typing}</p>}
      </div>
      <div className="gw-input" aria-hidden>
        <span className="gw-input-text">Ask a follow-up…</span>
        <span className="gw-send">
          <ArrowUp strokeWidth={2.5} />
        </span>
      </div>
    </>
  );
}
