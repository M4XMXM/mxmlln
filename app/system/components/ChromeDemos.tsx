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

const MINIMAP_SECTIONS = ['Color', 'Typography', 'Radius', 'Elevation', 'Motion'];

export function MinimapDemo() {
  const [active, setActive] = useState(1);
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
            key={s}
            className={`minimap-notch ${i === active ? 'minimap-notch--active' : ''}`}
            onMouseEnter={() => setActive(i)}
          />
        ))}
      </div>
      {open && (
        <div className="minimap-popover">
          {MINIMAP_SECTIONS.map((s, i) => (
            <a
              key={s}
              href="#"
              className={`minimap-link ${i === active ? 'minimap-link--active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onClick={(e) => e.preventDefault()}
            >
              {s}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
