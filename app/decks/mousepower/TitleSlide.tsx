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

  useEffect(() => {
    if (!active) return;
    setLeaving(false); // reset on (re)entry so the mouse is visible again
    setForwardInterceptor((done) => {
      setLeaving(true);
      window.setTimeout(done, FADE_MS);
    });
    return () => setForwardInterceptor(null);
  }, [active, setForwardInterceptor]);

  return (
    <div className="slide slide--title" style={{ background: '#f5f5f5', color: '#111' }}>
      <div className="slide-content">
        <p className="slide-eyebrow">Maximillian Piras</p>
        <MazeTitle3D mouseHidden={leaving} solid />
        <p className="slide-footnote">on measuring agents</p>
      </div>
    </div>
  );
}
