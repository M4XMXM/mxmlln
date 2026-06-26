'use client';

// Apple-Watch-style activity rings. The arcs draw on when `on` flips true.
type Ring = { id: string; r: number; pct: number; from: string; to: string };

const W = 9; // stroke width, viewBox units
const SIZE = 240;
const C = SIZE / 2;

const RINGS: Ring[] = [
  { id: 'move', r: 110, pct: 0.82, from: '#FF0A36', to: '#FF4E7E' },
  { id: 'exercise', r: 96, pct: 0.67, from: '#16C93B', to: '#A8FF12' },
  { id: 'stand', r: 82, pct: 0.93, from: '#00BEDB', to: '#28F2E6' },
];

export function ActivityRings({ on }: { on: boolean }) {
  return (
    <svg
      className="activity-rings"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="activity rings"
    >
      <defs>
        {RINGS.map((ring) => (
          <linearGradient key={ring.id} id={`ring-${ring.id}`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor={ring.from} />
            <stop offset="1" stopColor={ring.to} />
          </linearGradient>
        ))}
      </defs>
      {RINGS.map((ring) => (
        <circle
          key={`track-${ring.id}`}
          cx={C}
          cy={C}
          r={ring.r}
          fill="none"
          stroke={ring.from}
          strokeOpacity={0.15}
          strokeWidth={W}
        />
      ))}
      {RINGS.map((ring, i) => {
        const circ = 2 * Math.PI * ring.r;
        const filled = circ * (1 - ring.pct);
        return (
          <circle
            key={`arc-${ring.id}`}
            cx={C}
            cy={C}
            r={ring.r}
            fill="none"
            stroke={`url(#ring-${ring.id})`}
            strokeWidth={W}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={on ? filled : circ}
            transform={`rotate(-90 ${C} ${C})`}
            style={{
              transition: 'stroke-dashoffset 1.15s cubic-bezier(0.2, 0.7, 0.2, 1)',
              transitionDelay: `${i * 0.09}s`,
            }}
          />
        );
      })}
    </svg>
  );
}
