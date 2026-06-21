'use client';

import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

/**
 * Lightly-interactive replicas of the site chrome, for the /system previews.
 * They convey behavior (hover, active selection, popover) without navigating
 * away. The real components live in app/blog/ — see each ComponentPreview's
 * `source`. The live Minimap is also mounted on this page's right rail.
 */

// The two faces of the mark, both Lottie. "Signature" is the index-page state;
// "Spin" is what article pages drive with scroll direction.
const LOGO_VARIANTS = [
  { key: 'signature', label: 'Signature', path: '/assets/Sig2026.json' },
  { key: 'spin', label: 'Spin', path: '/assets/LogoSpin2026.json' },
] as const;

type LogoVariant = (typeof LOGO_VARIANTS)[number]['key'];

export function LogoDemo() {
  const [variant, setVariant] = useState<LogoVariant>('signature');
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lottieRef.current) return;
    const path = LOGO_VARIANTS.find((v) => v.key === variant)!.path;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      path,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });
    return () => anim.destroy();
  }, [variant]);

  return (
    <div className="logo-demo-wrap">
      <div ref={lottieRef} className="logo-demo" aria-label="MXMLLN" />
      <div className="segmented" role="tablist" aria-label="Logo variant">
        {LOGO_VARIANTS.map((v) => (
          <button
            key={v.key}
            type="button"
            role="tab"
            aria-selected={variant === v.key}
            className={`segmented-option ${variant === v.key ? 'segmented-option--active' : ''}`}
            onClick={() => setVariant(v.key)}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// The nav is a single glass pill that *morphs* in place. Two of its items are
// not links but triggers: the logo (left) and the contact dot (right) — plus
// "My AI" — each collapses the pill's button row and grows the same container
// into a compartment, while a blurred overlay rises behind it. This replica
// reproduces that morph at preview scale rather than navigating away.
type NavState = 'pill' | 'info' | 'ai' | 'contact';

const NAV_COMPARTMENTS: Record<
  Exclude<NavState, 'pill'>,
  { header: string | null }
> = {
  info: { header: 'MXMLLN Folio' },
  ai: { header: null }, // chat header is just a close button, right-aligned
  contact: { header: 'Contact' },
};

export function NavDemo() {
  const [state, setState] = useState<NavState>('pill');
  const open = state !== 'pill';
  const logoRef = useRef<HTMLSpanElement>(null);

  // The pill's logo is the same spinning mark as the live site; it doubles as
  // the trigger for the info compartment.
  useEffect(() => {
    if (!logoRef.current) return;
    const anim = lottie.loadAnimation({
      container: logoRef.current,
      path: '/assets/LogoSpin2026.json',
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });
    return () => anim.destroy();
  }, []);

  const close = () => setState('pill');

  return (
    <div className="navbar-demo-stage">
      <div
        className={`navbar-demo-overlay ${open ? 'is-open' : ''}`}
        onClick={close}
        aria-hidden
      />

      <div className={`navbar-demo-shell navbar-demo-shell--${state}`}>
        {/* Collapsed state: the segmented controller row. */}
        <div className="navbar-demo-pill" aria-hidden={open}>
          <button
            type="button"
            className="navbar-demo-logo"
            onClick={() => setState('info')}
            title="Logo → morphs into the info compartment"
            tabIndex={open ? -1 : 0}
          >
            <span ref={logoRef} className="navbar-demo-logo-mark" aria-label="MXMLLN" />
          </button>
          <span className="navbar-demo-item">👋 About</span>
          <span className="navbar-demo-item navbar-demo-item--on">📐 Work</span>
          <button
            type="button"
            className="navbar-demo-item navbar-demo-item--btn"
            onClick={() => setState('ai')}
            tabIndex={open ? -1 : 0}
          >
            💬 My AI
          </button>
          <button
            type="button"
            className="navbar-demo-contact"
            onClick={() => setState('contact')}
            title="Contact → morphs into the contact compartment"
            tabIndex={open ? -1 : 0}
          >
            <span className="navbar-demo-contact-mark" aria-label="Contact" />
          </button>
        </div>

        {/* Expanded state: the morphed compartment. */}
        <div className="navbar-demo-compartment" aria-hidden={!open}>
          {open && (
            <div className="navbar-demo-header">
              {NAV_COMPARTMENTS[state].header && (
                <span className="navbar-demo-header-text">
                  {NAV_COMPARTMENTS[state].header}
                </span>
              )}
              <button
                type="button"
                className="navbar-demo-close"
                onClick={close}
                aria-label="Close compartment"
              >
                ✕
              </button>
            </div>
          )}

          {state === 'info' && (
            <div className="navbar-demo-info">
              <span className="navbar-demo-sig" aria-hidden />
              <button type="button" className="navbar-demo-source">
                View source on GitHub
              </button>
            </div>
          )}

          {state === 'ai' && (
            <div className="navbar-demo-ai">
              <div className="navbar-demo-ai-empty">
                <span className="navbar-demo-ai-mark" aria-hidden />
                <strong>Maximillian AI</strong>
                <p>Tell me what you&rsquo;re looking for &amp; I&rsquo;ll find the most relevant work.</p>
              </div>
              <div className="navbar-demo-ai-input">
                <span className="navbar-demo-ai-placeholder">
                  Tell me what you&rsquo;re looking for…
                </span>
                <span className="navbar-demo-ai-send" aria-hidden>
                  ↑
                </span>
              </div>
            </div>
          )}

          {state === 'contact' && (
            <div className="navbar-demo-contacts">
              {['✉', '𝕏', 'in'].map((g) => (
                <span key={g} className="navbar-demo-contact-circle">
                  {g}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Mix of top-level (level 2) and nested (level 3) items so the demo shows the
// indented sub-item design.
const MENU_ITEMS = [
  { label: 'Color', level: 2 },
  { label: 'Typography', level: 2 },
  { label: 'Components', level: 2 },
  { label: 'Logo', level: 3 },
  { label: 'Nav bar', level: 3 },
  { label: 'Menu', level: 3 },
];

// The labeled popover list the Minimap reveals on hover. Documented on its own
// because the list is the reusable primitive; the rail of notches around it is
// a construct specific to the Minimap. Clicking an item sets the active state.
export function MenuDemo() {
  const [active, setActive] = useState(2);
  return (
    <div className="minimap-popover minimap-popover--demo">
      {MENU_ITEMS.map((s, i) => (
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
  );
}
