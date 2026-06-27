const STATS = [
  {
    num: '+91%',
    cap: (
      <>
        time reviewing
        <br />
        code each day
      </>
    ),
  },
  {
    num: '20%',
    cap: (
      <>
        engineering time
        <br />
        spent coding
      </>
    ),
  },
  { num: '??%', cap: 'productivity gains' },
];

export function VerificationStats() {
  return (
    <div className="vstat-slide rack-in">
      <h2 className="vstat-headline">
        As execution gets cheap, bottleneck shifts to verification:
      </h2>

      <div className="vstat-row">
        {STATS.map((s) => (
          <div className="vstat-item" key={s.num}>
            <div className="vstat-num">{s.num}</div>
            <div className="vstat-cap">{s.cap}</div>
          </div>
        ))}
      </div>

      <p className="vstat-amdahl">(Amdahl’s law)</p>

      <p className="vstat-source">
        Sources: (1){' '}
        <a
          href="https://www.faros.ai/blog/ai-software-engineering"
          target="_blank"
          rel="noreferrer"
        >
          faros.ai/blog/ai-software-engineering
        </a>{' '}
        (2){' '}
        <a
          href="https://cognition.ai/blog/devin-annual-performance-review-2025"
          target="_blank"
          rel="noreferrer"
        >
          cognition.ai/blog/devin-annual-performance-review-2025
        </a>
      </p>
    </div>
  );
}
