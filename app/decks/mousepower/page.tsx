import { Deck } from '../Deck';
import { TitleSlide } from './TitleSlide';
import { AutonomousWindow } from './AutonomousWindow';
import { ExplorationGrid } from './ExplorationGrid';
import { MeasurementProblem } from './MeasurementProblem';
import { TokenEvidence } from './TokenEvidence';
import { TokensSequence } from './TokensSequence';
import { DoomLoop } from './DoomLoop';
import { HorsepowerSequence } from './HorsepowerSequence';
import { GinDiagram } from './GinDiagram';
import { MousepowerMeasure } from './MousepowerMeasure';
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

      {/* Section divider opening the next part. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <div className="slide-content rack-in">
          <p className="slide-eyebrow">part 1 of 3</p>
          <h1 className="slide-section-title">
            Of Mice <span className="slide-amp">&amp;</span> Models
          </h1>
          <p className="slide-footnote">the age old problem of new technology</p>
        </div>
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <MeasurementProblem />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <TokenEvidence />
      </div>

      {/* Slides 7–9 merged: TOKENS wordmark → centred coin + orbit → shrink +
          activity rings, advanced as three steps within one slide. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <TokensSequence />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <DoomLoop />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <HorsepowerSequence />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <GinDiagram />
      </div>

      {/* The mousepower answer: an interactive measurement rig. Rays track the
          cursor to every corner and drift into depth, feeding an equation whose
          number never settles — measurement is too high-dimensional to reduce. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <MousepowerMeasure />
      </div>

      {/* Section divider opening the next part. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <div className="slide-content rack-in">
          <p className="slide-eyebrow">part 2 of 3</p>
          <h1 className="slide-section-title">Canary in the Codebase</h1>
          <p className="slide-footnote">death by one thousand pull requests</p>
        </div>
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

      {/* Section divider opening the final part. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#111' }}>
        <div className="slide-content rack-in">
          <p className="slide-eyebrow">part 3 of 3</p>
          <h1 className="slide-section-title">A Theory of Agent Entropy</h1>
          <p className="slide-footnote">using uncertainty as a guide</p>
        </div>
      </div>
    </Deck>
  );
}
