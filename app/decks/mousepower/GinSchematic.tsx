// The horse-gin drawn as a stopwatch: the rim is the watch face, the rotary arm
// (horse at its tip) is the sweeping hand. Static markup shared by the GinDiagram
// slide (className="hp-diagram") and the opening-grid preview tile. Spin/flip are
// driven by CSS gated on .deck-slide[data-active='true'], so the same markup is
// inert or animated depending on where it's mounted.

// Watch-dial ticks around the rim (major at the quarters).
const TICKS = Array.from({ length: 12 }, (_, i) => {
  const a = (i * 30 * Math.PI) / 180;
  const s = Math.sin(a);
  const c = Math.cos(a);
  const major = i % 3 === 0;
  const inner = major ? 61 : 64;
  const outer = 70; // reach the rim — no gap
  return {
    x1: +(150 + inner * s).toFixed(2),
    y1: +(112 - inner * c).toFixed(2),
    x2: +(150 + outer * s).toFixed(2),
    y2: +(112 - outer * c).toFixed(2),
    w: major ? 1 : 0.7,
  };
});

export function GinSchematic({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 216" fill="none" aria-hidden>
      {/* Stopwatch face — the solid rim (title-page monoline weight). */}
      <circle cx="150" cy="112" r="70" stroke="currentColor" strokeWidth="0.8" opacity="0.8" />
      {/* Crown / top button — stem runs up into the cap so they connect. */}
      <line x1="150" y1="42" x2="150" y2="34" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <rect x="145.5" y="30" width="9" height="4.6" rx="1.6" fill="currentColor" />
      {/* Dial ticks. */}
      <g>
        {TICKS.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* The sweeping hand: rotary arm with the horse (inside the dial) at its
          tip. Shortened so the horse sits within the rim, not on it. */}
      <g className="hp-spin">
        {/* Beam split into two segments to leave a gap (near the pivot) for the
            "12 ft" label, well clear of "180 lbf" at the horse end. */}
        <line x1="150" y1="112" x2="150" y2="105" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="150" y1="95" x2="150" y2="73" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        {/* Bridges the beam gap once the "12 ft" label clears (step 1). */}
        <line
          className="hp-arm-fill"
          x1="150"
          y1="105"
          x2="150"
          y2="95"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* "12 ft" rides the beam gap; counter-rotates (hp-armlabel) upright. */}
        <g className="hp-armlabel">
          <text className="hp-tag-text" x="150" y="100">12 ft</text>
        </g>
        <g className="hp-horse">
          {/* hp-horse-scale counter-scales the horse on step 1 so it keeps its
              size while the surrounding timer shrinks 1/3. */}
          <g className="hp-horse-scale">
            <g className="hp-horse-face">
              <g transform="translate(135.6 48.2) scale(1.2)">
              <path d="M19.5 4.5L22 8.5C21.7259 9.04816 21.1129 9.5 20.5 9.5L19 8C18.1042 8 17.2833 7.34982 17 6.5" />
              <path d="M18.5 2L17.5 3C15.5 3.5 14.1879 4.93621 13.666 6.50196L13 8.5C10.8481 10.0371 9.31821 9.68408 7.68856 9.18411C6.65537 8.86714 5.47314 9.02686 4.70896 9.79104C4.25502 10.245 4 10.8607 4 11.5026V21" />
              <path d="M4.5 9.5L3.75623 9.12812C3.58773 9.04386 3.40192 9 3.21353 9C2.54331 9 2 9.54331 2 10.2135V14" />
              <path d="M17.5 7.5L17.4027 7.64596C16.8376 8.49359 16.726 9.56509 17.1044 10.511C17.3625 11.1564 17.4274 11.8629 17.2911 12.5445C17.1047 13.4765 16.2908 14.4728 15.5 15V21" />
              <path d="M13 21V14.5" />
              <path d="M8 16C8 16 10.3077 17.125 13 16" />
              <path d="M8.5 14.5C8 16.5 6.5 17 6.5 17V21.0005" />
              </g>
            </g>
          </g>
          {/* "180 lbf" lives in the horse group (so it rides + stays upright with
              the horse) but outside the flip group, pinned just below its feet —
              so it sits under the feet at every point of the orbit. */}
          <text className="hp-tag-text" x="150" y="81">180 lbf</text>
        </g>
      </g>

      {/* Rate on the dial's bottom half; the hand sweeps over it. */}
      <text className="hp-tag-text" x="150" y="145">2.4 turns / min</text>

      {/* Hand pivot. */}
      <circle cx="150" cy="112" r="2.4" fill="currentColor" />
    </svg>
  );
}
