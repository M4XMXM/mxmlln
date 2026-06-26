'use client';

// The core renders at slide-5 size, then shrinks; the rings draw on only after
// the shrink settles, so they never overlap the still-large cluster.
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
    // Defer a paint so the shrink transitions from the slide-5-matched start state.
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
