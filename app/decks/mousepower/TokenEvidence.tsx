const ITEMS = [
  {
    img: 'evidence-fortune-uber.jpg',
    href: 'https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code/',
    alt: 'Fortune: Uber burned through its entire 2026 AI budget in four months',
  },
  {
    img: 'evidence-fortune-microsoft.jpg',
    href: 'https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents/',
    alt: "Fortune: Microsoft reports are exposing AI's real cost problem",
  },
  {
    img: 'evidence-cnet-amazon.jpg',
    href: 'https://www.cnet.com/tech/services-and-software/amazon-ai-leaderboard-tokenmaxxing/',
    alt: "CNET: Amazon is the latest tech giant to face the consequences of AI 'tokenmaxxing'",
  },
  {
    img: 'evidence-bloomberg-meta.jpg',
    href: 'https://news.bloomberglaw.com/artificial-intelligence/meta-plans-to-crack-down-on-employee-token-use-information',
    alt: 'Bloomberg Law: Meta plans to crack down on employee token use',
  },
];

export function TokenEvidence() {
  return (
    <div className="evidence-slide rack-in">
      {ITEMS.map((it) => (
        <figure className="evidence-item" key={it.img}>
          <div className="evidence-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/decks/mousepower/${it.img}`} alt={it.alt} />
          </div>
          <figcaption>
            <a className="evidence-cap" href={it.href} target="_blank" rel="noreferrer">
              {it.href.replace(/^https?:\/\//, '')}
            </a>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
