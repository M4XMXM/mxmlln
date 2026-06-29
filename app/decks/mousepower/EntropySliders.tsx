'use client';

// Interactive closer: the agent-entropy model as three dials feeding a live
// verdict. Dials follow the Dieter-Rams dial from exp/003 (−140°→+140° sweep,
// conic progress ring, accent dot) restyled in the deck's cyan. Logic mirrors the
// brainstorm prototype: tiered thresholds (low 0–33 / mid 34–66 / high 67–100),
// an override precedence, then a composed reading from the low/high fragments.
import { useRef, useState } from 'react';

const tier = (v: number) => (v <= 33 ? 0 : v <= 66 ? 1 : 2);

// Only LOW and HIGH fragments carry text; MID (null) is omitted from composition.
const T = [
  'the task reduces to a static, deterministic script',
  null,
  'the task’s data is less compressible, therefore less predictable',
];
const A = [
  'the agent is likely to generalize to new instances of unseen data for this task',
  null,
  'high probability that the data is OOD and/or rewards are too sparse for RL',
];
const V = [
  'verification has the NP-style asymmetry — far cheaper to check than to solve, and its validity is confirmable',
  null,
  'verification collapses into redoing the work, so its validity rests on faith',
];

const cap1 = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type Sev = 'success' | 'danger' | 'warn' | 'neutral';

function compute(cap: number, task: number, verif: number) {
  const ta = tier(cap); // agent (epistemic)
  const tt = tier(task); // task (aleatoric)
  const tv = tier(verif); // verification
  let text = '';
  let sev: Sev;

  // Override precedence: verification-collapse > static-script > agent-uncertainty > composition.
  if (tv === 2) {
    text =
      'Verification collapses into redoing the work — the cost to check equals the cost to do the task, so the agent earns nothing no matter how the task or the agent is shaped. The worst case.';
    sev = 'danger';
  } else if (tt === 0) {
    text =
      'The task reduces to a static, deterministic script — its outcome is fixed, so an agent adds nothing here.';
    sev = 'warn';
  } else if (ta === 2) {
    text = 'High probability that the data is OOD and/or rewards are too sparse for RL.';
    sev = 'danger';
  } else {
    const parts = [T[tt], A[ta], V[tv]].filter(Boolean) as string[];
    text = parts.length ? cap1(parts.join('; ')) + '.' : '';
    if (tt === 1 && ta === 0 && tv === 0) sev = 'success';
    else if (tt === 2 && ta === 0 && tv === 0) sev = 'success';
    else sev = 'neutral';
  }

  return { text, sev };
}

// Dial sweep: value 0 → −140°, value 100 → +140° (280° total, 80° gap at bottom).
const A0 = -140;
const SPAN = 280;

// Ring arc geometry (viewBox 100). Clock angle: 0 = top, clockwise.
const RR = 44;
const ptOn = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [50 + RR * Math.sin(a), 50 - RR * Math.cos(a)] as const;
};
const arcPath = (t1: number, t2: number) => {
  const [x1, y1] = ptOn(t1);
  const [x2, y2] = ptOn(t2);
  const large = Math.abs(t2 - t1) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${RR} ${RR} 0 ${large} 1 ${x2} ${y2}`;
};

function Dial({
  label,
  tag,
  value,
  onChange,
}: {
  label: string;
  tag?: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const angle = A0 + (value / 100) * SPAN;

  // Pointer angle → value, measured from the dial centre (0° = top, clockwise).
  const setFrom = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let a =
      (Math.atan2(clientY - (r.top + r.height / 2), clientX - (r.left + r.width / 2)) * 180) /
        Math.PI +
      90;
    if (a > 180) a -= 360;
    if (a < -180) a += 360;
    a = Math.max(A0, Math.min(-A0, a));
    onChange(Math.round(((a - A0) / SPAN) * 100));
  };

  return (
    <div className="es-dial-cell">
      <div
        ref={ref}
        className="es-dial"
        role="slider"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          dragging.current = true;
          setFrom(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFrom(e.clientX, e.clientY);
        }}
        onPointerUp={(e) => {
          e.currentTarget.releasePointerCapture(e.pointerId);
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <svg className="es-dial-ring" viewBox="0 0 100 100" aria-hidden>
          <path className="es-dial-track" d={arcPath(A0, -A0)} />
          <path className="es-dial-fill" d={arcPath(A0, angle)} />
        </svg>
        <div className="es-dial-knob" style={{ transform: `rotate(${angle}deg)` }} />
      </div>
      <div className="es-dial-label">
        {label}
        {tag && ` (${tag})`}
      </div>
    </div>
  );
}

export function EntropySliders() {
  // value order mirrors the prototype ids: cap = agent epistemic, task, verif.
  const [cap, setCap] = useState(50);
  const [task, setTask] = useState(50);
  const [verif, setVerif] = useState(50);
  const { text, sev } = compute(cap, task, verif);

  return (
    <div className="es-stage rack-in">
      <div className="es-panel">
        <div className="es-dials">
          <Dial
            label="Agent’s uncertainty about the task"
            tag="epistemic"
            value={cap}
            onChange={setCap}
          />
          <Dial
            label="Inherent uncertainty in the task"
            tag="aleatoric"
            value={task}
            onChange={setTask}
          />
          <Dial
            label="Uncertainty in the verification process"
            value={verif}
            onChange={setVerif}
          />
        </div>

        <div className={`es-verdict es-${sev}`}>
          <p className="es-verdict-text">{text || '—'}</p>
        </div>
      </div>
    </div>
  );
}
