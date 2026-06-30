// The token-economics "doom /loop": four states cycling clockwise
// (FOMO → TOKENMAXXING → GET BILL → AUSTERITY → back), with the thesis centred.
// All-SVG (viewBox 1280×720) so labels, emoji, and loop stay locked in register
// at any scale; the track is drawn as four corner-segments leaving a gap at each
// edge midpoint for its label, with an arrowhead mid-run pointing the way round.
export function DoomLoop() {
  return (
    <div className="doomloop-stage rack-in">
      <svg className="doomloop-svg" viewBox="0 0 1280 720" aria-hidden>
        {/* Loop track — clockwise, one segment per corner, midpoints left open. */}
        <path className="dl-loop" d="M150 285 L150 235 A70 70 0 0 1 220 165 L480 165" />
        <path className="dl-loop" d="M800 165 L1060 165 A70 70 0 0 1 1130 235 L1130 285" />
        <path className="dl-loop" d="M1130 435 L1130 485 A70 70 0 0 1 1060 555 L760 555" />
        <path className="dl-loop" d="M520 555 L220 555 A70 70 0 0 1 150 485 L150 435" />

        {/* Open chevron arrowheads, tip at each segment's end (the gap edge),
            pointing in the direction of travel (clockwise) into the next node. */}
        <polyline className="dl-arrow" points="465,154 480,165 465,176" />
        <polyline className="dl-arrow" points="1119,270 1130,285 1141,270" />
        <polyline className="dl-arrow" points="775,544 760,555 775,566" />
        <polyline className="dl-arrow" points="139,450 150,435 161,450" />

        {/* Centre thesis. */}
        <text className="dl-headline" x="640" y="338">
          We&rsquo;re in a doom /loop of
        </text>
        <text className="dl-headline" x="640" y="390">
          overspending <tspan className="dl-amp">&amp;</tspan> underusing.
        </text>

        {/* Nodes — emoji + label at each edge midpoint. */}
        <text className="dl-emoji" x="640" y="114">😎</text>
        <text className="dl-label" x="640" y="166">TOKENMAXXING</text>

        <text className="dl-emoji" x="1130" y="338">😭</text>
        <text className="dl-label" x="1130" y="388">GET BILL</text>

        <text className="dl-label" x="640" y="556">AUSTERITY</text>
        <text className="dl-emoji" x="640" y="608">🫣</text>

        <text className="dl-emoji" x="150" y="338">😰</text>
        <text className="dl-label" x="150" y="388">FOMO</text>
      </svg>
    </div>
  );
}
