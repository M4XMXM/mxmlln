import { Deck } from '../Deck';
import { TitleSlide } from './TitleSlide';
import { AutonomousWindow } from './AutonomousWindow';
import { ExplorationGrid } from './ExplorationGrid';

// Mousepower — an unlisted presentation deck (see app/decks/README.md). Opens on
// the maze title, then zooms out to reveal the title living inside an OS window
// with an autonomous agent working it (the deck, built by an agent), then the
// window multiplies into a grid of parallel explorations. Static assets live in
// public/decks/mousepower/.
//
// Inherits robots:{index:false,follow:false} from the parent layout, so it's
// reachable at /decks/mousepower but unlisted everywhere.
export default function MousepowerDeck() {
  return (
    <Deck>
      {/* Title — the maze wordmark as extruded walls, viewed bird's-eye from
          directly above center, with a lucide <Mouse /> threading the corridors.
          Advances straight into the zoom-out reveal (no glide-to-centre). */}
      <TitleSlide />

      {/* Autonomous-window reveal — zoom out from the title to show it living
          inside an OS window, a second agent roaming it. See AutonomousWindow. */}
      <div className="slide" style={{ background: '#e8e8e8', color: '#111' }}>
        <AutonomousWindow />
      </div>

      {/* Exploration grid — the window multiplies into 6, each agent exploring a
          different creative direction of the theme. See ExplorationGrid. */}
      <div className="slide" style={{ background: '#e8e8e8', color: '#111' }}>
        <ExplorationGrid />
      </div>
    </Deck>
  );
}
