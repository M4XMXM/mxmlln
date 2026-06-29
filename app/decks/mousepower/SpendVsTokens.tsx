'use client';

// Combo chart: Coinbase AI spend (stacked bars, by org) vs. total token usage
// (overlaid line). Flat-then-explosive growth — the visual punchline that spend
// and usage are racing up together. Data is illustrative (deterministic, no RNG
// so SSR is stable), shaped to match the source tweet's chart.
import { useId } from 'react';

const N = 42;

// Stacked org segments, bottom → top (largest org on the bottom).
const ORGS = [
  { name: 'core', color: '#2F6BEB' },
  { name: 'data', color: '#FF7A1A' },
  { name: 'infra', color: '#15C2B2' },
  { name: 'apps', color: '#8B5CF6' },
  { name: 'other', color: '#EF4757' },
];
const RATIOS = [0.42, 0.24, 0.16, 0.12, 0.06]; // ~per-org share of each bar

// Deterministic series, flat early and exploding late, with a couple of dips.
function build() {
  const spend: number[] = [];
  const tokens: number[] = [];
  for (let i = 0; i < N; i++) {
    const g = i / (N - 1);
    let s = Math.exp(Math.pow(g, 1.7) * 3.9);
    s *= 0.9 + 0.2 * Math.abs(Math.sin(i * 1.7));
    if (i >= 12 && i <= 14) s *= 0.72; // mid volatility dip
    if (i >= 22 && i <= 24) s *= 0.82;
    if (i > 34) s *= 1 - (i - 34) * 0.07; // taper after the peak
    spend.push(s);

    let t = Math.exp(Math.pow(g, 1.5) * 3.8);
    t *= 1 + 0.18 * Math.sin(i * 1.05); // spikier than the bars
    if (i === 13) t *= 0.5; // sharp dips
    if (i === 23) t *= 0.62;
    if (i === 36) t *= 1.12; // late peak
    if (i === 37) t *= 0.86; // notch
    tokens.push(t);
  }
  return { spend, tokens };
}

const { spend, tokens } = build();

// Chart geometry (viewBox units).
const VW = 1000;
const VH = 470;
const M = { l: 60, r: 60, t: 22, b: 34 };
const PW = VW - M.l - M.r;
const PH = VH - M.t - M.b;
const X0 = M.l;
const Y1 = M.t + PH; // baseline
const step = PW / N;
const barW = step * 0.66;

const spendMax = Math.max(...spend);
const tokenMax = Math.max(...tokens);
const spendScale = (PH * 0.82) / spendMax; // bars top out a bit below the line peak
const tokenScale = (PH * 0.97) / tokenMax;

const cx = (i: number) => X0 + i * step + step / 2;

export function SpendVsTokens() {
  const uid = useId().replace(/:/g, '');
  const linePts = tokens.map((t, i) => `${cx(i)},${Y1 - t * tokenScale}`).join(' ');
  const hGrid = Array.from({ length: 7 }, (_, k) => M.t + (PH * k) / 7);

  return (
    <div className="svt-stage rack-in">
      <div className="svt-card">
        <h2 className="svt-title">AI Spend at Coinbase (Bars) -vs- Token Usage (Line)</h2>
        <p className="svt-sub">
          Left axis = USD spend (stacked by org). Right axis = total company tokens.
        </p>

        <svg className="svt-chart" viewBox={`0 0 ${VW} ${VH}`} role="img"
          aria-label="Coinbase AI spend versus token usage, both growing sharply over time">
          {/* Grid */}
          <g stroke="#ECECEC" strokeWidth="1">
            {hGrid.map((y, k) => (
              <line key={`h${k}`} x1={X0} y1={y} x2={X0 + PW} y2={y} />
            ))}
            {Array.from({ length: N + 1 }, (_, k) => (
              <line key={`v${k}`} x1={X0 + k * step} y1={M.t} x2={X0 + k * step} y2={Y1} />
            ))}
          </g>

          {/* Stacked spend bars */}
          {spend.map((s, i) => {
            let acc = 0;
            return (
              <g key={`bar${i}`}>
                {ORGS.map((org, k) => {
                  const h = RATIOS[k] * s * spendScale;
                  const y = Y1 - acc - h;
                  acc += h;
                  return (
                    <rect
                      key={org.name}
                      x={cx(i) - barW / 2}
                      y={y}
                      width={barW}
                      height={h}
                      fill={org.color}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Total-tokens line + markers */}
          <polyline points={linePts} fill="none" stroke="#3B3B3B" strokeWidth="2.4"
            strokeLinejoin="round" strokeLinecap="round" />
          {tokens.map((t, i) => (
            <circle key={`m${i}`} cx={cx(i)} cy={Y1 - t * tokenScale} r="3" fill="#3B3B3B" />
          ))}

          {/* Axis baselines */}
          <line x1={X0} y1={Y1} x2={X0 + PW} y2={Y1} stroke="#C9C9C9" strokeWidth="1.5" />

          {/* Axis titles */}
          <text className="svt-axis" transform={`rotate(-90 ${M.l - 40} ${M.t + PH / 2})`}
            x={M.l - 40} y={M.t + PH / 2}>AI Spend (USD)</text>
          <text className="svt-axis" transform={`rotate(-90 ${VW - M.r + 40} ${M.t + PH / 2})`}
            x={VW - M.r + 40} y={M.t + PH / 2}>Total Tokens</text>

          {/* keep uid referenced for future gradient defs without collisions */}
          <defs aria-hidden id={`svt-${uid}`} />
        </svg>
      </div>

      <p className="svt-source">
        Source: https://x.com/brian_armstrong/status/2070670644577280109
      </p>
    </div>
  );
}
