import { Mouse, MousePointer2, Zap } from 'lucide-react';
import { MazeTitle3D } from './MazeTitle3D';
import { GwChat } from './GwChat';

// Slide 3 — the agent window multiplies into a 3×2 grid: the original (the
// centrepiece, carried over from slide 2, sitting top-middle) plus five more,
// each a full agent window (streaming chat + a canvas) off exploring a different
// CREATIVE direction around the theme (mouse / power / agents) — not literal
// wordmarks. Each canvas is also being actively edited (a periodic selection ring
// + nudge), so it reads as agents working many directions in parallel. The
// transition zooms out from the centrepiece while the surrounding five fade in.
// Layout / variants / zoom / edit loop live in decks.css (.explore-* / .gw-*).

// Row-major 3×2; the centrepiece is index 1 (top-middle) — the zoom pivots there.
// Its prompt matches slide 2 exactly so the copy is continuous through the cut.
const TILES = [
  { v: 'mice', prompt: 'what if it’s a swarm' },
  { v: 'center', prompt: 'build the title slide for the mousepower deck' },
  { v: 'cursor', prompt: 'lead with the cursor' },
  { v: 'bolt', prompt: 'lean into the power' },
  { v: 'mono', prompt: 'just a monogram' },
  { v: 'ascii', prompt: 'try ascii art' },
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

function Preview({ v }: { v: string }) {
  switch (v) {
    case 'center':
      return (
        <>
          <p className="slide-eyebrow">Maximillian Piras</p>
          <MazeTitle3D animate={false} />
          <p className="slide-footnote">on the measurement of agents</p>
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

function AgentWindow({ v, prompt, delay }: { v: string; prompt: string; delay: number }) {
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
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExplorationGrid() {
  return (
    <div className="explore-desktop">
      <div className="explore-grid">
        {TILES.map((t, i) => (
          <AgentWindow key={t.v} v={t.v} prompt={t.prompt} delay={i * 260} />
        ))}
      </div>
    </div>
  );
}
