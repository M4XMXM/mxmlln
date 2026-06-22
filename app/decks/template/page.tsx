import { Deck } from '../Deck';
import { LogoBorder } from '../LogoBorder';

// Template reference deck — the canonical example of the deck visual system
// (see app/decks/README.md). Each child of <Deck> is one slide; navigate with
// arrow keys (Space / Home / End too). It demonstrates the core slide
// archetypes: title, section divider, stat, and closer. Static assets live in
// public/decks/template/.
//
// Inherits robots:{index:false,follow:false} from the parent layout, so it's
// reachable at /decks/template but unlisted everywhere.
export default function TemplateDeck() {
  return (
    <Deck>
      {/* Title slide — lockup framed by a border of the spinning signature logo. */}
      <div className="slide slide--title" style={{ background: '#f5f5f5', color: '#111' }}>
        <LogoBorder />
        <div className="slide-content">
          <p className="slide-eyebrow">Maximillian Piras</p>
          <h1 className="slide-section-title">Deck Template</h1>
          <p className="slide-footnote">reference slides</p>
        </div>
      </div>

      {/* Section divider — eyebrow + big headline (with Playfair ampersand) + footnote. */}
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
          <p className="slide-footnote">@MVXMXM</p>
        </div>
      </div>
    </Deck>
  );
}
