import { Deck } from '../Deck';
import { TitleSlide } from './TitleSlide';
import { AutonomousWindow } from './AutonomousWindow';
import { ExplorationGrid } from './ExplorationGrid';
import { MeasurementProblem } from './MeasurementProblem';
import { TokenEvidence } from './TokenEvidence';
import { TokensWordmark } from './TokensWordmark';
import { TokensActivity } from './TokensActivity';
import { HorsepowerSequence } from './HorsepowerSequence';
import { GinDiagram } from './GinDiagram';
import { CodeReviewQuote } from './CodeReviewQuote';
import { DevloperTweet } from './DevloperTweet';
import { VerificationStats } from './VerificationStats';
import { PullRequestQuote } from './PullRequestQuote';

// Unlisted presentation deck (see app/decks/README.md). Inherits
// robots:{index:false,follow:false} from the parent layout, so it's reachable at
// /decks/mousepower but unlisted everywhere.
export default function MousepowerDeck() {
  return (
    <Deck>
      <TitleSlide />

      <div className="slide" style={{ background: '#e8e8e8', color: '#111' }}>
        <AutonomousWindow />
      </div>

      <div className="slide" style={{ background: '#e8e8e8', color: '#111' }}>
        <ExplorationGrid />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <MeasurementProblem />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <TokenEvidence />
      </div>

      {/* The 'centered' slide must mirror this 'wordmark' slide's morph end-state
          — the deck cuts (no fade) between them. Keep them adjacent and in order. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <div className="slide-content">
          <TokensWordmark mode="wordmark" />
        </div>
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <div className="slide-content">
          <TokensWordmark mode="centered" />
        </div>
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <TokensActivity />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <HorsepowerSequence />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <GinDiagram />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <CodeReviewQuote />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <DevloperTweet />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <VerificationStats />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <PullRequestQuote />
      </div>
    </Deck>
  );
}
