import { Deck } from '../Deck';
import { LogoBorder } from '../LogoBorder';
import { MazeTitle3D } from './MazeTitle3D';

// Mousepower — an unlisted presentation deck. Each child of <Deck> is one slide;
// navigate with arrow keys (Space / Home / End too). Follows the deck visual
// system (see app/decks/README.md): title, section divider, stat, and closer
// archetypes. Static assets live in public/decks/mousepower/.
//
// Inherits robots:{index:false,follow:false} from the parent layout, so it's
// reachable at /decks/mousepower but unlisted everywhere.
export default function MousepowerDeck() {
  return (
    <Deck>
      {/* Title slide — the maze wordmark as extruded walls, viewed bird's-eye
          from directly above center (perspective splays the walls outward, light
          from above), with a lucide <Mouse /> threading the corridors. The maze
          frames the slide, so this title skips <LogoBorder />. */}
      <div className="slide slide--title" style={{ background: '#f5f5f5', color: '#111' }}>
        <div className="slide-content">
          <p className="slide-eyebrow">Maximillian Piras</p>
          <MazeTitle3D />
          <p className="slide-footnote">on the measurement of agents</p>
        </div>
      </div>

      {/* Section divider — eyebrow + big headline (with Playfair ampersand) + footnote. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <div className="slide-content">
          <p className="slide-eyebrow">part 1</p>
          <h1 className="slide-section-title">
            Point <span className="slide-amp">&amp;</span> Click
          </h1>
          <p className="slide-footnote">in memory of Doug Engelbart</p>
        </div>
      </div>

      {/* Stat slide — big-number emphasis in the same type system. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <div className="slide-content">
          <p className="slide-eyebrow">a big number</p>
          <h1 className="slide-stat">1×</h1>
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
