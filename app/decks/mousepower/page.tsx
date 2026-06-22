import { Deck } from '../Deck';
import { LogoBorder } from '../LogoBorder';

// Mousepower deck — a fullscreen slideshow. Each child of <Deck> is one slide;
// navigate with arrow keys (Space / Home / End too). Slides here are placeholder
// examples with distinct backgrounds so navigation is easy to test. Replace them
// with real graphics; static assets go in public/decks/mousepower/.
//
// Inherits robots:{index:false,follow:false} from the parent layout, so it's
// reachable at /decks/mousepower but unlisted everywhere.
export default function MousepowerDeck() {
  return (
    <Deck>
      {/* Title slide — "Designing in Parallel" lockup framed by a border of the
          spinning signature logo (the "face" pattern from the reference). */}
      <div className="slide slide--title" style={{ background: '#f5f5f5', color: '#111' }}>
        <LogoBorder />
        <div className="slide-content">
          <p className="slide-eyebrow">Maximillian Piras</p>
          <h1 className="slide-section-title">Deck Template</h1>
          <p className="slide-footnote">reference slides</p>
        </div>
      </div>

      {/* Section-title slide, replicating the reference deck's "Models & Modes". */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <div className="slide-content">
          <p className="slide-eyebrow">part 2 of 4</p>
          <h1 className="slide-section-title">
            Models <span className="slide-amp">&amp;</span> Modes
          </h1>
          <p className="slide-footnote">in memory of Larry Tesler</p>
        </div>
      </div>

      {/* Stat slide — big-number emphasis in the same type system. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <div className="slide-content">
          <p className="slide-eyebrow">a big number</p>
          <h1 className="slide-stat">100×</h1>
          <p className="slide-footnote">to prove a point</p>
        </div>
      </div>

      {/* Closing slide — bookends the title slide with the spinning-logo border. */}
      <div className="slide slide--title" style={{ background: '#f5f5f5', color: '#111' }}>
        <LogoBorder />
        <div className="slide-content">
          <h1 className="slide-section-title">Thanks</h1>
          <p className="slide-footnote">@M4XMXM</p>
        </div>
      </div>
    </Deck>
  );
}
