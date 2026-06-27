export function PullRequestQuote() {
  return (
    <div className="pquote-slide rack-in">
      <blockquote className="pquote-text">
        <p>
          “The pull request is not dying because someone invented a better
          review surface. It is dying because the assumptions underneath it no
          longer hold.”
        </p>
      </blockquote>
      <p className="pquote-cite">Noah Hein</p>
      <p className="pquote-source">
        Source:{' '}
        <a
          href="https://x.com/TheNoahHein/status/2037573208707137639"
          target="_blank"
          rel="noreferrer"
        >
          x.com/TheNoahHein/status/2037573208707137639
        </a>
      </p>
    </div>
  );
}
