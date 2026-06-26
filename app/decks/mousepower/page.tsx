import { Deck } from '../Deck';
import { MazeTitle3D } from './MazeTitle3D';
import { TokensWordmark } from './TokensWordmark';

// Mousepower — an unlisted presentation deck (see app/decks/README.md). Just the
// title slide for now; content slides come later. Static assets live in
// public/decks/mousepower/.
//
// Inherits robots:{index:false,follow:false} from the parent layout, so it's
// reachable at /decks/mousepower but unlisted everywhere.
export default function MousepowerDeck() {
  return (
    <Deck>
      {/* Title slide — the maze wordmark as extruded walls, viewed bird's-eye
          from directly above center (backlit, z-depth shading), with a lucide
          <Mouse /> threading the corridors. The maze frames the slide. */}
      <div className="slide slide--title" style={{ background: '#f5f5f5', color: '#111' }}>
        <div className="slide-content">
          <p className="slide-eyebrow">Maximillian Piras</p>
          <MazeTitle3D />
          <p className="slide-footnote">on the measurement of agents</p>
        </div>
      </div>

      {/* TOKENS — the pixel-coin wordmark (Figma node 49:885), the unit agents
          are metered in. A bare cover/section slide: just the wordmark, centered. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <div className="slide-content">
          <TokensWordmark />
        </div>
      </div>
    </Deck>
  );
}
