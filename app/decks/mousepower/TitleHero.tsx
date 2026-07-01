'use client';

// The full-bleed maze title hero (step 0 of the opening). Reused as the deck's
// closing bookend (which drops the eyebrow and swaps the footnote for the URL).
// `mouseHidden` fades the wandering cursor (the opening uses it during the
// zoom-out hand-off; the closer leaves it on).
import { MazeTitle3D } from './MazeTitle3D';

export function TitleHero({
  mouseHidden = false,
  eyebrow = 'measuring agents through mental models',
  footnote = 'by Maximillian Piras',
  footnoteUrl = false,
}: {
  mouseHidden?: boolean;
  eyebrow?: string | null;
  footnote?: string;
  // Render the footnote as a URL in Archivo (the closing bookend) rather than the
  // default handwritten byline.
  footnoteUrl?: boolean;
}) {
  return (
    <div
      className="slide slide--title"
      style={{
        backgroundColor: '#f5f5f5',
        // Dot grid pitch locked to the maze's own grid (see notes in code).
        backgroundImage:
          'radial-gradient(circle, rgba(0, 187, 255, 0.26) 1px, transparent 1.4px)',
        backgroundSize:
          'calc(min(74vw, 940px) * 0.01134) calc(min(74vw, 940px) * 0.01134)',
        backgroundPosition: 'center',
        color: '#3B3B3B',
      }}
    >
      {/* Closing bookend gets the standard rack-in entrance; the opening embeds
          this in its own stepped intro, so it stays un-racked there. */}
      <div
        className={`slide-content${footnoteUrl ? ' rack-in' : ''}`}
        style={{ background: 'none' }}
      >
        {eyebrow && <p className="slide-eyebrow">{eyebrow}</p>}
        <MazeTitle3D mouseHidden={mouseHidden} />
        <p className={`slide-footnote${footnoteUrl ? ' slide-footnote--url' : ''}`}>
          {footnote}
        </p>
      </div>
    </div>
  );
}
