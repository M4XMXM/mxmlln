import { Deck } from '../Deck';
import { MousepowerOpening } from './MousepowerOpening';
import { MeasurementProblem } from './MeasurementProblem';
import { TokenEvidence } from './TokenEvidence';
import { TokensSequence } from './TokensSequence';
import { DoomLoop } from './DoomLoop';
import { SpendVsTokens } from './SpendVsTokens';
import { HorsepowerSequence } from './HorsepowerSequence';
import { GinDiagram } from './GinDiagram';
import { MousepowerMeasure } from './MousepowerMeasure';
import { CodeReviewQuote } from './CodeReviewQuote';
import { DevloperTweet } from './DevloperTweet';
import { VerificationStats } from './VerificationStats';
import { PullRequestQuote } from './PullRequestQuote';
import { EntropyPaper } from './EntropyPaper';
import { EntropySliders } from './EntropySliders';
import { TitleHero } from './TitleHero';

// Unlisted presentation deck (see app/decks/README.md). Inherits
// robots:{index:false,follow:false} from the parent layout, so it's reachable at
// /decks/mousepower but unlisted everywhere.
export default function MousepowerDeck() {
  return (
    <Deck>
      {/* Opening: title → agent window → exploration grid, as one stepped slide. */}
      <MousepowerOpening />

      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <MeasurementProblem />
      </div>

      {/* Section divider opening the next part. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <div className="slide-content rack-in">
          <p className="slide-eyebrow">part 1 of 3</p>
          <h1 className="slide-section-title">
            Of Mice <span className="slide-amp">&amp;</span> Models
          </h1>
          <p className="slide-footnote">the age old problem of new technology</p>
        </div>
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <TokenEvidence />
      </div>

      {/* Slides 7–9 merged: TOKENS wordmark → centred coin + orbit → shrink +
          activity rings, advanced as three steps within one slide. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <TokensSequence />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <DoomLoop />
      </div>

      {/* Coinbase AI spend (stacked bars) vs. token usage (line) — the doom-loop
          made concrete with data. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <SpendVsTokens />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <HorsepowerSequence />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <GinDiagram />
      </div>

      {/* The mousepower answer: an interactive measurement rig. Rays track the
          cursor to every corner and drift into depth, feeding an equation whose
          number never settles — measurement is too high-dimensional to reduce. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <MousepowerMeasure />
      </div>

      {/* Section divider opening the next part. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <div className="slide-content rack-in">
          <p className="slide-eyebrow">part 2 of 3</p>
          <h1 className="slide-section-title">Canary in the Codebase</h1>
          <p className="slide-footnote">death by one thousand pull requests</p>
        </div>
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <CodeReviewQuote />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <VerificationStats />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <DevloperTweet />
      </div>

      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <PullRequestQuote />
      </div>

      {/* Section divider opening the final part. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <div className="slide-content rack-in">
          <p className="slide-eyebrow">part 3 of 3</p>
          <h1 className="slide-section-title">A Theory of Agent Entropy</h1>
          <p className="slide-footnote">using uncertainty as a guide</p>
        </div>
      </div>

      {/* Closing thesis: entropy as the measure of uncertainty, over Shannon. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <EntropyPaper />
      </div>

      {/* Closing 2×2 uncertainty matrix with stepped band reveals. */}
      <div className="slide" style={{ background: '#f5f5f5', color: '#3B3B3B' }}>
        <EntropySliders />
      </div>

      {/* Closing bookend: the title hero, no eyebrow, URL in place of the byline. */}
      <TitleHero eyebrow={null} footnote="www.mvxmxm.com" />
    </Deck>
  );
}
