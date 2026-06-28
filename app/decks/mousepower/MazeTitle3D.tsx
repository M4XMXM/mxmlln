'use client';

import { useEffect, useId, useMemo, useRef } from 'react';
import { useAnimationFrame, useReducedMotion } from 'framer-motion';
import { Mouse } from 'lucide-react';

// 3D variant of the Mousepower title. The monoline maze is treated as a set of
// walls: every stroke is extruded upward and viewed from a bird's-eye camera
// placed directly above the centerpoint. A straight-down perspective keeps the
// floor 1:1 while the wall tops splay outward the farther they sit from center —
// so the maze reads as walls rising and leaning away around the mouse, which
// runs the same floor route as the 2D version (see MazeTitle.tsx, the reference).
//
// Lightweight by design: the perspective projection is computed here and drawn
// as SVG lines (no WebGL dependency), matching the deck's monoweight aesthetic.

// Floor centerlines of each wall (wordmark coords, viewBox 0 0 212 91.5).
const POLYLINES: number[][][] = [
  [[-6.5, 97.5], [-6.5, -6.5], [219.5, -6.5], [219.5, 97.5], [30.5, 97.5]],
  [[14.5, 38.5], [14.5, 14.5], [26.5, 14.5], [26.5, 38.5], [38.5, 38.5], [38.5, 14.5], [50.5, 14.5], [50.5, 38.5]],
  [[124.5, 52.5], [124.5, 76.5], [112.5, 76.5], [112.5, 52.5], [100.5, 52.5], [100.5, 65.0], [100.5, 76.5], [88.5, 76.5], [88.5, 52.5]],
  [[63.5, 14.5], [63.5, 38.5], [87.5, 38.5], [87.5, 14.5], [63.5, 14.5]],
  [[50.5, 52.5], [50.5, 76.5], [74.5, 76.5], [74.5, 52.5], [50.5, 52.5]],
  [[137.5, 38.5], [161.5, 38.5], [161.5, 26.5], [137.5, 26.5], [137.5, 14.5], [161.5, 14.5]],
  [[186.01, 26.5], [198.5, 26.5], [198.5, 14.5], [174.5, 14.5], [174.5, 38.5], [197.52, 38.5]],
  [[149.01, 64.5], [161.5, 64.5], [161.5, 52.5], [137.5, 52.5], [137.5, 76.5], [160.52, 76.5]],
  [[198.5, 76.5], [186.91, 76.5], [186.91, 64.5], [198.5, 64.5], [198.5, 52.5], [174.5, 52.5], [174.5, 76.5]],
  [[27.0, 65.09], [27.0, 76.5], [38.5, 76.5], [38.5, 52.5], [14.5, 52.5], [14.5, 97.5]],
  [[100.5, 14.5], [100.5, 38.5], [124.5, 38.5], [124.5, 14.5]],
  [[112.5, 14.5], [112.5, 26.5]],
];

const CX = 106;
const CY = 45.75;
// Anisotropic camera height: x kept shallow, y lower for a more dramatic
// vertical perspective. Each axis keeps the floor (z=0) at 1:1; only the wall
// tops splay, and they splay harder along y.
const CAM_H_X = 540;
const CAM_H_Y = 200;
const WALL_H = 50; // wall extrusion height (toward the camera)
// The frame sits at the extremes of the anisotropic camera, so its top/bottom
// walls (far in y) out-lean its side walls (far in x) and the corners read as a
// different perspective than the type. Instead of the camera extrusion, the frame
// crest is the floor inflated from centre by its own x/y scales. Equal scales =
// true single-perspective (corners agree) but, since top/bottom sit closer to
// centre than the sides, that leaves them shallow. So nudge the y-scale up: a
// middle ground that keeps the corners close to radial while restoring depth to
// the top/bottom walls. Either way the crest is a pure function of position, so
// adjacent walls still share corner posts (no gaps).
const FRAME_CREST_SCALE_X = 1.1;
const FRAME_CREST_SCALE_Y = 1.21;
// Backlit: light from behind/beneath the maze, so the FAR parts (the floor/base,
// z=0) glow and the NEAR parts (the crest, closest to the viewer) fall into
// shadow — the inverse of front-lit. Gradients keep the base→top axis; the tone
// assignment below puts light at the base and shadow at the top.
const SHADE_BASE = '#3a3a3a'; // dark tone
const SHADE_TOP = '#9b9b9b'; // light tone
// Pane silhouette edge: its own base→top gradient so the rim catches light
// (reflective highlight up top, shadow at the base) rather than a flat gray.
// Its base bottoms out at the faces' deepest shadow (SHADE_BASE) so the lowest
// edges read the same darkness as the floor of the panes.
const EDGE_BASE = SHADE_BASE;
const EDGE_TOP = '#d4d4d4';
// Mouse: the design-system accent (#00BBFF). Kept as a backlit gradient like the
// walls — a darker cyan in shadow easing to the accent at the lit end — so it
// stays dimensional while reading clearly as the brand cyan.
const MOUSE_DARK = '#0090c4';
const MOUSE_LIGHT = '#00bbff';
// Flat (gradient-free) palette: solid-white wall faces, ink strokes, solid accent
// mouse — a clean monoline reading of the same 3D mark.
const FLAT_FACE = '#ffffff';
const FLAT_STROKE = '#111111';
const FLAT_MOUSE = FLAT_STROKE; // black outline, matching the wall strokes

// Perspective from straight above center: depth shrinks toward the camera, so
// higher points (wall tops) magnify outward from center — more along y than x.
function project(x: number, y: number, z: number): [number, number] {
  return [((x - CX) * CAM_H_X) / (CAM_H_X - z), ((y - CY) * CAM_H_Y) / (CAM_H_Y - z)];
}

// Crest for the frame: the floor point inflated from centre by per-axis scales
// (see FRAME_CREST_SCALE_X/Y), so each wall leans out from the nadir. Floor
// projects 1:1, so the floor point is just (x-CX, y-CY).
function frameCrest(x: number, y: number): [number, number] {
  return [(x - CX) * FRAME_CREST_SCALE_X, (y - CY) * FRAME_CREST_SCALE_Y];
}

const STROKE = 1.25; // monoweight, matches the wordmark + mouse

// ---- Corridor graph for the mouse's random walk -----------------------------
// Nodes are corridor intersections + letter-pocket dead-ends; edges are open
// corridors. The mouse wanders this graph stochastically (see useAnimationFrame
// below). Coords are wordmark floor coords; recentered to floor space after.
const NODES_RAW: [number, number][] = [
  // top moat — centred in the widened outer track (y 4; corners at x 4 / 209)
  [4, 4], [32.5, 4], [57, 4], [94, 4], [106.5, 4], [118.5, 4], [131, 4], [168, 4], [209, 4],
  // inter-row (y 45.5; left/right ends ride the left/right moat at x 4 / 209)
  [4, 45.5], [20.5, 45.5], [44.5, 45.5], [57, 45.5], [81, 45.5], [94, 45.5], [118.5, 45.5], [131, 45.5], [168, 45.5], [209, 45.5],
  // bottom moat — centred in the widened outer track (y 87; right corner x 209)
  [44.5, 87], [81, 87], [106.5, 87], [131, 87], [168, 87], [209, 87],
  // letter-pocket dead-ends: M(l,r,notch), U(l,r), W(l,r,mid). Pulled ~9u back
  // from each closed wall so the mouse stops clear instead of poking through.
  [20.5, 23.5], [44.5, 23.5], [32.5, 29.5], [106.5, 29.5], [118.5, 29.5], [94.5, 67.5], [118.5, 67.5], [106.5, 61.5],
  // centre of the maze (on the inter-row corridor) — the mouse's starting point.
  [106, 45.5],
];
const CENTER_NODE = NODES_RAW.length - 1;
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], // top moat
  [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 33], [33, 15], [15, 16], [16, 17], [17, 18], // inter-row (via centre node 33)
  [19, 20], [20, 21], [21, 22], [22, 23], [23, 24], // bottom moat
  [0, 9], [8, 18], [18, 24], // left + right moat
  [2, 12], [3, 14], [6, 16], [7, 17], // top↔inter-row gaps
  [11, 19], [13, 20], [16, 22], [17, 23], // inter-row↔bottom gaps
  [10, 25], [11, 26], [1, 27], [4, 28], [5, 29], [14, 30], [15, 31], [21, 32], // pocket spurs
];
const NODES: [number, number][] = NODES_RAW.map(([x, y]) => [x - CX, y - CY]);
const ADJ: number[][] = (() => {
  const a: number[][] = NODES.map(() => []);
  for (const [u, v] of EDGES) {
    a[u].push(v);
    a[v].push(u);
  }
  return a;
})();
const START_NODE = CENTER_NODE;
const SPEED = 46; // floor units per second

export function MazeTitle3D({
  recallRef,
  animate = true,
  mouseHidden = false,
  solid = false,
}: {
  // When set, exposes a recall(done) that glides the mouse to floor-centre
  // (upright) and calls done on arrival — used to hand off to the centered agent
  // on the next slide (see TitleSlide / Deck).
  recallRef?: { current: ((done: () => void) => void) | null };
  // Static render (no wandering mouse / rAF) — used by the exploration-grid tiles
  // so 6 copies don't each run an animation loop.
  animate?: boolean;
  // Flat mode: solid-white wall faces + ink strokes (no backlit gradients).
  solid?: boolean;
  // Fade the mouse out (e.g. while leaving the title slide, for a cleaner
  // transition). Only sets inline opacity when true, so CSS can otherwise control
  // it (the windowed preview fades its mouse in after the window settles).
  mouseHidden?: boolean;
} = {}) {
  const mouseRef = useRef<SVGGElement>(null);
  const mouseGradRef = useRef<SVGLinearGradientElement>(null);
  const reduced = useReducedMotion();
  // Unique per-instance prefix for gradient ids, so multiple <MazeTitle3D>s on
  // screen (e.g. the title + the windowed copy) don't collide on shared ids.
  const uid = useId().replace(/:/g, '');
  // Random-walk state across the corridor graph. `recall`, when set, overrides
  // the walk to ease the mouse straight to centre for the slide transition.
  const walk = useRef({
    pos: [NODES[START_NODE][0], NODES[START_NODE][1]] as [number, number],
    cur: START_NODE,
    tgt: ADJ[START_NODE][0],
    prev: -1,
    heading: 0,
    pause: 0, // ms left to hesitate at the current node before moving
    recall: null as null | { elapsed: number; sx: number; sy: number; sh: number; done: (() => void) | null },
  });

  // Extrude each wall segment into a quad panel. Faces are shaded base→top (light
  // from above); the top crest is a crisp stroke (the legible maze pattern).
  // Panels sort far→near so nearer walls occlude the strokes — and the mouse —
  // behind them (hidden-line removal).
  type Panel = { fill: string; crest: string; g: [number, number, number, number] };
  const { panels, viewBox } = useMemo(() => {
    const raw: Array<Panel & { dist: number }> = [];
    const xs: number[] = [];
    const ys: number[] = [];
    for (let pi = 0; pi < POLYLINES.length; pi++) {
      const pl = POLYLINES[pi];
      const isFrame = pi === 0; // frame uses the isotropic crest; letters keep the camera
      for (let k = 0; k < pl.length - 1; k++) {
        const [x1, y1] = pl[k];
        const [x2, y2] = pl[k + 1];
        if (x1 === x2 && y1 === y2) continue; // skip degenerate (closing dupes)
        // The P's descender (the x=14.5 stem dropping into the bottom moat) shares
        // the frame's floor region, so extrude it with the frame crest too — that
        // lands its back-bottom corner on the bottom wall's top edge and its tip on
        // the left wall's bottom (the deep letter extrusion would overshoot both).
        const useFrameCrest = isFrame || (x1 === 14.5 && x2 === 14.5 && Math.max(y1, y2) > 76.5);
        const f1 = project(x1, y1, 0);
        const f2 = project(x2, y2, 0);
        const t2 = useFrameCrest ? frameCrest(x2, y2) : project(x2, y2, WALL_H);
        const t1 = useFrameCrest ? frameCrest(x1, y1) : project(x1, y1, WALL_H);
        xs.push(f1[0], f2[0], t2[0], t1[0]);
        ys.push(f1[1], f2[1], t2[1], t1[1]);
        const Xc = (x1 + x2) / 2 - CX;
        const Yc = (y1 + y2) / 2 - CY;
        // All panels share the same centroid height, so the z-term is constant
        // and ordering reduces to radial floor distance from center.
        const dist = Xc * Xc + Yc * Yc + (CAM_H_X - WALL_H / 2) ** 2;
        const p = (a: [number, number]) => `${a[0].toFixed(2)} ${a[1].toFixed(2)}`;
        // Shade along the z-axis projected: base (z=0, the floor — farthest from
        // the viewer) is dark, the top edge (z=WALL_H — closest to the viewer) is
        // light. This holds for both rows: the bottom row's top edge projects to
        // the bottom of its pane, so its lightest part sits there (nearest in z).
        const bm: [number, number] = [(f1[0] + f2[0]) / 2, (f1[1] + f2[1]) / 2];
        const tm: [number, number] = [(t1[0] + t2[0]) / 2, (t1[1] + t2[1]) / 2];
        raw.push({
          dist,
          fill: `M${p(f1)} L${p(f2)} L${p(t2)} L${p(t1)} Z`,
          crest: `M${p(t1)} L${p(t2)}`,
          g: [bm[0], bm[1], tm[0], tm[1]],
        });
      }
    }
    raw.sort((a, b) => b.dist - a.dist);
    const pad = 8;
    const minx = Math.min(...xs) - pad;
    const miny = Math.min(...ys) - pad;
    const w = Math.max(...xs) - Math.min(...xs) + 2 * pad;
    const h = Math.max(...ys) - Math.min(...ys) + 2 * pad;
    return {
      panels: raw.map(({ dist, ...rest }) => rest) as Panel[],
      viewBox: `${minx.toFixed(1)} ${miny.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`,
    };
  }, []);

  // Position + orient the mouse, keeping its lit gradient world-vertical.
  const apply = () => {
    const w = walk.current;
    const rot = w.heading + 90;
    mouseRef.current?.setAttribute(
      'transform',
      `translate(${w.pos[0].toFixed(2)} ${w.pos[1].toFixed(2)}) rotate(${rot.toFixed(1)})`
    );
    mouseGradRef.current?.setAttribute('gradientTransform', `rotate(${(-rot).toFixed(1)} 12 12)`);
  };

  useEffect(() => {
    const w = walk.current;
    const nt = NODES[w.tgt];
    w.heading = (Math.atan2(nt[1] - w.pos[1], nt[0] - w.pos[0]) * 180) / Math.PI;
    apply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // Expose recall(done): ease the mouse to floor-centre [0,0], turning upright,
  // then fire done (the cue for the deck to advance to the centered agent).
  useEffect(() => {
    if (!recallRef) return;
    recallRef.current = (done) => {
      const w = walk.current;
      if (reduced) {
        w.pos[0] = 0;
        w.pos[1] = 0;
        w.heading = -90; // rotation 0 → upright, matching the agent
        apply();
        done();
        return;
      }
      w.recall = { elapsed: 0, sx: w.pos[0], sy: w.pos[1], sh: w.heading, done };
    };
    return () => {
      recallRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // Stochastic walk: ease along the current corridor; at each node pause briefly,
  // then pick a random neighbour (avoiding an immediate U-turn unless dead-ended).
  // A pending `recall` pre-empts the walk, gliding straight to centre.
  useAnimationFrame((_t, delta) => {
    if (!animate) return;
    const w = walk.current;
    if (w.recall) {
      const RECALL_MS = 620;
      w.recall.elapsed += Math.min(delta, 64);
      const t = Math.min(1, w.recall.elapsed / RECALL_MS);
      const e = t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2; // easeInOutQuad
      w.pos[0] = w.recall.sx * (1 - e);
      w.pos[1] = w.recall.sy * (1 - e);
      const dh = (((-90 - w.recall.sh + 540) % 360) - 180); // shortest turn to upright
      w.heading = w.recall.sh + dh * e;
      apply();
      if (t >= 1) {
        const d = w.recall.done;
        w.recall = null;
        d?.();
      }
      return;
    }
    if (reduced) return;
    let dt = Math.min(delta, 64); // clamp big gaps (e.g. tab refocus)
    if (w.pause > 0) {
      const used = Math.min(w.pause, dt);
      w.pause -= used;
      dt -= used;
      if (dt <= 0) return;
    }
    let remain = SPEED * (dt / 1000);
    while (remain > 0) {
      const tgt = NODES[w.tgt];
      const dx = tgt[0] - w.pos[0];
      const dy = tgt[1] - w.pos[1];
      const d = Math.hypot(dx, dy);
      if (d <= remain) {
        // Arrived: snap to the node and choose the next direction.
        w.pos[0] = tgt[0];
        w.pos[1] = tgt[1];
        remain -= d;
        w.prev = w.cur;
        w.cur = w.tgt;
        const nbrs = ADJ[w.cur];
        const opts = nbrs.filter((n) => n !== w.prev);
        const pool = opts.length ? opts : nbrs;
        w.tgt = pool[Math.floor(Math.random() * pool.length)];
        const nt = NODES[w.tgt];
        const newHeading = (Math.atan2(nt[1] - w.pos[1], nt[0] - w.pos[0]) * 180) / Math.PI;
        const turn = Math.abs((((newHeading - w.heading + 540) % 360) - 180)) > 1;
        if (turn) {
          // Only hesitate when actually changing direction; the heading flips to
          // the new direction once it sets off again (after the pause).
          w.pause = 140 + Math.random() * 320;
          break;
        }
        // Continuing straight through a node: no pause, keep gliding.
        w.heading = newHeading;
        continue;
      }
      w.pos[0] += (dx / d) * remain;
      w.pos[1] += (dy / d) * remain;
      w.heading = (Math.atan2(dy, dx) * 180) / Math.PI;
      remain = 0;
    }
    apply();
  });

  return (
    <div className="maze-title">
      <svg className="maze-title-3d" viewBox={viewBox} aria-label="Mouse Power" role="img">
        <defs>
          {panels.map((p, i) => (
            <linearGradient
              key={`f${i}`}
              id={`${uid}-wall-${i}`}
              gradientUnits="userSpaceOnUse"
              x1={p.g[0]}
              y1={p.g[1]}
              x2={p.g[2]}
              y2={p.g[3]}
            >
              {/* Backlit: base (far) lit, top (near) in shadow. */}
              <stop offset="0" stopColor={SHADE_TOP} />
              <stop offset="1" stopColor={SHADE_BASE} />
            </linearGradient>
          ))}
          {panels.map((p, i) => (
            <linearGradient
              key={`e${i}`}
              id={`${uid}-edge-${i}`}
              gradientUnits="userSpaceOnUse"
              x1={p.g[0]}
              y1={p.g[1]}
              x2={p.g[2]}
              y2={p.g[3]}
            >
              {/* Backlit rim: bright at the far/base edge, dark at the near crest. */}
              <stop offset="0" stopColor={EDGE_TOP} />
              <stop offset="1" stopColor={EDGE_BASE} />
            </linearGradient>
          ))}
          {/* Mouse stroke: backlit (far/base-of-icon lit, near in shadow);
              counter-rotated each frame so the light stays world-consistent. */}
          <linearGradient
            ref={mouseGradRef}
            id={`${uid}-mouse`}
            gradientUnits="userSpaceOnUse"
            x1={12}
            y1={0}
            x2={12}
            y2={24}
          >
            <stop offset="0" stopColor={MOUSE_DARK} />
            <stop offset="1" stopColor={MOUSE_LIGHT} />
          </linearGradient>
        </defs>

        {/* The solver, on the floor (drawn first = farthest, so the walls in
            front of it occlude it as it runs). Random-walks the corridor graph,
            rotated to face its heading. Omitted in static (non-animated) tiles. */}
        {animate && (
          <g
            ref={mouseRef}
            className="maze-mouse"
            style={{ ...(mouseHidden ? { opacity: 0 } : {}), transition: 'opacity 0.35s ease' }}
            transform={`translate(${NODES[START_NODE][0]} ${NODES[START_NODE][1]})`}
          >
            <g transform="translate(-5.5 -5.5)">
              <Mouse size={11} color={solid ? FLAT_MOUSE : `url(#${uid}-mouse)`} fill={solid ? FLAT_FACE : 'none'} strokeWidth={STROKE} absoluteStrokeWidth />
            </g>
          </g>
        )}

        {/* Wall panels far→near: backlit faces (far/base glows, near crest in
            shadow). Nearer walls occlude the faces, crests, and mouse behind them. */}
        {panels.map((p, i) => (
          <g key={i}>
            <path d={p.fill} fill={solid ? FLAT_FACE : `url(#${uid}-wall-${i})`} stroke={solid ? FLAT_STROKE : `url(#${uid}-edge-${i})`} strokeWidth={STROKE} strokeLinejoin="round" />
            {/* Crest is the wall's 3D top edge. Same stroke width + gradient as the
                silhouette so every stroke in the mark reads as one consistent
                weight (the gradient still darkens toward the near/shadow crest). */}
            <path d={p.crest} fill="none" stroke={solid ? FLAT_STROKE : `url(#${uid}-edge-${i})`} strokeWidth={STROKE} strokeLinecap="round" />
          </g>
        ))}
      </svg>
    </div>
  );
}
