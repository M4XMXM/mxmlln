'use client';

// Slide 5 — a fixed ring of work an autonomous agent can take over, orbiting the
// TOKENS coin. The ring slowly rotates counter to the coin's spin while each icon
// counter-rotates to stay upright; icons pop in (staggered) once the slide lands.
// Rendered inside .tokens-coin (via Coin3D's `overlay`) so it's centred on the
// coin and rides its slide-to-centre.
import {
  Bug,
  CalendarClock,
  CreditCard,
  GitPullRequest,
  Headset,
  Mail,
  MessageSquare,
  ReceiptText,
  Ticket,
} from 'lucide-react';

const TASKS = [
  { Icon: GitPullRequest, label: 'pull requests' },
  { Icon: Mail, label: 'emails' },
  { Icon: ReceiptText, label: 'invoices' },
  { Icon: CalendarClock, label: 'scheduling' },
  { Icon: Headset, label: 'support' },
  { Icon: Ticket, label: 'tickets' },
  { Icon: MessageSquare, label: 'messages' },
  { Icon: CreditCard, label: 'payments' },
  { Icon: Bug, label: 'bug triage' },
];

export function TokensOrbit({
  active,
  animateIn = true,
}: {
  active: boolean;
  // false: icons appear already at rest (no pop) — used when carrying continuity
  // from a previous slide where they're already shown.
  animateIn?: boolean;
}) {
  const n = TASKS.length;
  return (
    <div className="tokens-orbit" data-on={active} data-instant={!animateIn} aria-hidden="true">
      {TASKS.map(({ Icon, label }, i) => {
        const angle = (360 / n) * i; // first icon at top, then clockwise
        return (
          <span
            key={label}
            className="orbit-slot"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * var(--orbit-r))) rotate(${-angle}deg)`,
            }}
          >
            {/* Counter-rotates against the ring so the icon stays upright. */}
            <span className="orbit-counter">
              <span className="orbit-icon" style={{ transitionDelay: `${i * 55}ms` }}>
                <Icon strokeWidth={1.75} />
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
}
