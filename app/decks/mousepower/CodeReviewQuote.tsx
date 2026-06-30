export function CodeReviewQuote() {
  return (
    <div className="quote-slide rack-in">
      <blockquote className="quote-text">
        <p>
          “In the second quarter of 2026, the typical engineer was merging 8× as
          much code per day as they were in 2024… as we’ve begun to push more code
          around the organization,{' '}
          <strong>human code review has become a new bottleneck</strong>.”
        </p>
      </blockquote>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="quote-cite" src="/decks/mousepower/anthropic-logo.svg" alt="Anthropic" />
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
