'use client';

// The opening of the deck, unified into ONE slide with four forward-advanced
// build steps (the title living inside the agent app that built it):
//   step 0 — full-bleed maze title, the cursor-agent threading the corridors
//   step 1 — zoom out: the title is the live preview of a v0-style agent app
//             (chat sidebar streaming, the agent editing the canvas)
//   step 2 — the window multiplies into a 3×3 grid of agents, each exploring a
//             different creative direction in parallel
//   step 3 — the agents go to work: each window's content cross-fades to a live
//             browser-session recording (looping, muted) while the window chrome
//             stays put. The grid stays mounted from step 2 so the zoom never
//             replays and the swap reads as the canvases turning into browsers.
// Advancement uses the same capture-phase key listener as the other build slides
// (TokensSequence); the step-0 → step-1 hand-off first fades the maze cursor so
// the zoom-out reads clean, and the final forward runs the rack-focus exit.
import { useEffect, useRef, useState } from 'react';
import { Mouse, MousePointer2 } from 'lucide-react';
import { useDeck, useSlideIndex } from '../Deck';
import { MazeTitle3D } from './MazeTitle3D';
import { TitleHero } from './TitleHero';
import { AgentChat } from './AgentChat';
import { GwChat } from './GwChat';
import { GinSchematic } from './GinSchematic';

const STEPS = 4;
const FADE_MS = 380; // maze cursor fade before the step-0 → step-1 zoom-out
const EXIT_MS = 620; // rack-focus exit on the final forward (mirrors .is-exiting)
const FWD = new Set(['ArrowRight', 'ArrowDown', ' ']);
const BACK = new Set(['ArrowLeft', 'ArrowUp', 'Backspace']);

// Row-major 3×3; the centrepiece is index 4 (true centre) — the zoom pivots there.
// Its prompt matches step 1 exactly so the copy is continuous through the cut.
// `label` is the object-detection-style tag drawn on each canvas's selection box.
// The off-centre tiles preview graphics that recur later in the deck (tokens,
// the horsepower/mousepower schematics, the horse→engine sequence, the dials).
// `video` is the step-3 browser-session recording the canvas cross-fades to — one
// unique clip per tile.
const TILES = [
  { v: 'tokens', prompt: 'make it about tokens', label: 'tokens', conf: '0.93', video: 'form' },
  { v: 'gin', prompt: 'diagram one horsepower', label: 'horsepower', conf: '0.95', video: 'ebay' },
  { v: 'mpm', prompt: 'measure the cursor', label: 'mousepower', conf: '0.92', video: 'irs' },
  { v: 'mice', prompt: 'what if it’s a swarm', label: 'swarm', conf: '0.91', video: 'swaglabs' },
  { v: 'center', prompt: 'build the title slide for the mousepower deck', label: 'wordmark', conf: '0.99', video: 'yutori' },
  { v: 'ascii', prompt: 'try ascii art', label: 'ascii-art', conf: '0.83', video: 'clintrials' },
  { v: 'cursors', prompt: 'a cursor tornado', label: 'tornado', conf: '0.73', video: 'browser-research' },
  { v: 'hpseq', prompt: 'from horse to engine', label: 'steam-engine', conf: '0.88', video: 'sec' },
  { v: 'dials', prompt: 'tune the uncertainty', label: 'entropy', conf: '0.86', video: 'yc' },
];

// Mini-dial geometry for the 'dials' tile — the EntropySliders dial in miniature
// (−140°→+140° sweep, 80° gap at the bottom). Mirrors EntropySliders' arc math.
const DIAL_A0 = -140;
const DIAL_SPAN = 280;
const DIAL_RR = 40;
const dialPt = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [50 + DIAL_RR * Math.sin(a), 50 - DIAL_RR * Math.cos(a)] as const;
};
const dialArc = (t1: number, t2: number) => {
  const [x1, y1] = dialPt(t1);
  const [x2, y2] = dialPt(t2);
  const large = Math.abs(t2 - t1) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${DIAL_RR} ${DIAL_RR} 0 ${large} 1 ${x2} ${y2}`;
};
function MiniDial({ value }: { value: number }) {
  const angle = DIAL_A0 + (value / 100) * DIAL_SPAN;
  return (
    <div className="gw-dial">
      <svg className="gw-dial-ring" viewBox="0 0 100 100" aria-hidden>
        <path className="gw-dial-track" d={dialArc(DIAL_A0, -DIAL_A0)} />
        <path className="gw-dial-fill" d={dialArc(DIAL_A0, angle)} />
      </svg>
      <div className="gw-dial-knob" style={{ transform: `rotate(${angle}deg)` }} />
    </div>
  );
}

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
          <p className="slide-eyebrow">
            measuring agents through mental models
          </p>
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
    // A cursor tornado — a swarm of pointers orbiting the centre at wildly varied
    // radii, speeds, directions, sizes and colours (the agent going off the rails).
    case 'cursors': {
      const N = 12;
      return (
        <div className="gw-swarm" aria-hidden>
          {Array.from({ length: N }).map((_, i) => {
            const frac = 0.05 + ((i * 17) % 40) / 100; // orbit radius (of --u)
            const dur = 2.2 + ((i * 11) % 50) / 10; // 2.2–7.1s
            const rev = i % 2 === 1;
            const delay = -((i * 211) % 900) / 100;
            const scale = 0.55 + ((i * 23) % 80) / 100; // 0.55–1.34×
            const face = (i * 151) % 360;
            return (
              <span
                key={i}
                className="gw-swarm-orbit"
                style={{
                  animationDuration: `${dur}s`,
                  animationDirection: rev ? 'reverse' : 'normal',
                  animationDelay: `${delay}s`,
                }}
              >
                <MousePointer2
                  className={`gw-swarm-cursor${i % 3 === 0 ? ' gw-swarm-cursor--cyan' : ''}`}
                  style={{
                    transform: `translateX(calc(var(--u) * ${frac})) rotate(${face}deg) scale(${scale})`,
                  }}
                />
              </span>
            );
          })}
        </div>
      );
    }
    case 'ascii':
      return <pre className="gw-ascii">{ASCII}</pre>;
    // The "TOKENS" wordmark with the coin as its "O" (the tokens slide).
    case 'tokens':
      return (
        <div className="gw-tokens" aria-hidden>
          <span>T</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="gw-tokens-coin" src="/decks/mousepower/coin.svg" alt="" />
          <span>KENS</span>
        </div>
      );
    // The horse-gin stopwatch schematic (the horsepower slide).
    case 'gin':
      return <GinSchematic className="gw-gin" />;
    // The mousepower measurement rig — a probe reticle with a fan of edge rays.
    case 'mpm': {
      const W = 200;
      const H = 130;
      const cx = W / 2;
      const cy = H / 2;
      const HOLE = 13;
      const rays = Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const dx = Math.cos(a);
        const dy = Math.sin(a);
        let t = Infinity;
        if (dx > 1e-6) t = Math.min(t, (W - cx) / dx);
        else if (dx < -1e-6) t = Math.min(t, -cx / dx);
        if (dy > 1e-6) t = Math.min(t, (H - cy) / dy);
        else if (dy < -1e-6) t = Math.min(t, -cy / dy);
        return { sx: cx + dx * HOLE, sy: cy + dy * HOLE, ex: cx + dx * t, ey: cy + dy * t };
      });
      return (
        <svg className="gw-mpm" viewBox={`0 0 ${W} ${H}`} aria-hidden>
          {rays.map((r, i) => (
            <line key={i} className="gw-mpm-line" x1={r.sx} y1={r.sy} x2={r.ex} y2={r.ey} />
          ))}
          <circle className="gw-mpm-ring" cx={cx} cy={cy} r="11" />
          <line className="gw-mpm-cross" x1={cx - 18} y1={cy} x2={cx - 8} y2={cy} />
          <line className="gw-mpm-cross" x1={cx + 8} y1={cy} x2={cx + 18} y2={cy} />
          <line className="gw-mpm-cross" x1={cx} y1={cy - 18} x2={cx} y2={cy - 8} />
          <line className="gw-mpm-cross" x1={cx} y1={cy + 8} x2={cx} y2={cy + 18} />
        </svg>
      );
    }
    // The horse-gin → steam-engine sequence (two diagrams + a cyan arrow).
    case 'hpseq':
      return (
        <div className="gw-hpseq" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/decks/mousepower/diagram-gin.png" alt="" />
          <svg className="gw-hpseq-arrow" viewBox="0 0 40 20" aria-hidden>
            <line x1="2" y1="10" x2="34" y2="10" />
            <polyline points="27,3 35,10 27,17" />
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/decks/mousepower/diagram-steam-engine.png" alt="" />
        </div>
      );
    // The agent-entropy model as three dials (the closing interactive).
    case 'dials':
      return (
        <div className="gw-dials" aria-hidden>
          <MiniDial value={26} />
          <MiniDial value={62} />
          <MiniDial value={88} />
        </div>
      );
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
  video,
}: {
  v: string;
  prompt: string;
  label: string;
  conf: string;
  delay: number;
  video: string;
}) {
  return (
    <div className={`gw gw--${v}`}>
      <div className="gw-titlebar" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="gw-body">
        {/* The build content (sidebar + edited canvas). In step 3 this cross-fades
            out as the browser-session video fades in beneath it. */}
        <div className="gw-build">
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
        {/* Step-3 browser session: a looping, muted recording filling the body.
            Mounted with the grid (step ≥ 2) so it's playing before the cross-fade. */}
        <video
          className="gw-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        >
          {/* webm first (smaller, Chrome/Firefox); mp4 fallback for Safari. */}
          <source src={`/decks/mousepower/${video}.webm`} type="video/webm" />
          <source src={`/decks/mousepower/${video}.mp4`} type="video/mp4" />
        </video>
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
                    measuring agents through mental models
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

      {step >= 2 && (
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
                video={t.video}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
