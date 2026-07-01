// Upton Sinclair quote slide — a piggy bank (echoing the value/ROI icon) over
// the bold quote, closed by a handwritten cite. The whole icon is one ink color.
export function SalaryQuote() {
  return (
    <div className="squote-slide rack-in">
      <svg
        className="squote-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
        <path d="M2 9v1c0 1.1.9 2 2 2h1" />
        <circle cx="16" cy="11" r="1.15" fill="currentColor" stroke="none" />
      </svg>
      <blockquote className="squote-text">
        <p>
          “It is difficult to get a man to understand something,
          <br />
          when his salary depends upon his not understanding it.”
        </p>
      </blockquote>
      <p className="squote-cite">Upton  Sinclair</p>
    </div>
  );
}
