'use client';

import { Fragment, useEffect, useRef, useState } from 'react';

// Per-letter blur-in-up "emergence" (see decks.css .morph-char, ported from
// /static/001). Text is split into non-breaking word groups and explicit lines
// ("\n"). When `animate`, each letter gets a staggered .morph-char (runs on
// mount); otherwise the line is rendered as plain text (used for the outgoing
// copy, which fades/blurs out as a whole rather than per-letter).
export const CHAR_DELAY = 42; // ms of ripple between successive letters
const EXIT_MS = 560; // keep the outgoing copy mounted for its blur-out

function renderLines(text: string, animate: boolean) {
  let gi = 0;
  return text.split('\n').map((line, li) => (
    <span className="morph-tline" key={li}>
      {animate
        ? line.split(' ').map((word, wi) => (
            <Fragment key={wi}>
              <span className="morph-word">
                {word.split('').map((ch, ci) => {
                  const d = gi++ * CHAR_DELAY;
                  return (
                    <span
                      key={ci}
                      className="morph-char"
                      style={{ '--d': `${d}ms` } as React.CSSProperties}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
              {wi < line.split(' ').length - 1 ? ' ' : null}
            </Fragment>
          ))
        : line}
    </span>
  ));
}

/**
 * A text slot that swaps its content with a cross-blur: the incoming text emerges
 * character-by-character while the outgoing text (overlaid) blurs + fades out.
 * - `text` — the current content (may contain "\n" for explicit line breaks).
 * - `cycle` — bump to force the current text to re-emerge (e.g. on slide entry)
 *   without a fade-out (nothing is leaving).
 * The outgoing copy is absolutely positioned, so swapping never shifts layout —
 * the container is sized by the incoming text.
 */
export function EmergeSwap({
  text,
  cycle = 0,
  className,
}: {
  text: string;
  cycle?: number;
  className?: string;
}) {
  const [state, setState] = useState({ current: text, prev: null as string | null, id: 0 });
  const lastText = useRef(text);
  const lastCycle = useRef(cycle);

  useEffect(() => {
    const textChanged = text !== lastText.current;
    const cycleChanged = cycle !== lastCycle.current;
    if (!textChanged && !cycleChanged) return;
    lastText.current = text;
    lastCycle.current = cycle;
    setState((s) => ({
      current: text,
      // Only fade the old copy out when the text actually changed (not on a
      // pure entry re-emerge).
      prev: textChanged ? s.current : null,
      id: s.id + 1,
    }));
    if (textChanged) {
      const t = setTimeout(() => setState((s) => ({ ...s, prev: null })), EXIT_MS);
      return () => clearTimeout(t);
    }
  }, [text, cycle]);

  return (
    <span className={`emerge-swap${className ? ` ${className}` : ''}`}>
      <span className="emerge-in" key={state.id}>
        {renderLines(state.current, true)}
      </span>
      {state.prev !== null && (
        <span className="emerge-out" key={`out-${state.id}`} aria-hidden>
          {renderLines(state.prev, false)}
        </span>
      )}
    </span>
  );
}
