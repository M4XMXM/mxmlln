'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Shade = { step: string; value: string };

// Keep in sync with app/globals.css (--slate-*); step 0 is the off-ramp surface.
const SLATE_SCALE: Shade[] = [
  { step: '0', value: '#fcfcfc' },
  { step: '50', value: '#f8fafc' },
  { step: '100', value: '#f1f5f9' },
  { step: '200', value: '#e2e8f0' },
  { step: '300', value: '#cad5e2' },
  { step: '400', value: '#90a1b9' },
  { step: '500', value: '#62748e' },
  { step: '600', value: '#45556c' },
  { step: '700', value: '#314158' },
  { step: '800', value: '#1d293d' },
  { step: '900', value: '#0f172b' },
  { step: '950', value: '#020618' },
];

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ColorSwatch({ step, value }: Shade) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // clipboard blocked — nothing else to fall back to for a raw value
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      type="button"
      className="scale-swatch"
      onClick={copy}
      aria-label={`Copy ${value}`}
      data-copied={copied || undefined}
    >
      <span className="scale-chip" style={{ background: value }} aria-hidden />
      <span className="scale-tip" role="tooltip">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? 'check' : 'label'}
            initial={{ opacity: 0, y: 3, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 3, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="scale-tip-inner"
          >
            {copied ? (
              <>
                <CheckIcon /> copied
              </>
            ) : (
              <>
                {step} · {value}
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}

export function ColorScale({ steps }: { steps?: Shade[] }) {
  return (
    <div className="scale">
      <div className="scale-row">
        {(steps ?? []).map((s) => (
          <ColorSwatch key={s.step + s.value} step={s.step} value={s.value} />
        ))}
      </div>
    </div>
  );
}

const ACCENT: Shade = { step: 'accent', value: '#00BBFF' };

// A no-prop tag because MDX drops array-valued attributes, so the data can't
// be passed to <ColorScale> from system.mdx.
export function Palette() {
  return <ColorScale steps={[...SLATE_SCALE, ACCENT]} />;
}
