'use client';

// Step-3 interstitial of the opening: the agents' spending comes due. The 3×3
// grid blurs behind and a past-due invoice from Anthropic drops in on top — a
// paper document (white sheet, page stack, soft shadow) mirroring the
// information-theory closer (EntropyPaper). The comedy is the total: the little
// deck ran up a bill in the billions.
export function AnthropicBill() {
  const lines = [
    { d: 'Claude Opus 4.8 · output tokens', q: '68,241,905,772,144', r: '$75.00 / M', a: '$5,118,142,932.91' },
    { d: 'Claude Opus 4.8 · input tokens', q: '512,887,213,660,000', r: '$15.00 / M', a: '$7,693,308,204.90' },
    { d: 'Extended thinking · reasoning tokens', q: '22,410,556,000,000', r: '$75.00 / M', a: '$1,680,791,700.00' },
    { d: 'Agentic browser sessions', q: '9,412,006', r: '$0.42 / ea', a: '$3,953,042.52' },
  ];
  return (
    <div className="bill-overlay">
      <div className="bill-paper">
        <span className="bill-stamp" aria-hidden>past due</span>
        <header className="bill-head">
          {/* eslint-disable-next-line @next/next/no-img-element -- offline deck */}
          <img className="bill-logo" src="/decks/mousepower/anthropic-logo.svg" alt="Anthropic" />
          <div className="bill-meta">
            <div className="bill-doc">Invoice</div>
            <dl>
              <dt>No.</dt><dd>INV-4880-OPUS</dd>
              <dt>Issued</dt><dd>08.15.2025</dd>
              <dt>Due</dt><dd>09.15.2025</dd>
            </dl>
          </div>
        </header>

        <div className="bill-billto">
          <span className="bill-billto-label">billed to</span>
          <span className="bill-billto-name">Maximillian Piras</span>
        </div>

        <table className="bill-table">
          <thead>
            <tr>
              <th>description</th>
              <th className="bill-num">quantity</th>
              <th className="bill-num">rate</th>
              <th className="bill-num">amount</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.d}>
                <td>{l.d}</td>
                <td className="bill-num">{l.q}</td>
                <td className="bill-num">{l.r}</td>
                <td className="bill-num">{l.a}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bill-totals">
          <div className="bill-total-row">
            <span>Subtotal</span>
            <span className="bill-num">$14,496,195,880.33</span>
          </div>
          <div className="bill-total-row">
            <span>Late fee (45% · 288 days overdue)</span>
            <span className="bill-num">$6,523,288,146.15</span>
          </div>
          <div className="bill-total-row bill-total-row--due">
            <span>Amount due</span>
            <span className="bill-num">$21,019,484,026.48</span>
          </div>
        </div>
      </div>
    </div>
  );
}
