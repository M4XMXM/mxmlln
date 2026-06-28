'use client';

import { useEffect, useState } from 'react';
import { MazeTitle3D } from './MazeTitle3D';
import { useDeck, useSlideIndex } from '../Deck';

// Title slide. While it is the active slide, it registers a forward interceptor
// so pressing → first fades the maze mouse out, then advances — so the title
// zooms out into the windowed preview cleanly (no mouse jumping during the zoom;
// the preview's mouse fades back in once the window settles).
const FADE_MS = 380;

export function TitleSlide() {
  const { activeIndex, setForwardInterceptor } = useDeck();
  const index = useSlideIndex();
  const active = activeIndex === index;
  const [leaving, setLeaving] = useState(false);
  // Shading is undecided: press "g" while on the title slide to toggle between
  // the solid-white treatment (default) and the original gradient shading.
  const [solid, setSolid] = useState(true);

  useEffect(() => {
    if (!active) return;
    setLeaving(false); // reset on (re)entry so the mouse is visible again
    setForwardInterceptor((done) => {
      setLeaving(true);
      window.setTimeout(done, FADE_MS);
    });
    return () => setForwardInterceptor(null);
  }, [active, setForwardInterceptor]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'g' || e.key === 'G') setSolid((s) => !s);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <div
      className="slide slide--title"
      style={{
        backgroundColor: '#f5f5f5',
        // Dot grid pitch locked to the maze's own grid: the SVG renders at
        // min(74vw,940px) over a 264.6-unit viewBox with 12-unit cells, so a maze
        // cell is 4.535% of the width — a quarter of that for a dense graph-paper
        // feel, centered on the graphic.
        backgroundImage:
          'radial-gradient(circle, rgba(0, 187, 255, 0.26) 1px, transparent 1.4px)',
        backgroundSize:
          'calc(min(74vw, 940px) * 0.01134) calc(min(74vw, 940px) * 0.01134)',
        backgroundPosition: 'center',
        color: '#3B3B3B',
      }}
    >
      <div className="slide-content" style={{ background: 'none' }}>
        <p className="slide-eyebrow">on measuring agents</p>
        <MazeTitle3D mouseHidden={leaving} solid={solid} />
        <p className="slide-footnote">by Maximillian Piras</p>
      </div>
    </div>
  );
}
