'use client';

// Standalone slide. The orbit/flip animations are gated in CSS on
// .deck-slide[data-active='true'], so they run only while this slide is active.
export function GinDiagram() {
  return (
    <div className="gin-stage rack-in">
      <svg className="hp-diagram" viewBox="0 0 300 216" fill="none" aria-hidden>
        <circle
          cx="150"
          cy="112"
          r="70"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeDasharray="9 7"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* hp-horse counter-rotates so the glyph stays upright while orbiting
            (goes around but never spins on its own axis). */}
        <g className="hp-spin">
          {/* Beam split into two segments to leave a gap for the "12 ft" label
              (so it reads on the beam without a pill / strike-through). */}
          <line
            x1="150"
            y1="112"
            x2="150"
            y2="89"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <line
            x1="150"
            y1="68"
            x2="150"
            y2="46"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* "12 ft" rides the beam gap; counter-rotates (hp-armlabel) upright. */}
          <g className="hp-armlabel">
            <text className="hp-tag-text" x="150" y="79">12 ft</text>
          </g>
          <g className="hp-horse">
            {/* Flip horizontally on the bottom half (hp-horse-face) so the horse
                faces its direction of travel. */}
            <g className="hp-horse-face">
              <g transform="translate(135.6 27.6) scale(1.2)">
                {/* Ground-fill backing masks the radial arm behind the horse
                    (the open outline strokes don't); sized to contain the glyph,
                    drawn first so the horse sits on top. */}
                <circle cx="12" cy="11.5" r="10.5" fill="#f5f5f5" stroke="none" />
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
        </g>

        {/* "180 lbf" orbits at r100 (> track r70) so it stays outside the dotted
            circle at every angle; counter-rotates (hp-forcelabel) upright. */}
        <g className="hp-forceorbit">
          <g className="hp-forcelabel">
            <text className="hp-tag-text" x="150" y="12">180 lbf</text>
          </g>
        </g>

        {/* Post, drawn last so the arm tucks under it. */}
        <circle cx="150" cy="112" r="6.5" fill="#f5f5f5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="150" cy="112" r="2" fill="currentColor" />

        <defs>
          <path id="hp-rate-arc" d="M80 112 A70 70 0 0 0 220 112" fill="none" />
        </defs>
        <text className="hp-tag-text hp-rate-text">
          <textPath href="#hp-rate-arc" startOffset="50%">
            2.4 turns/min
          </textPath>
        </text>
      </svg>

      <p className="hp-eq-text">1 horsepower = 33,000 ft·lbf/min</p>
    </div>
  );
}
