import { MazeTitle3D } from './MazeTitle3D';
import { AgentChat } from './AgentChat';

// Slide after the title — the meta reveal. We zoom out from the full-bleed title
// to show it living inside a v0-style agent app: a chat/reasoning sidebar on the
// left (the agent thinking, streaming a long-running task) and the title as the
// live preview on the right. The deck itself, built by an agent.
//
// Two-step entry (see decks.css, .os-*): (1) zoom out from the full-bleed title
// to a centred preview window — the preview is a full 100vw×100vh clone of the
// title, so the hand-off matches exactly with no reflow; (2) the sidebar expands
// in from the left, pushing the preview right (the chat panel opening). Gated on
// the active slide; reduced-motion-safe.
export function AutonomousWindow() {
  return (
    <div className="os-desktop">
      <div className="os-window">
        <div className="os-titlebar" aria-hidden>
          <span className="os-light" />
          <span className="os-light" />
          <span className="os-light" />
        </div>
        <div className="os-body">
          <div className="os-sidebar">
            <div className="os-sidebar-inner">
              <AgentChat />
            </div>
          </div>
          <div className="os-screen">
            <div className="slide-content">
              <p className="slide-eyebrow">Maximillian Piras</p>
              {/* Static maze — no mouse in the windowed preview. */}
              <MazeTitle3D animate={false} />
              <p className="slide-footnote">on the measurement of agents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
