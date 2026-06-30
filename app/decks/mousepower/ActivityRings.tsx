'use client';

// AARRR pirate-metric rings: five concentric arcs in distinguishable cyan/teal
// variants (harmonised with the deck's #00bbff), broken open across the top-left
// quadrant so the circles don't close on themselves. The opened wedge holds a
// right-aligned, all-caps label per ring (matching the deck's diagram labels),
// each aligned to its ring's top edge. Arcs draw on (clockwise) when `on` flips.
type Ring = { id: string; label: string; r: number; pct: number; from: string; to: string };

const SIZE = 240;
const C = SIZE / 2;
const W = 5; // stroke width, viewBox units (thin)
const SWEEP = 270; // degrees of track drawn; the remaining 90° (top-left) is the gap

// Outer → inner. Funnel-shaped fills; hue drifts azure → cyan → teal so adjacent
// rings read apart. Radii sit in an outer band, leaving a large centre hole that
// clears the orbiting token icons around the parked coin.
// Gold ramp, harmonised with the coin: the innermost ring (ref) is the richest
// gold, lightening to pale champagne at the outer ring (acq).
const RINGS: Ring[] = [
  { id: 'acq', label: 'ACQUISITION', r: 112, pct: 0.9, from: '#d0a850', to: '#e4c87e' },
  { id: 'act', label: 'ACTIVATION', r: 101, pct: 0.72, from: '#c49a42', to: '#dcba66' },
  { id: 'ret', label: 'RETENTION', r: 90, pct: 0.55, from: '#b68930', to: '#d2ab50' },
  { id: 'rev', label: 'REVENUE', r: 79, pct: 0.38, from: '#a8791a', to: '#c69a34' },
  { id: 'ref', label: 'REFERRAL', r: 68, pct: 0.24, from: '#9a6c10', to: '#b88c24' },
];

// Clock angle θ (deg, 0 = top, clockwise) → point on a circle of radius r.
const pt = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.sin(a), C - r * Math.cos(a)] as const;
};

// Arc path from θ1 to θ2 (clockwise).
const arc = (r: number, t1: number, t2: number) => {
  const [x1, y1] = pt(r, t1);
  const [x2, y2] = pt(r, t2);
  const large = t2 - t1 > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
};

export function ActivityRings({ on }: { on: boolean }) {
  return (
    <svg
      className="activity-rings"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="acquisition, activation, retention, revenue, referral"
    >
      <defs>
        {RINGS.map((ring) => (
          <linearGradient key={ring.id} id={`ring-${ring.id}`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor={ring.from} />
            <stop offset="1" stopColor={ring.to} />
          </linearGradient>
        ))}
      </defs>

      {/* Tracks — the full 270° sweep at low opacity. */}
      {RINGS.map((ring) => (
        <path
          key={`track-${ring.id}`}
          d={arc(ring.r, 0, SWEEP)}
          fill="none"
          stroke={ring.from}
          strokeOpacity={0.16}
          strokeWidth={W}
          strokeLinecap="round"
        />
      ))}

      {/* Value arcs — draw on clockwise from the top when `on`. */}
      {RINGS.map((ring, i) => (
        <path
          key={`arc-${ring.id}`}
          d={arc(ring.r, 0, SWEEP * ring.pct)}
          fill="none"
          stroke={`url(#ring-${ring.id})`}
          strokeWidth={W}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={on ? 0 : 1}
          style={{
            transition: 'stroke-dashoffset 1.15s cubic-bezier(0.2, 0.7, 0.2, 1)',
            transitionDelay: `${i * 0.09}s`,
          }}
        />
      ))}

      {/* Labels in the opened top-left wedge: right-aligned, each at its ring's top. */}
      {RINGS.map((ring, i) => (
        <text
          key={`label-${ring.id}`}
          className="ar-label"
          x={C - 7}
          y={C - ring.r}
          style={{
            opacity: on ? 1 : 0,
            transition: 'opacity 0.45s ease',
            transitionDelay: `${0.3 + i * 0.09}s`,
          }}
        >
          {ring.label}
        </text>
      ))}
    </svg>
  );
}
