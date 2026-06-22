import { Deck } from '../Deck';

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
      <div className="slide" style={{ background: '#0f0f12', color: '#fff' }}>
        <div className="slide-content">
          <p className="slide-kicker" style={{ color: '#8a8a92' }}>placeholder template</p>
          <h1 className="slide-title">Mousepower</h1>
          <p className="slide-lede">Use → to advance, ← to go back.</p>
        </div>
      </div>

      <div className="slide" style={{ background: '#fafafa', color: '#111' }}>
        <div className="slide-content">
          <h1 className="slide-title">Slide Two</h1>
          <p className="slide-lede">A light slide, to make the transition obvious.</p>
        </div>
      </div>

      <div className="slide" style={{ background: '#1d4ed8', color: '#fff' }}>
        <div className="slide-content">
          <p className="slide-kicker">a big number</p>
          <h1 className="slide-stat">100×</h1>
          <p className="slide-lede">Stat-style slide for emphasis.</p>
        </div>
      </div>

      <div className="slide" style={{ background: '#111', color: '#fff' }}>
        <div className="slide-content">
          <h1 className="slide-title">Thanks</h1>
          <p className="slide-lede">End of deck — ← to review.</p>
        </div>
      </div>
    </Deck>
  );
}
