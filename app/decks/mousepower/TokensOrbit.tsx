'use client';

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

// Pass as Coin3D's `overlay`. Set animateIn={false} to skip the pop-in when the
// icons are already shown on the previous slide.
export function TokensOrbit({
  active,
  animateIn = true,
}: {
  active: boolean;
  animateIn?: boolean;
}) {
  const n = TASKS.length;
  return (
    <div className="tokens-orbit" data-on={active} data-instant={!animateIn} aria-hidden="true">
      {TASKS.map(({ Icon, label }, i) => {
        const angle = (360 / n) * i;
        return (
          <span
            key={label}
            className="orbit-slot"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * var(--orbit-r))) rotate(${-angle}deg)`,
            }}
          >
            {/* counter-rotates the ring's spin to keep the icon upright */}
            <span className="orbit-counter">
              <span className="orbit-icon" style={{ transitionDelay: `${i * 55}ms` }}>
                <Icon strokeWidth={2.25} />
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
}
