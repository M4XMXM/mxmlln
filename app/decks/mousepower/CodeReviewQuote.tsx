// Quote slide — Anthropic on the code-review bottleneck, beside their recursive
// self-improvement diagram. The new measurement frontier: as agents merge ever
// more code, the human becomes the constraint. From Figma node 97:29.
export function CodeReviewQuote() {
  return (
    <div className="quote-slide rack-in">
      <div className="quote-main">
        <blockquote className="quote-text">
          <p>
            “In the second quarter of 2026, the typical engineer was merging 8× as much
            code per day as they were in 2024
          </p>
          <p>…</p>
          <p>
            as we’ve begun to push more code around the organization,{' '}
            <strong>human code review has become a new bottleneck</strong>.”
          </p>
        </blockquote>
        <p className="quote-cite">Anthropic</p>
      </div>
      <div className="quote-figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/decks/mousepower/quote-recursive-diagram.jpg"
          alt="Anthropic diagram: a person and computer escalating through chatbot, agent, and parallel workers"
        />
      </div>
      <p className="quote-source">
        Source:{' '}
        <a
          href="https://www.anthropic.com/institute/recursive-self-improvement"
          target="_blank"
          rel="noreferrer"
        >
          anthropic.com/institute/recursive-self-improvement
        </a>
      </p>
    </div>
  );
}
