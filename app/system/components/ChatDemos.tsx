'use client';

/**
 * Faithful replicas of the portfolio chatbot's message types, grounded in the
 * real markup + styles in public/components/NavBar.{html,css} (.chatQuery,
 * .chatBlurb, .chatSuggestionCard). Shown as a short thread so each bubble type
 * reads in context: a user query, an assistant text reply, and an assistant
 * reply that recommends work via a link card. The values live in system.css.
 */
export function ChatDemo() {
  return (
    <div className="ui-chat">
      {/* User query — right-aligned surface bubble */}
      <div className="ui-chat-query-row">
        <div className="ui-chat-query">
          <p>Show me your work on AI interfaces.</p>
        </div>
      </div>

      {/* Assistant text reply — avatar + blurb */}
      <div className="ui-chat-blurb">
        <div className="ui-chat-avatar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/LogoHover.gif" alt="" />
        </div>
        <p>Sure — here&rsquo;s a case study you might like.</p>
      </div>

      {/* Assistant reply with a link card */}
      <a className="ui-chat-card-link" href="#" onClick={(e) => e.preventDefault()}>
        <div className="ui-chat-card">
          <div className="ui-chat-card-image" aria-hidden="true" />
          <div className="ui-chat-card-text">
            <p className="ui-chat-card-title">Designing AI Beyond Conversation</p>
            <p className="ui-chat-card-desc">
              Patterns for interfaces that go past the chat box — generative UI,
              ambient agents, and direct manipulation.
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
