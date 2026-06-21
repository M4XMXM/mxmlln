'use client';

import { useState } from 'react';

/**
 * Lightly-interactive replicas of the site chrome, for the /system previews.
 * They convey behavior (hover, active selection, popover) without navigating
 * away. The real components live in app/blog/ — see each ComponentPreview's
 * `source`. The live Minimap is also mounted on this page's right rail.
 */

const NAV_ITEMS = ['Work', 'Words', 'About'];

export function NavDemo() {
  const [active, setActive] = useState(0);
  return (
    <nav className="nav-demo">
      {NAV_ITEMS.map((label, i) => (
        <a
          key={label}
          href="#"
          className={i === active ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setActive(i);
          }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

// Mix of h2 (level 2) and h3 (level 3) so the demo shows the sub-notch design.
const MINIMAP_SECTIONS = [
  { label: 'Color', level: 2 },
  { label: 'Typography', level: 2 },
  { label: 'Components', level: 2 },
  { label: 'Logo', level: 3 },
  { label: 'Nav bar', level: 3 },
  { label: 'Minimap', level: 3 },
];

export function MinimapDemo() {
  // Active is "section in view" — driven by scroll in the real component, so it
  // doesn't follow the cursor here. Clicking a label jumps to it (sets active).
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  return (
    <div
      className="minimap-demo-wrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="minimap-notches">
        {MINIMAP_SECTIONS.map((s, i) => (
          <div
            key={s.label}
            className={`minimap-notch ${s.level === 3 ? 'minimap-notch--sub' : ''} ${i === active ? 'minimap-notch--active' : ''}`}
          />
        ))}
      </div>
      {open && (
        <div className="minimap-popover">
          {MINIMAP_SECTIONS.map((s, i) => (
            <a
              key={s.label}
              href="#"
              className={`minimap-link ${s.level === 3 ? 'minimap-link--sub' : ''} ${i === active ? 'minimap-link--active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActive(i);
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
