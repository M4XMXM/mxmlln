'use client';

// The opening of the deck, unified into ONE slide with three forward-advanced
// build steps (the title living inside the agent app that built it):
//   step 0 — full-bleed maze title, the cursor-agent threading the corridors
//   step 1 — zoom out: the title is the live preview of a v0-style agent app
//             (chat sidebar streaming, the agent editing the canvas)
//   step 2 — the window multiplies into a 3×3 grid of agents, each exploring a
//             different creative direction in parallel
// Advancement uses the same capture-phase key listener as the other build slides
// (TokensSequence); the step-0 → step-1 hand-off first fades the maze cursor so
// the zoom-out reads clean, and the final forward runs the rack-focus exit.
import { useEffect, useRef, useState } from 'react';
import { Mouse, MousePointer2, Zap } from 'lucide-react';
import { useDeck, useSlideIndex } from '../Deck';
import { MazeTitle3D } from './MazeTitle3D';
import { TitleHero } from './TitleHero';
import { AgentChat } from './AgentChat';
import { GwChat } from './GwChat';

const STEPS = 3;
const FADE_MS = 380; // maze cursor fade before the step-0 → step-1 zoom-out
const EXIT_MS = 620; // rack-focus exit on the final forward (mirrors .is-exiting)
const FWD = new Set(['ArrowRight', 'ArrowDown', ' ']);
const BACK = new Set(['ArrowLeft', 'ArrowUp', 'Backspace']);

// Row-major 3×3; the centrepiece is index 4 (true centre) — the zoom pivots there.
// Its prompt matches step 1 exactly so the copy is continuous through the cut.
// `label` is the object-detection-style tag drawn on each canvas's selection box.
const TILES = [
  { v: 'mice', prompt: 'what if it’s a swarm', label: 'swarm', conf: '0.91' },
  { v: 'cursor', prompt: 'lead with the cursor', label: 'cursor', conf: '0.97' },
  { v: 'bolt', prompt: 'lean into the power', label: 'power', conf: '0.88' },
  { v: 'mono', prompt: 'just a monogram', label: 'monogram', conf: '0.94' },
  { v: 'center', prompt: 'build the title slide for the mousepower deck', label: 'wordmark', conf: '0.99' },
  { v: 'ascii', prompt: 'try ascii art', label: 'ascii-art', conf: '0.83' },
  { v: 'cursors', prompt: 'a flock of pointers', label: 'pointers', conf: '0.90' },
  { v: 'mouse', prompt: 'one bold mouse', label: 'mouse', conf: '0.96' },
  { v: 'bolts', prompt: 'charge it up', label: 'energy', conf: '0.85' },
];

// "MOUSE" over "POWER" in ANSI Shadow block art (the terminal exploration).
const ASCII = `███╗   ███╗ ██████╗ ██╗   ██╗███████╗███████╗
████╗ ████║██╔═══██╗██║   ██║██╔════╝██╔════╝
██╔████╔██║██║   ██║██║   ██║███████╗█████╗
██║╚██╔╝██║██║   ██║██║   ██║╚════██║██╔══╝
██║ ╚═╝ ██║╚██████╔╝╚██████╔╝███████║███████╗
╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
██████╗  ██████╗ ██╗    ██╗███████╗██████╗
██╔══██╗██╔═══██╗██║    ██║██╔════╝██╔══██╗
██████╔╝██║   ██║██║ █╗ ██║█████╗  ██████╔╝
██╔═══╝ ██║   ██║██║███╗██║██╔══╝  ██╔══██╗
██║     ╚██████╔╝╚███╔███╔╝███████╗██║  ██║
╚═╝      ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝`;

// The agent's selection chrome: four corner handles + an object-detection-style
// class label. `cls` namespaces the styles ("gw" for the grid tiles, "os" for the
// windowed preview), which size + sync it to that context's edit loop.
function SelBox({ cls, label, conf }: { cls: string; label: string; conf: string }) {
  return (
    <span className={`${cls}-sel`} aria-hidden>
      <span className={`${cls}-handle ${cls}-handle--tl`} />
      <span className={`${cls}-handle ${cls}-handle--tr`} />
      <span className={`${cls}-handle ${cls}-handle--bl`} />
      <span className={`${cls}-handle ${cls}-handle--br`} />
      <span className={`${cls}-label`}>
        {label} <span className={`${cls}-conf`}>{conf}</span>
      </span>
    </span>
  );
}

function Preview({ v }: { v: string }) {
  switch (v) {
    case 'center':
      return (
        <>
          <p className="slide-eyebrow">on measuring agents</p>
          <MazeTitle3D animate={false} />
          <p className="slide-footnote">by Maximillian Piras</p>
        </>
      );
    case 'mice':
      return (
        <div className="gw-mice" aria-hidden>
          {Array.from({ length: 9 }).map((_, i) => (
            <Mouse key={i} />
          ))}
        </div>
      );
    case 'cursor':
      return <MousePointer2 className="gw-glyph gw-glyph--cursor" aria-hidden />;
    case 'bolt':
      return <Zap className="gw-glyph gw-glyph--bolt" aria-hidden />;
    case 'mouse':
      return <Mouse className="gw-glyph gw-glyph--bolt" aria-hidden />;
    case 'cursors':
      return (
        <div className="gw-mice" aria-hidden>
          {Array.from({ length: 9 }).map((_, i) => (
            <MousePointer2 key={i} />
          ))}
        </div>
      );
    case 'bolts':
      return (
        <div className="gw-mice" aria-hidden>
          {Array.from({ length: 9 }).map((_, i) => (
            <Zap key={i} />
          ))}
        </div>
      );
    case 'mono':
      return (
        <div className="gw-mono" aria-hidden>
          M<span>P</span>
        </div>
      );
    case 'ascii':
      return <pre className="gw-ascii">{ASCII}</pre>;
    default:
      return null;
  }
}

function AgentWindow({
  v,
  prompt,
  label,
  conf,
  delay,
}: {
  v: string;
  prompt: string;
  label: string;
  conf: string;
  delay: number;
}) {
  return (
    <div className={`gw gw--${v}`}>
      <div className="gw-titlebar" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="gw-body">
        <div className="gw-sidebar">
          <GwChat prompt={prompt} delay={delay} />
        </div>
        <div className="gw-preview">
          {/* The canvas the agent is editing (periodic select-ring + nudge). */}
          <div className="gw-canvas">
            <Preview v={v} />
            {/* Selection overlay, faded in/out in sync with the select-ring. */}
            <SelBox cls="gw" label={label} conf={conf} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MousepowerOpening() {
  const { activeIndex, setForwardInterceptor } = useDeck();
  const index = useSlideIndex();
  const active = activeIndex === index;
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false); // maze cursor fade on step-0 exit
  const rootRef = useRef<HTMLDivElement>(null);
  const fading = useRef(false); // guards the step-0 → step-1 fade from double-fire

  // Reset the build whenever the slide leaves.
  useEffect(() => {
    if (!active) {
      setStep(0);
      setLeaving(false);
      fading.current = false;
      rootRef.current?.classList.remove('is-exiting');
    }
  }, [active]);

  // Final forward (step 2) runs the rack-focus exit, then lets the deck advance.
  useEffect(() => {
    if (!active) {
      setForwardInterceptor(null);
      return;
    }
    if (step === STEPS - 1) {
      setForwardInterceptor((done) => {
        rootRef.current?.classList.add('is-exiting');
        window.setTimeout(done, EXIT_MS);
      });
    } else {
      setForwardInterceptor(null);
    }
    return () => setForwardInterceptor(null);
  }, [active, step, setForwardInterceptor]);

  // Capture-phase advance within the build; boundaries fall through to the Deck.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (FWD.has(e.key) && step < STEPS - 1) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (step === 0) {
          // Fade the maze cursor before the zoom-out so it never jumps.
          if (fading.current) return;
          fading.current = true;
          setLeaving(true);
          window.setTimeout(() => {
            fading.current = false;
            setStep(1);
          }, FADE_MS);
        } else {
          setStep((s) => Math.min(s + 1, STEPS - 1));
        }
      } else if (BACK.has(e.key) && step > 0) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setLeaving(false);
        setStep((s) => Math.max(s - 1, 0));
      }
      // At a boundary: let the event reach the Deck to change slides.
    };
    window.addEventListener('keydown', onKey, { capture: true });
    return () => window.removeEventListener('keydown', onKey, { capture: true });
  }, [active, step]);

  return (
    <div className="mp-opening" data-step={step} ref={rootRef}>
      {step === 0 && <TitleHero mouseHidden={leaving} />}

      {step === 1 && (
        <div className="os-desktop">
          <div className="os-window">
            <div className="os-titlebar" aria-hidden>
              <span className="os-light" />
              <span className="os-light" />
              <span className="os-light" />
            </div>
            <div className="os-body">
              <div className="os-sidebar">
                <div className="os-sidebar-inner">
                  <AgentChat />
                </div>
              </div>
              <div className="os-screen">
                <div className="slide-content">
                  {/* Each element carries the agent's selection chrome (corner
                      handles + an object-detection label), faded in with its
                      edit-loop ring (see .os-sel). */}
                  <p className="slide-eyebrow">
                    on measuring agents
                    <SelBox cls="os" label="subtitle" conf="0.95" />
                  </p>
                  {/* Static maze — no cursor in the windowed preview. */}
                  <MazeTitle3D animate={false}>
                    <SelBox cls="os" label="wordmark" conf="0.99" />
                  </MazeTitle3D>
                  <p className="slide-footnote">
                    by Maximillian Piras
                    <SelBox cls="os" label="byline" conf="0.96" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="explore-desktop">
          <div className="explore-grid">
            {TILES.map((t, i) => (
              <AgentWindow
                key={t.v}
                v={t.v}
                prompt={t.prompt}
                label={t.label}
                conf={t.conf}
                delay={i * 260}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
