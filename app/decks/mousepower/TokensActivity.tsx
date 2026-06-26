'use client';

// Slide 6 — the coin + task orbit shrink into the centre of Apple-style activity
// rings. The core starts at the previous slide's exact size (scale 1) so the
// deck's instant cut from slide 5 reads as one continuous motion, then:
//   1. the coin + orbit shrink to their parked sizes, then
//   2. only once that settles, the rings draw on (so they never overlap the
//      still-large cluster mid-shrink).
// Icons carry over already-shown.
import { useEffect, useState } from 'react';
import { useDeck, useSlideIndex } from '../Deck';
import { ActivityRings } from './ActivityRings';
import { Coin3D } from './Coin3D';
import { TokensOrbit } from './TokensOrbit';

const SHRINK_MS = 950; // keep in sync with .activity-core transition in decks.css

export function TokensActivity() {
  const { activeIndex } = useDeck();
  const myIndex = useSlideIndex();
  const isActive = activeIndex === myIndex;
  const [shrunk, setShrunk] = useState(false);
  const [ringsOn, setRingsOn] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setShrunk(false);
      setRingsOn(false);
      return;
    }
    let raf2 = 0;
    let timer = 0;
    // Defer one paint so the shrink transitions from the slide-5-matched start
    // state; once the shrink finishes, bring the rings in.
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setShrunk(true);
        timer = window.setTimeout(() => setRingsOn(true), SHRINK_MS + 80);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timer);
    };
  }, [isActive]);

  return (
    <div className="activity-stage" data-shrunk={shrunk} data-rings={ringsOn}>
      <ActivityRings on={ringsOn} />
      <div className="activity-core">
        <Coin3D overlay={<TokensOrbit active={isActive} animateIn={false} />} />
      </div>
    </div>
  );
}
