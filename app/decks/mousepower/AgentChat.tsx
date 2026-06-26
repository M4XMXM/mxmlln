'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useDeck, useSlideIndex } from '../Deck';

// The reasoning sidebar for the autonomous-window slide. A user prompt sits at
// the top; below it the agent's reasoning streams line-by-line (typed out,
// auto-scrolling, looping) as if we're watching a long-running task think — the
// agent building this very slide. Streaming only runs while the slide is active
// (restarts on entry) and collapses to a static list under reduced-motion.
const PROMPT = 'build the title slide for the mousepower deck';

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

const MAX_LINES = 7;

export function AgentChat() {
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
      setDone(STEPS.slice(-MAX_LINES));
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
        timer.current = setTimeout(tick, 24 + Math.random() * 34);
      } else {
        setDone((d) => [...d, full].slice(-MAX_LINES));
        setTyping('');
        step = (step + 1) % STEPS.length;
        char = 0;
        timer.current = setTimeout(tick, 480);
      }
    };
    timer.current = setTimeout(tick, 300);

    return () => {
      alive = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, reduced]);

  return (
    <>
      <div className="chat-prompt">{PROMPT}</div>
      <div className="chat-thinking" aria-hidden>
        <span className="chat-thinking-dot" />
        thinking
      </div>
      <div className="chat-reasoning" aria-hidden>
        {done.map((line, i) => (
          <p key={`${i}-${line}`} className="chat-line">
            {line}
          </p>
        ))}
        {typing && <p className="chat-line chat-line--active">{typing}</p>}
      </div>
      <div className="chat-input" aria-hidden>
        <span className="chat-input-placeholder">Ask a follow-up…</span>
        <span className="chat-input-send">
          <ArrowUp strokeWidth={2.5} />
        </span>
      </div>
    </>
  );
}
